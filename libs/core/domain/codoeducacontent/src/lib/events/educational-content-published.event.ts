// RUTA: libs/core/domain/codoeducacontent/src/lib/events/educational-content-published.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  EducationalContentId,
  CorrelationId,
  UserId,
  IsoDateString,
} from '@dfs-suite/shtypes';

export interface EducationalContentPublishedPayload {
  educationalContentId: EducationalContentId;
  publishedAt: IsoDateString;
  publishedByUserId: UserId;
  correlationId: CorrelationId;
}

export class EducationalContentPublishedEvent extends DomainEventBase<EducationalContentPublishedPayload> {
  constructor(props: DomainEventProps<EducationalContentPublishedPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codoeducacontent/src/lib/events/educational-content-published.event.ts
