// RUTA: libs/core/domain/shared-kernel/cdskentities/src/lib/entity.base.ts
// Autor: L.I.A Legacy (IA Asistente)
import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
} from '@dfs-suite/sherrors';
import { IsoDateString, Maybe } from '@dfs-suite/shtypes'; // AggregateId ya no se importa aquí como Branded Type
import { Guard } from '@dfs-suite/shutils';

// AggregateId ahora se considera string en el contexto de los genéricos de entidad.
// Los IDs específicos como TenantId, UserId, etc., serán Brand<string, 'SpecificName'>.

export interface BaseEntityProps<TID extends string = string> {
  readonly id: TID;
  readonly createdAt: IsoDateString;
  readonly updatedAt: IsoDateString;
}

export interface CreateEntityProps<TProps, TID extends string = string> {
  readonly id: TID;
  props: TProps;
  readonly createdAt?: Date;
  readonly updatedAt?: Date;
}

export abstract class Entity<
  EntityProps,
  TID extends string = string // TID ahora extiende string directamente
> {
  protected readonly _id: TID;
  protected _createdAt: Date;
  protected _updatedAt: Date;
  public props: EntityProps;

  constructor({
    id,
    props,
    createdAt,
    updatedAt,
  }: CreateEntityProps<EntityProps, TID>) {
    this.validateId(id);
    this._id = id;

    this.validateProps(props);
    this.props = props;

    const now = new Date();
    this._createdAt =
      createdAt instanceof Date && !isNaN(createdAt.getTime())
        ? createdAt
        : now;
    this._updatedAt =
      updatedAt instanceof Date && !isNaN(updatedAt.getTime())
        ? updatedAt
        : now;

    this.validate();
  }

  get id(): TID {
    return this._id;
  }

  get createdAt(): IsoDateString {
    return this._createdAt.toISOString() as IsoDateString;
  }

  get updatedAt(): IsoDateString {
    return this._updatedAt.toISOString() as IsoDateString;
  }

  protected setUpdatedAt(date?: Date): void {
    this._updatedAt =
      date instanceof Date && !isNaN(date.getTime()) ? date : new Date();
  }

  static isEntity(entity: unknown): entity is Entity<unknown, string> {
    // Ajustado el type guard
    return entity instanceof Entity;
  }

  public equals(object?: Maybe<Entity<EntityProps, TID>>): boolean {
    if (Guard.isNil(object)) {
      return false;
    }
    if (this === object) {
      return true;
    }
    if (!Entity.isEntity(object)) {
      return false;
    }
    // La comparación de IDs es directa ya que ambos son TID (que extiende string)
    return this.id === object.id;
  }

  public getProps(): Readonly<EntityProps & BaseEntityProps<TID>> {
    const propsCopy = {
      id: this._id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      ...this.props,
    };
    return Object.freeze(propsCopy);
  }

  protected validateProps(props: EntityProps): void {
    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException(
        `${this.constructor.name} props should not be empty.`
      );
    }
    if (typeof props !== 'object' || props === null) {
      throw new ArgumentInvalidException(
        `${this.constructor.name} props should be an object.`
      );
    }
  }

  private validateId(id: TID): void {
    if (Guard.isEmpty(id)) {
      // id es TID (string), Guard.isEmpty funciona
      throw new ArgumentNotProvidedException(
        `${this.constructor.name} ID cannot be empty.`
      );
    }
  }

  public abstract validate(): void;
}
// RUTA: libs/core/domain/shared-kernel/cdskentities/src/lib/entity.base.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "El tipo genérico `TID` en `Entity`, `BaseEntityProps`, y `CreateEntityProps` ahora extiende `string` directamente.", "justificacion": "Alinea con la redefinición de `AggregateId` como `string` en `shtypes`. Esto permite que los Branded IDs específicos (ej. `TenantId = Brand<string, 'TenantId'>`) sean asignables a `TID`.", "impacto": "Resuelve la incompatibilidad de tipos fundamental entre los IDs brandeados específicos y un `AggregateId` brandeado genérico. Simplifica la jerarquía de tipos de ID para genéricos." },
  { "mejora": "`validateId` ahora toma `TID` y `Guard.isEmpty` puede operar directamente sobre `id` (que es un `string` o un `Brand<string, ...>`).", "justificacion": "Simplificación debido al cambio en `TID`.", "impacto": "Menos necesidad de casts." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
