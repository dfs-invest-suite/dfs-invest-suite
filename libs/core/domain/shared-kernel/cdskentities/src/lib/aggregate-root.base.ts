// RUTA: libs/core/domain/shared-kernel/entities/src/lib/aggregate-root.base.ts
import { IDomainEvent } from '@dfs-suite/core-domain-shared-kernel-events';
import { CreateEntityProps, Entity } from './entity.base';

export abstract class AggregateRoot<
  AggregateProps
> extends Entity<AggregateProps> {
  private _domainEvents: IDomainEvent<Record<string, unknown>>[] = [];

  constructor(createProps: CreateEntityProps<AggregateProps>) {
    super(createProps);
  }

  get domainEvents(): readonly IDomainEvent<Record<string, unknown>>[] {
    return Object.freeze([...this._domainEvents]);
  }

  protected addEvent(domainEvent: IDomainEvent<Record<string, unknown>>): void {
    // CAMBIO: any a Record<string, unknown>
    this.validate(); // Asegurar que el agregado siga siendo válido después del cambio que generó el evento
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  public getAndClearDomainEvents(): readonly IDomainEvent<
    Record<string, unknown>
  >[] {
    const events = [...this._domainEvents];
    this.clearEvents();
    return Object.freeze(events);
  }
}
// RUTA: libs/core/domain/shared-kernel/entities/src/lib/aggregate-root.base.ts
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Tipado de payload de evento en `addEvent`",
    "justificacion": "Se cambió el tipo del payload del evento de `any` a `Record<string, unknown>` en el método `addEvent`. Esto es más seguro que `any` y sigue siendo lo suficientemente genérico para una clase base, ya que `DomainEventBase` usa `Record<string, never>` como default para eventos sin payload.",
    "impacto": "Resuelve el warning `no-explicit-any` y mejora ligeramente la seguridad de tipos."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */

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
