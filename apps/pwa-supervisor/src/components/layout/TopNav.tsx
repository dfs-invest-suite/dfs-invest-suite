// RUTA: apps/pwa-supervisor/src/components/layout/TopNav.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

'use client';

import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel, // Añadido para el nombre del usuario
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@dfs-suite/ui-shared'; // Asumiendo que estos componentes se exportan desde ui-shared
import {
  Bell,
  LogOut,
  Menu,
  Moon,
  Settings,
  Sun,
  UserCircle,
} from 'lucide-react';
import { useTheme } from 'next-themes';
import { useRouter } from 'next/navigation'; // Para redirigir después del logout

import { useAuthActions, useCurrentUser } from '@/store/auth.store';

interface TopNavProps {
  onMenuButtonClick: () => void;
  // Podríamos pasar el título de la página actual aquí si no se maneja con un contexto/store
  // pageTitle?: string;
}

export function TopNav({ onMenuButtonClick }: TopNavProps) {
  const { theme, setTheme } = useTheme();
  const router = useRouter();
  const currentUser = useCurrentUser();
  const { logout: performLogout } = useAuthActions();

  const toggleTheme = () => {
    setTheme(
      theme === 'dark' ||
        (theme === 'system' &&
          window.matchMedia('(prefers-color-scheme: dark)').matches)
        ? 'light'
        : 'dark'
    );
  };

  const handleLogout = () => {
    performLogout();
    // Opcional: forzar redirección si el AuthGuard no lo hace inmediatamente
    // o si hay algún estado que limpiar en el servidor (aunque JWT es stateless).
    router.push('/login'); // Redirigir a la página de login
  };

  // Determinar qué icono de tema mostrar
  const ThemeIcon = theme === 'dark' ? Sun : Moon;
  // O si se quiere que system muestre el icono correcto basado en la preferencia del OS:
  // const [effectiveTheme, setEffectiveTheme] = React.useState(theme);
  // React.useEffect(() => {
  //   if (theme === 'system') {
  //     setEffectiveTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  //   } else {
  //     setEffectiveTheme(theme);
  //   }
  // }, [theme]);
  // const ThemeIcon = effectiveTheme === 'dark' ? Sun : Moon;

  return (
    <header className="sticky top-0 z-30 flex h-16 flex-shrink-0 items-center justify-between border-b border-border bg-card px-4 dark:border-border/50 sm:px-6 lg:px-8">
      {/* Botón para abrir el menú en móviles */}
      <Button
        variant="ghost"
        size="icon"
        className="text-muted-foreground md:hidden hover:text-foreground"
        onClick={onMenuButtonClick}
        aria-label="Abrir sidebar"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {/* Título de la página (placeholder, podría ser dinámico) */}
      <div className="hidden flex-1 md:flex md:items-center">
        <h1 className="text-lg font-semibold text-foreground">
          {/* {pageTitle || 'Dashboard Principal'} */}
          Dashboard Supervisor {/* Placeholder */}
        </h1>
      </div>

      {/* Acciones del lado derecho */}
      <div className="flex items-center space-x-2 sm:space-x-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          aria-label="Cambiar tema"
          className="text-muted-foreground hover:text-foreground"
        >
          <ThemeIcon className="h-5 w-5" />
        </Button>

        <Button
          variant="ghost"
          size="icon"
          aria-label="Ver notificaciones"
          className="text-muted-foreground hover:text-foreground"
          onClick={() => alert('Funcionalidad de Notificaciones pendiente.')} // Placeholder
        >
          <Bell className="h-5 w-5" />
          {/* Podría tener un badge con contador de notificaciones */}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="flex items-center space-x-2 rounded-full px-2 py-1 h-auto text-muted-foreground hover:text-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
              aria-label="Abrir menú de usuario"
            >
              <UserCircle className="h-7 w-7" />
              <span className="hidden text-sm font-medium md:block">
                {currentUser?.name || currentUser?.email || 'Usuario'}
              </span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            {currentUser && (
              <>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none text-foreground">
                      {currentUser.name || 'N/A'}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {currentUser.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
              </>
            )}
            <DropdownMenuItem
              onClick={() => router.push('/dashboard/settings/profile')} // Asumiendo esta ruta para el perfil
            >
              <UserCircle className="mr-2 h-4 w-4" />
              <span>Mi Perfil</span>
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={() => router.push('/dashboard/settings')} // Ruta general de configuración
            >
              <Settings className="mr-2 h-4 w-4" />
              <span>Configuración</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleLogout}>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Cerrar Sesión</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

/*_ SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Título de página dinámico",
    "justificacion": "El título 'Dashboard Principal' debería cambiar según la página activa. Esto podría manejarse con un store de UI, un contexto, o pasando props desde el layout de página.",
    "impacto": "Mejora la orientación del usuario."
  },
  {
    "mejora": "Indicador de notificaciones",
    "justificacion": "El botón de campana podría mostrar un punto rojo o un contador si hay notificaciones no leídas (integrado con `notification.store.ts`).",
    "impacto": "Feedback visual para nuevas notificaciones."
  },
  {
    "mejora": "Avatar de Usuario",
    "justificacion": "En lugar de `UserCircle`, mostrar un avatar real del usuario si está disponible.",
    "impacto": "UI más personalizada."
  },
  {
    "mejora": "Búsqueda Global",
    "justificacion": "Añadir un campo de búsqueda global en el TopNav para buscar leads, plantillas, etc.",
    "impacto": "Funcionalidad de búsqueda potente."
  },
  {
    "mejora": "Mejora en el icono del tema 'system'",
    "justificacion": "El icono del tema para 'system' debería reflejar el tema real del sistema operativo en lugar de ser solo uno de los dos. La lógica comentada para `effectiveTheme` podría implementarse.",
    "impacto": "Precisión visual del icono del tema."
  }
]
_*/

/*_ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Se asume que `@dfs-suite/ui-shared` exporta los componentes de `DropdownMenu` como los de Shadcn/UI (`DropdownMenu`, `DropdownMenuTrigger`, `DropdownMenuContent`, `DropdownMenuItem`, `DropdownMenuSeparator`, `DropdownMenuLabel`)."
  },
  {
    "nota": "El color de fondo y borde ahora usa `bg-card` y `border-border` para alinearse mejor con el tema de `ui-shared` y Shadcn/UI."
  },
  {
    "nota": "El botón de cambio de tema ahora debería funcionar correctamente con la lógica simplificada, pero la comentada para `effectiveTheme` es más robusta para el caso 'system'."
  },
  {
    "nota": "Las rutas para 'Mi Perfil' y 'Configuración' en el Dropdown son placeholders y deben ajustarse a las rutas reales que se implementen."
  }
]
_*/
// RUTA: apps/pwa-supervisor/src/components/layout/TopNav.tsx
