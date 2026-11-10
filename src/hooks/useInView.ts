import { useEffect, useRef, useState } from 'react';

/**
 * Devolve [ref, visivel]: `visivel` vira true (e fica) quando o elemento entra na tela.
 * Sem IntersectionObserver (ex.: testes) já nasce visível, para o conteúdo nunca ficar escondido.
 */
export const useInView = <T extends Element>(threshold: number = 0.2) => {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState<boolean>(() => typeof IntersectionObserver === 'undefined');

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof IntersectionObserver === 'undefined') return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, inView] as const;
};
