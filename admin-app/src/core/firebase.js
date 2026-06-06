// ============================================================
// Firebase (modular SDK, tree-shake) — app namespaced 'altorra-crm'.
// Aislada del admin viejo (compat 'altorra-admin') y del público
// ('altorra-public') por nombre de app → sesiones de auth separadas
// en IndexedDB. Mismo projectId 'altorra-cars' → Firestore compartido
// (run paralelo seguro, ambas apps leen el mismo canónico).
// Config pública (va en el cliente; verificada en js/core/firebase-config.js).
// ============================================================

import { initializeApp } from 'firebase/app';
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
export const auth = getAuth(app);
export const db = getFirestore(app);
