// RUTA: libs/core/application/coapleadsflow/src/lib/use-cases/track-lead-interaction.use-case.ts
import { ICommandHandler } from '@dfs-suite/cdskcommandsqueries';
import { IDomainEventEmitter } from '@dfs-suite/cdskevents';
import { ILoggerPort } from '@dfs-suite/cdskports';
import {
  CreateLeadProps,
  ELeadSourceChannel, // <<< CreateLeadProps importado de la entidad
  ILeadInteractionRepository,
  ILeadRepository,
  LeadEntity,
  LeadInteractionEntity,
} from '@dfs-suite/codoleadsflow';
import {
  ArgumentInvalidException,
  ExceptionBase,
  InternalServerErrorException,
  NotFoundException,
} from '@dfs-suite/sherrors';
import { Result, err, isErr, ok } from '@dfs-suite/shresult';
// CreateLeadCommand no se usa aquí si interactuamos directamente con LeadEntity.create
import { InteractionId, LeadId, Maybe, MessageLogId } from '@dfs-suite/shtypes';
import { UuidUtils } from '@dfs-suite/shutils';

import { TrackLeadInteractionCommand } from '../commands/track-lead-interaction.command';

export interface TrackLeadInteractionResultDto {
  leadId: LeadId;
  interactionId: InteractionId;
  messageLogId?: Maybe<MessageLogId>;
}

export const TRACK_LEAD_INTERACTION_USE_CASE = Symbol(
  'ITrackLeadInteractionUseCase'
);
export type ITrackLeadInteractionUseCase = ICommandHandler<
  TrackLeadInteractionCommand,
  TrackLeadInteractionResultDto
>;

export class TrackLeadInteractionUseCaseImpl
  implements ITrackLeadInteractionUseCase
{
  constructor(
    private readonly logger: ILoggerPort,
    private readonly leadRepo: ILeadRepository,
    private readonly interactionRepo: ILeadInteractionRepository,
    private readonly eventEmitter: IDomainEventEmitter
  ) {}

  async execute(
    command: TrackLeadInteractionCommand
  ): Promise<Result<TrackLeadInteractionResultDto, ExceptionBase>> {
    const { tenantId, correlationId, ...interactionData } = command.payload;
    const metadata = command.metadata;
    const useCaseName = TrackLeadInteractionUseCaseImpl.name;

    this.logger.log(
      `Tracking lead interaction for tenant ${String(tenantId)}. Source: ${
        interactionData.interactionSource
      }`,
      useCaseName,
      correlationId
    );

    try {
      let leadEntity: LeadEntity;

      if (interactionData.leadId) {
        const leadResult = await this.leadRepo.findOneById(
          interactionData.leadId
        );
        if (isErr(leadResult)) return err(leadResult.error);
        if (!leadResult.value)
          return err(
            new NotFoundException(
              `Lead ${String(
                interactionData.leadId
              )} not found to track interaction.`,
              undefined,
              { leadId: interactionData.leadId },
              correlationId
            )
          );
        leadEntity = leadResult.value;
      } else if (
        interactionData.contactWaId ||
        interactionData.contactEmail ||
        interactionData.contactPhoneNumber
      ) {
        let existingLeadResult;
        if (interactionData.contactWaId) {
          existingLeadResult = await this.leadRepo.findByWaId(
            interactionData.contactWaId
          );
        } else if (interactionData.contactEmail) {
          existingLeadResult = await this.leadRepo.findByEmailOrPhone(
            interactionData.contactEmail,
            undefined
          );
        } else if (interactionData.contactPhoneNumber) {
          existingLeadResult = await this.leadRepo.findByEmailOrPhone(
            undefined,
            interactionData.contactPhoneNumber
          );
        } else {
          return err(
            new ArgumentInvalidException(
              'No primary contact identifier provided for lead lookup.',
              undefined,
              {},
              correlationId
            )
          );
        }

        if (isErr(existingLeadResult)) return err(existingLeadResult.error);

        if (existingLeadResult.value) {
          leadEntity = existingLeadResult.value;
        } else {
          const createLeadEntityPayload: CreateLeadProps = {
            // <<< Usa CreateLeadProps de la entidad
            tenantId, // Para el evento de la entidad
            correlationId, // Para el evento de la entidad
            name: interactionData.leadName,
            email: interactionData.contactEmail,
            phoneNumber: interactionData.contactPhoneNumber,
            waId: interactionData.contactWaId,
            sourceChannel:
              interactionData.channel as unknown as ELeadSourceChannel,
            // createdByUserId: interactionData.consultantUserId || metadata.userId, // La entidad no toma esto
            optInWhatsApp: interactionData.leadOptInWhatsApp,
            slug: UuidUtils.generateSlugFromString(
              interactionData.leadName ||
                interactionData.contactWaId ||
                interactionData.contactEmail ||
                interactionData.contactPhoneNumber ||
                'new-lead'
            ),
          };
          leadEntity = LeadEntity.create(
            createLeadEntityPayload,
            UuidUtils.generateLeadId()
          );
          const saveNewLeadResult = await this.leadRepo.insert(leadEntity);
          if (isErr(saveNewLeadResult)) return err(saveNewLeadResult.error);
          await this.eventEmitter.publishAll(
            leadEntity.getAndClearDomainEvents()
          );
        }
      } else {
        return err(
          new ArgumentInvalidException(
            'Insufficient data to find or create lead for interaction.',
            undefined,
            {},
            correlationId
          )
        );
      }

      const interactionEntity = LeadInteractionEntity.create({
        tenantId,
        correlationId,
        leadId: leadEntity.id,
        channel: interactionData.channel, // El payload del comando ya tiene EInteractionChannel
        direction: interactionData.direction,
        contentSummary: interactionData.content,
        timestamp: interactionData.timestamp,
        waMessageId: interactionData.waMessageId,
        campaignId: interactionData.campaignId,
        consultantUserId: interactionData.consultantUserId,
        durationSeconds: interactionData.durationSeconds,
        visitorId: interactionData.visitorId,
        sessionId: interactionData.sessionId,
        pageUrl: interactionData.pageUrl,
        ctaId: interactionData.ctaId,
      });

      const saveInteractionResult = await this.interactionRepo.insert(
        interactionEntity
      );
      if (isErr(saveInteractionResult)) return err(saveInteractionResult.error);

      leadEntity.recordInteraction(interactionEntity.props.timestamp);
      const updateLeadResult = await this.leadRepo.update(leadEntity);
      if (isErr(updateLeadResult)) return err(updateLeadResult.error);

      this.logger.log(
        `Interaction ${String(interactionEntity.id)} tracked for lead ${String(
          leadEntity.id
        )}.`,
        useCaseName,
        correlationId
      );
      return ok({
        leadId: leadEntity.id,
        interactionId: interactionEntity.id,
        messageLogId: undefined,
      });
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error tracking lead interaction.',
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
// RUTA: libs/core/application/coapleadsflow/src/lib/use-cases/track-lead-interaction.use-case.ts
// RUTA: libs/core/application/coapleadsflow/src/lib/use-cases/track-lead-interaction.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Añadidas importaciones para InteractionId, Maybe, EmailString, CampaignId, EInteractionChannel.", "justificacion": "Resuelve los errores no-undef.", "impacto": "Correctitud." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "La lógica para encontrar o crear el lead y el mapeo de interactionData.channel a ELeadSourceChannel necesita ser robustecida. Idealmente, CreateLeadUseCase se invocaría en lugar de LeadEntity.create directamente."} ] 
 SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Esqueleto de TrackLeadInteractionUseCaseImpl.", "justificacion": "Orquesta la lógica para encontrar/crear un lead y registrar una nueva interacción para él. Es un caso de uso central.", "impacto": "Permite el seguimiento 360° del lead." },
{ "mejora": "Definición de TrackLeadInteractionResultDto.", "justificacion": "DTO para el resultado.", "impacto": "Claridad."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
{"nota": "La lógica para encontrar o crear el lead (findByContactInfo) debe ser robustecida."},
{"nota": "La creación de MessageLogEntity para interacciones de WhatsApp debe ser integrada (posiblemente llamando a CreateInitialMessageLogUseCase)."},
{"nota": "Definir e implementar LeadInteractedEvent en codoleadsflow y asegurar su emisión."},
{"nota": "Implementar UuidUtils.generateInteractionId() y el tipo InteractionId en shtypes."}
]
*/
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Añadidas importaciones para Maybe, InteractionId, EInteractionChannel y CreateLeadProps (de la entidad).", "justificacion": "Resuelve los errores no-undef.", "impacto": "Correctitud." },
{ "mejora": "El payload para LeadEntity.create ahora usa CreateLeadProps de la entidad.", "justificacion": "Alineación con el factory de la entidad.", "impacto": "Correctitud."}
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "El cast de interactionData.channel as unknown as ELeadSourceChannel es una solución temporal y peligrosa. Se necesita un mapeo adecuado o asegurar que interactionSource en TrackLeadInteractionCommandPayload sea del tipo ELeadSourceChannel si se usa para crear un lead nuevo."} ] */
