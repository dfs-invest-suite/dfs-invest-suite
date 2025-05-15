// RUTA: libs/ui-shared/src/components/ui/card-hover.spec.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import { render, screen } from '@testing-library/react';
import { CardHover } from './card-hover';

// Mock de framer-motion para entornos JSDOM
jest.mock('framer-motion', () => {
  const actualFramerMotion = jest.requireActual('framer-motion');
  const React = jest.requireActual('react');
  const MockedMotionDiv = React.forwardRef(
    (
      {
        children,
        className,
        style,
        'data-testid': dataTestId, // Capturar el data-testid pasado como prop
        ...props
      }:  
      any,
      ref: any  
    ) => (
      <div
        ref={ref}
        data-testid={dataTestId} // Usar el data-testid pasado desde el componente
        className={className || ''}
        style={style}
        {...props}
      >
        {children}
      </div>
    )
  );
  MockedMotionDiv.displayName = 'MockedMotion.div';

  return {
    ...actualFramerMotion,
    motion: {
      ...actualFramerMotion.motion,
      div: MockedMotionDiv,
    },
    useMotionValue: jest.fn(() => ({
      set: jest.fn(),
      get: jest.fn(() => 0),
    })),
    useMotionTemplate: jest.fn(
      (strings, ...values) => `mocked-template(${values.join(',')})`
    ),
  };
});

describe('CardHover Component', () => {
  // ... (los tests que ya pasan se mantienen igual) ...

  it('should render its children', () => {
    const testMessage = 'Hello CardHover';
    render(
      <CardHover>
        <p>{testMessage}</p>
      </CardHover>
    );
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it('should apply base classes correctly to the root element', () => {
    render(<CardHover data-testid="card-root">Test Content</CardHover>);
    const cardRootElement = screen.getByTestId('card-root');
    expect(cardRootElement).toHaveClass(
      'group relative w-full rounded-lg bg-card p-0.5 transition-all duration-300 hover:shadow-xl'
    );
  });

  it('should apply border classes by default to the root element', () => {
    render(<CardHover data-testid="card-root">Test Content</CardHover>);
    const cardRootElement = screen.getByTestId('card-root');
    expect(cardRootElement).toHaveClass(
      'border border-border/40 hover:border-border/80'
    );
  });

  it('should not apply border classes to the root element if border prop is false', () => {
    render(
      <CardHover border={false} data-testid="card-root">
        Test Content
      </CardHover>
    );
    const cardRootElement = screen.getByTestId('card-root');
    expect(cardRootElement).not.toHaveClass('border');
  });

  it('should render gradient and spotlight effect divs by default', () => {
    render(
      <CardHover gradient={true} spotlight={true}>
        Test
      </CardHover>
    );
    // Ahora buscamos por los data-testid específicos
    expect(screen.getByTestId('gradient-effect')).toBeInTheDocument();
    expect(screen.getByTestId('spotlight-effect')).toBeInTheDocument();
  });

  it('should render only spotlight effect div if gradient is false', () => {
    render(
      <CardHover gradient={false} spotlight={true}>
        Test
      </CardHover>
    );
    expect(screen.queryByTestId('gradient-effect')).not.toBeInTheDocument();
    expect(screen.getByTestId('spotlight-effect')).toBeInTheDocument();
  });

  it('should render only gradient effect div if spotlight is false', () => {
    render(
      <CardHover gradient={true} spotlight={false}>
        Test
      </CardHover>
    );
    expect(screen.getByTestId('gradient-effect')).toBeInTheDocument();
    expect(screen.queryByTestId('spotlight-effect')).not.toBeInTheDocument();
  });

  it('should not render gradient or spotlight if both props are false', () => {
    render(
      <CardHover gradient={false} spotlight={false}>
        Test Content
      </CardHover>
    );
    expect(screen.queryByTestId('gradient-effect')).not.toBeInTheDocument();
    expect(screen.queryByTestId('spotlight-effect')).not.toBeInTheDocument();
  });

  it('should contain the main content wrapper div with correct classes', () => {
    render(<CardHover>Main Content Area</CardHover>);
    const contentWrapper = screen.getByTestId('card-hover-content-wrapper');
    expect(contentWrapper).not.toBeNull();
    expect(contentWrapper).toHaveClass(
      'relative z-20 rounded-[calc(var(--radius)-1px)] bg-card p-6'
    );
    expect(screen.getByText('Main Content Area')).toBeInTheDocument();
  });
});
// RUTA: libs/ui-shared/src/components/ui/card-hover.spec.tsx
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Tests para efectos de `motion.div` ahora buscan por `data-testid` específicos",
    "justificacion": "El mock de `motion.div` fue ajustado para usar el `data-testid` que se le pasa desde el componente. Los tests ahora buscan `getByTestId('gradient-effect')` y `getByTestId('spotlight-effect')` (o `queryByTestId` para verificar ausencia), que son los IDs que el componente `CardHover` asigna a sus `motion.div`s. Esto hace los tests más precisos.",
    "impacto": "Los tests para `CardHover` deberían ahora pasar completamente, ya que se alinean con cómo el mock y el componente real usan `data-testid`."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA: [] */
