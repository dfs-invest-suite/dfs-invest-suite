// RUTA: libs/core/application/tenancy/src/lib/use-cases/activate-tenant/activate-tenant.use-case.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import { ICommandHandler } from '@dfs-suite/core-domain-shared-kernel-commands-queries';
import {
  LOGGER_PORT,
  type ILoggerPort,
} from '@dfs-suite/core-domain-shared-kernel-ports';
import {
  TENANT_REPOSITORY_PORT,
  TenantEntity,
  type ITenantRepository,
} from '@dfs-suite/core-domain-tenancy';
import {
  ArgumentInvalidException, // Importar desde shared-errors
  ExceptionBase,
  InternalServerErrorException,
  NotFoundException,
} from '@dfs-suite/shared-errors';
import { err, isErr, ok, Result } from '@dfs-suite/shared-result';
import { AggregateId, CorrelationId, Maybe } from '@dfs-suite/shared-types';
import { Guard } from '@dfs-suite/shared-utils';
import { ActivateTenantCommand } from '../../commands/activate-tenant/activate-tenant.command';

// --- Decoradores NestJS (Placeholder si no se usan directamente aquí) ---

const NestJsCommandHandler =
  (_commandType: any) =>
  <
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    T extends { new (...args: any[]): object }
  >(
    _target: T
  ): T | void =>
    _target;

const NestJsInject =
  (_token: any) =>
  (
    _target: object,

    _propertyKey: string | symbol | undefined,

    _parameterIndex?: number
  ): void => {
    /* placeholder */
  };
// --- Fin Decoradores NestJS ---

@NestJsCommandHandler(ActivateTenantCommand)
export class ActivateTenantUseCase
  implements ICommandHandler<ActivateTenantCommand, void>
{
  constructor(
    @NestJsInject(TENANT_REPOSITORY_PORT)
    private readonly tenantRepository: ITenantRepository,
    @NestJsInject(LOGGER_PORT)
    private readonly logger: ILoggerPort
  ) {}

  async execute(
    command: ActivateTenantCommand
  ): Promise<Result<void, ExceptionBase | Error>> {
    const commandCorrelationId: CorrelationId = command.metadata.correlationId;
    const useCaseName = ActivateTenantUseCase.name;

    this.logger.log(
      `Attempting to activate tenant: ${String(command.tenantId)}`,
      useCaseName,
      commandCorrelationId
    );

    try {
      const tenantIdAsAggregate = command.tenantId as unknown as AggregateId;

      const tenantResult: Result<
        Maybe<TenantEntity>,
        ExceptionBase | Error
      > = await this.tenantRepository.findOneById(tenantIdAsAggregate);

      if (isErr(tenantResult)) {
        const repoError = tenantResult.error;
        this.logger.error(
          `Error fetching tenant ${String(command.tenantId)}: ${
            repoError.message
          }`,
          repoError.stack,
          useCaseName,
          commandCorrelationId
        );
        return err(repoError);
      }

      const tenantMaybe: Maybe<TenantEntity> = tenantResult.value;
      if (Guard.isNil(tenantMaybe)) {
        const notFoundError = new NotFoundException(
          `Tenant with id ${String(command.tenantId)} not found.`,
          undefined,
          undefined,
          commandCorrelationId
        );
        this.logger.warn(
          notFoundError.message,
          useCaseName,
          commandCorrelationId
        );
        return err(notFoundError);
      }

      const tenant: TenantEntity = tenantMaybe;
      let activationResult: Result<
        void,
        ExceptionBase | ArgumentInvalidException // El método activate() puede devolver estos.
      >;
      try {
        activationResult = tenant.activate();
      } catch (unexpectedErrorInActivate: unknown) {
        const cause =
          unexpectedErrorInActivate instanceof Error
            ? unexpectedErrorInActivate
            : new Error(String(unexpectedErrorInActivate));
        this.logger.error(
          `Unexpected exception from tenant.activate() for ${String(
            command.tenantId
          )}: ${cause.message}`,
          cause.stack,
          useCaseName,
          commandCorrelationId
        );
        return err(
          new InternalServerErrorException(
            'Unexpected error during tenant activation logic.',
            cause,
            undefined,
            commandCorrelationId
          )
        );
      }

      if (isErr(activationResult)) {
        const domainErrorFromActivate = activationResult.error;
        this.logger.warn(
          `Domain validation failed for tenant activation ${String(
            command.tenantId
          )}: ${domainErrorFromActivate.message}`,
          domainErrorFromActivate.stack, // Asumiendo que ExceptionBase tiene stack
          useCaseName,
          commandCorrelationId
        );
        return err(domainErrorFromActivate);
      }

      const updateResult = await this.tenantRepository.update(tenant);
      if (isErr(updateResult)) {
        const updateError = updateResult.error;
        this.logger.error(
          `Error updating tenant ${String(
            command.tenantId
          )} after activation: ${updateError.message}`,
          updateError.stack,
          useCaseName,
          commandCorrelationId
        );
        return err(updateError);
      }

      this.logger.log(
        `Tenant ${String(command.tenantId)} activated successfully.`,
        useCaseName,
        commandCorrelationId
      );
      return ok(undefined);
    } catch (errorCaught: unknown) {
      let internalErrorCause: Error;
      let originalErrorStringForLog: string;

      if (errorCaught instanceof Error) {
        internalErrorCause = errorCaught;
        originalErrorStringForLog = errorCaught.message;
      } else {
        originalErrorStringForLog = String(errorCaught);
        internalErrorCause = new Error(originalErrorStringForLog);
      }

      const stackTrace = internalErrorCause.stack
        ? internalErrorCause.stack
        : 'No stack trace available';
      this.logger.error(
        `Unexpected error during tenant activation for ${String(
          command.tenantId
        )}: ${originalErrorStringForLog}`,
        stackTrace,
        useCaseName,
        commandCorrelationId
      );
      return err(
        new InternalServerErrorException(
          'Failed to activate tenant.',
          internalErrorCause,
          undefined,
          commandCorrelationId
        )
      );
    }
  }
}
// RUTA: libs/core/application/tenancy/src/lib/use-cases/activate-tenant/activate-tenant.use-case.ts
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Adición de todas las importaciones necesarias.",
    "justificacion": "Se añadieron las importaciones para `ICommandHandler`, `ICommandMetadata`, `LOGGER_PORT`, `ILoggerPort`, `TenantEntity`, `TENANT_REPOSITORY_PORT`, `ITenantRepository`, `ArgumentInvalidException`, `ExceptionBase`, `InternalServerErrorException`, `NotFoundException`, `err`, `isErr`, `ok`, `Result`, `AggregateId`, `CorrelationId`, `Maybe`, `Guard`, y `ActivateTenantCommand`. Esto resuelve los errores `no-undef`.",
    "impacto": "El archivo ahora es sintácticamente correcto y ESLint no debería reportar errores `no-undef`."
  },
  {
    "mejora": "Tipado más preciso para `activationResult`.",
    "justificacion": "El método `tenant.activate()` devuelve `Result<void, InvalidTenantStatusTransitionError | ArgumentInvalidException>`. Se ajustó el tipo de `activationResult` para reflejar esto.",
    "impacto": "Mejora la seguridad de tipos."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Los decoradores `@NestJsCommandHandler` y `@NestJsInject` son placeholders. Si esta librería no se va a integrar directamente con NestJS (lo cual es la idea de una capa de aplicación pura), estos decoradores deberían eliminarse o reemplazarse por un mecanismo de registro agnóstico al framework si se usa un contenedor de DI."
  },
  {
    "nota": "El uso de `String(command.tenantId)` es para asegurar que el ID brandeado se loguee como string. Podría ser más elegante tener un método `.value` o `.toString()` en los Branded Types."
  }
]
*/
