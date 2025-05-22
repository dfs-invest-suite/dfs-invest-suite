// RUTA: libs/core/application/coapusersroles/src/lib/dtos/user-creation.dto.ts
import { EUserRole } from '@dfs-suite/codousersroles';
import { EmailString } from '@dfs-suite/shtypes';

export interface UserCreationAppDto {
  // El tenantId vendrá del contexto (JWT del admin que crea)
  // El createdByUserId vendrá del contexto (JWT del admin que crea)
  readonly email: EmailString;
  readonly name: string;
  readonly role: EUserRole;
  readonly password: string; // Contraseña en texto plano
}
// RUTA: libs/core/application/coapusersroles/src/lib/dtos/user-creation.dto.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `UserCreationAppDto`.", "justificacion": "DTO para el payload de entrada del `CreateUserUseCase`. No incluye `tenantId` ni `createdByUserId` ya que estos se obtendrán del contexto de la solicitud o del usuario autenticado que realiza la acción.", "impacto": "Contrato de datos claro para la creación de usuarios desde la API." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
