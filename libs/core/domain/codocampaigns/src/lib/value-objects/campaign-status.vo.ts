// RUTA: libs/core/domain/codocampaigns/src/lib/value-objects/campaign-status.vo.ts
import { ValueObject, IDomainPrimitive } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';

import { ECampaignStatus } from '../enums/campaign-status.enum';

export class CampaignStatusVO extends ValueObject<ECampaignStatus> {
  protected constructor(props: IDomainPrimitive<ECampaignStatus>) {
    super(props);
  }

  get value(): ECampaignStatus {
    return this.props.value;
  }

  protected validate(props: IDomainPrimitive<ECampaignStatus>): void {
    if (!Object.values(ECampaignStatus).includes(props.value)) {
      throw new ArgumentInvalidException(
        `Invalid campaign status: "${props.value}".`
      );
    }
  }

  public static create(status: ECampaignStatus): CampaignStatusVO {
    return new CampaignStatusVO({ value: status });
  }

  public static newDraft(): CampaignStatusVO {
    return new CampaignStatusVO(ECampaignStatus.DRAFT);
  }
  public static newScheduled(): CampaignStatusVO {
    return new CampaignStatusVO(ECampaignStatus.SCHEDULED);
  }
  // ... otros factories
}
// RUTA: libs/core/domain/codocampaigns/src/lib/value-objects/campaign-status.vo.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Implementación de `CampaignStatusVO`.", "justificacion": "VO para el estado de la campaña.", "impacto": "Tipado." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "Añadir métodos helper como `isRunning()`, `isCompleted()`, etc."} ] */
