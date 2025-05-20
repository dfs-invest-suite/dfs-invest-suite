// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/query.base.ts
import { QueryInstanceId } from '@dfs-suite/shtypes';
import { createOperationMetadata, UuidUtils } from '@dfs-suite/shutils';

import { IQuery, IQueryMetadata } from './query.interface';

export abstract class QueryBase implements IQuery {
  readonly queryInstanceId: QueryInstanceId;
  readonly queryName: string;
  readonly metadata: IQueryMetadata;

  constructor(metadataProps?: Partial<IQueryMetadata>) {
    this.queryInstanceId = UuidUtils.generateQueryInstanceId();
    this.queryName = this.constructor.name;
    this.metadata = createOperationMetadata(metadataProps) as IQueryMetadata;
  }
}
// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/query.base.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorizados los imports para usar los alias codificados.", "justificacion": "Consistencia y resolución de módulos.", "impacto": "Estabilidad."}
]
*/
