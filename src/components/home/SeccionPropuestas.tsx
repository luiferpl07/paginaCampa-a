import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const propuestas = [
  {
    id: 'protegiendo-a-los-mayores',
    title: 'Protegiendo a los Mayores',
    description: 'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Donec rutrum congue leo eget malesuada. Curabitur',
    image: 'https://ext.same-assets.com/77511177/2240474230.jpeg',
  },
  {
    id: 'protegiendo',
    title: 'Protegiendo ',
    description: 'Praesent sapien massa, convallis a pellentesque nec, egestas non nisi. Proin eget tortor risus. Quisque velit nisi, pretium',
    image: 'https://ext.same-assets.com/77511177/1529725074.jpeg',
  },
  {
    id: 'creando-empleos',
    title: 'Creando Empleos',
    description: 'Curabitur arcu erat, accumsan id imperdiet et, porttitor at sem. Curabitur aliquet quam id dui posuere blandit. Quisque velit',
    image: 'https://ext.same-assets.com/77511177/616072021.jpeg',
  },
  {
    id: 'creciendo-nuestra-economia',
    title: 'Creciendo Nuestra Economía',
    description: 'Cras ultricies ligula sed magna dictum porta. Curabitur non nulla sit amet nisl tempus convallis quis ac lectus. Lorem ipsum',
    image: 'https://ext.same-assets.com/77511177/2446538560.jpeg',
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
        <motion.h2 
          className="section-title text-center mb-12"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={titleVariants}
        >
          Las prioridades de Hector Olimpo
        </motion.h2>
        
        <motion.p 
          className="text-center max-w-3xl mx-auto mb-12 text-gray-600"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
          variants={descriptionVariants}
        >
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. In quia laudantium exercitationem libero porro animi saepe soluta eius minima, inventore odit, maxime impedit placeat illo repudiandae. Ipsum inventore quaerat veritatis?
        </motion.p>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
        >
          {propuestas.map((propuesta) => (
            <motion.div 
              key={propuesta.id} 
              className="issue-card bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
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
                  <Image
                    src={propuesta.image}
                    alt={propuesta.title}
                    width={360}
                    height={260}
                    className="issue-card-image w-full h-48 object-cover"
                  />
                </motion.div>
              </div>
              <div className="issue-card-content p-5">
                <h3 className="issue-card-title text-xl font-bold mb-2">
                  <Link href={`/issues/${propuesta.id}`}>
                    {propuesta.title}
                  </Link>
                </h3>
                <p className="issue-card-text text-gray-600 mb-4">{propuesta.description}</p>
                <motion.div
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <Link href={`/issues/${propuesta.id}`} className="read-more-link text-primary font-medium inline-flex items-center">
                    Leer más <ArrowRight className="h-4 w-4 ml-1 inline" />
                  </Link>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SeccionPropuestas;