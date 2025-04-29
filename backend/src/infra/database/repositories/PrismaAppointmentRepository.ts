import { PrismaService } from '../prisma.service';
import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from 'src/modules/appointment/repositories/AppointmentRepository';
import { Appointment } from 'src/modules/appointment/entities/Appointment';
import { PrismaAppointmentMapper } from '../mappers/PrismaAppointmentMapper';

@Injectable()
export class PrismaAppointmentRepository implements AppointmentRepository {
  constructor(private prisma: PrismaService) {}

  async create(appointment: Appointment): Promise<void> {
    const appointmentRaw = PrismaAppointmentMapper.toPrisma(appointment);

    await this.prisma.appointment.create({
      data: appointmentRaw,
    });
  }
}
