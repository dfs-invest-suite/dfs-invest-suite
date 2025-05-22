// RUTA: libs/ui-shared/src/components/ui/button.spec.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from './button'; // Importa desde la misma carpeta

describe('Button Component', () => {
  it('should render with default props', () => {
    render(<Button>Click Me</Button>);
    const buttonElement = screen.getByRole('button', { name: /click me/i });
    expect(buttonElement).toBeInTheDocument();
    expect(buttonElement).toHaveClass('bg-primary text-primary-foreground');
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
    expect(buttonElement).toHaveClass('h-11 px-8');
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
    expect(linkElement).toHaveClass('bg-primary');
  });
});
// RUTA: libs/ui-shared/src/components/ui/button.spec.tsx
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Ubicación y path de import corregidos.",
    "justificacion": "El test ahora está junto al componente y el import es relativo a su nueva ubicación.",
    "impacto": "Permite que Jest encuentre y ejecute el test correctamente."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
