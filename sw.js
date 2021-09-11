self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open('v1').then((cache) => {
            return cache.addAll([
                'index.html',
                'style.css',
                'app.js',
                'config.js',
                'redirect.js',
                'favicon.png'
            ])
        })
    )
})

self.addEventListener('fetch', (event) => {
    event.respondWith(caches.match(event.request).then((response) => {
        if (response !== undefined) {
            return response
        } else {
            return fetch(event.request).then((response) => {
                let responseClone = response.clone()
                caches.open('v1').then((cache) => {
                    cache.put(event.request, responseClone)
                })
                return response;
            })
        }
    }))
})
