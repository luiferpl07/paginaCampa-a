import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Facebook, Twitter, Instagram } from 'lucide-react';

export default function AcercaDe() {
  return (
    <Layout>
      {/* Page Header */}
      <div className="bg-gray-200 py-12">
        <div className="container-custom">
          <h1 className="text-3xl md:text-4xl font-bold">Acerca de Hector Olimpo</h1>
          <div className="flex items-center mt-2 text-sm">
            <Link href="/" className="text-secondary hover:text-[--red]">Inicio</Link>
            <span className="mx-2 text-secondary">/</span>
            <span className="text-secondary">Acerca de Hector Olimpo</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Hector Olimpo</h2>

              <p className="mb-4 text-gray-700">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Architecto exercitationem sint modi eligendi blanditiis consectetur iusto tempora a magni voluptas? Laboriosam, provident atque sunt tempore quibusdam consequuntur rem minima nobis?
              </p>

              <p className="mb-6 text-gray-700">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Recusandae exercitationem voluptates distinctio saepe mollitia provident ea impedit! Sequi, nobis nostrum quidem dolore eligendi vel laudantium, facilis, iure praesentium nam eos.
              </p>

              {/* Testimonial */}

             {/* 
              <div className="bg-gray-50 border-l-4 border-primary p-6 mb-6">
                <blockquote className="italic text-gray-700 mb-2">
                  "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nostrum illo, exercitationem consequuntur mollitia voluptates blanditiis facere aspernatur est, officiis id error eum iure odit ipsa tempora, ea veritatis itaque beatae.."
                </blockquote>
                <div className="font-bold">Marta Healy</div>
                <div className="text-sm text-gray-600">Congresswoman</div>
              </div> */}

              <p className="mb-8 text-gray-700">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Tempore reprehenderit autem velit ad mollitia asperiores odit ullam incidunt consectetur quam eaque repellat, odio maxime illo amet. Iste non officia illo!
              </p>

              <h3 className="text-xl font-bold mb-4">PRIORIDADES</h3>

              <p className="mb-4 text-gray-700">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsa modi esse nisi fugit delectus rem eveniet! Ipsam provident quam aspernatur voluptates beatae et, atque ducimus quod delectus, quo aperiam eius.
              </p>

              <ul className="list-disc pl-6 mb-6 text-gray-700 space-y-2">
                <li>.</li>
                <li>.</li>
                <li>.</li>
                <li>.</li>
                <li>.</li>
              </ul>

              <p className="text-gray-700 mb-8">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Dignissimos, veritatis incidunt excepturi nostrum, adipisci placeat fugiat impedit illo perferendis quisquam sit molestiae. Error fuga est iste, doloremque voluptatum voluptate dicta.
              </p>

              {/* Share Links */}
              <div className="border-t border-gray-200 pt-6">
                <h4 className="text-sm font-bold text-gray-600 mb-3">COMPARTE ESTO:</h4>
                <div className="flex space-x-2">
                  <Link href="#" className="bg-blue-600 text-white p-2 rounded-sm">
                    <Facebook className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="bg-blue-400 text-white p-2 rounded-sm">
                    <Twitter className="w-5 h-5" />
                  </Link>
                  <Link href="#" className="bg-red-600 text-white p-2 rounded-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M7.63 22.63C5.07 22.13 2.92 20.5 1.65 18.12 0.38 15.73 0.06 12.97 0.77 10.37 1.47 7.76 3.15 5.51 5.44 4.07 7.73 2.63 10.47 2.1 13.13 2.58 15.78 3.06 18.17 4.52 19.83 6.68 21.49 8.83 22.37 11.53 22.28 14.33 22.19 17.12 21.13 19.77 19.33 21.83 17.53 23.89 15.08 25.17 12.38 25.53 10.84 25.73 9.27 25.63 7.76 25.23 6.25 24.83 4.82 24.13 3.57 23.17L3.13 22.83 3.53 22.72 3.93 22.62C5.13 22.32 6.42 22.36 7.63 22.63Z" />
                      <path d="M16.13 13.13L13.13 13.13 13.13 16.13 10.13 16.13 10.13 13.13 7.13 13.13 7.13 10.13 10.13 10.13 10.13 7.13 13.13 7.13 13.13 10.13 16.13 10.13Z" />
                    </svg>
                  </Link>
                  <Link href="#" className="bg-red-500 text-white p-2 rounded-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 0C5.37 0 0 5.37 0 12C0 17.13 3.19 21.71 7.69 23.21 7.59 22.26 7.5 20.85 7.72 19.81 7.91 18.87 9.09 13.81 9.09 13.81 9.09 13.81 8.72 13.07 8.72 11.97 8.72 10.22 9.69 8.87 10.88 8.87 11.91 8.87 12.41 9.66 12.41 10.59 12.41 11.63 11.75 13.16 11.41 14.56 11.13 15.75 12.03 16.72 13.22 16.72 15.38 16.72 17.03 14.47 17.03 11.22 17.03 8.38 14.97 6.44 12.03 6.44 8.66 6.44 6.75 8.85 6.75 11.63 6.75 12.63 7.09 13.53 7.53 14.06 7.63 14.19 7.66 14.31 7.63 14.44 7.56 14.75 7.38 15.53 7.34 15.66 7.31 15.84 7.19 15.88 7 15.78 5.44 15.16 4.53 13.16 4.53 11.59 4.53 7.78 7.28 4.38 12.31 4.38 16.38 4.38 19.53 7.28 19.53 11.22 19.53 15.28 16.94 18.47 13.5 18.47 12.27 18.47 11.09 17.81 10.69 17.06 10.69 17.06 10.09 19.38 9.94 19.88 9.66 20.84 8.91 22.13 8.41 22.88 9.53 23.25 10.72 23.44 11.97 23.44 18.59 23.44 24 18.06 24 12 24 5.38 18.63 0 12 0Z" />
                    </svg>
                  </Link>
                  <Link href="#" className="bg-gray-700 text-white p-2 rounded-sm">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2zm0 4.7l-8 5.334L4 8.7V6.297l8 5.333 8-5.333V8.7z" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

           
              <div className="bg-gray-100 p-6 mb-6"></div>
                
            

              {/* Calendar */}
              <div className="mt-8">
                <h3 className="font-bold text-lg mb-4">Abril 2025</h3>
                <div className="bg-white border border-gray-200">
                  <div className="grid grid-cols-7 text-center border-b border-gray-200">
                    <div className="py-2 font-bold text-sm text-gray-600">L</div>
                    <div className="py-2 font-bold text-sm text-gray-600">M</div>
                    <div className="py-2 font-bold text-sm text-gray-600">M</div>
                    <div className="py-2 font-bold text-sm text-gray-600">J</div>
                    <div className="py-2 font-bold text-sm text-gray-600">V</div>
                    <div className="py-2 font-bold text-sm text-gray-600">S</div>
                    <div className="py-2 font-bold text-sm text-gray-600">D</div>
                  </div>

                  <div className="grid grid-cols-7 text-center">
                    <div className="py-2 border-b border-r border-gray-200">1</div>
                    <div className="py-2 border-b border-r border-gray-200 bg-primary text-white">2</div>
                    <div className="py-2 border-b border-r border-gray-200">3</div>
                    <div className="py-2 border-b border-r border-gray-200">4</div>
                    <div className="py-2 border-b border-r border-gray-200">5</div>
                    <div className="py-2 border-b border-r border-gray-200">6</div>
                    <div className="py-2 border-b border-gray-200">7</div>
                  </div>

                  {/* More calendar rows */}
                  <div className="grid grid-cols-7 text-center">
                    <div className="py-2 border-b border-r border-gray-200">8</div>
                    <div className="py-2 border-b border-r border-gray-200">9</div>
                    <div className="py-2 border-b border-r border-gray-200">10</div>
                    <div className="py-2 border-b border-r border-gray-200">11</div>
                    <div className="py-2 border-b border-r border-gray-200">12</div>
                    <div className="py-2 border-b border-r border-gray-200">13</div>
                    <div className="py-2 border-b border-gray-200">14</div>
                  </div>

                  <div className="grid grid-cols-7 text-center">
                    <div className="py-2 border-b border-r border-gray-200">15</div>
                    <div className="py-2 border-b border-r border-gray-200">16</div>
                    <div className="py-2 border-b border-r border-gray-200">17</div>
                    <div className="py-2 border-b border-r border-gray-200">18</div>
                    <div className="py-2 border-b border-r border-gray-200">19</div>
                    <div className="py-2 border-b border-r border-gray-200">20</div>
                    <div className="py-2 border-b border-gray-200">21</div>
                  </div>

                  <div className="grid grid-cols-7 text-center">
                    <div className="py-2 border-b border-r border-gray-200">22</div>
                    <div className="py-2 border-b border-r border-gray-200">23</div>
                    <div className="py-2 border-b border-r border-gray-200">24</div>
                    <div className="py-2 border-b border-r border-gray-200">25</div>
                    <div className="py-2 border-b border-r border-gray-200">26</div>
                    <div className="py-2 border-b border-r border-gray-200">27</div>
                    <div className="py-2 border-b border-gray-200">28</div>
                  </div>

                  <div className="grid grid-cols-7 text-center">
                    <div className="py-2 border-r border-gray-200">29</div>
                    <div className="py-2 border-r border-gray-200">30</div>
                    <div className="py-2 border-r border-gray-200"></div>
                    <div className="py-2 border-r border-gray-200"></div>
                    <div className="py-2 border-r border-gray-200"></div>
                    <div className="py-2 border-r border-gray-200"></div>
                    <div className="py-2"></div>
                  </div>
                </div>
              </div>

              {/* Instagram Feed */}
              <div className="mt-8">
                <h3 className="font-bold text-lg mb-4">INSTAGRAM</h3>
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
          </div>
        </div>
    </Layout>
  );
}
