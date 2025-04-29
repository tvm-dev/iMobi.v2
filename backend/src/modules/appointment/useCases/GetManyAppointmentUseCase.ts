import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AppointmentRepository } from '../repositories/AppointmentRepository';

@Injectable()
export class GetManyAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(userId: string) {
    const appointments = await this.appointmentRepository.getMany(userId);

    if (!appointments) throw new NotFoundException();

    return appointments;
  }
}
