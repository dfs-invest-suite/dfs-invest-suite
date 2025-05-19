// RUTA: libs/ui-shared/eslint.config.mjs
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import nxPlugin from '@nx/eslint-plugin';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import * as tsParser from '@typescript-eslint/parser';
import jsxA11yPlugin from 'eslint-plugin-jsx-a11y';
import reactPlugin from 'eslint-plugin-react';
import reactHooksPlugin from 'eslint-plugin-react-hooks';
import globals from 'globals';
import { dirname, resolve as pathResolve } from 'path'; // Añadido pathResolve
import { fileURLToPath } from 'url';
import baseConfig from '../../eslint.config.mjs';

const currentDir = dirname(fileURLToPath(import.meta.url));
const monorepoRoot = pathResolve(currentDir, '../../'); // Ajustado para subir dos niveles

const uiSharedGlobalIgnores = [
  '**/node_modules/**',
  '**/dist/**',
  'libs/ui-shared/jest.config.ts',
  'libs/ui-shared/tailwind.config.js',
  'libs/ui-shared/postcss.config.js',
  'libs/ui-shared/index.ts', // El index.ts de la raíz de la lib
];

const uiSharedConfig = [
  {
    files: ['libs/ui-shared/**/*.{ts,tsx,js,jsx}'],
    ignores: uiSharedGlobalIgnores,
  },
  ...baseConfig,
  {
    files: [
      'libs/ui-shared/src/components/**/*.{ts,tsx}',
      'libs/ui-shared/src/lib/**/*.{ts,tsx}',
    ],
    ignores: [
      // uiSharedGlobalIgnores ya cubre node_modules y dist
      'libs/ui-shared/src/**/*.spec.{ts,tsx}',
      'libs/ui-shared/src/**/*.test.{ts,tsx}',
      'libs/ui-shared/src/test-setup.ts',
      'libs/ui-shared/src/index.ts', // El index.ts dentro de src/
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          pathResolve(monorepoRoot, 'libs/ui-shared/tsconfig.lib.json'),
          pathResolve(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
        ecmaFeatures: { jsx: true }, // Asegurar que JSX está habilitado
      },
      globals: { ...globals.browser },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: reactPlugin,
      'react-hooks': reactHooksPlugin,
      'jsx-a11y': jsxA11yPlugin,
      '@nx': nxPlugin,
    },
    rules: {
      ...tsPlugin.configs['recommended-type-checked'].rules,
      ...reactPlugin.configs.recommended.rules,
      ...reactPlugin.configs['jsx-runtime'].rules, // Para nuevo JSX transform
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
      'react/prop-types': 'off', // Común en proyectos TypeScript con React
    },
    settings: { react: { version: 'detect' } }, // AÑADIDO AQUÍ
  },
  {
    files: [
      'libs/ui-shared/src/**/*.spec.{ts,tsx}',
      'libs/ui-shared/src/**/*.test.{ts,tsx}',
    ],
    // ignores: uiSharedGlobalIgnores, // Ya cubierto por el ignore global de este config
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          pathResolve(monorepoRoot, 'libs/ui-shared/tsconfig.spec.json'),
          pathResolve(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.jest, ...globals.browser },
    },
    plugins: { '@typescript-eslint': tsPlugin, react: reactPlugin }, // Solo los necesarios para tests
    rules: {
      ...tsPlugin.configs['recommended-type-checked'].rules,
      ...reactPlugin.configs.recommended.rules, // Para asegurar que las reglas de React se apliquen a tests también
      ...reactPlugin.configs['jsx-runtime'].rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
    },
    settings: { react: { version: 'detect' } }, // AÑADIDO AQUÍ también para tests
  },
  {
    files: ['libs/ui-shared/src/index.ts'], // El index.ts dentro de src
    // ignores: uiSharedGlobalIgnores, // Ya cubierto
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [pathResolve(monorepoRoot, 'tsconfig.base.json')],
        tsconfigRootDir: monorepoRoot,
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs.recommended.rules, // Reglas base de TS, no type-checked
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },
];

export default uiSharedConfig;
// RUTA: libs/ui-shared/eslint.config.mjs
