// RUTA: libs/core/domain/shared-kernel/cdskevents/src/lib/integration-event.interface.ts
// TODO: [LIA Legacy - Implementar IIntegrationEvent]
// Propósito: Definir una interfaz base para eventos de integración, que pueden tener una
// estructura o metadata ligeramente diferente a los eventos de dominio internos.
// Estos son eventos que se publican para ser consumidos por otros Bounded Contexts o sistemas externos.
import { IDomainEvent, IDomainEventMetadata } from './domain-event.interface';
import { AggregateId } from '@dfs-suite/shtypes';

export interface IIntegrationEventMetadata extends IDomainEventMetadata {
  readonly eventVersion?: string; // Versión del schema del evento para evolución
  readonly sourceContext?: string; // Bounded Context de origen
}

export interface IIntegrationEvent<
  T extends Record<string, any> = Record<string, never>
> extends IDomainEvent<T> {
  readonly metadata: IIntegrationEventMetadata;
  // Podría tener un nombre diferente como 'integrationEventName' si se necesita diferenciar
}
