import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, isFirebaseConfigured } from '../config/firebase';
import { 
  collection, 
  addDoc, 
  deleteDoc, 
  doc, 
  updateDoc, 
  onSnapshot, 
  query, 
  orderBy 
} from 'firebase/firestore';
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

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    if (!isFirebaseConfigured()) {
      console.warn("Firebase não está configurado. Usando fallbacks locais.");
      setProjects(fallbackProjects);
      setLoading(false);
      return;
    }

    // Ouvinte em Tempo Real para sincronização instantânea
    const q = query(collection(db!, 'projects'), orderBy('sort_order', 'asc'));
    
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const list: Project[] = [];
      snapshot.forEach((docSnapshot) => {
        list.push({ id: docSnapshot.id, ...docSnapshot.data() } as Project);
      });

      if (list.length === 0) {
        // Se a coleção estiver vazia, semeia os dados de fallback estáticos automaticamente
        console.log("Coleção Firestore vazia. Semeando dados estáticos iniciais...");
        fallbackProjects.forEach(async (proj, idx) => {
          await addDoc(collection(db!, 'projects'), {
            title: proj.title,
            client: proj.client,
            year: proj.year,
            category: proj.category,
            challenge: proj.challenge,
            solution: proj.solution,
            heroImage: proj.heroImage,
            media: proj.media,
            sort_order: idx
          });
        });
      } else {
        setProjects(list);
      }
      setLoading(false);
    }, (error) => {
      console.error("Falha ao escutar Firestore. Ativando fallbacks locais:", error);
      setProjects(fallbackProjects);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const session = localStorage.getItem('gvitor_admin_session');
    if (session === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const addProject = async (newProj: Omit<Project, 'id'>) => {
    if (!isFirebaseConfigured()) {
      // Fallback local caso offline
      const localProj: Project = { ...newProj, id: `local-${Date.now()}` };
      setProjects([...projects, localProj]);
      return;
    }

    try {
      const nextSortOrder = projects.length;
      await addDoc(collection(db!, 'projects'), {
        ...newProj,
        sort_order: nextSortOrder
      });
    } catch (err) {
      console.error("Erro ao adicionar documento no Firestore:", err);
      alert("Não foi possível salvar no Firestore. Verifique as regras de segurança RLS.");
    }
  };

  const deleteProject = async (id: string) => {
    const updatedLocal = projects.filter(p => p.id !== id);
    setProjects(updatedLocal); // Atualiza estado local de imediato para melhor UX

    if (!isFirebaseConfigured()) return;

    try {
      // Excluir o documento correspondente
      await deleteDoc(doc(db!, 'projects', id));

      // Re-ordenar os demais projetos remanescentes para manter sequência limpa
      await Promise.all(
        updatedLocal.map((proj, idx) => 
          updateDoc(doc(db!, 'projects', proj.id), { sort_order: idx })
        )
      );
    } catch (err) {
      console.error("Erro ao excluir documento do Firestore:", err);
    }
  };

  const reorderProjects = async (startIndex: number, endIndex: number) => {
    const reorderedList = Array.from(projects);
    const [removed] = reorderedList.splice(startIndex, 1);
    reorderedList.splice(endIndex, 0, removed);
    setProjects(reorderedList); // Atualiza estado local síncrono para UX suave sem lag

    if (!isFirebaseConfigured()) return;

    try {
      // Atualizar sort_order de todos no Firestore em lote
      await Promise.all(
        reorderedList.map((proj, idx) => 
          updateDoc(doc(db!, 'projects', proj.id), { sort_order: idx })
        )
      );
    } catch (err) {
      console.error("Erro ao sincronizar ordenação no Firestore:", err);
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
