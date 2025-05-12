// libs/core/domain/tenancy/src/lib/errors/invalid-tenant-status-transition.error.ts
import { ArgumentInvalidException } from '@dfs-suite/shared-errors'; // Solo ArgumentInvalidException
import { CorrelationId, ObjectLiteral } from '@dfs-suite/shared-types';

export const INVALID_TENANT_STATUS_TRANSITION = 'TENANCY.INVALID_TENANT_STATUS_TRANSITION';

export class InvalidTenantStatusTransitionError extends ArgumentInvalidException {
  override readonly code = INVALID_TENANT_STATUS_TRANSITION;

  constructor(message: string, cause?: Error, metadata?: ObjectLiteral, correlationId?: CorrelationId) {
    super(message, cause, metadata, correlationId);
  }
}

/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Contexto Adicional en Metadata): Para este error específico, la metadata podría incluir el estado actual del tenant y el estado al que se intentó transicionar.
  Justificación: Facilitaría la depuración al proveer más contexto sobre la transición inválida directamente en el objeto de error.
  Impacto: El constructor necesitaría aceptar estos datos adicionales y pasarlos a la metadata de `ExceptionBase`.
]
*/
