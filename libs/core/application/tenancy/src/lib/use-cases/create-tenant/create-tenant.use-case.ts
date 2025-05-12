// libs/core/application/tenancy/src/lib/use-cases/create-tenant/create-tenant.use-case.ts
import { ICommandHandler } from '@dfs-suite/core-domain-shared-kernel-commands-queries';
import { CreateTenantCommand } from '../../commands/create-tenant/create-tenant.command';
import { TenantId, UserId, Maybe } from '@dfs-suite/shared-types';
import { Result, err, ok } from '@dfs-suite/shared-result';
import { ExceptionBase, InternalServerErrorException } from '@dfs-suite/shared-errors';
import {
  ITenantRepository,
  TenantEntity,
  TenantAlreadyExistsError,
  TENANT_REPOSITORY_PORT
} from '@dfs-suite/core-domain-tenancy';
import {
  IDatabaseProvisioningServicePort,
  DATABASE_PROVISIONING_SERVICE_PORT
} from '../../ports/database-provisioning.service.port';
import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/core-domain-shared-kernel-ports';

// Placeholders para decoradores
const CommandHandler = (_commandType: unknown) =>
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  <T extends { new (...args: any[]): object }>(_target: T): T | void => _target;

// Eliminado el eslint-disable-next-line @typescript-eslint/no-unused-vars previo
const Inject = (_token: unknown) =>
  (_target: object, _propertyKey: string | symbol | undefined, _parameterIndex?: number): void => {
    // Placeholder
  };

@CommandHandler(CreateTenantCommand)
export class CreateTenantUseCase implements ICommandHandler<CreateTenantCommand, TenantId> {
  constructor(
    @Inject(TENANT_REPOSITORY_PORT)
    private readonly tenantRepository: ITenantRepository,
    @Inject(DATABASE_PROVISIONING_SERVICE_PORT)
    private readonly dbProvisioningService: IDatabaseProvisioningServicePort,
    @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort,
  ) {}

  async execute(command: CreateTenantCommand): Promise<Result<TenantId, ExceptionBase | Error>> {
    const correlationId = command.metadata.correlationId;
    this.logger.log(`Attempting to create tenant: ${command.name}`, CreateTenantUseCase.name, correlationId);

    try {
      const existingTenantResult: Result<Maybe<TenantEntity>, ExceptionBase | Error> =
        await this.tenantRepository.findByName(command.name);

      if (existingTenantResult.isErr()) {
          const findError = existingTenantResult.unwrapErr();
          this.logger.error(
            'Error fetching tenant by name during creation',
            findError instanceof Error ? findError.stack : String(findError),
            CreateTenantUseCase.name,
            correlationId
          );
          return err(findError);
      }

      const existingTenant = existingTenantResult.unwrap();
      if (existingTenant) {
        this.logger.warn(`Tenant with name "${command.name}" already exists.`, CreateTenantUseCase.name, correlationId);
        return err(new TenantAlreadyExistsError(`Tenant with name "${command.name}" already exists.`, undefined, undefined, correlationId));
      }

      const tenantEntity = TenantEntity.create({
        name: command.name,
        ownerUserId: command.ownerEmail as UserId,
        planId: command.planId,
      });

      const dbConfigResult = await this.dbProvisioningService.provisionTenantDatabase(tenantEntity.id);
      if (dbConfigResult.isErr()) {
        const provisioningError = dbConfigResult.unwrapErr();
        this.logger.error(
            'Database provisioning failed for new tenant',
            provisioningError instanceof Error ? provisioningError.stack : String(provisioningError),
            CreateTenantUseCase.name,
            correlationId
        );
        return err(provisioningError);
      }

      const insertResult = await this.tenantRepository.insert(tenantEntity);
      if (insertResult.isErr()) {
         const insertError = insertResult.unwrapErr();
         this.logger.error(
            'Failed to insert tenant into platform database',
            insertError instanceof Error ? insertError.stack : String(insertError),
            CreateTenantUseCase.name,
            correlationId
        );
        return err(insertError);
      }

      this.logger.log(`Tenant ${tenantEntity.id} created successfully.`, CreateTenantUseCase.name, correlationId);
      return ok(tenantEntity.id);

    } catch (error: unknown) {
      let errorMessage = 'An unknown error occurred';
      let errorStack: string | undefined = 'No stack trace available';
      const cause = error instanceof Error ? error : undefined;

      if (error instanceof Error) {
        errorMessage = error.message;
        errorStack = error.stack ?? errorStack;
      } else if (typeof error === 'string') {
        errorMessage = error;
      } else if (typeof error === 'object' && error !== null && 'message' in error && typeof error.message === 'string') {
        errorMessage = error.message;
      } else {
        try {
          errorMessage = JSON.stringify(error);
        } catch {
          errorMessage = 'Failed to stringify unknown error object.';
        }
      }

      this.logger.error(
        `Unexpected error during tenant creation: ${errorMessage}`,
        errorStack,
        CreateTenantUseCase.name,
        correlationId
      );
      return err(new InternalServerErrorException('Failed to create tenant due to an unexpected error.', cause, { originalError: errorMessage }, correlationId));
    }
  }
}
