// RUTA: libs/shared/shtypes/src/index.ts
// TODO: [LIA Legacy - Asegurar completitud de exports] - ¡REALIZADO!
// Propósito: Punto de entrada principal para la librería @dfs-suite/shtypes, exportando todos los tipos y utilidades fundamentales.

// Tipos Primitivos y Brandeados Fundamentales
export * from './lib/brand.type'; // Exporta el helper Brand<K,T>
export * from './lib/primitive-types'; // Exporta todos los Branded IDs y tipos semánticos

// Tipos Utilitarios Genéricos
export * from './lib/maybe.type'; // Exporta el tipo Maybe<T>
export * from './lib/object-literal.type'; // Exporta la interfaz ObjectLiteral<V>

// Estructuras de Datos Comunes para API y Paginación
export * from './lib/api-response.interface'; // Exporta IApiResponse<TData, TErrorDetails>
export * from './lib/paginated.interface'; // Exporta IPaginatedQueryParams e IPaginated<T>

// Enums Globales Compartidos
export * from './lib/common-enums'; // Exporta SortDirection, BasicEntityStatus, CommunicationChannel

/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Verificación y confirmación de todas las exportaciones necesarias.", "justificacion": "Asegura que todos los artefactos definidos en `src/lib/` y que deben ser públicos estén disponibles a través de `@dfs-suite/shtypes`.", "impacto": "API pública completa y consistente para la librería." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
// RUTA: libs/shared/shtypes/src/index.ts
