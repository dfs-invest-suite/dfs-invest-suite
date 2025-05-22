// RUTA: libs/core/domain/codoeducacontent/src/lib/value-objects/content-type.vo.ts
import { ValueObject, IDomainPrimitive } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';

export enum EContentType {
  ARTICLE = 'ARTICLE', // Contenido de texto, Markdown o HTML enriquecido
  VIDEO_EMBED = 'VIDEO_EMBED', // Link a un video de YouTube/Vimeo
  PDF_DOCUMENT = 'PDF_DOCUMENT', // Link a un PDF o PDF subido
  EXTERNAL_LINK = 'EXTERNAL_LINK', // Link a otro recurso externo
  SLIDESHOW = 'SLIDESHOW', // Futuro: Presentación de diapositivas
  QUIZ = 'QUIZ', // Futuro: Cuestionario interactivo
}

export class ContentTypeVO extends ValueObject<EContentType> {
  protected constructor(props: IDomainPrimitive<EContentType>) {
    super(props);
  }
  get value(): EContentType {
    return this.props.value;
  }

  protected validate(props: IDomainPrimitive<EContentType>): void {
    if (!Object.values(EContentType).includes(props.value)) {
      throw new ArgumentInvalidException(
        `Invalid content type: "${props.value}".`
      );
    }
  }
  public static create(type: EContentType): ContentTypeVO {
    return new ContentTypeVO({ value: type });
  }
}
// RUTA: libs/core/domain/codoeducacontent/src/lib/value-objects/content-type.vo.ts
