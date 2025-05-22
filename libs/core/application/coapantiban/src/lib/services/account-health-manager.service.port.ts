// RUTA: libs/core/application/coapantiban/src/lib/services/account-health-manager.service.port.ts
import {
  TWebhookAccountUpdate,
  TWebhookPhoneNumberQualityUpdate,
  TWhatsAppPhoneNumber,
} from '@dfs-suite/codowhatsapp';
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import {
  CorrelationId,
  IsoDateString,
  TenantId,
  WabaId,
  WhatsAppAccountId,
} from '@dfs-suite/shtypes';

import { WhatsAppAccountHealthDto } from '../dtos/whatsapp-account-health.dto';

// Placeholder para el tipo que vendría de codowhatsapp
interface TWebhookValuePhoneNumberNamePlaceholder {
  event: 'phone_number_name_update';
  display_phone_number: string; // O PhoneNumberString
  name_status: string; // O EWhatsAppPhoneNumberNameStatus
  // ... otros campos que pueda tener
}

export const ACCOUNT_HEALTH_MANAGER_SERVICE_APP_PORT = Symbol(
  'IAccountHealthManagerServicePortAppLayer'
);

export interface IAccountHealthManagerServicePortAppLayer {
  onboardOrUpdatePhoneNumberFromMeta(
    tenantId: TenantId,
    wabaId: WabaId,
    metaPhoneNumber: TWhatsAppPhoneNumber,
    source: 'API_SYNC' | 'INITIAL_CONFIG',
    correlationId: CorrelationId
  ): Promise<Result<WhatsAppAccountHealthDto, ExceptionBase>>;

  processPhoneNumberQualityUpdate(
    tenantId: TenantId,
    wabaId: WabaId,
    displayPhoneNumber: string,
    qualityUpdatePayload: TWebhookPhoneNumberQualityUpdate,
    correlationId: CorrelationId
  ): Promise<Result<void, ExceptionBase>>;

  processPhoneNumberNameUpdate(
    tenantId: TenantId,
    wabaId: WabaId,
    displayPhoneNumber: string,
    nameUpdatePayload: TWebhookValuePhoneNumberNamePlaceholder, // <<< USANDO PLACEHOLDER TIPADO
    correlationId: CorrelationId
  ): Promise<Result<void, ExceptionBase>>;

  processAccountUpdateWebhook(
    tenantId: TenantId,
    wabaId: WabaId,
    accountUpdatePayload: TWebhookAccountUpdate,
    correlationId: CorrelationId
  ): Promise<Result<void, ExceptionBase>>;

  processMessageStatusEvent(
    tenantId: TenantId,
    wabaId: WabaId,
    phoneNumberId: WhatsAppAccountId,
    statusEvent: {
      isSuccess: boolean;
      isTemplate: boolean;
      timestamp: IsoDateString; // <<< CORREGIDO
      errorCode?: string;
    },
    correlationId: CorrelationId
  ): Promise<Result<void, ExceptionBase>>;
}
// RUTA: libs/core/application/coapantiban/src/lib/services/account-health-manager.service.port.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Añadidas importaciones para IsoDateString y Maybe desde @dfs-suite/shtypes.", "justificacion": "Resuelve el error no-undef para IsoDateString y provee Maybe para el placeholder.", "impacto": "Correctitud de tipos." },
{ "mejora": "Reemplazado any por TWebhookValuePhoneNumberNamePlaceholder en processPhoneNumberNameUpdate.", "justificacion": "Proporciona un tipado placeholder más específico, eliminando el warning de no-explicit-any y documentando la estructura esperada.", "impacto": "Código más claro y preparación para el tipo real."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "Reemplazar TWebhookValuePhoneNumberNamePlaceholder con el tipo real TWebhookValuePhoneNumberName una vez que esté completamente definido en @dfs-suite/codowhatsapp."} ] */

/* SECCIÓN DE MEJORAS REALIZADAS
[
  {
    mejora: 'Definición de IAccountHealthManagerServicePortAppLayer.',
    justificacion:
      'Establece el contrato para el servicio de aplicación principal de Anti-Ban, crucial para la orquestación de la salud de las cuentas.',
    impacto: 'Interfaz clara para la lógica de gestión de salud.',
  },
] /
  / NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "El tipo any en processPhoneNumberNameUpdate debe ser reemplazado por TWebhookValuePhoneNumberName una vez que ese tipo esté correctamente definido e importado de codowhatsapp."} ] */
