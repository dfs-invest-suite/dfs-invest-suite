// libs/shared/types/eslint.config.mjs
import tsPlugin from '@typescript-eslint/eslint-plugin';
import * as tsParser from '@typescript-eslint/parser';
import { dirname, resolve as pathResolve } from 'path';
import { fileURLToPath } from 'url';
import baseConfig from '../../../eslint.config.mjs'; // Path a la raíz

const currentDir = dirname(fileURLToPath(import.meta.url));
const monorepoRoot = pathResolve(currentDir, '../../../');

export default [
  ...baseConfig,
  { // Código Fuente de la librería
    files: ['libs/shared/types/src/lib/**/*.ts'],
    ignores: [
      '**/node_modules/**', '**/dist/**', 'libs/shared/types/jest.config.ts',
      'libs/shared/types/src/**/*.spec.ts', 'libs/shared/types/src/index.ts'
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          pathResolve(monorepoRoot, 'libs/shared/types/tsconfig.lib.json'),
          pathResolve(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs['recommended-type-checked'].rules,
      // Reglas específicas para esta lib si son necesarias
    },
  },
  { // Archivos de Test de la librería
    files: ['libs/shared/types/src/lib/**/*.spec.ts'],
    ignores: ['**/node_modules/**', '**/dist/**'],
    languageOptions: { /* ... parserOptions.project con tsconfig.spec.json ... */ },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs['recommended-type-checked'].rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off', // Común en tests
    },
  },
  { // index.ts de la librería (si solo re-exporta y no necesita type-checking)
    files: ['libs/shared/types/src/index.ts'],
    languageOptions: { parserOptions: { project: [pathResolve(monorepoRoot, 'tsconfig.base.json')] }},
    rules: { /* ... desactivar reglas type-checked ... */ }
  }
];
