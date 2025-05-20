// RUTA: libs/infrastructure/infrasecurity/src/lib/passport/jwt-platform-admin.strategy.ts
// TODO: [LIA Legacy - Implementar JwtPlatformAdminStrategy]
// Propósito: Estrategia Passport para validar JWTs de administradores de la plataforma dfs-invest-suite.
// Usará una clave secreta/pública diferente a la de los tenants.
// import { Strategy, ExtractJwt } from 'passport-jwt';
// import { PassportStrategy } from '@nestjs/passport';
// import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config'; // Para obtener el secret

// @Injectable()
// export class JwtPlatformAdminStrategy extends PassportStrategy(Strategy, 'jwt-platform-admin') {
//   constructor(configService: ConfigService) {
//     super({
//       jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//       ignoreExpiration: false,
//       secretOrKey: configService.getOrThrow<string>('PLATFORM_ADMIN_JWT_SECRET'),
//       // audience: 'platform-admin-api', // Opcional
//     });
//   }
//   async validate(payload: any) { // payload = { platformAdminId: string, role: string, ... }
//     return { platformAdminId: payload.sub, username: payload.username, role: payload.role };
//   }
// }
