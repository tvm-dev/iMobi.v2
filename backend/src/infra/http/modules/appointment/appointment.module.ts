import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database/database.module';
import { appointmentController } from './appointment.controller';
import { CreateAppointmentUseCase } from 'src/modules/appointment/useCases/CreateAppointmentUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [appointmentController],
  providers: [CreateAppointmentUseCase],
  exports: [DatabaseModule],
})
export class AppointmentModule {}
