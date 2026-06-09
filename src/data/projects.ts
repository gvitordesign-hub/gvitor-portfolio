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
  },
  {
    id: 'fest-verao-guanambi',
    title: 'Fest Verão Guanambi',
    category: 'event-campaigns',
    client: 'Fest Verão',
    year: '2025',
    challenge: 'Desenvolver a identidade visual de campanha e materiais promocionais dinâmicos para a divulgação do grande festival "Fest Verão Guanambi", focando em conversão e engajamento nas vendas de ingressos.',
    solution: 'Criação de cartazes de alta energia, line-up estético e motions de contagem regressiva e liberação de lotes de ingressos, com paleta de cores vibrantes e contrastantes.',
    heroImage: '/portfolio/fest-verao-guanambi/FEST-VERÃO-GUANAMBI-2021-2---CARD-VENDASLIBERADAS.png',
    media: [
      { type: 'video', url: '/portfolio/fest-verao-guanambi/FEST VERÃO GUANAMBI 2021-2 - MOTION_1.mp4', thumbnail: '/portfolio/fest-verao-guanambi/FEST-VERÃO-GUANAMBI-2021-2---CARD-VENDASLIBERADAS.png', caption: 'Motion Promocional Oficial - Fest Verão Guanambi' },
      { type: 'image', url: '/portfolio/fest-verao-guanambi/FEST-VERÃO-GUANAMBI-2021-2---CARD-VENDASLIBERADAS.png', caption: 'Vendas Liberadas - Cartaz Oficial' },
      { type: 'image', url: '/portfolio/fest-verao-guanambi/LINE UP.png', caption: 'Line Up Oficial do Evento' },
      { type: 'image', url: '/portfolio/fest-verao-guanambi/FEST VERÃO GUANAMBI 2021-2 - CAMAROTE PREMIUM.png', caption: 'Divulgação Camarote Premium' },
      { type: 'image', url: '/portfolio/fest-verao-guanambi/VIRADA DE LOTE 10 DEZ.png', caption: 'Alerta Virada de Lote' },
      { type: 'image', url: '/portfolio/fest-verao-guanambi/FALTAM 3 DIAS.png', caption: 'Contagem Regressiva - Faltam 3 Dias' }
    ]
  },
  {
    id: 'hey-brother',
    title: 'Hey Brother - Layout Verão',
    category: 'event-campaigns',
    client: 'Hey Brother',
    year: '2025',
    challenge: 'Conceber peças estáticas de alta atração para a campanha promocional de verão da festa Hey Brother, destacando a banda Unha Pintada.',
    solution: 'Design visual alinhado à estética quente do verão com contrastes marcantes de azul e laranja, garantindo leitura rápida no feed do Instagram.',
    heroImage: '/portfolio/hey-brother/UNHA PINTADA - LAYOUT VERÃO - FEED.png',
    media: [
      { type: 'image', url: '/portfolio/hey-brother/UNHA PINTADA - LAYOUT VERÃO - FEED.png', caption: 'Layout Feed Oficial - Unha Pintada no Hey Brother' },
      { type: 'image', url: '/portfolio/hey-brother/1920X1080 EM JPEG.jpg', caption: 'Banner Horizontal Oficial' },
      { type: 'image', url: '/portfolio/hey-brother/600x600.png', caption: 'Capa Quadrada Alternativa' }
    ]
  },
  {
    id: 'mari-select',
    title: 'Mari Select',
    category: 'event-campaigns',
    client: 'Mari Select',
    year: '2025',
    challenge: 'Criar a identidade visual integrada e motions de vendas liberadas para o evento exclusivo "Mari Select", gerando urgência na aquisição de ingressos.',
    solution: 'Produção de motions dinâmicos reativos de pontos de venda e vendas liberadas, juntamente com cartazes de divulgação para redes sociais e site.',
    heroImage: '/portfolio/mari-select/MARI SELECT.png',
    media: [
      { type: 'video', url: '/portfolio/mari-select/Vendas Liberadas - Mari Select-1.mp4', thumbnail: '/portfolio/mari-select/MARI SELECT.png', caption: 'Motion Teaser Vendas Liberadas' },
      { type: 'video', url: '/portfolio/mari-select/MARI SELECT - PONTOS DE VENDA_1.mp4', thumbnail: '/portfolio/mari-select/MARI SELECT.png', caption: 'Motion Promocional - Pontos de Venda' },
      { type: 'image', url: '/portfolio/mari-select/MARI SELECT.png', caption: 'Cartaz Oficial de Divulgação' },
      { type: 'image', url: '/portfolio/mari-select/MARI SELECT - SEXTOU.png', caption: 'Arte Promocional "Sextou"' },
      { type: 'image', url: '/portfolio/mari-select/MARI SELECT - PORCENTAGEM - FEED.png', caption: 'Status de Vendas no Feed' }
    ]
  },
  {
    id: 'menos-e-mais-vca',
    title: 'Menos é Mais - Vitória da Conquista',
    category: 'event-campaigns',
    client: 'Menos é Mais',
    year: '2025',
    challenge: 'Estruturar a campanha visual e de motions promocionais para a chegada do grupo Menos é Mais a Vitória da Conquista (VCA), mantendo a identidade premium do grupo.',
    solution: 'Criação de cartazes de alto contraste com tons dourados e pretos, e vídeos de chamada e contagem de virada de lote sincronizados.',
    heroImage: '/portfolio/menos-e-mais-vca/MENOS É MAIS - CARD OFICIAL.png',
    media: [
      { type: 'video', url: '/portfolio/menos-e-mais-vca/VÍDEO CHAMADA_1.mp4', thumbnail: '/portfolio/menos-e-mais-vca/MENOS É MAIS - CARD OFICIAL.png', caption: 'Motion Video Chamada Oficial' },
      { type: 'image', url: '/portfolio/menos-e-mais-vca/MENOS É MAIS - CARD OFICIAL.png', caption: 'Card de Divulgação Principal' },
      { type: 'image', url: '/portfolio/menos-e-mais-vca/MENOS-É-MAIS---CARD-HEINEKEN2.png', caption: 'Card Promocional Patrocinador Heineken' },
      { type: 'image', url: '/portfolio/menos-e-mais-vca/PAGODE BLACK.png', caption: 'Card Especial Pagode Black' },
      { type: 'image', url: '/portfolio/menos-e-mais-vca/VIRADA DE LOTE AMANHÃ.png', caption: 'Alerta Virada de Lote Amanhã' }
    ]
  },
  {
    id: 'pagodinho-do-maia',
    title: 'Pagodinho do Maia - O Kanália',
    category: 'event-campaigns',
    client: 'Pagodinho do Maia',
    year: '2025',
    challenge: 'Criar uma identidade promocional de apelo descontraído para o show "Pagodinho do Maia" com O Kanália, destacando as informações do evento de forma marcante.',
    solution: 'Desenvolvimento de artes promocionais que retratam a energia do pagode baiano, utilizando cores contrastantes e elementos que remetem ao ambiente de descontração e lazer.',
    heroImage: '/portfolio/pagodinho-do-maia/PAGODINHO-DO-MAIA.png',
    media: [
      { type: 'image', url: '/portfolio/pagodinho-do-maia/PAGODINHO-DO-MAIA.png', caption: 'Cartaz Oficial - Pagodinho do Maia' },
      { type: 'image', url: '/portfolio/pagodinho-do-maia/PAGODINHO-DO-MAIA-VENDASLIBERADAS.png', caption: 'Divulgação Vendas Liberadas' },
      { type: 'image', url: '/portfolio/pagodinho-do-maia/PAGODINHO-DO-MAIA-PONTOS-DE-VENDA.png', caption: 'Pontos de Venda' },
      { type: 'image', url: '/portfolio/pagodinho-do-maia/PAGODINHO-DO-MAIA---STORY.png', caption: 'Arte Otimizada para Stories' }
    ]
  },
  {
    id: 'pagode-day',
    title: 'Pagode Day',
    category: 'event-campaigns',
    client: 'Pagode Day',
    year: '2025',
    challenge: 'Desenvolver a direção criativa da campanha completa e os motions dinâmicos do evento Pagode Day, mesclando engajamento orgânico com conversão comercial.',
    solution: 'Criação de posts dinâmicos no feed e stories, incluindo jogos interativos como caça-palavras e memes, somados a motions de contagem regressiva acelerados.',
    heroImage: '/portfolio/pagode-day/PAGODE DAY - PRINCIPAL.png',
    media: [
      { type: 'video', url: '/portfolio/pagode-day/CHAMADA - PAGODE DAY.mp4', thumbnail: '/portfolio/pagode-day/PAGODE DAY - PRINCIPAL.png', caption: 'Chamada Oficial Motion - Pagode Day' },
      { type: 'video', url: '/portfolio/pagode-day/É HOJE - PAGODE DAY_1.mp4', thumbnail: '/portfolio/pagode-day/PAGODE DAY - PRINCIPAL.png', caption: 'Teaser Especial "É Hoje"' },
      { type: 'image', url: '/portfolio/pagode-day/PAGODE DAY - PRINCIPAL.png', caption: 'Card Principal de Divulgação' },
      { type: 'image', url: '/portfolio/pagode-day/PAGODE DAY - CAÇA PALAVRAS.png', caption: 'Arte de Engajamento - Caça Palavras' },
      { type: 'image', url: '/portfolio/pagode-day/PAGODE DAY - ÚLTIMOS CAMAROTES DISPONÍVEIS.png', caption: 'Últimos Camarotes Disponíveis' },
      { type: 'image', url: '/portfolio/pagode-day/PAGODE DAY - MEME.png', caption: 'Arte Otimizada de Meme' }
    ]
  },
  {
    id: 'verao-vip',
    title: 'Verão Vip Brumado',
    category: 'event-campaigns',
    client: 'Verão Vip',
    year: '2025',
    challenge: 'Estruturar a divulgação diária em formato de contagem regressiva em motion para o evento Verão Vip Brumado.',
    solution: 'Desenvolvimento de uma paleta tropical quente associada a motions sequenciais para cada dia que antecede o evento (Faltam 5, 4, 3 dias, É Amanhã, É Hoje).',
    heroImage: '/portfolio/verao-vip/VERÃO-VIP-BRUMADO.png',
    media: [
      { type: 'video', url: '/portfolio/verao-vip/É HOJE STORY.m4v', thumbnail: '/portfolio/verao-vip/VERÃO-VIP-BRUMADO.png', caption: 'Story Motion - É Hoje!' },
      { type: 'video', url: '/portfolio/verao-vip/É AMANHÃ STORY.m4v', thumbnail: '/portfolio/verao-vip/VERÃO-VIP-BRUMADO.png', caption: 'Story Motion - É Amanhã!' },
      { type: 'video', url: '/portfolio/verao-vip/FALTAM 3 DIAS STORY.m4v', thumbnail: '/portfolio/verao-vip/VERÃO-VIP-BRUMADO.png', caption: 'Story Motion - Faltam 3 Dias' },
      { type: 'image', url: '/portfolio/verao-vip/VERÃO-VIP-BRUMADO.png', caption: 'Cartaz Principal - Verão Vip Brumado' },
      { type: 'image', url: '/portfolio/verao-vip/HORÁRIO DEFINIDO.png', caption: 'Card Oficial - Horários das Atrações' },
      { type: 'image', url: '/portfolio/verao-vip/LOTE DISPONÍVEL.png', caption: 'Informativo Lote Disponível' }
    ]
  }
];
