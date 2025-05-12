// libs/shared/utils/src/lib/uuid.utils.ts
import { v4 as uuidv4 } from 'uuid';
import { AggregateId, CorrelationId, TenantId, UserId } from '@dfs-suite/shared-types';

export class UuidUtils {
  /**
   * Generates a v4 UUID string.
   */
  static generate(): string {
    return uuidv4();
  }

  static generateTenantId(): TenantId {
    return this.generate() as TenantId;
  }

  static generateUserId(): UserId {
    return this.generate() as UserId;
  }

  static generateAggregateId(): AggregateId {
    return this.generate() as AggregateId;
  }

  static generateCorrelationId(): CorrelationId {
    return this.generate() as CorrelationId;
  }
}
