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
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Layout de Autenticación Estandarizado",
    "justificacion": "Proporciona un wrapper común para todas las páginas dentro del grupo de rutas `(auth)`, permitiendo un estilo y estructura consistentes (ej. centrado, fondo degradado).",
    "impacto": "Mejora la organización visual de las páginas de autenticación."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Este layout es simple. Podría incluir un logo de la aplicación o enlaces a términos y condiciones si fuera necesario en todas las pantallas de autenticación."
  },
  {
    "nota": "Las páginas individuales dentro de `(auth)` (como `login/page.tsx`) se renderizarán como `children` dentro de este layout."
  }
]
*/
