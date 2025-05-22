// libs/infrastructure/infrapersistence/src/lib/infrapersistence.module.ts
import { Global, Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { LEAD_REPOSITORY_PORT } from '@dfs-suite/codoleadsflow'; // Ejemplo

import { PrismaLeadRepositoryAdapter } from './repositories/prisma-lead.repository.adapter'; // Ejemplo
import { TenantPrismaService } from './services/tenant-prisma.service'; // Esencial
// ... otros imports

const leadRepositoryProvider: Provider = {
  provide: LEAD_REPOSITORY_PORT,
  useClass: PrismaLeadRepositoryAdapter,
};

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    TenantPrismaService,
    leadRepositoryProvider /* ... otros repos */,
  ],
  exports: [TenantPrismaService, LEAD_REPOSITORY_PORT /* ... otros puertos */],
})
export class InfraPrismaPersistenceModule {}
// FIN DEL ARCHIVO: libs/infrastructure/infrapersistence/src/lib/infrapersistence.module.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  {
    "mejora": "Creación de `InfraPrismaPersistenceModule`.",
    "justificacion": "Módulo NestJS que provee `TenantPrismaService` (request-scoped) y los adaptadores de repositorio para la base de datos específica del tenant (ej. `PrismaLeadRepositoryAdapter`).",
    "impacto": "Encapsulación y configuración de la capa de persistencia para datos de tenant."
  },
  {
    "mejora": "Placeholder para la inyección de `ITenantContext` y `ITenantConfigurationRepository` en `TenantPrismaService` (implícito).",
    "justificacion": "`TenantPrismaService` necesita estos para funcionar, pero su provisión se asume que vendrá de otros módulos (`core-application-multi-tenancy` y `infratenancypersistence`) que se importarán en `AppModule`.",
    "impacto": "Destaca dependencias inter-módulo."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Implementar y proveer todos los adaptadores de repositorio y mappers necesarios para las entidades de tenant.",
    "justificacion": "Completar la capa de persistencia.",
    "impacto": "Funcionalidad completa."
  },
  {
    "mejora": "Definir y usar el módulo `CoreApplicationMultiTenancyModule` (nombre conceptual) que provea `ITenantContext`.",
    "justificacion": "Abstracción clara para el contexto del tenant.",
    "impacto": "Mejor organización de las dependencias de `TenantPrismaService`."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Este módulo debe ser importado en `AppModule` de `api-main`."
  },
  {
    "nota": "La configuración de Prisma para generar el cliente específico del schema del tenant (`@prisma/tenant-client`) es crucial y debe realizarse fuera de este módulo (en el `package.json` y scripts de build/postinstall)."
  }
]
*/
