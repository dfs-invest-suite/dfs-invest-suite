// RUTA: libs/core/domain/shared-kernel/cdskevents/src/lib/integration-event.base.ts
// TODO: [LIA Legacy - Implementar IntegrationEventBase]
// Propósito: Clase base abstracta para Eventos de Integración.
// Relacionado con Casos de Uso: Publicación de eventos a otros contextos/servicios.

import { ObjectLiteral } from '@dfs-suite/shtypes'; // REFACTORIZADO

import { DomainEventBase, DomainEventProps } from './domain-event.base'; // OK
import {
  IIntegrationEvent,
  IIntegrationEventMetadata,
} from './integration-event.interface'; // OK
// IntegrationEventInstanceId también se importa de shtypes

export type IntegrationEventProps<TPayload extends ObjectLiteral> =
  DomainEventProps<TPayload> & {
    // Permitir pasar metadata de integración, o se usarán defaults
    metadata?: Partial<IIntegrationEventMetadata>;
  };

export abstract class IntegrationEventBase<
    TPayload extends ObjectLiteral = Record<string, never>
  >
  extends DomainEventBase<TPayload>
  implements IIntegrationEvent<TPayload>
{
  // Sobrescribe la declaración de metadata para usar el tipo más específico
  declare readonly metadata: Readonly<IIntegrationEventMetadata>;

  protected constructor(props: IntegrationEventProps<TPayload>) {
    // DomainEventBase ya inicializa 'id', 'eventName', 'aggregateId', 'payload', y 'metadata' base.
    // Aquí necesitamos asegurar que la metadata también incluya 'eventVersion' y 'sourceContext'.
    super(props);

    // Sobrescribir o extender la metadata creada por DomainEventBase
    // createOperationMetadata ya fue llamado en DomainEventBase.
    const baseMetadata = this.metadata; // La metadata creada por DomainEventBase

    const integrationMetadata: IIntegrationEventMetadata = {
      ...baseMetadata, // Conserva correlationId, causationId, userId, timestamp
      eventVersion: props.metadata?.eventVersion || '1.0.0', // Default version
      sourceContext:
        props.metadata?.sourceContext ||
        this.constructor.name.replace(/Event$/, 'Context'), // Infiere contexto
      topic: props.metadata?.topic,
    };
    // Re-asignar y congelar la metadata completa
    // Esto es un poco hacky debido a que 'metadata' es readonly en el padre.
    // Una mejor solución sería que DomainEventBase tome una factory para la metadata.
    (this as { -readonly [K in keyof this]: this[K] }).metadata =
      Object.freeze(integrationMetadata);
  }
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorización de imports.", "justificacion": "Alineación.", "impacto": "Resolución." },
  { "mejora": "Estructura base para `IntegrationEventBase` que extiende `DomainEventBase`.", "justificacion": "Reutiliza la lógica común y añade/sobrescribe la metadata específica de integración.", "impacto": "Fundación para eventos de integración." },
  { "mejora": "Tipo `IntegrationEventProps` para el constructor.", "justificacion": "Permite pasar `Partial<IIntegrationEventMetadata>`.", "impacto": "Flexibilidad."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "La forma de sobrescribir `this.metadata` (con el cast `(this as { ... })`) es para evitar errores de TypeScript con propiedades `readonly`. Una refactorización de `DomainEventBase` para aceptar una función factory de metadata podría ser más limpia." },
  { "nota": "La inferencia de `sourceContext` a partir de `this.constructor.name` es una convención; puede necesitar ser explícita en algunos casos." }
]
*/
// RUTA: libs/core/domain/shared-kernel/cdskevents/src/lib/integration-event.base.ts
