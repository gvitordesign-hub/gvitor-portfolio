import React, { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, ChevronLeft, ChevronRight, MessageCircle, Play, X } from 'lucide-react';
import type { MediaItem, Project } from '../../data/projects';
import { MediaViewer } from '../MediaViewer';
import { OptimizedImg } from '../OptimizedMedia';
import { Cover } from './cover';
import { categoryLabel } from '../../data/categories';
import { whatsappLink } from '../../config/contact';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { isVideoCover } from '../../utils/media';
import type { OriginRect } from './types';

const FOCUSABLE =
  'a[href], button:not([disabled]), input, select, textarea, video[controls], [tabindex]:not([tabindex="-1"])';
const FLY_MS = 800;
const FLY_TRANSITION = ['top', 'left', 'width', 'height']
  .map((prop) => `${prop} ${FLY_MS}ms cubic-bezier(0.76, 0, 0.24, 1)`)
  .join(', ');

const pad = (value: number) => String(value).padStart(2, '0');

const placeFly = (el: HTMLElement, r: OriginRect) => {
  el.style.top = `${r.top}px`;
  el.style.left = `${r.left}px`;
  el.style.width = `${r.width}px`;
  el.style.height = `${r.height}px`;
};

/** Onde está (na tela agora) o cartão deste projeto no carrossel, se estiver visível. */
const findCardRect = (id: string): OriginRect | null => {
  const card = Array.from(document.querySelectorAll<HTMLElement>('[data-project-card]')).find(
    (el) => el.dataset.projectCard === id,
  );
  if (!card) return null;
  const r = card.getBoundingClientRect();
  const visible = r.width > 0 && r.bottom > 0 && r.top < window.innerHeight && r.right > 0 && r.left < window.innerWidth;
  return visible ? { top: r.top, left: r.left, width: r.width, height: r.height } : null;
};

/** Miniatura de uma peça do projeto (imagem, ou capa do vídeo com o ícone de play). */
const PieceThumb: React.FC<{ item: MediaItem; index: number; total: number; active: boolean; onSelect: () => void }> = ({
  item,
  index,
  total,
  active,
  onSelect,
}) => {
  const still = item.type === 'image' ? item.url : item.thumbnail;
  return (
    <button
      type="button"
      data-thumb={index}
      onClick={onSelect}
      aria-label={`Ver peça ${index + 1} de ${total}${item.caption ? `: ${item.caption}` : ''}`}
      aria-current={active ? 'true' : undefined}
      className={`relative h-[4.5rem] w-14 shrink-0 cursor-pointer overflow-hidden bg-[#111] transition duration-300 sm:h-20 sm:w-16 ${
        active ? 'opacity-100 ring-2 ring-electricCyan' : 'opacity-50 hover:opacity-100'
      }`}
    >
      {still ? (
        <OptimizedImg src={still} width={300} alt="" loading="lazy" draggable={false} className="h-full w-full object-cover" />
      ) : (
        <span className="block h-full w-full bg-[radial-gradient(circle_at_25%_15%,rgba(171,32,255,0.6),transparent_60%),radial-gradient(circle_at_85%_90%,rgba(0,240,255,0.45),transparent_55%)]" />
      )}
      {item.type === 'video' && (
        <span className="absolute inset-0 flex items-center justify-center bg-black/35">
          <Play className="h-4 w-4 fill-white text-white" aria-hidden="true" />
        </span>
      )}
      <span className="absolute bottom-0 left-0 bg-black/75 px-1.5 py-0.5 font-mono text-[9px] tracking-widest text-gray-200">
        {pad(index + 1)}
      </span>
    </button>
  );
};

interface ProjectViewerProps {
  project: Project;
  nextProject: Project;
  /** Posição (1-based) do projeto na lista e total, para os contadores. */
  index: number;
  total: number;
  /** De onde o cartão "voa" ao abrir (null = abertura por link direto, só aparece). */
  originRect: OriginRect | null;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

/**
 * Visualizador imersivo do projeto, em tela cheia. A primeira tela já mostra o trabalho:
 * a peça principal grande, todas as peças em miniaturas logo abaixo e as informações ao lado,
 * sem precisar rolar. O cartão clicado "voa" até a peça principal ao abrir.
 *
 * Teclado: ←/→ trocam de peça (e seguem para o projeto vizinho nas pontas), ESC fecha.
 * Sem animação para quem reduz movimento.
 */
export const ProjectViewer: React.FC<ProjectViewerProps> = ({
  project,
  nextProject,
  index,
  total,
  originRect,
  onClose,
  onNext,
  onPrev,
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const mediaWrapRef = useRef<HTMLDivElement>(null);
  const thumbsRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<HTMLElement | null>(null);
  const flyRef = useRef<HTMLDivElement>(null);
  const closingRef = useRef(false);
  const timersRef = useRef<number[]>([]);
  const swipeRef = useRef<{ x: number; y: number } | null>(null);

  // Sem matchMedia (testes) conta como "reduzir movimento": tudo abre e fecha na hora.
  const reduced = useMediaQuery('(prefers-reduced-motion: reduce)', true);
  const [flyIn] = useState(() => Boolean(originRect) && !reduced);
  const [mediaHidden, setMediaHidden] = useState(flyIn);

  // Peça em exibição; volta para a primeira ao trocar de projeto.
  const [piece, setPiece] = useState(0);
  const [pieceFor, setPieceFor] = useState(project.id);
  if (pieceFor !== project.id) {
    setPieceFor(project.id);
    setPiece(0);
  }
  const count = project.media.length;
  const current: MediaItem | undefined = project.media[piece];

  const titleId = `viewer-title-${project.id}`;
  const nextIndex = index >= total ? 1 : index + 1;

  const setFrame = useCallback((el: HTMLElement | null) => {
    frameRef.current = el;
  }, []);

  // ── Abertura: o cartão clicado "voa" até a peça principal ──
  useLayoutEffect(() => {
    if (!flyIn || !originRect) return;
    const fly = flyRef.current;
    if (!fly) return;

    fly.style.transition = 'none';
    fly.style.display = 'block';
    placeFly(fly, originRect);
    void fly.offsetWidth; // força o layout antes de iniciar a transição

    let timer = 0;
    const raf = requestAnimationFrame(() => {
      // O destino é medido só agora, com o layout já assentado (barra de rolagem, fontes).
      const to = frameRef.current?.getBoundingClientRect();
      if (!to || to.width < 8 || to.height < 8) {
        fly.style.display = 'none';
        setMediaHidden(false);
        return;
      }
      fly.style.transition = FLY_TRANSITION;
      placeFly(fly, to);
      timer = window.setTimeout(() => {
        fly.style.display = 'none';
        setMediaHidden(false);
      }, FLY_MS + 40);
    });

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(timer);
      fly.style.display = 'none';
    };
  }, [flyIn, originRect]);

  // ── Fechamento: a peça volta para o cartão de origem (se ele ainda estiver à vista) ──
  const requestClose = useCallback(() => {
    if (closingRef.current) return;
    closingRef.current = true;
    const root = rootRef.current;
    if (reduced || !root) {
      onClose();
      return;
    }

    root.dataset.closing = 'true';
    const target = findCardRect(project.id);
    const frame = frameRef.current;
    const fly = flyRef.current;
    const from = frame?.getBoundingClientRect();

    // A camada que voa mostra a capa; só combina com a primeira peça (que é a própria capa).
    if (target && fly && from && from.width > 8 && piece === 0) {
      fly.style.transition = 'none';
      fly.style.display = 'block';
      placeFly(fly, from);
      if (mediaWrapRef.current) mediaWrapRef.current.style.visibility = 'hidden';
      void fly.offsetWidth;
      fly.style.transition = FLY_TRANSITION;
      placeFly(fly, target);
      timersRef.current.push(window.setTimeout(onClose, FLY_MS));
    } else {
      timersRef.current.push(window.setTimeout(onClose, 380));
    }
  }, [reduced, onClose, project.id, piece]);

  // Peça anterior/seguinte; nas pontas segue para o projeto vizinho.
  const goPiece = useCallback(
    (delta: 1 | -1) => {
      const next = piece + delta;
      if (next >= count) onNext();
      else if (next < 0) onPrev();
      else setPiece(next);
    },
    [piece, count, onNext, onPrev],
  );

  // Handlers sempre atualizados, sem reinscrever listeners a cada render.
  const handlers = useRef({ requestClose, goPiece });
  useEffect(() => {
    handlers.current = { requestClose, goPiece };
  });

  // Teclado: ESC fecha, setas trocam de peça, Tab fica preso dentro do visualizador.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target instanceof HTMLElement ? e.target : null;
      const typing = target?.tagName === 'VIDEO' || target?.tagName === 'INPUT' || target?.tagName === 'TEXTAREA';
      if (e.key === 'Escape') handlers.current.requestClose();
      else if (e.key === 'ArrowRight' && !typing) handlers.current.goPiece(1);
      else if (e.key === 'ArrowLeft' && !typing) handlers.current.goPiece(-1);
      else if (e.key === 'Tab' && rootRef.current) {
        const all = Array.from(rootRef.current.querySelectorAll<HTMLElement>(FOCUSABLE)).filter(
          (el) => el.offsetParent !== null || el === document.activeElement || getComputedStyle(el).position === 'fixed',
        );
        if (all.length === 0) return;
        const first = all[0];
        const last = all[all.length - 1];
        const active = document.activeElement as HTMLElement | null;
        if (e.shiftKey && (active === first || !all.includes(active as HTMLElement))) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && (active === last || !all.includes(active as HTMLElement))) {
          e.preventDefault();
          first.focus();
        }
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  // Foco entra ao abrir e volta ao elemento de origem ao fechar; trava a rolagem da página.
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeBtnRef.current?.focus({ preventScroll: true });
    const timers = timersRef.current;
    return () => {
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.({ preventScroll: true });
      timers.forEach((id) => window.clearTimeout(id));
    };
  }, []);

  // Trocar de projeto volta ao topo (no celular, onde o conteúdo rola).
  useEffect(() => {
    rootRef.current?.scrollTo?.({ top: 0 });
  }, [project.id]);

  // A miniatura ativa fica centralizada na fileira (sem mexer na rolagem da página).
  useEffect(() => {
    const box = thumbsRef.current;
    const thumb = box?.querySelector<HTMLElement>(`[data-thumb="${piece}"]`);
    if (!box || !thumb) return;
    box.scrollTo?.({ left: thumb.offsetLeft - box.clientWidth / 2 + thumb.clientWidth / 2, behavior: reduced ? 'auto' : 'smooth' });
  }, [piece, project.id, reduced]);

  // Deslizar o dedo para os lados troca de peça (a rolagem vertical continua livre).
  const onStagePointerDown = (e: React.PointerEvent) => {
    swipeRef.current = e.pointerType === 'touch' ? { x: e.clientX, y: e.clientY } : null;
  };
  const onStagePointerUp = (e: React.PointerEvent) => {
    const start = swipeRef.current;
    swipeRef.current = null;
    if (!start) return;
    const dx = e.clientX - start.x;
    const dy = e.clientY - start.y;
    if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy) * 1.5) return;
    setPiece((p) => Math.min(count - 1, Math.max(0, p + (dx < 0 ? 1 : -1))));
  };

  const roundBtn =
    'flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white backdrop-blur-md transition-colors hover:border-electricCyan hover:bg-electricCyan hover:text-black disabled:cursor-default disabled:opacity-25 disabled:hover:border-white/20 disabled:hover:bg-black/40 disabled:hover:text-white cursor-pointer';

  return (
    <div
      ref={rootRef}
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      tabIndex={-1}
      className="viewer-root fixed inset-0 z-[70] overflow-y-auto overflow-x-hidden text-gray-100 outline-none lg:overflow-hidden"
    >
      <div aria-hidden="true" className="viewer-backdrop fixed inset-0 bg-darkBg" />

      {/* Fundo: a capa desfocada */}
      <div aria-hidden="true" key={`ambient-${project.id}`} className="viewer-ambient pointer-events-none fixed inset-0 overflow-hidden opacity-45">
        {isVideoCover(project.heroImage) ? (
          <div className="h-full w-full bg-[radial-gradient(circle_at_25%_15%,rgba(171,32,255,0.55),transparent_60%),radial-gradient(circle_at_85%_90%,rgba(0,240,255,0.4),transparent_55%)]" />
        ) : (
          <OptimizedImg src={project.heroImage} width={600} alt="" className="h-full w-full scale-125 object-cover blur-[70px] saturate-150" />
        )}
      </div>

      {/* Barra superior */}
      <div className="viewer-chrome fixed inset-x-0 top-0 z-30 flex h-16 items-center justify-between bg-gradient-to-b from-darkBg/90 to-transparent px-4 sm:h-20 sm:px-8">
        <div className="flex items-center gap-4">
          <button ref={closeBtnRef} type="button" onClick={requestClose} aria-label="Fechar projeto" className={roundBtn}>
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
          <span className="font-mono text-[11px] uppercase tracking-[0.18em] text-gray-300">
            Projeto <span className="text-electricCyan">{pad(index)}</span> / {pad(total)}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button type="button" onClick={onPrev} aria-label="Projeto anterior" className={roundBtn}>
            <ArrowLeft className="h-5 w-5" aria-hidden="true" />
          </button>
          <button type="button" onClick={onNext} aria-label="Próximo projeto" className={roundBtn}>
            <ArrowRight className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Camada que "voa" do cartão até a peça principal (e de volta ao fechar) */}
      <div
        ref={flyRef}
        aria-hidden="true"
        className="pointer-events-none fixed z-[75] overflow-hidden bg-[#111] shadow-[0_40px_100px_rgba(0,0,0,0.7)]"
        style={{ display: 'none' }}
      >
        <Cover project={project} width={900} playing />
      </div>

      <div className="relative z-10 pt-16 sm:pt-20 lg:grid lg:h-full lg:grid-cols-[minmax(0,1fr)_27rem] xl:grid-cols-[minmax(0,1fr)_31rem]">
        {/* ── Peças do projeto ── */}
        <section aria-label="Peças do projeto" className="viewer-content flex min-w-0 flex-col lg:min-h-0">
          <div
            aria-live="polite"
            className="flex items-start justify-between gap-6 px-5 pt-3 font-mono text-[10px] uppercase tracking-[0.18em] text-gray-400 sm:px-8 sm:text-[11px]"
          >
            <span data-testid="piece-counter" className="shrink-0 text-gray-500">
              <span className="text-electricCyan">{pad(Math.min(piece + 1, Math.max(count, 1)))}</span> / {pad(count)}
            </span>
            {current?.caption && <span className="max-w-[70%] text-right leading-relaxed">{current.caption}</span>}
          </div>

          <div
            onPointerDown={onStagePointerDown}
            onPointerUp={onStagePointerUp}
            className="relative flex min-h-[calc(var(--stage-h)+2rem)] flex-1 items-center justify-center px-5 py-4 sm:px-8 lg:min-h-0"
            style={{ touchAction: 'pan-y' }}
          >
            <div
              key={`${project.id}-${piece}`}
              ref={mediaWrapRef}
              className="stage-swap flex max-w-full items-center justify-center"
              style={{ visibility: mediaHidden ? 'hidden' : undefined }}
            >
              {current ? (
                <MediaViewer media={current} stage hideCaption frameRef={setFrame} />
              ) : (
                <div ref={setFrame} className="aspect-[4/5] h-[var(--stage-h)] max-w-full overflow-hidden bg-[#111]">
                  <Cover project={project} width={900} playing eager />
                </div>
              )}
            </div>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => setPiece((p) => Math.max(0, p - 1))}
                  disabled={piece === 0}
                  aria-label="Peça anterior"
                  className={`${roundBtn} absolute left-2 top-1/2 -translate-y-1/2 sm:left-5`}
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden="true" />
                </button>
                <button
                  type="button"
                  onClick={() => setPiece((p) => Math.min(count - 1, p + 1))}
                  disabled={piece >= count - 1}
                  aria-label="Próxima peça"
                  className={`${roundBtn} absolute right-2 top-1/2 -translate-y-1/2 sm:right-5`}
                >
                  <ChevronRight className="h-5 w-5" aria-hidden="true" />
                </button>
              </>
            )}
          </div>

          {count > 1 && (
            <div ref={thumbsRef} className="flex gap-3 overflow-x-auto px-5 pb-5 pt-1 scrollbar-none sm:px-8">
              {project.media.map((item, i) => (
                <PieceThumb key={`${project.id}-${i}`} item={item} index={i} total={count} active={i === piece} onSelect={() => setPiece(i)} />
              ))}
            </div>
          )}
        </section>

        {/* ── Informações do projeto ── */}
        <aside
          key={`info-${project.id}`}
          className="viewer-content min-w-0 border-t border-white/10 bg-darkBg/60 px-5 py-8 backdrop-blur-xl sm:px-8 lg:min-h-0 lg:overflow-y-auto lg:border-l lg:border-t-0"
        >
          <p className="viewer-rise font-mono text-[11px] uppercase tracking-[0.18em] text-electricCyan" style={{ '--d': '0.35s' } as React.CSSProperties}>
            {categoryLabel(project.category)}
          </p>

          <h2
            id={titleId}
            className="viewer-rise mt-3 font-title text-[clamp(1.7rem,2.6vw,2.7rem)] font-extrabold uppercase leading-[1] tracking-[-0.01em]"
            style={{ '--d': '0.42s' } as React.CSSProperties}
          >
            {project.title}
          </h2>

          <dl
            className="viewer-rise mt-6 grid grid-cols-3 border-y border-white/10 font-mono text-[10px] uppercase tracking-[0.16em]"
            style={{ '--d': '0.5s' } as React.CSSProperties}
          >
            {[
              { label: 'Cliente', value: project.client },
              { label: 'Ano', value: project.year },
              { label: 'Peças', value: pad(count) },
            ].map((meta, i) => (
              <div key={meta.label} className={`min-w-0 py-3.5 ${i > 0 ? 'border-l border-white/10 pl-3' : ''}`}>
                <dt className="text-gray-500">{meta.label}</dt>
                <dd className="mt-1 truncate text-white" title={meta.value}>
                  {meta.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="viewer-rise mt-7 space-y-6" style={{ '--d': '0.58s' } as React.CSSProperties}>
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-electricCyan">O DESAFIO (BRIEFING)</p>
              <p className="text-sm leading-relaxed text-gray-300">{project.challenge}</p>
            </div>
            <div>
              <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.18em] text-magneticViolet">A SOLUÇÃO CRIATIVA</p>
              <p className="text-sm leading-relaxed text-gray-300">{project.solution}</p>
            </div>
          </div>

          <a
            href={whatsappLink(`Olá, vi o projeto "${project.title}" no seu portfólio e gostaria de um orçamento para algo parecido.`)}
            target="_blank"
            rel="noopener noreferrer"
            className="mono-label viewer-rise mt-8 inline-flex min-h-[52px] w-full items-center justify-center gap-2.5 rounded-full bg-electricCyan px-6 py-3.5 font-bold text-black transition-colors hover:bg-white"
            style={{ '--d': '0.66s' } as React.CSSProperties}
          >
            <MessageCircle className="h-4 w-4" aria-hidden="true" /> Quero um projeto assim
          </a>

          {nextProject.id !== project.id && (
            <button
              type="button"
              onClick={onNext}
              aria-label={`Próximo projeto: ${nextProject.title}`}
              className="group mt-8 flex w-full cursor-pointer items-center gap-4 border-t border-white/10 pt-6 text-left"
            >
              <span className="relative h-20 w-16 shrink-0 overflow-hidden bg-[#111]">
                <Cover project={nextProject} width={300} />
              </span>
              <span className="min-w-0 flex-1">
                <span className="mb-1.5 flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-electricCyan">
                  Próximo · {pad(nextIndex)} / {pad(total)}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1.5" aria-hidden="true" />
                </span>
                <span className="line-clamp-2 font-title text-lg font-extrabold uppercase leading-tight transition-colors group-hover:text-electricCyan">
                  {nextProject.title}
                </span>
              </span>
            </button>
          )}
        </aside>
      </div>
    </div>
  );
};
