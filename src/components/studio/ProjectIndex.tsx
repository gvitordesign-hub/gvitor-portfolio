import React, { useEffect, useRef, useState } from 'react';
import { ArrowUpRight } from 'lucide-react';
import type { Project } from '../../data/projects';
import { categoryLabel } from '../../data/categories';
import { Cover } from './cover';
import type { SelectProject } from './types';

const pad = (value: number) => String(value).padStart(2, '0');

interface ProjectIndexProps {
  projects: Project[];
  onSelect: SelectProject;
}

/**
 * Visão em lista: títulos grandes e, ao passar o mouse, uma prévia da capa que segue o cursor
 * com atraso e inclina conforme a velocidade. No toque, cada linha mostra uma miniatura.
 * É também a alternativa totalmente acessível (teclado/leitor de tela) à mesa arrastável.
 */
export const ProjectIndex: React.FC<ProjectIndexProps> = ({ projects, onSelect }) => {
  const listRef = useRef<HTMLUListElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const list = listRef.current;
    const preview = previewRef.current;
    if (!list || !preview) return;
    if (typeof window.matchMedia === 'function' && !window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    let tx = 0;
    let ty = 0;
    let x = 0;
    let y = 0;
    let rot = 0;
    let raf = 0;

    const loop = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      const lean = Math.max(-14, Math.min(14, (tx - x) * 0.06));
      rot += (lean - rot) * 0.2;
      preview.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) rotate(${rot}deg)`;
      raf = Math.abs(tx - x) > 0.2 || Math.abs(ty - y) > 0.2 || Math.abs(rot) > 0.1 ? requestAnimationFrame(loop) : 0;
    };

    const onMove = (e: PointerEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!raf) raf = requestAnimationFrame(loop);
    };
    list.addEventListener('pointermove', onMove);
    return () => {
      cancelAnimationFrame(raf);
      list.removeEventListener('pointermove', onMove);
    };
  }, []);

  if (projects.length === 0) return null;

  return (
    <div className="px-5 sm:px-10">
      <ul
        ref={listRef}
        className="index-list border-b border-white/10"
        onPointerLeave={() => setActiveId(null)}
        aria-label="Lista de projetos"
      >
        {projects.map((project, i) => (
          <li key={project.id}>
            <button
              type="button"
              data-cursor=""
              onClick={(e) =>
                // Sem cartão de origem: a abertura parte de um ponto ao redor do clique.
                onSelect(project, { top: e.clientY - 100, left: e.clientX - 80, width: 160, height: 200 })
              }
              onPointerEnter={() => setActiveId(project.id)}
              onFocus={() => setActiveId(project.id)}
              onBlur={() => setActiveId(null)}
              aria-label={`Abrir projeto: ${project.title}`}
              className="index-row group w-full grid grid-cols-[2.2rem_1fr_auto] md:grid-cols-[4.5rem_1fr_15rem_5rem_3rem] items-center gap-3 sm:gap-6 py-5 md:py-7 border-t border-white/10 text-left cursor-pointer"
            >
              <span className="font-mono text-xs text-gray-500 group-hover:text-electricCyan transition-colors">{pad(i + 1)}</span>

              <span className="font-title font-extrabold uppercase leading-[1.02] tracking-tight text-[clamp(1.25rem,2.7vw,2.8rem)] text-white transition-all duration-500 group-hover:translate-x-3 group-hover:text-electricCyan">
                {project.title}
              </span>

              <span className="hidden md:block font-mono text-[11px] uppercase tracking-[0.14em] leading-relaxed text-gray-400">
                {project.client}
                <br />
                <span className="text-gray-600">{categoryLabel(project.category)}</span>
              </span>
              <span className="hidden md:block font-mono text-xs text-gray-400 tabular-nums">{project.year}</span>

              {/* Toque: sem hover, mostra miniatura. Mouse: seta. */}
              <span className="index-thumb relative w-14 h-14 sm:w-16 sm:h-16 overflow-hidden bg-[#111]">
                <Cover project={project} width={300} />
              </span>
              <ArrowUpRight
                className="hidden md:block w-6 h-6 text-gray-500 transition-all duration-300 group-hover:text-electricCyan group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </button>
          </li>
        ))}
      </ul>

      {/* Prévia flutuante (só com mouse) */}
      <div
        ref={previewRef}
        aria-hidden="true"
        className="index-preview pointer-events-none fixed left-0 top-0 z-40 w-[230px] lg:w-[280px] aspect-[4/5]"
      >
        <div
          className={`relative w-full h-full overflow-hidden bg-black shadow-[0_30px_80px_rgba(0,0,0,0.7)] transition-all duration-300 ${
            activeId ? 'opacity-100 scale-100' : 'opacity-0 scale-75'
          }`}
        >
          {projects.map((project) => (
            <div
              key={project.id}
              className={`absolute inset-0 transition-opacity duration-300 ${project.id === activeId ? 'opacity-100' : 'opacity-0'}`}
            >
              <Cover project={project} width={700} playing={project.id === activeId} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
