// libs/core/application/tenancy/src/lib/commands/activate-tenant/activate-tenant.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/core-domain-shared-kernel-commands-queries';
import { TenantId } from '@dfs-suite/shared-types';

export interface ActivateTenantCommandPayload {
  readonly tenantId: TenantId;
}

export class ActivateTenantCommand extends CommandBase implements ActivateTenantCommandPayload {
  readonly tenantId: TenantId;

  constructor(payload: ActivateTenantCommandPayload, metadata?: Partial<ICommandMetadata>) {
    super(metadata);
    this.tenantId = payload.tenantId;
  }
}
