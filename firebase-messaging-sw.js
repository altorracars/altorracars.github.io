/* eslint-env serviceworker */
/**
 * Firebase Cloud Messaging service worker para PWA del admin.
 * §23 FASE 4 — recibe push notifications cuando hay clientes en queue.
 *
 * IMPORTANTE: este archivo DEBE estar en la raíz del sitio para que
 * Firebase lo registre con scope correcto. Firebase lo busca por
 * convención en /firebase-messaging-sw.js (no en /js/).
 *
 * Es un archivo separado del service-worker.js principal porque
 * Firebase Messaging requiere su propio SW dedicado para handling
 * de background push events.
 */

importScripts('https://www.gstatic.com/firebasejs/11.3.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/11.3.0/firebase-messaging-compat.js');

// La config aquí es PUBLICA (igual que firebase-config.js) — la API key
// no es un secreto, las reglas Firestore son el guardián real.
firebase.initializeApp({
    apiKey: "AIzaSyDmEyWMnOhlw9j_nNQfkRxMb2WMo9mLoBo",
    authDomain: "altorra-cars.firebaseapp.com",
    databaseURL: "https://altorra-cars-default-rtdb.firebaseio.com",
    projectId: "altorra-cars",
    storageBucket: "altorra-cars.firebasestorage.app",
    messagingSenderId: "235148219730",
    appId: "1:235148219730:web:5cb0e6f632a8e88d5a3a85"
});

const messaging = firebase.messaging();

// Background handler — cuando el admin tiene la PWA cerrada o en otra tab,
// esto se dispara y muestra la notificación nativa del SO.
messaging.onBackgroundMessage(function (payload) {
    console.log('[firebase-messaging-sw] Background message received:', payload);
    var notification = payload.notification || {};
    var data = payload.data || {};

    var title = notification.title || '🚨 Altorra Cars — atención requerida';
    var options = {
        body: notification.body || 'Hay clientes esperando atención.',
        icon: '/ALTOR.png',
        badge: '/ALTOR.png',
        tag: data.sessionId ? ('queue-' + data.sessionId) : 'altorra-queue',
        requireInteraction: true,  // no se autoclierra, requiere click
        data: data
    };
    self.registration.showNotification(title, options);
});

// Click en la notificación → abrir la PWA del admin en concierge
self.addEventListener('notificationclick', function (event) {
    event.notification.close();
    var targetUrl = (event.notification.data && event.notification.data.click_action) ||
                    'https://altorracars.github.io/admin.html#concierge';

    event.waitUntil(
        clients.matchAll({ type: 'window', includeUncontrolled: true }).then(function (clientList) {
            // Si ya hay una tab del admin abierta, focus + navegar
            for (var i = 0; i < clientList.length; i++) {
                var client = clientList[i];
                if (client.url.indexOf('admin.html') !== -1 && 'focus' in client) {
                    if ('navigate' in client) client.navigate(targetUrl);
                    return client.focus();
                }
            }
            // Sino abrir nueva tab
            if (clients.openWindow) return clients.openWindow(targetUrl);
        })
    );
});
