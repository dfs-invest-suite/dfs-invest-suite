// RUTA: libs/shared/utils/eslint.config.mjs
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import tsPlugin from '@typescript-eslint/eslint-plugin';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import baseConfig from '../../../eslint.config.mjs';

const currentDir = dirname(fileURLToPath(import.meta.url));
const monorepoRoot = dirname(dirname(dirname(currentDir))); // Sube tres niveles para la raíz del monorepo

const sharedUtilsConfig = [
  ...baseConfig,
  {
    files: ['libs/shared/utils/src/lib/**/*.ts'], // Código fuente
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'libs/shared/utils/jest.config.ts',
      'libs/shared/utils/src/test-setup.ts',
      'libs/shared/utils/src/**/*.spec.ts',
      'libs/shared/utils/src/index.ts',
    ],
    languageOptions: {
      parserOptions: {
        project: [
          'libs/shared/utils/tsconfig.lib.json',
          './tsconfig.base.json',
        ], // Ruta relativa desde la raíz del monorepo
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
    files: ['libs/shared/utils/src/lib/**/*.spec.ts'], // Tests
    ignores: ['**/node_modules/**', '**/dist/**'],
    languageOptions: {
      parserOptions: {
        project: [
          'libs/shared/utils/tsconfig.spec.json',
          './tsconfig.base.json',
        ],
        tsconfigRootDir: monorepoRoot,
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs['recommended-type-checked'].rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
  {
    // Para el index.ts de esta lib
    files: ['libs/shared/utils/src/index.ts'],
    ignores: ['**/node_modules/**', '**/dist/**'],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.base.json'],
        tsconfigRootDir: monorepoRoot,
      },
    },
    rules: {
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
];

export default sharedUtilsConfig;
