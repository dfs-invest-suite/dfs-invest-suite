// RUTA: libs/core/domain/codomessagetemplaterecord/src/lib/entities/message-template-record.entity.ts
// TODO: [LIA Legacy - Implementar MessageTemplateRecordEntity]
// Propósito: Representa una plantilla de mensaje de WhatsApp de un tenant, con sus estados y calidad.
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import { AggregateId, TenantId, Maybe } from '@dfs-suite/shtypes';
import {
  EWhatsAppTemplateCategory,
  EWhatsAppQualityRating,
} from '@dfs-suite/codowhatsapp'; // Asumiendo que están en codowhatsapp
import {
  TemplateComponentVO,
  TemplateStatusMetaVO,
  TemplateStatusInternalVO,
  TemplateQualityMetaVO,
} from '../value-objects';

export interface MessageTemplateRecordProps {
  // tenantId: TenantId; // Implícito
  hsmId: string; // ID de Meta
  name: string;
  language: string;
  category: EWhatsAppTemplateCategory;
  statusMeta: TemplateStatusMetaVO;
  statusInternal: TemplateStatusInternalVO;
  qualityMeta: TemplateQualityMetaVO;
  componentsJson: string; // El JSON de los componentes de la plantilla
  exampleJson?: Maybe<string>; // El JSON de los ejemplos
  // rejectedReason?: Maybe<string>;
}
// export class MessageTemplateRecordEntity extends AggregateRoot<MessageTemplateRecordProps> { /* ... */ }

// (Crear VOs en value-objects/: template-component.vo.ts, template-status-meta.vo.ts, etc.)
// (Crear ports/message-template-record.repository.port.ts)
// (Crear events y errors)
