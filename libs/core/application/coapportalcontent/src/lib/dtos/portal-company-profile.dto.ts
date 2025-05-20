// RUTA: libs/core/application/coapportalcontent/src/lib/dtos/portal-company-profile.dto.ts
// TODO: [LIA Legacy - Implementar PortalCompanyProfileDto]
// Propósito: DTO para transferir datos del perfil de la empresa.
import { Maybe, Url, IsoDateString } from '@dfs-suite/shtypes';

export interface PortalCompanyProfileDto {
  readonly publicName: string;
  readonly aboutUs: Maybe<string>;
  readonly publicContactEmail?: Maybe<string>;
  readonly publicContactPhone?: Maybe<string>;
  readonly websiteUrl?: Maybe<Url>;
  readonly socialMediaLinks?: Maybe<Record<string, Url>>;
  readonly logoAssetUrl?: Maybe<Url>; // URL del logo ya almacenado
  readonly updatedAt?: IsoDateString;
}
