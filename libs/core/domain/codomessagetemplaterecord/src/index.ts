// RUTA: libs/core/domain/codomessagetemplaterecord/src/index.ts

// Entities
export * from './lib/entities/message-template-record.entity';

// Value Objects
export * from './lib/value-objects/template-component.vo'; // Para modelar los components de la plantilla
export * from './lib/value-objects/template-status-meta.vo';
export * from './lib/value-objects/template-status-internal.vo';
export * from './lib/value-objects/template-quality-meta.vo';

// Ports
export * from './lib/ports/message-template-record.repository.port';

// Domain Events
export * from './lib/events/message-template-record-created.event';
export * from './lib/events/message-template-record-updated.event'; // Para cambios de estado o calidad

// Errors
export * from './lib/errors/message-template-record-not-found.error';
