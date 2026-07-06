// ============================================================
// ALTOR Hub (PLAN-UNIFICADO F-4 3/3, gap §2.B Comunicaciones) — capa de datos.
// Consola de chat asesor↔cliente. Port de js/admin/admin-concierge.js (2979L)
// al patrón modular admin-app. SUB-INCREMENTO 3a = VISOR read-only: lista de
// chats + mensajes (read) + presence "X está atendiendo" (read). Las MUTACIONES
// (enviar/claim/transfer/close/notes) llegan en 3b-3c — este archivo NO escribe.
//
// Colecciones (verificado admin-concierge.js + firestore.rules:937):
//   conciergeChats/{sessionId}        → el chat (read = concierge.read).
//     Shape: {userNombre, userEmail, telefono, mode('bot'|'live'|'wa_handed_over'),
//             status('active'|'closed'), lastMessage, lastMessageAt(ISO),
//             unreadByAdmin, isPinned, isArchived, claimedBy, claimedByName,
//             claimedAt, radicado, closedAt, closedReason, closedByName, sourceVehicleId}.
//   conciergeChats/{sid}/messages/{id} → turnos (read = concierge.read).
//     Shape: {from('user'|'bot'|'asesor'|'system'), text, timestamp(ISO)}.
// RTDB /presence (database.rules.json §271: .read = staff no-anónimo).
//   Clave = pushKey por sesión/tab (NO el uid — el clásico usa push() y dedupea
//   por uid+deviceId); el uid vive DENTRO del entry.
//     Entry: {uid, nombre, online, currentChatId, rol, lastSeen, status, deviceId}.
//
// §274 (OLA-2.10): el portal ya PUBLICA su presencia — core/presence.js
// (login→pushKey+onDisconnect+heartbeat; hub.ui cablea currentChatId al
// abrir/cerrar chat). Convive con el clásico: cada tab su pushKey. ⟦FABLE-5⟧
// ============================================================

import {
  collection, onSnapshot, query, orderBy, limit,
  doc, addDoc, updateDoc, getDocFromServer, runTransaction, increment,
} from 'firebase/firestore';
import {
  ref, onValue, get as rtdbGet, set as rtdbSet, remove as rtdbRemove, onDisconnect,
} from 'firebase/database';
import { db, rtdb } from '../../core/firebase.js';
import { store } from '../../core/store.js';

const CHATS_LIMIT = 100;          // mismo que el clásico (startChatsListener)
const PRESENCE_STALE_MS = 5 * 60 * 1000; // entry > 5 min = stale (paridad §88)

const currentUid = () => { const u = store.get().user; return u ? u.uid : null; };

/** Suscripción realtime a la lista de chats (últimos 100, lastMessageAt desc). */
export function subscribeChats(onData, onError) {
  const q = query(collection(db, 'conciergeChats'), orderBy('lastMessageAt', 'desc'), limit(CHATS_LIMIT));
  return onSnapshot(q, (snap) => {
    const list = [];
    snap.forEach((d) => list.push({ _docId: d.id, ...d.data() }));
    onData(list);
  }, (err) => onError && onError(err));
}

/** Suscripción a los mensajes de un chat (timestamp asc). Devuelve unsubscribe. */
export function subscribeChatMessages(sessionId, onData, onError) {
  const q = query(collection(db, 'conciergeChats', sessionId, 'messages'), orderBy('timestamp', 'asc'));
  return onSnapshot(q, (snap) => {
    const msgs = [];
    snap.forEach((d) => msgs.push({ _id: d.id, ...d.data() }));
    onData(msgs);
  }, (err) => onError && onError(err));
}

/**
 * Suscripción RTDB /presence → mapa { sessionId: {uid, nombre, status, photoURL} }
 * de OTROS asesores (editor/super_admin) que están mirando un chat ahora mismo.
 * Excluye al usuario actual y entradas stale (>5 min). Read-only (no publica).
 * Port de onAttendingPresenceSnapshot (§88). Devuelve unsubscribe.
 */
export function subscribeAttendingPresence(onMap, onError) {
  const presenceRef = ref(rtdb, '/presence');
  return onValue(presenceRef, (snap) => {
    const data = snap.val() || {};
    const cutoff = Date.now() - PRESENCE_STALE_MS;
    const uid = currentUid();
    const map = {};
    Object.keys(data).forEach((pushKey) => {
      const e = data[pushKey];
      if (!e || !e.uid || !e.online || !e.currentChatId) return;
      if (e.uid === uid) return;                                  // no a uno mismo
      if (e.rol !== 'super_admin' && e.rol !== 'editor') return;  // solo asesores
      const lastSeen = e.lastSeen || 0;
      if (lastSeen < cutoff) return;                              // stale
      const sid = e.currentChatId;
      const prev = map[sid];
      if (!prev || lastSeen > (prev.lastSeen || 0)) {
        map[sid] = {
          uid: e.uid,
          nombre: e.nombre || e.email || 'Asesor',
          photoURL: e.photoURL || null,
          status: e.status || 'online',
          lastSeen,
        };
      }
    });
    onMap(map);
  }, (err) => onError && onError(err));
}

/* ══ ESCRITURAS (3b: claim + responder + typing + read) ════════════════
 * Port de admin-concierge.js write-path. RBAC alineado a firestore.rules:937
 * + database.rules.json. La UI gatea optimista; aquí solo el round-trip server.
 * ════════════════════════════════════════════════════════════════════ */

const nowISO = () => new Date().toISOString();

/**
 * Toma (claim) un chat: pre-check en SERVER (sin flash de UI falso) + Firestore
 * Transaction (read-then-write atómico: dos asesores no pueden ganar el lock a la
 * vez). Port de claimChat/_claimChatTransactional (§60.1.1). Tras ganar el lock,
 * best-effort: system message "✓ X tomó…" + lastMessage (para que el cliente y la
 * lista lo vean). Gated: concierge.claim/respond (rules update conciergeChats).
 * Resuelve {success, claimedByName} · rechaza {code:'already-claimed'|'chat-closed'|'chat-not-found', claimedByName?}.
 */
export async function claimChat(sessionId, asesor) {
  const ref = doc(db, 'conciergeChats', sessionId);
  const { uid, nombre } = asesor;
  const ts = nowISO();

  // PRE-CHECK server: evita optimistic→rollback si la lista local está stale.
  const pre = await getDocFromServer(ref);
  if (!pre.exists()) { const e = new Error('chat-not-found'); e.code = 'chat-not-found'; throw e; }
  const pd = pre.data();
  if (pd.status === 'closed') { const e = new Error('chat-closed'); e.code = 'chat-closed'; throw e; }
  if (pd.claimedBy && pd.claimedBy !== uid) {
    const e = new Error('already-claimed'); e.code = 'already-claimed'; e.claimedByName = pd.claimedByName || 'Otro asesor'; throw e;
  }

  const result = await runTransaction(db, async (tx) => {
    const snap = await tx.get(ref);
    if (!snap.exists()) { const e = new Error('chat-not-found'); e.code = 'chat-not-found'; throw e; }
    const d = snap.data();
    if (d.status === 'closed') { const e = new Error('chat-closed'); e.code = 'chat-closed'; throw e; }
    if (d.claimedBy && d.claimedBy !== uid) {
      const e = new Error('already-claimed'); e.code = 'already-claimed'; e.claimedByName = d.claimedByName || 'Otro asesor'; throw e;
    }
    tx.update(ref, {
      claimedBy: uid, claimedByName: nombre, claimedAt: ts, mode: 'live',
      assignedTo: uid, assignedToName: nombre, // compat CRM legacy
    });
    return { success: true, claimedByName: nombre };
  });

  // Best-effort: el cliente ve "✓ X tomó la conversación" + reordena la lista.
  try {
    await addDoc(collection(db, 'conciergeChats', sessionId, 'messages'), {
      from: 'system', systemType: 'asesor_joined',
      text: '✓ ' + nombre + ' tomó esta conversación. En breve te atenderá.',
      timestamp: ts, asesorNombre: nombre, asesorUid: uid,
    });
    await updateDoc(ref, { lastMessage: '✓ ' + nombre + ' tomó la conversación', lastMessageAt: ts });
  } catch (_) { /* best-effort */ }
  return result;
}

/**
 * Envía un mensaje del asesor (subcol messages) + actualiza el parent
 * (lastMessage/At + unreadByUser++). La UI maneja el optimista; aquí el write.
 * Gated: concierge.respond + claim==me (firestore.rules messages create 'asesor').
 * Devuelve el id del doc creado. */
export async function sendAsesorMessage(sessionId, text, asesor) {
  const ts = nowISO();
  const msg = {
    from: 'asesor', text, timestamp: ts,
    asesorUid: asesor.uid, asesorNombre: asesor.nombre, asesorPhotoURL: asesor.photoURL || null,
  };
  const created = await addDoc(collection(db, 'conciergeChats', sessionId, 'messages'), msg);
  // Parent en background (no bloquea el optimista): lastMessage + unread cliente.
  updateDoc(doc(db, 'conciergeChats', sessionId), {
    lastMessage: text.slice(0, 80), lastMessageAt: ts, unreadByUser: increment(1),
  }).catch(() => {});
  return created.id;
}

/** Marca el chat leído por el asesor (limpia el badge + read-receipt). Throttle en UI. */
export async function markChatRead(sessionId) {
  await updateDoc(doc(db, 'conciergeChats', sessionId), {
    unreadByAdmin: 0, forceUnreadByAdmin: false, lastReadByAdmin: nowISO(),
  });
}

/* ── Typing (RTDB) ─────────────────────────────────────────── */
// Escribe el estado "asesor escribiendo" en /typing/{sid}/asesor_{uid}
// (rules: $asesorKey == 'asesor_' + auth.uid; .validate exige typing+ts+name).
export function setAdminTyping(sessionId, isTyping, asesor) {
  const r = ref(rtdb, '/typing/' + sessionId + '/asesor_' + asesor.uid);
  rtdbSet(r, { name: asesor.nombre || 'Asesor', typing: !!isTyping, ts: Date.now() }).catch(() => {});
  if (isTyping) { try { onDisconnect(r).remove(); } catch (_) {} } // limpia si se cae la pestaña
}

export function clearAdminTyping(sessionId, uid) {
  try { rtdbRemove(ref(rtdb, '/typing/' + sessionId + '/asesor_' + uid)); } catch (_) {}
}

/** Suscripción al "cliente escribiendo" (/typing/{sid}/user). onTyping(bool). */
export function subscribeClientTyping(sessionId, onTyping) {
  const r = ref(rtdb, '/typing/' + sessionId + '/user');
  return onValue(r, (snap) => {
    const d = snap.val();
    onTyping(!!(d && d.typing && (Date.now() - (d.ts || 0)) < 5000));
  }, () => {});
}

/* ══ GESTIÓN (3c: close / reopen / release / transfer / notas) ═════════
 * Mutaciones de gestión. ⚠️ ORDEN vs rules: el create de `messages` se
 * bloquea si parent.status=='closed' (salvo super) → en CLOSE el system-msg
 * va ANTES del status:'closed'; en REOPEN el status:'active' va ANTES del msg.
 * ════════════════════════════════════════════════════════════════════ */

/** Cierra el chat. Gated concierge.close + claim==me (rules). System-msg primero (chat aún activo). */
export async function closeChatDoc(sessionId, asesor) {
  const ts = nowISO();
  try {
    await addDoc(collection(db, 'conciergeChats', sessionId, 'messages'), {
      from: 'system', systemType: 'closed',
      text: '✓ ' + asesor.nombre + ' cerró esta conversación. Inicia una nueva cuando quieras.',
      timestamp: ts, asesorNombre: asesor.nombre, asesorUid: asesor.uid,
    });
  } catch (_) { /* best-effort: la UI ya refleja el cierre optimista */ }
  await updateDoc(doc(db, 'conciergeChats', sessionId), {
    status: 'closed', closedAt: ts, closedBy: asesor.uid, closedByName: asesor.nombre,
    resolvedAt: ts, resolvedBy: asesor.uid, // aliases legacy (pipelines viejos)
    lastMessage: '✓ Conversación cerrada por ' + asesor.nombre, lastMessageAt: ts,
  });
}

/** Reabre un chat cerrado. Gated concierge.reopen. status:'active' ANTES del system-msg. */
export async function reopenChatDoc(sessionId, asesor) {
  const ts = nowISO();
  await updateDoc(doc(db, 'conciergeChats', sessionId), {
    status: 'active', reopenedAt: ts, reopenedBy: asesor.uid,
    lastMessage: '↻ Conversación reabierta por ' + asesor.nombre, lastMessageAt: ts,
  });
  try {
    await addDoc(collection(db, 'conciergeChats', sessionId, 'messages'), {
      from: 'system', systemType: 'reopened',
      text: '↻ ' + asesor.nombre + ' reabrió la conversación. Puedes seguir escribiendo.',
      timestamp: ts, asesorNombre: asesor.nombre, asesorUid: asesor.uid,
    });
  } catch (_) { /* best-effort */ }
}

/** Libera el lock (super override). Otro asesor puede tomar el chat. */
export async function releaseClaim(sessionId, asesor) {
  await updateDoc(doc(db, 'conciergeChats', sessionId), {
    claimedBy: null, claimedByName: null, claimReleasedBy: asesor.uid, claimReleasedAt: nowISO(),
  });
}

/** Lee /presence una vez → lista de asesores (editor/super) online, no-self, no-stale. Para el modal de transfer. */
export async function getOnlineAdvisors(excludeUid) {
  const snap = await rtdbGet(ref(rtdb, '/presence'));
  const data = snap.val() || {};
  const cutoff = Date.now() - PRESENCE_STALE_MS;
  const map = {};
  Object.keys(data).forEach((k) => {
    const e = data[k];
    if (!e || !e.uid || !e.online) return;
    if (e.uid === excludeUid) return;
    if (e.rol !== 'super_admin' && e.rol !== 'editor') return;
    const lastSeen = e.lastSeen || 0;
    if (lastSeen < cutoff) return;
    const prev = map[e.uid];
    if (!prev || lastSeen > prev.lastSeen) {
      map[e.uid] = {
        uid: e.uid, nombre: e.nombre || e.email || 'Asesor', photoURL: e.photoURL || null,
        status: e.status || 'online', cargo: e.cargo || e.rol || '', lastSeen,
      };
    }
  });
  return Object.values(map);
}

/** Transfiere el chat a otro asesor (runTransaction) + system-msg. Gated concierge.transfer/respond + claim==me. */
export async function transferChat(sessionId, toUid, toName, asesor) {
  const r = doc(db, 'conciergeChats', sessionId);
  const ts = nowISO();
  await runTransaction(db, async (tx) => {
    const snap = await tx.get(r);
    if (!snap.exists()) { const e = new Error('chat-not-found'); e.code = 'chat-not-found'; throw e; }
    if (snap.data().status === 'closed') { const e = new Error('chat-closed'); e.code = 'chat-closed'; throw e; }
    tx.update(r, {
      claimedBy: toUid, claimedByName: toName, claimedAt: ts,
      _transferredFrom: asesor.uid, _transferredFromName: asesor.nombre, _transferredAt: ts,
    });
  });
  try {
    await addDoc(collection(db, 'conciergeChats', sessionId, 'messages'), {
      from: 'system', systemType: 'transferred',
      text: '🔁 ' + asesor.nombre + ' transfirió esta conversación a ' + toName + '.',
      timestamp: ts, transferFromUid: asesor.uid, transferToUid: toUid,
    });
    await updateDoc(r, { lastMessage: '🔁 Transferida a ' + toName, lastMessageAt: ts });
  } catch (_) { /* best-effort */ }
}

/* ── Notas internas (subcol notes/ — el cliente NUNCA las ve) ── */
/** Crea una nota privada del asesor. Gated concierge.respond (rules notes create). */
export async function addInternalNote(sessionId, text, asesor) {
  await addDoc(collection(db, 'conciergeChats', sessionId, 'notes'), {
    text: text.trim(), authorUid: asesor.uid, authorName: asesor.nombre,
    authorPhotoURL: asesor.photoURL || null, timestamp: nowISO(),
  });
}

/** Suscripción a las notas internas (subcol notes/, timestamp asc). Marca _isNote. */
export function subscribeNotes(sessionId, onData, onError) {
  const q = query(collection(db, 'conciergeChats', sessionId, 'notes'), orderBy('timestamp', 'asc'));
  return onSnapshot(q, (snap) => {
    const list = [];
    snap.forEach((d) => list.push({ _id: d.id, _isNote: true, ...d.data() }));
    onData(list);
  }, (e) => onError && onError(e));
}

/* ── Mock (?mock=1) ─────────────────────────────────────────── */
const _now = Date.now();
const iso = (minAgo) => new Date(_now - minAgo * 60000).toISOString();

export const MOCK_CHATS = [
  { _docId: 'sess_ana01', userNombre: 'Ana Restrepo', userEmail: 'ana@example.com', telefono: '+57 300 111 2233', mode: 'live', status: 'active', lastMessage: '¿El Mazda CX-5 sigue disponible? Me interesa verlo el sábado.', lastMessageAt: iso(4), unreadByAdmin: 2, isPinned: true, claimedBy: 'u_ceo', claimedByName: 'Rodrigo (CEO)', claimedAt: iso(9), radicado: 'ALT-2026-0412', sourceVehicleId: '5512' },
  { _docId: 'sess_juan2', userNombre: 'Juan Pablo Gómez', userEmail: 'jp.gomez@example.com', mode: 'bot', status: 'active', lastMessage: 'gracias, lo voy a pensar', lastMessageAt: iso(38), unreadByAdmin: 0, claimedBy: null },
  { _docId: 'sess_luz03', userNombre: 'Luz Marina', telefono: '+57 312 555 7788', mode: 'wa_handed_over', status: 'active', lastMessage: 'Perfecto, los espero en el punto de Bocagrande.', lastMessageAt: iso(95), unreadByAdmin: 1, claimedBy: 'u_otro', claimedByName: 'Camila (Ventas)', claimedAt: iso(80) },
  { _docId: 'sess_cerr4', userNombre: 'Carlos Díaz', userEmail: 'cdiaz@example.com', mode: 'live', status: 'closed', lastMessage: 'Listo, muchas gracias por la atención.', lastMessageAt: iso(1440), unreadByAdmin: 0, claimedBy: 'u_ceo', claimedByName: 'Rodrigo (CEO)', radicado: 'ALT-2026-0388', closedAt: iso(1430), closedReason: 'admin_resolved', closedByName: 'Rodrigo (CEO)' },
  { _docId: 'sess_arch5', userNombre: 'Sin nombre', mode: 'bot', status: 'active', lastMessage: 'hola', lastMessageAt: iso(2880), unreadByAdmin: 0, isArchived: true, claimedBy: null },
];

export const MOCK_MESSAGES = {
  sess_ana01: [
    { _id: 'm1', from: 'user', text: 'Hola, buenas. Vi el Mazda CX-5 2021 en la página.', timestamp: iso(14) },
    { _id: 'm2', from: 'bot', text: '¡Hola! Sí, el Mazda CX-5 2021 está disponible. ¿Te gustaría agendar una visita?', timestamp: iso(13) },
    { _id: 'm3', from: 'user', text: '¿El Mazda CX-5 sigue disponible? Me interesa verlo el sábado.', timestamp: iso(4) },
    { _id: 'm4', from: 'asesor', text: 'Hola Ana, soy Rodrigo. Claro que sí, te lo reservo para el sábado. ¿A qué hora te queda bien?', timestamp: iso(3) },
  ],
  sess_juan2: [
    { _id: 'm1', from: 'user', text: 'cuanto vale el seguro', timestamp: iso(42) },
    { _id: 'm2', from: 'bot', text: 'El valor del seguro depende del vehículo y tu perfil. ¿Sobre cuál carro consultas?', timestamp: iso(41) },
    { _id: 'm3', from: 'user', text: 'gracias, lo voy a pensar', timestamp: iso(38) },
  ],
  sess_luz03: [
    { _id: 'm1', from: 'system', text: 'El cliente prefirió continuar por WhatsApp.', timestamp: iso(100) },
    { _id: 'm2', from: 'asesor', text: 'Hola Luz, con gusto coordinamos por acá. ¿Te viene bien mañana al mediodía?', timestamp: iso(97) },
    { _id: 'm3', from: 'user', text: 'Perfecto, los espero en el punto de Bocagrande.', timestamp: iso(95) },
  ],
  sess_cerr4: [
    { _id: 'm1', from: 'user', text: 'Necesito la factura del Logan que compré.', timestamp: iso(1450) },
    { _id: 'm2', from: 'asesor', text: 'Claro Carlos, te la envío hoy mismo al correo.', timestamp: iso(1445) },
    { _id: 'm3', from: 'user', text: 'Listo, muchas gracias por la atención.', timestamp: iso(1440) },
    { _id: 'm4', from: 'system', text: 'Conversación cerrada por el asesor.', timestamp: iso(1430) },
  ],
  sess_arch5: [
    { _id: 'm1', from: 'user', text: 'hola', timestamp: iso(2880) },
  ],
};

// Otro asesor (Camila) mirando el chat de Luz → demo del indicador "atendiendo".
export const MOCK_ATTENDING = {
  sess_luz03: { uid: 'u_otro', nombre: 'Camila (Ventas)', photoURL: null, status: 'online', lastSeen: _now - 30000 },
};

// Asesores online para el modal de transferencia (?mock=1).
export const MOCK_ADVISORS = [
  { uid: 'u_otro', nombre: 'Camila (Ventas)', photoURL: null, status: 'online', cargo: 'Asesora comercial', lastSeen: _now - 30000 },
  { uid: 'u_diego', nombre: 'Diego Hernández', photoURL: null, status: 'away', cargo: 'Postventa', lastSeen: _now - 120000 },
];

// Notas internas por chat (?mock=1) — el cliente NUNCA las ve.
export const MOCK_NOTES = {
  sess_ana01: [
    { _id: 'n1', _isNote: true, text: 'Cliente VIP — ya compró un Logan en 2024. Priorizar.', authorName: 'Rodrigo (CEO)', timestamp: iso(8) },
  ],
};
