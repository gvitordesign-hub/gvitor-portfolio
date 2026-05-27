# GVITOR DESIGN Portfolio Landing Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Criar uma landing page de portfólio de alta conversão, responsiva e ultra-premium em dark mode para o designer "GVITOR DESIGN", com animações fluidas, filtros de categorias e um modal interativo para exibição assíncrona de mídias (imagens estáticas HD e vídeos de motion design) sem recarga de página.

**Architecture:** A aplicação será uma Single Page Application (SPA) estruturada de forma modular em React. A interface adotará um design dark premium (#0B0B0B) com efeitos de glassmorphism e acentos de gradiente neon (azul elétrico, ciano e roxo). O gerenciamento de estado do modal e dos filtros de projeto será centralizado no componente principal, utilizando Framer Motion para transições fluidas e controle de carregamento assíncrono para excelente performance.

**Tech Stack:** React (Vite), TypeScript, Tailwind CSS, Framer Motion, Lucide React (ícones), Vitest & React Testing Library (TDD).

---

## Fase 1: Setup e Estrutura de Arquivos

### Task 1.1: Inicialização do Projeto com Vite + React + TypeScript

**Files:**
- Create: `package.json` (gerado pelo Vite)
- Create: `vite.config.ts`

**Step 1: Visualizar opções de ajuda do npx create-vite**

Run: `npx create-vite --help`
Expected: Exibe as opções válidas no console.

**Step 2: Inicializar o app no diretório atual utilizando npx create-vite**

Run: `npx -y create-vite@latest ./ --template react-ts`
Expected: Inicializa com sucesso a estrutura do Vite com React e TypeScript no diretório atual.

**Step 3: Instalar as dependências padrão**

Run: `npm install`
Expected: Instalação das dependências com sucesso.

**Step 4: Executar o servidor de desenvolvimento para validação inicial**

Run: `npm run dev -- --port 5173` (em segundo plano)
Expected: Servidor rodando localmente no endereço http://localhost:5173.

**Step 5: Commit**

```bash
git init
git add .
git commit -m "chore: setup inicial do projeto com Vite, React e TypeScript"
```

---

### Task 1.2: Instalação de Dependências de Design, Ícones, Animações e Testes

**Files:**
- Modify: `package.json`

**Step 1: Instalar Tailwind CSS e dependências de build**

Run: `npm install -D tailwindcss postcss autoprefixer vitest @testing-library/react @testing-library/jest-dom jsdom @types/node`
Expected: Dependências de desenvolvimento instaladas com sucesso.

**Step 2: Inicializar configuração do Tailwind**

Run: `npx tailwindcss init -p`
Expected: Geração dos arquivos `tailwind.config.js` e `postcss.config.js`.

**Step 3: Instalar dependências de UI e Animação**

Run: `npm install framer-motion lucide-react`
Expected: Bibliotecas Framer Motion e Lucide React instaladas com sucesso.

**Step 4: Criar o script de teste no package.json**

Adicionar `"test": "vitest"` nos scripts de `package.json`.

**Step 5: Commit**

```bash
git add package.json package-lock.json tailwind.config.js postcss.config.js
git commit -m "chore: instalar tailwindcss, framer-motion, lucide-react e dependencias de testes"
```

---

### Task 1.3: Configuração do Tailwind CSS e Design System de Alta Performance

**Files:**
- Modify: `tailwind.config.js`
- Create: `src/index.css`

**Step 1: Customizar o tailwind.config.js com a paleta premium Dark/Neon**

Substituir o conteúdo de `tailwind.config.js` para incluir os tokens visuais de GVITOR DESIGN:
- Background escuro: `#0B0B0B` (Rich Graphite Black)
- Acento Neon Primário (Cyan): `#00f0ff` (Electric Cyan)
- Acento Neon Secundário (Violet): `#ab20ff` (Magnetic Violet)
- Tipografia: *Syne* para títulos e *Plus Jakarta Sans* para o texto corrido.

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#0B0B0B',
        darkCard: '#121212',
        electricCyan: '#00f0ff',
        magneticViolet: '#ab20ff',
        neonGreen: '#39ff14',
      },
      fontFamily: {
        title: ['Syne', 'sans-serif'],
        body: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        neonCyan: '0 0 15px rgba(0, 240, 255, 0.4)',
        neonViolet: '0 0 15px rgba(171, 32, 255, 0.4)',
        neonGlow: '0 0 25px rgba(0, 240, 255, 0.25), 0 0 50px rgba(171, 32, 255, 0.15)',
      }
    },
  },
  plugins: [],
}
```

**Step 2: Configurar o index.css com as fontes modernas e estilos globais**

Criar ou sobrescrever `src/index.css` importando as fontes do Google Fonts e configurando scroll suave e o estilo padrão.

```css
@import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=Syne:wght@700;800&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  body {
    @apply bg-darkBg text-gray-100 font-body antialiased selection:bg-electricCyan selection:text-black overflow-x-hidden;
  }
  h1, h2, h3, h4, h5, h6 {
    @apply font-title;
  }
}

/* Custom scrollbar para visual premium */
::-webkit-scrollbar {
  width: 8px;
}
::-webkit-scrollbar-track {
  background: #0B0B0B;
}
::-webkit-scrollbar-thumb {
  background: #222;
  border-radius: 4px;
}
::-webkit-scrollbar-thumb:hover {
  background: #00f0ff;
}

.text-glow-cyan {
  text-shadow: 0 0 12px rgba(0, 240, 255, 0.5);
}

.text-glow-violet {
  text-shadow: 0 0 12px rgba(171, 32, 255, 0.5);
}
```

**Step 3: Testar se o build compila sem erros**

Run: `npm run build`
Expected: Compilação realizada com sucesso, gerando pasta `dist/`.

**Step 4: Commit**

```bash
git add src/index.css tailwind.config.js
git commit -m "style: configurar design system neon dark e fontes Syne/Plus Jakarta Sans"
```

---

### Task 1.4: Configuração e Setup da Suite de Testes (Vitest)

**Files:**
- Create: `vitest.config.ts`
- Create: `src/tests/setup.ts`

**Step 1: Criar o arquivo de configuração vitest.config.ts**

```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/tests/setup.ts',
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**Step 2: Criar o setup.ts para importar os matchers adicionais do testing-library**

```typescript
import '@testing-library/jest-dom';
```

**Step 3: Criar um teste simples para garantir que a suite de teste está operacional**

Criar `src/tests/smoke.test.tsx`:
```typescript
import { describe, it, expect } from 'vitest';

describe('Ambiente de Testes', () => {
  it('deve realizar operações matemáticas básicas corretamente', () => {
    expect(1 + 1).toBe(2);
  });
});
```

**Step 4: Executar e validar o teste**

Run: `npx vitest run src/tests/smoke.test.tsx`
Expected: 1 PASS

**Step 5: Commit**

```bash
git add vitest.config.ts src/tests/setup.ts src/tests/smoke.test.tsx
git commit -m "test: configurar ambiente de testes com Vitest e Testing Library"
```

---

## Fase 2: Desenvolvimento da UI/CSS (Tailwind) & Componentes

### Task 2.1: Desenvolvimento do Mock de Dados dos Projetos de Portfólio

**Files:**
- Create: `src/data/projects.ts`

**Step 1: Implementar os dados tipados de projetos de GVITOR**

Criar dados realistas com briefings fictícios, tags e caminhos de mídias estruturados para simular imagens estáticas HD e vídeos de motion design.

```typescript
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
      // Exemplo de vídeo incorporado (usando um vídeo público placeholder de alta qualidade)
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
```

**Step 2: Commit**

```bash
git add src/data/projects.ts
git commit -m "data: criar mock de projetos do portfolio com mídias e briefings reais"
```

---

### Task 2.2: Criação do Componente Navbar Premium (Glassmorphism + Efeito Blur)

**Files:**
- Create: `src/components/Navbar.tsx`

**Step 1: Implementar Navbar com blur backdrop flutuante**

Desenvolver um menu elegante, fixo no topo, com efeito de desfoque de fundo e links com transição hover neon.

```typescript
import React from 'react';
import { Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 bg-[#0B0B0B]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 transition-all duration-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <a href="#" className="flex items-center gap-2 group">
          <Sparkles className="w-6 h-6 text-electricCyan group-hover:rotate-12 transition-transform duration-300" />
          <span className="font-title tracking-wider font-extrabold text-xl bg-gradient-to-r from-white via-gray-300 to-electricCyan bg-clip-text text-transparent">
            GVITOR <span className="text-electricCyan">DESIGN</span>
          </span>
        </a>
        
        <div className="hidden md:flex items-center gap-8 font-medium">
          <a href="#portfolio" className="text-gray-400 hover:text-electricCyan hover:text-glow-cyan transition-colors duration-200">Portfólio</a>
          <a href="#about" className="text-gray-400 hover:text-electricCyan hover:text-glow-cyan transition-colors duration-200">Diferenciais</a>
          <a href="#contact" className="px-5 py-2 rounded-full border border-electricCyan/30 hover:border-electricCyan text-white bg-electricCyan/5 hover:bg-electricCyan/15 shadow-neonCyan/0 hover:shadow-neonCyan transition-all duration-300 text-sm">
            Fazer Orçamento
          </a>
        </div>
      </div>
    </nav>
  );
};
```

**Step 2: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "feat: criar componente Navbar flutuante com blur glassmorphic e acento ciano"
```

---

### Task 2.3: Hero Section com Headline de Alto Impacto e CTA Neon Vibrante

**Files:**
- Create: `src/components/Hero.tsx`

**Step 1: Implementar a Hero Section com animações de entrada utilizando Framer Motion**

Headline expressiva utilizando tipografia *Syne* com acentos neon e uma animação suave para capturar imediatamente a atenção do visitante.

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Play, Image as ImageIcon, ArrowDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-24 px-6 overflow-hidden bg-[radial-gradient(ellipse_at_center,rgba(171,32,255,0.08)_0%,rgba(0,0,0,0)_70%)]">
      {/* Luzes Neon Abstratas de Fundo */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-electricCyan/5 rounded-full blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-magneticViolet/5 rounded-full blur-[120px] pointer-events-none animate-pulse duration-500" />
      
      <div className="max-w-5xl mx-auto text-center z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm font-semibold mb-6 text-gray-300"
        >
          <span className="w-2 h-2 rounded-full bg-electricCyan animate-ping" />
          Motion Design & Social Media Premium
        </motion.div>
        
        <motion.h1
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-title text-5xl md:text-8xl font-extrabold tracking-tight leading-none mb-8"
        >
          Visual <span className="bg-gradient-to-r from-electricCyan to-magneticViolet bg-clip-text text-transparent">Imponente</span>,<br />
          Design que <span className="relative inline-block text-white">
            Converte
            <span className="absolute bottom-1 left-0 w-full h-2 bg-magneticViolet/40 -z-10" />
          </span>.
        </motion.h1>
        
        <motion.p
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10 font-normal leading-relaxed"
        >
          Transformo marcas através de motion designs fluidos e criativos de alto nível e artes estáticas impactantes de conversão extrema.
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 35 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#portfolio"
            className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-electricCyan to-magneticViolet hover:from-electricCyan/90 hover:to-magneticViolet/90 text-black font-extrabold rounded-full flex items-center justify-center gap-2 shadow-neonGlow hover:scale-105 transition-all duration-300"
          >
            <Play className="w-5 h-5 fill-black" /> Explorar Portfólio
          </a>
          <a
            href="#contact"
            className="w-full sm:w-auto px-8 py-4 bg-[#121212] border border-white/10 hover:border-white/20 text-white font-bold rounded-full flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300"
          >
            <ImageIcon className="w-5 h-5" /> Falar no WhatsApp
          </a>
        </motion.div>
      </div>

      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-40 animate-bounce">
        <span className="text-xs tracking-widest text-gray-400 font-bold uppercase">Role para baixo</span>
        <ArrowDown className="w-4 h-4 text-electricCyan" />
      </div>
    </section>
  );
};
```

**Step 2: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "feat: criar Hero section premium com efeitos neon de fundo e animacoes Framer Motion"
```

---

### Task 2.4: Seção "Sobre/Glow Up" Destacando Experiência & Autoridade

**Files:**
- Create: `src/components/About.tsx`

**Step 1: Criar componente About com estatísticas animadas e grid conceitual**

Implementar cartões com brilhos sutis destacando o fluxo de trabalho e especializações.

```typescript
import React from 'react';
import { motion } from 'framer-motion';
import { Layers, Video, Zap } from 'lucide-react';

export const About: React.FC = () => {
  const cards = [
    {
      icon: <Layers className="w-8 h-8 text-electricCyan" />,
      title: "Social Media Estático",
      desc: "Composições visuais ricas, tipografia autoral e design focado no comportamento de consumo e autoridade de marca."
    },
    {
      icon: <Video className="w-8 h-8 text-magneticViolet" />,
      title: "Motion Design de Impacto",
      desc: "Vídeos e criativos com movimentos orgânicos, som sincronizado e transições milimétricas feitas para prender a atenção em 3 segundos."
    },
    {
      icon: <Zap className="w-8 h-8 text-neonGreen" />,
      title: "Direção de Arte Premium",
      desc: "Criação de ecossistemas visuais complexos e identidades corporativas disruptivas feitas sob medida para líderes de marca."
    }
  ];

  return (
    <section id="about" className="py-24 px-6 bg-darkCard/30 relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-12 gap-12 items-center mb-16">
          <div className="md:col-span-5">
            <span className="text-xs uppercase tracking-widest text-electricCyan font-bold">SOBRE O PROCESSO</span>
            <h2 className="font-title text-4xl md:text-6xl font-bold mt-2 leading-tight">
              O Seu Negócio com Design <span className="bg-gradient-to-r from-electricCyan to-magneticViolet bg-clip-text text-transparent">Imponente</span>.
            </h2>
          </div>
          <div className="md:col-span-7">
            <p className="text-gray-400 text-lg leading-relaxed">
              Design não é apenas estética; é percepção de valor. Cada pixel é planejado estrategicamente para transformar a presença digital da sua marca. Unindo domínio técnico em Photoshop, After Effects e direção de arte, entrego soluções que colocam sua marca no topo da cadeia competitiva.
            </p>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.6, delay: idx * 0.15 }}
              className="p-8 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 relative overflow-hidden group hover:-translate-y-2 transition-all duration-300"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-white/[0.01] group-hover:bg-white/[0.03] transition-colors rounded-bl-full pointer-events-none" />
              <div className="mb-6">{card.icon}</div>
              <h3 className="font-title text-2xl font-bold mb-4">{card.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
```

**Step 2: Commit**

```bash
git add src/components/About.tsx
git commit -m "feat: criar secao sobre / diferenciais da marca com cards em glassmorphism"
```

---

### Task 2.5: Portfolio Grid Filtrável com Efeito Hover Neon e Layout Dinâmico

**Files:**
- Create: `src/components/PortfolioGrid.tsx`
- Test: `src/tests/PortfolioGrid.test.tsx`

**Step 1: Escrever teste de filtragem de projetos do Grid**

Validar que ao clicar no filtro de categoria, os projetos mostrados mudam de acordo.

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { PortfolioGrid } from '../components/PortfolioGrid';

describe('Componente PortfolioGrid', () => {
  it('deve renderizar todos os projetos inicialmente e aplicar filtros corretamente', () => {
    render(<PortfolioGrid onProjectSelect={() => {}} />);
    
    // Todos os projetos devem estar na tela
    expect(screen.getByText('Cyberpunk E-sports Campaign')).toBeInTheDocument();
    expect(screen.getByText('Neon Waves Music Video Motion')).toBeInTheDocument();
    
    // Clicar no filtro de Social Media
    const filterBtn = screen.getByRole('button', { name: /social media/i });
    fireEvent.click(filterBtn);
    
    // Deve exibir o de Social Media mas esconder o de Motion Design
    expect(screen.getByText('Cyberpunk E-sports Campaign')).toBeInTheDocument();
    expect(screen.queryByText('Neon Waves Music Video Motion')).not.toBeInTheDocument();
  });
});
```

**Step 2: Run test e confirmar falha (pois o componente não foi criado)**

Run: `npx vitest run src/tests/PortfolioGrid.test.tsx`
Expected: FAIL (módulo não encontrado)

**Step 3: Implementar o componente PortfolioGrid**

Grid dinâmico com categorias filtráveis (Todos, Social Media, Motion Design, Identidade Visual) com layout animado usando o Framer Motion.

```typescript
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Project, projectsData } from '../data/projects';
import { Grid, Play, Eye } from 'lucide-react';

interface PortfolioGridProps {
  onProjectSelect: (project: Project) => void;
}

type CategoryFilter = 'all' | 'social-media' | 'motion-design' | 'visual-identity';

export const PortfolioGrid: React.FC<PortfolioGridProps> = ({ onProjectSelect }) => {
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>('all');

  const filteredProjects = activeFilter === 'all'
    ? projectsData
    : projectsData.filter(p => p.category === activeFilter);

  const filters = [
    { label: 'Todos', id: 'all' as const },
    { label: 'Social Media', id: 'social-media' as const },
    { label: 'Motion Design', id: 'motion-design' as const },
    { label: 'Identidade Visual', id: 'visual-identity' as const }
  ];

  return (
    <section id="portfolio" className="py-24 px-6 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-xs uppercase tracking-widest text-electricCyan font-bold">GALERIA PREMIUM</span>
        <h2 className="font-title text-4xl md:text-6xl font-bold mt-2 mb-8">Trabalhos em Destaque</h2>
        
        {/* Filtros */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-6 py-2.5 rounded-full text-sm font-bold border transition-all duration-300 ${
                activeFilter === filter.id
                  ? 'bg-electricCyan text-black border-electricCyan shadow-neonCyan'
                  : 'bg-white/[0.02] text-gray-400 border-white/5 hover:border-white/20 hover:text-white'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Projetos */}
      <motion.div layout className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map(project => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              onClick={() => onProjectSelect(project)}
              className="group cursor-pointer rounded-2xl overflow-hidden bg-[#121212] border border-white/5 hover:border-electricCyan/40 hover:shadow-neonCyan transition-all duration-300 flex flex-col"
            >
              {/* Media Container com Hover Glow */}
              <div className="relative overflow-hidden aspect-[4/3] w-full bg-black/40">
                <img
                  src={project.heroImage}
                  alt={project.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 filter grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-black/40 opacity-100 group-hover:opacity-60 transition-opacity duration-300" />
                
                {/* Overlay interativo com ícone */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-14 h-14 bg-electricCyan text-black rounded-full flex items-center justify-center shadow-neonCyan hover:scale-110 transition-transform duration-300">
                    {project.category === 'motion-design' ? (
                      <Play className="w-6 h-6 fill-black translate-x-0.5" />
                    ) : (
                      <Eye className="w-6 h-6" />
                    )}
                  </div>
                </div>
                
                {/* Categoria tag flutuante */}
                <span className="absolute top-4 left-4 px-3.5 py-1 text-[10px] uppercase font-extrabold tracking-wider bg-black/80 backdrop-blur-md rounded-full text-electricCyan border border-electricCyan/20">
                  {project.category.replace('-', ' ')}
                </span>
              </div>

              {/* Detalhes do Projeto */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <span className="text-xs text-gray-500 font-bold block mb-1">{project.client} • {project.year}</span>
                  <h3 className="font-title text-xl font-bold group-hover:text-electricCyan transition-colors duration-300">{project.title}</h3>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
```

**Step 4: Run test para verificar aprovação**

Run: `npx vitest run src/tests/PortfolioGrid.test.tsx`
Expected: PASS

**Step 5: Commit**

```bash
git add src/components/PortfolioGrid.tsx src/tests/PortfolioGrid.test.tsx
git commit -m "feat: implementar grid filtrável de portfólio com animações fluidas do Framer Motion e testes"
```

---

## Fase 3: Lógica do Modal (React & Framer Motion)

### Task 3.1: Base do Modal Pop-up Interativo com Eventos do Teclado

**Files:**
- Create: `src/components/Modal.tsx`
- Test: `src/tests/Modal.test.tsx`

**Step 1: Escrever testes unitários para a abertura e fechamento do Modal**

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Modal } from '../components/Modal';
import { Project } from '../data/projects';

const mockProject: Project = {
  id: 'cyberpunk-ad',
  title: 'Cyberpunk E-sports Campaign',
  category: 'social-media',
  client: 'Apex Arena',
  year: '2026',
  challenge: 'Briefing desafio',
  solution: 'Solução legal',
  heroImage: 'image.jpg',
  media: [{ type: 'image', url: 'image.jpg', caption: 'Art work' }]
};

describe('Componente Modal Base', () => {
  it('deve disparar o fechamento ao clicar no botão de fechar', () => {
    const handleClose = vi.fn();
    render(<Modal project={mockProject} onClose={handleClose} onNext={() => {}} onPrev={() => {}} />);
    
    expect(screen.getByText('Cyberpunk E-sports Campaign')).toBeInTheDocument();
    
    const closeBtn = screen.getByLabelText('Fechar modal');
    fireEvent.click(closeBtn);
    expect(handleClose).toHaveBeenCalled();
  });
});
```

**Step 2: Run test e confirmar falha**

Run: `npx vitest run src/tests/Modal.test.tsx`
Expected: FAIL

**Step 3: Implementar o modal com suporte a controle de teclado (ESC) e transições fluidas**

Componente que atua como overlay absoluto com backdrop-blur super estético.

```typescript
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Briefcase, Award } from 'lucide-react';
import { Project } from '../data/projects';
import { MediaViewer } from './MediaViewer';

interface ModalProps {
  project: Project;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
}

export const Modal: React.FC<ModalProps> = ({ project, onClose, onNext, onPrev }) => {
  // Controle por teclado (ESC para fechar, setas para navegar)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') onNext();
      if (e.key === 'ArrowLeft') onPrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    // Bloquear scroll do body por baixo do modal aberto
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrev]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-8 overflow-y-auto">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/90 backdrop-blur-lg"
      />

      {/* Conteúdo do Modal */}
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 50, scale: 0.95 }}
        transition={{ type: 'spring', damping: 25, stiffness: 220 }}
        className="relative bg-[#121212] border border-white/10 w-full max-w-6xl rounded-3xl overflow-hidden shadow-neonGlow z-10 flex flex-col md:flex-row max-h-[85vh] md:max-h-[90vh]"
      >
        {/* Botão Fechar Modal Flutuante */}
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="absolute top-5 right-5 z-20 w-11 h-11 bg-black/60 backdrop-blur-md text-white rounded-full flex items-center justify-center hover:bg-electricCyan hover:text-black border border-white/10 hover:border-electricCyan hover:shadow-neonCyan transition-all duration-300 cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lado Esquerdo: Portfólio de Mídia */}
        <div className="w-full md:w-3/5 bg-black/40 overflow-y-auto p-6 md:p-8 flex flex-col gap-6 scrollbar-thin">
          {project.media.map((item, index) => (
            <MediaViewer key={index} media={item} />
          ))}
        </div>

        {/* Lado Direito: Metadados do Briefing */}
        <div className="w-full md:w-2/5 p-6 md:p-10 border-t md:border-t-0 md:border-l border-white/5 flex flex-col justify-between overflow-y-auto bg-darkCard/50">
          <div className="space-y-6">
            <div>
              <span className="text-xs font-extrabold uppercase text-electricCyan tracking-wider flex items-center gap-1.5">
                <Briefcase className="w-3.5 h-3.5" /> {project.client}
              </span>
              <h2 className="font-title text-3xl font-extrabold mt-1 text-white tracking-tight leading-tight">
                {project.title}
              </h2>
              <span className="text-xs text-gray-500 font-medium block mt-1">Ano do Projeto: {project.year}</span>
            </div>

            <hr className="border-white/5" />

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5" /> O DESAFIO (BRIEFING)
              </span>
              <p className="text-gray-400 text-sm leading-relaxed">{project.challenge}</p>
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase text-gray-500 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-magneticViolet" /> A SOLUÇÃO CREATIVE
              </span>
              <p className="text-gray-400 text-sm leading-relaxed">{project.solution}</p>
            </div>
          </div>

          {/* Navegação Entre Projetos no Modal */}
          <div className="flex items-center justify-between mt-10 pt-6 border-t border-white/5">
            <button
              onClick={onPrev}
              className="flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-electricCyan transition-colors cursor-pointer group"
            >
              <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" /> Projeto Anterior
            </button>
            <button
              onClick={onNext}
              className="flex items-center gap-1.5 text-sm font-bold text-gray-400 hover:text-electricCyan transition-colors cursor-pointer group"
            >
              Próximo Projeto <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
```

**Step 4: Criar o componente stub MediaViewer (para que compile) e rodar testes**

Criar `src/components/MediaViewer.tsx` temporário no Step 5.

**Step 5: Commit**

```bash
git add src/components/Modal.tsx src/tests/Modal.test.tsx
git commit -m "feat: criar base do Modal premium com navegabilidade por teclado e transicoes spring"
```

---

## Fase 4: Otimização de Mídia e Performance

### Task 4.1: Renderizador e Otimizador de Mídia (Imagens HD & Player de Vídeo Assíncrono)

**Files:**
- Create: `src/components/MediaViewer.tsx`

**Step 1: Implementar o visualizador inteligente de imagens e player de vídeo assíncrono**

Evita lentidão carregando o iframe de vídeo apenas sob demanda ou usando capas customizadas de alta performance com lazy load.

```typescript
import React, { useState } from 'react';
import { Play } from 'lucide-react';

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
                  src={media.thumbnail}
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
              className="absolute inset-0 w-full h-full"
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
          src={media.url}
          alt={media.caption || 'Visual do Portfólio'}
          loading="lazy"
          className="w-full h-auto object-cover max-h-[500px]"
        />
      </div>
      {media.caption && <span className="text-xs text-gray-500 font-semibold px-2">{media.caption}</span>}
    </div>
  );
};
```

**Step 2: Rodar todos os testes para garantir a integração das Fases 2 e 3**

Run: `npx vitest run`
Expected: Todos os testes (Smoke, PortfolioGrid, Modal) devem passar!

**Step 3: Commit**

```bash
git add src/components/MediaViewer.tsx
git commit -m "perf: otimizar carregamento de midias com player de video carregado sob demanda (lazy load iframe)"
```

---

### Task 4.2: Seção de Contato "Vamos Impactar" e Integração Principal

**Files:**
- Create: `src/components/Contact.tsx`
- Modify: `src/App.tsx`
- Test: `src/tests/App.test.tsx`

**Step 1: Criar a Seção de Contato premium com formulário e redirecionamentos neon**

```typescript
import React, { useState } from 'react';
import { Send, Phone, MessageSquare, ExternalLink } from 'lucide-react';

export const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Monta a mensagem personalizada para enviar para o WhatsApp
    const text = `Olá GVITOR! Meu nome é ${formData.name}. Gostaria de falar sobre um projeto.\nE-mail: ${formData.email}\n\nMensagem:\n${formData.message}`;
    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/5511999999999?text=${encodedText}`, '_blank');
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-5xl mx-auto border-t border-white/5">
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-widest text-electricCyan font-bold">VAMOS CRIAR JUNTOS?</span>
          <h2 className="font-title text-4xl md:text-6xl font-bold tracking-tight">Vamos Impactar o Mercado.</h2>
          <p className="text-gray-400 text-lg leading-relaxed">
            Seja para turbinar sua marca com motion design de ponta ou dominar o feed com artes imponentes, estou à disposição para elevar o nível da sua marca. Preencha ou chame direto no Zap!
          </p>
          <div className="flex flex-col gap-4 pt-4">
            <a href="https://wa.me/5511999999999" target="_blank" className="flex items-center gap-3 text-gray-300 hover:text-electricCyan duration-300">
              <Phone className="w-5 h-5 text-electricCyan" /> +55 11 99999-9999
            </a>
            <a href="https://instagram.com/gvitordesign" target="_blank" className="flex items-center gap-3 text-gray-300 hover:text-electricCyan duration-300">
              <MessageSquare className="w-5 h-5 text-magneticViolet" /> @gvitordesign
            </a>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-8 rounded-3xl bg-white/[0.01] border border-white/5 shadow-neonGlow/10 flex flex-col gap-6">
          <div>
            <label className="text-xs uppercase font-extrabold text-gray-400 tracking-wider block mb-2">Seu Nome</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={e => setFormData({ ...formData, name: e.target.value })}
              placeholder="Digite seu nome"
              className="w-full bg-[#161616] border border-white/5 focus:border-electricCyan rounded-xl px-4 py-3.5 text-white outline-none transition-all duration-300"
            />
          </div>
          <div>
            <label className="text-xs uppercase font-extrabold text-gray-400 tracking-wider block mb-2">Seu E-mail</label>
            <input
              type="email"
              required
              value={formData.email}
              onChange={e => setFormData({ ...formData, email: e.target.value })}
              placeholder="seu.email@exemplo.com"
              className="w-full bg-[#161616] border border-white/5 focus:border-electricCyan rounded-xl px-4 py-3.5 text-white outline-none transition-all duration-300"
            />
          </div>
          <div>
            <label className="text-xs uppercase font-extrabold text-gray-400 tracking-wider block mb-2">Mensagem/Briefing</label>
            <textarea
              required
              rows={4}
              value={formData.message}
              onChange={e => setFormData({ ...formData, message: e.target.value })}
              placeholder="Descreva brevemente o seu projeto..."
              className="w-full bg-[#161616] border border-white/5 focus:border-electricCyan rounded-xl px-4 py-3.5 text-white outline-none transition-all duration-300 resize-none"
            />
          </div>
          <button type="submit" className="w-full py-4 rounded-xl bg-electricCyan text-black font-extrabold hover:shadow-neonCyan duration-300 transition-all flex items-center justify-center gap-2 cursor-pointer">
            <Send className="w-4 h-4 fill-black" /> Enviar Mensagem no WhatsApp
          </button>
        </form>
      </div>
    </section>
  );
};
```

**Step 2: Implementar a orquestração principal no App.tsx**

Conectar a Navbar, Hero, About, PortfolioGrid, o estado do Modal selecionado (com navegação) e o Contact.

```typescript
import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { PortfolioGrid } from './components/PortfolioGrid';
import { Modal } from './components/Modal';
import { Contact } from './components/Contact';
import { Project, projectsData } from './data/projects';

export const App: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const handleNextProject = () => {
    if (!selectedProject) return;
    const currentIndex = projectsData.findIndex(p => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % projectsData.length;
    setSelectedProject(projectsData[nextIndex]);
  };

  const handlePrevProject = () => {
    if (!selectedProject) return;
    const currentIndex = projectsData.findIndex(p => p.id === selectedProject.id);
    const prevIndex = (currentIndex - 1 + projectsData.length) % projectsData.length;
    setSelectedProject(projectsData[prevIndex]);
  };

  return (
    <div className="relative min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <PortfolioGrid onProjectSelect={setSelectedProject} />
      <Contact />
      
      {/* Modal com Framer Motion AnimatePresence para saída suave */}
      <AnimatePresence>
        {selectedProject && (
          <Modal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
            onNext={handleNextProject}
            onPrev={handlePrevProject}
          />
        )}
      </AnimatePresence>

      <footer className="py-8 text-center text-xs text-gray-600 border-t border-white/5">
        © {new Date().getFullYear()} GVITOR DESIGN. Todos os direitos reservados.
      </footer>
    </div>
  );
};

export default App;
```

**Step 3: Criar teste de integração para o App**

Criar `src/tests/App.test.tsx` garantindo que o fluxo fim a fim funciona e o modal abre corretamente ao interagir com o Grid.

```typescript
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import App from '../App';

describe('Integração Completa do App', () => {
  it('deve permitir abrir e navegar no modal ao clicar nos itens do portfolio', () => {
    render(<App />);
    
    // O modal deve estar fechado inicialmente
    expect(screen.queryByText('O DESAFIO (BRIEFING)')).not.toBeInTheDocument();
    
    // Clicar no projeto para abrir o modal
    const projectCard = screen.getByText('Cyberpunk E-sports Campaign');
    fireEvent.click(projectCard);
    
    // O modal deve abrir com as informações corretas
    expect(screen.getByText('O DESAFIO (BRIEFING)')).toBeInTheDocument();
    expect(screen.getByText('Cyberpunk E-sports Campaign')).toBeInTheDocument();
  });
});
```

**Step 4: Executar suite de teste final**

Run: `npx vitest run`
Expected: Todos os testes (Smoke, PortfolioGrid, Modal, App) PASS com 100% de sucesso.

**Step 5: Testar o build de produção final**

Run: `npm run build`
Expected: Compilação sem nenhum erro ou aviso de lint crítico.

**Step 6: Commit**

```bash
git add src/components/Contact.tsx src/App.tsx src/tests/App.test.tsx
git commit -m "feat: conectar ecossistema completo do app com secao de contato premium e testes de integracao"
```
