// RUTA: libs/core/domain/codoportalcontent/src/lib/value-objects/seo-metadata.vo.ts
import { ValueObject } from '@dfs-suite/cdskvalueobjects';
import { Maybe, UrlString } from '@dfs-suite/shtypes';
import { Guard } from '@dfs-suite/shutils';

export interface SeoMetadataProps {
  readonly metaTitle?: Maybe<string>; // Máx 60-70 caracteres idealmente
  readonly metaDescription?: Maybe<string>; // Máx 155-160 caracteres
  readonly metaKeywords?: Maybe<string[]>; // Lista de palabras clave
  readonly canonicalUrl?: Maybe<UrlString>;
  readonly ogTitle?: Maybe<string>; // Open Graph Title
  readonly ogDescription?: Maybe<string>; // Open Graph Description
  readonly ogImageUrl?: Maybe<UrlString>; // Open Graph Image
  // readonly twitterCard?: Maybe<string>; // "summary", "summary_large_image"
  // readonly twitterTitle?: Maybe<string>;
  // readonly twitterDescription?: Maybe<string>;
  // readonly twitterImage?: Maybe<UrlString>;
}

export class SeoMetadataVO extends ValueObject<SeoMetadataProps> {
  protected constructor(props: SeoMetadataProps) {
    super(props);
  }

  // Getters...
  get metaTitle(): Maybe<string> {
    return this.props.metaTitle;
  }
  // ...

  protected validate(props: SeoMetadataProps): void {
    if (props.metaTitle && props.metaTitle.length > 100) {
      // Ejemplo de validación simple
      // Considerar lanzar un warning en lugar de un error para SEO, o solo loguear.
      // throw new ArgumentInvalidException('Meta title is too long for optimal SEO.');
    }
    if (props.metaDescription && props.metaDescription.length > 200) {
      // throw new ArgumentInvalidException('Meta description is too long for optimal SEO.');
    }
    // Validaciones para formato de URL si canonicalUrl, ogImageUrl son provistos
  }

  public static create(props: SeoMetadataProps): SeoMetadataVO {
    return new SeoMetadataVO(props);
  }
}
// RUTA: libs/core/domain/codoportalcontent/src/lib/value-objects/seo-metadata.vo.ts
