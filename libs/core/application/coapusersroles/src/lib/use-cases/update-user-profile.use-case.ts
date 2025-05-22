// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/update-user-profile.use-case.ts
import {
  ICommandHandler,
  ICommandMetadata,
} from '@dfs-suite/cdskcommandsqueries';
import {
  IDomainEventEmitter,
  DOMAIN_EVENT_EMITTER_PORT,
} from '@dfs-suite/cdskevents';
import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/cdskports';
import {
  IUserRepository,
  USER_REPOSITORY_PORT,
  UserEntity,
} from '@dfs-suite/codousersroles';
import {
  ExceptionBase,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, ok, err, isErr } from '@dfs-suite/shresult';
import { TenantId, UserId, CorrelationId } from '@dfs-suite/shtypes';

import { UpdateUserProfileCommand } from '../commands/update-user-profile.command';
import { UserDetailsDto } from '../dtos/user-details.dto';

export const UPDATE_USER_PROFILE_USE_CASE = Symbol('IUpdateUserProfileUseCase');
export type IUpdateUserProfileUseCase = ICommandHandler<
  UpdateUserProfileCommand,
  UserDetailsDto
>;

export class UpdateUserProfileUseCaseImpl implements IUpdateUserProfileUseCase {
  constructor(
    // @Inject(USER_REPOSITORY_PORT)
    private readonly userRepo: IUserRepository,
    // @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort,
    // @Inject(DOMAIN_EVENT_EMITTER_PORT)
    private readonly eventEmitter: IDomainEventEmitter
  ) {}

  async execute(
    command: UpdateUserProfileCommand
  ): Promise<Result<UserDetailsDto, ExceptionBase>> {
    const {
      tenantId,
      userIdToUpdate,
      name,
      profilePictureUrl,
      updatedByUserId,
    } = command.payload;
    const correlationId = command.metadata.correlationId;
    const useCaseName = UpdateUserProfileUseCaseImpl.name;

    this.logger.log(
      `Attempting to update profile for user ${String(
        userIdToUpdate
      )} in tenant ${String(tenantId)} by user ${String(updatedByUserId)}`,
      useCaseName,
      correlationId
    );

    try {
      // Lógica de autorización: ¿Puede updatedByUserId actualizar a userIdToUpdate?
      // Si no es el mismo usuario, ¿es un TENANT_ADMIN de ese tenantId?
      // Esto podría ser un guard o lógica aquí. Por ahora, simplificado.
      if (userIdToUpdate !== updatedByUserId) {
        // Aquí iría la verificación si updatedByUserId es un admin con permisos.
        // Por ahora, asumimos que si no son el mismo, se requiere lógica de admin.
        // Para MVP, podríamos permitir solo que el propio usuario actualice su perfil.
        this.logger.warn(
          `User ${String(
            updatedByUserId
          )} attempting to update profile of another user ${String(
            userIdToUpdate
          )}. Authorization check needed.`,
          useCaseName,
          correlationId
        );
        // return err(new ForbiddenException(...)); // Si la lógica de roles no lo permite
      }

      const userResult = await this.userRepo.findOneById(userIdToUpdate);
      if (isErr(userResult)) return err(userResult.error);
      if (!userResult.value) {
        return err(
          new NotFoundException(
            `User ${String(userIdToUpdate)} not found for profile update.`,
            undefined,
            { userIdToUpdate },
            correlationId
          )
        );
      }
      const userEntity = userResult.value;

      // Aplicar actualizaciones a la entidad
      userEntity.updateProfile(name, profilePictureUrl);

      const saveResult = await this.userRepo.update(userEntity);
      if (isErr(saveResult)) return err(saveResult.error);

      // No hay eventos de dominio específicos para 'profile updated' en UserEntity por ahora,
      // pero si los hubiera, se publicarían aquí.
      // await this.eventEmitter.publishAll(userEntity.getAndClearDomainEvents());

      this.logger.log(
        `Profile for user ${String(userEntity.id)} updated successfully.`,
        useCaseName,
        correlationId
      );

      const userDto: UserDetailsDto = {
        id: userEntity.id,
        tenantId: tenantId, // El DTO lo necesita, la entidad no
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
              'Unexpected error updating user profile.',
              error as Error,
              undefined,
              correlationId
            );
      this.logger.error(
        `Error in ${useCaseName}: ${errBase.message}`,
        errBase.stack,
        useCaseName,
        correlationId
      );
      return err(errBase);
    }
  }
}
// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/update-user-profile.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Esqueleto de `UpdateUserProfileUseCaseImpl`.", "justificacion": "Define el caso de uso para actualizar el perfil de un usuario, con placeholders para la lógica de autorización y mapeo.", "impacto": "Estructura inicial del caso de uso." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Implementar la lógica de autorización para determinar si `updatedByUserId` puede modificar el perfil de `userIdToUpdate`." },
  { "nota": "Si la entidad `UserEntity` emite un evento `UserProfileUpdatedEvent`, este caso de uso debería publicarlo." },
  { "nota": "Completar el mapeo de `userEntity` a `UserDetailsDto`." }
]
*/
