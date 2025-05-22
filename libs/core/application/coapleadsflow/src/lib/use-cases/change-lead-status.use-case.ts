// RUTA: libs/core/application/coapleadsflow/src/lib/use-cases/change-lead-status.use-case.ts
import {
  ICommandHandler,
  ICommandMetadata,
} from '@dfs-suite/cdskcommandsqueries';
import {
  IDomainEventEmitter,
  DOMAIN_EVENT_EMITTER_PORT,
} from '@dfs-suite/cdskevents';
import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/cdskports';
import {
  ILeadRepository,
  LEAD_REPOSITORY_PORT,
  LeadEntity,
  LeadStatusVO,
  ELeadStatus,
  InvalidLeadStatusTransitionError, // Error de dominio
} from '@dfs-suite/codoleadsflow';
import {
  ExceptionBase,
  NotFoundException,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, ok, err, isErr } from '@dfs-suite/shresult';
import { TenantId, LeadId, CorrelationId } from '@dfs-suite/shtypes';

import {
  ChangeLeadStatusCommand,
  ChangeLeadStatusCommandPayload,
} from '../commands/change-lead-status.command';
import { LeadDetailsDto } from '../dtos'; // O un DTO más simple si solo se confirma el cambio

export const CHANGE_LEAD_STATUS_USE_CASE = Symbol('IChangeLeadStatusUseCase');
export type IChangeLeadStatusUseCase = ICommandHandler<
  ChangeLeadStatusCommand,
  LeadDetailsDto
>; // Devuelve el lead actualizado

export class ChangeLeadStatusUseCaseImpl implements IChangeLeadStatusUseCase {
  constructor(
    // @Inject(LOGGER_PORT)
    private readonly logger: ILoggerPort,
    // @Inject(LEAD_REPOSITORY_PORT)
    private readonly leadRepo: ILeadRepository,
    // @Inject(DOMAIN_EVENT_EMITTER_PORT)
    private readonly eventEmitter: IDomainEventEmitter
  ) {}

  async execute(
    command: ChangeLeadStatusCommand
  ): Promise<
    Result<
      LeadDetailsDto,
      ExceptionBase | NotFoundException | InvalidLeadStatusTransitionError
    >
  > {
    const { tenantId, leadId, newStatus, reason, changedByUserId } =
      command.payload;
    const correlationId = command.metadata.correlationId;
    const useCaseName = ChangeLeadStatusUseCaseImpl.name;

    this.logger.log(
      `Attempting to change status of lead ${String(
        leadId
      )} to ${newStatus} for tenant ${String(tenantId)}. Changed by ${String(
        changedByUserId
      )}. Reason: ${reason || 'N/A'}`,
      useCaseName,
      correlationId
    );

    try {
      const leadResult = await this.leadRepo.findOneById(leadId);
      if (isErr(leadResult)) return err(leadResult.error);
      if (!leadResult.value) {
        return err(
          new NotFoundException(
            `Lead ${String(leadId)} not found for status change.`,
            undefined,
            { leadId },
            correlationId
          )
        );
      }
      const leadEntity = leadResult.value;

      const newStatusVO = LeadStatusVO.create(newStatus);
      // La entidad LeadEntity.changeStatus debe manejar la lógica de transición y validación
      const changeResult = leadEntity.changeStatus(newStatusVO, {
        tenantId,
        correlationId,
        changedBy: changedByUserId,
        reason,
      });
      if (isErr(changeResult)) {
        return err(changeResult.error); // Propagar InvalidLeadStatusTransitionError u otros
      }

      const saveResult = await this.leadRepo.update(leadEntity);
      if (isErr(saveResult)) return err(saveResult.error);

      await this.eventEmitter.publishAll(leadEntity.getAndClearDomainEvents()); // Publicar LeadStatusChangedEvent

      this.logger.log(
        `Status of lead ${String(
          leadId
        )} changed to ${newStatus} successfully.`,
        useCaseName,
        correlationId
      );

      // Mapear entidad a DTO
      const dto: LeadDetailsDto = {
        /* ... mapeo ... */
      } as LeadDetailsDto;
      return ok(dto);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error changing lead status.',
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
// RUTA: libs/core/application/coapleadsflow/src/lib/use-cases/change-lead-status.use-case.ts

/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Esqueleto de ChangeLeadStatusUseCaseImpl.", "justificacion": "Orquesta el cambio de estado de un lead, delegando la lógica de validación de transición a la entidad.", "impacto": "Gestión del pipeline de leads." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "Implementar el mapeo a LeadDetailsDto y asegurar que LeadEntity.changeStatus valide transiciones y emita el evento."} ] */
