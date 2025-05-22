// RUTA: libs/core/domain/codoeducacontent/src/lib/entities/educational-content.entity.ts
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import { ArgumentNotProvidedException } from '@dfs-suite/sherrors';
import {
  EducationalContentId,
  TenantId, // Si el contenido fuera específico del tenant o tuviera visibilidad controlada por tenant
  Maybe,
  IsoDateString,
  CorrelationId,
  UserId,
  UrlString,
  MarkdownString,
  HtmlString,
  ContentCategoryId,
} from '@dfs-suite/shtypes';
import { Guard, UuidUtils } from '@dfs-suite/shutils';

import { ContentTypeVO, EContentType } from '../value-objects/content-type.vo';
// import { EducationalContentCreatedEvent, EducationalContentPublishedEvent } from '../events';

export interface EducationalContentProps {
  // tenantId?: Maybe<TenantId>; // Si es global, esto es opcional o no existe. Si es por tenant, mandatorio.
  title: string;
  slug: string;
  contentType: ContentTypeVO;
  categoryId: ContentCategoryId;
  summary?: Maybe<string>; // Resumen corto
  bodyMarkdown?: Maybe<MarkdownString>; // Para ARTICLE
  bodyHtml?: Maybe<HtmlString>; // Para ARTICLE si se permite HTML
  videoEmbedUrl?: Maybe<UrlString>; // Para VIDEO_EMBED
  documentUrlOrAssetId?: Maybe<UrlString /* | AssetId */>; // Para PDF_DOCUMENT
  externalLinkUrl?: Maybe<UrlString>; // Para EXTERNAL_LINK
  authorUserId?: Maybe<UserId>; // Quién escribió/creó
  tags?: Maybe<string[]>;
  isPublished: boolean; // Default false
  publishedAt?: Maybe<IsoDateString>;
  readingTimeMinutes?: Maybe<number>;
  // engagementMetrics?: { views: number, shares: number, likes: number }; // Futuro
}

export interface CreateEducationalContentProps {
  // tenantId?: Maybe<TenantId>;
  correlationId: CorrelationId;
  title: string;
  contentType: EContentType;
  categoryId: ContentCategoryId;
  authorUserId: UserId;
  summary?: Maybe<string>;
  bodyMarkdown?: Maybe<MarkdownString>;
  // ... otros campos según contentType
}

export class EducationalContentEntity extends AggregateRoot<
  EducationalContentProps,
  EducationalContentId
> {
  constructor(
    createEntityProps: CreateEntityProps<
      EducationalContentProps,
      EducationalContentId
    >
  ) {
    super(createEntityProps);
  }

  public static create(
    props: CreateEducationalContentProps,
    id?: EducationalContentId
  ): EducationalContentEntity {
    const contentId = id || UuidUtils.generateEducationalContentId();
    const entityProps: EducationalContentProps = {
      title: props.title,
      slug: UuidUtils.generateSlugFromString(props.title),
      contentType: ContentTypeVO.create(props.contentType),
      categoryId: props.categoryId,
      summary: props.summary,
      bodyMarkdown: props.bodyMarkdown,
      authorUserId: props.authorUserId,
      isPublished: false,
    };
    const content = new EducationalContentEntity({
      id: contentId,
      props: entityProps,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // content.addEvent(new EducationalContentCreatedEvent(...));
    return content;
  }

  // Getters y Métodos (publish, unpublish, updateContent, etc.)
  public validate(): void {
    /* ... */
  }
}
// RUTA: libs/core/domain/codoeducacontent/src/lib/entities/educational-content.entity.ts
