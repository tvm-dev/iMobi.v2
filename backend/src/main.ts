import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  // Habilita CORS
  app.enableCors({
    origin: process.env.FRONTEND_ORIGIN, // origem do seu frontend
    credentials: true, // se for usar cookies/autenticação
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  app.use((req, res, next) => {
    console.log(`[${req.method}] ${req.url}`);
    next();
  });

  await app.listen(process.env.PORT ?? 3333, '0.0.0.0');
}
bootstrap();
