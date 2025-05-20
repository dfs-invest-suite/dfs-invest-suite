// RUTA: libs/core/domain/codousersroles/src/lib/entities/user.entity.ts
// TODO: [LIA Legacy - Implementar Lógica de UserEntity]
// Propósito: Representa un usuario del tenant (Consultor, Supervisor, TenantAdmin) con sus propiedades y comportamientos.
// Relacionado con Casos de Uso: Autenticación, Gestión de Usuarios, Asignación de Leads.

import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import {
  AggregateId,
  UserId,
  Email,
  Maybe,
  IsoDateString,
} from '@dfs-suite/shtypes';
import { UuidUtils, Guard } from '@dfs-suite/shutils';
import {
  ArgumentNotProvidedException,
  ArgumentInvalidException,
} from '@dfs-suite/sherrors';
import { UserRoleVO, HashedPasswordVO } from '../value-objects'; // Se crearán después
import {
  UserCreatedEvent,
  UserPasswordChangedEvent,
  UserRoleUpdatedEvent,
  UserActivatedEvent,
  UserDeactivatedEvent,
} from '../events'; // Se crearán después

export interface UserProps {
  email: Email; // O EmailVO si se crea en shared-kernel
  name: string;
  role: UserRoleVO;
  hashedPassword: HashedPasswordVO;
  isActive: boolean;
  lastLoginAt?: Maybe<IsoDateString>;
  profilePictureUrl?: Maybe<string>;
  // tenantId: TenantId; // Implícito ya que esta entidad vive en la DB del tenant.
}

interface CreateUserProps {
  email: Email;
  name: string;
  role: UserRoleVO;
  hashedPassword: HashedPasswordVO; // La contraseña ya viene hasheada
  // id?: UserId; // El ID del usuario es un AggregateId y se genera o se pasa
}

export class UserEntity extends AggregateRoot<UserProps> {
  constructor(createEntityProps: CreateEntityProps<UserProps>) {
    super(createEntityProps);
  }

  public static create(props: CreateUserProps, id?: UserId): UserEntity {
    if (Guard.isEmpty(props.name?.trim())) {
      throw new ArgumentNotProvidedException('User name cannot be empty.');
    }
    // Validación de email y otros VOs se asume que ocurre en sus respectivos VOs o en el Caso de Uso.

    const userId = (id as AggregateId) || UuidUtils.generateUserId(); // UserId es un Branded AggregateId
    const user = new UserEntity({
      id: userId,
      props: {
        ...props,
        name: props.name.trim(),
        isActive: true, // Por defecto, un usuario se crea activo
      },
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // No emitir UserCreatedEvent aquí directamente si la contraseña hasheada
    // se considera sensible para el payload del evento.
    // El Caso de Uso CreateUserUseCase emitiría el evento después de la persistencia.
    // Si se decide emitir aquí, tener cuidado con el payload.
    // user.addEvent(new UserCreatedEvent({ aggregateId: user.id, payload: { email: user.email, role: user.role.value, name: user.name } }));

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
    // TODO: [LIA Legacy - Implementar Lógica de changePassword]
    // 1. Validar que newHashedPassword no sea nulo/vacío.
    // 2. Actualizar this.props.hashedPassword.
    // 3. this.setUpdatedAt();
    // 4. this.addEvent(new UserPasswordChangedEvent({ aggregateId: this.id, payload: {} }));
    if (
      Guard.isNil(newHashedPassword) ||
      Guard.isEmpty(newHashedPassword.value)
    ) {
      throw new ArgumentNotProvidedException(
        'New hashed password cannot be empty.'
      );
    }
    this.props.hashedPassword = newHashedPassword;
    this.setUpdatedAt();
    this.addEvent(
      new UserPasswordChangedEvent({
        aggregateId: this.id,
        payload: { userId: this.id as UserId },
      })
    );
  }

  public updateProfile(name?: string, profilePictureUrl?: Maybe<string>): void {
    // TODO: [LIA Legacy - Implementar Lógica de updateProfile]
    // 1. Validar y actualizar this.props.name (si se provee y es diferente).
    // 2. Actualizar this.props.profilePictureUrl.
    // 3. this.setUpdatedAt();
    // (Considerar un evento UserProfileUpdatedEvent)
    let updated = false;
    if (
      !Guard.isNil(name) &&
      !Guard.isEmpty(name.trim()) &&
      this.props.name !== name.trim()
    ) {
      this.props.name = name.trim();
      updated = true;
    }
    if (this.props.profilePictureUrl !== profilePictureUrl) {
      // Permite setear a null/undefined
      this.props.profilePictureUrl = profilePictureUrl;
      updated = true;
    }
    if (updated) {
      this.setUpdatedAt();
    }
  }

  public changeRole(newRole: UserRoleVO): void {
    // TODO: [LIA Legacy - Implementar Lógica de changeRole]
    // 1. Validar newRole.
    // 2. Si el rol es diferente, actualizar this.props.role.
    // 3. this.setUpdatedAt();
    // 4. this.addEvent(new UserRoleUpdatedEvent({ aggregateId: this.id, payload: { newRole: newRole.value } }));
    if (Guard.isNil(newRole)) {
      throw new ArgumentNotProvidedException(
        'New role cannot be null or undefined.'
      );
    }
    if (!this.props.role.equals(newRole)) {
      this.props.role = newRole;
      this.setUpdatedAt();
      this.addEvent(
        new UserRoleUpdatedEvent({
          aggregateId: this.id,
          payload: { userId: this.id as UserId, newRole: newRole.value },
        })
      );
    }
  }

  public activate(): void {
    if (this.props.isActive) return;
    this.props.isActive = true;
    this.setUpdatedAt();
    this.addEvent(
      new UserActivatedEvent({
        aggregateId: this.id,
        payload: { userId: this.id as UserId },
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
        payload: { userId: this.id as UserId },
      })
    );
  }

  public recordLogin(): void {
    this.props.lastLoginAt = new Date().toISOString() as IsoDateString;
    this.setUpdatedAt();
    // No se suele emitir evento de dominio por cada login, pero sí se podría loggear en capa de aplicación/infra.
  }

  public validate(): void {
    if (Guard.isEmpty(this.props.email)) {
      // O si EmailVO tiene su propia validación más estricta
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
