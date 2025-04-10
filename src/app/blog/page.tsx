import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

// Datos de ejemplo
const blogPosts = [
  {
    id: 1,
    title: 'Cómo fortalecer el liderazgo comunitario',
    excerpt: 'Estrategias efectivas para desarrollar líderes locales que impulsen el cambio en sus comunidades.',
    date: '15 de abril, 2025',
    author: 'Héctor Olimpo',
    category: 'Liderazgo',
    image: '/placeholder.jpg',
    url: '/blog/como-fortalecer-liderazgo-comunitario'
  },
  {
    id: 2,
    title: 'Innovación en políticas públicas',
    excerpt: 'Nuevos enfoques para diseñar e implementar políticas que respondan a los desafíos contemporáneos.',
    date: '8 de abril, 2025',
    author: 'Héctor Olimpo',
    category: 'Políticas Públicas',
    image: '/placeholder.jpg',
    url: '/blog/innovacion-politicas-publicas'
  },
  {
    id: 3,
    title: 'Educación para un futuro sostenible',
    excerpt: 'La importancia de reformar el sistema educativo para preparar a las nuevas generaciones ante los retos globales.',
    date: '1 de abril, 2025',
    author: 'Héctor Olimpo',
    category: 'Educación',
    image: '/placeholder.jpg',
    url: '/blog/educacion-futuro-sostenible'
  },
  {
    id: 4,
    title: 'Participación ciudadana en la era digital',
    excerpt: 'Cómo las nuevas tecnologías pueden fortalecer la democracia y la participación ciudadana en los procesos públicos.',
    date: '25 de marzo, 2025',
    author: 'Héctor Olimpo',
    category: 'Democracia',
    image: '/placeholder.jpg',
    url: '/blog/participacion-ciudadana-era-digital'
  },
  {
    id: 5,
    title: 'Desarrollo económico inclusivo',
    excerpt: 'Estrategias para promover un crecimiento económico que beneficie a todos los sectores de la sociedad.',
    date: '18 de marzo, 2025',
    author: 'Héctor Olimpo',
    category: 'Economía',
    image: '/placeholder.jpg',
    url: '/blog/desarrollo-economico-inclusivo'
  },
  {
    id: 6,
    title: 'El futuro de la movilidad urbana',
    excerpt: 'Tendencias y soluciones para mejorar el transporte en las ciudades y reducir la congestión vehicular.',
    date: '12 de marzo, 2025',
    author: 'Héctor Olimpo',
    category: 'Urbanismo',
    image: '/placeholder.jpg',
    url: '/blog/futuro-movilidad-urbana'
  },
];

// Categorías principales para mostrar en los filtros
const categories = [
  { id: 'all', name: 'Todos' },
  { id: 'liderazgo', name: 'Liderazgo' },
  { id: 'politicas', name: 'Políticas Públicas' },
  { id: 'educacion', name: 'Educación' },
  { id: 'economia', name: 'Economía' },
];

export default function Blog() {
  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-gray-200 py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Blog</h1>
          <p className="text-xl max-w-2xl">
            Artículos de opinión, reflexiones y análisis sobre temas de interés público.
          </p>
          <div className="flex items-center mt-6 text-sm">
            <Link href="/" className="text-secondary hover:text-[--red]">Inicio</Link>
            <span className="mx-2 text-secondary">/</span>
            <span className="text-secondary">Blog</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="py-16 bg-gray-50">
        <div className="container-custom">
          {/* Filtros */}
          <div className="mb-12 flex flex-wrap gap-3">
            {categories.map((category) => (
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

          {/* Featured Post */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-200">Artículo Destacado</h2>
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="grid md:grid-cols-2">
                <div className="h-64 md:h-auto relative bg-gray-200">
                  <Image
                    src={blogPosts[0].image}
                    alt={blogPosts[0].title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[--red] text-white text-xs px-3 py-1 rounded-full">
                    {blogPosts[0].category}
                  </div>
                </div>
                <div className="p-8">
                  <p className="text-sm text-gray-500 mb-2">{blogPosts[0].date} • Por {blogPosts[0].author}</p>
                  <h3 className="text-2xl font-bold mb-4">
                    <Link href={blogPosts[0].url} className="hover:text-[--red]">
                      {blogPosts[0].title}
                    </Link>
                  </h3>
                  <p className="text-gray-600 mb-6">{blogPosts[0].excerpt}</p>
                  <Button asChild className="bg-[--red] text-white hover:bg-[--red]/90">
                    <Link href={blogPosts[0].url}>Leer Artículo</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Posts Grid */}
          <div>
            <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-200">Artículos Recientes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogPosts.slice(1).map((post) => (
                <div key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative h-48 bg-gray-200">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-4 left-4 bg-[--red] text-white text-xs px-3 py-1 rounded-full">
                      {post.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <p className="text-sm text-gray-500 mb-2">{post.date} • Por {post.author}</p>
                    <h3 className="text-xl font-bold mb-3">
                      <Link href={post.url} className="hover:text-[--red]">
                        {post.title}
                      </Link>
                    </h3>
                    <p className="text-gray-600 mb-4">{post.excerpt}</p>
                    <Button asChild variant="outline" className="w-full border-[--red] text-[--red] hover:bg-[--red]/10">
                      <Link href={post.url}>Leer Más</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination */}
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
      </div>

    </Layout>
  );
}
