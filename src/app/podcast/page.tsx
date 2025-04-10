import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';

// Ejemplo de datos
const podcasts = [
  {
    id: 1,
    title: 'Claves para el Liderazgo Efectivo',
    description: 'En este episodio exploraremos las estrategias y habilidades necesarias para un liderazgo efectivo en entornos empresariales.',
    date: '15 de abril, 2025',
    duration: '45:28',
    image: '/placeholder.jpg',
    url: '/podcast/claves-para-el-liderazgo-efectivo',
  },
  {
    id: 2,
    title: 'Innovación y Creatividad en los Negocios',
    description: 'Analizamos cómo fomentar la innovación y creatividad para impulsar el crecimiento de tu negocio en mercados competitivos.',
    date: '1 de abril, 2025',
    duration: '38:15',
    image: '/placeholder.jpg',
    url: '/podcast/innovacion-y-creatividad',
  },
  {
    id: 3,
    title: 'Gestión Efectiva del Tiempo',
    description: 'Técnicas y metodologías para optimizar tu tiempo y aumentar la productividad, tanto en el ámbito profesional como personal.',
    date: '15 de marzo, 2025',
    duration: '42:10',
    image: '/placeholder.jpg',
    url: '/podcast/gestion-efectiva-del-tiempo',
  },
  {
    id: 4,
    title: 'Transformación Digital en las Empresas',
    description: 'Exploramos los desafíos y oportunidades que presenta la transformación digital para las organizaciones modernas.',
    date: '1 de marzo, 2025',
    duration: '40:55',
    image: '/placeholder.jpg',
    url: '/podcast/transformacion-digital',
  },
  {
    id: 5,
    title: 'Comunicación Efectiva en Equipos de Trabajo',
    description: 'Estrategias para mejorar la comunicación en equipos de trabajo y evitar malentendidos que afecten la productividad.',
    date: '15 de febrero, 2025',
    duration: '35:20',
    image: '/placeholder.jpg',
    url: '/podcast/comunicacion-efectiva',
  },
  {
    id: 6,
    title: 'Resiliencia y Adaptación al Cambio',
    description: 'Cómo desarrollar resiliencia y adaptarse a los cambios constantes en el entorno profesional y personal.',
    date: '1 de febrero, 2025',
    duration: '46:30',
    image: '/placeholder.jpg',
    url: '/podcast/resiliencia-y-adaptacion',
  },
];

export default function Podcast() {
  return (
   <Layout>
      {/* Cabecera de la página */}
      
      <section className="bg-gray-200 py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Podcast
            </h1>
            <p className="text-xl">
              Escucha episodios sobre liderazgo, desarrollo personal y profesional.
            </p>
            <div className="flex items-center mt-6 text-sm">
            <Link href="/" className="text-secondary hover:text-[--red]">Inicio</Link>
            <span className="mx-2 text-secondary">/</span>
            <span className="text-secondary">Podcast</span>
          </div>
          </div>
        </div>
      </section>

      {/* Episodio Destacado */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Episodio Destacado
          </h2>
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="grid md:grid-cols-5">
              <div className="md:col-span-2 h-64 md:h-auto bg-neutral-200 relative">
                <div className="absolute inset-0 bg-neutral-300 flex items-center justify-center">
                  <span className="text-xl font-medium text-gray-500">Imagen Podcast</span>
                </div>
              </div>
              <div className="md:col-span-3 p-8">
                <div className="flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-500">{podcasts[0].date} • {podcasts[0].duration}</p>
                  <span className="bg-[--red] text-white text-xs px-3 py-1 rounded-full">Nuevo</span>
                </div>
                <h3 className="text-2xl font-bold mb-4 text-gray-800">{podcasts[0].title}</h3>
                <p className="text-gray-600 mb-6">{podcasts[0].description}</p>
                <div className="flex flex-wrap gap-4">
                  <Button asChild className="bg-[--red] text-white hover:bg-[--red]/90">
                    <Link href={podcasts[0].url}>Escuchar Ahora</Link>
                  </Button>
                  <Button variant="outline" className="border-[--red] text-[--red] hover:bg-[--red]/10">
                    <Link href={`${podcasts[0].url}#transcription`}>Ver Transcripción</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Episodios */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-10">
            Todos los Episodios
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {podcasts.slice(1).map((podcast) => (
              <article
                key={podcast.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="h-48 bg-neutral-200 relative">
                  <div className="absolute inset-0 bg-neutral-300 flex items-center justify-center">
                    <span className="text-xl font-medium text-gray-500">Imagen Podcast</span>
                  </div>
                  <div className="absolute bottom-4 right-4 bg-black/70 text-white text-xs font-bold px-3 py-1 rounded">
                    {podcast.duration}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{podcast.date}</p>
                  <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-[--red]">
                    <Link href={podcast.url}>{podcast.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-4">{podcast.description}</p>
                  <div className="flex gap-3">
                    <Button asChild variant="outline" className="flex-1 border-[--red] text-[--red] hover:bg-[--red]/10">
                      <Link href={podcast.url}>Escuchar</Link>
                    </Button>
                    <Button asChild className="flex-1 bg-[--red] text-white hover:bg-[--red]/90">
                      <Link href={`${podcast.url}#download`}>Descargar</Link>
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

      {/* Plataformas */}
      <section className="bg-gray-100 py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-10 text-gray-800">
            Escucha en tu plataforma favorita
          </h2>
          <div className="flex flex-wrap justify-center gap-6">
            {['Spotify', 'Apple Podcasts', 'Google Podcasts', 'Amazon Music', 'iVoox'].map((platform) => (
              <Button
                key={platform}
                variant="outline"
                className="border-gray-300 text-gray-700 px-6 hover:border-[--red] hover:text-[--red]"
              >
                {platform}
              </Button>
            ))}
          </div>
        </div>
      </section>
      </Layout>
  );
}
