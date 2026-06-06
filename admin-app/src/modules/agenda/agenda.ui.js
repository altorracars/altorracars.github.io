// ============================================================
// Agenda — vista de mes (capa UI). UN solo calendario del portal.
// Muestra `activities` con dueAt; click en evento → Customer 360.
// ============================================================

import { el, clear } from '../../core/dom.js';
import { openMenu } from '../../core/popover.js';
import { store } from '../../core/store.js';
import {
  WEEKDAYS, MONTHS, monthMatrix, gridRange, groupByDay, dayKey, timeOf, isSameDay,
} from '../../domain/agenda.js';
import { subscribeRange } from './agenda.data.js';
import { getMockAgenda } from '../../core/mock.js';

export function mountAgenda(root) {
  const today = new Date();
  const ui = { year: today.getFullYear(), month: today.getMonth(), events: [], loading: true, error: null, sub: null };

  const head = el('div', { class: 'agenda__head' });
  const weekdays = el('div', { class: 'agenda__weekdays' }, WEEKDAYS.map((w) => el('span', { class: 'agenda__wd', text: w })));
  const grid = el('div', { class: 'agenda__grid' });
  const section = el('section', { class: 'agenda' }, [head, weekdays, grid]);
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
      iconBtn('‹', 'Mes anterior', () => go(-1)),
      el('button', { class: 'btn btn--soft btn--sm', type: 'button', onclick: goToday }, ['Hoy']),
      iconBtn('›', 'Mes siguiente', () => go(1)),
    ]);
    head.append(
      el('h2', { class: 'agenda__title', text: `${MONTHS[ui.month]} ${ui.year}` }),
      nav,
    );
  }
  function iconBtn(glyph, label, fn) {
    const b = el('button', { class: 'icon-btn', type: 'button', 'aria-label': label }, [glyph]);
    b.addEventListener('click', fn);
    return b;
  }

  function render() {
    renderHead();
    clear(grid);
    if (ui.error) { grid.append(el('div', { class: 'state' }, [el('div', { class: 'state__icon', text: '⚠️' }), el('div', { class: 'state__title', text: 'No se pudo cargar la agenda' }), el('div', { class: 'state__msg', text: ui.error })])); return; }

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
    const chip = el('button', { class: 'agenda__chip', type: 'button', title: ev.subject || 'Cita' }, [
      el('span', { class: 'agenda__chip-time', text: timeOf(ev.dueAt) }),
      el('span', { class: 'u-truncate', text: ev.relatedTo?.name || ev.subject || 'Cita' }),
    ]);
    chip.addEventListener('click', () => openEvent(ev));
    return chip;
  }

  function openEvent(ev) {
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
