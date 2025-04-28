import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UserModule } from '../user/user.module';
import { AuthController } from './auth.controller';
import { LocalStrategy } from 'src/modules/auth/strategies/local.strategy';
import { JwtStrategy } from 'src/modules/auth/strategies/jwt.strategy';
import { ValidateUserUseCase } from 'src/modules/auth/useCases/validateUserUseCase/validateUserUseCase';
import { SignInDTOValidateMiddleware } from './middleware/signInDTOValidate.middleware';
import { DatabaseModule } from 'src/infra/database/database.module';
import { SignInUseCase } from 'src/modules/auth/useCases/signInUseCase/SignInUseCase';

@Module({
  imports: [
    ConfigModule, // Já deve estar global, mas mantenha aqui se não estiver
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: config.get<string>('JWT_EXPIRE') || '1d',
        },
      }),
    }),
    UserModule,
    DatabaseModule,
  ],
  controllers: [AuthController],
  providers: [LocalStrategy, JwtStrategy, ValidateUserUseCase, SignInUseCase],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(SignInDTOValidateMiddleware).forRoutes('/signIn');
  }
}
