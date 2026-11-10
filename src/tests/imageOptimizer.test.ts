import { describe, it, expect } from 'vitest';
import { getOptimizedImageUrl, getOptimizedVideoUrl } from '../utils/imageOptimizer';

describe('Otimização de mídia', () => {
  it('mapeia imagens locais para WebP md/lg conforme a largura', () => {
    expect(getOptimizedImageUrl('/portfolio/pagode-day/PAGODE DAY - PRINCIPAL.png', 600)).toBe(
      '/portfolio/pagode-day/PAGODE DAY - PRINCIPAL.md.webp',
    );
    expect(getOptimizedImageUrl('/portfolio/pagode-day/a.jpg', 1000)).toBe('/portfolio/pagode-day/a.lg.webp');
  });

  it('mapeia vídeos locais para a versão comprimida', () => {
    expect(getOptimizedVideoUrl('/portfolio/x/video.mp4')).toBe('/portfolio/x/video.web.mp4');
    expect(getOptimizedVideoUrl('/portfolio/x/story.m4v')).toBe('/portfolio/x/story.web.mp4');
    expect(getOptimizedVideoUrl('/portfolio/x/video.web.mp4')).toBe('/portfolio/x/video.web.mp4');
  });

  it('não altera URLs externas desconhecidas', () => {
    expect(getOptimizedImageUrl('https://exemplo.com/a.png')).toBe('https://exemplo.com/a.png');
    expect(getOptimizedVideoUrl('https://player.vimeo.com/video/1')).toBe('https://player.vimeo.com/video/1');
  });
});
