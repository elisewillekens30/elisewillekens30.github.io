var cacheName = 'h2o-pwa';
var filesToCache = [
  'https://elisewillekens30.github.io/H2O/index.html',
  'https://elisewillekens30.github.io/H2O/css/style.css',
  'https://elisewillekens30.github.io/H2O/js/script.js'
];

/* Cache contents when Offline See Cache */
self.addEventListener('install', function(e) {
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      return cache.addAll(filesToCache);
    })
  );
});

/* Serve cached content when offline, examine Cache Storage */
self.addEventListener('fetch', function(e) {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});