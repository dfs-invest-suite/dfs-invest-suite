// RUTA: libs/core/application/coapusersroles/src/lib/queries/list-users-by-tenant.query.ts
import {
  PaginatedQueryBase,
  IQueryMetadata,
  OrderBy,
} from '@dfs-suite/cdskcommandsqueries';
import {
  IPaginated,
  IPaginatedQueryParams,
  Maybe,
  TenantId,
} from '@dfs-suite/shtypes';

import { UserFilterAppDto } from '../dtos/user-filter.dto'; // Asumiendo que este DTO se creará
import { UserSummaryDto } from '../dtos/user-summary.dto';

export interface ListUsersByTenantQueryPayload {
  readonly tenantId: TenantId;
  readonly filters?: Maybe<UserFilterAppDto>;
}

export type UserSortableFields =
  | 'name'
  | 'email'
  | 'role'
  | 'isActive'
  | 'createdAt'
  | 'updatedAt'
  | 'lastLoginAt';

export class ListUsersByTenantQuery extends PaginatedQueryBase<
  UserSummaryDto,
  UserSortableFields
> {
  public readonly payload: ListUsersByTenantQueryPayload;

  constructor(
    payload: ListUsersByTenantQueryPayload,
    pagination?: Partial<
      IPaginatedQueryParams & { orderBy?: OrderBy<UserSortableFields> }
    >,
    metadata?: Partial<IQueryMetadata>
  ) {
    super(pagination, metadata);
    this.payload = payload;
  }
}
// RUTA: libs/core/application/coapusersroles/src/lib/queries/list-users-by-tenant.query.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `ListUsersByTenantQuery`.", "justificacion": "Query para listar usuarios de un tenant con paginación, filtros y ordenación.", "impacto": "Contrato de datos para listados de usuarios." },
  { "mejora": "Definición de `UserSortableFields` para tipar el `orderBy`.", "justificacion": "Seguridad de tipos para la ordenación.", "impacto": "Claridad."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {"nota": "El DTO `UserFilterAppDto` necesita ser creado para definir los criterios de filtro posibles (ej. por rol, estado activo/inactivo, búsqueda por nombre/email)."}
]
*/
