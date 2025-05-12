// libs/core/domain/tenancy/src/index.ts
export * from './lib/entities/tenant.entity';
export * from './lib/entities/tenant-configuration.entity';
export * from './lib/value-objects/tenant-status.vo';
export * from './lib/value-objects/db-connection-config.vo';
export * from './lib/events/tenant-created.event';
export * from './lib/events/tenant-activated.event';
export * from './lib/events/tenant-suspended.event';
export * from './lib/ports/tenant.repository.port';
export * from './lib/ports/tenant-configuration.repository.port';
export * from './lib/errors/tenant-already-exists.error';
export * from './lib/errors/invalid-tenant-status-transition.error';

// Eliminar placeholder si ya no es necesario
// export const placeholderCoreDomainTenancy = true;
