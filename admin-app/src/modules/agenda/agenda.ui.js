// ============================================================
// Agenda — vista de mes (capa UI). UN solo calendario del portal.
// Muestra `activities` con dueAt; click en evento → Customer 360.
// ============================================================

import { el, clear } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { openMenu } from '../../core/popover.js';
import { store } from '../../core/store.js';
import {
  WEEKDAYS, MONTHS, monthMatrix, gridRange, groupByDay, dayKey, timeOf, isSameDay,
} from '../../domain/agenda.js';
import { hasPermission } from '../../core/auth.js';
import { subscribeRange } from './agenda.data.js';
import { openCitaDetail, openCitaChooser } from './cita-dialog.js';
import { getMockAgenda } from '../../core/mock.js';

export function mountAgenda(root) {
  const today = new Date();
  const ui = { year: today.getFullYear(), month: today.getMonth(), events: [], loading: true, error: null, sub: null };

  const head = el('div', { class: 'agenda__head' });
  // F18/F19 §184: la GESTIÓN de citas vive AQUÍ (confirmar con asesor, WhatsApp
  // con link, reprogramar, cancelar, no-show). F-6 §255: retirado el link al
  // "calendario clásico" de respaldo — admin.html se cuarentenó en el cutover.
  const banner = el('p', { class: 'u-muted u-caption', style: { margin: '0', padding: '8px 10px', border: '1px dashed var(--line, #444)', borderRadius: '8px' } }, [
    el('span', { class: 'u-ico', html: icon('info'), style: 'vertical-align:-3px;margin-right:5px;color:var(--gold-500)' }),
    'Toca una cita para confirmarla (asignando asesor), pedir confirmación por WhatsApp, reprogramarla o cancelarla. ',
    'Si el cliente no confirma, caduca sola 3h antes y libera el cupo.',
  ]);
  const weekdays = el('div', { class: 'agenda__weekdays' }, WEEKDAYS.map((w) => el('span', { class: 'agenda__wd', text: w })));
  const grid = el('div', { class: 'agenda__grid' });
  const section = el('section', { class: 'agenda' }, [head, banner, weekdays, grid]);
  clear(root); root.append(section);

  function go(delta) {
    let m = ui.month + delta, y = ui.year;
    if (m < 0) { m = 11; y--; } else if (m > 11) { m = 0; y++; }
    ui.year = y; ui.month = m; load();
  }
  function goToday() { ui.year = today.getFullYear(); ui.month = today.getMonth(); load(); }

  function renderHead() {
    clear(head);
    const nav = el('div', { class: 'u-row u-row--tight' }, [
      iconBtn('chevronLeft', 'Mes anterior', () => go(-1)),
      el('button', { class: 'btn btn--soft btn--sm', type: 'button', onclick: goToday }, ['Hoy']),
      iconBtn('chevronRight', 'Mes siguiente', () => go(1)),
    ]);
    // Gap 5 (F23-7 §188): crear cita SIN pasar por el 360 — walk-ins incluidos.
    if (hasPermission('crm.edit')) {
      const nueva = el('button', { class: 'btn btn--gold btn--sm', type: 'button', html: icon('plus') + ' Nueva cita' });
      nueva.addEventListener('click', () => openCitaChooser({}));
      nav.append(nueva);
    }
    head.append(
      el('h2', { class: 'agenda__title', text: `${MONTHS[ui.month]} ${ui.year}` }),
      nav,
    );
  }
  function iconBtn(iconId, label, fn) {
    const b = el('button', { class: 'icon-btn', type: 'button', 'aria-label': label, html: icon(iconId) });
    b.addEventListener('click', fn);
    return b;
  }

  function render() {
    renderHead();
    clear(grid);
    if (ui.error) { grid.append(el('div', { class: 'state' }, [el('div', { class: 'state__icon', html: icon('alertTriangle') }), el('div', { class: 'state__title', text: 'No se pudo cargar la agenda' }), el('div', { class: 'state__msg', text: ui.error })])); return; }

    const byDay = groupByDay(ui.events);
    const weeks = monthMatrix(ui.year, ui.month);
    weeks.forEach((week) => {
      week.forEach((cell) => {
        const k = dayKey(cell.date);
        const evs = byDay[k] || [];
        const isToday = isSameDay(cell.date, today);
        const day = el('div', {
          class: 'agenda__day' + (cell.inMonth ? '' : ' is-out') + (isToday ? ' is-today' : ''),
          role: 'gridcell',
        }, [
          el('div', { class: 'agenda__daynum', text: String(cell.date.getDate()) }),
        ]);
        const list = el('div', { class: 'agenda__events' });
        evs.slice(0, 3).forEach((ev) => list.append(eventChip(ev)));
        if (evs.length > 3) {
          const more = el('button', { class: 'agenda__more', type: 'button' }, [`+${evs.length - 3} más`]);
          more.addEventListener('click', () => openMenu(more, evs.map((ev) => ({ value: ev, label: `${timeOf(ev.dueAt)} · ${ev.relatedTo?.name || ev.subject || 'Cita'}` })), (it) => openEvent(it.value), { title: `${cell.date.getDate()} ${MONTHS[ui.month]}` }));
          list.append(more);
        }
        day.append(list);
        grid.append(day);
      });
    });
  }

  function eventChip(ev) {
    // F18 §184: las citas pintan su estado (pendiente ámbar / confirmada
    // verde / cerradas apagadas) y abren su diálogo de acciones.
    const estado = ev.type === 'cita' ? (ev.estadoCita || 'pendiente') : null;
    const cls = 'agenda__chip'
      + (estado ? ' agenda__chip--' + estado : '')
      + (ev.status === 'closed' ? ' is-closed' : '');
    const chip = el('button', { class: cls, type: 'button', title: ev.subject || 'Cita' }, [
      el('span', { class: 'agenda__chip-time', text: timeOf(ev.dueAt) }),
      el('span', { class: 'u-truncate', text: ev.relatedTo?.name || ev.subject || 'Cita' }),
    ]);
    chip.addEventListener('click', () => openEvent(ev));
    return chip;
  }

  function openEvent(ev) {
    // Cita proyectada (F16) → diálogo de gestión F18; lo demás → 360.
    if (ev.type === 'cita' && ev.sourceSolicitudId) {
      openCitaDetail(ev, { onLead: (id) => store.set({ detailLeadId: id }) });
      return;
    }
    const leadId = ev.relatedTo && ev.relatedTo.id;
    if (leadId) store.set({ detailLeadId: leadId });
  }

  function load() {
    render(); // pinta el mes de inmediato
    if (ui.sub) { ui.sub(); ui.sub = null; }
    if (store.get().mock) {
      ui.events = getMockAgenda(); ui.loading = false; render(); return;
    }
    const { startISO, endISO } = gridRange(ui.year, ui.month);
    ui.sub = subscribeRange(startISO, endISO,
      (rows) => { ui.events = rows; ui.loading = false; ui.error = null; render(); },
      (err) => { ui.loading = false; ui.error = err && err.code === 'permission-denied' ? 'Sin permiso.' : 'Revisa tu conexión.'; render(); });
  }

  load();
  return function cleanup() { if (ui.sub) ui.sub(); ui.sub = null; };
}
