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
    id: 'arraia-do-boteco',
    title: 'Arraiá do Boteco Teaser 3D',
    category: 'motion-visuals',
    client: 'Boteco Premium',
    year: '2026',
    challenge: 'Desenvolver um teaser promocional de motion design oficial para divulgação nacional do evento temático "Arraiá do Boteco", capturando a atmosfera festiva junina com elementos estéticos futuristas.',
    solution: 'Criação de animações dinâmicas tridimensionais reativas em ritmo acelerado, integrando cores quentes de fogueira com iluminação neon elétrica de palco e efeitos de luz estroboscópicos para alta retenção em redes sociais.',
    heroImage: '/portfolio/arraia-do-boteco/ARRAIÁ DO BOTECO.mp4',
    media: [
      { type: 'video', url: '/portfolio/arraia-do-boteco/ARRAIÁ DO BOTECO.mp4', caption: 'Motion Teaser Promocional Oficial - Arraiá do Boteco' }
    ]
  },
  {
    id: 'raneychas-6.0',
    title: 'Raneychas - Volume 6.0',
    category: 'music-releases',
    client: 'Raneychas',
    year: '2026',
    challenge: 'Desenvolver a identidade de campanha digital completa de lançamento e motions promocionais de alto padrão para o CD "Raneychas Volume 6.0", com foco em conversões rápidas nas plataformas Sua Música e canais digitais.',
    solution: 'Criação de design visual estático com tipografia cromada tridimensional e motions promocionais em formatos vertical e horizontal sincronizados com o BPM da música, incluindo animações completas de "Ouça Agora" para canais e redes.',
    heroImage: '/portfolio/raneychas-6.0/BOTA-TOMAR-UMA-6.png',
    media: [
      { type: 'video', url: '/portfolio/raneychas-6.0/OUÇA AGORA - BORA TOMAR UMA 6-0 - RANEYCHAS.mp4', thumbnail: '/portfolio/raneychas-6.0/BOTA-TOMAR-UMA-6.png', caption: 'Motion Promocional Oficial de Lançamento - CD Volume 6.0' },
      { type: 'image', url: '/portfolio/raneychas-6.0/BOTA-TOMAR-UMA-6.png', caption: 'Capa Oficial do CD Volume 6.0' },
      { type: 'image', url: '/portfolio/raneychas-6.0/CAPA---YOUTUBE.png', caption: 'Banner de Lançamento para Canal do YouTube' },
      { type: 'image', url: '/portfolio/raneychas-6.0/BOTA-TOMAR-UMA-6-SUAMÚSICA.png', caption: 'Capa Promocional Otimizada para o Sua Música' },
      { type: 'image', url: '/portfolio/raneychas-6.0/SUA-MUSICA.png', caption: 'Capa Oficial Encarte Alternativo' }
    ]
  },
  {
    id: 'boteco-das-amigas-3.0',
    title: 'Boteco das Amigas - Boteco Terapia 3.0',
    category: 'music-releases',
    client: 'Boteco das Amigas',
    year: '2025',
    challenge: 'Conceber a direção de arte e motions de lançamento para o álbum musical "Boteco Terapia 3.0", gerando identificação imediata no público por meio de elementos de mesa de bar em uma estética neon moderna.',
    solution: 'Design visual premium em alta resolução, banner completo para YouTube e um motion teaser cinemático combinando tipografia de impacto com transições estroboscópicas fluidas sincronizadas com o ritmo de arrocha.',
    heroImage: '/portfolio/boteco-das-amigas-3.0/BOTECO-TERAPIA-3.png',
    media: [
      { type: 'video', url: '/portfolio/boteco-das-amigas-3.0/BOTECO TERAPIA 3-0 - BOTECO DAS AMIGAS.mp4', thumbnail: '/portfolio/boteco-das-amigas-3.0/BOTECO-TERAPIA-3.png', caption: 'Motion Teaser Conceitual - Boteco Terapia 3.0' },
      { type: 'image', url: '/portfolio/boteco-das-amigas-3.0/BOTECO-TERAPIA-3.png', caption: 'Capa Oficial do Álbum - Boteco Terapia 3.0' },
      { type: 'image', url: '/portfolio/boteco-das-amigas-3.0/YOUTUBE-CAPA.png', caption: 'Banner de Capa Oficial para YouTube' },
      { type: 'image', url: '/portfolio/boteco-das-amigas-3.0/SUA-MUSICA.png', caption: 'Arte Promocional para Plataforma Sua Música' }
    ]
  },
  {
    id: 'boteco-das-amigas-2.0',
    title: 'Boteco das Amigas - Bota Pra Sofrer 2.0',
    category: 'music-releases',
    client: 'Boteco das Amigas',
    year: '2024',
    challenge: 'Criar a identidade visual e materiais promocionais de alta atração para o lançamento do CD de sequência "Bota Pra Sofrer 2.0", consolidando o sucesso da banda no nicho de showbusiness.',
    solution: 'Direção de arte combinando sombras dramáticas brutas, tipografia agressiva moderna e um motion dinâmico em formato "Ouça Agora" para divulgação nos Stories e Reels do Instagram.',
    heroImage: '/portfolio/boteco-das-amigas-2.0/CD - BOTECO DAS AMIGAS - BOTA PRA SOFRER.png',
    media: [
      { type: 'video', url: '/portfolio/boteco-das-amigas-2.0/BOTECO DAS AMIGAS - OUÇA AGORA.mp4', thumbnail: '/portfolio/boteco-das-amigas-2.0/CD - BOTECO DAS AMIGAS - BOTA PRA SOFRER.png', caption: 'Motion Banner "Ouça Agora" - Bota Pra Sofrer 2.0' },
      { type: 'image', url: '/portfolio/boteco-das-amigas-2.0/CD - BOTECO DAS AMIGAS - BOTA PRA SOFRER.png', caption: 'Capa Oficial de Lançamento do CD - Bota Pra Sofrer 2.0' },
      { type: 'image', url: '/portfolio/boteco-das-amigas-2.0/SUA-MUSICA.png', caption: 'Capa Especial para Lançamento Sua Música' }
    ]
  },
  {
    id: 'boteco-das-amigas-1.0',
    title: 'Boteco das Amigas - Bota Pra Sofrer 1.0',
    category: 'music-releases',
    client: 'Boteco das Amigas',
    year: '2024',
    challenge: 'Estruturar a direção de arte integrada de lançamento digital e motions sequenciais para o álbum de 2024 "Bota Pra Sofrer 1.0", com presença em múltiplos canais digitais simultâneos.',
    solution: 'Desenvolvimento de uma identidade visual marcante para capa de CD, banner oficial de YouTube, materiais Sua Música e motions dinâmicos promocionais sincronizados com os beats de arrocha eletrônico.',
    heroImage: '/portfolio/boteco-das-amigas-1.0/BOTECO-DAS-AMIGAS-2024---CAPA.png',
    media: [
      { type: 'video', url: '/portfolio/boteco-das-amigas-1.0/LANÇAMENTO  - BOTECO DAS AMIGAS 2024 - 2.mp4', thumbnail: '/portfolio/boteco-das-amigas-1.0/BOTECO-DAS-AMIGAS-2024---CAPA.png', caption: 'Motion Teaser de Lançamento Oficial 2024' },
      { type: 'video', url: '/portfolio/boteco-das-amigas-1.0/OUÇA AGORA - BOTECO DAS AMIGAS 2024.mp4', thumbnail: '/portfolio/boteco-das-amigas-1.0/BOTECO-DAS-AMIGAS-2024---CAPA.png', caption: 'Motion Call to Action "Ouça Agora" para Redes e Youtube' },
      { type: 'image', url: '/portfolio/boteco-das-amigas-1.0/BOTECO-DAS-AMIGAS-2024---CAPA.png', caption: 'Capa Oficial do Álbum - Boteco das Amigas 2024' },
      { type: 'image', url: '/portfolio/boteco-das-amigas-1.0/BOTECO-DAS-AMIGAS---CAPA-VÍDEO---YOUTUBE.png', caption: 'Capa Adaptada para Vídeos do YouTube' },
      { type: 'image', url: '/portfolio/boteco-das-amigas-1.0/SUA-MUSICA.png', caption: 'Arte Promocional para o Portal Sua Música' }
    ]
  },
  {
    id: 'raneychas-bora-tomar-uma',
    title: 'Raneychas - Bora Tomar Uma',
    category: 'music-releases',
    client: 'Raneychas',
    year: '2026',
    challenge: 'Desenvolver a identidade de campanha digital e motions promocionais de alta conversão para o lançamento oficial do single "Bora Tomar Uma", visando engajamento orgânico nas redes sociais.',
    solution: 'Criação de design visual estático com tipografia marcante de alta energia e motions promocionais dinâmicos sincronizados com o BPM da música, incluindo animações de "Ouça Agora" otimizadas para Stories e Reels.',
    heroImage: '/portfolio/raneychas-bora-tomar-uma/RANEYCHAS---BORA-TOMAR-UMA.png',
    media: [
      { type: 'video', url: '/portfolio/raneychas-bora-tomar-uma/RANEYCHAS - BORA TOMAR UMA.mp4', thumbnail: '/portfolio/raneychas-bora-tomar-uma/RANEYCHAS---BORA-TOMAR-UMA.png', caption: 'Teaser Promocional Motion Oficial - Bora Tomar Uma' },
      { type: 'video', url: '/portfolio/raneychas-bora-tomar-uma/OUÇA AGORA - RANEYCHAS - BORA TOMAR UMA.mp4', thumbnail: '/portfolio/raneychas-bora-tomar-uma/RANEYCHAS---BORA-TOMAR-UMA.png', caption: 'Motion Call to Action "Ouça Agora" para Spotify e Deezer' },
      { type: 'image', url: '/portfolio/raneychas-bora-tomar-uma/RANEYCHAS---BORA-TOMAR-UMA.png', caption: 'Capa Oficial da Campanha - Bora Tomar Uma' }
    ]
  },
  {
    id: 'raneychas-na-falta-de-amor',
    title: 'Raneychas - Na Falta de Amor e Carinho',
    category: 'music-releases',
    client: 'Raneychas',
    year: '2026',
    challenge: 'Estruturar a direção criativa de lançamento e motions conceituais de alta retenção para a canção "Na Falta de Amor e Carinho", impulsionando as visualizações nos canais de streaming e no YouTube.',
    solution: 'Direção de arte premium integrando a capa oficial estática em alta resolução, banner completo para YouTube e um motion teaser cinemático stroboscópico marcante no ritmo da música.',
    heroImage: '/portfolio/raneychas-na-falta-de-amor/NA-FALTA-DE-AMOR-E-CARINHO---RANEYCHAS.png',
    media: [
      { type: 'video', url: '/portfolio/raneychas-na-falta-de-amor/MOTION - NA FALTA DE AMOR E CARINHO - RANEYCHAS.mp4', thumbnail: '/portfolio/raneychas-na-falta-de-amor/NA-FALTA-DE-AMOR-E-CARINHO---RANEYCHAS.png', caption: 'Motion Teaser Conceitual - Na Falta de Amor e Carinho' },
      { type: 'image', url: '/portfolio/raneychas-na-falta-de-amor/NA-FALTA-DE-AMOR-E-CARINHO---RANEYCHAS.png', caption: 'Capa Oficial do Single - Na Falta de Amor e Carinho' },
      { type: 'image', url: '/portfolio/raneychas-na-falta-de-amor/CAPA---YOUTUBE.png', caption: 'Banner Oficial de Capa para YouTube' }
    ]
  }
];
