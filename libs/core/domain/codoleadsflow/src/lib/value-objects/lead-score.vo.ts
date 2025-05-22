// libs/core/domain/codoleadsflow/src/lib/value-objects/lead-score.vo.ts
import { ValueObject, IDomainPrimitive } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';

export class LeadScoreVO extends ValueObject<number> {
  private constructor(value: number) { // Constructor toma el primitivo
    super({ value }); // Pasa como objeto a la clase base
  }

  get value(): number {
    return this.props.value;
  }

  protected validate(props: IDomainPrimitive<number>): void {
    if (props.value < 0 || props.value > 1000) {
      throw new ArgumentInvalidException(
        'Lead score must be between 0 and 1000.'
      );
    }
    if (!Number.isInteger(props.value)) {
      throw new ArgumentInvalidException('Lead score must be an integer.');
    }
  }

  public static create(score: number): LeadScoreVO {
    const validatedScore = Math.max(0, Math.min(1000, Math.round(score)));
    return new LeadScoreVO(validatedScore);
  }

  public static default(): LeadScoreVO {
    return new LeadScoreVO(0);
  }

  public isHot(): boolean { return this.props.value >= 750; }
  public isWarm(): boolean { return this.props.value >= 400 && this.props.value < 750; }
  public isCold(): boolean { return this.props.value < 400; }
}
// FIN DEL ARCHIVO: libs/core/domain/codoleadsflow/src/lib/value-objects/lead-score.vo.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Constructor de `LeadScoreVO` ahora toma el `number` directamente y llama a `super({ value })`.", "justificacion": "Alinea con la forma en que `ValueObject<TProps>` espera las props cuando `TProps` es un tipo primitivo.", "impacto": "Resuelve el error `TS2339: Property 'props' does not exist` y permite que `get value()` y `validate()` funcionen correctamente." }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */