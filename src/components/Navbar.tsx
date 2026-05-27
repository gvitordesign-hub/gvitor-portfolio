import React from 'react';
import { Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0B0B0B]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <Sparkles className="w-6 h-6 text-electricCyan group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-title tracking-wider font-extrabold text-xl bg-gradient-to-r from-white via-gray-300 to-electricCyan bg-clip-text text-transparent">
            GVITOR <span className="text-electricCyan">DESIGN</span>
          </span>
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
