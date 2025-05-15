// ruta/relativa/al/archivo.extension
// RUTA: eslint.config.mjs (RAÍZ DEL MONOREPO - SIMPLIFICADO)
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

// import { fixupConfigRules } from '@eslint/compat'; // No es estrictamente necesario aquí si las configs hijas lo manejan
// import { FlatCompat } from '@eslint/eslintrc'; // No es estrictamente necesario aquí
import js from '@eslint/js';
import nxPlugin from '@nx/eslint-plugin';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import * as tsParser from '@typescript-eslint/parser';
import eslintConfigPrettier from 'eslint-config-prettier';
import globals from 'globals';
// import { dirname } from 'path'; // No es necesario si no se usa currentDir aquí
// import { fileURLToPath } from 'url'; // No es necesario si no se usa currentDir aquí

// const currentDir = dirname(fileURLToPath(import.meta.url)); // No se necesita para esta config raíz simplificada

// No más projectTsConfigsForSource ni projectTsConfigsForTests aquí

const baseConfig = [
  {
    // Aplicar a todos los archivos relevantes por defecto
    files: ['**/*.{js,jsx,ts,tsx}'],
    ignores: [
      '**/node_modules/**',
      '**/dist/**',
      '**/.nx/**',
      '**/coverage/**',
      '**/.next/**', // Específico de Next.js, pero común en monorepos
      '**/.swc/**', // Usado por Next.js/SWC
      '**/*.md',
      'dependency-graph.html',
      'project-graph.json',
      'static/**',
      // Excluir los archivos de config de este bloque general; se tratarán por separado
      '**/*.config.js',
      '**/*.config.mjs',
      '**/*.config.ts',
      '**/jest.config.ts',
      '**/jest.preset.js',
      '**/jest.setup.ts',
      '**/test-setup.ts',
      '**/webpack.config.js',
      '**/postcss.config.js',
      '**/tailwind.config.js',
      '.prettierrc.js', // Si existiera
      './components.json',
      'eslint.config.mjs', // Este mismo archivo
    ],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        // NO `project` aquí para el bloque global.
        // Los configs locales definirán `project` para sus contextos.
      },
      globals: {
        ...globals.browser, // Para PWAs y libs UI
        ...globals.node, // Para backend y libs Node
        ...globals.jest, // Para tests en todo el monorepo
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@nx': nxPlugin,
    },
    rules: {
      // Reglas base de ESLint y TypeScript (NO type-checked)
      ...js.configs.recommended.rules,
      ...tsPlugin.configs['eslint-recommended'].rules,
      ...tsPlugin.configs.recommended.rules,

      // Regla de arquitectura de Nx (CRUCIAL)
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
              sourceTag: 'type:ui',
              onlyDependOnLibsWithTags: ['scope:shared', 'type:ui'],
            },
            {
              sourceTag: 'layer:domain',
              onlyDependOnLibsWithTags: ['layer:domain', 'scope:shared'],
            },
            {
              sourceTag: 'type:shared-kernel',
              onlyDependOnLibsWithTags: ['type:shared-kernel', 'scope:shared'],
            },
            {
              sourceTag: 'layer:application',
              onlyDependOnLibsWithTags: [
                'layer:application',
                'layer:domain',
                'scope:shared',
              ],
            },
            {
              sourceTag: 'layer:infrastructure',
              onlyDependOnLibsWithTags: [
                'layer:infrastructure',
                'layer:application',
                'layer:domain',
                'scope:shared',
              ],
            },
            {
              sourceTag: 'scope:app',
              onlyDependOnLibsWithTags: [
                'layer:application',
                'layer:infrastructure',
                'type:ui',
                'scope:shared',
              ],
            },
            { sourceTag: 'scope:app', notDependOnLibsWithTags: ['scope:app'] },
          ],
        },
      ],

      // Reglas generales de calidad y estilo (no type-aware)
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error', 'info', 'debug'] }],
      'react/react-in-jsx-scope': 'off',
    },
  },

  // Bloque específico para archivos de Configuración
  {
    files: [
      '**/*.config.js',
      '**/*.config.mjs',
      '**/*.config.ts',
      '**/jest.config.ts',
      '**/jest.preset.js',
      '**/jest.setup.ts',
      '**/test-setup.ts',
      'eslint.config.mjs',
      '**/postcss.config.js',
      '**/tailwind.config.js',
      '**/webpack.config.js',
      '.prettierrc.js',
      './components.json',
    ],
    ignores: ['**/node_modules/**', '**/dist/**', '**/.next/**'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
      globals: {
        module: 'writable',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        console: 'readonly',
        exports: 'writable',
      },
    },
    plugins: { '@typescript-eslint': tsPlugin },
    rules: {
      '@typescript-eslint/no-var-requires': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      'no-undef': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-unsafe-assignment': 'off',
      '@typescript-eslint/no-unsafe-call': 'off',
      '@typescript-eslint/no-unsafe-member-access': 'off',
      '@typescript-eslint/no-unsafe-return': 'off',
      '@typescript-eslint/no-misused-promises': 'off',
      '@typescript-eslint/no-floating-promises': 'off',
    },
  },

  // Bloque para archivos .d.ts
  {
    files: ['**/*.d.ts'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },

  // Configuración de Prettier (DEBE SER LA ÚLTIMA)
  eslintConfigPrettier,
];

export default baseConfig;
// ruta/relativa/al/archivo.extension
// RUTA: eslint.config.mjs (RAÍZ DEL MONOREPO - SIMPLIFICADO)
