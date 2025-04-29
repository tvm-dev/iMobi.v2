import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AppointmentRepository } from '../repositories/AppointmentRepository';

@Injectable()
export class GetAppointmentUseCase {
  constructor(private appointmentRepository: AppointmentRepository) {}

  async execute(id: string, userId: string) {
    const appointment = await this.appointmentRepository.getById(userId, id);

    if (!appointment) throw new NotFoundException();

    if (appointment.appointmentNumber !== id) throw new UnauthorizedException();

    return appointment;
  }
}
