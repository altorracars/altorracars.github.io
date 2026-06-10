// ============================================================
// ⚡ Lead rápido (F36, ADR §178 E1a) — el WhatsApp entrante o el walk-in
// se registra en <30 segundos: nombre + teléfono + fuente, un tap.
// Escribe un DOC en `lead_intake` (no una callable): con la persistencia
// offline (F40a) el alta funciona SIN señal y sincroniza sola; el trigger
// onLeadIntakeCreated lo proyecta al canónico (dedup compartido).
// Owner = quien lo registra (las Rules lo fuerzan).
// ============================================================

import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../core/firebase.js';
import { el } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { addMockLead } from '../../core/mock.js';

const FUENTES = [
  { id: 'whatsapp', label: 'WhatsApp', icon: '💬' },
  { id: 'walkin', label: 'Walk-in', icon: '🚶' },
  { id: 'llamada', label: 'Llamada', icon: '📞' },
  { id: 'referido', label: 'Referido', icon: '🤝' },
];

// Guion de consentimiento verbal (UNA frase — el texto final lo valida P4/abogado).
const GUION_1581 = '“¿Me autorizas guardar tu nombre y teléfono para contactarte sobre vehículos? (Ley 1581)”';

export function openQuickLeadForm() {
  const state = { fuente: 'whatsapp', medio: 'organico' };
  const user = store.get().user || {};

  const nombre = el('input', { class: 'input', type: 'text', placeholder: 'Nombre', autocomplete: 'off' });
  const telefono = el('input', { class: 'input', type: 'tel', placeholder: '300 123 4567', autocomplete: 'off', inputmode: 'tel' });
  const nota = el('input', { class: 'input', type: 'text', placeholder: 'Nota corta (opcional): "busca SUV blanca"', autocomplete: 'off' });
  const consent = el('input', { type: 'checkbox' });

  const fuenteChips = el('div', { class: 'u-row', style: { flexWrap: 'wrap', gap: '6px' } });
  function renderFuentes() {
    fuenteChips.replaceChildren(...FUENTES.map((fu) => {
      const b = el('button', {
        class: 'chip' + (state.fuente === fu.id ? ' chip--active' : ''), type: 'button',
      }, [`${fu.icon} ${fu.label}`]);
      b.addEventListener('click', () => { state.fuente = fu.id; renderFuentes(); });
      return b;
    }));
  }
  renderFuentes();

  const medioBtn = el('button', { class: 'chip', type: 'button' }, ['Orgánico']);
  medioBtn.addEventListener('click', () => {
    state.medio = state.medio === 'organico' ? 'pauta' : 'organico';
    medioBtn.textContent = state.medio === 'organico' ? 'Orgánico' : 'Pauta (pago)';
  });

  const err = el('div', { class: 'login__error', role: 'alert', hidden: true });
  const cancel = el('button', { class: 'btn btn--ghost', type: 'button' }, ['Cancelar']);
  const save = el('button', { class: 'btn btn--gold', type: 'submit' }, ['⚡ Registrar']);

  const form = el('form', { class: 'nl-form' }, [
    el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Nombre *' }), nombre]),
    el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Teléfono / WhatsApp *' }), telefono]),
    el('div', { class: 'u-row', style: { gap: '8px', alignItems: 'center' } }, [fuenteChips, medioBtn]),
    el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Nota' }), nota]),
    el('label', { class: 'nl-consent' }, [
      consent,
      el('span', { class: 'u-caption' }, [
        'Leí el guion y el cliente AUTORIZÓ de palabra: ',
        el('em', { text: GUION_1581 }),
      ]),
    ]),
    err,
    el('div', { class: 'nl-actions' }, [cancel, save]),
  ]);

  const card = el('div', { class: 'modal' }, [
    el('div', { class: 'modal__head' }, [
      el('h2', { class: 'modal__title', text: '⚡ Lead rápido' }),
      el('span', { class: 'u-caption u-faint', text: navigator.onLine
        ? 'El WhatsApp entrante o el cliente del patio, registrado en 30 segundos.'
        : '📴 Sin señal: se guardará y sincronizará solo al volver la conexión.' }),
    ]),
    form,
  ]);
  const overlay = el('div', { class: 'modal-overlay' }, [card]);
  document.body.appendChild(overlay);
  setTimeout(() => nombre.focus(), 30);

  const close = () => { overlay.remove(); window.removeEventListener('keydown', onKey); };
  const onKey = (e) => { if (e.key === 'Escape') close(); };
  window.addEventListener('keydown', onKey);
  overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) close(); });
  cancel.addEventListener('click', close);

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    err.hidden = true;
    const data = {
      nombre: nombre.value.trim(),
      telefono: telefono.value.trim(),
      fuente: state.fuente,
      medio: state.medio,
      nota: nota.value.trim(),
      consentVerbal: consent.checked,
      ownerId: user.uid || null,
      ownerName: user.nombre || user.email || null,
      createdAt: new Date().toISOString(),
    };
    if (!data.nombre) return fail('Escribe el nombre.');
    if (!data.telefono || data.telefono.replace(/\D/g, '').length < 7) return fail('Escribe un teléfono válido.');
    if (!data.ownerId && !store.get().mock) return fail('Sesión sin usuario — recarga el portal.');

    if (store.get().mock) {
      addMockLead({ nombre: data.nombre, telefono: data.telefono, canal: data.fuente, trafico: data.medio, consentGiven: data.consentVerbal, notas: data.nota });
      window.dispatchEvent(new CustomEvent('altorra:leads-dirty'));
      toast('⚡ Lead registrado (mock)', 'ok');
      close();
      return;
    }

    // OPTIMISTA + offline-ready: NO esperamos el ack del servidor (sin señal
    // jamás llegaría) — la persistencia local encola y sincroniza sola.
    addDoc(collection(db, 'lead_intake'), data).catch((e2) => {
      console.error('[quick-lead] rechazo del servidor:', e2);
      toast('El lead "' + data.nombre + '" fue RECHAZADO al sincronizar: ' + (e2.code || e2.message), 'error');
    });
    toast(navigator.onLine
      ? '⚡ Lead registrado — aparecerá en la Bandeja en segundos'
      : '📴 Guardado local — se enviará al volver la señal', 'ok');
    close();
  });

  function fail(msg) { err.textContent = msg; err.hidden = false; return false; }
}
