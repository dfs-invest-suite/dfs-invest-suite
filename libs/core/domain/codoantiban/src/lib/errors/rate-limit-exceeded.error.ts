// RUTA: libs/core/domain/codoantiban/src/lib/errors/rate-limit-exceeded.error.ts
import { ExceptionBase } from '@dfs-suite/sherrors';
import {
  CorrelationId,
  Maybe,
  TenantId,
  WhatsAppAccountId,
} from '@dfs-suite/shtypes'; // Añadido Maybe, CorrelationId, ObjectLiteral

export class RateLimitExceededAntiBanError extends ExceptionBase {
  public readonly code = 'ANTIBAN.RATE_LIMIT_EXCEEDED';

  constructor(
    tenantId: TenantId,
    accountId: WhatsAppAccountId,
    retryAfterMs: number,
    cause?: Maybe<Error | unknown>, // Añadido cause
    correlationId?: Maybe<CorrelationId> // Añadido correlationId
  ) {
    super(
      `Rate limit exceeded for account ${String(accountId)} of tenant ${String(
        tenantId
      )}. Try again in ${retryAfterMs}ms.`,
      cause, // Pasar cause
      {
        // metadata
        tenantId: String(tenantId),
        accountId: String(accountId),
        retryAfterMs,
      },
      correlationId // Pasar correlationId
    );
  }
}
// FIN DEL ARCHIVO: libs/core/domain/codoantiban/src/lib/errors/rate-limit-exceeded.error.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  {
    "mejora": "`code` definido como `public readonly code = ...;`. `metadata` pasada a `super()`.",
    "justificacion": "Resuelve errores TS2540, TS2715, TS2515. Alinea con la correcta implementación de `ExceptionBase`.",
    "impacto": "Clase de error funcional y correcta."
  },
  {
    "mejora": "Constructor ahora acepta `cause` y `correlationId` opcionales y los pasa a `super()`.",
    "justificacion": "Alineación con `ExceptionBase`.",
    "impacto": "Errores más informativos."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
