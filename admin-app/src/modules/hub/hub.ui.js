// ============================================================
// ALTOR Hub (PLAN-UNIFICADO F-4 3/3, gap §2.B Comunicaciones) — UI.
// Consola de chat asesor↔cliente. Port de js/admin/admin-concierge.js al
// patrón admin-app. SUB-INCREMENTO 3a = VISOR de solo lectura: 2 zonas
// (lista de chats + filtros · detalle con mensajes) + presence "X está
// atendiendo" (read). Las MUTACIONES (enviar/claim/transfer/close/notes)
// llegan en 3b-3c → aquí solo se LEE (cero interferencia con el Hub viejo
// que sigue vivo en admin.html durante el run-paralelo, §237.6).
// RBAC: read=concierge.read (alineado a firestore.rules:937 → no pintamos
// acciones que el server rechazaría). ⟦OPUS-4.8 · rev-Fable⟧
// ============================================================

import { el, clear } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { timeAgo, initials } from '../../domain/format.js';
import {
  subscribeChats, subscribeChatMessages, subscribeAttendingPresence,
  MOCK_CHATS, MOCK_MESSAGES, MOCK_ATTENDING,
} from './hub.data.js';

const FILTERS = [
  { id: 'active', label: 'Activos' },
  { id: 'pinned', label: 'Fijados' },
  { id: 'archived', label: 'Archivados' },
];

const MODE_ICON = { wa_handed_over: '📲', live: '👨', bot: '🤖' };
const MODE_LABEL = { wa_handed_over: 'WhatsApp', live: 'En vivo', bot: 'Bot AI' };
const CLOSED_REASON = {
  client_finalized: 'Cliente finalizó la conversación',
  admin_resolved: 'Asesor marcó como resuelta',
  sla_breach_handover: 'Cliente prefirió WhatsApp por SLA',
  idle_timeout: 'Cerrada por inactividad',
};

export function mountHub(root) {
  const canRead = hasPermission('concierge.read');

  const wrap = el('section', { class: 'hub', 'data-pane': 'list' });
  clear(root); root.append(wrap);

  if (!canRead) {
    wrap.append(stateNode('🔒', 'Sin permiso', 'Necesitas el permiso concierge.read para ver el Hub de conversaciones.'));
    return function cleanup() {};
  }

  const isMock = !!store.get().mock;
  const ui = {
    chats: [], loaded: false, filter: 'active', activeId: null,
    messages: [], msgLoaded: false, attending: {},
    chatsSub: null, msgSub: null, presenceSub: null,
  };

  // ── Layout: 2 columnas (lista | detalle) ──
  const chips = el('div', { class: 'hub__chips', role: 'tablist', 'aria-label': 'Filtro de conversaciones' });
  const listEl = el('div', { class: 'hub__list' });
  const listCol = el('div', { class: 'hub__col hub__col--list' }, [
    el('div', { class: 'hub__list-head' }, [chips]),
    listEl,
  ]);
  const detailEl = el('div', { class: 'hub__detail' });
  const detailCol = el('div', { class: 'hub__col hub__col--detail' }, [detailEl]);
  wrap.append(listCol, detailCol);

  /* ── Lista ──────────────────────────────────────────────── */
  function counts() {
    let active = 0, pinned = 0, archived = 0;
    ui.chats.forEach((c) => {
      if (c.isDeleted) return;
      if (c.isArchived) archived++; else active++;
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
      if (ui.filter === 'archived') return !!c.isArchived;
      return !c.isArchived;
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
    if (c.isPinned) badges.push(el('span', { class: 'hub__row-tag', title: 'Fijado', text: '📌' }));
    if (c.isArchived) badges.push(el('span', { class: 'hub__row-tag', title: 'Archivado', text: '🗄️' }));
    if (c.status === 'closed') badges.push(el('span', { class: 'hub__row-tag', title: 'Cerrado', text: '✓' }));

    const row = el('button', {
      class: 'hub__row' + (c._docId === ui.activeId ? ' is-active' : '') + (unread ? ' has-unread' : ''),
      type: 'button',
    }, [
      el('span', { class: 'avatar avatar--sm', 'aria-hidden': 'true', text: initials(name) }),
      el('span', { class: 'hub__row-body' }, [
        el('span', { class: 'hub__row-top' }, [
          el('span', { class: 'hub__row-name u-truncate', text: name }),
          el('span', { class: 'hub__row-time u-caption u-faint', text: timeAgo(c.lastMessageAt) }),
        ]),
        el('span', { class: 'hub__row-snip' }, [
          el('span', { class: 'hub__row-mode', 'aria-hidden': 'true', text: MODE_ICON[c.mode] || MODE_ICON.bot }),
          el('span', { class: 'u-truncate', text: (c.lastMessage || '').slice(0, 64) || 'Sin mensajes' }),
        ]),
        badges.length ? el('span', { class: 'hub__row-tags' }, badges) : null,
      ]),
      att ? el('span', { class: 'hub__row-att', title: att.nombre + ' está mirando este chat', text: '👀' }) : null,
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
      listEl.append(stateNode(ui.filter === 'active' ? '💬' : '🔍', 'Nada por aquí', msg));
      return;
    }
    rows.forEach((c) => listEl.append(chatRow(c)));
  }

  /* ── Detalle ────────────────────────────────────────────── */
  function openChat(sessionId) {
    if (ui.activeId === sessionId) { wrap.setAttribute('data-pane', 'detail'); return; }
    ui.activeId = sessionId;
    ui.messages = [];
    ui.msgLoaded = false;
    wrap.setAttribute('data-pane', 'detail');
    renderList();      // refresca el "is-active"
    renderDetail();

    if (ui.msgSub) { ui.msgSub(); ui.msgSub = null; }
    if (isMock) {
      ui.messages = (MOCK_MESSAGES[sessionId] || []).slice();
      ui.msgLoaded = true;
      renderDetail();
      return;
    }
    ui.msgSub = subscribeChatMessages(
      sessionId,
      (msgs) => { if (ui.activeId === sessionId) { ui.messages = msgs; ui.msgLoaded = true; renderDetail(); } },
      () => { if (ui.activeId === sessionId) { ui.msgLoaded = true; toast('No se pudieron cargar los mensajes.', 'error'); renderDetail(); } },
    );
  }

  function activeChat() {
    return ui.chats.find((c) => c._docId === ui.activeId) || null;
  }

  function bubble(m) {
    if (m.from === 'system') {
      return el('div', { class: 'hub-msg hub-msg--system' }, [
        el('div', { class: 'hub-msg__sys', text: m.text || '' }),
        el('div', { class: 'hub-msg__time u-caption u-faint', text: timeAgo(m.timestamp) }),
      ]);
    }
    const side = m.from === 'asesor' ? 'out' : 'in';
    const kind = m.from === 'user' ? 'user' : m.from === 'asesor' ? 'asesor' : 'bot';
    return el('div', { class: `hub-msg hub-msg--${side} hub-msg--${kind}` }, [
      el('div', { class: 'hub-msg__bubble' }, [
        kind === 'bot' ? el('span', { class: 'hub-msg__who u-caption', text: '🤖 Bot' }) : null,
        el('span', { class: 'hub-msg__text', text: m.text || '' }),
      ]),
      el('div', { class: 'hub-msg__time u-caption u-faint', text: timeAgo(m.timestamp) }),
    ]);
  }

  function renderDetail() {
    clear(detailEl);
    const chat = activeChat();
    if (!chat) {
      detailEl.append(stateNode('💬', 'Selecciona una conversación', 'Elige un chat de la lista para ver el historial. (Responder, tomar y transferir llegan en los próximos incrementos.)'));
      return;
    }

    const name = chat.userNombre || chat.userEmail || ('Cliente ' + chat._docId.slice(-6));
    const currentUid = store.get().user ? store.get().user.uid : null;
    const isClosed = chat.status === 'closed';
    const claimedByOther = !!(chat.claimedBy && chat.claimedBy !== currentUid);
    const att = ui.attending[chat._docId];

    // Header: back (mobile) + cliente + meta
    const back = el('button', { class: 'hub__back icon-btn', type: 'button', 'aria-label': 'Volver a la lista' }, [el('span', { 'aria-hidden': 'true', text: '←' })]);
    back.addEventListener('click', () => { wrap.setAttribute('data-pane', 'list'); });

    const metaBits = [el('span', { class: 'hub__detail-mode', text: MODE_LABEL[chat.mode] || MODE_LABEL.bot })];
    if (chat.userEmail) metaBits.push(el('span', { class: 'u-faint', text: '· ' + chat.userEmail }));
    if (chat.telefono) metaBits.push(el('span', { class: 'u-faint', text: '· ' + chat.telefono }));
    if (chat.sourceVehicleId) metaBits.push(el('span', { class: 'u-faint', text: '· vehículo #' + chat.sourceVehicleId }));

    const head = el('div', { class: 'hub__detail-head' }, [
      back,
      el('div', { class: 'hub__detail-id' }, [
        el('div', { class: 'hub__detail-name' }, [
          el('span', { text: name }),
          chat.radicado ? el('span', { class: 'badge badge--gold', text: chat.radicado }) : null,
        ]),
        el('div', { class: 'hub__detail-meta u-caption u-row u-row--tight' }, metaBits),
      ]),
    ]);
    detailEl.append(head);

    // Banners (read-only)
    if (isClosed) {
      const reason = CLOSED_REASON[chat.closedReason] || 'Conversación finalizada';
      const by = chat.closedByName || (chat.closedByRole === 'client' ? 'el cliente' : 'un asesor');
      detailEl.append(banner('🔒', reason, 'Por ' + by + (chat.closedAt ? ' · ' + timeAgo(chat.closedAt) : ''), 'closed'));
    }
    if (claimedByOther) {
      detailEl.append(banner('🔒', (chat.claimedByName || 'Otro asesor') + ' está atendiendo este chat', chat.claimedAt ? 'Tomado ' + timeAgo(chat.claimedAt) : 'Solo quien lo tomó puede responder.', 'claimed'));
    }
    if (att) {
      detailEl.append(banner('👀', att.nombre + ' está mirando este chat ahora mismo', 'Presencia en tiempo real.', 'attending'));
    }

    // Mensajes
    const msgsBox = el('div', { class: 'hub__msgs' });
    if (!ui.msgLoaded) {
      msgsBox.append(loadingNode());
    } else if (!ui.messages.length) {
      msgsBox.append(el('div', { class: 'hub__msgs-empty u-caption u-faint', text: 'Sin mensajes en esta conversación.' }));
    } else {
      ui.messages.forEach((m) => msgsBox.append(bubble(m)));
    }
    detailEl.append(msgsBox);

    // Footer read-only (3a): la caja de respuesta llega en 3b.
    detailEl.append(el('div', { class: 'hub__ro-note u-caption u-faint' }, [
      el('span', { 'aria-hidden': 'true', text: '👁 ' }),
      el('span', { text: 'Vista de solo lectura — responder, tomar y transferir llegan en los próximos incrementos.' }),
    ]));

    // Auto-scroll al final de los mensajes.
    requestAnimationFrame(() => { msgsBox.scrollTop = msgsBox.scrollHeight; });
  }

  /* ── Helpers de nodos ───────────────────────────────────── */
  function banner(icon, title, sub, variant) {
    return el('div', { class: 'hub__banner hub__banner--' + variant }, [
      el('span', { class: 'hub__banner-icon', 'aria-hidden': 'true', text: icon }),
      el('div', { class: 'hub__banner-info' }, [
        el('div', { class: 'hub__banner-title', text: title }),
        sub ? el('div', { class: 'hub__banner-sub u-caption u-faint', text: sub }) : null,
      ]),
    ]);
  }
  function stateNode(icon, title, msg) {
    return el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', 'aria-hidden': 'true', text: icon }),
      el('div', { class: 'state__title', text: title }),
      el('div', { class: 'state__msg', text: msg }),
    ]);
  }
  function loadingNode() {
    return el('div', { class: 'state' }, [el('div', { class: 'state__msg', text: 'Cargando…' })]);
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
      (list) => {
        ui.chats = list; ui.loaded = true; renderList();
        if (ui.activeId) renderDetail(); // refresca header/banners del chat activo
      },
      (e) => { ui.loaded = true; toast(e && e.code === 'permission-denied' ? 'Sin permiso para ver el Hub.' : 'No se pudo cargar el Hub.', 'error'); renderList(); },
    );
    ui.presenceSub = subscribeAttendingPresence(
      (map) => { ui.attending = map; renderList(); if (ui.activeId) renderDetail(); },
      () => {}, // presence es best-effort: si falla, el visor sigue sin el indicador
    );
  }

  return function cleanup() {
    if (ui.chatsSub) ui.chatsSub();
    if (ui.msgSub) ui.msgSub();
    if (ui.presenceSub) ui.presenceSub();
    ui.chatsSub = ui.msgSub = ui.presenceSub = null;
  };
}
