// RUTA: libs/core/domain/codomessagelog/src/index.ts

// Entities
export * from './lib/entities/message-log.entity';

// Value Objects
export * from './lib/value-objects/message-direction.vo';
export * from './lib/value-objects/message-internal-status.vo';

// Ports
export * from './lib/ports/message-log.repository.port';

// Events
export * from './lib/events/message-log-created.event';
// export * from './lib/events/message-log-status-updated.event'; // Podría ser útil

// Errors (si hay errores de dominio específicos para MessageLog)
// export * from './lib/errors/message-log-specific.error';
