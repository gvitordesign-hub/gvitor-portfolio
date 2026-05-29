import React, { useState } from 'react';
import { Send, Phone, MessageSquare } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Monta a mensagem personalizada para enviar para o WhatsApp
    const text = `Olá GVITOR! Meu nome é ${formData.name}. Gostaria de falar sobre um projeto.\nE-mail: ${formData.email}\n\nMensagem:\n${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5577999225120?text=${encodedText}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto border-t border-white/5">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-widest text-electricCyan font-bold">VAMOS CRIAR JUNTOS?</span>
          <h2 className="font-title text-4xl md:text-6xl font-bold tracking-tight">Vamos Impactar o Mercado.</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Seja para turbinar sua marca com motion design de ponta ou dominar o feed com artes imponentes, estou à disposição para elevar o nível da sua marca. Preencha ou chame direto no Zap!
          </p>
          <div className="flex flex-col gap-4 pt-4">
            <a href="https://wa.me/5577999225120" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-electricCyan duration-300">
              <Phone className="w-5 h-5 text-electricCyan" /> +55 (77) 99922-5120
            </a>
            <a href="https://instagram.com/gvitordesign" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-gray-300 hover:text-electricCyan duration-300">
              <MessageSquare className="w-5 h-5 text-magneticViolet" /> @gvitordesign
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white/[0.01] border border-white/5 shadow-neonGlow/10 flex flex-col gap-6">
          <div>
            <label className="text-xs uppercase font-extrabold text-gray-400 tracking-wider block mb-2">Seu Nome</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Digite seu nome"
              className="w-full bg-[#161616] border border-white/5 focus:border-electricCyan rounded-xl px-4 py-3.5 text-white outline-none transition-all duration-300"
            />
          </div>
          <div>
            <label className="text-xs uppercase font-extrabold text-gray-400 tracking-wider block mb-2">Seu E-mail</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="seu.email@exemplo.com"
              className="w-full bg-[#161616] border border-white/5 focus:border-electricCyan rounded-xl px-4 py-3.5 text-white outline-none transition-all duration-300"
            />
          </div>
          <div>
            <label className="text-xs uppercase font-extrabold text-gray-400 tracking-wider block mb-2">Mensagem/Briefing</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              placeholder="Descreva brevemente o seu projeto..."
              className="w-full bg-[#161616] border border-white/5 focus:border-electricCyan rounded-xl px-4 py-3.5 text-white outline-none transition-all duration-300 resize-none"
            />
          </div>
          <button type="submit" className="w-full py-4 rounded-xl bg-electricCyan text-black font-extrabold hover:shadow-neonCyan duration-300 transition-all flex items-center justify-center gap-2 cursor-pointer">
            <Send className="w-4 h-4 fill-black" /> Enviar Mensagem no WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
};
