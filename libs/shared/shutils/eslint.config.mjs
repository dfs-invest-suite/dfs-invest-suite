// RUTA: libs/shared/shutils/eslint.config.mjs
// TODO: [LIA Legacy - Aplicar eslint.config.mjs para shutils] - ¡REALIZADO!
// Propósito: Configuración ESLint local para la librería shutils.
// Relacionado con Casos de Uso: N/A (configuración).

import baseConfig from '../../../eslint.config.mjs'; // Path relativo a la raíz del monorepo
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monorepoRoot = path.resolve(__dirname, '../../../'); // 3 niveles arriba desde libs/shared/shutils

export default tseslint.config(
  ...baseConfig,
  {
    files: ['libs/shared/shutils/src/lib/**/*.ts'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'libs/shared/shutils/jest.config.ts', // Excluir jest.config.ts de este bloque si tiene su propio parser
      'libs/shared/shutils/src/**/*.spec.ts', // Excluir archivos spec de este bloque, se tratan en el siguiente
      'libs/shared/shutils/src/**/*.test.ts', // Excluir archivos test
    ],
    languageOptions: {
      parserOptions: {
        project: [
          path.join(__dirname, 'tsconfig.lib.json'), // Para el código fuente de la librería
          path.join(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
      },
    },
    rules: {
      // Reglas type-aware específicas para el código fuente de shutils si son necesarias
      // Por ejemplo, si shutils usa promesas de forma intensiva:
      // '@typescript-eslint/no-misused-promises': 'error',
      // '@typescript-eslint/no-floating-promises': 'error',
    },
  },
  {
    // Bloque específico para archivos de test de shutils
    files: [
      'libs/shared/shutils/src/lib/**/*.spec.ts',
      'libs/shared/shutils/src/lib/**/*.test.ts',
    ],
    ignores: ['**/node_modules/**', '**/dist/**'],
    languageOptions: {
      parserOptions: {
        project: [
          path.join(__dirname, 'tsconfig.spec.json'), // Para los archivos de test
          path.join(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
      },
    },
    rules: {
      // Reglas más relajadas para tests si es necesario
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
  }
);
// RUTA: libs/shared/shutils/eslint.config.mjs
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Estructura de `eslint.config.mjs` local para `shutils`.", "justificacion": "Hereda de la configuración raíz y define `parserOptions.project` para habilitar reglas type-aware tanto para el código fuente como para los tests, usando sus respectivos `tsconfig`.", "impacto": "Linting preciso y específico para la librería." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
