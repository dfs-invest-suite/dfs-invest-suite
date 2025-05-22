// apps/api-main/src/main.ts
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';

import helmet from 'helmet';

import {
  AllExceptionsFilter,
  LoggingInterceptor,
  TransformResponseInterceptor,
} from '@dfs-suite/infraobservability';

import { AppModule } from './app/app.module'; // Este ya importa TenantPrismaService si es necesario para el hook

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    rawBody: true,
  });

  const configService = app.get(ConfigService);
  const appLogger = app.get(Logger); // Esto usa nuestro PinoLoggerAdapter si InfraObservabilityModule está bien configurado
  app.useLogger(appLogger);

  const appPort = configService.get<number>('API_PORT') ?? 3000;
  const nodeEnv = configService.get<string>('NODE_ENV') ?? 'development';
  const corsOrigin = configService.get<string>('CORS_ORIGIN');

  app.use(
    helmet({
      contentSecurityPolicy:
        nodeEnv === 'development'
          ? {
              directives: {
                defaultSrc: [`'self'`],
                scriptSrc: [
                  `'self'`,
                  `'unsafe-inline'`,
                  `'unsafe-eval'`, // Requerido por GraphQL Playground
                  'cdn.jsdelivr.net',
                ],
                styleSrc: [
                  `'self'`,
                  `'unsafe-inline'`,
                  'cdn.jsdelivr.net',
                  'fonts.googleapis.com',
                ],
                imgSrc: [`'self'`, 'data:', 'cdn.jsdelivr.net'],
                fontSrc: [
                  `'self'`,
                  'data:',
                  'fonts.gstatic.com',
                  'cdn.jsdelivr.net',
                ],
                connectSrc: [
                  `'self'`,
                  `ws://localhost:${appPort}`, // Para HMR y GraphQL Subscriptions
                  `http://localhost:${appPort}`,
                  'cdn.jsdelivr.net',
                ],
              },
            }
          : undefined, // Usar defaults de helmet en producción
    })
  );

  app.enableCors({
    origin: corsOrigin?.split(',') ?? true,
    credentials: true,
  });

  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    })
  );

  const httpAdapterHost = app.get(HttpAdapterHost);

  app.useGlobalInterceptors(
    new LoggingInterceptor(appLogger), // Pasar el logger
    new TransformResponseInterceptor()
  );
  app.useGlobalFilters(new AllExceptionsFilter(appLogger, httpAdapterHost)); // Pasar el logger

  // Habilitar hooks de apagado para onApplicationShutdown en AppModule
  app.enableShutdownHooks(); // <<< IMPORTANTE PARA QUE onApplicationShutdown SE LLAME

  await app.listen(appPort);
  appLogger.log(
    `🚀 API Main está corriendo en: http://localhost:${appPort}/api/v1 (NODE_ENV: ${nodeEnv})`,
    'Bootstrap'
  );
  if (nodeEnv !== 'production') {
    appLogger.log(
      `🚀 GraphQL Playground en: http://localhost:${appPort}/graphql`,
      'Bootstrap'
    );
  }
}

bootstrap()
  .then(() => {
    console.info('Bootstrap de API Main exitoso.');
  })
  .catch((err) => {
    console.error('Error al iniciar la aplicación API Main:', err);
    process.exit(1);
  });
// FIN DEL ARCHIVO: apps/api-main/src/main.ts
