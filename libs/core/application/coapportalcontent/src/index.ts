// RUTA: libs/core/application/coapportalcontent/src/index.ts

// --- Commands & Use Cases ---
// Company Profile
export * from './lib/use-cases/update-portal-company-profile.use-case';
export * from './lib/commands/update-company-profile.command';

// Property Listings
export * from './lib/use-cases/create-property-listing.use-case';
export * from './lib/commands/create-property-listing.command';
export * from './lib/use-cases/update-property-listing.use-case';
export * from './lib/commands/update-property-listing.command';
export * from './lib/use-cases/delete-property-listing.use-case';
export * from './lib/commands/delete-property-listing.command';
export * from './lib/use-cases/publish-property-listing.use-case'; // Cambia estado a publicado
export * from './lib/commands/publish-property-listing.command';
// export * from './lib/use-cases/unpublish-property-listing.use-case';

// Portal Assets (Imágenes, PDFs para propiedades)
// export * from './lib/use-cases/upload-portal-asset.use-case';
// export * from './lib/commands/upload-portal-asset.command';
// export * from './lib/use-cases/delete-portal-asset.use-case';

// Site Appearance (Configuración visual del portal del tenant)
// export * from './lib/use-cases/update-portal-theme-config.use-case';
// export * from './lib/commands/update-portal-theme.command';

// --- Queries & Handlers ---
export * from './lib/queries/get-portal-company-profile.query';
export * from './lib/queries/get-portal-company-profile.query-handler';
export * from './lib/queries/list-property-listings.query'; // Para pwa-supervisor
export * from './lib/queries/list-property-listings.query-handler';
export * from './lib/queries/get-property-listing-details.query'; // Para pwa-supervisor
export * from './lib/queries/get-property-listing-details.query-handler';
// export * from './lib/queries/get-public-portal-data.query'; // Para que portal-imoveis consuma
// export * from './lib/queries/list-portal-assets.query';
// export * from './lib/queries/get-portal-theme-config.query';

// --- DTOs ---
export * from './lib/dtos/portal-company-profile.dto';
export * from './lib/dtos/property-listing.dto';
// export * from './lib/dtos/portal-asset.dto';
// export * from './lib/dtos/portal-theme-config.dto';
