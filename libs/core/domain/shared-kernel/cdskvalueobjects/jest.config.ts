// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/jest.config.ts
export default {
  displayName: 'cdskvalueobjects',
  preset: '../../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../../../coverage/libs/core/domain/shared-kernel/cdskvalueobjects',
  moduleNameMapper: {
    '^@dfs-suite/shtypes$':
      '<rootDir>/../../../../../libs/shared/shtypes/src/index.ts',
    '^@dfs-suite/sherrors$':
      '<rootDir>/../../../../../libs/shared/sherrors/src/index.ts',
    '^@dfs-suite/shutils$':
      '<rootDir>/../../../../../libs/shared/shutils/src/index.ts',
    '^@dfs-suite/shvalidationschemas$':
      '<rootDir>/../../../../../libs/shared/shvalidationschemas/src/index.ts',
    '^@dfs-suite/shconstants$':
      '<rootDir>/../../../../../libs/shared/shconstants/src/index.ts', // AÑADIDO
  },
  // passWithNoTests: false, // Mantenemos false
};
// RUTA: libs/core/domain/shared-kernel/cdskvalueobjects/jest.config.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Añadido `moduleNameMapper` para `@dfs-suite/shconstants`.", "justificacion": "Una dependencia transitiva (`shvalidationschemas` a través de `shutils`) requiere `@dfs-suite/shconstants`. Este mapeo es necesario para que Jest resuelva el módulo durante los tests de `cdskvalueobjects`.", "impacto": "Debería resolver el error `Cannot find module @dfs-suite/shared-constants` que se originaba en `pagination.schemas.ts`." }
]
*/
