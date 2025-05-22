// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/reset-user-password.use-case.ts
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
  HashedPasswordVO,
  IPasswordHasherPort, // Del dominio
  PASSWORD_HASHER_PORT, // Del dominio
} from '@dfs-suite/codousersroles';
import {
  ExceptionBase,
  NotFoundException,
  ForbiddenException, // Para autorización
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, ok, err, isErr } from '@dfs-suite/shresult';
import { TenantId, UserId, CorrelationId } from '@dfs-suite/shtypes';

import { ResetUserPasswordCommand } from '../commands/reset-user-password.command';

export const RESET_USER_PASSWORD_USE_CASE = Symbol('IResetUserPasswordUseCase');
export type IResetUserPasswordUseCase = ICommandHandler<
  ResetUserPasswordCommand,
  void
>;

export class ResetUserPasswordUseCaseImpl implements IResetUserPasswordUseCase {
  constructor(
    // @Inject(USER_REPOSITORY_PORT)
    private readonly userRepo: IUserRepository,
    // @Inject(PASSWORD_HASHER_PORT)
    private readonly passwordHasher: IPasswordHasherPort,
    // @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort,
    // @Inject(DOMAIN_EVENT_EMITTER_PORT)
    private readonly eventEmitter: IDomainEventEmitter
  ) {}

  async execute(
    command: ResetUserPasswordCommand
  ): Promise<Result<void, ExceptionBase>> {
    const { tenantId, userIdToReset, newPassword, resetByUserId } =
      command.payload;
    const correlationId = command.metadata.correlationId;
    const useCaseName = ResetUserPasswordUseCaseImpl.name;

    this.logger.log(
      `Attempting to reset password for user ${String(
        userIdToReset
      )} in tenant ${String(tenantId)} by admin ${String(resetByUserId)}`,
      useCaseName,
      correlationId
    );

    try {
      // TODO: Lógica de autorización (solo TENANT_ADMIN puede resetear contraseñas de otros)

      const userToResetResult = await this.userRepo.findOneById(userIdToReset);
      if (isErr(userToResetResult)) return err(userToResetResult.error);
      if (!userToResetResult.value) {
        return err(
          new NotFoundException(
            `User ${String(userIdToReset)} not found for password reset.`,
            undefined,
            { userIdToReset },
            correlationId
          )
        );
      }
      const userEntity = userToResetResult.value;

      // Hashear nueva contraseña
      const newHashedPasswordResult = await this.passwordHasher.hash(
        newPassword
      );
      if (isErr(newHashedPasswordResult))
        return err(newHashedPasswordResult.error);

      const newHashedPasswordVo = HashedPasswordVO.create(
        newHashedPasswordResult.value
      );

      // Aplicar cambio en la entidad (usa el mismo método que el usuario cambiando su propia contraseña)
      userEntity.changePassword(newHashedPasswordVo, {
        // Pasando contexto para el evento
        tenantId,
        correlationId,
        // El evento UserPasswordChangedEvent podría tener un campo opcional 'changedBy'
      });

      const saveResult = await this.userRepo.update(userEntity);
      if (isErr(saveResult)) return err(saveResult.error);

      await this.eventEmitter.publishAll(userEntity.getAndClearDomainEvents());

      this.logger.log(
        `Password for user ${String(
          userEntity.id
        )} reset successfully by admin ${String(resetByUserId)}.`,
        useCaseName,
        correlationId
      );
      // TODO: Considerar enviar una notificación al usuario sobre el reseteo de contraseña
      return ok(undefined);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error resetting user password.',
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
// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/reset-user-password.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Esqueleto de `ResetUserPasswordUseCaseImpl`.", "justificacion": "Define el caso de uso para que un admin resetee la contraseña de un usuario.", "impacto": "Estructura inicial del caso de uso." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Implementar la lógica de autorización." },
  { "nota": "Asegurar que `UserPasswordChangedEvent` se emita correctamente (puede necesitar diferenciar si fue cambio propio o reseteo)." }
]
*/
