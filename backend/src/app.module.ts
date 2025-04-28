import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './infra/http/modules/auth/guards/jwtAuth.Guard';
import { UserModule } from './infra/http/modules/user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './infra/http/modules/auth/auth.module';

@Module({
  imports: [
    UserModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true, // faz o .env ser carregado para toda a aplicação
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
