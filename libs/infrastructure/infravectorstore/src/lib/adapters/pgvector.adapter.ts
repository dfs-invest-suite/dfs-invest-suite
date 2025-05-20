// RUTA: libs/infrastructure/infravectorstore/src/lib/adapters/pgvector.adapter.ts
// TODO: [LIA Legacy - Implementar PGVectorAdapter]
// Propósito: Implementa IVectorDatabasePort usando PGVector sobre la instancia PostgreSQL del tenant.
// Relacionado con Casos de Uso: IndexTenantDocumentUseCase, ProcessAiperChatPromptUseCase (RAG).
// import { IVectorDatabasePort, KnowledgeChunk } from '@dfs-suite/codoaiperassistance';
// import { TenantPrismaService } from '@dfs-suite/infrapersistence'; // Para acceder al PrismaClient del tenant
// import { Result, ok, err } from '@dfs-suite/shresult';
// import { ExceptionBase } from '@dfs-suite/sherrors';

// export class PGVectorAdapter implements IVectorDatabasePort {
//   constructor(private readonly prismaTenantService: TenantPrismaService) {}
//   async addChunks(chunks: KnowledgeChunk[]): Promise<Result<void, ExceptionBase>> {
//     // const prisma = await this.prismaTenantService.getClient(); // Obtener cliente del tenant actual
//     // Mapear KnowledgeChunk a modelo Prisma de Chunks (con campo vector)
//     // Usar prisma.$executeRaw o métodos de cliente para insertar y crear/actualizar índices vectoriales.
//     return ok(undefined);
//   }
//   async searchSimilarChunks(queryVector: number[], topK: number, filters?: any): Promise<Result<KnowledgeChunk[], ExceptionBase>> {
//     // const prisma = await this.prismaTenantService.getClient();
//     // Construir y ejecutar query de similaridad de coseno (ej. usando operador <-> de PGVector).
//     // Aplicar filtros si es necesario.
//     return ok([]); // Placeholder
//   }
// }

// RUTA: libs/infrastructure/infravectorstore/src/lib/infravectorstore.module.ts
// TODO: [LIA Legacy - Implementar InfraVectorStoreModule (si es NestJS)]
// Propósito: Módulo NestJS que provee los adaptadores de Vector DB.
// import { Module } from '@nestjs/common';
// import { PGVectorAdapter } from './adapters/pgvector.adapter';
// import { VECTOR_DATABASE_PORT } from '@dfs-suite/codoaiperassistance';
// import { InfraPersistenceModule } from '@dfs-suite/infrapersistence'; // Para TenantPrismaService

// @Module({
//   imports: [InfraPersistenceModule], // Para poder inyectar TenantPrismaService
//   providers: [
//     { provide: VECTOR_DATABASE_PORT, useClass: PGVectorAdapter }
//   ],
//   exports: [VECTOR_DATABASE_PORT],
// })
// export class InfraVectorStoreModule {}
