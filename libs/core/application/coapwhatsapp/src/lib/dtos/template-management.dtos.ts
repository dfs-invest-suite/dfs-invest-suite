// RUTA: libs/core/application/coapwhatsapp/src/lib/dtos/template-management.dtos.ts
import { ETemplateStatusInternal } from '@dfs-suite/codomessagetemplaterecord'; // Estado interno
import {
  EWhatsAppTemplateCategory,
  EWhatsAppTemplateStatus,
  EWhatsAppQualityRating,
  TWhatsAppTemplateComponent, // Tipo del dominio WhatsApp
} from '@dfs-suite/codowhatsapp';
import { MessageTemplateId, Maybe, IsoDateString } from '@dfs-suite/shtypes';

// Para crear/actualizar una plantilla (input a ManageWhatsAppTemplateUseCase)
// Similar a TWhatsAppTemplateCreationRequest pero puede tener alguna variación de app
export interface TemplateCreationAppDto {
  name: string;
  language: string; // ej. 'pt_BR'
  category: EWhatsAppTemplateCategory;
  components: TWhatsAppTemplateComponent[]; // Usar el tipo del dominio codowhatsapp
  exampleJson?: Maybe<string>; // Para las variables
  // Campos que el UC podría añadir o gestionar:
  // hsmIdToUpdate?: Maybe<MessageTemplateId>; // Si es una actualización
}

// Para mostrar detalles de una plantilla (output de GetMessageTemplateDetailsQuery y ManageWhatsAppTemplateUseCase)
export interface TemplateDetailsAppDto {
  id: MessageTemplateId; // HSM ID de Meta
  internalRecordId: string; // ID de nuestro MessageTemplateRecordEntity
  name: string;
  language: string;
  category: EWhatsAppTemplateCategory;
  statusMeta: EWhatsAppTemplateStatus;
  statusInternal: ETemplateStatusInternal; // Nuestro estado
  qualityRatingMeta?: Maybe<EWhatsAppQualityRating>;
  components: TWhatsAppTemplateComponent[];
  exampleJson?: Maybe<string>;
  rejectedReason?: Maybe<string>;
  lastSyncedAt?: Maybe<IsoDateString>;
  createdAt: IsoDateString; // Fecha de creación en nuestro sistema
  updatedAt: IsoDateString; // Última actualización en nuestro sistema
}

// Para listas de plantillas (output de ListMessageTemplatesQuery)
export interface TemplateSummaryAppDto {
  id: MessageTemplateId; // HSM ID
  internalRecordId: string;
  name: string;
  language: string;
  category: EWhatsAppTemplateCategory;
  statusMeta: EWhatsAppTemplateStatus;
  statusInternal: ETemplateStatusInternal;
  qualityRatingMeta?: Maybe<EWhatsAppQualityRating>;
  updatedAt: IsoDateString;
}
// RUTA: libs/core/application/coapwhatsapp/src/lib/dtos/template-management.dtos.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Definición de DTOs para la gestión de plantillas: TemplateCreationAppDto, TemplateDetailsAppDto, TemplateSummaryAppDto.", "justificacion": "Contratos de datos claros para los Casos de Uso y Queries relacionados con plantillas de WhatsApp.", "impacto": "Tipado fuerte y desacoplamiento entre la API y la lógica de aplicación." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "Asegurar que TWhatsAppTemplateComponent sea correctamente importado y usado. El exampleJson podría necesitar un tipado más fuerte si su estructura es conocida."} ] */
