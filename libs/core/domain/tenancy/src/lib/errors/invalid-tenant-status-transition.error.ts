// libs/core/domain/tenancy/src/lib/errors/invalid-tenant-status-transition.error.ts
import { ExceptionBase } from '@dfs-suite/shared-errors'; // Cambiar a ExceptionBase
import { CorrelationId, ObjectLiteral } from '@dfs-suite/shared-types';

export const INVALID_TENANT_STATUS_TRANSITION =
  'TENANCY.INVALID_TENANT_STATUS_TRANSITION';

// Heredar directamente de ExceptionBase para poder definir su propio 'code'
export class InvalidTenantStatusTransitionError extends ExceptionBase {
  public readonly code = INVALID_TENANT_STATUS_TRANSITION; // 'override' ya no es necesario si ExceptionBase.code es abstract

  constructor(
    message: string,
    cause?: Error,
    metadata?: ObjectLiteral,
    correlationId?: CorrelationId
  ) {
    super(message, cause, metadata, correlationId);
  }
}

/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Contexto Adicional en Metadata): (Igual que antes) Para este error específico, la metadata podría incluir el estado actual del tenant (`fromStatus`) y el estado al que se intentó transicionar (`toStatus`).
  Justificación: Facilitaría la depuración al proveer más contexto sobre la transición inválida directamente en el objeto de error.
  Impacto: El constructor necesitaría aceptar estos datos adicionales y pasarlos a la metadata de `ExceptionBase`. La entidad `TenantEntity` debería proveer esta información al lanzar el error.
]
[
  Mejora Propuesta 2 (Jerarquía de Errores de Dominio): Si surgen muchos errores específicos del dominio `Tenancy`, se podría crear una clase base `TenancyDomainError extends ExceptionBase` y hacer que todos los errores de `Tenancy` hereden de ella.
  Justificación: Mejor organización y capacidad de capturar todos los errores de `Tenancy` con un solo `instanceof TenancyDomainError`.
  Impacto: Creación de una nueva clase base de error.
]
*/
// libs/core/domain/tenancy/src/lib/errors/invalid-tenant-status-transition.error.ts
/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Contexto Adicional en Metadata): Para este error específico, la metadata podría incluir el estado actual del tenant y el estado al que se intentó transicionar.
  Justificación: Facilitaría la depuración al proveer más contexto sobre la transición inválida directamente en el objeto de error.
  Impacto: El constructor necesitaría aceptar estos datos adicionales y pasarlos a la metadata de `ExceptionBase`.
]
*/
