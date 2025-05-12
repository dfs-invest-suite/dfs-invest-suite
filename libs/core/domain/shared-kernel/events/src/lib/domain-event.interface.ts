// libs/core/domain/shared-kernel/events/src/lib/domain-event.interface.ts
import { AggregateId, CorrelationId, IsoDateString, Maybe, UserId } from '@dfs-suite/shared-types';

export interface IDomainEventMetadata {
  readonly timestamp: IsoDateString;
  readonly correlationId: CorrelationId;
  readonly causationId?: Maybe<CorrelationId>;
  readonly userId?: Maybe<UserId>;
}

export interface IDomainEvent<Payload extends Record<string, unknown> = Record<string, never>> {
  readonly id: AggregateId; // ID del evento
  readonly aggregateId: AggregateId; // ID del agregado que originó el evento
  readonly eventName: string;
  readonly metadata: Readonly<IDomainEventMetadata>;
  readonly payload: Readonly<Payload>;
}

/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Tipado de `eventName`):
    Se podría considerar usar un tipo literal o un enum para `eventName` si hay un conjunto fijo de nombres de eventos, aunque `this.constructor.name` es una práctica común y flexible.
    Justificación: Mayor seguridad de tipos para los nombres de eventos, previniendo errores tipográficos al suscribirse.
    Impacto: Requeriría que cada clase de evento defina explícitamente su `eventName` o que `DomainEventBase` lo infiera de una propiedad estática.
]
*/
// libs/core/domain/shared-kernel/events/src/lib/domain-event.interface.ts
