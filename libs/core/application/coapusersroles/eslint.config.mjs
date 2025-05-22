// RUTA: libs/core/application/coapusersroles/eslint.config.mjs
import baseConfig from '../../../../eslint.config.mjs'; // 4 niveles para la raíz
import tseslint from 'typescript-eslint';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import globals from 'globals';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const monorepoRoot = path.resolve(__dirname, '../../../../');

export default tseslint.config(
  ...baseConfig,
  {
    files: ['libs/core/application/coapusersroles/src/lib/**/*.ts'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'libs/core/application/coapusersroles/jest.config.ts',
      'libs/core/application/coapusersroles/src/**/*.spec.ts',
      'libs/core/application/coapusersroles/src/**/*.test.ts',
    ],
    languageOptions: {
      parser: tseslint.parser, // Asegurar que el parser se asigne correctamente
      parserOptions: {
        project: [
          path.join(__dirname, 'tsconfig.lib.json'), // tsconfig de la librería actual
          // MUY IMPORTANTE: Añadir los tsconfig.lib.json de TODAS las librerías dependientes
          // para que ESLint pueda resolver sus tipos al hacer el type-checking.
          path.join(monorepoRoot, 'libs/shared/shtypes/tsconfig.lib.json'),
          path.join(monorepoRoot, 'libs/shared/shutils/tsconfig.lib.json'),
          path.join(monorepoRoot, 'libs/shared/sherrors/tsconfig.lib.json'),
          path.join(monorepoRoot, 'libs/shared/shresult/tsconfig.lib.json'),
          path.join(
            monorepoRoot,
            'libs/core/domain/shared-kernel/cdskcommandsqueries/tsconfig.lib.json'
          ),
          path.join(
            monorepoRoot,
            'libs/core/domain/shared-kernel/cdskevents/tsconfig.lib.json'
          ),
          path.join(
            monorepoRoot,
            'libs/core/domain/shared-kernel/cdskports/tsconfig.lib.json'
          ),
          path.join(
            monorepoRoot,
            'libs/core/domain/codousersroles/tsconfig.lib.json'
          ),
          // path.join(monorepoRoot, 'libs/infrastructure/infrasecurity/tsconfig.lib.json'), // Ya no es dependencia directa
          path.join(monorepoRoot, 'tsconfig.base.json'), // El base siempre al final o después de los específicos
        ],
        tsconfigRootDir: monorepoRoot,
      },
      globals: {
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
      // Aquí aplicaríamos las reglas que dependen de tipos si no están ya en baseConfig
      // Ejemplo: ...tseslint.configs['recommended-type-checked'].rules,
      // (Asegurarse de que esto no cause conflictos con baseConfig)
    },
  },
  {
    files: [
      'libs/core/application/coapusersroles/src/lib/**/*.spec.ts',
      'libs/core/application/coapusersroles/src/lib/**/*.test.ts',
    ],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: [
          path.join(__dirname, 'tsconfig.spec.json'),
          // También podría necesitar los tsconfig.lib.json de las dependencias si los tests importan tipos complejos.
          path.join(monorepoRoot, 'libs/shared/shtypes/tsconfig.lib.json'),
          path.join(
            monorepoRoot,
            'libs/core/domain/codousersroles/tsconfig.lib.json'
          ),
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
      '@typescript-eslint': tseslint.plugin,
    },
    rules: {
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
// RUTA: libs/core/application/coapusersroles/eslint.config.mjs
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Modificación de `parserOptions.project` en `eslint.config.mjs` de `coapusersroles`.", "justificacion": "Para que ESLint (con reglas type-aware) pueda resolver los tipos de las librerías dependientes, es crucial incluir los `tsconfig.lib.json` de esas dependencias en el array `project`. También se aseguró el `parser: tseslint.parser` explícito.", "impacto": "Esta es la corrección más probable para los errores `no-undef` de tipos que provienen de otras librerías del workspace." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  { "nota": "La lista de `tsconfig.lib.json` en `parserOptions.project` debe ser exhaustiva para todas las dependencias directas e indirectas cuyos tipos se necesiten resolver. Este enfoque puede volverse tedioso para librerías con muchas dependencias. Una alternativa que Nx intenta gestionar es que `tsconfig.base.json` con sus `paths` y los `references` en los `tsconfig.json` locales sean suficientes, pero para el linting type-aware a veces se necesita esta explicitud en `eslint.config.mjs`." },
  { "nota": "Si los errores `no-undef` persisten después de esto, el siguiente paso es verificar que los `index.ts` de las librerías dependientes estén exportando correctamente los tipos que `authenticate-user.use-case.ts` necesita."}
]
*/
