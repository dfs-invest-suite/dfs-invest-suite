// RUTA: libs/core/domain/codoportalcontent/src/lib/entities/portal-company-profile.entity.ts
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities'; // Asumiendo que se usará
import { TenantId, Maybe, UrlString, AssetId } from '@dfs-suite/shtypes'; // <<< IMPORTADO UrlString y AssetId
// import { PropertyAddressVO } from '../value-objects/property-address.vo'; // Si se usa
// import { UrlVO } from '@dfs-suite/cdskvalueobjects'; // Si se prefiere VO para URL

export interface PortalCompanyProfileProps {
  // tenantId: TenantId; // Implícito
  publicName: string;
  aboutUs: Maybe<string>;
  publicContactEmail?: Maybe<string>; // Usar EmailVO del shared-kernel
  publicContactPhone?: Maybe<string>; // Usar PhoneNumberVO del shared-kernel
  websiteUrl?: Maybe<UrlString>; // Puede ser UrlVO
  socialMediaLinks?: Maybe<Record<string, UrlString>>; // Puede ser Record<string, UrlVO>
  logoAssetId?: Maybe<AssetId>; // ID de un PortalAssetEntity
  // address?: Maybe<PropertyAddressVO>;
}

// Placeholder de la entidad
export class PortalCompanyProfileEntity /* extends AggregateRoot<PortalCompanyProfileProps> */ {
  public props: PortalCompanyProfileProps;
  constructor(props: PortalCompanyProfileProps) {
    this.props = props;
  }
  // TODO: Implementar lógica de entidad
}
// RUTA: libs/core/domain/codoportalcontent/src/lib/entities/portal-company-profile.entity.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Añadidas importaciones para `Maybe`, `UrlString` y `AssetId` desde `@dfs-suite/shtypes`.", "justificacion": "Resuelve los errores `no-undef` para estos tipos.", "impacto": "El archivo es sintácticamente correcto." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "Esta entidad debe extender `AggregateRoot` y tener un factory `create`." },
  { "nota": "Considerar usar `EmailVO`, `PhoneNumberVO`, `UrlVO` (de `cdskvalueobjects`) en lugar de strings brandeados directamente para `publicContactEmail`, `publicContactPhone`, `websiteUrl` y `socialMediaLinks` para mayor encapsulación y validación a nivel de dominio." },
  { "nota": "El tipo `Url` (que causaba error) fue reemplazado por `UrlString` (de `shtypes`) o se podría usar `UrlVO`." }
]
*/
