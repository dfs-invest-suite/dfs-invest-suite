javascript;
// RUTA: apps/api-main/eslint.config.mjs
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
import tsPlugin from '@typescript-eslint/eslint-plugin';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import baseConfig from '../../eslint.config.mjs';

const monorepoRoot = dirname(dirname(fileURLToPath(import.meta.url)));

const apiMainConfig = [
  ...baseConfig,
  {
    // Código Fuente
    files: ['apps/api-main/src/app/**/*.ts', 'apps/api-main/src/main.ts'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'apps/api-main/jest.config.ts',
      'apps/api-main/src/**/*.spec.ts',
    ],
    languageOptions: {
      parserOptions: {
        project: [
          `${monorepoRoot}/apps/api-main/tsconfig.app.json`,
          `${monorepoRoot}/tsconfig.base.json`,
        ],
        tsconfigRootDir: monorepoRoot,
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs['recommended-type-checked'].rules,
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-floating-promises': [
        'error',
        { ignoreVoid: true },
      ],
    },
  },
  {
    // Tests
    files: ['apps/api-main/src/**/*.spec.ts'],
    ignores: ['**/node_modules/**', '**/dist/**'],
    languageOptions: {
      parserOptions: {
        project: [
          `${monorepoRoot}/apps/api-main/tsconfig.spec.json`,
          `${monorepoRoot}/tsconfig.base.json`,
        ],
        tsconfigRootDir: monorepoRoot,
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs['recommended-type-checked'].rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
];
export default apiMainConfig;
