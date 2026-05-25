// §61.R2 — Admin Roles Module (UI sec-roles CRUD)
//
// Pantalla de gestión de roles dinámicos. Permite al super_admin:
//   - Ver lista de roles (system + custom) con count de usuarios
//   - Crear roles personalizados con permissions matrix (checkboxes)
//   - Editar roles existentes (excepto system roles)
//   - Eliminar roles custom (con guard si tienen users asignados)
//   - Sembrar 3 system roles del catálogo canónico (R1)
//
// Source of truth: Firestore collection `roles/`. Real-time via onSnapshot.
// Catálogo de permissions: window.AltorraRBACCatalog (R1).
//
// REGLA: este módulo SOLO renderiza UI y orquesta CRUD. La validación
// de permisos vive en firestore.rules (write super_admin only) +
// admin-group-tabs.js (sec-roles oculta para non-super_admin).
//
// Doctrina: §17.4 (HTML/CSS estable), §17.12 (anti-MutationObserver),
// §35 (cero pointermove), §37 (IAP), §61 Plan Maestro.

(function () {
    'use strict';

    if (window.AltorraAdminRoles) return; // idempotente

    var AP = null; // se setea en init() cuando admin-state.js cargó

    var _state = {
        roles: [],          // cache de roles en Firestore
        unsub: null,        // listener onSnapshot
        currentRoleId: null,// role id activo en el modal
        currentMode: null,  // 'create' | 'edit' | null
        userCounts: null,   // { roleId: count } cached, refrescado on-demand
        lastListenerError: null,
        _modalOpen: false,
        // §73.3 — Flag que evita el flicker entre defaults y data real
        // del Firestore. Se setea a true en el primer snap callback.
        // Antes de eso, render() muestra solo el header sin empty state.
        firstSnapshotReceived: false
    };

    var MAX_ROLES = 100;

    // ════════════════════════════════════════════════════════════════
    // Helpers básicos
    // ════════════════════════════════════════════════════════════════

    function $(id) { return document.getElementById(id); }

    function escapeHtml(str) {
        var div = document.createElement('div');
        div.textContent = (str == null ? '' : String(str));
        return div.innerHTML;
    }

    /**
     * §61.R8 (PENDIENTE-B, 2026-05-16) — Helper local canónico.
     * Chequea wildcard '*' usando AP.hasPermission directo.
     * Eliminado fallback legacy a AP.isSuperAdmin() — toda la cadena
     * de carga (rbac-catalog.js + admin-state.js) está garantizada
     * antes de cualquier callsite de admin-roles.js.
     */
    function isSuperAdmin() {
        return !!(window.AP && typeof window.AP.hasPermission === 'function'
                  && window.AP.hasPermission('*'));
    }

    function refreshIcons(scope) {
        if (window.AltorraIcons && window.AltorraIcons.refresh) {
            window.AltorraIcons.refresh(scope || document);
        } else if (window.lucide && window.lucide.createIcons) {
            window.lucide.createIcons();
        }
    }

    function toast(msg, type) {
        if (window.AP && typeof window.AP.toast === 'function') {
            window.AP.toast(msg, type || 'info');
        } else if (window.notify) {
            window.notify[type || 'info']({ title: msg });
        } else {
            console.log('[Roles toast]', type, msg);
        }
    }

    function timeAgo(iso) {
        if (window.AP && typeof window.AP.timeAgo === 'function') {
            return window.AP.timeAgo(iso);
        }
        try {
            var d = new Date(iso);
            return d.toLocaleString('es-CO');
        } catch (e) { return ''; }
    }

    // ════════════════════════════════════════════════════════════════
    // Listener Firestore real-time
    // ════════════════════════════════════════════════════════════════

    // §61.R2 + §66.2 hotfix — Listener simple sin orderBy compuesto.
    // La colección `roles/` es chica (<20 docs en práctica), así que
    // ordenar client-side es trivial y NO requiere índice compuesto
    // de Firestore (que sería un deploy adicional + ruido en consola).
    function startListener() {
        if (_state.unsub) return; // ya activo
        if (!window.db) {
            console.warn('[AdminRoles] §61.R2 startListener: window.db no disponible aún. Reintento en 1s.');
            setTimeout(startListener, 1000);
            return;
        }

        try {
            _state.unsub = window.db.collection('roles')
                .limit(MAX_ROLES)
                .onSnapshot(function (snap) {
                    _state.lastListenerError = null;
                    _state.firstSnapshotReceived = true; // §73.3 — eliminamos flicker
                    _state.roles = [];
                    // §72 R7.2 — Track si CEO (system_super_admin) existe en
                    // Firestore. Si existe, el empty state debe ofrecer
                    // "Crear primer rol custom" (no "Sembrar sistema").
                    _state.ceoExists = false;
                    // §73.2 — Track si docs huérfanos system_editor/viewer
                    // existen en Firestore. Si existen, mostrar botón
                    // "Limpiar legacy". Sino, ocultar (sistema limpio).
                    _state.hasLegacyDocs = false;
                    snap.forEach(function (doc) {
                        var data = doc.data() || {};
                        data._docId = doc.id;
                        // §69 R7 — Filtrar system roles legacy (system_editor,
                        // system_viewer) y system_super_admin (CEO) de la
                        // lista visible. CEO es inmutable e invisible. Editor
                        // y Viewer legacy quedan en Firestore para no romper
                        // users existentes (R4 migration), pero no se muestran
                        // como opciones para crear nuevos.
                        if (doc.id === 'system_super_admin') {
                            _state.ceoExists = true;
                            return; // skip — no agregar a la lista visible
                        }
                        if (doc.id === 'system_editor'
                            || doc.id === 'system_viewer') {
                            _state.hasLegacyDocs = true; // §73.2
                            return; // skip — no agregar a la lista visible
                        }
                        _state.roles.push(data);
                    });
                    // Ordenamiento alfabético (system roles ya filtrados)
                    _state.roles.sort(function (a, b) {
                        return (a.name || '').localeCompare(b.name || '');
                    });
                    console.log('[AdminRoles] §73.2 snapshot — visibles:', _state.roles.length, '| CEO existe:', _state.ceoExists, '| docs legacy:', _state.hasLegacyDocs);
                    render();
                }, function (err) {
                    // Errores esperados (cross-tab logout, permissions denied al sign out)
                    if (window.auth && !window.auth.currentUser) return;
                    _state.lastListenerError = err;
                    console.error('[AdminRoles] §61.R2 listener error:', err);
                    if (err.code === 'permission-denied') {
                        renderEmpty('No tenés permisos para ver los roles. Solo super_admin puede acceder a esta sección.');
                    } else {
                        renderEmpty('Error al cargar roles: ' + (err.message || err.code || 'desconocido'));
                    }
                });
        } catch (e) {
            console.error('[AdminRoles] §61.R2 startListener throw:', e);
        }
    }

    function stopListener() {
        if (_state.unsub) {
            try { _state.unsub(); } catch (e) {}
            _state.unsub = null;
        }
    }

    // ════════════════════════════════════════════════════════════════
    // Cálculo de userCounts (cuántos usuarios tiene cada role)
    // ════════════════════════════════════════════════════════════════

    function refreshUserCounts() {
        if (!window.db) return Promise.resolve({});
        return window.db.collection('usuarios').get()
            .then(function (snap) {
                var counts = {};
                // §73.2 — Track usuarios legacy:
                //   - hasLegacyUsersWithSystemRoleId: con roleId apuntando
                //     a system_editor o system_viewer (necesitan cleanup)
                //   - hasLegacyUsersWithoutRoleId: con rol legacy pero sin
                //     roleId (necesitan migración R4)
                _state.hasLegacyUsersWithSystemRoleId = false;
                _state.hasLegacyUsersWithoutRoleId = false;
                snap.forEach(function (doc) {
                    var data = doc.data() || {};
                    var roleId = data.roleId;
                    // §73.2 — detectar huérfanos system_editor/viewer
                    if (roleId === 'system_editor' || roleId === 'system_viewer') {
                        _state.hasLegacyUsersWithSystemRoleId = true;
                    }
                    // §73.2 — detectar users legacy sin roleId que tienen rol
                    // legacy editor/viewer (susceptibles de migración R4)
                    if (!roleId && (data.rol === 'editor' || data.rol === 'viewer')) {
                        _state.hasLegacyUsersWithoutRoleId = true;
                    }
                    if (!roleId) {
                        // Legacy fallback: mapear desde rol
                        if (window.AltorraRBACCatalog && data.rol) {
                            roleId = window.AltorraRBACCatalog.legacyMapping[data.rol] || null;
                        }
                    }
                    if (roleId) {
                        counts[roleId] = (counts[roleId] || 0) + 1;
                    }
                });
                _state.userCounts = counts;
                console.log('[AdminRoles] §73.2 userCounts —',
                    'totalRoles:', Object.keys(counts).length,
                    '| legacy (system_editor/viewer roleId):', _state.hasLegacyUsersWithSystemRoleId,
                    '| legacy (sin roleId):', _state.hasLegacyUsersWithoutRoleId);
                return counts;
            })
            .catch(function (err) {
                console.warn('[AdminRoles] §61.R2 refreshUserCounts error:', err && err.message);
                _state.userCounts = {};
                _state.hasLegacyUsersWithSystemRoleId = false;
                _state.hasLegacyUsersWithoutRoleId = false;
                return {};
            });
    }

    // ════════════════════════════════════════════════════════════════
    // Render lista de roles
    // ════════════════════════════════════════════════════════════════

    // §73.2 — Re-render solo del header tras detección async de legacy
    // (refreshUserCounts). Si los flags de visibilidad cambiaron desde
    // el último render del header, reemplazar el HTML del header in-place
    // sin tocar el grid. Si no cambiaron, no-op (cero costo).
    // §73.4 — También trackea `seedSystem` flag para detectar si el botón
    // "Resembrar sistema" cambió visibilidad (cuando ceoExists pasa de
    // false a true tras un seed manual, o vice versa).
    var _lastRenderedHeaderState = { cleanup: null, migrate: null, seedSystem: null };
    function refreshHeaderIfLegacyChanged() {
        var currentCleanup = !!(_state.hasLegacyDocs || _state.hasLegacyUsersWithSystemRoleId);
        var currentMigrate = !!_state.hasLegacyUsersWithoutRoleId;
        var currentSeedSystem = _state.firstSnapshotReceived && !_state.ceoExists;
        if (_lastRenderedHeaderState.cleanup === currentCleanup
            && _lastRenderedHeaderState.migrate === currentMigrate
            && _lastRenderedHeaderState.seedSystem === currentSeedSystem) {
            return; // sin cambios, no re-render
        }
        _lastRenderedHeaderState.cleanup = currentCleanup;
        _lastRenderedHeaderState.migrate = currentMigrate;
        _lastRenderedHeaderState.seedSystem = currentSeedSystem;
        var oldHeader = document.querySelector('#rolesContainer .roles-header');
        if (!oldHeader) return; // header no presente (renderEmpty u otra cosa)
        oldHeader.outerHTML = renderRolesHeader();
        var newHeader = document.querySelector('#rolesContainer .roles-header');
        if (newHeader) refreshIcons(newHeader);
        console.log('[AdminRoles] §73.4 header re-rendered: cleanup=' + currentCleanup + ' migrate=' + currentMigrate + ' seedSystem=' + currentSeedSystem);
    }

    // §73.1 hotfix — header de acciones SIEMPRE visible para super_admin.
    // §73.2 — auto-hide inteligente: los botones de mantenimiento legacy
    // solo se muestran cuando son necesarios:
    //   - "Limpiar legacy": visible si hasLegacyDocs (system_editor/viewer
    //     en Firestore) O hasLegacyUsersWithSystemRoleId (users con roleId
    //     huérfano apuntando a esos system roles)
    //   - "Migrar legacy": visible si hasLegacyUsersWithoutRoleId (users
    //     con campo `rol` legacy pero sin roleId, susceptibles de R4)
    //   - "Resembrar sistema" (§73.4): visible SOLO si ceoExists=false
    //     (caso edge: CEO no sembrado). Antes era siempre visible pero
    //     en flujo normal del cliente no es necesario. Si en el futuro
    //     se actualiza el catálogo canónico (agregar nuevos permissions),
    //     se invocará desde DevTools console:
    //         window.AltorraAdminRoles.seedSystemRoles()
    //   - "Nuevo rol": SIEMPRE visible (CTA principal)
    function renderRolesHeader() {
        var rolesCount = (_state.roles && _state.roles.length) || 0;

        // §73.2 — Detectar si los botones legacy son necesarios.
        // Si hasLegacyDocs/hasLegacyUsers* aún no se han calculado
        // (refreshUserCounts no completó), default false (oculto)
        // hasta que el detector confirme. Re-render tras la detección.
        var showCleanupLegacy = !!(_state.hasLegacyDocs || _state.hasLegacyUsersWithSystemRoleId);
        var showMigrateLegacy = !!_state.hasLegacyUsersWithoutRoleId;
        // §73.4 — "Resembrar sistema" auto-hide. Solo visible si CEO no
        // sembrado (caso edge inicial o post-borrado manual de Firestore).
        // Durante loading inicial (firstSnapshotReceived=false), también
        // se oculta para evitar flicker.
        var showSeedSystem = _state.firstSnapshotReceived && !_state.ceoExists;

        var html = '<div class="roles-header">' +
            '<div class="roles-header-stats">' +
            '<span class="roles-header-count">' + rolesCount + ' rol' + (rolesCount === 1 ? '' : 'es') + '</span>' +
            '</div>' +
            '<div class="roles-header-actions">';

        if (showCleanupLegacy) {
            html += '<button class="alt-btn alt-btn--ghost" data-action="cleanup-legacy" title="Elimina los docs huérfanos roles/system_editor y roles/system_viewer del catálogo + reset de usuarios con esos roleId. Acción destructiva.">' +
                '<i data-lucide="archive-x"></i> Limpiar legacy</button>';
        }
        if (showMigrateLegacy) {
            html += '<button class="alt-btn alt-btn--ghost" data-action="migrate-legacy" title="Migra usuarios pre-existentes (legacy) al sistema dinámico de roles. Idempotente — re-ejecutable sin riesgo.">' +
                '<i data-lucide="users-round"></i> Migrar legacy</button>';
        }
        if (showSeedSystem) {
            html += '<button class="alt-btn alt-btn--ghost" data-action="seed-system-roles" title="Inicializa el catálogo de permisos + el rol CEO en Firestore. Idempotente.">' +
                '<i data-lucide="refresh-cw"></i> Resembrar sistema</button>';
        }
        // Solo "Nuevo rol" siempre visible (CTA principal)
        html += '<button class="alt-btn alt-btn--primary" data-action="create-role">' +
            '<i data-lucide="plus"></i> Nuevo rol</button>' +
            '</div></div>';

        return html;
    }

    function render() {
        var root = $('rolesContainer');
        if (!root) return;

        var su = isSuperAdmin();
        if (!su) {
            renderEmpty('Solo el super_admin puede gestionar roles.');
            return;
        }

        // §73.3 — Loading state inicial mientras llega el primer snapshot
        // del listener Firestore. Evita el flicker que el cliente reportó:
        // antes el primer render usaba defaults (_state.ceoExists=false) y
        // mostraba "Inicializar sistema" durante 50-200ms hasta que llegaba
        // el snapshot real con ceoExists=true. Ahora durante ese gap solo
        // se muestra el header (sin empty state confuso).
        if (!_state.firstSnapshotReceived) {
            root.innerHTML = renderRolesHeader();
            refreshIcons(root);
            return;
        }

        // §73.3 — Empty state UNIFICADO. Antes había 2 casos:
        //   Caso A (ceoExists=false): "Inicializar el sistema de roles"
        //                              + botón "Inicializar sistema"
        //   Caso B (ceoExists=true):  "Creá tu primer rol personalizado"
        //                              + botón "Crear nuevo rol"
        // El Caso A fue ELIMINADO porque su botón "Inicializar sistema"
        // era duplicado del botón "Resembrar sistema" del header (que
        // siempre está visible). Si el sistema NO está sembrado, el
        // texto del empty state ahora dirige al cliente a usar
        // "Resembrar sistema" del header — UNA sola fuente de verdad.
        // §73.1 hotfix — render header SIEMPRE para que las acciones admin
        // (Limpiar legacy, Migrar legacy, Resembrar, Nuevo rol) estén siempre visibles
        if (!_state.roles || _state.roles.length === 0) {
            var emptyTitle, emptyText, emptyActions;
            if (_state.ceoExists) {
                // CEO sembrado, falta crear customs (caso normal post-cleanup)
                emptyTitle = 'Creá tu primer rol personalizado';
                emptyText = 'El rol CEO está activo (vos). Ahora podés crear roles para asesores, lectores o cualquier perfil que necesites, con los permisos que vos elijas por checkbox.';
                emptyActions = '<div class="roles-empty-actions">' +
                    '<button class="alt-btn alt-btn--primary" data-action="create-role">' +
                    '<i data-lucide="plus"></i> Crear nuevo rol</button>' +
                    '</div>';
            } else {
                // Caso edge: CEO no sembrado. Dirigir al header.
                emptyTitle = 'Sistema sin inicializar';
                emptyText = 'El sistema aún no tiene rol CEO sembrado. Usá el botón "Resembrar sistema" del header arriba para inicializar el catálogo + el rol CEO. Después podés crear roles personalizados.';
                emptyActions = ''; // sin botón duplicado del header
            }
            var emptyHtml = '<div class="roles-empty">' +
                '<div class="roles-empty-icon"><i data-lucide="shield-plus"></i></div>' +
                '<h3 class="roles-empty-title">' + emptyTitle + '</h3>' +
                '<p class="roles-empty-text">' + emptyText + '</p>' +
                emptyActions +
                '</div>';
            // §73.1 — Header con acciones admin SIEMPRE visible (incluso sin customs)
            root.innerHTML = renderRolesHeader() + emptyHtml;
            refreshIcons(root);
            // §73.2 — refreshUserCounts detecta legacy users y permite que
            // los botones "Limpiar legacy" / "Migrar legacy" aparezcan SOLO
            // si son necesarios. Re-render del header tras la detección
            // (re-llama render() para actualizar visibilidad condicional).
            refreshUserCounts().then(function () {
                updateUserCountsDom();
                // Re-render solo si la detección cambió la visibilidad
                // de los botones legacy (evita re-render innecesario)
                refreshHeaderIfLegacyChanged();
            });
            return;
        }

        // Render header (extraído a renderRolesHeader §73.1)
        var headerHtml = renderRolesHeader();

        // Render grid de roles
        var gridHtml = '<div class="roles-grid">';
        for (var i = 0; i < _state.roles.length; i++) {
            gridHtml += renderRoleCard(_state.roles[i]);
        }
        gridHtml += '</div>';

        root.innerHTML = headerHtml + gridHtml;
        refreshIcons(root);

        // Refresh user counts en background y re-render
        refreshUserCounts().then(function () {
            updateUserCountsDom();
            // §73.2 — Re-render header si la detección de legacy cambió
            refreshHeaderIfLegacyChanged();
        });
    }

    function renderRoleCard(role) {
        var permsCount = Array.isArray(role.permissions) ? role.permissions.length : 0;
        var hasWildcard = Array.isArray(role.permissions) && role.permissions.indexOf('*') !== -1;
        var color = role.color || '#b89658';
        var icon = role.icon || 'shield';
        var systemBadge = role.isSystem
            ? '<span class="role-card-badge role-card-badge--system" title="Rol del sistema. No editable."><i data-lucide="lock"></i> Sistema</span>'
            : '';
        var defaultBadge = role.isDefault
            ? '<span class="role-card-badge role-card-badge--default" title="Asignado por default a nuevos usuarios"><i data-lucide="star"></i> Default</span>'
            : '';
        var permsLabel = hasWildcard ? 'Acceso total' : (permsCount + ' permiso' + (permsCount === 1 ? '' : 's'));
        var userCount = (_state.userCounts && _state.userCounts[role._docId]) || 0;

        return '<article class="role-card" data-role-id="' + escapeHtml(role._docId) + '" style="--role-color: ' + escapeHtml(color) + ';">' +
            '<header class="role-card-header">' +
            '<div class="role-card-icon"><i data-lucide="' + escapeHtml(icon) + '"></i></div>' +
            '<div class="role-card-meta">' +
            '<h3 class="role-card-name">' + escapeHtml(role.name || role._docId) + '</h3>' +
            '<div class="role-card-badges">' + systemBadge + defaultBadge + '</div>' +
            '</div>' +
            '</header>' +
            '<p class="role-card-description">' + escapeHtml(role.description || 'Sin descripción.') + '</p>' +
            '<div class="role-card-stats">' +
            '<div class="role-card-stat"><i data-lucide="key"></i> ' + escapeHtml(permsLabel) + '</div>' +
            '<div class="role-card-stat" data-user-count-for="' + escapeHtml(role._docId) + '">' +
            '<i data-lucide="users"></i> ' + userCount + ' usuario' + (userCount === 1 ? '' : 's') + '</div>' +
            '</div>' +
            '<footer class="role-card-actions">' +
            '<button class="alt-btn alt-btn--ghost alt-btn--sm" data-action="edit-role" data-role-id="' + escapeHtml(role._docId) + '">' +
            '<i data-lucide="' + (role.isSystem ? 'eye' : 'pencil') + '"></i> ' + (role.isSystem ? 'Ver' : 'Editar') + '</button>' +
            (!role.isSystem
                ? '<button class="alt-btn alt-btn--ghost alt-btn--sm alt-btn--danger" data-action="delete-role" data-role-id="' + escapeHtml(role._docId) + '"><i data-lucide="trash-2"></i> Eliminar</button>'
                : '') +
            '</footer>' +
            '</article>';
    }

    function updateUserCountsDom() {
        if (!_state.userCounts) return;
        var els = document.querySelectorAll('[data-user-count-for]');
        for (var i = 0; i < els.length; i++) {
            var roleId = els[i].getAttribute('data-user-count-for');
            var count = _state.userCounts[roleId] || 0;
            els[i].innerHTML = '<i data-lucide="users"></i> ' + count + ' usuario' + (count === 1 ? '' : 's');
        }
        refreshIcons();
    }

    function renderEmpty(msg) {
        var root = $('rolesContainer');
        if (!root) return;
        root.innerHTML = '<div class="roles-empty">' +
            '<div class="roles-empty-icon"><i data-lucide="shield-alert"></i></div>' +
            '<h3 class="roles-empty-title">' + escapeHtml(msg || 'No hay datos') + '</h3>' +
            '</div>';
        refreshIcons(root);
    }

    // ════════════════════════════════════════════════════════════════
    // Modal CREAR / EDITAR
    // ════════════════════════════════════════════════════════════════

    function openCreateModal() {
        if (!isSuperAdmin()) {
            toast('Solo super_admin puede crear roles', 'error');
            return;
        }
        _state.currentMode = 'create';
        _state.currentRoleId = null;
        renderModal({
            id: '',
            name: '',
            description: '',
            color: '#b89658',
            icon: 'shield',
            permissions: [],
            isSystem: false,
            isDefault: false
        });
    }

    function openEditModal(roleId) {
        if (!isSuperAdmin()) {
            toast('Solo super_admin puede editar roles', 'error');
            return;
        }
        // §69 R7 — System roles (CEO + legacy editor/viewer) son
        // inmodificables. No se debería poder llegar aquí porque la
        // lista los filtra, pero defense-in-depth: bloquear apertura
        // del modal si por alguna razón se invoca con un system roleId.
        if (roleId === 'system_super_admin'
            || roleId === 'system_editor'
            || roleId === 'system_viewer') {
            console.warn('[AdminRoles] §69 R7 — Intento de abrir modal en system role bloqueado:', roleId);
            return;
        }
        var role = _state.roles.find(function (r) { return r._docId === roleId; });
        if (!role) {
            toast('Rol no encontrado', 'error');
            return;
        }
        _state.currentMode = 'edit';
        _state.currentRoleId = roleId;
        renderModal(role);
    }

    function renderModal(role) {
        var existing = $('rolesModal');
        if (existing) existing.parentNode.removeChild(existing);

        var catalog = window.AltorraRBACCatalog;
        if (!catalog) {
            toast('Catálogo RBAC no cargado', 'error');
            return;
        }

        var isSystem = !!role.isSystem;
        var modeLabel = _state.currentMode === 'create' ? 'Crear nuevo rol' : (isSystem ? 'Ver rol del sistema' : 'Editar rol');
        var hasWildcard = Array.isArray(role.permissions) && role.permissions.indexOf('*') !== -1;
        var permsByCategory = catalog.getPermissionsByCategory();
        var categoryNames = Object.keys(permsByCategory);

        var permsSet = {};
        if (Array.isArray(role.permissions)) {
            for (var i = 0; i < role.permissions.length; i++) {
                permsSet[role.permissions[i]] = true;
            }
        }

        var html = '<div class="roles-modal-backdrop" id="rolesModal" data-action="close-modal">' +
            '<div class="roles-modal" role="dialog" aria-modal="true" data-no-close>' +
            '<header class="roles-modal-header">' +
            '<h2 class="roles-modal-title">' + escapeHtml(modeLabel) + '</h2>' +
            '<button class="roles-modal-close" data-action="close-modal" aria-label="Cerrar"><i data-lucide="x"></i></button>' +
            '</header>' +
            '<div class="roles-modal-body">' +

            // Sección: meta
            '<section class="roles-modal-section">' +
            '<h3 class="roles-modal-section-title">Información del rol</h3>' +
            '<div class="roles-modal-grid">' +
            '<label class="roles-modal-field">' +
            '<span class="roles-modal-label">Nombre <span class="roles-modal-required">*</span></span>' +
            '<input type="text" id="roleNameInput" class="alt-input" maxlength="50" value="' + escapeHtml(role.name || '') + '"' + (isSystem ? ' readonly' : '') + ' placeholder="Ej: Asesor Senior, Manager Inventario">' +
            '</label>' +
            '<label class="roles-modal-field">' +
            '<span class="roles-modal-label">Color</span>' +
            '<div class="roles-modal-color-row">' +
            '<input type="color" id="roleColorInput" class="alt-input roles-modal-color-picker" value="' + escapeHtml(role.color || '#b89658') + '"' + (isSystem ? ' disabled' : '') + '>' +
            '<input type="text" id="roleColorHex" class="alt-input" maxlength="7" value="' + escapeHtml(role.color || '#b89658') + '"' + (isSystem ? ' readonly' : '') + '>' +
            '</div>' +
            '</label>' +
            '<label class="roles-modal-field roles-modal-field--full">' +
            '<span class="roles-modal-label">Descripción</span>' +
            '<textarea id="roleDescInput" class="alt-input" maxlength="200" rows="2"' + (isSystem ? ' readonly' : '') + ' placeholder="Una línea explicando qué hace este rol">' + escapeHtml(role.description || '') + '</textarea>' +
            '</label>' +
            '</div>' +
            '</section>' +

            // Sección: permissions matrix
            '<section class="roles-modal-section">' +
            '<div class="roles-modal-section-head">' +
            '<h3 class="roles-modal-section-title">Permisos</h3>' +
            '<div class="roles-modal-perms-summary"><span id="permsSelectedCount">' + (Array.isArray(role.permissions) ? role.permissions.length : 0) + '</span> de ' + catalog.permissions.length + ' seleccionados' +
            (hasWildcard ? ' <span class="roles-modal-wildcard-tag"><i data-lucide="crown"></i> Acceso total (*)</span>' : '') +
            '</div>' +
            '</div>' +

            // §69 R7 — Banner "Los permisos de los roles del sistema no
            // son editables..." eliminado. Como CEO + editor/viewer legacy
            // están filtrados de la lista visible, este modal SIEMPRE se
            // abre en modo create o edit de custom role. El banner ya no
            // aplica.

            '<div class="roles-perms-matrix">';

        for (var c = 0; c < categoryNames.length; c++) {
            var category = categoryNames[c];
            var perms = permsByCategory[category];
            var allInCategory = perms.every(function (p) { return permsSet[p.id]; });

            html += '<div class="roles-perms-category" data-category="' + escapeHtml(category) + '">' +
                '<div class="roles-perms-category-head">' +
                '<label class="roles-perms-category-toggle">' +
                '<input type="checkbox" data-action="toggle-category" data-category="' + escapeHtml(category) + '"' +
                (allInCategory ? ' checked' : '') +
                (isSystem ? ' disabled' : '') + '>' +
                '<span class="roles-perms-category-name">' + escapeHtml(category) + '</span>' +
                '<span class="roles-perms-category-count" data-category-count="' + escapeHtml(category) + '">' +
                perms.filter(function (p) { return permsSet[p.id]; }).length + '/' + perms.length + '</span>' +
                '</label>' +
                '</div>' +
                '<div class="roles-perms-list">';

            for (var p = 0; p < perms.length; p++) {
                var perm = perms[p];
                var checked = !!permsSet[perm.id];
                var critical = !!perm.critical;
                html += '<label class="roles-perm-row' + (critical ? ' roles-perm-row--critical' : '') + '" title="' + escapeHtml(perm.description || '') + '">' +
                    '<input type="checkbox" class="roles-perm-checkbox" data-perm-id="' + escapeHtml(perm.id) + '" data-category="' + escapeHtml(category) + '"' +
                    (checked ? ' checked' : '') +
                    (isSystem ? ' disabled' : '') + '>' +
                    '<span class="roles-perm-info">' +
                    '<span class="roles-perm-name">' + escapeHtml(perm.name) + (critical ? ' <i data-lucide="alert-triangle" class="roles-perm-critical-icon" title="Permiso crítico"></i>' : '') + '</span>' +
                    '<code class="roles-perm-id">' + escapeHtml(perm.id) + '</code>' +
                    '</span>' +
                    '</label>';
            }

            html += '</div></div>';
        }

        html += '</div></section>' +
            '</div>' +    // body
            '<footer class="roles-modal-footer">' +
            // §66.3 hotfix — system roles solo necesitan UN botón "Cerrar"
            // (read-only, no hay nada que cancelar). Custom roles tienen
            // Cancelar + Guardar como flow CRUD estándar.
            (isSystem
                ? '<button class="alt-btn alt-btn--primary" data-action="close-modal">Cerrar</button>'
                : '<button class="alt-btn alt-btn--ghost" data-action="close-modal">Cancelar</button>' +
                  '<button class="alt-btn alt-btn--primary" data-action="save-role"><i data-lucide="save"></i> Guardar</button>') +
            '</footer>' +
            '</div>' + // .roles-modal
            '</div>'; // .roles-modal-backdrop

        var wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper.firstChild);
        refreshIcons(document.body);
        _state._modalOpen = true;
    }

    function closeModal() {
        var modal = $('rolesModal');
        if (modal && modal.parentNode) modal.parentNode.removeChild(modal);
        _state._modalOpen = false;
        _state.currentMode = null;
        _state.currentRoleId = null;
    }

    // ════════════════════════════════════════════════════════════════
    // Permissions matrix logic
    // ════════════════════════════════════════════════════════════════

    function getSelectedPermissions() {
        var checks = document.querySelectorAll('#rolesModal .roles-perm-checkbox:checked');
        var perms = [];
        for (var i = 0; i < checks.length; i++) {
            perms.push(checks[i].getAttribute('data-perm-id'));
        }
        return perms;
    }

    function updatePermsCount() {
        var selected = getSelectedPermissions();
        var count = $('permsSelectedCount');
        if (count) count.textContent = selected.length;

        // Refresh per-category counts
        var catalog = window.AltorraRBACCatalog;
        if (!catalog) return;
        var byCategory = catalog.getPermissionsByCategory();
        var categories = Object.keys(byCategory);
        var permsSet = {};
        for (var s = 0; s < selected.length; s++) permsSet[selected[s]] = true;

        for (var c = 0; c < categories.length; c++) {
            var category = categories[c];
            var perms = byCategory[category];
            var selectedInCategory = perms.filter(function (p) { return permsSet[p.id]; }).length;

            var countEl = document.querySelector('[data-category-count="' + CSS.escape(category) + '"]');
            if (countEl) countEl.textContent = selectedInCategory + '/' + perms.length;

            var toggleEl = document.querySelector('[data-action="toggle-category"][data-category="' + CSS.escape(category) + '"]');
            if (toggleEl) {
                toggleEl.checked = selectedInCategory === perms.length;
                toggleEl.indeterminate = selectedInCategory > 0 && selectedInCategory < perms.length;
            }
        }
    }

    function toggleCategory(category, checked) {
        var checks = document.querySelectorAll('#rolesModal .roles-perm-checkbox[data-category="' + CSS.escape(category) + '"]');
        for (var i = 0; i < checks.length; i++) {
            if (!checks[i].disabled) checks[i].checked = checked;
        }
        updatePermsCount();
    }

    // ════════════════════════════════════════════════════════════════
    // Save (create / edit)
    // ════════════════════════════════════════════════════════════════

    function saveRole() {
        if (!isSuperAdmin()) {
            toast('Solo super_admin puede guardar roles', 'error');
            return;
        }

        var name = ($('roleNameInput') && $('roleNameInput').value || '').trim();
        var description = ($('roleDescInput') && $('roleDescInput').value || '').trim();
        var color = ($('roleColorHex') && $('roleColorHex').value || '#b89658').trim();
        var permissions = getSelectedPermissions();

        // Validaciones
        if (!name || name.length < 3) {
            toast('El nombre debe tener al menos 3 caracteres', 'error');
            if ($('roleNameInput')) $('roleNameInput').focus();
            return;
        }
        if (!/^#[0-9A-Fa-f]{6}$/.test(color)) {
            toast('Color inválido. Usá formato hex (#RRGGBB)', 'error');
            return;
        }
        if (permissions.length === 0) {
            toast('Seleccioná al menos un permiso', 'error');
            return;
        }

        var nowIso = new Date().toISOString();
        var currentUid = (window.auth && window.auth.currentUser) ? window.auth.currentUser.uid : 'unknown';
        var currentName = (window.AP && window.AP.currentUserProfile && window.AP.currentUserProfile.nombre) || 'Super Admin';

        if (_state.currentMode === 'create') {
            // Validar que name no exista
            var nameTaken = _state.roles.some(function (r) { return r.name && r.name.toLowerCase() === name.toLowerCase(); });
            if (nameTaken) {
                toast('Ya existe un rol con ese nombre', 'error');
                return;
            }

            // Generar id slug
            var slug = name.toLowerCase()
                .normalize('NFD').replace(/[̀-ͯ]/g, '')
                .replace(/[^a-z0-9]+/g, '_')
                .replace(/^_+|_+$/g, '')
                .slice(0, 40);
            var roleId = 'custom_' + slug + '_' + Date.now().toString(36);

            var data = {
                id: roleId,
                name: name,
                description: description,
                permissions: permissions,
                isSystem: false,
                isDefault: false,
                color: color,
                icon: 'shield',
                userCount: 0,
                createdAt: nowIso,
                createdBy: currentUid,
                createdByName: currentName,
                updatedAt: nowIso,
                updatedBy: currentUid,
                updatedByName: currentName,
                _version: 1
            };

            console.log('[AdminRoles] §61.R2 saveRole CREATE:', roleId);
            disableModal(true);
            window.db.collection('roles').doc(roleId).set(data)
                .then(function () {
                    toast('Rol "' + name + '" creado correctamente', 'success');
                    closeModal();
                })
                .catch(function (err) {
                    console.error('[AdminRoles] §61.R2 saveRole CREATE error:', err);
                    handleSaveError(err);
                    disableModal(false);
                });
        } else if (_state.currentMode === 'edit') {
            var roleId = _state.currentRoleId;
            var existing = _state.roles.find(function (r) { return r._docId === roleId; });
            if (!existing) {
                toast('Rol no encontrado', 'error');
                return;
            }
            if (existing.isSystem) {
                toast('Los roles del sistema no son editables', 'error');
                return;
            }

            var updates = {
                name: name,
                description: description,
                permissions: permissions,
                color: color,
                updatedAt: nowIso,
                updatedBy: currentUid,
                updatedByName: currentName,
                _version: (existing._version || 0) + 1
            };

            console.log('[AdminRoles] §61.R2 saveRole EDIT:', roleId);
            disableModal(true);
            window.db.collection('roles').doc(roleId).set(updates, { merge: true })
                .then(function () {
                    toast('Rol "' + name + '" actualizado', 'success');
                    closeModal();
                })
                .catch(function (err) {
                    console.error('[AdminRoles] §61.R2 saveRole EDIT error:', err);
                    handleSaveError(err);
                    disableModal(false);
                });
        }
    }

    function disableModal(disabled) {
        var btns = document.querySelectorAll('#rolesModal button, #rolesModal input, #rolesModal textarea');
        for (var i = 0; i < btns.length; i++) {
            btns[i].disabled = disabled;
        }
    }

    function handleSaveError(err) {
        var code = err && err.code;
        var msg = err && err.message;
        if (code === 'permission-denied') {
            toast('No tenés permisos para escribir roles. Verificá que las rules estén desplegadas: firebase deploy --only firestore:rules', 'error');
        } else if (code === 'failed-precondition') {
            toast('Versión obsoleta. Recargá la pantalla y volvé a editar.', 'error');
        } else {
            toast('Error al guardar: ' + (msg || code || 'desconocido'), 'error');
        }
    }

    // ════════════════════════════════════════════════════════════════
    // Delete role (con guard de users asignados)
    // ════════════════════════════════════════════════════════════════

    function deleteRole(roleId) {
        if (!isSuperAdmin()) {
            toast('Solo super_admin puede eliminar roles', 'error');
            return;
        }
        var role = _state.roles.find(function (r) { return r._docId === roleId; });
        if (!role) return;
        if (role.isSystem) {
            toast('Los roles del sistema no se pueden eliminar', 'error');
            return;
        }

        // Refrescar count de users asignados a este role
        refreshUserCounts().then(function (counts) {
            var assigned = counts[roleId] || 0;
            var msg;
            if (assigned > 0) {
                msg = 'No podés eliminar este rol porque tiene ' + assigned + ' usuario' + (assigned === 1 ? '' : 's') +
                    ' asignado' + (assigned === 1 ? '' : 's') + '.\n\nPrimero reasigná esos usuarios a otro rol desde "Usuarios".';
                alert(msg);
                return;
            }

            var confirmMsg = 'Vas a eliminar el rol "' + role.name + '".\n\n' +
                'Esta acción no se puede deshacer. ¿Continuar?';
            if (!confirm(confirmMsg)) return;

            console.log('[AdminRoles] §61.R2 deleteRole:', roleId);
            window.db.collection('roles').doc(roleId).delete()
                .then(function () {
                    toast('Rol "' + role.name + '" eliminado', 'success');
                })
                .catch(function (err) {
                    console.error('[AdminRoles] §61.R2 deleteRole error:', err);
                    if (err.code === 'permission-denied') {
                        toast('No tenés permisos para eliminar este rol', 'error');
                    } else {
                        toast('Error al eliminar: ' + (err.message || err.code || 'desconocido'), 'error');
                    }
                });
        });
    }

    // ════════════════════════════════════════════════════════════════
    // Seed system roles via Cloud Function
    // ════════════════════════════════════════════════════════════════

    function seedSystemRoles() {
        if (!isSuperAdmin()) {
            toast('Solo super_admin puede sembrar roles del sistema', 'error');
            return;
        }
        if (!window.functions) {
            toast('Cloud Functions no disponibles', 'error');
            return;
        }

        var btns = document.querySelectorAll('[data-action="seed-system-roles"]');
        for (var i = 0; i < btns.length; i++) {
            btns[i].disabled = true;
            btns[i].innerHTML = '<i data-lucide="loader-2" class="roles-spinner"></i> Sembrando...';
        }
        refreshIcons();

        console.log('[AdminRoles] §61.R2 seedSystemRoles invoked');
        window.functions.httpsCallable('seedSystemRoles')()
            .then(function (result) {
                var data = result && result.data;
                console.log('[AdminRoles] §61.R2 seedSystemRoles result:', data);
                var p = (data && data.permissions) || {};
                var r = (data && data.roles) || {};
                var summary = 'Permisos: ' + (p.created || 0) + ' creados, ' + (p.skipped || 0) + ' ya existían. ' +
                    'Roles: ' + (r.created || 0) + ' creados, ' + (r.skipped || 0) + ' ya existían.';
                toast('Sistema sembrado. ' + summary, 'success');
            })
            .catch(function (err) {
                console.error('[AdminRoles] §61.R2 seedSystemRoles error:', err);
                var msg = (window.AP && window.AP.parseCallableError)
                    ? window.AP.parseCallableError(err)
                    : (err.message || err.code || 'Error desconocido');
                toast('Error al sembrar: ' + msg, 'error');
            })
            .finally(function () {
                // Restore buttons
                var btns = document.querySelectorAll('[data-action="seed-system-roles"]');
                for (var i = 0; i < btns.length; i++) {
                    btns[i].disabled = false;
                    var label = btns[i].closest('.roles-empty-actions')
                        ? '<i data-lucide="zap"></i> Sembrar roles del sistema'
                        : '<i data-lucide="refresh-cw"></i> Resembrar sistema';
                    btns[i].innerHTML = label;
                }
                refreshIcons();
            });
    }

    // ════════════════════════════════════════════════════════════════
    // §61.R4 — Legacy users migration (preview + execute)
    // ════════════════════════════════════════════════════════════════

    function migrateLegacyUsers() {
        if (!isSuperAdmin()) {
            toast('Solo super_admin puede migrar usuarios legacy', 'error');
            return;
        }
        if (!window.functions) {
            toast('Cloud Functions no disponibles', 'error');
            return;
        }

        // Disable button + show loading
        var btns = document.querySelectorAll('[data-action="migrate-legacy"]');
        for (var i = 0; i < btns.length; i++) {
            btns[i].disabled = true;
            btns[i].innerHTML = '<i data-lucide="loader-2" class="roles-spinner"></i> Cargando preview...';
        }
        refreshIcons();

        console.log('[AdminRoles] §61.R4 migrateLegacyUsers preview (dryRun)');
        window.functions.httpsCallable('migrateLegacyUsers')({ dryRun: true })
            .then(function (result) {
                var data = result && result.data;
                console.log('[AdminRoles] §61.R4 preview result:', data);
                renderMigrationModal(data);
            })
            .catch(function (err) {
                console.error('[AdminRoles] §61.R4 preview error:', err);
                var msg = (window.AP && window.AP.parseCallableError)
                    ? window.AP.parseCallableError(err)
                    : (err.message || err.code || 'Error desconocido');
                toast('Error al preparar migración: ' + msg, 'error');
            })
            .finally(function () {
                var btns = document.querySelectorAll('[data-action="migrate-legacy"]');
                for (var i = 0; i < btns.length; i++) {
                    btns[i].disabled = false;
                    btns[i].innerHTML = '<i data-lucide="users-round"></i> Migrar legacy';
                }
                refreshIcons();
            });
    }

    function renderMigrationModal(planData) {
        var existing = $('migrationModal');
        if (existing) existing.parentNode.removeChild(existing);

        if (!planData) {
            toast('Sin datos del plan de migración', 'error');
            return;
        }

        var migrated = planData.migrated || 0;
        var alreadyMigrated = planData.alreadyMigrated || 0;
        var skipped = planData.skipped || 0;
        var total = planData.total || 0;
        var plan = Array.isArray(planData.plan) ? planData.plan : [];
        var skippedDetails = Array.isArray(planData.skippedDetails) ? planData.skippedDetails : [];

        var html = '<div class="roles-modal-backdrop" id="migrationModal" data-action="close-migration-modal">' +
            '<div class="roles-modal" role="dialog" aria-modal="true" data-no-close>' +
            '<header class="roles-modal-header">' +
            '<h2 class="roles-modal-title"><i data-lucide="users-round" style="display:inline-block;vertical-align:-3px;margin-right:6px;"></i> Migración de usuarios legacy</h2>' +
            '<button class="roles-modal-close" data-action="close-migration-modal" aria-label="Cerrar"><i data-lucide="x"></i></button>' +
            '</header>' +
            '<div class="roles-modal-body">' +

            // Stats
            '<div class="migration-stats">' +
            '<div class="migration-stat-card migration-stat-card--total">' +
            '<div class="migration-stat-value">' + total + '</div>' +
            '<div class="migration-stat-label">Total usuarios</div>' +
            '</div>' +
            '<div class="migration-stat-card migration-stat-card--ready">' +
            '<div class="migration-stat-value">' + migrated + '</div>' +
            '<div class="migration-stat-label">A migrar</div>' +
            '</div>' +
            '<div class="migration-stat-card migration-stat-card--done">' +
            '<div class="migration-stat-value">' + alreadyMigrated + '</div>' +
            '<div class="migration-stat-label">Ya migrados</div>' +
            '</div>' +
            '<div class="migration-stat-card migration-stat-card--skip">' +
            '<div class="migration-stat-value">' + skipped + '</div>' +
            '<div class="migration-stat-label">Omitidos</div>' +
            '</div>' +
            '</div>';

        if (migrated === 0 && alreadyMigrated > 0) {
            html += '<div class="migration-success-banner">' +
                '<i data-lucide="check-circle-2"></i> Todos los usuarios ya están migrados al sistema dinámico.' +
                ' Re-ejecutar es seguro pero no hay cambios pendientes.' +
                '</div>';
        } else if (migrated > 0) {
            html += '<p class="migration-intro">Vas a migrar <strong>' + migrated + ' usuario' + (migrated === 1 ? '' : 's') + '</strong>' +
                ' del sistema legacy (campo <code>rol</code>) al sistema dinámico (<code>roleId</code> +' +
                ' <code>permissions[]</code>). El campo legacy se preserva intacto para retrocompat.</p>';

            // Tabla de plan
            html += '<div class="migration-plan-table">' +
                '<table>' +
                '<thead><tr>' +
                '<th>Email</th><th>Nombre</th><th>Rol legacy</th><th>→</th><th>Role nuevo</th><th>Permisos</th>' +
                '</tr></thead>' +
                '<tbody>';
            for (var i = 0; i < plan.length; i++) {
                var p = plan[i];
                var rolBadge = p.currentRol === 'super_admin' ? '<span class="badge badge-destacado">Super Admin</span>'
                    : p.currentRol === 'editor' ? '<span class="badge badge-nuevo">Editor</span>'
                    : '<span class="badge badge-usado">Viewer</span>';
                html += '<tr>' +
                    '<td><code>' + escapeHtml(p.email || '—') + '</code></td>' +
                    '<td>' + escapeHtml(p.nombre || '—') + '</td>' +
                    '<td>' + rolBadge + '</td>' +
                    '<td style="text-align:center;color:rgba(255,255,255,0.4);">→</td>' +
                    '<td><strong>' + escapeHtml(p.targetRoleName || p.targetRoleId) + '</strong></td>' +
                    '<td>' + p.permsCount + ' permisos</td>' +
                    '</tr>';
            }
            html += '</tbody></table></div>';
        }

        if (skipped > 0) {
            html += '<details class="migration-skipped-section">' +
                '<summary><i data-lucide="alert-triangle"></i> ' + skipped + ' usuario' + (skipped === 1 ? '' : 's') + ' omitido' + (skipped === 1 ? '' : 's') + ' (click para ver detalles)</summary>' +
                '<ul class="migration-skipped-list">';
            for (var s = 0; s < skippedDetails.length; s++) {
                var sd = skippedDetails[s];
                var reasonLabel = sd.reason === 'sin_rol_legacy' ? 'Sin campo rol legacy (perfil incompleto)'
                    : sd.reason === 'rol_desconocido' ? 'Rol legacy desconocido: ' + (sd.rol || '—')
                    : sd.reason;
                html += '<li><code>' + escapeHtml(sd.email || sd.uid) + '</code> — ' + escapeHtml(reasonLabel) + '</li>';
            }
            html += '</ul></details>';
        }

        html += '</div>' + // body
            '<footer class="roles-modal-footer">' +
            '<button class="alt-btn alt-btn--ghost" data-action="close-migration-modal">Cancelar</button>' +
            (migrated > 0
                ? '<button class="alt-btn alt-btn--primary" data-action="execute-migration"><i data-lucide="play"></i> Ejecutar migración (' + migrated + ')</button>'
                : '<button class="alt-btn alt-btn--primary" data-action="close-migration-modal">Cerrar</button>') +
            '</footer>' +
            '</div>' +
            '</div>';

        var wrapper = document.createElement('div');
        wrapper.innerHTML = html;
        document.body.appendChild(wrapper.firstChild);
        refreshIcons(document.body);
    }

    function closeMigrationModal() {
        var modal = $('migrationModal');
        if (modal && modal.parentNode) modal.parentNode.removeChild(modal);
    }

    function executeLegacyMigration() {
        if (!isSuperAdmin()) {
            toast('Solo super_admin puede ejecutar migración', 'error');
            return;
        }
        if (!window.functions) {
            toast('Cloud Functions no disponibles', 'error');
            return;
        }

        var modal = $('migrationModal');
        if (modal) {
            // Disable footer buttons + show loading
            var footerBtns = modal.querySelectorAll('.roles-modal-footer button');
            for (var i = 0; i < footerBtns.length; i++) {
                footerBtns[i].disabled = true;
            }
            var execBtn = modal.querySelector('[data-action="execute-migration"]');
            if (execBtn) execBtn.innerHTML = '<i data-lucide="loader-2" class="roles-spinner"></i> Migrando...';
            refreshIcons(modal);
        }

        console.log('[AdminRoles] §61.R4 executeLegacyMigration (real)');
        window.functions.httpsCallable('migrateLegacyUsers')({ dryRun: false })
            .then(function (result) {
                var data = result && result.data;
                console.log('[AdminRoles] §61.R4 migration result:', data);
                var summary = (data.migrated || 0) + ' usuario' + ((data.migrated || 0) === 1 ? '' : 's') +
                    ' migrado' + ((data.migrated || 0) === 1 ? '' : 's') + '. ' +
                    (data.alreadyMigrated || 0) + ' ya estaban migrados. ' +
                    (data.skipped || 0) + ' omitidos.';
                toast('✓ Migración completa. ' + summary, 'success');
                closeMigrationModal();
            })
            .catch(function (err) {
                console.error('[AdminRoles] §61.R4 migration error:', err);
                var msg = (window.AP && window.AP.parseCallableError)
                    ? window.AP.parseCallableError(err)
                    : (err.message || err.code || 'Error desconocido');
                toast('Error en migración: ' + msg, 'error');
                // Re-enable buttons
                if (modal) {
                    var footerBtns = modal.querySelectorAll('.roles-modal-footer button');
                    for (var i = 0; i < footerBtns.length; i++) {
                        footerBtns[i].disabled = false;
                    }
                    var execBtn = modal.querySelector('[data-action="execute-migration"]');
                    if (execBtn) execBtn.innerHTML = '<i data-lucide="play"></i> Reintentar';
                    refreshIcons(modal);
                }
            });
    }

    // ════════════════════════════════════════════════════════════════
    // §73 R8 — Cleanup masivo de roles legacy (system_editor/viewer)
    // ════════════════════════════════════════════════════════════════
    //
    // Tras §69 R7 el catálogo solo tiene CEO. Editor y Viewer fueron
    // eliminados del catálogo PERO los docs en Firestore (sembrados
    // pre-§69) y los users con esos roleId siguen existiendo. Este
    // cleanup ejecuta CLIENT-SIDE puro (cero deploy backend) usando
    // el SDK Compat directo:
    //
    //   1. db.collection('roles').doc('system_editor').delete()
    //   2. db.collection('roles').doc('system_viewer').delete()
    //   3. Batch update usuarios con roleId in [system_editor, system_viewer]
    //      → reset roleId=null, roleName=null, permissions=[],
    //        + markers _orphanedFromRole, _orphanedAt
    //   4. Audit log entry
    //
    // Garantía: firestore.rules R6 permite estas operaciones porque CEO
    // tiene wildcard '*'. Cero deploy backend requerido.

    function cleanupLegacyRolesPreview() {
        if (!isSuperAdmin()) {
            toast('Solo super_admin puede limpiar roles legacy', 'error');
            return;
        }
        if (!window.db) {
            toast('Firestore no disponible', 'error');
            return;
        }

        var btns = document.querySelectorAll('[data-action="cleanup-legacy"]');
        for (var b = 0; b < btns.length; b++) {
            btns[b].disabled = true;
            btns[b].innerHTML = '<i data-lucide="loader-2"></i> Cargando...';
        }
        refreshIcons(document.body);

        // Paralelo: chequear existencia de docs + contar usuarios afectados
        Promise.all([
            window.db.collection('roles').doc('system_editor').get(),
            window.db.collection('roles').doc('system_viewer').get(),
            window.db.collection('usuarios').where('roleId', '==', 'system_editor').get(),
            window.db.collection('usuarios').where('roleId', '==', 'system_viewer').get()
        ]).then(function (results) {
            var editorExists = results[0].exists;
            var viewerExists = results[1].exists;
            var editorUsers = [];
            var viewerUsers = [];
            results[2].forEach(function (d) {
                editorUsers.push({ uid: d.id, nombre: (d.data() || {}).nombre || '', email: (d.data() || {}).email || '' });
            });
            results[3].forEach(function (d) {
                viewerUsers.push({ uid: d.id, nombre: (d.data() || {}).nombre || '', email: (d.data() || {}).email || '' });
            });

            var totalDocsToDelete = (editorExists ? 1 : 0) + (viewerExists ? 1 : 0);
            var totalUsersToOrphan = editorUsers.length + viewerUsers.length;
            console.log('[AdminRoles] §73 R8 cleanupPreview', {
                editorExists: editorExists,
                viewerExists: viewerExists,
                editorUsers: editorUsers.length,
                viewerUsers: viewerUsers.length
            });

            renderCleanupModal({
                editorExists: editorExists,
                viewerExists: viewerExists,
                editorUsers: editorUsers,
                viewerUsers: viewerUsers,
                totalDocsToDelete: totalDocsToDelete,
                totalUsersToOrphan: totalUsersToOrphan
            });
        }).catch(function (err) {
            console.warn('[AdminRoles] §73 R8 cleanupPreview error:', err && err.code);
            toast('No pudimos consultar roles legacy: ' + (err && err.message ? err.message : 'error desconocido'), 'error');
        }).finally(function () {
            var btns2 = document.querySelectorAll('[data-action="cleanup-legacy"]');
            for (var c = 0; c < btns2.length; c++) {
                btns2[c].disabled = false;
                btns2[c].innerHTML = '<i data-lucide="archive-x"></i> Limpiar legacy';
            }
            refreshIcons(document.body);
        });
    }

    function renderCleanupModal(planData) {
        var existing = $('cleanupModal');
        if (existing) existing.remove();

        var totalDocs = planData.totalDocsToDelete || 0;
        var totalUsers = planData.totalUsersToOrphan || 0;

        var html = '<div class="roles-modal-backdrop" id="cleanupModal" data-action="close-cleanup-modal">' +
            '<div class="roles-modal" data-no-close>' +
            '<header class="roles-modal-header">' +
            '<h2 class="roles-modal-title"><i data-lucide="archive-x"></i> Limpiar roles legacy</h2>' +
            '<button class="roles-modal-close" data-action="close-cleanup-modal" aria-label="Cerrar"><i data-lucide="x"></i></button>' +
            '</header>' +
            '<div class="roles-modal-body">';

        if (totalDocs === 0 && totalUsers === 0) {
            // Nada que hacer — ya está limpio
            html += '<div class="migration-success-banner">' +
                '<div class="migration-success-icon"><i data-lucide="check-circle-2"></i></div>' +
                '<div><h3>Sistema limpio</h3><p>No quedan docs huérfanos de <code>system_editor</code> ni <code>system_viewer</code> en Firestore, ni usuarios con esos roleId.</p></div></div>';
        } else {
            html += '<div class="migration-intro">' +
                '<p>Esta acción <strong>destructiva</strong> hará lo siguiente:</p></div>' +
                '<div class="migration-stats">' +
                '<div class="migration-stat-card migration-stat-card--skip">' +
                '<div class="migration-stat-card-value">' + totalDocs + '</div>' +
                '<div class="migration-stat-card-label">Docs a eliminar</div></div>' +
                '<div class="migration-stat-card migration-stat-card--ready">' +
                '<div class="migration-stat-card-value">' + totalUsers + '</div>' +
                '<div class="migration-stat-card-label">Usuarios a orphan</div></div>' +
                '</div>';

            if (totalDocs > 0) {
                html += '<div class="migration-skipped-section"><details open>' +
                    '<summary>Docs a eliminar de <code>roles/</code></summary><ul>';
                if (planData.editorExists) html += '<li><code>system_editor</code></li>';
                if (planData.viewerExists) html += '<li><code>system_viewer</code></li>';
                html += '</ul></details></div>';
            }

            if (totalUsers > 0) {
                var allUsers = planData.editorUsers.concat(planData.viewerUsers);
                html += '<div class="migration-plan-table-wrap"><table class="migration-plan-table">' +
                    '<thead><tr><th>Email</th><th>Nombre</th><th>Antes</th><th>→</th><th>Después</th></tr></thead><tbody>';
                for (var i = 0; i < allUsers.length; i++) {
                    var u = allUsers[i];
                    var wasEditor = planData.editorUsers.indexOf(u) !== -1;
                    html += '<tr>' +
                        '<td>' + escapeHtml(u.email) + '</td>' +
                        '<td>' + escapeHtml(u.nombre) + '</td>' +
                        '<td><code>' + (wasEditor ? 'system_editor' : 'system_viewer') + '</code></td>' +
                        '<td><i data-lucide="arrow-right"></i></td>' +
                        '<td><span class="badge badge-warning">Sin asignar</span></td>' +
                        '</tr>';
                }
                html += '</tbody></table></div>';
                html += '<div class="migration-intro" style="margin-top:1rem;"><p style="color:var(--admin-warning, #f59e0b);"><i data-lucide="triangle-alert"></i> Los usuarios afectados quedarán <strong>bloqueados al login</strong> con la pantalla "Sin rol asignado" hasta que les asignes un rol custom desde Configuración → Usuarios.</p></div>';
            }
        }

        html += '</div>' +
            '<footer class="roles-modal-footer">' +
            '<button class="alt-btn alt-btn--ghost" data-action="close-cleanup-modal">Cancelar</button>' +
            (totalDocs + totalUsers > 0
                ? '<button class="alt-btn alt-btn--danger" data-action="execute-cleanup"><i data-lucide="archive-x"></i> Ejecutar limpieza</button>'
                : '<button class="alt-btn alt-btn--primary" data-action="close-cleanup-modal">Cerrar</button>') +
            '</footer>' +
            '</div></div>';

        document.body.insertAdjacentHTML('beforeend', html);
        var modal = $('cleanupModal');
        if (modal) {
            // Stash plan data en el modal para reusar en execute
            modal._planData = planData;
            refreshIcons(modal);
        }
    }

    function closeCleanupModal() {
        var modal = $('cleanupModal');
        if (modal) modal.remove();
    }

    function executeLegacyCleanup() {
        var modal = $('cleanupModal');
        if (!modal || !modal._planData) {
            toast('No hay plan de limpieza activo', 'error');
            return;
        }
        if (!isSuperAdmin()) {
            toast('Solo super_admin puede ejecutar la limpieza', 'error');
            return;
        }
        if (!window.db) {
            toast('Firestore no disponible', 'error');
            return;
        }

        var plan = modal._planData;

        // Doble confirm — acción destructiva
        var firstMsg = '⚠️ Esto eliminará ' + plan.totalDocsToDelete +
            ' doc(s) de roles/ Y dejará a ' + plan.totalUsersToOrphan +
            ' usuario(s) sin rol asignado. ¿Continuar?';
        if (!confirm(firstMsg)) return;
        if (!confirm('Última confirmación: ¿estás seguro? Esta acción no se puede deshacer.')) return;

        var execBtn = modal.querySelector('[data-action="execute-cleanup"]');
        if (execBtn) {
            execBtn.disabled = true;
            execBtn.innerHTML = '<i data-lucide="loader-2"></i> Limpiando...';
            refreshIcons(modal);
        }

        console.log('[AdminRoles] §73 R8 executeLegacyCleanup START', {
            docsToDelete: plan.totalDocsToDelete,
            usersToOrphan: plan.totalUsersToOrphan
        });

        var allUsers = plan.editorUsers.concat(plan.viewerUsers);
        var nowIso = new Date().toISOString();
        var currentUid = (window.auth && window.auth.currentUser) ? window.auth.currentUser.uid : null;
        var currentName = (window.AP && window.AP.currentUserProfile && window.AP.currentUserProfile.nombre) || 'CEO';

        // Usar FieldValue para borrar campos sin valor
        var FieldValue = window.firebase && window.firebase.firestore && window.firebase.firestore.FieldValue;
        var deleteFv = FieldValue ? FieldValue.delete() : null;

        // Batch 1: usuarios huérfanos (cap 500 ops, suficiente para realismo)
        var batch1 = window.db.batch();
        for (var i = 0; i < allUsers.length; i++) {
            var u = allUsers[i];
            var wasRole = plan.editorUsers.indexOf(u) !== -1 ? 'system_editor' : 'system_viewer';
            var userRef = window.db.collection('usuarios').doc(u.uid);
            // Reset campos del sistema dinámico
            var resetData = {
                permissions: [],
                permissionsUpdatedAt: nowIso,
                _orphanedFromRole: wasRole,
                _orphanedFromRoleName: wasRole === 'system_editor' ? 'Editor' : 'Viewer',
                _orphanedAt: nowIso,
                _orphanedBy: currentUid || 'unknown',
                _orphanedReason: 'cleanup-legacy-§73-R8'
            };
            // FieldValue.delete() para limpiar roleId/roleName si existe
            if (deleteFv) {
                resetData.roleId = deleteFv;
                resetData.roleName = deleteFv;
            } else {
                resetData.roleId = null;
                resetData.roleName = null;
            }
            batch1.update(userRef, resetData);
        }

        // Batch 2: delete de los docs roles/system_editor + system_viewer
        var batch2 = window.db.batch();
        if (plan.editorExists) {
            batch2.delete(window.db.collection('roles').doc('system_editor'));
        }
        if (plan.viewerExists) {
            batch2.delete(window.db.collection('roles').doc('system_viewer'));
        }

        // Ejecutar en serie: usuarios primero (preserva integridad si delete falla)
        // luego docs de roles
        var usersCommit = allUsers.length > 0 ? batch1.commit() : Promise.resolve();
        usersCommit.then(function () {
            return (plan.editorExists || plan.viewerExists) ? batch2.commit() : Promise.resolve();
        }).then(function () {
            // Audit log
            return window.db.collection('auditLog').add({
                type: 'roles.cleanup-legacy',
                ts: nowIso,
                by: currentUid,
                byName: currentName,
                docsDeleted: [
                    plan.editorExists ? 'system_editor' : null,
                    plan.viewerExists ? 'system_viewer' : null
                ].filter(Boolean),
                usersOrphaned: allUsers.length,
                source: '§73-R8-mini-cleanup'
            }).catch(function (e) {
                // Audit no crítico — log y continuar
                console.warn('[AdminRoles] §73 R8 audit log failed:', e && e.code);
            });
        }).then(function () {
            console.log('[AdminRoles] §73 R8 cleanup COMPLETE');
            toast('Limpieza completa: ' + plan.totalDocsToDelete + ' docs eliminados, ' + plan.totalUsersToOrphan + ' usuarios orphan', 'success');
            closeCleanupModal();
            // Refresh user counts en background (UI se actualiza vía onSnapshot)
            refreshUserCounts().then(function () { updateUserCountsDom(); });
        }).catch(function (err) {
            console.error('[AdminRoles] §73 R8 cleanup FAILED:', err);
            var msg = (err && err.code === 'permission-denied')
                ? 'Permission denied — verificá que el deploy de firestore.rules R6 esté activo'
                : ((err && err.message) || 'error desconocido');
            toast('Error al limpiar: ' + msg, 'error');
            if (execBtn) {
                execBtn.disabled = false;
                execBtn.innerHTML = '<i data-lucide="play"></i> Reintentar';
                refreshIcons(modal);
            }
        });
    }

    // ════════════════════════════════════════════════════════════════
    // Event delegation
    // ════════════════════════════════════════════════════════════════

    function bindEvents() {
        // Click delegation a nivel document para sobrevivir re-renders
        if (window.AltorraAdminRoles._bound) return;
        window.AltorraAdminRoles._bound = true;

        document.addEventListener('click', function (e) {
            var btn = e.target.closest && e.target.closest('[data-action]');
            if (!btn) return;
            // Solo procesar si está dentro de sec-roles, roles modal o migration modal
            // §61.R4 hotfix — agregado migrationModal al filtro (sino el botón
            // "Ejecutar migración" se ignoraba silenciosamente)
            var section = $('sec-roles');
            var modal = $('rolesModal');
            var migModal = $('migrationModal');
            var cleanupModal = $('cleanupModal');
            if (!(section && section.contains(btn))
                && !(modal && modal.contains(btn))
                && !(migModal && migModal.contains(btn))
                && !(cleanupModal && cleanupModal.contains(btn))) return;

            var action = btn.getAttribute('data-action');
            switch (action) {
                case 'create-role':
                    e.preventDefault();
                    openCreateModal();
                    break;
                case 'edit-role':
                    e.preventDefault();
                    openEditModal(btn.getAttribute('data-role-id'));
                    break;
                case 'delete-role':
                    e.preventDefault();
                    deleteRole(btn.getAttribute('data-role-id'));
                    break;
                case 'save-role':
                    e.preventDefault();
                    saveRole();
                    break;
                case 'close-modal':
                    // Solo cerrar si hizo click en el backdrop o boton close
                    // Si hizo click en .roles-modal directamente (data-no-close), NO cerrar
                    if (btn.closest('[data-no-close]') && !btn.classList.contains('roles-modal-close') && btn.getAttribute('data-action') !== 'close-modal') {
                        return;
                    }
                    e.preventDefault();
                    closeModal();
                    break;
                case 'seed-system-roles':
                    e.preventDefault();
                    seedSystemRoles();
                    break;
                case 'migrate-legacy':
                    e.preventDefault();
                    migrateLegacyUsers();
                    break;
                case 'close-migration-modal':
                    if (btn.closest('[data-no-close]') && !btn.classList.contains('roles-modal-close') && btn.getAttribute('data-action') !== 'close-migration-modal') {
                        return;
                    }
                    e.preventDefault();
                    closeMigrationModal();
                    break;
                case 'execute-migration':
                    e.preventDefault();
                    executeLegacyMigration();
                    break;
                // §73 R8 — Cleanup masivo de roles legacy (system_editor/viewer)
                case 'cleanup-legacy':
                    e.preventDefault();
                    cleanupLegacyRolesPreview();
                    break;
                case 'close-cleanup-modal':
                    if (btn.closest('[data-no-close]') && !btn.classList.contains('roles-modal-close') && btn.getAttribute('data-action') !== 'close-cleanup-modal') {
                        return;
                    }
                    e.preventDefault();
                    closeCleanupModal();
                    break;
                case 'execute-cleanup':
                    e.preventDefault();
                    executeLegacyCleanup();
                    break;
            }
        });

        // Permissions matrix change handler
        document.addEventListener('change', function (e) {
            var modal = $('rolesModal');
            if (!modal || !modal.contains(e.target)) return;

            // Toggle category checkbox (master)
            var catToggle = e.target.closest && e.target.closest('[data-action="toggle-category"]');
            if (catToggle) {
                toggleCategory(catToggle.getAttribute('data-category'), catToggle.checked);
                return;
            }

            // Individual perm checkbox
            if (e.target.classList && e.target.classList.contains('roles-perm-checkbox')) {
                updatePermsCount();
                return;
            }

            // Color picker sync
            if (e.target.id === 'roleColorInput') {
                var hex = $('roleColorHex');
                if (hex) hex.value = e.target.value;
            } else if (e.target.id === 'roleColorHex') {
                var picker = $('roleColorInput');
                if (picker && /^#[0-9A-Fa-f]{6}$/.test(e.target.value)) {
                    picker.value = e.target.value;
                }
            }
        });

        // Esc cierra modal
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape') {
                if (_state._modalOpen) closeModal();
                if ($('migrationModal')) closeMigrationModal();
            }
        });

        // Click backdrop cierra modal
        document.addEventListener('click', function (e) {
            if (e.target.id === 'rolesModal') {
                closeModal();
            }
            if (e.target.id === 'migrationModal') {
                closeMigrationModal();
            }
        });
    }

    // ════════════════════════════════════════════════════════════════
    // Init / lifecycle
    // ════════════════════════════════════════════════════════════════

    function init() {
        AP = window.AP;
        bindEvents();

        // Activar listener cuando entre a sec-roles. Cleanup al salir.
        if (window.AltorraSections && window.AltorraSections.onChange) {
            window.AltorraSections.onChange(function (section) {
                if (section === 'roles') {
                    if (!isSuperAdmin()) {
                        renderEmpty('Solo el super_admin puede gestionar roles. Si necesitás acceso, contactá al administrador principal.');
                        return;
                    }
                    if (!_state.unsub) startListener();
                    render();
                } else {
                    if (_state.unsub) {
                        stopListener();
                    }
                }
            });
        }

        // Si ya estamos en sec-roles al cargar (deep-link), arrancar
        var section = $('sec-roles');
        if (section && section.classList.contains('active')) {
            if (isSuperAdmin()) {
                startListener();
                render();
            } else {
                renderEmpty('Solo el super_admin puede gestionar roles.');
            }
        }

        console.log('[AdminRoles] §61.R2 init complete');
    }

    // Expose API
    window.AltorraAdminRoles = {
        init: init,
        startListener: startListener,
        stopListener: stopListener,
        render: render,
        openCreateModal: openCreateModal,
        openEditModal: openEditModal,
        seedSystemRoles: seedSystemRoles,
        _state: function () { return _state; }
    };

    // Auto-init cuando AP esté listo
    function tryInit() {
        if (window.AP && window.AltorraRBACCatalog) {
            init();
        } else {
            setTimeout(tryInit, 250);
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', tryInit);
    } else {
        tryInit();
    }
})();
