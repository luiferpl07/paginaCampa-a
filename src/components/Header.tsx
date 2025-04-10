"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Sheet, SheetTrigger, SheetContent } from './ui/sheet';
import { Menu } from 'lucide-react';
import { usePathname } from 'next/navigation';

const navegacion = [
  {
    name: 'Inicio',
    href: '/',
  },
  {
    name: 'Conoceme',
    href: '/',
    dropdown: [
      { name: 'Acerca de', href: '/' },
      { name: 'Contactos', href: '/' },
      { name: 'Mi Trayectoria', href: '/' },
    ]
  },
  {
    name: 'Eventos',
    href: '/eventos',
    dropdown: [
      { name: 'Próximos Eventos', href: '/eventos' }
     // { name: 'Próximos Eventos', href: '/proximos' },
      //{ name: 'Eventos Pasados', href: '/pasados' },
      //{ name: 'Calendario', href: '/calendario' },
      //{ name: 'Galería de Eventos', href: '/galeria' },
    ]
  },
  {
    name: 'Blog',
    href: '/blog',
    dropdown: [
      { name: 'Podcasts', href: '/podcast' },
      { name: 'Videos', href: '/videos' },
      { name: 'Libros', href: '/libros' },
      { name: 'Revistas', href: '/revistas' },
      { name: 'Documentos', href: '/documentos' },
    ]
  },
  {
    name: 'Noticias',
    href: '/noticias',
    dropdown: [
      { name: 'Todas las Noticias', href: '/noticias' },
      ]
  },
];

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      // Solo aplicar lógica de transparencia en la página de inicio
      if (!isHomePage) {
        setScrolled(true); // En otras páginas, siempre con fondo
        return;
      }

      // Get the hero section height to determine when to change header
      const heroSection = document.querySelector('.hero-section');
      if (!heroSection) {
        setScrolled(true);
        return;
      }
      
      const heroHeight = heroSection.getBoundingClientRect().height;
      
      // Check if we've scrolled past the hero section
      const isScrolled = window.scrollY > heroHeight - 100; // Subtract header height for a smooth transition
      
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);
    
    // Check initial scroll position
    handleScroll();

    // Clean up event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled, isHomePage]);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        !isHomePage || scrolled 
          ? 'bg-[--secondary] py-2 shadow-md' 
          : 'bg-transparent py-4'  
      }`}
    >
      <div className="container-custom">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="relative z-10">
            <div className="flex items-center">
              <Image
                src="/logo1.svg"
                alt="Logo"
                width={150}
                height={60}
                className={`transition-all duration-300 ${
                  !isHomePage || scrolled ? 'h-12 md:h-14 py-1' : 'h-16 md:h-18 py-2'
                } w-auto`}
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-4">
            <nav className="flex space-x-1">
              {navegacion.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={`nav-link px-3 inline-block text-sm font-bold uppercase transition-all duration-300 ${
                      !isHomePage || scrolled ? 'py-5' : 'py-6'
                    }`}
                  >
                    {item.name}
                  </Link>
                  {item.dropdown && (
                    <div className="absolute left-0 mt-0 w-56 rounded-b-md bg-white shadow-lg transform opacity-0 group-hover:opacity-100 invisible group-hover:visible transition-all duration-300 z-20">
                      <div className="px-2 py-2 space-y-1">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-primary"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>
          </div>

          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="lg:hidden p-2 text-white">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-secondary text-white">
              <nav className="flex flex-col space-y-4 mt-8">
                {navegacion.map((item) => (
                  <div key={item.name} className="flex flex-col">
                    <Link
                      href={item.href}
                      className="text-white hover:text-primary py-2 text-base font-medium"
                    >
                      {item.name}
                    </Link>
                    {item.dropdown && (
                      <div className="pl-4 mt-2 space-y-2">
                        {item.dropdown.map((subItem) => (
                          <Link
                            key={subItem.name}
                            href={subItem.href}
                            className="block py-1 text-sm text-gray-300 hover:text-primary"
                          >
                            {subItem.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;