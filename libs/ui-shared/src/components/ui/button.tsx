// libs/ui-shared/src/components/ui/button.tsx
import * as React from 'react';

import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '../../lib/utils';

export const buttonVariants = cva(
  // EXPORTADO DIRECTAMENTE AQUÍ
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive:
          'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline:
          'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  // Sigue usando buttonVariants
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))} // Sigue usando buttonVariants
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

// Exportar solo Button aquí. buttonVariants ya se exportó arriba.
export { Button };
// libs/ui-shared/src/components/ui/button.tsx
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Resolución definitiva de exportación duplicada de `buttonVariants`.",
    "justificacion": "`buttonVariants` ahora se declara con `export const` directamente en su definición. La exportación nombrada al final del archivo (`export { Button, buttonVariants }`) se modificó para exportar solo `Button`, ya que `buttonVariants` ya está exportado. Esto elimina la duplicación.",
    "impacto": "Debería resolver el error `Module parse failed: Duplicate export 'buttonVariants'`."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Este es el patrón más común y directo para exportar tanto la constante de variantes como el componente en archivos de este tipo."
  }
]
*/
