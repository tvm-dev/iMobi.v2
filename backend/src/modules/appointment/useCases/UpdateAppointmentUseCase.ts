import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentRepository } from '../repositories/AppointmentRepository';
import { Appointment } from '../entities/Appointment';

@Injectable()
export class UpdateAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(userId: string, id: string, data: Partial<Appointment>) {
    const appointment = await this.appointmentRepository.updateOne(
      userId,
      id,
      data,
    );
    if (!appointment) throw new NotFoundException();

    return appointment;
  }
}
