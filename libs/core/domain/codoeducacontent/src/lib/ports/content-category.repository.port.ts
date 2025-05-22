// RUTA: libs/core/domain/codoeducacontent/src/lib/ports/content-category.repository.port.ts
import { IRepositoryPort } from '@dfs-suite/cdskports';
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import { ContentCategoryId, Maybe } from '@dfs-suite/shtypes';

import {
  ContentCategoryEntity,
  ContentCategoryProps,
} from '../entities/content-category.entity';

export const CONTENT_CATEGORY_REPOSITORY_PORT = Symbol(
  'IContentCategoryRepositoryPort'
);

export interface IContentCategoryRepository
  extends IRepositoryPort<
    ContentCategoryProps,
    ContentCategoryId,
    ContentCategoryEntity
  > {
  findByName(
    name: string
  ): Promise<Result<Maybe<ContentCategoryEntity>, ExceptionBase>>;
  findBySlug(
    slug: string
  ): Promise<Result<Maybe<ContentCategoryEntity>, ExceptionBase>>;
  findAllActive(): Promise<Result<ContentCategoryEntity[], ExceptionBase>>;
}
// RUTA: libs/core/domain/codoeducacontent/src/lib/ports/content-category.repository.port.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `IContentCategoryRepositoryPort`.", "justificacion": "Contrato para persistencia de categorías de contenido.", "impacto": "Separación de concerns." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
