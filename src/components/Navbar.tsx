import React from 'react';
import logoImg from '../assets/logo.png';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0B0B0B]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-center md:justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <img src={logoImg} alt="GVITOR DESIGN" className="h-8 md:h-10 w-auto group-hover:scale-105 transition-transform duration-300" />
        </a>
        
        <div className="hidden md:flex items-center gap-8 font-medium">
          <a href="#portfolio" className="text-gray-400 hover:text-electricCyan hover:text-glow-cyan transition-colors duration-200">Portfólio</a>
          <a href="#about" className="text-gray-400 hover:text-electricCyan hover:text-glow-cyan transition-colors duration-200">Diferenciais</a>
          <a href="#contact" className="px-5 py-2 rounded-full border border-electricCyan/30 hover:border-electricCyan text-white bg-electricCyan/5 hover:bg-electricCyan/15 shadow-neonCyan/0 hover:shadow-neonCyan transition-all duration-300 text-sm">
            Fazer Orçamento
          </a>
        </div>
      </div>
    </nav>
  );
};
