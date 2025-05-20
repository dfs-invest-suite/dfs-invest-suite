// RUTA: libs/core/domain/codousersroles/src/lib/ports/user.repository.port.ts
// TODO: [LIA Legacy - Definir IUserRepositoryPort]
// Propósito: Puerto para la persistencia de UserEntity.
import { IRepositoryPort } from '@dfs-suite/cdskports';
import { UserEntity } from '../entities/user.entity';
import { Email, Maybe, UserId } from '@dfs-suite/shtypes';
import { Result } from '@dfs-suite/shresult';
import { ExceptionBase } from '@dfs-suite/sherrors';

export const USER_REPOSITORY_PORT = Symbol('IUserRepositoryPort');

export interface IUserRepositoryPort extends IRepositoryPort<UserEntity> {
  findByEmail(
    email: Email
  ): Promise<Result<Maybe<UserEntity>, ExceptionBase | Error>>;
  // findById(id: UserId): Promise<Result<Maybe<UserEntity>, ExceptionBase | Error>>; // Ya cubierto por IRepositoryPort<UserEntity> si AggregateId puede ser UserId
  // Futuro:
  // findActiveConsultants(tenantId: TenantId): Promise<Result<UserEntity[], ExceptionBase | Error>>;
}
