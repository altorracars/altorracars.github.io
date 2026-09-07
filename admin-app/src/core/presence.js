// ============================================================
// OLA-2.10 (§274) — PRESENCE del portal: el CRM canónico PUBLICA su
// presencia en RTDB /presence (hasta hoy solo LEÍA — hub.data.js 3a;
// con asesores viviendo en el portal, el modal de transferencias y el
// "X está atendiendo" quedaban vacíos salvo que alguien abriera el
// admin clásico).
//
// Espejo FUNCIONAL de startPresence del clásico (admin-auth.js §77),
// sin el equipaje de "Sesiones Activas" (fingerprint WebGL/canvas,
// geo-IP, browser/os) que es una feature del clásico, no del hub:
//   · nodo pushKey en /presence + cleanup de huérfanos (uid+deviceId)
//   · set al conectar (.info/connected) → onDisconnect().remove()
//   · heartbeat 60s con `uid` en el payload (§36.4 — las rules §271
//     exigen uid == auth.uid en el validate; sin uid en el update, un
//     nodo removido por un cleanup tardío da permission_denied)
//   · online/away: visibilitychange + click/keydown (§35: CERO
//     pointermove) + idle-check 1 min → away a los 5 (§17.12: CERO
//     MutationObserver)
//   · setPresenceCurrentChat(sessionId) → "X está atendiendo" (lo
//     cablea hub.ui al abrir/cerrar chat)
//
// Convivencia con el clásico: mismo shape de entry; si el dueño abre
// AMBOS admins, cada tab tiene SU pushKey (deviceId distinto por
// origen 'portal:') — sin pisarse. Auto-gestionado: suscrito al store
// (user aparece → start; null/logout → stop). En mock no publica.
// ============================================================

import { ref, set, update, remove, push, onValue, off, onDisconnect, get, serverTimestamp } from 'firebase/database';
import { rtdb } from './firebase.js';
import { store } from './store.js';

const HEARTBEAT_MS = 60 * 1000;
const IDLE_THRESHOLD_MS = 5 * 60 * 1000;
const IDLE_CHECK_MS = 60 * 1000;

let s = null; // sesión activa: { uid, nodeRef, connectedRef, heartbeat, idleCheck, handlers, status, lastActivity, currentChatId }

// deviceId simple persistente (dedup de huérfanos del MISMO navegador —
// el fingerprinting pesado del clásico es para Sesiones Activas, no aquí).
function deviceId() {
  try {
    let id = localStorage.getItem('altorra_portal_device');
    if (!id) {
      id = 'portal:' + Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
      localStorage.setItem('altorra_portal_device', id);
    }
    return id;
  } catch { return 'portal:mem'; }
}

function writeStatus(status) {
  if (!s || s.status === status) return;
  s.status = status;
  update(s.nodeRef, { uid: s.uid, status, lastSeen: serverTimestamp() }).catch(() => {});
}

function markActivity() {
  if (!s) return;
  s.lastActivity = Date.now();
  if (s.status === 'away') writeStatus('online');
}

function bindActivity() {
  const onAct = () => markActivity();
  const onVis = () => { if (document.hidden) writeStatus('away'); else markActivity(); };
  const onBlur = () => { if (document.hidden) writeStatus('away'); };
  document.addEventListener('click', onAct, true);
  document.addEventListener('keydown', onAct, true);
  document.addEventListener('visibilitychange', onVis);
  window.addEventListener('focus', onAct);
  window.addEventListener('blur', onBlur);
  s.idleCheck = setInterval(() => {
    if (!s || document.hidden) return;
    if (Date.now() - s.lastActivity >= IDLE_THRESHOLD_MS) writeStatus('away');
  }, IDLE_CHECK_MS);
  s.handlers = { onAct, onVis, onBlur };
}

function unbindActivity() {
  if (!s || !s.handlers) return;
  document.removeEventListener('click', s.handlers.onAct, true);
  document.removeEventListener('keydown', s.handlers.onAct, true);
  document.removeEventListener('visibilitychange', s.handlers.onVis);
  window.removeEventListener('focus', s.handlers.onAct);
  window.removeEventListener('blur', s.handlers.onBlur);
  if (s.idleCheck) clearInterval(s.idleCheck);
}

function startPresence(user, profile) {
  const uid = user.uid;
  const dev = deviceId();
  const nodeRef = push(ref(rtdb, 'presence'));
  const connectedRef = ref(rtdb, '.info/connected');
  s = {
    uid, nodeRef, connectedRef, status: 'online',
    lastActivity: Date.now(), currentChatId: null,
    heartbeat: null, idleCheck: null, handlers: null,
  };

  // Huérfanos del mismo navegador (refresh/kill donde onDisconnect no corrió).
  get(ref(rtdb, 'presence')).then((snap) => {
    snap.forEach((child) => {
      const d = child.val() || {};
      if (d.uid === uid && d.deviceId === dev && child.key !== nodeRef.key) {
        remove(child.ref).catch(() => {});
      }
    });
  }).catch(() => {});

  onValue(connectedRef, (snap) => {
    if (snap.val() !== true || !s || s.nodeRef !== nodeRef) return;
    const entry = {
      uid,
      deviceId: dev,
      nombre: (profile && profile.nombre) || user.email || uid,
      rol: (profile && (profile.roleName || profile.rol)) || '',
      online: true,                    // retrocompat con readers viejos
      status: s.status,
      currentChatId: s.currentChatId,
      lastSeen: serverTimestamp(),
      source: 'portal',
    };
    // set PRIMERO, onDisconnect después (el nodo debe existir para rules).
    set(nodeRef, entry).then(() => {
      if (s && s.nodeRef === nodeRef) onDisconnect(nodeRef).remove().catch(() => {});
    }).catch(() => {});
  });

  s.heartbeat = setInterval(() => {
    if (!s || s.nodeRef !== nodeRef) return;
    update(nodeRef, { uid, lastSeen: serverTimestamp() }).catch(() => {});
  }, HEARTBEAT_MS);

  window.addEventListener('beforeunload', onUnload);
  bindActivity();
}

function onUnload() { if (s) { try { remove(s.nodeRef); } catch { /* ignore */ } } }

function stopPresence() {
  if (!s) return;
  unbindActivity();
  if (s.heartbeat) clearInterval(s.heartbeat);
  try { off(s.connectedRef); } catch { /* ignore */ }
  window.removeEventListener('beforeunload', onUnload);
  remove(s.nodeRef).catch(() => {});
  s = null;
}

/** "X está atendiendo": el hub lo llama al abrir (sessionId) y al salir (null). */
export function setPresenceCurrentChat(sessionId) {
  if (!s) return;
  s.currentChatId = sessionId || null;
  update(s.nodeRef, { uid: s.uid, currentChatId: s.currentChatId, lastSeen: serverTimestamp() }).catch(() => {});
}

/** Auto-gestión por el store: llamar UNA vez desde main.js. */
export function initPresence() {
  let lastUid = null;
  store.subscribe(() => {
    const { user, profile, mock } = store.get();
    if (mock) return;                          // preview mock: sin RTDB
    const uid = user ? user.uid : null;
    if (uid && uid !== lastUid && profile) {   // login (perfil hidratado)
      lastUid = uid;
      try { startPresence(user, profile); } catch { /* best-effort */ }
    } else if (!uid && lastUid) {              // logout
      lastUid = null;
      stopPresence();
    }
  });
}
