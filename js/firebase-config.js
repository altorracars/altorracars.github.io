// Firebase Configuration for ALTORRA CARS
// Loads Firebase SDK from CDN and initializes the app

(function() {
    'use strict';

    const FIREBASE_VERSION = '11.3.0';
    const CDN_BASE = 'https://www.gstatic.com/firebasejs/' + FIREBASE_VERSION;

    const FIREBASE_CONFIG = {
        apiKey: "AIzaSyD9MJrON70mPqZxQqhndgQHNkTZUnnaQIs",
        authDomain: "altorra-cars.firebaseapp.com",
        projectId: "altorra-cars",
        storageBucket: "altorra-cars.firebasestorage.app",
        messagingSenderId: "235148219730",
        appId: "1:235148219730:web:ceabdbc52fdcbe8b85168b",
        measurementId: "G-ZGZ6CVTB73"
    };

    function loadScript(src) {
        return new Promise(function(resolve, reject) {
            var script = document.createElement('script');
            script.src = src;
            script.onload = resolve;
            script.onerror = reject;
            document.head.appendChild(script);
        });
    }

    window.firebaseReady = loadScript(CDN_BASE + '/firebase-app-compat.js')
        .then(function() {
            return Promise.all([
                loadScript(CDN_BASE + '/firebase-analytics-compat.js'),
                loadScript(CDN_BASE + '/firebase-firestore-compat.js')
            ]);
        })
        .then(function() {
            var app = firebase.initializeApp(FIREBASE_CONFIG);
            var analytics = firebase.analytics();
            var db = firebase.firestore();

            window.firebaseApp = app;
            window.firebaseAnalytics = analytics;
            window.db = db;

            console.log('Firebase + Firestore initialized for ALTORRA CARS');
            return { app: app, analytics: analytics, db: db };
        })
        .catch(function(error) {
            console.warn('Firebase could not be loaded:', error);
        });
})();
