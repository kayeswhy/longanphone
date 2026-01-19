// EPhone PWA Service Worker
const CACHE_NAME = 'ephone-pwa-v1.0.0';
const OFFLINE_URL = './fullscreen.html';

// Files to cache for offline functionality
const CACHE_FILES = [
  './fullscreen.html',
  './js/browser-compatibility.js',
  './manifest.json',
  // Add other essential files as needed
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('🔧 Service Worker: Caching essential files');
        return cache.addAll(CACHE_FILES);
      })
      .then(() => {
        console.log('🔧 Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('🔧 Service Worker: Installation failed', error);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('🔧 Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('🔧 Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('🔧 Service Worker: Activation complete');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') {
    return;
  }

  // Skip external requests (CDN, APIs, etc.)
  if (!event.request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((cachedResponse) => {
        // Return cached version if available
        if (cachedResponse) {
          return cachedResponse;
        }

        // Try to fetch from network
        return fetch(event.request)
          .then((response) => {
            // Don't cache non-successful responses
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            // Clone the response for caching
            const responseToCache = response.clone();

            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch(() => {
            // If network fails and no cache, return offline page for navigation requests
            if (event.request.mode === 'navigate') {
              return caches.match(OFFLINE_URL);
            }
          });
      })
  );
});

// Background sync for when connection is restored
self.addEventListener('sync', (event) => {
  console.log('🔧 Service Worker: Background sync triggered', event.tag);
  
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Perform background sync operations here
      // For example, sync pending messages, update data, etc.
      Promise.resolve()
    );
  }
});

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  console.log('🔧 Service Worker: Push notification received', event);
  
  const options = {
    body: event.data ? event.data.text() : 'New message received',
    icon: '/res/icon/android/hdpi.png',
    badge: '/res/icon/android/mdpi.png',
    vibrate: [200, 100, 200],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'Open EPhone',
        icon: '/res/icon/android/mdpi.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/res/icon/android/mdpi.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('EPhone', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  console.log('🔧 Service Worker: Notification clicked', event);
  
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/fullscreen.html')
    );
  }
});

// Message handling from main thread
self.addEventListener('message', (event) => {
  console.log('🔧 Service Worker: Message received', event.data);
  
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

console.log('🔧 Service Worker: Loaded successfully');