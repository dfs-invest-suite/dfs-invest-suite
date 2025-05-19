// RUTA: apps/aiper-assistance/src/components/layout/LiaLayoutClient.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
'use client';

import React, { useEffect, useState } from 'react';
import { LiaSidebar } from './LiaSidebar';
import { LiaTopNav } from './LiaTopNav';
// LiaAdvertPanel se omite para Aiper por ahora, a menos que se decida lo contrario.

export function LiaLayoutClient({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Determinar si es móvil para el estado inicial del sidebar
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768); // 768px es el breakpoint 'md' de Tailwind
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Cerrar sidebar por defecto en móvil, abierto en desktop
    if (isMobile) {
      setSidebarOpen(false);
    } else {
      setSidebarOpen(true); // O false si se prefiere cerrado por defecto en desktop
    }
  }, [isMobile]);

  return (
    <div className="flex h-screen bg-background">
      {' '}
      {/* El tema L.I.A Legacy se aplica vía :root o .dark */}
      <LiaSidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <LiaTopNav onMenuButtonClick={() => setSidebarOpen(!sidebarOpen)} />

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 bg-background/80 backdrop-blur-sm">
          {' '}
          {/* Fondo con transparencia */}
          {/* Contenedor de contenido principal */}
          <div className="mx-auto max-w-full h-full">
            {' '}
            {/* Max-w-full para que el chat ocupe todo */}
            {children}
          </div>
        </main>
      </div>
      {/* Overlay para sidebar móvil (si el sidebar es un drawer overlay) */}
      {isMobile && sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-30 bg-black/60 " // md:hidden ya no es necesario aquí, controlado por isMobile
          aria-hidden="true"
        />
      )}
    </div>
  );
}
// FIN DEL ARCHIVO: apps/aiper-assistance/src/components/layout/LiaLayoutClient.tsx
