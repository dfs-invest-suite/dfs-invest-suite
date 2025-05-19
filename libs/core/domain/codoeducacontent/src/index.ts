// RUTA: libs/core/domain/codoeducacontent/src/index.ts

// Entities
export * from './lib/entities/educational-content.entity'; // (title, body, type (ARTICLE, VIDEO, PDF_LINK), categoryId)
export * from './lib/entities/content-category.entity'; // (name, description)

// Value Objects
export * from './lib/value-objects/content-type.vo';
// export * from './lib/value-objects/content-tags.vo'; // Futuro

// Ports
export * from './lib/ports/educational-content.repository.port';
export * from './lib/ports/content-category.repository.port';

// Domain Services
// export * from './lib/services/content-relevance.service'; // Futuro: Para buscar contenido relevante

// Domain Events
export * from './lib/events/educational-content-created.event';
export * from './lib/events/educational-content-published.event';
