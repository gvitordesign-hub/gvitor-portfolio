import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { ProjectForm } from './ProjectForm';
import { DraggableProjectList } from './DraggableProjectList';
import { Lock, LogOut, ArrowLeft, ShieldAlert } from 'lucide-react';

interface AdminPanelProps {
  onBackToPortfolio: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({ onBackToPortfolio }) => {
  const { isAdmin, adminEmail, authReady, authAvailable, loginAdmin, logoutAdmin } = useProjects();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (submitting) return;
    setSubmitting(true);
    setError('');
    const result = await loginAdmin(email, password);
    setSubmitting(false);
    if (result.ok) {
      setPassword('');
    } else {
      setError(result.message);
    }
  };

  // Aguarda o Firebase restaurar a sessão salva, para não piscar a tela de login.
  if (!authReady) {
    return <section className="min-h-screen bg-[#0B0B0B]" aria-busy="true" aria-label="Carregando" />;
  }

  if (!isAdmin) {
    const inputClass =
      'w-full bg-[#161616] border border-white/10 focus:border-magneticViolet rounded-xl px-4 py-3.5 text-white outline-none text-sm transition-all duration-300 disabled:opacity-50';
    return (
      <section className="min-h-screen flex items-center justify-center px-6 relative py-12 bg-[#0B0B0B]">
        <div className="absolute w-80 h-80 bg-magneticViolet/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="w-full max-w-md p-8 rounded-3xl bg-white/[0.01] border border-white/5 shadow-neonGlow flex flex-col gap-6 text-center z-10">
          <div className="mx-auto w-14 h-14 bg-magneticViolet/10 text-magneticViolet border border-magneticViolet/20 rounded-2xl flex items-center justify-center shadow-neonViolet">
            <Lock className="w-6 h-6" aria-hidden="true" />
          </div>

          <div>
            <h2 className="font-title text-3xl font-extrabold text-white">Acesso Restrito</h2>
            <p className="text-xs text-gray-400 mt-2">Entre com seu e-mail e senha para gerenciar o portfólio.</p>
          </div>

          {!authAvailable && (
            <div role="alert" className="p-3.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-400 text-xs font-semibold">
              O Firebase não está configurado neste ambiente (preencha as variáveis VITE_FIREBASE_* no .env). O login está indisponível.
            </div>
          )}

          {error && (
            <div role="alert" className="p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold flex items-center justify-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" aria-hidden="true" /> {error}
            </div>
          )}

          <form onSubmit={handleLoginSubmit} className="flex flex-col gap-4 text-left">
            <div>
              <label htmlFor="admin-email" className="text-xs uppercase font-extrabold text-gray-400 block mb-2">
                E-mail
              </label>
              <input
                id="admin-email"
                type="email"
                required
                autoComplete="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={submitting || !authAvailable}
                className={inputClass}
              />
            </div>
            <div>
              <label htmlFor="admin-password" className="text-xs uppercase font-extrabold text-gray-400 block mb-2">
                Senha
              </label>
              <input
                id="admin-password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={submitting || !authAvailable}
                className={inputClass}
              />
            </div>

            <button
              type="submit"
              disabled={submitting || !authAvailable}
              className="w-full py-4 rounded-xl bg-magneticViolet text-white font-extrabold hover:shadow-neonViolet transition-all duration-300 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Entrando...' : 'Entrar'}
            </button>
          </form>

          <button
            onClick={onBackToPortfolio}
            className="text-xs font-bold text-gray-400 hover:text-white transition-all flex items-center justify-center gap-1.5 cursor-pointer mt-2"
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" /> Voltar ao Portfólio
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
            {adminEmail && <span className="block text-xs text-gray-400 mt-1">Conectado como {adminEmail}</span>}
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
