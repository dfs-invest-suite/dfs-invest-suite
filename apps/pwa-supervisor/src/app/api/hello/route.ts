// apps/pwa-supervisor/src/app/api/hello/route.ts
// Opción 2: Eliminar el parámetro 'request' si no se usa.
// También se quitó 'async' ya que no hay 'await'.
export function GET() {
  return new Response('Hello, from API!');
}
