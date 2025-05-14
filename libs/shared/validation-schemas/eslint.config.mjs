// RUTA: libs/shared/validation-schemas/eslint.config.mjs
import tsPlugin from '@typescript-eslint/eslint-plugin';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import baseConfig from '../../../eslint.config.mjs';

const currentDir = dirname(fileURLToPath(import.meta.url));
const monorepoRoot = dirname(dirname(dirname(currentDir)));

const sharedValidationSchemasConfig = [
  ...baseConfig,
  {
    files: ['libs/shared/validation-schemas/src/lib/**/*.ts'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'libs/shared/validation-schemas/jest.config.ts',
      'libs/shared/validation-schemas/src/test-setup.ts',
      'libs/shared/validation-schemas/src/**/*.spec.ts',
      'libs/shared/validation-schemas/src/index.ts',
    ],
    languageOptions: {
      parserOptions: {
        project: [
          'libs/shared/validation-schemas/tsconfig.lib.json',
          './tsconfig.base.json',
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
    files: ['libs/shared/validation-schemas/src/lib/**/*.spec.ts'],
    ignores: ['**/node_modules/**', '**/dist/**'],
    languageOptions: {
      parserOptions: {
        project: [
          'libs/shared/validation-schemas/tsconfig.spec.json',
          './tsconfig.base.json',
        ],
        tsconfigRootDir: monorepoRoot,
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs['recommended-type-checked'].rules,
      '@typescript-eslint/no-explicit-any': 'off',
    },
  },
  {
    files: ['libs/shared/validation-schemas/src/index.ts'],
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

export default sharedValidationSchemasConfig;
