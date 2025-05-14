// libs/core/domain/shared-kernel/commands-queries/src/lib/metadata.factory.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import { UuidUtils, Guard } from '@dfs-suite/shared-utils';
import {
  IsoDateString,
  // CorrelationId, // No se usa directamente en las firmas, se infiere o se usa de InputMetadata
  // Maybe,
  // UserId,
  // CommandInstanceId,
  // DomainEventInstanceId,
} from '@dfs-suite/shared-types';
import { ICommandMetadata } from './command.interface';
import { IQueryMetadata } from './query.interface';
import { ArgumentInvalidException } from '@dfs-suite/shared-errors';
import { IsoDateStringSchema } from '@dfs-suite/shared-validation-schemas';

type InputMetadata = Partial<ICommandMetadata | IQueryMetadata>;
type OutputMetadata = ICommandMetadata;

export function createOperationMetadata(providedMetadata?: InputMetadata): Readonly<OutputMetadata> {
  const providedCorrelationId = providedMetadata?.correlationId;
  const effectiveCorrelationId =
    !Guard.isNil(providedCorrelationId) && !Guard.isEmpty(providedCorrelationId)
      ? providedCorrelationId
      : UuidUtils.generateCorrelationId();

  const providedUserId = providedMetadata?.userId;
  if (!Guard.isNil(providedUserId) && Guard.isEmpty(providedUserId)) {
    throw new ArgumentInvalidException(
      'Metadata.userId, if provided, cannot be an empty string.',
      undefined,
      { field: 'userId', providedValue: providedUserId }
    );
  }

  let effectiveTimestamp: IsoDateString;
  if (providedMetadata?.timestamp) {
    const parseResult = IsoDateStringSchema.safeParse(providedMetadata.timestamp);
    if (!parseResult.success) {
      throw new ArgumentInvalidException(
        `Provided metadata.timestamp '${String(providedMetadata.timestamp)}' is not a valid ISO8601 date string.`,
        undefined,
        { field: 'timestamp', providedValue: String(providedMetadata.timestamp), zodErrors: parseResult.error.format() }
      );
    }
    effectiveTimestamp = parseResult.data as unknown as IsoDateString;
  } else {
    effectiveTimestamp = new Date().toISOString() as unknown as IsoDateString;
  }

  const providedCausationId = providedMetadata?.causationId;
  if (!Guard.isNil(providedCausationId) && Guard.isEmpty(providedCausationId as string)) {
      throw new ArgumentInvalidException(
          'Metadata.causationId, if provided, cannot be an empty string.',
          undefined,
          { field: 'causationId', providedValue: providedCausationId }
      );
  }

  return Object.freeze({
    correlationId: effectiveCorrelationId,
    causationId: providedCausationId,
    timestamp: effectiveTimestamp,
    userId: providedUserId,
  });
}
// libs/core/domain/shared-kernel/commands-queries/src/lib/metadata.factory.ts
/* SECCIÓN DE MEJORAS

[
  Mejora Aplicada: Imports no utilizados eliminados para `CorrelationId`, `Maybe`, `UserId`,
                  `CommandInstanceId`, `DomainEventInstanceId` ya que se accede a ellos
                  a través de `InputMetadata` o son tipos de retorno/propiedades.
]

*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA (Se mantienen las anteriores) */
/* SECCIÓN DE MEJORAS

[
  Mejora Aplicada (TS2352): Se utilizó el doble cast `as unknown as IsoDateString` para
                           resolver el error de asignación con el tipo brandeado devuelto por
                           el schema Zod `IsoDateStringSchema` y para el `new Date().toISOString()`.
                           Esto indica a TypeScript que estamos seguros de la compatibilidad del tipo.
]

*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA

[
  Nota 1: El doble cast es una solución común cuando se trabaja con Branded Types
          y la inferencia de tipos de librerías externas como Zod no coincide exactamente
          con la estructura de la marca (ej. `__zodBrand` vs. `__brand`).
]
*/
/* SECCIÓN DE MEJORAS

[
  Mejora Aplicada (TS2322): Se usa un cast explícito `parseResult.data as IsoDateString`.
                           Esto le dice a TypeScript que confiamos en que el tipo devuelto por
                           el schema Zod brandeado es compatible con nuestro Branded Type `IsoDateString`.
                           Esto es común cuando se mezclan inferencias de Zod con Branded Types definidos manualmente,
                           ya que las propiedades internas (`__zodBrand` vs `__brand`) pueden ser diferentes aunque
                           el concepto sea el mismo.
]
[
  Mejora Aplicada: Imports no utilizados eliminados.
]

*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota 1: El cast `as IsoDateString` es una solución pragmática. Una solución más "pura"
          implicaría asegurar que `z.infer<typeof IsoDateStringSchema>` sea estructuralmente
          idéntico a `IsoDateString`, lo cual puede ser difícil si Zod usa una propiedad de marca
          diferente a `__brand`.
]
*/
/* SECCIÓN DE MEJORAS

[
  Mejora Aplicada (TS2322): Se usa un cast explícito `parseResult.data as IsoDateString`.
                           Esto le dice a TypeScript que confiamos en que el tipo devuelto por
                           el schema Zod brandeado es compatible con nuestro Branded Type `IsoDateString`.
                           Esto es común cuando se mezclan inferencias de Zod con Branded Types definidos manualmente,
                           ya que las propiedades internas (`__zodBrand` vs `__brand`) pueden ser diferentes aunque
                           el concepto sea el mismo.
]
[
  Mejora Aplicada: Imports no utilizados eliminados.
]

*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota 1: El cast `as IsoDateString` es una solución pragmática. Una solución más "pura"
          implicaría asegurar que `z.infer<typeof IsoDateStringSchema>` sea estructuralmente
          idéntico a `IsoDateString`, lo cual puede ser difícil si Zod usa una propiedad de marca
          diferente a `__brand`.
]
*/
// libs/core/domain/shared-kernel/commands-queries/src/lib/metadata.factory.ts
/* SECCIÓN DE MEJORAS

[
  Mejora Aplicada: Imports no utilizados eliminados.
]
[
  Mejora Aplicada: En la metadata de `ArgumentInvalidException`, se usa `providedValue` en lugar de `providedUserId`,
                  `providedTimestamp`, etc. para estandarizar un poco.
]
[
  Mejora Potencial: Si `IsoDateStringSchema` está bien definido para retornar `IsoDateString` (un `Brand<string, 'IsoDateString'>`),
                   el cast `as IsoDateString` en `parseResult.data` podría no ser necesario. Se asume que el schema Zod ya
                   hace el "branding" o que `z.datetime()` más `.brand()` lo maneja.
]

*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota 1: Si `IQueryMetadata` y `ICommandMetadata` divergen significativamente en el futuro,
          esta factoría `createOperationMetadata` podría necesitar ser más específica o tener sobrecargas
          para manejar los diferentes tipos de `OutputMetadata`. Por ahora, con `ICommandMetadata`
          como base para `OutputMetadata` (ya que contiene todos los campos comunes), es funcional.
]
*/
