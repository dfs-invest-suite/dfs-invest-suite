// RUTA: libs/core/domain/codoleadsflow/src/index.ts

// Entities
export * from './lib/entities/lead.entity';
export * from './lib/entities/lead-interaction.entity';
// export * from './lib/entities/lead-tag.entity'; // Futuro: Para etiquetado flexible
// export * from './lib/entities/lead-segment.entity'; // Futuro: Para segmentos dinámicos

// Value Objects
export * from './lib/value-objects/lead-status.vo';
export * from './lib/value-objects/lead-score.vo';
export * from './lib/value-objects/lead-source-channel.vo';
export * from './lib/value-objects/interaction-channel.vo';

// Ports
export * from './lib/ports/lead.repository.port';
export * from './lib/ports/lead-interaction.repository.port';
// export * from './lib/ports/lead-segment.repository.port'; // Futuro

// Domain Services
export * from './lib/services/lead-qualification-rules.service'; // Reglas de negocio base
// export * from './lib/services/lead-nurturing-logic.service'; // Futuro: Lógica de qué enviar cuándo

// Domain Events
export * from './lib/events/lead-created.event';
export * from './lib/events/lead-qualified.event';
export * from './lib/events/lead-assigned.event';
export * from './lib/events/lead-interacted.event';
export * from './lib/events/lead-status-changed.event';

// Errors
export * from './lib/errors/lead-not-found.error';
// export * from './lib/errors/invalid-lead-status-transition.error'; // Futuro
