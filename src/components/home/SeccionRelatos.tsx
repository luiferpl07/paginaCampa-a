import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const testimonios = [
  {
    id: 1,
    nombre: 'María González',
    ocupacion: 'Maestra de escuela',
    testimonio: 'Hector siempre ha demostrado un compromiso sincero con la educación. Gracias a su apoyo, nuestra escuela ahora cuenta con mejores instalaciones y recursos para nuestros estudiantes.',
    imagen: '/api/placeholder/80/80',
  },
  {
    id: 2,
    nombre: 'Carlos Ramírez',
    ocupacion: 'Agricultor',
    testimonio: 'Cuando las inundaciones afectaron nuestros cultivos, Hector fue el primero en llegar y ofrecer soluciones concretas. No solo habla, actúa. Eso es lo que necesitamos en nuestros líderes.',
    imagen: '/api/placeholder/80/80',
  },
  {
    id: 3,
    nombre: 'Luisa Martínez',
    ocupacion: 'Emprendedora local',
    testimonio: 'Mi pequeño negocio pudo crecer gracias a los programas de apoyo que Hector implementó. Es alguien que realmente entiende las necesidades de los emprendedores y microempresas.',
    imagen: '/api/placeholder/80/80',
  },
  {
    id: 4,
    nombre: 'Jorge Mendoza',
    ocupacion: 'Líder comunitario',
    testimonio: 'He visto cómo Hector trabaja incansablemente por mejorar las condiciones de vida en las comunidades más vulnerables. Su compromiso con la justicia social es genuino.',
    imagen: '/api/placeholder/80/80',
  },
  {
    id: 5,
    nombre: 'Ana Valencia',
    ocupacion: 'Médica rural',
    testimonio: 'Gracias al apoyo de Hector, ahora contamos con equipamiento médico que antes era impensable. Ha transformado la atención sanitaria en nuestra comunidad.',
    imagen: '/api/placeholder/80/80',
  }
];

// Variantes de animación para el slider
const sliderVariants = {
  enter: (direction) => ({
    x: direction > 0 ? 500 : -500,
    opacity: 0
  }),
  center: {
    x: 0,
    opacity: 1
  },
  exit: (direction) => ({
    x: direction < 0 ? 500 : -500,
    opacity: 0
  })
};

// Variantes para el contenedor
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.3
    }
  }
};

// Variantes para el título
const titleVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      duration: 0.6,
      ease: "easeOut" 
    }
  }
};

const SeccionRelatos = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Función para avanzar al siguiente testimonio
  const nextTestimonio = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonios.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Función para retroceder al testimonio anterior
  const prevTestimonio = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonios.length - 1 : prevIndex - 1
    );
  };

  // Auto rotación del carrusel
  useEffect(() => {
    let interval;
    
    if (!isPaused) {
      interval = setInterval(() => {
        nextTestimonio();
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <section className="section-padding bg-white py-16 overflow-hidden">
      <div className="container-custom">
        <motion.div
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={containerVariants}
        >
          <motion.h2 
            className="section-title text-3xl text-secondary mb-4"
            variants={titleVariants}
          >
            La Voz de Nuestra Gente
          </motion.h2>
          
          <motion.p 
            className="text-muted-foreground max-w-3xl mx-auto"
            variants={titleVariants}
          >
            Testimonios reales de personas cuyas vidas han sido impactadas por el trabajo y dedicación de Hector Olimpo
          </motion.p>
        </motion.div>

        <div 
          className="testimonial-slider-container relative bg-white rounded-xl shadow-lg p-6 md:p-10 mx-auto max-w-4xl border border-gray-200"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Decorative quote icon */}
          <div className="absolute top-6 left-6 text-gray-100">
            <Quote size={64} />
          </div>

          <div className="testimonial-slider relative overflow-hidden min-h-[320px] md:min-h-[250px]">
            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={sliderVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 }
                }}
                className="testimonial-slide absolute w-full"
              >
                <div className="flex flex-col md:flex-row gap-6 items-center">
                  <div className="testimonial-image shrink-0">
                    <div className="rounded-full border-4 border-primary overflow-hidden h-24 w-24 relative z-10">
                      <Image
                        src={testimonios[currentIndex].imagen}
                        alt={testimonios[currentIndex].nombre}
                        width={96}
                        height={96}
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="testimonial-content text-center md:text-left relative z-10">
                    <p className="testimonial-text text-lg italic mb-4 text-secondary">
                      "{testimonios[currentIndex].testimonio}"
                    </p>
                    <h4 className="testimonial-author font-bold text-xl text-secondary">
                      {testimonios[currentIndex].nombre}
                    </h4>
                    <p className="testimonial-role text-[#254494]">
                      {testimonios[currentIndex].ocupacion}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation buttons */}
          <div className="testimonial-controls flex justify-between absolute inset-x-0 top-1/2 -translate-y-1/2 px-2 md:px-4">
            <button 
              onClick={prevTestimonio} 
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors duration-200 text-secondary focus:outline-none border border-gray-200"
              aria-label="Testimonio anterior"
            >
              <ChevronLeft size={24} />
            </button>
            
            <button 
              onClick={nextTestimonio} 
              className="bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors duration-200 text-secondary focus:outline-none border border-gray-200"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Dots indicator */}
          <div className="testimonial-indicators flex justify-center gap-2 mt-6">
            {testimonios.map((_, index) => (
              <button
                key={index}
                onClick={() => {
                  setDirection(index > currentIndex ? 1 : -1);
                  setCurrentIndex(index);
                }}
                className={`h-3 w-3 rounded-full transition-colors duration-200 focus:outline-none ${
                  index === currentIndex ? 'bg-primary' : 'bg-gray-300 hover:bg-primary/50'
                }`}
                aria-label={`Ir al testimonio ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeccionRelatos;