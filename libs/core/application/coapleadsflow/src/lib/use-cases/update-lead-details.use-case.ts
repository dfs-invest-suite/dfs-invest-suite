// RUTA: libs/core/application/coapleadsflow/src/lib/use-cases/update-lead-details.use-case.ts
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
} from '@dfs-suite/codoleadsflow';
import {
  ExceptionBase,
  NotFoundException,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, ok, err, isErr } from '@dfs-suite/shresult';
import { TenantId, LeadId } from '@dfs-suite/shtypes';

import {
  UpdateLeadDetailsCommand,
  UpdateLeadDetailsCommandPayload,
} from '../commands/update-lead-details.command';
import { LeadDetailsDto } from '../dtos';

export const UPDATE_LEAD_DETAILS_USE_CASE = Symbol('IUpdateLeadDetailsUseCase');
export type IUpdateLeadDetailsUseCase = ICommandHandler<
  UpdateLeadDetailsCommand,
  LeadDetailsDto
>; // Devuelve el lead actualizado

export class UpdateLeadDetailsUseCaseImpl implements IUpdateLeadDetailsUseCase {
  constructor() {} // @Inject(DOMAIN_EVENT_EMITTER_PORT) private readonly eventEmitter: IDomainEventEmitter // @Inject(LEAD_REPOSITORY_PORT) private readonly leadRepo: ILeadRepository, // @Inject(LOGGER_PORT) private readonly logger: ILoggerPort,

  async execute(
    command: UpdateLeadDetailsCommand
  ): Promise<Result<LeadDetailsDto, ExceptionBase | NotFoundException>> {
    const { tenantId, leadId, updates, updatedByUserId } = command.payload;
    const correlationId = command.metadata.correlationId;
    const useCaseName = UpdateLeadDetailsUseCaseImpl.name;

    this.logger.log(
      `Attempting to update lead ${String(leadId)} for tenant ${String(
        tenantId
      )}. Updated by ${String(updatedByUserId)}`,
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

      // Aplicar actualizaciones a la entidad (la entidad debería tener un método para esto)
      leadEntity.updateDetails(updates); // Asumiendo que updates es compatible con lo que espera updateDetails

      const saveResult = await this.leadRepo.update(leadEntity);
      if (isErr(saveResult)) return err(saveResult.error);

      await this.eventEmitter.publishAll(leadEntity.getAndClearDomainEvents());

      // Mapear entidad a DTO
      const dto: LeadDetailsDto = {
        /* ... mapeo de leadEntity a LeadDetailsDto ... */
      } as LeadDetailsDto;
      this.logger.log(
        `Lead ${String(leadId)} updated successfully.`,
        useCaseName,
        correlationId
      );
      return ok(dto);
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error updating lead.',
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
// RUTA: libs/core/application/coapleadsflow/src/lib/use-cases/update-lead-details.use-case.ts
