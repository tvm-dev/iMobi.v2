import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../repositories/AppointmentRepository';
import { Appointment } from '../entities/Appointment';

interface CreateAppointmentRequest {
  userId: string;
  description: string;
  location: string;
  link: string;
  status: string;
  date: Date;
  hour: string;
  observations: string;
}

@Injectable()
export class CreateAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    date,
    hour,
    observations,
    description,
    link,
    location,
    status,
    userId,
  }: CreateAppointmentRequest): Promise<Appointment> {
    // Encontrar o último appointment para o usuário específico
    const lastAppointment =
      await this.appointmentRepository.createNextAppointmentNumber(userId);

    // Calcular o próximo appointmentNumber
    const nextAppointmentNumber =
      Number(lastAppointment?.appointmentNumber ?? 0) + 1;

    // Criar uma nova instância de Appointment com o número calculado
    const appointment = new Appointment(
      {
        date,
        hour,
        observations,
        description,
        link,
        location,
        status,
        userId,
      },
      nextAppointmentNumber.toString(), // Passa o número calculado
    );

    // Persistir a instância de Appointment
    await this.appointmentRepository.create(appointment);

    return appointment;
  }
}
