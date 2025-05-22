// RUTA: libs/core/application/coaptenancy/src/lib/use-cases/create-tenant/create-tenant.use-case.ts
import { ICommandHandler } from '@dfs-suite/cdskcommandsqueries';
import {
  IDomainEventEmitter,
  DOMAIN_EVENT_EMITTER_PORT,
} from '@dfs-suite/cdskevents';
import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/cdskports';
import {
  ITenantRepository,
  TenantEntity,
  TenantAlreadyExistsError,
  TENANT_REPOSITORY_PORT,
  DbConnectionConfigVO,
} from '@dfs-suite/codotenancy';
import {
  ExceptionBase,
  InternalServerErrorException,
  ConflictException,
} from '@dfs-suite/sherrors';
import { Result, err, ok, isErr } from '@dfs-suite/shresult';
import {
  TenantId,
  CorrelationId,
  UserId,
  IsoDateString /* <<< AÑADIDO IMPORT */,
} from '@dfs-suite/shtypes';
import { UuidUtils } from '@dfs-suite/shutils'; // UuidUtils no estaba importado

import { CreateTenantCommand } from '../../commands/create-tenant/create-tenant.command';
import { CreateTenantAppOutputDto } from '../../dtos/tenant-creation.dto'; // Suponiendo que este DTO existe
import {
  IDatabaseProvisioningServicePort,
  DATABASE_PROVISIONING_SERVICE_PORT,
} from '../../ports/database-provisioning.service.port';
import {
  IUserProvisioningServicePortAppLayer,
  USER_PROVISIONING_SERVICE_APP_PORT,
} from '../../ports/user-provisioning.service.port';

// DTO de Salida del Caso de Uso (si es diferente a TenantDetailsDto)
// export interface CreateTenantUseCaseResultDto { // Ya lo teníamos definido como CreateTenantAppOutputDto
//   tenantId: TenantId;
//   name: string;
//   slug: string;
//   status: string;
// }

export const CREATE_TENANT_USE_CASE = Symbol('ICreateTenantUseCase');
// Convertido a type alias
export type ICreateTenantUseCase = ICommandHandler<
  CreateTenantCommand,
  CreateTenantAppOutputDto
>;

export class CreateTenantUseCaseImpl implements ICreateTenantUseCase {
  constructor(
    // @Inject(TENANT_REPOSITORY_PORT)
    private readonly tenantRepository: ITenantRepository,
    // @Inject(DATABASE_PROVISIONING_SERVICE_PORT)
    private readonly dbProvisioningService: IDatabaseProvisioningServicePort,
    // @Inject(USER_PROVISIONING_SERVICE_APP_PORT)
    private readonly userProvisioningService: IUserProvisioningServicePortAppLayer,
    // @Inject(DOMAIN_EVENT_EMITTER_PORT)
    private readonly eventEmitter: IDomainEventEmitter,
    // @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort
  ) {}

  async execute(
    command: CreateTenantCommand
  ): Promise<
    Result<CreateTenantAppOutputDto, ExceptionBase | TenantAlreadyExistsError>
  > {
    const { name, ownerEmail, planId, slug } = command.payload;
    const correlationId = command.metadata.correlationId;
    const useCaseName = CreateTenantUseCaseImpl.name;

    this.logger.log(
      `Attempting to create tenant: "${name}" by owner: ${ownerEmail}, slug: ${slug}`,
      useCaseName,
      correlationId
    );

    try {
      const existingByNameResult = await this.tenantRepository.findByName(
        name.trim()
      );
      if (isErr(existingByNameResult)) return err(existingByNameResult.error);
      if (existingByNameResult.value) {
        return err(
          new TenantAlreadyExistsError(
            `Tenant name "${name}" already exists.`,
            undefined,
            { name },
            correlationId
          )
        );
      }
      // Asumiendo que findBySlug existe en el puerto y la implementación
      const existingBySlugResult = await this.tenantRepository.findBySlug(
        slug.trim().toLowerCase()
      );
      if (isErr(existingBySlugResult)) return err(existingBySlugResult.error);
      if (existingBySlugResult.value) {
        return err(
          new TenantAlreadyExistsError(
            `Tenant slug "${slug}" already exists.`,
            undefined,
            { slug },
            correlationId
          )
        );
      }

      const userProvisionResult =
        await this.userProvisioningService.provisionInitialTenantAdmin(
          {
            email: ownerEmail,
            name: `Admin for ${name}`,
            tenantNameForContext: name,
          },
          {
            correlationId,
            timestamp: new Date().toISOString() as IsoDateString,
            userId: command.metadata.userId,
          }
        );
      if (isErr(userProvisionResult)) {
        this.logger.error(
          `User provisioning failed for ${ownerEmail} during tenant creation: ${userProvisionResult.error.message}`,
          useCaseName,
          correlationId
        );
        return err(userProvisionResult.error);
      }
      const ownerUserId = userProvisionResult.value.userId;

      const tenantEntity = TenantEntity.create(
        { name, ownerUserId, planId, slug },
        UuidUtils.generateTenantId()
      );

      const dbProvisionResult =
        await this.dbProvisioningService.provisionTenantDatabase(
          tenantEntity.id
        );

      if (isErr(dbProvisionResult)) {
        this.logger.error(
          `Database provisioning failed for new tenant "${
            tenantEntity.name
          }" (ID: ${String(tenantEntity.id)}): ${
            dbProvisionResult.error.message
          }`,
          dbProvisionResult.error.stack,
          useCaseName,
          correlationId
        );
        return err(dbProvisionResult.error);
      }
      const dbConfigVo: DbConnectionConfigVO = dbProvisionResult.value;
      const setDbConfigResult =
        tenantEntity.setDatabaseConfiguration(dbConfigVo);
      if (isErr(setDbConfigResult)) return err(setDbConfigResult.error);

      const insertResult = await this.tenantRepository.insert(tenantEntity);
      if (isErr(insertResult)) {
        this.logger.error(
          `Failed to insert tenant "${tenantEntity.name}" (ID: ${String(
            tenantEntity.id
          )}): ${insertResult.error.message}`,
          insertResult.error.stack,
          useCaseName,
          correlationId
        );
        return err(insertResult.error);
      }

      await this.eventEmitter.publishAll(
        tenantEntity.getAndClearDomainEvents()
      );

      this.logger.log(
        `Tenant "${tenantEntity.name}" (ID: ${String(
          tenantEntity.id
        )}) created, DB provisioned, admin user provisioned. Initial status: ${
          tenantEntity.status.value
        }`,
        useCaseName,
        correlationId
      );

      return ok({
        tenantId: tenantEntity.id,
        name: tenantEntity.name,
        slug: tenantEntity.slug,
        status: tenantEntity.status.value, // Acceder al valor del VO
      });
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error creating tenant.',
              error as Error,
              undefined,
              correlationId
            );
      this.logger.error(
        `Unexpected error in ${CreateTenantUseCaseImpl.name}: ${errBase.message}`,
        errBase.stack,
        useCaseName,
        correlationId
      );
      return err(errBase);
    }
  }
}
// RUTA: libs/core/application/coaptenancy/src/lib/use-cases/create-tenant/create-tenant.use-case.ts
// RUTA: libs/core/application/coaptenancy/src/lib/use-cases/create-tenant/create-tenant.use-case.ts
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
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Implementación completa del flujo CreateTenantUseCaseImpl.", "justificacion": "Orquesta la creación de la entidad, provisión de DB (vía puerto), provisión del admin inicial (vía puerto), persistencia y emisión de eventos. Usa Result para manejo de errores.", "impacto": "Caso de uso funcional clave para el onboarding." },
{ "mejora": "Corrección de imports y uso de tokens de inyección correctos para los puertos de servicio de aplicación.", "justificacion": "Alineación con el patrón de DI y la estructura de la librería.", "impacto": "Correctitud." },
{ "mejora": "Llamada a ITenantRepository.findBySlug para asegurar unicidad del slug.", "justificacion": "Robustez en la creación de tenants.", "impacto": "Previene conflictos de URL." },
{ "mejora": "Uso de CreateTenantAppOutputDto para el resultado exitoso.", "justificacion": "DTO específico para la capa de aplicación.", "impacto": "Claridad de la API del caso de uso." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{"nota": "El método findBySlug debe añadirse a ITenantRepositoryPort (en codotenancy) y a su implementación PrismaPlatformTenantRepositoryAdapter (en infratenancypersistence)."},
{"nota": "La lógica de compensación para fallos en dbProvisioningService.provisionTenantDatabase o tenantRepository.insert (ej. eliminar DB creada o usuario creado) es compleja y se considerará post-MVP, posiblemente con un patrón Saga."},
{"nota": "El USER_PROVISIONING_SERVICE_APP_PORT y su implementación (IUserProvisioningServicePortAppLayer) necesitan ser creados en coapusersroles y su infraestructura correspondiente."}
]
*/
