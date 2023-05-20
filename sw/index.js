navigator.serviceWorker.register('service-worker.js');

const sendNotification = (notificationJson) => {
    navigator.serviceWorker.ready.then((registration) => {
        registration.showNotification(notificationJson.title, {'body':'body'});
    });
/*    notification = new Notification(notificationJson.title,
        {
            body: notificationJson.body,
            icon: notificationJson.icon
        });
    notification.addEventListener('error', (event) => {
        console.log("ERROR", event);
    });
    notification.addEventListener('click', (event) => {
        console.log("CLICK")
    });
    console.log(notification);
    setTimeout(() => {
        notification.close();
    }, 10 * 1000);*/
}

const requestPermission = async () => {
    let notifyPermission = await Notification.requestPermission();
    console.log(notifyPermission);
}
