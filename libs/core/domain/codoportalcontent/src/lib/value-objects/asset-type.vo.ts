// RUTA: libs/core/domain/codoportalcontent/src/lib/value-objects/asset-type.vo.ts
import { ValueObject, IDomainPrimitive } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';

export enum EAssetType {
  COMPANY_LOGO = 'COMPANY_LOGO',
  PROPERTY_IMAGE_GALLERY = 'PROPERTY_IMAGE_GALLERY',
  PROPERTY_IMAGE_BANNER = 'PROPERTY_IMAGE_BANNER',
  PROPERTY_DOCUMENT_PDF = 'PROPERTY_DOCUMENT_PDF',
  PORTAL_GENERAL_IMAGE = 'PORTAL_GENERAL_IMAGE', // Para banners del sitio, etc.
  // Otros tipos según necesidad
}

export class AssetTypeVO extends ValueObject<EAssetType> {
  protected constructor(props: IDomainPrimitive<EAssetType>) {
    super(props);
  }
  get value(): EAssetType {
    return this.props.value;
  }

  protected validate(props: IDomainPrimitive<EAssetType>): void {
    if (!Object.values(EAssetType).includes(props.value)) {
      throw new ArgumentInvalidException(
        `Invalid asset type: "${props.value}".`
      );
    }
  }
  public static create(type: EAssetType): AssetTypeVO {
    return new AssetTypeVO({ value: type });
  }
}
// RUTA: libs/core/domain/codoportalcontent/src/lib/value-objects/asset-type.vo.ts
