// ============================================================
// ALTOR Hub (PLAN-UNIFICADO F-4 3/3, gap §2.B Comunicaciones) — UI.
// Consola de chat asesor↔cliente. Port de js/admin/admin-concierge.js al
// patrón admin-app.
//   3a = VISOR read-only (lista + mensajes + presence).
//   3b = LAZO HUMANO: claim (tomar) + responder (optimista) + typing + read.
//   3c = GESTIÓN: cerrar/reabrir · transferir (modal por presence) ·
//        liberar (super) · notas internas (subcol, el cliente no las ve).
//   Pendiente 3d: smart suggestions + LLM summary (diferido = saldo).
// RBAC = firestore.rules:937 (concierge.read/respond/claim/close/reopen/
//   transfer/delete) → no se pinta acción que el server rechazaría.
// Run-paralelo (§237.6): el Hub viejo sigue vivo en admin.html. ⟦OPUS-4.8 · rev-Fable⟧
// ============================================================

import { el, clear } from '../../core/dom.js';
import { confirmDialog } from '../../core/confirm.js';
import { icon } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { timeAgo, initials } from '../../domain/format.js';
import {
  subscribeChats, subscribeChatMessages, subscribeAttendingPresence,
  claimChat, sendAsesorMessage, markChatRead,
  setAdminTyping, clearAdminTyping, subscribeClientTyping,
  closeChatDoc, reopenChatDoc, releaseClaim, getOnlineAdvisors, transferChat,
  addInternalNote, subscribeNotes,
  MOCK_CHATS, MOCK_MESSAGES, MOCK_ATTENDING, MOCK_ADVISORS, MOCK_NOTES,
} from './hub.data.js';

const FILTERS = [
  { id: 'active', label: 'Activos' },
  { id: 'pinned', label: 'Fijados' },
  { id: 'archived', label: 'Archivados' },
];
const MODE_ICON = { wa_handed_over: 'smartphone', live: 'user', bot: 'bot' };
const MODE_LABEL = { wa_handed_over: 'WhatsApp', live: 'En vivo', bot: 'Bot AI' };
const CLOSED_REASON = {
  client_finalized: 'Cliente finalizó la conversación',
  admin_resolved: 'Asesor marcó como resuelta',
  sla_breach_handover: 'Cliente prefirió WhatsApp por SLA',
  idle_timeout: 'Cerrada por inactividad',
};
const TYPING_THROTTLE_MS = 1000;
const TYPING_CLEAR_MS = 3000;

export function mountHub(root) {
  const canRead = hasPermission('concierge.read');

  const wrap = el('section', { class: 'hub', 'data-pane': 'list' });
  clear(root); root.append(wrap);

  if (!canRead) {
    wrap.append(stateNode(icon('lock'), 'Sin permiso', 'Necesitas el permiso concierge.read para ver el Hub de conversaciones.'));
    return function cleanup() {};
  }

  const isMock = !!store.get().mock;
  const canRespond = hasPermission('concierge.respond');
  const canClaim = hasPermission('concierge.claim') || canRespond;
  const canClose = hasPermission('concierge.close');
  const canReopen = hasPermission('concierge.reopen');
  const canTransfer = hasPermission('concierge.transfer');
  const isSuper = hasPermission('*');

  const asesor = () => {
    const s = store.get();
    return {
      uid: s.user ? s.user.uid : null,
      nombre: (s.profile && s.profile.nombre) || (s.user && s.user.email) || 'Asesor',
      photoURL: (s.profile && s.profile.photoURL) || null,
    };
  };

  const ui = {
    chats: [], loaded: false, filter: 'active', activeId: null,
    messages: [], pending: [], notes: [], msgLoaded: false, attending: {}, clientTyping: false,
    noteMode: false, transfer: { open: false, loading: false, advisors: null },
    chatsSub: null, msgSub: null, presenceSub: null, typingSub: null, notesSub: null,
    typingThrottle: false, typingClearTimer: null, forceScroll: false,
  };

  // ── Layout: 2 columnas (lista | detalle) ──
  const chips = el('div', { class: 'hub__chips', role: 'tablist', 'aria-label': 'Filtro de conversaciones' });
  const listEl = el('div', { class: 'hub__list' });
  const listCol = el('div', { class: 'hub__col hub__col--list' }, [el('div', { class: 'hub__list-head' }, [chips]), listEl]);
  const detailEl = el('div', { class: 'hub__detail' });
  const detailCol = el('div', { class: 'hub__col hub__col--detail' }, [detailEl]);
  wrap.append(listCol, detailCol);

  /* ── Lista ──────────────────────────────────────────────── */
  function counts() {
    let active = 0, pinned = 0, archived = 0;
    ui.chats.forEach((c) => {
      if (c.isDeleted) return;
      // §256 FIX: los cerrados cuentan como Archivados, no como Activos (paridad con visibleChats).
      if (c.isArchived || c.status === 'closed') archived++; else active++;
      if (c.isPinned) pinned++;
    });
    return { active, pinned, archived };
  }
  function renderChips() {
    const c = counts();
    clear(chips);
    FILTERS.forEach((f) => {
      const on = ui.filter === f.id;
      const n = c[f.id] || 0;
      const chip = el('button', { class: 'chip' + (on ? ' chip--active' : ''), role: 'tab', 'aria-selected': String(on), type: 'button' }, [
        el('span', { text: f.label }),
        n ? el('span', { class: 'chip__count', text: String(n) }) : null,
      ]);
      chip.addEventListener('click', () => { ui.filter = f.id; renderList(); });
      chips.append(chip);
    });
  }
  function visibleChats() {
    const list = ui.chats.filter((c) => {
      if (c.isDeleted) return false;
      if (ui.filter === 'pinned') return !!c.isPinned;
      // §256 FIX: un chat CERRADO (status:'closed') sale de "Activos" y aparece en
      // "Archivados" (antes se quedaba en Activos con solo un badge "✓" → el asesor
      // creía que seguía vivo). Cubre el cierre del cliente Y del asesor.
      if (ui.filter === 'archived') return !!c.isArchived || c.status === 'closed';
      return !c.isArchived && c.status !== 'closed';
    });
    list.sort((a, b) => {
      if (a.isPinned && !b.isPinned) return -1;
      if (!a.isPinned && b.isPinned) return 1;
      const at = a.lastMessageAt ? new Date(a.lastMessageAt).getTime() : 0;
      const bt = b.lastMessageAt ? new Date(b.lastMessageAt).getTime() : 0;
      return bt - at;
    });
    return list;
  }
  function chatRow(c) {
    const name = c.userNombre || c.userEmail || ('Cliente ' + c._docId.slice(-6));
    const unread = (c.unreadByAdmin || 0) || (c.forceUnreadByAdmin ? 1 : 0);
    const att = ui.attending[c._docId];
    const badges = [];
    if (c.isPinned) badges.push(el('span', { class: 'hub__row-tag', title: 'Fijado', 'aria-hidden': 'true', html: icon('pin') }));
    if (c.isArchived) badges.push(el('span', { class: 'hub__row-tag', title: 'Archivado', 'aria-hidden': 'true', html: icon('archive') }));
    if (c.status === 'closed') badges.push(el('span', { class: 'hub__row-tag', title: 'Cerrado', 'aria-hidden': 'true', html: icon('check') }));
    const row = el('button', {
      class: 'hub__row' + (c._docId === ui.activeId ? ' is-active' : '') + (unread ? ' has-unread' : ''), type: 'button',
    }, [
      el('span', { class: 'avatar avatar--sm', 'aria-hidden': 'true', text: initials(name) }),
      el('span', { class: 'hub__row-body' }, [
        el('span', { class: 'hub__row-top' }, [
          el('span', { class: 'hub__row-name u-truncate', text: name }),
          el('span', { class: 'hub__row-time u-caption u-faint', text: timeAgo(c.lastMessageAt) }),
        ]),
        el('span', { class: 'hub__row-snip' }, [
          el('span', { class: 'hub__row-mode', 'aria-hidden': 'true', html: icon(MODE_ICON[c.mode] || MODE_ICON.bot) }),
          el('span', { class: 'u-truncate', text: (c.lastMessage || '').slice(0, 64) || 'Sin mensajes' }),
        ]),
        badges.length ? el('span', { class: 'hub__row-tags' }, badges) : null,
      ]),
      att ? el('span', { class: 'hub__row-att', title: att.nombre + ' está mirando este chat', 'aria-hidden': 'true', html: icon('eye') }) : null,
      unread ? el('span', { class: 'hub__row-unread', text: String(unread) }) : null,
    ]);
    row.addEventListener('click', () => openChat(c._docId));
    return row;
  }
  function renderList() {
    renderChips();
    clear(listEl);
    if (!ui.loaded) { listEl.append(loadingNode()); return; }
    const rows = visibleChats();
    if (!rows.length) {
      const msg = ui.filter === 'pinned' ? 'No hay chats fijados.'
        : ui.filter === 'archived' ? 'Sin chats archivados.'
          : 'Sin conversaciones activas. Cuando un cliente escriba al bot, aparecerá aquí.';
      listEl.append(stateNode(icon(ui.filter === 'active' ? 'messageCircle' : 'search'), 'Nada por aquí', msg));
      return;
    }
    rows.forEach((c) => listEl.append(chatRow(c)));
  }

  /* ── Apertura de chat ───────────────────────────────────── */
  function openChat(sessionId) {
    if (ui.activeId === sessionId) { wrap.setAttribute('data-pane', 'detail'); return; }
    teardownActiveChat();
    ui.activeId = sessionId;
    ui.messages = []; ui.pending = []; ui.notes = []; ui.msgLoaded = false;
    ui.clientTyping = false; ui.noteMode = false; ui.forceScroll = true;
    wrap.setAttribute('data-pane', 'detail');
    renderList(); renderDetail();

    if (isMock) {
      ui.messages = (MOCK_MESSAGES[sessionId] || []).slice();
      ui.notes = (MOCK_NOTES[sessionId] || []).slice();
      ui.msgLoaded = true; renderDetail();
      return;
    }
    markChatRead(sessionId).catch(() => {});
    ui.msgSub = subscribeChatMessages(
      sessionId,
      (msgs) => {
        if (ui.activeId !== sessionId) return;
        ui.messages = msgs;
        ui.pending = ui.pending.filter((p) => !(p.firestoreId && msgs.some((m) => m._id === p.firestoreId)));
        ui.msgLoaded = true; renderDetail();
      },
      () => { if (ui.activeId === sessionId) { ui.msgLoaded = true; toast('No se pudieron cargar los mensajes.', 'error'); renderDetail(); } },
    );
    ui.typingSub = subscribeClientTyping(sessionId, (typing) => {
      if (ui.activeId !== sessionId || ui.clientTyping === typing) return;
      ui.clientTyping = typing; renderDetail();
    });
    ui.notesSub = subscribeNotes(sessionId, (list) => { if (ui.activeId === sessionId) { ui.notes = list; renderDetail(); } }, () => {});
  }

  function teardownActiveChat() {
    if (ui.msgSub) { ui.msgSub(); ui.msgSub = null; }
    if (ui.typingSub) { ui.typingSub(); ui.typingSub = null; }
    if (ui.notesSub) { ui.notesSub(); ui.notesSub = null; }
    if (ui.typingClearTimer) { clearTimeout(ui.typingClearTimer); ui.typingClearTimer = null; }
    ui.typingThrottle = false;
    if (ui.transfer.open) { ui.transfer.open = false; renderTransferModal(); }
    closeSummary();
    if (!isMock && ui.activeId) { const a = asesor(); if (a.uid) clearAdminTyping(ui.activeId, a.uid); }
  }
  function activeChat() { return ui.chats.find((c) => c._docId === ui.activeId) || null; }

  /* ── Acciones: claim / responder ────────────────────────── */
  function doClaim(chat) {
    if (!canClaim) return;
    const a = asesor();
    const snap = { claimedBy: chat.claimedBy, claimedByName: chat.claimedByName, claimedAt: chat.claimedAt, mode: chat.mode };
    chat.claimedBy = a.uid; chat.claimedByName = a.nombre; chat.claimedAt = new Date().toISOString(); chat.mode = 'live';
    renderList(); renderDetail();
    if (isMock) { toast('Tomaste la conversación', 'ok'); return; }
    claimChat(chat._docId, a).catch((err) => {
      Object.assign(chat, snap); renderList(); renderDetail();
      const msg = err && err.code === 'already-claimed' ? ((err.claimedByName || 'Otro asesor') + ' tomó este chat primero.')
        : err && err.code === 'chat-closed' ? 'Este chat ya está cerrado.'
          : err && err.code === 'chat-not-found' ? 'No encontramos el chat en el servidor.'
            : (err && err.code === 'permission-denied') ? 'Sin permiso para tomar este chat.' : 'No se pudo tomar el chat.';
      toast(msg, 'error');
    });
  }
  function doSend() {
    const inputEl = detailEl.querySelector('.hub__composer-input');
    if (!inputEl) return;
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = '';
    stopTyping();
    const a = asesor();
    const tempId = 'tmp_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8);
    const optimistic = { _id: tempId, _tempId: tempId, _status: 'pending', from: 'asesor', text, timestamp: new Date().toISOString(), asesorUid: a.uid, asesorNombre: a.nombre };
    ui.pending.push(optimistic);
    const chat = activeChat();
    if (chat) { chat.lastMessage = text.slice(0, 80); chat.lastMessageAt = optimistic.timestamp; renderList(); }
    ui.forceScroll = true; renderDetail();
    if (isMock) { optimistic._status = 'sent'; renderDetail(); return; }
    sendAsesorMessage(ui.activeId, text, a)
      .then((id) => { optimistic.firestoreId = id; optimistic._status = 'sent'; reconcilePending(); renderDetail(); })
      .catch(() => { optimistic._status = 'failed'; renderDetail(); toast('No se pudo enviar. Tocá "Reintentar".', 'error'); });
  }
  // §256 FIX: dedup de la carrera optimista. El onSnapshot de mensajes filtra los
  // optimistas por `p.firestoreId`, pero ese id se asigna recién en el `.then` del
  // send — y Firestore (latency compensation) suele entregar el doc real en el
  // snapshot ANTES de tener el id → el filtro corre sin firestoreId → el optimista
  // queda + el echo del snapshot = MENSAJE DOBLE. Al resolver el send, re-deduplico
  // contra ui.messages (si el doc real ya llegó, quito el optimista ahora).
  function reconcilePending() {
    ui.pending = ui.pending.filter((p) => !(p.firestoreId && ui.messages.some((m) => m._id === p.firestoreId)));
  }
  function retrySend(p) {
    if (p._status !== 'failed') return;
    p._status = 'pending'; renderDetail();
    if (isMock) { p._status = 'sent'; renderDetail(); return; }
    sendAsesorMessage(ui.activeId, p.text, asesor())
      .then((id) => { p.firestoreId = id; p._status = 'sent'; reconcilePending(); renderDetail(); })
      .catch(() => { p._status = 'failed'; renderDetail(); toast('Sigue fallando el envío.', 'error'); });
  }

  /* ── Acciones de gestión (3c) ───────────────────────────── */
  async function doClose(chat) {
    if (!await confirmDialog({ title: '¿Cerrar esta conversación?', message: 'El cliente verá un aviso de cierre. Los mensajes se conservan.', confirmText: 'Cerrar' })) return;
    const a = asesor(); const ts = new Date().toISOString();
    const snap = { status: chat.status, closedAt: chat.closedAt, closedBy: chat.closedBy, closedByName: chat.closedByName, closedReason: chat.closedReason, lastMessage: chat.lastMessage, lastMessageAt: chat.lastMessageAt };
    chat.status = 'closed'; chat.closedAt = ts; chat.closedBy = a.uid; chat.closedByName = a.nombre; chat.closedReason = 'admin_resolved';
    chat.lastMessage = '✓ Conversación cerrada por ' + a.nombre; chat.lastMessageAt = ts;
    ui.forceScroll = true; renderList(); renderDetail();
    if (isMock) { ui.messages.push({ _id: 's_' + Date.now(), from: 'system', text: '✓ ' + a.nombre + ' cerró esta conversación. Inicia una nueva cuando quieras.', timestamp: ts }); renderDetail(); toast('Conversación cerrada', 'ok'); return; }
    closeChatDoc(chat._docId, a).then(() => toast('Conversación cerrada', 'ok'))
      .catch(() => { Object.assign(chat, snap); renderList(); renderDetail(); toast('No se pudo cerrar.', 'error'); });
  }
  async function doReopen(chat) {
    if (!await confirmDialog({ title: '¿Reabrir esta conversación?', message: 'El cliente podrá volver a escribir aquí.', confirmText: 'Reabrir' })) return;
    const a = asesor(); const ts = new Date().toISOString();
    const snap = { status: chat.status, lastMessage: chat.lastMessage, lastMessageAt: chat.lastMessageAt };
    chat.status = 'active'; chat.lastMessage = '↻ Conversación reabierta por ' + a.nombre; chat.lastMessageAt = ts;
    ui.forceScroll = true; renderList(); renderDetail();
    if (isMock) { ui.messages.push({ _id: 's_' + Date.now(), from: 'system', text: '↻ ' + a.nombre + ' reabrió la conversación. Puedes seguir escribiendo.', timestamp: ts }); renderDetail(); toast('Conversación reabierta', 'ok'); return; }
    reopenChatDoc(chat._docId, a).then(() => toast('Conversación reabierta', 'ok'))
      .catch(() => { Object.assign(chat, snap); renderList(); renderDetail(); toast('No se pudo reabrir.', 'error'); });
  }
  function doRelease(chat) {
    const a = asesor();
    const snap = { claimedBy: chat.claimedBy, claimedByName: chat.claimedByName };
    chat.claimedBy = null; chat.claimedByName = null; renderList(); renderDetail();
    if (isMock) { toast('Lock liberado', 'ok'); return; }
    releaseClaim(chat._docId, a).then(() => toast('Lock liberado — otro asesor puede tomar el chat', 'ok'))
      .catch(() => { Object.assign(chat, snap); renderList(); renderDetail(); toast('No se pudo liberar.', 'error'); });
  }

  // Overlays independientes del renderDetail (sobreviven a los rebuilds)
  let transferEl = null;
  let summaryEl = null;
  function openTransfer() {
    ui.transfer = { open: true, loading: true, advisors: null };
    renderTransferModal();
    if (isMock) { ui.transfer.loading = false; ui.transfer.advisors = MOCK_ADVISORS.slice(); renderTransferModal(); return; }
    getOnlineAdvisors(asesor().uid)
      .then((list) => { ui.transfer.loading = false; ui.transfer.advisors = list; renderTransferModal(); })
      .catch(() => { ui.transfer.loading = false; ui.transfer.advisors = []; renderTransferModal(); });
  }
  function closeTransfer() { ui.transfer.open = false; renderTransferModal(); }
  async function doTransfer(adv) {
    const chat = activeChat();
    if (!chat) return;
    if (!await confirmDialog({ title: '¿Transferir esta conversación a ' + adv.nombre + '?', message: 'Recibirá una notificación.', confirmText: 'Transferir' })) return;
    const a = asesor();
    const snap = { claimedBy: chat.claimedBy, claimedByName: chat.claimedByName };
    chat.claimedBy = adv.uid; chat.claimedByName = adv.nombre; renderList(); renderDetail();
    closeTransfer();
    if (isMock) { toast('Conversación transferida a ' + adv.nombre, 'ok'); return; }
    transferChat(chat._docId, adv.uid, adv.nombre, a).then(() => toast('Transferida a ' + adv.nombre, 'ok'))
      .catch((err) => {
        Object.assign(chat, snap); renderList(); renderDetail();
        const m = err && err.code === 'chat-closed' ? 'No se puede transferir un chat cerrado.'
          : err && err.code === 'chat-not-found' ? 'El chat ya no existe.' : 'No se pudo transferir.';
        toast(m, 'error');
      });
  }
  function renderTransferModal() {
    if (transferEl) { transferEl.remove(); transferEl = null; }
    if (!ui.transfer.open) return;
    const list = el('div', { class: 'hub__tr-list' });
    if (ui.transfer.loading) list.append(el('div', { class: 'state' }, [el('div', { class: 'state__msg', text: 'Cargando asesores…' })]));
    else if (!ui.transfer.advisors || !ui.transfer.advisors.length) list.append(stateNode(icon('users'), 'Nadie disponible', 'No hay otros asesores online ahora. Solo se transfiere a asesores con sesión activa.'));
    else ui.transfer.advisors.forEach((adv) => {
      const item = el('button', { class: 'hub__tr-item', type: 'button' }, [
        el('span', { class: 'avatar avatar--sm hub__tr-status hub__tr-status--' + (adv.status === 'away' ? 'away' : 'online'), 'aria-hidden': 'true', text: initials(adv.nombre) }),
        el('span', { class: 'hub__tr-info' }, [
          el('span', { class: 'hub__tr-name u-truncate', text: adv.nombre }),
          el('span', { class: 'hub__tr-meta u-caption u-faint', text: (adv.cargo || '') + ' · ' + (adv.status === 'away' ? 'Ausente' : 'Online') }),
        ]),
        el('span', { 'aria-hidden': 'true', text: '›' }),
      ]);
      item.addEventListener('click', () => doTransfer(adv));
      list.append(item);
    });
    const closeBtn = el('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Cerrar' }, [el('span', { 'aria-hidden': 'true', html: icon('x') })]);
    closeBtn.addEventListener('click', closeTransfer);
    const panel = el('div', { class: 'hub__tr-panel', role: 'dialog', 'aria-label': 'Transferir conversación' }, [
      el('div', { class: 'hub__tr-head' }, [el('strong', { class: 'u-ico-text', html: icon('repeat') + ' Transferir conversación' }), closeBtn]),
      list,
    ]);
    transferEl = el('div', { class: 'hub__tr-backdrop' }, [panel]);
    transferEl.addEventListener('click', (e) => { if (e.target === transferEl) closeTransfer(); });
    wrap.append(transferEl);
  }

  /* ── Notas internas (3c) ────────────────────────────────── */
  function toggleNoteMode() { ui.noteMode = !ui.noteMode; renderDetail(); }
  function doNote() {
    const inputEl = detailEl.querySelector('.hub__composer-input');
    if (!inputEl) return;
    const text = inputEl.value.trim();
    if (!text) return;
    inputEl.value = '';
    const a = asesor();
    if (isMock) { ui.notes.push({ _id: 'n_' + Date.now(), _isNote: true, text, authorName: a.nombre, timestamp: new Date().toISOString() }); ui.forceScroll = true; renderDetail(); toast('Nota guardada', 'ok'); return; }
    addInternalNote(ui.activeId, text, a).then(() => toast('Nota interna guardada', 'ok')).catch(() => toast('No se pudo guardar la nota.', 'error'));
  }

  /* ── Typing (asesor → RTDB) ─────────────────────────────── */
  function onComposerInput() {
    if (isMock || ui.noteMode || !ui.activeId) return; // en nota privada NO se emite typing
    const a = asesor();
    if (ui.typingThrottle) { resetTypingClear(a); return; }
    ui.typingThrottle = true;
    setTimeout(() => { ui.typingThrottle = false; }, TYPING_THROTTLE_MS);
    setAdminTyping(ui.activeId, true, a);
    resetTypingClear(a);
  }
  function resetTypingClear(a) {
    if (ui.typingClearTimer) clearTimeout(ui.typingClearTimer);
    ui.typingClearTimer = setTimeout(() => setAdminTyping(ui.activeId, false, a), TYPING_CLEAR_MS);
  }
  function stopTyping() {
    if (ui.typingClearTimer) { clearTimeout(ui.typingClearTimer); ui.typingClearTimer = null; }
    ui.typingThrottle = false;
    if (!isMock && ui.activeId) setAdminTyping(ui.activeId, false, asesor());
  }

  /* ── Detalle (rebuild completo, preserva el texto del composer) ── */
  function effectiveStatus(m, chat) {
    const s = m._status || 'sent';
    if (s !== 'sent') return s;
    if (!chat || !chat.lastReadByUser) return 'sent';
    const mt = new Date(m.timestamp).getTime();
    const rt = new Date(chat.lastReadByUser).getTime();
    return (!Number.isNaN(mt) && !Number.isNaN(rt) && mt <= rt) ? 'read' : 'sent';
  }
  function bubble(m, chat) {
    if (m._isNote) {
      return el('div', { class: 'hub-msg hub-msg--note' }, [
        el('div', { class: 'hub-msg__note-head u-caption' }, [
          el('span', { class: 'hub-msg__note-badge u-ico-text', html: icon('lock') + ' Nota privada' }),
          el('span', { class: 'u-faint', text: m.authorName || 'Asesor' }),
        ]),
        el('div', { class: 'hub-msg__note-body', text: m.text || '' }),
        el('div', { class: 'hub-msg__time u-caption u-faint', text: timeAgo(m.timestamp) }),
      ]);
    }
    if (m.from === 'system') {
      return el('div', { class: 'hub-msg hub-msg--system' }, [
        el('div', { class: 'hub-msg__sys', text: m.text || '' }),
        el('div', { class: 'hub-msg__time u-caption u-faint', text: timeAgo(m.timestamp) }),
      ]);
    }
    const side = m.from === 'asesor' ? 'out' : 'in';
    const kind = m.from === 'user' ? 'user' : m.from === 'asesor' ? 'asesor' : 'bot';
    let statusEl = null;
    if (m.from === 'asesor') {
      const st = effectiveStatus(m, chat);
      if (st === 'pending') statusEl = el('span', { class: 'hub-msg__st', title: 'Enviando', 'aria-hidden': 'true', html: icon('clock') });
      else if (st === 'read') statusEl = el('span', { class: 'hub-msg__st hub-msg__st--read', title: 'Leído', 'aria-hidden': 'true', html: icon('checkCheck') });
      else if (st === 'failed') {
        statusEl = el('button', { class: 'hub-msg__retry', type: 'button', title: 'Reintentar envío', html: icon('refresh') + ' Reintentar' });
        statusEl.addEventListener('click', () => retrySend(m));
      } else statusEl = el('span', { class: 'hub-msg__st', title: 'Enviado', 'aria-hidden': 'true', html: icon('check') });
    }
    return el('div', { class: `hub-msg hub-msg--${side} hub-msg--${kind}` + (m._status === 'failed' ? ' hub-msg--failed' : '') }, [
      el('div', { class: 'hub-msg__bubble' }, [
        kind === 'bot' ? el('span', { class: 'hub-msg__who u-caption u-ico-text', html: icon('bot') + ' Bot' }) : null,
        el('span', { class: 'hub-msg__text', text: m.text || '' }),
      ]),
      el('div', { class: 'hub-msg__time u-caption u-faint' }, [el('span', { text: timeAgo(m.timestamp) }), statusEl]),
    ]);
  }

  function renderDetail() {
    const prev = detailEl.querySelector('.hub__composer-input');
    const prevVal = prev ? prev.value : null;
    const prevFocus = prev && document.activeElement === prev;
    const prevSel = prev ? prev.selectionStart : null;
    const prevMsgs = detailEl.querySelector('.hub__msgs');
    const wasNearBottom = prevMsgs ? (prevMsgs.scrollHeight - prevMsgs.scrollTop - prevMsgs.clientHeight) < 120 : true;

    clear(detailEl);
    const chat = activeChat();
    if (!chat) {
      detailEl.append(stateNode(icon('messageCircle'), 'Selecciona una conversación', 'Elige un chat de la lista para verlo y gestionarlo.'));
      return;
    }

    const name = chat.userNombre || chat.userEmail || ('Cliente ' + chat._docId.slice(-6));
    const me = asesor().uid;
    const isClosed = chat.status === 'closed';
    const claimedByOther = !!(chat.claimedBy && chat.claimedBy !== me);
    const claimedByMe = !!(chat.claimedBy && chat.claimedBy === me);
    const unclaimed = !chat.claimedBy && !isClosed;
    const canWrite = !isClosed && !unclaimed && (claimedByMe || isSuper);
    const att = ui.attending[chat._docId];

    // Header + acciones
    const back = el('button', { class: 'hub__back icon-btn', type: 'button', 'aria-label': 'Volver a la lista' }, [el('span', { 'aria-hidden': 'true', html: icon('arrowLeft') })]);
    back.addEventListener('click', () => { wrap.setAttribute('data-pane', 'list'); });
    const metaBits = [el('span', { class: 'hub__detail-mode', text: MODE_LABEL[chat.mode] || MODE_LABEL.bot })];
    if (chat.userEmail) metaBits.push(el('span', { class: 'u-faint', text: '· ' + chat.userEmail }));
    if (chat.telefono) metaBits.push(el('span', { class: 'u-faint', text: '· ' + chat.telefono }));
    if (chat.sourceVehicleId) metaBits.push(el('span', { class: 'u-faint', text: '· vehículo #' + chat.sourceVehicleId }));
    const headActions = [];
    const sumBtn = el('button', { class: 'btn btn--ghost btn--sm', type: 'button', html: icon('fileText') + ' Resumen' });
    sumBtn.addEventListener('click', () => openSummary(chat));
    headActions.push(sumBtn);
    if (!isClosed && canClose && (!claimedByOther || isSuper)) {
      const closeBtn = el('button', { class: 'btn btn--ghost btn--sm', type: 'button', html: icon('check') + ' Cerrar chat' });
      closeBtn.addEventListener('click', () => doClose(chat));
      headActions.push(closeBtn);
    }
    detailEl.append(el('div', { class: 'hub__detail-head' }, [
      back,
      el('div', { class: 'hub__detail-id' }, [
        el('div', { class: 'hub__detail-name' }, [
          el('span', { text: name }),
          chat.radicado ? el('span', { class: 'badge badge--gold', text: chat.radicado }) : null,
        ]),
        el('div', { class: 'hub__detail-meta u-caption u-row u-row--tight' }, metaBits),
      ]),
      headActions.length ? el('div', { class: 'hub__detail-actions u-row u-row--tight' }, headActions) : null,
    ]));

    // Banners
    if (isClosed) {
      const reason = CLOSED_REASON[chat.closedReason] || 'Conversación finalizada';
      const by = chat.closedByName || (chat.closedByRole === 'client' ? 'el cliente' : 'un asesor');
      const reopenBtn = canReopen ? actionBtn(icon('refresh') + ' Reabrir', () => doReopen(chat)) : null;
      detailEl.append(banner(icon('lock'), reason, 'Por ' + by + (chat.closedAt ? ' · ' + timeAgo(chat.closedAt) : ''), 'closed', reopenBtn ? [reopenBtn] : null));
    }
    if (claimedByOther) {
      const relBtn = isSuper ? actionBtn(icon('unlock') + ' Liberar', () => doRelease(chat)) : null;
      detailEl.append(banner(isSuper ? icon('alertTriangle') : icon('lock'),
        (chat.claimedByName || 'Otro asesor') + ' está atendiendo este chat',
        isSuper ? 'Si escribes acá interrumpís su atención.' : (chat.claimedAt ? 'Tomado ' + timeAgo(chat.claimedAt) : 'Solo quien lo tomó puede responder.'),
        'claimed', relBtn ? [relBtn] : null));
    }
    if (att) detailEl.append(banner(icon('eye'), att.nombre + ' está mirando este chat ahora mismo', 'Presencia en tiempo real.', 'attending'));
    if (claimedByMe && !isClosed) {
      const acts = [];
      if (canTransfer) acts.push(actionBtn(icon('repeat') + ' Transferir', openTransfer));
      if (isSuper) acts.push(actionBtn(icon('unlock') + ' Liberar', () => doRelease(chat)));
      detailEl.append(banner(icon('checkCircle'), 'Estás atendiendo este chat', 'Otros asesores no pueden responder.', 'mine', acts.length ? acts : null));
    }

    // Banner CLAIM
    if (unclaimed && canClaim) {
      const claimBtn = el('button', { class: 'btn btn--gold', type: 'button', html: icon('hand') + ' Tomar conversación' });
      claimBtn.addEventListener('click', () => doClaim(chat));
      detailEl.append(el('div', { class: 'hub__claim' }, [
        el('div', { class: 'hub__claim-info' }, [
          el('div', { class: 'hub__claim-title', text: 'Conversación sin asignar' }),
          el('div', { class: 'hub__claim-sub u-caption u-faint', text: 'Tomala para responderle al cliente. Mientras la atendés, otros asesores no podrán escribir.' }),
        ]),
        claimBtn,
      ]));
    }

    // Mensajes (server + optimistas + notas) ordenados por timestamp
    const msgsBox = el('div', { class: 'hub__msgs' });
    const items = ui.messages.concat(ui.pending).concat(ui.notes).sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
    if (!ui.msgLoaded) msgsBox.append(loadingNode());
    else if (!items.length) msgsBox.append(el('div', { class: 'hub__msgs-empty u-caption u-faint', text: 'Sin mensajes en esta conversación.' }));
    else items.forEach((m) => msgsBox.append(bubble(m, chat)));
    if (ui.clientTyping) {
      msgsBox.append(el('div', { class: 'hub-msg hub-msg--in hub__typing' }, [
        el('div', { class: 'hub__typing-dots' }, [el('span'), el('span'), el('span')]),
        el('span', { class: 'u-caption u-faint', text: 'El cliente está escribiendo…' }),
      ]));
    }
    detailEl.append(msgsBox);

    // Smart suggestions (3d) — heurísticas por keyword, llenan el composer al click.
    if (canWrite && !ui.noteMode) {
      const sugs = smartSuggestions(chat, items);
      if (sugs.length) {
        const chips = sugs.map((s) => {
          const chip = el('button', { class: 'hub__suggest-chip', type: 'button', title: s.text }, [
            el('span', { class: 'hub__suggest-tag', text: s.tag }),
            el('span', { class: 'u-truncate', text: s.text.slice(0, 60) + (s.text.length > 60 ? '…' : '') }),
          ]);
          chip.addEventListener('click', () => { const inp = detailEl.querySelector('.hub__composer-input'); if (inp) { inp.value = s.text; inp.focus(); } });
          return chip;
        });
        detailEl.append(el('div', { class: 'hub__suggest' }, [el('span', { class: 'hub__suggest-label u-caption u-faint u-ico-text', html: icon('sparkles') + ' Sugerencias' })].concat(chips)));
      }
    }

    // Composer (con toggle de nota interna)
    if (canWrite) {
      const noteToggle = el('button', { class: 'btn btn--ghost btn--sm hub__note-toggle' + (ui.noteMode ? ' is-active' : ''), type: 'button', 'aria-pressed': String(ui.noteMode), title: 'Nota interna — el cliente NO la verá', 'aria-label': 'Nota interna', html: icon('lock') });
      noteToggle.addEventListener('click', toggleNoteMode);
      const input = el('input', { class: 'form-input hub__composer-input', type: 'text', autocomplete: 'off',
        placeholder: ui.noteMode ? 'Nota privada del asesor (el cliente NO la verá)…' : 'Responder como asesor…' });
      input.addEventListener('input', onComposerInput);
      input.addEventListener('keydown', (e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); ui.noteMode ? doNote() : doSend(); } });
      const sendBtn = el('button', { class: 'btn btn--gold', type: 'button' }, [ui.noteMode ? 'Guardar nota' : 'Enviar']);
      sendBtn.addEventListener('click', () => (ui.noteMode ? doNote() : doSend()));
      detailEl.append(el('div', { class: 'hub__composer' + (ui.noteMode ? ' hub__composer--note' : '') }, [noteToggle, input, sendBtn]));
    } else if (!unclaimed) {
      detailEl.append(el('div', { class: 'hub__composer hub__composer--disabled' }, [
        el('input', { class: 'form-input', type: 'text', disabled: true,
          placeholder: isClosed ? 'Conversación cerrada — solo lectura' : 'Atendido por ' + (chat.claimedByName || 'otro asesor') }),
      ]));
    } else if (unclaimed && !canClaim) {
      detailEl.append(el('div', { class: 'hub__ro-note u-caption u-faint u-ico-text' }, [el('span', { class: 'u-ico', 'aria-hidden': 'true', html: icon('eye') }), el('span', { text: 'Solo lectura — necesitas permiso para tomar y responder conversaciones.' })]));
    }

    if (wasNearBottom || ui.forceScroll) { requestAnimationFrame(() => { msgsBox.scrollTop = msgsBox.scrollHeight; }); ui.forceScroll = false; }
    if (prevVal != null) {
      const nowInput = detailEl.querySelector('.hub__composer-input');
      if (nowInput) { nowInput.value = prevVal; if (prevFocus) { nowInput.focus(); try { nowInput.setSelectionRange(prevSel, prevSel); } catch (_) {} } }
    }
  }

  /* ── Helpers de nodos ───────────────────────────────────── */
  function actionBtn(label, onClick) {
    const b = el('button', { class: 'btn btn--ghost btn--sm', type: 'button', html: label });
    b.addEventListener('click', onClick);
    return b;
  }
  function banner(glyph, title, sub, variant, actions) {
    return el('div', { class: 'hub__banner hub__banner--' + variant }, [
      el('span', { class: 'hub__banner-icon', 'aria-hidden': 'true', html: glyph }),
      el('div', { class: 'hub__banner-info' }, [
        el('div', { class: 'hub__banner-title', text: title }),
        sub ? el('div', { class: 'hub__banner-sub u-caption u-faint', text: sub }) : null,
      ]),
      actions && actions.length ? el('div', { class: 'hub__banner-actions u-row u-row--tight' }, actions) : null,
    ]);
  }
  function stateNode(glyph, title, msg) {
    return el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', 'aria-hidden': 'true', html: glyph }),
      el('div', { class: 'state__title', text: title }),
      el('div', { class: 'state__msg', text: msg }),
    ]);
  }
  function loadingNode() { return el('div', { class: 'state' }, [el('div', { class: 'state__msg', text: 'Cargando…' })]); }

  /* ── Smart suggestions (3d) — heurísticas por keyword (sin LLM/NER) ── */
  function smartSuggestions(chat, items) {
    let lastUser = null;
    for (let i = items.length - 1; i >= 0; i--) { if (items[i].from === 'user') { lastUser = items[i]; break; } }
    if (!lastUser) return [];
    const text = lastUser.text || '';
    const firstName = (chat.userNombre || '').split(' ')[0] || '';
    const greet = firstName ? 'Hola ' + firstName + ', ' : 'Hola, ';
    const out = [];
    if (/precio|cuanto|cuánto|cuesta|cotizaci|valor/i.test(text)) out.push({ tag: '💵 Cotización', text: greet + 'te preparo la cotización con todas las condiciones (financiación, peritaje, garantía). ¿Tienes una hora para que te la presente?' });
    if (/agendar|cita|visita|ver el|conocer|cuando puedo|cuándo puedo|sábado|domingo/i.test(text)) out.push({ tag: '📅 Agendar', text: greet + '¡con gusto te agendo una cita! ¿Qué horario te queda mejor: mañana, tarde o final del día?' });
    if (/financ|cuota|pagar|crédito|credito|inicial/i.test(text)) out.push({ tag: '💳 Financiación', text: greet + 'tenemos planes de financiación con cuota inicial desde 30%. ¿Cuál es tu cuota inicial disponible y a qué plazo te gustaría pagarlo?' });
    if (/domicilio|env[íi]o|barranquilla|bogot|medell|envian|env[íi]an/i.test(text)) out.push({ tag: '🚚 Envío', text: greet + 'coordinamos el envío del vehículo a tu ciudad. ¿Te explico los pasos y costos?' });
    out.push({ tag: '👋 Saludo', text: greet + 'soy tu asesor de Altorra Cars. Cuéntame un poco más sobre lo que buscas y te ayudo enseguida.' });
    const seen = {}; const uniq = [];
    out.forEach((s) => { const k = s.text.slice(0, 40); if (!seen[k]) { seen[k] = true; uniq.push(s); } });
    return uniq.slice(0, 3);
  }

  /* ── Resumen de handover (3d) — local; el resumen IA queda DIFERIDO (saldo) ── */
  function buildSummaryText(chat, total, nUser, nAsesor, statusTxt, claimTxt, lastUsers) {
    const lines = ['RESUMEN — ' + (chat.userNombre || chat.userEmail || 'Cliente')];
    if (chat.userEmail) lines.push('Email: ' + chat.userEmail);
    if (chat.telefono) lines.push('Tel: ' + chat.telefono);
    if (chat.sourceVehicleId) lines.push('Vehículo: #' + chat.sourceVehicleId);
    lines.push('Conversación: ' + total + ' mensajes (' + nUser + ' cliente / ' + nAsesor + ' asesor)');
    lines.push('Estado: ' + statusTxt + ' · ' + claimTxt);
    if (lastUsers.length) { lines.push('Últimos mensajes del cliente:'); lastUsers.forEach((m) => lines.push('- ' + (m.text || ''))); }
    return lines.join('\n');
  }
  function sumSection(title, children) { return el('section', { class: 'hub__sum-sec' }, [el('h4', { class: 'hub__sum-h', text: title })].concat(children)); }
  function closeSummary() { if (summaryEl) { summaryEl.remove(); summaryEl = null; } }
  function openSummary(chat) {
    const items = ui.messages.concat(ui.pending);
    const userMsgs = items.filter((m) => m.from === 'user');
    const asesorMsgs = items.filter((m) => m.from === 'asesor');
    const lastUsers = userMsgs.slice(-3);
    const statusTxt = chat.status === 'closed' ? 'Cerrada' : 'Activa';
    const claimTxt = chat.claimedBy ? ('Atendido por ' + (chat.claimedByName || 'un asesor')) : 'Sin asignar';
    const txt = buildSummaryText(chat, items.length, userMsgs.length, asesorMsgs.length, statusTxt, claimTxt, lastUsers);

    closeSummary();
    const body = el('div', { class: 'hub__sum-body' }, [
      sumSection('Cliente', [
        el('div', { text: chat.userNombre || chat.userEmail || ('Cliente ' + chat._docId.slice(-6)) }),
        chat.userEmail ? el('div', { class: 'u-caption u-faint u-ico-text' }, [el('span', { class: 'u-ico', 'aria-hidden': 'true', html: icon('mail') }), el('span', { text: chat.userEmail })]) : null,
        chat.telefono ? el('div', { class: 'u-caption u-faint u-ico-text' }, [el('span', { class: 'u-ico', 'aria-hidden': 'true', html: icon('smartphone') }), el('span', { text: chat.telefono })]) : null,
        chat.sourceVehicleId ? el('div', { class: 'u-caption u-faint u-ico-text' }, [el('span', { class: 'u-ico', 'aria-hidden': 'true', html: icon('car') }), el('span', { text: 'Vehículo #' + chat.sourceVehicleId })]) : null,
      ]),
      sumSection('Conversación', [
        el('div', { class: 'u-caption', text: items.length + ' mensajes · ' + userMsgs.length + ' del cliente · ' + asesorMsgs.length + ' del asesor' }),
        el('div', { class: 'u-caption u-faint', text: 'Estado: ' + statusTxt + ' · ' + claimTxt }),
      ]),
      sumSection('Últimos mensajes del cliente', lastUsers.length
        ? lastUsers.map((m) => el('div', { class: 'hub__sum-msg', text: '“' + (m.text || '') + '”' }))
        : [el('div', { class: 'u-faint u-caption', text: 'Sin mensajes del cliente todavía.' })]),
    ]);
    const copyBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', html: icon('copy') + ' Copiar' });
    copyBtn.addEventListener('click', () => { try { navigator.clipboard.writeText(txt); toast('Resumen copiado', 'ok'); } catch (_) { toast('No se pudo copiar', 'error'); } });
    const closeBtn = el('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Cerrar' }, [el('span', { 'aria-hidden': 'true', html: icon('x') })]);
    closeBtn.addEventListener('click', closeSummary);
    const panel = el('div', { class: 'hub__sum-panel', role: 'dialog', 'aria-label': 'Resumen de la conversación' }, [
      el('div', { class: 'hub__sum-head' }, [el('strong', { class: 'u-ico-text', html: icon('fileText') + ' Resumen para handover' }), closeBtn]),
      body,
      el('div', { class: 'hub__sum-ia u-caption u-ico-text' }, [el('span', { class: 'u-ico', 'aria-hidden': 'true', html: icon('sparkles') }), el('span', { text: 'Resumen con IA — disponible cuando se active el asistente LLM (saldo Anthropic).' })]),
      el('div', { class: 'hub__sum-foot' }, [copyBtn]),
    ]);
    summaryEl = el('div', { class: 'hub__sum-backdrop' }, [panel]);
    summaryEl.addEventListener('click', (e) => { if (e.target === summaryEl) closeSummary(); });
    wrap.append(summaryEl);
  }

  /* ── Boot ───────────────────────────────────────────────── */
  if (isMock) {
    ui.chats = MOCK_CHATS.slice();
    ui.attending = { ...MOCK_ATTENDING };
    ui.loaded = true;
    renderList(); renderDetail();
  } else {
    renderList(); renderDetail();
    ui.chatsSub = subscribeChats(
      (list) => { ui.chats = list; ui.loaded = true; renderList(); if (ui.activeId) renderDetail(); },
      (e) => { ui.loaded = true; toast(e && e.code === 'permission-denied' ? 'Sin permiso para ver el Hub.' : 'No se pudo cargar el Hub.', 'error'); renderList(); },
    );
    ui.presenceSub = subscribeAttendingPresence(
      (map) => { ui.attending = map; renderList(); if (ui.activeId) renderDetail(); }, () => {},
    );
  }

  return function cleanup() {
    teardownActiveChat();
    if (ui.chatsSub) ui.chatsSub();
    if (ui.presenceSub) ui.presenceSub();
    ui.chatsSub = ui.presenceSub = null;
  };
}
