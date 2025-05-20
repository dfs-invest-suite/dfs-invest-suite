// RUTA: libs/infrastructure/infratenancypersistence/src/lib/infratenancypersistence.module.ts
// TODO: [LIA Legacy - Implementar InfraTenancyPersistenceModule]
// Propósito: Módulo NestJS que provee los adaptadores de repositorio para la DB de plataforma.
// Relacionado con Casos de Uso: Onboarding de Tenants, gestión de configuración de tenants.
// import { Module } from '@nestjs/common';
// import { PlatformPrismaService } from './services/platform-prisma.service'; // Asumiendo un servicio para el PrismaClient de plataforma
// import { PrismaTenantRepositoryAdapter } from './repositories/prisma-tenant.repository.adapter';
// import { SecureTenantConfigRepositoryAdapter } from './repositories/secure-tenant-config.repository.adapter';
// import { TENANT_REPOSITORY_PORT, TENANT_CONFIGURATION_REPOSITORY_PORT } from '@dfs-suite/codotenancy';
// import { EncryptionService } from '@dfs-suite/infrasecurity'; // Asumiendo que IEncryptionService se provee desde infrasecurity

// @Module({
//   providers: [
//     PlatformPrismaService,
//     { provide: TENANT_REPOSITORY_PORT, useClass: PrismaTenantRepositoryAdapter },
//     { provide: TENANT_CONFIGURATION_REPOSITORY_PORT, useClass: SecureTenantConfigRepositoryAdapter },
//     // EncryptionService podría ser importado de un InfrasecurityModule o proveído aquí si es específico
//   ],
//   exports: [TENANT_REPOSITORY_PORT, TENANT_CONFIGURATION_REPOSITORY_PORT, PlatformPrismaService],
// })
// export class InfraTenancyPersistenceModule {}
