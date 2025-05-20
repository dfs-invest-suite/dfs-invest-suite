// RUTA: libs/core/domain/codousersroles/src/lib/entities/user.entity.ts
// TODO: [LIA Legacy - Implementar UserEntity (Usuario del Tenant)]
// Propósito: Representa un usuario (consultor, supervisor, admin) dentro de un tenant.
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import {
  AggregateId,
  TenantId,
  UserId,
  Email,
  Maybe,
  IsoDateString,
} from '@dfs-suite/shtypes'; // Asumiendo Email como Brand
import { UserRoleVO, HashedPasswordVO } from '../value-objects'; // Crear estos VOs

export interface UserProps {
  // tenantId: TenantId; // Implícito
  email: Email; // Usar EmailVO si se crea en shared-kernel
  name: string;
  role: UserRoleVO;
  hashedPassword: HashedPasswordVO;
  isActive: boolean;
  // lastLoginAt?: Maybe<IsoDateString>;
  // profilePictureUrl?: Maybe<string>;
}
// export class UserEntity extends AggregateRoot<UserProps> { /* ... */ }
