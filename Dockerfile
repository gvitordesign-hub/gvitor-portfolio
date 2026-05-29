# --- ESTÁGIO 1: COMPILAÇÃO DA APLICAÇÃO ---
FROM node:20-alpine AS build-stage

WORKDIR /app

# Copiar arquivos de dependências primeiro para aproveitar o cache de camadas do Docker
COPY package*.json ./

# Instalar dependências de compilação
RUN npm install

# Copiar o resto do código do projeto
COPY . .

# Compilar o portfólio para produção (gera a pasta /app/dist)
RUN npm run build

# --- ESTÁGIO 2: SERVIDOR NGINX DE PRODUÇÃO ---
FROM nginx:alpine

# Copiar os arquivos estáticos compilados do estágio anterior
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Copiar o arquivo de configuração customizado do Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80 para acesso web externo
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
