// ============================================================
// Roles (PLAN-UNIFICADO F-2 §239, gap §2.A) — UI.
// Grid de tarjetas de rol + modal crear/editar/ver con matriz de permisos
// (71 atómicos en 8 categorías, toggle por categoría + indeterminate +
// críticos resaltados). Los system roles (`isSystem`, CEO) salen en modo
// SOLO-LECTURA ("Ver"); no editables/eliminables (rules §212/roles isSystem).
// RBAC: roles.read ver · roles.create/edit/delete mutar. Reusa .rev-modal*.
// ⟦OPUS-4.8 · rev-Fable⟧
// ============================================================

import { el, clear } from '../../core/dom.js';
import { icon } from '../../core/icons.js';
import { confirmDialog } from '../../core/confirm.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { writeAudit } from '../../core/audit.js';
import { PERMISSIONS_CATALOG, CATEGORY_ORDER, permissionsByCategory, isOwnerOnlyPerm } from '../../domain/rbac-catalog.js';
import { friendlyError } from '../../core/errors.js';
import {
  MOCK_ROLES, subscribeRoles, createRole, updateRole, deleteRole, newRoleId,
} from './roles.data.js';

const TOTAL_PERMS = PERMISSIONS_CATALOG.length;
// §219: los owner-only no son seleccionables para un rol custom (denominador del resumen).
const SELECTABLE_TOTAL = PERMISSIONS_CATALOG.filter((p) => !isOwnerOnlyPerm(p.id)).length;
const isWildcard = (r) => Array.isArray(r.permissions) && r.permissions.includes('*');

export function mountRoles(root) {
  const ui = { roles: [], loaded: false, sub: null, search: '' };
  const canRead = hasPermission('roles.read');
  const canCreate = hasPermission('roles.create');
  const canEdit = hasPermission('roles.edit');
  const canDelete = hasPermission('roles.delete');
  const me = (store.get().profile && store.get().profile.nombre) || (store.get().user && store.get().user.email) || 'admin';
  const uid = (store.get().user && store.get().user.uid) || 'unknown';

  const wrap = el('section', { class: 'rol' });
  clear(root); root.append(wrap);

  if (!canRead) {
    wrap.append(el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', text: '🔒' }),
      el('div', { class: 'state__title', text: 'Sin permiso' }),
      el('div', { class: 'state__msg', text: 'Necesitas el permiso roles.read para ver los roles.' }),
    ]));
    return function cleanup() {};
  }

  /* ── Matriz de permisos (devuelve nodo + lectura del set) ──── */
  function buildMatrix(initialPerms, readOnly) {
    // §219: los owner-only NUNCA entran al set (ni del inicial) ni son seleccionables.
    const selected = new Set((initialPerms || []).filter((id) => !isOwnerOnlyPerm(id)));
    const byCat = permissionsByCategory();
    const catToggles = {};   // category → input
    const catCounts = {};    // category → span
    const summary = el('span', {});
    const selectableOf = (perms) => perms.filter((p) => !isOwnerOnlyPerm(p.id));

    const refresh = () => {
      summary.textContent = `${selected.size} de ${SELECTABLE_TOTAL} seleccionados`;
      CATEGORY_ORDER.forEach((cat) => {
        const sel = selectableOf(byCat[cat]);
        const n = sel.filter((p) => selected.has(p.id)).length;
        if (catCounts[cat]) catCounts[cat].textContent = `${n}/${sel.length}`;
        if (catToggles[cat]) {
          catToggles[cat].checked = sel.length > 0 && n === sel.length;
          catToggles[cat].indeterminate = n > 0 && n < sel.length;
        }
      });
    };

    const cats = CATEGORY_ORDER.map((cat) => {
      const perms = byCat[cat];
      const selPerms = selectableOf(perms);
      const catCb = el('input', { type: 'checkbox', disabled: readOnly || selPerms.length === 0 });
      catToggles[cat] = catCb;
      const countSpan = el('span', { class: 'rol-cat__count u-caption u-faint' });
      catCounts[cat] = countSpan;
      catCb.addEventListener('change', () => {
        selPerms.forEach((p) => { if (catCb.checked) selected.add(p.id); else selected.delete(p.id); });
        rowsOf(cat).forEach((cb) => { cb.checked = catCb.checked; });
        refresh();
      });

      const _rows = {};
      const rows = perms.map((p) => {
        const owner = isOwnerOnlyPerm(p.id); // §219: exclusivo del dueño → deshabilitado
        const cb = el('input', { type: 'checkbox', class: 'rol-perm__cb', disabled: readOnly || owner });
        cb.checked = !owner && selected.has(p.id);
        if (!owner) {
          _rows[p.id] = cb;
          cb.addEventListener('change', () => {
            if (cb.checked) selected.add(p.id); else selected.delete(p.id);
            refresh();
          });
        }
        return el('label', {
          class: 'rol-perm' + (p.critical ? ' rol-perm--critical' : '') + (owner ? ' rol-perm--owner' : ''),
          title: owner ? 'Exclusivo del dueño — no se puede delegar a otro rol' : (p.description || ''),
        }, [
          cb,
          el('span', { class: 'rol-perm__info' }, [
            el('span', { class: 'rol-perm__name', text: p.name + (p.critical ? ' ⚠' : '') }),
            el('code', { class: 'rol-perm__id', text: p.id + (owner ? ' · solo dueño' : '') }),
          ]),
        ]);
      });
      catToggles[cat]._rows = _rows;

      return el('div', { class: 'rol-cat' }, [
        el('label', { class: 'rol-cat__head' }, [catCb, el('span', { class: 'rol-cat__name', text: cat }), countSpan]),
        el('div', { class: 'rol-cat__list' }, rows),
      ]);
    });

    function rowsOf(cat) { return Object.values(catToggles[cat]._rows); }

    refresh();
    const node = el('div', {}, [
      el('div', { class: 'rol-matrix__summary u-caption u-muted' }, [summary]),
      el('div', { class: 'rol-matrix' }, cats),
    ]);
    return { node, getSelected: () => Array.from(selected) };
  }

  /* ── Modal crear/editar/ver ──────────────────────────────── */
  function openModal(role) {
    const isEdit = !!role;
    const readOnly = isEdit && !!role.isSystem;
    if (!isEdit && !canCreate) { toast('No tienes permiso para crear roles.', 'error'); return; }
    if (isEdit && !readOnly && !canEdit) { toast('No tienes permiso para editar roles.', 'error'); return; }

    const nameIn = el('input', { class: 'input', type: 'text', maxlength: '50', placeholder: 'Ej: Asesor Senior, Gerente Inventario', value: isEdit ? (role.name || '') : '' });
    const colorIn = el('input', { class: 'input rol-color', type: 'color', value: (isEdit && role.color) || '#b89658' });
    const hexIn = el('input', { class: 'input rol-hex', type: 'text', maxlength: '7', value: (isEdit && role.color) || '#b89658' });
    const descIn = el('textarea', { class: 'textarea', maxlength: '200', rows: '2', placeholder: 'Una línea explicando qué hace este rol' });
    if (isEdit) descIn.value = role.description || '';
    if (readOnly) { nameIn.readOnly = true; colorIn.disabled = true; hexIn.readOnly = true; descIn.readOnly = true; }
    colorIn.addEventListener('input', () => { hexIn.value = colorIn.value; });
    hexIn.addEventListener('input', () => { if (/^#[0-9A-Fa-f]{6}$/.test(hexIn.value)) colorIn.value = hexIn.value; });

    const matrix = buildMatrix(isWildcard(role || {}) ? [] : ((role && role.permissions) || []), readOnly);

    const field = (label, input, mod) => el('label', { class: 'field' + (mod ? ' ' + mod : '') },
      [el('span', { class: 'field__label', text: label }), input]);

    const saveBtn = readOnly ? null : el('button', { class: 'btn btn--gold', type: 'button', text: isEdit ? 'Guardar cambios' : 'Crear rol' });
    const cancelBtn = el('button', { class: 'btn btn--soft', type: 'button', text: readOnly ? 'Cerrar' : 'Cancelar' });

    const wildcardNote = isWildcard(role || {})
      ? el('div', { class: 'rol-wildcard', text: '👑 Acceso total (*) — rol del sistema, no editable.' }) : null;

    const overlay = el('div', { class: 'rev-modal__overlay' }, [
      el('div', { class: 'rev-modal rol-modal', role: 'dialog', 'aria-modal': 'true' }, [
        el('h3', { class: 'rev-modal__title', text: !isEdit ? 'Nuevo rol' : (readOnly ? 'Ver rol del sistema: ' + role.name : 'Editar rol: ' + role.name) }),
        el('div', { class: 'rol-modal__meta' }, [
          field('Nombre *', nameIn),
          field('Color', el('div', { class: 'rol-color-row' }, [colorIn, hexIn])),
        ]),
        field('Descripción', descIn, 'field--full'),
        el('div', { class: 'rol-modal__perms' }, [
          el('h4', { class: 'rol-modal__subtitle', text: 'Permisos' }),
          wildcardNote || matrix.node,
        ]),
        el('div', { class: 'rev-modal__actions' }, [cancelBtn, saveBtn].filter(Boolean)),
      ]),
    ]);
    const close = () => overlay.remove();
    cancelBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    if (saveBtn) saveBtn.addEventListener('click', async () => {
      const name = nameIn.value.trim();
      const color = hexIn.value.trim();
      const permissions = matrix.getSelected();
      if (name.length < 3) { toast('El nombre debe tener al menos 3 caracteres.', 'error'); return; }
      if (!/^#[0-9A-Fa-f]{6}$/.test(color)) { toast('Color inválido (usa #RRGGBB).', 'error'); return; }
      if (!permissions.length) { toast('Selecciona al menos un permiso.', 'error'); return; }
      if (!isEdit && ui.roles.some((r) => (r.name || '').toLowerCase() === name.toLowerCase())) {
        toast('Ya existe un rol con ese nombre.', 'error'); return;
      }

      if (store.get().mock) {
        if (isEdit) {
          const i = ui.roles.findIndex((r) => r._docId === role._docId);
          if (i >= 0) ui.roles[i] = { ...ui.roles[i], name, description: descIn.value.trim(), color, permissions };
        } else {
          ui.roles.push({ _docId: newRoleId(name), name, description: descIn.value.trim(), color, icon: 'shield', isSystem: false, isDefault: false, userCount: 0, permissions });
        }
        renderGrid(); close(); toast(isEdit ? 'Rol actualizado (demo)' : 'Rol creado (demo)', 'ok');
        return;
      }

      saveBtn.disabled = true; saveBtn.textContent = 'Guardando…';
      try {
        const nowIso = new Date().toISOString();
        if (isEdit) {
          await updateRole(role._docId, {
            name, description: descIn.value.trim(), color, permissions,
            updatedAt: nowIso, updatedBy: uid, updatedByName: me, _version: (role._version || 0) + 1,
          });
          writeAudit('role_update', 'rol ' + name, permissions.length + ' permisos');
          close(); toast('✓ Rol actualizado', 'ok');
        } else {
          const id = newRoleId(name);
          await createRole(id, {
            id, name, description: descIn.value.trim(), permissions,
            isSystem: false, isDefault: false, color, icon: 'shield', userCount: 0,
            createdAt: nowIso, createdBy: uid, createdByName: me,
            updatedAt: nowIso, updatedBy: uid, updatedByName: me, _version: 1,
          });
          writeAudit('role_create', 'rol ' + name, permissions.length + ' permisos');
          close(); toast('✓ Rol creado', 'ok');
        }
      } catch (e) {
        saveBtn.disabled = false; saveBtn.textContent = isEdit ? 'Guardar cambios' : 'Crear rol';
        toast('No se pudo guardar: ' + friendlyError(e), 'error');
      }
    });

    document.body.append(overlay);
    if (!readOnly) nameIn.focus();
  }

  /* ── Baja (guard userCount) ──────────────────────────────── */
  async function confirmDelete(role) {
    const n = role.userCount || 0;
    if (n > 0) {
      toast(`No se puede eliminar: ${n} usuario(s) con este rol. Reasígnalos primero en Usuarios.`, 'error');
      return;
    }
    if (!await confirmDialog({
      title: `¿Eliminar el rol "${role.name}"?`,
      message: 'Esta acción no se puede deshacer.',
      confirmText: 'Eliminar', danger: true,
    })) return;
    if (store.get().mock) {
      ui.roles = ui.roles.filter((r) => r._docId !== role._docId);
      renderGrid(); toast('Rol eliminado (demo)', 'ok'); return;
    }
    try {
      await deleteRole(role._docId);
      writeAudit('role_delete', 'rol ' + role.name, '');
      toast('✓ Rol eliminado', 'ok');
    } catch (e) {
      toast('No se pudo eliminar: ' + friendlyError(e), 'error');
    }
  }

  /* ── Tarjeta de rol ──────────────────────────────────────── */
  function card(r) {
    const color = r.color || '#b89658';
    const wild = isWildcard(r);
    const permsLabel = wild ? 'Acceso total' : `${(r.permissions || []).length} permiso${(r.permissions || []).length === 1 ? '' : 's'}`;
    const badges = el('div', { class: 'rol-card__badges' }, [
      r.isSystem ? el('span', { class: 'badge badge--gold', text: '🔒 Sistema' }) : null,
      r.isDefault ? el('span', { class: 'badge badge--info', text: '★ Default' }) : null,
    ]);
    const dot = el('span', { class: 'rol-card__dot', style: { background: color }, 'aria-hidden': 'true', text: (r.name || '?').slice(0, 1).toUpperCase() });

    const actions = el('div', { class: 'rol-card__actions' });
    const viewBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', html: r.isSystem ? (icon('eye') + ' Ver') : (icon('edit') + ' Editar') });
    viewBtn.addEventListener('click', () => openModal(r));
    actions.append(viewBtn);
    if (!r.isSystem && canDelete) {
      const delBtn = el('button', { class: 'btn btn--danger btn--sm', type: 'button', 'aria-label': 'Eliminar', html: icon('trash') });
      delBtn.addEventListener('click', () => confirmDelete(r));
      actions.append(delBtn);
    }

    return el('article', { class: 'rol-card' }, [
      el('div', { class: 'rol-card__head' }, [dot, el('div', { class: 'rol-card__meta' }, [
        el('strong', { class: 'rol-card__name', text: r.name || r._docId }), badges,
      ])]),
      el('p', { class: 'rol-card__desc u-caption u-muted', text: r.description || 'Sin descripción.' }),
      el('div', { class: 'rol-card__stats u-caption u-faint' }, [
        el('span', { text: '🔑 ' + permsLabel }),
        el('span', { text: `👤 ${r.userCount || 0} usuario${(r.userCount || 0) === 1 ? '' : 's'}` }),
      ]),
      actions,
    ]);
  }

  /* ── Toolbar + grid ──────────────────────────────────────── */
  const countEl = el('span', { class: 'u-caption u-faint' });
  const searchInput = el('input', { type: 'search', placeholder: 'Buscar rol…', 'aria-label': 'Buscar roles' });
  let searchTimer = null;
  searchInput.addEventListener('input', () => { clearTimeout(searchTimer); searchTimer = setTimeout(() => { ui.search = searchInput.value; renderGrid(); }, 180); });
  const search = el('div', { class: 'search' }, [el('span', { 'aria-hidden': 'true', text: '🔎' }), searchInput]);
  const newBtn = canCreate ? el('button', { class: 'btn btn--gold btn--sm', type: 'button', html: icon('plus') + ' Nuevo rol' }) : null;
  if (newBtn) newBtn.addEventListener('click', () => openModal(null));

  const toolbar = el('div', { class: 'rol-toolbar' }, [search, el('div', { class: 'u-row u-row--tight' }, [countEl, newBtn])]);
  const gridHost = el('div', { class: 'rol-host' });
  wrap.append(toolbar, gridHost);

  function filtered() {
    const q = ui.search.trim().toLowerCase();
    if (!q) return ui.roles;
    return ui.roles.filter((r) => (String(r.name || '') + ' ' + String(r.description || '')).toLowerCase().includes(q));
  }

  function renderGrid() {
    if (!ui.loaded) { clear(gridHost); gridHost.append(el('div', { class: 'state' }, [el('div', { class: 'state__msg', text: 'Cargando roles…' })])); return; }
    const list = filtered();
    countEl.textContent = ui.search.trim() ? `${list.length} de ${ui.roles.length}` : `${ui.roles.length} rol${ui.roles.length === 1 ? '' : 'es'}`;
    clear(gridHost);
    if (!ui.roles.length) {
      gridHost.append(el('div', { class: 'state' }, [
        el('div', { class: 'state__icon', text: '🛡️' }),
        el('div', { class: 'state__title', text: 'Sin roles' }),
        el('div', { class: 'state__msg', text: canCreate ? 'Crea el primer rol personalizado con “Nuevo rol”.' : 'Aún no hay roles configurados.' }),
      ]));
      return;
    }
    if (!list.length) {
      gridHost.append(el('div', { class: 'state' }, [el('div', { class: 'state__icon', text: '🔍' }), el('div', { class: 'state__title', text: 'Sin resultados' })]));
      return;
    }
    gridHost.append(el('div', { class: 'rol-grid' }, list.map(card)));
  }

  /* ── Boot ────────────────────────────────────────────────── */
  if (store.get().mock) {
    ui.roles = MOCK_ROLES.map((r) => ({ ...r }));
    ui.loaded = true; renderGrid();
  } else {
    renderGrid();
    ui.sub = subscribeRoles(
      (l) => { ui.roles = l; ui.loaded = true; renderGrid(); },
      (e) => { ui.loaded = true; toast(e && e.code === 'permission-denied' ? 'Sin permiso para ver roles.' : 'No se pudieron cargar los roles.', 'error'); renderGrid(); },
    );
  }

  return function cleanup() {
    if (ui.sub) ui.sub(); ui.sub = null;
    clearTimeout(searchTimer);
  };
}
