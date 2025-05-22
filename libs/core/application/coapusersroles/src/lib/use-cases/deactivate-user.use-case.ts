// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/deactivate-user.use-case.ts
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
} from '@dfs-suite/codousersroles';
import {
  ExceptionBase,
  NotFoundException,
  ForbiddenException,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, ok, err, isErr } from '@dfs-suite/shresult';
import { TenantId, UserId, CorrelationId } from '@dfs-suite/shtypes';

import { DeactivateUserCommand } from '../commands/deactivate-user.command';

export const DEACTIVATE_USER_USE_CASE = Symbol('IDeactivateUserUseCase');
export type IDeactivateUserUseCase = ICommandHandler<
  DeactivateUserCommand,
  void // No devuelve datos, solo confirma la acción
>;

export class DeactivateUserUseCaseImpl implements IDeactivateUserUseCase {
  constructor(
    // @Inject(USER_REPOSITORY_PORT)
    private readonly userRepo: IUserRepository,
    // @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort,
    // @Inject(DOMAIN_EVENT_EMITTER_PORT)
    private readonly eventEmitter: IDomainEventEmitter
  ) {}

  async execute(
    command: DeactivateUserCommand
  ): Promise<Result<void, ExceptionBase>> {
    const { tenantId, userIdToDeactivate, deactivatedByUserId } =
      command.payload;
    const correlationId = command.metadata.correlationId;
    const useCaseName = DeactivateUserUseCaseImpl.name;

    this.logger.log(
      `Attempting to deactivate user ${String(
        userIdToDeactivate
      )} in tenant ${String(tenantId)} by user ${String(deactivatedByUserId)}`,
      useCaseName,
      correlationId
    );

    try {
      // TODO: Lógica de autorización (ej. solo TENANT_ADMIN o el propio usuario, aunque desactivarse a sí mismo es raro)

      const userToDeactivateResult = await this.userRepo.findOneById(
        userIdToDeactivate
      );
      if (isErr(userToDeactivateResult))
        return err(userToDeactivateResult.error);
      if (!userToDeactivateResult.value) {
        return err(
          new NotFoundException(
            `User ${String(userIdToDeactivate)} not found for deactivation.`,
            undefined,
            { userIdToDeactivate },
            correlationId
          )
        );
      }
      const userEntity = userToDeactivateResult.value;

      if (!userEntity.isActive) {
        this.logger.log(
          `User ${String(userEntity.id)} is already inactive. No action taken.`,
          useCaseName,
          correlationId
        );
        return ok(undefined);
      }

      userEntity.deactivate({
        // Pasando contexto para el evento
        tenantId,
        correlationId,
        deactivatedByUserId,
      });

      const saveResult = await this.userRepo.update(userEntity);
      if (isErr(saveResult)) return err(saveResult.error);

      await this.eventEmitter.publishAll(userEntity.getAndClearDomainEvents());

      this.logger.log(
        `User ${String(userEntity.id)} deactivated successfully.`,
        useCaseName,
        correlationId
      );
      return ok(undefined);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error deactivating user.',
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
// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/deactivate-user.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Esqueleto de `DeactivateUserUseCaseImpl`.", "justificacion": "Define el caso de uso para desactivar un usuario.", "impacto": "Estructura inicial del caso de uso." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Implementar la lógica de autorización." },
  { "nota": "Asegurar que `UserEntity.deactivate` emita `UserDeactivatedEvent` con el `tenantId`." }
]
*/
