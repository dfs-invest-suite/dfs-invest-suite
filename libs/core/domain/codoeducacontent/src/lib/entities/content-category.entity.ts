// RUTA: libs/core/domain/codoeducacontent/src/lib/entities/content-category.entity.ts
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import { ArgumentNotProvidedException } from '@dfs-suite/sherrors';
import {
  ContentCategoryId,
  TenantId,
  Maybe,
  CorrelationId,
  UserId,
} from '@dfs-suite/shtypes';
import { Guard, UuidUtils } from '@dfs-suite/shutils';
// import { ContentCategoryCreatedEvent, ContentCategoryUpdatedEvent } from '../events'; // A crear

export interface ContentCategoryProps {
  // tenantId: TenantId; // Contenido puede ser global o por tenant. Decisión: Por ahora, global.
  // Si fuera por tenant, se añadiría tenantId y el repo sería contextualizado.
  name: string;
  slug: string;
  description?: Maybe<string>;
  parentCategoryId?: Maybe<ContentCategoryId>; // Para jerarquías de categorías
  isActive: boolean; // Para poder ocultar categorías sin borrarlas
}

export interface CreateContentCategoryProps {
  // tenantId?: Maybe<TenantId>; // Si fuera por tenant
  correlationId: CorrelationId; // Para evento
  name: string;
  description?: Maybe<string>;
  parentCategoryId?: Maybe<ContentCategoryId>;
  createdByUserId: UserId; // Quién creó la categoría
}

export class ContentCategoryEntity extends AggregateRoot<
  ContentCategoryProps,
  ContentCategoryId
> {
  constructor(
    createEntityProps: CreateEntityProps<
      ContentCategoryProps,
      ContentCategoryId
    >
  ) {
    super(createEntityProps);
  }

  public static create(
    props: CreateContentCategoryProps,
    id?: ContentCategoryId
  ): ContentCategoryEntity {
    Guard.againstNullOrUndefined(props.name, 'Category name');
    if (Guard.isEmpty(props.name.trim()))
      throw new ArgumentNotProvidedException('Category name cannot be empty.');

    const categoryId = id || UuidUtils.generateContentCategoryId(); // Necesita generador
    const entityProps: ContentCategoryProps = {
      name: props.name.trim(),
      slug: UuidUtils.generateSlugFromString(props.name.trim()), // Necesita generador en shutils
      description: props.description,
      parentCategoryId: props.parentCategoryId,
      isActive: true, // Por defecto activa
    };
    const category = new ContentCategoryEntity({
      id: categoryId,
      props: entityProps,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    // category.addEvent(new ContentCategoryCreatedEvent({ aggregateId: categoryId, payload: { /* ... */ } }));
    return category;
  }

  // Getters...
  get name(): string {
    return this.props.name;
  }
  // ...

  public updateDetails(name?: string, description?: Maybe<string>): void {
    // ...
    this.setUpdatedAt();
    // Emitir evento
  }

  public activate(): void {
    if (this.props.isActive) return;
    this.props.isActive = true;
    this.setUpdatedAt();
  }
  public deactivate(): void {
    if (!this.props.isActive) return;
    this.props.isActive = false;
    this.setUpdatedAt();
  }

  public validate(): void {
    Guard.againstNullOrUndefined(
      this.props.name,
      'ContentCategoryEntity: name'
    );
    Guard.againstNullOrUndefined(
      this.props.slug,
      'ContentCategoryEntity: slug'
    );
  }
}
// RUTA: libs/core/domain/codoeducacontent/src/lib/entities/content-category.entity.ts
