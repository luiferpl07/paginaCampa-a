import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

// Ejemplo de datos
const noticias = [
  {
    id: 1,
    title: 'Nueva Colaboración Internacional',
    excerpt: 'Se ha anunciado una nueva colaboración internacional con importantes instituciones.',
    date: '15 de abril, 2025',
    image: '/placeholder.jpg',
    category: 'Internacional',
  },
  {
    id: 2,
    title: 'Próximo Evento en Madrid',
    excerpt: 'Se anuncia un importante evento que tendrá lugar en Madrid el próximo mes.',
    date: '10 de abril, 2025',
    image: '/placeholder.jpg',
    category: 'Eventos',
  },
  {
    id: 3,
    title: 'Nuevo Libro Publicado',
    excerpt: 'Se ha publicado un nuevo libro que está teniendo gran aceptación entre los lectores.',
    date: '5 de abril, 2025',
    image: '/placeholder.jpg',
    category: 'Publicaciones',
  },
  {
    id: 4,
    title: 'Reconocimiento Internacional',
    excerpt: 'Se ha otorgado un importante reconocimiento por la labor desarrollada.',
    date: '28 de marzo, 2025',
    image: '/placeholder.jpg',
    category: 'Premios',
  },
  {
    id: 5,
    title: 'Nuevo Proyecto Social',
    excerpt: 'Se inicia un nuevo proyecto social con impacto en comunidades vulnerables.',
    date: '20 de marzo, 2025',
    image: '/placeholder.jpg',
    category: 'Social',
  },
  {
    id: 6,
    title: 'Entrevista en Medio Nacional',
    excerpt: 'Recientemente concedida una entrevista a un importante medio de comunicación.',
    date: '15 de marzo, 2025',
    image: '/placeholder.jpg',
    category: 'Medios',
  },
];

export default function Noticias() {
  return (
    <Layout>
      {/* Cabecera de la página */}
      <section className="bg-gray-200 text-muted py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Últimas Noticias
            </h1>
            <p className="text-xl">
              Mantente informado sobre las últimas novedades y actividades.
            </p>
            <div className="flex items-center mt-6 text-sm">
            <Link href="/" className="text-secondary hover:text-[--red]">Inicio</Link>
            <span className="mx-2 text-secondary">/</span>
            <span className="text-secondary">Noticias</span>
          </div>
          </div>
        </div>
      </section>

      {/* Lista de Noticias */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {noticias.map((noticia) => (
              <article
                key={noticia.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="h-48 bg-neutral-200 relative">
                  <div className="absolute inset-0 bg-neutral-300 flex items-center justify-center">
                    <span className="text-xl font-medium text-gray-500">Imagen Noticia</span>
                  </div>
                  <div className="absolute top-4 left-4 bg-[--red] text-white text-xs font-bold px-3 py-1 rounded">
                    {noticia.category}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{noticia.date}</p>
                  <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-[--red]">
                    <Link href={`/noticias/${noticia.id}`}>{noticia.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{noticia.excerpt}</p>
                  <Button asChild variant="outline" className="w-full border-[--red] text-[--red] hover:bg-[--red]/10">
                    <Link href={`/noticias/${noticia.id}`}>Leer más</Link>
                  </Button>
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

      {/* Suscripción a noticias */}
      <section className="bg-gray-100 py-16">
        <div className="container-custom">
          <div className="max-w-xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6 text-gray-800">
              Mantente informado
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              Suscríbete para recibir las últimas noticias directamente en tu correo.
            </p>

            <div className="flex flex-col sm:flex-row gap-3">
              <input
                type="email"
                placeholder="Tu correo electrónico"
                className="flex-1 px-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[--red]"
              />
              <Button className="bg-[--red] text-white hover:bg-[--red]/90">
                Suscribirme
              </Button>
            </div>
          </div>
        </div>
      </section>
      </Layout>
  );
}
