// RUTA: libs/core/domain/shared-kernel/cdskevents/src/lib/domain-event.interface.ts
// TODO: [LIA Legacy - Implementar IDomainEvent y su Metadata] - ¡REVISADO Y REFACTORIZADO!
// Propósito: Define la interfaz base para todos los Eventos de Dominio y su metadata.
// Relacionado con Casos de Uso: Utilizado por AggregateRoots para registrar cambios y por Handlers para reaccionar.

import {
  AggregateId,
  CommandInstanceId,
  CorrelationId,
  DomainEventInstanceId,
  IntegrationEventInstanceId, // Aunque no se usa directamente aquí, es parte de la unión CausationId
  IsoDateString,
  Maybe,
  ObjectLiteral, // Para el payload genérico
  UserId,
  CausationId, // Usaremos el tipo CausationId de shtypes
} from '@dfs-suite/shtypes'; // REFACTORIZADO

export interface IDomainEventMetadata {
  /** El timestamp de cuándo ocurrió el evento, en formato ISO 8601 UTC. */
  readonly timestamp: IsoDateString;
  /**
   * El ID de correlación para rastrear la operación completa a través de múltiples contextos o servicios.
   * Si este evento fue causado por un comando, este debería ser el correlationId del comando.
   */
  readonly correlationId: CorrelationId;
  /**
   * El ID de la operación que causó este evento.
   * Puede ser el ID de otro CorrelationId (si es un evento de integración que propaga correlación),
   * el ID de un CommandInstanceId si fue un comando, o el ID de otro DomainEventInstanceId
   * si este evento es una reacción a otro evento de dominio.
   */
  readonly causationId?: Maybe<
    CausationId | CommandInstanceId | DomainEventInstanceId | CorrelationId
  >;
  /** El ID del usuario que inició la operación que resultó en este evento, si aplica. */
  readonly userId?: Maybe<UserId>;
}

export interface IDomainEvent<
  TPayload extends ObjectLiteral = Record<string, never>
> {
  /** ID único de esta instancia particular del evento de dominio. */
  readonly id: DomainEventInstanceId;
  /** Nombre de la clase del evento, usado para identificación y por event buses/handlers. */
  readonly eventName: string;
  /** ID del agregado al que pertenece o se relaciona este evento. */
  readonly aggregateId: AggregateId;
  /** Los datos específicos del evento. Por defecto, un objeto vacío si no hay payload. */
  readonly payload: Readonly<TPayload>;
  /** Metadatos asociados al evento. */
  readonly metadata: Readonly<IDomainEventMetadata>;
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorización de imports a alias codificados (`@dfs-suite/shtypes`).", "justificacion": "Alineación.", "impacto": "Resolución." },
  { "mejora": "Tipado de `payload` en `IDomainEvent` con default a `Record<string, never>`.", "justificacion": "Indica explícitamente que si un evento no tiene payload, su tipo es un objeto vacío, mejorando la seguridad de tipos para eventos sin datos específicos.", "impacto": "Mayor claridad y seguridad de tipos." },
  { "mejora": "Uso del Branded Type `CausationId` y unión más explícita para `causationId` en `IDomainEventMetadata`.", "justificacion": "Mejora la semántica y la seguridad de tipos para el ID causal.", "impacto": "Claridad conceptual." },
  { "mejora": "JSDoc detallado para cada propiedad de las interfaces.", "justificacion": "Mejora la comprensión y el uso de estas interfaces fundamentales.", "impacto": "Mantenibilidad y DX." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
// RUTA: libs/core/domain/shared-kernel/cdskevents/src/lib/domain-event.interface.ts
