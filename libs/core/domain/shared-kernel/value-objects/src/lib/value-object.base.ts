// libs/core/domain/shared-kernel/value-objects/src/lib/value-object.base.ts
import { ArgumentNotProvidedException } from '@dfs-suite/shared-errors';
import { Maybe } from '@dfs-suite/shared-types';
import { Guard } from '@dfs-suite/shared-utils';

export type Primitives = string | number | boolean;
export interface IDomainPrimitive<T extends Primitives | Date> {
  value: T;
}

type ValueObjectPropsType<P> = P extends Primitives | Date ? IDomainPrimitive<P> : P;

export abstract class ValueObject<TProps> {
  protected readonly props: Readonly<ValueObjectPropsType<TProps>>;

  constructor(props: ValueObjectPropsType<TProps>) {
    this.checkIfEmpty(props);
    this.validate(props);
    this.props = Object.freeze(props);
  }

  protected abstract validate(props: ValueObjectPropsType<TProps>): void;

  static isValueObject(obj: unknown): obj is ValueObject<unknown> {
    return obj instanceof ValueObject;
  }

  public equals(vo?: Maybe<ValueObject<TProps>>): boolean {
    if (Guard.isNil(vo)) {
      return false;
    }
    if (this.constructor.name !== vo.constructor.name) {
        return false;
    }
    return JSON.stringify(this.props) === JSON.stringify(vo.props);
  }

  public unpack(): TProps {
    if (this.isDomainPrimitive(this.props)) {
      return this.props.value;
    }

    const objectProps = this.props as Readonly<TProps>;
    const propsCopy = { ...objectProps };

    // Justificación para desactivar @typescript-eslint/no-unsafe-return:
    // TProps es el tipo genérico que representa la forma de las propiedades del VO.
    // Si no es un primitivo, this.props (después del casteo a Readonly<TProps>)
    // se copia superficialmente a propsCopy. El tipo de propsCopy es inferido como TProps.
    // Object.freeze devuelve Readonly<TProps>, pero la firma de unpack() es TProps.
    // Dado que la estructura de propsCopy coincide con TProps y el consumidor
    // de unpack() espera TProps, y el objetivo es devolver una copia inmutable de las props,
    // consideramos este casteo y retorno seguros en este contexto específico.
    // La regla es demasiado estricta con la combinación de genéricos, spread y Object.freeze.

    return Object.freeze(propsCopy); // Esta es aproximadamente la línea 71-73
  }

  private checkIfEmpty(props: ValueObjectPropsType<TProps>): void {
    if (
      Guard.isEmpty(props) ||
      (this.isDomainPrimitive(props) && Guard.isEmpty(props.value))
    ) {
      throw new ArgumentNotProvidedException(
        `${this.constructor.name} props cannot be empty`,
      );
    }
  }

  private isDomainPrimitive(
    obj: unknown,
  ): obj is IDomainPrimitive<TProps & (Primitives | Date)> {
     
    return typeof obj === 'object' && obj !== null && Object.prototype.hasOwnProperty.call(obj, 'value');
  }
}

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota estratégica 1 (DEUDA TÉCNICA - 2025-05-11): El método `unpack()` actualmente tiene la regla de ESLint `@typescript-eslint/no-unsafe-return` desactivada mediante un comentario `eslint-disable-next-line`. Aunque se considera que el retorno es seguro en este contexto (devolviendo una copia congelada de TProps), ESLint/TypeScript infiere un tipo 'any' o 'unknown' que dispara la regla. Investigar en el futuro una forma más elegante de tipar la copia `propsCopy` o la devolución de `Object.freeze` para satisfacer esta regla sin desactivarla, o confirmar si la desactivación es la solución más pragmática a largo plazo para este patrón específico con genéricos. El error actual es: "Unsafe return of a value of type `any`  @typescript-eslint/no-unsafe-return".
]
*/
