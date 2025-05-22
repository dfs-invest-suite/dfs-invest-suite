// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/change-user-password.use-case.ts
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
  IPasswordHasherPort, // Importar del dominio
  PASSWORD_HASHER_PORT, // Importar del dominio
  IUserAuthenticationDomainService, // Importar del dominio
  USER_AUTHENTICATION_DOMAIN_SERVICE_PORT, // Importar del dominio
} from '@dfs-suite/codousersroles';
import {
  ExceptionBase,
  NotFoundException,
  ForbiddenException,
  ArgumentInvalidException,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, ok, err, isErr } from '@dfs-suite/shresult';
import { TenantId, UserId, CorrelationId } from '@dfs-suite/shtypes';

import { ChangeUserPasswordCommand } from '../commands/change-user-password.command';

export const CHANGE_USER_PASSWORD_USE_CASE = Symbol(
  'IChangeUserPasswordUseCase'
);
export type IChangeUserPasswordUseCase = ICommandHandler<
  ChangeUserPasswordCommand,
  void
>;

export class ChangeUserPasswordUseCaseImpl
  implements IChangeUserPasswordUseCase
{
  constructor(
    // @Inject(USER_REPOSITORY_PORT)
    private readonly userRepo: IUserRepository,
    // @Inject(USER_AUTHENTICATION_DOMAIN_SERVICE_PORT) // O IPasswordHasherPort directamente
    private readonly authDomainService: IUserAuthenticationDomainService,
    // @Inject(PASSWORD_HASHER_PORT)
    private readonly passwordHasher: IPasswordHasherPort,
    // @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort,
    // @Inject(DOMAIN_EVENT_EMITTER_PORT)
    private readonly eventEmitter: IDomainEventEmitter
  ) {}

  async execute(
    command: ChangeUserPasswordCommand
  ): Promise<Result<void, ExceptionBase>> {
    const { tenantId, userIdChanging, oldPassword, newPassword } =
      command.payload;
    const correlationId = command.metadata.correlationId;
    const useCaseName = ChangeUserPasswordUseCaseImpl.name;

    this.logger.log(
      `Attempting to change password for user ${String(
        userIdChanging
      )} in tenant ${String(tenantId)}`,
      useCaseName,
      correlationId
    );

    try {
      const userResult = await this.userRepo.findOneById(userIdChanging);
      if (isErr(userResult)) return err(userResult.error);
      if (!userResult.value) {
        return err(
          new NotFoundException(
            `User ${String(userIdChanging)} not found for password change.`,
            undefined,
            { userIdToUpdate: userIdChanging },
            correlationId
          )
        );
      }
      const userEntity = userResult.value;

      // 1. Verificar contraseña antigua
      const verifyOldPasswordResult =
        await this.authDomainService.verifyPassword(
          oldPassword,
          userEntity.hashedPassword
        );

      if (isErr(verifyOldPasswordResult) || !verifyOldPasswordResult.value) {
        return err(
          new ArgumentInvalidException(
            'Old password does not match.',
            undefined,
            { userId: userIdChanging },
            correlationId
          )
        );
      }

      // 2. Hashear nueva contraseña
      const newHashedPasswordResult = await this.passwordHasher.hash(
        newPassword
      );
      if (isErr(newHashedPasswordResult))
        return err(newHashedPasswordResult.error);

      const newHashedPasswordVo = HashedPasswordVO.create(
        newHashedPasswordResult.value
      );

      // 3. Aplicar cambio en la entidad
      userEntity.changePassword(newHashedPasswordVo, {
        // Pasar contexto para el evento
        tenantId,
        correlationId,
      });

      const saveResult = await this.userRepo.update(userEntity);
      if (isErr(saveResult)) return err(saveResult.error);

      await this.eventEmitter.publishAll(userEntity.getAndClearDomainEvents());

      this.logger.log(
        `Password for user ${String(userEntity.id)} changed successfully.`,
        useCaseName,
        correlationId
      );
      return ok(undefined);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error changing user password.',
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
// RUTA: libs/core/application/coapusersroles/src/lib/use-cases/change-user-password.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Esqueleto de `ChangeUserPasswordUseCaseImpl`.", "justificacion": "Define el caso de uso para que un usuario cambie su propia contraseña. Incluye verificación de contraseña antigua y hasheo de la nueva.", "impacto": "Estructura inicial del caso de uso." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Asegurar que `UserEntity.changePassword` emita `UserPasswordChangedEvent` con el `tenantId`." },
  { "nota": "La inyección de `IUserAuthenticationDomainService` (o directamente `IPasswordHasherPort` para la comparación) y `IPasswordHasherPort` (para el hasheo de la nueva) debe ser configurada en el módulo NestJS." }
]
*/
