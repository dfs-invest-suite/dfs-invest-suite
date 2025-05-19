// RUTA: libs/core/domain/codoportalcontent/src/index.ts

// Entities
export * from './lib/entities/portal-company-profile.entity';
export * from './lib/entities/portal-property-listing.entity'; // O SPE Listing
export * from './lib/entities/portal-asset.entity'; // Imágenes, PDFs para el portal
// export * from './lib/entities/portal-theme-config.entity'; // Futuro: Para personalización avanzada

// Value Objects
export * from './lib/value-objects/property-address.vo';
export * from './lib/value-objects/property-features.vo';
export * from './lib/value-objects/property-status.vo'; // (AVAILABLE, SOLD, RENTED)
export * from './lib/value-objects/asset-type.vo'; // (IMAGE, PDF, VIDEO_LINK)
// export * from './lib/value-objects/portal-theme-colors.vo'; // Futuro

// Ports
export * from './lib/ports/portal-company-profile.repository.port';
export * from './lib/ports/portal-property-listing.repository.port';
export * from './lib/ports/portal-asset.repository.port';
// export * from './lib/ports/portal-theme-config.repository.port'; // Futuro

// Domain Events
export * from './lib/events/property-listing-published.event';
export * from './lib/events/company-profile-updated.event';
