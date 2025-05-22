// RUTA: libs/core/domain/codousersroles/src/lib/value-objects/user-role.vo.ts
// Autor: L.I.A Legacy (IA Asistente)
import { ValueObject } from '@dfs-suite/cdskvalueobjects';
import { ArgumentInvalidException } from '@dfs-suite/sherrors';

// Roles específicos para usuarios DENTRO de un tenant
export enum EUserRole {
  TENANT_ADMIN = 'TENANT_ADMIN', // Administrador del tenant, puede gestionar otros usuarios del tenant
  SUPERVISOR = 'SUPERVISOR', // Supervisor de equipo, puede ver leads de su equipo
  CONSULTANT = 'CONSULTANT', // Consultor/Agente, solo ve sus propios leads
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
        `Invalid user role: "${props.value}". Must be one of [${Object.values(
          EUserRole
        ).join(', ')}]`
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

  // Métodos helper
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
// RUTA: libs/core/domain/codousersroles/src/lib/value-objects/user-role.vo.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Imports refactorizados.", "justificacion": "Consistencia.", "impacto": "Resolución." },
  { "mejora": "JSDoc y comentarios añadidos para clarificar los roles.", "justificacion": "Mejora la comprensión del dominio.", "impacto": "Mantenibilidad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
