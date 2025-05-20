// RUTA: libs/core/domain/codotenancy/eslint.config.mjs (PLANTILLA)
import baseConfig from '../../../../eslint.config.mjs'; // 4 niveles
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monorepoRoot = path.resolve(__dirname, '../../../../');

export default tseslint.config(...baseConfig, {
  files: [`libs/core/domain/<nombre-lib-codo>/src/lib/**/*.ts`], // Ajustar <nombre-lib-codo>
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
    /* ... */
  },
});
// RUTA: libs/core/domain/<nombre-lib-codo>/eslint.config.mjs (PLANTILLA)
