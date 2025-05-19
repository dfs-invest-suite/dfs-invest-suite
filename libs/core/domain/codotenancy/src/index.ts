// RUTA: libs/core/domain/codotenancy/src/index.ts

// Entities
export * from './lib/entities/tenant.entity';
export * from './lib/entities/tenant-configuration.entity'; // Configs específicas del tenant (API keys, etc.)

// Value Objects
export * from './lib/value-objects/tenant-status.vo';
export * from './lib/value-objects/db-connection-config.vo';
export * from './lib/value-objects/waba-credentials.vo'; // Nuevo: Para encapsular WABA ID y Token

// Ports (Interfaces para Repositorios y Servicios de Dominio Externos)
export * from './lib/ports/tenant.repository.port';
export * from './lib/ports/tenant-configuration.repository.port';

// Domain Events
export * from './lib/events/tenant-created.event';
export * from './lib/events/tenant-activated.event';
export * from './lib/events/tenant-suspended.event';
export * from './lib/events/tenant-waba-config-updated.event'; // Nuevo: Para cuando se actualizan credenciales WA

// Domain Services (Si hay lógica de dominio compleja que no encaja en una entidad)
// export * from './lib/services/tenant-onboarding-rules.service'; // Ejemplo

// Errors
export * from './lib/errors/tenant-already-exists.error';
export * from './lib/errors/invalid-tenant-status-transition.error';
export * from './lib/errors/tenant-configuration-not-found.error'; // Nuevo
