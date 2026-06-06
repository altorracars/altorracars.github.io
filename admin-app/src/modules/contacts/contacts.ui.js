// ============================================================
// Customer 360 — panel de detalle (overlay store-driven por detailLeadId).
// Pestañas: Resumen · Comunicaciones (timeline) · Score (7 factores) · Notas.
// Reusa el dominio puro (scoring) sobre el canónico. Sin ALTOR/LLM.
// ============================================================

import { el, clear } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import {
  initials, timeAgo, formatDateTime, waLink,
} from '../../domain/format.js';
import { scoreLead, RATING_META, FACTOR_LABELS, FACTOR_WEIGHTS } from '../../domain/scoring.js';
import { classifyType, channelOf, statusMeta } from '../../domain/classify.js';
import { computeNBA } from '../../domain/nba.js';
import { getContact, subscribeActivities, subscribeNotes, addNote } from './contacts.data.js';
import { createDealFromLead } from '../deals/deals.data.js';
import { scheduleActivity } from '../agenda/agenda.data.js';
import { dealFromLead } from '../../domain/pipeline.js';
import { getMockContact, getMockActivities, getMockNotes, addMockNote, addMockDeal, addMockAgenda } from '../../core/mock.js';

const TYPE_ICON = { solicitud_inbound: '📥', whatsapp: '💬', status_change: '🔁', nota: '🗒️', email: '✉️', llamada: '📞' };

export function mountDetailPanel(root) {
  let currentId = null;
  let unsubActs = null;
  let unsubNotes = null;
  let tab = 'resumen';
  let data = { lead: null, contact: null, activities: [], notes: [] };

  const aside = el('aside', { class: 'detail', role: 'dialog', 'aria-modal': 'true', 'aria-label': 'Ficha del cliente' });
  const overlay = el('div', { class: 'detail-overlay', hidden: true }, [aside]);
  root.append(overlay);

  overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
  window.addEventListener('keydown', (e) => { if (e.key === 'Escape' && currentId) close(); });

  store.subscribe((s) => { if (s.detailLeadId !== currentId) sync(s.detailLeadId); });

  function close() { store.set({ detailLeadId: null }); }

  function teardown() {
    if (unsubActs) { unsubActs(); unsubActs = null; }
    if (unsubNotes) { unsubNotes(); unsubNotes = null; }
  }

  function sync(id) {
    teardown();
    currentId = id;
    if (!id) {
      overlay.hidden = true;
      document.body.classList.remove('has-detail');
      clear(aside);
      return;
    }
    tab = 'resumen';
    overlay.hidden = false;
    document.body.classList.add('has-detail');
    open(id);
  }

  function open(id) {
    const lead = (store.get().leads || []).find((l) => l.id === id);
    data = { lead: lead || null, contact: null, activities: [], notes: [] };
    render();
    if (!lead) return;

    // Contacto
    if (store.get().mock) {
      data.contact = getMockContact(lead.contactId);
      data.activities = getMockActivities(id);
      data.notes = getMockNotes(lead.contactId);
      render();
    } else {
      getContact(lead.contactId).then((c) => { data.contact = c; render(); }).catch(() => {});
      unsubActs = subscribeActivities(id, (acts) => { data.activities = acts; render(); }, () => {});
      if (lead.contactId) {
        unsubNotes = subscribeNotes(lead.contactId, (notes) => { data.notes = notes; render(); }, () => {});
      }
    }
  }

  function render() {
    clear(aside);
    const lead = data.lead;
    if (!lead) {
      aside.append(header(null));
      aside.append(el('div', { class: 'state' }, [
        el('div', { class: 'state__icon', text: '🔍' }),
        el('div', { class: 'state__title', text: 'Lead no disponible' }),
        el('div', { class: 'state__msg', text: 'Recarga la Bandeja e inténtalo otra vez.' }),
      ]));
      return;
    }
    aside.append(header(lead));
    aside.append(tabs());
    const body = el('div', { class: 'detail__body' });
    if (tab === 'resumen') body.append(viewResumen(lead));
    else if (tab === 'comms') body.append(viewComms());
    else if (tab === 'score') body.append(viewScore(lead));
    else if (tab === 'notas') body.append(viewNotas(lead));
    aside.append(body);
  }

  function header(lead) {
    const close$ = el('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Cerrar' }, ['✕']);
    close$.addEventListener('click', close);
    if (!lead) return el('div', { class: 'detail__header' }, [el('div', { class: 'u-grow' }), close$]);

    const score = computedScore(lead);
    const rm = RATING_META[score.rating];
    const sm = statusMeta(lead.status);
    const type = classifyType(lead);
    const ch = channelOf(lead);

    const waBtn = el('button', { class: 'btn btn--wa btn--sm', type: 'button' }, ['💬 WhatsApp']);
    waBtn.addEventListener('click', () => {
      const url = waLink(lead.phone, `Hola ${String(lead.fullName || '').split(' ')[0] || ''}, te saluda Altorra Cars 👋`);
      if (!url) return toast('Sin teléfono', 'error');
      window.open(url, '_blank', 'noopener');
    });

    const canEdit = hasPermission('crm.edit');
    const convertBtn = (canEdit && lead.status !== 'convertido')
      ? el('button', { class: 'btn btn--soft btn--sm', type: 'button' }, ['🎯 Convertir']) : null;
    if (convertBtn) convertBtn.addEventListener('click', async () => {
      convertBtn.disabled = true;
      try {
        if (store.get().mock) addMockDeal(dealFromLead(lead));
        else await createDealFromLead(lead);
        toast('🎯 Convertido a oportunidad', 'ok');
      } catch (e) { toast('No se pudo convertir', 'error'); convertBtn.disabled = false; }
    });

    const agendaBtn = canEdit ? el('button', { class: 'icon-btn', type: 'button', 'aria-label': 'Agendar cita', title: 'Agendar cita' }, ['📅']) : null;
    if (agendaBtn) agendaBtn.addEventListener('click', () => openScheduler(lead, agendaBtn));

    return el('div', { class: 'detail__header' }, [
      el('div', { class: 'u-row u-grow', style: { minWidth: '0' } }, [
        el('span', { class: 'avatar', 'aria-hidden': 'true', text: initials(lead.fullName) }),
        el('div', { class: 'u-grow', style: { minWidth: '0' } }, [
          el('h2', { class: 'detail__name u-truncate', text: lead.fullName }),
          el('div', { class: 'u-row u-row--tight', style: { flexWrap: 'wrap' } }, [
            el('span', { class: `temp ${rm.cls}`, text: `${rm.icon} ${rm.label} · ${score.score}` }),
            el('span', { class: `badge badge--${sm.badge || ''}`.trim(), text: sm.label }),
            el('span', { class: 'badge', text: `${type.icon} ${type.label}` }),
            el('span', { class: 'badge', text: `${ch.icon} ${ch.label}` }),
          ]),
        ]),
      ]),
      el('div', { class: 'u-row u-row--tight' }, [convertBtn, agendaBtn, waBtn, close$]),
    ]);
  }

  function tabs() {
    const defs = [['resumen', 'Resumen'], ['comms', 'Comunicaciones'], ['score', 'Score'], ['notas', 'Notas']];
    const bar = el('div', { class: 'detail__tabs', role: 'tablist' });
    defs.forEach(([id, label]) => {
      const b = el('button', {
        class: 'detail__tab' + (tab === id ? ' is-active' : ''), role: 'tab',
        'aria-selected': String(tab === id), type: 'button',
      }, [label]);
      b.addEventListener('click', () => { tab = id; render(); });
      bar.append(b);
    });
    return bar;
  }

  function viewResumen(lead) {
    const c = data.contact;
    const consent = c && c.consent ? c.consent : null;
    const rows = [
      ['Correo', lead.email || '—'],
      ['Teléfono', lead.phone || '—'],
      ['Interés', lead.sourceDetail || '—'],
      ['Vehículo', lead.vehicleOfInterestId || '—'],
      ['Asesor', lead.ownerName || 'Sin asignar'],
      ['Origen', lead.source || '—'],
      ['Capturado', formatDateTime(lead.createdAt)],
      ['Última actividad', timeAgo(lead.lastActivityAt)],
    ];
    const nba = computeNBA(lead, { score: computedScore(lead).score });
    return el('div', { class: 'u-stack' }, [
      el('div', { class: 'detail-card detail-card--nba' }, [
        el('span', { class: 'detail-card__icon', 'aria-hidden': 'true', text: nba.icon }),
        el('div', { class: 'u-grow' }, [
          el('div', { class: 'u-caption u-muted', text: 'Próxima mejor acción' }),
          el('strong', { text: nba.label }),
          el('div', { class: 'u-caption u-faint', text: nba.reason }),
        ]),
      ]),
      el('dl', { class: 'kv' }, rows.flatMap(([k, v]) => [
        el('dt', { text: k }), el('dd', { class: 'u-truncate', text: v }),
      ])),
      consent ? consentBlock(consent) : null,
    ]);
  }

  function consentBlock(consent) {
    const ok = (b) => (b ? '✅' : '⛔');
    return el('div', { class: 'detail-card' }, [
      el('div', { class: 'u-caption u-muted', text: 'Consentimiento (Ley 1581)' }),
      el('div', { class: 'u-row', style: { flexWrap: 'wrap', gap: '12px' } }, [
        el('span', { class: 'u-caption', text: `${ok(consent.email)} Email` }),
        el('span', { class: 'u-caption', text: `${ok(consent.whatsapp)} WhatsApp` }),
        el('span', { class: 'u-caption', text: `${ok(consent.calls)} Llamadas` }),
      ]),
      el('div', { class: 'u-caption u-faint', text: `Política ${consent.policyVersion || 'v1'} · origen ${consent.source || '—'}` }),
    ]);
  }

  function viewComms() {
    if (!data.activities.length) {
      return el('div', { class: 'state' }, [
        el('div', { class: 'state__icon', text: '📭' }),
        el('div', { class: 'state__title', text: 'Sin comunicaciones' }),
        el('div', { class: 'state__msg', text: 'Aún no hay actividades registradas para este lead.' }),
      ]);
    }
    const list = el('ol', { class: 'timeline' });
    data.activities.forEach((a) => {
      list.append(el('li', { class: 'timeline__item timeline__item--' + (a.direction || 'inbound') }, [
        el('span', { class: 'timeline__icon', 'aria-hidden': 'true', text: TYPE_ICON[a.type] || '•' }),
        el('div', { class: 'u-grow' }, [
          el('div', { class: 'u-spread' }, [
            el('strong', { class: 'u-truncate', text: a.subject || a.type || 'Actividad' }),
            el('span', { class: 'u-caption u-faint', text: timeAgo(a.createdAt) }),
          ]),
          a.body ? el('div', { class: 'u-caption u-muted', text: a.body }) : null,
        ]),
      ]));
    });
    return list;
  }

  function viewScore(lead) {
    const s = computedScore(lead);
    const rm = RATING_META[s.rating];
    const bars = Object.keys(FACTOR_LABELS).map((k) => {
      const pct = Math.round((s.factors[k] || 0) * 100);
      return el('div', { class: 'factor' }, [
        el('div', { class: 'u-spread u-caption' }, [
          el('span', { text: FACTOR_LABELS[k] }),
          el('span', { class: 'u-faint', text: `${pct}% · peso ${Math.round(FACTOR_WEIGHTS[k] * 100)}%` }),
        ]),
        el('div', { class: 'factor__track' }, [el('div', { class: 'factor__fill', style: { width: pct + '%' } })]),
      ]);
    });
    return el('div', { class: 'u-stack' }, [
      el('div', { class: 'scorehero' }, [
        el('div', { class: `scorehero__num ${rm.cls}`, text: String(s.score) }),
        el('div', { class: 'u-stack', style: { gap: '2px' } }, [
          el('strong', { text: `${rm.icon} ${rm.label}` }),
          el('span', { class: 'u-caption u-faint', text: 'Heurística determinista (7 factores, sin IA)' }),
        ]),
      ]),
      el('div', { class: 'u-stack', style: { gap: '10px' } }, bars),
    ]);
  }

  function viewNotas(lead) {
    const canEdit = hasPermission('crm.edit') || hasPermission('crm.create');
    const ta = el('textarea', { class: 'textarea', placeholder: 'Escribe una nota interna…', rows: '3' });
    const btn = el('button', { class: 'btn btn--gold btn--sm', type: 'button' }, ['Agregar nota']);
    btn.addEventListener('click', async () => {
      const text = ta.value.trim();
      if (!text) return;
      btn.disabled = true;
      const note = { body: text, authorName: 'Tú', createdAt: new Date().toISOString() };
      try {
        if (store.get().mock) { addMockNote(lead.contactId, note); data.notes = getMockNotes(lead.contactId); render(); }
        else { await addNote(lead.contactId, text); /* onSnapshot refresca */ ta.value = ''; }
        toast('Nota agregada', 'ok');
      } catch (e) { toast('No se pudo guardar la nota', 'error'); }
      finally { btn.disabled = false; }
    });

    const list = el('div', { class: 'u-stack' });
    if (!data.notes.length) list.append(el('div', { class: 'u-caption u-faint', style: { padding: '8px 0' }, text: 'Aún no hay notas.' }));
    data.notes.forEach((n) => list.append(el('div', { class: 'detail-card' }, [
      el('div', { class: 'u-caption u-muted', text: n.body }),
      el('div', { class: 'u-caption u-faint', text: `${n.authorName || 'Asesor'} · ${timeAgo(n.createdAt)}` }),
    ])));

    return el('div', { class: 'u-stack' }, [
      canEdit ? el('div', { class: 'u-stack', style: { gap: '8px' } }, [ta, el('div', { class: 'u-row', style: { justifyContent: 'flex-end' } }, [btn])]) : null,
      list,
    ]);
  }

  function computedScore(lead) {
    return scoreLead(lead, data.activities || [], data.contact);
  }
}

// Mini-formulario para agendar una cita (datetime-local) desde el 360.
function openScheduler(lead, anchor) {
  const pad = (n) => String(n).padStart(2, '0');
  const d = new Date(); d.setDate(d.getDate() + 1); d.setHours(10, 0, 0, 0);
  const defVal = `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}T${pad(d.getHours())}:${pad(d.getMinutes())}`;

  const subj = el('input', { class: 'input', type: 'text', value: 'Cita con ' + (lead.fullName || ''), 'aria-label': 'Asunto' });
  const when = el('input', { class: 'input', type: 'datetime-local', value: defVal, 'aria-label': 'Fecha y hora' });
  const ok = el('button', { class: 'btn btn--gold btn--sm btn--block', type: 'button' }, ['Agendar']);
  const form = el('div', { class: 'popover', role: 'dialog', 'aria-label': 'Agendar cita', style: { width: '260px', gap: '8px' } }, [
    el('div', { class: 'popover__title', text: 'Agendar cita' }), subj, when, ok,
  ]);
  document.body.append(form);
  const r = anchor.getBoundingClientRect();
  form.style.top = `${Math.min(window.innerHeight - form.offsetHeight - 8, r.bottom + 6)}px`;
  form.style.left = `${Math.max(8, r.right - form.offsetWidth)}px`;
  setTimeout(() => when.focus(), 0);

  const close = () => { form.remove(); document.removeEventListener('mousedown', onOut, true); window.removeEventListener('keydown', onKey, true); };
  const onOut = (e) => { if (!form.contains(e.target)) close(); };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  setTimeout(() => { document.addEventListener('mousedown', onOut, true); window.addEventListener('keydown', onKey, true); }, 0);

  ok.addEventListener('click', async () => {
    const iso = when.value ? new Date(when.value).toISOString() : null;
    if (!iso) { toast('Elige fecha y hora', 'error'); return; }
    ok.disabled = true;
    try {
      if (store.get().mock) addMockAgenda({ type: 'cita', subject: subj.value, dueAt: iso, relatedTo: { type: 'lead', id: lead.id, name: lead.fullName }, status: 'open' });
      else await scheduleActivity(lead, iso, subj.value);
      toast('📅 Cita agendada', 'ok'); close();
    } catch (e) { toast('No se pudo agendar', 'error'); ok.disabled = false; }
  });
}
