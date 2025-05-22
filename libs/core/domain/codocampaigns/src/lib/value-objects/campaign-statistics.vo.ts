// RUTA: libs/core/domain/codocampaigns/src/lib/value-objects/campaign-statistics.vo.ts
import { ValueObject, IDomainPrimitive } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';
import { Guard } from '@dfs-suite/shutils';

export interface CampaignStatisticsProps {
  readonly totalLeads: number;
  readonly processedLeads: number; // Leads para los que se intentó enviar
  readonly successfullySent: number; // Mensajes confirmados como enviados a la API de WA
  readonly failedToSend: number; // Fallos antes de llegar a WA (ej. Anti-Ban, error API)
  readonly deliveredToUser?: number;
  readonly readByUser?: number;
  readonly optOuts?: number; // Leads que se dieron de baja por esta campaña
}

export class CampaignStatisticsVO extends ValueObject<CampaignStatisticsProps> {
  protected constructor(props: CampaignStatisticsProps) {
    super(props);
  }

  // Getters...
  get totalLeads(): number {
    return this.props.totalLeads;
  }
  get processedLeads(): number {
    return this.props.processedLeads;
  }
  // ...

  protected validate(props: CampaignStatisticsProps): void {
    const nonNegativeFields: (keyof CampaignStatisticsProps)[] = [
      'totalLeads',
      'processedLeads',
      'successfullySent',
      'failedToSend',
      'deliveredToUser',
      'readByUser',
      'optOuts',
    ];
    for (const field of nonNegativeFields) {
      const value = props[field];
      if (
        value !== undefined &&
        (Guard.isNil(value) ||
          !Guard.isNumber(value) ||
          value < 0 ||
          !Number.isInteger(value))
      ) {
        throw new ArgumentInvalidException(
          `${field} must be a non-negative integer if provided.`
        );
      }
    }
    if (props.processedLeads > props.totalLeads) {
      throw new ArgumentInvalidException(
        'Processed leads cannot exceed total leads.'
      );
    }
    if (props.successfullySent > props.processedLeads) {
      throw new ArgumentInvalidException(
        'Successfully sent cannot exceed processed leads.'
      );
    }
  }

  public static initial(totalLeads: number = 0): CampaignStatisticsVO {
    return new CampaignStatisticsVO({
      totalLeads,
      processedLeads: 0,
      successfullySent: 0,
      failedToSend: 0,
      deliveredToUser: 0,
      readByUser: 0,
      optOuts: 0,
    });
  }

  public incrementProcessed(count = 1): CampaignStatisticsVO {
    return new CampaignStatisticsVO({
      ...this.props,
      processedLeads: this.props.processedLeads + count,
    });
  }
  public incrementSent(count = 1): CampaignStatisticsVO {
    return new CampaignStatisticsVO({
      ...this.props,
      successfullySent: this.props.successfullySent + count,
    });
  }
  // ... otros métodos para incrementar contadores
}
// RUTA: libs/core/domain/codocampaigns/src/lib/value-objects/campaign-statistics.vo.ts
