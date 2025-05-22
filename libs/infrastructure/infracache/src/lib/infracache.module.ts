// RUTA: libs/infrastructure/infracache/src/lib/infracache.module.ts
import { Global, Logger, Module, Provider } from '@nestjs/common'; // Añadir Logger
import { ConfigModule, ConfigService } from '@nestjs/config';

import Redis from 'ioredis';

import { RATE_LIMITER_PORT } from '@dfs-suite/codoantiban'; // Ahora debería resolver

import { RedisRateLimiterAdapter } from './adapters/redis-rate-limiter.adapter';

export const REDIS_CLIENT_INJECTION_TOKEN = Symbol('REDIS_CLIENT');

const redisClientProvider: Provider = {
  provide: REDIS_CLIENT_INJECTION_TOKEN,
  // NO imports: [ConfigModule], aquí
  useFactory: (configService: ConfigService): Redis => {
    const logger = new Logger('RedisClientProvider'); // Logger para el factory
    const host = configService.get<string>('REDIS_HOST', 'localhost');
    const port = configService.get<number>('REDIS_PORT', 6379);
    const password = configService.get<string>('REDIS_PASSWORD');
    const db = configService.get<number>('REDIS_DB_CACHE', 0);

    logger.log(`Attempting to connect to Redis: ${host}:${port}, DB: ${db}`);

    const client = new Redis({
      host,
      port,
      password: password || undefined,
      db,
      lazyConnect: false, // Intentar conectar inmediatamente para verificar config
      maxRetriesPerRequest: 3,
      showFriendlyErrorStack: process.env['NODE_ENV'] !== 'production',
      retryStrategy: (times) => {
        const delay = Math.min(times * 100, 2000); // Max 2s
        logger.warn(
          `Redis: Retrying connection (attempt ${times}), delay ${delay}ms`
        );
        return delay;
      },
    });

    client.on('error', (err) => {
      logger.error(`Redis Client Error: ${err.message}`, err.stack);
    });
    client.on('connect', () => {
      logger.log('Redis Client Connected successfully (Cache/RateLimiter).');
    });
    client.on('reconnecting', () => {
      logger.warn('Redis Client is reconnecting...');
    });
    client.on('close', () => {
      logger.warn('Redis Client connection closed.');
    });
    client.on('end', () => {
      logger.warn('Redis Client connection ended (no more reconnections).');
    });

    // Opcional: Manejar la desconexión al apagar la app
    // (Esto es más complejo con NestJS DI y módulos globales/request-scoped)
    // Para un cliente global como este, se podría usar un hook de shutdown de NestJS.

    return client;
  },
  inject: [ConfigService],
};

const rateLimiterProvider: Provider = {
  provide: RATE_LIMITER_PORT,
  useClass: RedisRateLimiterAdapter,
};

@Global()
@Module({
  imports: [
    ConfigModule, // ConfigModule DEBE estar aquí para que ConfigService esté disponible para useFactory
  ],
  providers: [
    redisClientProvider,
    RedisRateLimiterAdapter, // Proveer la clase directamente para que NestJS la instancie y resuelva sus dependencias
    rateLimiterProvider, // Proveer el puerto con la clase
  ],
  exports: [REDIS_CLIENT_INJECTION_TOKEN, RATE_LIMITER_PORT],
})
export class InfraCacheModule {}
// FIN DEL ARCHIVO: libs/infrastructure/infracache/src/lib/infracache.module.ts
