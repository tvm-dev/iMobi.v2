import { Body, Controller, Post, Request } from '@nestjs/common';
import { createAppointmentBody } from './dtos/createAppointmentBody';
import { CreateAppointmentUseCase } from 'src/modules/appointment/useCases/CreateAppointmentUseCase';
import { AuthenticatedRequestModel } from '../auth/models/authentucatedRequestModel';
import { AppointmentViewModel } from './viewModel/appointmentViewModel';

@Controller('appointment')
export class appointmentController {
  constructor(private createUserUseCase: CreateAppointmentUseCase) {}

  @Post()
  async createAppointment(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: createAppointmentBody,
  ) {
    const appointmentBody = { ...body, userId: request.user.id };
    const appointment = await this.createUserUseCase.execute(appointmentBody);

    return AppointmentViewModel.toHttp(appointment);
  }
}
