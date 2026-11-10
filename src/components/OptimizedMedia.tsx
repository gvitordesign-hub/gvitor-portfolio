import React, { useState } from 'react';
import { getOptimizedImageUrl, getOptimizedVideoUrl } from '../utils/imageOptimizer';

type ImgProps = Omit<React.ImgHTMLAttributes<HTMLImageElement>, 'src'> & {
  src: string;
  /** Largura de exibição aproximada, usada para escolher a versão otimizada. */
  width?: number;
};

/** <img> que usa a versão WebP otimizada e volta ao arquivo original se ela não existir. */
export const OptimizedImg: React.FC<ImgProps> = ({ src, width = 800, alt = '', decoding = 'async', ...rest }) => {
  const [failed, setFailed] = useState(false);
  return (
    <img
      {...rest}
      alt={alt}
      decoding={decoding}
      src={failed ? src : getOptimizedImageUrl(src, width)}
      onError={() => setFailed(true)}
    />
  );
};

type VideoProps = Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'> & { src: string };

/** <video> que usa a versão comprimida (.web.mp4) e volta ao original se ela não existir. */
export const OptimizedVideo: React.FC<VideoProps> = ({ src, ...rest }) => {
  const [failed, setFailed] = useState(false);
  return <video {...rest} src={failed ? src : getOptimizedVideoUrl(src)} onError={() => setFailed(true)} />;
};
