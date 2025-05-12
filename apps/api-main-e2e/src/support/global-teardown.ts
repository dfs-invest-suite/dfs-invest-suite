// apps/api-main-e2e/src/support/global-teardown.ts
// import { killPort } from '@nx/node/utils'; // Si no se usa, no es necesario.

// eslint-disable-next-line @typescript-eslint/no-namespace
declare namespace globalThis {
  // eslint-disable-next-line no-var
  var __TEARDOWN_MESSAGE__: string;
}

// La función no necesita ser async si no contiene 'await'
export default function (): void {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  // Hint: `globalThis` is shared between setup and teardown.
  // const port = process.env.PORT ? Number(process.env.PORT) : 3000;
  // await killPort(port); // Si se usa killPort, la función debe ser async y killPort debe estar importado.

  if (typeof globalThis.__TEARDOWN_MESSAGE__ === 'string') {
    console.log(globalThis.__TEARDOWN_MESSAGE__);
  }
}
