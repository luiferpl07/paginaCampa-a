import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

// Ejemplo de datos
const revistas = [
  {
    id: 1,
    title: 'Liderazgo & Innovación',
    edition: 'Edición 45',
    description: 'Revista especializada en tendencias de liderazgo e innovación para profesionales y empresarios.',
    publicationDate: 'Abril 2025',
    coverImage: '/placeholder.jpg',
    url: '/revistas/liderazgo-innovacion-45',
  },
  {
    id: 2,
    title: 'Ejecutivos Globales',
    edition: 'Edición 78',
    description: 'Publicación enfocada en ejecutivos con perspectiva internacional y casos de éxito empresarial.',
    publicationDate: 'Marzo 2025',
    coverImage: '/placeholder.jpg',
    url: '/revistas/ejecutivos-globales-78',
  },
  {
    id: 3,
    title: 'Estrategia & Negocios',
    edition: 'Edición 112',
    description: 'Análisis profundo de estrategias empresariales y tendencias en el mundo de los negocios.',
    publicationDate: 'Febrero 2025',
    coverImage: '/placeholder.jpg',
    url: '/revistas/estrategia-negocios-112',
  },
  {
    id: 4,
    title: 'Transformación Digital',
    edition: 'Edición 28',
    description: 'Todo sobre la transformación digital, tecnologías emergentes y su impacto en las organizaciones.',
    publicationDate: 'Enero 2025',
    coverImage: '/placeholder.jpg',
    url: '/revistas/transformacion-digital-28',
  },
  {
    id: 5,
    title: 'Emprendimiento Actual',
    edition: 'Edición 65',
    description: 'Revista dedicada a emprendedores, startups y nuevos modelos de negocio innovadores.',
    publicationDate: 'Diciembre 2024',
    coverImage: '/placeholder.jpg',
    url: '/revistas/emprendimiento-actual-65',
  },
  {
    id: 6,
    title: 'Desarrollo Profesional',
    edition: 'Edición 39',
    description: 'Enfocada en el crecimiento profesional, habilidades clave y tendencias del mercado laboral.',
    publicationDate: 'Noviembre 2024',
    coverImage: '/placeholder.jpg',
    url: '/revistas/desarrollo-profesional-39',
  },
];

export default function Revistas() {
  return (
    <Layout>
      {/* Cabecera de la página */}
      <section className="bg-gray-200  py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Revistas
            </h1>
            <p className="text-xl">
              Descubre mis colaboraciones y artículos publicados en revistas especializadas.
            </p>
            <div className="flex items-center mt-6 text-sm">
            <Link href="/" className="text-secondary hover:text-[--red]">Inicio</Link>
            <span className="mx-2 text-secondary">/</span>
            <span className="text-secondary">Revistas</span>
          </div>
          </div>
        </div>
      </section>

      {/* Revista Destacada */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Publicación Destacada
          </h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 h-96 md:h-auto bg-neutral-200 relative">
                <div className="absolute inset-0 bg-neutral-300 flex items-center justify-center">
                  <span className="text-xl font-medium text-gray-500">Portada Revista</span>
                </div>
              </div>
              <div className="md:col-span-3 p-8">
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <span className="bg-[--red] text-white text-xs px-3 py-1 rounded-full">Destacada</span>
                    <span className="ml-3 text-sm text-gray-500">{revistas[0].publicationDate}</span>
                  </div>
                  <p className="text-sm font-medium text-[--red]">{revistas[0].edition}</p>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{revistas[0].title}</h3>
                <p className="text-gray-600 mb-6">{revistas[0].description}</p>
                <p className="text-gray-600 mb-6">
                  En esta edición, exploramos las últimas tendencias en liderazgo y cómo la innovación está transformando las organizaciones.
                  Con entrevistas exclusivas a líderes empresariales y casos de estudio detallados.
                </p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-[--red] text-white hover:bg-[--red]/90">
                    <Link href={revistas[0].url}>Leer Artículo</Link>
                  </Button>
                  <Button variant="outline" className="border-[--red] text-[--red] hover:bg-[--red]/10">
                    <Link href={`${revistas[0].url}#subscription`}>Suscribirse</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Revistas */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-10">
            Todas las Publicaciones
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {revistas.slice(1).map((revista) => (
              <article
                key={revista.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="h-64 bg-neutral-200 relative">
                  <div className="absolute inset-0 bg-neutral-300 flex items-center justify-center">
                    <span className="text-xl font-medium text-gray-500">Portada Revista</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="mb-auto">
                    <div className="flex justify-between items-center mb-3">
                      <p className="text-sm text-gray-500">{revista.publicationDate}</p>
                      <p className="text-sm font-medium text-[--red]">{revista.edition}</p>
                    </div>
                    <h3 className="text-xl font-bold mb-3 text-gray-800 hover:text-[--red]">
                      <Link href={revista.url}>{revista.title}</Link>
                    </h3>
                    <p className="text-gray-600 mb-4">{revista.description}</p>
                  </div>
                  <div className="mt-4">
                    <Button asChild className="w-full bg-[--red] text-white hover:bg-[--red]/90">
                      <Link href={revista.url}>Ver Publicación</Link>
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Paginación */}
          <div className="mt-12 flex justify-center">
            <nav className="flex items-center gap-1">
              <Button variant="outline" className="border-gray-300 text-gray-700" disabled>
                Anterior
              </Button>
              <Button className="bg-[--red] text-white hover:bg-[--red]/90">1</Button>
              <Button variant="outline" className="border-gray-300 text-gray-700">2</Button>
              <Button variant="outline" className="border-gray-300 text-gray-700">3</Button>
              <Button variant="outline" className="border-gray-300 text-gray-700">
                Siguiente
              </Button>
            </nav>
          </div>
        </div>
      </section>

      {/* Colaboraciones */}
      <section className="bg-gray-100 py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Colaborar en Publicaciones
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              ¿Representa una revista o medio y está interesado en colaboraciones? Contácteme para discutir posibilidades.
            </p>
            <Button asChild className="bg-[--red] text-white hover:bg-[--red]/90 px-8">
              <Link href="/contacto">Contactar</Link>
            </Button>
          </div>
        </div>
      </section>
      </Layout>
    
  );
}
