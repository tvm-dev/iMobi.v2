import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Patch,
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
import { DeleteAppointmentUseCase } from 'src/modules/appointment/useCases/DeleteAppointmentUseCase';
import { Appointment } from 'src/modules/appointment/entities/Appointment';
import { UpdateAppointmentUseCase } from 'src/modules/appointment/useCases/UpdateAppointmentUseCase';

@Controller('appointment')
export class AppointmentController {
  constructor(
    private createAppointmentUseCase: CreateAppointmentUseCase,
    private getAppointmentUseCase: GetAppointmentUseCase,
    private getManyAppointmentUseCase: GetManyAppointmentUseCase,
    private getManyDataAppointmentUseCase: GetManyDataAppointmentUseCase,
    private deleteAppointmentUseCase: DeleteAppointmentUseCase,
    private updateAppointmentUseCase: UpdateAppointmentUseCase,
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

  // Update
  @Patch(':appointmentNumber')
  async update(
    @Param('appointmentNumber') appointmentNumber: string,
    @Body() body: Partial<Appointment>,
    @Request() request: AuthenticatedRequestModel,
  ): Promise<Appointment> {
    const userId = request.user.id;
    return this.updateAppointmentUseCase.execute(
      userId,
      appointmentNumber,
      body,
    );
  }

  // Delete
  @Delete(':id')
  @HttpCode(204)
  async deleteAppointment(
    @Param('id') id: string,
    @Request() request: AuthenticatedRequestModel,
  ) {
    const userId = request.user.id;
    await this.deleteAppointmentUseCase.execute(userId, id);
  }
}
