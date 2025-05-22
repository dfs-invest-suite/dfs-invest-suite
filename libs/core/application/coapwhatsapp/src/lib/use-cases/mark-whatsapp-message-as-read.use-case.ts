// RUTA: libs/core/application/coapwhatsapp/src/lib/use-cases/mark-whatsapp-message-as-read.use-case.ts
import {
  ICommandHandler,
  ICommandMetadata,
} from '@dfs-suite/cdskcommandsqueries';
import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/cdskports';
import {
  IWhatsAppMessagePort,
  WHATSAPP_MESSAGE_PORT,
} from '@dfs-suite/codowhatsapp';
import {
  ExceptionBase,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';
import { Result, ok, err, isErr } from '@dfs-suite/shresult';
import { TenantId, CorrelationId, WhatsAppAccountId } from '@dfs-suite/shtypes';

import { MarkMessageAsReadCommand } from '../commands/mark-message-as-read.command';
// import { IMessageLogRepository, MESSAGE_LOG_REPOSITORY_PORT } from '@dfs-suite/codomessagelog'; // Para actualizar el estado 'read' localmente

export interface MarkWhatsAppMessageAsReadResultDto {
  success: boolean;
}

export const MARK_WHATSAPP_MESSAGE_AS_READ_USE_CASE = Symbol(
  'IMarkWhatsAppMessageAsReadUseCase'
);
export type IMarkWhatsAppMessageAsReadUseCase = ICommandHandler<
  MarkMessageAsReadCommand,
  MarkWhatsAppMessageAsReadResultDto
>;

export class MarkWhatsAppMessageAsReadUseCaseImpl
  implements IMarkWhatsAppMessageAsReadUseCase
{
  constructor() {} // @Inject(MESSAGE_LOG_REPOSITORY_PORT) private readonly messageLogRepo: IMessageLogRepository, // @Inject(WHATSAPP_MESSAGE_PORT) private readonly waMessagePort: IWhatsAppMessagePort, // @Inject(LOGGER_PORT) private readonly logger: ILoggerPort,

  async execute(
    command: MarkMessageAsReadCommand
  ): Promise<Result<MarkWhatsAppMessageAsReadResultDto, ExceptionBase>> {
    const { tenantId, phoneNumberId, messageWaId, markedByUserId } =
      command.payload;
    const correlationId = command.metadata.correlationId;
    const useCaseName = MarkWhatsAppMessageAsReadUseCaseImpl.name;

    this.logger.log(
      `Attempting to mark WA message ${messageWaId} as read for tenant ${tenantId}, phone ${phoneNumberId}. Marked by: ${markedByUserId}`,
      useCaseName,
      correlationId
    );

    try {
      const markReadResult = await this.waMessagePort.markMessageAsRead(
        tenantId,
        phoneNumberId,
        messageWaId
      );

      if (isErr(markReadResult)) {
        this.logger.error(
          `Failed to mark message ${messageWaId} as read via API: ${markReadResult.error.message}`,
          useCaseName,
          correlationId
        );
        return err(markReadResult.error);
      }

      // TODO: Opcionalmente, actualizar el MessageLogEntity local al estado 'READ_BY_USER'
      // const logResult = await this.messageLogRepo.findByWaMessageId(messageWaId);
      // if (isOk(logResult) && logResult.value) {
      //   logResult.value.updateFromWebhookStatus(EWhatsAppMessageStatus.READ, new Date().toISOString() as IsoDateString, ...);
      //   await this.messageLogRepo.update(logResult.value);
      // }

      this.logger.log(
        `WA message ${messageWaId} marked as read successfully.`,
        useCaseName,
        correlationId
      );
      return ok({ success: markReadResult.value.success });
    } catch (error: unknown) {
      const errBase =
        error instanceof ExceptionBase
          ? error
          : new InternalServerErrorException(
              'Unexpected error marking message as read.',
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
// RUTA: libs/core/application/coapwhatsapp/src/lib/use-cases/mark-whatsapp-message-as-read.use-case.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
{ "mejora": "Esqueleto de MarkWhatsAppMessageAsReadUseCaseImpl.", "justificacion": "Permite marcar un mensaje como leído en la plataforma de WhatsApp.", "impacto": "Funcionalidad de UI para chats." }
]
/
/ NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "Considerar la actualización del MessageLogEntity local para reflejar el estado de lectura."} ] */
