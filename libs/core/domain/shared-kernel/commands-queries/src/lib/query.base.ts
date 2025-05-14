// libs/core/domain/shared-kernel/commands-queries/src/lib/query.base.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import { UuidUtils } from '@dfs-suite/shared-utils'; // Guard ya no es necesario aquí directamente
import { IQuery, IQueryMetadata } from './query.interface';
import { QueryInstanceId } from '@dfs-suite/shared-types';
// Importar la nueva factoría
import { createOperationMetadata } from './metadata.factory';

export abstract class QueryBase implements IQuery {
  readonly queryInstanceId: QueryInstanceId;
  readonly queryName: string;
  readonly metadata: IQueryMetadata;

  constructor(metadataProps?: Partial<IQueryMetadata>) {
    this.queryInstanceId = UuidUtils.generateQueryInstanceId();
    this.queryName = this.constructor.name;
    // Usar la factoría para crear la metadata
    this.metadata = createOperationMetadata(metadataProps) as IQueryMetadata;
    // El cast a IQueryMetadata es necesario si createOperationMetadata devuelve un tipo base como ICommandMetadata
    // y queremos que this.metadata sea estrictamente IQueryMetadata.
    // Si IQueryMetadata e ICommandMetadata son estructuralmente idénticas, el cast es seguro.
  }
}
// libs/core/domain/shared-kernel/commands-queries/src/lib/query.base.ts
/* SECCIÓN DE MEJORAS
[
  Mejora Aplicada: Utiliza `createOperationMetadata` para inicializar `metadata`, centralizando la lógica (DRY).
]
[
  Mejora Aplicada: Se eliminaron validaciones de metadata del constructor, ya que ahora están en la factoría.
]
[
  Mejora Pendiente (Tests Unitarios): `query.base.spec.ts` debe ser actualizado para mockear
             `createOperationMetadata` y verificar que se llama, o testear indirectamente
             que la metadata se establece correctamente.
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota 1: Asume que `IQueryMetadata` y la `OutputMetadata` de `createOperationMetadata` son compatibles.
          Si divergen, la factoría o el cast necesitarán ajustes.
]
*/

