// RUTA: libs/core/domain/codomessagelog/src/lib/value-objects/message-internal-status.vo.ts
// TODO: [LIA Legacy - Implementar MessageInternalStatusVO]
// Propósito: VO para el estado interno del mensaje en DFS.
import { ValueObject } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';

export enum EMessageInternalStatus {
  PENDING_PROCESSING = 'PENDING_PROCESSING', // Para mensajes entrantes antes de ser procesados por el UC
  PENDING_ANTI_BAN = 'PENDING_ANTI_BAN', // Para salientes, antes de la decisión del AntiBan
  QUEUED_FOR_SENDING = 'QUEUED_FOR_SENDING', // Encolado en BullMQ para envío real
  SENT_TO_API = 'SENT_TO_API', // Enviado a la API de Meta, esperando status de Meta
  DELIVERED_TO_USER = 'DELIVERED_TO_USER', // Confirmado por Meta como entregado al destinatario
  READ_BY_USER = 'READ_BY_USER', // Confirmado por Meta como leído
  ERROR_ANTI_BAN = 'ERROR_ANTI_BAN', // Rechazado por el sistema Anti-Ban
  ERROR_API = 'ERROR_API', // Error al llamar a la API de Meta (antes de obtener waMessageId)
  FAILED_DELIVERY = 'FAILED_DELIVERY', // Meta reportó fallo en la entrega (después de obtener waMessageId)
  // Podríamos tener más estados intermedios o específicos
}

export class MessageInternalStatusVO extends ValueObject<EMessageInternalStatus> {
  constructor(value: EMessageInternalStatus) {
    super({ value });
  }
  public get value(): EMessageInternalStatus {
    return this.props.value;
  }

  protected validate(props: { value: EMessageInternalStatus }): void {
    if (!Object.values(EMessageInternalStatus).includes(props.value)) {
      throw new ArgumentInvalidException(
        `Invalid internal message status: "${props.value}".`
      );
    }
  }

  public static newPendingProcessing(): MessageInternalStatusVO {
    return new MessageInternalStatusVO(
      EMessageInternalStatus.PENDING_PROCESSING
    );
  }
  public static newPendingAntiBan(): MessageInternalStatusVO {
    return new MessageInternalStatusVO(EMessageInternalStatus.PENDING_ANTI_BAN);
  }
  public static newQueued(): MessageInternalStatusVO {
    return new MessageInternalStatusVO(
      EMessageInternalStatus.QUEUED_FOR_SENDING
    );
  }
  public static newSentToApi(): MessageInternalStatusVO {
    return new MessageInternalStatusVO(EMessageInternalStatus.SENT_TO_API);
  }
  public static newDeliveredToUser(): MessageInternalStatusVO {
    return new MessageInternalStatusVO(
      EMessageInternalStatus.DELIVERED_TO_USER
    );
  }
  public static newReadByUser(): MessageInternalStatusVO {
    return new MessageInternalStatusVO(EMessageInternalStatus.READ_BY_USER);
  }
  public static newErrorAntiBan(): MessageInternalStatusVO {
    return new MessageInternalStatusVO(EMessageInternalStatus.ERROR_ANTI_BAN);
  }
  public static newErrorApi(): MessageInternalStatusVO {
    return new MessageInternalStatusVO(EMessageInternalStatus.ERROR_API);
  }
  public static newFailedDelivery(): MessageInternalStatusVO {
    return new MessageInternalStatusVO(EMessageInternalStatus.FAILED_DELIVERY);
  }
}
/* SECCIÓN DE MEJORAS FUTURAS: [] */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
