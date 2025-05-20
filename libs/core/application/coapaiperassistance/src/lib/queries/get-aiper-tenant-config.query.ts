// RUTA: libs/core/application/coapaiperassistance/src/lib/queries/get-aiper-tenant-config.query.ts
// TODO: [LIA Legacy - Implementar GetAiperTenantConfigQuery]
import { QueryBase, IQueryMetadata } from '@dfs-suite/cdskcommandsqueries';
import { TenantId } from '@dfs-suite/shtypes';
export class GetAiperTenantConfigQuery extends QueryBase {
  constructor(
    public readonly tenantId: TenantId,
    metadata?: Partial<IQueryMetadata>
  ) {
    super(metadata);
  }
}
