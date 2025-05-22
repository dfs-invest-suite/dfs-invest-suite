// RUTA: libs/infrastructure/infrasecurity/src/lib/infrasecurity.module.ts
import { Global, Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config'; // Para AesEncryptionService

import { PASSWORD_HASHER_PORT } from '@dfs-suite/codousersroles';
// Definir e importar el puerto IEncryptionService y su token
// Asumiendo que se define en esta misma librería o en una compartida de puertos de infra
export const ENCRYPTION_SERVICE_PORT = Symbol('IEncryptionService');
export interface IEncryptionService {
  encrypt(plainText: string): Promise<Result<string, ExceptionBase>>;
  decrypt(cipherTextWithIv: string): Promise<Result<string, ExceptionBase>>;
}


import { AesEncryptionService } from './services/aes-encryption.service';
import { BcryptPasswordHasherAdapter } from './services/password-hasher.service';
// Importar estrategias Passport y JwtService si se proveen aquí
// import { JwtTenantStrategy } from './passport/jwt-tenant.strategy';
// import { JwtModule } from '@nestjs/jwt';

const passwordHasherProvider: Provider = {
  provide: PASSWORD_HASHER_PORT,
  useClass: BcryptPasswordHasherAdapter,
};

const encryptionServiceProvider: Provider = {
  provide: ENCRYPTION_SERVICE_PORT,
  useClass: AesEncryptionService,
};

@Global()
@Module({
  imports: [
    ConfigModule, // AesEncryptionService necesita ConfigService
    // JwtModule.registerAsync({ ... }), // Si el JWT service de NestJS se configura aquí
  ],
  providers: [
    passwordHasherProvider,
    encryptionServiceProvider,
    // JwtTenantStrategy, // Si se usa
    // ... otros providers de seguridad
  ],
  exports: [
    PASSWORD_HASHER_PORT,
    ENCRYPTION_SERVICE_PORT,
    // JwtTenantStrategy,
    // JwtModule,
  ],
})
export class InfraSecurityModule {}
// FIN DEL ARCHIVO: libs/infrastructure/infrasecurity/src/lib/infrasecurity.module.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  {
    "mejora": "Creado `InfraSecurityModule` que provee `BcryptPasswordHasherAdapter` para `IPasswordHasherPort` y `AesEncryptionService` para `IEncryptionService`.",
    "justificacion": "Módulo funcional para servicios de seguridad esenciales. Se definió el puerto `IEncryptionService` y su token localmente por ahora.",
    "impacto": "Encapsula los adaptadores de seguridad."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Mover la definición de `IEncryptionService` y `ENCRYPTION_SERVICE_PORT` a una librería de puertos de infraestructura compartida si otros módulos de infra lo necesitan.",
    "justificacion": "Mejor organización.",
    "impacto": "Refactorización."
  },
  {
    "mejora": "Integrar y configurar `JwtModule` de `@nestjs/jwt` y las estrategias Passport (`JwtTenantStrategy`, `JwtPlatformAdminStrategy`).",
    "justificacion": "Para la autenticación basada en JWT.",
    "impacto": "Funcionalidad completa de autenticación."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */