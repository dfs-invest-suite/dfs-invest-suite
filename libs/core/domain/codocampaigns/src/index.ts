// RUTA: libs/core/domain/codocampaigns/src/index.ts

// Entities
export * from './lib/entities/campaign.entity';
// export * from './lib/entities/campaign-lead-processing.entity'; // Futuro: Para rastrear estado de cada lead en la campaña

// Value Objects
export * from './lib/value-objects/campaign-status.vo';
export * from './lib/value-objects/campaign-target-audience.vo'; // (segmentId, leadIds, filterCriteria)
export * from './lib/value-objects/campaign-schedule.vo';
export * from './lib/value-objects/campaign-statistics.vo'; // (processed, sent, failed, delivered, read)

// Ports
export * from './lib/ports/campaign.repository.port';
// export * from './lib/ports/campaign-execution-tracker.port'; // Futuro

// Domain Services
// export * from './lib/services/campaign-eligibility.service'; // Verifica si la campaña puede iniciar/continuar

// Domain Events
export * from './lib/events/campaign-created.event';
export * from './lib/events/campaign-scheduled.event';
export * from './lib/events/campaign-started.event';
export * from './lib/events/campaign-paused.event';
export * from './lib/events/campaign-resumed.event';
export * from './lib/events/campaign-completed.event';
export * from './lib/events/campaign-lead-processed.event'; // Futuro

// Errors
export * from './lib/errors/campaign-not-found.error';
export * from './lib/errors/invalid-campaign-status-transition.error';
export * from './lib/errors/campaign-template-invalid.error';
