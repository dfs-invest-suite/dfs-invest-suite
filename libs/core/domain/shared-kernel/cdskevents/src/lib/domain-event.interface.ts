// libs/core/domain/shared-kernel/events/src/lib/domain-event.interface.ts
import {
  CommandInstanceId,
  CorrelationId,
  DomainEventInstanceId, // Usado aquí
  IsoDateString,
  Maybe, // Usado aquí
  UserId,
} from '@dfs-suite/shared-types';

export interface IDomainEventMetadata {
  readonly timestamp: IsoDateString;
  readonly correlationId: CorrelationId;
  readonly causationId?: Maybe<
    CorrelationId | CommandInstanceId | DomainEventInstanceId
  >;
  readonly userId?: Maybe<UserId>;
}
// ...
/* NOTAS PARA IMPLEMENTACIÓN FUTURA (Mantenidas) */
/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Tipado de `eventName`):
    Se podría considerar usar un tipo literal o un enum para `eventName` si hay un conjunto fijo de nombres de eventos, aunque `this.constructor.name` es una práctica común y flexible.
    Justificación: Mayor seguridad de tipos para los nombres de eventos, previniendo errores tipográficos al suscribirse.
    Impacto: Requeriría que cada clase de evento defina explícitamente su `eventName` o que `DomainEventBase` lo infiera de una propiedad estática.
]
*/
// libs/core/domain/shared-kernel/events/src/lib/domain-event.interface.ts
