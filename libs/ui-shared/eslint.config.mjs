// RUTA: libs/ui-shared/eslint.config.mjs
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import nxPlugin from '@nx/eslint-plugin';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import * as tsParser from '@typescript-eslint/parser'; // <--- IMPORTACIÓN AÑADIDA
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import baseConfig from '../../eslint.config.mjs';

// const currentDir = dirname(fileURLToPath(import.meta.url)); // No es necesario si monorepoRoot se calcula desde currentDir del archivo config
const monorepoRoot = dirname(dirname(dirname(fileURLToPath(import.meta.url))));

const uiSharedConfig = [
  ...baseConfig,
  {
    files: ['libs/ui-shared/src/**/*.{ts,tsx}'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'libs/ui-shared/jest.config.ts',
      'libs/ui-shared/src/test-setup.ts',
      'libs/ui-shared/src/**/*.spec.tsx',
      'libs/ui-shared/src/**/*.test.tsx',
      'libs/ui-shared/src/index.ts',
      'libs/ui-shared/index.ts',
    ],
    languageOptions: {
      parser: tsParser, // Ahora definido
      parserOptions: {
        project: [
          `${monorepoRoot}/libs/ui-shared/tsconfig.lib.json`,
          `${monorepoRoot}/tsconfig.base.json`,
        ],
        tsconfigRootDir: monorepoRoot,
      },
      globals: { ...globals.browser },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      '@nx': nxPlugin, // Añadir @nx plugin aquí también si se usan sus reglas
    },
    rules: {
      ...tsPlugin.configs['recommended-type-checked'].rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      ...reactHooksPlugin.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-floating-promises': [
        'error',
        { ignoreVoid: true },
      ],
      'react/prop-types': 'off',
      // Regla de Nx para module boundaries, si aplica a nivel de librería.
      // Usualmente se define en el raíz, pero si es necesario para este proyecto específico:
      // '@nx/enforce-module-boundaries': ['error', { /* ... tus depConstraints para ui-shared ... */ }],
    },
    settings: { react: { version: 'detect' } },
  },
  {
    files: [
      'libs/ui-shared/src/**/*.spec.tsx',
      'libs/ui-shared/src/**/*.test.tsx',
    ],
    ignores: ['**/node_modules/**', '**/dist/**'],
    languageOptions: {
      parser: tsParser, // Ahora definido
      parserOptions: {
        project: [
          `${monorepoRoot}/libs/ui-shared/tsconfig.spec.json`,
          `${monorepoRoot}/tsconfig.base.json`,
        ],
        tsconfigRootDir: monorepoRoot,
      },
      globals: { ...globals.jest, ...globals.browser },
    },
    plugins: { '@typescript-eslint': tsPlugin, react: reactPlugin },
    rules: {
      ...tsPlugin.configs['recommended-type-checked'].rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
    },
  },
  {
    files: ['libs/ui-shared/src/index.ts'],
    ignores: ['**/node_modules/**', '**/dist/**'],
    languageOptions: {
      parser: tsParser, // Ahora definido
      parserOptions: {
        // Para index.ts que solo re-exportan, usualmente no se necesita `project`
        // o uno muy básico si es solo para que el parser TS funcione.
        // Si tiene alias que resolver, entonces sí necesitaría tsconfig.base.json
        project: [`${monorepoRoot}/tsconfig.base.json`],
        tsconfigRootDir: monorepoRoot,
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules,
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
];

export default uiSharedConfig;
