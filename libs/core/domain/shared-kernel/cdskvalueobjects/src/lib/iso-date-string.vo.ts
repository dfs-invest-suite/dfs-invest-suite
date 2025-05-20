// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/iso-date-string.vo.ts
// TODO: [LIA Legacy - Implementar IsoDateStringVO] - ¡REVISADO Y REFACTORIZADO!
// Propósito: Value Object para representar y validar una cadena de fecha en formato ISO 8601.
// Relacionado con Casos de Uso: Timestamps en entidades, DTOs, eventos.

import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
} from '@dfs-suite/sherrors'; // REFACTORIZADO
import { IsoDateString as IsoDateStringType } from '@dfs-suite/shtypes'; // REFACTORIZADO
import { Guard } from '@dfs-suite/shutils'; // REFACTORIZADO
import { IsoDateStringSchema } from '@dfs-suite/shvalidationschemas'; // REFACTORIZADO

import { ValueObject, IDomainPrimitive } from './value-object.base'; // OK (relativo interno)

// La regex de ISO 8601 es útil para una primera pasada, pero Zod es más robusto.
// const ISO_8601_REGEX = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(Z|([+-]\d{2}(:?\d{2})?))$/;

export class IsoDateStringVO extends ValueObject<IsoDateStringType> {
  // ValueObjectBase maneja el tipo de props internamente como IDomainPrimitive<IsoDateStringType>
  // porque IsoDateStringType (Brand<string, 'IsoDateString'>) es esencialmente un string primitivo.
  protected constructor(props: IDomainPrimitive<IsoDateStringType>) {
    super(props);
  }

  get value(): IsoDateStringType {
    return this.props.value;
  }

  protected validate(props: IDomainPrimitive<IsoDateStringType>): void {
    // La validación de que props.value no es nil/empty ya la hace ValueObjectBase.checkIfEmpty.
    // Aquí validamos el formato específico.
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
    // Zod datetime() ya valida que sea una fecha parseable, por lo que new Date() / isNaN() es redundante.
  }

  public static create(isoDateString: string): IsoDateStringVO {
    // Se hace un cast a IsoDateStringType después de la validación en el constructor.
    // La validación principal ocurre en `validate`.
    return new IsoDateStringVO({ value: isoDateString as IsoDateStringType });
  }

  public static fromDate(dateObject: Date): IsoDateStringVO {
    if (Guard.isNil(dateObject) || !Guard.isValidDate(dateObject)) {
      throw new ArgumentInvalidException(
        'A valid Date object must be provided to create IsoDateStringVO from Date.'
      );
    }
    const isoString = dateObject.toISOString() as IsoDateStringType;
    return new IsoDateStringVO({ value: isoString });
  }

  public toDate(): Date {
    // El constructor ya validó que es un string ISO parseable.
    return new Date(this.props.value);
  }
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorización de imports a alias codificados.", "justificacion": "Alineación.", "impacto": "Resolución." },
  { "mejora": "Uso de `IsoDateStringSchema` de Zod para la validación principal.", "justificacion": "`z.string().datetime()` es más robusto que una regex simple o `new Date().isNaN()` para validar el formato ISO 8601 y que sea una fecha válida.", "impacto": "Validación más confiable y precisa." },
  { "mejora": "Simplificación de la validación en `validate`.", "justificacion": "Se delega la mayor parte de la validación de formato a Zod. La validación de nil/empty ya la hace `ValueObjectBase`.", "impacto": "Menos código, más robustez." },
  { "mejora": "Ajuste en `fromDate` para usar `Guard.isValidDate`.", "justificacion": "Validación más clara de la fecha de entrada.", "impacto": "Robustez." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Este VO ahora confía fuertemente en `IsoDateStringSchema` (Zod) para la validación. Si ese schema cambia, el comportamiento de este VO también lo hará." }
]
*/
// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/iso-date-string.vo.ts
