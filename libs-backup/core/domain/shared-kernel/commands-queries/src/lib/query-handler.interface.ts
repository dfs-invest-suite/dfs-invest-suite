// libs/core/domain/shared-kernel/commands-queries/src/lib/query-handler.interface.ts
import { IQuery } from './query.interface';
import { Result } from '@dfs-suite/shared-result';
import { ExceptionBase } from '@dfs-suite/shared-errors';

export interface IQueryHandler<Q extends IQuery, R> {
  execute(query: Q): Promise<Result<R, ExceptionBase | Error>>;
}
