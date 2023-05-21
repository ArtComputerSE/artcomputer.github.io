navigator.serviceWorker.register('service-worker.js');

const sendNotification = (notificationJson) => {
    navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(notificationJson.title, {'body': notificationJson.body});
    });
}

const requestPermission = async () => {
    let notifyPermission = await Notification.requestPermission();
    console.log(notifyPermission);
}

// Add an event listener to listen for messages
navigator.serviceWorker.addEventListener('message', (event) => {
    // Check the origin of the message to ensure it's from the service worker
    console.log('event from', event.origin);
    if (event.origin === self.location.origin) {
        // Handle the received message
        console.log('Message received:', event.data);
        const logList = document.getElementById('log');
        const li = document.createElement('li');
        li.textContent = event.data;
        logList.appendChild(li);
    }
});
