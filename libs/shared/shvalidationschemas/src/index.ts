// RUTA: libs/shared/shvalidationschemas/src/index.ts

export * from './lib/zod.instance'; // Re-exportar 'z'
export * from './lib/common.schemas'; // EmailSchema, UuidSchema, IsoDateStringSchema, etc.
export * from './lib/pagination.schemas'; // PaginatedQueryParamsSchema
// Otros schemas base que puedan ser reutilizables por múltiples dominios.
