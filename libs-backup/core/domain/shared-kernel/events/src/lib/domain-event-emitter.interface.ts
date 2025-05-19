// libs/core/domain/shared-kernel/events/src/lib/domain-event-emitter.interface.ts
import { IDomainEvent } from './domain-event.interface';

export const DOMAIN_EVENT_EMITTER_PORT = Symbol('DOMAIN_EVENT_EMITTER_PORT');

export interface IDomainEventEmitter {
  publish<T extends IDomainEvent>(event: T): Promise<void> | void;
  publishAll<T extends IDomainEvent>(events: T[]): Promise<void> | void;
}
