// RUTA: libs/shared/shvalidationschemas/eslint.config.mjs
// Autor: L.I.A Legacy (IA Asistente)
import baseConfig from '../../../eslint.config.mjs';
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monorepoRoot = path.resolve(__dirname, '../../../');

export default tseslint.config(
  ...baseConfig,
  {
    files: ['libs/shared/shvalidationschemas/src/lib/**/*.ts'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'libs/shared/shvalidationschemas/jest.config.ts',
      'libs/shared/shvalidationschemas/src/**/*.spec.ts',
      'libs/shared/shvalidationschemas/src/**/*.test.ts',
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
      // Reglas específicas para shvalidationschemas si son necesarias
    },
  },
  {
    // Bloque para tests si se añaden en el futuro
    files: [
      'libs/shared/shvalidationschemas/src/lib/**/*.spec.ts',
      'libs/shared/shvalidationschemas/src/lib/**/*.test.ts',
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
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ], // Permitir _ para args no usados en tests
    },
  }
);
// RUTA: libs/shared/shvalidationschemas/eslint.config.mjs
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Configuración ESLint local para `shvalidationschemas`.", "justificacion": "Asegura linting específico, incluyendo `parserOptions.project` para código fuente y tests (aunque no haya tests aún).", "impacto": "Preparación para linting." },
  { "mejora": "Relajación de `@typescript-eslint/no-unused-vars` para tests.", "justificacion": "Permite el uso de `_` para argumentos no utilizados en los tests, una práctica común.", "impacto": "Menos ruido de linting en tests." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
