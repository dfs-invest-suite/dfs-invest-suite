// RUTA: libs/core/application/coapleadsflow/src/lib/queries/get-lead-details.query.ts
import {
  IQueryHandler,
  IQueryMetadata,
  QueryBase,
} from '@dfs-suite/cdskcommandsqueries';
import { ILoggerPort } from '@dfs-suite/cdskports';
import {
  ILeadInteractionRepository,
  ILeadRepository,
} from '@dfs-suite/codoleadsflow';
import { IUserRepository } from '@dfs-suite/codousersroles';
import {
  ExceptionBase,
  InternalServerErrorException,
  NotFoundException,
} from '@dfs-suite/sherrors';
import { Result, err, isErr, isOk, ok } from '@dfs-suite/shresult';
import {
  EmailString,
  LeadId,
  Maybe,
  TenantId,
  UserId,
} from '@dfs-suite/shtypes';

import { LeadDetailsDto, LeadInteractionDto } from '../dtos'; // Asumiendo que LeadInteractionDto está en dtos/index.ts o dtos/lead-interaction.dto.ts

// --- Query ---
export interface GetLeadDetailsQueryPayload {
  tenantId: TenantId;
  leadId: LeadId;
  includeInteractionsLimit?: Maybe<number>;
}

export class GetLeadDetailsQuery extends QueryBase<LeadDetailsDto> {
  public readonly payload: GetLeadDetailsQueryPayload;
  constructor(
    payload: GetLeadDetailsQueryPayload,
    metadata?: Partial<IQueryMetadata>
  ) {
    super(metadata);
    this.payload = payload;
  }
}

// --- Query Handler ---
export const GET_LEAD_DETAILS_QUERY_HANDLER = Symbol(
  'IGetLeadDetailsQueryHandler'
);
export type IGetLeadDetailsQueryHandler = IQueryHandler<
  GetLeadDetailsQuery,
  LeadDetailsDto
>;

export class GetLeadDetailsQueryHandlerImpl
  implements IGetLeadDetailsQueryHandler
{
  constructor(
    // @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort,
    // @Inject(LEAD_REPOSITORY_PORT)
    private readonly leadRepo: ILeadRepository,
    // @Inject(USER_REPOSITORY_PORT)
    private readonly userRepo: IUserRepository,
    // @Inject(LEAD_INTERACTION_REPOSITORY_PORT) // Inyectar repo de interacciones
    private readonly interactionRepo: ILeadInteractionRepository
  ) {}

  async execute(
    query: GetLeadDetailsQuery
  ): Promise<Result<LeadDetailsDto, NotFoundException | ExceptionBase>> {
    const { tenantId, leadId, includeInteractionsLimit } = query.payload;
    const correlationId = query.metadata.correlationId;
    const useCaseName = GetLeadDetailsQueryHandlerImpl.name;

    this.logger.log(
      `Fetching details for lead ${String(leadId)}, tenant ${String(tenantId)}`,
      useCaseName,
      correlationId
    );

    try {
      const leadResult = await this.leadRepo.findOneById(leadId);
      if (isErr(leadResult)) return err(leadResult.error);
      if (!leadResult.value) {
        return err(
          new NotFoundException(
            `Lead ${String(leadId)} not found.`,
            undefined,
            { leadId },
            correlationId
          )
        );
      }
      const leadEntity = leadResult.value;

      let assignedToUserDto: Maybe<{
        id: UserId;
        name: string;
        email: EmailString;
      }> = undefined;
      if (leadEntity.props.assignedToUserId) {
        const userResult = await this.userRepo.findOneById(
          leadEntity.props.assignedToUserId
        );
        if (isOk(userResult) && userResult.value) {
          assignedToUserDto = {
            id: userResult.value.id,
            name: userResult.value.name,
            email: userResult.value.email,
          };
        } else if (isErr(userResult)) {
          this.logger.warn(
            `Could not fetch assigned user ${String(
              leadEntity.props.assignedToUserId
            )} for lead ${String(leadId)}: ${userResult.error.message}`,
            useCaseName,
            correlationId
          );
        }
      }

      let interactionsDto: Maybe<LeadInteractionDto[]> = undefined;
      if (includeInteractionsLimit && includeInteractionsLimit > 0) {
        const interactionsResult =
          await this.interactionRepo.findAllByLeadIdPaginated(leadId, {
            limit: includeInteractionsLimit,
            page: 1,
            sortBy: 'timestamp',
            sortOrder: 'desc',
          });
        if (isOk(interactionsResult)) {
          interactionsDto = interactionsResult.value.data.map(
            (interactionEntity) => ({
              id: interactionEntity.id,
              leadId: interactionEntity.props.leadId,
              channel: interactionEntity.props.channel.value,
              direction: interactionEntity.props.direction,
              timestamp: interactionEntity.props.timestamp,
              contentSummary: interactionEntity.props.contentSummary,
              waMessageId: interactionEntity.props.waMessageId,
              campaignId: interactionEntity.props.campaignId,
              consultantUserId: interactionEntity.props.consultantUserId,
              // consultantName: // Necesitaría otra búsqueda de usuario o un join
              sentiment: interactionEntity.props.sentiment,
              durationSeconds: interactionEntity.props.durationSeconds,
              createdAt: interactionEntity.createdAt,
            })
          );
        } else {
          this.logger.warn(
            `Could not fetch interactions for lead ${String(leadId)}: ${
              interactionsResult.error.message
            }`,
            useCaseName,
            correlationId
          );
        }
      }

      const dto: LeadDetailsDto = {
        id: leadEntity.id,
        tenantId: tenantId,
        name: leadEntity.props.name,
        email: leadEntity.props.email,
        phoneNumber: leadEntity.props.phoneNumber,
        waId: leadEntity.props.waId,
        status: leadEntity.props.status.value,
        score: leadEntity.props.score.value,
        sourceChannel: leadEntity.props.sourceChannel?.value,
        referralSourceText: leadEntity.props.referralSourceText,
        assignedToUser: assignedToUserDto,
        lastInteractionAt: leadEntity.props.lastInteractionAt,
        optInWhatsApp: leadEntity.props.optInWhatsApp || false,
        optInEmail: leadEntity.props.optInEmail || false,
        tags: leadEntity.props.tags,
        customFields: leadEntity.props.customFields,
        interactions: interactionsDto,
        createdAt: leadEntity.createdAt,
        updatedAt: leadEntity.updatedAt,
      };
      return ok(dto);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error fetching lead details.',
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
// RUTA: libs/core/application/coapleadsflow/src/lib/queries/get-lead-details.query.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Implementación completa de GetLeadDetailsQuery y esqueleto de GetLeadDetailsQueryHandlerImpl.", "justificacion": "Permite obtener los detalles de un lead específico, incluyendo la información básica del usuario asignado.", "impacto": "Funcionalidad de lectura para pwa-supervisor y pwa-consultant." },
{ "mejora": "Interacción con IUserRepository para enriquecer assignedToUser.", "justificacion": "Proporciona datos útiles del consultor asignado en el DTO.", "impacto": "DTO más informativo."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{"nota": "Implementar la obtención y mapeo de interacciones (LeadInteractionDto) si includeInteractionsLimit se especifica."},
{"nota": "Asegurar que ILeadInteractionRepositoryPort y IUserRepositoryPort se importen y estén disponibles para inyección."}
]
*/

/* SECCIÓN DE MEJORAS REALIZADAS: [ { "mejora": "Esqueleto de GetLeadDetailsQuery y Handler.", "justificacion": "Query para obtener detalles de un lead.", "impacto": "Lectura de datos." } ] /
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "Implementar lógica de fetching y mapeo a DTO."} ] */
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Añadida importación de isOk desde @dfs-suite/shresult y LeadInteractionDto desde ../dtos.", "justificacion": "Resuelve el error no-undef y permite la lógica de inclusión de interacciones.", "impacto": "Correctitud y funcionalidad expandida." },
{ "mejora": "Esbozada la lógica para incluir interacciones si includeInteractionsLimit es proveído, incluyendo la inyección de ILeadInteractionRepository y su mapeo a LeadInteractionDto.", "justificacion": "Proporciona una visión más completa del lead.", "impacto": "Funcionalidad de la query mejorada."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "El mapeo a LeadInteractionDto podría necesitar el nombre del consultor, lo que requeriría otra consulta de usuario o un join en el repositorio."} ] */
