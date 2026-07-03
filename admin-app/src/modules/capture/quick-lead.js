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
import { icon, uIco } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { friendlyError } from '../../core/errors.js';
import { addMockLead } from '../../core/mock.js';
import { frictionTrack } from '../../core/friction.js';

const FUENTES = [
  { id: 'whatsapp', label: 'WhatsApp', iconId: 'whatsapp' },
  { id: 'walkin', label: 'Walk-in', iconId: 'user' },
  { id: 'llamada', label: 'Llamada', iconId: 'phone' },
  { id: 'referido', label: 'Referido', iconId: 'users' },
];

// Guion de consentimiento verbal (UNA frase — el texto final lo valida P4/abogado).
const GUION_1581 = '“¿Me autorizas guardar tu nombre y teléfono para contactarte sobre vehículos? (Ley 1581)”';

export function openQuickLeadForm() {
  const t0 = performance.now(); // F33a: umbral F39 = lead rápido <30s
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
        class: 'chip u-ico-text' + (state.fuente === fu.id ? ' chip--active' : ''), type: 'button',
      }, [uIco(fu.iconId), fu.label]);
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
  const save = el('button', { class: 'btn btn--gold', type: 'submit', html: icon('zap') + ' Registrar' });

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
      el('h2', { class: 'modal__title u-ico-text', html: icon('zap') + 'Lead rápido' }),
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

  form.addEventListener('submit', async (e) => {
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

    // OLA-0.3 P0-CAPTURE: con señal, ACK-FIRST — se espera la confirmación del server
    // con el modal ABIERTO; si rechaza, el asesor lo VE con el form INTACTO (cero
    // pérdida silenciosa). Optimista SOLO offline (la persistencia local encola).
    if (navigator.onLine) {
      save.disabled = true;
      save.textContent = 'Guardando…';
      try {
        await addDoc(collection(db, 'lead_intake'), data);
        toast('⚡ Lead registrado — aparecerá en la Bandeja en segundos', 'ok');
        frictionTrack('lead_rapido', t0, { fuente: state.fuente, online: true });
        close();
      } catch (e2) {
        console.error('[quick-lead] rechazo del servidor:', e2);
        save.disabled = false;
        save.replaceChildren(el('span', { class: 'u-ico-text', html: icon('zap') + ' Registrar' }));
        fail(friendlyError(e2, 'No se pudo registrar el lead.') + ' Tus datos siguen aquí — corrige y vuelve a intentar.');
      }
      return;
    }
    addDoc(collection(db, 'lead_intake'), data).catch((e2) => {
      console.error('[quick-lead] rechazo del servidor (offline-sync):', e2);
      toast('El lead "' + data.nombre + '" no se pudo sincronizar. ' + friendlyError(e2, ''), 'error');
    });
    toast('Sin señal: guardado local — se enviará al volver la conexión', 'ok');
    frictionTrack('lead_rapido', t0, { fuente: state.fuente, online: false });
    close();
  });

  function fail(msg) { err.textContent = msg; err.hidden = false; return false; }
}
