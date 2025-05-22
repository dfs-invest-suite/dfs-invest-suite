// RUTA: libs/core/application/coapwhatsapp/src/lib/queries/get-message-template-details.query.ts
import {
  QueryBase,
  IQueryMetadata,
  IQueryHandler,
} from '@dfs-suite/cdskcommandsqueries';
import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/cdskports';
import {
  IMessageTemplateRecordRepository,
  MESSAGE_TEMPLATE_RECORD_REPOSITORY_PORT,
} from '@dfs-suite/codomessagetemplaterecord';
import {
  ExceptionBase,
  NotFoundException,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, ok, err, isErr } from '@dfs-suite/shresult';
import {
  TenantId,
  MessageTemplateId as HsmId,
  CorrelationId,
} from '@dfs-suite/shtypes'; // Usar HsmId

import { TemplateDetailsAppDto } from '../dtos/template-management.dtos';

// --- Query ---
export interface GetMessageTemplateDetailsQueryPayload {
  tenantId: TenantId; // Para validación de contexto, aunque el repo usa el del servicio Prisma
  hsmId: HsmId;
}

export class GetMessageTemplateDetailsQuery extends QueryBase<TemplateDetailsAppDto> {
  public readonly payload: GetMessageTemplateDetailsQueryPayload;
  constructor(
    payload: GetMessageTemplateDetailsQueryPayload,
    metadata?: Partial<IQueryMetadata>
  ) {
    super(metadata);
    this.payload = payload;
  }
}

// --- Query Handler ---
export const GET_MESSAGE_TEMPLATE_DETAILS_QUERY_HANDLER = Symbol(
  'IGetMessageTemplateDetailsQueryHandler'
);
export type IGetMessageTemplateDetailsQueryHandler = IQueryHandler<
  GetMessageTemplateDetailsQuery,
  TemplateDetailsAppDto
>;

export class GetMessageTemplateDetailsQueryHandlerImpl
  implements IGetMessageTemplateDetailsQueryHandler
{
  constructor(
    // @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort,
    // @Inject(MESSAGE_TEMPLATE_RECORD_REPOSITORY_PORT)
    private readonly templateRecordRepo: IMessageTemplateRecordRepository
  ) {}

  async execute(
    query: GetMessageTemplateDetailsQuery
  ): Promise<Result<TemplateDetailsAppDto, NotFoundException | ExceptionBase>> {
    const { tenantId, hsmId } = query.payload;
    const correlationId = query.metadata.correlationId;
    const useCaseName = GetMessageTemplateDetailsQueryHandlerImpl.name;

    this.logger.log(
      `Fetching template details for HSM ID ${hsmId}, tenant ${tenantId}`,
      useCaseName,
      correlationId
    );

    try {
      // El repo opera en el contexto del tenantId
      const recordResult = await this.templateRecordRepo.findByHsmId(hsmId);
      if (isErr(recordResult)) return err(recordResult.error);
      if (!recordResult.value) {
        return err(
          new NotFoundException(
            `Message template with HSM ID ${hsmId} not found for tenant ${tenantId}.`,
            undefined,
            { hsmId },
            correlationId
          )
        );
      }

      const entity = recordResult.value;
      const dto: TemplateDetailsAppDto = {
        id: entity.hsmId,
        internalRecordId: String(entity.id),
        name: entity.name,
        language: entity.language,
        category: entity.category,
        statusMeta: entity.statusMeta,
        statusInternal: entity.statusInternal.value,
        qualityRatingMeta: entity.qualityRatingMeta,
        components: entity.components.map((c) => c.props), // Asumiendo que TemplateComponentVO.props es TWhatsAppTemplateComponent
        exampleJson: entity.exampleJson,
        rejectedReason: entity.rejectedReason,
        lastSyncedAt: entity.lastSyncedAt,
        createdAt: entity.createdAt,
        updatedAt: entity.updatedAt,
      };
      return ok(dto);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error fetching template details.',
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
// RUTA: libs/core/application/coapwhatsapp/src/lib/queries/get-message-template-details.query.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Implementación de GetMessageTemplateDetailsQuery y GetMessageTemplateDetailsQueryHandlerImpl.", "justificacion": "Permite obtener los detalles completos de una plantilla de mensaje específica.", "impacto": "Funcionalidad para pwa-supervisor." },
{ "mejora": "Uso de HsmId (alias de MessageTemplateId) para identificar la plantilla.", "justificacion": "Claridad semántica.", "impacto": "Consistencia." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "El mapeo de entity.components a DTO asume que TemplateComponentVO.props es compatible con TWhatsAppTemplateComponent. Podría necesitar un mapeo más explícito si no es el caso."} ] */
