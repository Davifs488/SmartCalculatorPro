const CACHE_NAME = "smart-calculator-v1";

const urlsToCache = [

    "./",
    "./index.html",
    "./css/style.css",
    "./js/script.js",
    "./manifest.json"

];

// Instala o Service Worker

self.addEventListener("install", event => {

    event.waitUntil(

        caches.open(CACHE_NAME)

            .then(cache => {

                return cache.addAll(urlsToCache);

            })

    );

});

// Ativa

self.addEventListener("activate", event => {

    event.waitUntil(

        self.clients.claim()

    );

});

// Busca arquivos

self.addEventListener("fetch", event => {

    event.respondWith(

        caches.match(event.request)

            .then(response => {

                return response || fetch(event.request);

            })

    );

});