// libs/core/domain/shared-kernel/commands-queries/src/lib/query-handler.interface.ts
import { ExceptionBase } from '@dfs-suite/shared-errors';
import { Result } from '@dfs-suite/shared-result';

import { IQuery } from './query.interface';

export interface IQueryHandler<Q extends IQuery, R> {
  execute(query: Q): Promise<Result<R, ExceptionBase | Error>>;
}
