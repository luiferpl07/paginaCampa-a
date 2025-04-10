'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '../ui/button';
import { get } from '@/lib/api-client';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Banner {
  id: number;
  titulo: string;
  subtitulo: string;
  imagenUrl: string;
  textoBoton: string;
  enlaceBoton: string;
}

const SeccionPrincipal = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentBanner, setCurrentBanner] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBanners = async () => {
      setLoading(true);
      try {
        const response = await get<Banner[]>('/banners');
        if (response.error) {
          setError(response.error);
        } else if (response.data && response.data.length > 0) {
          setBanners(response.data);
          setCurrentBanner(0);
        } else {
          setBanners([
            {
              id: 0,
              titulo: 'Por un país mejor',
              subtitulo: 'Sea parte de nuestro equipo, regístrese para recibir actualizaciones.',
              imagenUrl: 'https://img.lalr.co/cms/2021/02/12115543/H%C3%A9ctor-Olimpo-Espinosa-LR.jpg',
              textoBoton: 'INSCRIBIRSE',
              enlaceBoton: '#',
            },
          ]);
          setCurrentBanner(0);
        }
      } catch (err) {
        setError('Error al cargar los banners');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchBanners();
  }, []);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev + 1) % banners.length);
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen">Cargando banners...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen">Error: {error}</div>;
  }

  if (banners.length === 0) {
    return <div className="flex items-center justify-center min-h-screen">No hay banners disponibles</div>;
  }

  const banner = banners[currentBanner];

  return (
    <div
      className="hero-section relative"
      style={{
        backgroundImage: `url('${banner.imagenUrl}')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: '100vh',
        width: '100%',
      }}
    >
      <div className="hero-overlay bg-black/40 absolute inset-0 z-10" />

      {/* Controles: solo visibles en md y más grande */}
      {banners.length > 1 && (
        <>
          <div className="hidden md:flex absolute inset-y-0 left-0 items-center z-20">
            <button
              onClick={prevBanner}
              className="bg-black/30 text-white p-2 hover:bg-black/50 transition-all"
              aria-label="Anterior"
            >
              <ChevronLeft size={24} />
            </button>
          </div>

          <div className="hidden md:flex absolute inset-y-0 right-0 items-center z-20">
            <button
              onClick={nextBanner}
              className="bg-black/30 text-white p-2 hover:bg-black/50 transition-all"
              aria-label="Siguiente"
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </>
      )}

      {/* Contenido del banner */}
      <div className="container-custom text-white text-center md:text-left relative z-20 h-full flex items-center">
        <div className="max-w-lg">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
            {banner.titulo}
          </h1>
          <p className="text-lg mb-8">{banner.subtitulo}</p>

          <div className="flex flex-col md:flex-row max-w-lg md:max-w-xl mx-auto md:mx-0">
            <Button
              className="bg-primary text-white font-bold rounded-lg text-lg md:text-xl px-6 py-4 hover:bg-secondary"
              asChild
            >
            </Button>
          </div>
        </div>
      </div>

      {/* Indicadores de posición */}
      {banners.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentBanner(index)}
              className={`h-2 w-8 rounded-full transition ${
                index === currentBanner ? 'bg-white' : 'bg-white/50'
              }`}
              aria-label={`Ir al banner ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default SeccionPrincipal;
