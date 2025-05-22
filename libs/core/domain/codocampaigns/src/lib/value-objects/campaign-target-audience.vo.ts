// RUTA: libs/core/domain/codocampaigns/src/lib/value-objects/campaign-target-audience.vo.ts
import { ValueObject, IDomainPrimitive } from '@dfs-suite/cdskvalueobjects';
import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
} from '@dfs-suite/sherrors';
import { LeadId, Maybe } from '@dfs-suite/shtypes'; // Asumiendo que LeadId está en shtypes
import { Guard } from '@dfs-suite/shutils';

export type CampaignAudienceType =
  | 'LEAD_IDS'
  | 'SEGMENT_ID'
  | 'FILTER_CRITERIA';

export interface CampaignTargetAudienceProps {
  readonly type: CampaignAudienceType;
  readonly leadIds?: Maybe<LeadId[]>; // Lista de IDs de Lead si type es LEAD_IDS
  readonly segmentId?: Maybe<string>; // ID de un segmento predefinido si type es SEGMENT_ID
  readonly filterCriteria?: Maybe<string>; // JSON string o DTO de criterios de filtro si type es FILTER_CRITERIA
}

export class CampaignTargetAudienceVO extends ValueObject<CampaignTargetAudienceProps> {
  protected constructor(props: CampaignTargetAudienceProps) {
    super(props);
  }

  get type(): CampaignAudienceType {
    return this.props.type;
  }
  get leadIds(): Maybe<LeadId[]> {
    return this.props.leadIds;
  }
  get segmentId(): Maybe<string> {
    return this.props.segmentId;
  }
  get filterCriteria(): Maybe<string> {
    return this.props.filterCriteria;
  }

  protected validate(props: CampaignTargetAudienceProps): void {
    Guard.againstNullOrUndefined(props.type, 'Audience type');
    if (
      props.type === 'LEAD_IDS' &&
      (!props.leadIds || props.leadIds.length === 0)
    ) {
      throw new ArgumentNotProvidedException(
        'Lead IDs must be provided for LEAD_IDS audience type.'
      );
    }
    if (props.type === 'SEGMENT_ID' && Guard.isEmpty(props.segmentId)) {
      throw new ArgumentNotProvidedException(
        'Segment ID must be provided for SEGMENT_ID audience type.'
      );
    }
    if (
      props.type === 'FILTER_CRITERIA' &&
      Guard.isEmpty(props.filterCriteria)
    ) {
      throw new ArgumentNotProvidedException(
        'Filter criteria must be provided for FILTER_CRITERIA audience type.'
      );
    }
  }

  public static fromLeadIds(leadIds: LeadId[]): CampaignTargetAudienceVO {
    return new CampaignTargetAudienceVO({ type: 'LEAD_IDS', leadIds });
  }
  public static fromSegmentId(segmentId: string): CampaignTargetAudienceVO {
    return new CampaignTargetAudienceVO({ type: 'SEGMENT_ID', segmentId });
  }
  public static fromFilterCriteria(criteria: string): CampaignTargetAudienceVO {
    return new CampaignTargetAudienceVO({
      type: 'FILTER_CRITERIA',
      filterCriteria: criteria,
    });
  }
}
// RUTA: libs/core/domain/codocampaigns/src/lib/value-objects/campaign-target-audience.vo.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Implementación de `CampaignTargetAudienceVO`.", "justificacion": "Define cómo se segmenta la audiencia de una campaña (lista de IDs, ID de segmento, o criterios de filtro).", "impacto": "Permite definir el público objetivo de las campañas." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [ {"nota": "La validación de `filterCriteria` podría ser más robusta si se parsea el JSON."} ] */
