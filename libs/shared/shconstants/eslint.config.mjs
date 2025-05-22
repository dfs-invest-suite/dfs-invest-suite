// RUTA: libs/shared/shconstants/eslint.config.mjs
// Autor: L.I.A Legacy (IA Asistente)
import baseConfig from '../../../eslint.config.mjs'; // 3 niveles para llegar a la raíz
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monorepoRoot = path.resolve(__dirname, '../../../');

export default tseslint.config(...baseConfig, {
  files: ['libs/shared/shconstants/src/lib/**/*.ts'],
  ignores: [
    '**/node_modules/**',
    '**/dist/**',
    'libs/shared/shconstants/jest.config.ts', // Excluir jest.config.ts
    // No hay archivos .spec.ts en esta librería
  ],
  languageOptions: {
    parserOptions: {
      project: [
        path.join(__dirname, 'tsconfig.lib.json'),
        path.join(monorepoRoot, 'tsconfig.base.json'),
        // No se añade tsconfig.spec.json si la librería no tiene tests
      ],
      tsconfigRootDir: monorepoRoot,
    },
  },
  rules: {
    // Reglas específicas para shconstants si son necesarias
    // (generalmente no, ya que son solo constantes)
  },
});
// RUTA: libs/shared/shconstants/eslint.config.mjs
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Configuración ESLint local para `shconstants`.", "justificacion": "Asegura linting específico para la librería, incluyendo `parserOptions.project` correctos. No incluye `tsconfig.spec.json` en `project` porque esta librería no tiene tests.", "impacto": "Preparación para el linting." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
