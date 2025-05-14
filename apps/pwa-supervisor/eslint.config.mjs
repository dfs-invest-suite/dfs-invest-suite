// RUTA: apps/pwa-supervisor/eslint.config.mjs
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import { fixupConfigRules } from '@eslint/compat';
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import * as tsParser from '@typescript-eslint/parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import baseConfig from '../../eslint.config.mjs'; // Hereda la configuración raíz
// Los plugins de React, jsx-a11y, etc., vienen de next/core-web-vitals

const currentDir = dirname(fileURLToPath(import.meta.url)); // Directorio de apps/pwa-supervisor
const monorepoRoot = dirname(dirname(currentDir)); // Ruta a la raíz del monorepo

const compat = new FlatCompat({
  baseDirectory: currentDir,
  recommendedConfig: js.configs.recommended,
});

const pwaSupervisorConfig = [
  ...baseConfig, // Aplicar la configuración base del monorepo primero

  // Bloque para el código fuente de pwa-supervisor (CON type-checking)
  {
    files: ['apps/pwa-supervisor/src/**/*.{ts,tsx}'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'apps/pwa-supervisor/.next/**/*',
      'apps/pwa-supervisor/jest.config.ts',
      'apps/pwa-supervisor/tailwind.config.js',
      'apps/pwa-supervisor/postcss.config.js',
      'apps/pwa-supervisor/next.config.js',
      'apps/pwa-supervisor/specs/**/*',
      'apps/pwa-supervisor/src/**/*.spec.tsx',
      'apps/pwa-supervisor/src/**/*.test.tsx',
      'apps/pwa-supervisor/src/app/api/**/*', // API routes pueden tener reglas diferentes
      'apps/pwa-supervisor/index.d.ts',
      'apps/pwa-supervisor/src/index.ts', // Si existiera
      'apps/pwa-supervisor/src/test-setup.ts', // Si existiera
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          `${monorepoRoot}/apps/pwa-supervisor/tsconfig.app.json`,
          `${monorepoRoot}/tsconfig.base.json`,
        ],
        tsconfigRootDir: monorepoRoot,
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      // Activar reglas que dependen de tipos aquí
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
  // Bloque para los tests de pwa-supervisor (CON type-checking)
  {
    files: [
      'apps/pwa-supervisor/src/**/*.spec.tsx',
      'apps/pwa-supervisor/src/**/*.test.tsx',
      'apps/pwa-supervisor/specs/**/*.spec.tsx',
    ],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'apps/pwa-supervisor/.next/**/*',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          `${monorepoRoot}/apps/pwa-supervisor/tsconfig.spec.json`,
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
  // Configuración específica de Next.js (DEBE ESTAR DESPUÉS de tus bloques con `parserOptions.project`)
  ...fixupConfigRules(compat.extends('next/core-web-vitals')).map((config) => ({
    ...config,
    files: ['apps/pwa-supervisor/**/*.{ts,tsx,js,jsx}'], // Asegurar que aplique a los archivos correctos
    ignores: [
      'apps/pwa-supervisor/.next/**/*',
      'apps/pwa-supervisor/specs/**/*',
    ], // specs no necesita reglas de next
    rules: {
      ...config.rules,
      '@next/next/no-html-link-for-pages': 'off',
      'react/react-in-jsx-scope': 'off',
      // Si necesitas desactivar alguna regla type-checked que next/core-web-vitals no maneja bien:
      // '@typescript-eslint/no-misused-promises': 'off', // Ejemplo
    },
  })),
];

export default pwaSupervisorConfig;
