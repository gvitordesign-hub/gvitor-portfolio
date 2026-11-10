import React, { useState } from 'react';
import logoImg from '../assets/logo.png';
import { Menu, X } from 'lucide-react';
import { whatsappLink } from '../config/contact';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fechar menu mobile com tecla Escape
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0B0B0B]/95 backdrop-blur-md border-b border-white/5 transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 sm:h-20 flex items-center justify-between">
        <a href="#" className="flex items-center group py-2" onClick={() => setMobileMenuOpen(false)}>
          <img 
            src={logoImg} 
            alt="GVITOR DESIGN" 
            className="h-7 sm:h-9 md:h-10 w-auto group-hover:opacity-90 transition-opacity duration-200" 
          />
        </a>
        
        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10 text-sm font-semibold tracking-wide">
          <a href="#portfolio" className="text-gray-400 hover:text-white transition-colors duration-200">
            Portfólio
          </a>
          <a href="#about" className="text-gray-400 hover:text-white transition-colors duration-200">
            Sobre
          </a>
          <a 
            href="#contact" 
            className="px-6 py-2.5 rounded-full bg-white text-black font-extrabold hover:bg-electricCyan transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:shadow-neonCyan hover:scale-[1.02] active:scale-[0.98]"
          >
            Fazer Orçamento
          </a>
        </div>

        {/* Mobile Right Controls: Botão Rápido + Hamburger */}
        <div className="flex md:hidden items-center gap-2">
          <a
            href={whatsappLink('Olá, gostaria de um orçamento')}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-full bg-electricCyan text-black text-xs font-extrabold"
          >
            Orçamento
          </a>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Alternar navegação móvel"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/5 text-white hover:text-electricCyan active:bg-white/10"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu Gaveta Mobile para 360px - 390px */}
      {mobileMenuOpen && (
        <div id="mobile-navigation" className="md:hidden bg-[#0e0e0e] border-b border-white/10 px-6 py-6 flex flex-col gap-4 text-base font-semibold animate-in slide-in-from-top-2 duration-200">
          <a 
            href="#portfolio" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 text-gray-300 hover:text-electricCyan border-b border-white/5"
          >
            Portfólio
          </a>
          <a 
            href="#about" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 text-gray-300 hover:text-electricCyan border-b border-white/5"
          >
            Sobre
          </a>
          <a 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className="py-2.5 text-gray-300 hover:text-electricCyan"
          >
            Contato
          </a>
        </div>
      )}
    </nav>
  );
};

