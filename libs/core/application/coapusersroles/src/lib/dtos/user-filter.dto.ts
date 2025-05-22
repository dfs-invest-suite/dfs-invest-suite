// RUTA: libs/core/application/coapusersroles/src/lib/dtos/user-filter.dto.ts
import { EUserRole } from '@dfs-suite/codousersroles';
import { Maybe } from '@dfs-suite/shtypes';

export interface UserFilterAppDto {
  readonly role?: Maybe<EUserRole[]>; // Filtrar por uno o más roles
  readonly isActive?: Maybe<boolean>;
  readonly searchQuery?: Maybe<string>; // Para buscar por nombre o email
}
// RUTA: libs/core/application/coapusersroles/src/lib/dtos/user-filter.dto.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "**NUEVO ARTEFACTO**: Creado `UserFilterAppDto`.", "justificacion": "DTO para los filtros de la query `ListUsersByTenantQuery`.", "impacto": "Permite un filtrado estructurado de usuarios." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
