import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../repositories/AppointmentRepository';
import { Appointment } from '../entities/Appointment';

interface CreateAppointmentRequest {
  userId: string;
  description: string;
  location: string;
  link: string;
  status: string;
  actions: string;
}

@Injectable()
export class CreateAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute({
    actions,
    description,
    link,
    location,
    status,
    userId,
  }: CreateAppointmentRequest) {
    const appointment = new Appointment({
      actions,
      description,
      link,
      location,
      status,
      userId,
    });
    await this.appointmentRepository.create(appointment);

    return appointment;
  }
}
