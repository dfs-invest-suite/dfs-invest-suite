// RUTA: libs/core/application/coapusersroles/src/lib/dtos/user-summary.dto.ts
import { EUserRole } from '@dfs-suite/codousersroles';
import { UserId, EmailString, Maybe } from '@dfs-suite/shtypes';

export interface UserSummaryDto {
  readonly id: UserId;
  readonly name: string;
  readonly email: EmailString;
  readonly role: EUserRole;
  readonly isActive: boolean;
  readonly profilePictureUrl?: Maybe<string>; // Usar string aquí, puede ser UrlString
}
// RUTA: libs/core/application/coapusersroles/src/lib/dtos/user-summary.dto.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `UserSummaryDto`.", "justificacion": "DTO más ligero para listas de usuarios, optimizando la cantidad de datos transferidos.", "impacto": "Eficiencia en listados." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
