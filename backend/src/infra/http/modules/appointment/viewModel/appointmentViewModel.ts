import { Appointment } from 'generated/prisma';

export class AppointmentViewModel {
  static toHttp({
    date,
    hour,
    observations,
    createdAt,
    description,
    link,
    location,
    status,
    updatedAt,
    appointmentNumber,
  }: Appointment) {
    return {
      description,
      link,
      observations,
      location,
      status,
      appointmentNumber,
      date: date.toLocaleDateString('pt-BR'), // <-- formata data
      hour: hour,
      createdAt,
      updatedAt,
    };
  }
}
