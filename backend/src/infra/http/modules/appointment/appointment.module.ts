import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { AppointmentController } from './appointment.controller';
import { CreateAppointmentUseCase } from 'src/modules/appointment/useCases/CreateAppointmentUseCase';
import { GetAppointmentUseCase } from 'src/modules/appointment/useCases/GetAppointment';
import { GetManyAppointmentUseCase } from 'src/modules/appointment/useCases/GetManyAppointmentUseCase';
import { GetManyDataAppointmentUseCase } from 'src/modules/appointment/useCases/GetManyDataAppointmentUseCase';
import { DeleteAppointmentUseCase } from 'src/modules/appointment/useCases/DeleteAppointmentUseCase';
import { UpdateAppointmentUseCase } from 'src/modules/appointment/useCases/UpdateAppointmentUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [AppointmentController],
  providers: [
    CreateAppointmentUseCase,
    GetAppointmentUseCase,
    GetManyAppointmentUseCase,
    GetManyDataAppointmentUseCase,
    DeleteAppointmentUseCase,
    UpdateAppointmentUseCase,
  ],
  exports: [DatabaseModule],
})
export class AppointmentModule {}
