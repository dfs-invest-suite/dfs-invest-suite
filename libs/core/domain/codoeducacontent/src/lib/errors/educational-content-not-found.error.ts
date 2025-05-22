// RUTA: libs/core/domain/codoeducacontent/src/lib/errors/educational-content-not-found.error.ts
import { NotFoundException } from '@dfs-suite/sherrors';
import { EducationalContentId, Maybe, CorrelationId } from '@dfs-suite/shtypes';

export const EDUCATIONAL_CONTENT_NOT_FOUND_ERROR_CODE =
  'EDUCA_CONTENT.CONTENT_NOT_FOUND';

export class EducationalContentNotFoundError extends NotFoundException {
  constructor(
    identifier: EducationalContentId | string, // Puede ser ID o slug
    cause?: Maybe<Error | unknown>,
    correlationId?: Maybe<CorrelationId>
  ) {
    super(
      `Educational content with identifier "${String(identifier)}" not found.`,
      cause,
      { identifier: String(identifier) },
      correlationId
    );
    this.code = EDUCATIONAL_CONTENT_NOT_FOUND_ERROR_CODE;
  }
}
// RUTA: libs/core/domain/codoeducacontent/src/lib/errors/educational-content-not-found.error.ts
