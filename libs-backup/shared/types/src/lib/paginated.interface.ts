// libs/shared/types/src/lib/paginated.interface.ts

/**
 * Parámetros de consulta para solicitudes paginadas.
 */
export interface IPaginatedQueryParams {
  limit?: number;
  page?: number;
  offset?: number; // Calculado o especificado, usualmente page * limit
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  // Se pueden añadir filtros específicos según la necesidad
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any; // Para permitir filtros adicionales
}

/**
 * Estructura para respuestas paginadas.
 * @template T - El tipo de los elementos en los datos paginados.
 */
export interface IPaginated<T> {
  data: readonly T[]; // Los datos de la página actual, idealmente inmutables
  count: number; // Número total de elementos que coinciden con la consulta
  limit: number; // Número de elementos por página
  page: number; // Número de la página actual (basado en 1 o 0)
  totalPages: number; // Número total de páginas
}
/* SECCIÓN DE MEJORAS
// Podría ser útil tener una clase base o una factoría para construir objetos IPaginated<T> de manera consistente.
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota estratégica 1: Considerar la paginación basada en cursor (cursor-based pagination) para conjuntos de datos muy grandes o que cambian frecuentemente, además de la paginación offset/limit. Esto implicaría añadir campos como `nextCursor` y `previousCursor`.
]
*/
