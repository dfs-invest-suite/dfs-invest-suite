// apps/api-main/src/main.ts
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap()
  .then(() => {
    Logger.log('Bootstrap successful (main.ts)');
  })
  .catch((err) => {
    Logger.error('Bootstrap failed (main.ts)', err);
    process.exit(1); // Salir si bootstrap falla
  });
