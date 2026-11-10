# Área admin (`/acessoadmin`) — configuração do Firebase

O painel em `gvitor.com.br/acessoadmin` usa **Firebase Authentication** (e-mail e senha).
O login só protege de verdade quando as **regras** do Firestore e do Storage estão publicadas:
são elas que impedem qualquer outra pessoa de alterar o portfólio.

## 1. Preencher o `.env`
Copie as chaves do Firebase Console → Configurações do projeto → Seus apps (app Web) para `.env`:

```
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_FIREBASE_STORAGE_BUCKET=...
VITE_FIREBASE_MESSAGING_SENDER_ID=...
VITE_FIREBASE_APP_ID=...
```

Essas chaves identificam o projeto e não são segredo — a segurança vem das regras (passo 3).
As variáveis `VITE_*` são embutidas no site na hora do build (`npm run build` / Docker).

## 2. Criar a sua conta de administrador
1. Firebase Console → **Authentication** → **Começar** → aba **Sign-in method** → ative **E-mail/senha**.
2. Aba **Users** → **Adicionar usuário** → informe seu e-mail e uma senha forte (use um gerenciador de senhas).
3. Copie o **UID de usuário** dessa conta (coluna na lista de usuários).

## 3. Publicar as regras
1. Abra `firestore.rules` e `storage.rules` e troque `SEU_UID_AQUI` pelo UID copiado.
2. Publique (uma das opções):
   - **Console:** Firestore Database → Regras → cole o conteúdo de `firestore.rules` → Publicar. Depois Storage → Regras → cole `storage.rules` → Publicar.
   - **CLI:** `npm i -g firebase-tools`, `firebase login`, `firebase use --add` (escolha o projeto) e `firebase deploy --only firestore:rules,storage`.

## 4. Conferir
- Acesse `/acessoadmin`, entre com e-mail e senha e publique um projeto de teste.
- Numa janela anônima, abra o site: os projetos aparecem normalmente (leitura pública).
- **Importante:** depois de publicar as regras, o "modo teste" (leitura/escrita anônima) deixa de valer. Se algo no painel der erro de permissão, confira o UID nas duas regras.

## Dicas
- Esqueceu a senha? Firebase Console → Authentication → Users → ⋮ → **Redefinir senha**.
- Não crie contas extras no Authentication: as regras só aceitam o UID do dono, mas manter só uma conta reduz riscos.
- Na primeira vez que você entrar com a coleção `projects` vazia, o painel grava os projetos de exemplo do site no Firestore (uma única vez).
