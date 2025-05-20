// RUTA: libs/core/domain/shared-kernel/cdskports/src/lib/config.port.ts
// TODO: [LIA Legacy - Definir IConfigPort] - ¡REALIZADO!
// Propósito: Un puerto genérico para acceder a configuraciones de la aplicación/plataforma
//            que no están ligadas a un tenant o dominio específico (ej. URLs de servicios
//            externos globales, feature flags globales, configuración de logging/observabilidad).
//            Distinto de ITenantConfigRepositoryPort que es para configs por tenant.
// Relacionado con Casos de Uso: Inicialización de servicios de infraestructura, lógica condicional basada en feature flags.

import { ExceptionBase, NotFoundException } from '@dfs-suite/sherrors'; // REFACTORIZADO
import { Result } from '@dfs-suite/shresult'; // REFACTORIZADO
import { Maybe } from '@dfs-suite/shtypes'; // REFACTORIZADO

export const CONFIG_PORT = Symbol('IConfigPort');

export interface IConfigPort {
  /**
   * Obtiene un valor de configuración.
   * @param key La clave de la configuración.
   * @returns Un Result con el valor (Maybe<T>) o un error si la clave es requerida y no encontrada.
   *          Puede devolver `ok(undefined)` si la clave es opcional y no está definida.
   */
  get<T = string>(
    key: string
  ): Result<Maybe<T>, NotFoundException | ExceptionBase>;

  /**
   * Obtiene un valor de configuración o lanza una excepción si no se encuentra.
   * @param key La clave de la configuración.
   * @returns El valor de configuración de tipo T.
   * @throws NotFoundException si la clave no se encuentra.
   * @throws ExceptionBase para otros errores de configuración.
   */
  getOrThrow<T = string>(key: string): T; // Este método no devuelve Result, lanza directamente.

  /**
   * Verifica si una feature flag global está habilitada.
   * @param featureFlagKey La clave de la feature flag.
   * @returns True si está habilitada, false en caso contrario.
   */
  isFeatureEnabled(featureFlagKey: string): boolean;
}
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Refactorización de imports a alias codificados.", "justificacion": "Alineación.", "impacto": "Resolución." },
  { "mejora": "Definición clara de `IConfigPort` con métodos `get`, `getOrThrow`, y `isFeatureEnabled`.", "justificacion": "Provee un contrato para acceder a configuraciones globales de forma segura y tipada.", "impacto": "Establece la abstracción para la gestión de configuración de plataforma." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "La implementación de este puerto (ej. `NestConfigAdapter` en `libs/infrastructure/config/` o directamente en `api-main` usando `@nestjs/config`) se encargará de leer las variables de entorno o archivos de configuración." },
  { "nota": "Para `isFeatureEnabled`, la implementación podría integrarse con un sistema de feature flags como Flagsmith o LaunchDarkly." }
]
*/
// RUTA: libs/core/domain/shared-kernel/cdskports/src/lib/config.port.ts
