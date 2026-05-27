import React, { useState, useRef } from 'react';
import { useProjects } from '../../context/ProjectContext';
import { storage, isFirebaseConfigured } from '../../config/firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { Plus, Trash2, CheckCircle2, Upload, Loader2 } from 'lucide-react';
import type { MediaItem } from '../../data/projects';

interface ExtendedMediaItem extends MediaItem {
  file?: File | null;
}

export const ProjectForm: React.FC = () => {
  const { addProject } = useProjects();
  const [success, setSuccess] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState('');
  const [percentProgress, setPercentProgress] = useState(0);
  
  const [title, setTitle] = useState('');
  const [client, setClient] = useState('');
  const [year, setYear] = useState('');
  const [category, setCategory] = useState<'social-media' | 'motion-design' | 'visual-identity'>('social-media');
  const [challenge, setChallenge] = useState('');
  const [solution, setSolution] = useState('');
  
  // Imagem de capa (File Input)
  const [heroFile, setHeroFile] = useState<File | null>(null);
  const heroInputRef = useRef<HTMLInputElement>(null);

  // Mídias adicionais dinâmicas
  const [mediaItems, setMediaItems] = useState<ExtendedMediaItem[]>([
    { type: 'image', url: '', caption: '', file: null }
  ]);

  const handleAddMediaRow = () => {
    setMediaItems([...mediaItems, { type: 'image', url: '', caption: '', file: null }]);
  };

  const handleRemoveMediaRow = (index: number) => {
    setMediaItems(mediaItems.filter((_, i) => i !== index));
  };

  const handleMediaChange = (index: number, field: keyof ExtendedMediaItem, value: any) => {
    const updated = mediaItems.map((item, i) => {
      if (i === index) {
        return { ...item, [field]: value };
      }
      return item;
    });
    setMediaItems(updated);
  };

  const handleMediaFileChange = (index: number, file: File | null) => {
    const updated = mediaItems.map((item, i) => {
      if (i === index) {
        return { 
          ...item, 
          file: file,
          url: file ? URL.createObjectURL(file) : '' // Preview local temporário
        };
      }
      return item;
    });
    setMediaItems(updated);
  };

  // Função auxiliar com Promises e uploadBytesResumable para progressos (%) precisos
  const uploadToFirebaseStorage = (file: File, folder: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      if (!isFirebaseConfigured()) {
        console.warn("Firebase não configurado. Simulando upload.");
        setTimeout(() => {
          resolve('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800');
        }, 1500);
        return;
      }
      
      const fileExt = file.name.split('.').pop();
      const uniqueId = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
      const fileName = `${uniqueId}.${fileExt}`;
      
      // Armazena na pasta 'portfolio/' conforme diretriz 3
      const storageRef = ref(storage!, `portfolio/${folder}/${fileName}`);
      
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on('state_changed', 
        (snapshot) => {
          // Calcular a porcentagem em tempo real
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setPercentProgress(Math.round(progress));
        }, 
        (error) => {
          console.error("Falha no Firebase Storage:", error);
          reject(error);
        }, 
        async () => {
          // Upload finalizado, resgata a URL de download pública
          try {
            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
            resolve(downloadURL);
          } catch (urlErr) {
            reject(urlErr);
          }
        }
      );
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!heroFile) {
      alert("Por favor, selecione uma imagem de capa para o projeto.");
      return;
    }

    setUploading(true);
    setPercentProgress(0);
    setUploadStatus('Preparando upload de mídias...');

    try {
      // 1. Upload da imagem de capa (heroImage)
      setUploadStatus('Enviando imagem de capa principal...');
      const uploadedHeroUrl = await uploadToFirebaseStorage(heroFile, 'covers');

      // 2. Upload de mídias dinâmicas
      const finalMediaItems: MediaItem[] = [];

      for (let i = 0; i < mediaItems.length; i++) {
        const item = mediaItems[i];
        setPercentProgress(0);
        setUploadStatus(`Enviando mídia #${i + 1} de ${mediaItems.length}...`);

        if (item.type === 'image') {
          if (item.file) {
            const url = await uploadToFirebaseStorage(item.file, 'gallery');
            finalMediaItems.push({
              type: 'image',
              url: url,
              caption: item.caption || ''
            });
          }
        } else {
          // É um link de vídeo externo - YouTube/Vimeo
          if (item.url.trim() !== '') {
            finalMediaItems.push({
              type: 'video',
              url: item.url.trim(),
              caption: item.caption || '',
              thumbnail: item.thumbnail || ''
            });
          }
        }
      }

      // 3. Salvar no Firestore Database
      setUploadStatus('Publicando case no Firestore...');
      await addProject({
        title,
        client,
        year,
        category,
        challenge,
        solution,
        heroImage: uploadedHeroUrl,
        media: finalMediaItems
      });

      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);

      // Resetar formulário
      setTitle('');
      setClient('');
      setYear('');
      setChallenge('');
      setSolution('');
      setHeroFile(null);
      if (heroInputRef.current) heroInputRef.current.value = '';
      setMediaItems([{ type: 'image', url: '', caption: '', file: null }]);

    } catch (err) {
      console.error("Falha ao publicar case no Firebase:", err);
      alert("Erro ao publicar projeto. Certifique-se de ter configurado as regras do Firestore e do Storage para permitir leitura/escrita anônima no modo teste.");
    } finally {
      setUploading(false);
      setUploadStatus('');
      setPercentProgress(0);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white/[0.01] border border-white/5 shadow-neonGlow/5 flex flex-col gap-6 text-left relative">
      
      {/* Overlay com barra de progresso real em porcentagem */}
      {uploading && (
        <div className="absolute inset-0 bg-[#0B0B0B]/95 backdrop-blur-md rounded-3xl z-50 flex flex-col items-center justify-center gap-4 px-6 text-center">
          <Loader2 className="w-12 h-12 text-electricCyan animate-spin" />
          <h4 className="font-title text-xl font-bold text-white">Publicando no Firebase</h4>
          <p className="text-sm text-gray-400 max-w-xs">{uploadStatus}</p>
          
          <div className="w-full max-w-xs bg-white/5 h-2 rounded-full overflow-hidden mt-2 relative">
            <div 
              className="bg-gradient-to-r from-electricCyan to-magneticViolet h-full transition-all duration-300"
              style={{ width: `${percentProgress}%` }}
            />
          </div>
          <span className="text-xs text-electricCyan font-extrabold tracking-widest">{percentProgress}% CONCLUÍDO</span>
        </div>
      )}

      <h3 className="font-title text-2xl font-bold bg-gradient-to-r from-electricCyan to-magneticViolet bg-clip-text text-transparent mb-2">Cadastrar Novo Case (Firebase Storage)</h3>
      
      {success && (
        <div className="p-4 rounded-xl bg-neonGreen/10 border border-neonGreen/20 text-neonGreen text-sm flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5" /> Case publicado no Firebase com sucesso!
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

      {/* Capa do Projeto (File Upload) */}
      <div className="p-5 rounded-2xl border border-dashed border-white/10 bg-white/[0.005] hover:border-electricCyan/40 transition-colors duration-300">
        <label className="text-xs uppercase font-extrabold text-gray-300 block mb-3">Imagem de Capa (Upload do Arquivo HD)</label>
        <div className="flex items-center gap-4">
          <label className="px-5 py-3 rounded-xl border border-white/5 hover:border-electricCyan text-white bg-white/5 hover:bg-electricCyan/10 text-xs font-bold transition-all cursor-pointer flex items-center gap-2">
            <Upload className="w-4 h-4" /> Selecionar Imagem
            <input
              type="file"
              ref={heroInputRef}
              accept="image/*"
              className="hidden"
              onChange={e => setHeroFile(e.target.files?.[0] || null)}
            />
          </label>
          <span className="text-xs text-gray-500 truncate max-w-xs">
            {heroFile ? heroFile.name : 'Nenhum arquivo selecionado'}
          </span>
        </div>
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
                {item.type === 'image' ? (
                  <div className="flex items-center gap-2">
                    <label className="px-3 py-2 rounded-lg border border-white/5 bg-white/5 hover:bg-electricCyan/10 text-white text-[11px] font-bold cursor-pointer transition-all flex items-center gap-1.5 whitespace-nowrap">
                      <Upload className="w-3.5 h-3.5" /> Upload Imagem
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={e => handleMediaFileChange(index, e.target.files?.[0] || null)}
                      />
                    </label>
                    <span className="text-[11px] text-gray-500 truncate max-w-[150px]">
                      {item.file ? item.file.name : 'Nenhum arquivo'}
                    </span>
                  </div>
                ) : (
                  <input
                    type="url"
                    required
                    value={item.file ? '' : item.url}
                    onChange={e => handleMediaChange(index, 'url', e.target.value)}
                    placeholder="URL do Vídeo (YouTube/Vimeo)"
                    className="w-full bg-[#161616] border border-white/5 focus:border-electricCyan rounded-lg px-3 py-2 text-white outline-none text-xs"
                  />
                )}
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
        Publicar Case no Firebase
      </button>
    </form>
  );
};
