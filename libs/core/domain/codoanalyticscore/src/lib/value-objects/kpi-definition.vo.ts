// RUTA: libs/core/domain/codoanalyticscore/src/lib/value-objects/kpi-definition.vo.ts
import { ValueObject } from '@dfs-suite/cdskvalueobjects';
import { ArgumentNotProvidedException } from '@dfs-suite/sherrors';
import { Maybe } from '@dfs-suite/shtypes';
import { Guard } from '@dfs-suite/shutils';

export type KpiDataType = 'NUMBER' | 'PERCENTAGE' | 'CURRENCY' | 'DURATION';
export type KpiTrendIndicator = 'UP_IS_GOOD' | 'DOWN_IS_GOOD' | 'NEUTRAL';

export interface KpiDefinitionProps {
  readonly kpiKey: string; // Identificador único del KPI, ej: "LEAD_CONVERSION_RATE"
  readonly displayName: string; // Nombre legible, ej: "Tasa de Conversión de Leads"
  readonly description?: Maybe<string>;
  readonly dataType: KpiDataType;
  readonly trendIndicator?: Maybe<KpiTrendIndicator>; // Cómo interpretar si el valor sube o baja
  readonly unit?: Maybe<string>; // ej: "%", "leads", "BRL", "días"
  // calculationLogicRef?: string; // Referencia a la lógica/query que lo calcula (informativo)
  // targetValue?: Maybe<number>; // Objetivo para este KPI
}

export class KpiDefinitionVO extends ValueObject<KpiDefinitionProps> {
  protected constructor(props: KpiDefinitionProps) {
    super(props);
  }

  // Getters...
  get kpiKey(): string {
    return this.props.kpiKey;
  }
  get displayName(): string {
    return this.props.displayName;
  }

  protected validate(props: KpiDefinitionProps): void {
    Guard.againstNullOrUndefinedBulk([
      { argument: props.kpiKey, argumentName: 'kpiKey' },
      { argument: props.displayName, argumentName: 'displayName' },
      { argument: props.dataType, argumentName: 'dataType' },
    ]);
    if (Guard.isEmpty(props.kpiKey.trim()))
      throw new ArgumentNotProvidedException('KPI key cannot be empty.');
    if (Guard.isEmpty(props.displayName.trim()))
      throw new ArgumentNotProvidedException(
        'KPI display name cannot be empty.'
      );
  }

  public static create(props: KpiDefinitionProps): KpiDefinitionVO {
    return new KpiDefinitionVO({
      ...props,
      kpiKey: props.kpiKey.trim().toUpperCase().replace(/\s+/g, '_'), // Normalizar kpiKey
      displayName: props.displayName.trim(),
    });
  }
}
// RUTA: libs/core/domain/codoanalyticscore/src/lib/value-objects/kpi-definition.vo.ts
