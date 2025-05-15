// RUTA: libs/ui-shared/src/components/ui/card-hover.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)
'use client';

import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import * as React from 'react';

import { cn } from '../../lib/utils';

export interface CardHoverProps extends React.HTMLAttributes<HTMLDivElement> {
  gradient?: boolean;
  spotlight?: boolean;
  border?: boolean;
  children: React.ReactNode;
}

const CardHover = React.forwardRef<HTMLDivElement, CardHoverProps>(
  (
    {
      className,
      gradient = true,
      spotlight = true,
      border = true,
      children,
      ...props
    },
    ref
  ) => {
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    function handleMouseMove({
      currentTarget,
      clientX,
      clientY,
    }: React.MouseEvent<HTMLDivElement>) {
      const { left, top } = currentTarget.getBoundingClientRect();
      mouseX.set(clientX - left);
      mouseY.set(clientY - top);
    }

    return (
      <div
        ref={ref}
        className={cn(
          'group relative w-full rounded-lg bg-card p-0.5 transition-all duration-300 hover:shadow-xl',
          border && 'border border-border/40 hover:border-border/80',
          className
        )}
        onMouseMove={handleMouseMove}
        data-testid="card-hover-root" // data-testid para el div raíz si es útil
        {...props}
      >
        {gradient && (
          <motion.div
            data-testid="gradient-effect" // data-testid para el efecto gradiente
            className="pointer-events-none absolute -inset-px z-0 rounded-lg opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  300px circle at ${mouseX}px ${mouseY}px,
                  hsla(var(--primary)/0.1),
                  transparent 80%
                )
              `,
            }}
            aria-hidden="true"
          />
        )}

        {spotlight && (
          <motion.div
            data-testid="spotlight-effect" // data-testid para el efecto spotlight
            className="pointer-events-none absolute -inset-px z-10 rounded-lg opacity-0 mix-blend-overlay transition-opacity duration-300 group-hover:opacity-100"
            style={{
              background: useMotionTemplate`
                radial-gradient(
                  120px circle at ${mouseX}px ${mouseY}px,
                  rgba(255, 255, 255, 0.8),
                  transparent 80%
                )
              `,
            }}
            aria-hidden="true"
          />
        )}

        <div
          className="relative z-20 rounded-[calc(var(--radius)-1px)] bg-card p-6"
          data-testid="card-hover-content-wrapper" // data-testid para el wrapper del contenido
        >
          {children}
        </div>
      </div>
    );
  }
);

CardHover.displayName = 'CardHover';

export { CardHover };
// RUTA: libs/ui-shared/src/components/ui/card-hover.tsx
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Adición de `data-testid` a elementos clave",
    "justificacion": "Se añadieron `data-testid` al div raíz, a los divs de efectos de gradiente y spotlight, y crucialmente al div que envuelve el contenido (`children`). Esto facilita la selección precisa de estos elementos en los tests unitarios y E2E, haciéndolos menos frágiles a cambios de estructura o clases CSS no directamente relacionadas con la aserción del test.",
    "impacto": "Tests más robustos y fáciles de escribir/mantener."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "El uso de `hsla(var(--primary)/0.1)` para el gradiente asume que la variable CSS `--primary` está definida en formato HSL. Si es un color hexadecimal, se necesitaría una conversión o una variable CSS diferente para los componentes RGB."
  }
]
*/
