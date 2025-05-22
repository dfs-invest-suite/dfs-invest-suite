// RUTA: libs/core/domain/shared-kernel/cdskports/src/lib/config.port.ts
// Autor: L.I.A Legacy (IA Asistente)
import { ExceptionBase, NotFoundException } from '@dfs-suite/sherrors';
import { Result } from '@dfs-suite/shresult';
import { Maybe } from '@dfs-suite/shtypes';

export const CONFIG_PORT = Symbol('IConfigPort');

/**
 * Puerto (Interfaz) para acceder a configuraciones globales de la aplicación/plataforma.
 * Estas son configuraciones que no están ligadas a un tenant específico,
 * como URLs de servicios externos globales, feature flags de plataforma,
 * o configuraciones de logging/observabilidad.
 *
 * Es distinto de `ITenantConfigRepositoryPort`, que maneja configuraciones
 * específicas por tenant.
 */
export interface IConfigPort {
  /**
   * Obtiene un valor de configuración de forma segura.
   * @template T - El tipo esperado del valor de configuración.
   * @param key La clave única de la configuración (ej. "EXTERNAL_SERVICE_API_URL", "LOG_LEVEL").
   * @returns Un `Result` que contiene `Maybe<T>` (el valor si se encuentra y es del tipo esperado,
   *          o `null`/`undefined` si es opcional y no está definido) en caso de éxito,
   *          o un `NotFoundException` si la clave es requerida pero no se encuentra,
   *          o un `ExceptionBase` para otros errores de configuración (ej. error de parseo).
   */
  get<T = string>(
    key: string
  ): Result<Maybe<T>, NotFoundException | ExceptionBase | Error>;

  /**
   * Obtiene un valor de configuración. Lanza una excepción si la clave no se encuentra
   * o si el valor no puede ser convertido al tipo esperado.
   * Usar con precaución, preferiblemente para configuraciones críticas que deben existir.
   *
   * @template T - El tipo esperado del valor de configuración.
   * @param key La clave de la configuración.
   * @returns El valor de configuración de tipo T.
   * @throws `NotFoundException` si la clave no se encuentra.
   * @throws `ArgumentInvalidException` o `ExceptionBase` si el valor no puede ser convertido a `T` o hay otro error.
   */
  getOrThrow<T = string>(key: string): T;

  /**
   * Verifica si una feature flag global de la plataforma está habilitada.
   * @param featureFlagKey La clave de la feature flag (ej. "ENABLE_NEW_BILLING_MODULE").
   * @returns `true` si la feature flag está habilitada, `false` en caso contrario o si no se encuentra.
   *          Debería devolver `false` de forma segura si la flag no está definida.
   */
  isFeatureEnabled(featureFlagKey: string): boolean;
}
// RUTA: libs/core/domain/shared-kernel/cdskports/src/lib/config.port.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Imports actualizados a alias codificados.", "justificacion": "Consistencia.", "impacto": "Resolución." },
  { "mejora": "JSDoc detallado para `IConfigPort` y sus métodos.", "justificacion": "Clarifica el propósito de este puerto para configuraciones globales vs. configuraciones de tenant, y el comportamiento esperado de cada método.", "impacto": "Mantenibilidad y DX." },
  { "mejora": "Retorno de `Result` en `get<T>()`.", "justificacion": "Permite un manejo de errores más explícito para el llamador.", "impacto": "Robustez." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
