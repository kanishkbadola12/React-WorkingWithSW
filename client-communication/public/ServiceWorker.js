const version = 1;

self.addEventListener('install', () => {
    console.log(`Version ${version} installed`);
});

self.addEventListener('activate', () => { });

self.addEventListener('fetch', () => { });

self.addEventListener('message', async (event) => {
    const allClients = await clients.matchAll({ includeUncontrolled: true });
    
    allClients.forEach(client => {
        client.postMessage(event.data);
    });
});