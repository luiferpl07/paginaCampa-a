import React from 'react';
import Link from 'next/link';
import { ClipboardCheck, Calendar, MessageSquare, DollarSign } from 'lucide-react';

const participacion = [
  {
    id: 'attend-events',
    title: 'Asistir a eventos',
    description: 'Encuentra eventos cerca de ti',
    icon: <Calendar className="h-10 w-10" />,
    link: '/events',
    color: '#182b50',
  },
];

const SeccionParticipacion = () => {
  return (
    <div className="bg-white py-8">
      <div className="container mx-auto">
        {/* Contenedor flex para centrar la grilla */}
        <div className="flex justify-center">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeccionParticipacion;
