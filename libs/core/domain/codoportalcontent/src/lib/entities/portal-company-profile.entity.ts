// RUTA: libs/core/domain/codoportalcontent/src/lib/entities/portal-company-profile.entity.ts
// TODO: [LIA Legacy - Implementar PortalCompanyProfileEntity]
// Propósito: Datos del perfil público de la empresa del tenant (nombre, sobre nosotros, contacto, logo, redes).
// import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
// import { TenantId, Maybe, Url } from '@dfs-suite/shtypes'; // Url podría ser un UrlVO

export interface PortalCompanyProfileProps {
  // tenantId: TenantId; // Implícito
  publicName: string;
  aboutUs: Maybe<string>;
  publicContactEmail?: Maybe<string>; // Usar EmailVO
  publicContactPhone?: Maybe<string>; // Usar PhoneNumberVO
  websiteUrl?: Maybe<Url>; // Usar UrlVO
  socialMediaLinks?: Maybe<Record<string, Url>>; // ej. { facebook: Url, instagram: Url }
  logoAssetId?: Maybe<string>; // ID de un PortalAssetEntity
  // address?: Maybe<PropertyAddressVO>;
}
// export class PortalCompanyProfileEntity extends AggregateRoot<PortalCompanyProfileProps> { /* ... */ }
