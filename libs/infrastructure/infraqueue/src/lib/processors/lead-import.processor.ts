// RUTA: libs/infrastructure/infraqueue/src/lib/processors/lead-import.processor.ts
// TODO: [LIA Legacy - Implementar LeadImportProcessor]
// Propósito: Procesador de cola para la importación masiva de leads desde archivos CSV/Excel.
// Llama a ImportLeadsUseCase.
// Relacionado con Casos de Uso: BP-LEAD-IMPORT-001
// import { Processor, Process } from '@nestjs/bullmq';
// import { Job } from 'bullmq';
// import { IImportLeadsUseCase, COAPLEADSFLOW_IMPORTLEADS_USECASE_PORT } from '@dfs-suite/coapleadsflow'; // Puerto al UC
// import { Inject } from '@nestjs/common';
// import { TenantContextService, TENANT_CONTEXT_SERVICE_PORT } from '@dfs-suite/coaptenancy'; // Para el contexto

// export const LEAD_IMPORT_QUEUE = 'lead-import';

// @Processor(LEAD_IMPORT_QUEUE)
// export class LeadImportProcessor {
//   constructor(
//     // @Inject(COAPLEADSFLOW_IMPORTLEADS_USECASE_PORT) private readonly importLeadsUseCase: IImportLeadsUseCase,
//     // @Inject(TENANT_CONTEXT_SERVICE_PORT) private readonly tenantContextService: TenantContextService
//   ) {}

//   @Process()
//   async process(job: Job<{ tenantId: string; fileId: string; userId: string; mapping: any }>): Promise<any> {
//     const { tenantId, fileId, userId, mapping } = job.data;
//     // await this.tenantContextService.runWithContext(tenantId, async () => {
//     //   await this.importLeadsUseCase.execute({ fileId, userId, mappingConfig: mapping, tenantId });
//     // });
//     // return { status: 'processed' };
//     return { status: `Job ${job.id} of type ${job.name} with data ${JSON.stringify(job.data)} processed`}; // Placeholder
//   }
// }
