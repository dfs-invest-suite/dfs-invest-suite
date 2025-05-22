// RUTA: libs/infrastructure/infracache/src/lib/adapters/redis-rate-limiter.adapter.ts
import { Inject, Injectable, Logger } from '@nestjs/common';
import Redis from 'ioredis'; // Importar ioredis
import { RateLimiterRedis, RateLimiterRes } from 'rate-limiter-flexible';

import {
  IRateLimiterPort,
  RateLimitConsumeResult,
} from '@dfs-suite/codoantiban'; // Puerto del dominio
import {
  ExceptionBase,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, err, ok } from '@dfs-suite/shresult';

import { REDIS_CLIENT_INJECTION_TOKEN } from '../infracache.module';

@Injectable()
export class RedisRateLimiterAdapter implements IRateLimiterPort {
  private readonly logger = new Logger(RedisRateLimiterAdapter.name);
  private limiters: Map<string, RateLimiterRedis> = new Map();

  constructor(
    @Inject(REDIS_CLIENT_INJECTION_TOKEN)
    private readonly redisClient: Redis
  ) {}

  private getLimiter(
    key: string,
    points: number,
    durationInSeconds: number
  ): RateLimiterRedis {
    if (!this.limiters.has(key)) {
      const newLimiter = new RateLimiterRedis({
        storeClient: this.redisClient,
        keyPrefix: `rate_limit_${key}`, // Importante para evitar colisiones de claves
        points: points,
        duration: durationInSeconds,
        blockDuration: durationInSeconds * 1000, // Bloquear por la misma duración si excede
        inmemoryBlockOnConsumed: points + 1, // Bloqueo en memoria después de consumir todos los puntos
        inmemoryBlockDuration: durationInSeconds * 1000,
      });
      this.limiters.set(key, newLimiter);
      this.logger.debug(
        `Rate limiter created for key "${key}" with ${points}pts/${durationInSeconds}s.`
      );
      return newLimiter;
    }
    return this.limiters.get(key)!;
  }

  async consume(
    key: string,
    pointsToConsume = 1
  ): Promise<Result<RateLimitConsumeResult, ExceptionBase>> {
    try {
      // Asumimos que los límites ya están configurados (default o por configureLimits)
      // Necesitamos obtener la configuración del limiter para esta clave o usar un default.
      // Esto es un problema si configureLimits no se ha llamado.
      // RateLimiterRedis requiere que 'points' y 'duration' se pasen en el constructor.
      // Por ahora, asumimos un default o que el limiter ya existe.
      let limiter = this.limiters.get(key);
      if (!limiter) {
        // Default a 10 puntos por 60 segundos si no está configurado
        this.logger.warn(
          `Rate limiter for key "${key}" not pre-configured, using default 10pts/60s.`
        );
        limiter = this.getLimiter(key, 10, 60);
      }

      const consumeResult: RateLimiterRes = await limiter.consume(
        key, // La clave real puede ser más específica, ej. `${key}:${userId}`
        pointsToConsume
      );
      return ok({
        allowed: true, // Si no lanza error, está permitido
        remainingPoints: consumeResult.remainingPoints,
        msBeforeNext: consumeResult.msBeforeNext,
      });
    } catch (rlResOrError) {
      if (rlResOrError instanceof RateLimiterRes) {
        // Error de RateLimiterFlexible porque se excedió el límite
        return ok({
          allowed: false,
          remainingPoints: rlResOrError.remainingPoints,
          msBeforeNext: rlResOrError.msBeforeNext,
        });
      }
      const e = rlResOrError as Error;
      this.logger.error(
        `Error consuming rate limit for key "${key}": ${e.message}`,
        e.stack
      );
      return err(new InternalServerErrorException('Rate limiting error', e));
    }
  }

  async configureLimits(
    key: string,
    points: number,
    durationInSeconds: number
  ): Promise<Result<void, ExceptionBase>> {
    try {
      this.getLimiter(key, points, durationInSeconds); // Esto crea/recrea el limiter
      return ok(undefined);
    } catch (e: any) {
      this.logger.error(
        `Error configuring rate limits for key "${key}": ${e.message}`,
        e.stack
      );
      return err(
        new InternalServerErrorException('Rate limit config error', e)
      );
    }
  }

  async getRemainingPoints(
    key: string
  ): Promise<Result<number, ExceptionBase>> {
    try {
      const limiter = this.limiters.get(key);
      if (!limiter) {
        return ok(0); // O un error si se espera que exista
      }
      const rlRes = await limiter.get(key);
      return ok(rlRes ? rlRes.remainingPoints : limiter.points); // Si no hay consumo, devuelve puntos totales
    } catch (e: any) {
      this.logger.error(
        `Error getting remaining points for key "${key}": ${e.message}`,
        e.stack
      );
      return err(new InternalServerErrorException('Rate limit fetch error', e));
    }
  }
}
// FIN DEL ARCHIVO: libs/infrastructure/infracache/src/lib/adapters/redis-rate-limiter.adapter.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  {
    "mejora": "Implementación base de `RedisRateLimiterAdapter` usando `rate-limiter-flexible`.",
    "justificacion": "Provee una implementación funcional para el puerto `IRateLimiterPort` utilizando Redis como backend. Incluye configuración básica y manejo de errores.",
    "impacto": "Adaptador funcional para rate limiting."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Estrategia de configuración de limitadores más robusta.",
    "justificacion": "Actualmente, si `consume` se llama para una clave sin `configureLimits` previo, usa un default. Sería mejor que `configureLimits` sea el único punto de creación/actualización o que los defaults se carguen de `ConfigService`.",
    "impacto": "Mayor control y previsibilidad."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
