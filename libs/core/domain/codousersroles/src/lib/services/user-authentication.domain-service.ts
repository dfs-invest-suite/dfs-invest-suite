// RUTA: libs/core/domain/codousersroles/src/lib/services/user-authentication.domain-service.ts
// Autor: L.I.A Legacy (IA Asistente)
import { Result } from '@dfs-suite/shresult';

import { HashedPasswordVO } from '../value-objects/hashed-password.vo';
// IPasswordHasherPort se importará de infrasecurity cuando se use, aquí solo definimos la interfaz del servicio de dominio.
// import { IPasswordHasherPort } from '@dfs-suite/infrasecurity'; // Ejemplo de dónde vendría

/**
 * Puerto para un servicio de dominio que verifica contraseñas.
 * Este servicio de dominio encapsula la lógica de comparación de contraseñas,
 * pero DELEGA la operación de comparación real (que depende de bcrypt/argon2)
 * a una implementación de `IPasswordHasherPort` proporcionada por la capa de infraestructura.
 */
export interface IUserAuthenticationDomainService {
  verifyPassword(
    plainPassword: string,
    hashedPasswordFromDb: HashedPasswordVO
  ): Promise<Result<boolean, Error>>; // Podría retornar un error específico como InvalidPasswordFormatError
}

export const USER_AUTHENTICATION_DOMAIN_SERVICE_PORT = Symbol(
  'IUserAuthenticationDomainServicePort' // Cambiado para seguir convención de PUERTO
);
// RUTA: libs/core/domain/codousersroles/src/lib/services/user-authentication.domain-service.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Renombrado el Symbol a `USER_AUTHENTICATION_DOMAIN_SERVICE_PORT`.", "justificacion": "Consistencia con la convención de nombrar Symbols de puertos.", "impacto": "Claridad." },
  { "mejora": "JSDoc añadido para explicar el rol del servicio de dominio y su dependencia de un puerto de infraestructura (`IPasswordHasherPort`).", "justificacion": "Clarifica la arquitectura.", "impacto": "Mantenibilidad."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {"nota": "La implementación concreta de `IUserAuthenticationDomainService` (que inyectaría `IPasswordHasherPort`) residiría en la capa de aplicación (`coapusersroles`) o como un adaptador en infraestructura si la lógica es puramente técnica."},
  {"nota": "El `IPasswordHasherPort` se definiría en `libs/infrastructure/infrasecurity/src/lib/ports/` y su implementación (`BcryptPasswordHasherService`) en `libs/infrastructure/infrasecurity/src/lib/services/`."}
]
*/
