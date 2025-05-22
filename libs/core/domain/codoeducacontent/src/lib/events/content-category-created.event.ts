// RUTA: libs/core/domain/codoeducacontent/src/lib/events/content-category-created.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import { ContentCategoryId, CorrelationId, UserId } from '@dfs-suite/shtypes';

export interface ContentCategoryCreatedPayload {
  contentCategoryId: ContentCategoryId;
  name: string;
  slug: string;
  createdByUserId: UserId;
  correlationId: CorrelationId;
}

export class ContentCategoryCreatedEvent extends DomainEventBase<ContentCategoryCreatedPayload> {
  constructor(props: DomainEventProps<ContentCategoryCreatedPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codoeducacontent/src/lib/events/content-category-created.event.ts
