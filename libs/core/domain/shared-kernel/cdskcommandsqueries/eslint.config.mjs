// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/eslint.config.mjs
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
    files: [
      'libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/**/*.ts',
    ],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'libs/core/domain/shared-kernel/cdskcommandsqueries/jest.config.ts',
      'libs/core/domain/shared-kernel/cdskcommandsqueries/src/**/*.spec.ts',
      'libs/core/domain/shared-kernel/cdskcommandsqueries/src/**/*.test.ts',
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
      'libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/**/*.spec.ts',
      'libs/core/domain/shared-kernel/cdskcommandsqueries/src/lib/**/*.test.ts',
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
        // Permitir @ts-expect-error en tests
        'error',
        { 'ts-expect-error': 'allow-with-description' },
      ],
    },
  }
);
// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/eslint.config.mjs
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Configuración ESLint local para `cdskcommandsqueries`.", "justificacion": "Asegura linting específico para la librería.", "impacto": "Calidad." },
  { "mejora": "Permitido `@ts-expect-error` con descripción en tests.", "justificacion": "Útil para testear casos de error o comportamiento con tipos incorrectos intencionalmente.", "impacto": "Flexibilidad en tests." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
