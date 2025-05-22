// RUTA: libs/core/application/coapleadsflow/src/lib/commands/update-lead-details.command.ts
import { CommandBase, ICommandMetadata } from '@dfs-suite/cdskcommandsqueries';
import {
  LeadId,
  TenantId,
  UserId,
  Maybe,
  EmailString,
  PhoneNumberString,
  ObjectLiteral,
} from '@dfs-suite/shtypes';

import { LeadUpdateDto } from '../dtos/lead-update.dto'; // Usaremos un DTO específico para la actualización

export interface UpdateLeadDetailsCommandPayload {
  readonly tenantId: TenantId;
  readonly leadId: LeadId;
  readonly updates: LeadUpdateDto; // Los campos a actualizar
  readonly updatedByUserId: UserId;
}

export class UpdateLeadDetailsCommand extends CommandBase<UpdateLeadDetailsCommandPayload> {
  constructor(
    payload: UpdateLeadDetailsCommandPayload,
    metadata: ICommandMetadata
  ) {
    super(payload, metadata);
  }
}
// RUTA: libs/core/application/coapleadsflow/src/lib/commands/update-lead-details.command.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `UpdateLeadDetailsCommand`.", "justificacion": "Comando para actualizar los detalles de un lead existente.", "impacto": "Permite la modificación de datos del lead." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "El `LeadUpdateDto` definirá qué campos son actualizables."} ] */
