// THFC Dashboard service worker.
// Strategy: network-first for navigation/app-shell requests so a completed
// match deployment is visible immediately, with cache fallback for offline
// use. Other requests also try the network before their cached fallback.
// CACHE_NAME is auto-versioned by build.js on every build (see mv9ffjij
// below) — this used to be a static string that never changed, meaning the
// browser could never detect a new deploy and kept serving old cached
// index.html indefinitely. Now every `node build.js` run bakes in a fresh
// timestamp, so returning visitors always pick up the latest build.
const CACHE_NAME = 'thfc-dashboard-mv9ffjij';
const SHELL_FILES = ['./', './index.html', './manifest.json'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(SHELL_FILES))
  );
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)))
    )
  );
  self.clients.claim();
});

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;

  // App shell: network-first so returning visitors cannot remain pinned to
  // stale match data after a deploy; cache the successful response for the
  // next offline load.
  if (SHELL_FILES.some((f) => request.url.endsWith(f.replace('./', '')) || request.url.endsWith('/'))) {
    event.respondWith(
      fetch(request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
          return response;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Everything else (news feeds, future API calls): network-first, cache as fallback
  event.respondWith(
    fetch(request)
      .then((response) => {
        const copy = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(request, copy));
        return response;
      })
      .catch(() => caches.match(request))
  );
});
