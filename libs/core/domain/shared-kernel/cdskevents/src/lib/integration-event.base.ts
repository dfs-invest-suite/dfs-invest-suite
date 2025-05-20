// RUTA: libs/core/domain/shared-kernel/cdskevents/src/lib/integration-event.base.ts
// TODO: [LIA Legacy - Implementar IntegrationEventBase]
// Propósito: Clase base para eventos de integración.
// import { DomainEventBase, DomainEventProps } from './domain-event.base';
// import { IIntegrationEvent, IIntegrationEventMetadata } from './integration-event.interface';

// export abstract class IntegrationEventBase<
//   Payload extends Record<string, any> = Record<string, never>,
// > extends DomainEventBase<Payload> implements IIntegrationEvent<Payload> {
//   // Sobrescribir metadata para usar IIntegrationEventMetadata
//   declare readonly metadata: Readonly<IIntegrationEventMetadata>;

//   protected constructor(props: DomainEventProps<Payload> & { metadata?: Partial<IIntegrationEventMetadata> }) {
//     super(props); // La metadata se construye en DomainEventBase, puede necesitar ajustes
//     // Lógica adicional para metadata de integración si es necesario
//     const baseMetadata = this.metadata; // Obtener la metadata base
//     this.metadata = Object.freeze({
//       ...baseMetadata,
//       eventVersion: props.metadata?.eventVersion || '1.0.0',
//       sourceContext: props.metadata?.sourceContext || this.constructor.name.replace('Event', 'Context'),
//     });
//   }
// }
