// RUTA: apps/pwa-supervisor/src/app/(dashboard)/page.tsx
// Autor: Raz Podesta (github @razpodesta, email: raz.podesta@metashark.tech)
// Empresa: MetaShark (I.S.) Florianópolis/SC, Brasil. Año 2025. Todos los derechos reservados.
// Propiedad Intelectual: MetaShark (I.S.)

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Input,
} from '@dfs-suite/ui-shared';
import { Home, Mail, MapPin, Phone, Search, Users } from 'lucide-react';

// Placeholder simple para los componentes de item que no vamos a replicar en detalle
const PlaceholderItemCard = ({
  title,
  description,
  imgSrc,
}: {
  title: string;
  description?: string;
  imgSrc?: string;
}) => (
  <Card className="w-full">
    <CardHeader>
      <CardTitle>{title}</CardTitle>
    </CardHeader>
    <CardContent>
      {imgSrc && (
        <img
          src={imgSrc}
          alt={title}
          className="mb-2 h-32 w-full object-cover"
        />
      )}
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
      <Button variant="link" className="p-0 h-auto mt-2">
        Saiba Mais
      </Button>
    </CardContent>
  </Card>
);

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Simulación de la barra social y menú superior (muy simplificado) */}
      <header className="bg-slate-800 text-white p-2 text-xs">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <span className="flex items-center">
              <Phone size={14} className="mr-1" /> (48) 99198-8535
            </span>
            <a href="#" className="hover:underline flex items-center">
              <Users size={14} className="mr-1" /> Central do Cliente
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <span>Favoritos (0)</span>
            <Input
              type="text"
              placeholder="Código o nome..."
              className="h-6 text-xs bg-slate-700 border-slate-600 placeholder-slate-400"
            />
          </div>
        </div>
      </header>

      <nav className="bg-green-800 text-white p-4 sticky top-0 z-40">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-2xl font-bold">DFS INVESTIMENTOS</div>
          <div className="hidden md:flex space-x-4">
            {['Trabalhe Conosco', 'Blog', 'Quem Somos', 'Empreendimentos'].map(
              (item) => (
                <a key={item} href="#" className="hover:text-amber-400">
                  {item}
                </a>
              )
            )}
            <a href="#" className="hover:text-amber-400 flex items-center">
              <Home size={16} className="mr-1" /> Início
            </a>
          </div>
        </div>
      </nav>

      {/* Simulación del Banner Principal */}
      <div
        className="relative h-[50vh] bg-gray-500 bg-cover bg-center"
        style={{
          backgroundImage:
            "url('https://img.apresenta.me/M7UtVksvyNIzNjY3SU00T05MTjIzi09NT8zN1Lc0MjDRL0rNy0tMss1UMzUxN7VNBgA.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 flex flex-col items-center justify-end h-full pb-10 text-center text-white">
          <div className="bg-black bg-opacity-50 p-6 rounded">
            <h1 className="text-4xl font-bold leading-tight">
              <b>Quer investir em imóveis</b>
              <br />e não sabe por onde
              <br />
              <b>COMEÇAR?</b>
            </h1>
            <h2 className="mt-2 text-lg uppercase tracking-widest">
              A <b>DFS</b> investimentos vai lhe mostrar
            </h2>
          </div>
        </div>
      </div>

      {/* Simulación de la Barra de Búsqueda */}
      <div className="bg-white bg-opacity-80 dark:bg-slate-800 dark:bg-opacity-90 p-4 -mt-16 relative z-20 container mx-auto max-w-4xl rounded shadow-lg">
        <div className="flex space-x-2 mb-2">
          <Button
            variant="secondary"
            className="bg-green-700 hover:bg-green-800 text-white"
          >
            Venda
          </Button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
          <Input
            type="text"
            placeholder="Tipo do imóvel..."
            className="bg-white dark:bg-slate-700"
          />
          <Input
            type="text"
            placeholder="Localização..."
            className="bg-white dark:bg-slate-700"
          />
          <Input
            type="text"
            placeholder="Código, nome, endereço..."
            className="bg-white dark:bg-slate-700"
          />
        </div>
        <Button className="w-full mt-4 bg-amber-500 hover:bg-amber-600 text-black">
          <Search size={18} className="mr-2" /> Buscar
        </Button>
      </div>

      {/* Simulación Sección Oportunidades */}
      <section className="container mx-auto py-12 px-4">
        <h2 className="text-3xl font-bold text-center text-green-800 dark:text-green-400 mb-8 uppercase">
          Oportunidades
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <PlaceholderItemCard
            title="Parkside Itacorubi"
            description="Localizado estrategicamente..."
            imgSrc="https://img.apresenta.me/M7YtVksvyNIzTU0xT04zMLc0MbIwi89JLMhMzsssKtA3tTQwsrDUT8-LTMnJLE2yzVQzNTE3tU0GAA.jpg"
          />
          <PlaceholderItemCard
            title="Lumina"
            description="A 700m do mar, investimento estratégico!"
            imgSrc="https://img.apresenta.me/M7YtVksvyNJLtDCwNE8xNTM2TjE3i89JLMhMzsssKtA3NzQ1NjA01E-Py0zJySxNss1UMzUxN7VNBgA.jpg"
          />
          <PlaceholderItemCard
            title="Dália"
            description="A 50m da praia, em Canasvieiras."
            imgSrc="https://img.apresenta.me/M7YtVksvyNIzMU1KMkpMTUs2TTE3i89JLMhMzsssKtA3MzExMTA01E-Py0zJySxNss1UMzUxN7VNBgA.jpg"
          />
          <PlaceholderItemCard
            title="Campeche 135"
            description="A 900m da praia, no bairro que mais valoriza!"
            imgSrc="https://img.apresenta.me/M7YtVksvyNJLSjM1MzEzS7Q0MbIwi89JLMhMzsssKtA3MDQ2NTY01E-Py0zJySxNss1UMzUxN7VNBgA.jpg"
          />
        </div>
      </section>

      {/* Simulación Footer Simplificado */}
      <footer className="bg-green-900 text-white p-10">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-2 text-amber-400">
              DFS Investimentos
            </h3>
            <img
              src="https://img.apresenta.me/M7UtVkvPK9BLtLQwjC9KLcnPT4vPT8-PiU9NT8zNjC8pza9MzNFPz0zLy0_2zVQzNTE3tU0GAA.png"
              alt="Logo DFS Footer"
              className="w-32 mb-4"
            />
            <div className="flex space-x-2">
              {/* Social icons placeholders */}
              <div className="w-8 h-8 bg-amber-400 rounded-full"></div>
              <div className="w-8 h-8 bg-amber-400 rounded-full"></div>
              <div className="w-8 h-8 bg-amber-400 rounded-full"></div>
            </div>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-amber-400">
              Contato rápido
            </h3>
            <Input
              type="text"
              placeholder="Nome"
              className="mb-2 bg-green-800 border-green-700 placeholder-gray-300"
            />
            <Input
              type="email"
              placeholder="E-mail"
              className="mb-2 bg-green-800 border-green-700 placeholder-gray-300"
            />
            <Input
              type="tel"
              placeholder="Telefone"
              className="mb-2 bg-green-800 border-green-700 placeholder-gray-300"
            />
            <Button className="bg-amber-500 hover:bg-amber-600 text-green-900 w-full">
              Enviar
            </Button>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-amber-400">Contatos</h3>
            <p className="flex items-center mb-1">
              <Phone size={16} className="mr-2 text-amber-400" /> (48)
              99198-8535
            </p>
            <p className="flex items-center">
              <Mail size={16} className="mr-2 text-amber-400" />{' '}
              dfs.investimentos.imobiliarios@gmail.com
            </p>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-2 text-amber-400">
              Onde Estamos
            </h3>
            <p className="flex items-start">
              <MapPin
                size={20}
                className="mr-2 mt-1 text-amber-400 flex-shrink-0"
              />{' '}
              Rua João Pio Duarte Silva, 1350, Loja 04, Córrego Grande,
              Florianópolis, SC, Brasil
            </p>
            <p className="mt-2">CRECI: 6869-J</p>
          </div>
        </div>
        <div className="text-center mt-10 pt-5 border-t border-green-700 text-sm text-gray-300">
          Facilitado por Apresenta.me ~ Copyright © 2025
        </div>
      </footer>
    </div>
  );
}
// RUTA: apps/pwa-supervisor/src/app/(dashboard)/page.tsx
/* SECCIÓN DE MEJORAS
[
  {
    "mejora": "Réplica estructural básica de la página dfsinvestimentos.com.br",
    "justificacion": "Se ha creado una estructura JSX en `(dashboard)/page.tsx` que imita las secciones principales (header, banner, búsqueda, oportunidades, footer) del HTML proporcionado. Se utilizan componentes de `ui-shared` y clases de Tailwind para aproximar el diseño, sin intentar una copia pixel-perfect ni replicar funcionalidades JavaScript complejas.",
    "impacto": "Permitirá verificar si los estilos base de Tailwind y `ui-shared` se aplican correctamente a un HTML más complejo y si el error `border-border` se resuelve o cambia. También ayudará a ver si el 404 en `/dashboard` estaba relacionado con un contenido mínimo o un error de renderizado simple."
  },
  {
    "mejora": "Uso de componentes `PlaceholderItemCard`",
    "justificacion": "Para simular la lista de 'Oportunidades' sin necesidad de recrear completamente la lógica de esos cards, se usa un componente placeholder simple.",
    "impacto": "Simplifica el HTML manteniendo una estructura visual similar."
  }
]
*/
/* NOTAS PARA IMPLEMENTACIÓN FUTURA
[
  {
    "nota": "Este código es una aproximación visual y estructural. No incluye la lógica de los menús desplegables, carruseles, validaciones de formulario, ni ninguna interacción JavaScript avanzada del sitio original. El objetivo es probar el renderizado y los estilos base."
  },
  {
    "nota": "Las imágenes y los iconos se han referenciado directamente o se han usado placeholders de `lucide-react`. Los colores se han intentado aproximar con clases de Tailwind o colores directos donde las variables de `ui-shared` podrían no coincidir exactamente con los del sitio original (ej. `bg-green-800`, `text-amber-400`)."
  },
  {
    "nota": "Si el error `Cannot apply unknown utility class: border-border` persiste, el problema es definitivamente con la configuración de Tailwind y cómo `pwa-supervisor` está (o no está) heredando o procesando las definiciones de `ui-shared`."
  }
]
*/
