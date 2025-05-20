// RUTA: libs/shared/sherrors/jest.config.ts
export default {
  displayName: 'sherrors',
  preset: '../../../jest.preset.js',
  testEnvironment: 'node',
  transform: {
    '^.+\\.[tj]s$': ['ts-jest', { tsconfig: '<rootDir>/tsconfig.spec.json' }],
  },
  moduleFileExtensions: ['ts', 'js', 'html'],
  coverageDirectory: '../../../coverage/libs/shared/sherrors',
  moduleNameMapper: {
    '^@dfs-suite/shtypes$': '<rootDir>/../shtypes/src/index.ts', // Corregido a 1 nivel ../
  },
  passWithNoTests: true,
};
// RUTA: libs/shared/sherrors/jest.config.ts
/* SECCIÓN DE MEJORAS REALIZADAS
[
  { "mejora": "Path de `moduleNameMapper` corregido para `shtypes`.", "justificacion": "`sherrors` está en `libs/shared/`, al igual que `shtypes`. El path relativo es `../shtypes/...`.", "impacto": "Correcta resolución si los tests de sherrors necesitaran importar de shtypes." },
  { "mejora": "Añadido `passWithNoTests: true`.", "justificacion": "Temporalmente para permitir que el pipeline de tests avance mientras no se creen tests específicos para las clases de error.", "impacto": "Evita fallos por 'No tests found'." }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {"nota": "Revertir `passWithNoTests` a `false` cuando se añadan tests, por ejemplo, para `ExceptionBase.toJSON()`."}
]
*/
