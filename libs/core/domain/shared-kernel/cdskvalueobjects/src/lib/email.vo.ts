// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/email.vo.ts
// Autor: L.I.A Legacy (IA Asistente)
import { ArgumentInvalidException } from '@dfs-suite/sherrors';
import { EmailString as EmailStringType } from '@dfs-suite/shtypes';
import { EmailSchema } from '@dfs-suite/shvalidationschemas';

import { ValueObject, IDomainPrimitive } from './value-object.base';

export class EmailVO extends ValueObject<EmailStringType> {
  protected constructor(props: IDomainPrimitive<EmailStringType>) {
    super(props);
  }

  get value(): EmailStringType {
    return this.props.value;
  }

  protected validate(props: IDomainPrimitive<EmailStringType>): void {
    const parseResult = EmailSchema.safeParse(props.value);
    if (!parseResult.success) {
      // Usar el primer error de Zod o un mensaje genérico
      const firstError = parseResult.error.errors[0]?.message;
      throw new ArgumentInvalidException(
        firstError || `Invalid email format: "${props.value}".`
      );
    }
  }

  public static create(email: string): EmailVO {
    const trimmedLowerEmail = email.trim().toLowerCase();
    return new EmailVO({ value: trimmedLowerEmail as EmailStringType });
  }
}
// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/email.vo.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Implementación de `EmailVO` usando `EmailSchema` de Zod para validación.", "justificacion": "Encapsula la lógica de validación de email y asegura el uso de un tipo Branded.", "impacto": "VO funcional y robusto para emails." },
  { "mejora": "Transformación a minúsculas y trim en el método factory `create`.", "justificacion": "Normaliza los emails para consistencia.", "impacto": "Almacenamiento y comparación de emails más fiables." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
