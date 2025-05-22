// libs/core/application/tenancy/src/lib/dtos/tenant-details.dto.ts
import { TenantStatusEnum } from '@dfs-suite/core-domain-tenancy'; // Asumiendo que se exporta desde el index del dominio
import {
  IsoDateString,
  Maybe,
  TenantId,
  UserId,
} from '@dfs-suite/shared-types';

export interface TenantDetailsDto {
  readonly id: TenantId;
  readonly name: string;
  readonly ownerUserId: UserId;
  readonly status: TenantStatusEnum | string; // string para flexibilidad si el enum no se puede importar directamente
  readonly planId: Maybe<string>;
  readonly createdAt: IsoDateString;
  readonly updatedAt: IsoDateString;
  // readonly dbConnectionString?: string; // Sensible, usualmente no se expone
}
