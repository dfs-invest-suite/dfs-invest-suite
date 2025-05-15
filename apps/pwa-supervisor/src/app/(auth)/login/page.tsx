// RUTA: apps/pwa-supervisor/src/app/(auth)/login/page.tsx // <<< ¡ESTA RUTA ES DEL SNAPSHOT ANTERIOR, NO DEL LAYOUT!
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
  // ESTO ES UNA PÁGINA, NO UN LAYOUT
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
// ...
_*/
/*_ NOTAS PARA IMPLEMENTACIÓN FUTURA
// ...
_*/
// RUTA: apps/pwa-supervisor/src/app/(auth)/login/page.tsx // <<< ¡ESTA RUTA ES DEL SNAPSHOT ANTERIOR, NO DEL LAYOUT!
