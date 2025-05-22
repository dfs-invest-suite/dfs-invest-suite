// RUTA: libs/shared/shutils/src/lib/metadata.factory.ts
import {
  ArgumentInvalidException,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import {
  CausationId,
  CommandInstanceId,
  CorrelationId,
  DomainEventInstanceId,
  IsoDateString,
  Maybe,
  UserId,
} from '@dfs-suite/shtypes';
import { IsoDateStringSchema } from '@dfs-suite/shvalidationschemas';

import { Guard } from './guard'; // Importación local
import { UuidUtils } from './uuid.utils'; // Importación local

export interface IOperationMetadataInput {
  readonly correlationId?: Maybe<CorrelationId>;
  readonly causationId?: Maybe<
    CausationId | CommandInstanceId | DomainEventInstanceId | CorrelationId
  >;
  readonly userId?: Maybe<UserId>;
  readonly timestamp?: Maybe<IsoDateString | Date>;
}

export interface IOperationMetadataOutput {
  readonly correlationId: CorrelationId;
  readonly causationId?: Maybe<
    CausationId | CommandInstanceId | DomainEventInstanceId | CorrelationId
  >;
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
      undefined, // cause
      { field: 'userId', providedValue: providedUserId }
    );
  }

  let effectiveTimestamp: IsoDateString;
  if (providedMetadata?.timestamp) {
    if (providedMetadata.timestamp instanceof Date) {
      if (Guard.isValidDate(providedMetadata.timestamp)) {
        const isoString = providedMetadata.timestamp.toISOString();
        const parseResult = IsoDateStringSchema.safeParse(isoString);
        if (!parseResult.success) {
          // Esto no debería pasar si toISOString() es correcto, pero por seguridad
          throw new ArgumentInvalidException(
            `Failed to parse date from Date object "${isoString}" to IsoDateString via Zod.`,
            parseResult.error,
            { field: 'timestamp', providedValue: providedMetadata.timestamp }
          );
        }
        effectiveTimestamp = parseResult.data as unknown as IsoDateString;
      } else {
        throw new ArgumentInvalidException(
          'Provided metadata.timestamp (Date object) is an invalid Date.',
          undefined, // cause
          { field: 'timestamp', providedValue: providedMetadata.timestamp }
        );
      }
    } else {
      // Es un string
      const parseResult = IsoDateStringSchema.safeParse(
        providedMetadata.timestamp
      );
      if (!parseResult.success) {
        throw new ArgumentInvalidException(
          `Provided metadata.timestamp string '${String(
            providedMetadata.timestamp
          )}' is not a valid ISO8601 date string.`,
          undefined, // cause
          {
            field: 'timestamp',
            providedValue: String(providedMetadata.timestamp),
            zodErrors: parseResult.error.format(),
          }
        );
      }
      effectiveTimestamp = parseResult.data as unknown as IsoDateString;
    }
  } else {
    const nowIso = new Date().toISOString();
    const parseResult = IsoDateStringSchema.safeParse(nowIso);
    if (!parseResult.success) {
      // Esto es muy improbable
      throw new InternalServerErrorException(
        `Failed to parse current date "${nowIso}" to IsoDateString via Zod. This should not happen.`,
        parseResult.error // cause
      );
    }
    effectiveTimestamp = parseResult.data as unknown as IsoDateString;
  }

  const providedCausationId = providedMetadata?.causationId;
  if (
    !Guard.isNil(providedCausationId) &&
    Guard.isEmpty(providedCausationId as string) // Cast a string para Guard.isEmpty
  ) {
    throw new ArgumentInvalidException(
      'Metadata.causationId, if provided, cannot be an empty string.',
      undefined, // cause
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
// FIN DEL ARCHIVO: libs/shared/shutils/src/lib/metadata.factory.ts
