// Admin Panel — Shared State & Utilities
// All modules read/write through window.AP to share state
(function() {
    'use strict';

    var AP = {
        // ========== DATA ==========
        vehicles: [],
        brands: [],
        users: [],
        dealers: [],
        appointments: [],
        auditLogEntries: [],
        banners: [],
        reviews: [],

        // ========== UI STATE ==========
        deleteTargetId: null,
        deleteBrandTargetId: null,
        uploadedImageUrls: [],
        bannerUploadedUrl: '',

        // ========== SUBSCRIPTIONS ==========
        unsubVehicles: null,
        unsubBrands: null,
        unsubAppointments: null,
        unsubDealers: null,
        unsubAuditLog: null,
        unsubBanners: null,
        unsubReviews: null,

        // ========== RBAC STATE ==========
        currentUserProfile: null,
        currentUserRole: null,                  // legacy field, kept for retrocompat (R8 lo elimina)
        currentUserPermissions: [],             // §61.R1 — permissions atómicas del user actual
        currentUserRoleId: null,                // §61.R1 — id del role asignado (system_X o custom)
        INACTIVITY_TIMEOUT_MS: 30 * 60 * 1000,   // 30 minutos sin actividad → cerrar sesión
        INACTIVITY_WARNING_MS: 28 * 60 * 1000,   // aviso 2 minutos antes del cierre
        SESSION_MAX_MS:         8 * 60 * 60 * 1000, // 8 horas máximas por sesión absoluta
        inactivityTimerId: null,
        inactivityWarningId: null,
        inactivityTrackingActive: false,
        ACTIVITY_EVENTS: ['mousemove', 'touchstart', 'touchmove', 'click', 'keydown', 'scroll'],

        // ========== ACTIVITY STATE ==========
        ACTIVITY_PAGE_SIZE: 10,
        activityExpanded: false,
        activitySelectMode: false,
        selectedActivityIds: [],

        // ========== SYNC STATE ==========
        _vehiclesLoaded: false,
        _brandsLoaded: false,
        _loadingTimeout: null,
        _retryCount: 0,
        MAX_RETRIES: 3,

        // ========== CALENDAR STATE ==========
        calendarMonth: new Date().getMonth(),
        calendarYear: new Date().getFullYear(),
        blockedDates: {},
        blockedHours: {},

        // ========== UPLOAD CONFIG ==========
        UPLOAD_CONFIG: {
            maxFileSizeMB: 2,
            maxWidthPx: 1200,
            compressionQuality: 0.75,
            allowedTypes: ['image/jpeg', 'image/png', 'image/webp'],
            storagePath: 'cars/'
        },


        // ========== DRAFT STATE ==========
        draftInterval: null,
        _dragSrcIdx: null,
        _deletingUser: false,

        // ========== RBAC CHECKS ==========
        // §61.R1 — Helpers legacy preservados (signatura idéntica para 154 callsites).
        // Internamente prefieren AP.currentUserPermissions[]. Si está vacío,
        // caen al chequeo de AP.currentUserRole (legacy fallback).
        //
        // §61.R5 (2026-05-10) — Marcados @deprecated. Código nuevo debe usar
        // AP.hasPermission(permId) directo. Los helpers seguirán funcionando
        // hasta R8 cleanup (eliminación final cuando todos los callsites
        // legacy estén refactorizados). Ver CLAUDE.md §67 para mapping table
        // completa legacy → hasPermission.

        /**
         * Chequea si el user tiene un permission específico.
         * Retorna true si el array contiene el wildcard '*' (super_admin)
         * o el permId exacto.
         *
         * Esta es la API canónica de RBAC. Usar SIEMPRE en código nuevo.
         *
         * @example
         *   if (AP.hasPermission('vehicles.delete')) { ... }
         *   if (AP.hasPermission('*')) { ... } // wildcard super_admin
         */
        hasPermission: function(permId) {
            var perms = AP.currentUserPermissions;
            if (!Array.isArray(perms) || perms.length === 0) return false;
            if (perms.indexOf('*') !== -1) return true;
            return perms.indexOf(permId) !== -1;
        },

        /**
         * §61.R8 (PENDIENTE-B) — Helper canónico ADITIVO para reemplazar el uso
         * semántico de `isEditorOrAbove()` cuando solo se valida "es un admin
         * autenticado con permisos válidos" (no un permission específico).
         *
         * Retorna true si `currentUserPermissions[]` tiene al menos 1 entry
         * (cubre super_admin con ['*'] + cualquier custom role + Path B legacy
         * fallback hidratado desde rol). Patrón usado por adaptive tracking,
         * onboarding tour, telemetría, etc. — donde NO importa QUÉ permiso
         * tiene, solo que es un admin válido (no anónimo).
         *
         * @example
         *   if (AP.isAuthenticatedAdmin()) { trackAdminUsage(); }
         */
        isAuthenticatedAdmin: function() {
            return !!(AP.currentUserPermissions && AP.currentUserPermissions.length > 0);
        },

        /**
         * §114 — RESOLVER CANÓNICO de la etiqueta de rol que se muestra en TODA la UI.
         * Single source of truth para reemplazar las 3 implementaciones duplicadas
         * (formatRole/roleLabel) y eliminar los labels crudos legacy ("editor",
         * "super_admin", "viewer") de cualquier vista.
         *
         * Prioridad de resolución:
         *   1) roleName (denormalizado del rol dinámico del sistema — §61)
         *   2) cargo (espejo de roleName desde §114; fallback si roleName falta)
         *   3) etiqueta legible del rol legacy (super_admin→"CEO", etc.)
         *   4) 'Sin rol asignado'
         *
         * @param {Object|string} userOrRol — doc de usuario (con roleName/cargo/rol)
         *        o un string de rol legacy.
         * @returns {string} etiqueta lista para mostrar al usuario.
         * @example
         *   AP.resolveRoleLabel(userDoc)      // "CEO" / "Asesor comercial" / ...
         *   AP.resolveRoleLabel('super_admin') // "CEO"
         */
        resolveRoleLabel: function(userOrRol) {
            if (!userOrRol) return 'Sin rol asignado';
            if (typeof userOrRol === 'string') {
                return AP._legacyRoleLabel(userOrRol);
            }
            var u = userOrRol;
            if (u.roleName && String(u.roleName).trim()) return String(u.roleName).trim();
            if (u.cargo && String(u.cargo).trim()) return String(u.cargo).trim();
            if (u.rol) return AP._legacyRoleLabel(u.rol);
            return 'Sin rol asignado';
        },

        /**
         * §114 — Traduce un rol legacy crudo a su etiqueta legible.
         * Usado SOLO como fallback por resolveRoleLabel cuando no hay roleName/cargo.
         */
        _legacyRoleLabel: function(rol) {
            if (!rol) return 'Sin rol asignado';
            switch (String(rol)) {
                case 'super_admin': return 'CEO';
                case 'editor': return 'Editor';
                case 'viewer': return 'Lector';
                case 'admin': return 'Administrador';
                default: return String(rol);
            }
        },

        /**
         * @deprecated §61.R5 — Usar `AP.hasPermission('*')` en código nuevo.
         * Source of truth: wildcard permission '*'.
         * Fallback legacy: currentUserRole === 'super_admin'.
         */
        isSuperAdmin: function() {
            if (AP.currentUserPermissions && AP.currentUserPermissions.length > 0) {
                return AP.currentUserPermissions.indexOf('*') !== -1;
            }
            return AP.currentUserRole === 'super_admin';
        },
        /**
         * @deprecated §61.R5 — No tiene equivalencia 1:1 con hasPermission.
         * Para chequeos de permisos usar AP.hasPermission('vehicles.edit') etc.
         * Para identificar el role específico usar AP.currentUserRoleId === 'system_editor'.
         */
        isEditor: function() {
            if (AP.currentUserRoleId) return AP.currentUserRoleId === 'system_editor';
            return AP.currentUserRole === 'editor';
        },
        /**
         * @deprecated §61.R5 — No tiene equivalencia 1:1 con hasPermission.
         * Para chequeos read-only usar AP.hasPermission('vehicles.read') etc.
         */
        isViewer: function() {
            if (AP.currentUserRoleId) return AP.currentUserRoleId === 'system_viewer';
            return AP.currentUserRole === 'viewer';
        },
        /**
         * @deprecated §61.R5 — Usar `AP.hasPermission('users.create') || AP.hasPermission('users.edit')`.
         */
        canManageUsers: function() { return AP.hasPermission('users.create') || AP.hasPermission('users.edit') || AP.hasPermission('*') || AP.isSuperAdmin(); },
        /**
         * @deprecated §61.R5 — Usar `AP.hasPermission('vehicles.create') || AP.hasPermission('vehicles.edit')`.
         */
        canCreateOrEditInventory: function() { return AP.hasPermission('vehicles.create') || AP.hasPermission('vehicles.edit') || AP.hasPermission('*') || AP.isSuperAdmin() || AP.isEditor(); },
        /**
         * @deprecated §61.R5 — Usar `AP.hasPermission('vehicles.delete')`.
         */
        canDeleteInventory: function() { return AP.hasPermission('vehicles.delete') || AP.hasPermission('*') || AP.isSuperAdmin(); },
        /**
         * @deprecated §61.R5 — Demasiado genérico. Usar el permission específico que
         * corresponda al callsite, ej. `AP.hasPermission('vehicles.edit')`,
         * `AP.hasPermission('crm.edit')`, etc.
         */
        isEditorOrAbove: function() {
            if (AP.currentUserPermissions && AP.currentUserPermissions.length > 0) {
                if (AP.currentUserPermissions.indexOf('*') !== -1) return true;
                if (AP.currentUserPermissions.indexOf('vehicles.edit') !== -1) return true;
                if (AP.currentUserPermissions.indexOf('concierge.respond') !== -1) return true;
                if (AP.currentUserPermissions.indexOf('crm.edit') !== -1) return true;
            }
            return AP.currentUserRole === 'super_admin' || AP.currentUserRole === 'editor';
        },

        // ========== HELPERS ==========
        $: function(id) { return document.getElementById(id); },

        toast: function(msg, type) {
            var t = AP.$('adminToast');
            t.textContent = msg;
            t.className = 'admin-toast ' + (type || 'success') + ' show';
            setTimeout(function() { t.classList.remove('show'); }, 5000);
        },

        toTitleCase: function(str) {
            if (!str) return '';
            return str.trim().toLowerCase().replace(/(?:^|\s)\S/g, function(c) { return c.toUpperCase(); });
        },

        formatPrice: function(n) {
            if (!n) return '-';
            return '$' + Number(n).toLocaleString('es-CO');
        },

        escapeHtml: function(str) {
            var div = document.createElement('div');
            div.textContent = str || '';
            return div.innerHTML;
        },

        // F0.3: Safe closest() — handles SVG child nodes and text nodes
        closestAction: function(e) {
            var el = e.target;
            if (!el) return null;
            if (el.nodeType !== 1) el = el.parentElement;
            if (!el || typeof el.closest !== 'function') return null;
            return el.closest('[data-action]');
        },

        capitalize: function(str) {
            if (!str) return '';
            return str.charAt(0).toUpperCase() + str.slice(1);
        },

        timeAgo: function(val) {
            return AP.formatTimeAgo(val);
        },

        formatTimeAgo: function(isoString) {
            try {
                var date = new Date(isoString);
                var now = new Date();
                var diffMs = now - date;
                var diffSec = Math.floor(diffMs / 1000);
                var diffMin = Math.floor(diffSec / 60);
                var diffHours = Math.floor(diffMin / 60);
                var diffDays = Math.floor(diffHours / 24);

                if (diffSec < 60) return 'Hace un momento';
                if (diffMin < 60) return 'Hace ' + diffMin + (diffMin === 1 ? ' minuto' : ' minutos');
                if (diffHours < 24) return 'Hace ' + diffHours + (diffHours === 1 ? ' hora' : ' horas');
                if (diffDays < 7) return 'Hace ' + diffDays + (diffDays === 1 ? ' dia' : ' dias');

                return date.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
            } catch (e) {
                return '';
            }
        },

        parseCallableError: function(err) {
            var code = (err.code || '').replace('functions/', '');
            var serverMsg = err.message || '';
            var detailsMsg = '';

            if (typeof err.details === 'string') {
                detailsMsg = err.details;
            } else if (err.details && typeof err.details === 'object') {
                detailsMsg = err.details.originalMessage || err.details.message || '';
            }

            if (!serverMsg || serverMsg.toLowerCase() === code || serverMsg.toLowerCase() === 'internal') {
                serverMsg = detailsMsg || serverMsg;
            }

            var map = {
                'unauthenticated': 'Tu sesion expiro. Inicia sesion de nuevo.',
                'permission-denied': serverMsg || 'No tienes permisos para esta accion.',
                'invalid-argument': serverMsg || 'Datos invalidos. Revisa el formulario.',
                'not-found': serverMsg || 'El recurso no fue encontrado.',
                'already-exists': serverMsg || 'Este registro ya existe.',
                'failed-precondition': serverMsg || 'No se puede completar la accion.',
                'unavailable': 'Servicio no disponible. Las Cloud Functions no estan desplegadas o hay un problema de red.',
                'internal': serverMsg || 'Error interno del servidor.',
                'deadline-exceeded': 'La operacion tardo demasiado. Intenta de nuevo.'
            };

            return map[code] || serverMsg || 'Error desconocido: ' + (err.message || err.code || 'sin detalles');
        },

        /**
         * Compress and convert image to WebP.
         * @param {File} file - The image file to process
         * @param {Object} [opts] - Optional overrides
         * @param {number} [opts.maxWidth]  - Max width in px (default: UPLOAD_CONFIG.maxWidthPx = 1200)
         * @param {number} [opts.quality]   - WebP quality 0-1 (default: UPLOAD_CONFIG.compressionQuality = 0.75)
         * @param {boolean} [opts.forceWebp] - Always convert even if already webp (default: true)
         * @returns {Promise<File>}
         */
        compressImage: function(file, opts) {
            opts = opts || {};
            var maxW = opts.maxWidth || AP.UPLOAD_CONFIG.maxWidthPx;
            var quality = opts.quality != null ? opts.quality : AP.UPLOAD_CONFIG.compressionQuality;
            var forceWebp = opts.forceWebp !== false;

            return new Promise(function(resolve, reject) {
                // Skip only if already webp, small, and not forced
                if (!forceWebp && file.size <= 200 * 1024 && file.type === 'image/webp') {
                    resolve(file);
                    return;
                }

                var img = new Image();
                var canvas = document.createElement('canvas');
                var reader = new FileReader();

                reader.onload = function(e) {
                    img.onload = function() {
                        var w = img.width;
                        var h = img.height;

                        if (w > maxW) {
                            h = Math.round(h * (maxW / w));
                            w = maxW;
                        }

                        canvas.width = w;
                        canvas.height = h;

                        var ctx = canvas.getContext('2d');
                        ctx.drawImage(img, 0, 0, w, h);

                        var outputType = 'image/webp';

                        canvas.toBlob(function(blob) {
                            if (!blob) {
                                // WebP not supported — fallback to JPEG
                                canvas.toBlob(function(jpegBlob) {
                                    if (!jpegBlob) { resolve(file); return; }
                                    var name = file.name.replace(/\.[^.]+$/, '') + '.jpg';
                                    resolve(new File([jpegBlob], name, { type: 'image/jpeg' }));
                                }, 'image/jpeg', quality);
                                return;
                            }
                            var name = file.name.replace(/\.[^.]+$/, '') + '.webp';
                            resolve(new File([blob], name, { type: outputType }));
                        }, outputType, quality);
                    };

                    img.onerror = function() { reject(new Error('No se pudo leer la imagen')); };
                    img.src = e.target.result;
                };

                reader.onerror = function() { reject(new Error('No se pudo leer el archivo')); };
                reader.readAsDataURL(file);
            });
        },

        // ========== AUDIT LOG ==========
        writeAuditLog: function(action, target, details) {
            try {
                var userEmail = (window.auth && window.auth.currentUser) ? window.auth.currentUser.email : 'unknown';
                var logEntry = {
                    action: action,
                    target: target,
                    details: details || '',
                    user: userEmail,
                    timestamp: new Date().toISOString()
                };
                window.db.collection('auditLog').add(logEntry).catch(function() {});
            } catch (e) {}
        },

        ESTADO_LABELS: {
            disponible: { text: 'Disponible', cls: 'badge-success' },
            apartado:   { text: 'Apartado',   cls: 'badge-warning' }, // E4 §186/F25: lo escribe el CRM (agregado de deals)
            reservado:  { text: 'Reservado',  cls: 'badge-warning' },
            vendido:    { text: 'Vendido',    cls: 'badge-danger' },
            borrador:   { text: 'Borrador',   cls: 'badge-muted' }
        }
    };

    // ========== GRANULAR RBAC MATRIX ==========
    // §61.R1 — Cada helper delega a AP.hasPermission(permId) si hay permissions[].
    // Si no hay (legacy users pre-migración), cae al chequeo de role legacy.
    // Signatura externa idéntica → cero impacto en los 154 callsites.
    //
    // §61.R5 — TODOS los helpers de AP.RBAC.* están @deprecated. Código
    // nuevo debe usar AP.hasPermission(permId) directo. La equivalencia
    // por helper está en el primer argumento de _check(permId, ...).
    // Ejemplo: AP.RBAC.canCreateVehicle() → AP.hasPermission('vehicles.create')
    // Ver CLAUDE.md §67 para mapping table completa.
    // R8 los eliminará cuando todos los callsites estén refactorizados.

    function _check(permId, legacyFallback) {
        // Prefer dynamic permissions
        if (AP.currentUserPermissions && AP.currentUserPermissions.length > 0) {
            return AP.hasPermission(permId);
        }
        // Legacy fallback
        return !!legacyFallback();
    }

    AP.RBAC = {
        // Users
        canViewUsers:         function() { return _check('users.read',   function() { return AP.isSuperAdmin(); }); },
        canManageUsers:       function() { return _check('users.create', function() { return AP.isSuperAdmin(); }); },
        // Vehicles
        canViewVehicles:      function() { return _check('vehicles.read',   function() { return true; }); },
        canCreateVehicle:     function() { return _check('vehicles.create', function() { return AP.isSuperAdmin() || AP.isEditor(); }); },
        canEditVehicle:       function() { return _check('vehicles.edit',   function() { return AP.isSuperAdmin() || AP.isEditor(); }); },
        canDeleteVehicle:     function() { return _check('vehicles.delete', function() { return AP.isSuperAdmin(); }); },
        // Brands
        canViewBrands:        function() { return _check('brands.read',   function() { return true; }); },
        canCreateBrand:       function() { return _check('brands.create', function() { return AP.isSuperAdmin() || AP.isEditor(); }); },
        canEditBrand:         function() { return _check('brands.edit',   function() { return AP.isSuperAdmin() || AP.isEditor(); }); },
        canDeleteBrand:       function() { return _check('brands.delete', function() { return AP.isSuperAdmin(); }); },
        // Appointments
        canViewAppointments:  function() { return _check('appointments.read',   function() { return true; }); },
        canManageAppointment: function() { return _check('appointments.edit',   function() { return AP.isSuperAdmin() || AP.isEditor(); }); },
        canDeleteAppointment: function() { return _check('appointments.delete', function() { return AP.isSuperAdmin(); }); },
        // Dealers
        canViewDealers:       function() { return _check('dealers.read',   function() { return AP.isSuperAdmin() || AP.isEditor(); }); },
        canManageDealers:     function() { return _check('dealers.edit',   function() { return AP.isSuperAdmin(); }); },
        // Lists (atributos)
        canViewLists:         function() { return _check('crm.read', function() { return AP.isSuperAdmin() || AP.isEditor(); }); },
        canEditLists:         function() { return _check('crm.edit', function() { return AP.isSuperAdmin(); }); },
        // Settings & Backup
        canExportBackup:      function() { return _check('settings.backup', function() { return AP.isSuperAdmin(); }); },
        canImportBackup:      function() { return _check('settings.backup', function() { return AP.isSuperAdmin(); }); },
        // Activity log
        canViewActivity:      function() { return _check('audit.read',   function() { return true; }); },
        canDeleteActivity:    function() { return _check('audit.delete', function() { return AP.isSuperAdmin(); }); },
        // Banners
        canViewBanners:       function() { return _check('banners.read',   function() { return AP.isSuperAdmin() || AP.isEditor(); }); },
        canCreateBanner:      function() { return _check('banners.create', function() { return AP.isSuperAdmin() || AP.isEditor(); }); },
        canEditBanner:        function() { return _check('banners.edit',   function() { return AP.isSuperAdmin() || AP.isEditor(); }); },
        canDeleteBanner:      function() { return _check('banners.delete', function() { return AP.isSuperAdmin(); }); },
        // Reviews
        canViewReviews:       function() { return _check('reviews.read',   function() { return AP.isSuperAdmin() || AP.isEditor(); }); },
        canCreateReview:      function() { return _check('reviews.create', function() { return AP.isSuperAdmin() || AP.isEditor(); }); },
        canEditReview:        function() { return _check('reviews.edit',   function() { return AP.isSuperAdmin() || AP.isEditor(); }); },
        canDeleteReview:      function() { return _check('reviews.delete', function() { return AP.isSuperAdmin(); }); }
    };

    // ========== F2.4: CONNECTIVITY INDICATOR ==========
    var _connBar = null;
    var _connTimer = null;
    function initConnectivity() {
        _connBar = document.getElementById('connectivityBar');
        if (!_connBar) return;
        window.addEventListener('offline', function() {
            if (_connTimer) clearTimeout(_connTimer);
            _connBar.className = 'connectivity-bar offline';
            _connBar.textContent = '⚠ Sin conexión a internet — Los cambios no se guardarán';
        });
        window.addEventListener('online', function() {
            _connBar.className = 'connectivity-bar back-online';
            _connBar.textContent = '✓ Conexión restaurada';
            _connTimer = setTimeout(function() {
                _connBar.className = 'connectivity-bar';
                _connBar.textContent = '';
            }, 3500);
        });
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initConnectivity);
    } else {
        initConnectivity();
    }

    // ========== LUCIDE ICONS HELPER ==========
    // Refresh Lucide icons after dynamic content renders (tables, modals, etc.)
    AP.refreshIcons = function() {
        if (window.lucide) lucide.createIcons();
    };

    // ========== F2.2: SKELETON LOADERS ==========
    AP.showTableSkeleton = function(tbodyId, cols) {
        var el = document.getElementById(tbodyId);
        if (!el) return;
        var html = '';
        for (var i = 0; i < 5; i++) {
            html += '<tr>';
            for (var j = 0; j < cols; j++) {
                if (j === 0) html += '<td><div class="skeleton skeleton-text-sm" style="width:70px;"></div></td>';
                else if (j === 1) html += '<td><div class="skeleton skeleton-img"></div></td>';
                else html += '<td><div class="skeleton skeleton-text" style="width:' + (50 + Math.random() * 40) + '%;"></div></td>';
            }
            html += '</tr>';
        }
        el.innerHTML = html;
    };

    AP.showStatsSkeleton = function() {
        document.querySelectorAll('.stat-value').forEach(function(el) {
            el.innerHTML = '<div class="skeleton skeleton-stat"></div>';
        });
    };

    window.AP = AP;

    // Compatibility alias: HTML onclick handlers reference adminPanel.xxx()
    window.adminPanel = AP;
})();
