self.addEventListener("push", event => {
  const data = event.data?.json() || {};

  const options = {
    body: data.body || "You have a new notification",
    icon: "/icons/icon-192.png",
    badge: "/icons/icon-192.png",
    data: {
      url: data.url || "/"
    }
  };

  event.waitUntil(
    self.registration.showNotification(
      data.title || "Milkshake Media",
      options
    )
  );
});

self.addEventListener("notificationclick", event => {
  event.notification.close();
  event.waitUntil(
    clients.openWindow(event.notification.data.url)
  );
});
