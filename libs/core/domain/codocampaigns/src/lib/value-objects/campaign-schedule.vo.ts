// RUTA: libs/core/domain/codocampaigns/src/lib/value-objects/campaign-schedule.vo.ts
import { ValueObject, IDomainPrimitive } from '@dfs-suite/cdskvalueobjects';
import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
} from '@dfs-suite/sherrors';
import { IsoDateString, Maybe } from '@dfs-suite/shtypes';
import { Guard } from '@dfs-suite/shutils';

export interface CampaignScheduleProps {
  readonly scheduledAt: IsoDateString; // Cuándo debe iniciar
  // readonly timezone?: Maybe<string>; // ej. 'America/Sao_Paulo' (importante si las horas son locales)
  // readonly recurringPattern?: Maybe<string>; // ej. cron string para campañas recurrentes (Post-MVP)
}

export class CampaignScheduleVO extends ValueObject<CampaignScheduleProps> {
  protected constructor(props: CampaignScheduleProps) {
    super(props);
  }

  get scheduledAt(): IsoDateString {
    return this.props.scheduledAt;
  }
  // get timezone(): Maybe<string> { return this.props.timezone; }

  protected validate(props: CampaignScheduleProps): void {
    Guard.againstNullOrUndefined(props.scheduledAt, 'ScheduledAt date');
    // Validar que scheduledAt sea una fecha ISO válida y en el futuro
    const scheduleDate = new Date(props.scheduledAt as string);
    if (
      !Guard.isValidDate(scheduleDate) ||
      scheduleDate.getTime() <= Date.now()
    ) {
      // throw new ArgumentInvalidException('ScheduledAt must be a valid date in the future.'); // Descomentar si se requiere futuro estricto
    }
  }

  public static create(
    scheduledAt: IsoDateString /*, timezone?: string */
  ): CampaignScheduleVO {
    // if (timezone && !isValidTimezone(timezone)) throw new ArgumentInvalidException('Invalid timezone');
    return new CampaignScheduleVO({ scheduledAt /*, timezone */ });
  }
}
// RUTA: libs/core/domain/codocampaigns/src/lib/value-objects/campaign-schedule.vo.ts
