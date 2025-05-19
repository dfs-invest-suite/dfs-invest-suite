// RUTA: libs/core/application/coapeducacontent/src/index.ts

// --- Commands & Use Cases ---
// Content Category Management
export * from './lib/use-cases/create-content-category.use-case';
export * from './lib/commands/create-content-category.command';
export * from './lib/use-cases/update-content-category.use-case';
export * from './lib/commands/update-content-category.command';
// export * from './lib/use-cases/delete-content-category.use-case';

// Educational Content Management
export * from './lib/use-cases/create-educational-content.use-case';
export * from './lib/commands/create-educational-content.command';
export * from './lib/use-cases/update-educational-content.use-case';
export * from './lib/commands/update-educational-content.command';
// export * from './lib/use-cases/delete-educational-content.use-case';
// export * from './lib/use-cases/publish-educational-content.use-case';

// Content Discovery/Usage
export * from './lib/use-cases/find-relevant-educa-content.use-case'; // Para sugerir a leads
// export * from './lib/use-cases/track-educa-content-engagement.use-case'; // Futuro: si se rastrea vistas/descargas

// --- Queries & Handlers ---
export * from './lib/queries/list-content-categories.query';
export * from './lib/queries/list-content-categories.query-handler';
export * from './lib/queries/list-educational-content.query'; // Con filtros por categoría, tags
export * from './lib/queries/list-educational-content.query-handler';
export * from './lib/queries/get-educational-content-details.query';
export * from './lib/queries/get-educational-content-details.query-handler';

// --- DTOs ---
export * from './lib/dtos/content-category.dto';
export * from './lib/dtos/educational-content.dto';
export * from './lib/dtos/educa-content-filter.dto';
