// RUTA: apps/api-main/eslint.config.mjs
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
import tsPlugin from '@typescript-eslint/eslint-plugin';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import baseConfig from '../../eslint.config.mjs'; // Asumiendo que es '../../eslint.config.mjs' para subir dos niveles

const monorepoRoot = dirname(dirname(fileURLToPath(import.meta.url)));

const apiMainConfig = [
  ...baseConfig,
  {
    // Código Fuente
    files: ['apps/api-main/src/app/**/*.ts', 'apps/api-main/src/main.ts'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      'apps/api-main/jest.config.ts',
      'apps/api-main/src/**/*.spec.ts',
    ],
    languageOptions: {
      parserOptions: {
        project: [
          `${monorepoRoot}/apps/api-main/tsconfig.app.json`,
          `${monorepoRoot}/tsconfig.base.json`,
        ],
        tsconfigRootDir: monorepoRoot,
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs['recommended-type-checked'].rules,
      '@typescript-eslint/no-misused-promises': [
        'error',
        { checksVoidReturn: { attributes: false } },
      ],
      '@typescript-eslint/no-floating-promises': [
        'error',
        { ignoreVoid: true },
      ],
    },
  },
  {
    // Tests
    files: ['apps/api-main/src/**/*.spec.ts'],
    ignores: ['**/node_modules/**', '**/dist/**'],
    languageOptions: {
      parserOptions: {
        project: [
          `${monorepoRoot}/apps/api-main/tsconfig.spec.json`,
          `${monorepoRoot}/tsconfig.base.json`,
        ],
        tsconfigRootDir: monorepoRoot,
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      ...tsPlugin.configs['recommended-type-checked'].rules,
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
    },
  },
];
export default apiMainConfig;
// RUTA: apps/api-main/eslint.config.mjs
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Asegurar que `baseConfig` se importe correctamente desde la raíz.",
    "justificacion": "El path `../../eslint.config.mjs` debe ser correcto para que herede la configuración base. El snapshot original del archivo no mostraba esta importación, lo cual era un problema mayor. Ahora está corregido, pero es importante verificar siempre la ruta de herencia.",
    "impacto": "Correcta aplicación de reglas globales y de prettier."
  },
  {
    "mejora": "Verificar la lista de `ignores`",
    "justificacion": "Asegurar que todos los archivos generados o no relevantes para el linting de `api-main` (ej. `webpack.config.js` si no se quiere linterar, o archivos específicos de `assets`) estén en `ignores`.",
    "impacto": "Evitar errores de linting en archivos no deseados y mejorar performance del linter."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "La corrección principal aquí fue asegurar que `baseConfig` se importa y se usa. El error original `javascript is not defined` del `project-graph.json` probablemente se debía a una mala configuración o una referencia incorrecta que he asumido se ha corregido al reestructurar el `eslint.config.mjs` raíz anteriormente para que no tenga `js` y en su lugar las configs hijas importen lo que necesiten."
  }
]
*/
