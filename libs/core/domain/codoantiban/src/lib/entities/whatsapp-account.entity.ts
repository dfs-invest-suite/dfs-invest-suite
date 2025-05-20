// RUTA: libs/core/domain/codoantiban/src/lib/entities/whatsapp-account.entity.ts
// TODO: [LIA Legacy - Implementar WhatsAppAccountEntity]
// Propósito: Representa un número de teléfono de WhatsApp de un tenant, con su estado de salud,
// calidad de Meta, límites, y lógica para actualizar estos atributos y determinar su aptitud para envío.
// Relacionado con Casos de Uso: AntiBanDecisionService, AccountHealthManagerService.
import { EWhatsAppQualityRating } from '@dfs-suite/codowhatsapp'; // Asumiendo que se crea en codowhatsapp
import { Maybe } from '@dfs-suite/shtypes';
import { HealthScoreVO } from '../value-objects/health-score.vo';
import { MessagingLimitTierVO } from '../value-objects/messaging-limit-tier.vo';
import { OperationalStatusVO } from '../value-objects/operational-status.vo';

export interface WhatsAppAccountProps {
  // tenantId: TenantId; // Implícito por la DB del tenant
  phoneNumberId: string; // El ID del número de Meta
  displayPhoneNumber: string;
  verifiedName: string;
  qualityRatingMeta: EWhatsAppQualityRating;
  messagingLimitTierMeta: MessagingLimitTierVO;
  operationalStatus: OperationalStatusVO;
  healthScore: HealthScoreVO;
  isOfficiallyVerified: boolean;
  canSendMessage: boolean; // Derivado
  lastQualityUpdateAt?: Maybe<Date>;
  // ... otros campos como currentConversationsInitiated24h, etc.
}
// interface CreateWhatsAppAccountProps { /* ... */ }
// export class WhatsAppAccountEntity extends AggregateRoot<WhatsAppAccountProps> {
//   constructor(props: CreateEntityProps<WhatsAppAccountProps>) { super(props); }
//   public static create(/*...*/): WhatsAppAccountEntity { /*...*/ }
//   public updateQualityRating(newRating: EWhatsAppQualityRating): void { /*...*/ }
//   public updateMessagingLimit(newTier: MessagingLimitTierVO): void { /*...*/ }
//   public setOperationalStatus(newStatus: OperationalStatusVO, reason: string): void { /*...*/ }
//   public calculateHealthScore(/* ... */): void { /*...*/ }
//   public assessCanSendMessage(): void { /*...*/ }
//   public validate(): void { /*...*/ }
// }
