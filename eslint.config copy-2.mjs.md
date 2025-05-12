// eslint.config.mjs
import nxPlugin from '@nx/eslint-plugin';
import tsParser from '@typescript-eslint/parser'; // Volvemos a la importación estándar
import tsPlugin from '@typescript-eslint/eslint-plugin'; // Volvemos a la importación estándar
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    // Configuración global para todos los archivos
    ignores: ['**/node_modules/**', '**/dist/**', '.nx/'],
  },
  // Configuración base de Nx para TypeScript (esta ya incluye el parser y plugins básicos de TS)
  ...nxPlugin.configs['flat/typescript'],

  // Añadir configuraciones específicas de @typescript-eslint si es necesario
  // y si no están ya cubiertas por nxPlugin.configs['flat/typescript']
  // Por ejemplo, si quieres usar 'eslint-recommended' o 'recommended-type-checked' explícitamente:
  {
    files: ['**/*.ts', '**/*.tsx'], // Aplicar solo a archivos TypeScript
    languageOptions: {
      parser: tsParser, // Especificar el parser
      parserOptions: {
        project: ['./tsconfig.base.json', './apps/*/tsconfig.json', './libs/*/tsconfig.json', './libs/*/*/tsconfig.json', './libs/*/*/*/tsconfig.json' ],
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@nx': nxPlugin, // Asegurarse que el plugin de Nx también esté aquí si se usan sus reglas específicas
    },
    rules: {
      // Heredar reglas de @typescript-eslint (asegúrate que estas configs existan o ajusta)
      ...(tsPlugin.configs?.['eslint-recommended']?.rules || {}),
      ...(tsPlugin.configs?.['recommended-type-checked']?.rules || {}),
      // ...(tsPlugin.configs?.['stylistic-type-checked']?.rules || {}), // Opcional

      // Desactivar reglas de ESLint base que @typescript-eslint maneja mejor
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off', // Permitir inferencia donde sea obvio

      // Reglas de Límites de Módulo (esto viene del plugin @nx)
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: 'scope:shared',
              onlyDependOnLibsWithTags: ['scope:shared'],
            },
            {
              sourceTag: 'type:shared-kernel',
              onlyDependOnLibsWithTags: ['scope:shared', 'type:shared-kernel'],
            },
            {
              sourceTag: 'scope:core-domain',
              onlyDependOnLibsWithTags: ['scope:shared', 'type:shared-kernel', 'scope:core-domain'],
            },
            {
              sourceTag: 'scope:core-application',
              onlyDependOnLibsWithTags: [
                'scope:shared',
                'type:shared-kernel',
                'scope:core-domain',
                'scope:core-application',
              ],
            },
            {
              sourceTag: 'scope:infrastructure',
              onlyDependOnLibsWithTags: [
                'scope:shared',
                'type:shared-kernel',
                'scope:core-domain',
                'scope:core-application',
                'scope:infrastructure',
              ],
            },
            {
              sourceTag: 'scope:app',
              onlyDependOnLibsWithTags: [
                'scope:shared',
                'type:shared-kernel',
                'scope:core-domain',
                'scope:core-application',
                'scope:infrastructure',
              ],
            },
          ],
        },
      ],
    },
  },
  // Configuración de Prettier (se ejecuta al final para evitar conflictos)
  eslintConfigPrettier,
];
