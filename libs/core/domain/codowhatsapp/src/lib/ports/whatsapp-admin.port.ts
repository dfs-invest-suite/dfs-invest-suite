// RUTA: libs/core/domain/codowhatsapp/src/lib/ports/whatsapp-admin.port.ts
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import {
  TenantId,
  WabaId,
  WhatsAppAccountId,
  MessageTemplateId,
  Maybe,
  UrlString,
} from '@dfs-suite/shtypes';

import {
  TWhatsAppTemplateCreationRequest,
  TWhatsAppTemplateResponse,
  TWhatsAppPhoneNumber,
  TWhatsAppAssetUploadResponse,
  TWhatsAppBusinessProfile,
  TSubscribedAppFieldsResponse,
  // TRegisteredWebhook, // Eliminado si no se usa o se define diferente
} from '../types'; // Asegura que estos tipos estén exportados desde ../types/index.ts o los archivos individuales

export const WHATSAPP_ADMIN_PORT = Symbol('IWhatsAppAdminPort');

export interface IListTemplatesFilters {
  name?: string;
  status?: string;
  category?: string;
  language?: string;
  limit?: number;
  after?: string;
  before?: string;
}

export interface IWhatsAppAdminPort {
  getPhoneNumberDetails(
    tenantId: TenantId,
    wabaId: WabaId,
    phoneNumberMetaId: WhatsAppAccountId,
    fields?: Array<keyof TWhatsAppPhoneNumber>
  ): Promise<Result<TWhatsAppPhoneNumber, ExceptionBase>>;

  listPhoneNumbers(
    tenantId: TenantId,
    wabaId: WabaId
  ): Promise<Result<TWhatsAppPhoneNumber[], ExceptionBase>>;

  listMessageTemplates(
    tenantId: TenantId,
    wabaId: WabaId,
    filters?: IListTemplatesFilters
  ): Promise<Result<TWhatsAppTemplateResponse[], ExceptionBase>>;

  getMessageTemplateById(
    tenantId: TenantId,
    wabaId: WabaId,
    hsmId: MessageTemplateId
  ): Promise<Result<Maybe<TWhatsAppTemplateResponse>, ExceptionBase>>;

  getMessageTemplateByNameAndLanguage(
    tenantId: TenantId,
    wabaId: WabaId,
    templateName: string,
    languageCode: string
  ): Promise<Result<Maybe<TWhatsAppTemplateResponse>, ExceptionBase>>;

  createMessageTemplate(
    tenantId: TenantId,
    wabaId: WabaId,
    templateData: TWhatsAppTemplateCreationRequest
  ): Promise<Result<TWhatsAppTemplateResponse, ExceptionBase>>;

  deleteMessageTemplateByName(
    tenantId: TenantId,
    wabaId: WabaId,
    templateName: string,
    languageToDelete?: Maybe<string>
  ): Promise<Result<{ success: boolean }, ExceptionBase>>;

  uploadSessionlessMedia(
    tenantId: TenantId,
    wabaId: WabaId,
    fileBuffer: Buffer,
    mimeType: string,
    fileName: string
  ): Promise<Result<TWhatsAppAssetUploadResponse, ExceptionBase>>;

  subscribeAppToWabaEvents(
    tenantId: TenantId,
    wabaId: WabaId,
    platformAppId: string,
    fieldsToSubscribe?: string[]
  ): Promise<Result<{ success: boolean }, ExceptionBase>>;

  getWabaSubscribedAppFields(
    tenantId: TenantId,
    wabaId: WabaId,
    platformAppId: string
  ): Promise<Result<TSubscribedAppFieldsResponse, ExceptionBase>>;

  getBusinessProfile(
    tenantId: TenantId,
    wabaId: WabaId,
    phoneNumberMetaId: WhatsAppAccountId,
    fields?: Array<keyof TWhatsAppBusinessProfile>
  ): Promise<Result<Maybe<TWhatsAppBusinessProfile>, ExceptionBase>>;

  updateBusinessProfile(
    tenantId: TenantId,
    wabaId: WabaId,
    phoneNumberMetaId: WhatsAppAccountId,
    profileData: Partial<TWhatsAppBusinessProfile>
  ): Promise<Result<{ success: boolean }, ExceptionBase>>;

  createQrCodeMessageLink(
    tenantId: TenantId,
    wabaId: WabaId,
    phoneNumberMetaId: WhatsAppAccountId,
    prefilledMessage: string,
    generateQrImage?: boolean
  ): Promise<
    Result<{ qr_image_url?: UrlString; code_url: UrlString }, ExceptionBase>
  >;

  // listQrCodeMessageLinks(...): Promise<Result<any[], ExceptionBase>>; // Definir tipo de respuesta
  // deleteQrCodeMessageLink(...): Promise<Result<boolean, ExceptionBase>>;
}
// RUTA: libs/core/domain/codowhatsapp/src/lib/ports/whatsapp-admin.port.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Asegurada la importación de todos los tipos necesarios desde @dfs-suite/shtypes y ../types.", "justificacion": "Resuelve potenciales errores no-undef y asegura el uso de los Branded Types correctos.", "impacto": "Mayor corrección de tipos." },
{ "mejora": "Eliminado el tipo no utilizado TRegisteredWebhook (o comentado si se prevé su uso futuro con una definición clara).", "justificacion": "Limpia los warnings de no-unused-vars.", "impacto": "Código más limpio." },
{ "mejora": "El tipo para el payload de listQrCodeMessageLinks se dejó como any[] temporalmente.", "justificacion": "Se necesita definir el tipo exacto de respuesta de Meta para esta funcionalidad.", "impacto": "Placeholder para futura implementación." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{ "nota": "Revisar la documentación de Meta para definir el tipo de respuesta de listQrCodeMessageLinks y actualizar el any[]." },
{ "nota": "La paginación para listMessageTemplates podría necesitar que la interfaz devuelva un objeto paginado en lugar de solo TWhatsAppTemplateResponse[]." }
]
*/
