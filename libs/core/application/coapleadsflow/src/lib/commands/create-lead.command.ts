// RUTA: libs/core/application/coapleadsflow/src/lib/commands/create-lead.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import { ELeadSourceChannel, ELeadStatus } from '@dfs-suite/codoleadsflow'; // Enums del dominio
import {
  TenantId,
  CorrelationId,
  Maybe,
  UserId,
  EmailString,
  PhoneNumberString,
  ObjectLiteral,
} from '@dfs-suite/shtypes';

// Este payload es idéntico al DTO de creación, lo cual es común.
export interface CreateLeadCommandPayload {
  readonly tenantId: TenantId;
  readonly correlationId: CorrelationId; // Pasado explícitamente al UC, pero la metadata del comando lo tendrá
  readonly name?: Maybe<string>;
  readonly email?: Maybe<EmailString>;
  readonly phoneNumber?: Maybe<PhoneNumberString>;
  readonly waId?: Maybe<PhoneNumberString>; // WhatsApp ID
  readonly sourceChannel: ELeadSourceChannel;
  readonly referralSourceText?: Maybe<string>;
  readonly initialStatus?: ELeadStatus;
  readonly initialScore?: number;
  readonly optInWhatsApp?: boolean;
  readonly optInEmail?: boolean;
  readonly customFields?: Maybe<ObjectLiteral>;
  readonly createdByUserId?: Maybe<UserId>; // Quién (o qué sistema) está creando el lead
}

export class CreateLeadCommand extends CommandBase<CreateLeadCommandPayload> {
  constructor(payload: CreateLeadCommandPayload, metadata: ICommandMetadata) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapleadsflow/src/lib/commands/create-lead.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `CreateLeadCommand`.", "justificacion": "Comando para iniciar la creación de un nuevo lead.", "impacto": "Estructura de aplicación." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
