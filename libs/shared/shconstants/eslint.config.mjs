// RUTA: libs/shared/shconstants/eslint.config.mjs
import baseConfig from '../../../eslint.config.mjs'; // Path relativo a la raíz del monorepo
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monorepoRoot = path.resolve(__dirname, '../../../');

export default tseslint.config(...baseConfig, {
  files: ['libs/shared/shconstants/src/lib/**/*.ts'],
  ignores: ['**/node_modules/**', '**/dist/**'],
  languageOptions: {
    parserOptions: {
      project: [
        path.join(__dirname, 'tsconfig.lib.json'),
        // No tsconfig.spec.json en project si no hay tests
        path.join(monorepoRoot, 'tsconfig.base.json'),
      ],
      tsconfigRootDir: monorepoRoot,
    },
  },
  rules: {
    // Reglas específicas para shconstants si son necesarias
  },
});
// RUTA: libs/shared/shconstants/eslint.config.mjs
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Path de importación de `baseConfig` corregido a `../../../eslint.config.mjs`.", "justificacion": "Asegura la correcta herencia de la configuración ESLint raíz.", "impacto": "Resolución del error de grafo `ERR_MODULE_NOT_FOUND` para este archivo." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
