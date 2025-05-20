// RUTA: eslint.config.mjs (RAÍZ DEL MONOREPO)
import js from '@eslint/js';
import nxPlugin from '@nx/eslint-plugin';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import * as tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import eslintPluginImport from 'eslint-plugin-import';
import globals from 'globals';

// const __filename = fileURLToPath(import.meta.url); // No necesario si no usas __dirname con import.meta.url
// const __dirname = path.dirname(__filename);

// FlatCompat solo si es necesario para alguna configuración que extiendas aquí,
// de lo contrario, no es necesario en el archivo raíz si los locales lo manejan.
// const compat = new FlatCompat({
//   baseDirectory: __dirname, // __dirname definido arriba
//   recommendedConfig: js.configs.recommended,
// });

export default [
  {
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.nx/**',
      '**/coverage/**',
      '**/.next/**',
      '**/.vercel/**',
      '**/.swc/**',
      '**/*.md',
      '**/static/**',
      'dependency-graph.html',
      'project-graph.json',
      'project-graph-despues-limpieza.json',
      'pnpm-lock.yaml',
      '!eslint.config.mjs', // No ignorar este mismo archivo
      'apps/**/eslint.config.mjs', // Ignorar locales de este bloque global
      'libs/**/eslint.config.mjs', // Ignorar locales de este bloque global
      // Otros archivos de config que no se lintan o se lintan en bloques específicos
      '**/jest.config.ts',
      '**/jest.preset.js',
      '**/vite.config.ts',
      '**/webpack.config.js',
      '**/postcss.config.js',
      '**/tailwind.config.js',
      '.prettierrc.js',
      '.prettierrc',
      './components.json',
      './package-lock.json',
      './pnpm-workspace.yaml',
      './*.yaml',
    ],
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: ['**/eslint.config.mjs'], // Ignorar configs locales en este bloque
    languageOptions: {
      parser: tsParser,
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      globals: { ...globals.es2021, ...globals.node, ...globals.jest },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@nx': nxPlugin,
      import: eslintPluginImport,
      // NO plugins React/JSX aquí
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tsPlugin.configs['eslint-recommended'].rules,
      ...tsPlugin.configs.recommended.rules,
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
              sourceTag: 'scope:ui-web',
              onlyDependOnLibsWithTags: ['scope:shared', 'scope:ui-web'],
            },
            {
              sourceTag: 'scope:ui-mobile',
              onlyDependOnLibsWithTags: ['scope:shared', 'scope:ui-mobile'],
            },
            {
              sourceTag: 'type:shared-kernel',
              onlyDependOnLibsWithTags: ['scope:shared', 'type:shared-kernel'],
            },
            {
              sourceTag: 'layer:domain',
              onlyDependOnLibsWithTags: [
                'scope:shared',
                'type:shared-kernel',
                'layer:domain',
              ],
            },
            {
              sourceTag: 'layer:application',
              onlyDependOnLibsWithTags: [
                'scope:shared',
                'type:shared-kernel',
                'layer:domain',
                'layer:application',
              ],
            },
            {
              sourceTag: 'layer:infrastructure',
              onlyDependOnLibsWithTags: [
                'scope:shared',
                'type:shared-kernel',
                'layer:domain',
                'layer:application',
                'layer:infrastructure',
              ],
            },
            {
              sourceTag: 'scope:app',
              onlyDependOnLibsWithTags: [
                'scope:shared',
                'scope:ui-web',
                'scope:ui-mobile',
                'layer:application',
                'layer:infrastructure',
              ],
            },
            {
              sourceTag: 'type:api',
              onlyDependOnLibsWithTags: [
                'scope:shared',
                'layer:application',
                'layer:infrastructure',
              ],
            },
            {
              sourceTag: 'type:pwa',
              onlyDependOnLibsWithTags: [
                'scope:shared',
                'scope:ui-web',
                'layer:application',
              ],
            },
            {
              sourceTag: 'type:mobile-rn',
              onlyDependOnLibsWithTags: [
                'scope:shared',
                'scope:ui-mobile',
                'layer:application',
                'layer:domain',
                'type:shared-kernel',
              ],
            },
            { sourceTag: 'scope:app', notDependOnLibsWithTags: ['scope:app'] },
          ],
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-console': [
        'warn',
        {
          allow: ['warn', 'error', 'info', 'debug', 'table', 'time', 'timeEnd'],
        },
      ],
      'import/order': [
        'warn',
        {
          groups: [
            'builtin',
            'external',
            'internal',
            'parent',
            'sibling',
            'index',
            'object',
            'type',
          ],
          pathGroups: [
            { pattern: 'react', group: 'external', position: 'before' },
            { pattern: 'next/**', group: 'external', position: 'before' },
            { pattern: '@nestjs/**', group: 'external', position: 'before' },
            { pattern: '@dfs-suite/**', group: 'internal', position: 'before' },
            { pattern: '@/**', group: 'internal', position: 'before' },
          ],
          pathGroupsExcludedImportTypes: ['react', 'next/**', '@nestjs/**'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
  // Configuración para los propios archivos eslint.config.mjs (raíz y locales)
  {
    files: ['eslint.config.mjs', '**/eslint.config.mjs'],
    languageOptions: {
      parser: tsParser, // Pueden tener sintaxis TS si se usa ts-node o similar
      parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
      globals: {
        ...globals.node,
        __dirname: 'readonly',
        process: 'readonly',
        module: 'writable',
        require: 'readonly',
        exports: 'writable',
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      'import/no-commonjs': 'off',
      'no-undef': 'off',
    },
  },
  eslintConfigPrettier,
];
// RUTA: eslint.config.mjs
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Asegurado que no haya `import baseConfig from ...` en el archivo raíz.", "justificacion": "El archivo raíz es la base, no hereda de otro archivo externo al proyecto.", "impacto": "Resuelve el error `ERR_MODULE_NOT_FOUND` para `eslint.config.mjs`." },
  { "mejora": "Ajuste de `ignores` en el bloque global para `eslint.config.mjs` locales.", "justificacion": "Evita que el bloque global intente linterar los configs locales que ya tienen su propia estructura.", "impacto": "Mejor organización y previene conflictos de linting."}
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
