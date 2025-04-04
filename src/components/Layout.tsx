import React from 'react';
import Header from './Header';
import Footer from './Footer';

interface LayoutProps {
  children: React.ReactNode;
  hasHero?: boolean;
}

const Layout = ({ children, hasHero = false }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className={`flex-grow ${!hasHero ? 'pt-header' : ''}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;