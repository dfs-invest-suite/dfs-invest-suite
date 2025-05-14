// RUTA: apps/pwa-supervisor/src/components/layout/AppLayout.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

'use client'; // Este layout probablemente manejará estado (ej. sidebar abierto/cerrado)

import React, { useState } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';

interface AppLayoutProps {
  children: React.ReactNode;
  // Podríamos añadir props para el título de la página, breadcrumbs, etc.
}

export function AppLayout({ children }: AppLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false); // Para controlar el sidebar en móvil

  return (
    <div className="flex h-screen bg-slate-100 dark:bg-slate-900">
      {/* Sidebar - visible en desktop, controlable en móvil */}
      <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />

      {/* Contenido Principal */}
      <div className="flex flex-1 flex-col overflow-y-auto">
        {/* TopNav - siempre visible */}
        <TopNav onMenuButtonClick={() => setSidebarOpen(true)} />

        {/* Área de Contenido de la Página */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          <div className="mx-auto max-w-screen-2xl">
            {/* Aquí es donde se renderizará el contenido de cada página específica */}
            {children}
          </div>
        </main>

        {/* MobileNav - solo visible en móvil, podría estar dentro de TopNav o aquí */}
        {/* Por ahora, asumimos que el botón de menú en TopNav abre el Sidebar */}
        {/* Si MobileNav fuera una barra inferior, iría aquí. */}
        {/* <MobileNav /> */}
      </div>

      {/* Overlay para cerrar sidebar en móvil al hacer clic fuera (opcional) */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 ease-in-out md:hidden"
          aria-hidden="true"
        />
      )}
    </div>
  );
}

/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora Propuesta 1 (Estado del Sidebar en Zustand):
    En lugar de un `useState` local, el estado `sidebarOpen` podría manejarse en un store global de Zustand si otros componentes necesitan conocer o controlar este estado.
  Justificación: Mayor flexibilidad y desacoplamiento.
  Impacto: Modificar el manejo del estado para usar Zustand.
]
[
  Mejora Propuesta 2 (Transiciones Animadas):
    Usar Framer Motion o transiciones CSS para animar la aparición/desaparición del sidebar en móvil.
  Justificación: Mejora la experiencia de usuario.
  Impacto: Añadir clases de transición o componentes de animación.
]
[
  Mejora Propuesta 3 (Breadcrumbs):
    Integrar un componente de Breadcrumbs en el `TopNav` o justo debajo, cuya data podría venir de props o de un contexto.
  Justificación: Mejora la navegación y orientación del usuario.
  Impacto: Creación del componente Breadcrumbs y lógica para determinar las migas.
]
[
  Mejora Propuesta 4 (Notificaciones Globales/Toasts):
    Añadir un contenedor para Toasts (notificaciones) a nivel de AppLayout si aún no está en AppProviders.
  Justificación: Feedback global para el usuario.
  Impacto: Integrar un sistema de Toasts.
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota 1: La estructura `bg-slate-100 dark:bg-slate-900` asume que el tema se maneja correctamente y estas clases de Tailwind existen y se aplican.
]
[
  Nota 2: `max-w-screen-2xl` es un ejemplo de contenedor de ancho máximo, ajustable según el diseño.
]
[
  Nota 3: `MobileNav` está comentado. La lógica actual usa el `Sidebar` también para móvil, controlado por el botón en `TopNav`. Si se necesitara una barra de navegación inferior específica para móviles, se implementaría `MobileNav` y se añadiría aquí.
]
*/
// RUTA: apps/pwa-supervisor/src/components/layout/AppLayout.tsx
