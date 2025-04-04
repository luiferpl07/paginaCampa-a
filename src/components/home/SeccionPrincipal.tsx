import React from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

const SeccionPrincipal = () => {
  return (
    <div
      className="hero-section"
      style={{ 
        backgroundImage: `url('https://img.lalr.co/cms/2021/02/12115543/H%C3%A9ctor-Olimpo-Espinosa-LR.jpg')`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        minHeight: '100vh',
        width: '100%',
        position: 'relative'
      }}
    >
      <div className="hero-overlay bg-black/40 absolute inset-0" />
      <div className="container-custom text-white text-center md:text-left relative z-10 h-full flex items-center">
        <div className="max-w-lg"> {/* Removed pt-24 */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
            Por un pais mejor <br />
            <span className="text-white">Arriba Colombia!</span>
          </h1>
          <p className="text-lg mb-8">Sea parte de nuestro equipo, regístrese para recibir actualizaciones.</p>

          <div className="flex flex-col md:flex-row max-w-lg md:max-w-xl mx-auto md:mx-0 ">
            <Input
              type="email"
              placeholder="Correo Electrónico"
              className="bg-white text-black border-0 rounded-none text-lg md:text-xl px-6 py-4 w-full md:w-[350px]"
            />  
            <Button className="bg-primary text-white font-bold rounded-none text-lg md:text-xl px-2 py-4 hover:bg-secondary">
              INSCRIBIRSE
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeccionPrincipal;