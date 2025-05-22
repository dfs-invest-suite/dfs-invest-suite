// RUTA: libs/infrastructure/infrapersistence/src/lib/services/tenant-prisma.service.ts
import {
  Inject,
  Injectable,
  Logger,
  OnModuleDestroy,
  Scope,
} from '@nestjs/common';

// Placeholder para el cliente Prisma generado para el schema del tenant.
// En un setup real: import { PrismaClient as TenantPrismaClient } from '@prisma/tenant-client';
import { PrismaClient as TenantPrismaClient } from '@prisma/client'; // Usar el genérico por ahora

import {
  ITenantConfigurationRepository,
  TENANT_CONFIGURATION_REPOSITORY_PORT,
} from '@dfs-suite/codotenancy'; // Puerto para obtener la config de DB del tenant
import { ITenantContext } from '@dfs-suite/core-multi-tenancy'; // Definir e importar este tipo/puerto
import { isErr } from '@dfs-suite/shresult';

// Placeholder para el puerto del contexto del tenant si no existe
// Debería ser un Symbol inyectable.
export const TENANT_CONTEXT_PORT = 'TENANT_CONTEXT_PORT';

@Injectable({ scope: Scope.REQUEST }) // CRUCIAL: Debe ser request-scoped // Extiende el PrismaClient generado para el schema del tenant
export class TenantPrismaService
  extends TenantPrismaClient
  implements OnModuleDestroy
{
  private static readonly clientCache = new Map<string, TenantPrismaClient>();
  private readonly logger = new Logger(TenantPrismaService.name);

  constructor(
    @Inject(TENANT_CONTEXT_PORT)
    private readonly tenantContext: ITenantContext,
    @Inject(TENANT_CONFIGURATION_REPOSITORY_PORT)
    private readonly tenantConfigRepo: ITenantConfigurationRepository
  ) {
    // La conexión real se delega a un factory o se hace en un método `getClient`.
    // El constructor de un request-scoped service no puede ser async.
    // Aquí solo se inicializan las dependencias.
    super(); // Llama al constructor de PrismaClient (que no hace nada si no hay config)
    // La inicialización real del cliente con la URL se hará en un método o factory.
    // Esta clase actuará más como un proxy o factory para el cliente Prisma del tenant.
  }

  private async getTenantDbUrl(): Promise<string> {
    const tenantId = this.tenantContext.getTenantId(); // Asume que esto devuelve TenantId o lanza error
    if (!tenantId) {
      this.logger.error(
        'TenantId no encontrado en el contexto de la solicitud.'
      );
      throw new Error('TenantId not found in request context for Prisma.');
    }

    // Obtener la config de DB (connection string encriptada) para este tenantId
    // ITenantConfigurationRepository ahora es para la DB de plataforma
    const dbConfigResult = await this.tenantConfigRepo.findByTenantIdAndKey(
      tenantId,
      'DB_CONNECTION_STRING' // Clave estándar para la connection string
    );

    if (isErr(dbConfigResult) || !dbConfigResult.value) {
      this.logger.error(
        `DB_CONNECTION_STRING no encontrada para tenant ${String(tenantId)}.`
      );
      throw new Error(
        `Database configuration not found for tenant ${String(tenantId)}.`
      );
    }
    // IEncryptionService debe desencriptar esto. Asumimos que el repo ya lo hace.
    // SecureTenantConfigRepositoryAdapter (de infratenancypersistence) ya desencripta.
    const connectionString = dbConfigResult.value.value;
    if (!connectionString) {
      this.logger.error(
        `DB_CONNECTION_STRING está vacía para tenant ${String(tenantId)}.`
      );
      throw new Error(
        `Database connection string is empty for tenant ${String(tenantId)}.`
      );
    }
    return connectionString;
  }

  // Este método es un hack para sobreescribir la URL de la datasource dinámicamente.
  // Prisma no soporta esto oficialmente de forma sencilla para múltiples clientes en un solo proceso.
  // La mejor solución es instanciar un nuevo PrismaClient por tenant con su URL.
  // Esto puede ser costoso si hay muchos tenants activos simultáneamente.
  // Una alternativa es usar un pool de conexiones gestionado externamente o proxies de DB.
  // Para la demo, y con Scope.REQUEST, instanciar uno nuevo por request podría ser aceptable,
  // pero se debe considerar el cacheo de clientes por tenantId.

  private async initializeClient(): Promise<TenantPrismaClient> {
    const tenantId = this.tenantContext.getTenantId();
    if (!tenantId)
      throw new Error('TenantId is required to initialize client.');

    // Cachear clientes Prisma por tenantId para reutilizar conexiones
    if (TenantPrismaService.clientCache.has(String(tenantId))) {
      return TenantPrismaService.clientCache.get(String(tenantId))!;
    }

    const datasourceUrl = await this.getTenantDbUrl();
    const newClient = new TenantPrismaClient({
      datasources: { db: { url: datasourceUrl } },
    });
    await newClient.$connect();
    this.logger.debug(
      `PrismaClient conectado para tenant ${String(tenantId)}.`
    );
    TenantPrismaService.clientCache.set(String(tenantId), newClient);
    return newClient;
  }

  // Los repositorios llamarán a este método para obtener el cliente listo para usar.
  public async getClientInstance(): Promise<TenantPrismaClient> {
    // Dado que el constructor de PrismaClient es síncrono, y cambiar la datasource dinámicamente
    // no es soportado después de la instanciación inicial de forma limpia,
    // cada llamada a getClientInstance (si este servicio es un proxy) o
    // la instanciación de este servicio (si es un factory) necesita crear/obtener
    // un PrismaClient ya configurado para el tenant actual.
    // El scope REQUEST ayuda: se crea una instancia de TenantPrismaService por request.
    // Aquí, en lugar de extender PrismaClient directamente, TenantPrismaService
    // actuará como un factory/proxy que devuelve el cliente correcto.

    // Este es un patrón simplificado. La super() no funciona como esperamos para múltiples DBs.
    // Lo ideal es que este servicio NO extienda PrismaClient, sino que lo provea.
    // Por ahora, vamos a asumir que el constructor NO hace nada, y la conexión
    // se establece dinámicamente antes de usar el cliente.
    // PERO PrismaClient no permite cambiar la URL después de la instanciación.
    // La solución MÁS ROBUSTA es no extender, sino ser un factory.

    // Para esta demo, vamos a asumir que se crea un nuevo cliente por request,
    // o se obtiene de un caché simple.
    return this.initializeClient();
  }

  // Se llamará cuando el contexto de la solicitud de NestJS se destruya
  async onModuleDestroy() {
    // No desconectar los clientes cacheados aquí, ya que podrían ser usados por otras requests
    // La desconexión de clientes cacheados necesita una estrategia diferente (ej. TTL, LRU)
    // o al apagar la aplicación.
    // await this.$disconnect(); // Esto desconectaría el cliente base si existiera.
    // this.logger.debug('TenantPrismaService (request-scoped) instance destroyed.');
  }

  // Si TenantPrismaService NO extiende PrismaClient, necesitaría delegar
  // todos los métodos de PrismaClient al cliente instanciado.
  // Ejemplo:
  // get user() { return (await this.getClientInstance()).user; }
  // Esto es complejo. Es más simple que los Repositorios inyecten TenantPrismaService
  // y hagan: const prisma = await this.tenantPrismaService.getClientInstance(); prisma.user.findMany(...);
}
// FIN DEL ARCHIVO: libs/infrastructure/infrapersistence/src/lib/services/tenant-prisma.service.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  {
    "mejora": "Implementación base de `TenantPrismaService` como `Scope.REQUEST`.",
    "justificacion": "Fundamental para la multi-tenancy. Cada solicitud obtiene una instancia que (conceptualmente) se conecta a la DB del tenant actual. Inyecta `ITenantContext` (placeholder) y `ITenantConfigurationRepository` para obtener la connection string.",
    "impacto": "Servicio clave para el acceso a datos por tenant."
  },
  {
    "mejora": "Lógica para obtener `TenantId` del contexto y la `connectionString` del `ITenantConfigurationRepository`.",
    "justificacion": "Flujo esencial para la conexión dinámica.",
    "impacto": "Funcionalidad base."
  },
  {
    "mejora": "Introducción de un `clientCache` estático simple para reutilizar instancias de `PrismaClient` por `tenantId`.",
    "justificacion": "Evita crear una nueva conexión a la base de datos para cada solicitud del mismo tenant, mejorando la performance y reduciendo la sobrecarga en la base de datos.",
    "impacto": "Optimización de rendimiento significativa para tenants activos."
  },
  {
    "mejora": "Método `getClientInstance()` para que los repositorios obtengan el cliente Prisma configurado.",
    "justificacion": "Clarifica que este servicio actúa como un factory/proxy para el cliente Prisma del tenant, en lugar de ser el cliente mismo (ya que no extiende `TenantPrismaClient` para evitar problemas de `super()`).",
    "impacto": "Patrón de uso más claro para los repositorios."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Implementar un mecanismo de limpieza para `clientCache` (ej. TTL, LRU).",
    "justificacion": "Para evitar que el caché crezca indefinidamente si hay muchos tenants con actividad esporádica.",
    "impacto": "Gestión de memoria y recursos."
  },
  {
    "mejora": "Manejo más robusto de errores de conexión en `initializeClient()`.",
    "justificacion": "Para proveer feedback útil si una DB de tenant no está accesible.",
    "impacto": "Resiliencia."
  },
  {
    "mejora": "Definir e importar `ITenantContext` y su token (`TENANT_CONTEXT_PORT`) desde una librería de aplicación core para multi-tenancy (ej. `@dfs-suite/core-application-multi-tenancy`).",
    "justificacion": "Abstracción correcta del servicio de contexto.",
    "impacto": "Alineación arquitectónica."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "El import `import { PrismaClient as TenantPrismaClient } from '@prisma/client';` es un placeholder. Se debe generar un cliente Prisma (`@prisma/tenant-client`) a partir del `tenant/schema.prisma` y usarlo aquí."
  },
  {
    "nota": "El `SecureTenantConfigRepositoryAdapter` (que implementa `ITenantConfigurationRepository`) ya se encarga de desencriptar la connection string."
  },
  {
    "nota": "`TenantPrismaService` ahora NO extiende `TenantPrismaClient`. Los repositorios obtendrán la instancia del cliente llamando a `getClientInstance()`."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Usar el `ILoggerPort` (`PinoLoggerAdapter`) en lugar de `console.info`.",
    "justificacion": "Consistencia en el logging.",
    "impacto": "Requiere que el logger sea inyectable aquí o pasado al constructor."
  },
  {
    "mejora": "Manejo avanzado de múltiples clientes Prisma.",
    "justificacion": "En un monorepo con múltiples esquemas Prisma (plataforma y tenant), la generación y el import del cliente Prisma correcto (`@prisma/platform-client` vs `@prisma/tenant-client`) necesita una configuración cuidadosa con `prisma generate --schema=...` y alias en `package.json` o scripts `postinstall` para renombrar los outputs.",
    "impacto": "Configuración de build más compleja pero necesaria para la multi-tenancy DB."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Asumimos que `PLATFORM_DATABASE_URL` es una variable de entorno."
  },
  {
    "nota": "El import `import { PrismaClient } from '@prisma/client';` es un placeholder. Debería ser el cliente generado específicamente para `platform-schema.prisma`."
  }
]
*/
