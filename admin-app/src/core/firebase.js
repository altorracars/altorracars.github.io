// ============================================================
// Firebase (modular SDK, tree-shake) — app namespaced 'altorra-crm'.
// Aislada del admin viejo (compat 'altorra-admin') y del público
// ('altorra-public') por nombre de app → sesiones de auth separadas
// en IndexedDB. Mismo projectId 'altorra-cars' → Firestore compartido
// (run paralelo seguro, ambas apps leen el mismo canónico).
// Config pública (va en el cliente; verificada en js/core/firebase-config.js).
// ============================================================

import { initializeApp } from 'firebase/app';
import { initializeAppCheck, ReCaptchaV3Provider } from 'firebase/app-check';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

export const FIREBASE_CONFIG = {
  apiKey: 'AIzaSyD9MJrON70mPqZxQqhndgQHNkTZUnnaQIs',
  authDomain: 'altorra-cars.firebaseapp.com',
  databaseURL: 'https://altorra-cars-default-rtdb.firebaseio.com',
  projectId: 'altorra-cars',
  storageBucket: 'altorra-cars.firebasestorage.app',
  messagingSenderId: '235148219730',
  appId: '1:235148219730:web:ceabdbc52fdcbe8b85168b',
  measurementId: 'G-ZGZ6CVTB73',
};

export const APP_NAME = 'altorra-crm';

export const app = initializeApp(FIREBASE_CONFIG, APP_NAME);

// App Check (SEC-02, ADR §169) — anti-abuso, modo MONITOR (Unenforced en consola).
// Mismo site key reCAPTCHA v3 que el sitio compat (misma web app / projectId).
export const appCheck = initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider('6Lfz8BQtAAAAAILjn8GbHFT8u6dpg5rFvg5hGZzS'),
  isTokenAutoRefreshEnabled: true,
});

export const auth = getAuth(app);
export const db = getFirestore(app);
