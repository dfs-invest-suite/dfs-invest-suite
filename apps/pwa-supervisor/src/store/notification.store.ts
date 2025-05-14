// RUTA: apps/pwa-supervisor/src/store/notification.store.ts
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
import { create } from 'zustand';
import { immer } from 'zustand/middleware/immer';

// Este store está pensado para una posible gestión centralizada de notificaciones in-app
// más complejas o una cola de notificaciones. Para Toasts simples y efímeras,
// se recomienda usar una librería como `react-hot-toast` directamente desde los componentes
// o hooks de mutación de TanStack Query, llamando a `toast.success()`, `toast.error()`, etc.
// Este store podría evolucionar si se necesita un panel de notificaciones persistente.

export type NotificationVariant =
  | 'success'
  | 'error'
  | 'info'
  | 'warning'
  | 'default';

export interface AppNotification {
  id: string;
  variant: NotificationVariant;
  message: string;
  title?: string;
  duration?: number; // en ms, para auto-dismiss
  isDismissible?: boolean;
  // acciones?: Array<{ label: string; onClick: () => void }>; // Para notificaciones con acciones
}

export interface NotificationState {
  notifications: AppNotification[];
  add: (notification: Omit<AppNotification, 'id'>) => string; // Devuelve el ID de la notificación añadida
  dismiss: (id: string) => void;
  clearAll: () => void;
}

const initialNotificationState: Pick<NotificationState, 'notifications'> = {
  notifications: [],
};

let nextId = 0;

export const useNotificationStore = create<NotificationState>()(
  immer((set) => ({
    ...initialNotificationState,
    add: (notification) => {
      const id = `dfs-notification-${nextId++}`;
      const newNotification: AppNotification = {
        ...notification,
        id,
        isDismissible: notification.isDismissible ?? true, // Default a true
      };
      set((state) => {
        state.notifications.push(newNotification);
      });
      return id;
    },
    dismiss: (id) =>
      set((state) => {
        state.notifications = state.notifications.filter((n) => n.id !== id);
      }),
    clearAll: () =>
      set((state) => {
        state.notifications = [];
      }),
  }))
);

/*_ SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Integración con un componente de UI para un panel de notificaciones",
    "justificacion": "Si se requiere un centro de notificaciones persistente (como un icono de campana en el TopNav), este store sería la fuente de datos para ese panel, mostrando notificaciones no descartadas.",
    "impacto": "UX mejorada para alertas o informaciones importantes que el usuario podría haber perdido si solo fueran Toasts."
  },
  {
    "mejora": "Soporte para acciones en notificaciones",
    "justificacion": "Permitiría añadir botones a las notificaciones para acciones rápidas (ej. 'Ver Lead', 'Reintentar Operación').",
    "impacto": "Mayor interactividad y eficiencia."
  },
  {
    "mejora": "Persistencia opcional de ciertas notificaciones",
    "justificacion": "Algunas notificaciones críticas podrían necesitar persistir entre sesiones hasta ser explícitamente descartadas por el usuario.",
    "impacto": "Asegura que la información crítica no se pierda."
  }
]
_*/

/*_ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Para el MVP y la mayoría de los casos de feedback inmediato (éxito/error de una mutación), usar `react-hot-toast` directamente es más simple y eficiente. Este store es una base para necesidades de notificación más avanzadas."
  },
  {
    "nota": "La lógica de auto-dismiss (basada en `duration`) debería ser manejada por el componente de UI que renderiza la notificación, que podría llamar a `dismiss(id)` después del timeout."
  }
]
_*/
// RUTA: apps/pwa-supervisor/src/store/notification.store.ts
