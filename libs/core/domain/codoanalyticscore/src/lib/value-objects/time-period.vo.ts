// RUTA: libs/core/domain/codoanalyticscore/src/lib/value-objects/time-period.vo.ts
import { ValueObject, IDomainPrimitive } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';
import { IsoDateString } from '@dfs-suite/shtypes';
import { Guard } from '@dfs-suite/shutils';

export enum ETimePeriodPreset {
  TODAY = 'TODAY',
  YESTERDAY = 'YESTERDAY',
  LAST_7_DAYS = 'LAST_7_DAYS',
  LAST_30_DAYS = 'LAST_30_DAYS',
  THIS_MONTH = 'THIS_MONTH',
  LAST_MONTH = 'LAST_MONTH',
  CUSTOM_RANGE = 'CUSTOM_RANGE',
}

export interface TimePeriodProps {
  readonly preset?: ETimePeriodPreset;
  readonly startDate?: IsoDateString; // Requerido si preset es CUSTOM_RANGE
  readonly endDate?: IsoDateString; // Requerido si preset es CUSTOM_RANGE
}

export class TimePeriodVO extends ValueObject<TimePeriodProps> {
  protected constructor(props: TimePeriodProps) {
    super(props);
  }

  // Getters...

  protected validate(props: TimePeriodProps): void {
    if (props.preset === ETimePeriodPreset.CUSTOM_RANGE) {
      Guard.againstNullOrUndefined(
        props.startDate,
        'startDate for CUSTOM_RANGE'
      );
      Guard.againstNullOrUndefined(props.endDate, 'endDate for CUSTOM_RANGE');
      // Aquí debería ir la validación de que startDate sea anterior a endDate
      // y que sean fechas ISO válidas (aunque IsoDateString ya lo implica)
      const start = new Date(props.startDate as string);
      const end = new Date(props.endDate as string);
      if (!Guard.isValidDate(start) || !Guard.isValidDate(end) || start > end) {
        throw new ArgumentInvalidException(
          'Invalid custom date range for TimePeriodVO.'
        );
      }
    } else if (!props.preset) {
      throw new ArgumentInvalidException(
        'TimePeriodVO requires a preset or a custom range.'
      );
    }
  }

  public static create(props: TimePeriodProps): TimePeriodVO {
    return new TimePeriodVO(props);
  }

  public static fromPreset(preset: ETimePeriodPreset): TimePeriodVO {
    if (preset === ETimePeriodPreset.CUSTOM_RANGE) {
      throw new ArgumentInvalidException(
        'Cannot create TimePeriodVO from CUSTOM_RANGE preset without dates. Use create() with startDate and endDate.'
      );
    }
    return new TimePeriodVO({ preset });
  }
}
// RUTA: libs/core/domain/codoanalyticscore/src/lib/value-objects/time-period.vo.ts
