import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, MessageCircle } from 'lucide-react';
import { useProjects } from '../../context/ProjectContext';
import { OptimizedImg } from '../OptimizedMedia';
import { isVideoCover } from '../../utils/media';
import { whatsappLink } from '../../config/contact';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { useBahiaClock } from '../../hooks/useBahiaClock';

interface TrailItem {
  id: number;
  x: number;
  y: number;
  src: string;
  rot: number;
}

const MAX_TRAIL = 9;
const STEP = 120; // distância (px) que o mouse percorre antes de soltar outra capa

/** Quebra o texto em letras que reagem ao hover (o leitor de tela lê só o rótulo do título). */
const Letters: React.FC<{ text: string }> = ({ text }) => (
  <>
    {text.split('').map((char, i) =>
      char === ' ' ? (
        <span key={i}>&nbsp;</span>
      ) : (
        <span key={i} className="hl" aria-hidden="true">
          {char}
        </span>
      ),
    )}
  </>
);

export const StudioHero: React.FC = () => {
  const { projects } = useProjects();
  const clock = useBahiaClock();
  const fine = useMediaQuery('(hover: hover) and (pointer: fine)', false);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)', false);

  const stageRef = useRef<HTMLElement>(null);
  const [trail, setTrail] = useState<TrailItem[]>([]);
  const counter = useRef(0);
  const lastSpawn = useRef({ x: -999, y: -999 });

  // Só capas estáticas entram no rastro (vídeos pesariam).
  const stills = useMemo(() => projects.filter((p) => !isVideoCover(p.heroImage)), [projects]);

  const years = projects.map((p) => Number(p.year)).filter(Number.isFinite);
  const range = years.length ? `${Math.min(...years)}–${Math.max(...years)}` : '';

  const spawn = useCallback(
    (x: number, y: number) => {
      if (stills.length === 0) return;
      counter.current += 1;
      const id = counter.current;
      const item: TrailItem = {
        id,
        x,
        y,
        src: stills[id % stills.length].heroImage,
        rot: ((id * 37) % 21) - 10,
      };
      setTrail((t) => [...t.slice(-(MAX_TRAIL - 1)), item]);
    },
    [stills],
  );

  const onPointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const stage = stageRef.current;
    if (!stage || e.pointerType === 'touch') return;
    const rect = stage.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    stage.style.setProperty('--mx', `${x}px`);
    stage.style.setProperty('--my', `${y}px`);
    if (reduced) return;
    if (Math.hypot(x - lastSpawn.current.x, y - lastSpawn.current.y) > STEP) {
      lastSpawn.current = { x, y };
      spawn(x, y);
    }
  };

  // Sem mouse (celular/tablet): as capas aparecem sozinhas em posições variadas.
  useEffect(() => {
    if (fine || reduced || stills.length === 0) return;
    const interval = window.setInterval(() => {
      const stage = stageRef.current;
      if (!stage) return;
      const n = counter.current + 1;
      spawn(stage.clientWidth * (0.2 + ((n * 0.37) % 0.6)), stage.clientHeight * (0.18 + ((n * 0.23) % 0.34)));
    }, 1100);
    return () => window.clearInterval(interval);
  }, [fine, reduced, stills.length, spawn]);

  const removeItem = (id: number) => setTrail((t) => t.filter((item) => item.id !== id));

  return (
    <section
      id="top"
      ref={stageRef}
      onPointerMove={onPointerMove}
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden pt-24 sm:pt-28 pb-8 px-5 sm:px-10 bg-[radial-gradient(520px_circle_at_var(--mx,70%)_var(--my,35%),rgba(0,240,255,0.10),transparent_65%),radial-gradient(700px_circle_at_calc(var(--mx,70%)_*_0.6)_calc(var(--my,35%)_*_1.2),rgba(171,32,255,0.10),transparent_65%)]"
    >
      {/* Régua de colunas ao fundo */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none bg-[linear-gradient(to_right,rgba(255,255,255,0.045)_1px,transparent_1px)] bg-[size:25%_100%] [mask-image:linear-gradient(to_bottom,black,transparent_92%)]"
      />

      {/* Rastro de capas */}
      <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
        {trail.map((item) => (
          <OptimizedImg
            key={item.id}
            src={item.src}
            width={500}
            alt=""
            className="trail-item"
            style={{ left: item.x, top: item.y, '--rot': `${item.rot}deg` } as React.CSSProperties}
            onAnimationEnd={() => removeItem(item.id)}
          />
        ))}
      </div>

      {/* Linha de informações */}
      <div className="relative z-10 flex items-start justify-between gap-6 mono-label text-gray-400">
        <span>
          Portfólio <span className="text-white">{range}</span>
          <br />
          <span className="text-gray-500">{projects.length} projetos selecionados</span>
        </span>
        <span className="text-right">
          Livramento de N. Sra. · BA
          <br />
          <span className="text-white tabular-nums">{clock}</span> <span className="text-gray-500">GMT-3</span>
        </span>
      </div>

      {/* Título */}
      <h1
        aria-label="Direção de arte e motion para artistas e grandes eventos"
        className="relative z-10 font-title font-extrabold uppercase leading-[0.9] tracking-[-0.02em] whitespace-nowrap text-[clamp(2rem,10vw,11rem)] my-10"
      >
        <span className="line-mask" style={{ '--d': '0.05s' } as React.CSSProperties}>
          <span>
            <Letters text="Direção" />
          </span>
        </span>
        <span className="line-mask" style={{ '--d': '0.17s' } as React.CSSProperties}>
          <span>
            <span className="text-outline">
              <Letters text="de arte" />
            </span>
            <span className="ml-[0.2em] text-electricCyan text-[0.3em] align-super font-mono font-bold tracking-normal" aria-hidden="true">
              ✦
            </span>
          </span>
        </span>
        <span className="line-mask" style={{ '--d': '0.29s' } as React.CSSProperties}>
          <span>
            <Letters text="& Motion" />
          </span>
        </span>
      </h1>

      {/* Rodapé do hero */}
      <div className="relative z-10 flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div className="max-w-md space-y-6">
          <p className="text-gray-300 text-base sm:text-lg leading-relaxed">
            Identidades visuais, campanhas e lançamentos para <strong className="text-white">artistas</strong> e{' '}
            <strong className="text-white">grandes eventos</strong>. Mais de 10 anos traduzindo música em imagem.
          </p>
          <div className="flex flex-wrap items-center gap-3">
            <a
              href={whatsappLink('Olá, gostaria de um orçamento para direção criativa')}
              target="_blank"
              rel="noopener noreferrer"
              className="mono-label inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-electricCyan text-black font-bold hover:bg-white transition-colors min-h-[48px]"
            >
              <MessageCircle className="w-4 h-4" aria-hidden="true" /> Fazer orçamento
            </a>
            <a
              href="#portfolio"
              className="mono-label inline-flex items-center gap-2 px-6 py-3.5 rounded-full border border-white/20 text-white hover:border-white hover:bg-white/5 transition-colors min-h-[48px]"
            >
              Ver trabalhos <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        <a
          href="#portfolio"
          aria-label="Rolar para os trabalhos"
          className="hidden lg:flex mono-label items-center gap-3 text-gray-400 hover:text-white transition-colors"
        >
          {fine ? 'Mova o mouse, depois role' : 'Role para explorar'}
          <span className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center">
            <ArrowDown className="w-4 h-4 motion-safe:animate-bounce" aria-hidden="true" />
          </span>
        </a>
      </div>
    </section>
  );
};
