// libs/core/application/tenancy/src/lib/use-cases/activate-tenant/activate-tenant.use-case.ts
import { ICommandHandler } from '@dfs-suite/core-domain-shared-kernel-commands-queries';
import { ActivateTenantCommand } from '../../commands/activate-tenant/activate-tenant.command';
import { Result, err, ok, isErr } from '@dfs-suite/shared-result';
import { ExceptionBase, NotFoundException, ArgumentInvalidException, InternalServerErrorException } from '@dfs-suite/shared-errors';
import { ITenantRepository, TenantEntity, InvalidTenantStatusTransitionError } from '@dfs-suite/core-domain-tenancy';
import { ILoggerPort } from '@dfs-suite/core-domain-shared-kernel-ports';
import { Maybe } from '@dfs-suite/shared-types';
import { Guard } from '@dfs-suite/shared-utils';

export class ActivateTenantUseCase implements ICommandHandler<ActivateTenantCommand, void> {
  constructor(
    private readonly tenantRepository: ITenantRepository,
    private readonly logger: ILoggerPort,
  ) {}

  async execute(command: ActivateTenantCommand): Promise<Result<void, ExceptionBase | Error>> {
    const correlationId = command.metadata.correlationId;
    const useCaseName = ActivateTenantUseCase.name;
    this.logger.log(`Attempting to activate tenant: ${command.tenantId}`, useCaseName, correlationId);

    try {
      const tenantResult: Result<Maybe<TenantEntity>, ExceptionBase | Error> =
        await this.tenantRepository.findOneById(command.tenantId);

      if (isErr(tenantResult)) {
        const repoError = tenantResult.error;
        this.logger.error(
            `Error fetching tenant ${command.tenantId}: ${repoError.message}`,
            repoError.stack,
            useCaseName,
            correlationId
        );
        return err(repoError);
      }

      const tenantMaybe: Maybe<TenantEntity> = tenantResult.value;
      if (Guard.isNil(tenantMaybe)) {
        const notFoundError = new NotFoundException(`Tenant with id ${command.tenantId} not found.`, undefined, undefined, correlationId);
        this.logger.warn(notFoundError.message, useCaseName, correlationId);
        return err(notFoundError);
      }

      const tenant: TenantEntity = tenantMaybe;

      try {
        tenant.activate();
      } catch (domainErrorCaught: unknown) {
        let causeForLog: Error;
        let originalDomainErrorString: string;

        if (domainErrorCaught instanceof Error) {
          causeForLog = domainErrorCaught;
          originalDomainErrorString = domainErrorCaught.message;
        } else {
          // eslint-disable-next-line @typescript-eslint/no-base-to-string
          originalDomainErrorString = String(domainErrorCaught);
          causeForLog = new Error(originalDomainErrorString);
        }

        this.logger.error(
            `Domain error during tenant activation for ${command.tenantId}: ${originalDomainErrorString}`,
            causeForLog.stack,
            useCaseName,
            correlationId
        );

        if (domainErrorCaught instanceof ArgumentInvalidException) {
          const transitionError = new InvalidTenantStatusTransitionError(causeForLog.message, causeForLog, undefined, correlationId);
          return err(transitionError);
        }
        return err(causeForLog);
      }

      const updateResult = await this.tenantRepository.update(tenant);
      if (isErr(updateResult)) {
        const updateError = updateResult.error;
        this.logger.error(
            `Error updating tenant ${command.tenantId} after activation: ${updateError.message}`,
            updateError.stack,
            useCaseName,
            correlationId
        );
        return err(updateError);
      }

      this.logger.log(`Tenant ${command.tenantId} activated successfully.`, useCaseName, correlationId);
      return ok(undefined);

    } catch (errorCaught: unknown) {
      let internalErrorCause: Error;
      let originalErrorString: string;

      if (errorCaught instanceof Error) {
        internalErrorCause = errorCaught;
        originalErrorString = errorCaught.message;
      } else {
        // eslint-disable-next-line @typescript-eslint/no-base-to-string
        originalErrorString = String(errorCaught);
        internalErrorCause = new Error(originalErrorString);
      }

      this.logger.error(
        `Unexpected error during tenant activation for ${command.tenantId}: ${originalErrorString}`,
        internalErrorCause.stack ?? 'No stack trace',
        useCaseName,
        correlationId
      );
      return err(new InternalServerErrorException('Failed to activate tenant.', internalErrorCause, undefined, correlationId));
    }
  }
}

/* SECCIÓN DE MEJORAS
// (Mismas que antes)
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
// (Mismas que antes)
*/
