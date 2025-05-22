// RUTA: libs/core/application/coaptenancy/src/lib/use-cases/activate-tenant/activate-tenant.use-case.ts
import { ICommandHandler } from '@dfs-suite/cdskcommandsqueries';
import {
  IDomainEventEmitter,
  // DOMAIN_EVENT_EMITTER_PORT, // Token para DI
} from '@dfs-suite/cdskevents';
import {
  ILoggerPort,
  // LOGGER_PORT, // Token para DI
} from '@dfs-suite/cdskports';
import {
  ITenantRepository,
  // TenantEntity, // No se usa directamente el tipo TenantEntity aquí si el repo lo devuelve
  // TENANT_REPOSITORY_PORT, // Token para DI
  InvalidTenantStatusTransitionError,
} from '@dfs-suite/codotenancy';
import {
  ExceptionBase,
  NotFoundException,
  InternalServerErrorException,
  // ArgumentInvalidException, // No se usa directamente aquí
} from '@dfs-suite/sherrors';
import { Result, err, ok, isErr } from '@dfs-suite/shresult';
import { CorrelationId, Maybe } from '@dfs-suite/shtypes'; // AggregateId no es necesario
import { Guard } from '@dfs-suite/shutils';

import { ActivateTenantCommand } from '../../commands/activate-tenant/activate-tenant.command';

export const ACTIVATE_TENANT_USE_CASE = Symbol('IActivateTenantUseCase');
// Convertido a type alias
export type IActivateTenantUseCase = ICommandHandler<
  ActivateTenantCommand,
  void
>;

export class ActivateTenantUseCaseImpl implements IActivateTenantUseCase {
  constructor(
    // @Inject(TENANT_REPOSITORY_PORT)
    private readonly tenantRepository: ITenantRepository,
    // @Inject(DOMAIN_EVENT_EMITTER_PORT)
    private readonly eventEmitter: IDomainEventEmitter,
    // @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort
  ) {}

  async execute(
    command: ActivateTenantCommand
  ): Promise<Result<void, ExceptionBase | InvalidTenantStatusTransitionError>> {
    const { tenantId } = command.payload;
    const correlationId = command.metadata.correlationId;
    const useCaseName = ActivateTenantUseCaseImpl.name;

    this.logger.log(
      `Attempting to activate tenant: ${String(tenantId)}`,
      useCaseName,
      correlationId
    );

    try {
      const tenantResult = await this.tenantRepository.findOneById(tenantId);

      if (isErr(tenantResult)) {
        this.logger.error(
          `Error fetching tenant ${String(tenantId)} for activation: ${
            tenantResult.error.message
          }`,
          tenantResult.error.stack,
          useCaseName,
          correlationId
        );
        return err(tenantResult.error);
      }
      const tenant = tenantResult.value; // tenant es Maybe<TenantEntity>
      if (Guard.isNil(tenant)) {
        return err(
          new NotFoundException(
            `Tenant with id ${String(tenantId)} not found for activation.`,
            undefined,
            { tenantId: String(tenantId) },
            correlationId
          )
        );
      }

      const activationResult = tenant.activate(); // Llama al método de la entidad

      if (isErr(activationResult)) {
        this.logger.warn(
          `Domain validation failed for tenant activation ${String(
            tenantId
          )}: ${activationResult.error.message}`,
          activationResult.error.stack,
          useCaseName,
          correlationId
        );
        return err(activationResult.error);
      }

      const updateResult = await this.tenantRepository.update(tenant);
      if (isErr(updateResult)) {
        this.logger.error(
          `Error updating tenant ${String(
            tenantId
          )} after activation attempt: ${updateResult.error.message}`,
          updateResult.error.stack,
          useCaseName,
          correlationId
        );
        return err(updateResult.error);
      }

      await this.eventEmitter.publishAll(tenant.getAndClearDomainEvents());

      this.logger.log(
        `Tenant ${String(tenantId)} activated successfully by use case.`,
        useCaseName,
        correlationId
      );
      return ok(undefined);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error activating tenant.',
              error as Error,
              undefined,
              correlationId
            );
      this.logger.error(
        `Unexpected error in ${useCaseName} for tenant ${String(tenantId)}: ${
          errBase.message
        }`,
        errBase.stack,
        useCaseName,
        correlationId
      );
      return err(errBase);
    }
  }
}
// RUTA: libs/core/application/coaptenancy/src/lib/use-cases/activate-tenant/activate-tenant.use-case.ts
