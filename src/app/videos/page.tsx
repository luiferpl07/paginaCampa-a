import Link from 'next/link';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Layout from '@/components/Layout';


// Ejemplo de datos
const videoCategories = [
  { id: 'all', name: 'Todos' },
  { id: 'conferences', name: 'Conferencias' },
  { id: 'interviews', name: 'Entrevistas' },
  { id: 'tutorials', name: 'Tutoriales' },
  { id: 'webinars', name: 'Webinars' },
];

const videos = [
  {
    id: 1,
    title: 'Conferencia: El Futuro del Liderazgo',
    description: 'Conferencia sobre cómo se transformará el liderazgo en las organizaciones durante la próxima década.',
    duration: '01:15:42',
    date: '20 de abril, 2025',
    thumbnail: '/placeholder.jpg',
    category: 'conferences',
    views: '15.7K',
    url: '/videos/futuro-del-liderazgo',
  },
  {
    id: 2,
    title: 'Entrevista: Innovación en Tiempos de Crisis',
    description: 'Una conversación sobre cómo las crisis pueden ser catalizadores para la innovación en las organizaciones.',
    duration: '48:25',
    date: '10 de abril, 2025',
    thumbnail: '/placeholder.jpg',
    category: 'interviews',
    views: '8.3K',
    url: '/videos/innovacion-crisis',
  },
  {
    id: 3,
    title: 'Tutorial: Técnicas Avanzadas de Comunicación',
    description: 'Aprende técnicas avanzadas para mejorar tu comunicación en entornos profesionales y personales.',
    duration: '35:18',
    date: '1 de abril, 2025',
    thumbnail: '/placeholder.jpg',
    category: 'tutorials',
    views: '12.9K',
    url: '/videos/tecnicas-comunicacion',
  },
  {
    id: 4,
    title: 'Webinar: Transformación Digital para Empresas',
    description: 'Un webinar completo sobre cómo implementar la transformación digital en cualquier tipo de empresa.',
    duration: '01:05:30',
    date: '25 de marzo, 2025',
    thumbnail: '/placeholder.jpg',
    category: 'webinars',
    views: '7.2K',
    url: '/videos/transformacion-digital',
  },
  {
    id: 5,
    title: 'Conferencia: Tendencias en Gestión de Equipos',
    description: 'Las últimas tendencias en gestión de equipos de trabajo y cómo implementarlas en tu organización.',
    duration: '55:40',
    date: '15 de marzo, 2025',
    thumbnail: '/placeholder.jpg',
    category: 'conferences',
    views: '9.5K',
    url: '/videos/tendencias-equipos',
  },
  {
    id: 6,
    title: 'Entrevista: Claves del Éxito Empresarial',
    description: 'Una entrevista sobre los factores determinantes para el éxito empresarial en el entorno actual.',
    duration: '42:15',
    date: '5 de marzo, 2025',
    thumbnail: '/placeholder.jpg',
    category: 'interviews',
    views: '10.8K',
    url: '/videos/claves-exito',
  },
];

export default function Videos() {
  return (
    <Layout>
      {/* Cabecera de la página */}
      <section className="bg-gray-200 py-20">
        <div className="container-custom">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Videos
            </h1>
            <p className="text-xl">
              Explora conferencias, entrevistas, tutoriales y más contenido en video.
            </p>
          </div>
        </div>
      </section>

      {/* Video Destacado */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-3xl font-bold mb-10 text-center">
            Video Destacado
          </h2>
          <div className="max-w-4xl mx-auto">
            <div className="bg-black aspect-video rounded-lg overflow-hidden relative">
              <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                <span className="text-2xl font-medium text-gray-400">Video Player</span>
                <div className="absolute inset-0 flex items-center justify-center">
                  <Button className="bg-white/20 hover:bg-white/30 rounded-full w-16 h-16 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-8 h-8">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </Button>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-b-lg shadow-md">
              <div className="flex items-center justify-between mb-4">
                <p className="text-sm text-gray-500">{videos[0].date} • {videos[0].duration}</p>
                <span className="text-sm text-gray-500">{videos[0].views} visualizaciones</span>
              </div>
              <h3 className="text-2xl font-bold mb-4 text-gray-800">{videos[0].title}</h3>
              <p className="text-gray-600 mb-6">{videos[0].description}</p>
              <div className="flex flex-wrap gap-4">
                <Button asChild className="bg-[--red] text-white hover:bg-[--red]/90">
                  <Link href={videos[0].url}>Ver Completo</Link>
                </Button>
                <Button variant="outline" className="border-[--red] text-[--red] hover:bg-[--red]/10">
                  <Link href="#share">Compartir</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Videos */}
      <section className="py-16">
        <div className="container-custom">
          {/* Filtros */}
          <div className="mb-10 flex flex-wrap gap-3">
            {videoCategories.map((category) => (
              <Button
                key={category.id}
                className={category.id === 'all'
                  ? 'bg-[--red] text-white hover:bg-[--red]/90'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                }
              >
                {category.name}
              </Button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {videos.slice(1).map((video) => (
              <article
                key={video.id}
                className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300"
              >
                <div className="aspect-video bg-neutral-800 relative">
                  <div className="absolute inset-0 bg-neutral-800 flex items-center justify-center">
                    <span className="text-xl font-medium text-gray-400">Thumbnail</span>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="bg-black/50 hover:bg-black/60 rounded-full w-12 h-12 flex items-center justify-center transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-6 h-6">
                          <path d="M8 5v14l11-7z" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="absolute bottom-2 right-2 bg-black/80 text-white text-xs font-bold px-2 py-1 rounded">
                    {video.duration}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-gray-500">{video.date}</p>
                    <span className="text-xs text-gray-500">{video.views} views</span>
                  </div>
                  <h3 className="text-xl font-bold mb-2 text-gray-800 hover:text-[--red]">
                    <Link href={video.url}>{video.title}</Link>
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{video.description}</p>
                  <div className="flex gap-2">
                    <Button asChild className="bg-[--red] text-white hover:bg-[--red]/90 flex-1">
                      <Link href={video.url}>Ver Video</Link>
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

      {/* Canal de YouTube */}
      <section className="bg-gray-100 py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-6 text-gray-800">
            Suscríbete a mi canal
          </h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            No te pierdas ningún contenido nuevo. Suscríbete a mi canal de YouTube y activa las notificaciones.
          </p>
          <Button className="bg-[#FF0000] text-white hover:bg-[#FF0000]/90 px-8">
            <span className="mr-2">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </span>
            Suscribirse
          </Button>
        </div>
      </section>
      </Layout>
  );
}
