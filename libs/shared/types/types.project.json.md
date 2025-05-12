MEJORAS FUTURAS
{
  "name": "shared-types",
  "$schema": "../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/shared/types/src",
  "projectType": "library",
  "tags": ["scope:shared", "type:types", "layer:shared"],
  "targets": {
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "libs/shared/types/jest.config.ts",
        "passWithNoTests": true
      }
    }
  }
}
/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Tests de Tipos con `tsd`): Para una librería que se centra exclusivamente en tipos e interfaces, se podrían introducir "tests de tipos" utilizando herramientas como `tsd`. Estos tests no ejecutan código, sino que verifican en tiempo de compilación que los tipos se comportan como se espera (ej. que un tipo no es asignable a otro, que una propiedad existe, etc.).
  Justificación: Proporciona una capa adicional de confianza en la corrección de las definiciones de tipos complejos o "branded types".
  Impacto: Requiere añadir una nueva dependencia de desarrollo (`tsd`) y escribir archivos de test específicos para `tsd`. Podría configurarse un nuevo target Nx para ejecutar estos tests.
]
[
  Mejora Propuesta 2 (Generación Automática de Documentación de Tipos): Utilizar herramientas como TypeDoc para generar documentación HTML a partir de los comentarios TSDoc de las interfaces y tipos.
  Justificación: Crea una referencia de API navegable y fácilmente compartible para todos los tipos globales del proyecto.
  Impacto: Añadir dependencia de desarrollo (`typedoc`) y un script o target Nx para generar la documentación.
]

*/
