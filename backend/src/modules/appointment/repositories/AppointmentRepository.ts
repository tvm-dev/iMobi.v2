import { Appointment } from '../entities/Appointment';

export abstract class AppointmentRepository {
  abstract create(appointment: Appointment): Promise<void>;
}
