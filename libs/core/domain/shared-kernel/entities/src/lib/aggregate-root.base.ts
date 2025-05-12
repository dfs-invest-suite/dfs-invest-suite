// libs/core/domain/shared-kernel/entities/src/lib/aggregate-root.base.ts
import { Entity, CreateEntityProps } from './entity.base';
import { IDomainEvent } from '@dfs-suite/core-domain-shared-kernel-events'; // Solo IDomainEvent

export abstract class AggregateRoot<AggregateProps> extends Entity<AggregateProps> {
  private _domainEvents: IDomainEvent[] = [];

  constructor(createProps: CreateEntityProps<AggregateProps>) {
    super(createProps);
  }

  get domainEvents(): readonly IDomainEvent[] {
    return Object.freeze([...this._domainEvents]);
  }

  protected addEvent(domainEvent: IDomainEvent): void {
    this.validate(); // Asegurar que el agregado es válido antes de añadir un evento
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  /**
   * Retorna una copia de los eventos de dominio actuales y limpia la lista interna.
   * Este método debe ser llamado por la capa de persistencia DESPUÉS de guardar el agregado.
   */
  public getAndClearDomainEvents(): readonly IDomainEvent[] {
    const events = [...this._domainEvents];
    this.clearEvents();
    return Object.freeze(events);
  }
}
