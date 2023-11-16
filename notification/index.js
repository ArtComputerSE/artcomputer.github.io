if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register('service-worker.js')
        .then(_r => show("Service worker registration done!"));
} else {
    show("This browser has no support for service worker!")
}

const sendNotification = (notificationJson) => {
    navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(notificationJson.title, {'body': notificationJson.body});
    });
}

const requestPermission = async () => {
    if (!("Notification" in window)) {
        show("This browser does not support notifications.");
    } else {
        let notifyPermission = await Notification.requestPermission();
        show(notifyPermission);
    }
}

// Add an event listener to listen for messages
navigator.serviceWorker.addEventListener('message', (event) => {
    // Check the origin of the message to ensure it's from the service worker
    console.log('event from', event.origin);
    if (event.origin === self.location.origin) {
        // Handle the received message
        console.log('Message received:', event.data);
        show(event.data);
    }
});

function show(textContent) {
    const logList = document.getElementById('log');
    const li = document.createElement('li');
    li.textContent = textContent;
    logList.appendChild(li);
}
