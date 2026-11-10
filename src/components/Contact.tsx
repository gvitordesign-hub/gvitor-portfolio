import React from 'react';
import { Phone, MessageSquare, Send } from 'lucide-react';
import { whatsappLink, PHONE_DISPLAY, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../config/contact';

export const Contact: React.FC = () => {
  const whatsappUrl = whatsappLink('Olá, gostaria de um orçamento');

  return (
    <section id="contact" className="py-16 sm:py-24 px-4 sm:px-6 max-w-4xl mx-auto border-t border-white/5">
      <div className="text-center space-y-6 sm:space-y-8 p-6 sm:p-12 md:p-16 rounded-3xl bg-white/[0.01] border border-white/5 shadow-neonGlow/5 backdrop-blur-sm relative overflow-hidden group">
        {/* Efeitos de luz de fundo (Glows sutis) */}
        <div className="absolute -top-24 -left-24 w-48 h-48 bg-electricCyan/10 rounded-full blur-3xl group-hover:bg-electricCyan/15 transition-all duration-700 pointer-events-none" />
        <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-magneticViolet/10 rounded-full blur-3xl group-hover:bg-magneticViolet/15 transition-all duration-700 pointer-events-none" />

        <div className="space-y-4 relative z-10">
          <span className="text-[11px] sm:text-xs uppercase tracking-widest text-electricCyan font-bold block mb-2">
            CONTATO DIRETO
          </span>
          <h2 className="font-title text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-white leading-tight">
            Vamos criar o seu próximo grande projeto?
          </h2>
          <p className="text-gray-300 text-sm sm:text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            Seja para criar uma identidade visual marcante para turnê ou elevar seus lançamentos musicais com motion design de alto nível. Fale direto comigo pelo WhatsApp:
          </p>
        </div>

        <div className="flex flex-col items-center gap-6 relative z-10 pt-2 sm:pt-4 w-full">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 sm:px-10 py-3.5 sm:py-4 rounded-full bg-electricCyan text-black font-extrabold shadow-[0_10px_30px_rgba(0,240,255,0.3)] hover:bg-white duration-300 transition-all flex items-center justify-center gap-3 cursor-pointer hover:scale-105 active:scale-95 text-sm sm:text-base min-h-[48px]"
          >
            <Send className="w-4 h-4 sm:w-5 sm:h-5 fill-black shrink-0" />
            <span>Iniciar Atendimento no WhatsApp</span>
          </a>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-8 pt-4 sm:pt-6 border-t border-white/5 w-full">
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Chamar no WhatsApp ${PHONE_DISPLAY} (abre em nova aba)`}
              className="flex items-center gap-2 text-gray-400 hover:text-electricCyan duration-300 transition-colors py-1"
            >
              <Phone className="w-4 h-4 text-electricCyan shrink-0" />
              <span className="text-sm font-medium">{PHONE_DISPLAY}</span>
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`Acessar perfil no Instagram @${INSTAGRAM_HANDLE} (abre em nova aba)`}
              className="flex items-center gap-2 text-gray-400 hover:text-electricCyan duration-300 transition-colors py-1"
            >
              <MessageSquare className="w-4 h-4 text-magneticViolet shrink-0" />
              <span className="text-sm font-medium">@{INSTAGRAM_HANDLE}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
