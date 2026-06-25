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
// RTDB /presence (database.rules.json: .read = "auth != null" → la app
//   'altorra-crm' SÍ lee; clave en auth.uid, no en nombre de app — verificado).
//     Entry: {uid, nombre, online, currentChatId, rol, lastSeen, status, photoURL}.
//
// ⚠️ Run-paralelo (§237.6): el Hub VIEJO (admin.html) sigue vivo. Por eso 3a NO
// publica presence ni read-receipts (writes) → cero doble-fuente. ⟦OPUS-4.8 · rev-Fable⟧
// ============================================================

import {
  collection, onSnapshot, query, orderBy, limit,
} from 'firebase/firestore';
import { ref, onValue } from 'firebase/database';
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
