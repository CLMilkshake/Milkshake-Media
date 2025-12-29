self.addEventListener("fetch", event => {
  event.respondWith(fetch(event.request));
});

// Listen for push events
self.addEventListener('push', event => {
  let data = {};
  
  
  if (event.data) {
    try {
      data = event.data.json(); // Expect JSON from server
    } catch (err) {
      console.error('Push event data error:', err);
    }
  }

  const title = data.title || 'Milkshake Media';
  const options = {
    body: data.body || 'You have a new notification',
    icon: '/icon.png',        // optional icon
    badge: '/badge.png',      // optional badge
    data: {
      url: data.url || '/'    // page to open when clicked
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});

// Handle notification click
self.addEventListener('notificationclick', event => {
  event.notification.close();
  const url = event.notification.data.url;
  event.waitUntil(
    clients.openWindow(url)
  );
});

