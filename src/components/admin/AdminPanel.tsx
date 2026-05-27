import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { ProjectForm } from './ProjectForm';
import { DraggableProjectList } from './DraggableProjectList';
import { Lock, LogOut, ArrowLeft, ShieldAlert } from 'lucide-react';

interface AdminPanelProps {
  onBackToPortfolio: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToPortfolio }) => {
  const { isAdmin, loginAdmin, logoutAdmin } = useProjects();
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = loginAdmin(password);
    if (success) {
      setError(false);
      setPassword('');
    } else {
      setError(true);
    }
  };

  if (!isAdmin) {
    return (
      <section className="min-h-screen flex items-center justify-center px-6 relative py-12 bg-[#0B0B0B]">
        {/* Glow neon de fundo */}
        <div className="absolute w-80 h-80 bg-magneticViolet/10 rounded-full blur-[100px] pointer-events-none" />
        
        <div className="w-full max-w-md p-8 rounded-3xl bg-white/[0.01] border border-white/5 shadow-neonGlow flex flex-col gap-6 text-center z-10">
          <div className="mx-auto w-14 h-14 bg-magneticViolet/10 text-magneticViolet border border-magneticViolet/20 rounded-2xl flex items-center justify-center shadow-neonViolet">
            <Lock className="w-6 h-6" />
          </div>
          
          <div>
            <h2 className="font-title text-3xl font-extrabold text-white">Acesso Restrito</h2>
            <p className="text-xs text-gray-500 mt-2">
              Digite a chave mestre do painel super admin para gerenciar o portfólio.
            </p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold flex items-center justify-center gap-2">
              <ShieldAlert className="w-4 h-4" /> Senha mestre inválida!
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 text-left">
            <div>
              <label className="text-xs uppercase font-extrabold text-gray-400 block mb-2">Chave de Acesso</label>
              <input
                type="password"
                required
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full bg-[#161616] border border-white/5 focus:border-magneticViolet rounded-xl px-4 py-3.5 text-white outline-none text-sm transition-all duration-300"
              />
            </div>
            
            <button
              type="submit"
              className="w-full py-4 rounded-xl bg-magneticViolet text-white font-extrabold hover:shadow-neonViolet transition-all duration-300 cursor-pointer"
            >
              Autenticar Painel
            </button>
          </form>

          <button
            onClick={onBackToPortfolio}
            className="text-xs font-bold text-gray-500 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao Portfólio
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-darkBg text-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        {/* Header Admin */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-white/5 pb-6">
          <div>
            <span className="text-xs uppercase tracking-widest text-magneticViolet font-bold">PAINEL DE GERENCIAMENTO</span>
            <h1 className="font-title text-3xl md:text-5xl font-extrabold text-white mt-1">Super Admin Portfólio</h1>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={onBackToPortfolio}
              className="px-5 py-2.5 rounded-full border border-white/10 hover:border-white/20 text-white font-semibold text-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Voltar ao Portfólio
            </button>
            <button
              onClick={logoutAdmin}
              className="px-5 py-2.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 font-bold border border-red-500/10 text-sm transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <LogOut className="w-4 h-4" /> Sair
            </button>
          </div>
        </div>

        {/* Grid Dual Column Form e Lista */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-7">
            <ProjectForm />
          </div>
          <div className="lg:col-span-5">
            <DraggableProjectList />
          </div>
        </div>
      </div>
    </section>
  );
};
