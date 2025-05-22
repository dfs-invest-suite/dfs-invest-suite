// libs/core/domain/codoleadsflow/src/lib/value-objects/lead-status.vo.ts
import { ValueObject, IDomainPrimitive } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';

export enum ELeadStatus {
  NEW = 'NEW',
  CONTACT_ATTEMPTED = 'CONTACT_ATTEMPTED',
  CONTACTED = 'CONTACTED',
  QUALIFIED = 'QUALIFIED',
  NURTURING_WARM = 'NURTURING_WARM',
  NURTURING_COLD = 'NURTURING_COLD',
  PROPOSAL_SENT = 'PROPOSAL_SENT',
  NEGOTIATION = 'NEGOTIATION',
  CONVERTED_CUSTOMER = 'CONVERTED_CUSTOMER',
  LOST_OPPORTUNITY = 'LOST_OPPORTUNITY',
  DISQUALIFIED = 'DISQUALIFIED',
  ARCHIVED = 'ARCHIVED',
}

export class LeadStatusVO extends ValueObject<ELeadStatus> {
  protected constructor(value: ELeadStatus) {
    // Constructor toma el primitivo
    super({ value }); // Pasa como objeto
  }

  get value(): ELeadStatus {
    return this.props.value;
  }

  protected validate(props: IDomainPrimitive<ELeadStatus>): void {
    if (!Object.values(ELeadStatus).includes(props.value)) {
      throw new ArgumentInvalidException(
        `Invalid lead status: "${props.value}". Must be one of [${Object.values(
          ELeadStatus
        ).join(', ')}]`
      );
    }
  }

  public static create(status: ELeadStatus): LeadStatusVO {
    return new LeadStatusVO(status);
  }

  public isNew(): boolean {
    return this.props.value === ELeadStatus.NEW;
  }
  public isConverted(): boolean {
    return this.props.value === ELeadStatus.CONVERTED_CUSTOMER;
  }
  public isLost(): boolean {
    return this.props.value === ELeadStatus.LOST_OPPORTUNITY;
  }
  public isNurturing(): boolean {
    return (
      this.props.value === ELeadStatus.NURTURING_COLD ||
      this.props.value === ELeadStatus.NURTURING_WARM
    );
  }
  // TODO: [LIA-POST-DEMO] Añadir método `canTransitionTo(newStatus: LeadStatusVO): boolean`
}
// FIN DEL ARCHIVO: libs/core/domain/codoleadsflow/src/lib/value-objects/lead-status.vo.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Constructor de `LeadStatusVO` ahora toma el enum `ELeadStatus` directamente y llama a `super({ value })`.", "justificacion": "Alineación con `ValueObject<TProps>` para primitivos.", "impacto": "Resuelve errores `TS2339`." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {"nota": "Implementar el método `canTransitionTo(newStatus: LeadStatusVO): boolean` para la lógica de validación de transiciones de estado."}
]
*/
