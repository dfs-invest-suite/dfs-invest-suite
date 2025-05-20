// RUTA: libs/infrastructure/infrapersistence/src/lib/services/tenant-prisma.service.ts
// TODO: [LIA Legacy - Implementar TenantPrismaService (Dinámico)]
// Propósito: Servicio NestJS (Scope.REQUEST) que instancia un PrismaClient conectado
// a la base de datos del tenant actual, obteniendo la connection string del TenantContext.
// import { Injectable, Scope, OnModuleDestroy, Inject } from '@nestjs/common';
// import { PrismaClient } from '@prisma/client'; // Cliente generado de la plantilla de tenant
// import { ITenantContextService, TENANT_CONTEXT_SERVICE_PORT } from '@dfs-suite/coaptenancy'; // Asumiendo que este puerto se define en app de tenancy
// import { ITenantConfigRepository, TENANT_CONFIGURATION_REPOSITORY_PORT } from '@dfs-suite/codotenancy'; // Para obtener la connection string

// @Injectable({ scope: Scope.REQUEST })
// export class TenantPrismaService extends PrismaClient implements OnModuleDestroy {
//   constructor(
//     // @Inject(TENANT_CONTEXT_SERVICE_PORT) private readonly tenantContext: ITenantContextService,
//     // @Inject(TENANT_CONFIGURATION_REPOSITORY_PORT) private readonly tenantConfigRepo: ITenantConfigRepository,
//   ) {
//     // const tenantId = tenantContext.getTenantId();
//     // const connectionString = await tenantConfigRepo.getDecryptedDbConnectionString(tenantId);
//     // super({ datasources: { db: { url: connectionString } } });
//     // Lógica de conexión real y manejo de errores/cache de clientes aquí.
//     // Esto es una simplificación, la instanciación real debe ser asíncrona o usar un factory.
//     super(); // Placeholder
//   }
//   // async onModuleInit() { await this.$connect(); } // No se puede usar onModuleInit con Scope.REQUEST así
//   async onModuleDestroy() { await this.$disconnect(); }
//   // Método para obtener el cliente conectado es mejor
//   // async getClient(): Promise<PrismaClient> { if (!this._isConnected) await this.$connect(); return this; }
// }
