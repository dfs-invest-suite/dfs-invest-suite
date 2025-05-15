// RUTA: apps/pwa-supervisor/src/lib/config/queryClient.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
import { QueryClient } from '@tanstack/react-query';

// Interfaz para errores que podrían tener una propiedad 'response' con 'status'
// Común en errores de llamadas HTTP (ej. de Axios o Fetch API)
interface HttpError extends Error {
  response?: {
    status?: number;
    data?: { message?: string; code?: string }; // Ajustar según la estructura real de errores de API
  };
}

export const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      refetchOnWindowFocus: process.env.NODE_ENV === 'production',
      retry: (failureCount: number, error: unknown) => {
        // CAMBIO: error de 'any' a 'unknown'
        // Verificar si es un error con estructura HTTP
        if (
          typeof error === 'object' &&
          error !== null &&
          'response' in error &&
          typeof (error as HttpError).response === 'object' && // Type guard para response
          (error as HttpError).response !== null &&
          typeof (error as HttpError).response?.status === 'number'
        ) {
          const httpError = error as HttpError;
          if (
            httpError.response?.status &&
            httpError.response.status >= 400 &&
            httpError.response.status < 500
          ) {
            return false; // No reintentar para errores 4xx
          }
        }
        return failureCount < 2; // Reintentar para otros errores
      },
    },
    mutations: {
      // onError y onSuccess globales opcionales
    },
  },
};

export const queryClient = new QueryClient(queryClientConfig);
// RUTA: apps/pwa-supervisor/src/lib/config/queryClient.ts
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Tipado más seguro para `error` en `retry`",
    "justificacion": "Se cambió `error: any` a `error: unknown` y se añadió una verificación de tipo más robusta (`HttpError`) antes de acceder a `error.response.status`. Esto elimina las advertencias `@typescript-eslint/no-explicit-any` y `@typescript-eslint/no-unsafe-member-access`.",
    "impacto": "Código más seguro y type-safe."
  },
  {
    "mejora": "Interfaz `HttpError` más descriptiva",
    "justificacion": "La interfaz `HttpError` ahora también incluye `data` en `response`, que es común para errores de API, facilitando el acceso a mensajes o códigos de error específicos del backend si fuera necesario en el `onError` global (actualmente comentado).",
    "impacto": "Mejor modelado de errores de API."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "El `onError` global en `defaultOptions` sigue comentado. Si se activa, también debería usar un tipado seguro para `error`."
  }
]
*/
