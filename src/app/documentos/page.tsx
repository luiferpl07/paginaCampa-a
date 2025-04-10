import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

// Datos de ejemplo para documentos
const documentos = [
  {
    id: 1,
    titulo: 'Plan Estratégico de Desarrollo 2025-2030',
    fecha: '15 de abril, 2025',
    tipoArchivo: 'PDF',
    tamaño: '3.2 MB',
    categoria: 'Planificación',
    descripcion: 'Este documento presenta el plan estratégico de desarrollo para los próximos cinco años, con un enfoque en sostenibilidad, inclusión y crecimiento económico.',
    url: '/documentos/plan-estrategico-2025-2030.pdf'
  },
  {
    id: 2,
    titulo: 'Informe Anual de Gestión 2024',
    fecha: '28 de febrero, 2025',
    tipoArchivo: 'PDF',
    tamaño: '5.7 MB',
    categoria: 'Informes',
    descripcion: 'Reporte completo de las actividades, proyectos y resultados obtenidos durante el año 2024, incluyendo indicadores de desempeño y ejecución presupuestaria.',
    url: '/documentos/informe-anual-2024.pdf'
  },
  {
    id: 3,
    titulo: 'Política de Desarrollo Sostenible',
    fecha: '10 de enero, 2025',
    tipoArchivo: 'PDF',
    tamaño: '2.8 MB',
    categoria: 'Políticas',
    descripcion: 'Documento que establece los lineamientos y estrategias para promover un desarrollo sostenible, equilibrando el crecimiento económico, la protección ambiental y el bienestar social.',
    url: '/documentos/politica-desarrollo-sostenible.pdf'
  },
  {
    id: 4,
    titulo: 'Estudio de Impacto Social de Programas Comunitarios',
    fecha: '20 de diciembre, 2024',
    tipoArchivo: 'PDF',
    tamaño: '4.1 MB',
    categoria: 'Investigación',
    descripcion: 'Análisis detallado del impacto social de los programas comunitarios implementados, con metodología, resultados y recomendaciones para mejorar su efectividad.',
    url: '/documentos/estudio-impacto-social.pdf'
  },
  {
    id: 5,
    titulo: 'Guía para la Participación Ciudadana Efectiva',
    fecha: '5 de noviembre, 2024',
    tipoArchivo: 'PDF',
    tamaño: '1.9 MB',
    categoria: 'Guías',
    descripcion: 'Manual práctico para promover y facilitar la participación ciudadana en la toma de decisiones públicas, con herramientas y metodologías de implementación.',
    url: '/documentos/guia-participacion-ciudadana.pdf'
  },
  {
    id: 6,
    titulo: 'Presentación: Innovación en Políticas Públicas',
    fecha: '15 de octubre, 2024',
    tipoArchivo: 'PPTX',
    tamaño: '8.5 MB',
    categoria: 'Presentaciones',
    descripcion: 'Presentación utilizada en el foro internacional sobre innovación en políticas públicas, con casos de estudio, tendencias y recomendaciones.',
    url: '/documentos/presentacion-innovacion-politicas.pptx'
  },
  {
    id: 7,
    titulo: 'Boletín Informativo - Edición Especial',
    fecha: '30 de septiembre, 2024',
    tipoArchivo: 'PDF',
    tamaño: '3.0 MB',
    categoria: 'Boletines',
    descripcion: 'Edición especial del boletín informativo trimestral, con artículos, entrevistas y noticias relevantes sobre proyectos e iniciativas en curso.',
    url: '/documentos/boletin-especial.pdf'
  },
  {
    id: 8,
    titulo: 'Modelo de Gestión para Proyectos Sociales',
    fecha: '15 de agosto, 2024',
    tipoArchivo: 'PDF',
    tamaño: '4.3 MB',
    categoria: 'Metodologías',
    descripcion: 'Documento técnico que presenta un modelo de gestión para proyectos sociales, con enfoque en resultados, sostenibilidad y participación comunitaria.',
    url: '/documentos/modelo-gestion-proyectos.pdf'
  },
];

// Categorías para filtrado
const categorias = [
  { id: 'todas', nombre: 'Todas' },
  { id: 'planificacion', nombre: 'Planificación' },
  { id: 'informes', nombre: 'Informes' },
  { id: 'politicas', nombre: 'Políticas' },
  { id: 'investigacion', nombre: 'Investigación' },
  { id: 'guias', nombre: 'Guías' },
  { id: 'presentaciones', nombre: 'Presentaciones' },
  { id: 'boletines', nombre: 'Boletines' },
  { id: 'metodologias', nombre: 'Metodologías' },
];

export default function Documentos() {
  return (
    <Layout>
      {/* Cabecera de la página */}
      <div className="bg-gray-200  py-20">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Documentos</h1>
          <p className="text-xl max-w-2xl">
            Acceda a documentos, informes, presentaciones y otros recursos descargables.
          </p>
          <div className="flex items-center mt-6 text-sm">
            <Link href="/" className="text-secondary hover:text-[--red]">Inicio</Link>
            <span className="mx-2 text-secondary">/</span>
            <span className="text-secondary">Documentos</span>
          </div>
        </div>
      </div>

      {/* Contenido Principal */}
      <section className="py-16">
        <div className="container-custom">
          {/* Filtros */}
          <div className="mb-10">
            <h2 className="text-xl font-bold mb-4">Filtrar por Categoría</h2>
            <div className="flex flex-wrap gap-2">
              {categorias.map((categoria) => (
                <Button
                  key={categoria.id}
                  className={categoria.id === 'todas'
                    ? 'bg-[--red] text-white hover:bg-[--red]/90'
                    : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-100'
                  }
                >
                  {categoria.nombre}
                </Button>
              ))}
            </div>
          </div>

          {/* Buscador */}
          <div className="mb-10">
            <div className="relative max-w-md">
              <input
                type="text"
                placeholder="Buscar documentos..."
                className="w-full px-4 py-3 pl-12 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[--red] focus:border-transparent"
              />
              <svg
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </div>
          </div>

          {/* Lista de Documentos */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {documentos.map((documento) => (
              <div key={documento.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-bold text-gray-800 hover:text-[--red] transition-colors">
                      <Link href={documento.url}>{documento.titulo}</Link>
                    </h3>
                    <span className="flex items-center justify-center bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded">
                      {documento.tipoArchivo}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 mb-3">
                    Publicado: {documento.fecha} • {documento.tamaño}
                  </p>
                  <p className="text-gray-600 mb-4 text-sm line-clamp-3">{documento.descripcion}</p>
                  <div className="flex justify-between items-center">
                    <span className="inline-block bg-gray-100 text-gray-600 text-xs px-3 py-1 rounded-full">
                      {documento.categoria}
                    </span>
                    <Button asChild variant="outline" className="border-[--red] text-[--red] hover:bg-[--red]/10">
                      <Link href={documento.url} download>
                        <svg
                          className="w-4 h-4 mr-2"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                          />
                        </svg>
                        Descargar
                      </Link>
                    </Button>
                  </div>
                </div>
              </div>
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

    
    </Layout>
  );
}
