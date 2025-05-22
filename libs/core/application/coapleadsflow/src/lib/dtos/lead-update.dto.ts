// RUTA: libs/core/application/coapleadsflow/src/lib/dtos/lead-update.dto.ts
import { ELeadStatus } from '@dfs-suite/codoleadsflow';
import {
  Maybe,
  EmailString,
  PhoneNumberString,
  ObjectLiteral,
  UserId,
} from '@dfs-suite/shtypes';

// DTO para actualizar un lead (solo campos actualizables por el usuario/sistema)
export interface LeadUpdateAppDto {
  name?: Maybe<string>;
  email?: Maybe<EmailString>;
  phoneNumber?: Maybe<PhoneNumberString>;
  waId?: Maybe<PhoneNumberString>; // Se actualiza con cuidado
  // status y score se actualizan con comandos específicos
  referralSourceText?: Maybe<string>;
  assignedToUserId?: Maybe<UserId | null>; // null para desasignar
  optInWhatsApp?: Maybe<boolean>;
  optInEmail?: Maybe<boolean>;
  tags?: Maybe<string[]>;
  customFields?: Maybe<ObjectLiteral>; // Para actualizar campos custom
}
// RUTA: libs/core/application/coapleadsflow/src/lib/dtos/lead-update.dto.ts
/* SECCIÓN DE MEJORAS REALIZADAS: [ { "mejora": "DTO LeadUpdateAppDto.", "justificacion": "Input para actualizar leads.", "impacto": "Consistencia." } ] /
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
