// RUTA: libs/core/domain/codousersroles/src/index.ts

// Entities
export * from './lib/entities/user.entity'; // Usuario del tenant (Consultor, Supervisor, TenantAdmin)
// export * from './lib/entities/platform-admin.entity'; // Podría estar en un dominio de plataforma separado

// Value Objects
export * from './lib/value-objects/user-role.vo'; // (TENANT_ADMIN, SUPERVISOR, CONSULTANT)
export * from './lib/value-objects/hashed-password.vo';
// export * from './lib/value-objects/permission.vo'; // Futuro: Para un sistema de permisos más granular

// Ports
export * from './lib/ports/user.repository.port';
// export * from './lib/ports/platform-admin.repository.port';

// Domain Services
export * from './lib/services/user-authentication.domain-service'; // Lógica de validación de credenciales
// export * from './lib/services/user-authorization.domain-service'; // Lógica de verificación de permisos base

// Domain Events
export * from './lib/events/user-created.event';
export * from './lib/events/user-role-changed.event';
export * from './lib/events/user-password-changed.event';

// Errors
export * from './lib/errors/user-not-found.error';
export * from './lib/errors/invalid-credentials.error';
export * from './lib/errors/permission-denied.error';
