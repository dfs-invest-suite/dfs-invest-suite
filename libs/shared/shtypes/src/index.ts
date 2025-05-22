// libs/shared/shtypes/src/index.ts
export * from './lib/core/enhanced-brand.type';
export * from './lib/core/type-registry'; // Aunque sea placeholder

export * from './lib/primitives/core-primitives';
// El archivo primitive-types.ts (que contenía IDs de dominio) ya no debería existir o estar vacío si seguimos la refactorización.
// export * from './lib/primitives/primitive-types'; // Comentar o eliminar si fue refactorizado

export * from './lib/api/enhanced-response.interface';
export * from './lib/common-enums';
export * from './lib/maybe.type';
export * from './lib/object-literal.type';
export * from './lib/pagination/advanced-pagination.interface'; // Renombrado en snapshot

// Re-exportar todos los tipos de dominio para un acceso más simple desde el exterior
export * from './lib/domains'; // Esto exportará TenantId, UserId, etc.
// FIN DEL ARCHIVO: libs/shared/shtypes/src/index.ts
