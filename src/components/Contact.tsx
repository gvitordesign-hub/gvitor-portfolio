import React from 'react';
import { Phone, MessageSquare, Send } from 'lucide-react';

export const Contact: React.FC = () => {
  const whatsappMessage = encodeURIComponent("Olá, gostaria de um orçamento");
  const whatsappUrl = `https://wa.me/5577999225120?text=${whatsappMessage}`;

  return (
    <section id="contact" className="py-24 px-6 max-w-4xl mx-auto border-t border-white/5">
      <div className="text-center space-y-8 p-12 md:p-16 rounded-3xl bg-white/[0.01] border border-white/5 shadow-neonGlow/5 backdrop-blur-sm relative overflow-hidden group">
        {/* Efeitos de luz de fundo (Glows sutis) */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-electricCyan/10 rounded-full blur-3xl group-hover:bg-electricCyan/15 transition-all duration-700 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-magneticViolet/10 rounded-full blur-3xl group-hover:bg-magneticViolet/15 transition-all duration-700 pointer-events-none" />

        <div className="space-y-4 relative z-10">
          <span className="text-xs uppercase tracking-widest text-electricCyan font-bold">VAMOS CRIAR JUNTOS?</span>
          <h2 className="font-title text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
            Vamos Impactar o Mercado.
          </h2>
          <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mx-auto">
            Seja para turbinar sua marca com motion design de ponta ou dominar o feed com artes imponentes, estou à disposição para elevar o nível do seu show. Clique abaixo para iniciar o seu briefing diretamente no WhatsApp!
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 relative z-10">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-full bg-electricCyan text-black font-extrabold hover:shadow-neonCyan duration-300 transition-all flex items-center justify-center gap-3 cursor-pointer hover:scale-105 active:scale-95"
          >
            <Send className="w-5 h-5 fill-black" />
            <span>Olá, gostaria de um orçamento</span>
          </a>

          <div className="flex flex-wrap items-center justify-center gap-8 pt-6 border-t border-white/5 w-full">
            <a
              href="https://wa.me/5577999225120"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-electricCyan duration-300 transition-colors"
            >
              <Phone className="w-4 h-4 text-electricCyan" />
              <span className="text-sm font-medium">+55 (77) 99922-5120</span>
            </a>
            <a
              href="https://instagram.com/gvitordesign"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-gray-400 hover:text-electricCyan duration-300 transition-colors"
            >
              <MessageSquare className="w-4 h-4 text-magneticViolet" />
              <span className="text-sm font-medium">@gvitordesign</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
