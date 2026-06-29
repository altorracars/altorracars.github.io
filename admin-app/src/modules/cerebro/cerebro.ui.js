// ============================================================
// Cerebro AI / Knowledge Base (PLAN-UNIFICADO F-4 2/3, gap §2.B) — UI.
// GESTIÓN de las FAQs que el bot consulta: lista + modal crear/editar +
// toggle activa/pausada + borrar + bootstrap de 25 FAQs base. Reusa el modal
// `.rev-modal*`. RBAC: read=kb.read · create=kb.create · edit=kb.edit ·
// delete=kb.delete · bootstrap=kb.bootstrap (UI alineada a firestore.rules).
//
// Handoff F-4: si Unmatched promovió una query ("Crear FAQ"), llega vía
// store.kbPrefill → abre el form prellenado y, al guardar, marca la unmatched
// query como promovida (markPromoted). La config del brain/LLM se difiere.
// ⟦OPUS-4.8 · rev-Fable⟧
// ============================================================

import { el, clear } from '../../core/dom.js';
import { confirmDialog } from '../../core/confirm.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { navigate } from '../../core/router.js';
import { hasPermission } from '../../core/auth.js';
import { writeAudit } from '../../core/audit.js';
import { friendlyError } from '../../core/errors.js';
import {
  CATEGORIES, subscribeFaqs, createFaq, updateFaq, deleteFaq, toggleFaq, bootstrapFaqs, MOCK_FAQS,
} from './cerebro.data.js';
import { markPromoted } from '../unmatched/unmatched.data.js';

const CAT_LABEL = {
  general: 'General', financiacion: 'Financiación', inventario: 'Inventario',
  politica: 'Políticas', horarios: 'Horarios', ubicacion: 'Ubicación', consignacion: 'Consignación',
};
const catLabel = (c) => CAT_LABEL[c] || c || 'General';

export function mountCerebro(root) {
  const ui = { faqs: [], loaded: false, sub: null, search: '' };
  const canRead = hasPermission('kb.read');
  const canCreate = hasPermission('kb.create');
  const canEdit = hasPermission('kb.edit');
  const canDelete = hasPermission('kb.delete');
  const canBootstrap = hasPermission('kb.bootstrap');
  const uid = (store.get().user && store.get().user.uid) || 'unknown';

  const wrap = el('section', { class: 'kb' });
  clear(root); root.append(wrap);

  if (!canRead) {
    wrap.append(el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', text: '🔒' }),
      el('div', { class: 'state__title', text: 'Sin permiso' }),
      el('div', { class: 'state__msg', text: 'Necesitas el permiso kb.read para ver el Cerebro AI.' }),
    ]));
    return function cleanup() {};
  }

  /* ── Modal crear/editar ──────────────────────────────────── */
  // promotedFrom: {unmatchedId} cuando la FAQ nace de "Lo que no entendí".
  function openModal(faq, promotedFrom) {
    const isEdit = !!(faq && faq._docId);
    if (isEdit ? !canEdit : !canCreate) { toast(`Necesitas kb.${isEdit ? 'edit' : 'create'} para esto.`, 'error'); return; }
    const e = faq || {};

    const qIn = el('input', { class: 'input', type: 'text', maxlength: '200', placeholder: '¿Cuál es el horario de atención?', value: e.question || '' });
    const aIn = el('textarea', { class: 'textarea', rows: '4', maxlength: '1200', placeholder: 'Lo que el bot le dirá al cliente' });
    aIn.value = e.answer || '';
    const catSel = el('select', { class: 'input' }, CATEGORIES.map((c) => {
      const o = el('option', { value: c, text: catLabel(c) }); if (e.category === c) o.selected = true; return o;
    }));
    const prioIn = el('input', { class: 'input', type: 'number', min: '1', max: '100', value: String(e.priority || 50) });
    const kwIn = el('input', { class: 'input', type: 'text', placeholder: 'horario, abren, cuándo, atención', value: (e.keywords || []).join(', ') });

    const field = (label, input, hint) => el('label', { class: 'field' }, [
      el('span', { class: 'field__label', text: label }), input,
      hint ? el('span', { class: 'u-caption u-faint', text: hint }) : null,
    ]);
    const saveBtn = el('button', { class: 'btn btn--gold', type: 'button', text: isEdit ? 'Guardar cambios' : 'Crear FAQ' });
    const cancelBtn = el('button', { class: 'btn btn--soft', type: 'button', text: 'Cancelar' });

    const overlay = el('div', { class: 'rev-modal__overlay' }, [
      el('div', { class: 'rev-modal', role: 'dialog', 'aria-modal': 'true' }, [
        el('h3', { class: 'rev-modal__title', text: isEdit ? 'Editar FAQ' : (promotedFrom ? 'Crear FAQ (desde "Lo que no entendí")' : 'Nueva FAQ') }),
        field('Pregunta / tema *', qIn),
        field('Respuesta del bot *', aIn),
        el('div', { class: 'kb-grid2' }, [field('Categoría', catSel), field('Prioridad (1-100)', prioIn)]),
        field('Palabras clave (separadas por coma)', kwIn, 'El bot las usa para hacer match contra el mensaje del cliente.'),
        el('div', { class: 'rev-modal__actions' }, [cancelBtn, saveBtn]),
      ]),
    ]);
    const close = () => overlay.remove();
    cancelBtn.addEventListener('click', close);
    overlay.addEventListener('click', (ev) => { if (ev.target === overlay) close(); });

    saveBtn.addEventListener('click', async () => {
      const question = qIn.value.trim();
      const answer = aIn.value.trim();
      if (!question || !answer) { toast('Pregunta y respuesta son obligatorias.', 'error'); return; }
      const prioRaw = parseInt(prioIn.value, 10);
      const keywords = kwIn.value.split(',').map((k) => k.trim()).filter(Boolean);
      const nowIso = new Date().toISOString();
      const data = {
        question, answer, category: catSel.value || 'general', keywords,
        priority: Number.isNaN(prioRaw) ? 50 : Math.max(1, Math.min(100, prioRaw)),
        enabled: isEdit ? (e.enabled !== false) : true,
        updatedAt: nowIso, updatedBy: uid,
      };

      if (store.get().mock) {
        if (isEdit) { const i = ui.faqs.findIndex((f) => f._docId === e._docId); if (i >= 0) ui.faqs[i] = { ...ui.faqs[i], ...data }; }
        else ui.faqs.unshift({ _docId: 'mock_' + Date.now(), usageCount: 0, ...data });
        render(); close(); toast(isEdit ? 'FAQ actualizada (demo)' : 'FAQ creada (demo)', 'ok');
        if (promotedFrom) toast('Query marcada como promovida (demo)', 'ok');
        return;
      }

      saveBtn.disabled = true; saveBtn.textContent = 'Guardando…';
      try {
        let faqId = e._docId;
        if (isEdit) {
          await updateFaq(e._docId, data);
          writeAudit('kb_update', 'FAQ ' + question.slice(0, 40), '');
        } else {
          faqId = await createFaq({ ...data, usageCount: 0, createdAt: nowIso, createdBy: uid });
          writeAudit('kb_create', 'FAQ ' + question.slice(0, 40), promotedFrom ? 'desde unmatched' : '');
        }
        // Handoff: marca la unmatched query como promovida.
        if (promotedFrom && promotedFrom.unmatchedId) {
          markPromoted(promotedFrom.unmatchedId, faqId).catch(() => {});
        }
        close(); toast(isEdit ? '✓ FAQ actualizada' : '✓ FAQ creada', 'ok');
      } catch (err) {
        saveBtn.disabled = false; saveBtn.textContent = isEdit ? 'Guardar cambios' : 'Crear FAQ';
        toast('No se pudo guardar: ' + friendlyError(err), 'error');
      }
    });

    document.body.append(overlay);
    aIn.focus();
  }

  /* ── Acciones ────────────────────────────────────────────── */
  async function doDelete(f) {
    if (!canDelete) { toast('Necesitas kb.delete para eliminar.', 'error'); return; }
    if (!await confirmDialog({
      title: '¿Eliminar esta FAQ?',
      message: `El bot dejará de usarla.\n\n"${(f.question || '').slice(0, 120)}"`,
      confirmText: 'Eliminar', danger: true,
    })) return;
    if (store.get().mock) { ui.faqs = ui.faqs.filter((x) => x._docId !== f._docId); render(); toast('FAQ eliminada (demo)', 'ok'); return; }
    try { await deleteFaq(f._docId); writeAudit('kb_delete', 'FAQ ' + (f.question || '').slice(0, 40), ''); toast('✓ FAQ eliminada', 'ok'); }
    catch (err) { toast('No se pudo eliminar: ' + friendlyError(err), 'error'); }
  }

  async function doToggle(f, enabled) {
    if (!canEdit) { toast('Necesitas kb.edit para esto.', 'error'); return; }
    if (store.get().mock) { const i = ui.faqs.findIndex((x) => x._docId === f._docId); if (i >= 0) ui.faqs[i] = { ...ui.faqs[i], enabled }; render(); return; }
    try { await toggleFaq(f._docId, enabled); }
    catch (err) { toast('No se pudo cambiar el estado', 'error'); render(); }
  }

  async function doBootstrap() {
    if (!canBootstrap) { toast('Solo super admin puede sembrar la KB.', 'error'); return; }
    if (!await confirmDialog({
      title: 'Sembrar FAQs base',
      message: 'Se crearán las FAQs profesionales base que falten (las existentes NO se duplican).',
      confirmText: 'Crear FAQs base',
    })) return;
    if (store.get().mock) { toast('Bootstrap no disponible en modo demo.', 'info'); return; }
    try {
      const n = await bootstrapFaqs(ui.faqs, uid);
      writeAudit('kb_bootstrap', `${n} FAQs base`, '');
      toast(n ? `✓ ${n} FAQs base sembradas` : 'Las FAQs base ya estaban sembradas', n ? 'ok' : 'info');
    } catch (err) { toast('No se pudo sembrar: ' + friendlyError(err), 'error'); }
  }

  /* ── Tarjeta ─────────────────────────────────────────────── */
  function card(f) {
    const disabled = f.enabled === false;
    const actions = el('div', { class: 'kb-card__actions' });
    if (canEdit) {
      const tgl = el('input', { type: 'checkbox' }); tgl.checked = !disabled;
      tgl.addEventListener('change', () => doToggle(f, tgl.checked));
      actions.append(el('label', { class: 'kb-toggle u-caption' }, [tgl, el('span', { text: disabled ? 'Pausada' : 'Activa' })]));
      const editBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '✏️ Editar' });
      editBtn.addEventListener('click', () => openModal(f)); actions.append(editBtn);
    }
    if (canDelete) {
      const delBtn = el('button', { class: 'btn btn--danger btn--sm', type: 'button', text: '🗑' });
      delBtn.addEventListener('click', () => doDelete(f)); actions.append(delBtn);
    }
    const kws = (f.keywords && f.keywords.length)
      ? el('div', { class: 'kb-card__kws' }, f.keywords.map((k) => el('span', { class: 'kb-kw', text: k }))) : null;
    return el('article', { class: 'kb-card' + (disabled ? ' is-disabled' : '') }, [
      el('div', { class: 'kb-card__head' }, [
        el('div', { class: 'u-grow' }, [
          el('div', { class: 'kb-card__q', text: f.question || '(sin pregunta)' }),
          el('div', { class: 'kb-card__meta u-caption u-faint' }, [
            el('span', { class: 'badge', text: catLabel(f.category) }),
            el('span', { text: ` · prioridad ${f.priority || 50}` }),
            f.usageCount ? el('span', { text: ` · usada ${f.usageCount}×` }) : null,
          ]),
        ]),
        actions,
      ]),
      el('p', { class: 'kb-card__a u-muted', text: f.answer || '' }),
      kws,
    ]);
  }

  /* ── Toolbar + lista ─────────────────────────────────────── */
  const countEl = el('span', { class: 'u-caption u-faint' });
  const searchInput = el('input', { type: 'search', placeholder: 'Buscar pregunta, respuesta o keyword…', 'aria-label': 'Buscar FAQs' });
  let searchTimer = null;
  searchInput.addEventListener('input', () => { clearTimeout(searchTimer); searchTimer = setTimeout(() => { ui.search = searchInput.value; render(); }, 180); });
  const search = el('div', { class: 'search' }, [el('span', { 'aria-hidden': 'true', text: '🔎' }), searchInput]);
  const newBtn = canCreate ? el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: '＋ Nueva FAQ' }) : null;
  if (newBtn) newBtn.addEventListener('click', () => openModal(null));
  const seedBtn = canBootstrap ? el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '🌱 Sembrar 25 base' }) : null;
  if (seedBtn) seedBtn.addEventListener('click', doBootstrap);

  wrap.append(
    el('div', { class: 'kb-toolbar' }, [search, el('div', { class: 'u-row u-row--tight' }, [countEl, seedBtn, newBtn])]),
    el('div', { class: 'kb-host' }),
  );
  const host = wrap.querySelector('.kb-host');

  function filtered() {
    const q = ui.search.trim().toLowerCase();
    if (!q) return ui.faqs;
    return ui.faqs.filter((f) => (`${f.question || ''} ${f.answer || ''} ${(f.keywords || []).join(' ')}`).toLowerCase().includes(q));
  }

  function render() {
    if (!ui.loaded) { clear(host); host.append(el('div', { class: 'state' }, [el('div', { class: 'state__msg', text: 'Cargando Cerebro AI…' })])); return; }
    const list = filtered();
    countEl.textContent = ui.search.trim() ? `${list.length} de ${ui.faqs.length}` : `${ui.faqs.length} FAQ${ui.faqs.length === 1 ? '' : 's'}`;
    clear(host);
    if (!ui.faqs.length) {
      host.append(el('div', { class: 'state' }, [
        el('div', { class: 'state__icon', text: '🧠' }),
        el('div', { class: 'state__title', text: 'El Cerebro está vacío' }),
        el('div', { class: 'state__msg', text: canBootstrap ? 'Siembra las 25 FAQs base con 🌱, o crea la primera con ＋ Nueva FAQ.' : (canCreate ? 'Crea la primera FAQ con ＋ Nueva FAQ.' : 'Aún no hay FAQs.') }),
      ]));
      return;
    }
    if (!list.length) { host.append(el('div', { class: 'state' }, [el('div', { class: 'state__icon', text: '🔍' }), el('div', { class: 'state__title', text: 'Sin resultados' })])); return; }
    host.append(el('div', { class: 'kb-list' }, list.map(card)));
  }

  /* ── Boot + handoff de Unmatched ─────────────────────────── */
  function maybePrefill() {
    const pf = store.get().kbPrefill;
    if (!pf) return;
    store.set({ kbPrefill: null });
    openModal({ question: pf.question || '', keywords: pf.keywords || [], category: 'general', priority: 50 },
      pf.unmatchedId ? { unmatchedId: pf.unmatchedId } : null);
  }

  if (store.get().mock) {
    ui.faqs = MOCK_FAQS.map((f) => ({ ...f })); ui.loaded = true; render(); maybePrefill();
  } else {
    render();
    ui.sub = subscribeFaqs(
      (l) => { ui.faqs = l; ui.loaded = true; render(); },
      (e) => { ui.loaded = true; toast(e && e.code === 'permission-denied' ? 'Sin permiso para ver el Cerebro AI.' : 'No se pudo cargar.', 'error'); render(); },
    );
    maybePrefill();
  }

  return function cleanup() { if (ui.sub) ui.sub(); ui.sub = null; clearTimeout(searchTimer); };
}
