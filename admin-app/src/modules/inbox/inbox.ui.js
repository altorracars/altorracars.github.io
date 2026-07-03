// ============================================================
// Bandeja Inteligente — controlador + render (capa UI).
// Triage-first: colas por urgencia, tarjeta de un vistazo, acciones de 1 clic.
// Realtime acotado + unsubscribe disciplinado. Optimistic UI + toasts.
// ============================================================

import { el, clear } from '../../core/dom.js';
import { icon, iconEl, uIco } from '../../core/icons.js';
import { confirmDialog } from '../../core/confirm.js';
import { openMenu } from '../../core/popover.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { friendlyError } from '../../core/errors.js';
import { initials, timeAgo, waLink, humanizeDuration } from '../../domain/format.js';
import { RATING_META } from '../../domain/scoring.js';
import { LEAD_STATUSES, DISCARD_REASONS, statusMeta } from '../../domain/classify.js';
import {
  enrichAll, enrich, QUEUES, queueCounts, buildView, contactTimer,
} from './inbox.domain.js';
import {
  subscribeLeads, loadMoreLeads, fetchTeam, assignLead, setLeadStatus, logActivity,
  scheduleTask, fetchPendingTasks, completeTask, archiveLead, purgeLead,
} from './inbox.data.js';
import { openNewLeadForm } from '../capture/new-lead.js';
import { openQuickLeadForm } from '../capture/quick-lead.js';
import { openConvertDialog } from '../capture/convert-dialog.js';
import { frictionTrack } from '../../core/friction.js';
import { getMockLeads, getMockTeam } from '../../core/mock.js';

const ICONS = {
  wa: '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.82 11.82 0 018.413 3.488 11.82 11.82 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.477-.91zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>',
  person: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>',
  flag: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" y1="22" x2="4" y2="15"/></svg>',
  expand: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>',
  search: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>',
  convert: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M9 12h6M13 9l3 3-3 3"/></svg>',
  call: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>',
  more: '<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="2"/><circle cx="12" cy="12" r="2"/><circle cx="19" cy="12" r="2"/></svg>',
  check: '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>',
};

// P2.b (§178): presets de PRÓXIMO PASO — un prompt, un tap.
function nextStepPresets() {
  const at = (days, hour) => {
    const d = new Date();
    d.setDate(d.getDate() + days);
    if (hour != null) d.setHours(hour, 0, 0, 0);
    return d.toISOString();
  };
  const in2h = new Date(Date.now() + 2 * 3600 * 1000).toISOString();
  return [
    { value: { subject: 'Llamar al cliente', dueAt: at(1, 9) }, label: 'Llamar mañana 9 am', iconId: 'phone' },
    { value: { subject: 'Escribir por WhatsApp', dueAt: in2h }, label: 'WhatsApp en 2 horas', iconId: 'whatsapp' },
    { value: { subject: 'Hacer seguimiento', dueAt: at(3, 9) }, label: 'Seguimiento en 3 días', iconId: 'repeat' },
    { value: 'abrir360', label: 'Agendar cita (abrir 360)', iconId: 'calendar' },
    { value: null, label: 'Sin próximo paso', iconId: 'ban' },
  ];
}

export function mountInbox(root) {
  const ui = {
    queue: 'todo',
    filters: { type: '', channel: '', status: '' },
    search: '',
    showClosed: false, // F4-fase1: la vista default oculta cerrados (con contador)
    selected: new Set(), // F1: selección múltiple para acciones masivas (id-based → sobrevive snapshots)
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
  // F36 §178: el camino RÁPIDO es el primario (WhatsApp/walk-in en <30s);
  // el form completo queda como secundario (canales con campaña/vehículo).
  const elQuickBtn = canEdit ? el('button', { class: 'btn btn--gold btn--sm', type: 'button', style: { marginLeft: 'auto' }, html: icon('zap') + ' Lead rápido' }) : null;
  if (elQuickBtn) elQuickBtn.addEventListener('click', () => openQuickLeadForm());
  const elNewBtn = canEdit ? el('button', { class: 'btn btn--soft btn--sm', type: 'button', html: icon('plus') + ' Completo' }) : null;
  if (elNewBtn) elNewBtn.addEventListener('click', () => openNewLeadForm());
  // P2 §178: Pendientes hoy + vencidos.
  const elPendBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', html: icon('clipboardList') + ' Pendientes hoy' });
  elPendBtn.addEventListener('click', () => togglePendientes());
  const elPendPanel = el('div', { class: 'inbox__pendientes', hidden: true });
  const elToolbar = el('div', { class: 'inbox__toolbar' }, [elSearch, elFilters, elQuickBtn, elNewBtn, elPendBtn]);
  // F1: barra de acciones masivas (visible solo con selección).
  const elBulkBar = el('div', { class: 'inbox__bulkbar', role: 'toolbar', 'aria-label': 'Acciones en lote', hidden: true });
  const elList = el('div', { class: 'inbox__list', role: 'list', tabindex: '-1' });
  // F6 (§176): la UI enseña el rol de cada superficie — Bandeja = TRIAGE.
  const elHint = el('p', { class: 'u-muted u-caption', style: { margin: '0' } }, [
    'Aquí llegan los interesados: contacta y califica. Las ventas activas viven en el Pipeline.',
  ]);
  const section = el('section', { class: 'inbox' }, [elHint, elQueues, elToolbar, elBulkBar, elPendPanel, elList]);
  clear(root);
  root.append(section);

  // Búsqueda
  const searchInput = elSearch.querySelector('input');
  searchInput.addEventListener('input', () => { ui.search = searchInput.value; renderList(); });

  // ── Acciones de datos (real vs mock) ──
  async function doAssign(lead, owner) {
    const prevOwnerId = lead.ownerId || null;       // §3.6 rollback: dueño previo
    const prevOwnerName = lead.ownerName || null;
    patchLead(lead.id, { ownerId: owner ? owner.uid : null, ownerName: owner ? owner.nombre : null });
    if (store.get().mock) { toast(owner ? `Asignado a ${owner.nombre}` : 'Sin asignar', 'ok'); return; }
    try {
      await assignLead(lead.id, owner);
      toast(owner ? `Asignado a ${owner.nombre}` : 'Sin asignar', 'ok');
    } catch (e) {
      patchLead(lead.id, { ownerId: prevOwnerId, ownerName: prevOwnerName }); // rollback (la UI no miente)
      toast('No se pudo asignar', 'error');
    }
  }

  async function doStatus(lead, status, extra = {}) {
    const prevStatus = lead.status;                 // §3.6 rollback: estado previo
    patchLead(lead.id, { status, ...extra, lastActivityAt: new Date().toISOString() });
    if (store.get().mock) { toast(`Estado → ${statusMeta(status).label}`, 'ok'); return; }
    try {
      await setLeadStatus(lead.id, status, lead, extra);
      toast(`Estado → ${statusMeta(status).label}`, 'ok');
    } catch (e) {
      patchLead(lead.id, { status: prevStatus });   // rollback (incl. guard de lead convertido)
      toast('No se pudo cambiar el estado', 'error');
    }
  }

  function doWhatsapp(lead, anchor) {
    const url = waLink(lead.phone, whatsappTemplate(lead));
    if (!url) { toast('Este lead no tiene teléfono', 'error'); return; }
    window.open(url, '_blank', 'noopener');
    if (!store.get().mock && canEdit) {
      logActivity(lead.id, { type: 'whatsapp', subject: 'WhatsApp enviado', direction: 'outbound', name: lead.fullName }).catch(() => {});
    }
    promptNextStep(lead, anchor); // P2.b: cada toque al cliente deja próximo paso
  }

  // P2 §178 — quick-log de LLAMADA (un tap) + próximo paso.
  function doCall(lead, anchor) {
    if (!store.get().mock && canEdit) {
      logActivity(lead.id, { type: 'llamada', subject: 'Llamada registrada', direction: 'outbound', name: lead.fullName }).catch(() => {});
    }
    toast('📞 Llamada registrada', 'ok');
    promptNextStep(lead, anchor);
  }

  // P2.b §178 — UN prompt con presets de un tap. Mantiene "Pendientes hoy"
  // lleno y mata el contactado-y-olvidado.
  function promptNextStep(lead, anchor) {
    if (!canEdit) return;
    const t0 = performance.now(); // F33a: medir si el prompt estorba
    openMenu(anchor || document.body, nextStepPresets(), (it) => {
      frictionTrack('proximo_paso', t0, { preset: it.label });
      if (!it.value) return;
      if (it.value === 'abrir360') { openDetail(lead.id); return; }
      if (store.get().mock) { toast('Próximo paso anotado (mock)', 'ok'); return; }
      scheduleTask(lead.id, { subject: it.value.subject, dueAt: it.value.dueAt, name: lead.fullName })
        .then(() => toast('✓ Próximo paso: ' + it.label, 'ok'))
        .catch(() => toast('No se pudo guardar el próximo paso', 'error'));
    }, { title: '¿Próximo paso con ' + (lead.fullName || 'el cliente').split(/\s+/)[0] + '?' });
  }

  // P2 §178 — panel "Pendientes hoy + vencidos".
  let pendOpen = false;
  async function togglePendientes() {
    pendOpen = !pendOpen;
    elPendPanel.hidden = !pendOpen;
    if (pendOpen) await renderPendientes();
  }
  async function renderPendientes() {
    clear(elPendPanel);
    if (store.get().mock) {
      elPendPanel.append(el('div', { class: 'u-muted u-caption', style: { padding: '10px' }, text: 'Pendientes no disponible en modo demo.' }));
      return;
    }
    elPendPanel.append(el('div', { class: 'u-muted u-caption', style: { padding: '10px' }, text: 'Cargando pendientes…' }));
    let tasks = [];
    try { tasks = await fetchPendingTasks(); }
    catch (e) { clear(elPendPanel); elPendPanel.append(el('div', { class: 'u-muted u-caption', style: { padding: '10px' }, text: 'No se pudieron cargar los pendientes.' })); return; }
    clear(elPendPanel);
    elPendPanel.append(el('div', { class: 'inbox__listhead' }, [
      el('span', { class: 'u-muted u-caption u-ico-text' }, [iconEl('clipboardList'), `${tasks.length} pendiente${tasks.length === 1 ? '' : 's'} (hoy y vencidos)`]),
    ]));
    if (!tasks.length) {
      elPendPanel.append(el('div', { class: 'u-muted u-caption', style: { padding: '0 10px 10px' }, text: '¡Al día! Registra llamadas/WhatsApps y elige “próximo paso” para que aparezcan aquí.' }));
      return;
    }
    const now = Date.now();
    tasks.forEach((t) => {
      const late = new Date(t.dueAt).getTime() < now;
      const doneBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', title: 'Marcar hecho', html: icon('check') + ' Hecho' });
      const openBtn = el('button', { class: 'btn btn--ghost btn--sm', type: 'button' }, ['Abrir 360']);
      const row = el('div', { class: 'lead-card', style: { alignItems: 'center' } }, [
        el('span', { class: `badge badge--${late ? 'danger' : 'gold'}`, text: late ? 'VENCIDO' : 'HOY' }),
        el('div', { class: 'u-grow' }, [
          el('div', { class: 'lead-card__name u-ico-text' }, [
            t.type === 'cita' ? el('span', { class: 'u-ico', 'aria-hidden': 'true', html: icon('calendar') }) : null,
            t.subject,
          ]),
          el('div', { class: 'u-caption u-muted', text: `${t.relatedTo && t.relatedTo.name ? t.relatedTo.name + ' · ' : ''}${timeAgo(t.dueAt)}` }),
        ]),
        el('div', { class: 'u-row u-row--tight' }, [openBtn, canEdit ? doneBtn : null]),
      ]);
      openBtn.addEventListener('click', () => { if (t.relatedTo && t.relatedTo.id) openDetail(t.relatedTo.id); });
      doneBtn.addEventListener('click', async () => {
        doneBtn.disabled = true;
        try {
          await completeTask(t.id);
          toast('✓ Hecho', 'ok');
          await renderPendientes();
          // P2.b: cerrar una activity pregunta el siguiente paso.
          if (t.relatedTo && t.relatedTo.id) {
            promptNextStep({ id: t.relatedTo.id, fullName: t.relatedTo.name || '' }, elPendBtn);
          }
        } catch (e) { doneBtn.disabled = false; toast('No se pudo completar', 'error'); }
      });
      elPendPanel.append(row);
    });
  }

  // F7 §181: calificar y convertir son LA MISMA acción — diálogo canónico
  // (vehículo + valor estimado + owner, <45s) con Deshacer server-side.
  function doConvert(lead) {
    if (lead.status === 'convertido') { toast('Ya es un negocio: gestiónalo en el Pipeline', 'info'); return; }
    openConvertDialog(lead, {
      onDone: () => patchLead(lead.id, { status: 'convertido' }),
    });
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
  function render() { pruneSelection(); renderQueues(); renderFilters(); renderBulkBar(); renderList(); }

  function renderQueues() {
    const counts = queueCounts(ui.leads, uid);
    clear(elQueues);
    QUEUES.forEach((q) => {
      const active = ui.queue === q.id;
      const chip = el('button', {
        class: 'chip' + (active ? ' chip--active' : ''),
        role: 'tab', 'aria-selected': String(active), type: 'button',
      }, [
        el('span', { class: 'chip__ico', 'aria-hidden': 'true', html: icon(q.iconId) }),
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
      const clr = el('button', { class: 'chip', type: 'button', html: icon('x') + ' Limpiar' });
      clr.addEventListener('click', () => { ui.filters = { type: '', channel: '', status: '' }; render(); });
      elFilters.append(clr);
    }
  }

  function renderList() {
    if (ui.loading) return renderSkeletons();
    if (ui.error) return renderState(icon('alertTriangle'), 'No se pudo cargar', ui.error, true);

    const { rows, hiddenClosed } = buildView(ui.leads, {
      queue: ui.queue, uid, filters: ui.filters, search: ui.search, showClosed: ui.showClosed,
    });
    clear(elList);

    if (!rows.length && !hiddenClosed) {
      const empty = ui.search || ui.filters.type || ui.filters.channel || ui.filters.status;
      elList.append(stateNode(icon('folder'), empty ? 'Sin resultados' : '¡Bandeja al día!',
        empty ? 'Ajusta la búsqueda o los filtros.' : 'No hay clientes en esta cola.'));
      return;
    }

    // F4-fase1: contador de cerrados ocultos — visible, nunca silencioso.
    const hiddenBtn = hiddenClosed || ui.showClosed
      ? el('button', { class: 'chip', type: 'button', style: { marginLeft: 'auto' } },
          ui.showClosed ? [iconEl('x'), 'Ocultar cerrados'] : [`${hiddenClosed} ocultos · ver todos`])
      : null;
    if (hiddenBtn) hiddenBtn.addEventListener('click', () => { ui.showClosed = !ui.showClosed; renderList(); });

    const head = el('div', { class: 'inbox__listhead' }, [
      el('span', { class: 'u-muted u-caption', text: `${rows.length} ${rows.length === 1 ? 'cliente' : 'clientes'} activos` }),
      el('span', { class: 'u-faint u-caption', text: 'Ordenado por urgencia' }),
      hiddenBtn,
    ]);
    elList.append(head);

    if (!rows.length && hiddenClosed) {
      elList.append(stateNode(icon('folder'), '¡Bandeja al día!',
        `No hay clientes activos en esta cola (${hiddenClosed} cerrados ocultos).`));
      return;
    }

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
    // F1/F4 §176: convertido = se gestiona en el Pipeline, no aquí.
    const isConverted = !!(lead.convertedTo && lead.convertedTo.dealId) || lead.status === 'convertido';
    // F4-fase1: SLA de primer contacto en la tarjeta (45/60 min).
    const ct = contactTimer(lead);
    const ctChip = ct && ct.state !== 'ok'
      ? el('span', {
          class: `badge badge--${ct.state === 'late' ? 'danger' : 'gold'}`,
          title: 'Tiempo sin primer contacto',
        }, [`⏱ ${ct.mins < 120 ? ct.mins + ' min' : humanizeDuration(ct.mins * 60000)} sin contacto`])
      : null;
    const sla = lead._sla;
    const slaCls = `sla-dot sla-dot--${sla.state}`;
    const slaLabel = sla.closed ? 'Cerrado'
      : sla.state === 'late' ? `SLA vencido hace ${humanizeDuration(sla.remainingMs)}`
      : `Responder en ${humanizeDuration(sla.remainingMs)}`;

    const what = [lead._type.label, lead.sourceDetail, lead.vehicleOfInterestId ? 'Interés: ' + lead.vehicleOfInterestId : '']
      .filter(Boolean).join(' · ');

    const isSel = ui.selected.has(lead.id);
    const card = el('article', {
      class: 'lead-card' + (canEdit ? ' lead-card--selectable' : '') + (isSel ? ' is-selected' : ''),
      role: 'listitem', tabindex: '0', 'data-id': lead.id,
      'aria-label': `${lead.fullName}, ${rm.label}`,
    }, [
      canEdit ? el('button', {
        class: 'lead-card__sel', type: 'button', 'data-action': 'select',
        role: 'checkbox', 'aria-checked': String(isSel), 'aria-label': 'Seleccionar lead',
        title: 'Seleccionar',
      }, [el('span', { 'aria-hidden': 'true', html: ICONS.check })]) : null,
      el('span', { class: slaCls, title: slaLabel, 'aria-label': slaLabel }),
      el('span', { class: 'avatar avatar--sm', 'aria-hidden': 'true', text: initials(lead.fullName) }),
      el('div', { class: 'lead-card__main u-grow' }, [
        el('div', { class: 'lead-card__top' }, [
          el('span', { class: 'lead-card__name u-truncate', text: lead.fullName }),
          el('span', { class: `temp ${rm.cls}`, title: `Score ${lead._score}/100` }, [uIco(rm.iconId), String(lead._score)]),
        ]),
        el('div', { class: 'lead-card__what u-muted u-ico-text' }, [uIco(lead._type.iconId), el('span', { class: 'u-truncate', text: what })]),
        el('div', { class: 'lead-card__meta u-caption' }, [
          el('span', { class: 'lead-card__chan u-ico-text' }, [uIco(lead._channel.iconId), lead._channel.label]),
          el('span', { class: 'lead-card__dot', text: '·' }),
          el('span', { text: timeAgo(lead.createdAt) }),
          el('span', { class: 'lead-card__dot', text: '·' }),
          isConverted
            ? el('button', {
                // F4-fase2 §181: chip con la ETAPA REAL del deal, denormalizada
                // por el trigger onDealUpdated — cero N+1 reads. El criterio de
                // cierre de E1b: la Bandeja ya no miente sobre el Pipeline.
                class: 'badge badge--ok', type: 'button', 'data-action': 'pipeline',
                title: 'Este lead ya es un negocio: gestiónalo en el Pipeline',
                style: { cursor: 'pointer', border: 'none' },
              }, [
                el('span', { class: 'u-ico', 'aria-hidden': 'true', html: icon(
                  lead.convertedTo && lead.convertedTo.outcome === 'perdido' ? 'x'
                    : lead.convertedTo && lead.convertedTo.outcome === 'vendido' ? 'crown' : 'target'
                ) }),
                lead.convertedTo && lead.convertedTo.outcome === 'perdido' ? ' Negocio perdido → Pipeline'
                  : lead.convertedTo && lead.convertedTo.outcome === 'vendido' ? ' VENDIDO'
                  : ` ${(lead.convertedTo && lead.convertedTo.stageName) || 'Convertido'} → Pipeline`,
              ])
            : el('span', { class: `badge badge--${sm.badge || ''}`.trim(), text: sm.label }),
          lead.archived ? el('span', { class: 'badge', html: icon('archive') + ' Archivado' }) : null,
          ctChip ? el('span', { class: 'lead-card__dot', text: '·' }) : null,
          ctChip,
          lead.ownerName ? el('span', { class: 'lead-card__dot', text: '·' }) : null,
          lead.ownerName ? el('span', { class: 'u-faint u-ico-text' }, [iconEl('user'), lead.ownerName]) : null,
        ]),
        el('div', { class: 'lead-card__nba' }, [
          uIco(lead._nba.iconId),
          el('span', { class: 'u-muted', text: 'Próx: ' }),
          el('strong', { text: lead._nba.label }),
        ]),
      ]),
      el('div', { class: 'lead-card__actions' }, [
        actionBtn('wa', ICONS.wa, 'WhatsApp', 'btn--wa'),
        canEdit ? actionBtn('call', ICONS.call, 'Registrar llamada') : null,
        canEdit ? actionBtn('assign', ICONS.person, 'Asignar') : null,
        // F1 §176: convertido = inmutable; estado y conversión desaparecen.
        canEdit && !isConverted ? actionBtn('status', ICONS.flag, 'Cambiar estado') : null,
        canEdit && !isConverted ? actionBtn('convert', ICONS.convert, 'Convertir a oportunidad') : null,
        canEdit ? actionBtn('more', ICONS.more, 'Más acciones') : null,
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

  // F6: cada estado se explica a sí mismo (tooltip en el menú). Vocabulario v3.
  const STATUS_HINTS = {
    nuevo: 'Acaba de entrar, nadie le ha hablado',
    contactado: 'Ya le escribiste o llamaste',
    descartado: 'No va: inalcanzable, no califica, spam… (pide la razón)',
  };

  function handleAction(action, lead, anchor) {
    if (action === 'select') return toggleSelect(lead, anchor);
    if (action === 'open') return openDetail(lead.id);
    if (action === 'wa') return doWhatsapp(lead, anchor);
    if (action === 'call') return doCall(lead, anchor);
    if (action === 'convert') return doConvert(lead);
    if (action === 'pipeline') { window.location.hash = '#/pipeline'; return; }
    if (action === 'assign') {
      const team = store.get().team || [];
      const items = [{ value: null, label: 'Sin asignar', iconId: 'ban', active: !lead.ownerId },
        ...team.map((m) => ({ value: m, label: m.nombre, hint: m.cargo, iconId: 'user', active: lead.ownerId === m.uid }))];
      return openMenu(anchor, items, (it) => doAssign(lead, it.value), { title: 'Asignar a' });
    }
    if (action === 'status') {
      // F1 §176: guard espejo (el botón ya no se pinta para convertidos).
      if (lead.convertedTo && lead.convertedTo.dealId) {
        toast('Este lead ya es un negocio: gestiónalo en el Pipeline.', 'info');
        return;
      }
      // 'convertido' NUNCA se pone a mano (solo vía Convertir → crea el deal).
      const items = LEAD_STATUSES.filter((s) => s.id !== 'convertido')
        .map((s) => ({ value: s.id, label: s.label, hint: STATUS_HINTS[s.id] || '', active: (lead.status || 'nuevo') === s.id }));
      return openMenu(anchor, items, (it) => {
        if (it.value === 'descartado') {
          // v3: descartar EXIGE razón (inalcanzable ≠ no_califica → F31).
          openMenu(anchor, DISCARD_REASONS.map((r) => ({ value: r.id, label: r.label })),
            (r) => doStatus(lead, 'descartado', { discardReason: r.value }),
            { title: '¿Por qué se descarta?' });
          return;
        }
        doStatus(lead, it.value);
      }, { title: 'Cambiar estado' });
    }
    if (action === 'more') {
      // F13/F15 §180: archivar (día a día, reversible) + eliminar (solo
      // super admin, solo prueba/spam — lo real se ARCHIVA, no se borra).
      const items = [
        lead.archived
          ? { value: 'unarchive', label: 'Restaurar de archivados', iconId: 'undo' }
          : { value: 'archive', label: 'Archivar', iconId: 'archive', hint: 'Sale de las vistas; reversible' },
        hasPermission('crm.delete')
          ? { value: 'purge', label: 'Eliminar definitivo', iconId: 'trash', hint: 'Solo pruebas/spam — borra TODO su rastro' }
          : null,
      ].filter(Boolean);
      return openMenu(anchor, items, async (it) => {
        if (it.value === 'archive' || it.value === 'unarchive') {
          const archived = it.value === 'archive';
          patchLead(lead.id, { archived });
          if (store.get().mock) { toast(archived ? 'Archivado' : 'Restaurado', 'ok'); return; }
          try { await archiveLead(lead.id, archived); toast(archived ? 'Archivado' : 'Restaurado', 'ok'); }
          catch (e) { patchLead(lead.id, { archived: !archived }); toast('No se pudo archivar', 'error'); }
          return;
        }
        if (it.value === 'purge') {
          if (!navigator.onLine) { toast('Eliminar definitivo necesita señal.', 'error'); return; }
          if (!await confirmDialog({
            title: '¿Eliminar DEFINITIVAMENTE a "' + lead.fullName + '"?',
            message: 'Borra el lead, sus actividades, negocios y su contacto si queda huérfano. SOLO para pruebas/spam — un cliente real se ARCHIVA. No se puede deshacer.',
            confirmText: 'Eliminar', danger: true, typedConfirm: 'ELIMINAR',
          })) return;
          if (store.get().mock) { toast('Eliminado (mock)', 'ok'); return; }
          try {
            const r = await purgeLead(lead.id);
            toast(`Eliminado: ${r.activities} actividades, ${r.deals} negocios${r.contactDeleted ? ', contacto' : ''}`, 'ok');
          } catch (e) {
            toast(e.message && e.message.includes('Super Admin') ? 'Solo el Super Admin puede eliminar.' : 'No se pudo eliminar: ' + friendlyError(e), 'error');
          }
        }
      }, { title: 'Más acciones' });
    }
  }

  function openDetail(id) { store.set({ detailLeadId: id }); }

  // ── F1: selección múltiple + acciones masivas ──
  // Toggle SIN re-render de la lista (preserva scroll): actualiza la tarjeta + la barra.
  function toggleSelect(lead, anchor) {
    if (ui.selected.has(lead.id)) ui.selected.delete(lead.id); else ui.selected.add(lead.id);
    const card = anchor && anchor.closest('.lead-card');
    if (card) {
      const on = ui.selected.has(lead.id);
      card.classList.toggle('is-selected', on);
      anchor.setAttribute('aria-checked', String(on));
    }
    renderBulkBar();
  }
  function pruneSelection() {
    if (!ui.selected.size) return;
    const ids = new Set(ui.leads.map((l) => l.id));
    for (const id of [...ui.selected]) if (!ids.has(id)) ui.selected.delete(id);
  }
  function clearSelection() { ui.selected.clear(); render(); }
  function selectedLeads() { return [...ui.selected].map((id) => ui.leads.find((l) => l.id === id)).filter(Boolean); }
  function bulkOptimistic(leads, patch) {
    leads.forEach((l) => { const i = ui.leads.findIndex((x) => x.id === l.id); if (i > -1) ui.leads[i] = enrich({ ...ui.leads[i], ...patch }); });
  }
  function bulkRollback(res, leads, prev) {
    let any = false;
    res.forEach((r, i) => {
      if (r.status === 'rejected') { const l = leads[i]; const idx = ui.leads.findIndex((x) => x.id === l.id); if (idx > -1) { ui.leads[idx] = enrich({ ...ui.leads[idx], ...prev.get(l.id) }); any = true; } }
    });
    if (any) { syncLeads(); render(); }
  }
  function bulkToast(res, total, what) {
    const failed = res.filter((r) => r.status === 'rejected').length;
    if (!failed) toast(`✓ ${total} ${what}`, 'ok');
    else toast(`${total - failed} ${what} · ${failed} fallaron`, failed === total ? 'error' : 'info');
  }
  async function bulkAssign(owner) {
    const leads = selectedLeads(); if (!leads.length) return;
    const prev = new Map(leads.map((l) => [l.id, { ownerId: l.ownerId || null, ownerName: l.ownerName || null }]));
    bulkOptimistic(leads, { ownerId: owner ? owner.uid : null, ownerName: owner ? owner.nombre : null });
    ui.selected.clear(); syncLeads(); render();
    const what = owner ? `asignado${leads.length === 1 ? '' : 's'} a ${owner.nombre}` : 'sin asignar';
    if (store.get().mock) { toast(`✓ ${leads.length} ${what}`, 'ok'); return; }
    const res = await Promise.allSettled(leads.map((l) => assignLead(l.id, owner)));
    bulkRollback(res, leads, prev); bulkToast(res, leads.length, what);
  }
  async function bulkSetStatus(status) {
    const all = selectedLeads();
    const leads = all.filter((l) => !(l.convertedTo && l.convertedTo.dealId) && l.status !== 'convertido');
    const skipped = all.length - leads.length;
    if (!leads.length) { toast('Esos leads ya son negocios: gestiónalos en el Pipeline', 'info'); return; }
    const prev = new Map(leads.map((l) => [l.id, { status: l.status }]));
    bulkOptimistic(leads, { status, lastActivityAt: new Date().toISOString() });
    ui.selected.clear(); syncLeads(); render();
    const what = `→ ${statusMeta(status).label}${skipped ? ` (${skipped} ya en Pipeline omitidos)` : ''}`;
    if (store.get().mock) { toast(`✓ ${leads.length} ${what}`, 'ok'); return; }
    const res = await Promise.allSettled(leads.map((l) => setLeadStatus(l.id, status, l)));
    bulkRollback(res, leads, prev); bulkToast(res, leads.length, what);
  }
  async function bulkArchive() {
    const leads = selectedLeads(); if (!leads.length) return;
    const prev = new Map(leads.map((l) => [l.id, { archived: !!l.archived }]));
    bulkOptimistic(leads, { archived: true });
    ui.selected.clear(); syncLeads(); render();
    if (store.get().mock) { toast(`✓ ${leads.length} archivado${leads.length === 1 ? '' : 's'}`, 'ok'); return; }
    const res = await Promise.allSettled(leads.map((l) => archiveLead(l.id, true)));
    bulkRollback(res, leads, prev); bulkToast(res, leads.length, `archivado${leads.length === 1 ? '' : 's'}`);
  }
  function renderBulkBar() {
    const n = ui.selected.size;
    elBulkBar.hidden = n === 0;
    clear(elBulkBar);
    if (!n) return;
    const assignBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', html: icon('user') + ' Asignar a…' });
    assignBtn.addEventListener('click', () => {
      const team = store.get().team || [];
      const items = [{ value: null, label: 'Sin asignar', iconId: 'ban' },
        ...team.map((m) => ({ value: m, label: m.nombre, hint: m.cargo, iconId: 'user' }))];
      openMenu(assignBtn, items, (it) => bulkAssign(it.value), { title: `Asignar ${n} a` });
    });
    const contactBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', html: icon('check') + ' Marcar contactado' });
    contactBtn.addEventListener('click', () => bulkSetStatus('contactado'));
    const archiveBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', html: icon('archive') + ' Archivar' });
    archiveBtn.addEventListener('click', () => bulkArchive());
    const clearBtn = el('button', { class: 'btn btn--ghost btn--sm', type: 'button', html: icon('x') + ' Limpiar' });
    clearBtn.addEventListener('click', () => clearSelection());
    elBulkBar.append(
      el('span', { class: 'inbox__bulkcount', text: `${n} seleccionado${n === 1 ? '' : 's'}` }),
      el('div', { class: 'u-row u-row--tight', style: { marginLeft: 'auto', flexWrap: 'wrap', gap: '6px' } }, [assignBtn, contactBtn, archiveBtn, clearBtn]),
    );
  }

  // ── Estados ──
  function stateNode(glyph, title, msg) {
    return el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', 'aria-hidden': 'true', html: glyph }),
      el('div', { class: 'state__title', text: title }),
      el('div', { class: 'state__msg', text: msg }),
    ]);
  }
  function renderState(glyph, title, msg) { clear(elList); elList.append(stateNode(glyph, title, msg)); }
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
      ui.dirtyHandler = () => { ui.leads = enrichAll(getMockLeads()); syncLeads(); render(); };
      window.addEventListener('altorra:leads-dirty', ui.dirtyHandler);
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
    if (ui.dirtyHandler) { window.removeEventListener('altorra:leads-dirty', ui.dirtyHandler); ui.dirtyHandler = null; }
  };
}

function whatsappTemplate(lead) {
  const first = String(lead.fullName || '').trim().split(/\s+/)[0] || '';
  const veh = lead.vehicleOfInterestId ? ` por el vehículo ${lead.vehicleOfInterestId}` : '';
  return `Hola ${first}, te saluda Altorra Cars 👋. Vimos tu interés${veh}. ¿En qué te podemos ayudar?`;
}
