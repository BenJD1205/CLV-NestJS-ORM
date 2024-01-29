import { Logger, VERSION_NEUTRAL, VersioningType, ValidationPipe } from '@nestjs/common';
import { NestFactory,Reflector } from '@nestjs/core';
import * as express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import {TransformInterceptor, RpcExceptionToHttpExceptionFilter} from '@nest-training/shared/interceptor'

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new TransformInterceptor(reflector));
  app.useGlobalFilters(new RpcExceptionToHttpExceptionFilter())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  app.use(helmet())
  app.use(compression());
  app.use(express.json({ limit: '10mb' }));
  app.use(express.urlencoded({ limit: '10mb', extended: false }));
  app.enableCors({ origin: '*' });
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3001;
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: VERSION_NEUTRAL,
  });
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
