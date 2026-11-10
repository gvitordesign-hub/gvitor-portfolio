import React from 'react';

const WORDS = ['Key Visual', 'Lançamentos', 'Motion', 'Line-ups', 'Teasers', 'Capas de CD', 'Stage Visuals', 'Campanhas'];

/** Faixa decorativa com os serviços rolando em loop (pausa ao passar o mouse). */
export const Marquee: React.FC = () => {
  const row = WORDS.map((word, i) => (
    <span key={word} className="flex items-center shrink-0">
      <span
        className={`font-title text-4xl sm:text-6xl font-extrabold uppercase px-6 sm:px-10 ${
          i % 2 === 0 ? 'text-white' : 'text-outline'
        }`}
      >
        {word}
      </span>
      <span className="text-electricCyan text-2xl sm:text-4xl" aria-hidden="true">
        ✦
      </span>
    </span>
  ));

  return (
    <div aria-hidden="true" className="marquee-pause border-y border-white/10 py-5 sm:py-7 overflow-hidden select-none">
      <div className="marquee-track">
        <div className="flex shrink-0">{row}</div>
        <div className="flex shrink-0">{row}</div>
      </div>
    </div>
  );
};
