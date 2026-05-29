import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useProjects } from '../context/ProjectContext';
import type { Project } from '../data/projects';
import { Play, Eye } from 'lucide-react';
import { getOptimizedImageUrl } from '../utils/imageOptimizer';

interface PortfolioGridProps {
  onProjectSelect: (project: Project) => void;
}

type CategoryFilter = 'all' | 'event-campaigns' | 'music-releases' | 'motion-visuals';

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.06,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.96 },
  show: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: {
      type: "spring" as const,
      stiffness: 140,
      damping: 18
    }
  },
  exit: { 
    opacity: 0, 
    scale: 0.96,
    transition: { duration: 0.2 }
  }
};

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ onProjectSelect }) => {
  const { projects } = useProjects();
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const filters = [
    { label: 'Todos', id: 'all' as const },
    { label: 'Campanhas de Eventos', id: 'event-campaigns' as const },
    { label: 'Lançamentos Musicais', id: 'music-releases' as const },
    { label: 'Motion & Visuals', id: 'motion-visuals' as const }
  ];

  return (
    <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-electricCyan font-bold">GALERIA PREMIUM</span>
        <h2 className="font-title text-4xl md:text-6xl font-bold mt-2 mb-8">Trabalhos em Destaque</h2>
        
        {/* Filtros com Pílula Deslizante */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className="relative px-6 py-2.5 rounded-full text-sm font-bold transition-colors duration-300 cursor-pointer text-gray-400 hover:text-white"
            >
              {activeFilter === filter.id && (
                <motion.div
                  layoutId="activeFilterBg"
                  className="absolute inset-0 bg-electricCyan rounded-full -z-10 shadow-neonCyan"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}
              <span className={activeFilter === filter.id ? 'text-black' : ''}>
                {filter.label}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Projetos Animado e Otimizado */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="show"
        layout
        className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map(project => (
            <motion.div
              layout
              key={project.id}
              variants={cardVariants}
              initial="hidden"
              animate="show"
              exit="exit"
              onClick={() => onProjectSelect(project)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#121212] border border-white/5 hover:border-electricCyan/40 hover:shadow-neonCyan transition-all duration-300 flex flex-col"
            >
              {/* Media Container com Hover Glow e Proporção Original Adaptativa */}
              <div className="relative overflow-hidden h-[300px] w-full bg-black/60 flex items-center justify-center border-b border-white/5">
                {project.heroImage.endsWith('.mp4') ? (
                  <video
                    src={project.heroImage}
                    muted
                    loop
                    playsInline
                    autoPlay
                    className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-102 transition-all duration-500"
                  />
                ) : (
                  <img
                    src={getOptimizedImageUrl(project.heroImage, 600)}
                    alt={project.title}
                    loading="lazy"
                    className="w-auto h-auto max-w-full max-h-full object-contain group-hover:scale-102 filter grayscale group-hover:grayscale-0 transition-all duration-500"
                  />
                )}
                <div className="absolute inset-0 bg-black/20 opacity-100 group-hover:opacity-40 transition-opacity duration-300 pointer-events-none" />
                
                {/* Overlay interativo com ícone */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 bg-electricCyan text-black rounded-full flex items-center justify-center shadow-neonCyan hover:scale-110 transition-transform duration-300">
                    {project.category === 'motion-visuals' || project.category === 'music-releases' ? (
                      <Play className="w-6 h-6 fill-black translate-x-0.5" />
                    ) : (
                      <Eye className="w-6 h-6" />
                    )}
                  </div>
                </div>
                
                {/* Categoria tag flutuante */}
                <span className="absolute top-4 left-4 px-3.5 py-1 text-[10px] uppercase font-extrabold tracking-wider bg-black/80 backdrop-blur-md rounded-full text-electricCyan border border-electricCyan/20">
                  {project.category.replace('-', ' ')}
                </span>
              </div>

              {/* Detalhes do Projeto */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-bold block mb-1">{project.client} • {project.year}</span>
                  <h3 className="font-title text-xl font-bold group-hover:text-electricCyan transition-colors duration-300">{project.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
