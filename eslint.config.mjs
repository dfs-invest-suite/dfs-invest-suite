// RUTA: eslint.config.mjs (RAÍZ DEL MONOREPO)
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nxPlugin from '@nx/eslint-plugin';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import * as tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const currentDir = dirname(fileURLToPath(import.meta.url));

const compat = new FlatCompat({
  baseDirectory: currentDir,
  recommendedConfig: js.configs.recommended,
});

// ESTAS LISTAS DEBEN SER COMPLETADAS CON TODOS LOS PROYECTOS
const projectTsConfigsForSource = [
  './tsconfig.base.json', // Necesario para la resolución de alias y opciones base
  'apps/api-main/tsconfig.app.json',
  'apps/pwa-supervisor/tsconfig.app.json',
  'libs/core/application/tenancy/tsconfig.lib.json',
  'libs/core/domain/shared-kernel/commands-queries/tsconfig.lib.json',
  'libs/core/domain/shared-kernel/entities/tsconfig.lib.json',
  'libs/core/domain/shared-kernel/events/tsconfig.lib.json',
  'libs/core/domain/shared-kernel/mappers/tsconfig.lib.json',
  'libs/core/domain/shared-kernel/ports/tsconfig.lib.json',
  'libs/core/domain/shared-kernel/value-objects/tsconfig.lib.json',
  'libs/core/domain/tenancy/tsconfig.lib.json',
  'libs/shared/constants/tsconfig.lib.json',
  'libs/shared/errors/tsconfig.lib.json',
  'libs/shared/result/tsconfig.lib.json',
  'libs/shared/types/tsconfig.lib.json',
  'libs/shared/utils/tsconfig.lib.json',
  'libs/shared/validation-schemas/tsconfig.lib.json',
  'libs/ui-shared/tsconfig.lib.json',
];

const projectTsConfigsForTests = [
  './tsconfig.base.json',
  'apps/api-main/tsconfig.spec.json',
  'apps/api-main-e2e/tsconfig.spec.json',
  'apps/pwa-supervisor/tsconfig.spec.json',
  'libs/core/application/tenancy/tsconfig.spec.json',
  'libs/core/domain/shared-kernel/commands-queries/tsconfig.spec.json',
  'libs/core/domain/shared-kernel/entities/tsconfig.spec.json',
  'libs/core/domain/shared-kernel/events/tsconfig.spec.json',
  'libs/core/domain/shared-kernel/mappers/tsconfig.spec.json',
  'libs/core/domain/shared-kernel/ports/tsconfig.spec.json',
  'libs/core/domain/shared-kernel/value-objects/tsconfig.spec.json',
  'libs/core/domain/tenancy/tsconfig.spec.json',
  'libs/shared/constants/tsconfig.spec.json',
  'libs/shared/errors/tsconfig.spec.json',
  'libs/shared/result/tsconfig.spec.json',
  'libs/shared/types/tsconfig.spec.json',
  'libs/shared/utils/tsconfig.spec.json',
  'libs/shared/validation-schemas/tsconfig.spec.json',
  'libs/ui-shared/tsconfig.spec.json',
];

const baseConfig = [
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.nx/**',
      '**/coverage/**',
      '**/.next/**',
      '**/.swc/**',
      '**/*.config.js',
      '**/*.config.mjs',
      '**/*.config.ts',
      '**/jest.config.ts',
      '**/jest.setup.ts',
      '**/test-setup.ts',
      '**/webpack.config.js',
      '**/postcss.config.js',
      '**/tailwind.config.js',
      '**/*.md',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      globals: { ...globals.browser, ...globals.node, ...globals.jest },
    },
    plugins: { '@typescript-eslint': tsPlugin, '@nx': nxPlugin },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs['eslint-recommended'].rules,
      ...tsPlugin.configs.recommended.rules,
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            {
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['scope:shared', 'type:ui'],
            },
            {
              sourceTag: 'layer:domain',
              onlyDependOnLibsWithTags: ['layer:domain', 'scope:shared'],
            },
            {
              sourceTag: 'type:shared-kernel',
              onlyDependOnLibsWithTags: ['type:shared-kernel', 'scope:shared'],
            },
            {
              sourceTag: 'layer:application',
              onlyDependOnLibsWithTags: [
                'layer:application',
                'layer:domain',
                'scope:shared',
              ],
            },
            {
              sourceTag: 'layer:infrastructure',
              onlyDependOnLibsWithTags: [
                'layer:infrastructure',
                'layer:application',
                'layer:domain',
                'scope:shared',
              ],
            },
            {
              sourceTag: 'layer:presentation',
              onlyDependOnLibsWithTags: [
                'layer:presentation',
                'layer:application',
                'layer:infrastructure',
                'type:ui',
                'scope:shared',
              ],
            },
          ],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      'no-undef': 'error',
      'react/react-in-jsx-scope': 'off',
    },
    settings: { react: { version: 'detect' } },
  },
  {
    files: [
      'apps/**/src/**/[!index]*.{ts,tsx}',
      'apps/**/src/app/**/*.{ts,tsx}',
      'libs/**/src/lib/**/*.{ts,tsx}',
    ],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.nx/**',
      '**/coverage/**',
      '**/.next/**',
      '**/.swc/**',
      '**/*.config.{js,mjs,ts}',
      '**/jest.config.ts',
      '**/jest.setup.ts',
      '**/test-setup.ts',
      '**/*.spec.{js,jsx,ts,tsx}',
      '**/*.test.{js,jsx,ts,tsx}',
      '**/*.stories.{js,jsx,ts,tsx}',
      'apps/**/specs/**/*',
      'apps/api-main-e2e/src/**/*',
      '**/index.d.ts',
      'libs/**/src/test-setup.ts',
      'apps/**/src/test-setup.ts',
      '**/index.ts',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: projectTsConfigsForSource,
        tsconfigRootDir: currentDir,
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
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  },
  {
    files: [
      '**/*.spec.{ts,tsx}',
      '**/*.test.{ts,tsx}',
      'apps/api-main-e2e/src/**/*.ts',
      'apps/**/specs/**/*.spec.tsx',
    ],
    ignores: ['**/node_modules/**', '**/dist/**', '**/.next/**'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: projectTsConfigsForTests,
        tsconfigRootDir: currentDir,
      },
      globals: { ...globals.jest, ...globals.node },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      ...tsPlugin.configs['recommended-type-checked'].rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/unbound-method': 'off',
    },
  },
  {
    files: [
      'libs/**/src/index.ts',
      'libs/**/src/lib/index.ts',
      'apps/**/src/index.ts',
      'apps/**/src/main.ts',
    ],
    ignores: ['**/node_modules/**', '**/dist/**', '**/.next/**'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
  {
    files: [
      '**/*.config.js',
      '**/*.config.mjs',
      '**/*.config.ts',
      '**/jest.config.ts',
      '**/jest.setup.ts',
      '**/test-setup.ts',
      'eslint.config.mjs',
      '**/postcss.config.js',
      '**/tailwind.config.js',
      '**/webpack.config.js',
    ],
    ignores: ['**/node_modules/**', '**/dist/**', '**/.next/**'],
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      globals: {
        module: 'writable',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        console: 'readonly',
        exports: 'writable',
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'import/no-anonymous-default-export': 'off',
      'no-undef': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  ...fixupConfigRules(compat.extends('next/core-web-vitals')).map((config) => ({
    ...config,
    files: ['apps/pwa-supervisor/**/*.{ts,tsx,js,jsx}'],
    ignores: [
      'apps/pwa-supervisor/.next/**/*',
      'apps/pwa-supervisor/specs/**/*',
    ],
    rules: {
      ...config.rules,
      '@next/next/no-html-link-for-pages': 'off',
      'react/react-in-jsx-scope': 'off',
    },
  })),
  eslintConfigPrettier,
];

export default baseConfig;
