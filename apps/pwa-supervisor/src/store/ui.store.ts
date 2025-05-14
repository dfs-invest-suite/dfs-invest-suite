// RUTA: apps/pwa-supervisor/src/store/ui.store.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

export type Theme = 'light' | 'dark' | 'system';

export interface UiState {
  theme: Theme; // Aunque next-themes lo maneja, puede ser útil tenerlo en el store para otros componentes
  isSidebarOpen: boolean;
  // Otros estados globales de UI podrían ir aquí (ej. isMobileMenuOpen, isLoadingGlobal)
  setTheme: (theme: Theme) => void;
  toggleSidebar: () => void;
  setSidebarOpen: (isOpen: boolean) => void;
}

const initialUiState = {
  theme: 'system' as Theme, // Default a system, next-themes se encargará de resolverlo
  isSidebarOpen: true, // Default a abierta en escritorio
};

export const useUiStore = create<UiState>()(
  immer((set) => ({
    ...initialUiState,
    setTheme: (theme) =>
      set((state) => {
        state.theme = theme;
      }),
    toggleSidebar: () =>
      set((state) => {
        state.isSidebarOpen = !state.isSidebarOpen;
      }),
    setSidebarOpen: (isOpen) =>
      set((state) => {
        state.isSidebarOpen = isOpen;
      }),
  }))
);

/*_ SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Control de Sidebar responsivo",
    "justificacion": "La lógica para `isSidebarOpen` podría ser más inteligente, considerando el tamaño de la pantalla (ej. cerrada por defecto en móviles, abierta en escritorio). Esto podría manejarse con un hook que observe media queries y actualice este store.",
    "impacto": "Mejor UX en diferentes dispositivos."
  },
  {
    "mejora": "Persistencia de preferencias de UI",
    "justificacion": "Preferencias como `isSidebarOpen` (para escritorio) podrían persistirse en localStorage para recordar la elección del usuario entre sesiones, usando el middleware `persist` de Zustand.",
    "impacto": "UX más personalizada."
  }
]
_*/

/*_ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "El estado `theme` en este store es más para lectura y reacción por otros componentes. `next-themes` seguirá siendo el SOT para la aplicación del tema al DOM."
  },
  {
    "nota": "Considerar si el estado `isMobileMenuOpen` (para una posible hamburguesa en móviles) debería estar aquí o ser local del componente `TopNavigation`."
  }
]
_*/
// RUTA: apps/pwa-supervisor/src/store/ui.store.ts
