// libs/core/domain/codoleadsflow/src/lib/errors/invalid-lead-status-transition.error.ts
import { ExceptionBase } from '@dfs-suite/sherrors';
import { CorrelationId, Maybe, ObjectLiteral } from '@dfs-suite/shtypes';

export const INVALID_LEAD_STATUS_TRANSITION_ERROR_CODE =
  'LEAD.INVALID_STATUS_TRANSITION';

export class InvalidLeadStatusTransitionError extends ExceptionBase {
  public readonly code = INVALID_LEAD_STATUS_TRANSITION_ERROR_CODE;
  constructor(
    message: string,
    cause?: Maybe<Error | unknown>,
    metadata?: Maybe<ObjectLiteral>,
    correlationId?: Maybe<CorrelationId>
  ) {
    super(message, cause, metadata, correlationId);
  }
}
// FIN DEL ARCHIVO: libs/core/domain/codoleadsflow/src/lib/errors/invalid-lead-status-transition.error.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Creado el archivo `invalid-lead-status-transition.error.ts`.", "justificacion": "Define un error de dominio específico para transiciones de estado inválidas en un Lead.", "impacto": "Manejo de errores de negocio más preciso en el dominio `codoleadsflow`." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
