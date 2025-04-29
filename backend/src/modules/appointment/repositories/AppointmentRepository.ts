import { Appointment } from '../entities/Appointment';
// import { Appointment as RawAppointment } from 'generated/prisma';

export abstract class AppointmentRepository {
  abstract create(appointment: Appointment): Promise<void>;
  abstract getById(userId: string, id: string): Promise<Appointment | null>;
  abstract getMany(userId: string): Promise<Appointment[] | null>;
  abstract getManyByData(
    userId: string,
    data: string,
    where: 'in' | 'after' | 'before',
  ): Promise<Appointment[] | null>;
  abstract createNextAppointmentNumber(
    userId: string,
  ): Promise<Appointment | null>;
}
