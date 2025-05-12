// libs/shared/types/src/index.ts
export * from './lib/api-response.interface';
export * from './lib/paginated.interface';
export * from './lib/primitive-types';
export * from './lib/maybe.type';
export * from './lib/object-literal.type';
export * from './lib/brand.type';
export * from './lib/correlation-id.type';

/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Exportaciones Nombradas Explícitas): Similar a `shared-result`, considerar exportaciones nombradas en lugar de `export *` para mayor claridad de la API pública.
    `export type { IApiResponse } from './lib/api-response.interface';`
    `export type { IPaginatedQueryParams, IPaginated } from './lib/paginated.interface';`
    // ... y así sucesivamente para los demás.
  Justificación: Mejor control y visibilidad de la API de la librería.
  Impacto: Refactorización menor para listar todas las exportaciones.
]
[
  Mejora Propuesta 2 (Sub-módulos de Tipos): Si la cantidad de tipos crece mucho, considerar agruparlos en sub-archivos o subdirectorios dentro de `src/lib/` por temática (ej. `src/lib/api-types/`, `src/lib/domain-primitive-types/`) y luego re-exportarlos desde este `index.ts` principal.
  Justificación: Mejora la organización si la librería se vuelve muy extensa.
  Impacto: Reestructuración de archivos y rutas de exportación.
]

*/
