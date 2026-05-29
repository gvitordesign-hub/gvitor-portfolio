import React, { useState } from 'react';
import { Play } from 'lucide-react';
import { getOptimizedImageUrl } from '../utils/imageOptimizer';

interface MediaViewerProps {
  media: {
    type: 'image' | 'video';
    url: string;
    thumbnail?: string;
    caption?: string;
  };
}

export const MediaViewer: React.FC<MediaViewerProps> = ({ media }) => {
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const isLocalVideo = media.type === 'video' && (media.url.endsWith('.mp4') || media.url.includes('/portfolio/'));

  if (media.type === 'video') {
    return (
      <div className="w-full flex flex-col gap-2">
        {!isVideoLoaded ? (
          /* Capa estática interativa que respeita o tamanho original da thumbnail */
          <div 
            className="relative w-full rounded-2xl overflow-hidden bg-black/60 border border-white/5 shadow-inner group cursor-pointer"
            onClick={() => setIsVideoLoaded(true)}
          >
            {media.thumbnail && (
              <img
                src={getOptimizedImageUrl(media.thumbnail, 800)}
                alt={media.caption || 'Thumbnail do Vídeo'}
                loading="lazy"
                className="w-full h-auto max-h-[70vh] object-contain mx-auto group-hover:scale-101 transition-transform duration-500 filter brightness-75"
              />
            )}
            {/* Botão de Play customizado super neon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 bg-electricCyan text-black rounded-full flex items-center justify-center shadow-neonCyan group-hover:scale-110 transition-transform duration-300 z-10">
                <Play className="w-7 h-7 fill-black translate-x-0.5" />
              </div>
            </div>
            <div className="absolute inset-0 bg-black/30 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />
          </div>
        ) : (
          /* Player ativo */
          isLocalVideo ? (
            <div className="w-full rounded-2xl overflow-hidden border border-white/5 bg-black">
              <video
                src={media.url}
                controls
                autoPlay
                className="w-full h-auto max-h-[75vh] mx-auto object-contain"
              />
            </div>
          ) : (
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/60 border border-white/5 shadow-inner">
              <iframe
                src={`${media.url}?autoplay=1&dnt=1&color=00f0ff`}
                className="absolute inset-0 w-full h-full border-0"
                allow="autoplay; fullscreen; picture-in-picture"
                allowFullScreen
                title={media.caption}
              />
            </div>
          )
        )}
        {media.caption && <span className="text-xs text-gray-500 font-semibold px-2">{media.caption}</span>}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full rounded-2xl overflow-hidden border border-white/5 bg-[#121212] flex items-center justify-center">
        <img
          src={getOptimizedImageUrl(media.url, 1000)}
          alt={media.caption || 'Visual do Portfólio'}
          loading="lazy"
          className="w-full h-auto max-h-[75vh] object-contain mx-auto"
        />
      </div>
      {media.caption && <span className="text-xs text-gray-500 font-semibold px-2">{media.caption}</span>}
    </div>
  );
};
