/**
 * Resolve URLs de mídia para as versões otimizadas.
 *
 * - Supabase Storage: usa o renderizador dinâmico (WebP redimensionado).
 * - Unsplash: parâmetros de largura/qualidade/formato automático.
 * - Mídia local (/portfolio/...): usa as versões geradas por `npm run optimize:media`
 *     imagem  -> <nome>.md.webp (até 900px) ou <nome>.lg.webp (acima disso)
 *     vídeo   -> <nome>.web.mp4
 *   Os componentes (OptimizedImg / OptimizedVideo) voltam ao original caso a versão
 *   otimizada ainda não exista.
 */

const LOCAL_IMG_RE = /^\/portfolio\/.+\.(png|jpe?g)$/i;
const LOCAL_VIDEO_RE = /^\/portfolio\/.+\.(mp4|m4v)$/i;

export const isLocalVideo = (url: string): boolean => LOCAL_VIDEO_RE.test(url);

export const getOptimizedVideoUrl = (url: string): string =>
  LOCAL_VIDEO_RE.test(url) && !/\.web\.mp4$/i.test(url) ? url.replace(/\.(mp4|m4v)$/i, '.web.mp4') : url;

export const getOptimizedImageUrl = (url: string, width: number = 800): string => {
  if (!url) return '';

  // 1. Mídia local do portfólio
  if (LOCAL_IMG_RE.test(url)) {
    return url.replace(/\.(png|jpe?g)$/i, width <= 900 ? '.md.webp' : '.lg.webp');
  }

  // 2. Supabase Storage
  if (url.includes('.supabase.co')) {
    if (url.includes('/storage/v1/object/public/')) {
      return (
        url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/') +
        `?width=${width}&quality=80&format=webp`
      );
    }
    return url;
  }

  // 3. Unsplash
  if (url.includes('images.unsplash.com')) {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set('w', width.toString());
      urlObj.searchParams.set('q', '80');
      urlObj.searchParams.set('auto', 'format');
      return urlObj.toString();
    } catch {
      return url;
    }
  }

  // 4. Outras mídias externas
  return url;
};
