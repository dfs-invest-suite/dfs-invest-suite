// libs/infrastructure/infrapersistence/src/lib/services/tenant-prisma.service.ts
import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  Scope,
} from '@nestjs/common';

import { PrismaClient as TenantPrismaClientOriginal } from '@prisma/client'; // Del schema de tenant

import {
  ITenantConfigurationRepository,
  TENANT_CONFIGURATION_REPOSITORY_PORT,
} from '@dfs-suite/codotenancy';
import {
  ITenantContextService,
  TENANT_CONTEXT_SERVICE_PORT, // <<< CORREGIDO
} from '@dfs-suite/core-application-multitenancy';
import { isErr } from '@dfs-suite/shresult';
import { TenantId } from '@dfs-suite/shtypes';

type ActualTenantPrismaClient = TenantPrismaClientOriginal;

@Injectable({ scope: Scope.REQUEST })
export class TenantPrismaService implements OnModuleDestroy {
  private static readonly clientCache = new Map<
    string,
    ActualTenantPrismaClient
  >();
  private readonly logger = new Logger(TenantPrismaService.name);
  private clientInstanceForRequest: ActualTenantPrismaClient | null = null;

  constructor(
    @Inject(TENANT_CONTEXT_SERVICE_PORT) // <<< CORREGIDO
    private readonly tenantContextService: ITenantContextService,
    @Inject(TENANT_CONFIGURATION_REPOSITORY_PORT)
    private readonly tenantConfigRepo: ITenantConfigurationRepository
  ) {}

  private async getTenantDbUrl(): Promise<string> {
    const tenantId = this.tenantContextService.getTenantIdOrFail();

    const dbConfigEntityResult =
      await this.tenantConfigRepo.findByTenantIdAndKey(
        tenantId,
        'DB_CONNECTION_STRING'
      );

    if (isErr(dbConfigEntityResult)) {
      // No es necesario !dbConfigEntityResult.value si isErr ya lo cubre
      const error = dbConfigEntityResult.error;
      this.logger.error(
        `DB_CONNECTION_STRING config not found for tenant ${String(
          tenantId
        )}. Error: ${error instanceof Error ? error.message : String(error)}`
      );
      throw new Error(
        `Database configuration (connection string) not found for tenant ${String(
          tenantId
        )}.`
      );
    }
    if (!dbConfigEntityResult.value) {
      // Chequeo adicional por si acaso
      this.logger.error(
        `DB_CONNECTION_STRING config not found (null value) for tenant ${String(
          tenantId
        )}.`
      );
      throw new Error(
        `Database configuration not found (null value) for tenant ${String(
          tenantId
        )}.`
      );
    }

    const connectionString = dbConfigEntityResult.value.value;
    if (!connectionString) {
      this.logger.error(
        `DB_CONNECTION_STRING is empty for tenant ${String(tenantId)}.`
      );
      throw new Error(
        `Database connection string is empty for tenant ${String(tenantId)}.`
      );
    }
    return connectionString;
  }

  private async initializeClientForTenant(
    tenantId: TenantId
  ): Promise<ActualTenantPrismaClient> {
    if (TenantPrismaService.clientCache.has(String(tenantId))) {
      const cachedClient = TenantPrismaService.clientCache.get(
        String(tenantId)
      )!;
      this.logger.debug(
        `Reusing cached PrismaClient for tenant ${String(tenantId)}`
      );
      return cachedClient;
    }

    const datasourceUrl = await this.getTenantDbUrl();
    this.logger.log(
      `Initializing new PrismaClient for tenant ${String(
        tenantId
      )} with URL: ${datasourceUrl.substring(
        0,
        datasourceUrl.indexOf('@') + 1
      )}... (credentials hidden)`
    );

    const newClient = new TenantPrismaClientOriginal({
      datasources: { db: { url: datasourceUrl } },
    }) as ActualTenantPrismaClient;

    try {
      await newClient.$connect();
      this.logger.debug(
        `PrismaClient connected for tenant ${String(tenantId)}.`
      );
      TenantPrismaService.clientCache.set(String(tenantId), newClient);
      return newClient;
    } catch (connectionError) {
      this.logger.error(
        `Failed to connect PrismaClient for tenant ${String(tenantId)}: ${
          (connectionError as Error).message
        }`,
        (connectionError as Error).stack
      );
      throw connectionError; // Relanzar para que el llamador lo maneje
    }
  }

  public async getClientInstance(): Promise<ActualTenantPrismaClient> {
    if (this.clientInstanceForRequest) {
      return this.clientInstanceForRequest;
    }
    const tenantId = this.tenantContextService.getTenantIdOrFail();
    this.clientInstanceForRequest = await this.initializeClientForTenant(
      tenantId
    );
    return this.clientInstanceForRequest;
  }

  async onModuleDestroy() {
    // No desconectar los clientes del caché aquí
  }

  public static async onApplicationShutdown() {
    const logger = new Logger(TenantPrismaService.name);
    logger.log('Shutting down all cached PrismaClient instances...');
    for (const client of TenantPrismaService.clientCache.values()) {
      try {
        await client.$disconnect();
        logger.log(`Disconnected a cached PrismaClient.`);
      } catch (e: unknown) {
        // Catch unknown
        logger.error(
          `Error disconnecting a cached PrismaClient: ${(e as Error).message}`,
          (e as Error).stack
        );
      }
    }
    TenantPrismaService.clientCache.clear();
    logger.log(
      'All cached PrismaClient instances shut down and cache cleared.'
    );
  }
}
// FIN DEL ARCHIVO: libs/infrastructure/infrapersistence/src/lib/services/tenant-prisma.service.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Corregido el import de `ITenantContextService` y `TENANT_CONTEXT_SERVICE_PORT` para usar `@dfs-suite/core-application-multitenancy`.", "justificacion": "Resuelve el error `Module not found` para `@dfs-suite/core-multi-tenancy`.", "impacto": "Correcta resolución de la dependencia del servicio de contexto." },
  { "mejora": "Mejorado el manejo de errores en `getTenantDbUrl` y `initializeClientForTenant`.", "justificacion": "Se verifica explícitamente si `dbConfigEntityResult.value` es nulo y se loguean/lanzan errores más descriptivos. Se maneja el error de conexión en `initializeClientForTenant`.", "impacto": "Mayor robustez y mejor depuración." },
  { "mejora": "Tipado `e: unknown` en `onApplicationShutdown` y cast a `Error`.", "justificacion": "Práctica más segura para el manejo de errores en bloques catch.", "impacto": "Robustez." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {"nota": "La dependencia de `TENANT_CONFIGURATION_REPOSITORY_PORT` de `@dfs-suite/codotenancy` (dominio) en un servicio de infraestructura (`TenantPrismaService`) es un poco inusual. Generalmente, la infraestructura implementa puertos de dominio. Aquí, un servicio de infraestructura necesita otro servicio (que implementa un puerto de dominio) para obtener datos. Es funcional, pero se podría considerar si el `TenantContextService` (aplicación) debería ser el responsable de orquestar la obtención de la connection string y pasarla al `TenantPrismaService` o a un factory de Prisma.", "justificacion": "Evaluación de la dirección de dependencias y responsabilidades entre capas."}
]
*/
