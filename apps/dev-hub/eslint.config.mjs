// RUTA: apps/dev-hub/eslint.config.mjs
import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nxPlugin from '@nx/eslint-plugin';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import * as tsParser from '@typescript-eslint/parser';
import eslintPluginReact from 'eslint-plugin-react';
import { dirname, resolve as pathResolve } from 'path';
import { fileURLToPath } from 'url';
import baseConfig from '../../eslint.config.mjs';
// Los siguientes pueden estar definidos por nxPlugin.configs['flat/react-typescript'] o Next.js,
// pero los importamos por si acaso se necesitan para overrides o si los presets cambian.
import eslintPluginNext from '@next/eslint-plugin-next'; // Específico de Next.js
import eslintPluginJsxA11y from 'eslint-plugin-jsx-a11y';
import eslintPluginReactHooks from 'eslint-plugin-react-hooks';
import globals from 'globals';

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
      `apps/dev-hub/.next/**/*`, // Específico para dev-hub
      `apps/dev-hub/out/**/*`, // Si usas `next export`
      `apps/dev-hub/jest.config.ts`,
      `apps/dev-hub/.swcrc`,
    ],
  },
  ...baseConfig,
  ...nxPlugin.configs['flat/react-typescript'], // Config base de Nx para React + TS

  // Configuración para el código fuente de la aplicación dev-hub
  {
    files: [`apps/dev-hub/src/**/*.{ts,tsx,js,jsx}`],
    ignores: [
      `apps/dev-hub/src/**/*.spec.{ts,tsx}`,
      `apps/dev-hub/src/**/*.test.{ts,tsx}`,
      `apps/dev-hub/src/app/api/**/*`, // Usualmente los route handlers no necesitan el mismo nivel de linting React
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          pathResolve(monorepoRoot, `apps/dev-hub/tsconfig.json`), // tsconfig.json de la app
          pathResolve(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser },
    },
    plugins: {
      // Asegurar que los plugins estén disponibles si se usan reglas específicas
      '@typescript-eslint': tsPlugin,
      react: eslintPluginReact,
      'react-hooks': eslintPluginReactHooks,
      'jsx-a11y': eslintPluginJsxA11y,
      '@next/next': eslintPluginNext, // Plugin de Next.js
    },
    rules: {
      // Hereda de nxPlugin.configs['flat/react-typescript'] y baseConfig
      // Sobrescribir o añadir reglas específicas si es necesario:
      'react/react-in-jsx-scope': 'off', // No necesario con Next.js >17 y React >17
      'react/prop-types': 'off', // Usar TypeScript para tipos de props

      // Reglas de Next.js (plugin:@next/next/recommended ya las trae, pero por si acaso)
      '@next/next/no-html-link-for-pages': ['error', `apps/dev-hub/src/app`], // Ajustar path a tu directorio app
      // ... otras reglas de Next.js
    },
    settings: {
      react: { version: 'detect' },
    },
  },

  // Configuración para tests de dev-hub
  {
    files: [
      `apps/dev-hub/src/**/*.spec.{ts,tsx}`,
      `apps/dev-hub/src/**/*.test.{ts,tsx}`,
      `apps/dev-hub/specs/**/*.spec.{ts,tsx}`, // Si tienes tests en /specs
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          pathResolve(monorepoRoot, `apps/dev-hub/tsconfig.spec.json`),
          pathResolve(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
      },
      globals: { ...globals.jest, ...globals.browser },
    },
    plugins: { '@typescript-eslint': tsPlugin, react: eslintPluginReact },
    rules: {
      ...(tsPlugin.configs['recommended-type-checked']?.rules || {}),
      ...(eslintPluginReact.configs.recommended?.rules || {}),
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
    },
    settings: { react: { version: 'detect' } },
  },

  // Configuración de Next.js (debe ir después de las configuraciones base y de Nx)
  ...fixupConfigRules(compat.extends('plugin:@next/next/recommended')).map(
    (config) => ({
      ...config,
      files: [`apps/dev-hub/src/**/*.{ts,tsx,js,jsx}`],
    })
  ),
  ...fixupConfigRules(compat.extends('next/core-web-vitals')).map((config) => ({
    ...config,
    files: [`apps/dev-hub/src/**/*.{ts,tsx,js,jsx}`],
  })),

  // Bloque específico para next.config.js de esta app
  {
    files: [`apps/dev-hub/next.config.js`],
    languageOptions: {
      globals: {
        ...globals.node, // next.config.js se ejecuta en entorno Node
        require: 'readonly',
        module: 'writable',
        process: 'readonly',
        __dirname: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-var-requires': 'off',
      'import/no-commonjs': 'off', // Si esta regla está activa globalmente
    },
  },
];
// RUTA: apps/dev-hub/eslint.config.mjs
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Reemplazado el placeholder `<nombre-app-next>` con `dev-hub` en todos los paths.", "justificacion": "Configuración específica y correcta para la aplicación `dev-hub`.", "impacto": "ESLint ahora se aplicará correctamente a los archivos de `dev-hub`." },
  { "mejora": "Añadido bloque específico para `next.config.js` para desactivar reglas de importación ES Module.", "justificacion": "Resuelve el error `@typescript-eslint/no-require-imports` para el archivo `next.config.js` de esta app.", "impacto": "Linting limpio para la configuración de Next.js." },
  { "mejora": "Incluidos los plugins de React y Next.js en el bloque de código fuente.", "justificacion": "Asegura que las reglas específicas de React y Next.js estén disponibles y se apliquen.", "impacto": "Mejor linting para código React/Next.js."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
