import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import profileImg from '../../assets/profile.jpg';
import { useProjects } from '../../context/ProjectContext';
import { useInView } from '../../hooks/useInView';

const SERVICES = [
  {
    title: 'Key Visual & Campanhas de Eventos',
    desc: 'Desenvolvimento de identidades visuais de marca estáticas de altíssimo impacto, cronogramas estratégicos de anúncios de turnês, agendas completas de shows e criativos focados em impulsionar vendas rápidas de ingressos.',
  },
  {
    title: 'Rollout & Lançamentos Musicais',
    desc: 'Direção artística completa de capas de álbuns e singles de alto padrão, identidades visuais estáticas exclusivas e motion designs sincronizados com o BPM para campanhas de turnês e otimização para plataformas de streaming.',
  },
  {
    title: 'Motion Graphics & Stage Visuals',
    desc: 'Teasers cinematográficos de altíssima retenção otimizados para Reels/TikTok, aberturas monumentais e line-ups para festivais de grande porte e loops e backdrops hipnóticos para palcos físicos em telas de LED.',
  },
];

type Word = { t: string; accent?: boolean };

/** Frase que aparece palavra por palavra quando entra na tela. */
const WordReveal: React.FC<{ words: Word[]; className?: string }> = ({ words, className }) => {
  const [ref, inView] = useInView<HTMLHeadingElement>(0.35);
  const label = words.map((w) => w.t).join(' ');
  return (
    <h2 ref={ref} aria-label={label} className={`${className ?? ''} ${inView ? 'is-in' : ''}`}>
      {words.map((word, i) => (
        <React.Fragment key={i}>
          <span
            aria-hidden="true"
            className={`reveal-word ${word.accent ? 'text-electricCyan' : ''}`}
            style={{ '--d': `${i * 0.06}s` } as React.CSSProperties}
          >
            {word.t}
          </span>{' '}
        </React.Fragment>
      ))}
    </h2>
  );
};

/** Foto em preto e branco; sob o mouse, uma "lupa" revela a versão colorida. */
const LensPhoto: React.FC = () => {
  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty('--lx', `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty('--ly', `${e.clientY - rect.top}px`);
  };

  return (
    <div
      onPointerMove={onMove}
      data-cursor=""
      className="lens relative aspect-[4/5] w-full max-w-md overflow-hidden bg-darkCard border border-white/10"
    >
      <img src={profileImg} alt="Gonçalo Vitor" className="absolute inset-0 w-full h-full object-cover object-top grayscale contrast-110" />
      <img
        src={profileImg}
        alt=""
        aria-hidden="true"
        className="lens-top absolute inset-0 w-full h-full object-cover object-top"
      />
      <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent flex items-end justify-between mono-label">
        <span className="text-white">Gonçalo Vitor</span>
        <span className="text-electricCyan">Diretor de Arte</span>
      </div>
    </div>
  );
};

export const StudioAbout: React.FC = () => {
  const { projects } = useProjects();
  const [open, setOpen] = useState(0);
  const [statsRef, statsIn] = useInView<HTMLDListElement>(0.3);

  const stats = [
    { value: '10+', label: 'anos no showbusiness' },
    { value: String(projects.length).padStart(2, '0'), label: 'projetos no portfólio' },
    { value: '03', label: 'frentes de atuação' },
  ];

  return (
    <section id="about" className="relative px-5 sm:px-10 py-24 sm:py-40 border-t border-white/10">
      <p className="mono-label text-electricCyan mb-10 sm:mb-16">(02) Sobre</p>

      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28 space-y-4">
            <LensPhoto />
            <p className="mono-label text-gray-600 hidden [@media(hover:hover)]:block">Passe o mouse sobre a foto</p>
          </div>
        </div>

        <div className="lg:col-span-7 space-y-12 sm:space-y-16">
          <WordReveal
            className="font-title font-extrabold uppercase leading-[1.02] tracking-tight text-[clamp(2.2rem,5.4vw,5rem)]"
            words={[
              { t: 'O' },
              { t: 'designer' },
              { t: 'por' },
              { t: 'trás' },
              { t: 'dos' },
              { t: 'grandes', accent: true },
              { t: 'palcos.', accent: true },
            ]}
          />

          <div className="space-y-5 max-w-2xl text-gray-300 text-base sm:text-lg leading-relaxed">
            <p>
              Muito prazer, sou o <strong className="text-white font-semibold">Gonçalo Vitor</strong>! Nascido sob a energia de{' '}
              <strong className="text-white font-semibold">Livramento de Nossa Senhora, Bahia</strong>, com 31 anos de idade e mais de uma
              década de pura estrada como designer gráfico e diretor de arte no showbusiness. Traduzo a vibração da música e a potência dos
              palcos em peças visuais de alto impacto para reter a atenção e lotar eventos.
            </p>
            <p className="text-gray-400 text-base">
              O showbusiness não aceita o genérico. Numa indústria movida a ritmo e desejo, cada detalhe visual precisa traduzir a
              identidade do artista e converter em público presente. Crio identidades de turnês, lançamentos de singles e campanhas
              promocionais de alto padrão.
            </p>
          </div>

          <dl ref={statsRef} className={`reveal grid grid-cols-3 border-y border-white/10 ${statsIn ? 'is-in' : ''}`}>
            {stats.map((stat, i) => (
              <div key={stat.label} className={`flex flex-col py-6 sm:py-8 ${i > 0 ? 'pl-4 sm:pl-8 border-l border-white/10' : ''}`}>
                <dt className="mono-label text-gray-500 order-2 mt-2 leading-snug">{stat.label}</dt>
                <dd className="font-title font-extrabold text-[clamp(2rem,5vw,4.2rem)] leading-none text-white">{stat.value}</dd>
              </div>
            ))}
          </dl>

          {/* Serviços: acordeão */}
          <div>
            <p className="mono-label text-gray-500 mb-4">O que eu faço</p>
            <ul className="border-b border-white/10">
              {SERVICES.map((service, i) => {
                const isOpen = open === i;
                return (
                  <li key={service.title} className="border-t border-white/10">
                    <h3>
                      <button
                        type="button"
                        onClick={() => setOpen(isOpen ? -1 : i)}
                        aria-expanded={isOpen}
                        aria-controls={`servico-${i}`}
                        className="group w-full flex items-center gap-4 sm:gap-8 py-6 text-left cursor-pointer"
                      >
                        <span className="font-mono text-xs text-gray-500 group-hover:text-electricCyan transition-colors">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="flex-1 font-title text-xl sm:text-3xl font-extrabold uppercase leading-tight transition-colors group-hover:text-electricCyan">
                          {service.title}
                        </span>
                        <Plus
                          className={`w-6 h-6 shrink-0 text-gray-400 transition-transform duration-500 ${isOpen ? 'rotate-45 text-electricCyan' : ''}`}
                          aria-hidden="true"
                        />
                      </button>
                    </h3>
                    <div id={`servico-${i}`} role="region" aria-label={service.title} data-open={isOpen} className="acc-panel">
                      <div className="overflow-hidden">
                        <p className="pb-7 sm:pl-14 max-w-2xl text-gray-400 text-sm sm:text-base leading-relaxed">{service.desc}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};
