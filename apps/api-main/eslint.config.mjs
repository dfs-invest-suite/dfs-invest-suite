// RUTA: apps/api-main/eslint.config.mjs
import baseConfig from '../../eslint.config.mjs'; // Path relativo a la raíz del monorepo
import tsPlugin from '@typescript-eslint/eslint-plugin'; // Importar explícitamente
import * as tsParser from '@typescript-eslint/parser'; // Importar explícitamente
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import globals from 'globals'; // Importar globals
// No necesitamos FlatCompat aquí si baseConfig ya es flat y no extendemos configs Next/React

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monorepoRoot = path.resolve(__dirname, '../../');

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/coverage/**',
      'apps/api-main/jest.config.ts',
      'apps/api-main/webpack.config.js',
      // Ignorar archivos que no sean código fuente principal de la app
    ],
  },
  ...baseConfig, // Heredar la configuración raíz

  // Configuración específica para el código fuente de api-main (NestJS)
  {
    files: ['apps/api-main/src/**/*.{ts,tsx}'], // Aplicar a .ts y .tsx en src
    ignores: [
      'apps/api-main/src/**/*.spec.ts',
      'apps/api-main/src/**/*.test.ts',
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          path.join(monorepoRoot, 'apps/api-main/tsconfig.app.json'), // tsconfig.app.json
          path.join(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
      },
      globals: {
        ...globals.node, // api-main es una app Node.js
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      // No plugins de React/Next aquí
    },
    rules: {
      // Aplicar reglas con chequeo de tipos aquí
      ...tsPlugin.configs['recommended-type-checked'].rules,
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-floating-promises': [
        'error',
        { ignoreVoid: true },
      ],
      // Otras reglas específicas para NestJS o backend
    },
  },
  // Configuración para tests de api-main
  {
    files: ['apps/api-main/src/**/*.spec.ts', 'apps/api-main/src/**/*.test.ts'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          path.join(monorepoRoot, 'apps/api-main/tsconfig.spec.json'),
          path.join(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
      },
      globals: { ...globals.jest, ...globals.node },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs['recommended-type-checked'].rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      // ... otras reglas relajadas para tests
    },
  },
];
// RUTA: apps/api-main/eslint.config.mjs
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Path de importación de `baseConfig` corregido a `../../eslint.config.mjs`.", "justificacion": "Asegura herencia correcta.", "impacto": "Resuelve error de grafo." },
  { "mejora": "Estructura de config local para app NestJS, separando código fuente y tests, y aplicando reglas type-aware.", "justificacion": "Configuración ESLint robusta y específica.", "impacto": "Mejor calidad de código." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
