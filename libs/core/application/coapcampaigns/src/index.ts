// RUTA: libs/core/application/coapcampaigns/src/index.ts

// --- Commands & Use Cases ---
export * from './lib/use-cases/create-campaign.use-case';
export * from './lib/commands/create-campaign.command';
export * from './lib/use-cases/update-campaign.use-case'; // Nuevo
export * from './lib/commands/update-campaign.command'; // Nuevo
export * from './lib/use-cases/schedule-campaign.use-case';
export * from './lib/commands/schedule-campaign.command';
export * from './lib/use-cases/launch-campaign.use-case'; // Nuevo: Inicia una campaña inmediatamente o una programada
export * from './lib/use-cases/pause-campaign.use-case';
export * from './lib/commands/pause-campaign.command';
export * from './lib/use-cases/resume-campaign.use-case';
export * from './lib/commands/resume-campaign.command';
export * from './lib/use-cases/archive-campaign.use-case'; // Nuevo
export * from './lib/commands/archive-campaign.command'; // Nuevo
export * from './lib/use-cases/execute-campaign-batch.use-case'; // Procesador de cola
// export * from './lib/use-cases/add-leads-to-campaign.use-case'; // Futuro
// export * from './lib/use-cases/remove-leads-from-campaign.use-case'; // Futuro

// --- Queries & Handlers ---
export * from './lib/queries/get-campaign-details.query';
export * from './lib/queries/get-campaign-details.query-handler';
export * from './lib/queries/list-campaigns.query'; // Con filtros por estado, etc.
export * from './lib/queries/list-campaigns.query-handler';
// export * from './lib/queries/get-campaign-performance.query'; // Métricas de la campaña

// --- DTOs ---
export * from './lib/dtos/campaign-creation.dto';
export * from './lib/dtos/campaign-update.dto';
export * from './lib/dtos/campaign-details.dto';
export * from './lib/dtos/campaign-summary.dto';
// export * from './lib/dtos/campaign-performance-report.dto';

// --- Listeners ---
export * from './lib/listeners/campaign-scheduler.listener'; // Para campañas programadas
// export * from './lib/listeners/anti-ban-feedback-campaign.listener'; // Reacciona a problemas de AntiBan
