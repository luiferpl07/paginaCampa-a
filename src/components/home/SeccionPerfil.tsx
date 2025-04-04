import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion"; // Importa motion de framer-motion

const SeccionPerfil = () => {
  // Define las variantes de animación
  const variants = {
    hidden: { opacity: 0, y: 20 }, // Estado inicial
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }, // Estado visible
  };

  return (
    <div className="relative w-full min-h-[500px] flex items-center overflow-hidden">
      {/* Imagen de fondo con next/image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://politika.com.co/wp-content/uploads/2020/11/He%CC%81ctor-Olimpo-Espinosa-Oliver-Gobernador-de-Sucre-02.jpg"
          alt="Hector Olimpo"
          fill
          sizes="100vw"
          priority
          className="object-cover"
          style={{ objectPosition: '100% right', transform: 'translateX(25%) scale(0.9)' }} // Mueve la imagen más a la derecha
        />
      </div>

      {/* Overlay con degradado más extendido */}
      <div 
        className="absolute inset-0 z-10" 
        style={{ 
          background: 'linear-gradient(to right, #f6f3f1 20%, rgba(246, 243, 241, 0.9) 20%, rgba(246, 243, 241, 0.6) 50%, transparent 80%)' 
        }}
      />

      {/* Contenido */}
      <div className="container-custom relative z-20">
        <motion.div
          initial="hidden" // Estado inicial
          whileInView="visible" // Cambia a visible cuando está en vista
          variants={variants} // Aplica las variantes definidas
          viewport={{ once: false, amount: 0.3 }} // Configuración del viewport
          className="max-w-md py-16 md:py-24"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-secondary mb-6">
            Conoce a Hector Olimpo
          </h2>
          
          <p className="text-foreground mb-8">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam harum unde necessitatibus recusandae odit nihil quaerat earum blanditiis atque labore alias, ratione eaque laborum eos doloremque excepturi fuga natus corrupti?
          </p>
          
          <Link href="/meet-adam">
            <Button 
              className="group bg-secondary text-white font-bold px-8 py-3 rounded-md 
              transition-all duration-300 shadow-lg shadow-[var(--secondary)] 
              hover:bg-primary hover:text-white hover:scale-105 
              hover:shadow-[var(--primary)]"
            >
              LEER MÁS
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default SeccionPerfil;