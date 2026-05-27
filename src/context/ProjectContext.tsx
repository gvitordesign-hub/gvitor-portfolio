import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { projectsData as fallbackProjects } from '../data/projects';
import type { Project } from '../data/projects';

export interface ProjectContextType {
  projects: Project[];
  loading: boolean;
  addProject: (project: Omit<Project, 'id'>) => Promise<void>;
  deleteProject: (id: string) => Promise<void>;
  reorderProjects: (startIndex: number, endIndex: number) => Promise<void>;
  isAdmin: boolean;
  loginAdmin: (password: string) => boolean;
  logoutAdmin: () => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// Mapeadores para tradução DB <-> Frontend
const mapDBToProject = (dbProj: any): Project => ({
  id: dbProj.id,
  title: dbProj.title,
  client: dbProj.client,
  year: dbProj.year,
  category: dbProj.category,
  challenge: dbProj.challenge,
  solution: dbProj.solution,
  heroImage: dbProj.hero_image, // database snake_case -> frontend camelCase
  media: dbProj.media || []
});

const mapProjectToDB = (proj: Omit<Project, 'id'>, sortOrder: number) => ({
  title: proj.title,
  client: proj.client,
  year: proj.year,
  category: proj.category,
  challenge: proj.challenge,
  solution: proj.solution,
  hero_image: proj.heroImage, // frontend camelCase -> database snake_case
  media: proj.media,
  sort_order: sortOrder
});

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Carregar dados de forma resiliente
  const loadProjects = async () => {
    setLoading(true);
    
    if (!isSupabaseConfigured()) {
      console.warn("Supabase não está configurado. Usando fallbacks locais.");
      setProjects(fallbackProjects);
      setLoading(false);
      return;
    }

    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('sort_order', { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        setProjects(data.map(mapDBToProject));
      } else {
        // Se a tabela estiver vazia, inserir os projetos iniciais de fallback
        console.log("Banco de dados vazio. Semeando dados iniciais...");
        const seedData = fallbackProjects.map((p, idx) => mapProjectToDB(p, idx));
        const { data: inserted, error: seedError } = await supabase
          .from('projects')
          .insert(seedData)
          .select();

        if (seedError) throw seedError;
        if (inserted) {
          setProjects(inserted.map(mapDBToProject));
        }
      }
    } catch (err) {
      console.error("Falha ao comunicar com o Supabase. Ativando fallback de segurança:", err);
      // Fallback resiliente para manter a experiência funcional
      setProjects(fallbackProjects);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();

    const session = localStorage.getItem('gvitor_admin_session');
    if (session === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const addProject = async (newProj: Omit<Project, 'id'>) => {
    if (!isSupabaseConfigured()) {
      // Fallback local se desconectado
      const localProj: Project = { ...newProj, id: `local-${Date.now()}` };
      setProjects([...projects, localProj]);
      return;
    }

    try {
      const nextSortOrder = projects.length;
      const dbPayload = mapProjectToDB(newProj, nextSortOrder);
      
      const { data, error } = await supabase
        .from('projects')
        .insert(dbPayload)
        .select();

      if (error) throw error;
      if (data) {
        setProjects([...projects, mapDBToProject(data[0])]);
      }
    } catch (err) {
      console.error("Erro ao adicionar projeto no Supabase:", err);
      alert("Não foi possível salvar no banco de dados. Verifique a conexão.");
    }
  };

  const deleteProject = async (id: string) => {
    const updatedLocal = projects.filter(p => p.id !== id);
    setProjects(updatedLocal);

    if (!isSupabaseConfigured()) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      // Recalcular sort_orders após exclusão para manter sequência limpa
      await Promise.all(
        updatedLocal.map((proj, idx) => 
          supabase.from('projects').update({ sort_order: idx }).eq('id', proj.id)
        )
      );
    } catch (err) {
      console.error("Erro ao excluir projeto no Supabase:", err);
    }
  };

  const reorderProjects = async (startIndex: number, endIndex: number) => {
    const reorderedList = Array.from(projects);
    const [removed] = reorderedList.splice(startIndex, 1);
    reorderedList.splice(endIndex, 0, removed);
    setProjects(reorderedList);

    if (!isSupabaseConfigured()) return;

    try {
      // Atualização de sort_order em lote no Supabase
      await Promise.all(
        reorderedList.map((proj, idx) => 
          supabase.from('projects').update({ sort_order: idx }).eq('id', proj.id)
        )
      );
    } catch (err) {
      console.error("Erro ao reordenar projetos no Supabase:", err);
    }
  };

  const loginAdmin = (password: string): boolean => {
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
      loading,
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
