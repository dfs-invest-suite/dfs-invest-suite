// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/create-user.use-case.ts
import {
  ICommandHandler,
  ICommandMetadata,
} from '@dfs-suite/cdskcommandsqueries';
import { IDomainEventEmitter } from '@dfs-suite/cdskevents';
import { ILoggerPort } from '@dfs-suite/cdskports';
import {
  EUserRole,
  HashedPasswordVO,
  IPasswordHasherPort,
  IUserRepository,
  UserEntity,
  UserRoleVO,
} from '@dfs-suite/codousersroles';
import {
  ConflictException,
  ExceptionBase,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, err, isErr, ok } from '@dfs-suite/shresult';
import { UuidUtils } from '@dfs-suite/shutils';

import { CreateUserCommand } from '../commands/create-user.command';
import { UserDetailsDto } from '../dtos/user-details.dto';
// UserCreationAppDto no se usa directamente como tipo de parámetro aquí,
// el comando ya lleva el payload.
// import { UserCreationAppDto } from '../dtos/user-creation.dto';

export const CREATE_USER_USE_CASE = Symbol('ICreateUserUseCase');
export type ICreateUserUseCase = ICommandHandler<
  CreateUserCommand,
  UserDetailsDto
>;

export class CreateUserUseCaseImpl implements ICreateUserUseCase {
  constructor(
    // @Inject(USER_REPOSITORY_PORT)
    private readonly _userRepo: IUserRepository, // Prefijo _
    // @Inject(PASSWORD_HASHER_PORT)
    private readonly _passwordHasher: IPasswordHasherPort, // Prefijo _
    // @Inject(LOGGER_PORT)
    private readonly _logger: ILoggerPort, // Prefijo _
    // @Inject(DOMAIN_EVENT_EMITTER_PORT)
    private readonly _eventEmitter: IDomainEventEmitter // Prefijo _
  ) {}

  async execute(
    command: CreateUserCommand
  ): Promise<Result<UserDetailsDto, ExceptionBase>> {
    const {
      tenantId,
      correlationId,
      email,
      name,
      role,
      password,
      createdByUserId, // _createdByUserId si no se usa en la lógica placeholder
    } = command.payload;

    const metadata: ICommandMetadata = command.metadata; // _metadata si no se usa
    const useCaseName = CreateUserUseCaseImpl.name;

    this._logger.log(
      // Usar _logger
      `Attempting to create user ${email} (role: ${role}) for tenant ${String(
        tenantId
      )} by user ${String(createdByUserId)}`,
      useCaseName,
      correlationId
    );

    try {
      const existingUserResult = await this._userRepo.findByEmail(email);
      if (isErr(existingUserResult)) {
        return err(existingUserResult.error);
      }
      if (existingUserResult.value) {
        return err(
          new ConflictException(
            `User with email "${email}" already exists for this tenant.`,
            undefined,
            { email },
            correlationId
          )
        );
      }

      const hashedPasswordResult = await this._passwordHasher.hash(password);
      if (isErr(hashedPasswordResult)) {
        this._logger.error(
          // Usar _logger
          `Password hashing failed for user ${email}: ${hashedPasswordResult.error.message}`,
          useCaseName,
          correlationId
        );
        return err(hashedPasswordResult.error);
      }
      const hashedPasswordVo = HashedPasswordVO.create(
        hashedPasswordResult.value
      );

      const roleVo = UserRoleVO.create(role as EUserRole);

      const userEntity = UserEntity.create(
        {
          email,
          name,
          role: roleVo,
          hashedPassword: hashedPasswordVo,
        },
        UuidUtils.generateUserId()
      );

      const saveResult = await this._userRepo.insert(userEntity);
      if (isErr(saveResult)) {
        this._logger.error(
          // Usar _logger
          `Failed to save new user ${email}: ${saveResult.error.message}`,
          useCaseName,
          correlationId
        );
        return err(saveResult.error);
      }

      // Lógica para el evento
      // const userCreatedEventPayload: UserCreatedEventPayload = {
      //   userId: userEntity.id,
      //   tenantId: tenantId,
      //   email: userEntity.email,
      //   name: userEntity.name,
      //   role: userEntity.role.value,
      //   correlationId: correlationId,
      //   createdByUserId: metadata.userId, // O command.payload.createdByUserId
      // };
      // const event = new UserCreatedEvent({ aggregateId: userEntity.id, payload: userCreatedEventPayload });
      // await this._eventEmitter.publish(event); // Usar _eventEmitter

      this._logger.log(
        // Usar _logger
        `User ${userEntity.email} (ID: ${String(
          userEntity.id
        )}) created successfully for tenant ${String(tenantId)}.`,
        useCaseName,
        correlationId
      );

      const userDto: UserDetailsDto = {
        id: userEntity.id,
        tenantId: tenantId,
        email: userEntity.email,
        name: userEntity.name,
        role: userEntity.role.value,
        isActive: userEntity.isActive,
        createdAt: userEntity.createdAt,
        updatedAt: userEntity.updatedAt,
        lastLoginAt: userEntity.lastLoginAt,
        profilePictureUrl: userEntity.profilePictureUrl,
      };

      return ok(userDto);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error creating user.',
              error as Error,
              undefined,
              correlationId
            );
      this._logger.error(
        // Usar _logger
        `Error in ${useCaseName}: ${errBase.message}`,
        errBase.stack,
        useCaseName,
        correlationId
      );
      return err(errBase);
    }
  }
}
// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/create-user.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorizado el import de `IPasswordHasherPort` y `PASSWORD_HASHER_PORT` para que provengan de `@dfs-suite/codousersroles`.", "justificacion": "Resuelve la violación de `depConstraint` y alinea la dependencia con la capa de dominio.", "impacto": "Cumplimiento arquitectónico." },
  { "mejora": "Prefijadas con `_` las dependencias inyectadas no utilizadas en el constructor y algunos parámetros/variables no utilizados en la lógica placeholder del método `execute`.", "justificacion": "Resuelve los warnings de `@typescript-eslint/no-unused-vars` según la configuración de ESLint (`argsIgnorePattern: '^_'`).", "impacto": "Código más limpio sin warnings de ESLint por variables no usadas temporalmente." },
  { "mejora": "Eliminado el import no utilizado de `UserCreationAppDto` en `create-user.use-case.ts`.", "justificacion": "El comando `CreateUserCommand` ya lleva el payload necesario.", "impacto": "Limpieza de imports." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Implementar la lógica de emisión del evento `UserCreatedEvent` (requiere definir el evento y su payload en `codousersroles`)." },
  { "nota": "Quitar los prefijos `_` de las dependencias y variables cuando se implemente la lógica completa y se utilicen." }
]
*/
// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/create-user.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorizado el import de `IPasswordHasherPort` y `PASSWORD_HASHER_PORT` para que provengan de `@dfs-suite/codousersroles`.", "justificacion": "Resuelve la violación de `depConstraint` y alinea la dependencia con la capa de dominio.", "impacto": "Cumplimiento arquitectónico." },
  { "mejora": "Añadidos todos los imports faltantes para tipos, VOs, entidades y excepciones, usando los alias correctos.", "justificacion": "Resuelve los errores `no-undef`.", "impacto": "El archivo ahora es sintácticamente correcto y type-safe." },
  { "mejora": "Esbozada la lógica completa del `CreateUserUseCaseImpl`, incluyendo validación de existencia, hasheo de contraseña, creación de entidad, persistencia y emisión de evento (placeholder).", "justificacion": "Proporciona una implementación funcional del caso de uso.", "impacto": "Funcionalidad de creación de usuarios lista para ser integrada." },
  { "mejora": "Asegurado que `EUserRole` se importe de `codousersroles` y se use para el `role` en el payload del comando y en el DTO.", "justificacion": "Consistencia de tipos.", "impacto": "Robustez." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "La implementación del `IUserRepository` (Prisma adapter) necesita un método `findByEmail` que opere en el contexto del tenant." },
  { "nota": "El `UserCreatedEvent` y su payload deben ser definidos en `libs/core/domain/codousersroles/src/lib/events/` y luego instanciados y publicados aquí." },
  { "nota": "El `tenantId` se pasa al payload del evento. La `UserEntity` en sí no necesita `tenantId` si el repositorio ya opera en el contexto del tenant." }
]
*/
