const CACHE = 'meta-v2';

// Don't cache anything — let the network handle it
// This prevents the SW from intercepting the OAuth redirect
self.addEventListener('install', e => {
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Pass everything through to network, no caching
self.addEventListener('fetch', e => {
  e.respondWith(fetch(e.request));
});
