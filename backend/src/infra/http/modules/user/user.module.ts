import { Module } from '@nestjs/common';
import { userController } from './user.controller';
import { DatabaseModule } from 'src/infra/database/database.module';
import { CreateUserUseCase } from 'src/modules/user/useCases/CreateUserUseCase';

@Module({
  imports: [DatabaseModule],
  controllers: [userController],
  providers: [CreateUserUseCase],
  exports: [DatabaseModule],
})
export class UserModule {}
