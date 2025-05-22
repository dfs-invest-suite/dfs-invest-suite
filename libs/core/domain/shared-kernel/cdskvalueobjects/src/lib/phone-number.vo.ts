// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/phone-number.vo.ts
// Autor: L.I.A Legacy (IA Asistente)
import { ArgumentInvalidException } from '@dfs-suite/sherrors';
import { PhoneNumberString as PhoneNumberStringType } from '@dfs-suite/shtypes';
import { PhoneNumberSchema } from '@dfs-suite/shvalidationschemas';

import { ValueObject, IDomainPrimitive } from './value-object.base';

export class PhoneNumberVO extends ValueObject<PhoneNumberStringType> {
  protected constructor(props: IDomainPrimitive<PhoneNumberStringType>) {
    super(props);
  }

  get value(): PhoneNumberStringType {
    return this.props.value;
  }

  /**
   * El valor que se pasa aquí DEBE ser ya normalizado a E.164 por el schema Zod.
   */
  protected validate(props: IDomainPrimitive<PhoneNumberStringType>): void {
    const parseResult = PhoneNumberSchema.safeParse(props.value);
    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0]?.message;
      throw new ArgumentInvalidException(
        firstError ||
          `Invalid phone number format after normalization: "${props.value}". Expected E.164.`
      );
    }
  }

  /**
   * Crea una instancia de PhoneNumberVO.
   * El string de entrada será normalizado (eliminando no dígitos y añadiendo '+')
   * y luego validado contra el formato E.164 por el PhoneNumberSchema.
   * @param phoneNumber El número de teléfono en cualquier formato razonable.
   */
  public static create(phoneNumber: string): PhoneNumberVO {
    // La normalización y validación principal ocurre en PhoneNumberSchema.
    // Pasamos el string crudo al schema, que lo transforma y valida.
    const validationResult = PhoneNumberSchema.safeParse(phoneNumber);
    if (!validationResult.success) {
      const firstError = validationResult.error.errors[0]?.message;
      throw new ArgumentInvalidException(
        firstError || `Invalid input phone number: "${phoneNumber}".`
      );
    }
    // validationResult.data ya es el número normalizado y "brandeado"
    return new PhoneNumberVO({ value: validationResult.data });
  }
}
// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/phone-number.vo.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Implementación de `PhoneNumberVO` usando `PhoneNumberSchema` de Zod.", "justificacion": "Delega la lógica de normalización y validación de formato E.164 al schema Zod, que ya fue diseñado para ello.", "impacto": "VO funcional y robusto para números de teléfono." },
  { "mejora": "Clarificación en `validate` y `create`.", "justificacion": "Se enfatiza que `PhoneNumberSchema` ya realiza la normalización y validación principal.", "impacto": "Mejor comprensión." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
