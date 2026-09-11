# Quebra-Prêmio

Protótipo do jogo educativo em que a pessoa responde desafios, monta um
quebra-cabeça peça por peça e desbloqueia um prêmio real ao completar.

## O que tem aqui

- **`index.html`** — o app inteiro (React embutido via CDN, sem processo de
  build). É o arquivo que o navegador abre.
- **`manifest.json`** — configuração do PWA (nome, cores, ícones).
- **`service-worker.js`** — cacheia o app para abrir rápido mesmo com internet
  instável.
- **`icons/`** — ícones do app nos tamanhos exigidos por Android/iOS.

Não tem `package.json`, não tem `node_modules` — é site estático puro.

## Rodando localmente

Não dá pra abrir `index.html` direto com duplo clique quando o service worker
está ativo (navegadores bloqueiam alguns recursos em `file://`). Para testar
localmente como se fosse produção, sirva a pasta com qualquer servidor
estático, por exemplo:

```bash
npx serve .
```

## Deploy no Cloudflare Pages

1. Suba este repositório pro GitHub.
2. No Cloudflare Pages, "Create a project" → conecte o repositório.
3. Configuração de build:
   - **Framework preset:** None
   - **Build command:** (deixe vazio)
   - **Build output directory:** `/`
4. Deploy. O Cloudflare já serve tudo com HTTPS, então o PWA fica instalável
   automaticamente (Chrome/Android mostram o prompt "Instalar app"; no iPhone
   a pessoa usa Compartilhar → "Adicionar à Tela de Início").

## Próximo passo

As perguntas hoje estão fixas dentro do `index.html` (array `AREAS`). Quando
entrar a geração via IA e/ou um banco de dados, isso vira uma chamada de API —
nesse momento vale considerar migrar para um projeto com build (Vite) e,
possivelmente, Cloudflare Pages Functions ou Workers para a parte de backend.
