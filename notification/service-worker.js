// The service worker!
console.log('Hello from service worker') ;

self.addEventListener("notificationclick", (event) => {
    console.log("On notification click: ", event.notification.tag);
    console.log(event.notification);

    event.waitUntil(
        self.clients
            .matchAll()
            .then((clientList) => {
                clientList.forEach(function(client) {
                    client.postMessage('Notification clicked');
                });
            })
    );
    event.notification.close();
});

self.addEventListener('activate', function(event) {
    // Perform actions when the service worker is activated
    console.log('Service worker activated');

    // Optional: Claiming clients to take immediate control
    event.waitUntil(self.clients.claim());
});

