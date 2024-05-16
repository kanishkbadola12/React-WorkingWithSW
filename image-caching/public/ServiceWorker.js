const version = 1;
const imageCacheName = `imagesCache ${version}`;
const webPageCacheName = `webPages ${version}`;
let assets = ['/src/components/Error.jsx'];

self.addEventListener('install', () => {
    console.log(`Version ${version} installed`)
});

self.addEventListener('activate', (event) => {
    const activateSW = async () => {
        const cacheNames = await caches.keys();

        return Promise.all(
            cacheNames.map(cache => {
                //updating the cache to always be the latest.
                if (cache != imageCacheName && cache != webPageCacheName) {
                    return caches.delete(cache);
                }
            })
        );
    }

    event.waitUntil(activateSW());
});

self.addEventListener('fetch', (event) => {
    const fetchData = async () => {
        const cacheResponse = await caches.match(event.request);

        //if data is found from cache, return it. No need to make a fetch call.
        if (cacheResponse) {
            return cacheResponse;
        }

        const fetchResponse = await fetch(event.request);
        const type = fetchResponse.headers.get('content-type');

        //caching image data.
        if (fetchResponse.type === 'opaque') {
            const imageCache = await caches.open(imageCacheName);
            imageCache.put(event.request, fetchResponse.clone());
        }

        console.log(type)
        //caching web pages.
        if(type === 'text/javascript') {
            const webPageCache = await caches.open(webPageCacheName);
            webPageCache.put(event.request, fetchResponse.clone());
        }

        return fetchResponse;
    }

    event.respondWith(fetchData());
});

self.addEventListener('message', () => { });