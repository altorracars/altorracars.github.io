// ============================================================
// F12/F14 (ADR §185) — diálogo de EDICIÓN del contacto.
//  - Optimistic locking _version (las Rules lo exigen): si choca, recarga y
//    reintenta sola; solo si TU campo cambió en el server te pregunta.
//  - Colisión de email/teléfono contra el índice dedup → BLOQUEA y ofrece
//    "Fusionar contactos" (solo Super Admin) — jamás merge silencioso.
//  - Zona 🛡 Privacidad: supresión Ley 1581 (crm.delete, doble confirmación,
//    gracia de 72h reversible). Fuera del menú normal a propósito.
// ============================================================

import { el } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import {
  updateContact, checkDedupCollision, getContact,
  mergeContacts, suppressContact, cancelSuppression,
} from './contacts.data.js';

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
  return { close };
}

export function openContactEdit(contact, { onChanged } = {}) {
  if (!contact) { toast('El contacto aún no carga.', 'error'); return; }
  if (store.get().mock) { toast('En demo no se edita el directorio.', 'info'); return; }
  if (contact._mergedInto) { toast('Este contacto está fusionado en otro.', 'info'); return; }

  const body = el('div', { class: 'nl-form' });
  const err = el('div', { class: 'login__error', role: 'alert', hidden: true });
  const fail = (m) => { err.textContent = m; err.hidden = false; };
  const { close } = modal('✏️ Editar contacto', contact.fullName || '', [body]);

  const pendiente = contact.suppressionStatus === 'pendiente_supresion';
  const nombre = el('input', { class: 'input', type: 'text', value: contact.fullName || '', maxlength: '80' });
  const email = el('input', { class: 'input', type: 'email', value: contact.email || '', placeholder: 'correo@ejemplo.com' });
  const tel = el('input', { class: 'input', type: 'tel', value: contact.phone || '', placeholder: '+57 300 000 0000' });
  const save = el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: 'Guardar cambios' });
  const cancel = el('button', { class: 'btn btn--ghost btn--sm', type: 'button', text: 'Cancelar' });
  cancel.addEventListener('click', close);

  async function doSave(force) {
    err.hidden = true;
    const patch = {};
    if (nombre.value.trim() !== (contact.fullName || '')) patch.fullName = nombre.value.trim();
    if (email.value.trim().toLowerCase() !== (contact.email || '')) patch.email = email.value.trim().toLowerCase() || null;
    if (tel.value.trim() !== (contact.phone || '')) patch.phone = tel.value.trim() || null;
    if (!Object.keys(patch).length) { close(); return; }

    save.disabled = true; save.textContent = 'Guardando…';
    try {
      // Colisión dedup ANTES de escribir (F12 d).
      if (patch.email !== undefined || patch.phone !== undefined) {
        const col = await checkDedupCollision(
          { email: patch.email !== undefined ? patch.email : contact.email,
            phone: patch.phone !== undefined ? patch.phone : contact.phone },
          contact.id,
        );
        if (col) {
          save.disabled = false; save.textContent = 'Guardar cambios';
          return offerMerge(col);
        }
      }
      await updateContact(contact.id, patch, force || contact);
      toast('✓ Contacto actualizado', 'ok');
      close();
      if (onChanged) onChanged();
    } catch (e) {
      save.disabled = false; save.textContent = 'Guardar cambios';
      if (e && e.code === 'conflict' && e.fresh) {
        // El MISMO campo cambió en el server mientras editabas (comité c).
        fail('Alguien actualizó este contacto mientras editabas. Valores actuales: '
          + (e.fresh.fullName || '—') + ' · ' + (e.fresh.email || 'sin email') + ' · ' + (e.fresh.phone || 'sin tel')
          + '. Pulsa "Guardar" de nuevo para PISAR con lo tuyo, o Cancelar para conservar lo del server.');
        save.disabled = false;
        save.onclick = () => doSave(e.fresh); // segundo intento explícito = decisión humana
        return;
      }
      fail((e && e.message) || 'No se pudo guardar.');
    }
  }
  save.addEventListener('click', () => doSave(null));

  async function offerMerge(col) {
    const other = await getContact(col.contactId).catch(() => null);
    const quien = other ? (other.fullName || col.contactId) : col.contactId;
    if (!hasPermission('*')) {
      fail('Ese email/teléfono YA pertenece a otro contacto (' + quien + '). Pídele al Super Admin fusionarlos — no se crean duplicados.');
      return;
    }
    body.replaceChildren(
      el('p', {}, ['Ese dato ya pertenece a ', el('strong', { text: quien }), '. Son la misma persona → fusiónalos. Elige quién SOBREVIVE (el otro queda como histórico apuntando aquí):']),
      err,
    );
    const mkBtn = (label, survivorId, mergedId) => {
      const b = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: label });
      b.addEventListener('click', async () => {
        if (!confirm('¿Fusionar definitivamente? Re-apunta leads, negocios y notas. No se puede deshacer.')) return;
        b.disabled = true;
        try {
          const r = await mergeContacts(survivorId, mergedId);
          toast(`🔗 Fusionados: ${r.counts ? r.counts.leads : 0} lead(s), ${r.counts ? r.counts.deals : 0} negocio(s)`, 'ok');
          close();
          if (onChanged) onChanged();
        } catch (e) { b.disabled = false; fail((e && e.message) || 'No se pudo fusionar.'); }
      });
      return b;
    };
    body.append(el('div', { class: 'cita-actions' }, [
      mkBtn('Sobrevive ESTE (' + (contact.fullName || 'actual') + ')', contact.id, col.contactId),
      mkBtn('Sobrevive el OTRO (' + quien + ')', col.contactId, contact.id),
      el('button', { class: 'btn btn--ghost btn--sm', type: 'button', text: 'Cancelar', onclick: close }),
    ]));
  }

  /* ── 🛡 Privacidad (Ley 1581) — fuera del menú normal ── */
  function privacyZone() {
    if (!hasPermission('crm.delete')) return null;
    const zone = el('div', { class: 'cfg-card', style: { borderColor: 'var(--danger, #e5484d)' } });
    zone.append(el('h3', { class: 'cfg-card__title', text: '🛡 Privacidad (Ley 1581)' }));
    if (pendiente) {
      zone.append(
        el('p', { class: 'u-caption', text: '⏳ Supresión programada: se ejecuta el '
          + String(contact.suppressionExecuteAfter || '').slice(0, 16).replace('T', ' ')
          + '. Hasta entonces es reversible.' }),
      );
      const cancelBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '↩️ Cancelar supresión' });
      cancelBtn.addEventListener('click', async () => {
        cancelBtn.disabled = true;
        try {
          const r = await cancelSuppression(contact.id);
          toast(r.duplicates && r.duplicates.length
            ? '↩️ Supresión cancelada — OJO: nació un duplicado durante la espera, fusiónalos.'
            : '↩️ Supresión cancelada', 'ok');
          close(); if (onChanged) onChanged();
        } catch (e) { cancelBtn.disabled = false; fail((e && e.message) || 'No se pudo cancelar.'); }
      });
      zone.append(cancelBtn);
    } else {
      zone.append(el('p', { class: 'u-caption u-muted', text: 'Derecho de supresión: borra los datos personales (nombre, contacto, notas) de forma DEFINITIVA tras 72h de gracia. El historial comercial (montos, fechas, carro) se conserva anónimo. Las copias ya enviadas por Telegram/email quedan fuera del alcance técnico.' }));
      const supBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '🗑 Solicitar supresión definitiva…' });
      supBtn.addEventListener('click', async () => {
        const typed = prompt('DOBLE CONFIRMACIÓN: escribe SUPRIMIR para programar el borrado de datos personales de '
          + (contact.fullName || 'este contacto') + ' (72h de gracia, reversible hasta entonces).');
        if (typed !== 'SUPRIMIR') { if (typed !== null) toast('Texto incorrecto — no se hizo nada.', 'info'); return; }
        supBtn.disabled = true;
        try {
          const r = await suppressContact(contact.id);
          toast('🛡 Supresión programada para ' + String(r.executeAfter || '').slice(0, 16).replace('T', ' '), 'ok');
          close(); if (onChanged) onChanged();
        } catch (e) { supBtn.disabled = false; fail((e && e.message) || 'No se pudo programar.'); }
      });
      zone.append(supBtn);
    }
    return zone;
  }

  if (pendiente) {
    body.append(
      el('p', { class: 'cita-conflict', text: '⏳ Este contacto tiene una supresión Ley 1581 programada — no se puede editar (cancélala primero si fue un error).' }),
      err, privacyZone(),
      el('div', { class: 'nl-actions' }, [cancel]),
    );
  } else {
    body.append(
      el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Nombre' }), nombre]),
      el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Email' }), email]),
      el('label', { class: 'field' }, [el('span', { class: 'field__label', text: 'Teléfono' }), tel]),
      err,
      el('div', { class: 'nl-actions' }, [cancel, save]),
      privacyZone(),
    );
  }
}
