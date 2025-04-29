import { Appointment } from 'generated/prisma';

export class AppointmentViewModel {
  static toHttp({
    actions,
    createdAt,
    description,
    link,
    location,
    status,
    updatedAt,
    appointmentNumber,
  }: Appointment) {
    return {
      actions,
      description,
      link,
      location,
      status,
      appointmentNumber,
      date: createdAt.toLocaleDateString('pt-BR'), // <-- formata data
      hour: createdAt.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit',
      }), // <-- formata hora
      createdAt,
      updatedAt,
    };
  }
}
