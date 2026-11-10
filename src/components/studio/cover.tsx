import React from 'react';
import { Play } from 'lucide-react';
import type { Project } from '../../data/projects';
import { OptimizedImg, OptimizedVideo } from '../OptimizedMedia';
import { isVideoCover } from '../../utils/media';

interface CoverProps {
  project: Project;
  /** Largura aproximada de exibição (escolhe a versão otimizada da imagem). */
  width?: number;
  /** Para capas em vídeo: só toca quando true (evita dezenas de vídeos ao mesmo tempo). */
  playing?: boolean;
  eager?: boolean;
}

/** Capa de um projeto: imagem otimizada ou, se a capa for vídeo, um cartão "Motion" que toca sob demanda. */
export const Cover: React.FC<CoverProps> = ({ project, width = 700, playing = false, eager = false }) => {
  if (isVideoCover(project.heroImage)) {
    if (playing) {
      return (
        <OptimizedVideo
          src={project.heroImage}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          className="w-full h-full object-cover"
        />
      );
    }
    return (
      <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-[#0f0f14] bg-[radial-gradient(circle_at_25%_15%,rgba(171,32,255,0.6),transparent_60%),radial-gradient(circle_at_85%_90%,rgba(0,240,255,0.45),transparent_55%)]">
        <span className="w-12 h-12 rounded-full bg-black/50 border border-white/30 flex items-center justify-center backdrop-blur-sm">
          <Play className="w-5 h-5 fill-white text-white translate-x-0.5" aria-hidden="true" />
        </span>
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-white/80">Motion</span>
      </div>
    );
  }

  return (
    <OptimizedImg
      src={project.heroImage}
      width={width}
      alt=""
      loading={eager ? 'eager' : 'lazy'}
      draggable={false}
      className="w-full h-full object-cover select-none"
    />
  );
};
