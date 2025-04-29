import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  Request,
} from '@nestjs/common';
import { createAppointmentBody } from './dtos/createAppointmentBody';
import { CreateAppointmentUseCase } from 'src/modules/appointment/useCases/CreateAppointmentUseCase';
import { AuthenticatedRequestModel } from '../auth/models/authentucatedRequestModel';
import { AppointmentViewModel } from './viewModel/appointmentViewModel';
import { GetAppointmentUseCase } from 'src/modules/appointment/useCases/GetAppointment';
import { GetManyAppointmentUseCase } from 'src/modules/appointment/useCases/GetManyAppointmentUseCase';
import { GetManyDataAppointmentUseCase } from 'src/modules/appointment/useCases/GetManyDataAppointmentUseCase';

@Controller('appointment')
export class AppointmentController {
  constructor(
    private createAppointmentUseCase: CreateAppointmentUseCase,
    private getAppointmentUseCase: GetAppointmentUseCase,
    private getManyAppointmentUseCase: GetManyAppointmentUseCase,
    private getManyDataAppointmentUseCase: GetManyDataAppointmentUseCase,
  ) {}

  @Post()
  async createAppointment(
    @Request() request: AuthenticatedRequestModel,
    @Body() body: createAppointmentBody,
  ) {
    const appointmentBody = { ...body, userId: request.user.id };
    const appointment =
      await this.createAppointmentUseCase.execute(appointmentBody);

    return AppointmentViewModel.toHttp(appointment);
  }

  @Get('data')
  async getManyDataAppointment(
    @Request() request: AuthenticatedRequestModel,
    @Query('data') data: string,
    @Query('where') where: 'in' | 'after' | 'before',
  ) {
    const userId = request.user.id;
    const appointment = await this.getManyDataAppointmentUseCase.execute(
      userId,
      data,
      where,
    );

    return appointment.map(AppointmentViewModel.toHttp);
  }

  @Get(':id')
  async getAppointment(
    @Request() request: AuthenticatedRequestModel,
    @Param('id') id: string,
  ) {
    const userId = request.user.id;
    const appointment = await this.getAppointmentUseCase.execute(id, userId);

    return AppointmentViewModel.toHttp(appointment);
  }

  @Get()
  async getManyAppointment(@Request() request: AuthenticatedRequestModel) {
    console.log('tet');
    const userId = request.user.id;
    const appointment = await this.getManyAppointmentUseCase.execute(userId);

    return appointment.map(AppointmentViewModel.toHttp);
  }
}
