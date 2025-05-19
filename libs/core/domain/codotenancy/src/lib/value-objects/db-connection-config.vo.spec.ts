// libs/core/domain/tenancy/src/lib/value-objects/db-connection-config.vo.spec.ts
import {
  ArgumentInvalidException,
  ArgumentNotProvidedException,
} from '@dfs-suite/shared-errors';
import {
  DbConnectionConfigVO,
  DbConnectionConfigProps,
} from './db-connection-config.vo';

describe('DbConnectionConfigVO', () => {
  const validConnectionString = 'postgresql://user:pass@host:port/dbname';
  const shortConnectionString = 'pg://db'; // Menos de 10 caracteres

  describe('creation', () => {
    it('should create a DbConnectionConfigVO with a valid connection string', () => {
      const props: DbConnectionConfigProps = {
        connectionString: validConnectionString,
      };
      const configVo = new DbConnectionConfigVO(props);
      expect(configVo).toBeInstanceOf(DbConnectionConfigVO);
      expect(configVo.connectionString).toBe(validConnectionString);
    });

    it('should create a DbConnectionConfigVO using the static factory method', () => {
      const configVo = DbConnectionConfigVO.create(validConnectionString);
      expect(configVo).toBeInstanceOf(DbConnectionConfigVO);
      expect(configVo.connectionString).toBe(validConnectionString);
    });

    it('should throw ArgumentNotProvidedException if connection string is empty', () => {
      const props: DbConnectionConfigProps = { connectionString: '' };
      expect(() => new DbConnectionConfigVO(props)).toThrow(
        ArgumentNotProvidedException
      );
      expect(() => new DbConnectionConfigVO(props)).toThrow(
        'Connection string cannot be empty.'
      );
    });

    it('should throw ArgumentNotProvidedException if connection string is only whitespace', () => {
      const props: DbConnectionConfigProps = { connectionString: '   ' };
      // Nota: Guard.isEmpty trimea, por lo que esto se considera vacío.
      expect(() => new DbConnectionConfigVO(props)).toThrow(
        ArgumentNotProvidedException
      );
    });

    it('should throw ArgumentInvalidException if connection string is too short', () => {
      const props: DbConnectionConfigProps = {
        connectionString: shortConnectionString,
      };
      expect(() => new DbConnectionConfigVO(props)).toThrow(
        ArgumentInvalidException
      );
      expect(() => new DbConnectionConfigVO(props)).toThrow(
        'Connection string seems too short to be valid.'
      );
    });
  });

  describe('equality', () => {
    it('should be equal to another DbConnectionConfigVO with the same connection string', () => {
      const configVo1 = DbConnectionConfigVO.create(validConnectionString);
      const configVo2 = DbConnectionConfigVO.create(validConnectionString);
      expect(configVo1.equals(configVo2)).toBe(true);
    });

    it('should not be equal to another DbConnectionConfigVO with a different connection string', () => {
      const configVo1 = DbConnectionConfigVO.create(validConnectionString);
      const configVo2 = DbConnectionConfigVO.create(
        'postgresql://another:string@host/db'
      );
      expect(configVo1.equals(configVo2)).toBe(false);
    });

    it('should not be equal to undefined or null', () => {
      const configVo1 = DbConnectionConfigVO.create(validConnectionString);
      expect(configVo1.equals(undefined)).toBe(false);
      expect(configVo1.equals(null)).toBe(false);
    });
  });

  describe('unpack', () => {
    it('should return the props object when unpacked', () => {
      const props: DbConnectionConfigProps = {
        connectionString: validConnectionString,
      };
      const configVo = new DbConnectionConfigVO(props);
      // Como DbConnectionConfigProps no es un primitivo, unpack() devuelve el objeto de props
      expect(configVo.unpack()).toEqual(props);
    });
  });
});

/* SECCIÓN DE MEJORAS FUTURAS (para este archivo de test)

[
  Mejora Propuesta 1 (Casos de Test de Validación Adicionales): Si la lógica de validación en `DbConnectionConfigVO.validate()` se expande (ej. para validar el formato de la URI de conexión), se deberían añadir más casos de test para cubrir esas nuevas reglas de validación.
  Justificación: Asegurar que todas las reglas de validación, incluso las más complejas, se prueben adecuadamente.
  Impacto: Añadir más escenarios `it(...)` a la suite de tests.
]
[
  Mejora Propuesta 2 (Tests para Propiedades Detalladas): Si se adopta la "Mejora Propuesta 2" para `DbConnectionConfigVO` (usar propiedades detalladas en lugar de una única `connectionString`), los tests deberían actualizarse para reflejar la nueva estructura de `props` y validar cada propiedad individualmente, así como la lógica de construcción de la `connectionString` si se mantiene.
  Justificación: Alinear los tests con la evolución del diseño del Value Object.
  Impacto: Refactorización significativa de los tests existentes y adición de nuevos casos.
]

*/
