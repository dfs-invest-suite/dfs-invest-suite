// apps/aiper-assistance/src/app/api/hello/route.ts
export async function GET() {
  // Parámetro 'request' eliminado
  return new Response('Hello, from API!');
}
// apps/aiper-assistance/src/app/api/hello/route.ts
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Eliminación del parámetro `request` no utilizado.",
    "justificacion": "El parámetro `request` en la función `GET` no se estaba utilizando, lo que causaba un error de TypeScript debido a la configuración `noUnusedParameters`. Al eliminarlo, se resuelve el error de compilación.",
    "impacto": "Permite que el build de producción de `aiper-assistance` se complete exitosamente."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Si en el futuro esta API route necesitara acceder a la información de la solicitud (headers, query params, etc.), el parámetro `request: Request` (o `NextRequest`) deberá ser reintroducido y utilizado."
  }
]
*/
