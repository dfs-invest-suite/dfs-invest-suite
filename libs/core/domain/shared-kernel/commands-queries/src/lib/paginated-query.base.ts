// libs/core/domain/shared-kernel/commands-queries/src/lib/paginated-query.base.ts
import { QueryBase } from './query.base';
import { IPaginatedQueryParams, Maybe } from '@dfs-suite/shared-types';
import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT } from '@dfs-suite/shared-constants';
import { ICommandMetadata } from './command.interface';

export type OrderBy<TFields extends string> = { field: TFields | 'createdAt' | 'updatedAt'; direction: 'asc' | 'desc' };

export abstract class PaginatedQueryBase<TOrderByFields extends string = string> extends QueryBase {
  readonly limit: number;
  readonly page: number;
  readonly offset: number;
  readonly orderBy: Maybe<OrderBy<TOrderByFields>>;

  constructor(params: Partial<IPaginatedQueryParams & { orderBy?: OrderBy<TOrderByFields> }>, metadata?: Partial<ICommandMetadata>) {
    super(metadata);
    this.page = params.page || DEFAULT_PAGE;
    this.limit = params.limit || DEFAULT_PAGE_LIMIT;
    this.offset = params.offset ?? (this.page -1) * this.limit; // Asumiendo page es 1-based
    this.orderBy = params.sortBy && params.sortOrder
      ? { field: params.sortBy as TOrderByFields, direction: params.sortOrder }
      : undefined;
  }
}
