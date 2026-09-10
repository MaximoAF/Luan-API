import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  app.enableCors(); // en producción, restringir al dominio del front si quedan separados
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,        // descarta campos no declarados en los DTO
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const port = process.env.PORT || 3000;
  await app.listen(port);
  console.log(`Luan Essence API corriendo en http://localhost:${port}/api`);
}
bootstrap();
