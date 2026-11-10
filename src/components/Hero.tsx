import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { MessageCircle, Image as ImageIcon } from 'lucide-react';
import { useProjects } from '../context/ProjectContext';
import type { Project } from '../data/projects';
import { OptimizedImg } from './OptimizedMedia';
import { whatsappLink } from '../config/contact';

const isStill = (p: Project) => !/\.(mp4|m4v|webm)$/i.test(p.heroImage);

/** Gira a lista para que cada coluna comece em um projeto diferente. */
const rotate = <T,>(list: T[], by: number): T[] => {
  if (list.length === 0) return list;
  const n = by % list.length;
  return [...list.slice(n), ...list.slice(0, n)];
};

const COLUMNS = [
  { speed: 'animate-marquee-up-slow', offset: 0 },
  { speed: 'animate-marquee-up-fast', offset: 2 },
  { speed: 'animate-marquee-up-medium', offset: 4 },
];

export const Hero: React.FC = () => {
  const { projects } = useProjects();

  // Apenas capas estáticas (performance). Usa os projetos reais, inclusive os do painel admin.
  const covers = useMemo(() => projects.filter(isStill), [projects]);

  return (
    <section className="relative min-h-[92vh] md:min-h-screen flex items-center justify-center pt-24 pb-20 px-4 sm:pt-28 sm:pb-32 sm:px-6 overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(171,32,255,0.08)_0%,rgba(0,0,0,0)_70%)]">
      {/* Luzes Neon Abstratas de Fundo */}
      <div className="absolute top-1/4 left-1/4 w-72 md:w-96 h-72 md:h-96 bg-electricCyan/5 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-72 md:w-96 h-72 md:h-96 bg-magneticViolet/5 rounded-full blur-[100px] md:blur-[120px] pointer-events-none" />

      {/* Carrossel vertical 3D inclinado (decorativo) */}
      {covers.length > 0 && (
        <div
          aria-hidden="true"
          className="absolute inset-0 w-full h-full overflow-hidden mask-marquee-vertical-fade select-none pointer-events-none sm:pointer-events-auto z-0 opacity-15 sm:opacity-20 hover:opacity-40 transition-opacity duration-700 perspective-hero"
        >
          <div className="tilted-hero-grid pause-hover flex justify-center gap-4 sm:gap-6 md:gap-8 px-2 sm:px-4 w-full h-[150%] absolute -bottom-[30%] left-0">
            {COLUMNS.map((col, colIdx) => {
              const items = rotate(covers, col.offset);
              return (
                <div key={colIdx} className="flex flex-col w-36 sm:w-56 md:w-68 flex-shrink-0">
                  <div className={`${col.speed} flex flex-col gap-4 sm:gap-6 md:gap-8 pb-6 md:pb-8`}>
                    {[...items, ...items].map((project, idx) => (
                      <div
                        key={`c${colIdx}-${project.id}-${idx}`}
                        className="w-full aspect-square rounded-2xl overflow-hidden border border-white/5 bg-[#121212]/40 relative shadow-2xl transition-all duration-500 hover:scale-[1.03] hover:border-white/20 hover:shadow-neonGlow group"
                      >
                        <OptimizedImg
                          src={project.heroImage}
                          width={600}
                          alt=""
                          loading="lazy"
                          className="w-full h-full object-cover grayscale brightness-[0.75] contrast-[1.2] group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-700"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-30 transition-opacity duration-500 pointer-events-none" />
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Conteúdo textual em primeiro plano */}
      <div className="max-w-4xl mx-auto text-center z-10 relative pt-4 sm:pt-12 px-2 sm:px-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] sm:text-xs font-semibold mb-6 sm:mb-8 text-gray-300 uppercase tracking-widest max-w-[95%]"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-electricCyan shadow-[0_0_8px_#00f0ff] shrink-0" />
          <span className="truncate">Direção Criativa & Motion</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-title text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight leading-[1.12] sm:leading-[1.08] mb-6 sm:mb-8 text-white"
        >
          Design de elite para <span className="text-electricCyan">artistas</span> e{' '}
          <span className="text-white underline decoration-white/20 underline-offset-4 sm:underline-offset-8">grandes eventos</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-gray-300 text-sm sm:text-lg md:text-xl max-w-2xl mx-auto mb-8 sm:mb-10 font-normal leading-relaxed px-1 sm:px-0"
        >
          Transformo a energia da música em identidades visuais de alta voltagem, campanhas promocionais magnéticas e experiências de palco feitas para dominar os charts.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3 sm:gap-4 max-w-md mx-auto w-full px-2 sm:px-0"
        >
          <a
            href={whatsappLink('Olá, gostaria de um orçamento para direção criativa')}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-electricCyan hover:bg-white text-black font-extrabold rounded-full flex items-center justify-center gap-2.5 shadow-[0_10px_30px_rgba(0,240,255,0.3)] hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 text-sm tracking-wide min-h-[48px]"
          >
            <MessageCircle className="w-4 h-4 shrink-0" aria-hidden="true" /> Fazer Orçamento no WhatsApp
          </a>
          <a
            href="#portfolio"
            className="w-full sm:w-auto px-6 sm:px-8 py-3.5 sm:py-4 bg-white/5 hover:bg-white/10 border border-white/15 hover:border-white/30 text-white font-bold rounded-full flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98] transition-all duration-300 text-sm tracking-wide min-h-[48px]"
          >
            <ImageIcon className="w-4 h-4 text-gray-400 shrink-0" aria-hidden="true" /> Explorar Trabalhos
          </a>
        </motion.div>
      </div>

      {/* Indicador de rolagem */}
      <a
        href="#portfolio"
        aria-label="Rolar para os trabalhos"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity z-10"
      >
        <span className="text-[10px] tracking-widest text-gray-400 font-bold uppercase">Role para ver os trabalhos</span>
        <div className="w-4 h-7 rounded-full border border-white/20 flex items-start justify-center p-1">
          <div className="w-1 h-1.5 rounded-full bg-electricCyan animate-pulse" />
        </div>
      </a>
    </section>
  );
};
