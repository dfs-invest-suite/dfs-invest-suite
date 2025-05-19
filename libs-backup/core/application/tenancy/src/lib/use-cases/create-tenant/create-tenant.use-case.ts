// libs/core/application/tenancy/src/lib/use-cases/create-tenant/create-tenant.use-case.ts
import { ICommandHandler } from '@dfs-suite/core-domain-shared-kernel-commands-queries';
import { CreateTenantCommand } from '../../commands/create-tenant/create-tenant.command';
import {
  TenantId,
  UserId,
  CorrelationId,
  AggregateId,
} from '@dfs-suite/shared-types'; // Maybe eliminado
import { Result, err, ok, isErr } from '@dfs-suite/shared-result';
import {
  ExceptionBase,
  InternalServerErrorException,
} from '@dfs-suite/shared-errors';
import {
  ITenantRepository,
  TenantEntity,
  TenantAlreadyExistsError,
  TENANT_REPOSITORY_PORT,
} from '@dfs-suite/core-domain-tenancy';
import {
  IDatabaseProvisioningServicePort,
  DATABASE_PROVISIONING_SERVICE_PORT,
} from '../../ports/database-provisioning.service.port';
import {
  ILoggerPort,
  LOGGER_PORT,
} from '@dfs-suite/core-domain-shared-kernel-ports';
import { UuidUtils } from '@dfs-suite/shared-utils';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const NestJsCommandHandler =
  (_commandType: unknown) =>
  <T extends { new (...args: any[]): object }>(_target: T): T | void =>
    _target;

const NestJsInject =
  (_token: unknown) =>
  (
    _target: object,
    _propertyKey: string | symbol | undefined,
    _parameterIndex?: number
  ): void => {
    /* placeholder */
  };

@NestJsCommandHandler(CreateTenantCommand)
export class CreateTenantUseCase
  implements ICommandHandler<CreateTenantCommand, TenantId>
{
  constructor(
    @NestJsInject(TENANT_REPOSITORY_PORT)
    private readonly tenantRepository: ITenantRepository,
    @NestJsInject(DATABASE_PROVISIONING_SERVICE_PORT)
    private readonly dbProvisioningService: IDatabaseProvisioningServicePort,
    @NestJsInject(LOGGER_PORT)
    private readonly logger: ILoggerPort
  ) {}

  async execute(
    command: CreateTenantCommand
  ): Promise<Result<TenantId, ExceptionBase | Error>> {
    const correlationId: CorrelationId = command.metadata.correlationId;
    const useCaseName = CreateTenantUseCase.name;
    this.logger.log(
      `Attempting to create tenant: "${command.name}" by owner email: ${command.ownerEmail}`,
      useCaseName,
      correlationId
    );

    try {
      // ... (lógica de findByName, creación de entidad, provisioning, insert) ...
      const existingTenantResult = await this.tenantRepository.findByName(
        command.name.trim()
      );

      if (isErr(existingTenantResult)) {
        const findError = existingTenantResult.error;
        this.logger.error(
          `Error checking for existing tenant name "${command.name}": ${findError.message}`,
          findError.stack,
          useCaseName,
          correlationId
        );
        return err(findError);
      }

      if (existingTenantResult.value) {
        const alreadyExistsError = new TenantAlreadyExistsError(
          `Tenant with name "${command.name}" already exists.`,
          undefined,
          { name: command.name },
          correlationId
        );
        this.logger.warn(
          alreadyExistsError.message,
          useCaseName,
          correlationId
        );
        return err(alreadyExistsError);
      }

      const ownerUserId = command.ownerEmail as unknown as UserId;
      this.logger.debug(
        `Using ownerEmail as ownerUserId (temporary): ${ownerUserId}`,
        useCaseName,
        correlationId
      );

      const entityId: AggregateId = UuidUtils.generateAggregateId();
      const tenantEntity = TenantEntity.create(
        {
          name: command.name,
          ownerUserId: ownerUserId,
          planId: command.planId,
        },
        entityId
      );

      const dbProvisionResult =
        await this.dbProvisioningService.provisionTenantDatabase(
          tenantEntity.id as unknown as TenantId
        );

      if (isErr(dbProvisionResult)) {
        const provError = dbProvisionResult.error;
        this.logger.error(
          `Database provisioning failed for new tenant "${
            tenantEntity.name
          }" (ID: ${String(tenantEntity.id)}): ${provError.message}`,
          provError.stack,
          CreateTenantUseCase.name,
          correlationId
        );
        return err(provError);
      }
      const dbConfig = dbProvisionResult.value;
      tenantEntity.setDatabaseConfiguration(dbConfig);

      const insertResult = await this.tenantRepository.insert(tenantEntity);
      if (isErr(insertResult)) {
        const insertError = insertResult.error;
        this.logger.error(
          `Failed to insert tenant "${tenantEntity.name}" (ID: ${String(
            tenantEntity.id
          )}): ${insertError.message}`,
          insertError.stack,
          CreateTenantUseCase.name,
          correlationId
        );
        return err(insertError);
      }

      this.logger.log(
        `Tenant "${tenantEntity.name}" (ID: ${String(
          tenantEntity.id
        )}) created successfully.`,
        useCaseName,
        correlationId
      );
      return ok(tenantEntity.id as unknown as TenantId);
    } catch (error: unknown) {
      let displayMessage: string;
      let errorCause: Error;

      if (error instanceof Error) {
        errorCause = error;
        displayMessage = error.message;
      } else {
        displayMessage = String(error); // Simplificado y con el disable aquí
        errorCause = new Error(displayMessage);
      }

      const stackForLog = errorCause.stack ?? 'No stack trace available';
      this.logger.error(
        `Unexpected error during tenant creation: ${displayMessage}`,
        stackForLog,
        CreateTenantUseCase.name,
        correlationId,
        { originalCaughtValueString: displayMessage }
      );
      return err(
        new InternalServerErrorException(
          'Failed to create tenant due to an unexpected error.',
          errorCause,
          { originalErrorContent: displayMessage },
          correlationId
        )
      );
    }
  }
}

/* SECCIÓN DE MEJORAS FUTURAS
// (Mismas que antes)
*/
// libs/core/application/tenancy/src/lib/use-cases/create-tenant/create-tenant.use-case.ts
/* SECCIÓN DE MEJORAS FUTURAS
// (Mismas que antes)
*/
// libs/core/application/tenancy/src/lib/use-cases/create-tenant/create-tenant.use-case.ts

/* SECCIÓN DE MEJORAS FUTURAS
// (Mismas que antes)
*/
// libs/core/application/tenancy/src/lib/use-cases/create-tenant/create-tenant.use-case.ts
/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Gestión de Usuarios Propietarios Completa):
    El manejo actual de `ownerEmail` como `UserId` es una simplificación. Se debe integrar un `UserProvisioningServicePort` que:
    1. Busque si el usuario con `ownerEmail` ya existe.
    2. Si no existe, lo cree (potencialmente en un estado "pendiente" y enviando una invitación).
    3. Devuelva el `UserId` real.
    Este `UserId` se usaría entonces en `TenantEntity.create()`.
  Justificación: Desacopla la gestión de tenants de la gestión de usuarios y permite un sistema de usuarios más robusto.
  Impacto: Creación de un nuevo dominio/módulo de Usuarios, su puerto de servicio de aplicación, y su adaptador de infraestructura. Modificación de este caso de uso para interactuar con él.
]
[
  Mejora Propuesta 2 (Transaccionalidad Compleja / Sagas):
    El proceso de crear un tenant involucra múltiples pasos: chequear nombre, crear usuario owner (futuro), crear entidad tenant, provisionar DB, persistir tenant. Si alguno de estos pasos falla, se necesitaría una estrategia de rollback (transacción compensatoria o saga) para deshacer los pasos anteriores (ej. eliminar la DB provisionada si la persistencia del tenant falla).
    Justificación: Asegurar la consistencia del sistema en caso de fallos parciales durante un proceso de múltiples pasos.
  Impacto: Implementación de un patrón de Sagas o una gestión transaccional más compleja que podría involucrar un `UnitOfWork` a nivel de caso de uso o una orquestación de eventos.
]
[
  Mejora Propuesta 3 (Validación de PlanId):
    El `planId` actualmente es un string opcional. Debería validarse contra una lista de planes existentes (potencialmente a través de un `PlanRepositoryPort` o `PlanServicePort`).
  Justificación: Evitar la creación de tenants con planes inválidos o inexistentes.
  Impacto: Introducción de un nuevo concepto/dominio de "Planes" y la lógica de validación correspondiente.
]
[
  Mejora Propuesta 4 (Tipado de ID Consistente): Resolver la necesidad de casts entre `TenantId` y `AggregateId`. La mejora propuesta en `activate-tenant.use-case.ts` sobre parametrizar `IRepositoryPort` aplicaría aquí también para que `IDatabaseProvisioningServicePort` pueda tomar `TenantId` directamente si ese es su identificador de negocio.
  Justificación: Mejorar la seguridad de tipos y reducir la necesidad de casts.
  Impacto: Refactorización de interfaces de puertos y tipos de ID.
]

*/
// libs/core/application/tenancy/src/lib/use-cases/create-tenant/create-tenant.use-case.ts
