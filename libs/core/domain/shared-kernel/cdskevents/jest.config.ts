// RUTA: libs/core/domain/shared-kernel/cdskevents/jest.config.ts
export default {
  displayName: 'cdskevents',
  preset: '../../../../../jest.preset.js', // 5 niveles
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory:
    '../../../../../coverage/libs/core/domain/shared-kernel/cdskevents',
  moduleNameMapper: {
    '^@dfs-suite/shtypes$':
      '<rootDir>/../../../../../libs/shared/shtypes/src/index.ts',
    '^@dfs-suite/sherrors$':
      '<rootDir>/../../../../../libs/shared/sherrors/src/index.ts',
    '^@dfs-suite/shutils$':
      '<rootDir>/../../../../../libs/shared/shutils/src/index.ts',
  },
  passWithNoTests: true,
};
// RUTA: libs/core/domain/shared-kernel/cdskevents/jest.config.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Paths de `moduleNameMapper` y `preset` verificados (5 niveles `../` para `preset`, paths absolutos desde raíz del workspace para `moduleNameMapper`).", "justificacion": "Asegura la correcta resolución.", "impacto": "Estabilidad de tests." },
  { "mejora": "Añadido `passWithNoTests: true`.", "justificacion": "Temporal hasta crear tests para `DomainEventBase` etc.", "impacto": "Evita fallos por 'No tests found'." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {"nota": "Revertir `passWithNoTests` a `false` al añadir tests."}
]
*/
