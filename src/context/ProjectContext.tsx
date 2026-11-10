import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { db, auth, isFirebaseConfigured } from '../config/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import type { User } from 'firebase/auth';
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
  /** true quando há um usuário autenticado no Firebase Auth. As regras do Firestore/Storage é que autorizam as escritas. */
  isAdmin: boolean;
  adminEmail: string | null;
  /** false enquanto o Firebase ainda restaura a sessão salva (evita piscar a tela de login). */
  authReady: boolean;
  /** false quando o .env do Firebase não está preenchido (login indisponível). */
  authAvailable: boolean;
  loginAdmin: (email: string, password: string) => Promise<LoginResult>;
  logoutAdmin: () => Promise<void>;
}

export type LoginResult = { ok: true } | { ok: false; message: string };

const loginErrorMessage = (code: string): string => {
  switch (code) {
    case 'auth/invalid-credential':
    case 'auth/wrong-password':
    case 'auth/user-not-found':
    case 'auth/invalid-email':
      return 'E-mail ou senha incorretos.';
    case 'auth/too-many-requests':
      return 'Muitas tentativas. Aguarde alguns minutos e tente de novo.';
    case 'auth/network-request-failed':
      return 'Sem conexão com o servidor. Verifique sua internet.';
    case 'auth/operation-not-allowed':
      return 'Login por e-mail/senha não está ativado no Firebase (Authentication → Sign-in method).';
    default:
      return 'Não foi possível entrar. Tente novamente.';
  }
};

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export const ProjectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [user, setUser] = useState<User | null>(null);
  const [authReady, setAuthReady] = useState<boolean>(() => !auth);
  const [needsSeed, setNeedsSeed] = useState<boolean>(false);
  const seededRef = useRef(false);
  const isAdmin = !!user;

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
        // Coleção vazia: visitantes veem os projetos estáticos; o admin logado os grava no Firestore (ver efeito abaixo).
        setProjects(fallbackProjects);
        setNeedsSeed(true);
      } else {
        setProjects(list);
        setNeedsSeed(false);
      }
      setLoading(false);
    }, (error) => {
      console.error("Falha ao escutar Firestore. Ativando fallbacks locais:", error);
      setProjects(fallbackProjects);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  // Sessão do administrador (Firebase Auth restaura o login salvo automaticamente).
  useEffect(() => {
    if (!auth) return;
    return onAuthStateChanged(auth, (u) => {
      setUser(u);
      setAuthReady(true);
    });
  }, []);

  // Semeia o Firestore com os projetos estáticos uma única vez, somente por um admin autenticado
  // (visitantes não têm permissão de escrita).
  useEffect(() => {
    if (!isAdmin || !needsSeed || seededRef.current || !db) return;
    seededRef.current = true;
    (async () => {
      for (const [idx, proj] of fallbackProjects.entries()) {
        await addDoc(collection(db!, 'projects'), {
          title: proj.title,
          client: proj.client,
          year: proj.year,
          category: proj.category,
          challenge: proj.challenge,
          solution: proj.solution,
          heroImage: proj.heroImage,
          media: proj.media,
          sort_order: idx,
        });
      }
    })().catch((err) => {
      seededRef.current = false;
      console.error('Falha ao semear o Firestore:', err);
    });
  }, [isAdmin, needsSeed]);

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

  const loginAdmin = async (email: string, password: string): Promise<LoginResult> => {
    if (!auth) return { ok: false, message: 'Firebase não está configurado neste ambiente.' };
    try {
      await signInWithEmailAndPassword(auth, email.trim(), password);
      return { ok: true };
    } catch (err) {
      const code = (err as { code?: string }).code ?? '';
      return { ok: false, message: loginErrorMessage(code) };
    }
  };

  const logoutAdmin = async () => {
    if (auth) await signOut(auth);
  };

  return (
    <ProjectContext.Provider value={{
      projects,
      loading,
      addProject,
      deleteProject,
      reorderProjects,
      isAdmin,
      adminEmail: user?.email ?? null,
      authReady,
      authAvailable: !!auth,
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
