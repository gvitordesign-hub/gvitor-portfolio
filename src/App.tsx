import React, { useState, useEffect, useCallback, Suspense, lazy } from 'react';
import { StudioNav } from './components/studio/StudioNav';
import { StudioHero } from './components/studio/StudioHero';
import { Marquee } from './components/studio/Marquee';
import { StudioWork } from './components/studio/StudioWork';
import { StudioAbout } from './components/studio/StudioAbout';
import { StudioContact } from './components/studio/StudioContact';
import { Cursor } from './components/studio/Cursor';
import { ProjectViewer } from './components/studio/ProjectViewer';
import type { OriginRect } from './components/studio/types';
import { useProjects } from './context/ProjectContext';
import type { Project } from './data/projects';

// O painel admin só é baixado por quem acessa /acessoadmin (fora do bundle público).
const AdminPanel = lazy(() => import('./components/admin/AdminPanel').then((m) => ({ default: m.AdminPanel })));

const ADMIN_PATH = '/acessoadmin';

const PROJECT_HASH = '#projeto/';

// Aceita /acessoadmin (com ou sem barra final) e o link antigo /#admin.
const isAdminPath = () =>
  window.location.pathname.replace(/\/+$/, '').toLowerCase() === ADMIN_PATH || window.location.hash === '#admin';

const readHash = () => {
  const hash = window.location.hash;
  return {
    isAdmin: isAdminPath(),
    projectId: hash.startsWith(PROJECT_HASH) ? decodeURIComponent(hash.slice(PROJECT_HASH.length)) : null,
  };
};

export const App: React.FC = () => {
  const { projects } = useProjects();
  const [selectedId, setSelectedId] = useState<string | null>(() => readHash().projectId);
  const [currentView, setCurrentView] = useState<'portfolio' | 'admin'>(() => (readHash().isAdmin ? 'admin' : 'portfolio'));
  // De onde o cartão "voa" ao abrir o projeto (só vale para a abertura por clique).
  const [origin, setOrigin] = useState<OriginRect | null>(null);

  // Roteamento: /acessoadmin (path) e #projeto/<id> (hash) (link direto para um case; o botão "voltar" fecha o modal).
  useEffect(() => {
    const sync = () => {
      const { isAdmin, projectId } = readHash();
      setCurrentView(isAdmin ? 'admin' : 'portfolio');
      setSelectedId(projectId);
      setOrigin(null); // voltar/avançar no navegador abre sem animação de origem
    };
    window.addEventListener('hashchange', sync);
    window.addEventListener('popstate', sync);
    return () => {
      window.removeEventListener('hashchange', sync);
      window.removeEventListener('popstate', sync);
    };
  }, []);

  // Link antigo (/#admin): mantém funcionando e troca a barra de endereço pela URL nova.
  useEffect(() => {
    if (window.location.hash === '#admin') window.history.replaceState(null, '', ADMIN_PATH);
  }, []);

  // A área admin não deve aparecer em buscadores nem ter o título do site público.
  useEffect(() => {
    if (currentView !== 'admin') return;
    const previousTitle = document.title;
    const meta = document.createElement('meta');
    meta.name = 'robots';
    meta.content = 'noindex, nofollow';
    document.head.appendChild(meta);
    document.title = 'Admin | GVITOR Design';
    return () => {
      document.title = previousTitle;
      meta.remove();
    };
  }, [currentView]);

  // O projeto é derivado do id: se o link direto chega antes dos dados (Firebase), o modal abre assim que carregam.
  const selectedIndex = selectedId ? projects.findIndex((p) => p.id === selectedId) : -1;
  const selectedProject: Project | null = selectedIndex >= 0 ? projects[selectedIndex] : null;

  const openProject = useCallback((project: Project, originRect?: OriginRect) => {
    window.history.pushState({ modal: true }, '', `${PROJECT_HASH}${encodeURIComponent(project.id)}`);
    setOrigin(originRect ?? null);
    setSelectedId(project.id);
  }, []);

  const closeProject = useCallback(() => {
    if (window.history.state?.modal) {
      window.history.back(); // desfaz o pushState; o listener de popstate atualiza o estado
    } else {
      window.history.replaceState(null, '', '#portfolio');
      setSelectedId(null);
    }
  }, []);

  // Navegar entre projetos substitui a entrada atual, sem encher o histórico.
  const goToProject = useCallback((project: Project) => {
    window.history.replaceState(window.history.state, '', `${PROJECT_HASH}${encodeURIComponent(project.id)}`);
    setSelectedId(project.id);
  }, []);

  const handleNextProject = useCallback(() => {
    if (!selectedProject || projects.length === 0) return;
    const i = projects.findIndex((p) => p.id === selectedProject.id);
    goToProject(projects[(i + 1) % projects.length]);
  }, [selectedProject, projects, goToProject]);

  const handlePrevProject = useCallback(() => {
    if (!selectedProject || projects.length === 0) return;
    const i = projects.findIndex((p) => p.id === selectedProject.id);
    goToProject(projects[(i - 1 + projects.length) % projects.length]);
  }, [selectedProject, projects, goToProject]);

  // Em /acessoadmin exibe apenas o painel de gerenciamento
  if (currentView === 'admin') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-darkBg" aria-busy="true" />}>
        <AdminPanel
          onBackToPortfolio={() => {
            window.history.pushState(null, '', '/');
            setSelectedId(null);
            setCurrentView('portfolio');
          }}
        />
      </Suspense>
    );
  }

  return (
    <div className="relative min-h-screen bg-darkBg text-gray-100 selection:bg-electricCyan selection:text-black">
      <div className="grain" aria-hidden="true" />
      <Cursor />
      <StudioNav />

      <main>
        <StudioHero />
        <Marquee />
        <StudioWork onProjectSelect={openProject} />
        <StudioAbout />
        <StudioContact />
      </main>

      {/* Visualizador imersivo do projeto (cuida da própria animação de entrada e saída) */}
      {selectedProject && (
        <ProjectViewer
          project={selectedProject}
          nextProject={projects[(selectedIndex + 1) % projects.length]}
          index={selectedIndex + 1}
          total={projects.length}
          originRect={origin}
          onClose={closeProject}
          onNext={handleNextProject}
          onPrev={handlePrevProject}
        />
      )}
    </div>
  );
};

export default App;
