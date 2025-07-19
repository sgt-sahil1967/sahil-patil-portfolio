// Service Worker for caching static assets
const CACHE_NAME = 'portfolio-v1';
const urlsToCache = [
  '/',
  '/static/css/style.min.css',
  '/static/js/script.min.js',
  '/static/images/bg-yellow.webp',
  '/static/images/bg-orange.webp',
  '/static/images/bg-purple.webp',
  '/static/images/bg-blue.webp',
  '/static/images/bg-green.webp',
  '/static/themes.json'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response;
        }
        return fetch(event.request);
      }
    )
  );
});