// libs/core/domain/shared-kernel/cdskevents/src/lib/event-bus.port.ts// RUTA: libs/core/domain/shared-kernel/cdskevents/src/lib/event-bus.port.ts
// TODO: [LIA Legacy - Implementar IEventBusPort]
// Propósito: Un puerto más genérico para un bus de eventos, que podría manejar tanto
// DomainEvents como IntegrationEvents. IDomainEventEmitter podría ser una especialización o reemplazarse.
// import { IDomainEvent } from './domain-event.interface';
// import { IIntegrationEvent } from './integration-event.interface';
// import { Result } from '@dfs-suite/shresult';
// import { ExceptionBase } from '@dfs-suite/sherrors';

// export const EVENT_BUS_PORT = Symbol('IEventBusPort');
// export interface IEventBusPort {
//   publish(event: IDomainEvent | IIntegrationEvent): Promise<Result<void, ExceptionBase | Error>>;
//   publishAll(events: (IDomainEvent | IIntegrationEvent)[]): Promise<Result<void, ExceptionBase | Error>>;
//   // Podría tener métodos subscribe si el bus es local y no se usa NestJS EventEmitter
// }
