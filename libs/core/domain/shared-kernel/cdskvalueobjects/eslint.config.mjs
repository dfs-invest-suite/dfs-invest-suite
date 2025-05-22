// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/eslint.config.mjs
// Autor: L.I.A Legacy (IA Asistente)
import baseConfig from '../../../../../eslint.config.mjs'; // 5 niveles para la raíz
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monorepoRoot = path.resolve(__dirname, '../../../../../');

export default tseslint.config(
  ...baseConfig,
  {
    files: ['libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/**/*.ts'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'libs/core/domain/shared-kernel/cdskvalueobjects/jest.config.ts',
      'libs/core/domain/shared-kernel/cdskvalueobjects/src/**/*.spec.ts',
      'libs/core/domain/shared-kernel/cdskvalueobjects/src/**/*.test.ts',
    ],
    languageOptions: {
      parserOptions: {
        project: [
          path.join(__dirname, 'tsconfig.lib.json'),
          path.join(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
      },
    },
    rules: {
      // Reglas específicas si son necesarias
    },
  },
  {
    files: [
      'libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/**/*.spec.ts',
      'libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/**/*.test.ts',
    ],
    languageOptions: {
      parserOptions: {
        project: [
          path.join(__dirname, 'tsconfig.spec.json'),
          path.join(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      // otras reglas relajadas para tests
    },
  }
);
// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/eslint.config.mjs
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Configuración ESLint local para `cdskvalueobjects`.", "justificacion": "Asegura linting específico para la librería, con `parserOptions.project` para código fuente y tests. Los paths relativos para `baseConfig` y `monorepoRoot` están ajustados a 5 niveles.", "impacto": "Preparación para linting." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
