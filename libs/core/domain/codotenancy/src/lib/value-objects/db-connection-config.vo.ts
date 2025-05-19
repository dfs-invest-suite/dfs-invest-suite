// libs/core/domain/tenancy/src/lib/value-objects/db-connection-config.vo.ts
import { ValueObject } from '@dfs-suite/core-domain-shared-kernel-value-objects';
import {
  ArgumentNotProvidedException,
  ArgumentInvalidException,
} from '@dfs-suite/shared-errors';
import { Guard } from '@dfs-suite/shared-utils';

/**
 * Props para el Value Object DbConnectionConfigVO.
 * Define la cadena de conexión a la base de datos.
 */
export interface DbConnectionConfigProps {
  readonly connectionString: string;
  // Futuro: Podrían añadirse otros parámetros como tipo de DB (Postgres, MySQL), host, port, user, pass, dbName
  // si se decide no usar una única connectionString. Por ahora, una connectionString es suficiente.
}

export class DbConnectionConfigVO extends ValueObject<DbConnectionConfigProps> {
  constructor(props: DbConnectionConfigProps) {
    super(props);
  }

  /**
   * Getter para la cadena de conexión.
   */
  get connectionString(): string {
    return this.props.connectionString;
  }

  /**
   * Validación específica para DbConnectionConfigVO.
   * Asegura que la cadena de conexión no esté vacía y tenga una longitud mínima razonable.
   * @param props - Las propiedades del Value Object.
   * @throws ArgumentNotProvidedException si la cadena de conexión está vacía.
   * @throws ArgumentInvalidException si la cadena de conexión es demasiado corta.
   */
  protected validate(props: DbConnectionConfigProps): void {
    if (Guard.isEmpty(props.connectionString)) {
      throw new ArgumentNotProvidedException(
        'Connection string cannot be empty.'
      );
    }
    // Una validación muy simple; en un caso real, podría ser más compleja
    // (ej. verificar que siga un patrón de URI de DB conocido).
    if (props.connectionString.length < 10) {
      // Ejemplo arbitrario de longitud mínima
      throw new ArgumentInvalidException(
        'Connection string seems too short to be valid.'
      );
    }
    // Podría intentar parsear la URL para más validación, pero eso puede ser overkill para un VO.
  }

  /**
   * Método factoría estático para crear una instancia de DbConnectionConfigVO.
   * @param connectionString - La cadena de conexión.
   * @returns Una nueva instancia de DbConnectionConfigVO.
   */
  public static create(connectionString: string): DbConnectionConfigVO {
    return new DbConnectionConfigVO({ connectionString });
  }
}

/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Validación de Formato de Connection String): La validación actual solo verifica que no esté vacía y tenga una longitud mínima. Se podría mejorar para validar que la `connectionString` siga un formato de URI de base de datos conocido (ej. `postgresql://user:pass@host:port/dbname`). Esto podría hacerse con una expresión regular o intentando parsearla con una librería de parsing de URLs de DB.
  Justificación: Aumentaría la robustez al asegurar que la cadena de conexión es formalmente correcta antes de intentar usarla.
  Impacto: Complejidad adicional en el método `validate`. Podría requerir una librería externa para un parsing robusto.
]
[
  Mejora Propuesta 2 (Propiedades Detalladas en lugar de Connection String Única): En lugar de una única `connectionString`, `DbConnectionConfigProps` podría definirse con propiedades separadas como `dbType: 'postgres' | 'mysql'`, `host: string`, `port: number`, `username: string`, `password: string` (encriptada o referenciada), `databaseName: string`. El VO podría entonces tener un método para construir la `connectionString` a partir de estas propiedades.
  Justificación: Mayor flexibilidad para manejar diferentes tipos de bases de datos, más fácil de gestionar y validar individualmente cada componente de la conexión. Facilitaría la rotación de credenciales si la contraseña no está directamente en la string.
  Impacto: Cambio significativo en la estructura de `DbConnectionConfigProps` y en la lógica del VO. Requeriría un manejo seguro de la contraseña.
]
[
  Mejora Propuesta 3 (Encriptación de la Connection String en Reposo): Si la `connectionString` completa se almacena, debería estar encriptada en la base de datos de plataforma. Este VO solo manejaría la representación en memoria (desencriptada). La lógica de encriptación/desencriptación residiría en la capa de infraestructura.
  Justificación: Seguridad de datos sensibles.
  Impacto: No afecta directamente a este VO, pero sí a cómo se almacena y se le pasa la `connectionString` al crearlo.
]

*/
