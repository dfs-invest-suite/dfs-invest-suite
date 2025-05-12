// libs/core/domain/shared-kernel/commands-queries/src/lib/query.base.ts
import { UuidUtils } from '@dfs-suite/shared-utils';
import { IQuery } from './query.interface';
import { ICommandMetadata } from './command.interface';
import { CorrelationId, Maybe, UserId } from '@dfs-suite/shared-types';

export abstract class QueryBase implements IQuery {
  readonly metadata: ICommandMetadata;

  constructor(props?: Partial<ICommandMetadata>) {
    let contextCorrelationId: CorrelationId;
    const placeholderCorrId = 'CONTEXT_CORR_ID_QUERY_PLACEHOLDER';
    if (placeholderCorrId && typeof placeholderCorrId === 'string' && placeholderCorrId.length > 0) {
        contextCorrelationId = placeholderCorrId as CorrelationId;
    } else {
        contextCorrelationId = UuidUtils.generateCorrelationId();
    }

    this.metadata = Object.freeze({
      correlationId: props?.correlationId || contextCorrelationId,
      causationId: props?.causationId,
      timestamp: props?.timestamp || Date.now(),
      userId: props?.userId,
    });
  }
}
