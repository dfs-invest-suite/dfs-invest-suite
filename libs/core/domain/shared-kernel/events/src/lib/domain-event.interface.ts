// libs/core/domain/shared-kernel/events/src/lib/domain-event.interface.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import {
  AggregateId,
  CorrelationId,
  IsoDateString,
  Maybe,
  UserId,
  CommandInstanceId,     // Para causationId
  DomainEventInstanceId, // Para el ID del evento y causationId
} from '@dfs-suite/shared-types';

/**
 * @interface IDomainEventMetadata
 * @description Metadatos asociados a un evento de dominio.
 */
export interface IDomainEventMetadata {
  readonly timestamp: IsoDateString;
  readonly correlationId: CorrelationId;
  readonly causationId?: Maybe<CorrelationId | CommandInstanceId | DomainEventInstanceId>; // ID del comando o evento que causó este
  readonly userId?: Maybe<UserId>;
  // readonly eventVersion?: number; // Mejora Futura
}

/**
 * @interface IDomainEvent<Payload extends Record<string, unknown> = Record<string, never>>
 * @description Interfaz base para todos los eventos de dominio.
 */
export interface IDomainEvent<Payload extends Record<string, unknown> = Record<string, never>> {
  readonly id: DomainEventInstanceId; // ID único de la instancia del evento
  readonly aggregateId: AggregateId;
  readonly eventName: string;
  readonly metadata: Readonly<IDomainEventMetadata>;
  readonly payload: Readonly<Payload>;
}
// libs/core/domain/shared-kernel/events/src/lib/domain-event.interface.ts
/* SECCIÓN DE MEJORAS (Actualizada)
[
  Mejora Aplicada: `id` ahora es `DomainEventInstanceId`.
]
[
  Mejora Aplicada: `metadata.timestamp` es `IsoDateString`.
]
[
  Mejora Aplicada: `metadata.causationId` tiene un tipo unión más específico.
]
... (otras mejoras pendientes se mantienen)
*/
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
