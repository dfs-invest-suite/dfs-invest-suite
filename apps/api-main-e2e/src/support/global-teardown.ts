// RUTA: apps/api-main-e2e/src/support/global-teardown.ts
// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace globalThis {
  var __TEARDOWN_MESSAGE__: string;
}

export default function (): void {
  if (typeof globalThis.__TEARDOWN_MESSAGE__ === 'string') {
    console.info(globalThis.__TEARDOWN_MESSAGE__); // CAMBIO a console.info
  }
}
// RUTA: apps/api-main-e2e/src/support/global-teardown.ts
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Uso de `console.info` para mensaje de teardown.",
    "justificacion": "Alinea el uso de `console` con las reglas de ESLint permitidas y es más apropiado para un mensaje informativo.",
    "impacto": "Resuelve el warning `no-console`."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
