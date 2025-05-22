// RUTA: libs/core/application/coapwhatsapp/src/lib/queries/list-tenant-phone-numbers.query.ts
import {
  IQueryHandler,
  IQueryMetadata /* <<< ASEGURAR ESTE IMPORT */,
  OrderBy,
  PaginatedQueryBase,
} from '@dfs-suite/cdskcommandsqueries'; // <<< ICommandMetadata NO es necesario para IQueryMetadata
import { ILoggerPort } from '@dfs-suite/cdskports';
import { IWhatsAppAccountRepository } from '@dfs-suite/codoantiban';
import {
  ExceptionBase,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, err, isErr, ok } from '@dfs-suite/shresult';
import {
  IPaginated,
  IPaginatedQueryParams,
  TenantId,
} from '@dfs-suite/shtypes';

// ... resto de los imports
import { PhoneNumberDetailsAppDto } from '../dtos/phone-number-details-app.dto';

// --- Query ---
export interface ListTenantPhoneNumbersQueryPayload {
  tenantId: TenantId;
}
export type PhoneNumberSortableFields =
  | 'displayPhoneNumber'
  | 'verifiedName'
  | 'qualityRatingMeta'
  | 'healthScore'
  | 'updatedAt';
export class ListTenantPhoneNumbersQuery extends PaginatedQueryBase<
  PhoneNumberDetailsAppDto,
  PhoneNumberSortableFields
> {
  public readonly payload: ListTenantPhoneNumbersQueryPayload;
  constructor(
    payload: ListTenantPhoneNumbersQueryPayload,
    pagination?: Partial<
      IPaginatedQueryParams & { orderBy?: OrderBy<PhoneNumberSortableFields> }
    >,
    metadata?: Partial<IQueryMetadata> // <<< CORREGIDO a IQueryMetadata
  ) {
    super(pagination, metadata);
    this.payload = payload;
  }
}

// --- Query Handler ---
// ... (Handler como estaba antes)
export const LIST_TENANT_PHONE_NUMBERS_QUERY_HANDLER = Symbol(
  'IListTenantPhoneNumbersQueryHandler'
);
export type IListTenantPhoneNumbersQueryHandler = IQueryHandler<
  ListTenantPhoneNumbersQuery,
  IPaginated<PhoneNumberDetailsAppDto>
>;

export class ListTenantPhoneNumbersQueryHandlerImpl
  implements IListTenantPhoneNumbersQueryHandler
{
  constructor(
    private readonly logger: ILoggerPort,
    private readonly waAccountRepo: IWhatsAppAccountRepository
  ) {}
  async execute(
    query: ListTenantPhoneNumbersQuery
  ): Promise<Result<IPaginated<PhoneNumberDetailsAppDto>, ExceptionBase>> {
    const { tenantId } = query.payload;
    const correlationId = query.metadata.correlationId;
    const useCaseName = ListTenantPhoneNumbersQueryHandlerImpl.name;

    this.logger.log(
      `Listing WhatsApp phone numbers for tenant ${String(tenantId)}`,
      useCaseName,
      correlationId
    );
    try {
      const paginatedEntitiesResult = await this.waAccountRepo.findAllPaginated(
        {
          page: query.page,
          limit: query.limit,
          offset: query.offset,
          orderBy: query.orderBy,
        },
        {}
      );
      if (isErr(paginatedEntitiesResult))
        return err(paginatedEntitiesResult.error);
      const paginatedEntities = paginatedEntitiesResult.value;
      const dtos: PhoneNumberDetailsAppDto[] = paginatedEntities.data.map(
        (entity) => ({
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
        })
      );
      const paginatedDto: IPaginated<PhoneNumberDetailsAppDto> = {
        data: dtos,
        count: paginatedEntities.count,
        limit: paginatedEntities.limit,
        page: paginatedEntities.page,
        totalPages: paginatedEntities.totalPages,
      };
      return ok(paginatedDto);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error listing tenant phone numbers.',
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
// RUTA: libs/core/application/coapwhatsapp/src/lib/queries/list-tenant-phone-numbers.query.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Implementación de ListTenantPhoneNumbersQuery y ListTenantPhoneNumbersQueryHandlerImpl.", "justificacion": "Permite listar las cuentas de WhatsApp registradas para un tenant, con su estado de salud y metadatos.", "impacto": "Funcionalidad para pwa-supervisor." },
{ "mejora": "Mapeo de WhatsAppAccountEntity a PhoneNumberDetailsAppDto.", "justificacion": "Transformación de datos para la capa de presentación.", "impacto": "Correcta exposición de datos."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "El IWhatsAppAccountRepositoryPort necesitará un método findAllPaginated que acepte parámetros de paginación y filtros, y que opere dentro del contexto del tenant."} ] */
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Añadidas importaciones para OrderBy, ICommandMetadata y CorrelationId.", "justificacion": "Resuelve los errores no-undef.", "impacto": "Correctitud de tipos." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Corregido el tipo de metadata en el constructor de ListTenantPhoneNumbersQuery a Partial<IQueryMetadata> y asegurada su importación.", "justificacion": "Resuelve el error no-undef.", "impacto": "Correctitud de tipos." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
