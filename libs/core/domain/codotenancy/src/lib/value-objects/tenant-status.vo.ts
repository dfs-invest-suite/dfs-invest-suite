// RUTA: libs/core/domain/codotenancy/src/lib/value-objects/tenant-status.vo.ts
// Autor: L.I.A Legacy (IA Asistente)
import { ValueObject } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';

export enum TenantStatusEnum {
  PENDING_SETUP = 'PENDING_SETUP',
  ACTIVE = 'ACTIVE',
  SUSPENDED = 'SUSPENDED',
  // PENDING_DELETION = 'PENDING_DELETION', // Futuro
  // INACTIVE = 'INACTIVE', // Futuro
}

export class TenantStatusVO extends ValueObject<TenantStatusEnum> {
  constructor(value: TenantStatusEnum) {
    super({ value });
  }

  public get value(): TenantStatusEnum {
    return this.props.value;
  }

  protected validate(props: { value: TenantStatusEnum }): void {
    if (!Object.values(TenantStatusEnum).includes(props.value)) {
      throw new ArgumentInvalidException(
        `Invalid tenant status: "${
          props.value
        }". Must be one of [${Object.values(TenantStatusEnum).join(', ')}]`
      );
    }
  }

  public static newPendingSetup(): TenantStatusVO {
    return new TenantStatusVO(TenantStatusEnum.PENDING_SETUP);
  }
  public static newActive(): TenantStatusVO {
    return new TenantStatusVO(TenantStatusEnum.ACTIVE);
  }
  public static newSuspended(): TenantStatusVO {
    return new TenantStatusVO(TenantStatusEnum.SUSPENDED);
  }

  public isActive(): boolean {
    return this.props.value === TenantStatusEnum.ACTIVE;
  }
  public isSuspended(): boolean {
    return this.props.value === TenantStatusEnum.SUSPENDED;
  }
  public isPendingSetup(): boolean {
    return this.props.value === TenantStatusEnum.PENDING_SETUP;
  }
}
// RUTA: libs/core/domain/codotenancy/src/lib/value-objects/tenant-status.vo.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Confirmación de imports y lógica.", "justificacion": "El VO del snapshot ya estaba bien estructurado y refactorizado.", "impacto": "Estabilidad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
