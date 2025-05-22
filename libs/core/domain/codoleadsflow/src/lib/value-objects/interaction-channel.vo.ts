// libs/core/domain/codoleadsflow/src/lib/value-objects/interaction-channel.vo.ts
import { ValueObject, IDomainPrimitive } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';
import { CommunicationChannel as EInteractionChannel } from '@dfs-suite/shtypes';

export { EInteractionChannel };

export class InteractionChannelVO extends ValueObject<EInteractionChannel> {
  // El constructor debe tomar el valor primitivo directamente
  constructor(value: EInteractionChannel) {
    super({ value }); // CAMBIO: Pasar como { value: channel }
  }

  get value(): EInteractionChannel {
    return this.props.value; // Ahora this.props.value existe
  }

  protected validate(props: IDomainPrimitive<EInteractionChannel>): void {
    // props es IDomainPrimitive
    if (!Object.values(EInteractionChannel).includes(props.value)) {
      throw new ArgumentInvalidException(
        `Invalid interaction channel: "${props.value}".`
      );
    }
  }

  public static create(channel: EInteractionChannel): InteractionChannelVO {
    return new InteractionChannelVO(channel); // El constructor ahora toma el primitivo
  }
}
// FIN DEL ARCHIVO: libs/core/domain/codoleadsflow/src/lib/value-objects/interaction-channel.vo.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Constructor de `InteractionChannelVO` ahora toma el valor primitivo `EInteractionChannel` directamente y llama a `super({ value: channel })`.", "justificacion": "Alinea con la forma en que `ValueObject<TProps>` espera las props cuando `TProps` es un tipo primitivo (se envuelve en `IDomainPrimitive`).", "impacto": "Resuelve el error `TS2339: Property 'props' does not exist` y permite que `get value()` y `validate()` funcionen correctamente." },
  { "mejora": "`validate` ahora recibe `IDomainPrimitive<EInteractionChannel>`.", "justificacion": "Consistencia con la clase base.", "impacto": "Correctitud."}
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
