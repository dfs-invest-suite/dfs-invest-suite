// RUTA: libs/core/domain/codomessagelog/src/lib/value-objects/message-direction.vo.ts
// TODO: [LIA Legacy - Implementar MessageDirectionVO]
// Propósito: VO para la dirección del mensaje (INBOUND/OUTBOUND).
import { ValueObject } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';

export enum EMessageDirection {
  INBOUND = 'INBOUND',
  OUTBOUND = 'OUTBOUND',
}

export class MessageDirectionVO extends ValueObject<EMessageDirection> {
  constructor(value: EMessageDirection) {
    super({ value });
  }

  public get value(): EMessageDirection {
    return this.props.value;
  }

  protected validate(props: { value: EMessageDirection }): void {
    if (!Object.values(EMessageDirection).includes(props.value)) {
      throw new ArgumentInvalidException(
        `Invalid message direction: "${props.value}".`
      );
    }
  }

  public static newInbound(): MessageDirectionVO {
    return new MessageDirectionVO(EMessageDirection.INBOUND);
  }
  public static newOutbound(): MessageDirectionVO {
    return new MessageDirectionVO(EMessageDirection.OUTBOUND);
  }
}
/* SECCIÓN DE MEJORAS FUTURAS: [] */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
