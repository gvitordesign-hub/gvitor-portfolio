import React, { useCallback, useEffect, useId, useRef, useState } from 'react';
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Project } from '../../data/projects';
import { categoryLabel } from '../../data/categories';
import { Cover } from './cover';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import type { SelectProject } from './types';

const pad = (value: number) => String(value).padStart(2, '0');

/** Rolagem horizontal arrastando com o mouse (no toque a rolagem nativa já funciona). */
const useDragScroll = (ref: React.RefObject<HTMLElement | null>) => {
  const moved = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let active = false;
    let pointerId = -1;
    let startX = 0;
    let startLeft = 0;

    const onMove = (e: PointerEvent) => {
      if (!active || e.pointerId !== pointerId) return;
      const dx = e.clientX - startX;
      moved.current = Math.max(moved.current, Math.abs(dx));
      if (moved.current > 6) el.setAttribute('data-dragging', 'true');
      el.scrollLeft = startLeft - dx;
    };
    const onUp = (e: PointerEvent) => {
      if (!active || e.pointerId !== pointerId) return;
      active = false;
      el.removeAttribute('data-dragging');
      el.removeAttribute('data-grabbing');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
    const onDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      active = true;
      pointerId = e.pointerId;
      startX = e.clientX;
      startLeft = el.scrollLeft;
      moved.current = 0;
      el.setAttribute('data-grabbing', 'true');
      window.addEventListener('pointermove', onMove);
      window.addEventListener('pointerup', onUp);
      window.addEventListener('pointercancel', onUp);
    };

    el.addEventListener('pointerdown', onDown);
    return () => {
      el.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      window.removeEventListener('pointercancel', onUp);
    };
  }, [ref]);

  return moved;
};

interface ProjectCardProps {
  project: Project;
  position: number;
  total: number;
  movedRef: React.RefObject<number>;
  onSelect: SelectProject;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, position, total, movedRef, onSelect }) => {
  const [hot, setHot] = useState(false);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if ((movedRef.current ?? 0) > 6) return; // foi um arrasto, não um clique
    const r = e.currentTarget.getBoundingClientRect();
    onSelect(project, { top: r.top, left: r.left, width: r.width, height: r.height });
  };

  return (
    <li className="relative shrink-0 snap-start w-[72vw] max-w-[340px] sm:w-[clamp(280px,24vw,420px)] sm:max-w-none hover:z-10 focus-within:z-10">
      <button
        type="button"
        data-cursor="Abrir"
        data-project-card={project.id}
        aria-label={`Abrir projeto: ${project.title}`}
        onClick={handleClick}
        onPointerEnter={() => setHot(true)}
        onPointerLeave={() => setHot(false)}
        className="pcard group relative block w-full aspect-[4/5] overflow-hidden bg-[#111] text-left cursor-pointer"
      >
        <Cover project={project} width={900} playing={hot} />

        <span aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black via-black/35 to-transparent" />

        <span className="absolute left-0 top-0 bg-black/75 px-2.5 py-1.5 font-mono text-[10px] font-bold tracking-widest text-electricCyan">
          {pad(position)}
          <span className="text-gray-500">/{pad(total)}</span>
        </span>

        <span className="absolute inset-x-0 bottom-0 flex flex-col gap-2 p-4 sm:p-5">
          <span className="pcard__more font-mono text-[10px] uppercase tracking-[0.16em] text-electricCyan">
            {categoryLabel(project.category)}
          </span>
          <span className="font-title text-lg sm:text-xl font-extrabold uppercase leading-[1.05] text-white line-clamp-3">
            {project.title}
          </span>
          <span className="pcard__more flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.16em] text-gray-300">
            <span className="truncate">
              {project.client} · {project.year}
            </span>
            <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-electricCyan px-3 py-1.5 font-bold text-black">
              Abrir <ArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </span>
          </span>
        </span>
      </button>
    </li>
  );
};

interface ProjectRowProps {
  title: string;
  projects: Project[];
  onSelect: SelectProject;
}

/** Uma fileira horizontal de cartões grandes (estilo catálogo de streaming). */
export const ProjectRow: React.FC<ProjectRowProps> = ({ title, projects, onSelect }) => {
  const headingId = useId();
  const scrollerRef = useRef<HTMLUListElement>(null);
  const movedRef = useDragScroll(scrollerRef);
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)', false);
  const [edges, setEdges] = useState({ start: true, end: false });

  const update = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    const next = { start: el.scrollLeft < 4, end: el.scrollLeft >= el.scrollWidth - el.clientWidth - 4 };
    setEdges((prev) => (prev.start === next.start && prev.end === next.end ? prev : next));
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    el.addEventListener('scroll', update, { passive: true });
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(update) : undefined;
    observer?.observe(el);
    const raf = requestAnimationFrame(update);
    return () => {
      el.removeEventListener('scroll', update);
      observer?.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [update]);

  const scrollBy = (direction: 1 | -1) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollBy({ left: direction * el.clientWidth * 0.85, behavior: reduced ? 'auto' : 'smooth' });
  };

  const fits = edges.start && edges.end;

  return (
    <section aria-labelledby={headingId} className="prow">
      <div className="mb-2 sm:mb-3 flex items-end justify-between gap-4 px-5 sm:px-10">
        <h3 id={headingId} className="font-title text-2xl sm:text-4xl font-extrabold uppercase leading-none tracking-tight">
          {title}
          <span className="ml-3 align-middle font-mono text-[11px] font-normal tracking-[0.18em] text-gray-500">{pad(projects.length)}</span>
        </h3>

        {!fits && (
          <div className="hidden sm:flex items-center gap-2">
            <button
              type="button"
              onClick={() => scrollBy(-1)}
              disabled={edges.start}
              aria-label={`Ver projetos anteriores de ${title}`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-black disabled:cursor-default disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" aria-hidden="true" />
            </button>
            <button
              type="button"
              onClick={() => scrollBy(1)}
              disabled={edges.end}
              aria-label={`Ver mais projetos de ${title}`}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-white/20 text-white transition-colors hover:bg-white hover:text-black disabled:cursor-default disabled:opacity-25 disabled:hover:bg-transparent disabled:hover:text-white"
            >
              <ChevronRight className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        )}
      </div>

      <ul
        ref={scrollerRef}
        data-cursor="Arraste"
        className="row-scroller flex gap-4 sm:gap-6 overflow-x-auto px-5 sm:px-10 py-8 scrollbar-none"
      >
        {projects.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            position={i + 1}
            total={projects.length}
            movedRef={movedRef}
            onSelect={onSelect}
          />
        ))}
      </ul>
    </section>
  );
};
