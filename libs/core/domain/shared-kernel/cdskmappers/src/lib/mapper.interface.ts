// libs/core/domain/shared-kernel/mappers/src/lib/mapper.interface.ts
import { Entity } from '@dfs-suite/core-domain-shared-kernel-entities'; // Se resolverá

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export interface IMapper<
  DomainEntity extends Entity<any>,
  PersistenceModel,
  ResponseDto = any
> {
  toDomain(persistenceModel: PersistenceModel): DomainEntity;
  toPersistence(domainEntity: DomainEntity): PersistenceModel;
  toResponse?(domainEntity: DomainEntity): ResponseDto;
  // Opcional: para cuando se obtiene el modelo de persistencia y se quiere mapear directo a DTO
  // sin pasar por la entidad de dominio (ej. para optimizar queries de lectura simples)
  toResponseFromPersistence?(persistenceModel: PersistenceModel): ResponseDto;
}
