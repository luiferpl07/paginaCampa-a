import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

// Datos más estructurados y completos
const propuestas = [
  {
    id: 'protegiendo-a-los-mayores',
    title: 'Protegiendo a los Mayores',
    description: 'Implementando programas y servicios que garanticen el bienestar, la dignidad y la seguridad de nuestros adultos mayores en todas las comunidades.',
    image: 'https://ext.same-assets.com/77511177/2240474230.jpeg',
    color: 'bg-blue',
  },
  {
    id: 'protegiendo-el-medio-ambiente',
    title: 'Protegiendo el Medio Ambiente',
    description: 'Desarrollando iniciativas sostenibles que preserven nuestros recursos naturales y promuevan prácticas amigables con el entorno para las futuras generaciones.',
    image: 'https://ext.same-assets.com/77511177/1529725074.jpeg',
    color: 'bg-green-600',
  },
  {
    id: 'creando-empleos',
    title: 'Creando Empleos',
    description: 'Impulsando políticas que fomenten la generación de empleo digno y oportunidades de crecimiento económico para todos los sectores de nuestra población.',
    image: 'https://ext.same-assets.com/77511177/616072021.jpeg',
    color: 'bg-primary',
  },
  {
    id: 'creciendo-nuestra-economia',
    title: 'Creciendo Nuestra Economía',
    description: 'Promoviendo inversiones estratégicas y fortaleciendo el ecosistema empresarial local para un desarrollo económico sostenible e inclusivo.',
    image: 'https://ext.same-assets.com/77511177/2446538560.jpeg',
    color: 'bg-red',
  },
];

// Variantes de animación para el contenedor
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2 // Cada tarjeta aparece con un delay de 0.2s
    }
  }
};

// Variantes de animación para cada tarjeta
const cardVariants = {
  hidden: { 
    y: 50, 
    opacity: 0,
    scale: 0.95
  },
  visible: { 
    y: 0, 
    opacity: 1,
    scale: 1,
    transition: { 
      duration: 0.5,
      ease: "easeOut"
    }
  }
};

// Variantes para el título principal
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

// Variantes para el texto descriptivo
const descriptionVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      delay: 0.3,
      duration: 0.8
    }
  }
};

const SeccionPropuestas = () => {
  return (
    <section className="section-padding bg-gray-50 overflow-hidden">
      <div className="container-custom">
        <motion.div 
          className="text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          <motion.h2 
            className="section-title text-center mb-6"
            variants={titleVariants}
          >
            Las prioridades de Hector Olimpo
          </motion.h2>
          
          <motion.p 
            className="text-center max-w-3xl mx-auto text-gray-600"
            variants={descriptionVariants}
          >
            Conoce las iniciativas que estamos impulsando para transformar nuestra comunidad y construir juntos un futuro mejor para todos.
          </motion.p>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {propuestas.map((propuesta) => (
            <motion.div 
              key={propuesta.id} 
              className="issue-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
              variants={cardVariants}
              whileHover={{ 
                y: -10, 
                scale: 1.02, 
                transition: { duration: 0.3 } 
              }}
            >
              <div className="relative">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="relative">
                    <Image
                      src={propuesta.image}
                      alt={propuesta.title}
                      width={360}
                      height={260}
                      className="issue-card-image w-full h-48 object-cover"
                    />
                    
                  </div>
                </motion.div>
              </div>
              <div className="issue-card-content p-5">
                <h3 className="issue-card-title text-xl font-bold mb-2">
                  <Link href={`/issues/${propuesta.id}`} className="hover:text-primary transition-colors">
                    {propuesta.title}
                  </Link>
                </h3>
                <p className="issue-card-text text-gray-600 mb-4">{propuesta.description}</p>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                  className="flex justify-between items-center"
                >
                  <Link href={`/issues/${propuesta.id}`} className="read-more-link text-primary font-medium inline-flex items-center group">
                    <span className="group-hover:mr-1 transition-all">Leer más</span> 
                    <ArrowRight className="h-4 w-4 ml-1 inline group-hover:ml-2 transition-all" />
                  </Link>
                  <div className="w-2 h-2 rounded-full bg-primary"></div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        <motion.div 
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          viewport={{ once: false, amount: 0.1 }}
        >
          <Link href="/propuestas" className="btn-primary hover:bg-secondary rounded-xl inline-block">
            Ver todas las prioridades
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default SeccionPropuestas;