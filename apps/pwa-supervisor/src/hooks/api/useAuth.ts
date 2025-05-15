// RUTA: apps/pwa-supervisor/src/hooks/api/useAuth.ts
// (Mismo contenido que te proporcioné en la respuesta anterior, asegurando que la línea 92 sea:)
// const { loginSuccess, setError, setLoading } = useAuthActions();
// y la línea 109 sea:
// loginSuccess(data.user, data.token);

// ... (el resto del archivo como se corrigió antes) ...
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import {
  useAuthActions,
  useAuthStore,
  type AuthUser,
} from '@/store/auth.store';
import { useMutation, type UseMutationOptions } from '@tanstack/react-query';

export interface AuthCredentials {
  email: string;
  password?: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
}

interface HttpErrorLike extends Error {
  response?: {
    data?: {
      message?: string;
      code?: string;
    };
    status?: number;
  };
}

const performApiLogin = async (
  credentials: AuthCredentials
): Promise<AuthResponse> => {
  console.debug('Simulando llamada a API para login con:', credentials);
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (
        credentials.email === 'supervisor@example.com' &&
        credentials.password === 'password'
      ) {
        resolve({
          user: {
            userId: 'user-123',
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
            userId: 'user-789',
            name: 'Admin Tenant Demo',
            email: 'admin@example.com',
            role: 'TENANT_ADMIN',
            tenantId: 'tenant-xyz',
          },
          token: 'fake-jwt-token-admin-from-hook',
        });
      } else {
        const errorToReject: Partial<HttpErrorLike> = new Error();
        if (credentials.email === 'error@example.com') {
          errorToReject.message = 'Error simulado del servidor (500)';
          errorToReject.response = {
            data: { message: 'Internal Server Error', code: 'API_ERROR_500' },
            status: 500,
          };
        } else {
          errorToReject.message = 'Credenciales inválidas';
          errorToReject.response = {
            data: {
              message: 'Invalid credentials',
              code: 'AUTH_INVALID_CREDENTIALS',
            },
            status: 401,
          };
        }
        reject(errorToReject as HttpErrorLike);
      }
    }, 1000);
  });
};

type UseLoginMutationOptions = Omit<
  UseMutationOptions<AuthResponse, HttpErrorLike, AuthCredentials>,
  'mutationFn'
>;

export function useLoginMutation(options?: UseLoginMutationOptions) {
  const { loginSuccess, setError, setLoading } = useAuthActions(); // Asegurar que es loginSuccess
  const authIsLoading = useAuthStore((state) => state.isLoading);

  return useMutation<AuthResponse, HttpErrorLike, AuthCredentials>({
    mutationFn: performApiLogin,
    onMutate: () => {
      if (!authIsLoading) {
        setLoading(true);
      }
      setError(null);
    },
    onSuccess: (data: AuthResponse) => {
      loginSuccess(data.user, data.token); // Usar loginSuccess
    },
    onError: (error: HttpErrorLike) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'Ocurrió un error desconocido.';
      setError(errorMessage);
    },
    onSettled: () => {
      if (authIsLoading) {
        setLoading(false);
      }
    },
    ...options,
  });
}
// RUTA: apps/pwa-supervisor/src/hooks/api/useAuth.ts
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Confirmación de uso de `loginSuccess`",
    "justificacion": "Doble verificación para asegurar que `loginSuccess` es el nombre de la acción utilizado consistentemente.",
    "impacto": "Prevención del error de propiedad no existente."
  },
  {
    "mejora": "Eliminación de `@ts-expect-error` innecesario",
    "justificacion": "La directiva en `onSuccess` (línea 108 del snapshot de errores) se elimina ya que el código debería ser type-safe si `AuthResponse.user` es compatible con `AuthUser`.",
    "impacto": "Código más limpio."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "El error `La propiedad 'response' no existe en el tipo 'Error'` en `onError` se abordó al tipar `error` como `HttpErrorLike`."
  }
]
*/
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Tipado de `error` en `onError` con `HttpErrorLike`",
    "justificacion": "Se introdujo una interfaz `HttpErrorLike` para tipar el objeto de error esperado de la API, permitiendo un acceso más seguro a `error.response.data.message` y resolviendo advertencias `no-unsafe-*`.",
    "impacto": "Mejora la seguridad de tipos y la legibilidad del manejo de errores."
  },
  {
    "mejora": "Eliminación de `@ts-expect-error` en `onSuccess`",
    "justificacion": "Se asumió que `AuthResponse.user` será compatible con `AuthUser` del store. Si hay diferencias, se necesitaría un mapeo o ajustar los tipos. La simulación de `performApiLogin` ahora devuelve `userId` para alinearse con `AuthUser`.",
    "impacto": "Código más limpio si los tipos son compatibles."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "La interfaz `HttpErrorLike` es una aproximación. Lo ideal sería tener tipos de error específicos exportados por `api-main` o una librería `shared-types` para errores de API."
  },
  {
    "nota": "Cuando `performApiLogin` se reemplace con una llamada real al cliente GraphQL, el manejo de errores deberá adaptarse a cómo el cliente GraphQL expone los errores de red y de la API GraphQL."
  }
]
*/
