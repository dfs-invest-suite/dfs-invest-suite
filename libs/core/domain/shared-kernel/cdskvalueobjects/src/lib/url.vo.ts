// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/url.vo.ts
// Autor: L.I.A Legacy (IA Asistente)
import { ArgumentInvalidException } from '@dfs-suite/sherrors';
import { UrlString as UrlStringType } from '@dfs-suite/shtypes';
import { UrlSchema } from '@dfs-suite/shvalidationschemas';

import { ValueObject, IDomainPrimitive } from './value-object.base';

export class UrlVO extends ValueObject<UrlStringType> {
  protected constructor(props: IDomainPrimitive<UrlStringType>) {
    super(props);
  }

  get value(): UrlStringType {
    return this.props.value;
  }

  protected validate(props: IDomainPrimitive<UrlStringType>): void {
    const parseResult = UrlSchema.safeParse(props.value);
    if (!parseResult.success) {
      const firstError = parseResult.error.errors[0]?.message;
      throw new ArgumentInvalidException(
        firstError || `Invalid URL format: "${props.value}".`
      );
    }
  }

  public static create(url: string): UrlVO {
    // Zod ya trimea en UrlSchema si se define así.
    return new UrlVO({ value: url as UrlStringType });
  }
}
// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/url.vo.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Implementación de `UrlVO` usando `UrlSchema` de Zod para validación.", "justificacion": "Encapsula la lógica de validación de URL.", "impacto": "VO funcional para URLs." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
