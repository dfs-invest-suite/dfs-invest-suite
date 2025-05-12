// libs/core/domain/shared-kernel/entities/src/lib/aggregate-root.base.ts
import { Entity, CreateEntityProps } from './entity.base';
import { IDomainEvent } from '@dfs-suite/core-domain-shared-kernel-events';

export abstract class AggregateRoot<AggregateProps> extends Entity<AggregateProps> {
  // CORRECCIÓN: Tipar _domainEvents para que acepte cualquier payload compatible con IDomainEvent
  private _domainEvents: IDomainEvent<Record<string, unknown>>[] = [];

  constructor(createProps: CreateEntityProps<AggregateProps>) {
    super(createProps);
  }

  get domainEvents(): readonly IDomainEvent<Record<string, unknown>>[] { // Devolver el tipo más genérico
    return Object.freeze([...this._domainEvents]);
  }

  // El parámetro domainEvent ya es del tipo correcto por inferencia de la clase de evento concreta
  protected addEvent(domainEvent: IDomainEvent<any>): void { // Usar 'any' para el payload aquí es aceptable
                                                             // o IDomainEvent<Record<string, unknown>>
    this.validate();
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  public getAndClearDomainEvents(): readonly IDomainEvent<Record<string, unknown>>[] {
    const events = [...this._domainEvents];
    this.clearEvents();
    return Object.freeze(events);
  }
}

/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Tipado Estricto de Eventos en Agregado):
    En lugar de `IDomainEvent<Record<string, unknown>>[]`, si un agregado solo puede emitir un conjunto específico de eventos, se podría usar un tipo unión para `_domainEvents` (ej. `(TenantCreatedEvent | TenantActivatedEvent)[]`). Esto daría más seguridad de tipos dentro del agregado.
    Justificación: Mayor precisión en los tipos de eventos que un agregado puede manejar.
    Impacto: Requeriría que cada subclase de `AggregateRoot` defina su propio tipo de array de eventos, lo cual puede ser verboso. La solución actual es un buen compromiso genérico.
]
// (Otras mejoras de AggregateRootBase se mantienen)
*/
// libs/core/domain/shared-kernel/entities/src/lib/aggregate-root.base.ts
