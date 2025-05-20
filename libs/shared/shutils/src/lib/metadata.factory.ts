// RUTA: libs/shared/shutils/src/lib/metadata.factory.ts
// TODO: [LIA Legacy - Corregir uso de InternalError] - ¡REALIZADO!
// Propósito: Factoría para crear objetos de metadata consistentes para Comandos, Queries y Eventos.
// Relacionado con Casos de Uso: Utilizado por las clases base de Comandos, Queries y Eventos.

import { ArgumentInvalidException, InternalServerErrorException } from '@dfs-suite/sherrors'; // AÑADIDO InternalServerErrorException
import {
  CommandInstanceId, CorrelationId, DomainEventInstanceId, IsoDateString,
  Maybe, UserId, CausationId,
} from '@dfs-suite/shtypes';
import { IsoDateStringSchema } from '@dfs-suite/shvalidationschemas';

import { Guard } from './guard';
import { UuidUtils } from './uuid.utils';

export interface IOperationMetadataInput {
  readonly correlationId?: Maybe<CorrelationId>;
  readonly causationId?: Maybe<CausationId | CommandInstanceId | DomainEventInstanceId | CorrelationId>;
  readonly userId?: Maybe<UserId>;
  readonly timestamp?: Maybe<IsoDateString | Date>;
}

export interface IOperationMetadataOutput {
  readonly correlationId: CorrelationId;
  readonly causationId?: Maybe<CausationId | CommandInstanceId | DomainEventInstanceId | CorrelationId>;
  readonly userId?: Maybe<UserId>;
  readonly timestamp: IsoDateString;
}

export function createOperationMetadata(
  providedMetadata?: IOperationMetadataInput
): Readonly<IOperationMetadataOutput> {
  const providedCorrelationId = providedMetadata?.correlationId;
  const effectiveCorrelationId: CorrelationId =
    !Guard.isNil(providedCorrelationId) && !Guard.isEmpty(providedCorrelationId)
      ? providedCorrelationId
      : UuidUtils.generateCorrelationId();

  const providedUserId = providedMetadata?.userId;
  if (!Guard.isNil(providedUserId) && Guard.isEmpty(providedUserId)) {
    throw new ArgumentInvalidException(
      'Metadata.userId, if provided, cannot be an empty string.',
      undefined, { field: 'userId', providedValue: providedUserId }
    );
  }

  let effectiveTimestamp: IsoDateString;
  if (providedMetadata?.timestamp) {
    if (providedMetadata.timestamp instanceof Date) {
      if (Guard.isValidDate(providedMetadata.timestamp)) {
        const parseResult = IsoDateStringSchema.safeParse(providedMetadata.timestamp.toISOString());
        if (!parseResult.success) {
          throw new ArgumentInvalidException(
            'Failed to parse date from Date object to IsoDateString via Zod.',
            parseResult.error,
            { field: 'timestamp', providedValue: providedMetadata.timestamp }
          );
        }
        effectiveTimestamp = parseResult.data;
      } else {
        throw new ArgumentInvalidException(
          'Provided metadata.timestamp (Date object) is an invalid Date.',
          undefined, { field: 'timestamp', providedValue: providedMetadata.timestamp }
        );
      }
    } else {
      const parseResult = IsoDateStringSchema.safeParse(providedMetadata.timestamp);
      if (!parseResult.success) {
        throw new ArgumentInvalidException(
          `Provided metadata.timestamp string '${String(providedMetadata.timestamp)}' is not a valid ISO8601 date string.`,
          undefined, {
            field: 'timestamp',
            providedValue: String(providedMetadata.timestamp),
            zodErrors: parseResult.error.format(),
          }
        );
      }
      effectiveTimestamp = parseResult.data;
    }
  } else {
    const parseResult = IsoDateStringSchema.safeParse(new Date().toISOString());
    if (!parseResult.success) {
        // CORREGIDO: Usar InternalServerErrorException importada
        throw new InternalServerErrorException(
          'Failed to parse current date to IsoDateString via Zod. This should not happen.',
          parseResult.error // Pasar el error de Zod como causa
        );
    }
    effectiveTimestamp = parseResult.data;
  }

  const providedCausationId = providedMetadata?.causationId;
  if (!Guard.isNil(providedCausationId) && Guard.isEmpty(providedCausationId as string)) {
    throw new ArgumentInvalidException(
      'Metadata.causationId, if provided, cannot be an empty string.',
      undefined, { field: 'causationId', providedValue: providedCausationId }
    );
  }

  return Object.freeze({
    correlationId: effectiveCorrelationId,
    causationId: providedCausationId,
    timestamp: effectiveTimestamp,
    userId: providedUserId,
  });
}

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Uso de `InternalServerErrorException` en lugar de `InternalError`.", "justificacion": "Resuelve el error `eslint(no-undef)` ya que `InternalError` no es una clase de error estándar o definida en el proyecto. `InternalServerErrorException` de `@dfs-suite/sherrors` es la apropiada para este caso.", "impacto": "El código ahora es sintácticamente correcto y el linting para esta regla debería pasar." },
  { "mejora": "Pasar `parseResult.error` de Zod como causa a `InternalServerErrorException`.", "justificacion": "Proporciona más contexto de depuración si este caso improbable ocurriera.", "impacto": "Mejor trazabilidad de errores." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
// RUTA: libs/shared/shutils/src/lib/metadata.factory.ts
