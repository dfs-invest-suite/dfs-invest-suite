// RUTA: libs/core/application/coapwhatsapp/src/lib/queries/get-tenant-business-profile.query.ts
import {
  QueryBase,
  IQueryMetadata,
  IQueryHandler,
} from '@dfs-suite/cdskcommandsqueries';
import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/cdskports';
import {
  IWhatsAppAdminPort,
  WHATSAPP_ADMIN_PORT,
  TWhatsAppBusinessProfile,
} from '@dfs-suite/codowhatsapp'; // Puerto de dominio
import {
  ExceptionBase,
  NotFoundException,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, ok, err, isErr } from '@dfs-suite/shresult';
import {
  TenantId,
  WabaId,
  WhatsAppAccountId,
  CorrelationId,
  Maybe,
} from '@dfs-suite/shtypes';

import { BusinessProfileAppDto } from '../dtos/business-profile-app.dto';

// --- Query ---
export interface GetTenantBusinessProfileQueryPayload {
  tenantId: TenantId;
  wabaId: WabaId;
  phoneNumberId: WhatsAppAccountId; // El número específico cuyo perfil se quiere
}

export class GetTenantBusinessProfileQuery extends QueryBase<BusinessProfileAppDto> {
  public readonly payload: GetTenantBusinessProfileQueryPayload;
  constructor(
    payload: GetTenantBusinessProfileQueryPayload,
    metadata?: Partial<IQueryMetadata>
  ) {
    super(metadata);
    this.payload = payload;
  }
}

// --- Query Handler ---
export const GET_TENANT_BUSINESS_PROFILE_QUERY_HANDLER = Symbol(
  'IGetTenantBusinessProfileQueryHandler'
);
export type IGetTenantBusinessProfileQueryHandler = IQueryHandler<
  GetTenantBusinessProfileQuery,
  BusinessProfileAppDto
>;

export class GetTenantBusinessProfileQueryHandlerImpl
  implements IGetTenantBusinessProfileQueryHandler
{
  constructor(
    // @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort,
    // @Inject(WHATSAPP_ADMIN_PORT)
    private readonly waAdminPort: IWhatsAppAdminPort
  ) {}

  async execute(
    query: GetTenantBusinessProfileQuery
  ): Promise<Result<BusinessProfileAppDto, NotFoundException | ExceptionBase>> {
    const { tenantId, wabaId, phoneNumberId } = query.payload;
    const correlationId = query.metadata.correlationId;
    const useCaseName = GetTenantBusinessProfileQueryHandlerImpl.name;

    this.logger.log(
      `Fetching business profile for tenant ${tenantId}, WABA ${wabaId}, PhoneID ${phoneNumberId}`,
      useCaseName,
      correlationId
    );

    try {
      const profileResult = await this.waAdminPort.getBusinessProfile(
        tenantId,
        wabaId,
        phoneNumberId
      );
      if (isErr(profileResult)) {
        // Si el puerto ya devuelve NotFoundException, no es necesario volver a envolverlo.
        return err(profileResult.error);
      }
      if (!profileResult.value) {
        // El puerto devuelve Maybe<TWhatsAppBusinessProfile>
        return err(
          new NotFoundException(
            `Business profile not found for phone ${phoneNumberId}.`,
            undefined,
            { phoneNumberId },
            correlationId
          )
        );
      }

      const metaProfile = profileResult.value;
      // Mapeo directo si TWhatsAppBusinessProfile y BusinessProfileAppDto son compatibles
      const dto: BusinessProfileAppDto = {
        address: metaProfile.address,
        description: metaProfile.description,
        email: metaProfile.email,
        profile_picture_url: metaProfile.profile_picture_url,
        websites: metaProfile.websites,
        vertical: metaProfile.vertical,
        about: metaProfile.about,
      };
      return ok(dto);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error fetching business profile.',
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
// RUTA: libs/core/application/coapwhatsapp/src/lib/queries/get-tenant-business-profile.query.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Implementación de GetTenantBusinessProfileQuery y GetTenantBusinessProfileQueryHandlerImpl.", "justificacion": "Permite obtener el perfil de negocio de un número WA del tenant desde Meta.", "impacto": "Funcionalidad para pwa-supervisor." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
