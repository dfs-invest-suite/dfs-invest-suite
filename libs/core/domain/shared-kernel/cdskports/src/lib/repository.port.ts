// RUTA: libs/core/domain/shared-kernel/cdskports/src/lib/repository.port.ts
import { AggregateRoot } from '@dfs-suite/cdskentities';
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import {
  AggregateId,
  IPaginated, // << Debería resolver ahora desde @dfs-suite/shtypes
  IPaginatedQueryParams, // << Debería resolver ahora desde @dfs-suite/shtypes
  Maybe,
} from '@dfs-suite/shtypes';

export const REPOSITORY_PORT = Symbol('IRepositoryPort');

export interface IRepositoryPort<
  TProps,
  TIDType extends AggregateId = AggregateId,
  TAggregate extends AggregateRoot<TProps, TIDType> = AggregateRoot<
    TProps,
    TIDType
  >
> {
  findOneById(
    id: TIDType
  ): Promise<Result<Maybe<TAggregate>, ExceptionBase | Error>>;

  findAll?(): Promise<Result<TAggregate[], ExceptionBase | Error>>;

  findAllPaginated?(
    params: IPaginatedQueryParams // << Debería resolver ahora
  ): Promise<Result<IPaginated<TAggregate>, ExceptionBase | Error>>; // << Debería resolver ahora

  exists(id: TIDType): Promise<Result<boolean, ExceptionBase | Error>>;
  insert(entity: TAggregate): Promise<Result<void, ExceptionBase | Error>>;
  update(entity: TAggregate): Promise<Result<void, ExceptionBase | Error>>;
  delete(
    entityOrId: TAggregate | TIDType
  ): Promise<Result<boolean, ExceptionBase | Error>>;
  transaction?<TResult>(
    work: (
      transactionContext: unknown
    ) => Promise<Result<TResult, ExceptionBase | Error>>
  ): Promise<Result<TResult, ExceptionBase | Error>>;
}
// FIN DEL ARCHIVO: libs/core/domain/shared-kernel/cdskports/src/lib/repository.port.ts
