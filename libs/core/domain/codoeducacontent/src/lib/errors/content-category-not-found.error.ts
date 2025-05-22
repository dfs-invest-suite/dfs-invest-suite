// RUTA: libs/core/domain/codoeducacontent/src/lib/errors/content-category-not-found.error.ts
import { NotFoundException } from '@dfs-suite/sherrors';
import { ContentCategoryId, Maybe, CorrelationId } from '@dfs-suite/shtypes';

export const CONTENT_CATEGORY_NOT_FOUND_ERROR_CODE =
  'EDUCA_CONTENT.CATEGORY_NOT_FOUND';

export class ContentCategoryNotFoundError extends NotFoundException {
  constructor(
    identifier: ContentCategoryId | string, // Puede ser ID o slug/nombre
    cause?: Maybe<Error | unknown>,
    correlationId?: Maybe<CorrelationId>
  ) {
    super(
      `Content category with identifier "${String(identifier)}" not found.`,
      cause,
      { identifier: String(identifier) },
      correlationId
    );
    this.code = CONTENT_CATEGORY_NOT_FOUND_ERROR_CODE;
  }
}
// RUTA: libs/core/domain/codoeducacontent/src/lib/errors/content-category-not-found.error.ts
