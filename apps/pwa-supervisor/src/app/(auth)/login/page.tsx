// apps/pwa-supervisor/src/app/(auth)/login/page.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import LoginForm from './components/login-form'; // Importar el componente del formulario

export default function LoginPage() {
  return (
    <>
      {/*
        El layout (AuthLayout) ya proporciona el contenedor centrado con w-full max-w-md.
        Así que aquí simplemente renderizamos el LoginForm.
        Si necesitáramos añadir un título específico para la página de login que no esté
        en el formulario mismo, podría ir aquí, dentro de un <Card> o similar.
        Pero por ahora, el LoginForm es autocontenido.
      */}
      <LoginForm />
    </>
  );
}
// apps/pwa-supervisor/src/app/(auth)/login/page.tsx
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Renderizado del componente `LoginForm`",
    "justificacion": "La página ahora importa y renderiza el componente `LoginForm` real en lugar de un placeholder, lo que la hace funcional.",
    "impacto": "El usuario ahora verá el formulario de inicio de sesión."
  },
  {
    "mejora": "Simplificación del JSX",
    "justificacion": "Dado que `AuthLayout` ya maneja el contenedor `div` con `max-w-md`, la página de login solo necesita renderizar el `LoginForm`. Se eliminó el `div` y el `Card` redundantes que estaban en la versión placeholder de la página.",
    "impacto": "Markup más limpio y menos anidamiento innecesario. `LoginForm` ya usa `Card` internamente si es necesario."
  }
]
*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "El componente `LoginForm` en `components/login-form.tsx` ya incluye elementos como `Card` si el diseño lo requiere (aunque en el snapshot actual el `form` mismo tiene el estilo de un card). Este `page.tsx` debe ser lo más simple posible, delegando la UI específica del formulario a `LoginForm`."
  },
  {
    "nota": "Considerar añadir Metadata específica para esta página (ej. título 'Iniciar Sesión') si es necesario, usando la función `generateMetadata` de Next.js."
  }
]
*/
