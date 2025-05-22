// RUTA: libs/core/domain/codoantiban/src/lib/value-objects/operational-status.vo.ts
import { ValueObject, IDomainPrimitive } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';

export enum EOperationalStatus {
  PENDING_VALIDATION = 'PENDING_VALIDATION', // Nuevo, antes de cualquier verificación o uso
  ACTIVE = 'ACTIVE', // Listo para enviar, dentro de límites y calidad
  WARMUP = 'WARMUP', // En proceso de calentamiento, enviar con precaución
  COOLDOWN = 'COOLDOWN', // Enfriamiento después de un problema, envío muy restringido o pausado
  SUSPENDED_BY_DFS = 'SUSPENDED_BY_DFS', // Suspendido manualmente por admin de DFS o por reglas internas críticas
  SUSPENDED_BY_META = 'SUSPENDED_BY_META', // Meta ha restringido/baneado el número
  REQUIRES_REVERIFICATION = 'REQUIRES_REVERIFICATION', // Ej. si se desconecta o necesita re-verificar
  DELETED = 'DELETED', // Eliminado de la plataforma
}

export class OperationalStatusVO extends ValueObject<EOperationalStatus> {
  constructor(value: EOperationalStatus) {
    super({ value });
  }
  get value(): EOperationalStatus {
    return this.props.value;
  }

  protected validate(props: IDomainPrimitive<EOperationalStatus>): void {
    if (!Object.values(EOperationalStatus).includes(props.value)) {
      throw new ArgumentInvalidException(
        `Invalid operational status: "${props.value}".`
      );
    }
  }
  public static newPendingValidation(): OperationalStatusVO {
    return new OperationalStatusVO(EOperationalStatus.PENDING_VALIDATION);
  }
  public static newActive(): OperationalStatusVO {
    return new OperationalStatusVO(EOperationalStatus.ACTIVE);
  }
  public static newWarmup(): OperationalStatusVO {
    return new OperationalStatusVO(EOperationalStatus.WARMUP);
  }
  public static newCooldown(): OperationalStatusVO {
    return new OperationalStatusVO(EOperationalStatus.COOLDOWN);
  }
  public static newSuspendedByDfs(): OperationalStatusVO {
    return new OperationalStatusVO(EOperationalStatus.SUSPENDED_BY_DFS);
  }
  public static newSuspendedByMeta(): OperationalStatusVO {
    return new OperationalStatusVO(EOperationalStatus.SUSPENDED_BY_META);
  }

  public isActive(): boolean {
    return this.props.value === EOperationalStatus.ACTIVE;
  }
  public isWarmup(): boolean {
    return this.props.value === EOperationalStatus.WARMUP;
  }
  public isSuspended(): boolean {
    return (
      this.props.value === EOperationalStatus.SUSPENDED_BY_DFS ||
      this.props.value === EOperationalStatus.SUSPENDED_BY_META
    );
  }
}
// RUTA: libs/core/domain/codoantiban/src/lib/value-objects/operational-status.vo.ts
