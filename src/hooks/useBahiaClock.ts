import { useEffect, useState } from 'react';

const format = () =>
  new Intl.DateTimeFormat('pt-BR', { hour: '2-digit', minute: '2-digit', timeZone: 'America/Bahia' }).format(new Date());

/** Hora atual na Bahia (HH:MM), atualizada a cada 20s. Mostra "--:--" até montar. */
export const useBahiaClock = (): string => {
  const [time, setTime] = useState('--:--');

  useEffect(() => {
    const tick = () => setTime(format());
    const first = window.setTimeout(tick, 0);
    const interval = window.setInterval(tick, 20000);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(interval);
    };
  }, []);

  return time;
};
