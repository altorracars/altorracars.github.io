// ============================================================
// Formulario modal "Nuevo lead" — captura manual multi-canal.
// ============================================================

import { el, clear } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { MANUAL_CHANNELS, INTEREST_TYPES } from '../../domain/classify.js';
import { createManualLead } from './capture.data.js';
import { addMockLead } from '../../core/mock.js';

export function openNewLeadForm() {
  const f = {};
  const field = (label, control, hint) => el('label', { class: 'field' }, [
    el('span', { class: 'field__label', text: label }),
    control,
    hint ? el('span', { class: 'u-caption u-faint', text: hint }) : null,
  ]);

  f.nombre = el('input', { class: 'input', type: 'text', placeholder: 'Nombre del cliente', autocomplete: 'off' });
  f.prefijo = el('input', { class: 'input', type: 'text', value: '+57', style: { width: '72px' } });
  f.telefono = el('input', { class: 'input', type: 'tel', placeholder: '300 123 4567', autocomplete: 'off' });
  f.email = el('input', { class: 'input', type: 'email', placeholder: 'correo@ejemplo.com (opcional)', autocomplete: 'off' });

  f.canal = el('select', { class: 'select' }, MANUAL_CHANNELS.map((c) => el('option', { value: c.id }, [`${c.icon} ${c.label}`])));
  f.interes = el('select', { class: 'select' }, INTEREST_TYPES.map((t) => el('option', { value: t.id }, [t.label])));

  f.trafico = el('select', { class: 'select' }, [
    el('option', { value: '' }, ['— Tráfico —']),
    el('option', { value: 'organico' }, ['Orgánico']),
    el('option', { value: 'pauta' }, ['Pauta (pago)']),
  ]);
  f.campana = el('input', { class: 'input', type: 'text', placeholder: 'Campaña (opcional)', autocomplete: 'off' });
  f.vehiculo = el('input', { class: 'input', type: 'text', placeholder: 'Vehículo de interés (opcional)', autocomplete: 'off' });
  f.notas = el('textarea', { class: 'textarea', placeholder: 'Notas / contexto del lead', rows: '2' });
  f.consent = el('input', { type: 'checkbox', checked: true });

  const err = el('div', { class: 'login__error', role: 'alert', hidden: true });
  const cancel = el('button', { class: 'btn btn--ghost', type: 'button' }, ['Cancelar']);
  const save = el('button', { class: 'btn btn--gold', type: 'submit' }, ['Agregar lead']);

  const form = el('form', { class: 'nl-form' }, [
    field('Nombre *', f.nombre),
    el('div', { class: 'nl-row' }, [
      el('label', { class: 'field', style: { flex: '0 0 auto' } }, [el('span', { class: 'field__label', text: 'Prefijo' }), f.prefijo]),
      el('label', { class: 'field u-grow' }, [el('span', { class: 'field__label', text: 'Teléfono' }), f.telefono]),
    ]),
    field('Correo', f.email),
    el('div', { class: 'nl-row' }, [
      field('Canal *', f.canal),
      field('Interés', f.interes),
    ]),
    el('div', { class: 'nl-row' }, [
      field('Tráfico', f.trafico),
      field('Campaña', f.campana),
    ]),
    field('Vehículo de interés', f.vehiculo),
    field('Notas', f.notas),
    el('label', { class: 'nl-consent' }, [f.consent, el('span', { class: 'u-caption', text: 'El cliente autorizó el tratamiento de sus datos (Ley 1581 · Habeas Data).' })]),
    err,
    el('div', { class: 'nl-actions' }, [cancel, save]),
  ]);

  const card = el('div', { class: 'modal' }, [
    el('div', { class: 'modal__head' }, [
      el('h2', { class: 'modal__title', text: '＋ Nuevo lead' }),
      el('span', { class: 'u-caption u-faint', text: 'Captura manual (Meta, WhatsApp, TikTok, llamada, referido…)' }),
    ]),
    form,
  ]);
  const overlay = el('div', { class: 'modal-overlay' }, [card]);
  document.body.appendChild(overlay);
  setTimeout(() => f.nombre.focus(), 30);

  const close = () => { overlay.remove(); window.removeEventListener('keydown', onKey); };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  window.addEventListener('keydown', onKey);
  overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
  cancel.addEventListener('click', close);

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    err.hidden = true;
    const data = {
      nombre: f.nombre.value.trim(),
      email: f.email.value.trim(),
      telefono: f.telefono.value.trim(),
      prefijoPais: f.prefijo.value.trim() || '+57',
      canal: f.canal.value,
      interes: f.interes.value,
      vehiculoId: f.vehiculo.value.trim() || null,
      trafico: f.trafico.value || null,
      campana: f.campana.value.trim() || null,
      consentGiven: f.consent.checked,
      notas: f.notas.value.trim(),
    };
    if (!data.nombre) return fail('Escribe el nombre del cliente.');
    if (!data.email && !data.telefono) return fail('Necesitas al menos un correo o un teléfono (para no duplicar el contacto).');

    if (store.get().mock) {
      addMockLead(data);
      window.dispatchEvent(new CustomEvent('altorra:leads-dirty'));
      toast('✓ Lead agregado a la Bandeja', 'ok');
      close();
      return;
    }
    // OPTIMISTA (igual que ⚡ Lead rápido): NO esperamos el ack del servidor —
    // la persistencia local encola y sincroniza sola. Si el server RECHAZA, lo
    // decimos con su code (ya NO enmascaramos el error como un genérico).
    createManualLead(data).catch((e2) => {
      console.error('[new-lead] rechazo del servidor:', e2);
      toast('El lead "' + data.nombre + '" fue RECHAZADO al guardar: ' + (e2.code || e2.message), 'error');
    });
    toast(navigator.onLine
      ? '✓ Lead agregado — aparecerá en la Bandeja en segundos'
      : '📴 Guardado local — se enviará al volver la señal', 'ok');
    close();
  });

  function fail(msg) { err.textContent = msg; err.hidden = false; return false; }
}
