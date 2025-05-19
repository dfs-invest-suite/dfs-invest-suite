// RUTA: libs/shared/utils/src/lib/metadata.factory.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import { ArgumentInvalidException } from '@dfs-suite/shared-errors';
import {
  CommandInstanceId,
  CorrelationId,
  DomainEventInstanceId,
  IsoDateString,
  Maybe,
  UserId,
} from '@dfs-suite/shared-types';
import { IsoDateStringSchema } from '@dfs-suite/shared-validation-schemas';
import { Guard } from './guard'; // Importar Guard localmente
import { UuidUtils } from './uuid.utils'; // Importar UuidUtils localmente

// Interfaces genéricas para la metadata de entrada y salida.
// Se podrían definir en shared-types si se usan en más sitios.
interface IOperationMetadataInput {
  readonly correlationId?: Maybe<CorrelationId>;
  readonly causationId?: Maybe<
    CorrelationId | CommandInstanceId | DomainEventInstanceId
  >;
  readonly userId?: Maybe<UserId>;
  readonly timestamp?: Maybe<IsoDateString>;
}

// Esta es la forma de la metadata que la factoría produce.
// Coincide con ICommandMetadata e IQueryMetadata (y IDomainEventMetadata).
export interface IOperationMetadataOutput {
  readonly correlationId: CorrelationId;
  readonly causationId?: Maybe<
    CorrelationId | CommandInstanceId | DomainEventInstanceId
  >;
  readonly userId?: Maybe<UserId>;
  readonly timestamp: IsoDateString;
}

export function createOperationMetadata(
  providedMetadata?: IOperationMetadataInput
): Readonly<IOperationMetadataOutput> {
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
    const parseResult = IsoDateStringSchema.safeParse(
      providedMetadata.timestamp
    );
    if (!parseResult.success) {
      throw new ArgumentInvalidException(
        `Provided metadata.timestamp '${String(
          providedMetadata.timestamp
        )}' is not a valid ISO8601 date string.`,
        undefined,
        {
          field: 'timestamp',
          providedValue: String(providedMetadata.timestamp),
          zodErrors: parseResult.error.format(),
        }
      );
    }
    effectiveTimestamp = parseResult.data as unknown as IsoDateString;
  } else {
    effectiveTimestamp = new Date().toISOString() as unknown as IsoDateString;
  }

  const providedCausationId = providedMetadata?.causationId;
  if (
    !Guard.isNil(providedCausationId) &&
    Guard.isEmpty(providedCausationId as string) // causationId puede ser de varios tipos brandeados
  ) {
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
// RUTA: libs/shared/utils/src/lib/metadata.factory.ts
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Definición de `IOperationMetadataInput` y `IOperationMetadataOutput`",
    "justificacion": "Se definieron interfaces locales para la entrada y salida de la factoría. Esto desacopla la factoría de las interfaces específicas de `ICommandMetadata`, `IQueryMetadata`, `IDomainEventMetadata` de `commands-queries` y `events`, aunque estructuralmente sean idénticas por ahora. Facilita que la factoría resida en `shared-utils` sin depender de `commands-queries` o `events`.",
    "impacto": "Mayor desacoplamiento. Las clases base (`CommandBase`, etc.) castearán el resultado de esta factoría a su tipo de metadata específico si es necesario, o se asegurará la compatibilidad estructural."
  },
  {
    "mejora": "Importaciones locales de `Guard` y `UuidUtils`",
    "justificacion": "Para asegurar que la factoría use las utilidades de su propia librería.",
    "impacto": "Claridad y consistencia."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Las interfaces `IOperationMetadataInput` y `IOperationMetadataOutput` podrían moverse a `shared-types` si se determina que son útiles en otros contextos más allá de esta factoría."
  }
]
*/
