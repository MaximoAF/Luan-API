import 'reflect-metadata';

import { existsSync } from 'fs';
import { join } from 'path';

import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';

import { Request, Response, NextFunction } from 'express';
import * as express from 'express';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');

  app.enableCors();

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  const publicDir = join(process.cwd(), 'public');
  const indexHtml = join(publicDir, 'index.html');

  if (existsSync(indexHtml)) {
    const expressApp = app.getHttpAdapter().getInstance();

    expressApp.use(express.static(publicDir));

    expressApp.get(
      '/{*splat}',
      (req: Request, res: Response, next: NextFunction) => {
        if (
          req.path.startsWith('/api') ||
          req.path.startsWith('/uploads')
        ) {
          return next();
        }

        res.sendFile(indexHtml);
      },
    );
  }

  const port = process.env.PORT || 3000;

  await app.listen(port);

  console.log(`Luan Essence corriendo en http://localhost:${port}`);
}

bootstrap();