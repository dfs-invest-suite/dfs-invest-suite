// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/query.base.ts
// Autor: L.I.A Legacy (IA Asistente)
import { QueryInstanceId } from '@dfs-suite/shtypes';
import { createOperationMetadata, UuidUtils } from '@dfs-suite/shutils';

import { IQuery, IQueryMetadata } from './query.interface';

/**
 * Clase base abstracta para todas las queries del sistema.
 * Implementa la interfaz `IQuery` y se encarga de inicializar
 * el `queryInstanceId`, `queryName`, y `metadata` de forma consistente.
 *
 * Las clases de query concretas heredarán de esta base y añadirán
 * sus propiedades específicas como parámetros de la query.
 *
 * @template TResult - El tipo de datos esperado como resultado de la query.
 */
export abstract class QueryBase<TResult = unknown> // TResult es usado por la interfaz IQuery
  implements IQuery<TResult>
{
  readonly queryInstanceId: QueryInstanceId;
  readonly queryName: string;
  readonly metadata: Readonly<IQueryMetadata>;

  /**
   * @param metadataProps - Valores parciales para la metadata. `correlationId` y `timestamp`
   *                        se generarán automáticamente si no se proveen.
   */
  protected constructor(metadataProps?: Partial<IQueryMetadata>) {
    this.queryInstanceId = UuidUtils.generateQueryInstanceId();
    this.queryName = this.constructor.name;
    this.metadata = Object.freeze(
      createOperationMetadata(metadataProps) as IQueryMetadata
    );
  }
}
// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/query.base.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Imports actualizados a alias codificados.", "justificacion": "Consistencia.", "impacto": "Resolución." },
  { "mejora": "Añadido genérico `TResult` a `QueryBase` para alinearse con `IQuery<TResult>`.", "justificacion": "Consistencia de tipos, aunque `QueryBase` no use `TResult` directamente.", "impacto": "Correctitud de la implementación de la interfaz." },
  { "mejora": "JSDoc añadido.", "justificacion": "Claridad.", "impacto": "DX." },
  { "mejora": "`metadata` es `Readonly<IQueryMetadata>` y se congela.", "justificacion": "Inmutabilidad.", "impacto": "Seguridad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
