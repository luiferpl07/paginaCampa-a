import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

// Ejemplo de datos
const libros = [
  {
    id: 1,
    title: 'El Camino del Éxito',
    author: 'Autor Principal',
    description: 'Un libro que explora los principios fundamentales para alcanzar el éxito en cualquier ámbito de la vida.',
    publicationYear: '2023',
    pages: 286,
    coverImage: '/placeholder.jpg',
    url: '/libros/el-camino-del-exito',
  },
  {
    id: 2,
    title: 'Estrategias de Liderazgo',
    author: 'Autor Principal',
    description: 'Una guía completa sobre cómo desarrollar habilidades de liderazgo efectivas en el entorno profesional moderno.',
    publicationYear: '2022',
    pages: 342,
    coverImage: '/placeholder.jpg',
    url: '/libros/estrategias-de-liderazgo',
  },
  {
    id: 3,
    title: 'Innovación Disruptiva',
    author: 'Autor Principal',
    description: 'Un análisis profundo sobre cómo la innovación está transformando industrias enteras y cómo adaptarse a estos cambios.',
    publicationYear: '2021',
    pages: 304,
    coverImage: '/placeholder.jpg',
    url: '/libros/innovacion-disruptiva',
  },
  {
    id: 4,
    title: 'Comunicación Eficaz',
    author: 'Autor Principal',
    description: 'Técnicas y estrategias para mejorar tus habilidades de comunicación tanto en entornos profesionales como personales.',
    publicationYear: '2020',
    pages: 256,
    coverImage: '/placeholder.jpg',
    url: '/libros/comunicacion-eficaz',
  },
  {
    id: 5,
    title: 'Desarrollo Personal',
    author: 'Autor Principal',
    description: 'Una guía práctica para el crecimiento personal y profesional, con ejercicios y técnicas aplicables.',
    publicationYear: '2019',
    pages: 230,
    coverImage: '/placeholder.jpg',
    url: '/libros/desarrollo-personal',
  },
  {
    id: 6,
    title: 'Gestión del Tiempo',
    author: 'Autor Principal',
    description: 'Metodologías y herramientas para optimizar la gestión del tiempo y aumentar la productividad.',
    publicationYear: '2018',
    pages: 218,
    coverImage: '/placeholder.jpg',
    url: '/libros/gestion-del-tiempo',
  },
];

export default function Libros() {
  return (
    <Layout>
      {/* Cabecera de la página */}
      <section className="bg-gray-200 py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Libros Publicados
            </h1>
            <p className="text-xl">
              Explora mis publicaciones y descubre recursos valiosos para tu desarrollo.
            </p>
            <div className="flex items-center mt-6 text-sm">
            <Link href="/" className="text-secondary hover:text-[--red]">Inicio</Link>
            <span className="mx-2 text-secondary">/</span>
            <span className="text-secondary">Libros</span>
          </div>
          </div>
        </div>
      </section>

      {/* Lista de Libros */}
      <section className="py-16">
        <div className="container-custom">
          {/* Filtros */}
          <div className="mb-10 flex flex-wrap gap-4">
            <Button className="bg-[--red] text-white hover:bg-[--red]/90">Todos</Button>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">Más Recientes</Button>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">Más Populares</Button>
            <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-100">Por Categoría</Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {libros.map((libro) => (
              <article
                key={libro.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 flex flex-col"
              >
                <div className="h-64 bg-neutral-200 relative">
                  <div className="absolute inset-0 bg-neutral-300 flex items-center justify-center">
                    <span className="text-xl font-medium text-gray-500">Portada Libro</span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 mb-2">Año {libro.publicationYear} • {libro.pages} páginas</p>
                    <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-[--red]">
                      <Link href={libro.url}>{libro.title}</Link>
                    </h3>
                    <p className="text-base font-medium text-[--red] mb-3">{libro.author}</p>
                    <p className="text-gray-600 mb-4">{libro.description}</p>
                  </div>
                  <div className="flex gap-3 mt-auto">
                    <Button asChild variant="outline" className="flex-1 border-[--red] text-[--red] hover:bg-[--red]/10">
                      <Link href={libro.url}>Detalles</Link>
                    </Button>
                    <Button asChild className="flex-1 bg-[--red] text-white hover:bg-[--red]/90">
                      <Link href={`${libro.url}#comprar`}>Comprar</Link>
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

      {/* Recomendación */}
      <section className="bg-gray-100 py-16">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              ¿No sabes por dónde empezar?
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Recibe recomendaciones personalizadas basadas en tus intereses y objetivos.
            </p>
            <Button className="bg-[--red] text-white hover:bg-[--red]/90">
              Solicitar Recomendación
            </Button>
          </div>
        </div>
      </section>
      </Layout>
  );
}
