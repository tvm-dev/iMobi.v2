import { Appointment } from '../entities/Appointment';
// import { Appointment as RawAppointment } from 'generated/prisma';

export abstract class AppointmentRepository {
  abstract create(appointment: Appointment): Promise<void>;
  // Metodos get
  // Pegar 1
  abstract getById(userId: string, id: string): Promise<Appointment | null>;
  // Pegar todos
  abstract getMany(userId: string): Promise<Appointment[] | null>;
  //  Pegar todos pela data
  abstract getManyByData(
    userId: string,
    data: string,
    where: 'in' | 'after' | 'before',
  ): Promise<Appointment[] | null>;
  // Update
  abstract updateOne(
    userId: string,
    id: string,
    data: Partial<Appointment>,
  ): Promise<Appointment | null>;
  // Deletar
  abstract deleteOne(userId: string, id: string): Promise<null>;
  // Others
  // Criar id
  abstract createNextAppointmentNumber(
    userId: string,
  ): Promise<Appointment | null>;
}
