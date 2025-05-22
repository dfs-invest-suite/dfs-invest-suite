// RUTA: libs/core/domain/codoantiban/src/lib/ports/rate-limiter.port.ts
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import { TenantId, WhatsAppAccountId } from '@dfs-suite/shtypes';

export const RATE_LIMITER_PORT = Symbol('IRateLimiterPort');

export interface RateLimitConsumeResult {
  allowed: boolean;
  remainingPoints?: number;
  msBeforeNext?: number;
}

export interface IRateLimiterPort {
  /**
   * Intenta consumir N puntos para una clave específica.
   * La clave usualmente es tenantId:phoneNumberId:actionType.
   */
  consume(
    key: string, // Ej: `${tenantId}:${accountId}:send_message`
    pointsToConsume?: number // Default 1
  ): Promise<Result<RateLimitConsumeResult, ExceptionBase>>;

  /**
   * Configura o reconfigura los límites para una clave.
   * Usado por AccountHealthManagerService para ajustar dinámicamente.
   */
  configureLimits(
    key: string,
    points: number, // Puntos permitidos
    durationInSeconds: number // En este período
  ): Promise<Result<void, ExceptionBase>>;

  getRemainingPoints(key: string): Promise<Result<number, ExceptionBase>>;
}
// RUTA: libs/core/domain/codoantiban/src/lib/ports/rate-limiter.port.ts
