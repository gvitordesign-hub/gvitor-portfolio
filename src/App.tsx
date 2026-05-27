import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { PortfolioGrid } from './components/PortfolioGrid';
import { Modal } from './components/Modal';
import { Contact } from './components/Contact';
import { AdminPanel } from './components/admin/AdminPanel';
import { useProjects } from './context/ProjectContext';
import type { Project } from './data/projects';

export const App: React.FC = () => {
  const { projects } = useProjects();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentView, setCurrentView] = useState<'portfolio' | 'admin'>('portfolio');

  // Roteamento simples por URL Hash (#admin)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      } else {
        setCurrentView('portfolio');
      }
    };
    
    // Verifica hash na inicialização
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleNextProject = () => {
    if (!selectedProject || projects.length === 0) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projects.length;
    setSelectedProject(projects[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!selectedProject || projects.length === 0) return;
    const currentIndex = projects.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + projects.length) % projects.length;
    setSelectedProject(projects[prevIndex]);
  };

  // Se o usuário estiver na aba admin, exibe apenas o painel de gerenciamento
  if (currentView === 'admin') {
    return (
      <AdminPanel
        onBackToPortfolio={() => {
          window.location.hash = '';
          setCurrentView('portfolio');
        }}
      />
    );
  }

  return (
    <div className="relative min-h-screen bg-darkBg text-gray-100 selection:bg-electricCyan selection:text-black">
      <Navbar />
      
      <main>
        <Hero />
        <About />
        <PortfolioGrid onProjectSelect={setSelectedProject} />
        <Contact />
      </main>

      {/* Modal com Framer Motion AnimatePresence para saída suave */}
      <AnimatePresence>
        {selectedProject && (
          <Modal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onNext={handleNextProject}
            onPrev={handlePrevProject}
          />
        )}
      </AnimatePresence>

      <footer className="py-8 text-center text-xs text-gray-600 border-t border-white/5 flex flex-col items-center gap-2">
        <span>© {new Date().getFullYear()} GVITOR DESIGN. Todos os direitos reservados.</span>
        <button
          onClick={() => {
            window.location.hash = '#admin';
            setCurrentView('admin');
          }}
          className="text-[10px] text-gray-700 hover:text-magneticViolet font-extrabold uppercase tracking-widest transition-colors cursor-pointer"
        >
          Área Admin
        </button>
      </footer>
    </div>
  );
};

export default App;
