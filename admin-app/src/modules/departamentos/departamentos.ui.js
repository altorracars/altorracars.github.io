// ============================================================
// Departamentos (PLAN-UNIFICADO F-2 §240, gap §2.A) — UI.
// Grid de tarjetas + modal crear/editar (nombre, color, nivel, activo,
// descripción). Borrado con guard userCount>0 (§66 + rules). RBAC:
// departments.read ver · departments.manage mutar. Reusa .rev-modal*.
// Sin "icon picker" lucide (admin-app = emoji): tarjeta con punto de color
// + inicial; el campo `icon` se preserva/defaultea para cross-panel.
// ⟦OPUS-4.8 · rev-Fable⟧
// ============================================================

import { el, clear } from '../../core/dom.js';
import { confirmDialog } from '../../core/confirm.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { writeAudit } from '../../core/audit.js';
import {
  MOCK_DEPARTMENTS, subscribeDepartments, slugId, createDept, updateDept, deleteDept,
} from './departamentos.data.js';

export function mountDepartamentos(root) {
  const ui = { depts: [], loaded: false, sub: null, search: '' };
  const canRead = hasPermission('departments.read') || hasPermission('departments.manage');
  const canManage = hasPermission('departments.manage');
  const me = (store.get().profile && store.get().profile.nombre) || (store.get().user && store.get().user.email) || 'admin';
  const uid = (store.get().user && store.get().user.uid) || 'unknown';

  const wrap = el('section', { class: 'dep' });
  clear(root); root.append(wrap);

  if (!canRead) {
    wrap.append(el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', text: '🔒' }),
      el('div', { class: 'state__title', text: 'Sin permiso' }),
      el('div', { class: 'state__msg', text: 'Necesitas departments.read para ver los departamentos.' }),
    ]));
    return function cleanup() {};
  }

  /* ── Modal crear/editar ──────────────────────────────────── */
  function openModal(dept) {
    const isEdit = !!dept;
    if (!canManage) { toast('Necesitas departments.manage para gestionar departamentos.', 'error'); return; }

    const nameIn = el('input', { class: 'input', type: 'text', maxlength: '60', placeholder: 'Ej: Ventas, Mercadeo, Postventa', value: isEdit ? (dept.name || '') : '' });
    const colorIn = el('input', { class: 'input dep-color', type: 'color', value: (isEdit && dept.color) || '#b89658' });
    const hexIn = el('input', { class: 'input dep-hex', type: 'text', maxlength: '7', value: (isEdit && dept.color) || '#b89658' });
    const nivelIn = el('input', { class: 'input', type: 'number', min: '0', max: '100', value: String(isEdit && dept.nivel != null ? dept.nivel : 10) });
    const descIn = el('textarea', { class: 'textarea', maxlength: '200', rows: '2', placeholder: 'Una línea sobre el departamento' });
    if (isEdit) descIn.value = dept.description || '';
    const activeIn = el('input', { type: 'checkbox' });
    activeIn.checked = isEdit ? dept.active !== false : true;
    colorIn.addEventListener('input', () => { hexIn.value = colorIn.value; });
    hexIn.addEventListener('input', () => { if (/^#[0-9A-Fa-f]{6}$/.test(hexIn.value)) colorIn.value = hexIn.value; });

    const field = (label, input, mod) => el('label', { class: 'field' + (mod ? ' ' + mod : '') }, [el('span', { class: 'field__label', text: label }), input]);
    const saveBtn = el('button', { class: 'btn btn--gold', type: 'button', text: isEdit ? 'Guardar cambios' : 'Crear departamento' });
    const cancelBtn = el('button', { class: 'btn btn--soft', type: 'button', text: 'Cancelar' });

    const overlay = el('div', { class: 'rev-modal__overlay' }, [
      el('div', { class: 'rev-modal rev-modal--sm', role: 'dialog', 'aria-modal': 'true' }, [
        el('h3', { class: 'rev-modal__title', text: isEdit ? 'Editar: ' + dept.name : 'Nuevo departamento' }),
        el('div', { class: 'dep-grid2' }, [field('Nombre *', nameIn), field('Nivel', nivelIn)]),
        field('Color', el('div', { class: 'dep-color-row' }, [colorIn, hexIn])),
        field('Descripción', descIn, 'field--full'),
        el('label', { class: 'dep-active' }, [activeIn, el('span', { text: 'Activo (visible para asignar usuarios)' })]),
        el('div', { class: 'rev-modal__actions' }, [cancelBtn, saveBtn]),
      ]),
    ]);
    const close = () => overlay.remove();
    cancelBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    saveBtn.addEventListener('click', async () => {
      const name = nameIn.value.trim();
      const color = hexIn.value.trim();
      if (!name) { toast('El nombre es obligatorio.', 'error'); return; }
      if (!/^#[0-9A-Fa-f]{6}$/.test(color)) { toast('Color inválido (usa #RRGGBB).', 'error'); return; }
      const nivelRaw = parseInt(nivelIn.value, 10);
      const fields = {
        name, description: descIn.value.trim(), color,
        icon: (isEdit && dept.icon) || 'building-2',
        nivel: Number.isNaN(nivelRaw) ? 10 : Math.max(0, Math.min(100, nivelRaw)),
        active: !!activeIn.checked,
      };

      if (store.get().mock) {
        if (isEdit) {
          const i = ui.depts.findIndex((d) => d._docId === dept._docId);
          if (i >= 0) ui.depts[i] = { ...ui.depts[i], ...fields };
        } else if (ui.depts.some((d) => d._docId === slugId(name))) {
          toast('Ya existe un departamento con ese nombre.', 'error'); return;
        } else {
          ui.depts.push({ _docId: slugId(name), userCount: 0, ...fields });
        }
        renderGrid(); close(); toast(isEdit ? 'Departamento actualizado (demo)' : 'Departamento creado (demo)', 'ok');
        return;
      }

      saveBtn.disabled = true; saveBtn.textContent = 'Guardando…';
      const nowIso = new Date().toISOString();
      const stamp = { updatedAt: nowIso, updatedBy: uid, updatedByName: me };
      try {
        if (isEdit) {
          await updateDept(dept._docId, { ...fields, ...stamp });
          writeAudit('dept_update', 'departamento ' + name, '');
          close(); toast('✓ Departamento actualizado', 'ok');
        } else {
          await createDept(slugId(name), { ...fields, ...stamp, userCount: 0, createdAt: nowIso, createdBy: uid, createdByName: me, _version: 1 });
          writeAudit('dept_create', 'departamento ' + name, '');
          close(); toast('✓ Departamento creado', 'ok');
        }
      } catch (e) {
        saveBtn.disabled = false; saveBtn.textContent = isEdit ? 'Guardar cambios' : 'Crear departamento';
        const msg = e.code === 'already-exists' ? 'ya existe un departamento con ese nombre'
          : e.code === 'permission-denied' ? 'sin permiso (rules)' : (e.message || e.code);
        toast('No se pudo guardar: ' + msg, 'error');
      }
    });

    document.body.append(overlay);
    nameIn.focus();
  }

  /* ── Baja (guard userCount, §66) ─────────────────────────── */
  async function confirmDelete(d) {
    const n = d.userCount || 0;
    if (n > 0) { toast(`No se puede eliminar: ${n} usuario(s) asignado(s). Reasígnalos primero en Usuarios (§66).`, 'error'); return; }
    if (!await confirmDialog({
      title: `¿Eliminar el departamento "${d.name}"?`,
      message: 'Esta acción no se puede deshacer.',
      confirmText: 'Eliminar', danger: true,
    })) return;
    if (store.get().mock) {
      ui.depts = ui.depts.filter((x) => x._docId !== d._docId);
      renderGrid(); toast('Departamento eliminado (demo)', 'ok'); return;
    }
    try {
      await deleteDept(d._docId);
      writeAudit('dept_delete', 'departamento ' + d.name, '');
      toast('✓ Departamento eliminado', 'ok');
    } catch (e) {
      toast('No se pudo eliminar: ' + (e.code === 'permission-denied' ? '¿tiene usuarios asignados?' : (e.message || e.code)), 'error');
    }
  }

  /* ── Tarjeta ─────────────────────────────────────────────── */
  function card(d) {
    const color = d.color || '#b89658';
    const inactive = d.active === false;
    const dot = el('span', { class: 'dep-card__dot', style: { background: color }, 'aria-hidden': 'true', text: (d.name || '?').slice(0, 1).toUpperCase() });
    const badges = el('div', { class: 'dep-card__badges' }, [
      el('span', { class: 'badge', text: 'Nivel ' + (d.nivel == null ? 10 : d.nivel) }),
      inactive ? el('span', { class: 'badge badge--warn', text: 'Inactivo' }) : null,
    ]);
    const actions = el('div', { class: 'dep-card__actions' });
    if (canManage) {
      const editBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '✏️ Editar' });
      editBtn.addEventListener('click', () => openModal(d));
      actions.append(editBtn);
      const delBtn = el('button', { class: 'btn btn--danger btn--sm', type: 'button', text: '🗑' });
      delBtn.addEventListener('click', () => confirmDelete(d));
      actions.append(delBtn);
    }
    return el('article', { class: 'dep-card' + (inactive ? ' is-inactive' : '') }, [
      el('div', { class: 'dep-card__head' }, [dot, el('div', { class: 'dep-card__meta' }, [
        el('strong', { class: 'dep-card__name', text: d.name || d._docId }), badges,
      ])]),
      el('p', { class: 'dep-card__desc u-caption u-muted', text: d.description || 'Sin descripción.' }),
      el('div', { class: 'dep-card__stats u-caption u-faint' }, [el('span', { text: `👤 ${d.userCount || 0} usuario${(d.userCount || 0) === 1 ? '' : 's'}` })]),
      actions,
    ]);
  }

  /* ── Toolbar + grid ──────────────────────────────────────── */
  const countEl = el('span', { class: 'u-caption u-faint' });
  const searchInput = el('input', { type: 'search', placeholder: 'Buscar departamento…', 'aria-label': 'Buscar departamentos' });
  let searchTimer = null;
  searchInput.addEventListener('input', () => { clearTimeout(searchTimer); searchTimer = setTimeout(() => { ui.search = searchInput.value; renderGrid(); }, 180); });
  const search = el('div', { class: 'search' }, [el('span', { 'aria-hidden': 'true', text: '🔎' }), searchInput]);
  const newBtn = canManage ? el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: '＋ Nuevo departamento' }) : null;
  if (newBtn) newBtn.addEventListener('click', () => openModal(null));

  wrap.append(
    el('div', { class: 'dep-toolbar' }, [search, el('div', { class: 'u-row u-row--tight' }, [countEl, newBtn])]),
    el('div', { class: 'dep-host' }),
  );
  const gridHost = wrap.querySelector('.dep-host');

  function filtered() {
    const q = ui.search.trim().toLowerCase();
    if (!q) return ui.depts;
    return ui.depts.filter((d) => (String(d.name || '') + ' ' + String(d.description || '')).toLowerCase().includes(q));
  }

  function renderGrid() {
    if (!ui.loaded) { clear(gridHost); gridHost.append(el('div', { class: 'state' }, [el('div', { class: 'state__msg', text: 'Cargando departamentos…' })])); return; }
    const list = filtered();
    countEl.textContent = ui.search.trim() ? `${list.length} de ${ui.depts.length}` : `${ui.depts.length} departamento${ui.depts.length === 1 ? '' : 's'}`;
    clear(gridHost);
    if (!ui.depts.length) {
      gridHost.append(el('div', { class: 'state' }, [
        el('div', { class: 'state__icon', text: '🏢' }),
        el('div', { class: 'state__title', text: 'Sin departamentos' }),
        el('div', { class: 'state__msg', text: canManage ? 'Crea el primero con “Nuevo departamento”.' : 'Aún no hay departamentos.' }),
      ]));
      return;
    }
    if (!list.length) { gridHost.append(el('div', { class: 'state' }, [el('div', { class: 'state__icon', text: '🔍' }), el('div', { class: 'state__title', text: 'Sin resultados' })])); return; }
    gridHost.append(el('div', { class: 'dep-grid' }, list.map(card)));
  }

  /* ── Boot ────────────────────────────────────────────────── */
  if (store.get().mock) {
    ui.depts = MOCK_DEPARTMENTS.map((d) => ({ ...d }));
    ui.loaded = true; renderGrid();
  } else {
    renderGrid();
    ui.sub = subscribeDepartments(
      (l) => { ui.depts = l; ui.loaded = true; renderGrid(); },
      (e) => { ui.loaded = true; toast(e && e.code === 'permission-denied' ? 'Sin permiso para ver departamentos.' : 'No se pudieron cargar los departamentos.', 'error'); renderGrid(); },
    );
  }

  return function cleanup() {
    if (ui.sub) ui.sub(); ui.sub = null;
    clearTimeout(searchTimer);
  };
}
