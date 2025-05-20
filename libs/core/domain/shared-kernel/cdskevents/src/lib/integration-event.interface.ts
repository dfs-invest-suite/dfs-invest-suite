// RUTA: libs/core/domain/shared-kernel/cdskevents/src/lib/integration-event.interface.ts
// TODO: [LIA Legacy - Implementar IIntegrationEvent y su Metadata] - ¡REALIZADO!
// Propósito: Define una interfaz base para eventos de integración, que se publican
//            para ser consumidos por otros Bounded Contexts o sistemas externos.
// Relacionado con Casos de Uso: Comunicación asíncrona inter-contextos.

import { ObjectLiteral, Maybe } from '@dfs-suite/shtypes'; // REFACTORIZADO

import { IDomainEvent, IDomainEventMetadata } from './domain-event.interface'; // OK

export interface IIntegrationEventMetadata extends IDomainEventMetadata {
  /** Versión del schema del payload del evento, para manejar evolución. Ej: "1.0", "2.1". */
  readonly eventVersion: string;
  /** El Bounded Context o servicio que originó este evento. Ej: "TenancyContext", "LeadManagementService". */
  readonly sourceContext: string;
  /** Un ID único para esta instancia específica del evento de integración. */
  // readonly integrationEventId: IntegrationEventInstanceId; // 'id' de IDomainEvent ya cumple este rol
  /** A qué tópico o canal se debería publicar este evento (opcional, depende del bus). */
  readonly topic?: Maybe<string>;
}

export interface IIntegrationEvent<
  TPayload extends ObjectLiteral = Record<string, never>
> extends IDomainEvent<TPayload> {
  // La `id` y `eventName` se heredan de IDomainEvent.
  // El `eventName` debería ser globalmente único para los eventos de integración.
  readonly metadata: Readonly<IIntegrationEventMetadata>; // Sobrescribe el tipo de metadata.
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorización de imports a alias codificados.", "justificacion": "Alineación.", "impacto": "Resolución." },
  { "mejora": "Definición clara de `IIntegrationEventMetadata` extendiendo `IDomainEventMetadata`.", "justificacion": "Añade campos específicos para versionado y contexto de origen, cruciales para eventos inter-servicios.", "impacto": "Modelo de eventos de integración más robusto." },
  { "mejora": "`IIntegrationEvent` ahora extiende `IDomainEvent` y sobrescribe `metadata`.", "justificacion": "Reutiliza la estructura base de `IDomainEvent` (id, eventName, aggregateId, payload) pero con la metadata específica de integración.", "impacto": "Consistencia y DRY." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "`IntegrationEventBase` deberá implementar esta interfaz y manejar la inicialización de `eventVersion` y `sourceContext`."}
]
*/
// RUTA: libs/core/domain/shared-kernel/cdskevents/src/lib/integration-event.interface.ts
