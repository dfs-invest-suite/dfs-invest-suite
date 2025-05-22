// RUTA: libs/core/application/coapwhatsapp/src/lib/dtos/business-profile-app.dto.ts
import { Maybe, UrlString, EmailString } from '@dfs-suite/shtypes';

// Este DTO es muy similar o idéntico a TWhatsAppBusinessProfile del dominio,
// pero se define aquí para la capa de aplicación.
export interface BusinessProfileAppDto {
  address?: Maybe<string>;
  description?: Maybe<string>;
  email?: Maybe<EmailString>;
  profile_picture_url?: Maybe<UrlString>;
  websites?: Maybe<UrlString[]>;
  vertical?: Maybe<string>;
  about?: Maybe<string>;
}

// Para la actualización, podríamos usar Partial
export type UpdateBusinessProfileAppDto = Partial<BusinessProfileAppDto>;
// RUTA: libs/core/application/coapwhatsapp/src/lib/dtos/business-profile-app.dto.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Definición de BusinessProfileAppDto y UpdateBusinessProfileAppDto.", "justificacion": "DTOs para leer y actualizar el perfil de negocio de WhatsApp de un tenant.", "impacto": "Gestión de perfil en pwa-supervisor." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
