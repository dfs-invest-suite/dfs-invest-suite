// RUTA: libs/core/domain/codowhatsapp/eslint.config.mjs
import baseConfig from '../../../../eslint.config.mjs'; // 4 niveles para la raíz
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monorepoRoot = path.resolve(__dirname, '../../../../');

export default tseslint.config(
  ...baseConfig,
  {
    files: ['libs/core/domain/codowhatsapp/src/lib/**/*.ts'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'libs/core/domain/codowhatsapp/jest.config.ts',
      'libs/core/domain/codowhatsapp/src/**/*.spec.ts',
      'libs/core/domain/codowhatsapp/src/**/*.test.ts',
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
      // Reglas específicas para codowhatsapp si son necesarias
    },
  },
  {
    files: [
      'libs/core/domain/codowhatsapp/src/lib/**/*.spec.ts',
      'libs/core/domain/codowhatsapp/src/lib/**/*.test.ts',
    ],
    languageOptions: {
      parserOptions: {
        project: [
          path.join(__dirname, 'tsconfig.spec.json'),
          path.join(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
      },
    },
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_' },
      ],
    },
  }
);
// RUTA: libs/core/domain/codowhatsapp/eslint.config.mjs
