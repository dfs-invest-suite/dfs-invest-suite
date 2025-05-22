// RUTA: libs/core/application/coapcampaigns/src/index.ts

// // --- Commands & Use Cases ---
// // Para crear una nueva campaña (definición inicial)
// export * from './lib/commands/create-campaign.command';
// export * from './lib/use-cases/create-campaign.use-case';
// export { CREATE_CAMPAIGN_USE_CASE } from './lib/use-cases/create-campaign.use-case';

// // Para actualizar una campaña existente (ej. cambiar nombre, audiencia, plantilla)
// export * from './lib/commands/update-campaign.command';
// export * from './lib/use-cases/update-campaign.use-case';
// export { UPDATE_CAMPAIGN_USE_CASE } from './lib/use-cases/update-campaign.use-case';

// // Para programar una campaña para su ejecución
// export * from './lib/commands/schedule-campaign.command';
// export * from './lib/use-cases/schedule-campaign.use-case';
// export { SCHEDULE_CAMPAIGN_USE_CASE } from './lib/use-cases/schedule-campaign.use-case';

// // Para iniciar manualmente una campaña programada o pausada
// export * from './lib/commands/start-campaign.command';
// export * from './lib/use-cases/start-campaign.use-case';
// export { START_CAMPAIGN_USE_CASE } from './lib/use-cases/start-campaign.use-case';

// // Para pausar una campaña en ejecución
// export * from './lib/commands/pause-campaign.command';
// export * from './lib/use-cases/pause-campaign.use-case';
// export { PAUSE_CAMPAIGN_USE_CASE } from './lib/use-cases/pause-campaign.use-case';

// // Para reanudar una campaña pausada
// export * from './lib/commands/resume-campaign.command';
// export * from './lib/use-cases/resume-campaign.use-case';
// export { RESUME_CAMPAIGN_USE_CASE } from './lib/use-cases/resume-campaign.use-case';

// // Para archivar una campaña completada o cancelada
// export * from './lib/commands/archive-campaign.command';
// export * from './lib/use-cases/archive-campaign.use-case';
// export { ARCHIVE_CAMPAIGN_USE_CASE } from './lib/use-cases/archive-campaign.use-case';

// // Caso de Uso Interno para procesar un lote de leads de una campaña (llamado por un worker de cola)
// export * from './lib/commands/execute-campaign-batch.command';
// export * from './lib/use-cases/execute-campaign-batch.use-case';
// export { EXECUTE_CAMPAIGN_BATCH_USE_CASE } from './lib/use-cases/execute-campaign-batch.use-case';

// // --- Queries & Handlers ---
// // Para listar campañas de un tenant con filtros y paginación
// export * from './lib/queries/list-campaigns.query';
// export { LIST_CAMPAIGNS_QUERY_HANDLER } from './lib/queries/list-campaigns.query';

// // Para obtener los detalles de una campaña específica
// export * from './lib/queries/get-campaign-details.query';
// export { GET_CAMPAIGN_DETAILS_QUERY_HANDLER } from './lib/queries/get-campaign-details.query';

// // Para obtener las estadísticas de una campaña
// export * from './lib/queries/get-campaign-statistics.query';
// export { GET_CAMPAIGN_STATISTICS_QUERY_HANDLER } from './lib/queries/get-campaign-statistics.query';

// // --- DTOs (Data Transfer Objects para la capa de aplicación de Campañas) ---
// export * from './lib/dtos/campaign-creation.dto';
// export * from './lib/dtos/campaign-update.dto';
// export * from './lib/dtos/campaign-details.dto';
// export * from './lib/dtos/campaign-summary.dto';
// export * from './lib/dtos/campaign-statistics.dto';
// export * from './lib/dtos/campaign-filter.dto';
// export * from './lib/dtos/campaign-schedule.dto';
// export * from './lib/dtos/campaign-target-audience.dto';

// // --- Application Service Ports (Puertos para servicios que esta capa necesita) ---
// // (Si la lógica de scheduling es compleja y reutilizable, podría haber un puerto para ella)
// // export * from './lib/ports/i-campaign-scheduler.port';

// // --- Listeners de Eventos (Reaccionar a eventos de otros dominios) ---
// // Por ejemplo, si el sistema Anti-Ban pausa una cuenta, este listener podría pausar campañas activas que usan esa cuenta.
// // export * from './lib/listeners/whatsapp-account-flagged.listener';

export {}; // Bypass temporal
// FIN DEL ARCHIVO: libs/core/application/coapcampaigns/src/index.ts
