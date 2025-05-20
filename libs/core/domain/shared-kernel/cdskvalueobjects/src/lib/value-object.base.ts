// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/value-object.base.ts
import { ArgumentNotProvidedException } from '@dfs-suite/sherrors';
import { Maybe } from '@dfs-suite/shtypes';
import { Guard } from '@dfs-suite/shutils';

export type Primitives = string | number | boolean;
export interface IDomainPrimitive<T extends Primitives | Date> {
  value: T;
}
type ValueObjectPropsType<P> = P extends Primitives | Date
  ? IDomainPrimitive<P>
  : P;

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
    if (this === vo) {
      return true;
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
    return Object.freeze(propsCopy);
  }
  private checkIfEmpty(props: ValueObjectPropsType<TProps>): void {
    if (Guard.isNil(props)) {
      throw new ArgumentNotProvidedException(
        `${this.constructor.name} props cannot be null or undefined.`
      );
    }
    if (this.isDomainPrimitive(props)) {
      if (
        Guard.isNil(props.value) ||
        (typeof props.value === 'string' && Guard.isEmpty(props.value))
      ) {
        throw new ArgumentNotProvidedException(
          `${this.constructor.name} primitive value cannot be empty, null, or undefined.`
        );
      }
    } else if (
      typeof props === 'object' &&
      Object.keys(props as object).length === 0
    ) {
      /* Permitir objetos de props vacíos si la subclase lo valida */
    }
  }
  private isDomainPrimitive(
    obj: unknown
  ): obj is IDomainPrimitive<TProps & (Primitives | Date)> {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      Object.prototype.hasOwnProperty.call(obj, 'value') &&
      Object.keys(obj).length === 1
    );
  }
}
// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/value-object.base.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Confirmación de imports refactorizados.", "justificacion": "Uso de alias codificados.", "impacto": "Resolución correcta." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
