mejoras futuras
{
  "name": "shared-utils",
  "$schema": "../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/shared/utils/src",
  "projectType": "library",
  "tags": ["scope:shared", "type:utils", "layer:shared"],
  "targets": {
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "libs/shared/utils/jest.config.ts",
        "passWithNoTests": true // Se mantiene hasta que se añadan tests para Guard y UuidUtils
      }
    }
  }
}
/* SECCIÓN DE MEJORAS FUTURAS

[
  Mejora Propuesta 1 (Tests Unitarios para `Guard` y `UuidUtils`): Ambas clases (`Guard`, `UuidUtils`) contienen lógica que es fundamental y debería ser testeada unitariamente. `Guard` tiene varios casos borde para `isEmpty` y `lengthIsBetween`. `UuidUtils` depende de una librería externa y, aunque la librería `uuid` es robusta, testear que nuestros wrappers producen el tipo esperado (`TenantId` brandeado, etc.) puede ser útil.
  Justificación: Asegurar la robustez y corrección de estas utilidades críticas.
  Impacto: Creación de archivos `guard.spec.ts` y `uuid.utils.spec.ts` con sus respectivos tests. Una vez implementados, se podría remover `passWithNoTests: true`.
]
[
  Mejora Propuesta 2 (Tree-shaking para Utilidades): Si esta librería crece con muchas utilidades independientes, asegurar que los bundlers puedan hacer tree-shaking efectivo es importante. Esto se logra generalmente usando exportaciones nombradas y evitando efectos secundarios a nivel de módulo. El `index.ts` actual con `export *` es generalmente bueno para esto con los bundlers modernos.
  Justificación: Optimización del tamaño del bundle final en las aplicaciones que consuman estas utilidades.
  Impacto: Principalmente asegurar buenas prácticas de codificación en las utilidades (puras, sin efectos secundarios en la importación).
]

*/
