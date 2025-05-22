// RUTA: libs/core/domain/codomessagelog/jest.config.ts
import path from 'node:path';
const monorepoRoot = path.resolve(__dirname, '../../../../'); // 4 niveles arriba

export default {
  displayName: 'codomessagelog',
  preset: '../../../../jest.preset.js', // Ajustar path al preset raíz
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../../coverage/libs/core/domain/codomessagelog',
  moduleNameMapper: {
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
    '^@dfs-suite/shresult$': path.join(
      monorepoRoot,
      'libs/shared/shresult/src/index.ts'
    ),
    '^@dfs-suite/cdskentities$': path.join(
      monorepoRoot,
      'libs/core/domain/shared-kernel/cdskentities/src/index.ts'
    ),
    '^@dfs-suite/cdskevents$': path.join(
      monorepoRoot,
      'libs/core/domain/shared-kernel/cdskevents/src/index.ts'
    ),
    '^@dfs-suite/cdskvalueobjects$': path.join(
      monorepoRoot,
      'libs/core/domain/shared-kernel/cdskvalueobjects/src/index.ts'
    ),
    '^@dfs-suite/codowhatsapp$': path.join(
      monorepoRoot,
      'libs/core/domain/codowhatsapp/src/index.ts'
    ), // Dependencia de codowhatsapp
  },
  passWithNoTests: true, // Cambiar a false cuando se añadan tests
};
// RUTA: libs/core/domain/codomessagelog/jest.config.ts
