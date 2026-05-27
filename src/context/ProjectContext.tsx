import React, { createContext, useContext, useState, useEffect } from 'react';
import { projectsData as initialProjects } from '../data/projects';
import type { Project } from '../data/projects';

export interface ProjectContextType {
  projects: Project[];
  addProject: (project: Omit<Project, 'id'>) => void;
  deleteProject: (id: string) => void;
  reorderProjects: (startIndex: number, endIndex: number) => void;
  isAdmin: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Inicializar dados do LocalStorage ou fallback para os mocks iniciais
  useEffect(() => {
    const storedProjects = localStorage.getItem('gvitor_projects');
    if (storedProjects) {
      try {
        setProjects(JSON.parse(storedProjects));
      } catch (e) {
        setProjects(initialProjects);
      }
    } else {
      setProjects(initialProjects);
      localStorage.setItem('gvitor_projects', JSON.stringify(initialProjects));
    }

    // Verificar se há uma sessão de admin salva
    const session = localStorage.getItem('gvitor_admin_session');
    if (session === 'true') {
      setIsAdmin(true);
    }
  }, []);

  // Persistir projetos no LocalStorage sempre que houver alteração
  const saveProjects = (updatedProjects: Project[]) => {
    setProjects(updatedProjects);
    localStorage.setItem('gvitor_projects', JSON.stringify(updatedProjects));
  };

  const addProject = (newProj: Omit<Project, 'id'>) => {
    const project: Project = {
      ...newProj,
      id: `project-${Date.now()}`
    };
    saveProjects([...projects, project]);
  };

  const deleteProject = (id: string) => {
    saveProjects(projects.filter(p => p.id !== id));
  };

  // Reordena os projetos trocando seus indexes
  const reorderProjects = (startIndex: number, endIndex: number) => {
    const result = Array.from(projects);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    saveProjects(result);
  };

  const loginAdmin = (password: string): boolean => {
    // Chave de acesso simples: "admin123"
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('gvitor_admin_session', 'true');
      return true;
    }
    return false;
  };

  const logoutAdmin = () => {
    setIsAdmin(false);
    localStorage.removeItem('gvitor_admin_session');
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      addProject,
      deleteProject,
      reorderProjects,
      isAdmin,
      loginAdmin,
      logoutAdmin
    }}>
      {children}
    </ProjectContext.Provider>
  );
};

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) {
    throw new Error('useProjects deve ser utilizado dentro de um ProjectProvider');
  }
  return context;
};
