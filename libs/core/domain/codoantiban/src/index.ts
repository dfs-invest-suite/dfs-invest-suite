// RUTA: libs/core/domain/codoantiban/src/index.ts

// Entities
export * from './lib/entities/whatsapp-account.entity'; // Representa un número de WA del tenant

// Value Objects
export * from './lib/value-objects/health-score.vo';
export * from './lib/value-objects/messaging-limit-tier.vo';
export * from './lib/value-objects/operational-status.vo'; // (PENDING, ACTIVE, WARMUP, COOLDOWN, SUSPENDED)

// Ports
export * from './lib/ports/whatsapp-account.repository.port';
export * from './lib/ports/rate-limiter.port';
// export * from './lib/ports/anti-ban-rules.repository.port'; // Futuro: Para reglas Anti-Ban configurables

// Domain Services
export * from './lib/services/anti-ban-decision.service'; // Lógica central de decisión
// export * from './lib/services/warmup-strategy.service'; // Futuro
// export * from './lib/services/account-rotation-strategy.service'; // Futuro

// Domain Events
export * from './lib/events/whatsapp-account-health-changed.event';
export * from './lib/events/whatsapp-account-status-flagged.event';
export * from './lib/events/rate-limit-approaching.event'; // Futuro

// Errors
export * from './lib/errors/no-available-whatsapp-account.error';
export * from './lib/errors/rate-limit-exceeded.error';
