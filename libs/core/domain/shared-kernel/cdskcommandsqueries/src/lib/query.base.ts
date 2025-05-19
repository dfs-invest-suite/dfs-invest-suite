// RUTA: libs/core/domain/shared-kernel/commands-queries/src/lib/query.base.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import { QueryInstanceId } from '@dfs-suite/shared-types';
import { createOperationMetadata, UuidUtils } from '@dfs-suite/shared-utils';
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
// RUTA: libs/core/domain/shared-kernel/commands-queries/src/lib/query.base.ts
/* SECCIÓN DE MEJORAS (sin cambios respecto a la versión anterior que debería funcionar) */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA (sin cambios respecto a la versión anterior que debería funcionar) */
