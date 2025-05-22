// RUTA: libs/shared/shtypes/src/lib/pagination/advanced-pagination.interface.ts
import { ObjectLiteral } from '../object-literal.type';

export interface SortField<TFieldKey extends string = string> {
  readonly field: TFieldKey;
  readonly direction: 'asc' | 'desc';
  readonly nullsFirst?: boolean;
}

export interface CursorInfo<TCursorValue = unknown> {
  readonly field: string;
  readonly value: TCursorValue;
  readonly direction: 'forward' | 'backward';
}

// <<<< CAMBIO DE NOMBRE: IAdvancedPaginationParams a IPaginatedQueryParams >>>>
export interface IPaginatedQueryParams<
  TFilters extends ObjectLiteral = Record<string, unknown>,
  TSortFieldKey extends string = string,
  TCursorValue = unknown
> {
  readonly limit?: number;
  readonly offset?: number;
  readonly page?: number;
  readonly cursor?: string;
  readonly cursorInfo?: CursorInfo<TCursorValue>;
  readonly sort?: ReadonlyArray<SortField<TSortFieldKey>>;
  readonly filters?: TFilters;
  readonly searchQuery?: string;
  readonly includeTotalCount?: boolean;
  readonly includeAggregations?: ReadonlyArray<string>;
}

export interface IPaginated<TData> {
  readonly data: ReadonlyArray<TData>;
  readonly itemCount: number; // Ítems en la página actual
  readonly totalCount?: number; // Total de ítems global si se solicitó
  readonly limit: number;
  readonly page?: number;
  readonly offset?: number;
  readonly totalPages?: number;
  readonly hasNextPage: boolean;
  readonly hasPreviousPage: boolean;
  readonly nextCursor?: string;
  readonly previousCursor?: string;
}

// <<<< CAMBIO: IAdvancedPaginatedResponse.pagination ahora define su propia estructura, inspirada en IPaginated >>>>
export interface IAdvancedPaginatedResponse<
  TData,
  TAggregations extends ObjectLiteral = Record<string, unknown>
> {
  readonly data: ReadonlyArray<TData>;
  readonly pagination: {
    // Definición explícita aquí
    readonly totalCount?: number;
    readonly itemCount: number;
    readonly limit: number;
    readonly offset?: number;
    readonly page?: number;
    readonly totalPages?: number;
    readonly hasNextPage: boolean;
    readonly hasPreviousPage: boolean;
    readonly nextCursor?: string;
    readonly previousCursor?: string;
  };
  readonly aggregations?: TAggregations;
  readonly metadata?: {
    readonly executionTimeMs: number;
    readonly cacheHit?: boolean;
    readonly queryUsed?: string;
  };
}
// FIN DEL ARCHIVO: libs/shared/shtypes/src/lib/pagination/advanced-pagination.interface.ts
