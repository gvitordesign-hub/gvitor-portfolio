# 🎨 GVITOR DESIGN — Guia de Tamanhos e Especificações de Mídias

Este guia prático foi criado para orientar o desenvolvimento e exportação das peças visuais (estáticas e animadas) para o seu site portfólio. Seguir estas proporções garante que o design não sofra cortes indesejados, carregue instantaneamente (lazy loading) e mantenha qualidade cristalina em telas Retina ou dispositivos móveis.

---

## 🛠️ Resumo de Proporções e Tamanhos Recomendados

| Localização / Tipo de Mídia | Proporção (Aspect Ratio) | Resolução Recomendada (Exportação) | Resolução de Exibição Dinâmica | Formato Ideal |
| :--- | :---: | :---: | :---: | :---: |
| **Capa do Projeto (Grid Principal)** | **4:3** | **1200 × 900 px** | 800 × 600 px *(redimensionado para 600px via CDN)* | `.webp` ou `.jpg` (alto contraste) |
| **Thumbnails / Capas de Vídeo (Modal)** | **16:9** | **1920 × 1080 px** (FHD) | Redimensionado para 800 × 450 px | `.webp` ou `.jpg` |
| **Imagens de Detalhe — Quadrada (Modal)** | **1:1** | **1200 × 1200 px** | Largura adaptativa *(máx. 500px altura)* | `.png` ou `.webp` |
| **Imagens de Detalhe — Retrato (Modal)** | **4:5** (Feed Instagram) | **1080 × 1350 px** | Largura adaptativa *(máx. 500px altura)* | `.png` ou `.webp` |
| **Imagens de Detalhe — Horizontal (Modal)**| **16:9** ou **2.4:1** (Widescreen)| **1920 × 1080 px** ou **1200 × 500 px** | Largura adaptativa *(largura total 3/5)* | `.png` ou `.webp` |
| **Mídia de Vídeo Embutido (Modal)** | **16:9** | Link de Vídeo (Vimeo ou YouTube) | Player Interativo Integrado | Streaming HLS/Dash |

---

## 🔍 Detalhamento Técnico e Aplicações no Código

### 1. Capa do Grid de Projetos (`heroImage`)
A capa que aparece no grid principal da página inicial usa a classe CSS `aspect-[4/3] w-full h-full object-cover`. 
* **Proporção:** **4:3**.
* **Como exportar:** Crie uma prancheta de **1200 × 900 px**. Coloque as principais informações (como o título do projeto ou o artista principal) centralizadas, pois haverá um leve efeito de zoom no *hover* (foco/passada do mouse).
* **Dica de Visual:** O site utiliza uma estética Dark premium com neon e escala de cinza por padrão. Ao passar o mouse, a imagem sai da escala de cinza e brilha. Cores neon pulsantes em tons de **Azul Elétrico/Ciano** (`#00f0ff`) ou **Violeta Magnético** (`#ab20ff`) geram um impacto altíssimo nas bordas neon do card.

### 2. Thumbnails de Vídeos no Modal
Quando um projeto contém mídias do tipo `video`, o site carrega uma capa estática interativa com um botão de play neon flutuante. O player oficial é gerado sob a proporção clássica de vídeo.
* **Proporção:** **16:9** (`aspect-video`).
* **Como exportar:** **1920 × 1080 px** (ou no mínimo **1280 × 720 px**).
* **Comportamento:** O código executa lazy loading inteligente chamando a imagem otimizada com largura de `800px` para carregar imediatamente.

### 3. Imagens Estáticas dentro do Modal (Detalhamento do Case)
As artes de Social Media, Posters e Identidade Visual são exibidas no lado esquerdo do modal (que ocupa 3/5 da tela). O CSS limita a altura máxima das imagens em **500px** (`max-h-[500px] object-cover`) para garantir que caibam perfeitamente na janela do usuário sem exigir rolagens infinitas.
* **Artes Quadradas (1:1):** **1080 × 1080 px** ou **1200 × 1200 px**. Elas preenchem as laterais do modal de forma muito harmoniosa.
* **Artes Verticais de Feed (4:5):** **1080 × 1350 px**. Excelente opção para designs de Social Media, exibindo o máximo de detalhamento vertical.
* **Panorâmicas / Banners Digitais:** **1200 × 500 px** ou **1920 × 1080 px**. Ideal para mostrar apresentações completas de campanhas ou line-ups horizontais.

---

## ⚡ Otimizador Automático de Mídia (Tecnologia do Site)
Você não precisa se preocupar em deixar o site pesado! O portfólio já conta com uma função otimizadora de imagem chamada `getOptimizedImageUrl` configurada em `src/utils/imageOptimizer.ts`.
* Se você hospedar as imagens no **Supabase Storage**, a plataforma irá automaticamente convertê-las para o formato de alta performance `.webp` e redimensionar a largura dinamicamente de acordo com o dispositivo do cliente.
* Isso significa que você pode exportar suas mídias com **alta definição e fidelidade de cores** (RGB padrão de tela) e o próprio site se encarrega de compactar e reduzir o tamanho dos arquivos na entrega.
