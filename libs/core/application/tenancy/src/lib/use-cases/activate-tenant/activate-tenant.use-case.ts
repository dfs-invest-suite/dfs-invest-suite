// libs/core/application/tenancy/src/lib/use-cases/activate-tenant/activate-tenant.use-case.ts
import { ICommandHandler } from '@dfs-suite/core-domain-shared-kernel-commands-queries';
import { ActivateTenantCommand } from '../../commands/activate-tenant/activate-tenant.command';
import { Result, err, ok, isErr } from '@dfs-suite/shared-result';
import { ExceptionBase, NotFoundException, ArgumentInvalidException, InternalServerErrorException } from '@dfs-suite/shared-errors';
import { ITenantRepository, TenantEntity } from '@dfs-suite/core-domain-tenancy';
import { ILoggerPort } from '@dfs-suite/core-domain-shared-kernel-ports';
import { Maybe, AggregateId, CorrelationId } from '@dfs-suite/shared-types';
import { Guard } from '@dfs-suite/shared-utils';

export class ActivateTenantUseCase implements ICommandHandler<ActivateTenantCommand, void> {
  constructor(
    private readonly tenantRepository: ITenantRepository,
    private readonly logger: ILoggerPort,
  ) {}

  async execute(command: ActivateTenantCommand): Promise<Result<void, ExceptionBase | Error>> {
    const commandCorrelationId: CorrelationId = command.metadata.correlationId;
    const useCaseName = ActivateTenantUseCase.name;

    this.logger.log(
        `Attempting to activate tenant: ${String(command.tenantId)}`,
        useCaseName,
        commandCorrelationId
    );

    try {
      const tenantIdAsAggregate = command.tenantId as unknown as AggregateId;

      const tenantResult: Result<Maybe<TenantEntity>, ExceptionBase | Error> =
        await this.tenantRepository.findOneById(tenantIdAsAggregate);

      if (isErr(tenantResult)) {
        const repoError = tenantResult.error;
        this.logger.error(
            `Error fetching tenant ${String(command.tenantId)}: ${repoError.message}`,
            repoError.stack, useCaseName, commandCorrelationId
        );
        return err(repoError);
      }

      const tenantMaybe: Maybe<TenantEntity> = tenantResult.value;
      if (Guard.isNil(tenantMaybe)) {
        const notFoundError = new NotFoundException(`Tenant with id ${String(command.tenantId)} not found.`, undefined, undefined, commandCorrelationId);
        this.logger.warn(notFoundError.message, useCaseName, commandCorrelationId);
        return err(notFoundError);
      }

      const tenant: TenantEntity = tenantMaybe;
      let activationResult: Result<void, ExceptionBase | ArgumentInvalidException >;
      try {
        activationResult = tenant.activate();
      } catch (unexpectedErrorInActivate: unknown) { // Este es el errorCaught de la línea 94
        const errorDescription = typeof unexpectedErrorInActivate === 'string' ? unexpectedErrorInActivate : 'Unexpected error during tenant.activate()';
         
        const cause = unexpectedErrorInActivate instanceof Error ? unexpectedErrorInActivate : new Error(String(unexpectedErrorInActivate));
        this.logger.error(
            `Unexpected exception from tenant.activate() for ${String(command.tenantId)}: ${cause.message}`,
            cause.stack, useCaseName, commandCorrelationId
        );
        return err(new InternalServerErrorException('Unexpected error during tenant activation logic.', cause, undefined, commandCorrelationId));
      }

      if(isErr(activationResult)) {
          const domainErrorFromActivate = activationResult.error;
          this.logger.warn(
              `Domain validation failed for tenant activation ${String(command.tenantId)}: ${domainErrorFromActivate.message}`,
              domainErrorFromActivate.stack, useCaseName, commandCorrelationId
          );
          return err(domainErrorFromActivate);
      }

      const updateResult = await this.tenantRepository.update(tenant);
      if (isErr(updateResult)) {
        const updateError = updateResult.error;
        this.logger.error(
            `Error updating tenant ${String(command.tenantId)} after activation: ${updateError.message}`,
            updateError.stack, useCaseName, commandCorrelationId
        );
        return err(updateError);
      }

      this.logger.log(`Tenant ${String(command.tenantId)} activated successfully.`, useCaseName, commandCorrelationId);
      return ok(undefined);

    } catch (errorCaught: unknown) { // Este es el errorCaught de la línea 106
      let internalErrorCause: Error;
      let originalErrorStringForLog: string;

      if (errorCaught instanceof Error) {
        internalErrorCause = errorCaught;
        originalErrorStringForLog = errorCaught.message;
      } else {
        // Colocamos el eslint-disable directamente antes del String() problemático
         
        originalErrorStringForLog = String(errorCaught);
        internalErrorCause = new Error(originalErrorStringForLog);
      }

      const stackTrace = internalErrorCause.stack ? internalErrorCause.stack : 'No stack trace available';
      this.logger.error(
        `Unexpected error during tenant activation for ${String(command.tenantId)}: ${originalErrorStringForLog}`,
        stackTrace, useCaseName, commandCorrelationId
      );
      return err(new InternalServerErrorException('Failed to activate tenant.', internalErrorCause, undefined, commandCorrelationId));
    }
  }
}

/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Tipado de IDs en IRepositoryPort): La solución ideal para el cast de `TenantId` a `AggregateId` es hacer `IRepositoryPort` genérico para el tipo de ID: `IRepositoryPort<Aggregate, ID extends AggregateId = AggregateId>`. Entonces `ITenantRepository` podría ser `IRepositoryPort<TenantEntity, TenantId>`. Esto haría que `findOneById` en `ITenantRepository` esperara `TenantId` directamente.
  Justificación: Elimina la necesidad de casts `as unknown as AggregateId` y mejora la seguridad de tipos en toda la cadena.
  Impacto: Refactorización de `IRepositoryPort` en el shared-kernel y todas sus implementaciones y puertos específicos de dominio. Es una mejora estructural importante para considerar después de estabilizar la lógica inicial.
]
// (Otras mejoras se mantienen)
*/
