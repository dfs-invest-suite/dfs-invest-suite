// RUTA: apps/api-main/src/app/test-hello.resolver.ts
import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class TestHelloResolver {
  @Query(() => String)
  hello(): string {
    // Forzar un error para probar AllExceptionsFilter
    // eslint-disable-next-line no-constant-condition
    if (true) {
      // Siempre lanza error para probar
      throw new Error('Este es un error de prueba para AllExceptionsFilter!');
    }

    return 'Hello from GraphQL Test Resolver!'; // Esta línea ahora es inalcanzable
  }
}
// FIN DEL ARCHIVO: apps/api-main/src/app/test-hello.resolver.ts
