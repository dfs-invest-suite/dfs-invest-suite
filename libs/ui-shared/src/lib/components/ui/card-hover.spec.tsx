// RUTA: libs/ui-shared/src/lib/components/ui/card-hover.spec.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import { render, screen } from '@testing-library/react';
import { CardHover } from './card-hover';

describe('CardHover Component', () => {
  it('should render its children', () => {
    const testMessage = 'Hello CardHover';
    render(
      <CardHover>
        <p>{testMessage}</p>
      </CardHover>
    );
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it('should apply base classes correctly', () => {
    render(<CardHover>Test Content</CardHover>);
    const cardElementContainer = screen
      .getByText('Test Content')
      .closest('div.group.relative');
    expect(cardElementContainer).toHaveClass(
      'w-full rounded-lg bg-card p-0.5 transition-all duration-300 hover:shadow-xl'
    );
  });

  it('should apply border classes by default', () => {
    render(<CardHover>Test Content</CardHover>);
    const cardElementContainer = screen
      .getByText('Test Content')
      .closest('div.group.relative');
    expect(cardElementContainer).toHaveClass(
      'border border-border/40 hover:border-border/80'
    );
  });

  it('should not apply border classes if border prop is false', () => {
    render(<CardHover border={false}>Test Content</CardHover>);
    const cardElementContainer = screen
      .getByText('Test Content')
      .closest('div.group.relative');
    expect(cardElementContainer).not.toHaveClass('border');
    expect(cardElementContainer).not.toHaveClass('border-border/40');
  });

  it('should render spotlight and gradient elements by default', () => {
    const { container } = render(<CardHover>Test Content</CardHover>);
    // Esta es una forma indirecta de verificar, buscando los divs que crea framer-motion con estilos específicos.
    const motionDivs = container.querySelectorAll(
      'div.group.relative > div[style*="radial-gradient"]'
    );
    // Esperamos 2: uno para el gradiente de fondo, otro para el spotlight.
    expect(motionDivs).toHaveLength(2);
  });

  it('should not render gradient element if gradient prop is false', () => {
    const { container } = render(
      <CardHover gradient={false}>Test Content</CardHover>
    );
    const motionDivs = container.querySelectorAll(
      'div.group.relative > div[style*="radial-gradient"]'
    );
    // Si gradient es false, solo el spotlight (si está activo) debe estar.
    // El spotlight también usa radial-gradient, pero tiene mix-blend-overlay.
    let spotlightFound = false;
    motionDivs.forEach((div) => {
      if ((div as HTMLElement).className.includes('mix-blend-overlay')) {
        spotlightFound = true;
      }
    });
    expect(motionDivs.length).toBe(1); // Solo el spotlight
    expect(spotlightFound).toBe(true);
  });

  it('should not render spotlight element if spotlight prop is false', () => {
    const { container } = render(
      <CardHover spotlight={false}>Test Content</CardHover>
    );
    const motionDivs = container.querySelectorAll(
      'div.group.relative > div[style*="radial-gradient"]'
    );
    // Si spotlight es false, solo el gradiente (si está activo) debe estar.
    let gradientBgFound = false;
    motionDivs.forEach((div) => {
      if (!(div as HTMLElement).className.includes('mix-blend-overlay')) {
        // No es el spotlight
        gradientBgFound = true;
      }
    });
    expect(motionDivs.length).toBe(1); // Solo el gradiente de fondo
    expect(gradientBgFound).toBe(true);
  });

  it('should not render gradient or spotlight if both props are false', () => {
    const { container } = render(
      <CardHover gradient={false} spotlight={false}>
        Test Content
      </CardHover>
    );
    const motionDivs = container.querySelectorAll(
      'div.group.relative > div[style*="radial-gradient"]'
    );
    expect(motionDivs.length).toBe(0);
  });

  it('should contain the main content wrapper div', () => {
    render(<CardHover>Main Content Area</CardHover>);
    const contentWrapper = screen.getByText('Main Content Area').parentElement;
    expect(contentWrapper).toHaveClass(
      'relative z-20 rounded-[calc(0.5rem-1px)] bg-card p-6'
    );
  });
});

/* SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Pruebas de interacción para `handleMouseMove`",
    "justificacion": "Simular eventos de `mouseMove` y verificar si los `useMotionValue` (mouseX, mouseY) se actualizan. Esto es avanzado y podría requerir mocks más profundos de `framer-motion` o tests de integración más complejos.",
    "impacto": "Mayor confianza en la lógica de interacción del componente."
  },
  {
    "mejora": "Pruebas visuales de regresión",
    "justificacion": "Para un componente tan visual como `CardHover`, las pruebas visuales (ej. con Chromatic si se usa Storybook) serían ideales para detectar cambios inesperados en la apariencia.",
    "impacto": "Asegura la consistencia visual a lo largo del tiempo."
  }
]
_*/

/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Este test se enfoca en el renderizado condicional de clases y la presencia estructural de los elementos. Los efectos visuales dinámicos son difíciles de testear unitariamente."
  },
  {
    "nota": "La identificación de los `motion.div` es indirecta y se basa en la presencia del estilo `radial-gradient`. Si la implementación interna de `framer-motion` o los estilos del componente cambian drásticamente, estos tests podrían necesitar ajustes."
  }
]
*/
// RUTA: libs/ui-shared/src/lib/components/ui/card-hover.spec.tsx
