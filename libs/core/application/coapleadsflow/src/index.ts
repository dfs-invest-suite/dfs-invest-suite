// RUTA: libs/core/application/coapleadsflow/src/index.ts
// // RUTA: libs/core/application/coapleadsflow/src/index.ts

// // --- Commands (Intenciones de cambio de estado para el ciclo de vida del Lead) ---
// export * from './lib/commands/create-lead.command';
// export * from './lib/commands/update-lead-details.command';
// export * from './lib/commands/import-leads.command';
// export * from './lib/commands/qualify-lead.command';
// export * from './lib/commands/assign-lead.command';
// export * from './lib/commands/track-lead-interaction.command';
// export * from './lib/commands/change-lead-status.command';
// /**
//  * (Futuro) Comando para iniciar o avanzar un lead en una secuencia de nurturing.
//  * export * from './lib/commands/nurture-lead.command';
//  */
// /**
//  * (Futuro) Comando para fusionar leads duplicados.
//  * export * from './lib/commands/merge-leads.command';
//  */
// /**
//  * (Futuro) Comando para añadir/quitar tags a un lead.
//  * export * from './lib/commands/tag-lead.command';
//  */
// /**
//  * (Futuro) Comando para registrar explícitamente un opt-out de comunicación para un lead.
//  * export * from './lib/commands/record-lead-opt-out.command';
//  */

// // --- Use Cases (Implementaciones de ICommandHandler/IQueryHandler y sus Tokens/Interfaces) ---
// export * from './lib/use-cases/create-lead.use-case';
// export {
//   CREATE_LEAD_USE_CASE,
//   type ICreateLeadUseCase,
// } from './lib/use-cases/create-lead.use-case';

// export * from './lib/use-cases/update-lead-details.use-case';
// export {
//   UPDATE_LEAD_DETAILS_USE_CASE,
//   type IUpdateLeadDetailsUseCase,
// } from './lib/use-cases/update-lead-details.use-case';

// export * from './lib/use-cases/import-leads.use-case';
// export {
//   IMPORT_LEADS_USE_CASE,
//   type IImportLeadsUseCase,
// } from './lib/use-cases/import-leads.use-case';

// export * from './lib/use-cases/qualify-lead.use-case';
// export {
//   QUALIFY_LEAD_USE_CASE,
//   type IQualifyLeadUseCase,
// } from './lib/use-cases/qualify-lead.use-case';

// export * from './lib/use-cases/assign-lead.use-case';
// export {
//   ASSIGN_LEAD_USE_CASE,
//   type IAssignLeadUseCase,
// } from './lib/use-cases/assign-lead.use-case';

// export * from './lib/use-cases/track-lead-interaction.use-case';
// export {
//   TRACK_LEAD_INTERACTION_USE_CASE,
//   type ITrackLeadInteractionUseCase,
// } from './lib/use-cases/track-lead-interaction.use-case';

// export * from './lib/use-cases/change-lead-status.use-case';
// export {
//   CHANGE_LEAD_STATUS_USE_CASE,
//   type IChangeLeadStatusUseCase,
// } from './lib/use-cases/change-lead-status.use-case';

// /**
//  * (Futuro) Caso de Uso para orquestar secuencias de nurturing.
//  * export * from './lib/use-cases/nurture-lead.use-case';
//  * export { NURTURE_LEAD_USE_CASE, type INurtureLeadUseCase } from './lib/use-cases/nurture-lead.use-case';
//  */
// /**
//  * (Futuro) Caso de Uso para identificar y fusionar leads duplicados.
//  * export * from './lib/use-cases/merge-duplicate-leads.use-case';
//  * export { MERGE_DUPLICATE_LEADS_USE_CASE, type IMergeDuplicateLeadsUseCase } from './lib/use-cases/merge-duplicate-leads.use-case';
//  */

// // --- Queries (Intenciones de lectura de datos sobre Leads) ---
// export * from './lib/queries/get-lead-details.query';
// export * from './lib/queries/list-leads.query';
// /**
//  * (Futuro) Query para obtener el historial de interacciones de un lead, con paginación y filtros.
//  * export * from './lib/queries/get-lead-interaction-history.query';
//  */
// /**
//  * (Futuro) Query para obtener leads que cumplen con criterios de un segmento dinámico.
//  * export * from './lib/queries/list-leads-by-segment.query';
//  */
// /**
//  * (Futuro) Query para obtener estadísticas de leads (ej. conteo por estado, por origen).
//  * export * from './lib/queries/get-lead-statistics.query';
//  */

// // --- Query Handlers (Tokens y/o Implementaciones) ---
// export {
//   GET_LEAD_DETAILS_QUERY_HANDLER,
//   type IGetLeadDetailsQueryHandler,
// } from './lib/queries/get-lead-details.query';
// export {
//   LIST_LEADS_QUERY_HANDLER,
//   type IListLeadsQueryHandler,
// } from './lib/queries/list-leads.query';
// // Exportar otros handlers...

// // --- DTOs (Data Transfer Objects para la capa de aplicación de Leads) ---
// export * from './lib/dtos/lead-creation.dto';
// export * from './lib/dtos/lead-update.dto';
// export * from './lib/dtos/lead-details.dto';
// export * from './lib/dtos/lead-summary.dto';
// export * from './lib/dtos/lead-interaction.dto';
// export * from './lib/dtos/lead-filter.dto';
// export * from './lib/dtos/lead-import-result.dto';
// export * from './lib/dtos/lead-qualification-result.dto';
// /**
//  * (Futuro) DTO para representar un segmento de leads.
//  * export * from './lib/dtos/lead-segment.dto';
//  */
// /**
//  * (Futuro) DTO para el payload de una secuencia de nurturing.
//  * export * from './lib/dtos/nurturing-sequence-step.dto';
//  */

// // --- Application Service Ports (Puertos para servicios que esta capa necesita) ---
// /**
//  * Puerto para un servicio externo o de infraestructura que parsea archivos de leads (CSV, Excel).
//  * Esta capa de aplicación (`coapleadsflow`) define el puerto que necesita, y la capa de
//  * infraestructura (`infraappservices` o una más específica) lo implementa.
//  */
// export * from './lib/ports/file-parser.port';
// /**
//  * (Futuro) Puerto para un servicio de integración con CRM externo.
//  * export * from './lib/ports/i-crm-integration.port';
//  */
// /**
//  * (Futuro) Puerto para un servicio de enriquecimiento de datos de leads.
//  * export * from './lib/ports/i-lead-enrichment.port';
//  */

// // RUTA: libs/core/application/coapleadsflow/src/index.ts

// /* SECCIÓN DE MEJORAS REALIZADAS
// [
// { "mejora": "index.ts para coapleadsflow actualizado y completado.", "justificacion": "Exporta todos los artefactos de aplicación definidos (comandos, casos de uso, queries, DTOs, y el puerto para FileParser). Incluye comentarios para artefactos futuros inferidos de la funcionalidad de la suite.", "impacto": "Proporciona una API pública clara y completa para la lógica de aplicación de leads, facilitando la integración con api-main y otros módulos." },
// { "mejora": "Exportación explícita de los type de las interfaces de Casos de Uso y Query Handlers junto con sus tokens Symbol.", "justificacion": "Permite a los consumidores tipar correctamente las dependencias inyectadas sin necesidad de importar la clase de implementación, fomentando el desacoplamiento.", "impacto": "Mejor DX y adherencia a principios de dependencia de abstracciones."}
// ]
// /
// / NOTAS PARA IMPLEMENTACIÓN FUTURA
// [
// { "nota": "Asegurar que todos los archivos referenciados aquí (especialmente los nuevos comandos y DTOs) sean creados con su estructura básica e imports correctos." },
// { "nota": "El puerto IFileParserPort y su token FILE_PARSER_PORT_APP_LAYER deben ser creados en libs/core/application/coapleadsflow/src/lib/ports/." },
// { "nota": "Los casos de uso y query handlers aún son esqueletos y necesitarán la implementación de su lógica interna, incluyendo la interacción con los repositorios del dominio codoleadsflow y otros servicios/puertos." }
// ]
// */
export {};
// FIN DEL ARCHIVO: libs/core/application/coapleadsflow/src/index.ts
