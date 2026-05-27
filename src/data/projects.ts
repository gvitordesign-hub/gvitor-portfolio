export interface MediaItem {
  type: 'image' | 'video';
  url: string; // URL da imagem estática HD ou ID do vídeo (Vimeo/YouTube/Local)
  thumbnail?: string; // Capa/Thumbnail para lazy loading de vídeos
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'event-campaigns' | 'music-releases' | 'motion-visuals';
  client: string;
  year: string;
  challenge: string;
  solution: string;
  heroImage: string; // Imagem exibida no grid principal
  media: MediaItem[];
}

export const projectsData: Project[] = [
  {
    id: 'hyper-nexus-festival',
    title: 'Hyper Nexus Festival 2026',
    category: 'event-campaigns',
    client: 'Nexus Entertainment',
    year: '2026',
    challenge: 'Desenvolver a identidade de campanha digital e motion de line-ups oficiais para um festival de música eletrônica futurista, com o desafio de esgotar 40 mil ingressos na pré-venda global.',
    solution: 'Direção de arte com tipografia cromada (liquid metal), renderização 3D de esferas e layouts pulsantes gerando contraste magnético no tempo exato das batidas de música.',
    heroImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=800',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&q=80&w=1200', caption: 'Poster Line-up Oficial em Liquid Chrome' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200', caption: 'Banners Digitais para Anuncio de Headliners' }
    ]
  },
  {
    id: 'subfreq-vortex-canvas',
    title: 'Vortex Spotify Canvas & Campaign',
    category: 'music-releases',
    client: 'DJ Kaelen / SubFreq Records',
    year: '2026',
    challenge: 'Criar loops dinâmicos reativos de alta retenção para o Spotify Canvas e teasers de anúncio para o single eletrônico "VORTEX", visando a viralização orgânica nas plataformas.',
    solution: 'Loops de motion em túneis 3D de luzes estroboscópicas sincronizadas com o BPM do single, gerando retenção instantânea em telas verticais (TikTok/Spotify).',
    heroImage: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=800',
    media: [
      { type: 'video', url: 'https://player.vimeo.com/video/324484361', thumbnail: 'https://images.unsplash.com/photo-1508700115892-45ecd05ae2ad?auto=format&fit=crop&q=80&w=1200', caption: 'Spotify Canvas Loop Motion Edit' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200', caption: 'Keyframes Renders - Estética Synthwave' }
    ]
  },
  {
    id: 'ethereal-tour-trailer',
    title: 'Ethereal World Tour Trailer 3D',
    category: 'motion-visuals',
    client: 'AURA Sound / Live Nation',
    year: '2026',
    challenge: 'Direção de arte tridimensional e teaser promocional cinemático para anúncio global de turnê de estádios, gerando desejo imediato na base de fãs.',
    solution: 'Desenvolvimento de renders 3D orgânicos representando a atmosfera mística do show, com transições rítmicas brutas e efeitos holográficos neon de alto padrão.',
    heroImage: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=800',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&q=80&w=1200', caption: 'Render Tridimensional da Esfera Ethereal' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&q=80&w=1200', caption: 'Visual de Palco LED e Efeitos de Lasers' }
    ]
  }
];
