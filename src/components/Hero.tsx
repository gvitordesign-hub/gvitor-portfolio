import React from 'react';
import { motion } from 'framer-motion';
import { Play, Image as ImageIcon, ArrowDown } from 'lucide-react';
import { projectsData } from '../data/projects';

export const Hero: React.FC = () => {
  // Filtrar projetos que possuem capas de imagem estática para garantir performance excepcional
  const carouselProjects = projectsData.filter(
    (project) => !project.heroImage.endsWith('.mp4')
  );

  // Criar 3 sequências com ordenações variadas de capas para um efeito assíncrono hiper-realista
  const col1 = [...carouselProjects];
  const col2 = [
    carouselProjects[2],
    carouselProjects[3],
    carouselProjects[4],
    carouselProjects[5],
    carouselProjects[0],
    carouselProjects[1],
  ];
  const col3 = [
    carouselProjects[4],
    carouselProjects[5],
    carouselProjects[0],
    carouselProjects[1],
    carouselProjects[2],
    carouselProjects[3],
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center pt-28 pb-32 px-6 overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(171,32,255,0.08)_0%,rgba(0,0,0,0)_70%)]">
      {/* Luzes Neon Abstratas de Fundo */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electricCyan/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magneticViolet/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-500" />
      
      {/* Carrossel Vertical 3D Inclinado no Plano de Fundo (Camada Z-0 - Efeito Showbusiness Premium) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden mask-marquee-vertical-fade select-none pointer-events-auto z-0 opacity-20 hover:opacity-40 transition-opacity duration-700 perspective-hero">
        <div className="tilted-hero-grid pause-hover flex justify-center gap-6 md:gap-8 px-4 w-full h-[150%] absolute -bottom-[30%] left-0">
          
          {/* Coluna 1: Lenta (Esquerda) */}
          <div className="flex flex-col w-48 sm:w-56 md:w-68 flex-shrink-0">
            <div className="animate-marquee-up-slow flex flex-col gap-6 md:gap-8 pb-6 md:pb-8">
              {[...col1, ...col1].map((project, idx) => (
                <div
                  key={`c1-${project.id}-${idx}`}
                  className="w-full aspect-square rounded-2xl overflow-hidden border border-white/5 bg-[#121212]/40 relative shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:border-white/20 hover:shadow-neonGlow group"
                >
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale brightness-[0.75] contrast-[1.2] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

          {/* Coluna 2: Rápida (Centro) */}
          <div className="flex flex-col w-48 sm:w-56 md:w-68 flex-shrink-0">
            <div className="animate-marquee-up-fast flex flex-col gap-6 md:gap-8 pb-6 md:pb-8">
              {[...col2, ...col2].map((project, idx) => (
                <div
                  key={`c2-${project.id}-${idx}`}
                  className="w-full aspect-square rounded-2xl overflow-hidden border border-white/5 bg-[#121212]/40 relative shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:border-white/20 hover:shadow-neonGlow group"
                >
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale brightness-[0.75] contrast-[1.2] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

          {/* Coluna 3: Média (Direita) */}
          <div className="flex flex-col w-48 sm:w-56 md:w-68 flex-shrink-0">
            <div className="animate-marquee-up-medium flex flex-col gap-6 md:gap-8 pb-6 md:pb-8">
              {[...col3, ...col3].map((project, idx) => (
                <div
                  key={`c3-${project.id}-${idx}`}
                  className="w-full aspect-square rounded-2xl overflow-hidden border border-white/5 bg-[#121212]/40 relative shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:border-white/20 hover:shadow-neonGlow group"
                >
                  <img
                    src={project.heroImage}
                    alt={project.title}
                    className="w-full h-full object-cover grayscale brightness-[0.75] contrast-[1.2] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Conteúdo Textual em Primeiro Plano Soberano (Camada Z-10) */}
      <div className="max-w-5xl mx-auto text-center z-10 relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-semibold mb-6 text-gray-300 uppercase tracking-widest text-[10px] md:text-[11px]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-electricCyan animate-ping" />
          Creative Direction & Motion para Showbusiness
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-title text-3xl sm:text-4xl md:text-5xl lg:text-[54px] font-extrabold tracking-tight leading-tight mb-6"
        >
          Visuais que transformam <span className="bg-gradient-to-r from-electricCyan to-magneticViolet bg-clip-text text-transparent">telas em arenas</span>,<br />
          Design que converte cliques em <span className="relative inline-block text-white">
            sold out
            <span className="absolute bottom-1 left-0 w-full h-1.5 bg-magneticViolet/40 -z-10" />
          </span>.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-gray-400 text-sm sm:text-base md:text-lg max-w-3xl mx-auto mb-8 font-normal leading-relaxed px-4 sm:px-0"
        >
          Direção de arte e motion design sob medida para a elite do showbusiness e da música. Traduzo a energia do seu som em identidades estéticas imponentes, campanhas promocionais magnéticas e experiências de palco feitas para reter a atenção absoluta e dominar os charts.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 px-6 sm:px-0"
        >
          <a
            href="#contact"
            className="w-full sm:w-auto px-6 py-3.5 bg-gradient-to-r from-electricCyan to-magneticViolet hover:from-electricCyan/90 hover:to-magneticViolet/90 text-black font-extrabold rounded-full flex items-center justify-center gap-2 shadow-neonGlow hover:scale-105 transition-all duration-300 text-sm"
          >
            <Play className="w-4 h-4 fill-black" /> Solicitar Direção Criativa
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-6 py-3.5 bg-[#121212] border border-white/10 hover:border-white/20 text-white font-bold rounded-full flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300 text-sm"
          >
            <ImageIcon className="w-4 h-4" /> Agendar Alinhamento de Campanha
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 animate-bounce z-10">
        <span className="text-[10px] tracking-widest text-gray-400 font-bold uppercase">Role para baixo</span>
        <ArrowDown className="w-3.5 h-3.5 text-electricCyan" />
      </div>
    </section>
  );
};

