// RUTA: libs/core/domain/codomessagelog/eslint.config.mjs
import baseConfig from '../../../../eslint.config.mjs'; // 4 niveles para la raíz
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import globals from 'globals'; // Importar globals

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monorepoRoot = path.resolve(__dirname, '../../../../');

export default tseslint.config(
  ...baseConfig, // Heredar configuración raíz primero
  {
    // Configuración para el código fuente de la librería
    files: ['libs/core/domain/codomessagelog/src/lib/**/*.ts'],
    ignores: [
      // Ignorar node_modules, dist, y archivos de test de ESTE bloque
      '**/node_modules/**',
      '**/dist/**',
      'libs/core/domain/codomessagelog/jest.config.ts',
      'libs/core/domain/codomessagelog/src/**/*.spec.ts',
      'libs/core/domain/codomessagelog/src/**/*.test.ts',
    ],
    languageOptions: {
      parserOptions: {
        project: [
          path.join(__dirname, 'tsconfig.lib.json'),
          path.join(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
      },
      globals: {
        // Globals específicos para esta librería si los hubiera (ej. para Node.js)
        ...globals.node, // Asumiendo que esta librería de dominio puede correr en entorno Node
      },
    },
    rules: {
      // Reglas específicas para codomessagelog si son necesarias
      // Se heredarán las de baseConfig, incluyendo las de @nx/enforce-module-boundaries
    },
  },
  {
    // Configuración para los archivos de test de la librería
    files: [
      'libs/core/domain/codomessagelog/src/lib/**/*.spec.ts',
      'libs/core/domain/codomessagelog/src/lib/**/*.test.ts',
    ],
    ignores: ['**/node_modules/**', '**/dist/**'],
    languageOptions: {
      parserOptions: {
        project: [
          path.join(__dirname, 'tsconfig.spec.json'),
          path.join(monorepoRoot, 'tsconfig.base.json'),
        ],
        tsconfigRootDir: monorepoRoot,
      },
      globals: {
        ...globals.jest, // Globals para Jest
        ...globals.node,
      },
    },
    rules: {
      // Reglas más relajadas para tests si es necesario
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/ban-ts-comment': [
        'error',
        { 'ts-expect-error': 'allow-with-description' },
      ],
    },
  }
);
// RUTA: libs/core/domain/codomessagelog/eslint.config.mjs
