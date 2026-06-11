// ============================================================
// F18/F19 (ADR §184) — diálogos de CITA del portal.
//  - openCitaDetail(ev): detalle + acciones (Confirmar con tupla,
//    WhatsApp con link tokenizado, Reprogramar, Cancelar, No-show,
//    Completada) sobre la SOLICITUD origen vía callable transaccional.
//  - openCitaCreate(lead): cita MANUAL desde el 360 — nace confirmada
//    con tupla completa (asesor + vehículo) desde el create.
// La Agenda se refresca sola: la proyección F16 reescribe la activity.
// ============================================================

import { el } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { fetchAdvisors } from '../../core/advisors.js';
import { fetchAvailableVehicles } from '../deals/deals.data.js';
import { addMockAgenda } from '../../core/mock.js';
import {
  citaAction, fetchSolicitud, fetchAvailability, fetchBookedSlots,
} from './agenda.data.js';

const ESTADO_LABEL = {
  pendiente: '🕐 Pendiente (sin confirmar)', confirmada: '✅ Confirmada',
  reprogramada: '🔁 Reprogramada (re-confirmar)', completada: '🏁 Completada',
  cancelada: '✖ Cancelada', no_show: '🚫 No asistió', caducada: '⏳ Caducada (no confirmó)',
};
const ACTIVAS = ['pendiente', 'confirmada', 'reprogramada'];
const SIN_VEHICULO = '';

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

function modal(title, subtitle, bodyNodes) {
  const card = el('div', { class: 'modal' }, [
    el('div', { class: 'modal__head' }, [
      el('h2', { class: 'modal__title', text: title }),
      subtitle ? el('span', { class: 'u-caption u-faint', text: subtitle }) : null,
    ]),
    ...bodyNodes,
  ]);
  const overlay = el('div', { class: 'modal-overlay' }, [card]);
  document.body.appendChild(overlay);
  const close = () => { overlay.remove(); window.removeEventListener('keydown', onKey); };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  window.addEventListener('keydown', onKey);
  overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
  return { overlay, card, close };
}

function row(label, value) {
  if (!value) return null;
  return el('div', { class: 'cita-row' }, [
    el('span', { class: 'cita-row__k u-caption u-muted', text: label }),
    el('span', { class: 'cita-row__v', text: String(value) }),
  ]);
}

/** Slots libres de una fecha según availability + bookedSlots (como la web). */
function freeSlotsFor(av, booked, fecha) {
  if (!fecha) return [];
  if (Array.isArray(av.blockedDates) && av.blockedDates.includes(fecha)) return [];
  const dow = new Date(fecha + 'T12:00:00Z').getUTCDay();
  if (!(Array.isArray(av.days) ? av.days : [1, 2, 3, 4, 5, 6]).includes(dow)) return [];
  const taken = Array.isArray(booked[fecha]) ? booked[fecha] : [];
  const blockedH = (av.blockedHours && av.blockedHours[fecha]) || [];
  const out = [];
  const step = av.interval || 60;
  for (let m = (av.startHour ?? 9) * 60; m < (av.endHour ?? 17) * 60; m += step) {
    const h = `${String(Math.floor(m / 60)).padStart(2, '0')}:${String(m % 60).padStart(2, '0')}`;
    if (!taken.includes(h) && !blockedH.includes(h)) out.push(h);
  }
  return out;
}

/** fecha+hora → selects conectados a availability/bookedSlots. */
function slotPicker(av, booked, { fecha, hora } = {}) {
  const dateIn = el('input', { class: 'input', type: 'date', min: todayKey(), value: fecha || '' });
  const hourSel = el('select', { class: 'select' }, [el('option', { value: '', text: '— hora —' })]);
  function refresh() {
    const free = freeSlotsFor(av, booked, dateIn.value);
    hourSel.replaceChildren(
      el('option', { value: '', text: free.length ? '— hora —' : 'Sin horarios ese día' }),
      ...free.map((h) => el('option', { value: h, text: h })),
    );
    if (hora && free.includes(hora)) hourSel.value = hora;
  }
  dateIn.addEventListener('change', refresh);
  if (fecha) refresh();
  return { dateIn, hourSel, value: () => ({ fecha: dateIn.value, hora: hourSel.value }) };
}

async function advisorSelect(defaultUid) {
  const sel = el('select', { class: 'select' }, [el('option', { value: '', text: 'Cargando…' })]);
  const list = await fetchAdvisors();
  sel.replaceChildren(
    el('option', { value: '', text: '— asesor —' }),
    ...list.map((a) => el('option', { value: a.uid, text: a.nombre })),
  );
  const me = store.get().user;
  sel.value = (defaultUid && list.some((a) => a.uid === defaultUid)) ? defaultUid
    : (me && list.some((a) => a.uid === me.uid) ? me.uid : '');
  sel._advisors = list;
  return sel;
}

async function vehicleSelect(defaultId) {
  const sel = el('select', { class: 'select' }, [el('option', { value: SIN_VEHICULO, text: 'Sin vehículo asignado' })]);
  try {
    const list = await fetchAvailableVehicles();
    sel.append(...list.map((v) => el('option', { value: v.id, text: v.label })));
    if (defaultId) sel.value = defaultId;
    sel._vehicles = list;
  } catch (e) { sel._vehicles = []; }
  return sel;
}

function waLinkFor(sol, confirmUrl) {
  const raw = String(sol.whatsapp || sol.telefono || '').replace(/\D/g, '');
  if (!raw) return null;
  const digits = raw.length === 10 && raw.startsWith('3') ? '57' + raw
    : (raw.startsWith('57') ? raw : String(sol.prefijoPais || '57').replace(/\D/g, '') + raw);
  const msg = `Hola ${sol.nombre || ''}! Te escribo de ALTORRA CARS por tu cita del ${sol.fecha || ''} a las ${sol.hora || ''}`
    + (sol.vehiculo ? ` para ver el ${sol.vehiculo}` : '')
    + `. Confírmala aquí 👉 ${confirmUrl}`;
  return `https://wa.me/${digits}?text=${encodeURIComponent(msg)}`;
}

/* ════════════════ DETALLE + ACCIONES ════════════════ */

export async function openCitaDetail(ev, { onLead } = {}) {
  const solId = ev.sourceSolicitudId;
  if (!solId) return;
  if (store.get().mock) { toast('En demo las citas web no tienen acciones.', 'info'); return; }

  let sol;
  try { sol = await fetchSolicitud(solId); } catch (e) { sol = null; }
  if (!sol) { toast('No se pudo cargar la cita.', 'error'); return; }

  const canEdit = hasPermission('crm.edit');
  const activa = ACTIVAS.includes(sol.estado);
  const body = el('div', { class: 'nl-form' });
  const err = el('div', { class: 'login__error', role: 'alert', hidden: true });
  const fail = (m) => { err.textContent = m; err.hidden = false; };

  const { close } = modal('Cita · ' + (sol.nombre || 'Cliente'), ESTADO_LABEL[sol.estado] || sol.estado, [body]);

  function info() {
    return el('div', { class: 'cita-info' }, [
      row('Cuándo', (sol.fecha || '') + (sol.hora ? ' · ' + sol.hora : '')),
      row('Tipo', sol.tipo),
      row('Vehículo', sol.vehiculo),
      row('Teléfono', (sol.prefijoPais || '') + ' ' + (sol.whatsapp || sol.telefono || '')),
      row('Asesor', sol.assignedToName || sol.assignedTo),
      sol.confirmedAt ? row('Confirmó', (sol.confirmedVia || '') + ' · ' + String(sol.confirmedAt).slice(0, 16).replace('T', ' ')) : null,
      sol._tupleConflict ? el('div', { class: 'cita-conflict', text: '⚠️ El cliente confirmó pero el horario CHOCA con otra cita del asesor — reprograma una de las dos.' }) : null,
      sol._requiereReagendar ? el('div', { class: 'cita-conflict', text: '🚗 El carro de esta cita ya no está disponible — ofrece otro o reagenda.' }) : null,
      row('Notas', sol.comentarios || sol.mensaje),
    ]);
  }

  async function run(label, fn) {
    err.hidden = true;
    try {
      await fn();
      toast(label, 'ok');
      close();
      if (onLead && sol._leadId) onLead(sol._leadId);
    } catch (e) {
      fail((e && e.message) || 'No se pudo completar la acción.');
    }
  }

  async function renderMain() {
    body.replaceChildren(info(), err);
    if (!canEdit || !activa) {
      if (sol._leadId) {
        const ver = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: 'Ver cliente (360)' });
        ver.addEventListener('click', () => { close(); store.set({ detailLeadId: sol._leadId }); });
        body.append(ver);
      }
      return;
    }

    const acts = el('div', { class: 'cita-actions' });

    // 📲 WhatsApp con link tokenizado (canal primario, F18)
    const wa = el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: '📲 Pedir confirmación por WhatsApp' });
    wa.addEventListener('click', async () => {
      wa.disabled = true;
      try {
        const r = await citaAction('getConfirmLink', sol.id);
        const link = waLinkFor(sol, r.url);
        if (!link) { fail('La cita no tiene teléfono.'); wa.disabled = false; return; }
        window.open(link, '_blank', 'noopener');
        toast('Mensaje listo en WhatsApp — el cliente confirma tocando el link.', 'ok');
        wa.disabled = false;
      } catch (e) { fail((e && e.message) || 'No se pudo generar el link.'); wa.disabled = false; }
    });

    // ✓ Confirmar (tupla asesor+vehículo, C.2)
    const confirmBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '✓ Confirmar (asignar asesor)' });
    confirmBtn.addEventListener('click', async () => {
      body.replaceChildren(info(), err, el('p', { class: 'u-caption u-muted', text: 'Confirmar reserva el bloque del asesor (y del carro si aplica).' }));
      const aSel = await advisorSelect(sol.assignedTo);
      const vSel = await vehicleSelect(sol.vehicleAssignedId || sol.vehiculoId);
      const canal = el('select', { class: 'select' }, [
        el('option', { value: 'manual', text: 'El cliente confirmó (llamada/persona)' }),
        el('option', { value: 'whatsapp', text: 'El cliente confirmó por WhatsApp' }),
        el('option', { value: 'email', text: 'El cliente confirmó por email' }),
      ]);
      const ok = el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: '✓ Confirmar cita' });
      const back = el('button', { class: 'btn btn--ghost btn--sm', type: 'button', text: '‹ Volver' });
      back.addEventListener('click', renderMain);
      ok.addEventListener('click', () => {
        if (!aSel.value) { fail('Elige el asesor.'); return; }
        const aName = (aSel._advisors || []).find((x) => x.uid === aSel.value)?.nombre || null;
        const veh = (vSel._vehicles || []).find((x) => x.id === vSel.value);
        run('✅ Cita confirmada', () => citaAction('confirm', sol.id, {
          asesorId: aSel.value, asesorName: aName, canal: canal.value,
          vehicleId: vSel.value || null, vehicleName: veh ? veh.label : null,
        }));
      });
      body.append(
        el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Asesor *' }), aSel]),
        el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Vehículo' }), vSel]),
        el('label', { class: 'field' }, [el('span', { class: 'field__label', text: '¿Cómo confirmó?' }), canal]),
        el('div', { class: 'nl-actions' }, [back, ok]),
      );
    });

    // 🔁 Reprogramar (mueve cupo+tupla, rota token — C.4)
    const reschedBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '🔁 Reprogramar' });
    reschedBtn.addEventListener('click', async () => {
      body.replaceChildren(info(), err, el('p', { class: 'u-caption u-muted', text: 'Al reprogramar, el link viejo de confirmación deja de servir y el cliente debe re-confirmar.' }));
      const [av, booked] = await Promise.all([fetchAvailability(), fetchBookedSlots()]);
      const picker = slotPicker(av, booked, {});
      const ok = el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: '🔁 Mover cita' });
      const back = el('button', { class: 'btn btn--ghost btn--sm', type: 'button', text: '‹ Volver' });
      back.addEventListener('click', renderMain);
      ok.addEventListener('click', () => {
        const { fecha, hora } = picker.value();
        if (!fecha || !hora) { fail('Elige fecha y hora.'); return; }
        run('🔁 Cita reprogramada — pídele re-confirmar por WhatsApp', () => citaAction('reschedule', sol.id, { fecha, hora }));
      });
      body.append(
        el('div', { class: 'cfg-row' }, [picker.dateIn, picker.hourSel]),
        el('div', { class: 'nl-actions' }, [back, ok]),
      );
    });

    // ✖ Cancelar
    const cancelBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '✖ Cancelar cita' });
    cancelBtn.addEventListener('click', () => {
      body.replaceChildren(info(), err);
      const motivo = el('input', { class: 'input', type: 'text', placeholder: 'Motivo (le llega al cliente por email)' });
      const ok = el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: 'Confirmar cancelación' });
      const back = el('button', { class: 'btn btn--ghost btn--sm', type: 'button', text: '‹ Volver' });
      back.addEventListener('click', renderMain);
      ok.addEventListener('click', () => run('✖ Cita cancelada (cupo liberado)', () => citaAction('cancel', sol.id, { motivo: motivo.value.trim() })));
      body.append(motivo, el('div', { class: 'nl-actions' }, [back, ok]));
    });

    acts.append(wa, confirmBtn, reschedBtn, cancelBtn);

    // Para citas ya confirmadas: cerrar el ciclo del día.
    if (sol.estado !== 'pendiente') {
      const done = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '🏁 Completada' });
      done.addEventListener('click', () => run('🏁 Cita completada', () => citaAction('complete', sol.id)));
      const noShow = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '🚫 No asistió' });
      noShow.addEventListener('click', () => run('🚫 No-show registrado — mañana 9am te recuerda llamarlo', () => citaAction('no_show', sol.id)));
      acts.append(done, noShow);
    }

    if (sol._leadId) {
      const ver = el('button', { class: 'btn btn--ghost btn--sm', type: 'button', text: '👤 Ver cliente (360)' });
      ver.addEventListener('click', () => { close(); store.set({ detailLeadId: sol._leadId }); });
      acts.append(ver);
    }
    body.append(acts);
  }

  await renderMain();
}

/* ════════════════ CITA MANUAL (360/Agenda → callable create) ════════════════ */

export async function openCitaCreate(lead, { onDone } = {}) {
  if (store.get().mock) {
    const iso = new Date(Date.now() + 24 * 3600e3).toISOString();
    addMockAgenda({ type: 'cita', subject: 'Cita con ' + (lead.fullName || ''), dueAt: iso, relatedTo: { type: 'lead', id: lead.id, name: lead.fullName }, status: 'open' });
    toast('📅 Cita agendada (demo)', 'ok');
    return;
  }

  const err = el('div', { class: 'login__error', role: 'alert', hidden: true });
  const fail = (m) => { err.textContent = m; err.hidden = false; };
  const body = el('div', { class: 'nl-form' }, [
    el('p', { class: 'u-caption u-muted', text: 'La cita manual nace CONFIRMADA y reserva el bloque del asesor (y del carro). Necesitas señal.' }),
  ]);
  const { close } = modal('📅 Agendar cita', lead.fullName || 'Cliente', [body]);

  const [av, booked, aSel, vSel] = await Promise.all([
    fetchAvailability(), fetchBookedSlots(), advisorSelect(lead.ownerId), vehicleSelect(lead.vehicleOfInterestId),
  ]);
  const picker = slotPicker(av, booked, {});
  const tipo = el('select', { class: 'select' }, [
    el('option', { value: 'visita', text: 'Visita al concesionario' }),
    el('option', { value: 'test_drive', text: 'Test drive' }),
    el('option', { value: 'llamada', text: 'Llamada agendada' }),
  ]);
  const dur = el('select', { class: 'select' }, [
    el('option', { value: '30', text: '30 min' }),
    el('option', { value: '60', text: '1 hora', selected: '' }),
    el('option', { value: '90', text: '1h 30' }),
  ]);
  const nota = el('input', { class: 'input', type: 'text', placeholder: 'Nota (opcional)' });
  const ok = el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: '📅 Crear cita confirmada' });
  const cancel = el('button', { class: 'btn btn--ghost btn--sm', type: 'button', text: 'Cancelar' });
  cancel.addEventListener('click', close);

  ok.addEventListener('click', async () => {
    err.hidden = true;
    const { fecha, hora } = picker.value();
    if (!fecha || !hora) return fail('Elige fecha y hora.');
    if (!aSel.value) return fail('Elige el asesor que atiende.');
    ok.disabled = true; ok.textContent = 'Creando…';
    const aName = (aSel._advisors || []).find((x) => x.uid === aSel.value)?.nombre || null;
    const veh = (vSel._vehicles || []).find((x) => x.id === vSel.value);
    try {
      await citaAction('create', null, {
        leadId: lead.id || null, contactId: lead.contactId || null,
        nombre: lead.fullName || 'Cliente', telefono: lead.phone || null, email: lead.email || null,
        fecha, hora, duracionMin: parseInt(dur.value, 10) || 60,
        asesorId: aSel.value, asesorName: aName,
        vehicleId: vSel.value || null, vehicleName: veh ? veh.label : null,
        tipo: tipo.value, nota: nota.value.trim(),
      });
      toast('📅 Cita creada y confirmada — ya está en la Agenda', 'ok');
      close();
      if (onDone) onDone();
    } catch (e) {
      ok.disabled = false; ok.textContent = '📅 Crear cita confirmada';
      fail((e && e.message) || 'No se pudo crear la cita.');
    }
  });

  body.append(
    el('div', { class: 'cfg-row' }, [picker.dateIn, picker.hourSel]),
    el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Asesor *' }), aSel]),
    el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Vehículo' }), vSel]),
    el('div', { class: 'cfg-row' }, [tipo, dur]),
    nota, err,
    el('div', { class: 'nl-actions' }, [cancel, ok]),
  );
}
