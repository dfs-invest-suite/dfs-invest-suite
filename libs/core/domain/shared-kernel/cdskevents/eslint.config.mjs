// RUTA: libs/core/domain/shared-kernel/cdskevents/eslint.config.mjs
import baseConfig from '../../../../../eslint.config.mjs'; // Path relativo a la raíz del monorepo
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monorepoRoot = path.resolve(__dirname, '../../../../../'); // Ajustar para llegar a la raíz

export default tseslint.config(...baseConfig, {
  files: ['libs/core/domain/shared-kernel/cdskevents/src/lib/**/*.ts'],
  ignores: ['**/node_modules/**', '**/dist/**'],
  languageOptions: {
    parserOptions: {
      project: [
        path.join(__dirname, 'tsconfig.lib.json'),
        path.join(__dirname, 'tsconfig.spec.json'), // Asumiendo que puede tener tests
        path.join(monorepoRoot, 'tsconfig.base.json'),
      ],
      tsconfigRootDir: monorepoRoot,
    },
  },
  rules: {
    // Reglas específicas para cdskevents si son necesarias
  },
});
// RUTA: libs/core/domain/shared-kernel/cdskevents/eslint.config.mjs
