/**
 * Otimiza dinamicamente URLs de imagens para carregar em formato WebP compactado
 * com largura redimensionada na nuvem.
 * Suporta o renderizador de CDN do Supabase Storage e do Unsplash.
 */
export const getOptimizedImageUrl = (url: string, width: number = 800): string => {
  if (!url) return '';

  // 1. Otimização Nativa para Supabase Storage
  if (url.includes('.supabase.co')) {
    // Transforma a URL do objeto estático:
    // .../storage/v1/object/public/portfolio-media/cases/foto.png
    // Na URL do renderizador dinâmico com WebP:
    // .../storage/v1/render/image/public/portfolio-media/cases/foto.png?width=800&quality=80&format=webp
    if (url.includes('/storage/v1/object/public/')) {
      return url.replace('/storage/v1/object/public/', '/storage/v1/render/image/public/') 
        + `?width=${width}&quality=80&format=webp`;
    }
    return url;
  }

  // 2. Otimização Inteligente para fallbacks do Unsplash
  if (url.includes('images.unsplash.com')) {
    try {
      const urlObj = new URL(url);
      urlObj.searchParams.set('w', width.toString());
      urlObj.searchParams.set('q', '80');
      urlObj.searchParams.set('auto', 'format');
      return urlObj.toString();
    } catch (e) {
      return url;
    }
  }

  // 3. Fallback seguro para outras mídias externas
  return url;
};
