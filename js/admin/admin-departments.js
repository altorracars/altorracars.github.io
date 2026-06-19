// §215 ④a PASO 3b — Admin Departments Module (UI sec-departments CRUD)
// ⟦OPUS-4.8 · rev-Fable⟧
//
// CRUD de la colección `departments/` (catálogo departamental, espejo LEAN de
// admin-roles.js: SIN matriz de permisos, SIN legacy/seed/migración). Gateado por
// `departments.manage` (escritura) / `departments.read` (lectura) vía AP.hasPermission.
// Las reglas (§215 PASO 3a) son la frontera real; esta UI es cosmética. El borrado lo
// bloquean las reglas si userCount>0 (§66) — la UI lo refleja deshabilitando el botón.
//
// CONSTRUCCIÓN DOM (no innerHTML): helper `el()` con createElement + textContent +
// setAttribute → XSS-safe por construcción (sin escape manual). Produce la MISMA
// estructura .roles-*/.alt-btn que el resto del admin (§3.2 — diseño idéntico, sin CSS
// nuevo → sin cache bump). Doctrina §17.12 (anti-MutationObserver: refresh explícito).
// docId `dept_<slug>` NFD estable — colección NUEVA sin interop clásico (L-42 no aplica).

(function () {
    'use strict';

    if (window.AltorraAdminDepartments) return; // idempotente

    var AP = null;

    var _state = {
        departments: [],
        unsub: null,
        currentDeptId: null,
        currentMode: null,      // 'create' | 'edit' | null
        firstSnapshotReceived: false,
        _modalOpen: false
    };

    var MAX_DEPARTMENTS = 50; // §66 cap del catálogo

    // ════════════════════════════════════════════════════════════════
    // DOM builder (sin innerHTML — XSS-safe por construcción)
    // ════════════════════════════════════════════════════════════════

    function el(tag, attrs, kids) {
        var n = document.createElement(tag);
        if (attrs) Object.keys(attrs).forEach(function (k) {
            var v = attrs[k];
            if (v == null || v === false) return;
            if (k === 'class') n.className = v;
            else if (k === 'text') n.textContent = v;        // auto-escapado
            else if (k === 'value') n.value = v;             // property, no atributo
            else if (k === 'checked') n.checked = !!v;
            else if (k === 'disabled') { if (v) n.setAttribute('disabled', ''); }
            else n.setAttribute(k, v === true ? '' : v);
        });
        if (kids != null) [].concat(kids).forEach(function (c) {
            if (c == null || c === false) return;
            n.appendChild(typeof c === 'object' ? c : document.createTextNode(String(c)));
        });
        return n;
    }
    function ico(name) { return el('i', { 'data-lucide': name }); }
    function $(id) { return document.getElementById(id); }

    function canManage() {
        return !!(window.AP && typeof window.AP.hasPermission === 'function'
            && (window.AP.hasPermission('departments.manage') || window.AP.hasPermission('*')));
    }
    function canRead() {
        return !!(window.AP && typeof window.AP.hasPermission === 'function'
            && (window.AP.hasPermission('departments.read') || canManage()));
    }

    function refreshIcons(scope) {
        if (window.AltorraIcons && window.AltorraIcons.refresh) window.AltorraIcons.refresh(scope || document);
        else if (window.lucide && window.lucide.createIcons) window.lucide.createIcons();
    }
    function toast(msg, type) {
        if (window.AP && typeof window.AP.toast === 'function') window.AP.toast(msg, type || 'info');
        else console.log('[Departments toast]', type, msg);
    }
    function currentUser() {
        return (window.AP && (window.AP.user || window.AP.currentUser)) || null;
    }
    function slugId(name) {
        var slug = String(name || '').toLowerCase()
            .normalize('NFD').replace(/[̀-ͯ]/g, '')
            .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
        return 'dept_' + (slug || 'sin-nombre');
    }
    function findDept(id) {
        for (var i = 0; i < _state.departments.length; i++) if (_state.departments[i]._docId === id) return _state.departments[i];
        return null;
    }

    // ════════════════════════════════════════════════════════════════
    // Listener Firestore real-time
    // ════════════════════════════════════════════════════════════════

    function startListener() {
        if (_state.unsub) return;
        if (!window.db) { setTimeout(startListener, 1000); return; }
        try {
            _state.unsub = window.db.collection('departments').limit(MAX_DEPARTMENTS)
                .onSnapshot(function (snap) {
                    _state.firstSnapshotReceived = true;
                    _state.departments = [];
                    snap.forEach(function (doc) { var d = doc.data() || {}; d._docId = doc.id; _state.departments.push(d); });
                    _state.departments.sort(function (a, b) { return String(a.name || '').localeCompare(String(b.name || ''), 'es'); });
                    render();
                }, function (err) {
                    console.error('[AdminDepartments] onSnapshot error:', err && err.message);
                    renderEmpty('building-2', 'No se pudo cargar: ' + (err && (err.code || err.message)));
                });
        } catch (e) { console.error('[AdminDepartments] startListener throw:', e); }
    }
    function stopListener() {
        if (_state.unsub) { try { _state.unsub(); } catch (e) {} _state.unsub = null; }
    }

    // ════════════════════════════════════════════════════════════════
    // Render (DOM puro)
    // ════════════════════════════════════════════════════════════════

    function mount(/* ...nodes */) {
        var root = $('departmentsContainer');
        if (!root) return;
        root.replaceChildren.apply(root, [].slice.call(arguments).filter(Boolean));
        refreshIcons(root);
    }

    function renderEmpty(icon, msg, sub) {
        mount(el('div', { class: 'roles-empty' }, [
            el('div', { class: 'roles-empty-icon' }, ico(icon || 'building-2')),
            el('h3', { class: 'roles-empty-title', text: msg }),
            sub ? el('p', { class: 'roles-empty-text', text: sub }) : null
        ]));
    }

    function headerNode() {
        var count = _state.departments.length;
        var actions = el('div', { class: 'roles-header-actions' });
        if (canManage()) {
            var atCap = count >= MAX_DEPARTMENTS;
            actions.appendChild(el('button', {
                class: 'alt-btn alt-btn--primary', 'data-action': 'create-dept',
                disabled: atCap, title: atCap ? ('Límite de ' + MAX_DEPARTMENTS + ' departamentos') : null
            }, [ico('plus'), ' Nuevo departamento']));
        }
        return el('div', { class: 'roles-header' }, [
            el('div', { class: 'roles-header-stats' },
                el('span', { class: 'roles-header-count', text: count + ' departamento' + (count === 1 ? '' : 's') })),
            actions
        ]);
    }

    function cardNode(d) {
        var color = /^#[0-9a-fA-F]{3,8}$/.test(d.color || '') ? d.color : '#b89658';
        var icon = (typeof d.icon === 'string' && d.icon) ? d.icon : 'building-2';
        var users = Number(d.userCount || 0);
        // Estructura .role-card EXACTA de admin-roles.js (clases CSS verificadas;
        // el color va por la var --role-color que consume .role-card-icon).
        var kids = [
            el('header', { class: 'role-card-header' }, [
                el('div', { class: 'role-card-icon' }, ico(icon)),
                el('div', { class: 'role-card-meta' }, [
                    el('h3', { class: 'role-card-name', text: d.name || '(sin nombre)' }),
                    el('div', { class: 'role-card-badges' }, d.active === false ? el('span', { class: 'role-card-badge', text: 'inactivo' }) : null)
                ])
            ]),
            el('p', { class: 'role-card-description', text: d.description || 'Sin descripción.' }),
            el('div', { class: 'role-card-stats' }, [
                el('div', { class: 'role-card-stat' }, [ico('layers'), ' nivel ' + (d.nivel == null ? 10 : d.nivel)]),
                el('div', { class: 'role-card-stat' }, [ico('users'), ' ' + users + ' usuario' + (users === 1 ? '' : 's')])
            ])
        ];
        if (canManage()) {
            kids.push(el('footer', { class: 'role-card-actions' }, [
                el('button', { class: 'alt-btn alt-btn--ghost alt-btn--sm', 'data-action': 'edit-dept', 'data-dept-id': d._docId }, [ico('pencil'), ' Editar']),
                el('button', {
                    class: 'alt-btn alt-btn--ghost alt-btn--sm alt-btn--danger', 'data-action': 'delete-dept', 'data-dept-id': d._docId,
                    disabled: users > 0, title: users > 0 ? ('No se puede borrar: ' + users + ' usuario(s)') : null
                }, [ico('trash-2'), ' Eliminar'])
            ]));
        }
        return el('article', { class: 'role-card', style: '--role-color: ' + color, 'data-dept-id': d._docId }, kids);
    }

    function render() {
        if (!$('departmentsContainer')) return;
        if (!canRead()) { renderEmpty('lock', 'No tenés permiso para ver departamentos.'); return; }
        if (!_state.firstSnapshotReceived) { mount(headerNode()); return; }
        if (!_state.departments.length) {
            mount(headerNode(), el('div', { class: 'roles-empty' }, [
                el('div', { class: 'roles-empty-icon' }, ico('building-2')),
                el('h3', { class: 'roles-empty-title', text: 'Aún no hay departamentos' }),
                el('p', { class: 'roles-empty-text', text: canManage()
                    ? 'Creá el primero (ej. Comercial, Administrativo, Marketing, Dirección).'
                    : 'El administrador aún no creó departamentos.' })
            ]));
            return;
        }
        var grid = el('div', { class: 'roles-grid' });
        for (var i = 0; i < _state.departments.length; i++) grid.appendChild(cardNode(_state.departments[i]));
        mount(headerNode(), grid);
    }

    // ════════════════════════════════════════════════════════════════
    // Modal crear/editar (DOM puro)
    // ════════════════════════════════════════════════════════════════

    // Campo del modal con clases reales .roles-modal-field/--full + .roles-modal-label.
    function field(labelText, control, full, required) {
        return el('label', { class: 'roles-modal-field' + (full ? ' roles-modal-field--full' : '') }, [
            el('span', { class: 'roles-modal-label' }, [labelText, required ? el('span', { class: 'roles-modal-required', text: ' *' }) : null]),
            control
        ]);
    }

    function openModal(mode, deptId) {
        if (!canManage()) { toast('Solo con permiso departments.manage', 'error'); return; }
        _state.currentMode = mode;
        _state.currentDeptId = deptId || null;
        var d = deptId ? findDept(deptId) : { name: '', description: '', color: '#b89658', icon: 'building-2', nivel: 10, active: true };
        if (!d) { toast('Departamento no encontrado', 'error'); return; }

        // Estructura de modal EXACTA de admin-roles.js (header/body/section/grid/field/footer).
        var grid = el('div', { class: 'roles-modal-grid' }, [
            field('Nombre', el('input', { type: 'text', id: 'deptName', maxlength: '60', value: d.name || '' }), false, true),
            field('Color', el('div', { class: 'roles-modal-color-row' }, el('input', { type: 'color', id: 'deptColor', value: /^#[0-9a-fA-F]{6}$/.test(d.color || '') ? d.color : '#b89658' })), false, false),
            field('Icono (lucide)', el('input', { type: 'text', id: 'deptIcon', maxlength: '40', value: d.icon || 'building-2', placeholder: 'building-2' })),
            field('Nivel', el('input', { type: 'number', id: 'deptNivel', min: '0', max: '100', value: String(d.nivel == null ? 10 : d.nivel) })),
            field('Descripción', el('textarea', { id: 'deptDesc', maxlength: '200', rows: '3', value: d.description || '' }), true),
            field('Activo', el('input', { type: 'checkbox', id: 'deptActive', checked: d.active !== false }), true)
        ]);
        var modal = el('div', { class: 'roles-modal', role: 'dialog', 'aria-modal': 'true', 'data-no-close': true }, [
            el('header', { class: 'roles-modal-header' }, [
                el('h2', { class: 'roles-modal-title', text: mode === 'edit' ? 'Editar departamento' : 'Nuevo departamento' }),
                el('button', { class: 'roles-modal-close', 'data-action': 'close-dept-modal', 'aria-label': 'Cerrar' }, ico('x'))
            ]),
            el('div', { class: 'roles-modal-body' }, el('section', { class: 'roles-modal-section' }, grid)),
            el('footer', { class: 'roles-modal-footer' }, [
                el('button', { class: 'alt-btn alt-btn--ghost', 'data-action': 'close-dept-modal', text: 'Cancelar' }),
                el('button', { class: 'alt-btn alt-btn--primary', 'data-action': 'save-dept' }, [ico('save'), ' Guardar'])
            ])
        ]);
        // Backdrop SIN data-action (el cierre por backdrop se maneja por id en bindEvents,
        // así un click DENTRO del modal no burbujea a un cierre accidental).
        var backdrop = el('div', { class: 'roles-modal-backdrop', id: 'deptModal' }, modal);
        document.body.appendChild(backdrop);
        _state._modalOpen = true;
        refreshIcons(backdrop);
        if ($('deptName')) $('deptName').focus();
    }

    function closeModal() {
        var m = $('deptModal');
        if (m && m.parentNode) m.parentNode.removeChild(m);
        _state._modalOpen = false; _state.currentMode = null; _state.currentDeptId = null;
    }

    function saveDept() {
        if (!canManage()) { toast('Solo con permiso departments.manage', 'error'); return; }
        var name = (($('deptName') && $('deptName').value) || '').trim();
        if (!name) { toast('El nombre es obligatorio', 'error'); return; }
        var nivelRaw = parseInt(($('deptNivel') && $('deptNivel').value), 10);
        var nivel = isNaN(nivelRaw) ? 10 : Math.max(0, Math.min(100, nivelRaw));
        var u = currentUser();
        var payload = {
            name: name,
            description: (($('deptDesc') && $('deptDesc').value) || '').trim(),
            color: ($('deptColor') && $('deptColor').value) || '#b89658',
            icon: (($('deptIcon') && $('deptIcon').value) || '').trim() || 'building-2',
            nivel: nivel,
            active: !!($('deptActive') && $('deptActive').checked),
            updatedAt: new Date().toISOString(),
            updatedBy: (u && u.uid) || null,
            updatedByName: (u && (u.nombre || u.displayName)) || 'admin'
        };
        var btn = document.querySelector('[data-action="save-dept"]');
        if (btn) btn.disabled = true;

        var isEdit = _state.currentMode === 'edit' && _state.currentDeptId;
        var ref = window.db.collection('departments').doc(isEdit ? _state.currentDeptId : slugId(name));
        var p = isEdit ? ref.update(payload) : ref.get().then(function (snap) {
            if (snap.exists) throw { code: 'already-exists' };
            payload.userCount = 0;
            payload.createdAt = new Date().toISOString();
            payload.createdBy = payload.updatedBy;
            payload.createdByName = payload.updatedByName;
            payload._version = 1;
            return ref.set(payload);
        });
        p.then(function () {
            toast(isEdit ? 'Departamento actualizado' : 'Departamento creado', 'success');
            closeModal();
        }).catch(function (err) {
            var code = err && err.code;
            var msg = code === 'already-exists' ? 'Ya existe un departamento con ese nombre'
                : (window.AP && window.AP.parseCallableError ? window.AP.parseCallableError(err) : (code || (err && err.message) || 'Error'));
            toast('No se pudo guardar: ' + msg, 'error');
            if (btn) btn.disabled = false;
        });
    }

    function deleteDept(id) {
        if (!canManage()) { toast('Solo con permiso departments.manage', 'error'); return; }
        var d = findDept(id);
        if (!d) return;
        if (Number(d.userCount || 0) > 0) { toast('No se puede borrar: ' + d.userCount + ' usuario(s) asignado(s) (§66)', 'error'); return; }
        if (!window.confirm('¿Eliminar el departamento "' + (d.name || id) + '"? No se puede deshacer.')) return;
        window.db.collection('departments').doc(id).delete()
            .then(function () { toast('Departamento eliminado', 'success'); })
            .catch(function (err) {
                toast('No se pudo eliminar: ' + (err && (err.code || err.message) || 'Error') +
                    (err && err.code === 'permission-denied' ? ' (¿tiene usuarios asignados?)' : ''), 'error');
            });
    }

    // ════════════════════════════════════════════════════════════════
    // Eventos (delegación)
    // ════════════════════════════════════════════════════════════════

    function bindEvents() {
        document.addEventListener('click', function (e) {
            // Cierre SOLO por click directo en el backdrop (no en su contenido).
            if (e.target && e.target.id === 'deptModal') { e.preventDefault(); closeModal(); return; }
            var btn = e.target.closest && e.target.closest('[data-action]');
            if (!btn) return;
            if (!btn.closest('#sec-departments') && !btn.closest('#deptModal')) return;
            var action = btn.getAttribute('data-action');
            switch (action) {
                case 'create-dept': e.preventDefault(); openModal('create'); break;
                case 'edit-dept': e.preventDefault(); openModal('edit', btn.getAttribute('data-dept-id')); break;
                case 'delete-dept': e.preventDefault(); deleteDept(btn.getAttribute('data-dept-id')); break;
                case 'save-dept': e.preventDefault(); saveDept(); break;
                case 'close-dept-modal': e.preventDefault(); closeModal(); break;
            }
        });
    }

    // ════════════════════════════════════════════════════════════════
    // Init + activación por sección
    // ════════════════════════════════════════════════════════════════

    function init() {
        AP = window.AP;
        bindEvents();
        if (window.AltorraSections && window.AltorraSections.onChange) {
            window.AltorraSections.onChange(function (section) {
                if (section === 'departments') {
                    if (!canRead()) { renderEmpty('lock', 'No tenés permiso para ver departamentos.'); return; }
                    if (!_state.unsub) startListener();
                    render();
                } else if (_state.unsub) { stopListener(); }
            });
        }
        var section = $('sec-departments');
        if (section && section.classList.contains('active')) {
            if (canRead()) { startListener(); render(); }
            else renderEmpty('lock', 'No tenés permiso para ver departamentos.');
        }
        console.log('[AdminDepartments] §215 ④a init complete');
    }

    window.AltorraAdminDepartments = {
        init: init, startListener: startListener, stopListener: stopListener,
        render: render, _state: function () { return _state; }
    };

    function tryInit() {
        if (window.AP && window.AltorraRBACCatalog) init();
        else setTimeout(tryInit, 250);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', tryInit);
    else tryInit();
})();
