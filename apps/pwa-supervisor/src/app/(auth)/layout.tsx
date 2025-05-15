// RUTA: apps/pwa-supervisor/src/app/(auth)/layout.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import React from 'react';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      {/* Este div centraliza el contenido de las páginas de autenticación (login, forgot-password, etc.) */}
      <div className="w-full max-w-md">{children}</div>
    </main>
  );
}
// RUTA: apps/pwa-supervisor/src/app/(auth)/layout.tsx
