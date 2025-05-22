// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/paginated-query.base.ts
// Autor: L.I.A Legacy (IA Asistente)
import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT } from '@dfs-suite/shconstants';
import { IPaginatedQueryParams, Maybe, IPaginated } from '@dfs-suite/shtypes'; // Añadido IPaginated

import { QueryBase } from './query.base';
import { IQueryMetadata } from './query.interface';

/**
 * Define la estructura para la ordenación en queries paginadas.
 * @template TFields - Un tipo string literal que representa los campos por los cuales se puede ordenar.
 */
export type OrderBy<TFields extends string = string> = {
  // Default TFields a string
  field: TFields | 'createdAt' | 'updatedAt'; // Permite ordenar por campos comunes de timestamp
  direction: 'asc' | 'desc';
};

/**
 * Clase base abstracta para queries que soportan paginación y ordenación.
 * Extiende `QueryBase` y añade propiedades estándar para paginación (`limit`, `page`, `offset`)
 * y ordenación (`orderBy`).
 *
 * Las clases de query concretas que necesiten paginación heredarán de esta base.
 *
 * @template TResultItem - El tipo de item individual en el resultado paginado.
 * @template TOrderByFields - Un tipo string literal para los campos específicos por los que se puede ordenar.
 */
export abstract class PaginatedQueryBase<
    TResultItem = unknown, // Tipo del item individual
    TOrderByFields extends string = string // Campos específicos de ordenación
  >
  extends QueryBase<IPaginated<TResultItem>>
  // El resultado es un objeto IPaginated
  implements Partial<IPaginatedQueryParams>
{
  // Implementa parcialmente para que los campos sean opcionales en el constructor
  readonly limit: number;
  readonly page: number;
  readonly offset: number;
  readonly orderBy?: Maybe<OrderBy<TOrderByFields>>; // orderBy es opcional

  /**
   * @param params - Parámetros opcionales de paginación y ordenación.
   *                 Si no se proveen, se usan los valores por defecto de `shconstants`.
   * @param metadataProps - Metadatos para la query base.
   */
  protected constructor(
    params: Partial<
      IPaginatedQueryParams & { orderBy?: OrderBy<TOrderByFields> } // orderBy es opcional aquí también
    > = {},
    metadataProps?: Partial<IQueryMetadata>
  ) {
    super(metadataProps);

    this.page = Math.max(1, params.page || DEFAULT_PAGE); // Asegura que page sea al menos 1
    this.limit = Math.max(1, params.limit || DEFAULT_PAGE_LIMIT); // Asegura que limit sea al menos 1
    this.offset = params.offset ?? (this.page - 1) * this.limit;

    // Construir orderBy solo si sortBy y sortOrder son proporcionados y válidos
    if (
      params.sortBy &&
      params.sortOrder &&
      (params.sortOrder === 'asc' || params.sortOrder === 'desc')
    ) {
      this.orderBy = {
        field: params.sortBy as TOrderByFields, // Cast necesario si sortBy puede ser más genérico
        direction: params.sortOrder,
      };
    } else {
      this.orderBy = undefined; // O null, según preferencia de Maybe
    }
  }
}
// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/paginated-query.base.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Imports actualizados a alias codificados.", "justificacion": "Consistencia.", "impacto": "Resolución." },
  { "mejora": "`PaginatedQueryBase` ahora es genérico sobre `TResultItem` y `TOrderByFields`.", "justificacion": "Permite a las queries concretas especificar el tipo de item que devuelven en la paginación y los campos por los que se puede ordenar, mejorando la seguridad de tipos.", "impacto": "Tipado más preciso y flexible." },
  { "mejora": "El tipo de resultado de `PaginatedQueryBase` ahora es `IPaginated<TResultItem>`.", "justificacion": "Alinea la query con la estructura de respuesta paginada estándar.", "impacto": "Consistencia." },
  { "mejora": "`OrderBy<TFields>` ahora tiene un default a `string` para `TFields`.", "justificacion": "Mayor flexibilidad si no se quiere restringir los campos de ordenación.", "impacto": "DX." },
  { "mejora": "Constructor de `PaginatedQueryBase` más robusto.", "justificacion": "Asegura que `page` y `limit` sean al menos 1. `orderBy` se construye solo si `sortBy` y `sortOrder` son válidos.", "impacto": "Mayor robustez y comportamiento predecible." },
  { "mejora": "JSDoc detallado.", "justificacion": "Claridad.", "impacto": "DX." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
