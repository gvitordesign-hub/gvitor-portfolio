import { useEffect, useState } from 'react';

/**
 * Acompanha uma media query CSS. Seguro em ambientes sem matchMedia (ex.: testes),
 * onde devolve `fallback` (padrão: true).
 */
export const useMediaQuery = (query: string, fallback: boolean = true): boolean => {
  const get = () => (typeof window !== 'undefined' && window.matchMedia ? window.matchMedia(query).matches : fallback);
  const [matches, setMatches] = useState<boolean>(get);

  useEffect(() => {
    if (!window.matchMedia) return;
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);

  return matches;
};
