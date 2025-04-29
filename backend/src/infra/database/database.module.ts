import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { PrismaUserRepository } from './repositories/PrismaUserRepository';
import { AppointmentRepository } from 'src/modules/appointment/repositories/AppointmentRepository';
import { PrismaAppointmentRepository } from './repositories/PrismaAppointmentRepository';

@Module({
  providers: [
    PrismaService,
    {
      provide: UserRepository,
      useClass: PrismaUserRepository,
    },
    {
      provide: AppointmentRepository,
      useClass: PrismaAppointmentRepository,
    },
  ],
  exports: [UserRepository, AppointmentRepository, PrismaService],
})
export class DatabaseModule {}
