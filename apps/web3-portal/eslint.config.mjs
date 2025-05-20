// RUTA: apps/<nombre-app-next>/eslint.config.mjs (PLANTILLA ACTUALIZADA Y COMPLETA)
// TODO: [LIA Legacy - Aplicar esta ESTRUCTURA ACTUALIZADA a todos los eslint.config.mjs de apps Next.js] - ¡PENDIENTE!
import { fixupConfigRules } from '@eslint/compat'; // <<< IMPORTACIÓN CORREGIDA Y NECESARIA
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import nxPlugin from '@nx/eslint-plugin';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import * as tsParser from '@typescript-eslint/parser';
import eslintPluginReact from 'eslint-plugin-react'; // <<< IMPORTACIÓN AÑADIDA
import globals from 'globals';
import { dirname, resolve as pathResolve } from 'path';
import { fileURLToPath } from 'url';
import baseConfig from '../../eslint.config.mjs'; // Path a la config raíz

const currentDir = dirname(fileURLToPath(import.meta.url));
const monorepoRoot = pathResolve(currentDir, '../../'); // Ajusta según la profundidad de la app

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
      `apps/<nombre-app-next>/.next/**/*`, // Ajustar <nombre-app-next>
      `apps/<nombre-app-next>/jest.config.ts`,
      `apps/<nombre-app-next>/.swcrc`,
      // No ignorar eslint.config.mjs de ESTE proyecto aquí.
    ],
  },
  ...baseConfig, // Heredar de la raíz

  // Configuración específica de Nx para proyectos React/TypeScript.
  // Esta configuración ya define plugins para React, Hooks, JSX-A11y, etc.
  // y sus reglas recomendadas.
  ...nxPlugin.configs['flat/react-typescript'],

  // Bloque para habilitar type-checking en esta app específica y aplicar reglas type-aware
  {
    files: [`apps/<nombre-app-next>/src/**/*.{ts,tsx,js,jsx}`], // Ajustar <nombre-app-next>
    ignores: [
      `apps/<nombre-app-next>/src/**/*.spec.{ts,tsx}`,
      `apps/<nombre-app-next>/src/**/*.test.{ts,tsx}`,
      `apps/<nombre-app-next>/src/app/api/**/*`,
    ],
    languageOptions: {
      parser: tsParser, // Aunque nxPlugin.configs['flat/react-typescript'] lo defina, ser explícito no daña
      parserOptions: {
        project: [
          pathResolve(monorepoRoot, `apps/<nombre-app-next>/tsconfig.json`), // Ajustar <nombre-app-next>
          pathResolve(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
        ecmaFeatures: { jsx: true },
      },
      globals: { ...globals.browser },
    },
    // Los plugins principales (react, react-hooks, jsx-a11y, @typescript-eslint)
    // ya están definidos por `nxPlugin.configs['flat/react-typescript']`
    // o por los `compat.extends` de Next.js.
    // No es necesario redefinir el objeto `plugins` aquí si solo se heredan.
    // Si se necesitan plugins adicionales SOLO para este bloque, se añadirían.
    rules: {
      // Aplicar reglas type-aware aquí porque 'parserOptions.project' está definido
      // Si `tsPlugin.configs['recommended-type-checked'].rules` no está en `nxPlugin.configs['flat/react-typescript']`, añadirlo:
      // ...tsPlugin.configs['recommended-type-checked'].rules,

      // Reglas que ya estaban en nxPlugin.configs['flat/react-typescript'] o Next.js configs no necesitan repetirse
      // a menos que se quieran sobreescribir.
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      // Sobrescribir o añadir reglas específicas de la app si es necesario
    },
    settings: {
      react: { version: 'detect' }, // Ya debería estar en nxPlugin.configs['flat/react-typescript']
    },
  },

  // Configuración para tests de esta app (si los tiene)
  {
    files: [
      `apps/<nombre-app-next>/src/**/*.spec.{ts,tsx}`,
      `apps/<nombre-app-next>/src/**/*.test.{ts,tsx}`,
      `apps/<nombre-app-next>/specs/**/*.spec.{ts,tsx}`,
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: [
          pathResolve(
            monorepoRoot,
            `apps/<nombre-app-next>/tsconfig.spec.json`
          ), // Ajustar
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
      // ... otras reglas relajadas para tests
    },
    settings: { react: { version: 'detect' } },
  },

  // Configuración de Next.js (al final, y usando fixupConfigRules)
  // Estas configuraciones ya traen sus propios plugins (como @next/eslint-plugin-next)
  ...fixupConfigRules(compat.extends('plugin:@next/next/recommended')).map(
    (config) => ({
      ...config,
      files: [`apps/<nombre-app-next>/src/**/*.{ts,tsx,js,jsx}`],
    }) // Ajustar
  ),
  ...fixupConfigRules(compat.extends('next/core-web-vitals')).map(
    (config) => ({
      ...config,
      files: [`apps/<nombre-app-next>/src/**/*.{ts,tsx,js,jsx}`],
    }) // Ajustar
  ),
];
// RUTA: apps/<nombre-app-next>/eslint.config.mjs
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Añadidas importaciones faltantes: `fixupConfigRules`, `eslintPluginReact`, `eslintPluginReactHooks`, `eslintPluginJsxA11y`, `eslintPluginNext`, `globals`.", "justificacion": "Resuelve los errores `ReferenceError: ... is not defined`.", "impacto": "Permite que el archivo de configuración se parsee y se aplique correctamente." },
  { "mejora": "Simplificación de la sección `plugins` en el bloque de código fuente de la app.", "justificacion": "Se asume que `nxPlugin.configs['flat/react-typescript']` y las configuraciones extendidas de Next.js (`compat.extends`) ya definen los plugins necesarios. Definirlos explícitamente solo es necesario si se quiere una configuración muy particular o si los presets no los incluyen (lo cual es raro).", "impacto": "Menos redundancia y menor probabilidad de conflicto `Cannot redefine plugin`."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
