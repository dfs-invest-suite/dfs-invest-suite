// RUTA: libs/core/domain/codousersroles/src/lib/services/user-authorization.domain-service.ts
// Autor: L.I.A Legacy (IA Asistente)
import { Result } from '@dfs-suite/shresult';
import { UserId } from '@dfs-suite/shtypes';

import { UserRoleVO } from '../value-objects/user-role.vo';
// import { PermissionVO } from '../value-objects/permission.vo'; // Futuro

/**
 * Puerto para un servicio de dominio que maneja la lógica de autorización base.
 * (Lógica más compleja de RBAC/ABAC puede residir en la capa de aplicación o en un Bounded Context dedicado a IAM).
 */
export interface IUserAuthorizationDomainService {
  canUserPerformAction(
    userRole: UserRoleVO,
    actionIdentifier: string, // ej. 'lead:create', 'tenant:edit_settings'
    resourceOwnerId?: UserId // ej. para verificar si un consultor puede editar SU PROPIO lead
  ): Promise<Result<boolean, Error>>;
}

export const USER_AUTHORIZATION_DOMAIN_SERVICE_PORT = Symbol(
  'IUserAuthorizationDomainServicePort'
);
// RUTA: libs/core/domain/codousersroles/src/lib/services/user-authorization.domain-service.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "**NUEVO ARTEFACTO**: Placeholder para `IUserAuthorizationDomainServicePort`.", "justificacion": "Prepara el terreno para la lógica de autorización basada en roles, separada de la autenticación.", "impacto": "Define un contrato para la verificación de permisos a nivel de dominio/aplicación." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
