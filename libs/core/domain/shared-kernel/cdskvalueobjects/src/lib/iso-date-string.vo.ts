// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/iso-date-string.vo.ts
// Autor: L.I.A Legacy (IA Asistente)
import { ArgumentInvalidException } from '@dfs-suite/sherrors';
import { IsoDateString as IsoDateStringType } from '@dfs-suite/shtypes';
import { Guard } from '@dfs-suite/shutils';
import { IsoDateStringSchema } from '@dfs-suite/shvalidationschemas';

import { ValueObject, IDomainPrimitive } from './value-object.base';

export class IsoDateStringVO extends ValueObject<IsoDateStringType> {
  protected constructor(props: IDomainPrimitive<IsoDateStringType>) {
    super(props);
  }

  get value(): IsoDateStringType {
    return this.props.value;
  }

  protected validate(props: IDomainPrimitive<IsoDateStringType>): void {
    // La validación de nil/empty ya la hace ValueObjectBase.checkIfEmpty.
    const parseResult = IsoDateStringSchema.safeParse(props.value);
    if (!parseResult.success) {
      throw new ArgumentInvalidException(
        `Value "${
          props.value
        }" is not a valid ISO 8601 date string. Zod errors: ${JSON.stringify(
          parseResult.error.format()
        )}`
      );
    }
  }

  public static create(isoDateString: string): IsoDateStringVO {
    // El cast a IsoDateStringType es seguro después de la validación en el constructor.
    return new IsoDateStringVO({ value: isoDateString as IsoDateStringType });
  }

  public static fromDate(dateObject: Date): IsoDateStringVO {
    if (Guard.isNil(dateObject) || !Guard.isValidDate(dateObject)) {
      throw new ArgumentInvalidException(
        'A valid Date object must be provided to create IsoDateStringVO from Date.'
      );
    }
    const isoString = dateObject.toISOString() as IsoDateStringType;
    // La validación del formato ISO generado por toISOString() se hará en el constructor.
    return new IsoDateStringVO({ value: isoString });
  }

  public toDate(): Date {
    // El constructor ya validó que es un string ISO parseable.
    return new Date(this.props.value);
  }
}
// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/iso-date-string.vo.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorización de imports a alias codificados.", "justificacion": "Alineación con la nueva estructura.", "impacto": "Correcta resolución de módulos." },
  { "mejora": "Uso de `IsoDateStringSchema` de Zod para la validación principal en `validate`.", "justificacion": "Aprovecha la robustez de Zod para la validación de formato y semántica de fecha.", "impacto": "Validación más confiable." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
