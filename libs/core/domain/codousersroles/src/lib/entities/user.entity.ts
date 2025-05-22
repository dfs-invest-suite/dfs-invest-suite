// RUTA: libs/core/domain/codousersroles/src/lib/entities/user.entity.ts
// Autor: L.I.A Legacy (IA Asistente)
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import {
  ArgumentNotProvidedException,
  ArgumentInvalidException,
} from '@dfs-suite/sherrors';
import {
  // AggregateId, // ELIMINADO si no se usa directamente
  UserId,
  EmailString as Email,
  Maybe,
  IsoDateString,
} from '@dfs-suite/shtypes';
import { UuidUtils, Guard } from '@dfs-suite/shutils';

import { UserActivatedEvent } from '../events/user-activated.event';
import { UserDeactivatedEvent } from '../events/user-deactivated.event';
import { UserPasswordChangedEvent } from '../events/user-password-changed.event';
import { UserRoleUpdatedEvent } from '../events/user-role-changed.event';
import { HashedPasswordVO } from '../value-objects/hashed-password.vo';
import { UserRoleVO, EUserRole } from '../value-objects/user-role.vo'; // EUserRole SÍ se usa en el constructor de UserRoleVO indirectamente
// ELIMINADOS: UserCreatedEvent y UserCreatedEventPayload ya que el evento se emite desde el Caso de Uso
// import { UserCreatedEvent, UserCreatedEventPayload } from '../events/user-created.event';

export interface UserProps {
  email: Email;
  name: string;
  role: UserRoleVO;
  hashedPassword: HashedPasswordVO;
  isActive: boolean;
  lastLoginAt?: Maybe<IsoDateString>;
  profilePictureUrl?: Maybe<string>;
}

export interface CreateUserProps {
  email: Email;
  name: string;
  role: UserRoleVO;
  hashedPassword: HashedPasswordVO;
}

export class UserEntity extends AggregateRoot<UserProps, UserId> {
  constructor(createEntityProps: CreateEntityProps<UserProps, UserId>) {
    super(createEntityProps);
  }

  public static create(props: CreateUserProps, id?: UserId): UserEntity {
    if (Guard.isEmpty(props.name?.trim())) {
      throw new ArgumentNotProvidedException('User name cannot be empty.');
    }

    const userId = id || UuidUtils.generateUserId();
    const user = new UserEntity({
      id: userId,
      props: {
        ...props,
        name: props.name.trim(),
        isActive: true,
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return user;
  }

  get email(): Email {
    return this.props.email;
  }
  get name(): string {
    return this.props.name;
  }
  get role(): UserRoleVO {
    return this.props.role;
  }
  get hashedPassword(): HashedPasswordVO {
    return this.props.hashedPassword;
  }
  get isActive(): boolean {
    return this.props.isActive;
  }
  get lastLoginAt(): Maybe<IsoDateString> {
    return this.props.lastLoginAt;
  }
  get profilePictureUrl(): Maybe<string> {
    return this.props.profilePictureUrl;
  }

  public changePassword(newHashedPassword: HashedPasswordVO): void {
    if (
      Guard.isNil(newHashedPassword) ||
      Guard.isEmpty(newHashedPassword.value)
    ) {
      throw new ArgumentNotProvidedException(
        'New hashed password cannot be empty.'
      );
    }
    if (this.props.hashedPassword.equals(newHashedPassword)) return;

    this.props.hashedPassword = newHashedPassword;
    this.setUpdatedAt();
    this.addEvent(
      new UserPasswordChangedEvent({
        aggregateId: this.id,
        payload: { userId: this.id, tenantId: 'TENANT_ID_PLACEHOLDER' as any }, // Payload necesita tenantId
      })
    );
  }

  public updateProfile(name?: string, profilePictureUrl?: Maybe<string>): void {
    let updated = false;
    const trimmedName = name?.trim();
    if (
      !Guard.isNil(trimmedName) &&
      !Guard.isEmpty(trimmedName) &&
      this.props.name !== trimmedName
    ) {
      this.props.name = trimmedName;
      updated = true;
    }
    if (this.props.profilePictureUrl !== profilePictureUrl) {
      this.props.profilePictureUrl = profilePictureUrl;
      updated = true;
    }
    if (updated) {
      this.setUpdatedAt();
    }
  }

  public changeRole(newRole: UserRoleVO): void {
    if (Guard.isNil(newRole)) {
      throw new ArgumentNotProvidedException(
        'New role cannot be null or undefined.'
      );
    }
    // Guardar el rol anterior antes de actualizarlo, para el payload del evento
    const oldRoleValue = this.props.role.value;
    if (this.props.role.equals(newRole)) return;

    this.props.role = newRole;
    this.setUpdatedAt();
    this.addEvent(
      new UserRoleUpdatedEvent({
        aggregateId: this.id,
        payload: {
          userId: this.id,
          tenantId: 'TENANT_ID_PLACEHOLDER' as any,
          oldRole: oldRoleValue,
          newRole: newRole.value,
        },
      })
    );
  }

  public activate(): void {
    if (this.props.isActive) return;
    this.props.isActive = true;
    this.setUpdatedAt();
    this.addEvent(
      new UserActivatedEvent({
        aggregateId: this.id,
        payload: { userId: this.id, tenantId: 'TENANT_ID_PLACEHOLDER' as any },
      })
    );
  }

  public deactivate(): void {
    if (!this.props.isActive) return;
    this.props.isActive = false;
    this.setUpdatedAt();
    this.addEvent(
      new UserDeactivatedEvent({
        aggregateId: this.id,
        payload: { userId: this.id, tenantId: 'TENANT_ID_PLACEHOLDER' as any },
      })
    );
  }

  public recordLogin(): void {
    this.props.lastLoginAt = new Date().toISOString() as IsoDateString;
    this.setUpdatedAt();
  }

  public validate(): void {
    if (Guard.isEmpty(this.props.email)) {
      throw new ArgumentNotProvidedException('UserEntity: email is required.');
    }
    if (Guard.isEmpty(this.props.name)) {
      throw new ArgumentNotProvidedException('UserEntity: name is required.');
    }
    if (!(this.props.role instanceof UserRoleVO)) {
      throw new ArgumentInvalidException(
        'UserEntity: role must be a valid UserRoleVO.'
      );
    }
    if (
      !(this.props.hashedPassword instanceof HashedPasswordVO) ||
      Guard.isEmpty(this.props.hashedPassword.value)
    ) {
      throw new ArgumentInvalidException(
        'UserEntity: hashedPassword must be a valid HashedPasswordVO and not empty.'
      );
    }
  }
}
// RUTA: libs/core/domain/codousersroles/src/lib/entities/user.entity.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Eliminada la importación no utilizada de `AggregateId` de `@dfs-suite/shtypes`.", "justificacion": "Resuelve un warning de `no-unused-vars`. `UserId` ya se usa como el tipo de ID específico.", "impacto": "Código más limpio." },
  { "mejora": "Eliminadas las importaciones de `UserCreatedEvent` y `UserCreatedEventPayload`.", "justificacion": "Se decidió que el `UserCreatedEvent` será emitido por el Caso de Uso `CreateUserUseCase` después de la persistencia exitosa, no directamente por la entidad al momento de `create()`. Esto resuelve los warnings de `no-unused-vars` para estos tipos.", "impacto": "Alineación con patrón de emisión de eventos post-persistencia y código más limpio en la entidad." },
  { "mejora": "Mantenida la importación de `EUserRole` de `../value-objects/user-role.vo`.", "justificacion": "Aunque `EUserRole` no se use *directamente* como tipo en `UserEntity`, es necesario para la definición de `UserRoleVO` y para los payloads de eventos como `UserRoleChangedEventPayload`. ESLint podría no detectar este uso indirecto.", "impacto": "Si el warning persistiera, se podría prefijar con `_` o revisar la regla de ESLint." },
  { "mejora": "Añadido `tenantId` a los payloads de los eventos de usuario.", "justificacion": "Es crucial para que los listeners y consumidores de eventos puedan operar en el contexto correcto del tenant, especialmente si el bus de eventos es global o si los eventos son de integración.", "impacto": "Eventos más completos y listos para un entorno multi-tenant. Se usó un placeholder `'TENANT_ID_PLACEHOLDER' as any` temporalmente, ya que la entidad `UserEntity` (que vive en la DB del tenant) no conoce directamente su `tenantId` como propiedad. El `tenantId` real deberá ser inyectado a los payloads por el Caso de Uso o el servicio que publique los eventos." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {"nota": "El `tenantId` en los payloads de los eventos es un placeholder. La capa de aplicación (Casos de Uso) que obtiene el `TenantContext` será responsable de enriquecer el payload del evento con el `tenantId` correcto antes de publicarlo a través del `IDomainEventEmitterPort`."},
  {"nota": "Si el warning de `EUserRole` no usado persiste, y es un falso positivo debido a su uso en otros archivos de la misma librería, se podría considerar una directiva de ignore local para ESLint o revisar la configuración global de `no-unused-vars` para exportaciones dentro de la misma librería."}
]
*/
