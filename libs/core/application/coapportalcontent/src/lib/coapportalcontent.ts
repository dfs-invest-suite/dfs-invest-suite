// RUTA: libs/core/application/coapportalcontent/src/index.ts

// --- Commands & Use Cases ---
// Company Profile
export * from './lib/commands/update-company-profile.command';
export * from './lib/use-cases/update-portal-company-profile.use-case';

// Property Listings
export * from './lib/commands/create-property-listing.command';
export * from './lib/commands/delete-property-listing.command';
export * from './lib/commands/publish-property-listing.command';
export * from './lib/commands/unpublish-property-listing.command'; // Nuevo
export * from './lib/commands/update-property-listing.command';
export * from './lib/use-cases/create-property-listing.use-case';
export * from './lib/use-cases/delete-property-listing.use-case';
export * from './lib/use-cases/publish-property-listing.use-case';
export * from './lib/use-cases/unpublish-property-listing.use-case'; // Nuevo
export * from './lib/use-cases/update-property-listing.use-case';
// export * from './lib/use-cases/manage-property-gallery.use-case';   // Nuevo: Añadir/quitar/reordenar imágenes

// Portal Assets (Imágenes, PDFs para propiedades, logo de empresa)
export * from './lib/commands/delete-portal-asset.command';
export * from './lib/commands/upload-portal-asset.command';
export * from './lib/use-cases/delete-portal-asset.use-case';
export * from './lib/use-cases/upload-portal-asset.use-case';
// export * from './lib/use-cases/assign-asset-to-property.use-case';

// Site Appearance (Configuración visual del portal del tenant)
export * from './lib/commands/update-portal-theme.command';
export * from './lib/use-cases/update-portal-theme-config.use-case';

// --- Queries & Handlers ---
// Para pwa-supervisor (gestión)
export * from './lib/queries/get-portal-company-profile.query';
export * from './lib/queries/get-portal-company-profile.query-handler';
export * from './lib/queries/get-portal-theme-config.query';
export * from './lib/queries/get-portal-theme-config.query-handler';
export * from './lib/queries/get-property-listing-details.query';
export * from './lib/queries/get-property-listing-details.query-handler';
export * from './lib/queries/list-portal-assets.query';
export * from './lib/queries/list-portal-assets.query-handler';
export * from './lib/queries/list-property-listings.query';
export * from './lib/queries/list-property-listings.query-handler';

// Para portal-imoveis (público, podría necesitar un conjunto de queries diferente)
export * from './lib/queries/get-public-portal-data.query'; // Agrega perfil y listados destacados
export * from './lib/queries/get-public-portal-data.query-handler';
export * from './lib/queries/get-public-property-details.query'; // Para página de detalle de propiedad pública
export * from './lib/queries/get-public-property-details.query-handler';
// export * from './lib/queries/search-public-properties.query'; // Futuro

// --- DTOs ---
export * from './lib/dtos/portal-asset.dto';
export * from './lib/dtos/portal-company-profile.dto';
export * from './lib/dtos/portal-theme-config.dto';
export * from './lib/dtos/property-listing-input.dto'; // Para create/update
export * from './lib/dtos/property-listing-public.dto'; // Para portal público

// --- Application Service Ports ---
// export * from './lib/ports/i-image-processor.port'; // Para optimizar imágenes subidas
// export * from './lib/ports/i-slug-generation.port'; // Si la generación de slugs es un servicio
