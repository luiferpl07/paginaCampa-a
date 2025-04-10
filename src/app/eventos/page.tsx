import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';

// Datos de ejemplo para eventos
const eventos = [
  {
    id: 1,
    titulo: 'Foro de Desarrollo Económico Regional',
    fecha: '25 de Mayo, 2025',
    hora: '10:00 AM - 1:00 PM',
    ubicacion: 'Centro de Convenciones, Ciudad Principal',
    descripcion: 'Un espacio de diálogo sobre las estrategias para impulsar el desarrollo económico sostenible en la región.',
    imagen: '/placeholder.jpg',
    categoria: 'Economía',
    url: '/eventos/foro-desarrollo-economico-regional'
  },
  {
    id: 2,
    titulo: 'Conferencia sobre Liderazgo y Gobernanza',
    fecha: '12 de Junio, 2025',
    hora: '5:00 PM - 7:30 PM',
    ubicacion: 'Auditorio Universidad Nacional',
    descripcion: 'Exploraremos los desafíos del liderazgo público y las mejores prácticas de gobernanza en contextos complejos.',
    imagen: '/placeholder.jpg',
    categoria: 'Liderazgo',
    url: '/eventos/conferencia-liderazgo-gobernanza'
  },
  {
    id: 3,
    titulo: 'Taller de Participación Ciudadana',
    fecha: '5 de Julio, 2025',
    hora: '9:00 AM - 12:30 PM',
    ubicacion: 'Centro Cultural Metropolitano',
    descripcion: 'Un taller práctico para fortalecer las capacidades de participación ciudadana y veeduría en proyectos públicos.',
    imagen: '/placeholder.jpg',
    categoria: 'Ciudadanía',
    url: '/eventos/taller-participacion-ciudadana'
  },
  {
    id: 4,
    titulo: 'Encuentro por la Educación de Calidad',
    fecha: '20 de Julio, 2025',
    hora: '3:00 PM - 6:00 PM',
    ubicacion: 'Centro Educativo Regional',
    descripcion: 'Un encuentro para discutir políticas y estrategias que mejoren la calidad educativa a nivel regional.',
    imagen: '/placeholder.jpg',
    categoria: 'Educación',
    url: '/eventos/encuentro-educacion-calidad'
  },
  {
    id: 5,
    titulo: 'Debate sobre Políticas Ambientales',
    fecha: '8 de Agosto, 2025',
    hora: '4:00 PM - 7:00 PM',
    ubicacion: 'Jardín Botánico Municipal',
    descripcion: 'Un espacio de debate sobre las políticas ambientales necesarias para enfrentar el cambio climático.',
    imagen: '/placeholder.jpg',
    categoria: 'Medio Ambiente',
    url: '/eventos/debate-politicas-ambientales'
  },
  {
    id: 6,
    titulo: 'Conversatorio: El Futuro de la Movilidad Urbana',
    fecha: '15 de Agosto, 2025',
    hora: '6:00 PM - 8:00 PM',
    ubicacion: 'Centro de Diseño e Innovación',
    descripcion: 'Analizaremos los retos y oportunidades para transformar la movilidad en nuestras ciudades.',
    imagen: '/placeholder.jpg',
    categoria: 'Urbanismo',
    url: '/eventos/conversatorio-movilidad-urbana'
  },
];

export default function Eventos() {
  return (
    <Layout>
      {/* Cabecera de la página */}
      <div className="bg-gray-100 py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Eventos</h1>
          <p className="text-xl max-w-2xl">
            Conozca los próximos eventos, conferencias y actividades programadas.
          </p>
          <div className="flex items-center mt-6 text-sm">
            <Link href="/" className="text-secondary hover:text-[--red]">Inicio</Link>
            <span className="mx-2 text-secondary">/</span>
            <span className="text-secondary">Eventos</span>
          </div>
        </div>
      </div>

      {/* Evento Destacado */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-200">Evento Destacado</h2>
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto relative bg-gray-200">
                <Image
                  src={eventos[0].imagen}
                  alt={eventos[0].titulo}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <div className="inline-block bg-[--red] text-xs px-3 py-1 rounded-full mb-2">
                      {eventos[0].categoria}
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold">
                      {eventos[0].titulo}
                    </h3>
                  </div>
                </div>
              </div>
              <div className="p-8">
                <div className="flex flex-col gap-2 mb-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[--red]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <span className="text-gray-700">{eventos[0].fecha}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[--red]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700">{eventos[0].hora}</span>
                  </div>
                  <div className="flex items-center">
                    <svg className="w-5 h-5 mr-2 text-[--red]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700">{eventos[0].ubicacion}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6">{eventos[0].descripcion}</p>

                <div className="flex flex-wrap gap-3">
                  <Button asChild className="bg-[--red] text-white hover:bg-[--red]/90">
                    <Link href={eventos[0].url}>Más Información</Link>
                  </Button>
                  <Button variant="outline" className="border-[--red] text-[--red] hover:bg-[--red]/10">
                    <Link href={`${eventos[0].url}#registro`}>Registrarse</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lista de Eventos */}
      <section className="py-16">
        <div className="container-custom">
          <h2 className="text-2xl font-bold mb-8 pb-2 border-b border-gray-200">Próximos Eventos</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {eventos.slice(1).map((evento) => (
              <div key={evento.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <div className="relative h-48 bg-gray-200">
                  <Image
                    src={evento.imagen}
                    alt={evento.titulo}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute top-4 left-4 bg-[--red] text-white text-xs px-3 py-1 rounded-full">
                    {evento.categoria}
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">{evento.fecha}</p>
                  <h3 className="text-xl font-bold mb-3">
                    <Link href={evento.url} className="hover:text-[--red]">
                      {evento.titulo}
                    </Link>
                  </h3>

                  <div className="flex items-center mb-2">
                    <svg className="w-4 h-4 mr-2 text-[--red]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span className="text-gray-700 text-sm">{evento.hora}</span>
                  </div>

                  <div className="flex items-center mb-4">
                    <svg className="w-4 h-4 mr-2 text-[--red]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    <span className="text-gray-700 text-sm">{evento.ubicacion}</span>
                  </div>

                  <Button asChild variant="outline" className="w-full border-[--red] text-[--red] hover:bg-[--red]/10">
                    <Link href={evento.url}>Ver Detalles</Link>
                  </Button>
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

      {/* Calendario de Eventos */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom text-center">
          <h2 className="text-2xl font-bold mb-4">Ver Calendario Completo</h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Consulta nuestro calendario de eventos para planificar tu asistencia y no perderte ninguna actividad.
          </p>
          <Button asChild className="bg-[--red] text-white hover:bg-[--red]/90">
            <Link href="/eventos/calendario">Explorar Calendario</Link>
          </Button>
        </div>
      </section>
    </Layout>
  );
}
