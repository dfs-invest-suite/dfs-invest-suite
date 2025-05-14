// RUTA: apps/pwa-supervisor/src/app/(auth)/login/page.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from 'ui-shared/src/lib/components/ui/card'; // Asumiendo la ruta correcta desde ui-shared

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-2xl">Iniciar Sesión</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-center text-muted-foreground">
            El formulario de inicio de sesión irá aquí.
          </p>
          {/* Placeholder para el LoginForm.tsx que se implementará en el Sprint 0.2 */}
        </CardContent>
      </Card>
    </div>
  );
}

/*_ SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Integración del componente LoginForm.tsx",
    "justificacion": "Reemplazar el placeholder con el formulario de login funcional.",
    "impacto": "Habilita la autenticación."
  },
  {
    "mejora": "Enlaces a 'Olvidé mi contraseña' o 'Registrarse' (si aplica)",
    "justificacion": "Proporcionar opciones adicionales para el usuario.",
    "impacto": "Mejora la UX del flujo de autenticación."
  }
]
_*/

/*_ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Este es un placeholder. El componente `LoginForm.tsx` se desarrollará en el Sprint 0.2 y se integrará aquí."
  }
]
_*/
// RUTA: apps/pwa-supervisor/src/app/(auth)/login/page.tsx
