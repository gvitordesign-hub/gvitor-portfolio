import React, { useRef } from 'react';
import { ArrowUp, ArrowUpRight, MessageCircle } from 'lucide-react';
import { whatsappLink, PHONE_DISPLAY, INSTAGRAM_URL, INSTAGRAM_HANDLE } from '../../config/contact';
import { useBahiaClock } from '../../hooks/useBahiaClock';

/** Botão redondo que é atraído pelo mouse quando ele chega perto. */
const MagneticButton: React.FC = () => {
  const wrapRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLAnchorElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const wrap = wrapRef.current;
    const inner = innerRef.current;
    if (!wrap || !inner || e.pointerType === 'touch') return;
    const rect = wrap.getBoundingClientRect();
    const dx = e.clientX - (rect.left + rect.width / 2);
    const dy = e.clientY - (rect.top + rect.height / 2);
    inner.style.transform = `translate(${dx * 0.35}px, ${dy * 0.35}px)`;
  };
  const onLeave = () => {
    if (innerRef.current) innerRef.current.style.transform = '';
  };

  return (
    <div
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative flex items-center justify-center w-[17rem] h-[17rem] sm:w-[22rem] sm:h-[22rem] mx-auto lg:mx-0 lg:ml-auto"
    >
      <a
        ref={innerRef}
        href={whatsappLink('Olá, gostaria de um orçamento')}
        target="_blank"
        rel="noopener noreferrer"
        data-cursor="Chamar"
        className="magnetic-inner group flex flex-col items-center justify-center gap-3 w-52 h-52 sm:w-64 sm:h-64 rounded-full bg-electricCyan text-black font-title font-extrabold uppercase text-center leading-tight hover:bg-white transition-colors duration-300"
      >
        <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10" aria-hidden="true" />
        <span className="text-lg sm:text-xl">
          Chamar no
          <br />
          WhatsApp
        </span>
        <ArrowUpRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" aria-hidden="true" />
      </a>
    </div>
  );
};

export const StudioContact: React.FC = () => {
  const clock = useBahiaClock();

  return (
    <>
      <section id="contact" className="relative overflow-hidden px-5 sm:px-10 pt-24 sm:pt-40 pb-16 border-t border-white/10">
        <div
          aria-hidden="true"
          className="absolute -right-40 top-10 w-[34rem] h-[34rem] rounded-full bg-magneticViolet/15 blur-[140px] pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -left-40 bottom-0 w-[30rem] h-[30rem] rounded-full bg-electricCyan/10 blur-[140px] pointer-events-none"
        />

        <p className="relative mono-label text-electricCyan mb-10 sm:mb-16">(03) Contato</p>

        <h2 className="relative font-title font-extrabold uppercase leading-[0.9] tracking-[-0.02em] text-[clamp(2.4rem,6.8vw,9.5rem)]">
          Vamos criar
          <br />
          <span className="text-outline">algo grande?</span>
        </h2>

        <div className="relative mt-14 sm:mt-20 grid lg:grid-cols-2 gap-14 items-center">
          <div className="space-y-10 max-w-xl">
            <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
              Seja para criar uma identidade visual marcante para turnê ou elevar seus lançamentos musicais com motion design de alto nível.
              Fale direto comigo pelo WhatsApp — sem formulário, sem espera.
            </p>

            <ul className="border-t border-white/10">
              <li>
                <a
                  href={whatsappLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Chamar no WhatsApp ${PHONE_DISPLAY} (abre em nova aba)`}
                  className="group flex items-center justify-between gap-4 py-5 border-b border-white/10 hover:text-electricCyan transition-colors"
                >
                  <span className="mono-label text-gray-500 group-hover:text-electricCyan transition-colors">WhatsApp</span>
                  <span className="font-title text-xl sm:text-2xl font-bold">{PHONE_DISPLAY}</span>
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Acessar perfil no Instagram @${INSTAGRAM_HANDLE} (abre em nova aba)`}
                  className="group flex items-center justify-between gap-4 py-5 border-b border-white/10 hover:text-electricCyan transition-colors"
                >
                  <span className="mono-label text-gray-500 group-hover:text-electricCyan transition-colors">Instagram</span>
                  <span className="font-title text-xl sm:text-2xl font-bold">@{INSTAGRAM_HANDLE}</span>
                </a>
              </li>
              <li className="flex items-center justify-between gap-4 py-5 border-b border-white/10">
                <span className="mono-label text-gray-500">Base</span>
                <span className="font-title text-xl sm:text-2xl font-bold">Livramento de N. Sra. — BA</span>
              </li>
            </ul>
          </div>

          <MagneticButton />
        </div>
      </section>

      <footer className="px-5 sm:px-10 py-8 border-t border-white/10 flex flex-wrap items-center justify-between gap-4 mono-label text-gray-500">
        <span>© {new Date().getFullYear()} GVITOR Design — todos os direitos reservados</span>
        <span className="tabular-nums">
          Bahia · {clock}
        </span>
        <a href="#top" className="inline-flex items-center gap-2 text-white hover:text-electricCyan transition-colors">
          Voltar ao topo <ArrowUp className="w-3.5 h-3.5" aria-hidden="true" />
        </a>
      </footer>
    </>
  );
};
