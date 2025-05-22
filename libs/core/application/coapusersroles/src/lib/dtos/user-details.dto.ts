// RUTA: libs/core/application/coapusersroles/src/lib/dtos/user-details.dto.ts
import { EUserRole } from '@dfs-suite/codousersroles';
import {
  UserId,
  TenantId,
  EmailString,
  IsoDateString,
  Maybe,
  UrlString,
} from '@dfs-suite/shtypes';

export interface UserDetailsDto {
  readonly id: UserId;
  readonly tenantId: TenantId; // Es importante incluirlo para el cliente
  readonly email: EmailString;
  readonly name: string;
  readonly role: EUserRole;
  readonly isActive: boolean;
  readonly createdAt: IsoDateString;
  readonly updatedAt: IsoDateString;
  readonly lastLoginAt?: Maybe<IsoDateString>;
  readonly profilePictureUrl?: Maybe<UrlString>;
}
// RUTA: libs/core/application/coapusersroles/src/lib/dtos/user-details.dto.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `UserDetailsDto`.", "justificacion": "DTO para representar la información completa de un usuario, incluyendo `tenantId` para contexto.", "impacto": "Estructura de datos de respuesta estándar para usuarios." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
