// RUTA: libs/core/domain/codonotificationscore/jest.config.ts
import path from 'node:path';
const monorepoRoot = path.resolve(__dirname, '../../../../'); // 4 niveles arriba

export default {
  displayName: 'codonotificationscore',
  preset: '../../../../jest.preset.js', // Ajustar path al preset raíz
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../../coverage/libs/core/domain/codonotificationscore',
  moduleNameMapper: {
    // --- libs/shared ---
    '^@dfs-suite/shtypes$': path.join(
      monorepoRoot,
      'libs/shared/shtypes/src/index.ts'
    ),
    '^@dfs-suite/shutils$': path.join(
      monorepoRoot,
      'libs/shared/shutils/src/index.ts'
    ),
    '^@dfs-suite/sherrors$': path.join(
      monorepoRoot,
      'libs/shared/sherrors/src/index.ts'
    ),
    // '^@dfs-suite/shresult$': path.join(monorepoRoot, 'libs/shared/shresult/src/index.ts'), // No usado directamente por los VOs actuales
    // '^@dfs-suite/shconstants$': path.join(monorepoRoot, 'libs/shared/shconstants/src/index.ts'),
    // '^@dfs-suite/shvalidationschemas$': path.join(monorepoRoot, 'libs/shared/shvalidationschemas/src/index.ts'),

    // --- libs/core/domain/shared-kernel ---
    // '^@dfs-suite/cdskentities$': path.join(monorepoRoot, 'libs/core/domain/shared-kernel/cdskentities/src/index.ts'),
    '^@dfs-suite/cdskvalueobjects$': path.join(
      monorepoRoot,
      'libs/core/domain/shared-kernel/cdskvalueobjects/src/index.ts'
    ),
    // '^@dfs-suite/cdskevents$': path.join(monorepoRoot, 'libs/core/domain/shared-kernel/cdskevents/src/index.ts'),
    // '^@dfs-suite/cdskports$': path.join(monorepoRoot, 'libs/core/domain/shared-kernel/cdskports/src/index.ts'),
    // '^@dfs-suite/cdskcommandsqueries$': path.join(monorepoRoot, 'libs/core/domain/shared-kernel/cdskcommandsqueries/src/index.ts'),
    // '^@dfs-suite/cdskmappers$': path.join(monorepoRoot, 'libs/core/domain/shared-kernel/cdskmappers/src/index.ts'),

    // --- libs/core/domain/<contexto> --- (Específicamente codousersroles por EUserRole)
    '^@dfs-suite/codousersroles$': path.join(
      monorepoRoot,
      'libs/core/domain/codousersroles/src/index.ts'
    ),
  },
  passWithNoTests: true, // Cambiar a false cuando se añadan tests para los VOs
};
// RUTA: libs/core/domain/codonotificationscore/jest.config.ts
