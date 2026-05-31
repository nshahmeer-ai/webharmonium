const CACHE_NAME = 'learnharmonium-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/index.css',
  '/icon.svg',
  '/manifest.json',
  '/js/app.js',
  '/js/engine/AudioEngine.js',
  '/js/models/AppModel.js',
  '/js/models/NoteModel.js',
  '/js/models/ArticleModel.js',
  '/js/models/RaagModel.js',
  '/js/models/AIModel.js',
  '/js/views/NavView.js',
  '/js/views/HeroView.js',
  '/js/views/StatsView.js',
  '/js/views/HarmoniumView.js',
  '/js/views/FeaturesView.js',
  '/js/views/RaagView.js',
  '/js/views/ArticleView.js',
  '/js/views/AIView.js',
  '/js/views/FooterView.js',
  '/js/controllers/HarmoniumController.js',
  '/js/controllers/ArticleController.js',
  '/js/controllers/AIController.js',
  '/js/controllers/AppController.js',
  'https://unpkg.com/lucide@latest'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE);
    }).catch(err => {
      console.warn('Failed to cache all assets during install:', err);
    })
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return;
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request).catch(() => {
        // Fallback for offline mode if the fetch fails
        if (event.request.destination === 'document') {
          return caches.match('/');
        }
      });
    })
  );
});
