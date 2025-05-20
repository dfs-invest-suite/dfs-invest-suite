// RUTA: libs/core/application/coapwhatsapp/src/lib/use-cases/send-whatsapp-message.use-case.ts
// TODO: [LIA Legacy - Implementar SendWhatsAppMessageUseCase]
// Propósito: Orquestar el envío de un mensaje de WhatsApp. Valida la plantilla (si es de tipo template),
// determina la cuenta a usar vía AntiBanDecisionService, y encola el mensaje para envío real por un worker.
// Relacionado con Casos de Uso: BP-WA-SEND-001 (Envío de Plantilla), BP-WA-SEND-002 (Envío Libre CSW).
// import { ICommandHandler } from '@dfs-suite/cdskcommandsqueries';
// import { SendMessageCommand } from '../commands/send-message.command';
// import { SendMessageResultDto } from '../dtos/send-message-result.dto';
// import { Result, ok, err } from '@dfs-suite/shresult';
// import { ExceptionBase, NotFoundException } from '@dfs-suite/sherrors';
// import { IMessageTemplateRecordRepository, CODOMESSAGETEMPLATERECORD_REPOSITORY_PORT } from '@dfs-suite/codomessagetemplaterecord';
// import { IAntiBanDecisionService, CODOANTIBAN_DECISION_SERVICE_PORT } from '@dfs-suite/codoantiban'; // Puerto al servicio de dominio AntiBan
// import { IQueuePort, INFRASTRUCTURE_QUEUE_PORT } from '../../../../infrastructure/infraqueue/src'; // Asumiendo que el puerto de la cola se define/exporta en infra
// import { ILoggerPort, LOGGER_PORT } from '@dfs-suite/cdskports';

// export class SendWhatsAppMessageUseCase implements ICommandHandler<SendMessageCommand, SendMessageResultDto> {
//   private readonly WHATSAPP_OUTBOUND_QUEUE_NAME = 'whatsapp-outbound';
//   constructor(
//     // @Inject(IMessageTemplateRecordRepository) private readonly templateRepo: IMessageTemplateRecordRepository,
//     // @Inject(IAntiBanDecisionService) private readonly antiBanService: IAntiBanDecisionService,
//     // @Inject(IQueuePort) private readonly queuePort: IQueuePort,
//     // @Inject(ILoggerPort) private readonly logger: ILoggerPort,
//   ) {}
//   async execute(command: SendMessageCommand): Promise<Result<SendMessageResultDto, ExceptionBase>> {
//     const { tenantId, recipientPhoneNumber, messageData, originatingCampaignId } = command.payload;
//     // 1. Si es plantilla, validar existencia y estado desde MessageTemplateRecordRepository
//     // 2. (Simplificado aquí) Crear un MessageLog en estado PENDING_ANTI_BAN (esto podría ser parte de otro UC o del AntiBanDecisionService)
//     // 3. Preparar jobData para la cola: { tenantId, recipientPhoneNumber, messageData, messageLogId, templateCategory?, originatingCampaignId }
//     // 4. Encolar el job en WHATSAPP_OUTBOUND_QUEUE
//     //    await this.queuePort.add(this.WHATSAPP_OUTBOUND_QUEUE_NAME, jobData);
//     // 5. Devolver un SendMessageResultDto con el messageLogId y estado "QUEUED".
//     this.logger.log(`Message enqueued for ${recipientPhoneNumber}`, this.constructor.name, command.metadata.correlationId);
//     return ok({ messageId: 'temp-log-id', status: 'QUEUED' });
//   }
// }
