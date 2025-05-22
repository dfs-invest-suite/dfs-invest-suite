// RUTA: libs/infrastructure/infrasecurity/src/lib/ports/encryption.service.port.ts
import { Result } from '@dfs-suite/shresult';
import { ExceptionBase } from '@dfs-suite/sherrors';

export const ENCRYPTION_SERVICE_PORT = Symbol('IEncryptionService');

export interface IEncryptionService {
  encrypt(plainText: string): Promise<Result<string, ExceptionBase>>;
  decrypt(cipherTextWithIv: string): Promise<Result<string, ExceptionBase>>;
}
// FIN DEL ARCHIVO: libs/infrastructure/infrasecurity/src/lib/ports/encryption.service.port.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  {
    "mejora": "Definición del puerto `IEncryptionService` y su token `ENCRYPTION_SERVICE_PORT`.",
    "justificacion": "Provee una abstracción para los servicios de encriptación/desencriptación. Necesario para `SecureTenantConfigRepositoryAdapter` y `AesEncryptionService`.",
    "impacto": "Contrato claro para la encriptación."
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS: [] */
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
