// RUTA: libs/core/domain/codoeducacontent/src/lib/events/educational-content-created.event.ts
import { DomainEventBase, DomainEventProps } from '@dfs-suite/cdskevents';
import {
  EducationalContentId,
  ContentCategoryId,
  CorrelationId,
  UserId,
} from '@dfs-suite/shtypes';

import { EContentType } from '../value-objects/content-type.vo';

export interface EducationalContentCreatedPayload {
  educationalContentId: EducationalContentId;
  title: string;
  slug: string;
  contentType: EContentType;
  categoryId: ContentCategoryId;
  createdByUserId: UserId;
  correlationId: CorrelationId;
}

export class EducationalContentCreatedEvent extends DomainEventBase<EducationalContentCreatedPayload> {
  constructor(props: DomainEventProps<EducationalContentCreatedPayload>) {
    super(props);
  }
}
// RUTA: libs/core/domain/codoeducacontent/src/lib/events/educational-content-created.event.ts
