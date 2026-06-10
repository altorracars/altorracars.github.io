// ============================================================
// F7 (ADR §181) — Diálogo CANÓNICO "Calificar → crear negocio".
// La acción más importante del CRM, en <45s (umbral F39, medido F33a):
//   1. VEHÍCULO del inventario (o "sin vehículo aún" EXPLÍCITO — F24)
//   2. VALOR estimado OBLIGATORIO (prellenado del precio → F41: la plata
//      del pipeline) 3. OWNER (default = el del lead) 4. nota opcional.
// Checklist de calificación VISIBLE (informativa, no muro). Al crear:
// snackbar "Deshacer" → callable anularConversion (compensatoria, server).
// ============================================================

import { el } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { frictionTrack } from '../../core/friction.js';
import { createDealFromLead, anularConversion, fetchAvailableVehicles } from '../deals/deals.data.js';
import { dealFromLead } from '../../domain/pipeline.js';
import { addMockDeal } from '../../core/mock.js';

const SIN_VEHICULO = '__sin_vehiculo__';

export function openConvertDialog(lead, { onDone } = {}) {
  const t0 = performance.now();
  const team = store.get().team || [];

  const vehSelect = el('select', { class: 'select' }, [
    el('option', { value: '' }, ['Cargando inventario…']),
  ]);
  const amount = el('input', { class: 'input', type: 'number', min: '0', step: '100000', placeholder: 'Valor estimado (COP) *' });
  const ownerSelect = el('select', { class: 'select' },
    team.length
      ? team.map((m) => el('option', { value: m.uid, selected: m.uid === lead.ownerId ? '' : undefined }, [m.nombre]))
      : [el('option', { value: lead.ownerId || '' }, [lead.ownerName || 'Yo'])]);
  const nota = el('input', { class: 'input', type: 'text', placeholder: 'Nota de contexto (opcional)' });

  const err = el('div', { class: 'login__error', role: 'alert', hidden: true });
  const cancel = el('button', { class: 'btn btn--ghost', type: 'button' }, ['Cancelar']);
  const save = el('button', { class: 'btn btn--gold', type: 'submit' }, ['🎯 Crear negocio']);

  const form = el('form', { class: 'nl-form' }, [
    el('p', { class: 'u-caption u-muted', style: { margin: '0' } }, [
      '✓ Hablaste con él · ✓ tiene presupuesto o forma de pago en mente · ✓ busca un carro concreto o una categoría',
    ]),
    el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Vehículo *' }), vehSelect]),
    el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Valor estimado (COP) *' }), amount]),
    el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Asesor responsable *' }), ownerSelect]),
    el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Nota' }), nota]),
    err,
    el('div', { class: 'nl-actions' }, [cancel, save]),
  ]);

  const card = el('div', { class: 'modal' }, [
    el('div', { class: 'modal__head' }, [
      el('h2', { class: 'modal__title', text: 'Calificar → crear negocio' }),
      el('span', { class: 'u-caption u-faint', text: (lead.fullName || 'Cliente') + ' pasa al Pipeline; el lead queda congelado como histórico.' }),
    ]),
    form,
  ]);
  const overlay = el('div', { class: 'modal-overlay' }, [card]);
  document.body.appendChild(overlay);

  const close = () => { overlay.remove(); window.removeEventListener('keydown', onKey); };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  window.addEventListener('keydown', onKey);
  overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
  cancel.addEventListener('click', close);

  // Inventario: prellenar el valor con el precio del vehículo elegido.
  let vehicles = [];
  (store.get().mock ? Promise.resolve([]) : fetchAvailableVehicles()).then((list) => {
    vehicles = list;
    vehSelect.replaceChildren(
      el('option', { value: '' }, ['— Elige un vehículo —']),
      ...list.map((v) => el('option', { value: v.id }, [v.label + (v.precio ? ' · $' + v.precio.toLocaleString('es-CO') : '')])),
      el('option', { value: SIN_VEHICULO }, ['Sin vehículo aún (buscando / retoma)']),
    );
  }).catch(() => {
    vehSelect.replaceChildren(
      el('option', { value: SIN_VEHICULO }, ['Sin vehículo aún']),
    );
  });
  vehSelect.addEventListener('change', () => {
    const v = vehicles.find((x) => x.id === vehSelect.value);
    if (v && v.precio && !amount.value) amount.value = String(v.precio);
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    err.hidden = true;
    const vehId = vehSelect.value;
    const amt = Math.round(Number(amount.value) || 0);
    if (!vehId) return fail('Elige un vehículo o marca "Sin vehículo aún".');
    if (!(amt > 0)) return fail('El valor estimado es obligatorio (alimenta el pronóstico).');
    const ownerId = ownerSelect.value || lead.ownerId;
    if (!ownerId) return fail('El negocio necesita un asesor responsable.');
    const ownerName = team.find((m) => m.uid === ownerId)?.nombre || lead.ownerName || null;
    const veh = vehicles.find((x) => x.id === vehId);
    const extras = {
      vehicleId: vehId === SIN_VEHICULO ? null : vehId,
      vehicleName: veh ? veh.label : '',
      amount: amt, ownerId, ownerName, nota: nota.value.trim(),
    };

    save.disabled = true; save.textContent = 'Creando…';
    try {
      if (store.get().mock) {
        addMockDeal(dealFromLead(lead, extras));
        toast('🎯 Negocio creado (mock)', 'ok');
        frictionTrack('conversion', t0, { mock: true });
        close(); if (onDone) onDone({ mock: true });
        return;
      }
      const dealId = await createDealFromLead(lead, extras);
      frictionTrack('conversion', t0, {});
      close();
      showUndoSnackbar(dealId, lead);
      if (onDone) onDone({ dealId });
    } catch (e2) {
      save.disabled = false; save.textContent = '🎯 Crear negocio';
      fail(e2 && e2.code === 'permission-denied'
        ? 'Recarga el portal: tu versión está desactualizada.'
        : 'No se pudo crear el negocio. Intenta de nuevo.');
    }
  });

  function fail(msg) { err.textContent = msg; err.hidden = false; return false; }
}

/** Snackbar 10s con Deshacer → anulación compensatoria server-side (F7). */
function showUndoSnackbar(dealId, lead) {
  const undo = el('button', { class: 'btn btn--soft btn--sm', type: 'button' }, ['Deshacer']);
  const bar = el('div', {
    role: 'status',
    style: {
      position: 'fixed', bottom: '18px', left: '50%', transform: 'translateX(-50%)',
      display: 'flex', gap: '12px', alignItems: 'center', zIndex: '99',
      padding: '10px 14px', borderRadius: '10px',
      background: 'var(--bg-elev, #1c1a17)', border: '1px solid var(--line, #444)',
      boxShadow: '0 6px 24px rgba(0,0,0,.4)',
    },
  }, [
    el('span', { text: `🎯 Negocio creado para ${(lead.fullName || 'el cliente').split(/\s+/)[0]}` }),
    undo,
  ]);
  document.body.appendChild(bar);
  const timer = setTimeout(() => bar.remove(), 10000);
  undo.addEventListener('click', async () => {
    clearTimeout(timer);
    undo.disabled = true; undo.textContent = 'Anulando…';
    try {
      await anularConversion(dealId);
      toast('↩ Conversión anulada — el lead volvió a la Bandeja', 'ok');
    } catch (e) {
      toast('No se pudo anular: ' + ((e && e.message) || ''), 'error');
    }
    bar.remove();
  });
}
