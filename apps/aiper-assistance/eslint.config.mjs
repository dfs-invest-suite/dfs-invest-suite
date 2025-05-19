// apps/aiper-assistance/eslint.config.mjs
import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nxPlugin from '@nx/eslint-plugin';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import * as tsParser from '@typescript-eslint/parser';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals'; // <--- AÑADIR ESTA LÍNEA
import { dirname, resolve as pathResolve } from 'path';
import { fileURLToPath } from 'url';
import baseConfig from '../../eslint.config.mjs';

const currentDir = dirname(fileURLToPath(import.meta.url));
const monorepoRoot = pathResolve(currentDir, '../../');

const compat = new FlatCompat({
  baseDirectory: currentDir,
  recommendedConfig: js.configs.recommended,
  resolvePluginsRelativeTo: currentDir,
});

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'apps/aiper-assistance/.next/**/*',
      'apps/aiper-assistance/jest.config.ts',
      'apps/aiper-assistance/.swcrc',
    ],
  },
  ...baseConfig,

  // Configuración específica para código fuente de aiper-assistance (TSX)
  {
    files: ['apps/aiper-assistance/src/**/*.{ts,tsx}'],
    ignores: [
      'apps/aiper-assistance/src/**/*.spec.{ts,tsx}',
      'apps/aiper-assistance/src/app/api/**/*',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          pathResolve(monorepoRoot, 'apps/aiper-assistance/tsconfig.json'),
          pathResolve(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
        ecmaFeatures: { jsx: true },
      },
      globals: {
        // Ahora 'globals' está definido
        ...globals.browser,
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@nx': nxPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
    },
    rules: {
      ...tsPlugin.configs['recommended-type-checked'].rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      'react/prop-types': 'off',
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  // Configuración para tests de aiper-assistance
  {
    files: [
      'apps/aiper-assistance/src/**/*.spec.{ts,tsx}',
      'apps/aiper-assistance/specs/**/*.spec.{ts,tsx}',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          pathResolve(monorepoRoot, 'apps/aiper-assistance/tsconfig.spec.json'),
          pathResolve(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.jest, ...globals.browser }, // Ahora 'globals' está definido
    },
    plugins: { '@typescript-eslint': tsPlugin, react: reactPlugin },
    rules: {
      ...tsPlugin.configs['recommended-type-checked'].rules,
      ...reactPlugin.configs.recommended.rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
    settings: { react: { version: 'detect' } },
  },

  // Configuración de Next.js usando FlatCompat
  ...fixupConfigRules(compat.extends('plugin:@next/next/recommended')).map(
    (config) => ({
      ...config,
      files: ['apps/aiper-assistance/src/**/*.{ts,tsx,js,jsx}'],
    })
  ),
];
