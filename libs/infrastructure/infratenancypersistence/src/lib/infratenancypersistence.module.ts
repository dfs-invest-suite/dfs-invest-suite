// RUTA: libs/infrastructure/infratenancypersistence/src/lib/infratenancypersistence.module.ts
import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Necesario para PlatformPrismaService

import {
  TENANT_CONFIGURATION_REPOSITORY_PORT,
  TENANT_REPOSITORY_PORT,
} from '@dfs-suite/codotenancy';
import { InfraSecurityModule } from '@dfs-suite/infrasecurity'; // Para IEncryptionService

// import { TenantConfigPrismaMapper } from './mappers/tenant-config.prisma-mapper';
// import { TenantPrismaMapper } from './mappers/tenant.prisma-mapper';
import { PrismaPlatformTenantRepositoryAdapter } from './repositories/prisma-platform-tenant.repository.adapter';
import { SecureTenantConfigRepositoryAdapter } from './repositories/secure-tenant-config.repository.adapter';
import { PlatformPrismaService } from './services/platform-prisma.service';

@Global() // Hacer global si estos repos son usados por muchos módulos
@Module({
  imports: [
    ConfigModule, // PlatformPrismaService necesita ConfigService
    InfraSecurityModule, // Para que ENCRYPTION_SERVICE_PORT esté disponible
  ],
  providers: [
    PlatformPrismaService,
    // TenantPrismaMapper,
    // TenantConfigPrismaMapper,
    {
      provide: TENANT_REPOSITORY_PORT,
      useClass: PrismaPlatformTenantRepositoryAdapter,
    },
    {
      provide: TENANT_CONFIGURATION_REPOSITORY_PORT,
      useClass: SecureTenantConfigRepositoryAdapter,
    },
    // Si IEncryptionService es un provider exportado por InfraSecurityModule,
    // no necesita ser proveído aquí de nuevo, solo importado.
  ],
  exports: [
    PlatformPrismaService, // Para que otros módulos de infra puedan usarlo si es necesario
    TENANT_REPOSITORY_PORT,
    TENANT_CONFIGURATION_REPOSITORY_PORT,
  ],
})
export class InfraTenancyPersistenceModule {}
// FIN DEL ARCHIVO: libs/infrastructure/infratenancypersistence/src/lib/infratenancypersistence.module.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  {
    "mejora": "Creación de `InfraTenancyPersistenceModule`.",
    "justificacion": "Módulo NestJS que provee los servicios de persistencia para la base de datos de plataforma (`PlatformPrismaService`) y los adaptadores de repositorio para `TenantEntity` y `TenantConfigurationEntity`.",
    "impacto": "Encapsulación y configuración de la capa de persistencia de tenancy para la plataforma."
  },
  {
    "mejora": "Importación de `ConfigModule` y `InfraSecurityModule`.",
    "justificacion": "`PlatformPrismaService` necesita `ConfigService` para la URL de la DB. `SecureTenantConfigRepositoryAdapter` necesita `IEncryptionService` (proveído por `InfraSecurityModule`).",
    "impacto": "Manejo correcto de dependencias."
  },
  {
    "mejora": "Proveedores y exportaciones configurados.",
    "justificacion": "Hace que los puertos de repositorio y `PlatformPrismaService` estén disponibles para inyección en otros módulos (ej. `api-main`).",
    "impacto": "Integración con el sistema DI de NestJS."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Implementar y proveer `TenantPrismaMapper` y `TenantConfigPrismaMapper`.",
    "justificacion": "Desacoplar la lógica de mapeo de los adaptadores de repositorio.",
    "impacto": "Código más limpio y adherencia a SRP."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Este módulo deberá ser importado en `AppModule` de `api-main`."
  },
  {
    "nota": "El `ENCRYPTION_SERVICE_PORT` debe ser exportado por `InfraSecurityModule`."
  }
]
*/
