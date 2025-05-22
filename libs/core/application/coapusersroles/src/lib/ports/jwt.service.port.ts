// RUTA: libs/core/application/coapusersroles/src/lib/ports/jwt.service.port.ts
import { ExceptionBase } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import {
  JwtString,
  Maybe,
  ObjectLiteral,
  TenantId,
  UserId,
} from '@dfs-suite/shtypes'; // Añadido TenantId

export interface JwtTokenPayload extends ObjectLiteral {
  sub: UserId;
  email: string;
  role: string;
  tenantId: TenantId; // Importante para el contexto del token
}

export interface GeneratedToken {
  accessToken: JwtString;
  refreshToken?: Maybe<JwtString>;
  expiresIn?: Maybe<number>;
}

export interface IJwtServicePortAppLayer {
  generateToken(
    payload: JwtTokenPayload
  ): Promise<Result<GeneratedToken, ExceptionBase | Error>>;
}

export const JWT_SERVICE_APP_PORT = Symbol('IJwtServicePortAppLayer');
// RUTA: libs/core/application/coapusersroles/src/lib/ports/jwt.service.port.ts
/* SECCIÓN DE MEJORAS REALIZADAS: N/A (Archivo nuevo) */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
