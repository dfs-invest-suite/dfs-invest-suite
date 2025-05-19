// libs/core/application/tenancy/src/lib/commands/create-tenant/create-tenant.command.ts
import {
  CommandBase,
  ICommandMetadata,
} from '@dfs-suite/core-domain-shared-kernel-commands-queries';
import { Maybe } from '@dfs-suite/shared-types';

export interface CreateTenantCommandPayload {
  readonly name: string;
  readonly ownerEmail: string; // Email del primer admin del tenant
  readonly planId?: Maybe<string>;
}

export class CreateTenantCommand
  extends CommandBase
  implements CreateTenantCommandPayload
{
  readonly name: string;
  readonly ownerEmail: string;
  readonly planId?: Maybe<string>;

  constructor(
    payload: CreateTenantCommandPayload,
    metadata?: Partial<ICommandMetadata>
  ) {
    super(metadata);
    this.name = payload.name;
    this.ownerEmail = payload.ownerEmail;
    this.planId = payload.planId;
  }
}
