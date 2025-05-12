// libs/core/application/tenancy/src/lib/use-cases/activate-tenant/activate-tenant.use-case.ts
import { ICommandHandler } from '@dfs-suite/core-domain-shared-kernel-commands-queries';
import { ActivateTenantCommand } from '../../commands/activate-tenant/activate-tenant.command';
import { Result, err, ok } from '@dfs-suite/shared-result';
import { ExceptionBase, NotFoundException } from '@dfs-suite/shared-errors';
import { ITenantRepository, TENANT_REPOSITORY_PORT, InvalidTenantStatusTransitionError } from '@dfs-suite/core-domain-tenancy';
import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/core-domain-shared-kernel-ports';

const CommandHandler = (_commandType: unknown) => <T extends { new (...args: any[]): object }>(_target: T): T | void => _target;
const Inject = (_token: unknown) => (_target: object, _propertyKey: string | symbol | undefined, _parameterIndex?: number): void => {};

@CommandHandler(ActivateTenantCommand)
export class ActivateTenantUseCase implements ICommandHandler<ActivateTenantCommand, void> {
  constructor(
    @Inject(TENANT_REPOSITORY_PORT)
    private readonly tenantRepository: ITenantRepository,
    @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort,
  ) {}

  async execute(command: ActivateTenantCommand): Promise<Result<void, ExceptionBase | Error>> {
    const correlationId = command.metadata.correlationId;
    this.logger.log(`Attempting to activate tenant: ${command.tenantId}`, ActivateTenantUseCase.name, correlationId);

    try {
      const tenantResult = await this.tenantRepository.findOneById(command.tenantId);

      if (tenantResult.isErr()) {
        return err(tenantResult.unwrapErr());
      }
      const tenantOption = tenantResult.unwrap();
      if (tenantOption.isNone()) {
        return err(new NotFoundException(`Tenant with id ${command.tenantId} not found.`, undefined, undefined, correlationId));
      }

      const tenant = tenantOption.unwrap();

      try {
        tenant.activate(); // Lógica de dominio para cambiar estado y añadir evento
      } catch (domainError) {
        if (domainError instanceof ArgumentInvalidException) { // Asumiendo que activate puede lanzar esto
             return err(new InvalidTenantStatusTransitionError(domainError.message, domainError, undefined, correlationId));
        }
        return err(domainError as Error); // Re-lanzar otro error de dominio
      }

      const updateResult = await this.tenantRepository.update(tenant); // Guardar y publicar eventos
      if (updateResult.isErr()) {
        return err(updateResult.unwrapErr());
      }

      this.logger.log(`Tenant ${command.tenantId} activated successfully.`, ActivateTenantUseCase.name, correlationId);
      return ok(undefined);

    } catch (error: unknown) {
      // ... (manejo de error genérico como en CreateTenantUseCase)
      const internalError = error instanceof Error ? error : new Error(String(error));
      this.logger.error('Error during tenant activation', internalError.stack ?? 'No stack trace', ActivateTenantUseCase.name, correlationId);
      return err(new InternalServerErrorException('Failed to activate tenant.', internalError, undefined, correlationId));
    }
  }
}
// Necesitaremos importar ArgumentInvalidException
import { ArgumentInvalidException } from '@dfs-suite/shared-errors';
