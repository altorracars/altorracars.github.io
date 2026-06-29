// ============================================================
// Configuración de citas (F21, ADR §184) — editor del SSoT
// config/availability: horario, días, cupos, festivos/bloqueos,
// horas bloqueadas y EXCEPCIONES POR ASESOR (vacaciones/incapacidad).
// Primer módulo del strangler (Fase 5 #1): lo que aquí se guarda lo
// leen EN VIVO el form público, el admin clásico y las functions.
// ============================================================

import { el, clear } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { fetchAdvisors } from '../../core/advisors.js';
import { friendlyError } from '../../core/errors.js';
import {
  AVAILABILITY_DEFAULTS, FESTIVOS_CO_2026, subscribeAvailability, saveAvailability,
  subscribeOverrides, saveOverrides, deleteField,
} from './config.data.js';

const DAY_NAMES = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export function mountConfig(root) {
  const ui = { av: { ...AVAILABILITY_DEFAULTS }, overrides: {}, advisors: [], sub: null, subOv: null, loaded: false };
  const canEdit = hasPermission('calendar.config');

  const wrap = el('section', { class: 'cfg' });
  clear(root); root.append(wrap);

  if (!canEdit) {
    wrap.append(el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', text: '🔒' }),
      el('div', { class: 'state__title', text: 'Sin permiso' }),
      el('div', { class: 'state__msg', text: 'Solo quien administra la disponibilidad (permiso calendar.config) puede editar esto.' }),
    ]));
    return;
  }

  async function save(patch, okMsg) {
    if (store.get().mock) {
      Object.assign(ui.av, patch);
      render();
      toast(okMsg + ' (demo)', 'ok');
      return;
    }
    try {
      await saveAvailability(patch, store.get().user && store.get().user.uid);
      toast(okMsg, 'ok');
    } catch (e) {
      toast('No se pudo guardar: ' + friendlyError(e), 'error');
    }
  }

  /* ── 1. Horario de atención ─────────────────────────────── */
  function cardHorario() {
    const av = ui.av;
    const dayBoxes = DAY_NAMES.map((name, dow) => {
      const cb = el('input', { type: 'checkbox' });
      cb.checked = (av.days || []).includes(dow);
      cb.dataset.dow = String(dow);
      return el('label', { class: 'cfg-day' }, [cb, el('span', { text: name })]);
    });
    const hourSel = (val, from, to) => {
      const s = el('select', { class: 'select' });
      for (let h = from; h <= to; h++) s.append(el('option', { value: String(h), text: String(h).padStart(2, '0') + ':00' }));
      s.value = String(val);
      return s;
    };
    const start = hourSel(av.startHour, 6, 20);
    const end = hourSel(av.endHour, 7, 21);
    const interval = el('select', { class: 'select' }, [
      el('option', { value: '30', text: 'Cada 30 min' }),
      el('option', { value: '60', text: 'Cada hora' }),
    ]);
    interval.value = String(av.interval || 60);
    const maxPer = el('input', { class: 'input', type: 'number', min: '1', max: '5', value: String(av.maxPerSlot || 1) });
    const buffer = el('input', { class: 'input', type: 'number', min: '0', max: '60', step: '5', value: String(av.bufferMin != null ? av.bufferMin : 15) });

    const btn = el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: 'Guardar horario' });
    btn.addEventListener('click', () => {
      const days = dayBoxes.map((l) => l.querySelector('input')).filter((c) => c.checked).map((c) => parseInt(c.dataset.dow, 10)).sort();
      const s = parseInt(start.value, 10); const e2 = parseInt(end.value, 10);
      if (!days.length) { toast('Elige al menos un día.', 'error'); return; }
      if (s >= e2) { toast('La hora de cierre debe ser mayor que la de apertura.', 'error'); return; }
      save({
        days, startHour: s, endHour: e2,
        interval: parseInt(interval.value, 10) || 60,
        maxPerSlot: Math.max(1, parseInt(maxPer.value, 10) || 1),
        bufferMin: Math.max(0, parseInt(buffer.value, 10) || 0),
      }, '✓ Horario guardado');
    });

    return el('div', { class: 'cfg-card' }, [
      el('h3', { class: 'cfg-card__title', text: '🕘 Horario de atención' }),
      el('p', { class: 'u-caption u-muted', text: 'Esto es lo que el cliente ve en la web al pedir cita — los cambios aplican al instante.' }),
      el('div', { class: 'cfg-days' }, dayBoxes),
      el('div', { class: 'cfg-grid' }, [
        el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Abre' }), start]),
        el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Cierra' }), end]),
        el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Citas web' }), interval]),
        el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Citas por horario' }), maxPer]),
        el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Colchón (min)' }), buffer]),
      ]),
      btn,
    ]);
  }

  /* ── 2. Fechas bloqueadas (festivos + bloqueos) ─────────── */
  function cardFechas() {
    const av = ui.av;
    const labels = av.blockedDateLabels || {};
    const hoy = todayKey();
    const list = el('div', { class: 'cfg-chips' });
    const dates = (av.blockedDates || []).slice().sort();
    if (!dates.length) list.append(el('span', { class: 'u-caption u-muted', text: 'Sin fechas bloqueadas — la web ofrece todos los días laborales.' }));
    dates.forEach((d) => {
      const past = d < hoy;
      const x = el('button', { class: 'cfg-chip__x', type: 'button', 'aria-label': 'Quitar', text: '✕' });
      x.addEventListener('click', () => {
        const next = dates.filter((v) => v !== d);
        // setDoc merge NO borra claves omitidas → tombstone explícito.
        save({ blockedDates: next, blockedDateLabels: { [d]: deleteField() } }, '✓ Fecha desbloqueada: ' + d);
      });
      list.append(el('span', { class: 'cfg-chip' + (past ? ' is-past' : '') }, [
        el('span', { text: d + (labels[d] ? ' · ' + labels[d] : '') }), x,
      ]));
    });

    const dateIn = el('input', { class: 'input', type: 'date', min: hoy });
    const labelIn = el('input', { class: 'input', type: 'text', placeholder: 'Motivo (opcional)', maxlength: '40' });
    const addBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: 'Bloquear fecha' });
    addBtn.addEventListener('click', () => {
      const d = dateIn.value;
      if (!d) { toast('Elige una fecha.', 'error'); return; }
      if (dates.includes(d)) { toast('Esa fecha ya está bloqueada.', 'error'); return; }
      const nextLabels = { ...labels };
      if (labelIn.value.trim()) nextLabels[d] = labelIn.value.trim();
      save({ blockedDates: [...dates, d].sort(), blockedDateLabels: nextLabels }, '✓ Fecha bloqueada: ' + d);
    });

    const festBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '🇨🇴 Cargar festivos de Colombia 2026' });
    festBtn.addEventListener('click', () => {
      const nuevos = FESTIVOS_CO_2026.filter(([d]) => d >= hoy && !dates.includes(d));
      if (!nuevos.length) { toast('Los festivos que faltan de 2026 ya están cargados.', 'ok'); return; }
      const nextLabels = { ...labels };
      nuevos.forEach(([d, l]) => { nextLabels[d] = l; });
      save({
        blockedDates: [...dates, ...nuevos.map(([d]) => d)].sort(),
        blockedDateLabels: nextLabels,
      }, `✓ ${nuevos.length} festivo(s) bloqueados`);
    });

    return el('div', { class: 'cfg-card' }, [
      el('h3', { class: 'cfg-card__title', text: '📅 Fechas bloqueadas (festivos y cierres)' }),
      el('p', { class: 'u-caption u-muted', text: 'En estas fechas la web NO ofrece citas. Las fechas pasadas se limpian solas cada madrugada.' }),
      list,
      el('div', { class: 'cfg-row' }, [dateIn, labelIn, addBtn]),
      festBtn,
    ]);
  }

  /* ── 3. Horas bloqueadas por fecha ──────────────────────── */
  function horasDelDia() {
    const av = ui.av; const out = [];
    const step = (av.interval || 60);
    for (let m = av.startHour * 60; m < av.endHour * 60; m += step) {
      out.push(String(Math.floor(m / 60)).padStart(2, '0') + ':' + String(m % 60).padStart(2, '0'));
    }
    return out;
  }
  function cardHoras() {
    const av = ui.av;
    const bh = av.blockedHours || {};
    const list = el('div', { class: 'cfg-bh' });
    const entries = Object.entries(bh).sort(([a], [b]) => a.localeCompare(b));
    if (!entries.length) list.append(el('span', { class: 'u-caption u-muted', text: 'Sin horas bloqueadas.' }));
    entries.forEach(([d, hours]) => {
      const chips = (hours || []).slice().sort().map((h) => {
        const x = el('button', { class: 'cfg-chip__x', type: 'button', text: '✕' });
        x.addEventListener('click', () => {
          const rest = (bh[d] || []).filter((v) => v !== h);
          // Última hora del día → tombstone (merge no borra claves omitidas).
          save({ blockedHours: { [d]: rest.length ? rest : deleteField() } }, `✓ ${d} ${h} desbloqueada`);
        });
        return el('span', { class: 'cfg-chip' }, [el('span', { text: h }), x]);
      });
      list.append(el('div', { class: 'cfg-bh__day' }, [el('strong', { text: d }), el('div', { class: 'cfg-chips' }, chips)]));
    });

    const dateIn = el('input', { class: 'input', type: 'date', min: todayKey() });
    const hourSel = el('select', { class: 'select' }, horasDelDia().map((h) => el('option', { value: h, text: h })));
    const addBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: 'Bloquear hora' });
    addBtn.addEventListener('click', () => {
      const d = dateIn.value; const h = hourSel.value;
      if (!d) { toast('Elige una fecha.', 'error'); return; }
      const cur = bh[d] || [];
      if (cur.includes(h)) { toast('Esa hora ya está bloqueada.', 'error'); return; }
      save({ blockedHours: { ...bh, [d]: [...cur, h].sort() } }, `✓ ${d} ${h} bloqueada`);
    });

    return el('div', { class: 'cfg-card' }, [
      el('h3', { class: 'cfg-card__title', text: '⏰ Horas bloqueadas (un horario puntual)' }),
      list,
      el('div', { class: 'cfg-row' }, [dateIn, hourSel, addBtn]),
    ]);
  }

  /* ── 4. Excepciones por asesor (C.6) — doc PRIVADO crm_config (la
     disponibilidad es de lectura pública; nombre+motivo de ausencia NO) ── */
  async function saveOv(next, okMsg) {
    if (store.get().mock) { ui.overrides = next; render(); toast(okMsg + ' (demo)', 'ok'); return; }
    try {
      await saveOverrides(next, store.get().user && store.get().user.uid);
      toast(okMsg, 'ok');
    } catch (e) { toast('No se pudo guardar: ' + friendlyError(e), 'error'); }
  }
  function cardAsesores() {
    const ov = ui.overrides || {};
    const body = el('div', { class: 'cfg-advisors' });

    if (!ui.advisors.length) {
      body.append(el('span', { class: 'u-caption u-muted', text: 'Cargando asesores…' }));
    }
    ui.advisors.forEach((a) => {
      const cur = ov[a.uid];
      const row = el('div', { class: 'cfg-advisor' });
      row.append(el('div', { class: 'cfg-advisor__name' }, [
        el('strong', { text: a.nombre }),
        cur
          ? el('span', { class: 'cfg-advisor__badge is-off', text: `🏖 ${cur.reason || 'ausente'} · ${cur.from} → ${cur.to}` })
          : el('span', { class: 'cfg-advisor__badge', text: '✅ disponible' }),
      ]));
      if (cur) {
        const quitar = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: 'Quitar ausencia' });
        quitar.addEventListener('click', () => {
          const next = { ...ov }; delete next[a.uid];
          saveOv(next, `✓ ${a.nombre} disponible de nuevo`); // doc completo: el delete SÍ persiste
        });
        row.append(quitar);
      } else {
        const from = el('input', { class: 'input', type: 'date', min: todayKey() });
        const to = el('input', { class: 'input', type: 'date', min: todayKey() });
        const reason = el('select', { class: 'select' }, [
          el('option', { value: 'vacaciones', text: 'Vacaciones' }),
          el('option', { value: 'incapacidad', text: 'Incapacidad' }),
          el('option', { value: 'otro', text: 'Otro' }),
        ]);
        const btn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: 'Marcar ausencia' });
        btn.addEventListener('click', () => {
          if (!from.value || !to.value || from.value > to.value) { toast('Revisa el rango de fechas.', 'error'); return; }
          saveOv({
            ...ov,
            [a.uid]: { name: a.nombre, from: from.value, to: to.value, reason: reason.value },
          }, `✓ Ausencia de ${a.nombre} registrada`);
        });
        row.append(el('div', { class: 'cfg-row' }, [from, to, reason, btn]));
      }
      body.append(row);
    });

    return el('div', { class: 'cfg-card' }, [
      el('h3', { class: 'cfg-card__title', text: '👤 Excepciones por asesor' }),
      el('p', { class: 'u-caption u-muted', text: 'Un asesor ausente no recibe leads de la rotación ni citas confirmadas a su nombre en esas fechas.' }),
      body,
    ]);
  }

  function render() {
    clear(wrap);
    wrap.append(
      el('div', { class: 'cfg-cols' }, [cardHorario(), cardFechas()]),
      el('div', { class: 'cfg-cols' }, [cardHoras(), cardAsesores()]),
    );
  }

  // Boot: mock = defaults locales; real = onSnapshot de los DOS docs.
  if (store.get().mock) {
    ui.loaded = true; render();
  } else {
    ui.sub = subscribeAvailability(
      (av) => { ui.av = av; ui.loaded = true; render(); },
      () => { toast('No se pudo cargar la configuración.', 'error'); },
    );
    ui.subOv = subscribeOverrides(
      (ov) => { ui.overrides = ov; if (ui.loaded) render(); },
      () => {}, // sin permiso de crm_config: la tarjeta queda en "disponible"
    );
  }
  fetchAdvisors().then((list) => { ui.advisors = list; if (ui.loaded) render(); });

  return function cleanup() {
    if (ui.sub) ui.sub(); ui.sub = null;
    if (ui.subOv) ui.subOv(); ui.subOv = null;
  };
}
