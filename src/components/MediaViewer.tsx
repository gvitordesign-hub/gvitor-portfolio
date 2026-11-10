import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { OptimizedImg, OptimizedVideo } from './OptimizedMedia';

interface MediaViewerProps {
  media: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
    caption?: string;
  };
  /**
   * Modo "cena": a mídia ocupa a altura disponível (variável CSS `--stage-h`), sem moldura.
   * Usado no visualizador imersivo.
   */
  stage?: boolean;
  /** Esconde a legenda (quando quem chama já a mostra em outro lugar). */
  hideCaption?: boolean;
  /** Recebe o elemento visível da mídia (a "moldura"); usado para medir a animação de abertura. */
  frameRef?: (el: HTMLElement | null) => void;
}

// Altura máxima da mídia no modo cena (definida por quem usa; 78svh se não houver).
const STAGE_H = 'max-h-[var(--stage-h,78svh)]';
const STAGE_VIDEO_W = 'w-[min(100%,calc(var(--stage-h,78svh)*1.7778))]';

export const MediaViewer: React.FC<MediaViewerProps> = ({ media, stage = false, hideCaption = false, frameRef }) => {
  const isLocalVideo = media.type === 'video' && (/\.(mp4|m4v|webm)$/i.test(media.url) || media.url.includes('/portfolio/'));
  // Vídeo sem capa, na cena: já começa tocando (mudo e em loop) para o cliente ver o trabalho de imediato.
  const autoStart = stage && isLocalVideo && !media.thumbnail;
  const [isVideoLoaded, setIsVideoLoaded] = useState(autoStart);
  const caption = !hideCaption && media.caption ? media.caption : null;

  if (media.type === 'video') {
    return (
      <div className={stage ? 'flex max-w-full flex-col items-center gap-3' : 'w-full flex flex-col gap-2'}>
        {!isVideoLoaded ? (
          <button
            ref={frameRef}
            type="button"
            aria-label={`Reproduzir vídeo${media.caption ? `: ${media.caption}` : ''}`}
            className={`relative overflow-hidden bg-black/60 group cursor-pointer ${
              stage
                ? `max-w-full ${media.thumbnail ? 'w-fit' : `${STAGE_VIDEO_W} aspect-video`}`
                : `w-full rounded-sm border border-white/5 shadow-inner ${media.thumbnail ? '' : 'aspect-video'}`
            }`}
            onClick={() => setIsVideoLoaded(true)}
          >
            {media.thumbnail && (
              <OptimizedImg
                src={media.thumbnail}
                width={stage ? 900 : 800}
                alt=""
                loading="lazy"
                className={
                  stage
                    ? `block ${STAGE_H} w-auto max-w-full object-contain brightness-75 transition duration-500 group-hover:brightness-90`
                    : 'w-full h-auto max-h-[70vh] object-contain mx-auto group-hover:scale-101 transition-transform duration-500 filter brightness-75'
                }
              />
            )}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-electricCyan text-black rounded-full flex items-center justify-center shadow-neonCyan group-hover:scale-110 transition-transform duration-300 z-10">
                <Play className="w-7 h-7 fill-black translate-x-0.5" aria-hidden="true" />
              </div>
            </div>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />
          </button>
        ) : isLocalVideo ? (
          <div ref={frameRef} className={stage ? 'max-w-full bg-black' : 'w-full rounded-sm overflow-hidden border border-white/5 bg-black'}>
            <OptimizedVideo
              src={media.url}
              controls
              autoPlay
              playsInline
              muted={autoStart}
              loop={autoStart}
              className={stage ? `mx-auto block ${STAGE_H} w-auto max-w-full object-contain` : 'w-full h-auto max-h-[75vh] mx-auto object-contain'}
            />
          </div>
        ) : (
          <div
            ref={frameRef}
            className={`relative aspect-video overflow-hidden bg-black/60 ${
              stage ? STAGE_VIDEO_W : 'w-full rounded-sm border border-white/5 shadow-inner'
            }`}
          >
            <iframe
              src={`${media.url}?autoplay=1&dnt=1&color=00f0ff`}
              className="absolute inset-0 w-full h-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={media.caption || 'Vídeo do projeto'}
            />
          </div>
        )}
        {caption && <span className="text-xs text-gray-400 font-semibold px-2">{caption}</span>}
      </div>
    );
  }

  if (stage) {
    // A versão leve (já em cache) aparece na hora e define o tamanho; a de alta resolução entra por cima ao carregar.
    return (
      <div className="flex max-w-full flex-col items-center gap-3">
        <div ref={frameRef} className="relative inline-block max-w-full shadow-[0_40px_120px_rgba(0,0,0,0.6)]">
          <OptimizedImg
            src={media.url}
            width={900}
            alt={media.caption || 'Visual do Portfólio'}
            className={`block ${STAGE_H} w-auto max-w-full object-contain`}
          />
          <OptimizedImg
            src={media.url}
            width={1600}
            alt=""
            aria-hidden="true"
            draggable={false}
            className="absolute inset-0 h-full w-full object-contain opacity-0 transition-opacity duration-500"
            onLoad={(e) => (e.currentTarget.style.opacity = '1')}
          />
        </div>
        {caption && <span className="text-xs text-gray-400 font-semibold px-2">{caption}</span>}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full rounded-sm overflow-hidden border border-white/5 bg-[#121212] flex items-center justify-center">
        <OptimizedImg
          src={media.url}
          width={1000}
          alt={media.caption || 'Visual do Portfólio'}
          loading="lazy"
          className="w-full h-auto max-h-[75vh] object-contain mx-auto"
        />
      </div>
      {caption && <span className="text-xs text-gray-400 font-semibold px-2">{caption}</span>}
    </div>
  );
};
