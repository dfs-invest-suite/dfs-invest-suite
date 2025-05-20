// RUTA: libs/core/domain/shared-kernel/cdskentities/src/lib/entity.base.ts
// TODO: [LIA Legacy - Implementar EntityBase] - ¡REVISADO Y REFACTORIZADO!
// Propósito: Clase base abstracta para todas las entidades del dominio,
//            gestionando ID, timestamps, igualdad y validación básica de props.
// Relacionado con Casos de Uso: Es la base para todas las entidades de dominio.

import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
  ArgumentOutOfRangeException, // Asumiendo que se exporta desde sherrors
} from '@dfs-suite/sherrors'; // REFACTORIZADO
import { AggregateId, IsoDateString, Maybe } from '@dfs-suite/shtypes'; // REFACTORIZADO
import { Guard } from '@dfs-suite/shutils'; // REFACTORIZADO

export interface BaseEntityProps {
  readonly id: AggregateId; // readonly para asegurar que no se cambie después de la creación de la entidad
  readonly createdAt: IsoDateString;
  readonly updatedAt: IsoDateString;
}

export interface CreateEntityProps<TProps> {
  readonly id: AggregateId;
  props: TProps; // props puede ser modificable internamente por la entidad, luego congelado en getProps
  readonly createdAt?: Date; // Puede ser Date internamente, se convierte a IsoDateString para la interfaz pública
  readonly updatedAt?: Date;
}

export abstract class Entity<EntityProps> {
  protected readonly _id: AggregateId;
  protected _createdAt: Date; // Almacenado como Date para facilitar comparaciones/cálculos internos
  protected _updatedAt: Date; // Almacenado como Date
  public props: EntityProps; // Hecho público para que las subclases puedan acceder y modificar si es necesario antes de una validación final

  constructor({
    id,
    props,
    createdAt,
    updatedAt,
  }: CreateEntityProps<EntityProps>) {
    this.validateId(id);
    this._id = id;

    // Validar las props antes de asignarlas y antes de llamar a la validación de invariantes de la subclase
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

    // Llamar al método validate de la subclase para verificar invariantes específicos de la entidad
    this.validate();
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

  /**
   * Actualiza el timestamp `_updatedAt` a la fecha y hora actual.
   * Debería ser llamado por métodos de la entidad que modifican su estado.
   * @param date - Opcional: una fecha específica para setear como updatedAt.
   */
  protected setUpdatedAt(date?: Date): void {
    this._updatedAt =
      date instanceof Date && !isNaN(date.getTime()) ? date : new Date();
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
   * Devuelve una copia superficial congelada de las propiedades de la entidad,
   * incluyendo las propiedades base (id, createdAt, updatedAt).
   * Los getters para createdAt y updatedAt aseguran el formato IsoDateString.
   */
  public getProps(): Readonly<EntityProps & BaseEntityProps> {
    const propsCopy = {
      id: this._id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      ...this.props,
    };
    return Object.freeze(propsCopy);
  }

  /**
   * Valida las propiedades pasadas a la entidad durante la creación o actualización.
   * Este método es llamado por el constructor y puede ser sobreescrito por las clases hijas
   * si necesitan una validación de props más específica antes de la validación de invariantes.
   * Por defecto, verifica que las props no estén vacías y sean un objeto.
   */
  protected validateProps(props: EntityProps): void {
    const MAX_PROPS = 50; // Ejemplo, ajustar según necesidad y complejidad esperada

    if (Guard.isEmpty(props)) {
      // isEmpty ya maneja null/undefined
      throw new ArgumentNotProvidedException(
        `${this.constructor.name} props should not be empty.`
      );
    }
    if (typeof props !== 'object' || props === null) {
      // props !== null ya está cubierto por isEmpty
      throw new ArgumentInvalidException(
        `${this.constructor.name} props should be an object.`
      );
    }
    // Esta validación de número de propiedades es opcional y situacional
    // if (Object.keys(props as Record<string, unknown>).length > MAX_PROPS) {
    //   throw new ArgumentOutOfRangeException(
    //     `${this.constructor.name} props should not have more than ${MAX_PROPS} properties.`
    //   );
    // }
  }

  private validateId(id: AggregateId): void {
    if (Guard.isEmpty(id)) {
      // isEmpty ya maneja null/undefined y string vacío
      throw new ArgumentNotProvidedException(
        `${this.constructor.name} ID cannot be empty.`
      );
    }
    // Futuro: Se podría usar UuidSchema de shvalidationschemas para validar el formato UUID aquí,
    // pero eso introduciría una dependencia a Zod en el shared-kernel, lo cual queremos evitar.
    // La validación de formato UUID es mejor en la capa donde se genera/recibe el ID.
  }

  /**
   * Método abstracto para ser implementado por las subclases.
   * Este método es responsable de validar los invariantes de la entidad específica.
   * Se llama al final del constructor de EntityBase y debería ser llamado
   * después de cualquier operación que modifique el estado de la entidad para asegurar su consistencia.
   */
  public abstract validate(): void;
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorización de todos los imports a alias codificados (`@dfs-suite/*`).", "justificacion": "Alineación con la nueva nomenclatura.", "impacto": "Resolución correcta de módulos." },
  { "mejora": "Propiedad `props` de `Entity` ahora es `public`.", "justificacion": "Permite a las subclases (Entidades y AggregateRoots concretos) acceder y modificar `this.props` directamente si es necesario ANTES de llamar a `this.validate()` o `this.setUpdatedAt()`. La inmutabilidad pública se mantiene a través de `getProps()`.", "impacto": "Mayor flexibilidad para la implementación de la lógica de negocio en las entidades hijas." },
  { "mejora": "Manejo de `createdAt` y `updatedAt` como `Date` internamente.", "justificacion": "Facilita cálculos y comparaciones de fechas dentro de la entidad. Los getters `createdAt` y `updatedAt` aseguran que se expongan como `IsoDateString`.", "impacto": "Mejor consistencia interna y API pública clara." },
  { "mejora": "Validación de `createdAt` y `updatedAt` en el constructor.", "justificacion": "Asegura que si se pasan fechas al constructor, sean válidas.", "impacto": "Mayor robustez." },
  { "mejora": "`setUpdatedAt` ahora puede aceptar una `Date` opcional.", "justificacion": "Permite setear `updatedAt` a un valor específico si es necesario (ej. al reconstruir una entidad desde persistencia con un `updatedAt` ya existente).", "impacto": "Mayor flexibilidad." },
  { "mejora": "Clarificación en JSDoc y comentarios.", "justificacion": "Mejora la comprensión del propósito y uso de la clase y sus métodos.", "impacto": "Mantenibilidad." },
  { "mejora": "Eliminada la validación `MAX_PROPS` de `validateProps` por ser muy situacional y potencialmente restrictiva.", "justificacion": "La necesidad de limitar el número de props es rara y puede ser manejada por entidades específicas si es necesario.", "impacto": "Menos restricciones innecesarias." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "La validación de formato de `id` (UUID) se podría hacer aquí si se considera parte de la invariante de `EntityBase`, pero introduce una dependencia a `shvalidationschemas` o una regex. Se decidió mantenerla fuera por ahora, asumiendo que los IDs se generan correctamente." }
]
*/
// RUTA: libs/core/domain/shared-kernel/cdskentities/src/lib/entity.base.ts
