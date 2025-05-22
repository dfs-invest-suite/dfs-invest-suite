// RUTA: libs/core/domain/codoantiban/src/lib/value-objects/health-score.vo.ts
import { ValueObject, IDomainPrimitive } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';

export class HealthScoreVO extends ValueObject<number> {
  private constructor(props: IDomainPrimitive<number>) {
    super(props);
  }

  get value(): number {
    return this.props.value;
  }

  protected validate(props: IDomainPrimitive<number>): void {
    if (props.value < 0 || props.value > 100) {
      throw new ArgumentInvalidException(
        'Health score must be between 0 and 100.'
      );
    }
  }

  public static create(score: number): HealthScoreVO {
    const validatedScore = Math.max(0, Math.min(100, Math.round(score)));
    return new HealthScoreVO({ value: validatedScore });
  }

  public static initial(): HealthScoreVO {
    return new HealthScoreVO({ value: 75 }); // Default initial score
  }

  public isGood(): boolean {
    return this.props.value >= 70;
  }
  public isWarning(): boolean {
    return this.props.value >= 40 && this.props.value < 70;
  }
  public isCritical(): boolean {
    return this.props.value < 40;
  }
}
// RUTA: libs/core/domain/codoantiban/src/lib/value-objects/health-score.vo.ts
