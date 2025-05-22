// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/reactivate-user.use-case.ts
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

import { ReactivateUserCommand } from '../commands/reactivate-user.command';

export const REACTIVATE_USER_USE_CASE = Symbol('IReactivateUserUseCase');
export type IReactivateUserUseCase = ICommandHandler<
  ReactivateUserCommand,
  void
>;

export class ReactivateUserUseCaseImpl implements IReactivateUserUseCase {
  constructor(
    // @Inject(USER_REPOSITORY_PORT)
    private readonly userRepo: IUserRepository,
    // @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort,
    // @Inject(DOMAIN_EVENT_EMITTER_PORT)
    private readonly eventEmitter: IDomainEventEmitter
  ) {}

  async execute(
    command: ReactivateUserCommand
  ): Promise<Result<void, ExceptionBase>> {
    const { tenantId, userIdToReactivate, reactivatedByUserId } =
      command.payload;
    const correlationId = command.metadata.correlationId;
    const useCaseName = ReactivateUserUseCaseImpl.name;

    this.logger.log(
      `Attempting to reactivate user ${String(
        userIdToReactivate
      )} in tenant ${String(tenantId)} by user ${String(reactivatedByUserId)}`,
      useCaseName,
      correlationId
    );

    try {
      // TODO: Lógica de autorización

      const userToReactivateResult = await this.userRepo.findOneById(
        userIdToReactivate
      );
      if (isErr(userToReactivateResult))
        return err(userToReactivateResult.error);
      if (!userToReactivateResult.value) {
        return err(
          new NotFoundException(
            `User ${String(userIdToReactivate)} not found for reactivation.`,
            undefined,
            { userIdToReactivate },
            correlationId
          )
        );
      }
      const userEntity = userToReactivateResult.value;

      if (userEntity.isActive) {
        this.logger.log(
          `User ${String(userEntity.id)} is already active. No action taken.`,
          useCaseName,
          correlationId
        );
        return ok(undefined);
      }

      userEntity.activate({
        // Pasando contexto para el evento
        tenantId,
        correlationId,
        activatedByUserId: reactivatedByUserId,
      });

      const saveResult = await this.userRepo.update(userEntity);
      if (isErr(saveResult)) return err(saveResult.error);

      await this.eventEmitter.publishAll(userEntity.getAndClearDomainEvents());

      this.logger.log(
        `User ${String(userEntity.id)} reactivated successfully.`,
        useCaseName,
        correlationId
      );
      return ok(undefined);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error reactivating user.',
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
// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/reactivate-user.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Esqueleto de `ReactivateUserUseCaseImpl`.", "justificacion": "Define el caso de uso para reactivar un usuario.", "impacto": "Estructura inicial del caso de uso." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Implementar la lógica de autorización." },
  { "nota": "Asegurar que `UserEntity.activate` emita `UserActivatedEvent` con el `tenantId`." }
]
*/
