MEJORAS FUTURAS PROPUESTAS
{
  "name": "shared-constants",
  "$schema": "../../../node_modules/nx/schemas/project-schema.json",
  "sourceRoot": "libs/shared/constants/src",
  "projectType": "library",
  "tags": ["scope:shared", "type:constants", "layer:shared"],
  "targets": {
    // Añadiremos el target 'test' explícitamente si no está,
    // o modificaremos el existente si el plugin @nx/jest lo infirió.
    // Si el plugin @nx/jest está configurado en nx.json (como es nuestro caso),
    // este target es inferido y no necesitamos definirlo aquí explícitamente
    // A MENOS QUE queramos sobrescribir sus opciones.
    // Para este caso, es más limpio sobrescribir la opción aquí.
    "test": {
      "executor": "@nx/jest:jest",
      "outputs": ["{workspaceRoot}/coverage/{projectRoot}"],
      "options": {
        "jestConfig": "libs/shared/constants/jest.config.ts",
        "passWithNoTests": true // <--- AÑADIR O ASEGURAR ESTA LÍNEA
      }
    }
    // Otros targets como 'lint' son inferidos por los plugins en nx.json
  }
}
/* SECCIÓN DE MEJORAS FUTURAS (para este project.json)

[
  Mejora Propuesta 1 (Targets Explícitos vs. Inferidos): Actualmente, muchos targets (lint, build para algunas libs) son inferidos por los plugins en `nx.json`. Si se necesita una configuración muy específica para un target de una librería particular, definirlo explícitamente aquí en `project.json` (como hemos hecho con `test` para añadir `passWithNoTests`) es la forma correcta. Mantener un balance para no sobrecargar los `project.json` si los defaults inferidos son suficientes.
]
[
  Mejora Propuesta 2 (Build Target): Si esta librería necesitara ser "construible" (transpilada a `dist/`), se añadiría un target `build` aquí, por ejemplo, usando `@nx/js:tsc`. Para constantes puras, usualmente no es necesario a menos que se quiera publicar o usar en un contexto que no maneje TS directamente.
]

*/
