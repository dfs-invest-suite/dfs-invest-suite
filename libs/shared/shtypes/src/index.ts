// RUTA: libs/shared/shtypes/src/index.ts

// Tipos Primitivos y Brandeados Fundamentales
export * from './lib/primitive-types'; // Incluye AggregateId, TenantId, UserId, CorrelationId, IsoDateString, CommandInstanceId, QueryInstanceId, DomainEventInstanceId
export * from './lib/brand.type'; // El tipo Brand<K, T> en sí mismo

// Tipos Utilitarios Genéricos
export * from './lib/maybe.type';
export * from './lib/object-literal.type';

// Estructuras de Datos Comunes
export * from './lib/api-response.interface';
export * from './lib/paginated.interface';

// Enums Globales (si los tuviéramos aquí, pero muchos irán a sus dominios específicos)
// Ejemplo: export * from './lib/global-status.enum';
