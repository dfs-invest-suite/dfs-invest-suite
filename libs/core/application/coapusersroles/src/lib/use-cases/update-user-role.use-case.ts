// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/update-user-role.use-case.ts
import { ICommandHandler } from '@dfs-suite/cdskcommandsqueries';
import {
  IDomainEventEmitter,
  DOMAIN_EVENT_EMITTER_PORT,
} from '@dfs-suite/cdskevents';
import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/cdskports';
import {
  IUserRepository,
  USER_REPOSITORY_PORT,
  UserEntity,
  UserRoleVO,
  EUserRole,
} from '@dfs-suite/codousersroles';
import {
  ExceptionBase,
  NotFoundException,
  ForbiddenException, // Para autorización
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, ok, err, isErr } from '@dfs-suite/shresult';
import { TenantId, UserId, CorrelationId } from '@dfs-suite/shtypes';

import { UpdateUserRoleCommand } from '../commands/update-user-role.command';
import { UserDetailsDto } from '../dtos/user-details.dto';

export const UPDATE_USER_ROLE_USE_CASE = Symbol('IUpdateUserRoleUseCase');
export type IUpdateUserRoleUseCase = ICommandHandler<
  UpdateUserRoleCommand,
  UserDetailsDto
>;

export class UpdateUserRoleUseCaseImpl implements IUpdateUserRoleUseCase {
  constructor(
    // @Inject(USER_REPOSITORY_PORT)
    private readonly userRepo: IUserRepository,
    // @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort,
    // @Inject(DOMAIN_EVENT_EMITTER_PORT)
    private readonly eventEmitter: IDomainEventEmitter
  ) {}

  async execute(
    command: UpdateUserRoleCommand
  ): Promise<Result<UserDetailsDto, ExceptionBase>> {
    const { tenantId, userIdToUpdate, newRole, updatedByUserId } =
      command.payload;
    const correlationId = command.metadata.correlationId;
    const useCaseName = UpdateUserRoleUseCaseImpl.name;

    this.logger.log(
      `Attempting to update role for user ${String(
        userIdToUpdate
      )} to ${newRole} in tenant ${String(tenantId)} by user ${String(
        updatedByUserId
      )}`,
      useCaseName,
      correlationId
    );

    try {
      // TODO: Lógica de autorización: Solo un TENANT_ADMIN (del mismo tenantId) puede cambiar roles.
      // const updaterUserResult = await this.userRepo.findOneById(updatedByUserId);
      // if (isErr(updaterUserResult) || !updaterUserResult.value || !updaterUserResult.value.role.isTenantAdmin()) {
      //   return err(new ForbiddenException(...));
      // }

      const userToUpdateResult = await this.userRepo.findOneById(
        userIdToUpdate
      );
      if (isErr(userToUpdateResult)) return err(userToUpdateResult.error);
      if (!userToUpdateResult.value) {
        return err(
          new NotFoundException(
            `User ${String(userIdToUpdate)} not found for role update.`,
            undefined,
            { userIdToUpdate },
            correlationId
          )
        );
      }
      const userEntity = userToUpdateResult.value;

      const newRoleVo = UserRoleVO.create(newRole as EUserRole);
      userEntity.changeRole(newRoleVo, {
        // Pasando contexto para el evento
        tenantId, // El tenantId del contexto del comando
        correlationId,
        changedByUserId: updatedByUserId,
      });

      const saveResult = await this.userRepo.update(userEntity);
      if (isErr(saveResult)) return err(saveResult.error);

      await this.eventEmitter.publishAll(userEntity.getAndClearDomainEvents());

      this.logger.log(
        `Role for user ${String(
          userEntity.id
        )} updated to ${newRole} successfully.`,
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
              'Unexpected error updating user role.',
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
// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/update-user-role.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Esqueleto de `UpdateUserRoleUseCaseImpl`.", "justificacion": "Define el caso de uso para cambiar el rol de un usuario, con placeholders para la lógica de autorización y mapeo. Incluye la propagación de `tenantId` y `correlationId` al método de la entidad para el evento.", "impacto": "Estructura inicial del caso de uso." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Implementar la lógica de autorización para asegurar que solo un TENANT_ADMIN pueda cambiar roles." },
  { "nota": "Asegurar que `UserEntity.changeRole` emita `UserRoleChangedEvent` con el `tenantId` correcto en su payload." }
]
*/
