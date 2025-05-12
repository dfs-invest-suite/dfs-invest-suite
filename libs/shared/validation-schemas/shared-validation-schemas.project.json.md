{
  "name": "shared-validation-schemas",
  "$schema": "../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/shared/validation-schemas/src",
  "projectType": "library",
  "tags": ["scope:shared", "type:validation", "layer:shared"],
  "targets": {
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "libs/shared/validation-schemas/jest.config.ts",
        "passWithNoTests": true // Se mantiene hasta que se añadan tests para los schemas
      }
    }
  }
}
/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Tests para Schemas de Validación): Aunque los schemas de Zod son declarativos, se pueden escribir tests para verificar que validan y rechazan datos correctamente, especialmente para schemas complejos o con lógica condicional (`.refine()`, `.superRefine()`).
  Justificación: Aumenta la confianza en que los esquemas de validación se comportan como se espera y detectan datos incorrectos.
  Impacto: Creación de archivos `.spec.ts` para los schemas más importantes (ej. `common.schemas.spec.ts`). Una vez implementados, se podría remover `passWithNoTests: true`.
]
[
  Mejora Propuesta 2 (Tipos Inferidos de Schemas): Zod permite inferir tipos TypeScript a partir de los schemas (`z.infer<typeof MySchema>`). Se podría considerar exportar estos tipos inferidos desde la librería si son frecuentemente necesitados por los consumidores, para evitar que cada consumidor tenga que inferirlos.
  Justificación: Reduce boilerplate en los consumidores y centraliza la definición del tipo de dato junto con su validador.
  Impacto: Añadir exportaciones de tipos inferidos en el `index.ts`.
]

*/
