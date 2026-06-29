// ============================================================
// confirm.js — diálogo de confirmación REUSABLE (TODO-52 P0-OWNER-DELETE).
// Reemplaza los confirm()/prompt() nativos (rompen dark-only, no testeables)
// y los modales .rev-modal inline duplicados. Promise-based:
//   const ok = await confirmDialog({ title, message, danger, typedConfirm });
//   if (ok) { ... }
// Variantes: `danger` (rojo, alertdialog) · `typedConfirm` (exige teclear una
// palabra antes de habilitar — para acciones destructivas/irreversibles).
// Premium: shadow-32 + blur + animación (lo que al .rev-modal le faltaba, A.1).
// ============================================================

import { el } from './dom.js';

/**
 * @param {Object} o
 * @param {string} o.title           Título (obligatorio).
 * @param {string} [o.message]       Cuerpo explicativo.
 * @param {string} [o.confirmText]   Texto del botón de confirmar.
 * @param {string} [o.cancelText]    Texto del botón de cancelar.
 * @param {boolean} [o.danger]       Estilo destructivo (rojo) + role alertdialog.
 * @param {string} [o.typedConfirm]  Si se pasa, exige teclear ESA palabra para habilitar.
 * @returns {Promise<boolean>}       true = confirmó · false = canceló/escape/backdrop.
 */
export function confirmDialog({
  title, message = '', confirmText = 'Confirmar', cancelText = 'Cancelar',
  danger = false, typedConfirm = null,
} = {}) {
  return new Promise((resolve) => {
    const confirmBtn = el('button', {
      class: 'btn ' + (danger ? 'btn--danger' : 'btn--gold'),
      type: 'button', text: confirmText, disabled: !!typedConfirm,
    });
    const cancelBtn = el('button', { class: 'btn btn--soft', type: 'button', text: cancelText });

    const body = [el('h3', { class: 'confirm__title', text: title })];
    if (message) body.push(el('p', { class: 'confirm__msg', text: message }));

    let typedInput = null;
    if (typedConfirm) {
      typedInput = el('input', {
        class: 'input', type: 'text', autocomplete: 'off', spellcheck: 'false',
        'aria-label': 'Escribe ' + typedConfirm + ' para confirmar',
      });
      typedInput.addEventListener('input', () => {
        confirmBtn.disabled = typedInput.value.trim() !== typedConfirm;
      });
      body.push(el('label', { class: 'confirm__typed' }, [
        el('span', { class: 'u-caption u-muted' }, ['Para confirmar, escribe ', el('strong', { text: typedConfirm })]),
        typedInput,
      ]));
    }
    body.push(el('div', { class: 'confirm__actions' }, [cancelBtn, confirmBtn]));

    const dialog = el('div', {
      class: 'confirm' + (danger ? ' confirm--danger' : ''),
      role: danger ? 'alertdialog' : 'dialog', 'aria-modal': 'true',
    }, body);
    const overlay = el('div', { class: 'confirm__overlay' }, [dialog]);

    let settled = false;
    const finish = (val) => {
      if (settled) return;
      settled = true;
      document.removeEventListener('keydown', onKey, true);
      overlay.remove();
      resolve(val);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') { e.preventDefault(); finish(false); }
      else if (e.key === 'Enter' && !confirmBtn.disabled) { e.preventDefault(); finish(true); }
    };

    cancelBtn.addEventListener('click', () => finish(false));
    confirmBtn.addEventListener('click', () => finish(true));
    overlay.addEventListener('click', (e) => { if (e.target === overlay) finish(false); });
    document.addEventListener('keydown', onKey, true);

    document.body.append(overlay);
    setTimeout(() => (typedInput || confirmBtn).focus(), 40);
  });
}
