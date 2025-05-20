// RUTA: libs/ui-shared/src/components/ui/badge.tsx
// TODO: [LIA Legacy - Implementar Badge (Shadcn/UI)]
// Propósito: Componente Badge para mostrar estados, tags, o pequeñas piezas de información.
// Basado en las especificaciones y estilos de Shadcn/UI para Badge.
// Relacionado con Casos de Uso: Mostrar estado de leads, calidad de números WA, categorías de plantillas.

import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';
import { cn } from '../../lib/utils';

export const badgeVariants = cva(
  'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
  {
    variants: {
      variant: {
        default:
          'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
        destructive:
          'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
        outline: 'text-foreground',
        // Otros variants pueden ser: success, warning, info
        success: 'border-transparent bg-green-500 text-white', // Ejemplo
        warning: 'border-transparent bg-yellow-500 text-black', // Ejemplo
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge };

/* SECCIÓN DE MEJORAS FUTURAS
[
  Mejora 1: Añadir más variantes de color predefinidas (info, success, warning) con estilos apropiados.
  Mejora 2: Considerar la posibilidad de pasar un icono opcional al Badge.
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  Nota 1: El `index.ts` de `ui-shared` necesitará exportar `Badge` y `badgeVariants`.
]
*/
