// RUTA: libs/core/domain/codousersroles/eslint.config.mjs
// Autor: L.I.A Legacy (IA Asistente)
import baseConfig from '../../../../eslint.config.mjs'; // 4 niveles para la raíz
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monorepoRoot = path.resolve(__dirname, '../../../../');

export default tseslint.config(
  ...baseConfig,
  {
    files: ['libs/core/domain/codousersroles/src/lib/**/*.ts'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'libs/core/domain/codousersroles/jest.config.ts',
      'libs/core/domain/codousersroles/src/**/*.spec.ts',
      'libs/core/domain/codousersroles/src/**/*.test.ts',
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
      // Reglas específicas para codousersroles si son necesarias
    },
  },
  {
    files: [
      'libs/core/domain/codousersroles/src/lib/**/*.spec.ts',
      'libs/core/domain/codousersroles/src/lib/**/*.test.ts',
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
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-expect-error': 'allow-with-description' },
      ],
    },
  }
);
// RUTA: libs/core/domain/codousersroles/eslint.config.mjs
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Configuración ESLint local para `codousersroles`.", "justificacion": "Asegura linting específico para la librería, con `parserOptions.project` para código fuente y tests.", "impacto": "Calidad de código." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
