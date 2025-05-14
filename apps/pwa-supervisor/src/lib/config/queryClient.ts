// RUTA: apps/pwa-supervisor/src/lib/config/queryClient.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
import { QueryClient } from '@tanstack/react-query';
// import { toast } from 'react-hot-toast'; // O el sistema de toast que se elija

// Configuración global para TanStack Query
export const queryClientConfig = {
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutos
      refetchOnWindowFocus: process.env.NODE_ENV === 'production', // Solo en producción para evitar refetchs innecesarios en dev
      retry: (failureCount: number, error: any) => {
        // No reintentar para errores 4xx (errores del cliente)
        if (error?.response?.status >= 400 && error?.response?.status < 500) {
          return false;
        }
        // Reintentar hasta 2 veces para otros errores (ej. red, 5xx)
        return failureCount < 2;
      },
      // onError: (error: any) => { // Manejo de errores global opcional
      //   // Podríamos usar el sistema de toast aquí para errores de query no manejados localmente
      //   // toast.error(error.message || 'Ocurrió un error al obtener los datos.');
      // },
    },
    mutations: {
      // onError: (error: any, variables: any, context: any) => { // Manejo de errores global opcional para mutaciones
      //   // toast.error(error.message || 'Ocurrió un error al realizar la acción.');
      // },
      // onSuccess: (data: any, variables: any, context: any) => { // Manejo de éxito global opcional para mutaciones
      //   // toast.success('Acción completada con éxito!');
      // }
    },
  },
};

export const queryClient = new QueryClient(queryClientConfig);

/*_ SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Persistor de Query Cache",
    "justificacion": "Para aplicaciones PWA que necesitan funcionar offline o mejorar la carga inicial en visitas subsecuentes, se puede usar `@tanstack/react-query-persist-client` con `createSyncStoragePersister` (localStorage) o `createAsyncStoragePersister` (IndexedDB).",
    "impacto": "Mejora de la experiencia offline y performance de carga percibida."
  },
  {
    "mejora": "Devtools de React Query",
    "justificacion": "Integrar `@tanstack/react-query-devtools` para facilitar la depuración del estado de las queries y el caché durante el desarrollo.",
    "impacto": "Mejora significativamente la DX."
  }
]
_*/

/*_ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Los `staleTime` y `cacheTime` (este último por defecto 5 minutos después de que una query se vuelve inactiva) deben ajustarse según la naturaleza de los datos. Datos que cambian muy frecuentemente podrían necesitar `staleTime` más bajos."
  },
  {
    "nota": "El manejo de errores global (`onError` en `defaultOptions`) es útil, pero a menudo se prefiere manejar errores y mostrar feedback más específico directamente donde se usa `useQuery` o `useMutation`."
  }
]
_*/
// RUTA: apps/pwa-supervisor/src/lib/config/queryClient.ts
