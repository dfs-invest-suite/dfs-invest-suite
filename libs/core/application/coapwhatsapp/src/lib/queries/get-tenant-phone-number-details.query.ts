// RUTA: libs/core/application/coapwhatsapp/src/lib/queries/get-tenant-phone-number-details.query.ts
import {
  QueryBase,
  IQueryMetadata,
  IQueryHandler,
} from '@dfs-suite/cdskcommandsqueries';
import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/cdskports';
import {
  IWhatsAppAccountRepository,
  WHATSAPP_ACCOUNT_REPOSITORY_PORT,
} from '@dfs-suite/codoantiban';
import {
  ExceptionBase,
  NotFoundException,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, ok, err, isErr } from '@dfs-suite/shresult';
import { TenantId, WhatsAppAccountId, CorrelationId } from '@dfs-suite/shtypes';

import { PhoneNumberDetailsAppDto } from '../dtos/phone-number-details-app.dto';
// import { IWhatsAppAdminPort, WHATSAPP_ADMIN_PORT } from '@dfs-suite/codowhatsapp'; // Para enriquecer con datos frescos de Meta

// --- Query ---
export interface GetTenantPhoneNumberDetailsQueryPayload {
  tenantId: TenantId;
  phoneNumberId: WhatsAppAccountId; // El ID de Meta del número
}

export class GetTenantPhoneNumberDetailsQuery extends QueryBase<PhoneNumberDetailsAppDto> {
  public readonly payload: GetTenantPhoneNumberDetailsQueryPayload;
  constructor(
    payload: GetTenantPhoneNumberDetailsQueryPayload,
    metadata?: Partial<IQueryMetadata>
  ) {
    super(metadata);
    this.payload = payload;
  }
}

// --- Query Handler ---
export const GET_TENANT_PHONE_NUMBER_DETAILS_QUERY_HANDLER = Symbol(
  'IGetTenantPhoneNumberDetailsQueryHandler'
);
export type IGetTenantPhoneNumberDetailsQueryHandler = IQueryHandler<
  GetTenantPhoneNumberDetailsQuery,
  PhoneNumberDetailsAppDto
>;

export class GetTenantPhoneNumberDetailsQueryHandlerImpl
  implements IGetTenantPhoneNumberDetailsQueryHandler
{
  constructor(
    // @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort,
    // @Inject(WHATSAPP_ACCOUNT_REPOSITORY_PORT)
    private readonly waAccountRepo: IWhatsAppAccountRepository // @Inject(WHATSAPP_ADMIN_PORT) // private readonly waAdminPort: IWhatsAppAdminPort, // Para obtener datos en tiempo real de Meta y enriquecer/validar
  ) {}

  async execute(
    query: GetTenantPhoneNumberDetailsQuery
  ): Promise<
    Result<PhoneNumberDetailsAppDto, NotFoundException | ExceptionBase>
  > {
    const { tenantId, phoneNumberId } = query.payload;
    const correlationId = query.metadata.correlationId;
    const useCaseName = GetTenantPhoneNumberDetailsQueryHandlerImpl.name;

    this.logger.log(
      `Fetching details for phone number ${phoneNumberId}, tenant ${tenantId}`,
      useCaseName,
      correlationId
    );

    try {
      // El repo opera en contexto del tenantId
      const accountResult = await this.waAccountRepo.findOneById(phoneNumberId);
      if (isErr(accountResult)) return err(accountResult.error);
      if (!accountResult.value) {
        return err(
          new NotFoundException(
            `WhatsApp account ${phoneNumberId} not found for tenant ${tenantId}.`,
            undefined,
            { phoneNumberId },
            correlationId
          )
        );
      }

      const entity = accountResult.value;
      // TODO: Opcionalmente, llamar a this.waAdminPort.getPhoneNumberDetails(...) para obtener
      // la información más reciente de Meta y compararla/actualizarla antes de devolver el DTO.
      // Esto podría ser parte de un `SyncSinglePhoneNumberUseCase` que se llame antes o como parte de esto.

      const dto: PhoneNumberDetailsAppDto = {
        id: entity.id,
        wabaId: entity.wabaId,
        displayPhoneNumber: entity.displayPhoneNumber,
        verifiedName: entity.props.verifiedName,
        qualityRatingMeta: entity.qualityRatingMeta,
        messagingLimitTierMeta: entity.messagingLimitTierMeta,
        nameStatusMeta: entity.props.nameStatusMeta,
        operationalStatus: entity.operationalStatus.value,
        healthScore: entity.healthScore.value,
        isOfficiallyVerifiedByMeta: entity.props.isOfficiallyVerifiedByMeta,
        canCurrentlySendMessage: entity.canCurrentlySendMessage,
        currentMessageQuota24h: entity.props.currentMessageQuota24h,
        messagesSentInWindow24h: entity.props.messagesSentInWindow24h,
        quotaResetsAt: entity.props.quotaResetsAt,
        lastQualityUpdateFromMetaAt: entity.props.lastQualityUpdateFromMetaAt,
        lastStatusUpdateFromMetaAt: entity.props.lastStatusUpdateFromMetaAt,
        lastUsedForSendingAt: entity.props.lastUsedForSendingAt,
        customNotes: entity.props.customNotes,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      };
      return ok(dto);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error fetching phone number details.',
              error as Error,
              undefined,
              correlationId
            );
      this.logger.error(
        `Error in ${useCaseName}: ${errBase.message}`,
        errBase.stack,
        useCaseName,
        correlationId
      );
      return err(errBase);
    }
  }
}
// RUTA: libs/core/application/coapwhatsapp/src/lib/queries/get-tenant-phone-number-details.query.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Implementación de GetTenantPhoneNumberDetailsQuery y GetTenantPhoneNumberDetailsQueryHandlerImpl.", "justificacion": "Permite obtener los detalles de una cuenta de WhatsApp específica de un tenant.", "impacto": "Funcionalidad para pwa-supervisor." },
{ "mejora": "Mapeo de WhatsAppAccountEntity a PhoneNumberDetailsAppDto.", "justificacion": "Transformación de datos.", "impacto": "Correcta exposición."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "Considerar la lógica de enriquecer los datos del DTO con una llamada en tiempo real a la API de Meta a través de IWhatsAppAdminPort para asegurar la información más actualizada, aunque esto podría impactar la latencia."} ] */
