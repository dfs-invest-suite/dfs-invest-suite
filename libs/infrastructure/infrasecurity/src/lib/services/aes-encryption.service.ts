// RUTA: libs/infrastructure/infrasecurity/src/lib/services/aes-encryption.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as crypto from 'node:crypto';

import { IEncryptionService } from '@dfs-suite/infrasecurity'; // Asumiendo que el puerto se define aquí
import { Result, ok, err } from '@dfs-suite/shresult';
import {
  ExceptionBase,
  InternalServerErrorException,
} from '@dfs-suite/sherrors';

@Injectable()
export class AesEncryptionService implements IEncryptionService {
  private readonly logger = new Logger(AesEncryptionService.name);
  private readonly algorithm = 'aes-256-cbc';
  private key: Buffer; // Derivada del PMEK
  private readonly ivLength = 16; // Para AES

  constructor(private readonly configService: ConfigService) {
    const pmek = this.configService.get<string>(
      'PLATFORM_MASTER_ENCRYPTION_KEY'
    );
    if (!pmek || pmek.length < 32) {
      // Asegurar longitud mínima para una clave segura
      this.logger.error(
        'PLATFORM_MASTER_ENCRYPTION_KEY is not defined or is too short in environment variables. Must be at least 32 chars for AES-256.'
      );
      throw new InternalServerErrorException(
        'Encryption service cannot be initialized: PMEK missing or too short.'
      );
    }
    // Usar una función de derivación de clave (KDF) como PBKDF2 o scrypt para obtener la clave real
    // Aquí, por simplicidad, solo tomamos los primeros 32 bytes si es más larga, o la usamos si es exacta.
    // ¡ESTO NO ES SEGURO PARA PRODUCCIÓN SIN UN KDF!
    this.key = Buffer.from(pmek.slice(0, 32), 'utf-8');
  }

  async encrypt(plainText: string): Promise<Result<string, ExceptionBase>> {
    try {
      const iv = crypto.randomBytes(this.ivLength);
      const cipher = crypto.createCipheriv(this.algorithm, this.key, iv);
      let encrypted = cipher.update(plainText, 'utf8', 'hex');
      encrypted += cipher.final('hex');
      // Prepend IV para usarlo en la desencriptación
      return ok(iv.toString('hex') + ':' + encrypted);
    } catch (e: any) {
      this.logger.error(`Encryption failed: ${e.message}`, e.stack);
      return err(
        new InternalServerErrorException('Encryption process failed.', e)
      );
    }
  }

  async decrypt(
    cipherTextWithIv: string
  ): Promise<Result<string, ExceptionBase>> {
    try {
      const parts = cipherTextWithIv.split(':');
      if (parts.length !== 2) {
        throw new Error('Invalid ciphertext format (missing IV).');
      }
      const iv = Buffer.from(parts[0], 'hex');
      const encryptedText = parts[1];

      const decipher = crypto.createDecipheriv(this.algorithm, this.key, iv);
      let decrypted = decipher.update(encryptedText, 'hex', 'utf8');
      decrypted += decipher.final('utf8');
      return ok(decrypted);
    } catch (e: any) {
      this.logger.error(`Decryption failed: ${e.message}`, e.stack);
      return err(
        new InternalServerErrorException('Decryption process failed.', e)
      );
    }
  }
}
// FIN DEL ARCHIVO: libs/infrastructure/infrasecurity/src/lib/services/aes-encryption.service.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  {
    "mejora": "Implementación básica de `AesEncryptionService` para `IEncryptionService`.",
    "justificacion": "Provee encriptación y desencriptación AES-256-CBC usando el PMEK de las variables de entorno. El IV se genera aleatoriamente y se prepende al ciphertext.",
    "impacto": "Servicio funcional para encriptar datos sensibles. **NOTA DE SEGURIDAD IMPORTANTE: La forma en que se deriva `this.key` del PMEK aquí es una simplificación y NO es segura para producción sin una función de derivación de clave (KDF) adecuada como PBKDF2 o scrypt.**"
  }
]
*/
/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Usar una función de derivación de clave (KDF) robusta como PBKDF2 o scrypt para generar la clave de encriptación a partir del PMEK.",
    "justificacion": "Práctica de seguridad estándar para proteger el PMEK y generar claves de encriptación fuertes.",
    "impacto": "Aumenta significativamente la seguridad."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
