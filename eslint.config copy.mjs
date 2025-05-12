// eslint.config.mjs
import nxPlugin from '@nx/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import eslintConfigPrettier from 'eslint-config-prettier';

export default [
  {
    ignores: ['**/node_modules/**', '**/dist/**', '.nx/'],
  },
  ...nxPlugin.configs['flat/typescript'], // Base de Nx para TS
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: ['./tsconfig.base.json', './apps/*/tsconfig.json', './libs/*/tsconfig.json', './libs/*/*/tsconfig.json', './libs/*/*/*/tsconfig.json' ],
        sourceType: 'module',
        ecmaVersion: 'latest',
      },
    },
    plugins: {
      '@typescript-eslint': tsPlugin,
      '@nx': nxPlugin,
    },
    rules: {
      ...(tsPlugin.configs?.['eslint-recommended']?.rules || {}),
      ...(tsPlugin.configs?.['recommended-type-checked']?.rules || {}),

      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-unsafe-return': 'warn', // Establecer a 'warn' si decidimos mantener la desactivación en value-object, o 'error' y manejarla.
                                                    // Por ahora, la dejaremos como estaba en la configuración de ESLint que te di.
                                                    // El error específico lo manejamos con el disable.

      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            // REGLA 1: SHARED (capa más externa, solo depende de sí mismo)
            {
              sourceTag: 'layer:shared', // Usaremos 'layer:shared' como tag principal
              onlyDependOnLibsWithTags: ['layer:shared'],
            },
            // REGLA 2: SHARED-KERNEL (para DDD, depende de shared)
            {
              sourceTag: 'type:shared-kernel', // layer:domain implícito por scope:core-domain
              onlyDependOnLibsWithTags: ['layer:shared', 'type:shared-kernel'],
            },
            // REGLA 3: CORE-DOMAIN LÓGICA (específico del dominio)
            // Puede depender de shared y shared-kernel. Puede depender de otro core-domain (con precaución, preferir eventos).
            {
              sourceTag: 'layer:domain', // Tag principal para lógica de dominio (no shared-kernel)
              onlyDependOnLibsWithTags: ['layer:shared', 'type:shared-kernel', 'layer:domain'],
            },
            // REGLA 4: CORE-APPLICATION
            // Depende de shared, shared-kernel, y su propio layer:domain.
            {
              sourceTag: 'layer:application',
              onlyDependOnLibsWithTags: [
                'layer:shared',
                'type:shared-kernel',
                'layer:domain',
                'layer:application',
              ],
            },
            // REGLA 5: INFRASTRUCTURE
            // Depende de shared, shared-kernel, y las capas de aplicación y dominio que implementa/adapta.
            {
              sourceTag: 'layer:infrastructure',
              onlyDependOnLibsWithTags: [
                'layer:shared',
                'type:shared-kernel',
                'layer:domain',
                'layer:application',
                'layer:infrastructure',
              ],
            },
            // REGLA 6: APPLICATIONS (apps/*)
            // Dependen de shared y de las capas de aplicación e infraestructura.
            // No deberían depender directamente de layer:domain o type:shared-kernel si seguimos el flujo.
            {
              sourceTag: 'scope:app',
              onlyDependOnLibsWithTags: [
                'layer:shared',
                'layer:application',
                'layer:infrastructure',
                // Podríamos añadir type:shared-kernel si es necesario para algún tipo base,
                // pero idealmente las apps consumen la capa de aplicación.
              ],
            },
          ],
        },
      ],
    },
  },
  eslintConfigPrettier,
];
