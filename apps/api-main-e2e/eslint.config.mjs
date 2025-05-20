// RUTA: apps/api-main-e2e/eslint.config.mjs
// TODO: [LIA Legacy - Corregir imports en eslint.config.mjs de api-main-e2e] - ¡REALIZADO!
import baseConfig from '../../eslint.config.mjs';
import tseslint from 'typescript-eslint'; // Usar 'typescript-eslint' para el objeto tseslint
import * as tsParser from '@typescript-eslint/parser'; // Importar el parser explícitamente
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monorepoRoot = path.resolve(__dirname, '../../');

export default [
  // Envolver en tseslint.config si se usa la función helper, o directamente el array
  ...baseConfig,
  {
    files: ['apps/api-main-e2e/src/**/*.ts'],
    ignores: ['**/node_modules/**', '**/dist/**'],
    languageOptions: {
      parser: tsParser, // Usar el parser importado
      parserOptions: {
        project: [
          path.join(__dirname, 'tsconfig.json'), // tsconfig.json local de e2e
          path.join(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
      },
      globals: {
        ...globals.jest,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin, // Usar tseslint.plugin
    },
    rules: {
      ...(tseslint.configs.recommendedTypeChecked?.rules || {}), // Acceder a rules con type-checked
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      // Otras reglas específicas para e2e si son necesarias
    },
  },
];
// RUTA: apps/api-main-e2e/eslint.config.mjs
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Importación explícita de `tsParser` y uso correcto de `tseslint`.", "justificacion": "Resuelve el error `ReferenceError: tsParser is not defined` y asegura que el plugin de TypeScript se use correctamente en la configuración flat.", "impacto": "Permite que ESLint parsee y aplique reglas a los archivos de test E2E." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
