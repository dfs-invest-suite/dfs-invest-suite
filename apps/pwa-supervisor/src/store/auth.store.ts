// RUTA: apps/pwa-supervisor/src/store/auth.store.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';
// import { persist, createJSONStorage } from 'zustand/middleware'; // Para persistencia futura

export interface AuthUser {
  userId: string;
  tenantId: string;
  email: string;
  name?: string;
  role: string;
}

export interface AuthState {
  user: AuthUser | null;
  token: string | null; // Añadido para almacenar el token
  isAuthenticated: boolean;
  isLoading: boolean;
  isAuthInitialized: boolean; // Nuevo estado para rastrear la inicialización
  error: string | null;
}

export interface AuthActions {
  initializeAuth: () => void; // Nueva acción
  loginSuccess: (user: AuthUser, token: string) => void; // Renombrada y con token
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
  logout: () => void;
}

const initialAuthState: AuthState = {
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  isAuthInitialized: false, // Inicialmente falso
  error: null,
};

// Nota sobre persistencia: Si se usa `persist`, la rehidratación es asíncrona.
// `onRehydrateStorage` podría usarse para setear `isAuthInitialized = true`.
// Por ahora, `initializeAuth` se llamará manualmente.

export const useAuthStore = create<AuthState & { actions: AuthActions }>()(
  immer((set, get) => ({
    ...initialAuthState,
    actions: {
      initializeAuth: () => {
        // En un escenario real con persistencia o validación de token inicial:
        // 1. Intentar cargar token/user de localStorage (si `persist` no lo hace automáticamente).
        // 2. Validar el token (ej. verificar expiración, llamar a un endpoint /me).
        // 3. Si es válido, llamar a `loginSuccess`.
        // 4. Si no, llamar a `logout`.
        // Por ahora, solo marcamos como inicializado.
        // Si se usa el middleware `persist`, este podría ser el lugar para reaccionar
        // a `onRehydrateStorage` o simplemente asumir que persist ya hizo su trabajo.
        // Si no hay persistencia, la app siempre empieza como no autenticada.
        set((state) => {
          state.isAuthInitialized = true;
          // Si tuviéramos un token en algún lado (ej. cookie leída por el servidor y pasada al cliente),
          // lo verificaríamos aquí. Por ahora, la inicialización simple solo establece el flag.
          // Si no hay usuario/token, isAuthenticated sigue siendo false.
          if (!get().user) {
            state.isAuthenticated = false;
            state.token = null;
          }
        });
      },
      loginSuccess: (user, token) =>
        set((state) => {
          state.user = user;
          state.token = token;
          state.isAuthenticated = true;
          state.isLoading = false;
          state.error = null;
          // Aquí se podría guardar el token en localStorage si no se usan cookies HttpOnly
          // y el middleware `persist` no se encarga del token.
        }),
      setLoading: (isLoading) =>
        set((state) => {
          state.isLoading = isLoading;
        }),
      setError: (error) =>
        set((state) => {
          state.error = error;
          state.isLoading = false;
        }),
      logout: () =>
        set((state) => {
          state.user = null;
          state.token = null;
          state.isAuthenticated = false;
          state.isLoading = false;
          state.error = null;
          // Aquí se limpiaría el token de localStorage si aplica.
        }),
    },
  }))
);

// Selectors y hooks de acciones para conveniencia y optimización de re-renders
export const useCurrentUser = () => useAuthStore((state) => state.user);
export const useIsAuthenticated = () =>
  useAuthStore((state) => state.isAuthenticated);
export const useAuthIsLoading = () => useAuthStore((state) => state.isLoading);
export const useAuthError = () => useAuthStore((state) => state.error);
export const useIsAuthInitialized = () =>
  useAuthStore((state) => state.isAuthInitialized);
export const useAuthActions = () => useAuthStore((state) => state.actions);

/*_ SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Middleware `persist` de Zustand",
    "justificacion": "Para persistir el estado de `user`, `token`, `isAuthenticated` en `localStorage` automáticamente y rehidratarlo al inicio. Esto simplificaría `initializeAuth`.",
    "impacto": "Instalar `zustand/middleware`, configurar `persist` en el `create`."
  },
  {
    "mejora": "Validación de Token en `initializeAuth`",
    "justificacion": "Si se persiste un token, `initializeAuth` debería validar su expiración y, opcionalmente, hacer una llamada a un endpoint `me` para confirmar la validez de la sesión antes de marcar al usuario como autenticado.",
    "impacto": "Mayor seguridad y sincronización del estado de autenticación con el backend."
  }
]
_*/

/*_ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Se añadió el campo `token` al store. La acción `loginSuccess` ahora lo recibe y `logout` lo limpia."
  },
  {
    "nota": "La acción `initializeAuth` es deliberadamente simple por ahora. Su complejidad aumentará con la persistencia y la validación de sesión real."
  },
  {
    "nota": "Se han exportado hooks selectores individuales (`useCurrentUser`, `useIsAuthenticated`, etc.) y un hook para las acciones (`useAuthActions`). Esto ayuda a que los componentes solo se suscriban a las partes del estado que necesitan, optimizando re-renders."
  }
]
_*/
// RUTA: apps/pwa-supervisor/src/store/auth.store.ts
