import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { FaFacebook, FaInstagram, FaYoutube, FaTiktok } from 'react-icons/fa';
import { FaWhatsapp, FaX } from 'react-icons/fa6';

const quickLinks = [
  { name: 'Get Involved', href: '/get-involved' },
  { name: 'Issues', href: '/issues' },
  { name: 'Meet Adam', href: '/meet-adam' },
  { name: 'Meet Linda', href: '/meet-linda' },
  { name: 'Our Party', href: '/our-party' },
];

const otherLinks = [
  { name: 'Cart', href: '/shop/cart' },
  { name: 'Endorsements', href: '/endorsements' },
  { name: 'Flickr Gallery', href: '/media/flickr-gallery' },
  { name: 'Header 1', href: '/header-1' },
  { name: 'News With Sidebar', href: '/news' },
];

const Footer = () => {
  return (
    <footer className="footer-bg text-white">
      <div className="footer-content">
        {/* Newsletter Signup */}
        <div className="bg-secondary py-8">
          <div className="container-custom">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <div className="text-xl font-bold">ÚNETE A NUESTRO EQUIPO</div>
              <div className="flex-1 max-w-md">
                <div className="flex">
                  <Input
                    type="email"
                    placeholder="Correo Electronico"
                    className="rounded-none border-r-1 "
                  />
                  
                  <Button className="bg-primary hover:bg-secondary/90 rounded-none px-5">
                  INSCRIBIRSE
                  </Button>
                </div>
              </div>
             
            </div>
          </div>
        </div>

        {/* Main Footer */}
        <div className="py-12">
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Logo and Info */}
              <div>
                <Link href="/" className="inline-block mb-4">
                  <Image
                    src=""
                    alt="Hector Olimpo"
                    width={180}
                    height={60}
                    className="h-16 w-auto"
                  />
                </Link>
                <div className="text-gray-300 mb-4">
                  <p>Héctor Olimpo Espinosa</p>
                  <p>Sincelejo, Sucre</p>
                </div>
                <div className="text-gray-300">
                  <p>Telefono: (xxx) xxx-xxxx</p>
                  <p>Correo electronico: info@hectorolimpo.com</p>
                </div>
                <Link href="/privacy-policy" className="text-primary hover:underline text-sm mt-4 inline-block">
                  Política de privacidad
                </Link>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-lg font-bold mb-4 uppercase">Enlaces rápidos</h4>
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <ul className="space-y-2">
                      {otherLinks.map((link) => (
                        <li key={link.name}>
                          <Link href={link.href} className="text-gray-300 hover:text-primary text-sm">
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <ul className="space-y-2">
                      {quickLinks.map((link) => (
                        <li key={link.name}>
                          <Link href={link.href} className="text-gray-300 hover:text-primary text-sm">
                            {link.name}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/*redes sociales */}
              <div>
                <h4 className="text-lg font-bold mb-4 uppercase">Conéctate con Hector Olimpo</h4>
                <div className="flex space-x-2">
                  <Link href="https://facebook.com/your-page" className="bg-secondary/50 hover:bg-blue-600/20 p-2 rounded-full" target='_bank'>
                    <FaFacebook className="h-5 w-5 text-blue-600" />
                  </Link>
                  <Link href="https://x.com/your-handle" className="bg-secondary/50 hover:bg-black/20 p-2 rounded-full" target='_bank'>
                    <FaX className="h-5 w-5 text-black" />
                  </Link>
                  <Link href="https://instagram.com/your-profile" className="bg-secondary/50 hover:bg-pink-600/20 p-2 rounded-full" target='_bank'>
                    <FaInstagram className="h-5 w-5 text-pink-600" />
                  </Link>
                  <Link href="https://youtube.com/your-channel" className="bg-secondary/50 hover:bg-red-600/20 p-2 rounded-full" target='_bank'>
                    <FaYoutube className="h-5 w-5 text-red-600" />
                  </Link>
                  <Link href="https://tiktok.com/@your-account" className="bg-secondary/50 hover:bg-black/20 p-2 rounded-full" target='_bank'>
                    <FaTiktok className="h-5 w-5 text-black" />
                  </Link>
                  <Link href="https://wa.me/your-number" className="bg-secondary/50 hover:bg-green-500/20 p-2 rounded-full" target='_bank'>
                    <FaWhatsapp className="h-5 w-5 text-green-500" />
                  </Link>
              </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="py-4 border-t border-gray-800">
          <div className="container-custom">
            <p className="text-gray-400 text-sm">
              Copyright © 2025 Hector Olimpo. Todos los derechos reservados.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
