// RUTA: libs/core/application/coapusersroles/src/lib/queries/get-user-by-id.query.ts
import { QueryBase, IQueryMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId, UserId } from '@dfs-suite/shtypes';

import { UserDetailsDto } from '../dtos/user-details.dto';

export interface GetUserByIdQueryPayload {
  readonly tenantId: TenantId; // Contexto del tenant
  readonly userIdToFetch: UserId;
}

export class GetUserByIdQuery extends QueryBase<UserDetailsDto> {
  public readonly payload: GetUserByIdQueryPayload;

  constructor(
    payload: GetUserByIdQueryPayload,
    metadata?: Partial<IQueryMetadata>
  ) {
    super(metadata);
    this.payload = payload;
  }
}
// RUTA: libs/core/application/coapusersroles/src/lib/queries/get-user-by-id.query.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `GetUserByIdQuery`.", "justificacion": "Query para solicitar los detalles de un usuario específico.", "impacto": "Contrato de datos para la obtención de usuarios." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
