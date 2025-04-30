import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from 'src/modules/appointment/repositories/AppointmentRepository';
import { Appointment } from 'src/modules/appointment/entities/Appointment';
import { PrismaAppointmentMapper } from '../mappers/PrismaAppointmentMapper';
import { startOfDay, endOfDay, addDays } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';

@Injectable()
export class PrismaAppointmentRepository implements AppointmentRepository {
  constructor(private prisma: PrismaService) {}

  async create(appointment: Appointment): Promise<void> {
    const appointmentRaw = PrismaAppointmentMapper.toPrisma(appointment);

    await this.prisma.appointment.create({
      data: appointmentRaw,
    });
  }

  async createNextAppointmentNumber(
    userId: string,
  ): Promise<Appointment | null> {
    const lastAppointment = await this.prisma.appointment.findFirst({
      where: { userId },
      orderBy: { appointmentNumber: 'desc' },
    });

    if (!lastAppointment) {
      return null;
    }

    return PrismaAppointmentMapper.toDomain(lastAppointment);
  }

  // Get
  async getById(
    userId: string,
    appointmentNumber: string,
  ): Promise<Appointment | null> {
    const appointment = await this.prisma.appointment.findUnique({
      where: { userId_appointmentNumber: { userId, appointmentNumber } },
    });

    if (!appointment) {
      return null;
    }

    return PrismaAppointmentMapper.toDomain(appointment);
  }

  async getMany(userId: string): Promise<Appointment[] | null> {
    const appointments = await this.prisma.appointment.findMany({
      where: { userId },
      orderBy: { appointmentNumber: 'desc' },
    });

    if (!appointments) {
      return null;
    }

    return appointments.map(PrismaAppointmentMapper.toDomain);
  }

  async getManyByData(
    userId: string,
    data: string,
    where: 'in' | 'after' | 'before',
  ): Promise<Appointment[]> {
    const baseDate = new Date(data); // ex: '2025-04-30'
    const nextDay = addDays(baseDate, 1);

    // Aqui usamos diretamente sem ajuste de fuso no "dia"
    const start = startOfDay(nextDay); // 2025-04-30T00:00:00.000Z
    const end = endOfDay(nextDay); // 2025-04-30T23:59:59.999Z

    // Se quiser ver os valores no console:
    console.log('Filtro UTC:', start.toISOString(), end.toISOString());
    const dateFilter =
      where === 'in'
        ? { gte: start, lte: end }
        : where === 'after'
          ? { gt: end }
          : { lt: start };

    const appointments = await this.prisma.appointment.findMany({
      where: {
        userId,
        createdAt: dateFilter,
      },
      orderBy: {
        appointmentNumber: 'desc',
      },
    });
    return appointments.map(PrismaAppointmentMapper.toDomain);
  }

  // Update
  async updateOne(
    userId: string,
    id: string,
    data: Partial<Appointment>,
  ): Promise<Appointment | null> {
    const appointment = await this.prisma.appointment.update({
      where: { userId_appointmentNumber: { userId, appointmentNumber: id } },
      data,
    });

    if (!appointment) return null;

    return PrismaAppointmentMapper.toDomain(appointment);
  }

  // delete
  async deleteOne(userId: string, id: string) {
    await this.prisma.appointment.delete({
      where: { userId_appointmentNumber: { appointmentNumber: id, userId } },
    });

    return null;
  }
}
