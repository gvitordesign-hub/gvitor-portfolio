import React from 'react';
import { motion } from 'framer-motion';
import { Play, Image as ImageIcon, ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 px-6 overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(171,32,255,0.08)_0%,rgba(0,0,0,0)_70%)]">
      {/* Luzes Neon Abstratas de Fundo */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electricCyan/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magneticViolet/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-500" />
      
      <div className="max-w-5xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-semibold mb-6 text-gray-300 uppercase tracking-widest text-[11px]"
        >
          <span className="w-2 h-2 rounded-full bg-electricCyan animate-ping" />
          Creative Direction & Motion para Showbusiness
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-title text-5xl md:text-8xl font-extrabold tracking-tight leading-none mb-8"
        >
          Visuais que lotam <span className="bg-gradient-to-r from-electricCyan to-magneticViolet bg-clip-text text-transparent">Arenas</span>,<br />
          Design que domina <span className="relative inline-block text-white">
            Playlists
            <span className="absolute bottom-1 left-0 w-full h-2 bg-magneticViolet/40 -z-10" />
          </span>.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-gray-400 text-base md:text-lg max-w-3xl mx-auto mb-10 font-normal leading-relaxed"
        >
          Traduzo a batida, o palco e o som em motion designs 3D surreais, line-ups de festivais magnéticos e trailers promocionais de turnês feitos para gerar desejo imediato, prender a atenção e esgotar ingressos.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#portfolio"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-electricCyan to-magneticViolet hover:from-electricCyan/90 hover:to-magneticViolet/90 text-black font-extrabold rounded-full flex items-center justify-center gap-2 shadow-neonGlow hover:scale-105 transition-all duration-300"
          >
            <Play className="w-5 h-5 fill-black" /> Ver os Visuais
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 bg-[#121212] border border-white/10 hover:border-white/20 text-white font-bold rounded-full flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300"
          >
            <ImageIcon className="w-5 h-5" /> Impactar meu Lançamento
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 animate-bounce">
        <span className="text-xs tracking-widest text-gray-400 font-bold uppercase">Role para baixo</span>
        <ArrowDown className="w-4 h-4 text-electricCyan" />
      </div>
    </section>
  );
};
