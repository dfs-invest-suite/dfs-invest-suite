// RUTA: libs/core/application/coapusersroles/src/lib/dtos/user-authentication.dto.ts
import { EmailString, JwtString } from '@dfs-suite/shtypes';

import { UserDetailsDto } from './user-details.dto'; // Usar UserDetailsDto para el usuario

export interface UserAuthenticationRequestDto {
  readonly email: EmailString;
  readonly password: string;
}

export interface AuthPayloadDto {
  readonly user: UserDetailsDto; // Contiene todos los detalles del usuario
  readonly accessToken: JwtString;
  readonly refreshToken?: JwtString; // Opcional, si se implementan refresh tokens
  readonly expiresIn?: number; // Opcional, en segundos
}
// RUTA: libs/core/application/coapusersroles/src/lib/dtos/user-authentication.dto.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Definición de `UserAuthenticationRequestDto` y `AuthPayloadDto`.", "justificacion": "DTOs para el flujo de login. `AuthPayloadDto` ahora incluye `UserDetailsDto` completo para el usuario y campos opcionales para `refreshToken` y `expiresIn`.", "impacto": "Estructuras de datos claras para la autenticación." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
