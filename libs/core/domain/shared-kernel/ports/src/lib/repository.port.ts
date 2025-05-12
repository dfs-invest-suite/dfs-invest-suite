// libs/core/domain/shared-kernel/ports/src/lib/repository.port.ts
import { AggregateId, IPaginated, IPaginatedQueryParams, Maybe } from '@dfs-suite/shared-types';
import { AggregateRoot } from '@dfs-suite/core-domain-shared-kernel-entities';
import { Result } from '@dfs-suite/shared-result';
import { ExceptionBase } from '@dfs-suite/shared-errors';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IRepositoryPort<Aggregate extends AggregateRoot<any>> {
  findOneById(id: AggregateId): Promise<Result<Maybe<Aggregate>, ExceptionBase | Error>>;
  findAll?(): Promise<Result<Aggregate[], ExceptionBase | Error>>;
  findAllPaginated?(params: IPaginatedQueryParams): Promise<Result<IPaginated<Aggregate>, ExceptionBase | Error>>;
  insert(entity: Aggregate): Promise<Result<void, ExceptionBase | Error>>;
  update?(entity: Aggregate): Promise<Result<void, ExceptionBase | Error>>;
  delete(entityOrId: Aggregate | AggregateId): Promise<Result<boolean, ExceptionBase | Error>>;
  transaction?<T>(handler: () => Promise<T>): Promise<T>;
}
