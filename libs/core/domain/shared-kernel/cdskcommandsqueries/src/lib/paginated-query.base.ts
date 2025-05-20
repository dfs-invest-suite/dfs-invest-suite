// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/paginated-query.base.ts
import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT } from '@dfs-suite/shconstants';
import { IPaginatedQueryParams, Maybe } from '@dfs-suite/shtypes';

import { QueryBase } from './query.base';
import { IQueryMetadata } from './query.interface';

export type OrderBy<TFields extends string> = {
  field: TFields | 'createdAt' | 'updatedAt';
  direction: 'asc' | 'desc';
};

export abstract class PaginatedQueryBase<
  TOrderByFields extends string = string
> extends QueryBase {
  readonly limit: number;
  readonly page: number;
  readonly offset: number;
  readonly orderBy: Maybe<OrderBy<TOrderByFields>>;

  constructor(
    params: Partial<
      IPaginatedQueryParams & { orderBy?: OrderBy<TOrderByFields> }
    > = {},
    metadata?: Partial<IQueryMetadata>
  ) {
    super(metadata);
    this.page = params.page || DEFAULT_PAGE;
    this.limit = params.limit || DEFAULT_PAGE_LIMIT;
    this.offset = params.offset ?? (this.page - 1) * this.limit;
    this.orderBy =
      params.sortBy && params.sortOrder
        ? {
            field: params.sortBy as TOrderByFields, // Cast es necesario si sortBy puede ser más genérico
            direction: params.sortOrder,
          }
        : undefined;
  }
}
// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/paginated-query.base.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorizados los imports para usar los alias codificados.", "justificacion": "Consistencia y resolución de módulos.", "impacto": "Estabilidad."}
]
*/
