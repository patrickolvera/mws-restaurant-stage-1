/***************************************************************
 * Cache name and project files to store in cache
 ***************************************************************/

const cacheName = 'restaurantReviewApp.1.0';
const cacheFiles = [
    '/',
    '/index.html',
    '/restaurant.html',
    '/css/styles.css',
    '/js/dbhelper.js',
    '/js/main.js',
    '/js/restaurant_info.js',
    '/data/restaurants.json',
    '/img/1.jpg',
    '/img/2.jpg',
    '/img/3.jpg',
    '/img/4.jpg',
    '/img/5.jpg',
    '/img/6.jpg',
    '/img/7.jpg',
    '/img/8.jpg',
    '/img/9.jpg',
    '/img/10.jpg'
];

/***************************************************************
 * Cache Important Files on ServiceWorker Install
 ***************************************************************/

self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(cacheName).then(cache => {
            console.log(`Opened cache: ${cacheName}`);
            return cache.addAll(cacheFiles)
        })
    );
});

/***************************************************************
 * Use cached data when available, and cache new requests
 ***************************************************************/

self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request).then(response => {
            if (response) {
                console.log(`${event.request} was found in the cache.`);
                return response;
            } else {
                console.log(`Unable to find ${event.request} in catch. Fetching...`);
                return fetch(event.request)
                .then(response => {
                    const responseClone = response.clone();
                    caches.open(cacheName).then(cache => {
                        cache.put(event.request, responseClone);
                    })
                    return response;
                })
                .catch(err => {
                    console.error(err);
                })
            }
        })
    );
});