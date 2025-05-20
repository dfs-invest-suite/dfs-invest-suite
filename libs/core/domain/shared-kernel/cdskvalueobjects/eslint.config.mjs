// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/eslint.config.mjs
import baseConfig from '../../../../../eslint.config.mjs';
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monorepoRoot = path.resolve(__dirname, '../../../../../');

export default tseslint.config(...baseConfig, {
  files: ['libs/core/domain/shared-kernel/cdskvalueobjects/src/lib/**/*.ts'],
  ignores: ['**/node_modules/**', '**/dist/**'],
  languageOptions: {
    parserOptions: {
      project: [
        path.join(__dirname, 'tsconfig.lib.json'),
        path.join(__dirname, 'tsconfig.spec.json'),
        path.join(monorepoRoot, 'tsconfig.base.json'),
      ],
      tsconfigRootDir: monorepoRoot,
    },
  },
  rules: {
    // ...
  },
});
// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/eslint.config.mjs
