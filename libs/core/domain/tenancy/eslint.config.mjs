// RUTA: libs/core/domain/tenancy/eslint.config.mjs
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import tsPlugin from '@typescript-eslint/eslint-plugin';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import baseConfig from '../../../../eslint.config.mjs';

const monorepoRoot = dirname(
  dirname(dirname(dirname(fileURLToPath(import.meta.url))))
);

const libConfig = [
  ...baseConfig,
  {
    // Código Fuente
    files: ['libs/core/domain/tenancy/src/lib/**/*.ts'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'libs/core/domain/tenancy/jest.config.ts',
      'libs/core/domain/tenancy/src/**/*.spec.ts',
      'libs/core/domain/tenancy/src/index.ts',
    ],
    languageOptions: {
      parserOptions: {
        project: [
          `${monorepoRoot}/libs/core/domain/tenancy/tsconfig.lib.json`,
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
    files: ['libs/core/domain/tenancy/src/lib/**/*.spec.ts'],
    ignores: ['**/node_modules/**', '**/dist/**'],
    languageOptions: {
      parserOptions: {
        project: [
          `${monorepoRoot}/libs/core/domain/tenancy/tsconfig.spec.json`,
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
  {
    // index.ts
    files: ['libs/core/domain/tenancy/src/index.ts'],
    ignores: ['**/node_modules/**', '**/dist/**'],
    languageOptions: {
      parserOptions: {
        project: [`${monorepoRoot}/tsconfig.base.json`],
        tsconfigRootDir: monorepoRoot,
      },
    },
    rules: {
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
];
export default libConfig;
