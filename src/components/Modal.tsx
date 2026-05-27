import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Briefcase, Award } from 'lucide-react';
import type { Project } from '../data/projects';
import { MediaViewer } from './MediaViewer';

interface ModalProps {
  project: Project;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Modal: React.FC<ModalProps> = ({ project, onClose, onNext, onPrev }) => {
  // Controle por teclado (ESC para fechar, setas para navegar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Bloquear scroll do body por baixo do modal aberto
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-lg"
      />

      {/* Conteúdo do Modal */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative bg-[#121212] border border-white/10 w-full max-w-6xl rounded-3xl overflow-hidden shadow-neonGlow z-10 flex flex-col md:flex-row max-h-[85vh] md:max-h-[90vh]"
      >
        {/* Botão Fechar Modal Flutuante */}
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-5 right-5 z-20 w-11 h-11 bg-black/60 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-electricCyan hover:text-black border border-white/10 hover:border-electricCyan hover:shadow-neonCyan transition-all duration-300 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lado Esquerdo: Portfólio de Mídia */}
        <div className="w-full md:w-3/5 bg-black/40 overflow-y-auto p-6 md:p-8 flex flex-col gap-6 scrollbar-thin">
          {project.media.map((item, index) => (
            <MediaViewer key={index} media={item} />
          ))}
        </div>

        {/* Lado Direito: Metadados do Briefing */}
        <div className="w-full md:w-2/5 p-6 md:p-10 border-t md:border-t-0 md:border-l border-white/5 flex flex-col justify-between overflow-y-auto bg-darkCard/50">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase text-electricCyan tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" /> {project.client}
              </span>
              <h2 className="font-title text-3xl font-extrabold mt-1 text-white tracking-tight leading-tight">
                {project.title}
              </h2>
              <span className="text-xs text-gray-500 font-medium block mt-1">Ano do Projeto: {project.year}</span>
            </div>

            <hr className="border-white/5" />

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> O DESAFIO (BRIEFING)
              </span>
              <p className="text-gray-400 text-sm leading-relaxed">{project.challenge}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-magneticViolet" /> A SOLUÇÃO CREATIVE
              </span>
              <p className="text-gray-400 text-sm leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Navegação Entre Projetos no Modal */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
            <button
              onClick={onPrev}
              className="flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-electricCyan transition-colors cursor-pointer group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Projeto Anterior
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-electricCyan transition-colors cursor-pointer group"
            >
              Próximo Projeto <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
