import { Appointment as AppointmentRaw } from 'generated/prisma';
import { Appointment } from 'src/modules/appointment/entities/Appointment';

export class PrismaAppointmentMapper {
  static toPrisma(appointment: Appointment): AppointmentRaw {
    return {
      date: appointment.date,
      hour: appointment.hour,
      observations: appointment.observations,
      createdAt: appointment.createdAt,
      description: appointment.description,
      appointmentNumber: appointment.appointmentNumber,
      link: appointment.link,
      location: appointment.location,
      status: appointment.status,
      updatedAt: appointment.updatedAt,
      userId: appointment.userId,
    };
  }

  static toDomain(appointment: AppointmentRaw): Appointment {
    return new Appointment(
      {
        date: appointment.date,
        hour: appointment.hour,
        observations: appointment.observations,
        createdAt: appointment.createdAt,
        description: appointment.description,
        link: appointment.link,
        location: appointment.location,
        status: appointment.status,
        updatedAt: appointment.updatedAt,
        userId: appointment.userId,
      },
      appointment.appointmentNumber,
    );
  }
}
