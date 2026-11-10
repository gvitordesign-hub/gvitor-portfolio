import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '../context/ProjectContext';
import type { Project } from '../data/projects';
import { Eye, Briefcase, ArrowUpRight, ArrowRight, Sparkles } from 'lucide-react';
import { getOptimizedImageUrl } from '../utils/imageOptimizer';
import { OptimizedImg, OptimizedVideo } from './OptimizedMedia';
import { categoryLabel } from '../data/categories';
import { useMediaQuery } from '../hooks/useMediaQuery';

interface PortfolioGridProps {
  onProjectSelect: (project: Project) => void;
}

type CategoryFilter = 'all' | 'event-campaigns' | 'music-releases' | 'motion-visuals';

const FILTERS: { label: string; id: CategoryFilter }[] = [
  { label: 'Todos os Projetos', id: 'all' },
  { label: 'Campanhas de Eventos', id: 'event-campaigns' },
  { label: 'Lançamentos Musicais', id: 'music-releases' },
  { label: 'Motion & Visuals', id: 'motion-visuals' },
];

const isVideoCover = (url: string) => /\.(mp4|m4v|webm)$/i.test(url);

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ onProjectSelect }) => {
  const { projects } = useProjects();
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');
  const [abertoId, setAbertoId] = useState<string>('');
  const hoverTimer = useRef<number | undefined>(undefined);

  // O acordeão precisa de ~56px por painel fechado; abaixo disso vira carrossel com deslize.
  const isWide = useMediaQuery('(min-width: 1280px)');

  const filteredProjects = activeFilter === 'all' ? projects : projects.filter((p) => p.category === activeFilter);

  // O painel aberto é derivado: se o escolhido não está no filtro atual, abre o primeiro.
  const openId = filteredProjects.some((p) => p.id === abertoId) ? abertoId : filteredProjects[0]?.id ?? '';
  const currentProject = filteredProjects.find((p) => p.id === openId);

  useEffect(() => () => window.clearTimeout(hoverTimer.current), []);

  // Abrir por hover com pequeno atraso evita o "pisca-pisca" ao atravessar vários painéis com o mouse.
  const openWithIntent = (id: string) => {
    window.clearTimeout(hoverTimer.current);
    hoverTimer.current = window.setTimeout(() => setAbertoId(id), 120);
  };

  return (
    <section id="portfolio" className="relative py-20 sm:py-32 px-4 sm:px-8 max-w-[1500px] mx-auto overflow-hidden scroll-mt-16">
      {/* Background atmosférico reativo ao projeto ativo */}
      <div className="absolute inset-0 pointer-events-none -z-10 overflow-hidden">
        <AnimatePresence mode="wait">
          {currentProject && (
            <motion.div
              key={currentProject.id}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 0.18, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="absolute inset-0 filter blur-[90px] saturate-150"
              style={{
                backgroundImage: isVideoCover(currentProject.heroImage)
                  ? undefined
                  : `url("${getOptimizedImageUrl(currentProject.heroImage, 600)}")`,
                backgroundPosition: 'center',
                backgroundSize: 'cover',
              }}
            />
          )}
        </AnimatePresence>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0B0B0B]/70 to-[#0B0B0B]" />
      </div>

      {/* Cabeçalho da seção */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-14 pb-6 border-b border-white/10 relative z-10">
        <div>
          <span className="text-xs uppercase tracking-widest text-electricCyan font-bold flex items-center gap-2 mb-2">
            <Sparkles className="w-3.5 h-3.5 motion-safe:animate-pulse text-electricCyan" aria-hidden="true" />
            PORTFÓLIO INTERATIVO • SHOWBUSINESS
          </span>
          <h2 className="font-title text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white">
            Projetos Selecionados
          </h2>
          <p className="text-gray-400 text-sm mt-2 max-w-xl">
            {isWide
              ? 'Passe o mouse ou clique nos painéis para expandir. Clique no painel aberto para ver o projeto completo.'
              : 'Deslize para o lado e toque em um projeto para ver o case completo.'}
          </p>
        </div>

        {/* Filtros em pílulas */}
        <div
          className="flex items-center gap-2 overflow-x-auto pb-2 sm:pb-0 scrollbar-none -mx-4 px-4 sm:mx-0 sm:px-0"
          role="toolbar"
          aria-label="Filtros por categoria"
        >
          {FILTERS.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              aria-pressed={activeFilter === filter.id}
              className="relative px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer text-gray-400 hover:text-white active:scale-95 transform whitespace-nowrap shrink-0 min-h-[42px] flex items-center justify-center focus-visible:ring-2 focus-visible:ring-electricCyan"
            >
              {activeFilter === filter.id && (
                <motion.div
                  layoutId="activeFilterBg"
                  className="absolute inset-0 bg-white text-black rounded-full -z-10 shadow-[0_4px_25px_rgba(255,255,255,0.25)]"
                  transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                />
              )}
              <span className={activeFilter === filter.id ? 'text-black' : ''}>{filter.label}</span>
            </button>
          ))}
        </div>
      </div>

      {filteredProjects.length === 0 && (
        <p className="relative z-10 text-center text-gray-500 py-20">Nenhum projeto nesta categoria ainda.</p>
      )}

      {/* ── DESKTOP: painéis que expandem ── */}
      {filteredProjects.length > 0 && isWide && (
        <div className="portfolio-expand-panels js-paineis">
          {filteredProjects.map((project, idx) => {
            const isAberto = project.id === openId;
            const isVideo = isVideoCover(project.heroImage);
            const activate = () => (isAberto ? onProjectSelect(project) : setAbertoId(project.id));

            return (
              <div
                key={project.id}
                role="button"
                tabIndex={0}
                aria-expanded={isAberto}
                aria-label={`Projeto: ${project.title}`}
                onClick={activate}
                onMouseEnter={() => openWithIntent(project.id)}
                onMouseLeave={() => window.clearTimeout(hoverTimer.current)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    activate();
                  }
                }}
                className={`portfolio-panel group ${isAberto ? 'aberto' : ''}`}
              >
                <div className="absolute inset-0 z-0 overflow-hidden bg-black">
                  {isVideo ? (
                    <OptimizedVideo
                      src={project.heroImage}
                      muted
                      loop
                      playsInline
                      autoPlay
                      preload="metadata"
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isAberto ? 'scale-105 opacity-80 filter brightness-105' : 'opacity-40 filter grayscale contrast-125'
                      }`}
                    />
                  ) : (
                    <OptimizedImg
                      src={project.heroImage}
                      width={900}
                      alt={project.title}
                      loading="lazy"
                      className={`w-full h-full object-cover transition-all duration-700 ${
                        isAberto ? 'scale-105 opacity-85 filter brightness-105' : 'opacity-40 filter grayscale contrast-125'
                      }`}
                    />
                  )}

                  <div
                    className={`absolute inset-0 transition-opacity duration-500 ${
                      isAberto
                        ? 'bg-gradient-to-t from-black via-black/40 to-black/20 opacity-90'
                        : 'bg-black/60 group-hover:bg-black/40'
                    }`}
                  />

                  {isAberto && (
                    <div className="absolute inset-0 border border-electricCyan/40 rounded-[23px] pointer-events-none" />
                  )}
                </div>

                {/* Fechado: rótulo vertical */}
                {!isAberto && (
                  <div className="relative z-10 w-full h-full flex flex-col justify-between items-center py-6 px-2 pointer-events-none">
                    <span className="font-mono text-xs font-bold text-gray-400 bg-black/60 backdrop-blur-md px-2 py-1 rounded-full border border-white/10">
                      {String(idx + 1).padStart(2, '0')}
                    </span>

                    <div className="flex items-center justify-center rotate-180 [writing-mode:vertical-rl] max-h-[70%] overflow-hidden">
                      <span className="font-title text-sm font-extrabold tracking-wider text-gray-300 group-hover:text-electricCyan transition-colors duration-300 whitespace-nowrap">
                        {project.title}
                      </span>
                    </div>

                    <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/50 group-hover:text-electricCyan group-hover:bg-white/20 transition-all duration-300">
                      <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                    </div>
                  </div>
                )}

                {/* Aberto: detalhes */}
                {isAberto && (
                  <div className="relative z-10 p-6 sm:p-8 flex flex-col justify-between h-full w-full">
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-2">
                        <span className="px-3.5 py-1 rounded-full text-[10px] uppercase font-extrabold tracking-wider bg-black/70 backdrop-blur-md text-electricCyan border border-electricCyan/40 shadow-[0_0_15px_rgba(0,240,255,0.25)]">
                          {categoryLabel(project.category)}
                        </span>
                        <span className="hidden sm:inline-flex px-3 py-1 rounded-full text-[10px] font-mono font-semibold bg-white/10 backdrop-blur-md text-gray-300">
                          {project.year}
                        </span>
                      </div>

                      <span className="text-xs font-mono font-bold text-gray-400 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full border border-white/10">
                        {String(idx + 1).padStart(2, '0')} / {String(filteredProjects.length).padStart(2, '0')}
                      </span>
                    </div>

                    <motion.div
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.35, delay: 0.1 }}
                      className="space-y-3"
                    >
                      <span className="text-xs uppercase tracking-widest text-gray-300 font-bold flex items-center gap-2">
                        <Briefcase className="w-3.5 h-3.5 text-electricCyan" aria-hidden="true" />
                        {project.client}
                      </span>

                      <h3 className="font-title text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white leading-tight">
                        {project.title}
                      </h3>

                      <p className="text-gray-300 text-xs sm:text-sm line-clamp-2 max-w-2xl font-light">{project.challenge}</p>

                      <div className="pt-3 flex items-center gap-3">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onProjectSelect(project);
                          }}
                          className="px-6 py-3 rounded-full bg-electricCyan hover:bg-white text-black font-extrabold text-xs uppercase tracking-wider transition-all duration-300 flex items-center gap-2 shadow-[0_0_25px_rgba(0,240,255,0.45)] hover:scale-105 active:scale-95 cursor-pointer"
                        >
                          <Eye className="w-4 h-4" aria-hidden="true" />
                          <span>Ver Projeto Completo</span>
                        </button>
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}

      {/* ── MOBILE / TABLET: carrossel com deslize e snap ── */}
      {filteredProjects.length > 0 && !isWide && (
        <div
          className="relative z-10 flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none -mx-4 px-4 sm:-mx-8 sm:px-8 pb-4"
          role="list"
          aria-label="Projetos do portfólio"
        >
          {filteredProjects.map((project, idx) => {
            const isVideo = isVideoCover(project.heroImage);
            return (
              <button
                key={project.id}
                role="listitem"
                onClick={() => onProjectSelect(project)}
                aria-label={`Ver projeto: ${project.title}`}
                className="group relative snap-center shrink-0 w-[78vw] max-w-[340px] sm:w-[320px] aspect-[4/5] rounded-3xl overflow-hidden border border-white/10 bg-darkCard text-left cursor-pointer active:scale-[0.98] transition-transform focus-visible:ring-2 focus-visible:ring-electricCyan"
              >
                {isVideo ? (
                  <OptimizedVideo
                    src={project.heroImage}
                    muted
                    loop
                    playsInline
                    autoPlay
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                ) : (
                  <OptimizedImg
                    src={project.heroImage}
                    width={900}
                    alt=""
                    loading={idx < 2 ? 'eager' : 'lazy'}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />

                <span className="absolute top-4 left-4 px-3 py-1 rounded-full text-[10px] uppercase font-extrabold tracking-wider bg-black/70 backdrop-blur-md text-electricCyan border border-electricCyan/40">
                  {categoryLabel(project.category)}
                </span>
                <span className="absolute top-4 right-4 text-[11px] font-mono font-bold text-gray-300 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10">
                  {String(idx + 1).padStart(2, '0')}/{String(filteredProjects.length).padStart(2, '0')}
                </span>

                <div className="absolute inset-x-0 bottom-0 p-5 space-y-2">
                  <span className="text-[11px] uppercase tracking-widest text-gray-300 font-bold flex items-center gap-1.5">
                    <Briefcase className="w-3 h-3 text-electricCyan" aria-hidden="true" />
                    {project.client} · {project.year}
                  </span>
                  <h3 className="font-title text-xl font-extrabold text-white leading-tight line-clamp-3">{project.title}</h3>
                  <span className="inline-flex items-center gap-1.5 text-xs font-bold text-electricCyan pt-1">
                    Ver projeto <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
};
