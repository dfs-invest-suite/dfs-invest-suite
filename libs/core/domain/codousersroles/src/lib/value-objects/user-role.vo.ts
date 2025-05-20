// RUTA: libs/core/domain/codousersroles/src/lib/value-objects/user-role.vo.ts
// TODO: [LIA Legacy - Implementar UserRoleVO]
// Propósito: Value Object para los roles de usuario dentro de un tenant.
// Relacionado con Casos de Uso: Gestión de Usuarios, Autorización.
import { ValueObject } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';

export enum EUserRole {
  TENANT_ADMIN = 'TENANT_ADMIN',
  SUPERVISOR = 'SUPERVISOR',
  CONSULTANT = 'CONSULTANT',
}

export class UserRoleVO extends ValueObject<EUserRole> {
  constructor(value: EUserRole) {
    super({ value });
  }

  public get value(): EUserRole {
    return this.props.value;
  }

  protected validate(props: { value: EUserRole }): void {
    if (!Object.values(EUserRole).includes(props.value)) {
      throw new ArgumentInvalidException(
        `Invalid user role: "${props.value}".`
      );
    }
  }

  public static newTenantAdmin(): UserRoleVO {
    return new UserRoleVO(EUserRole.TENANT_ADMIN);
  }
  public static newSupervisor(): UserRoleVO {
    return new UserRoleVO(EUserRole.SUPERVISOR);
  }
  public static newConsultant(): UserRoleVO {
    return new UserRoleVO(EUserRole.CONSULTANT);
  }

  public isTenantAdmin(): boolean {
    return this.props.value === EUserRole.TENANT_ADMIN;
  }
  public isSupervisor(): boolean {
    return this.props.value === EUserRole.SUPERVISOR;
  }
  public isConsultant(): boolean {
    return this.props.value === EUserRole.CONSULTANT;
  }
}
