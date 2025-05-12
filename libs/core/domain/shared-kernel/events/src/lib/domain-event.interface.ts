// libs/core/domain/shared-kernel/events/src/lib/domain-event.interface.ts
import { AggregateId, CorrelationId, IsoDateString, Maybe, UserId } from '@dfs-suite/shared-types';

export interface IDomainEventMetadata {
  /** Timestamp cuando este evento de dominio ocurrió */
  readonly timestamp: IsoDateString;
  /** ID para propósitos de correlación (para Eventos de Integración, correlación de logs, etc). */
  readonly correlationId: CorrelationId;
  /** ID de causación usado para reconstruir el orden de ejecución si es necesario */
  readonly causationId?: Maybe<CorrelationId>;
  /** ID del usuario para propósitos de depuración y logging */
  readonly userId?: Maybe<UserId>;
}

// Usamos `unknown` para el payload por defecto para ser más estrictos que `any`.
// Las clases de evento concretas DEBEN definir su tipo de Payload.
export interface IDomainEvent<Payload extends Record<string, unknown> = Record<string, unknown>> {
  /** ID único para esta instancia específica del evento */
  readonly id: AggregateId; // Podría ser un tipo específico Brand<string, 'EventId'>
  /** ID del Agregado donde ocurrió el evento de dominio */
  readonly aggregateId: AggregateId;
  /** Nombre del evento, típicamente el nombre de la clase del constructor del evento */
  readonly eventName: string;
  /** Metadata asociada con el evento */
  readonly metadata: Readonly<IDomainEventMetadata>; // Asegurar inmutabilidad
  /** Los datos/payload reales del evento */
  readonly payload: Readonly<Payload>; // Asegurar inmutabilidad
}
