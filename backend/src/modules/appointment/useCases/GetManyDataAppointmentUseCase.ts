import { Injectable, NotFoundException } from '@nestjs/common';
import { AppointmentRepository } from '../repositories/AppointmentRepository';

@Injectable()
export class GetManyDataAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(
    userId: string,
    data: string,
    where: 'in' | 'after' | 'before',
  ) {
    const appointments = await this.appointmentRepository.getManyByData(
      userId,
      data,
      where,
    );

    if (!appointments) throw new NotFoundException();

    return appointments;
  }
}
