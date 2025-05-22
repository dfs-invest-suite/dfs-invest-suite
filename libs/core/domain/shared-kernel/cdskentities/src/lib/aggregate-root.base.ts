// RUTA: libs/core/domain/shared-kernel/cdskentities/src/lib/aggregate-root.base.ts
// Autor: L.I.A Legacy (IA Asistente)
import { IDomainEvent } from '@dfs-suite/cdskevents';
// AggregateId (de @dfs-suite/shtypes) ahora es un alias de string,
// por lo que TID extends string es la forma correcta de manejarlo.

import { CreateEntityProps, Entity } from './entity.base';

export abstract class AggregateRoot<
  TProps,
  TID extends string = string // TID ahora extiende string
> extends Entity<TProps, TID> {
  // Pasa TID a Entity
  private _domainEvents: IDomainEvent[] = [];

  constructor(createProps: CreateEntityProps<TProps, TID>) {
    super(createProps);
  }

  get domainEvents(): readonly IDomainEvent[] {
    return Object.freeze([...this._domainEvents]);
  }

  protected addEvent(domainEvent: IDomainEvent): void {
    // IDomainEvent.aggregateId ahora es de tipo string (o AggregateId que es string)
    // this.id es de tipo TID (que extiende string)
    // Por lo tanto, la asignación y comparación deberían ser directas.
    if (domainEvent.aggregateId !== this.id) {
      // Podríamos lanzar un error aquí si el ID del agregado del evento no coincide con el ID de esta raíz.
      // Sin embargo, esta validación es más una responsabilidad de la entidad concreta
      // al construir el payload del evento.
      console.warn(
        `[${this.constructor.name}] DomainEvent aggregateId ("${domainEvent.aggregateId}") does not match AggregateRoot id ("${this.id}"). EventName: ${domainEvent.eventName}`
      );
    }
    this._domainEvents.push(domainEvent);
    this.validate(); // Validar después de la acción que generó el evento
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  public getAndClearDomainEvents(): readonly IDomainEvent[] {
    const events = [...this._domainEvents];
    this.clearEvents();
    return Object.freeze(events);
  }
}
// RUTA: libs/core/domain/shared-kernel/cdskentities/src/lib/aggregate-root.base.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "El tipo genérico `TID` en `AggregateRoot` ahora extiende `string` y se pasa correctamente a `Entity`.", "justificacion": "Alineación con el cambio en `Entity` y la redefinición de `AggregateId`.", "impacto": "Consistencia en la jerarquía de tipos de ID." },
  { "mejora": "Simplificada la comparación de IDs en `addEvent` (o eliminada la necesidad de cast), asumiendo que `IDomainEvent.aggregateId` es `string`.", "justificacion": "Con `IDomainEvent.aggregateId` siendo `string`, y `this.id` siendo `TID extends string`, la comparación directa es válida. Se añadió un `console.warn` para desarrollo si hay discrepancias.", "impacto": "Código más limpio y menos propenso a errores de tipo." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
