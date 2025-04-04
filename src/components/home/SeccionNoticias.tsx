import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Instagram } from 'lucide-react';


const SeccionNoticias = () => {
  return (
    <section className="section-padding bg-white">
      <div className="container-custom">
        <h2 className="section-title text-center mb-12">Noticias y actualizaciones</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Latest News */}
          <div className="md:col-span-1 bg-gray-100">
            <div className="relative h-60">
              <Image
                src="https://ext.same-assets.com/77511177/1863026383.jpeg"
                alt="Últimas noticias"
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6">
              <h4 className="text-lg font-bold mb-2 text-secondary">ÚLTIMAS NOTICIAS</h4>
              <h3 className="text-xl font-bold mb-3">Fusce euismod consequat ante</h3>
              <Link href="/news/fusce-euismod-consequat-ante" className="read-more-link inline-flex items-center">
                Leer más <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>

          {/* Instagram Feed */}
          <div className="md:col-span-1 bg-gray-100">
            <div className="p-6">
              <div className="flex space-x-2">
                  <Link href="#" className="bg-secondary/50 hover:bg-primary p-2 rounded-full">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </div>
              <div className="grid grid-cols-2 gap-2">
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2MeFpK5qSkr3kwcNAUWYCI_kRxEL_EMyV3A&s"
                  alt="Instagram Post 1"
                  width={150}
                  height={150}
                  className="object-cover"
                />
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSupuZ-cvq63rgKKjQsv5qyjATvfZks9wcB0g&s"
                  alt="Instagram Post 2"
                  width={150}
                  height={150}
                  className="object-cover"
                />
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHf599fkOsb_RqCdP049LRxBHPX1SBAJc2GA&s"
                  alt="Instagram Post 3"
                  width={150}
                  height={150}
                  className="object-cover"
                />
                <Image
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQiX1wHf2Mny7DvHqT2LWtKGBon9ekwM57Jkg&s"
                  alt="Instagram Post 4"
                  width={150}
                  height={150}
                  className="object-cover"
                />
              </div>
              <Link href="https://www.instagram.com/hectorolimpo/" className="read-more-link mt-4 inline-flex items-center" target="_blank">
                Sigue a Hector Olimpo en Instagram
              </Link>
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="md:col-span-1 bg-primary text-white">
            <div className="p-6">
              <h4 className="text-lg font-bold mb-6">PRÓXIMOS EVENTOS</h4>

              <div className="mb-6">
                <div className="flex items-start mb-2">
                  <div className="bg-white text-primary p-2 mr-4 text-center min-w-12">
                    <div className="text-xl font-bold">29</div>
                    <div className="text-sm">Apr</div>
                  </div>
                  <div>
                    <h5 className="font-bold">Teatro Municipal</h5>
                    <p className="text-xs text-gray-200">Sincelejo, SUCRE • 10:00 - 17:00</p>
                  </div>
                </div>
              </div>

              <div className="mb-6">
                <div className="flex items-start mb-2">
                  <div className="bg-white text-primary p-2 mr-4 text-center min-w-12">
                    <div className="text-xl font-bold">21</div>
                    <div className="text-sm">May</div>
                  </div>
                  <div>
                    <h5 className="font-bold">Plaza Majagual</h5>
                    <p className="text-xs text-gray-200">Sincelejo, SUCRE • 11:00 - 13:00</p>
                  </div>
                </div>
              </div>

              <Link href="/events" className="text-white underline mt-4 inline-flex items-center">
                Más Eventos <ArrowRight className="h-4 w-4 ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SeccionNoticias;
