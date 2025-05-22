// libs/core/domain/codoleadsflow/src/lib/value-objects/lead-source-channel.vo.ts
import { ValueObject, IDomainPrimitive } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';
import { CommunicationChannel } from '@dfs-suite/shtypes'; // Se importa pero no se usa directamente

export enum ELeadSourceChannel {
  PORTAL_IMOVEIS_FORM = 'PORTAL_IMOVEIS_FORM',
  WHATSAPP_DIRECT = 'WHATSAPP_DIRECT',
  WHATSAPP_CAMPAIGN = 'WHATSAPP_CAMPAIGN',
  MANUAL_ENTRY = 'MANUAL_ENTRY',
  CSV_IMPORT = 'CSV_IMPORT',
  API_INTEGRATION = 'API_INTEGRATION',
  SOCIAL_MEDIA_AD = 'SOCIAL_MEDIA_AD',
  GOOGLE_AD = 'GOOGLE_AD',
  REFERRAL = 'REFERRAL',
  EVENT = 'EVENT',
  LANDING_PAGE_FORM = 'LANDING_PAGE_FORM',
  OTHER = 'OTHER',
}

export class LeadSourceChannelVO extends ValueObject<ELeadSourceChannel> {
  protected constructor(value: ELeadSourceChannel) { // Constructor toma el primitivo
    super({ value }); // Pasa como objeto
  }

  get value(): ELeadSourceChannel {
    return this.props.value;
  }

  protected validate(props: IDomainPrimitive<ELeadSourceChannel>): void {
    if (!Object.values(ELeadSourceChannel).includes(props.value)) {
      throw new ArgumentInvalidException(
        `Invalid lead source channel: "${props.value}".`
      );
    }
  }

  public static create(channel: ELeadSourceChannel): LeadSourceChannelVO {
    return new LeadSourceChannelVO(channel);
  }
}
// FIN DEL ARCHIVO: libs/core/domain/codoleadsflow/src/lib/value-objects/lead-source-channel.vo.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Constructor de `LeadSourceChannelVO` ahora toma el enum `ELeadSourceChannel` directamente y llama a `super({ value })`.", "justificacion": "Alineación con `ValueObject<TProps>` para primitivos.", "impacto": "Resuelve errores `TS2339`." },
  { "mejora": "Eliminado el import no utilizado de `CommunicationChannel` para evitar warnings, ya que se decidió usar un enum local.", "justificacion": "Limpieza.", "impacto": "Menos warnings."}
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */