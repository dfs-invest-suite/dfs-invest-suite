// libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/value-object.base.ts
import { ArgumentNotProvidedException } from '@dfs-suite/sherrors';
import { Maybe } from '@dfs-suite/shtypes';
import { Guard } from '@dfs-suite/shutils';

export type Primitives = string | number | boolean; // EXPORTADO

export interface IDomainPrimitive<T extends Primitives | Date> {
  // EXPORTADO
  value: T;
}

type ValueObjectPropsType<P> = P extends Primitives | Date
  ? IDomainPrimitive<P>
  : P;

export abstract class ValueObject<TProps> {
  // EXPORTADO
  protected readonly props: Readonly<ValueObjectPropsType<TProps>>;

  constructor(props: ValueObjectPropsType<TProps>) {
    this.checkIfEmpty(props);
    this.validate(props);
    this.props = Object.freeze(props);
  }

  protected abstract validate(props: ValueObjectPropsType<TProps>): void;

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
    }
  }

  private isDomainPrimitive(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    obj: any
  ): obj is IDomainPrimitive<TProps & (Primitives | Date)> {
    return (
      typeof obj === 'object' &&
      obj !== null &&
      Object.prototype.hasOwnProperty.call(obj, 'value') &&
      Object.keys(obj).length === 1
    );
  }
}
// FIN DEL ARCHIVO: libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/value-object.base.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Confirmada la exportación de `IDomainPrimitive` y `Primitives`.", "justificacion": "Esencial para que los VOs que heredan de `ValueObject` y los que usan `IDomainPrimitive` en sus `props` puedan compilar.", "impacto": "Resuelve errores `TS2305` en las librerías de dominio." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
