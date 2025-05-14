// RUTA: apps/pwa-supervisor/src/hooks/api/useAuth.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import { useAuthActions, useAuthStore } from '@/store/auth.store'; // Importamos el store y sus acciones
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';
// import { type AuthCredentials, type AuthResponse } from '@/types/auth'; // Descomentar cuando se definan estos tipos

// --- Tipos para las credenciales y la respuesta (placeholders por ahora) ---
// Estos tipos deberían moverse a '@/types/auth.ts' o similar más adelante.
export interface AuthCredentials {
  email: string;
  password?: string; // Password podría ser opcional si se implementa login con OTP, etc.
  // otp?: string; // Ejemplo para login con OTP
}

// Asumiendo que la API (o la simulación) devuelve algo así
interface UserData {
  id: string; // Debería ser UserId
  name: string;
  email: string;
  role: string; // Debería ser UserRole
  tenantId?: string; // Debería ser TenantId
}

export interface AuthResponse {
  user: UserData;
  token: string;
  // refreshToken?: string; // Si se usa
  // expiresIn?: number; // Tiempo de expiración del token de acceso
}
// --- Fin de Tipos Placeholder ---

// Simulación de la función que realmente llamaría a la API
// En una implementación real, esto haría una petición fetch/axios a api-main/graphql
const performApiLogin = async (
  credentials: AuthCredentials
): Promise<AuthResponse> => {
  console.log('Simulando llamada a API para login con:', credentials);
  // La lógica de fakeApiLogin que estaba en el store se mueve aquí o se llama desde aquí.
  // Para mantenerlo simple, la replicamos con un pequeño ajuste para que coincida con AuthResponse.
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        credentials.email === 'supervisor@example.com' &&
        credentials.password === 'password'
      ) {
        resolve({
          user: {
            id: 'user-123',
            name: 'Supervisor Demo',
            email: 'supervisor@example.com',
            role: 'TENANT_SUPERVISOR',
            tenantId: 'tenant-abc',
          },
          token: 'fake-jwt-token-supervisor-from-hook',
        });
      } else if (
        credentials.email === 'admin@example.com' &&
        credentials.password === 'password'
      ) {
        resolve({
          user: {
            id: 'user-789',
            name: 'Admin Tenant Demo',
            email: 'admin@example.com',
            role: 'TENANT_ADMIN',
            tenantId: 'tenant-xyz',
          },
          token: 'fake-jwt-token-admin-from-hook',
        });
      } else {
        // Simular diferentes tipos de errores
        if (credentials.email === 'error@example.com') {
          const apiError = new Error('Error simulado del servidor (500)');
          // @ts-expect-error: Añadiendo propiedades personalizadas para simulación
          apiError.response = {
            data: { message: 'Internal Server Error', code: 'API_ERROR_500' },
          };
          reject(apiError);
        } else {
          const authError = new Error('Credenciales inválidas');
          // @ts-expect-error: Añadiendo propiedades personalizadas para simulación
          authError.response = {
            data: {
              message: 'Invalid credentials',
              code: 'AUTH_INVALID_CREDENTIALS',
            },
          };
          reject(authError);
        }
      }
    }, 1000);
  });
};

// Tipo para las opciones del hook useLoginMutation, extendiendo las de TanStack Query
type UseLoginMutationOptions = Omit<
  UseMutationOptions<AuthResponse, Error, AuthCredentials>, // TData, TError, TVariables (credentials)
  'mutationFn' // Excluimos mutationFn porque la definimos dentro del hook
>;

export function useLoginMutation(options?: UseLoginMutationOptions) {
  const { login, setError, setLoading } = useAuthActions(); // Obtenemos las acciones del store
  const authIsLoading = useAuthStore((state) => state.isLoading); // Para evitar doble estado de carga

  return useMutation<AuthResponse, Error, AuthCredentials>({
    mutationFn: performApiLogin, // La función que realiza el "trabajo" de la mutación
    onMutate: () => {
      // Opcional: Acciones a realizar ANTES de que la mutación se ejecute
      // Por ejemplo, optimistic updates (no aplica mucho para login) o establecer estado de carga.
      // Evitamos doble setLoading si TanStack Query ya lo maneja con `isPending`.
      if (!authIsLoading) {
        // Solo si el store no está ya cargando por otra razón
        setLoading(true);
      }
      setError(null); // Limpiar errores previos
    },
    onSuccess: (data: AuthResponse) => {
      // Acciones a realizar cuando la mutación es exitosa
      // `data` es lo que devuelve `performApiLogin`
      // @ts-expect-error: El tipo User del store y UserData aquí son ligeramente diferentes por ahora
      login(data.user, data.token);
      // La redirección se manejará en el componente que usa el hook o observando el store
    },
    onError: (error: Error) => {
      // Acciones a realizar cuando la mutación falla
      // @ts-expect-error: Accediendo a una propiedad custom
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Ocurrió un error desconocido.';
      setError(errorMessage);
    },
    onSettled: () => {
      // Acciones a realizar después de que la mutación haya terminado (éxito o error)
      // Aseguramos que el estado de carga del store se limpie si TanStack Query ya no lo gestiona
      // o si queremos una fuente de verdad única para la carga de UI.
      // Por ahora, TanStack Query `isPending` es suficiente, así que setLoading(false) aquí puede ser redundante
      // si el componente usa `isPending`. Pero si el store es la única fuente de `isLoading`,
      // entonces es importante.
      if (authIsLoading) {
        // Solo si el store estaba cargando
        setLoading(false);
      }
    },
    ...options, // Permite al consumidor del hook pasar opciones adicionales
  });
}

/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Tipos Reales):
    Reemplazar `AuthCredentials`, `UserData` y `AuthResponse` con los tipos reales que se definirán en `@/types/auth.ts` y que coincidirán con los DTOs de `api-main`.
  Justificación: Type safety y alineación con la API.
  Impacto: Definir estos tipos.
]
[
  Mejora Propuesta 2 (Llamada a API Real):
    Reemplazar `performApiLogin` con una función que use un cliente GraphQL (ej. `graphql-request` o un wrapper de `fetch`) para llamar a la mutación `loginTenantUser` de `api-main`.
  Justificación: Conectar con el backend real.
  Impacto: Configurar el cliente GraphQL, definir la query/mutación.
]
[
  Mejora Propuesta 3 (Manejo de Errores Detallado):
    El `onError` podría ser más sofisticado, mapeando códigos de error de la API a mensajes específicos para el usuario o realizando acciones diferentes según el tipo de error.
  Justificación: Mejor UX en caso de errores.
  Impacto: Lógica adicional en `onError`.
]
[
  Mejora Propuesta 4 (Contexto de QueryClient):
    Si se necesitan invalidar queries después del login (ej. `meTenant`), se obtendría el `queryClient` de `useQueryClient()` y se llamaría a `queryClient.invalidateQueries()`.
  Justificación: Mantener los datos del servidor sincronizados.
  Impacto: Usar `useQueryClient`.
]
[
  Mejora Propuesta 5 (Tipado de Error):
    El tipo de error `Error` es genérico. Se podría usar un tipo de error más específico si la API devuelve errores estructurados (ej. `ApiError` que extienda `Error` y tenga un campo `code`).
  Justificación: Mejor manejo de errores específicos.
  Impacto: Definir tipos de error personalizados.
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota 1: Este hook se usará en `LoginForm.tsx`. El componente llamará a la función `mutate` (o `mutateAsync`) devuelta por este hook.
]
[
  Nota 2: Los estados `isPending` (reemplaza a `isLoading` de TanStack Query v4), `isSuccess`, `isError`, `data`, `error` son provistos por `useMutation` y pueden ser usados directamente en el componente para la UI.
]
[
  Nota 3: La sincronización con el `authStore` se hace en `onSuccess` y `onError` para mantener el estado global de autenticación actualizado.
]
[
  Nota 4: Se usó `@ts-expect-error` para el cast de `data.user` al tipo `User` del store y para acceder a `error.response.data.message`. Esto se debe a que los tipos `UserData` y `User` (del store) son placeholders y podrían no ser idénticos aún, y el objeto `error` es genérico. Con tipos bien definidos para la respuesta de API y errores, estos casts no serían necesarios.
]
*/
// RUTA: apps/pwa-supervisor/src/hooks/api/useAuth.ts
