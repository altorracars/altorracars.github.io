// Admin Panel — Users CRUD (via Cloud Functions)
(function() {
    'use strict';
    var AP = window.AP;
    var $ = AP.$;

    // §61.R3 — Cache de roles disponibles + listener
    var _rolesCache = [];
    var _rolesUnsub = null;
    var _rolesFilter = '';   // filtro por roleId (o '' = todos)

    // §61.R3 — Map legacy: dado un role doc, retorna el campo `rol` legacy
    // que mantiene retrocompat con los 154 callsites + las callables
    // createManagedUserV2/updateUserRoleV2 (que esperan super_admin/editor/viewer).
    function mapRoleToLegacy(role) {
        if (!role) return 'editor';
        // Si tiene wildcard '*', es acceso total
        if (Array.isArray(role.permissions) && role.permissions.indexOf('*') !== -1) {
            return 'super_admin';
        }
        // System roles tienen mapeo directo
        if (role.id === 'system_super_admin') return 'super_admin';
        if (role.id === 'system_editor') return 'editor';
        if (role.id === 'system_viewer') return 'viewer';
        // Custom roles: si solo tienen permissions read-only → viewer, sino editor
        if (Array.isArray(role.permissions)) {
            var nonRead = role.permissions.filter(function(p) {
                return p && p.indexOf('.read') === -1 && p.indexOf('.view') === -1 && p !== 'settings.theme';
            });
            if (nonRead.length === 0) return 'viewer';
        }
        return 'editor';
    }

    // §61.R3 — Listener real-time de roles para popular dropdowns
    function startRolesListener() {
        if (_rolesUnsub) return;
        if (!window.db) return;
        _rolesUnsub = window.db.collection('roles')
            .onSnapshot(function(snap) {
                _rolesCache = [];
                snap.forEach(function(doc) {
                    var data = doc.data() || {};
                    data._docId = doc.id;
                    _rolesCache.push(data);
                });
                _rolesCache.sort(function(a, b) {
                    if (a.isSystem !== b.isSystem) return a.isSystem ? -1 : 1;
                    return (a.name || '').localeCompare(b.name || '');
                });
                console.log('[AdminUsers] §61.R3 roles cache:', _rolesCache.length);
                // Re-popular dropdown si modal abierto
                if ($('userModal') && $('userModal').classList.contains('active')) {
                    populateRolesDropdown();
                }
                // Re-render filter + tabla
                renderRolesFilter();
                if (AP.users && AP.users.length) renderUsersTable();
            }, function(err) {
                if (window.auth && !window.auth.currentUser) return;
                console.warn('[AdminUsers] §61.R3 roles listener error:', err && err.code);
            });
    }

    function stopRolesListener() {
        if (_rolesUnsub) {
            try { _rolesUnsub(); } catch (e) {}
            _rolesUnsub = null;
        }
    }

    // §61.R3 — Popular dropdown #uRoleId con roles disponibles
    function populateRolesDropdown(selectedRoleId) {
        var sel = $('uRoleId');
        if (!sel) return;
        if (_rolesCache.length === 0) {
            // Catálogo no sembrado todavía. Mostrar fallback con system roles del catálogo
            sel.innerHTML = '<option value="">Sin roles configurados — sembrá desde Configuración → Roles</option>';
            return;
        }
        var html = '';
        // Sistema primero, luego custom
        var systems = _rolesCache.filter(function(r) { return r.isSystem; });
        var customs = _rolesCache.filter(function(r) { return !r.isSystem; });
        if (systems.length) {
            html += '<optgroup label="Roles del sistema">';
            for (var i = 0; i < systems.length; i++) {
                var r = systems[i];
                html += '<option value="' + AP.escapeHtml(r._docId) + '">' + AP.escapeHtml(r.name || r._docId) + '</option>';
            }
            html += '</optgroup>';
        }
        if (customs.length) {
            html += '<optgroup label="Roles personalizados">';
            for (var j = 0; j < customs.length; j++) {
                var c = customs[j];
                html += '<option value="' + AP.escapeHtml(c._docId) + '">' + AP.escapeHtml(c.name || c._docId) + '</option>';
            }
            html += '</optgroup>';
        }
        sel.innerHTML = html;
        if (selectedRoleId) {
            sel.value = selectedRoleId;
        } else {
            // Default: system_editor si existe
            var defaultRole = _rolesCache.find(function(r) { return r.isDefault; }) ||
                              _rolesCache.find(function(r) { return r._docId === 'system_editor'; }) ||
                              _rolesCache[0];
            if (defaultRole) sel.value = defaultRole._docId;
        }
        // Sync hidden uRol legacy
        syncLegacyRolFromDropdown();
    }

    function syncLegacyRolFromDropdown() {
        var sel = $('uRoleId');
        var hidden = $('uRol');
        if (!sel || !hidden) return;
        var roleId = sel.value;
        var role = _rolesCache.find(function(r) { return r._docId === roleId; });
        hidden.value = mapRoleToLegacy(role);
    }

    // §61.R3 — Render filtro por rol arriba de la tabla
    function renderRolesFilter() {
        var container = document.getElementById('usersRoleFilterContainer');
        if (!container) return; // no creado aún (lo agregamos vía JS abajo si falta)

        if (_rolesCache.length === 0) {
            container.innerHTML = '';
            return;
        }
        var html = '<label class="users-role-filter-label" for="usersRoleFilter">Filtrar por rol:</label>' +
            '<select id="usersRoleFilter" class="form-select form-select--sm">' +
            '<option value="">Todos los roles</option>';
        for (var i = 0; i < _rolesCache.length; i++) {
            var r = _rolesCache[i];
            var sel = (r._docId === _rolesFilter) ? ' selected' : '';
            html += '<option value="' + AP.escapeHtml(r._docId) + '"' + sel + '>' + AP.escapeHtml(r.name || r._docId) + '</option>';
        }
        // Legacy users sin roleId
        html += '<option value="__legacy__"' + (_rolesFilter === '__legacy__' ? ' selected' : '') + '>Sin rol asignado (legacy)</option>';
        html += '</select>';
        container.innerHTML = html;

        var filterEl = document.getElementById('usersRoleFilter');
        if (filterEl) {
            filterEl.addEventListener('change', function() {
                _rolesFilter = this.value;
                if (AP.users && AP.users.length) renderUsersTable();
            });
        }
    }

    // §61.R3 — Inyectar contenedor del filtro arriba de la tabla si no existe
    function ensureRolesFilterContainer() {
        if (document.getElementById('usersRoleFilterContainer')) return;
        var section = document.getElementById('sec-users');
        if (!section) return;
        var pageHeader = section.querySelector('.page-header');
        if (!pageHeader) return;
        var rolesInfo = section.querySelector('.roles-info');
        var container = document.createElement('div');
        container.id = 'usersRoleFilterContainer';
        container.className = 'users-role-filter-container';
        if (rolesInfo && rolesInfo.parentNode) {
            rolesInfo.parentNode.insertBefore(container, rolesInfo.nextSibling);
        } else {
            pageHeader.parentNode.insertBefore(container, pageHeader.nextSibling);
        }
    }

    // ========== USERS TABLE ==========
    function renderUsersTable() {
        if (!AP.users.length) {
            $('usersTableBody').innerHTML = '<tr><td colspan="5" style="text-align:center;padding:2rem;color:var(--admin-text-muted);">No hay usuarios registrados</td></tr>';
            if (AP.renderPagination) AP.renderPagination('usersPagination', 'users', 0);
            return;
        }

        // Check loginAttempts for each user to detect cross-device blocks
        var emailsToCheck = AP.users.filter(function(u) { return u.email; }).map(function(u) { return u.email; });
        var blockPromises = emailsToCheck.map(function(email) {
            var hash = email.toLowerCase().replace(/[^a-z0-9]/g, '_');
            return window.db.collection('loginAttempts').doc(hash).get()
                .then(function(doc) {
                    return { email: email.toLowerCase(), blocked: doc.exists && doc.data().bloqueado };
                })
                .catch(function() { return { email: email.toLowerCase(), blocked: false }; });
        });

        Promise.all(blockPromises).then(function(blockResults) {
            var blockMap = {};
            blockResults.forEach(function(r) { blockMap[r.email] = r.blocked; });
            _renderUsersTableWithBlocks(blockMap);
        }).catch(function() {
            _renderUsersTableWithBlocks({});
        });
    }

    function _renderUsersTableWithBlocks(blockMap) {
        var sorted = AP.users.slice();

        // §61.R3 — Aplicar filtro por roleId si está activo
        if (_rolesFilter) {
            sorted = sorted.filter(function(u) {
                if (_rolesFilter === '__legacy__') {
                    return !u.roleId;
                }
                return u.roleId === _rolesFilter;
            });
        }

        if (AP._sorting && AP._sorting.users && AP._sorting.users.col) {
            sorted = AP.sortData(sorted, 'users');
        }
        var totalUsers = sorted.length;
        if (AP.paginate) sorted = AP.paginate(sorted, 'users');

        var currentUid = window.auth.currentUser ? window.auth.currentUser.uid : '';
        var html = '';
        sorted.forEach(function(u) {
            // §61.R3 — Mostrar roleName real si existe, fallback a label legacy
            var rolLabel, rolClass, roleColor;
            if (u.roleId && u.roleName) {
                // User migrado a sistema dinámico
                rolLabel = u.roleName;
                // Buscar el role en cache para obtener su color
                var roleDoc = _rolesCache.find(function(r) { return r._docId === u.roleId; });
                roleColor = roleDoc && roleDoc.color ? roleDoc.color : '#b89658';
                rolClass = u.rol === 'super_admin' ? 'badge-destacado' : (u.rol === 'editor' ? 'badge-nuevo' : 'badge-usado');
            } else {
                // Legacy fallback
                rolLabel = u.rol === 'super_admin' ? 'Super Admin' : u.rol === 'editor' ? 'Editor' : 'Viewer';
                rolClass = u.rol === 'super_admin' ? 'badge-destacado' : u.rol === 'editor' ? 'badge-nuevo' : 'badge-usado';
                roleColor = null;
            }
            // Check both usuarios.bloqueado AND loginAttempts
            var isBlocked = !!u.bloqueado || !!(u.email && blockMap[u.email.toLowerCase()]);
            var estadoLabel = isBlocked ? 'BLOQUEADO' : (u.estado || 'activo');
            var estadoClass = isBlocked ? 'badge-danger' : (u.estado === 'activo' ? 'badge-nuevo' : 'badge-usado');
            var isSelf = u._docId === currentUid;

            var twoFaBadge = u.habilitado2FA ? ' <span class="badge badge-destacado" style="font-size:0.65rem;" title="2FA activo">2FA</span>' : '';

            var actionsHtml = '<div class="v-actions">';
            actionsHtml += '<button class="v-act v-act--success" data-action="editUser" data-id="' + AP.escapeHtml(u._docId) + '" title="Editar"><i data-lucide="pencil"></i></button>';
            if (isBlocked && !isSelf) {
                actionsHtml += '<button class="v-act v-act--warning" data-action="unlockUser" data-id="' + AP.escapeHtml(u._docId) + '" title="Desbloquear"><i data-lucide="lock-open"></i></button>';
            }
            if (!isSelf) {
                actionsHtml += '<span class="v-act-sep"></span>';
                actionsHtml += '<button class="v-act v-act--danger" data-action="deleteUser" data-id="' + AP.escapeHtml(u._docId) + '" title="Eliminar"><i data-lucide="trash-2"></i></button>';
            }
            actionsHtml += '</div>';

            // §61.R3 — Badge con color custom del role si aplica
            var rolBadgeStyle = roleColor ? ' style="background:' + roleColor + '20;color:' + roleColor + ';border:1px solid ' + roleColor + '40;"' : '';
            var migratedTag = u.roleId ? '' : ' <small title="Sin rol asignado en el sistema dinámico (legacy)" style="color:rgba(255,255,255,0.4);font-size:0.7rem;margin-left:4px;">·legacy</small>';

            html += '<tr' + (isBlocked ? ' style="opacity:0.7;background:rgba(248,81,73,0.05);"' : '') + '>' +
                '<td><strong>' + (u.nombre || '-') + '</strong>' + (isSelf ? ' <small style="color:var(--admin-gold);">(tu)</small>' : '') + twoFaBadge + '</td>' +
                '<td>' + (u.email || '-') + '</td>' +
                '<td><span class="badge ' + rolClass + '"' + rolBadgeStyle + '>' + AP.escapeHtml(rolLabel) + '</span>' + migratedTag + '</td>' +
                '<td><span class="badge ' + estadoClass + '">' + estadoLabel + '</span></td>' +
                '<td>' + actionsHtml + '</td>' +
            '</tr>';
        });

        $('usersTableBody').innerHTML = html;

        document.querySelectorAll('th[data-table="users"][data-sort]').forEach(function(th) {
            var col = th.getAttribute('data-sort');
            var si = th.querySelector('.sort-icon'); if (si) si.remove(); var text = th.textContent.trim();
            th.innerHTML = text + ' ' + (AP.getSortIndicator ? AP.getSortIndicator('users', col) : '');
        });

        if (AP.renderPagination) AP.renderPagination('usersPagination', 'users', totalUsers);
        AP.refreshIcons();
    }

    // ========== USER MODAL ==========
    function openUserModal() { $('userModal').classList.add('active'); }

    function closeUserModalFn() {
        $('userModal').classList.remove('active');
        $('userForm').reset();
        $('uOriginalUid').value = '';
        $('uPasswordGroup').style.display = '';
        $('uPassword').required = true;
        $('uEmail').readOnly = false;
        $('saveUser').textContent = 'Crear Usuario';
        // F12.3: Reset 2FA fields
        $('uHabilitar2FA').checked = false;
        $('u2FAPhoneGroup').style.display = 'none';
    }

    $('btnAddUser').addEventListener('click', function() {
        if (!AP.canManageUsers()) { AP.toast('No tienes permisos', 'error'); return; }
        $('userModalTitle').textContent = 'Crear Usuario';
        $('uOriginalUid').value = '';
        $('userForm').reset();
        $('uPasswordGroup').style.display = '';
        $('uPassword').required = true;
        $('uEmail').readOnly = false;
        $('saveUser').textContent = 'Crear Usuario';
        // §61.R3 — Popular dropdown dinámico de roles
        populateRolesDropdown();
        openUserModal();
    });

    $('closeUserModal').addEventListener('click', closeUserModalFn);
    $('cancelUserModal').addEventListener('click', closeUserModalFn);
    $('userForm').addEventListener('submit', function(e) { e.preventDefault(); });
    $('userForm').addEventListener('keydown', function(e) { if (e.key === 'Enter') e.preventDefault(); });

    // F12.3: Toggle 2FA phone fields visibility
    var u2faCheck = $('uHabilitar2FA');
    if (u2faCheck) {
        u2faCheck.addEventListener('change', function() {
            $('u2FAPhoneGroup').style.display = this.checked ? '' : 'none';
        });
    }

    // ========== EDIT USER ==========
    function editUser(uid) {
        if (!AP.canManageUsers()) { AP.toast('No tienes permisos', 'error'); return; }
        var u = AP.users.find(function(x) { return x._docId === uid; });
        if (!u) return;

        $('userModalTitle').textContent = 'Editar Usuario';
        $('uOriginalUid').value = uid;
        $('uNombre').value = u.nombre || '';
        $('uEmail').value = u.email || '';
        $('uEmail').readOnly = true;
        $('uRol').value = u.rol || 'editor';
        // §61.R3 — Popular dropdown dinámico + seleccionar el roleId actual
        // Si el user es legacy (sin roleId), se selecciona el system role correspondiente
        var selectedRoleId = u.roleId || null;
        if (!selectedRoleId && u.rol && window.AltorraRBACCatalog) {
            selectedRoleId = window.AltorraRBACCatalog.legacyMapping[u.rol] || null;
        }
        populateRolesDropdown(selectedRoleId);
        $('uPasswordGroup').style.display = 'none';
        $('uPassword').required = false;
        $('saveUser').textContent = 'Guardar Cambios';

        // F12.3: Populate 2FA fields
        var has2fa = !!u.habilitado2FA;
        $('uHabilitar2FA').checked = has2fa;
        $('u2FAPhoneGroup').style.display = has2fa ? '' : 'none';
        $('u2FAPais').value = u.prefijo2FA || '+57';
        $('u2FAPhone').value = u.telefono2FA || '';

        openUserModal();
    }

    // ========== SAVE USER ==========
    $('saveUser').addEventListener('click', function() {
        if (!AP.canManageUsers()) { AP.toast('No tienes permisos', 'error'); return; }

        var form = $('userForm');
        if (!form.checkValidity()) { form.reportValidity(); return; }

        var originalUid = $('uOriginalUid').value;
        var isEdit = !!originalUid;
        var nombre = $('uNombre').value.trim();
        var email = $('uEmail').value.trim();
        // §61.R3 — Sync legacy `rol` desde el dropdown dinámico antes de leer
        syncLegacyRolFromDropdown();
        var rol = $('uRol').value;
        var roleId = $('uRoleId').value || '';
        var roleData = _rolesCache.find(function(r) { return r._docId === roleId; });
        var password = $('uPassword').value;

        // §61.R3 — Validar que se haya elegido un role
        if (!roleId || !roleData) {
            AP.toast('Seleccioná un rol válido. Si la lista está vacía, sembrá los roles desde Configuración → Roles.', 'error');
            return;
        }

        var btn = $('saveUser');
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> Guardando...';

        if (!window.functions) {
            AP.toast('Cloud Functions no disponibles. Verifica que esten desplegadas.', 'error');
            btn.disabled = false;
            btn.textContent = isEdit ? 'Guardar Cambios' : 'Crear Usuario';
            return;
        }

        // F12.3: Collect 2FA settings
        var habilitado2FA = $('uHabilitar2FA').checked;
        var prefijo2FA = $('u2FAPais').value;
        var telefono2FA = $('u2FAPhone').value.trim();

        // §61.R3 — Datos denormalizados del role (escritura adicional al doc del user)
        var rbacData = {
            roleId: roleId,
            roleName: roleData.name || roleId,
            permissions: Array.isArray(roleData.permissions) ? roleData.permissions.slice() : [],
            permissionsUpdatedAt: new Date().toISOString()
        };

        if (isEdit) {
            // Save 2FA settings directly to Firestore profile
            var twoFaData = { habilitado2FA: habilitado2FA };
            if (habilitado2FA && telefono2FA) {
                twoFaData.prefijo2FA = prefijo2FA;
                twoFaData.telefono2FA = telefono2FA;
            } else {
                twoFaData.prefijo2FA = '';
                twoFaData.telefono2FA = '';
                twoFaData.habilitado2FA = false;
            }
            window.db.collection('usuarios').doc(originalUid).update(twoFaData).catch(function() {});

            var updateUserRole = window.functions.httpsCallable('updateUserRoleV2');
            updateUserRole({ uid: originalUid, nombre: nombre, rol: rol })
                .then(function(result) {
                    // §61.R3 — Escritura adicional con datos denormalizados RBAC
                    return window.db.collection('usuarios').doc(originalUid).update(rbacData)
                        .catch(function(err) {
                            console.warn('[AdminUsers] §61.R3 RBAC denorm write failed (no crítico):', err && err.code);
                        })
                        .then(function() { return result; });
                })
                .then(function(result) {
                    AP.toast(result.data.message || 'Usuario actualizado');
                    AP.writeAuditLog('user_update', 'usuario ' + nombre, 'rol: ' + rol + ' (roleId: ' + roleId + ')');
                    closeUserModalFn();
                    AP.loadUsers();
                })
                .catch(function(err) {
                    AP.toast(AP.parseCallableError(err), 'error');
                })
                .finally(function() {
                    btn.disabled = false;
                    btn.textContent = 'Guardar Cambios';
                });
        } else {
            var createManagedUser = window.functions.httpsCallable('createManagedUserV2');
            createManagedUser({ nombre: nombre, email: email, password: password, rol: rol })
                .then(function(result) {
                    // §61.R3 — Escritura adicional con datos denormalizados RBAC al doc recién creado
                    var newUid = result && result.data && result.data.uid;
                    if (newUid) {
                        return window.db.collection('usuarios').doc(newUid).update(rbacData)
                            .catch(function(err) {
                                console.warn('[AdminUsers] §61.R3 RBAC denorm write failed (no crítico):', err && err.code);
                            })
                            .then(function() { return result; });
                    }
                    return result;
                })
                .then(function(result) {
                    AP.toast(result.data.message || 'Usuario creado exitosamente');
                    AP.writeAuditLog('user_create', 'usuario ' + nombre, email + ' — rol: ' + rol + ' (roleId: ' + roleId + ')');
                    closeUserModalFn();
                    AP.loadUsers();
                })
                .catch(function(err) {
                    AP.toast(AP.parseCallableError(err), 'error');
                })
                .finally(function() {
                    btn.disabled = false;
                    btn.textContent = 'Crear Usuario';
                });
        }
    });

    // ========== DELETE USER ==========
    function deleteUserFn(uid) {
        if (!AP.canManageUsers()) { AP.toast('No tienes permisos', 'error'); return; }
        if (AP._deletingUser) { AP.toast('Ya hay una eliminacion en curso...', 'info'); return; }

        var currentUid = window.auth.currentUser ? window.auth.currentUser.uid : '';
        if (uid === currentUid) {
            AP.toast('No puedes eliminar tu propia cuenta', 'error');
            return;
        }

        if (!window.functions) {
            AP.toast('Cloud Functions no disponibles. Verifica que esten desplegadas.', 'error');
            return;
        }

        var u = AP.users.find(function(x) { return x._docId === uid; });
        if (!u) return;

        if (!confirm('Eliminar usuario "' + (u.nombre || u.email) + '"?\n\nSe eliminara tanto su perfil como su cuenta de autenticacion. Esta accion no se puede deshacer.')) {
            return;
        }

        AP._deletingUser = true;
        AP.toast('Eliminando usuario...', 'info');

        document.querySelectorAll('#usersTableBody .btn-danger').forEach(function(b) { b.disabled = true; });

        var deleteManagedUser = window.functions.httpsCallable('deleteManagedUserV2');
        deleteManagedUser({ uid: uid })
            .then(function(result) {
                AP.toast(result.data.message || 'Usuario eliminado completamente');
                AP.writeAuditLog('user_delete', 'usuario ' + (u.nombre || u.email), u.email);
                AP.loadUsers();
            })
            .catch(function(err) {
                AP.toast(AP.parseCallableError(err), 'error');
            })
            .finally(function() {
                AP._deletingUser = false;
                document.querySelectorAll('#usersTableBody .btn-danger').forEach(function(b) { b.disabled = false; });
            });
    }

    // F6.4: Event delegation for user actions
    var usersBody = $('usersTableBody');
    if (usersBody) {
        usersBody.addEventListener('click', function(e) {
            var btn = AP.closestAction(e);
            if (!btn) return;
            var id = btn.getAttribute('data-id');
            if (btn.getAttribute('data-action') === 'editUser') editUser(id);
            else if (btn.getAttribute('data-action') === 'deleteUser') deleteUserFn(id);
            else if (btn.getAttribute('data-action') === 'unlockUser') unlockUserFn(id);
        });
    }

    // ========== UNLOCK USER ==========
    function unlockUserFn(uid) {
        if (!AP.canManageUsers()) { AP.toast('No tienes permisos', 'error'); return; }
        var u = AP.users.find(function(x) { return x._docId === uid; });
        if (!u) return;
        if (!confirm('¿Desbloquear la cuenta de "' + (u.nombre || u.email) + '"?\n\nEl usuario podra iniciar sesion nuevamente.')) return;
        AP.unblockUser(uid).then(function() {
            AP.toast('Usuario desbloqueado: ' + (u.nombre || u.email), 'success');
            AP.writeAuditLog('user_unlock', 'usuario ' + (u.nombre || u.email), u.email);
            AP.loadUsers();
        }).catch(function(err) {
            AP.toast('Error al desbloquear: ' + err.message, 'error');
        });
    }

    // §61.R3 — Sync legacy `rol` cuando cambia el dropdown dinámico
    var uRoleIdEl = $('uRoleId');
    if (uRoleIdEl) {
        uRoleIdEl.addEventListener('change', syncLegacyRolFromDropdown);
    }

    // §61.R3 — Arrancar listener de roles + filter container al cargar
    function initR3() {
        ensureRolesFilterContainer();
        startRolesListener();
        // Cleanup hook si AltorraSectionCleanup existe
        if (window.AltorraSectionCleanup && !initR3._cleanupRegistered) {
            initR3._cleanupRegistered = true;
            // Mantenemos el listener globalmente activo (no se cancela on section change)
            // porque populateRolesDropdown() puede ser invocado desde modal que abre
            // desde sec-users → si cancelamos al salir, al volver el dropdown estaría vacío
        }
    }

    // Trigger init cuando AP esté listo
    if (window.AP && window.db) {
        initR3();
    } else {
        var pollR3 = setInterval(function() {
            if (window.AP && window.db) {
                clearInterval(pollR3);
                initR3();
            }
        }, 250);
    }

    // ========== EXPOSE ==========
    AP.renderUsersTable = renderUsersTable;
    AP.editUser = editUser;
    AP.deleteUser = deleteUserFn;
    // §61.R3 — Helpers expuestos para debug y otros módulos
    AP.usersR3 = {
        rolesCache: function() { return _rolesCache.slice(); },
        mapRoleToLegacy: mapRoleToLegacy,
        startRolesListener: startRolesListener,
        stopRolesListener: stopRolesListener,
        populateRolesDropdown: populateRolesDropdown
    };
})();
