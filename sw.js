const CACHE_NAME = "resturant-cache-v1";
const CACHE_URLS = ['/css/main.css',
                    '/js/main.js',
                    '/js/dbhelper.js',
                    '/js/restaurant_info.js',
                    '/index.html',
                    '/restaurant.html',
                    '/data/restaurants.json',
                    'https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css',
                    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.js',
                    'https://unpkg.com/leaflet@1.3.1/dist/leaflet.css',
                    'https://fonts.googleapis.com/css?family=Roboto',
                    '/img/1.jpg',
                    '/img/2.jpg',
                    '/img/3.jpg',
                    '/img/4.jpg',
                    '/img/5.jpg',
                    '/img/6.jpg',
                    '/img/7.jpg',
                    '/img/8.jpg',
                    '/img/9.jpg',
                    '/img/10.jpg',
                    ];

initCache = () => {
  console.log("Caching files");
  caches.open(CACHE_NAME).then((cache) => cache.addAll(CACHE_URLS))
  .catch(()=> console.log("There were some errors while caching files"));
}


installServiceWorker = (evt) => {
  console.log("Installing Service Worker");
  evt.waitUntil(
    initCache()
  );
}

// Thanks https://developers.google.com/web/ilt/pwa/caching-files-with-service-worker
handleFetchRequests = (evt) => {
  //Ignoresearch to not capture query urls and prevent js from working
  evt.respondWith(
    caches.match(evt.request, {ignoreSearch: true}).then(response => {
        return response || fetch(evt.request);
    })
    .catch(err => console.log(err, evt.request))
);

}
self.addEventListener('install',installServiceWorker);
self.addEventListener('fetch',handleFetchRequests);