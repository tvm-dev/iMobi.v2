import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { UserRepository } from 'src/modules/user/repositories/UserRepository';
import { PrismaUserRepository } from './repositories/PrismaUserRepository';
import { AppointmentRepository } from 'src/modules/appointment/repositories/AppointmentRepository';
import { PrismaAppointmentRepository } from './repositories/PrismaAppointmentRepository';
import { PrismaPropertyRepository } from './repositories/PrismaPropertyRepository';
import { PropertyRepository } from 'src/modules/property/repositories/PropertyRepository';

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
    {
      provide: PropertyRepository,
      useClass: PrismaPropertyRepository,
    },
  ],
  exports: [
    UserRepository,
    AppointmentRepository,
    PropertyRepository,
    PrismaService,
  ],
})
export class DatabaseModule {}
