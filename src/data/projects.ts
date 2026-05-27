export interface MediaItem {
  type: 'image' | 'video';
  url: string; // URL da imagem estática HD ou ID do vídeo (Vimeo/YouTube/Local)
  thumbnail?: string; // Capa/Thumbnail para lazy loading de vídeos
  caption?: string;
}

export interface Project {
  id: string;
  title: string;
  category: 'social-media' | 'motion-design' | 'visual-identity';
  client: string;
  year: string;
  challenge: string;
  solution: string;
  heroImage: string; // Imagem exibida no grid principal
  media: MediaItem[];
}

export const projectsData: Project[] = [
  {
    id: 'cyberpunk-ad',
    title: 'Cyberpunk E-sports Campaign',
    category: 'social-media',
    client: 'Apex Arena',
    year: '2026',
    challenge: 'Desenvolver artes estáticas e banners com estética cyberpunk disruptiva que gerassem alto engajamento orgânico na semana do torneio de e-sports.',
    solution: 'Criação de composições ricas em contraste cromático usando tons neon azul e rosa, elementos 3D flutuantes e tipografia distorcida.',
    heroImage: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=1200', caption: 'Banner Principal para Instagram Stories' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=1200', caption: 'Post Quadrado Carrossel - Detalhes 3D' }
    ]
  },
  {
    id: 'neon-waves-motion',
    title: 'Neon Waves Music Video Motion',
    category: 'motion-design',
    client: 'SubFreq Records',
    year: '2026',
    challenge: 'Criar uma introdução visual animada em motion design integrada com elementos de áudio reativos para lançamentos de música eletrônica.',
    solution: 'Loops de ondas senoidais 3D estilizados com glow neon e transições dinâmicas baseadas nos picos de frequência sonora (batida).',
    heroImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=800',
    media: [
      { type: 'video', url: 'https://player.vimeo.com/video/324484361', thumbnail: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&q=80&w=1200', caption: 'Loop Motion Principal 1080p' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=1200', caption: 'Frames Principais - Render Estático' }
    ]
  },
  {
    id: 'brand-overdrive',
    title: 'Identidade Overdrive Tech',
    category: 'visual-identity',
    client: 'Overdrive Inc.',
    year: '2025',
    challenge: 'Rebrand completo de uma startup de inteligência artificial que demandava uma identidade visual limpa, mas incrivelmente futurista e imponente.',
    solution: 'Logo minimalista baseado no conceito de aceleração vetorial, com papelaria corporativa premium impressa com verniz localizado holográfico.',
    heroImage: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=800',
    media: [
      { type: 'image', url: 'https://images.unsplash.com/photo-1614741118887-7a4ee193a5fa?auto=format&fit=crop&q=80&w=1200', caption: 'Paleta Cromática e Guia de Marca' },
      { type: 'image', url: 'https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?auto=format&fit=crop&q=80&w=1200', caption: 'Mockup papelaria corporativa' }
    ]
  }
];
