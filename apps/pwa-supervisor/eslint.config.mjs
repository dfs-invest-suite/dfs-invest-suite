// RUTA: apps/pwa-supervisor/eslint.config.mjs
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import * as tsParser from '@typescript-eslint/parser';
import globals from 'globals';
import { dirname, resolve as pathResolve } from 'path';
import { fileURLToPath } from 'url';
import baseConfig from '../../eslint.config.mjs';

const currentDir = dirname(fileURLToPath(import.meta.url));
const monorepoRoot = pathResolve(currentDir, '../../');

const compat = new FlatCompat({
  baseDirectory: currentDir,
  recommendedConfig: js.configs.recommended,
});

const supervisorGlobalIgnores = [
  '**/node_modules/**',
  '**/dist/**',
  'apps/pwa-supervisor/.next',
  'apps/pwa-supervisor/jest.config.ts',
  'apps/pwa-supervisor/tailwind.config.js',
  'apps/pwa-supervisor/postcss.config.js',
  'apps/pwa-supervisor/next.config.js',
  'apps/pwa-supervisor/index.d.ts',
];

const pwaSupervisorConfig = [
  {
    ignores: supervisorGlobalIgnores,
  },
  ...baseConfig,
  {
    files: [
      'apps/pwa-supervisor/src/app/**/*.{ts,tsx}',
      'apps/pwa-supervisor/src/components/**/*.{ts,tsx}',
      'apps/pwa-supervisor/src/hooks/**/*.{ts,tsx}',
      'apps/pwa-supervisor/src/lib/**/*.{ts,tsx}',
      'apps/pwa-supervisor/src/store/**/*.{ts,tsx}',
    ],
    ignores: [
      'apps/pwa-supervisor/src/**/*.spec.{ts,tsx}',
      'apps/pwa-supervisor/src/**/*.test.{ts,tsx}',
      'apps/pwa-supervisor/src/app/api/**/*',
      'apps/pwa-supervisor/src/test-setup.ts',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          pathResolve(monorepoRoot, 'apps/pwa-supervisor/tsconfig.app.json'),
          pathResolve(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser },
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
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unsafe-assignment': 'warn',
      '@typescript-eslint/no-unsafe-call': 'warn',
      '@typescript-eslint/no-unsafe-member-access': 'warn',
      '@typescript-eslint/no-unsafe-return': 'warn',
      '@typescript-eslint/no-unsafe-argument': 'warn',
    },
  },
  {
    files: [
      'apps/pwa-supervisor/src/**/*.spec.{ts,tsx}',
      'apps/pwa-supervisor/src/**/*.test.{ts,tsx}',
      'apps/pwa-supervisor/specs/**/*.spec.{ts,tsx}',
      'apps/pwa-supervisor/specs/**/*.test.{ts,tsx}',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          pathResolve(monorepoRoot, 'apps/pwa-supervisor/tsconfig.spec.json'),
          pathResolve(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.jest, ...globals.browser },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs['recommended-type-checked'].rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-unsafe-argument': 'off',
    },
  },
  // Configuración específica de Next.js
  ...fixupConfigRules(compat.extends('next/core-web-vitals')).map((config) => ({
    ...config,
    files: [
      // Asegurar que se aplique a los archivos correctos
      'apps/pwa-supervisor/src/app/**/*.{ts,tsx,js,jsx}',
      'apps/pwa-supervisor/src/components/**/*.{ts,tsx,js,jsx}',
      'apps/pwa-supervisor/src/hooks/**/*.{ts,tsx,js,jsx}',
      'apps/pwa-supervisor/src/lib/**/*.{ts,tsx,js,jsx}',
      'apps/pwa-supervisor/src/store/**/*.{ts,tsx,js,jsx}',
      // Es importante que esto también incluya el archivo layout.tsx raíz de la app
      'apps/pwa-supervisor/src/app/layout.tsx',
    ],
    rules: {
      ...config.rules,
      '@next/next/no-html-link-for-pages': 'off',
      'react/react-in-jsx-scope': 'off',
      'no-undef': 'off', // <--- AÑADIDO: Desactivar no-undef aquí, asumiendo que Next.js lo maneja.
    },
  })),
];

export default pwaSupervisorConfig;
// RUTA: apps/pwa-supervisor/eslint.config.mjs
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Desactivación de `no-undef` en bloque de Next.js",
    "justificacion": "Se añadió `'no-undef': 'off'` al bloque de reglas de `next/core-web-vitals`. Esto asume que la configuración de Next.js define los globales necesarios como `React` o que el nuevo transform JSX no los necesita para la regla `no-undef`. Si el problema es específicamente el uso de `React.ReactNode`, la importación explícita de `React` en `layout.tsx` sería la solución más limpia, pero esta desactivación es para probar si hay un conflicto de precedencia de reglas.",
    "impacto": "Podría resolver el error `no-undef` para `React`. Si no, la importación explícita de `React` en `layout.tsx` sigue siendo una opción válida."
  },
  {
    "mejora": "Asegurar que `ecmaFeatures: { jsx: true }` esté en `parserOptions` de los bloques relevantes",
    "justificacion": "Para que el parser entienda JSX correctamente.",
    "impacto": "Configuración más robusta."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Si desactivar `no-undef` en el bloque de Next.js no funciona, y la importación de `React` en `layout.tsx` (que debería estar en el snapshot que te proporcioné) tampoco lo hizo, entonces necesitaríamos revisar la configuración de `globals` en `baseConfig` y en el bloque `languageOptions` de este archivo, para asegurar que `globals.browser` o un global específico para `React` esté correctamente definido y aplicado antes que la regla `no-undef` del `js.configs.recommended`."
  }
]
*/
