// RUTA: libs/core/domain/shared-kernel/cdskentities/src/lib/aggregate-root.base.ts
// TODO: [LIA Legacy - Implementar AggregateRootBase] - ¡REVISADO Y REFACTORIZADO!
// Propósito: Clase base abstracta para todas las Raíces de Agregado (Aggregate Roots) del dominio.
//            Extiende Entity y añade la capacidad de registrar y despachar eventos de dominio.
// Relacionado con Casos de Uso: Todas las entidades que son raíces de agregado y necesitan emitir eventos.

import { IDomainEvent } from '@dfs-suite/cdskevents'; // REFACTORIZADO
import { AggregateId } from '@dfs-suite/shtypes'; // REFACTORIZADO (Para el tipado de la clase)

import { CreateEntityProps, Entity } from './entity.base'; // OK (relativo interno)

export abstract class AggregateRoot<
  // TProps y TIDType para alinearse con la firma de IRepositoryPort
  TProps,
  TIDType extends AggregateId = AggregateId // Por defecto AggregateId, pero puede ser un Branded ID específico
> extends Entity<TProps> {
  // Entity ya es genérico sobre EntityProps
  private _domainEvents: IDomainEvent[] = []; // Tipo más genérico para el array

  // El constructor de AggregateRoot ahora espera el mismo tipo de 'id' que Entity.
  // Si Entity espera AggregateId, entonces el 'id' aquí debe ser AggregateId.
  // Si se quiere usar TIDType para el ID del AggregateRoot, Entity también debería ser genérico sobre el tipo de ID.
  // Por ahora, mantendremos el ID de Entity como AggregateId.
  constructor(createProps: CreateEntityProps<TProps>) {
    super(createProps);
  }

  /**
   * Devuelve una copia congelada de solo lectura de los eventos de dominio actuales.
   */
  get domainEvents(): readonly IDomainEvent[] {
    return Object.freeze([...this._domainEvents]);
  }

  /**
   * Añade un evento de dominio a la lista de eventos pendientes del agregado.
   * Llama a `this.validate()` después de añadir el evento para asegurar que el agregado
   * sigue en un estado consistente después del cambio que originó el evento.
   * @param domainEvent - El evento de dominio a añadir.
   */
  protected addEvent(domainEvent: IDomainEvent): void {
    this._domainEvents.push(domainEvent);
    // Es crucial validar que la entidad sigue siendo consistente DESPUÉS de la acción
    // que generó el evento y ANTES de que el evento se publique realmente (usualmente post-persistencia).
    // Si el método que llama a addEvent ya llamó a setUpdatedAt y validate,
    // esta llamada a validate() aquí podría ser redundante o una doble verificación.
    // Por seguridad, la mantenemos.
    this.validate();
  }

  /**
   * Limpia la lista de eventos de dominio pendientes.
   * Usualmente se llama después de que los eventos han sido persistidos o publicados.
   */
  public clearEvents(): void {
    this._domainEvents = [];
  }

  /**
   * Obtiene todos los eventos de dominio pendientes y luego limpia la lista.
   * @returns Una copia congelada de solo lectura de los eventos de dominio que estaban pendientes.
   */
  public getAndClearDomainEvents(): readonly IDomainEvent[] {
    const events = [...this._domainEvents];
    this.clearEvents();
    return Object.freeze(events);
  }
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorización de imports a alias codificados.", "justificacion": "Alineación con la nueva nomenclatura.", "impacto": "Resolución correcta de módulos." },
  { "mejora": "Simplificación del tipado de `_domainEvents` a `IDomainEvent[]`.", "justificacion": "La interfaz `IDomainEvent` ya es genérica sobre su payload. Esto simplifica la clase base.", "impacto": "Mayor claridad." },
  { "mejora": "Aclaración sobre el rol de `validate()` en `addEvent`.", "justificacion": "Se explica por qué se llama a `validate()` después de añadir un evento.", "impacto": "Mejor comprensión del ciclo de vida del agregado." },
  { "mejora": "Tipado genérico `TIDType` añadido a `AggregateRoot`.", "justificacion": "Permite que las raíces de agregado puedan especificar su tipo de ID brandeado (ej. `TenantId`) si es necesario, aunque `Entity` base sigue usando `AggregateId` genérico. Esto es más para alineación futura con `IRepositoryPort`.", "impacto": "Flexibilidad, aunque su uso completo depende de que `Entity` también sea genérico sobre el ID." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Para que `TIDType` sea completamente efectivo y se propague al `this.id` heredado de `Entity`, la clase `Entity` también necesitaría ser genérica sobre el tipo de ID (ej. `Entity<EntityProps, TIDType extends AggregateId>`). Por ahora, `Entity` usa `AggregateId` directamente. Esto significa que `this.id` en `AggregateRoot` seguirá siendo `AggregateId`."}
]
*/
// RUTA: libs/core/domain/shared-kernel/cdskentities/src/lib/aggregate-root.base.ts
