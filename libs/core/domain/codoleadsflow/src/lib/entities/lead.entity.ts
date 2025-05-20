// RUTA: libs/core/domain/codoleadsflow/src/lib/entities/lead.entity.ts
// TODO: [LIA Legacy - Implementar LeadEntity]
// Propósito: Representa un cliente potencial con sus datos, estado, score, e interacciones.
// Relacionado con Casos de Uso: Todo el ciclo de vida del lead.
import { AggregateRoot, CreateEntityProps } from '@dfs-suite/cdskentities';
import {
  AggregateId,
  TenantId,
  Maybe,
  IsoDateString,
  UserId,
} from '@dfs-suite/shtypes';
import {
  LeadStatusVO,
  LeadScoreVO,
  LeadSourceChannelVO,
} from '../value-objects'; // Crear estos VOs
// import { LeadInteractionEntity } from './lead-interaction.entity'; // Si las interacciones son parte del agregado

export interface LeadProps {
  // tenantId: TenantId; // Implícito
  waId?: Maybe<string>;
  phoneNumber?: Maybe<string>;
  email?: Maybe<string>;
  name?: Maybe<string>;
  status: LeadStatusVO;
  score: LeadScoreVO;
  sourceChannel?: Maybe<LeadSourceChannelVO>;
  referralSource?: Maybe<string>;
  assignedToUserId?: Maybe<UserId>;
  lastInteractionAt?: Maybe<IsoDateString>;
  // interactions: LeadInteractionEntity[]; // O gestionado por un repositorio separado
  customFields?: Maybe<Record<string, any>>; // Para flexibilidad
  optInWhatsApp?: Maybe<boolean>;
  tags?: Maybe<string[]>; // Futuro
}
// export class LeadEntity extends AggregateRoot<LeadProps> { /* ... */ }
