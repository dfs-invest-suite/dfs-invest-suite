// RUTA: libs/ui-shared/src/lib/components/ui/button.spec.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import { fireEvent, render, screen } from '@testing-library/react';
import { Button } from './button'; // Ajusta la ruta si es necesario

describe('Button Component', () => {
  it('should render with default props', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-primary text-primary-foreground'); // Asumiendo variante default
  });

  it('should render with a different variant', () => {
    render(<Button variant="destructive">Delete</Button>);
    const buttonElement = screen.getByRole('button', { name: /delete/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass(
      'bg-destructive text-destructive-foreground'
    );
  });

  it('should render with a specific size', () => {
    render(<Button size="lg">Large Button</Button>);
    const buttonElement = screen.getByRole('button', { name: /large button/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('h-11 px-8'); // Clase de tamaño 'lg' de Shadcn
  });

  it('should call onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Clickable</Button>);
    const buttonElement = screen.getByRole('button', { name: /clickable/i });
    fireEvent.click(buttonElement);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('should be disabled when disabled prop is true', () => {
    render(<Button disabled>Disabled Button</Button>);
    const buttonElement = screen.getByRole('button', {
      name: /disabled button/i,
    });
    expect(buttonElement).toBeDisabled();
  });

  it('should render as a child component when asChild is true', () => {
    render(
      <Button asChild>
        <a href="/test">Link Button</a>
      </Button>
    );
    const linkElement = screen.getByRole('link', { name: /link button/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/test');
    // El elemento 'a' debería tener las clases del botón
    expect(linkElement).toHaveClass('bg-primary');
  });
});

/*_ SECCIÓN DE MEJORAS FUTURAS
[
  {
    "mejora": "Pruebas para todas las variantes y tamaños",
    "justificacion": "Asegurar que todas las combinaciones de variantes y tamaños definidos en `buttonVariants` se rendericen correctamente y apliquen las clases CSS esperadas.",
    "impacto": "Mayor cobertura de las opciones de estilo del botón."
  },
  {
    "mejora": "Pruebas de accesibilidad (a11y)",
    "justificacion": "Usar `jest-axe` para verificar que el componente renderizado cumple con los estándares básicos de accesibilidad.",
    "impacto": "Asegura que los componentes sean accesibles para todos los usuarios."
  }
]
_*/

/*_ NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Este test asume las clases CSS que Shadcn/UI y `cva` aplican para las variantes y tamaños. Estas clases podrían necesitar ajustes si la implementación de `buttonVariants` cambia."
  },
  {
    "nota": "Se usa `screen.getByRole` que es una buena práctica de Testing Library para seleccionar elementos de forma accesible."
  }
]
_*/
// RUTA: libs/ui-shared/src/lib/components/ui/button.spec.tsx
