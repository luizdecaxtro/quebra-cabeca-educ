// service-worker.js
// Estratégia simples: cacheia o "app shell" (HTML/CSS/JS estáticos) para abrir
// instantaneamente mesmo com internet ruim, e busca dados (perguntas, progresso,
// prêmios) sempre da rede, já que isso muda e não deve ficar em cache.

const CACHE_NAME = "quebra-premio-shell-v1";

// Ajuste esta lista para os arquivos reais gerados pelo seu build
// (ex.: os arquivos com hash que o Vite/CRA produzem em /dist ou /build).
const APP_SHELL = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((nomes) =>
      Promise.all(
        nomes
          .filter((nome) => nome !== CACHE_NAME)
          .map((nome) => caches.delete(nome))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const url = new URL(event.request.url);

  // Nunca cacheia chamadas de API (perguntas, progresso, prêmios devem ser sempre atuais)
  if (url.pathname.startsWith("/api/")) {
    event.respondWith(fetch(event.request));
    return;
  }

  // Para o resto (app shell), tenta cache primeiro, cai pra rede se não achar
  event.respondWith(
    caches.match(event.request).then((respostaCache) => {
      return respostaCache || fetch(event.request);
    })
  );
});
