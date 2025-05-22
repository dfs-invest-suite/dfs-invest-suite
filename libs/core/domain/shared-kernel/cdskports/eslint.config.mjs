// RUTA: libs/core/domain/shared-kernel/cdskports/eslint.config.mjs
// Autor: L.I.A Legacy (IA Asistente)
import baseConfig from '../../../../../eslint.config.mjs'; // 5 niveles para la raíz
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monorepoRoot = path.resolve(__dirname, '../../../../../');

export default tseslint.config(
  ...baseConfig,
  {
    files: ['libs/core/domain/shared-kernel/cdskports/src/lib/**/*.ts'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'libs/core/domain/shared-kernel/cdskports/jest.config.ts',
      // No hay archivos .spec.ts en esta librería (solo interfaces)
    ],
    languageOptions: {
      parserOptions: {
        project: [
          path.join(__dirname, 'tsconfig.lib.json'),
          path.join(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
      },
    },
    rules: {
      // Reglas específicas si son necesarias
    },
  }
  // No se necesita bloque de test si no hay tests
);
// RUTA: libs/core/domain/shared-kernel/cdskports/eslint.config.mjs
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Configuración ESLint local para `cdskports`.", "justificacion": "Asegura linting específico.", "impacto": "Calidad." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
