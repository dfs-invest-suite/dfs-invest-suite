// libs/core/domain/shared-kernel/entities/src/lib/entity.base.ts
import { ArgumentInvalidException, ArgumentNotProvidedException, ArgumentOutOfRangeException } from '@dfs-suite/shared-errors';
import { AggregateId, IsoDateString, Maybe } from '@dfs-suite/shared-types';
import { Guard } from '@dfs-suite/shared-utils';

export interface BaseEntityProps {
  id: AggregateId;
  createdAt: IsoDateString;
  updatedAt: IsoDateString;
}

export interface CreateEntityProps<T> {
  id: AggregateId;
  props: T;
  createdAt?: Date; // Puede ser Date internamente, pero IsoDateString para la interfaz pública
  updatedAt?: Date;
}

export abstract class Entity<EntityProps> {
  protected readonly _id: AggregateId;
  protected _createdAt: Date;
  protected _updatedAt: Date;
  protected props: EntityProps;

  constructor({ id, props, createdAt, updatedAt }: CreateEntityProps<EntityProps>) {
    this.validateId(id);
    this._id = id;
    this.validateProps(props); // Validar antes de asignar
    this.props = props;

    const now = new Date();
    this._createdAt = createdAt || now;
    this._updatedAt = updatedAt || now;
    this.validate(); // Invariantes de la entidad específica
  }

  get id(): AggregateId {
    return this._id;
  }

  get createdAt(): IsoDateString {
    return this._createdAt.toISOString() as IsoDateString;
  }

  get updatedAt(): IsoDateString {
    return this._updatedAt.toISOString() as IsoDateString;
  }

  protected setUpdatedAt(date?: Date): void {
    this._updatedAt = date || new Date();
  }

  static isEntity(entity: unknown): entity is Entity<unknown> {
    return entity instanceof Entity;
  }

  public equals(object?: Maybe<Entity<EntityProps>>): boolean {
    if (Guard.isNil(object)) {
      return false;
    }
    if (this === object) {
      return true;
    }
    if (!Entity.isEntity(object)) {
      return false;
    }
    return this.id === object.id;
  }

  /**
   * Devuelve una copia congelada de las propiedades de la entidad, incluyendo las base.
   */
  public getProps(): Readonly<EntityProps & BaseEntityProps> {
    const propsCopy = {
      id: this._id,
      createdAt: this.createdAt, // Usa el getter para el formato IsoDateString
      updatedAt: this.updatedAt, // Usa el getter para el formato IsoDateString
      ...this.props,
    };
    return Object.freeze(propsCopy);
  }

  /**
   * Valida las propiedades pasadas a la entidad.
   * Este método puede ser sobreescrito por las clases hijas si necesitan una validación de props más específica.
   */
  protected validateProps(props: EntityProps): void {
    const MAX_PROPS = 50; // Ejemplo, ajustar según necesidad

    if (Guard.isEmpty(props)) {
      throw new ArgumentNotProvidedException('Entity props should not be empty');
    }
    if (typeof props !== 'object' || props === null) {
      throw new ArgumentInvalidException('Entity props should be an object');
    }
    if (Object.keys(props as Record<string, unknown>).length > MAX_PROPS) {
      throw new ArgumentOutOfRangeException(
        `Entity props should not have more than ${MAX_PROPS} properties`,
      );
    }
  }

  private validateId(id: AggregateId): void {
    if (Guard.isEmpty(id)) {
        throw new ArgumentNotProvidedException('Entity ID cannot be empty');
    }
    // Aquí se podría añadir validación de formato de UUID si es necesario, usando UuidSchema de shared-validation-schemas
  }

  /**
   * Método abstracto para ser implementado por las subclases.
   * Valida los invariantes de la entidad después de la inicialización o modificación.
   */
  public abstract validate(): void;
}
