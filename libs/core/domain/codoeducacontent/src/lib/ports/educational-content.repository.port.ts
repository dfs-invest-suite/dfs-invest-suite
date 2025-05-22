// RUTA: libs/core/domain/codoeducacontent/src/lib/ports/educational-content.repository.port.ts
import { IRepositoryPort } from '@dfs-suite/cdskports';
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import {
  EducationalContentId,
  ContentCategoryId,
  Maybe,
  IPaginatedQueryParams,
  IPaginated,
} from '@dfs-suite/shtypes';

import {
  EducationalContentEntity,
  EducationalContentProps,
} from '../entities/educational-content.entity';

export const EDUCATIONAL_CONTENT_REPOSITORY_PORT = Symbol(
  'IEducationalContentRepositoryPort'
);

export interface IEducationalContentRepository
  extends IRepositoryPort<
    EducationalContentProps,
    EducationalContentId,
    EducationalContentEntity
  > {
  findAllPublishedPaginated(
    params: IPaginatedQueryParams,
    filters?: { categoryId?: Maybe<ContentCategoryId>; tags?: Maybe<string[]> }
  ): Promise<Result<IPaginated<EducationalContentEntity>, ExceptionBase>>;

  findAllByCategoryId(
    categoryId: ContentCategoryId,
    params: IPaginatedQueryParams
  ): Promise<Result<IPaginated<EducationalContentEntity>, ExceptionBase>>;

  findBySlug(
    slug: string
  ): Promise<Result<Maybe<EducationalContentEntity>, ExceptionBase>>;
}
// RUTA: libs/core/domain/codoeducacontent/src/lib/ports/educational-content.repository.port.ts
