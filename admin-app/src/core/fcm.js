// ============================================================
// FCM / Web-Push para asesores — PLAN-UNIFICADO F-6 (paridad §3, red-team #2).
// Port modular del compat `js/admin/admin-fcm.js`. Cierra el gap del checklist
// de cutover: "el admin-app NO inicializa messaging" (solo tenía messagingSenderId
// en config, cero getMessaging/getToken).
//
// Compat server-side (verificado functions/index.js onChatEscalated): escribe el
// token en `usuarios/{uid}.fcmTokens[]` con la MISMA forma de objeto
// {token, deviceLabel, addedAt, lastUsedAt} y la MISMA colección que el admin
// viejo → la Cloud Function (que junta fcmTokens de rol super_admin/editor) lo
// consume SIN cambios server-side.
//
// SW: re-registra `/firebase-messaging-sw.js` (raíz del sitio, scope
// `/firebase-cloud-messaging-push-scope`) — el MISMO SW dedicado de FCM que usa
// el admin viejo. NO toca `service-worker.js` (público, scope `/`).
//
// Gate: solo se activa con usuario autenticado del portal (todos son staff). El
// filtro por rol lo hace la Cloud Function server-side; sobre-guardar un token de
// un rol sin push es inofensivo y evita acoplar este módulo al RBAC.
// ============================================================

import { getMessaging, getToken, onMessage, isSupported } from 'firebase/messaging';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { app, db } from './firebase.js';
import { store } from './store.js';
import { toast } from './toast.js';
import { el } from './dom.js';
import { icon } from './icons.js';
import { pushNotification } from './notifications.js';

// VAPID public key (idéntica al admin viejo — Firebase Console → Cloud Messaging
// → Web Push certificates). Es PÚBLICA: identifica al servidor emisor, no es
// secreto; la autoridad real es el Admin SDK server-side.
const VAPID_PUBLIC_KEY = 'BDhFxNdH98lu9a1fHx0AyKzEhDkQ9-7Im7AHIpj6LiYpARA-XBUomOc5Q06LrJbedfX1qSkPzMp1KDgHYaJBhFU';

const SW_URL = '/firebase-messaging-sw.js';
const SW_SCOPE = '/firebase-cloud-messaging-push-scope';
const PROMPT_KEY = 'altorra_crm_fcm_prompted_at';
const COOLDOWN_MS = 3 * 24 * 60 * 60 * 1000; // 3 días

let _initialized = false;
let _messaging = null;
let _foregroundBound = false;

function deviceLabel() {
  const ua = navigator.userAgent || '';
  const os = /iPhone|iPad/.test(ua) ? 'iOS'
    : /Android/.test(ua) ? 'Android'
    : /Mac/.test(ua) ? 'macOS'
    : /Windows/.test(ua) ? 'Windows'
    : /Linux/.test(ua) ? 'Linux' : 'desconocido';
  const browser = /Edg\//.test(ua) ? 'Edge'
    : /Chrome|Chromium/.test(ua) ? 'Chrome'
    : /Firefox/.test(ua) ? 'Firefox'
    : (/Safari/.test(ua) && !/Chrome/.test(ua)) ? 'Safari' : 'navegador';
  return `${browser} · ${os}`;
}

function bindForeground() {
  // §98 (admin viejo): con la pestaña visible, FCM NO dispara el background
  // handler del SW → hay que escuchar onMessage o el push se pierde en silencio.
  if (_foregroundBound || !_messaging) return;
  _foregroundBound = true;
  try {
    onMessage(_messaging, (payload) => {
      const n = (payload && payload.notification) || {};
      const title = n.title || 'Cliente esperando';
      const body = n.body || 'Hay un cliente en cola en el ALTOR Hub.';
      toast(`${title} — ${body}`, 'info', 9000);
      // OLA-2.2: el toast se pierde a los 9s — la campana lo conserva con deep-link.
      pushNotification({ title, body, route: 'hub' });
    });
  } catch (e) {
    _foregroundBound = false;
    console.warn('[fcm] onMessage no se pudo enlazar:', e && e.message);
  }
}

async function persistToken(token) {
  const { user } = store.get();
  if (!user || !user.uid) return;
  const ref = doc(db, 'usuarios', user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return; // sin doc de perfil no hay dónde guardar
  const data = snap.data() || {};
  let tokens = Array.isArray(data.fcmTokens) ? data.fcmTokens.slice() : [];
  const nowIso = new Date().toISOString();
  const label = deviceLabel();
  const idx = tokens.findIndex((t) => t && t.token === token);
  if (idx >= 0) {
    tokens[idx] = { ...tokens[idx], lastUsedAt: nowIso, deviceLabel: label };
  } else {
    if (tokens.length >= 5) tokens = tokens.slice(-4); // cap 5 dispositivos
    tokens.push({ token, deviceLabel: label, addedAt: nowIso, lastUsedAt: nowIso });
  }
  await updateDoc(ref, { fcmTokens: tokens });
}

// Pide permiso (requiere gesto del usuario para `requestPermission`) → registra
// el SW de FCM → obtiene y persiste el token. Devuelve el token o null.
async function enableAndGetToken() {
  if (Notification.permission === 'denied') {
    toast('Notificaciones bloqueadas. Actívalas desde el candado de la barra de direcciones y recarga.', 'error', 8000);
    return null;
  }
  let reg;
  try {
    reg = await navigator.serviceWorker.register(SW_URL, { scope: SW_SCOPE });
  } catch (e) {
    console.warn('[fcm] no se pudo registrar el SW de FCM:', e && e.message);
    return null;
  }
  if (Notification.permission === 'default') {
    const perm = await Notification.requestPermission();
    if (perm !== 'granted') return null;
  }
  try {
    _messaging = _messaging || getMessaging(app);
    bindForeground();
    const token = await getToken(_messaging, {
      vapidKey: VAPID_PUBLIC_KEY,
      serviceWorkerRegistration: reg,
    });
    if (!token) return null;
    await persistToken(token);
    return token;
  } catch (e) {
    console.warn('[fcm] getToken/persist falló:', e && e.message);
    return null;
  }
}

function dismissCard(card) {
  if (!card) return;
  card.classList.remove('is-in');
  let done = false;
  const drop = () => { if (!done) { done = true; card.remove(); } };
  card.addEventListener('transitionend', drop, { once: true });
  setTimeout(drop, 500); // fallback si transitionend no dispara
}

function showPromptCard() {
  if (document.getElementById('fcm-prompt')) return;
  let card;
  const onEnable = async (e) => {
    const b = e.currentTarget;
    b.disabled = true; b.textContent = 'Activando…';
    const tok = await enableAndGetToken();
    dismissCard(card);
    if (tok) toast('Notificaciones activadas', 'ok', 4000);
  };
  card = el('div', { id: 'fcm-prompt', class: 'fcm-prompt', role: 'dialog', 'aria-label': 'Activar notificaciones' }, [
    el('div', { class: 'fcm-prompt__icon', 'aria-hidden': 'true', html: icon('bell') }),
    el('div', { class: 'fcm-prompt__body' }, [
      el('p', { class: 'fcm-prompt__title', text: 'Avisos de clientes en cola' }),
      el('p', { class: 'fcm-prompt__text u-muted', text: 'Recibe una alerta cuando un cliente esté esperando, aunque tengas el portal cerrado.' }),
      el('div', { class: 'fcm-prompt__actions' }, [
        el('button', { type: 'button', class: 'btn btn--gold btn--sm', onclick: onEnable }, ['Activar']),
        el('button', { type: 'button', class: 'btn btn--ghost btn--sm', onclick: () => dismissCard(card) }, ['Ahora no']),
      ]),
    ]),
  ]);
  document.body.append(card);
  requestAnimationFrame(() => card.classList.add('is-in'));
}

// Punto de entrada. Llamar tras resolverse la auth (usuario presente en el store).
export async function initFcm() {
  if (_initialized) return;
  const { user, mock } = store.get();
  if (mock || !user) return;
  if (!('Notification' in window) || !('serviceWorker' in navigator)) return;
  let supported = false;
  try { supported = await isSupported(); } catch { supported = false; }
  if (!supported) return;
  _initialized = true;

  // Ya concedido → registra el token en silencio (sin prompt).
  if (Notification.permission === 'granted') {
    enableAndGetToken();
    return;
  }
  // Denegado → respeta la decisión, no insiste.
  if (Notification.permission === 'denied') return;

  // 'default' → prompt con cooldown de 3 días (el click satisface el requisito
  // de user-gesture de Notification.requestPermission).
  let last = 0;
  try { last = parseInt(localStorage.getItem(PROMPT_KEY) || '0', 10); } catch { /* noop */ }
  if (last && (Date.now() - last) < COOLDOWN_MS) return;
  try { localStorage.setItem(PROMPT_KEY, String(Date.now())); } catch { /* noop */ }
  setTimeout(showPromptCard, 2500);
}
