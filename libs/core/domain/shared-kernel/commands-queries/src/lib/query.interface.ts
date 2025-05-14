// libs/core/domain/shared-kernel/commands-queries/src/lib/query.interface.ts
import {
  CorrelationId,
  Maybe,
  UserId,
  IsoDateString,
  QueryInstanceId, // Usamos el Branded Type
  CommandInstanceId,     // Para causationId
  DomainEventInstanceId, // Para causationId
} from '@dfs-suite/shared-types';

/**
 * @interface IQueryMetadata
 * @description Define la estructura de los metadatos asociados a una query.
 */
export interface IQueryMetadata {
  readonly correlationId: CorrelationId;
  readonly causationId?: Maybe<CorrelationId | CommandInstanceId | DomainEventInstanceId>; // Tipado más específico
  readonly userId?: Maybe<UserId>;
  readonly timestamp: IsoDateString; // Estandarizado a IsoDateString
}

/**
 * @interface IQuery
 * @description Define la interfaz base para todas las queries en el sistema.
 */
export interface IQuery {
  /**
   * @property {QueryInstanceId} queryInstanceId - ID único de la instancia de la query.
   */
  readonly queryInstanceId: QueryInstanceId;

  /**
   * @property {string} queryName - Nombre de la clase de la query concreta.
   */
  readonly queryName: string;

  /**
   * @property {IQueryMetadata} metadata - Metadatos de la query.
   */
  readonly metadata: IQueryMetadata;
}
// libs/core/domain/shared-kernel/commands-queries/src/lib/query.interface.ts
/* SECCIÓN DE MEJORAS (Refleja el estado deseado)
[
  Mejora Aplicada: Se introdujo `IQueryMetadata` separada de `ICommandMetadata`.
]
[
  Mejora Aplicada: `queryInstanceId` (tipo `QueryInstanceId`) y `queryName` añadidos a `IQuery`.
]
[
  Mejora Aplicada: `metadata.timestamp` es `IsoDateString`.
]
[
  Mejora Aplicada: `metadata.causationId` ahora es una unión de posibles IDs causales.
]
[
  Mejora Pendiente (`userId` en `IQueryMetadata`): Evaluar si debe ser obligatorio o si se necesitan contextos específicos.
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA (Sin cambios) */
/* SECCIÓN DE MEJORAS (Refleja cambios y mejoras pendientes)
[
  Mejora Aplicada: Se introdujo `IQueryMetadata` separada.
]
[
  Mejora Aplicada: Se añadió `queryInstanceId` (tipo `QueryInstanceId`).
]
[
  Mejora Aplicada: Se añadió `queryName`.
]
[
  Mejora Aplicada: `metadata.timestamp` ahora usa `IsoDateString`.
]
[
  Mejora Pendiente (`userId` en `IQueryMetadata`): Evaluar si debe ser obligatorio
    o si se necesitan contextos específicos (ej. `IAuthenticatedQueryMetadata`).
    Para queries, `userId` es a menudo para filtrado de datos basado en permisos.
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota 1: La clase `QueryBase` deberá implementar estas nuevas propiedades (`queryInstanceId`, `queryName`)
          y usar `IQueryMetadata`.
]
*/
