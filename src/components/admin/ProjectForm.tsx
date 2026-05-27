import React, { useState } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { Plus, Trash2, CheckCircle2 } from 'lucide-react';
import type { MediaItem } from '../../data/projects';

export const ProjectForm: React.FC = () => {
  const { addProject } = useProjects();
  const [success, setSuccess] = useState(false);
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState<'social-media' | 'motion-design' | 'visual-identity'>('social-media');
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  const [heroImage, setHeroImage] = useState('');
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([{ type: 'image', url: '', caption: '' }]);

  const handleAddMediaRow = () => {
    setMediaItems([...mediaItems, { type: 'image', url: '', caption: '' }]);
  };

  const handleRemoveMediaRow = (index: number) => {
    setMediaItems(mediaItems.filter((_, i) => i !== index));
  };

  const handleMediaChange = (index: number, field: keyof MediaItem, value: string) => {
    const updated = mediaItems.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setMediaItems(updated);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Filtrar mídias vazias
    const validMedia = mediaItems.filter(item => item.url.trim() !== '');

    addProject({
      title,
      client,
      year,
      category,
      challenge,
      solution,
      heroImage: heroImage || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
      media: validMedia
    });

    // Feedback de sucesso
    setSuccess(true);
    setTimeout(() => setSuccess(false), 3000);

    // Resetar formulário
    setTitle('');
    setClient('');
    setYear('');
    setChallenge('');
    setSolution('');
    setHeroImage('');
    setMediaItems([{ type: 'image', url: '', caption: '' }]);
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white/[0.01] border border-white/5 shadow-neonGlow/5 flex flex-col gap-6 text-left">
      <h3 className="font-title text-2xl font-bold bg-gradient-to-r from-electricCyan to-magneticViolet bg-clip-text text-transparent mb-2">Cadastrar Novo Case</h3>
      
      {success && (
        <div className="p-4 rounded-xl bg-neonGreen/10 border border-neonGreen/20 text-neonGreen text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> Case cadastrado com sucesso!
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase font-extrabold text-gray-400 block mb-1">Título do Projeto</label>
          <input
            type="text"
            required
            value={title}
            onChange={e => setTitle(e.target.value)}
            placeholder="Ex: Teaser Cyberpunk 2026"
            className="w-full bg-[#161616] border border-white/5 focus:border-electricCyan rounded-xl px-4 py-2.5 text-white outline-none text-sm transition-all duration-300"
          />
        </div>
        <div>
          <label className="text-xs uppercase font-extrabold text-gray-400 block mb-1">Nome do Cliente</label>
          <input
            type="text"
            required
            value={client}
            onChange={e => setClient(e.target.value)}
            placeholder="Ex: SubFreq Records"
            className="w-full bg-[#161616] border border-white/5 focus:border-electricCyan rounded-xl px-4 py-2.5 text-white outline-none text-sm transition-all duration-300"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="text-xs uppercase font-extrabold text-gray-400 block mb-1">Ano do Projeto</label>
          <input
            type="text"
            required
            value={year}
            onChange={e => setYear(e.target.value)}
            placeholder="Ex: 2026"
            className="w-full bg-[#161616] border border-white/5 focus:border-electricCyan rounded-xl px-4 py-2.5 text-white outline-none text-sm transition-all duration-300"
          />
        </div>
        <div>
          <label className="text-xs uppercase font-extrabold text-gray-400 block mb-1">Categoria</label>
          <select
            value={category}
            onChange={e => setCategory(e.target.value as any)}
            className="w-full bg-[#161616] border border-white/5 focus:border-electricCyan rounded-xl px-4 py-2.5 text-white outline-none text-sm transition-all duration-300"
          >
            <option value="social-media">Social Media Estático</option>
            <option value="motion-design">Motion Design</option>
            <option value="visual-identity">Identidade Visual</option>
          </select>
        </div>
      </div>

      <div>
        <label className="text-xs uppercase font-extrabold text-gray-400 block mb-1">Capa Principal (URL da Imagem HD)</label>
        <input
          type="url"
          required
          value={heroImage}
          onChange={e => setHeroImage(e.target.value)}
          placeholder="Ex: https://images.unsplash.com/photo-..."
          className="w-full bg-[#161616] border border-white/5 focus:border-electricCyan rounded-xl px-4 py-2.5 text-white outline-none text-sm transition-all duration-300"
        />
      </div>

      <div>
        <label className="text-xs uppercase font-extrabold text-gray-400 block mb-1">O Desafio (Briefing)</label>
        <textarea
          required
          rows={3}
          value={challenge}
          onChange={e => setChallenge(e.target.value)}
          placeholder="Descreva qual era o desafio original do cliente..."
          className="w-full bg-[#161616] border border-white/5 focus:border-electricCyan rounded-xl px-4 py-2.5 text-white outline-none text-sm transition-all duration-300 resize-none"
        />
      </div>

      <div>
        <label className="text-xs uppercase font-extrabold text-gray-400 block mb-1">A Solução Creative</label>
        <textarea
          required
          rows={3}
          value={solution}
          onChange={e => setSolution(e.target.value)}
          placeholder="Descreva a solução de design/motion implementada..."
          className="w-full bg-[#161616] border border-white/5 focus:border-electricCyan rounded-xl px-4 py-2.5 text-white outline-none text-sm transition-all duration-300 resize-none"
        />
      </div>

      {/* Mídias adicionais dinâmicas */}
      <div className="space-y-4 border-t border-white/5 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase font-extrabold text-gray-300">Portfólio de Mídias (Imagens/Vídeos)</span>
          <button
            type="button"
            onClick={handleAddMediaRow}
            className="px-3 py-1.5 rounded-lg border border-electricCyan/20 text-electricCyan bg-electricCyan/5 hover:bg-electricCyan/15 transition-all text-xs font-bold flex items-center gap-1 cursor-pointer"
          >
            <Plus className="w-3.5 h-3.5" /> Adicionar Mídia
          </button>
        </div>

        {mediaItems.map((item, index) => (
          <div key={index} className="p-4 rounded-xl bg-white/[0.01] border border-white/5 flex flex-col gap-3 relative">
            <div className="flex items-center justify-between">
              <span className="text-[10px] uppercase font-bold text-gray-500">Mídia #{index + 1}</span>
              {mediaItems.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMediaRow(index)}
                  className="text-red-500 hover:text-red-400 p-1 rounded hover:bg-red-500/10 transition-colors cursor-pointer"
                  title="Excluir Mídia"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
            </div>

            <div className="grid md:grid-cols-3 gap-3">
              <div>
                <select
                  value={item.type}
                  onChange={e => handleMediaChange(index, 'type', e.target.value)}
                  className="w-full bg-[#161616] border border-white/5 focus:border-electricCyan rounded-lg px-3 py-2 text-white outline-none text-xs"
                >
                  <option value="image">Imagem Estática</option>
                  <option value="video">Vídeo Vimeo/YouTube</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <input
                  type="url"
                  required
                  value={item.url}
                  onChange={e => handleMediaChange(index, 'url', e.target.value)}
                  placeholder={item.type === 'video' ? 'URL do Vídeo (Vimeo/YouTube)' : 'URL da Imagem HD'}
                  className="w-full bg-[#161616] border border-white/5 focus:border-electricCyan rounded-lg px-3 py-2 text-white outline-none text-xs"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-3">
              <div>
                <input
                  type="text"
                  value={item.caption || ''}
                  onChange={e => handleMediaChange(index, 'caption', e.target.value)}
                  placeholder="Legenda da mídia (Opcional)"
                  className="w-full bg-[#161616] border border-white/5 focus:border-electricCyan rounded-lg px-3 py-2 text-white outline-none text-xs"
                />
              </div>
              {item.type === 'video' && (
                <div>
                  <input
                    type="url"
                    value={item.thumbnail || ''}
                    onChange={e => handleMediaChange(index, 'thumbnail', e.target.value)}
                    placeholder="URL de capa do vídeo (Opcional)"
                    className="w-full bg-[#161616] border border-white/5 focus:border-electricCyan rounded-lg px-3 py-2 text-white outline-none text-xs"
                  />
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <button
        type="submit"
        className="w-full py-4 rounded-xl bg-gradient-to-r from-electricCyan to-magneticViolet text-black font-extrabold hover:shadow-neonGlow transition-all duration-300 mt-2 cursor-pointer"
      >
        Publicar Case no Portfólio
      </button>
    </form>
  );
};
