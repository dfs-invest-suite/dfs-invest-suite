// RUTA: apps/admin-platform/eslint.config.mjs
import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js'; // Parser y configs JS base
import eslintPluginNext from '@next/eslint-plugin-next';
import nxPlugin from '@nx/eslint-plugin';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import * as tsParser from '@typescript-eslint/parser';
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginReact from 'eslint-plugin-react';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';
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
      '**/coverage/**',
      `apps/admin-platform/.next/**/*`,
      `apps/admin-platform/out/**/*`,
      `apps/admin-platform/jest.config.ts`,
      `apps/admin-platform/.swcrc`,
    ],
  },
  ...baseConfig,
  ...nxPlugin.configs['flat/react-typescript'],

  // Configuración para el código fuente de la aplicación admin-platform (TSX/TS)
  {
    files: [`apps/admin-platform/src/**/*.{ts,tsx,js,jsx}`], // JS/JSX aquí por si hay componentes JS en src
    ignores: [
      `src/**/*.spec.{ts,tsx}`,
      `src/**/*.test.{ts,tsx}`,
      `src/app/api/**/*`,
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          pathResolve(monorepoRoot, `apps/admin-platform/tsconfig.json`),
          pathResolve(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      'jsx-a11y': eslintPluginJsxA11y,
      '@next/next': eslintPluginNext,
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      '@next/next/no-html-link-for-pages': [
        'error',
        `apps/admin-platform/src/app`,
      ],
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  // Configuración para tests de admin-platform (TSX/TS)
  {
    files: [
      `apps/admin-platform/src/**/*.spec.{ts,tsx}`,
      `apps/admin-platform/src/**/*.test.{ts,tsx}`,
      `apps/admin-platform/specs/**/*.spec.{ts,tsx}`,
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          pathResolve(monorepoRoot, `apps/admin-platform/tsconfig.spec.json`),
          pathResolve(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
      },
      globals: { ...globals.jest, ...globals.browser },
    },
    plugins: { '@typescript-eslint': tsPlugin, react: eslintPluginReact },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
    settings: { react: { version: 'detect' } },
  },

  // Configuración de Next.js (TSX/TS)
  ...fixupConfigRules(compat.extends('plugin:@next/next/recommended')).map(
    (config) => ({
      ...config,
      files: [`apps/admin-platform/src/**/*.{ts,tsx,js,jsx}`],
    })
  ),
  ...fixupConfigRules(compat.extends('next/core-web-vitals')).map((config) => ({
    ...config,
    files: [`apps/admin-platform/src/**/*.{ts,tsx,js,jsx}`],
  })),

  // Bloque específico para next.config.js (y otros .js en la raíz de la app si los hubiera)
  {
    files: [`apps/admin-platform/*.js`], // Captura next.config.js y otros .js en la raíz de la app
    languageOptions: {
      // No especificamos `parser: tsParser` aquí para que use el parser JS por defecto
      sourceType: 'commonjs',
      globals: {
        ...globals.node, // Para `require`, `module`, `process`, `__dirname`
      },
    },
    plugins: {
      // No incluir `@typescript-eslint` aquí si queremos evitar sus reglas type-aware
      // Si `@typescript-eslint/no-require-imports` sigue aplicándose, es porque
      // el plugin `@typescript-eslint` se está heredando de `baseConfig` para archivos .js
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'import/no-commonjs': 'off',
      // Si es necesario, desactivar explícitamente MÁS reglas de @typescript-eslint
      // que podrían estar heredándose para archivos .js:
      // '@typescript-eslint/no-unsafe-call': 'off',
      // '@typescript-eslint/no-unsafe-member-access': 'off',
      // '@typescript-eslint/no-unsafe-assignment': 'off',
      // '@typescript-eslint/explicit-function-return-type': 'off',
    },
  },
];
// RUTA: apps/admin-platform/eslint.config.mjs
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "El bloque para `next.config.js` ahora usa un `files` pattern más general `apps/admin-platform/*.js` y omite explícitamente la definición de `parser: tsParser`.", "justificacion": "Se intenta que ESLint use su parser JavaScript por defecto (espree) para estos archivos, lo que podría evitar que las reglas de `@typescript-eslint` (como `no-require-imports`) se apliquen si son heredadas a través de un `parser: tsParser` global.", "impacto": "Intento de aislar completamente los archivos `.js` de la configuración de TypeScript de ESLint." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
