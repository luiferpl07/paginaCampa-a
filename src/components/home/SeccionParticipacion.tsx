import React from 'react';
import Link from 'next/link';
import { Calendar } from 'lucide-react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';

const participacion = [
  {
    id: 'eventos',
    title: 'Asistir a eventos',
    description: 'Encuentra eventos cerca de ti',
    icon: <Calendar className="h-10 w-10" />,
    link: '/eventos',
    color: '#182b50',
  },
];

const SeccionParticipacion = () => {
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto">
        <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6 w-full max-w-5xl">
            {/* Primer item: tarjeta de evento */}
            {participacion.map((item) => (
              <Link
                key={item.id}
                href={item.link}
                className="flex flex-col items-center justify-center p-10 text-center text-white rounded-lg"
                style={{ backgroundColor: item.color }}
              >
                <div className="mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold mb-1">{item.title}</h3>
                <p className="text-sm">{item.description}</p>
              </Link>
            ))}

            {/* Segundo item: formulario */}
            <div className="bg-gray-100 rounded-lg p-6 flex flex-col justify-center md:min-h-[220px]">
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center md:text-left">
                Suscríbete con tu correo
              </h3>
              <div className="flex flex-col md:flex-row items-center gap-2">
                <Input
                  type="email"
                  placeholder="Correo Electrónico"
                  className="bg-white text-black border border-gray-300 rounded-md text-lg md:text-xl px-6 py-4 w-full"
                />

                <Button className="bg-primary text-white font-bold rounded-md text-lg md:text-xl px-6 py-4 hover:bg-secondary">
                  INSCRIBIRSE
                </Button>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default SeccionParticipacion;
