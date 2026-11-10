/** Capas de projeto podem ser vídeo (mp4/m4v/webm) em vez de imagem. */
export const isVideoCover = (url: string): boolean => /\.(mp4|m4v|webm)$/i.test(url);
