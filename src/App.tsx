import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { PortfolioGrid } from './components/PortfolioGrid';
import { Modal } from './components/Modal';
import { Contact } from './components/Contact';
import { projectsData } from './data/projects';
import type { Project } from './data/projects';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = projectsData.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projectsData.length;
    setSelectedProject(projectsData[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = projectsData.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
    setSelectedProject(projectsData[prevIndex]);
  };

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

      <footer className="py-8 text-center text-xs text-gray-600 border-t border-white/5">
        © {new Date().getFullYear()} GVITOR DESIGN. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default App;
