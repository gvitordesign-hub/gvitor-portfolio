import React, { useEffect, useRef } from 'react';
import { useMediaQuery } from '../../hooks/useMediaQuery';

/**
 * Cursor customizado: um disco que acompanha o mouse com suavidade e mostra o rótulo do
 * elemento sob ele (atributo `data-cursor="Ver"`). Fora desses elementos some, e o cursor
 * nativo continua normal. Só existe com mouse e sem "reduzir movimento".
 */
const CursorRing: React.FC = () => {
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    const label = labelRef.current;
    if (!ring || !label) return;

    document.documentElement.classList.add('cursor-on');

    let tx = -200;
    let ty = -200;
    let x = tx;
    let y = ty;
    let raf = 0;

    const loop = () => {
      x += (tx - x) * 0.2;
      y += (ty - y) * 0.2;
      ring.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      raf = Math.abs(tx - x) > 0.1 || Math.abs(ty - y) > 0.1 ? requestAnimationFrame(loop) : 0;
    };
    const kick = () => {
      if (!raf) raf = requestAnimationFrame(loop);
    };

    const setFrom = (target: EventTarget | null) => {
      const el = target instanceof Element ? target.closest('[data-cursor]') : null;
      if (!el) {
        ring.dataset.state = 'hidden';
        return;
      }
      const text = el.getAttribute('data-cursor') ?? '';
      label.textContent = text;
      ring.dataset.state = text ? 'label' : 'dot';
    };

    const onMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      tx = e.clientX;
      ty = e.clientY;
      kick();
    };
    const onOver = (e: PointerEvent) => {
      if (e.pointerType !== 'touch') setFrom(e.target);
    };
    const onDown = () => (ring.dataset.pressed = 'true');
    const onUp = () => (ring.dataset.pressed = 'false');
    const onLeave = () => (ring.dataset.state = 'hidden');

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerover', onOver, { passive: true });
    window.addEventListener('pointerdown', onDown, { passive: true });
    window.addEventListener('pointerup', onUp, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);

    return () => {
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove('cursor-on');
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerover', onOver);
      window.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointerup', onUp);
      document.documentElement.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <div ref={ringRef} className="cursor-ring" data-state="hidden" data-pressed="false" aria-hidden="true">
      <div className="cursor-ring__bg">
        <span ref={labelRef} />
      </div>
    </div>
  );
};

export const Cursor: React.FC = () => {
  const enabled = useMediaQuery('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', false);
  return enabled ? <CursorRing /> : null;
};
