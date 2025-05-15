// libs/core/domain/shared-kernel/commands-queries/src/lib/paginated-query.base.ts
import { QueryBase } from './query.base'; // QueryBase ahora tiene queryInstanceId, queryName
import { IPaginatedQueryParams, Maybe } from '@dfs-suite/shared-types';
import { DEFAULT_PAGE, DEFAULT_PAGE_LIMIT } from '@dfs-suite/shared-constants';
import { IQueryMetadata } from './query.interface'; // Usa IQueryMetadata

export type OrderBy<TFields extends string> = {
  field: TFields | 'createdAt' | 'updatedAt';
  direction: 'asc' | 'desc';
};

export abstract class PaginatedQueryBase<
  TOrderByFields extends string = string
> extends QueryBase {
  readonly limit: number;
  readonly page: number;
  readonly offset: number;
  readonly orderBy: Maybe<OrderBy<TOrderByFields>>;

  constructor(
    params: Partial<
      IPaginatedQueryParams & { orderBy?: OrderBy<TOrderByFields> }
    > = {},
    metadata?: Partial<IQueryMetadata> // Ya usa IQueryMetadata
  ) {
    super(metadata); // Pasa metadata a QueryBase, que ahora tiene la lógica mejorada
    this.page = params.page || DEFAULT_PAGE;
    this.limit = params.limit || DEFAULT_PAGE_LIMIT;
    this.offset = params.offset ?? (this.page - 1) * this.limit;
    this.orderBy =
      params.sortBy && params.sortOrder
        ? {
            field: params.sortBy as TOrderByFields,
            direction: params.sortOrder,
          }
        : undefined;
  }
}
// libs/core/domain/shared-kernel/commands-queries/src/lib/paginated-query.base.ts
/* SECCIÓN DE MEJORAS (Mismas que antes, relativas a esta clase)
[
  Mejora Pendiente (Validación de Parámetros de Paginación en Constructor).
]
[
  Mejora Pendiente (Tipado Fuerte para `params.sortBy`).
]
[
  Mejora Pendiente (Múltiples Campos de Ordenación).
]
[
  Mejora Pendiente (Tests Unitarios): Crucial añadir `paginated-query.base.spec.ts`.
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA (Mismas que antes) */
/* SECCIÓN DE MEJORAS (Actualizada)

[
  Mejora Aplicada: El constructor ahora usa `IQueryMetadata` para el parámetro `metadata`.
]
[
  Mejora Pendiente (Validación de Parámetros de Paginación en Constructor): Añadir `Guard`s.
]
[
  Mejora Pendiente (Tipado Fuerte para `params.sortBy`): Alinear con `IPaginatedQueryParams` genérico.
]
[
  Mejora Pendiente (Múltiples Campos de Ordenación): Extender `OrderBy`.
]
[
  Mejora Pendiente (Tests Unitarios): Crucial añadir `paginated-query.base.spec.ts`.
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota 1 (Paginación 1-based): El cálculo de `offset` sigue asumiendo página 1-based.
]
*/
