// RUTA: libs/core/domain/codonotificationscore/eslint.config.mjs
import baseConfig from '../../../../eslint.config.mjs'; // 4 niveles para la raíz
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monorepoRoot = path.resolve(__dirname, '../../../../');

export default tseslint.config(
  ...baseConfig, // Heredar configuración raíz primero
  {
    // Configuración para el código fuente de la librería
    files: ['libs/core/domain/codonotificationscore/src/lib/**/*.ts'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'libs/core/domain/codonotificationscore/jest.config.ts',
      'libs/core/domain/codonotificationscore/src/**/*.spec.ts',
      'libs/core/domain/codonotificationscore/src/**/*.test.ts',
    ],
    languageOptions: {
      parserOptions: {
        project: [
          path.join(__dirname, 'tsconfig.lib.json'),
          path.join(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
      },
      globals: {
        ...globals.node, // Asumiendo que esta librería puede correr en entorno Node
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // Reglas type-aware de tsPlugin.configs['recommended-type-checked'].rules
      // ya deberían estar en baseConfig. Aquí se podrían sobrescribir o añadir.
      // '@typescript-eslint/no-unused-vars': ['warn', { 'argsIgnorePattern': '^_' }], // Ejemplo
    },
  },
  {
    // Configuración para los archivos de test de la librería (si los tuviera)
    files: [
      'libs/core/domain/codonotificationscore/src/lib/**/*.spec.ts',
      'libs/core/domain/codonotificationscore/src/lib/**/*.test.ts',
    ],
    ignores: ['**/node_modules/**', '**/dist/**'],
    languageOptions: {
      parserOptions: {
        project: [
          path.join(__dirname, 'tsconfig.spec.json'),
          path.join(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
      },
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  }
);
// RUTA: libs/core/domain/codonotificationscore/eslint.config.mjs
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Creación del archivo `eslint.config.mjs` local para `codonotificationscore`.", "justificacion": "Establece la configuración de linting específica para esta librería, heredando de la configuración raíz y definiendo los `parserOptions.project` correctos para el código fuente y los futuros tests. Incluye `globals` para Node y Jest.", "impacto": "Permite el linting preciso y la aplicación de reglas type-aware." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
