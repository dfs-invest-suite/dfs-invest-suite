// RUTA: libs/core/domain/codoleadsflow/src/lib/entities/lead-interaction.entity.ts
// TODO: [LIA Legacy - Implementar LeadInteractionEntity]
// Propósito: Registra cada punto de contacto con el lead.
// Relacionado con Casos de Uso: TrackInteraction, QualifyLead.
import { Entity, CreateEntityProps } from '@dfs-suite/cdskentities'; // Puede ser Entity si no emite eventos propios
import { AggregateId, IsoDateString } from '@dfs-suite/shtypes';
import { InteractionChannelVO } from '../value-objects'; // Crear este VO

export interface LeadInteractionProps {
  leadId: AggregateId; // O LeadId brandeado
  channel: InteractionChannelVO;
  direction: 'INBOUND' | 'OUTBOUND';
  timestamp: IsoDateString;
  contentSummary: string;
  waMessageId?: Maybe<string>; // Si es de WhatsApp
  // sentiment?: Maybe<string>; // Si se analiza
  // intent?: Maybe<string[]>;
  // associatedCampaignId?: Maybe<AggregateId>;
}
// export class LeadInteractionEntity extends Entity<LeadInteractionProps> { /* ... */ }
