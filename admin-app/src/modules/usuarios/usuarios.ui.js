// ============================================================
// Usuarios (PLAN-UNIFICADO F-2 §237, gap §2.A) — UI.
// Lista de `usuarios` con buscador + filtro por rol; alta/edición/baja
// y bloqueo. El DUEÑO (CEO) sale con candado (no editable/eliminable desde
// aquí — solo Mi Perfil; rules §212 lo refuerzan). RBAC: users.read para ver,
// users.create / users.edit / users.delete para mutar. Optimistic-free:
// las escrituras son directas (onSnapshot refresca) o callables (alta/baja).
// Idioma visual: filas (no <table>), como Contactos. Reusa .rev-modal*.
// ⟦OPUS-4.8 · rev-Fable⟧
// ============================================================

import { el, clear } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { initials } from '../../domain/format.js';
import { writeAudit } from '../../core/audit.js';
import {
  MOCK_USERS, MOCK_ROLES, MOCK_DEPARTMENTS,
  isOwner, assignableRoles, fetchDepartments,
  subscribeUsers, subscribeRoles, assignUserRole, setUserBlocked,
  createManagedUser, deleteManagedUser, legacyTier,
} from './usuarios.data.js';

const SCOPES = [
  { value: 'all', label: 'Todos los datos' },
  { value: 'department', label: 'Solo su departamento' },
  { value: 'own', label: 'Solo lo propio' },
];

export function mountUsuarios(root) {
  const ui = { users: [], roles: [], depts: [], loaded: false, search: '', filter: '' };
  const canRead = hasPermission('users.read');
  const canCreate = hasPermission('users.create');
  const canEdit = hasPermission('users.edit');
  const canDelete = hasPermission('users.delete');
  const myUid = (store.get().user && store.get().user.uid) || '';

  const wrap = el('section', { class: 'usr' });
  clear(root); root.append(wrap);

  if (!canRead) {
    wrap.append(el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', text: '🔒' }),
      el('div', { class: 'state__title', text: 'Sin permiso' }),
      el('div', { class: 'state__msg', text: 'Necesitas el permiso users.read para ver el equipo.' }),
    ]));
    return function cleanup() {};
  }

  const roleById = (id) => ui.roles.find((r) => r._docId === id);

  /* ── Modal alta/edición ──────────────────────────────────── */
  function field(label, input, hint) {
    return el('label', { class: 'field' }, [
      el('span', { class: 'field__label', text: label }), input,
      hint ? el('span', { class: 'u-caption u-faint', text: hint }) : null,
    ]);
  }
  function roleSelect(selectedId) {
    const sel = el('select', { class: 'select' });
    const opts = assignableRoles(ui.roles);
    if (!opts.length) {
      sel.append(el('option', { value: '', text: '— Sin roles configurados —' }));
      sel.disabled = true;
    } else {
      opts.forEach((r) => sel.append(el('option', { value: r._docId, text: r.name || r._docId })));
      const def = selectedId || (opts.find((r) => r.isDefault) || opts[0])._docId;
      sel.value = def;
    }
    return sel;
  }
  function deptSelect(selectedId) {
    const sel = el('select', { class: 'select' }, [el('option', { value: '', text: '— Sin departamento —' })]);
    ui.depts.forEach((d) => sel.append(el('option', { value: d._docId, text: d.name || d._docId })));
    if (selectedId) sel.value = selectedId;
    return sel;
  }
  function scopeSelect(selected) {
    const sel = el('select', { class: 'select' }, SCOPES.map((s) => el('option', { value: s.value, text: s.label })));
    sel.value = selected || 'all';
    return sel;
  }

  function openModal(user) {
    const isEdit = !!user;
    if (isEdit && isOwner(user)) { toast('El CEO solo se gestiona desde Mi Perfil.', 'info'); return; }
    if (!isEdit && !assignableRoles(ui.roles).length) {
      toast('Primero crea un rol en Configuración → Roles.', 'error'); return;
    }

    const nombreIn = el('input', { class: 'input', type: 'text', maxlength: '60', placeholder: 'Nombre completo *', value: isEdit ? (user.nombre || '') : '' });
    const emailIn = el('input', { class: 'input', type: 'email', maxlength: '120', placeholder: 'correo@ejemplo.com *', value: isEdit ? (user.email || '') : '' });
    if (isEdit) emailIn.readOnly = true;
    const passIn = el('input', { class: 'input', type: 'password', minlength: '8', maxlength: '64', placeholder: 'Contraseña temporal (mín. 8) *', autocomplete: 'new-password' });
    const roleIn = roleSelect(isEdit ? user.roleId : null);
    const deptIn = deptSelect(isEdit ? (user.departmentId || '') : '');
    const nivelIn = el('input', { class: 'input', type: 'number', min: '0', max: '100', placeholder: '10', value: isEdit && user.nivel != null ? String(user.nivel) : '' });
    const scopeIn = scopeSelect(isEdit ? user.dataScope : 'all');

    const saveBtn = el('button', { class: 'btn btn--gold', type: 'button', text: isEdit ? 'Guardar cambios' : 'Crear usuario' });
    const cancelBtn = el('button', { class: 'btn btn--soft', type: 'button', text: 'Cancelar' });

    const body = isEdit
      ? [field('Nombre', nombreIn), field('Correo', emailIn, 'El correo no se cambia desde aquí.')]
      : [field('Nombre *', nombreIn), field('Correo *', emailIn), field('Contraseña *', passIn, 'El usuario podrá cambiarla luego.')];
    body.push(
      field('Rol *', roleIn),
      el('div', { class: 'usr-grid2' }, [field('Departamento', deptIn), field('Nivel', nivelIn, '0–100 · jerarquía')]),
      field('Alcance de datos', scopeIn),
    );

    const overlay = el('div', { class: 'rev-modal__overlay' }, [
      el('div', { class: 'rev-modal rev-modal--sm', role: 'dialog', 'aria-modal': 'true' }, [
        el('h3', { class: 'rev-modal__title', text: isEdit ? 'Editar: ' + (user.nombre || user.email) : 'Nuevo usuario' }),
        ...body,
        el('div', { class: 'rev-modal__actions' }, [cancelBtn, saveBtn]),
      ]),
    ]);
    const close = () => overlay.remove();
    cancelBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    saveBtn.addEventListener('click', async () => {
      const nombre = nombreIn.value.trim();
      const role = roleById(roleIn.value);
      if (!nombre) { toast('El nombre es obligatorio.', 'error'); return; }
      if (!role) { toast('Selecciona un rol válido.', 'error'); return; }
      const deptDoc = ui.depts.find((d) => d._docId === deptIn.value) || null;
      const nivelRaw = parseInt(nivelIn.value, 10);
      const dept = deptDoc
        ? { ...deptDoc, nivel: Number.isNaN(nivelRaw) ? (deptDoc.nivel ?? 10) : Math.max(0, Math.min(100, nivelRaw)), dataScope: scopeIn.value }
        : { _docId: '', name: '', nivel: Number.isNaN(nivelRaw) ? 10 : Math.max(0, Math.min(100, nivelRaw)), dataScope: scopeIn.value };

      // Demo: muta local y cierra.
      if (store.get().mock) {
        if (isEdit) {
          const i = ui.users.findIndex((u) => u._docId === user._docId);
          if (i >= 0) ui.users[i] = { ...ui.users[i], roleId: role._docId, roleName: role.name, permissions: role.permissions, departmentId: dept._docId || null, departmentName: dept.name, nivel: dept.nivel, dataScope: dept.dataScope };
        } else {
          ui.users.push({ _docId: 'u_' + Date.now(), nombre, email: emailIn.value.trim(), roleId: role._docId, roleName: role.name, permissions: role.permissions, departmentName: dept.name, nivel: dept.nivel, dataScope: dept.dataScope, estado: 'activo' });
        }
        renderList(); close(); toast(isEdit ? 'Usuario actualizado (demo)' : 'Usuario creado (demo)', 'ok');
        return;
      }

      saveBtn.disabled = true; saveBtn.textContent = 'Guardando…';
      try {
        if (isEdit) {
          await assignUserRole(user._docId, role, dept);
          writeAudit('user_update', 'usuario ' + nombre, 'rol: ' + (role.name || role._docId));
          close(); toast('✓ Usuario actualizado', 'ok');
        } else {
          const email = emailIn.value.trim();
          const password = passIn.value;
          if (!/.+@.+\..+/.test(email)) { throw { message: 'Correo inválido.' }; }
          if ((password || '').length < 8) { throw { message: 'La contraseña debe tener al menos 8 caracteres.' }; }
          const res = await createManagedUser({ nombre, email, password, rol: legacyTier(role) });
          const newUid = res && res.data && res.data.uid;
          if (newUid) { try { await assignUserRole(newUid, role, dept); } catch (e) { /* el trigger reconcilia; no crítico */ } }
          writeAudit('user_create', 'usuario ' + nombre, email + ' — rol: ' + (role.name || role._docId));
          close(); toast('✓ Usuario creado', 'ok');
        }
      } catch (e) {
        saveBtn.disabled = false; saveBtn.textContent = isEdit ? 'Guardar cambios' : 'Crear usuario';
        toast('No se pudo guardar: ' + (e.message || e.code || 'error'), 'error');
      }
    });

    document.body.append(overlay);
    nombreIn.focus();
  }

  /* ── Bloqueo / desbloqueo ────────────────────────────────── */
  async function toggleBlock(u) {
    const next = !u.bloqueado;
    if (store.get().mock) {
      const i = ui.users.findIndex((x) => x._docId === u._docId);
      if (i >= 0) ui.users[i] = { ...ui.users[i], bloqueado: next };
      renderList(); toast((next ? 'Bloqueado' : 'Desbloqueado') + ' (demo)', 'ok'); return;
    }
    try {
      await setUserBlocked(u._docId, next);
      writeAudit(next ? 'user_block' : 'user_unlock', 'usuario ' + (u.nombre || u.email), u.email || '');
      toast(next ? '✓ Usuario bloqueado' : '✓ Usuario desbloqueado', 'ok');
    } catch (e) { toast('No se pudo cambiar el estado: ' + (e.message || e.code), 'error'); }
  }

  /* ── Baja ────────────────────────────────────────────────── */
  async function confirmDelete(u) {
    if (!window.confirm('¿Eliminar a "' + (u.nombre || u.email) + '"?\n\nSe elimina su perfil y su cuenta de acceso. Esta acción no se puede deshacer.')) return;
    if (store.get().mock) {
      ui.users = ui.users.filter((x) => x._docId !== u._docId);
      renderList(); toast('Usuario eliminado (demo)', 'ok'); return;
    }
    try {
      await deleteManagedUser(u._docId);
      writeAudit('user_delete', 'usuario ' + (u.nombre || u.email), u.email || '');
      toast('✓ Usuario eliminado', 'ok');
    } catch (e) { toast('No se pudo eliminar: ' + (e.message || e.code), 'error'); }
  }

  /* ── Fila de usuario ─────────────────────────────────────── */
  function roleBadge(u) {
    if (isOwner(u)) return el('span', { class: 'badge badge--gold', text: 'CEO' });
    const r = roleById(u.roleId);
    const label = (r && r.name) || u.roleName || 'Sin asignar';
    if (r && r.color) {
      return el('span', { class: 'badge', style: { background: r.color + '22', color: r.color }, text: label });
    }
    return el('span', { class: r ? 'badge badge--info' : 'badge badge--warn', text: label });
  }

  function row(u) {
    const owner = isOwner(u);
    const isSelf = u._docId === myUid;
    const sub = [u.email, u.departmentName].filter(Boolean).join(' · ') || 'Sin datos';

    const badges = el('div', { class: 'usr-row__badges' }, [
      roleBadge(u),
      el('span', { class: 'badge ' + (u.bloqueado ? 'badge--danger' : 'badge--ok'), text: u.bloqueado ? 'Bloqueado' : 'Activo' }),
      u.habilitado2FA ? el('span', { class: 'badge badge--info', text: '2FA' }) : null,
    ]);

    const actions = el('div', { class: 'usr-row__actions' });
    if (owner) {
      actions.append(el('span', { class: 'usr-lock', title: 'El CEO solo se gestiona desde Mi Perfil', text: '🔒' }));
    } else {
      if (canEdit) {
        const editBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '✏️ Editar' });
        editBtn.addEventListener('click', () => openModal(u));
        actions.append(editBtn);
        const blockBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: u.bloqueado ? '🔓 Desbloquear' : '🚫 Bloquear', disabled: isSelf });
        if (!isSelf) blockBtn.addEventListener('click', () => toggleBlock(u));
        else blockBtn.title = 'No puedes bloquear tu propia cuenta';
        actions.append(blockBtn);
      }
      if (canDelete && !isSelf) {
        const delBtn = el('button', { class: 'btn btn--danger btn--sm', type: 'button', text: '🗑' });
        delBtn.addEventListener('click', () => confirmDelete(u));
        actions.append(delBtn);
      }
    }

    return el('div', { class: 'usr-row' + (u.bloqueado ? ' is-blocked' : '') }, [
      el('span', { class: 'avatar avatar--sm', 'aria-hidden': 'true', text: initials(u.nombre || u.email) }),
      el('div', { class: 'usr-row__main' }, [
        el('span', { class: 'usr-row__name u-truncate', text: (u.nombre || 'Sin nombre') + (isSelf ? ' (tú)' : '') }),
        el('span', { class: 'usr-row__sub u-caption u-faint u-truncate', title: sub, text: sub }),
      ]),
      badges,
      actions,
    ]);
  }

  /* ── Toolbar persistente (no recrear el buscador) ────────── */
  const countEl = el('span', { class: 'u-caption u-faint' });
  const searchInput = el('input', { type: 'search', placeholder: 'Buscar por nombre o correo…', 'aria-label': 'Buscar usuarios' });
  let searchTimer = null;
  searchInput.addEventListener('input', () => { clearTimeout(searchTimer); searchTimer = setTimeout(() => { ui.search = searchInput.value; renderList(); }, 180); });
  const search = el('div', { class: 'search' }, [el('span', { 'aria-hidden': 'true', text: '🔎' }), searchInput]);

  const roleFilter = el('select', { class: 'select usr-filter', 'aria-label': 'Filtrar por rol' });
  roleFilter.addEventListener('change', () => { ui.filter = roleFilter.value; renderList(); });

  const newBtn = canCreate ? el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: '＋ Nuevo usuario' }) : null;
  if (newBtn) newBtn.addEventListener('click', () => openModal(null));

  const toolbar = el('div', { class: 'usr-toolbar' }, [
    search, roleFilter,
    el('div', { class: 'u-row u-row--tight' }, [countEl, newBtn]),
  ]);
  const list = el('div', { class: 'usr-list' });
  wrap.append(toolbar, list);

  function syncRoleFilter() {
    const cur = ui.filter;
    clear(roleFilter);
    roleFilter.append(el('option', { value: '', text: 'Todos los roles' }));
    assignableRoles(ui.roles).forEach((r) => roleFilter.append(el('option', { value: r._docId, text: r.name || r._docId })));
    roleFilter.append(el('option', { value: '__none__', text: 'Sin rol asignado' }));
    roleFilter.value = cur;
  }

  function filtered() {
    const q = ui.search.trim().toLowerCase();
    return ui.users.filter((u) => {
      if (ui.filter === '__none__') { if (u.roleId && roleById(u.roleId)) return false; if (isOwner(u)) return false; }
      else if (ui.filter && u.roleId !== ui.filter) return false;
      if (!q) return true;
      return (String(u.nombre || '') + ' ' + String(u.email || '')).toLowerCase().includes(q);
    });
  }

  function renderList() {
    if (!ui.loaded) { clear(list); list.append(el('div', { class: 'state' }, [el('div', { class: 'state__msg', text: 'Cargando equipo…' })])); return; }
    const rows = filtered();
    countEl.textContent = ui.search.trim() || ui.filter ? `${rows.length} de ${ui.users.length}` : `${ui.users.length} usuario${ui.users.length === 1 ? '' : 's'}`;
    clear(list);
    if (!ui.users.length) {
      list.append(el('div', { class: 'state' }, [
        el('div', { class: 'state__icon', text: '👥' }),
        el('div', { class: 'state__title', text: 'Sin usuarios' }),
        el('div', { class: 'state__msg', text: 'Crea el primer miembro del equipo con “Nuevo usuario”.' }),
      ]));
      return;
    }
    if (!rows.length) {
      list.append(el('div', { class: 'state' }, [
        el('div', { class: 'state__icon', text: '🔍' }),
        el('div', { class: 'state__title', text: 'Sin resultados' }),
        el('div', { class: 'state__msg', text: 'Prueba con otro término o filtro.' }),
      ]));
      return;
    }
    rows.forEach((u) => list.append(row(u)));
  }

  /* ── Boot ────────────────────────────────────────────────── */
  if (store.get().mock) {
    ui.users = MOCK_USERS.map((u) => ({ ...u }));
    ui.roles = MOCK_ROLES.map((r) => ({ ...r }));
    ui.depts = MOCK_DEPARTMENTS.map((d) => ({ ...d }));
    ui.loaded = true; syncRoleFilter(); renderList();
  } else {
    renderList();
    ui.subUsers = subscribeUsers(
      (l) => { ui.users = l; ui.loaded = true; renderList(); },
      (e) => { ui.loaded = true; toast(e && e.code === 'permission-denied' ? 'Sin permiso para ver usuarios.' : 'No se pudo cargar el equipo.', 'error'); renderList(); },
    );
    ui.subRoles = subscribeRoles(
      (l) => { ui.roles = l; syncRoleFilter(); if (ui.loaded) renderList(); },
      () => {}, // sin permiso de roles: badges caen a "Sin asignar"/roleName denormalizado
    );
    fetchDepartments().then((l) => { ui.depts = l; }).catch(() => {});
  }

  return function cleanup() {
    if (ui.subUsers) ui.subUsers(); ui.subUsers = null;
    if (ui.subRoles) ui.subRoles(); ui.subRoles = null;
    clearTimeout(searchTimer);
  };
}
