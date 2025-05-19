// libs/core/domain/shared-kernel/events/src/lib/domain-event-handler.interface.ts
import { IDomainEvent } from './domain-event.interface';

export interface IDomainEventHandler<T extends IDomainEvent = IDomainEvent> {
  handle(event: T): Promise<void> | void;
  /**
   * Nombre del evento que este handler escucha.
   * Debe coincidir con event.eventName (usualmente el nombre de la clase del evento).
   */
  listenTo(): string;
}
