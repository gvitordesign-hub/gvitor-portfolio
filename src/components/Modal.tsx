import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Briefcase, Award, Lightbulb, MessageCircle } from 'lucide-react';
import type { Project } from '../data/projects';
import { MediaViewer } from './MediaViewer';
import { categoryLabel } from '../data/categories';
import { whatsappLink } from '../config/contact';

interface ModalProps {
  project: Project;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

const FOCUSABLE = 'a[href], button:not([disabled]), input, select, textarea, video[controls], [tabindex]:not([tabindex="-1"])';

export const Modal: React.FC<ModalProps> = ({ project, onClose, onNext, onPrev }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Mantém sempre os handlers mais recentes sem reinscrever listeners a cada render.
  const handlers = useRef({ onClose, onNext, onPrev });
  useEffect(() => {
    handlers.current = { onClose, onNext, onPrev };
  });

  // Teclado: ESC fecha, setas navegam, Tab fica preso dentro do modal.
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handlers.current.onClose();
      else if (e.key === 'ArrowRight') handlers.current.onNext();
      else if (e.key === 'ArrowLeft') handlers.current.onPrev();
      else if (e.key === 'Tab' && dialogRef.current) {
        const items = Array.from(dialogRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (el) => el.offsetParent !== null || el === document.activeElement,
        );
        // O botão fechar fica fora do painel (fixed), então entra na ordem manualmente.
        const all = closeRef.current ? [closeRef.current, ...items] : items;
        if (all.length === 0) return;
        const first = all[0];
        const last = all[all.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (active === first || !all.includes(active as HTMLElement))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !all.includes(active as HTMLElement))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Foco: entra no modal ao abrir e volta ao elemento de origem ao fechar. Também trava o scroll do body.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, []);

  // Ao trocar de projeto, volta ao topo do conteúdo.
  useEffect(() => {
    dialogRef.current?.scrollTo?.({ top: 0 });
  }, [project.id]);

  const titleId = `modal-title-${project.id}`;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center px-4 py-8 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        aria-hidden="true"
        className="fixed inset-0 bg-black/90 backdrop-blur-lg"
      />

      <motion.button
        ref={closeRef}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.8 }}
        transition={{ delay: 0.1 }}
        onClick={onClose}
        aria-label="Fechar modal"
        className="fixed top-4 right-4 sm:top-6 sm:right-6 z-[80] w-12 h-12 bg-black/60 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-electricCyan hover:text-black border border-white/10 hover:border-electricCyan hover:shadow-neonCyan transition-all duration-300 cursor-pointer active:scale-95 shadow-lg"
      >
        <X className="w-6 h-6" aria-hidden="true" />
      </motion.button>

      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative bg-[#101010] border border-white/15 w-full max-w-6xl rounded-md overflow-y-auto md:overflow-hidden shadow-[0_40px_120px_rgba(0,0,0,0.85)] z-10 flex flex-col md:flex-row max-h-[85vh] md:max-h-[90vh]"
      >
        {/* Mídia */}
        <div className="w-full md:w-3/5 bg-black/40 md:overflow-y-auto p-6 md:p-8 flex flex-col gap-6 scrollbar-thin">
          {project.media.map((item, index) => (
            <MediaViewer key={`${project.id}-${index}`} media={item} />
          ))}
        </div>

        {/* Briefing */}
        <div className="w-full md:w-2/5 p-6 md:p-10 border-t md:border-t-0 md:border-l border-white/5 flex flex-col justify-between md:overflow-y-auto bg-darkCard/50">
          <div className="space-y-6">
            <div>
              <span className="mono-label text-electricCyan flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" aria-hidden="true" /> {project.client}
              </span>
              <h2 id={titleId} className="font-title text-3xl md:text-4xl font-extrabold uppercase mt-2 text-white tracking-tight leading-[1.02]">
                {project.title}
              </h2>
              <span className="mono-label text-gray-500 block mt-3">
                {categoryLabel(project.category)} · {project.year}
              </span>
            </div>

            <hr className="border-white/5" />

            <div className="space-y-2">
              <span className="mono-label text-gray-400 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" aria-hidden="true" /> O DESAFIO (BRIEFING)
              </span>
              <p className="text-gray-300 text-sm leading-relaxed">{project.challenge}</p>
            </div>

            <div className="space-y-2">
              <span className="mono-label text-gray-400 flex items-center gap-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-magneticViolet" aria-hidden="true" /> A SOLUÇÃO CRIATIVA
              </span>
              <p className="text-gray-300 text-sm leading-relaxed">{project.solution}</p>
            </div>

            <a
              href={whatsappLink(`Olá, vi o projeto "${project.title}" no seu portfólio e gostaria de um orçamento para algo parecido.`)}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label w-full px-5 py-3.5 rounded-full bg-electricCyan hover:bg-white text-black font-bold flex items-center justify-center gap-2 transition-colors min-h-[48px]"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" /> Quero um projeto assim
            </a>
          </div>

          <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
            <button
              onClick={onPrev}
              className="mono-label flex items-center gap-1.5 text-gray-400 hover:text-electricCyan transition-colors cursor-pointer group py-2"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" aria-hidden="true" /> Anterior
            </button>
            <button
              onClick={onNext}
              className="mono-label flex items-center gap-1.5 text-gray-400 hover:text-electricCyan transition-colors cursor-pointer group py-2"
            >
              Próximo <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
