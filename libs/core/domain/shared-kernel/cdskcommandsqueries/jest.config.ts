// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/jest.config.ts
// TODO: [LIA Legacy - Corregir moduleNameMapper para cdskcommandsqueries] - ¡REALIZADO!
// Propósito: Configuración Jest para cdskcommandsqueries con mapeos explícitos y correctos.
// Relacionado con Casos de Uso: Tests de CommandBase, QueryBase.

export default {
  displayName: 'cdskcommandsqueries',
  preset: '../../../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../../../coverage/libs/core/domain/shared-kernel/cdskcommandsqueries',
  moduleNameMapper: {
    // <rootDir> es libs/core/domain/shared-kernel/cdskcommandsqueries/
    '^@dfs-suite/shtypes$':
      '<rootDir>/../../../../../libs/shared/shtypes/src/index.ts',
    '^@dfs-suite/shutils$':
      '<rootDir>/../../../../../libs/shared/shutils/src/index.ts',
    '^@dfs-suite/shresult$':
      '<rootDir>/../../../../../libs/shared/shresult/src/index.ts',
    '^@dfs-suite/sherrors$':
      '<rootDir>/../../../../../libs/shared/sherrors/src/index.ts',
    '^@dfs-suite/shconstants$':
      '<rootDir>/../../../../../libs/shared/shconstants/src/index.ts',
  },
  // passWithNoTests: false, // Tiene command.base.spec.ts
};
// RUTA: libs/core/domain/shared-kernel/cdskcommandsqueries/jest.config.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Uso de mapeo explícito con paths relativos corregidos.", "justificacion": "Misma lógica que para `cdskvalueobjects`.", "impacto": "Debería resolver los errores `Cannot find module`." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
