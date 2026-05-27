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

  if (media.type === 'video') {
    return (
      <div className="w-full flex flex-col gap-2">
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden bg-black/60 border border-white/5 shadow-inner group">
          {!isVideoLoaded ? (
            <div className="absolute inset-0 flex items-center justify-center cursor-pointer" onClick={() => setIsVideoLoaded(true)}>
              {media.thumbnail && (
                <img
                  src={getOptimizedImageUrl(media.thumbnail, 800)}
                  alt={media.caption || 'Thumbnail do Vídeo'}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 filter brightness-75"
                />
              )}
              {/* Botão de Play customizado super neon */}
              <div className="absolute w-16 h-16 bg-electricCyan text-black rounded-full flex items-center justify-center shadow-neonCyan group-hover:scale-110 transition-transform duration-300 z-10">
                <Play className="w-7 h-7 fill-black translate-x-0.5" />
              </div>
              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/25 transition-colors duration-300" />
            </div>
          ) : (
            <iframe
              src={`${media.url}?autoplay=1&dnt=1&color=00f0ff`}
              className="absolute inset-0 w-full h-full border-0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowFullScreen
              title={media.caption}
            />
          )}
        </div>
        {media.caption && <span className="text-xs text-gray-500 font-semibold px-2">{media.caption}</span>}
      </div>
    );
  }

  return (
    <div className="w-full flex flex-col gap-2">
      <div className="w-full rounded-2xl overflow-hidden border border-white/5 bg-[#121212]">
        <img
          src={getOptimizedImageUrl(media.url, 1000)}
          alt={media.caption || 'Visual do Portfólio'}
          loading="lazy"
          className="w-full h-auto object-cover max-h-[500px]"
        />
      </div>
      {media.caption && <span className="text-xs text-gray-500 font-semibold px-2">{media.caption}</span>}
    </div>
  );
};
