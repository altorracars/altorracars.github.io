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
import {
  initializeFirestore, persistentLocalCache, persistentMultipleTabManager,
} from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getFunctions } from 'firebase/functions';
import { getStorage } from 'firebase/storage';

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

// F40a (ADR §178, E1a): persistencia OFFLINE — el patio tiene señal
// intermitente. Los flujos de CAPTURA (lead rápido, quick-log, notas) son
// escrituras directas validadas por Rules → se encolan sin señal y
// sincronizan solos. Lo TRANSACCIONAL (conversión, cupos) sí exige red y la UI lo declara.
// PLAN-UNIFICADO F-0.5 (Gemini red-team verificado §9.B.1): multiTabManager —
// el portal único aloja el Hub (realtime) Y el Pipeline en pestañas distintas;
// singleTab rompía el sync de la 2ª pestaña. Prerrequisito para portar el Hub (F-4).
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache({ tabManager: persistentMultipleTabManager() }),
});

// RTDB (PLAN-UNIFICADO F-0.5, §9.B.1): el Hub usa Realtime Database para
// presence/typing/transfer (admin-concierge.js `window.rtdb` /presence /typing).
// El portal nuevo lo inicializa ANTES de portar el Hub (F-4) o los sockets
// fallan en silencio. databaseURL ya está en FIREBASE_CONFIG.
export const rtdb = getDatabase(app);

// Callables del CRM (crmPurgeLead F15, crmRunSlaSweep F37, …).
export const fns = getFunctions(app, 'us-central1');

// Storage (E6 fase ② §191): uploads de banners/ (rules: auth + <5MB + image/*).
export const storage = getStorage(app);
