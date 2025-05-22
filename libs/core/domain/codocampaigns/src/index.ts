// RUTA: libs/core/domain/codocampaigns/src/index.ts
// // RUTA: libs/core/domain/codocampaigns/src/index.ts
// // Entities
// export * from './lib/entities/campaign.entity';

// // Value Objects
// export * from './lib/value-objects/campaign-status.vo';
// export * from './lib/value-objects/campaign-target-audience.vo';
// export * from './lib/value-objects/campaign-schedule.vo';
// export * from './lib/value-objects/campaign-statistics.vo';

// // Ports
// export * from './lib/ports/campaign.repository.port';

// // Domain Events
// export * from './lib/events/campaign-created.event';
// export * from './lib/events/campaign-scheduled.event';
// export * from './lib/events/campaign-started.event';
// export * from './lib/events/campaign-paused.event';
// export * from './lib/events/campaign-resumed.event';
// export * from './lib/events/campaign-completed.event';
// // export * from './lib/events/campaign-lead-processed.event'; // Comentado hasta que se defina

// // Errors
// export * from './lib/errors/campaign-not-found.error';
// export * from './lib/errors/invalid-campaign-status-transition.error';
// export * from './lib/errors/campaign-template-invalid.error';

// // Enums
// export * from './lib/enums/campaign-status.enum';
// // RUTA: libs/core/domain/codocampaigns/src/index.ts
// /* SECCIÓN DE MEJORAS REALIZADAS
// [
//   { "mejora": "Definición del `index.ts` para `codocampaigns` exportando los artefactos de dominio proyectados.", "justificacion": "Establece la API pública de la librería.", "impacto": "Permite que otras librerías (como `coapcampaigns`) importen de forma controlada." }
// ]
// */
// /* NOTAS PARA IMPLEMENTACIÓN FUTURA
// [
//   { "nota": "El evento `CampaignLeadProcessedEvent` y su payload se definirán cuando se detalle más la lógica de procesamiento de leads en campañas." }
// ]
// */
export {};
// FIN DEL ARCHIVO: libs/core/domain/codocampaigns/src/index.ts
