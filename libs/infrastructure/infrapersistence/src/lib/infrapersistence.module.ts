// RUTA: libs/infrastructure/infrapersistence/src/lib/infrapersistence.module.ts
// TODO: [LIA Legacy - Implementar InfraPersistenceModule]
// Propósito: Módulo NestJS que provee TenantPrismaService y los adaptadores de repositorio para las DBs de los tenants.
// import { Module, Scope } from '@nestjs/common';
// import { TenantPrismaService } from './services/tenant-prisma.service';
// import { PrismaLeadRepositoryAdapter } from './repositories/prisma-lead.repository.adapter';
// import { LEAD_REPOSITORY_PORT } from '@dfs-suite/codoleadsflow';
// // ... otros imports de puertos y adaptadores
// @Module({
//   providers: [
//     { provide: TenantPrismaService, scope: Scope.REQUEST }, // CRUCIAL: Scope.REQUEST
//     { provide: LEAD_REPOSITORY_PORT, useClass: PrismaLeadRepositoryAdapter },
//     // ... proveer todos los demás adaptadores de repositorio de tenant
//   ],
//   exports: [TenantPrismaService, LEAD_REPOSITORY_PORT, /* ...otros puertos */],
// })
// export class InfraPersistenceModule {}
