import { Injectable } from '@nestjs/common';
import { AppointmentRepository } from '../repositories/AppointmentRepository';

@Injectable()
export class DeleteAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(userId: string, id: string) {
    await this.appointmentRepository.deleteOne(userId, id);
  }
}
