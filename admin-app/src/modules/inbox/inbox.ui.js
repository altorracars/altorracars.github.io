// ============================================================
// Bandeja Inteligente — controlador + render (capa UI).
// Triage-first: colas por urgencia, tarjeta de un vistazo, acciones de 1 clic.
// Realtime acotado + unsubscribe disciplinado. Optimistic UI + toasts.
// ============================================================

import { el, clear } from '../../core/dom.js';
import { openMenu } from '../../core/popover.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { initials, timeAgo, waLink, humanizeDuration } from '../../domain/format.js';
import { RATING_META } from '../../domain/scoring.js';
import { LEAD_STATUSES, statusMeta } from '../../domain/classify.js';
import {
  enrichAll, enrich, QUEUES, queueCounts, buildView,
} from './inbox.domain.js';
import {
  subscribeLeads, loadMoreLeads, fetchTeam, assignLead, setLeadStatus, logActivity,
} from './inbox.data.js';
import { createDealFromLead } from '../deals/deals.data.js';
import { dealFromLead } from '../../domain/pipeline.js';
import { getMockLeads, getMockTeam, addMockDeal } from '../../core/mock.js';

const ICONS = {
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.91zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',
  person: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
  expand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  convert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M13 9l3 3-3 3"/></svg>',
};

export function mountInbox(root) {
  const ui = {
    queue: 'todo',
    filters: { type: '', channel: '', status: '' },
    search: '',
    leads: [],
    loading: true,
    error: null,
    hasMore: false,
    cursor: null,
    sub: null,
  };

  const canEdit = hasPermission('crm.edit');
  const uid = store.get().user && store.get().user.uid;

  // ── Estructura base ──
  const elQueues = el('div', { class: 'inbox__queues', role: 'tablist', 'aria-label': 'Colas' });
  const elSearch = el('label', { class: 'search', 'aria-label': 'Buscar' }, [
    el('span', { html: ICONS.search, 'aria-hidden': 'true' }),
    el('input', { type: 'search', placeholder: 'Buscar nombre, correo, teléfono…', autocomplete: 'off' }),
  ]);
  const elFilters = el('div', { class: 'inbox__filters' });
  const elToolbar = el('div', { class: 'inbox__toolbar' }, [elSearch, elFilters]);
  const elList = el('div', { class: 'inbox__list', role: 'list', tabindex: '-1' });
  const section = el('section', { class: 'inbox' }, [elQueues, elToolbar, elList]);
  clear(root);
  root.append(section);

  // Búsqueda
  const searchInput = elSearch.querySelector('input');
  searchInput.addEventListener('input', () => { ui.search = searchInput.value; renderList(); });

  // ── Acciones de datos (real vs mock) ──
  async function doAssign(lead, owner) {
    patchLead(lead.id, { ownerId: owner ? owner.uid : null, ownerName: owner ? owner.nombre : null });
    if (store.get().mock) { toast(owner ? `Asignado a ${owner.nombre}` : 'Sin asignar', 'ok'); return; }
    try {
      await assignLead(lead.id, owner);
      toast(owner ? `Asignado a ${owner.nombre}` : 'Sin asignar', 'ok');
    } catch (e) { toast('No se pudo asignar', 'error'); }
  }

  async function doStatus(lead, status) {
    patchLead(lead.id, { status, lastActivityAt: new Date().toISOString() });
    if (store.get().mock) { toast(`Estado → ${statusMeta(status).label}`, 'ok'); return; }
    try {
      await setLeadStatus(lead.id, status, lead);
      toast(`Estado → ${statusMeta(status).label}`, 'ok');
    } catch (e) { toast('No se pudo cambiar el estado', 'error'); }
  }

  function doWhatsapp(lead) {
    const url = waLink(lead.phone, whatsappTemplate(lead));
    if (!url) { toast('Este lead no tiene teléfono', 'error'); return; }
    window.open(url, '_blank', 'noopener');
    if (!store.get().mock && canEdit) {
      logActivity(lead.id, { type: 'whatsapp', subject: 'WhatsApp enviado', direction: 'outbound', name: lead.fullName }).catch(() => {});
    }
  }

  async function doConvert(lead) {
    if (lead.status === 'convertido') { toast('Ya es una oportunidad', 'info'); return; }
    patchLead(lead.id, { status: 'convertido' });
    if (store.get().mock) { addMockDeal(dealFromLead(lead)); toast('🎯 Convertido a oportunidad', 'ok'); return; }
    try { await createDealFromLead(lead); toast('🎯 Convertido a oportunidad', 'ok'); }
    catch (e) { toast('No se pudo convertir', 'error'); }
  }

  // El panel 360 (módulo aparte) lee los leads enriquecidos desde el store.
  function syncLeads() { store.set({ leads: ui.leads }); }

  // ── Mutación local optimista ──
  function patchLead(id, patch) {
    const i = ui.leads.findIndex((l) => l.id === id);
    if (i === -1) return;
    ui.leads[i] = enrich({ ...ui.leads[i], ...patch });
    syncLeads();
    render();
  }

  // ── Render ──
  function render() { renderQueues(); renderFilters(); renderList(); }

  function renderQueues() {
    const counts = queueCounts(ui.leads, uid);
    clear(elQueues);
    QUEUES.forEach((q) => {
      const active = ui.queue === q.id;
      const chip = el('button', {
        class: 'chip' + (active ? ' chip--active' : ''),
        role: 'tab', 'aria-selected': String(active), type: 'button',
      }, [
        el('span', { 'aria-hidden': 'true', text: q.icon }),
        el('span', { text: q.label }),
        el('span', { class: 'chip__count', text: String(counts[q.id] || 0) }),
      ]);
      chip.addEventListener('click', () => { ui.queue = q.id; render(); });
      elQueues.append(chip);
    });
  }

  function renderFilters() {
    clear(elFilters);
    const defs = [
      { key: 'type', label: 'Tipo', items: [['', 'Todos'], ['lead', 'Lead'], ['cita', 'Cita'], ['solicitud', 'Solicitud'], ['pqr', 'PQR']] },
      { key: 'channel', label: 'Canal', items: [['', 'Todos'], ['web', 'Web'], ['whatsapp', 'WhatsApp'], ['bot', 'ALTOR Bot'], ['cuenta', 'Cuenta'], ['newsletter', 'Newsletter'], ['cita', 'Cita web']] },
      { key: 'status', label: 'Estado', items: [['', 'Todos'], ...LEAD_STATUSES.map((s) => [s.id, s.label])] },
    ];
    defs.forEach((d) => {
      const current = ui.filters[d.key];
      const label = current ? (d.items.find((it) => it[0] === current) || [, d.label])[1] : d.label;
      const btn = el('button', {
        class: 'chip' + (current ? ' chip--active' : ''), type: 'button', 'aria-haspopup': 'menu',
      }, [el('span', { text: label }), el('span', { 'aria-hidden': 'true', text: '▾' })]);
      btn.addEventListener('click', () => {
        openMenu(btn, d.items.map(([val, lab]) => ({ value: val, label: lab, active: val === current })),
          (it) => { ui.filters[d.key] = it.value; render(); }, { title: d.label });
      });
      elFilters.append(btn);
    });
    // Limpiar filtros
    if (ui.filters.type || ui.filters.channel || ui.filters.status) {
      const clr = el('button', { class: 'chip', type: 'button' }, ['✕ Limpiar']);
      clr.addEventListener('click', () => { ui.filters = { type: '', channel: '', status: '' }; render(); });
      elFilters.append(clr);
    }
  }

  function renderList() {
    if (ui.loading) return renderSkeletons();
    if (ui.error) return renderState('⚠️', 'No se pudo cargar', ui.error, true);

    const rows = buildView(ui.leads, { queue: ui.queue, uid, filters: ui.filters, search: ui.search });
    clear(elList);

    if (!rows.length) {
      const empty = ui.search || ui.filters.type || ui.filters.channel || ui.filters.status;
      elList.append(stateNode('🗂️', empty ? 'Sin resultados' : '¡Bandeja al día!',
        empty ? 'Ajusta la búsqueda o los filtros.' : 'No hay clientes en esta cola.'));
      return;
    }

    const head = el('div', { class: 'inbox__listhead' }, [
      el('span', { class: 'u-muted u-caption', text: `${rows.length} ${rows.length === 1 ? 'cliente' : 'clientes'}` }),
      el('span', { class: 'u-faint u-caption', text: 'Ordenado por urgencia' }),
    ]);
    elList.append(head);

    rows.forEach((lead) => elList.append(renderCard(lead)));

    if (ui.hasMore && ui.queue === 'todo' && !ui.search) {
      const more = el('button', { class: 'btn btn--soft btn--block', type: 'button' }, ['Cargar más']);
      more.addEventListener('click', () => loadMore(more));
      elList.append(el('div', { class: 'inbox__more' }, [more]));
    }
  }

  function renderCard(lead) {
    const rm = RATING_META[lead._rating];
    const sm = statusMeta(lead.status);
    const sla = lead._sla;
    const slaCls = `sla-dot sla-dot--${sla.state}`;
    const slaLabel = sla.closed ? 'Cerrado'
      : sla.state === 'late' ? `SLA vencido hace ${humanizeDuration(sla.remainingMs)}`
      : `Responder en ${humanizeDuration(sla.remainingMs)}`;

    const what = [lead._type.icon + ' ' + lead._type.label, lead.sourceDetail, lead.vehicleOfInterestId ? '🚗 ' + lead.vehicleOfInterestId : '']
      .filter(Boolean).join(' · ');

    const card = el('article', {
      class: 'lead-card', role: 'listitem', tabindex: '0', 'data-id': lead.id,
      'aria-label': `${lead.fullName}, ${rm.label}`,
    }, [
      el('span', { class: slaCls, title: slaLabel, 'aria-label': slaLabel }),
      el('span', { class: 'avatar avatar--sm', 'aria-hidden': 'true', text: initials(lead.fullName) }),
      el('div', { class: 'lead-card__main u-grow' }, [
        el('div', { class: 'lead-card__top' }, [
          el('span', { class: 'lead-card__name u-truncate', text: lead.fullName }),
          el('span', { class: `temp ${rm.cls}`, title: `Score ${lead._score}/100` }, [`${rm.icon} ${lead._score}`]),
        ]),
        el('div', { class: 'lead-card__what u-truncate u-muted', text: what }),
        el('div', { class: 'lead-card__meta u-caption' }, [
          el('span', { class: 'lead-card__chan', text: `${lead._channel.icon} ${lead._channel.label}` }),
          el('span', { class: 'lead-card__dot', text: '·' }),
          el('span', { text: timeAgo(lead.createdAt) }),
          el('span', { class: 'lead-card__dot', text: '·' }),
          el('span', { class: `badge badge--${sm.badge || ''}`.trim(), text: sm.label }),
          lead.ownerName ? el('span', { class: 'lead-card__dot', text: '·' }) : null,
          lead.ownerName ? el('span', { class: 'u-faint', text: '👤 ' + lead.ownerName }) : null,
        ]),
        el('div', { class: 'lead-card__nba' }, [
          el('span', { 'aria-hidden': 'true', text: lead._nba.icon }),
          el('span', { class: 'u-muted', text: 'Próx: ' }),
          el('strong', { text: lead._nba.label }),
        ]),
      ]),
      el('div', { class: 'lead-card__actions' }, [
        actionBtn('wa', ICONS.wa, 'WhatsApp', 'btn--wa'),
        canEdit ? actionBtn('assign', ICONS.person, 'Asignar') : null,
        canEdit ? actionBtn('status', ICONS.flag, 'Cambiar estado') : null,
        canEdit ? actionBtn('convert', ICONS.convert, 'Convertir a oportunidad') : null,
        actionBtn('open', ICONS.expand, 'Abrir 360'),
      ]),
    ]);

    card.addEventListener('click', (e) => {
      const act = e.target.closest('[data-action]');
      if (act) { handleAction(act.dataset.action, lead, act); return; }
      openDetail(lead.id);
    });
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') { openDetail(lead.id); }
      else if (e.key.toLowerCase() === 'w') { doWhatsapp(lead); }
    });
    return card;
  }

  function actionBtn(action, icon, label, extra = '') {
    return el('button', {
      class: `icon-btn ${extra}`.trim(), type: 'button', 'data-action': action,
      title: label, 'aria-label': label,
    }, [el('span', { html: icon, 'aria-hidden': 'true' })]);
  }

  function handleAction(action, lead, anchor) {
    if (action === 'open') return openDetail(lead.id);
    if (action === 'wa') return doWhatsapp(lead);
    if (action === 'convert') return doConvert(lead);
    if (action === 'assign') {
      const team = store.get().team || [];
      const items = [{ value: null, label: 'Sin asignar', icon: '⊘', active: !lead.ownerId },
        ...team.map((m) => ({ value: m, label: m.nombre, hint: m.cargo, icon: '👤', active: lead.ownerId === m.uid }))];
      return openMenu(anchor, items, (it) => doAssign(lead, it.value), { title: 'Asignar a' });
    }
    if (action === 'status') {
      const items = LEAD_STATUSES.map((s) => ({ value: s.id, label: s.label, active: (lead.status || 'nuevo') === s.id }));
      return openMenu(anchor, items, (it) => doStatus(lead, it.value), { title: 'Cambiar estado' });
    }
  }

  function openDetail(id) { store.set({ detailLeadId: id }); }

  // ── Estados ──
  function stateNode(icon, title, msg) {
    return el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', 'aria-hidden': 'true', text: icon }),
      el('div', { class: 'state__title', text: title }),
      el('div', { class: 'state__msg', text: msg }),
    ]);
  }
  function renderState(icon, title, msg) { clear(elList); elList.append(stateNode(icon, title, msg)); }
  function renderSkeletons() {
    clear(elList);
    for (let i = 0; i < 6; i++) {
      elList.append(el('div', { class: 'lead-card lead-card--skeleton' }, [
        el('span', { class: 'skeleton', style: { width: '30px', height: '30px', borderRadius: '50%' } }),
        el('div', { class: 'u-grow u-stack', style: { gap: '8px' } }, [
          el('span', { class: 'skeleton', style: { width: '46%', height: '14px' } }),
          el('span', { class: 'skeleton', style: { width: '70%', height: '12px' } }),
        ]),
      ]));
    }
  }

  // ── Carga de datos ──
  async function loadMore(btn) {
    if (!ui.cursor) return;
    btn.disabled = true; btn.textContent = 'Cargando…';
    try {
      const { rows, lastDoc, hasMore } = await loadMoreLeads({ after: ui.cursor });
      const enriched = enrichAll(rows);
      const existing = new Set(ui.leads.map((l) => l.id));
      ui.leads.push(...enriched.filter((l) => !existing.has(l.id)));
      ui.cursor = lastDoc; ui.hasMore = hasMore;
      syncLeads();
      render();
    } catch (e) { toast('No se pudo cargar más', 'error'); btn.disabled = false; btn.textContent = 'Cargar más'; }
  }

  function start() {
    if (store.get().mock) {
      store.set({ team: getMockTeam() });
      ui.leads = enrichAll(getMockLeads());
      ui.loading = false; ui.hasMore = false;
      syncLeads();
      render();
      return;
    }
    fetchTeam().catch(() => {});
    ui.sub = subscribeLeads({
      pageSize: 40,
      onData: (rows, meta) => {
        ui.leads = enrichAll(rows);
        ui.cursor = ui.sub ? ui.sub.getLastDoc() : null;
        ui.hasMore = meta.hasMore;
        ui.loading = false; ui.error = null;
        syncLeads();
        render();
      },
      onError: (err) => {
        console.error('[inbox] error de suscripción:', err);
        ui.loading = false;
        ui.error = err && err.code === 'permission-denied'
          ? 'Tu cuenta no tiene permiso para ver el CRM.'
          : 'Revisa tu conexión e inténtalo de nuevo.';
        render();
      },
    });
  }

  render();
  start();

  return function cleanup() {
    if (ui.sub && ui.sub.unsubscribe) ui.sub.unsubscribe();
    ui.sub = null;
  };
}

function whatsappTemplate(lead) {
  const first = String(lead.fullName || '').trim().split(/\s+/)[0] || '';
  const veh = lead.vehicleOfInterestId ? ` por el vehículo ${lead.vehicleOfInterestId}` : '';
  return `Hola ${first}, te saluda Altorra Cars 👋. Vimos tu interés${veh}. ¿En qué te podemos ayudar?`;
}
