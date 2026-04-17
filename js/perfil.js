// ============================================================
//  PERFIL.JS — Panel de Usuario Premium — Altorra Cars
//  Fase B1: Layout sidebar, navegacion, skeleton, perfil + seguridad
//  Fase B2: Completitud, edicion mejorada, ubicacion, badges
// ============================================================
(function () {
    'use strict';

    var _user = null;
    var _userData = null;
    var _currentSection = 'perfil';
    var _saveTimer = null;
    var _saving = false;

    function $id(id) { return document.getElementById(id); }

    function escapeHtml(str) {
        return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function _toast(msg, type) {
        if (typeof toast !== 'undefined' && toast && toast.show) {
            toast.show(msg, type || 'info');
        }
    }

    // ── Colombia cities (main ones) ─────────────────────────
    var COLOMBIA_CITIES = [
        'Cartagena', 'Bogota', 'Medellin', 'Cali', 'Barranquilla',
        'Bucaramanga', 'Santa Marta', 'Manizales', 'Pereira', 'Cucuta',
        'Ibague', 'Villavicencio', 'Monteria', 'Pasto', 'Neiva',
        'Valledupar', 'Armenia', 'Popayan', 'Sincelejo', 'Tunja',
        'Riohacha', 'Florencia', 'Quibdo', 'Yopal', 'Mocoa'
    ];

    // ── Profile completeness ────────────────────────────────
    function calcCompleteness(user, data) {
        if (!data) return { pct: 0, missing: [], completed: [] };
        var fields = [
            { key: 'nombre',   label: 'Nombre',   check: function () { return !!(data.nombre || user.displayName); } },
            { key: 'email',    label: 'Correo',    check: function () { return !!(data.email || user.email); } },
            { key: 'telefono', label: 'Telefono',  check: function () { return !!data.telefono; } },
            { key: 'ciudad',   label: 'Ciudad',    check: function () { return !!data.ciudad; } },
            { key: 'avatarURL', label: 'Foto de perfil', check: function () { return !!(data.avatarURL || (user.photoURL && user.photoURL.indexOf('googleusercontent') !== -1)); } }
        ];
        var done = [];
        var miss = [];
        fields.forEach(function (f) {
            if (f.check()) done.push(f);
            else miss.push(f);
        });
        return { pct: Math.round((done.length / fields.length) * 100), missing: miss, completed: done };
    }

    function renderCompletenessBar(user, data) {
        var info = calcCompleteness(user, data);
        if (info.pct === 100) {
            return '<div class="pf-completeness pf-completeness--done">' +
                '<div class="pf-completeness-header">' +
                    '<span class="pf-completeness-label"><i data-lucide="check-circle"></i> Perfil completo</span>' +
                    '<span class="pf-completeness-pct">100%</span>' +
                '</div>' +
                '<div class="pf-progress"><div class="pf-progress-bar" style="width:100%"></div></div>' +
            '</div>';
        }
        var tips = info.missing.map(function (m) { return m.label; }).join(', ');
        return '<div class="pf-completeness">' +
            '<div class="pf-completeness-header">' +
                '<span class="pf-completeness-label"><i data-lucide="user-check"></i> Tu perfil esta al ' + info.pct + '%</span>' +
                '<span class="pf-completeness-pct">' + info.pct + '%</span>' +
            '</div>' +
            '<div class="pf-progress"><div class="pf-progress-bar" style="width:' + info.pct + '%"></div></div>' +
            '<p class="pf-completeness-tip">Completa: ' + escapeHtml(tips) + '</p>' +
        '</div>';
    }

    // ── Navigation ──────────────────────────────────────────
    var SECTIONS = [
        { id: 'perfil',       icon: 'user',         label: 'Mi Perfil' },
        { id: 'favoritos',    icon: 'heart',        label: 'Favoritos' },
        { id: 'historial',    icon: 'clock-3',      label: 'Historial' },
        { id: 'solicitudes',  icon: 'file-text',    label: 'Solicitudes' },
        { id: 'citas',        icon: 'calendar',     label: 'Citas' },
        { id: 'seguridad',    icon: 'shield',       label: 'Seguridad' }
    ];

    function switchSection(sectionId) {
        _currentSection = sectionId;

        // Update sidebar active
        document.querySelectorAll('.pf-nav-item').forEach(function (el) {
            el.classList.toggle('active', el.dataset.section === sectionId);
        });
        // Update mobile tabs active
        document.querySelectorAll('.pf-mobile-tab').forEach(function (el) {
            el.classList.toggle('active', el.dataset.section === sectionId);
        });
        // Show/hide sections
        document.querySelectorAll('.pf-section').forEach(function (el) {
            el.classList.toggle('active', el.id === 'section-' + sectionId);
        });

        // Scroll mobile tab into view
        var activeTab = document.querySelector('.pf-mobile-tab.active');
        if (activeTab) activeTab.scrollIntoView({ behavior: 'smooth', inline: 'center', block: 'nearest' });
    }

    function buildNavigation() {
        var sidebar = $id('pfSidebar');
        var mobileTabs = $id('pfMobileTabs');
        if (!sidebar || !mobileTabs) return;

        // Sidebar nav
        var navHtml = '<ul class="pf-nav">';
        SECTIONS.forEach(function (s) {
            var badgeHtml = '';
            if (s.id === 'favoritos' && window.favoritesManager) {
                var c = window.favoritesManager.count();
                if (c > 0) badgeHtml = '<span class="pf-nav-badge">' + c + '</span>';
            }
            navHtml += '<li class="pf-nav-item' + (s.id === _currentSection ? ' active' : '') + '" data-section="' + s.id + '">' +
                '<i data-lucide="' + s.icon + '"></i>' +
                '<span>' + s.label + '</span>' +
                badgeHtml +
                '</li>';
        });
        navHtml += '</ul>';
        sidebar.querySelector('.pf-nav-wrap').innerHTML = navHtml;

        // Mobile tabs
        var tabsHtml = '';
        SECTIONS.forEach(function (s) {
            tabsHtml += '<button class="pf-mobile-tab' + (s.id === _currentSection ? ' active' : '') + '" data-section="' + s.id + '">' +
                '<i data-lucide="' + s.icon + '"></i>' +
                '<span>' + s.label + '</span>' +
                '</button>';
        });
        mobileTabs.innerHTML = tabsHtml;

        // Events
        document.querySelectorAll('.pf-nav-item').forEach(function (el) {
            el.addEventListener('click', function () { switchSection(this.dataset.section); });
        });
        document.querySelectorAll('.pf-mobile-tab').forEach(function (el) {
            el.addEventListener('click', function () { switchSection(this.dataset.section); });
        });

        if (window.lucide) window.lucide.createIcons();
    }

    function updateSidebarUser(user, data) {
        var nameEl = $id('pfSidebarName');
        var emailEl = $id('pfSidebarEmail');
        var avatarEl = $id('pfSidebarAvatar');
        if (!nameEl) return;

        var name = (data && data.nombre) || (user && user.displayName) || '';
        var email = (data && data.email) || (user && user.email) || '';
        var initials = name ? name.split(' ').map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase() : '?';
        var photoURL = (data && data.avatarURL) || (user && user.photoURL) || '';

        nameEl.textContent = name || 'Usuario';
        emailEl.textContent = email;
        if (avatarEl) {
            if (photoURL) {
                avatarEl.innerHTML = '<img src="' + escapeHtml(photoURL) + '" alt="Avatar" onerror="this.parentNode.textContent=\'' + initials + '\'">';
            } else {
                avatarEl.textContent = initials;
            }
        }
    }

    // ── Skeleton Loading ────────────────────────────────────
    function showSkeleton() {
        var content = $id('pfContentArea');
        if (!content) return;

        content.innerHTML =
            '<div class="pf-section active" id="section-perfil">' +
                '<div class="pf-card pf-skeleton-hero">' +
                    '<div class="pf-skeleton pf-skeleton-circle"></div>' +
                    '<div style="flex:1">' +
                        '<div class="pf-skeleton pf-skeleton-line" style="width:45%;height:18px;"></div>' +
                        '<div class="pf-skeleton pf-skeleton-line" style="width:55%;height:12px;"></div>' +
                        '<div class="pf-skeleton pf-skeleton-line" style="width:25%;height:12px;"></div>' +
                    '</div>' +
                '</div>' +
                '<div class="pf-card pf-skeleton-card">' +
                    '<div class="pf-skeleton pf-skeleton-line" style="width:30%;height:10px;margin-bottom:16px;"></div>' +
                    '<div class="pf-skeleton pf-skeleton-line" style="width:100%;height:14px;"></div>' +
                    '<div class="pf-skeleton pf-skeleton-line" style="width:100%;height:14px;"></div>' +
                    '<div class="pf-skeleton pf-skeleton-line" style="width:80%;height:14px;"></div>' +
                '</div>' +
                '<div class="pf-card pf-skeleton-card">' +
                    '<div class="pf-skeleton pf-skeleton-line" style="width:25%;height:10px;margin-bottom:16px;"></div>' +
                    '<div style="display:flex;gap:12px;">' +
                        '<div class="pf-skeleton" style="flex:1;height:70px;border-radius:10px;"></div>' +
                        '<div class="pf-skeleton" style="flex:1;height:70px;border-radius:10px;"></div>' +
                        '<div class="pf-skeleton" style="flex:1;height:70px;border-radius:10px;"></div>' +
                    '</div>' +
                '</div>' +
            '</div>';
    }

    // ── Not Authenticated ───────────────────────────────────
    function showNotAuth() {
        var content = $id('pfContentArea');
        if (!content) return;

        content.innerHTML =
            '<div class="pf-section active">' +
                '<div class="pf-not-auth">' +
                    '<div class="pf-not-auth-icon">' +
                        '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">' +
                            '<path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>' +
                        '</svg>' +
                    '</div>' +
                    '<h2>Inicia sesion para ver tu perfil</h2>' +
                    '<p>Accede a tus favoritos, historial y datos personales.</p>' +
                    '<button class="pf-btn pf-btn-gold" id="pfLoginBtn">Ingresar</button>' +
                '</div>' +
            '</div>';

        var btn = $id('pfLoginBtn');
        if (btn) btn.addEventListener('click', function () {
            if (window.AltorraAuth) window.AltorraAuth.open('login');
        });

        // Hide sidebar
        var sidebar = $id('pfSidebar');
        var tabs = $id('pfMobileTabs');
        if (sidebar) sidebar.style.display = 'none';
        if (tabs) tabs.style.display = 'none';
    }

    // ── Provider helpers ────────────────────────────────────
    function getProviders(user) {
        var providers = { google: false, password: false };
        if (user.providerData) {
            user.providerData.forEach(function (p) {
                if (p.providerId === 'google.com') providers.google = true;
                if (p.providerId === 'password') providers.password = true;
            });
        }
        return providers;
    }

    function renderProviderBadges(user, created) {
        var p = getProviders(user);
        var html = '';
        if (p.google) {
            html += '<span class="pf-badge pf-badge-google">' +
                '<svg width="12" height="12" viewBox="0 0 488 512"><path fill="#4285f4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>' +
                ' Google</span>';
        }
        if (p.password) {
            html += '<span class="pf-badge pf-badge-email"><i data-lucide="mail"></i> Email</span>';
        }
        if (created) {
            var d = new Date(created);
            var months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
            html += '<span class="pf-badge pf-badge-member"><i data-lucide="calendar"></i> Miembro desde ' + months[d.getMonth()] + ' ' + d.getFullYear() + '</span>';
        }
        return html;
    }

    // ── Phone validation ─────────────────────────────────────
    function isValidPhone(v) {
        return /^[0-9]{7,10}$/.test(v.replace(/\s/g, ''));
    }

    // ── Profile Section ─────────────────────────────────────
    function renderProfileSection(user, data) {
        var name = data.nombre || user.displayName || (user.email || '').split('@')[0];
        var initials = name.split(' ').map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase();
        var email = data.email || user.email || '';
        var phone = data.telefono ? ((data.prefijo || '+57') + ' ' + data.telefono) : '';
        var city = data.ciudad || '';
        var favCount = window.favoritesManager ? window.favoritesManager.count() : 0;
        var histCount = window.vehicleHistory ? window.vehicleHistory.getCount() : 0;
        var photoURL = data.avatarURL || user.photoURL || '';

        var avatarHtml = photoURL
            ? '<img src="' + escapeHtml(photoURL) + '" alt="Avatar" onerror="this.parentNode.textContent=\'' + initials + '\'">'
            : initials;

        // City options
        var cityOptions = '<option value="">Seleccionar ciudad</option>';
        COLOMBIA_CITIES.forEach(function (c) {
            cityOptions += '<option value="' + c + '"' + (city === c ? ' selected' : '') + '>' + c + '</option>';
        });
        if (city && COLOMBIA_CITIES.indexOf(city) === -1) {
            cityOptions += '<option value="' + escapeHtml(city) + '" selected>' + escapeHtml(city) + '</option>';
        }

        var html =
            renderCompletenessBar(user, data) +

            '<div class="pf-card pf-hero">' +
                '<div class="pf-avatar" id="pfAvatar">' + avatarHtml + '</div>' +
                '<div class="pf-hero-info">' +
                    '<h1 class="pf-hero-name">' + escapeHtml(name) + '</h1>' +
                    '<p class="pf-hero-email">' + escapeHtml(email) + '</p>' +
                    '<div class="pf-hero-meta">' +
                        renderProviderBadges(user, data.creadoEn) +
                    '</div>' +
                '</div>' +
            '</div>' +

            '<div class="pf-card">' +
                '<div class="pf-card-header">' +
                    '<div class="pf-card-title">Datos personales</div>' +
                    '<span class="pf-autosave-indicator" id="pfAutoSave"></span>' +
                '</div>' +
                '<div id="pfInfoView">' +
                    '<div class="pf-row"><span class="pf-label"><i data-lucide="user"></i> Nombre</span><span class="pf-value">' + escapeHtml(name) + '</span></div>' +
                    '<div class="pf-row"><span class="pf-label"><i data-lucide="mail"></i> Correo</span><span class="pf-value">' + escapeHtml(email) + '</span></div>' +
                    '<div class="pf-row"><span class="pf-label"><i data-lucide="phone"></i> Telefono</span><span class="pf-value">' + (phone ? escapeHtml(phone) : '<span class="pf-value-empty">No registrado</span>') + '</span></div>' +
                    '<div class="pf-row"><span class="pf-label"><i data-lucide="map-pin"></i> Ciudad</span><span class="pf-value">' + (city ? escapeHtml(city) : '<span class="pf-value-empty">No registrada</span>') + '</span></div>' +
                    '<div class="pf-btn-group"><button class="pf-btn pf-btn-outline" id="pfEditBtn"><i data-lucide="pencil"></i> Editar datos</button></div>' +
                '</div>' +
                '<div class="pf-edit-form" id="pfEditForm">' +
                    '<div class="pf-field">' +
                        '<label>Nombre completo</label>' +
                        '<input class="pf-input" id="pfEditName" value="' + escapeHtml(name) + '" maxlength="60">' +
                        '<span class="pf-field-hint" id="pfNameHint"></span>' +
                    '</div>' +
                    '<div class="pf-field">' +
                        '<label>Telefono</label>' +
                        '<div class="pf-input-group">' +
                            '<span class="pf-input-prefix">+57</span>' +
                            '<input class="pf-input pf-input--prefixed" id="pfEditPhone" value="' + escapeHtml(data.telefono || '') + '" placeholder="300 123 4567" maxlength="10" inputmode="tel">' +
                        '</div>' +
                        '<span class="pf-field-hint" id="pfPhoneHint"></span>' +
                    '</div>' +
                    '<div class="pf-field">' +
                        '<label>Ciudad</label>' +
                        '<select class="pf-input pf-select" id="pfEditCity">' + cityOptions + '</select>' +
                    '</div>' +
                    '<div class="pf-btn-group">' +
                        '<button class="pf-btn pf-btn-gold" id="pfSaveBtn"><i data-lucide="check"></i> Guardar</button>' +
                        '<button class="pf-btn pf-btn-outline" id="pfCancelBtn">Cancelar</button>' +
                    '</div>' +
                '</div>' +
            '</div>' +

            '<div class="pf-card">' +
                '<div class="pf-card-title">Tu actividad</div>' +
                '<div class="pf-stats">' +
                    '<a href="favoritos.html" class="pf-stat">' +
                        '<div class="pf-stat-num" id="pfFavCount">' + favCount + '</div>' +
                        '<div class="pf-stat-label">Favoritos</div>' +
                    '</a>' +
                    '<div class="pf-stat">' +
                        '<div class="pf-stat-num" id="pfHistCount">' + histCount + '</div>' +
                        '<div class="pf-stat-label">Vistos</div>' +
                    '</div>' +
                    '<div class="pf-stat">' +
                        '<div class="pf-stat-num">0</div>' +
                        '<div class="pf-stat-label">Solicitudes</div>' +
                    '</div>' +
                '</div>' +
            '</div>';

        return html;
    }

    // ── Security Section ────────────────────────────────────
    function renderSecuritySection(user) {
        var prov = getProviders(user);
        var lastAccess = _userData && _userData.ultimoAcceso
            ? new Date(_userData.ultimoAcceso).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })
            : '';

        var providerCards = '';
        if (prov.password) {
            providerCards += '<div class="pf-provider-item">' +
                '<div class="pf-provider-icon pf-provider-icon--email"><i data-lucide="mail"></i></div>' +
                '<div class="pf-provider-info"><span class="pf-provider-name">Correo y contrasena</span><span class="pf-provider-detail">' + escapeHtml(user.email) + '</span></div>' +
                '<span class="pf-badge pf-badge-email">Activo</span>' +
            '</div>';
        }
        if (prov.google) {
            var gEmail = '';
            user.providerData.forEach(function (p) { if (p.providerId === 'google.com') gEmail = p.email || ''; });
            providerCards += '<div class="pf-provider-item">' +
                '<div class="pf-provider-icon pf-provider-icon--google">' +
                    '<svg width="16" height="16" viewBox="0 0 488 512"><path fill="#4285f4" d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z"/></svg>' +
                '</div>' +
                '<div class="pf-provider-info"><span class="pf-provider-name">Google</span><span class="pf-provider-detail">' + escapeHtml(gEmail) + '</span></div>' +
                '<span class="pf-badge pf-badge-google">Activo</span>' +
            '</div>';
        }

        var html =
            '<div class="pf-card">' +
                '<div class="pf-card-title">Proveedores de acceso</div>' +
                '<div class="pf-providers">' + providerCards + '</div>' +
            '</div>' +

            '<div class="pf-card">' +
                '<div class="pf-card-title">Informacion de cuenta</div>' +
                '<div class="pf-row"><span class="pf-label"><i data-lucide="mail"></i> Correo</span><span class="pf-value">' + escapeHtml(user.email) + '</span></div>' +
                (lastAccess ? '<div class="pf-row"><span class="pf-label"><i data-lucide="clock"></i> Ultimo acceso</span><span class="pf-value">' + lastAccess + '</span></div>' : '') +
                '<div class="pf-row"><span class="pf-label"><i data-lucide="fingerprint"></i> UID</span><span class="pf-value pf-value-mono">' + escapeHtml(user.uid.substring(0, 12)) + '...</span></div>' +
            '</div>' +

            (prov.password
                ? '<div class="pf-card">' +
                    '<div class="pf-card-title">Cambiar contrasena</div>' +
                    '<div class="pf-field"><label>Contrasena actual</label>' +
                        '<div class="pf-pass-wrap">' +
                            '<input class="pf-input" type="password" id="pfOldPass" autocomplete="current-password">' +
                            '<button class="pf-pass-toggle" type="button" data-target="pfOldPass" title="Mostrar"><i data-lucide="eye"></i></button>' +
                        '</div>' +
                    '</div>' +
                    '<div class="pf-field"><label>Nueva contrasena</label>' +
                        '<div class="pf-pass-wrap">' +
                            '<input class="pf-input" type="password" id="pfNewPass" placeholder="Minimo 6 caracteres" autocomplete="new-password">' +
                            '<button class="pf-pass-toggle" type="button" data-target="pfNewPass" title="Mostrar"><i data-lucide="eye"></i></button>' +
                        '</div>' +
                        '<div class="pf-strength" id="pfStrength"><div class="pf-strength-bar" id="pfStrengthBar"></div></div>' +
                        '<span class="pf-field-hint" id="pfStrengthLabel"></span>' +
                    '</div>' +
                    '<div class="pf-btn-group"><button class="pf-btn pf-btn-outline" id="pfChangePassBtn"><i data-lucide="key"></i> Cambiar contrasena</button></div>' +
                    '<div class="pf-pass-msg" id="pfPassMsg"></div>' +
                  '</div>'
                : '<div class="pf-card">' +
                    '<div class="pf-card-title">Contrasena</div>' +
                    '<p style="color:var(--pf-text-secondary);font-size:.88rem;">Tu cuenta usa Google Sign-In. La contrasena se gestiona desde tu cuenta de Google.</p>' +
                  '</div>') +

            '<div class="pf-card">' +
                '<div class="pf-card-title">Sesion</div>' +
                '<div class="pf-btn-group"><button class="pf-btn pf-btn-danger" id="pfLogoutBtn"><i data-lucide="log-out"></i> Cerrar sesion</button></div>' +
            '</div>';

        return html;
    }

    // ── Password strength ────────────────────────────────────
    function calcPasswordStrength(pass) {
        if (!pass) return 0;
        var score = 0;
        if (pass.length >= 6) score++;
        if (pass.length >= 8) score++;
        if (/[a-z]/.test(pass) && /[A-Z]/.test(pass)) score++;
        if (/\d/.test(pass)) score++;
        if (/[^a-zA-Z0-9]/.test(pass)) score++;
        return Math.min(score, 4);
    }

    // ── Placeholder sections ────────────────────────────────
    function renderEmptySection(icon, title, message, ctaText, ctaHref) {
        var cta = ctaText
            ? '<a href="' + (ctaHref || '#') + '" class="pf-btn pf-btn-gold"><i data-lucide="arrow-right"></i> ' + escapeHtml(ctaText) + '</a>'
            : '';
        return '<div class="pf-card"><div class="pf-empty">' +
            '<div class="pf-empty-icon"><i data-lucide="' + icon + '"></i></div>' +
            '<h3>' + escapeHtml(title) + '</h3>' +
            '<p>' + escapeHtml(message) + '</p>' +
            cta +
            '</div></div>';
    }

    // ── Build all sections ──────────────────────────────────
    function renderAllSections(user, data) {
        var content = $id('pfContentArea');
        if (!content) return;

        var sections = {
            perfil: renderProfileSection(user, data),
            favoritos: renderEmptySection('heart', 'Tus favoritos', 'Guarda vehiculos que te interesen para verlos despues.', 'Explorar catalogo', 'busqueda.html'),
            historial: renderEmptySection('clock-3', 'Tu historial', 'Los vehiculos que visites apareceran aqui.', 'Ver catalogo', 'busqueda.html'),
            solicitudes: renderEmptySection('file-text', 'Tus solicitudes', 'Aqui veras el estado de tus solicitudes de financiacion, consignacion o contacto.', 'Solicitar financiacion', '#'),
            citas: renderEmptySection('calendar', 'Tus citas', 'Agenda una cita para ver un vehiculo en persona.', 'Agendar cita', 'contacto.html'),
            seguridad: renderSecuritySection(user)
        };

        var html = '';
        SECTIONS.forEach(function (s) {
            html += '<div class="pf-section' + (s.id === _currentSection ? ' active' : '') + '" id="section-' + s.id + '">' +
                '<h2 class="pf-section-title"><i data-lucide="' + s.icon + '"></i> ' + s.label + '</h2>' +
                (sections[s.id] || '') +
                '</div>';
        });
        content.innerHTML = html;

        // Render icons
        if (window.lucide) window.lucide.createIcons();

        // Wire events
        wireProfileEvents(user, data);
        wireSecurityEvents(user);

        // Show sidebar
        var sidebar = $id('pfSidebar');
        var tabs = $id('pfMobileTabs');
        if (sidebar) sidebar.style.display = '';
        if (tabs) tabs.style.display = '';
    }

    // ── Wire profile events ─────────────────────────────────
    function wireProfileEvents(user, data) {
        var editBtn = $id('pfEditBtn');
        var editForm = $id('pfEditForm');
        var infoView = $id('pfInfoView');

        if (editBtn) editBtn.addEventListener('click', function () {
            infoView.style.display = 'none';
            editForm.classList.add('active');
            var nameInput = $id('pfEditName');
            if (nameInput) nameInput.focus();
        });

        var cancelBtn = $id('pfCancelBtn');
        if (cancelBtn) cancelBtn.addEventListener('click', function () {
            editForm.classList.remove('active');
            infoView.style.display = '';
            // Reset values
            $id('pfEditName').value = escapeHtml(data.nombre || user.displayName || '');
            $id('pfEditPhone').value = data.telefono || '';
            var cityEl = $id('pfEditCity');
            if (cityEl) cityEl.value = data.ciudad || '';
            clearHints();
        });

        // Inline validation
        var nameInput = $id('pfEditName');
        var phoneInput = $id('pfEditPhone');
        if (nameInput) nameInput.addEventListener('input', function () {
            var v = this.value.trim();
            var hint = $id('pfNameHint');
            if (!v) { hint.textContent = 'El nombre es obligatorio'; hint.className = 'pf-field-hint pf-hint-error'; }
            else if (v.length < 2) { hint.textContent = 'Muy corto'; hint.className = 'pf-field-hint pf-hint-error'; }
            else { hint.textContent = ''; hint.className = 'pf-field-hint'; }
        });
        if (phoneInput) phoneInput.addEventListener('input', function () {
            var v = this.value.replace(/\s/g, '');
            var hint = $id('pfPhoneHint');
            if (v && !isValidPhone(v)) { hint.textContent = 'Ingresa 7-10 digitos'; hint.className = 'pf-field-hint pf-hint-error'; }
            else { hint.textContent = ''; hint.className = 'pf-field-hint'; }
        });

        var saveBtn = $id('pfSaveBtn');
        if (saveBtn) saveBtn.addEventListener('click', function () {
            var newName = ($id('pfEditName').value || '').trim();
            var newPhone = ($id('pfEditPhone').value || '').replace(/\s/g, '').trim();
            var newCity = ($id('pfEditCity').value || '').trim();

            // Validate
            if (!newName || newName.length < 2) {
                var h = $id('pfNameHint');
                h.textContent = 'El nombre es obligatorio';
                h.className = 'pf-field-hint pf-hint-error';
                $id('pfEditName').focus();
                return;
            }
            if (newPhone && !isValidPhone(newPhone)) {
                var ph = $id('pfPhoneHint');
                ph.textContent = 'Ingresa 7-10 digitos';
                ph.className = 'pf-field-hint pf-hint-error';
                $id('pfEditPhone').focus();
                return;
            }

            saveBtn.disabled = true;
            showAutoSave('saving');

            var updates = { nombre: newName, telefono: newPhone, ciudad: newCity };

            window.db.collection('clientes').doc(user.uid).update(updates).then(function () {
                user.updateProfile({ displayName: newName }).catch(function () {});
                _userData.nombre = newName;
                _userData.telefono = newPhone;
                _userData.ciudad = newCity;
                showAutoSave('saved');
                _toast('Datos actualizados.', 'success');
                renderAllSections(user, _userData);
                updateSidebarUser(user, _userData);
                buildNavigation();
                switchSection('perfil');
            }).catch(function (err) {
                showAutoSave('error');
                _toast('Error al guardar: ' + (err.message || ''), 'error');
                saveBtn.disabled = false;
            });
        });
    }

    function clearHints() {
        ['pfNameHint', 'pfPhoneHint'].forEach(function (id) {
            var el = $id(id);
            if (el) { el.textContent = ''; el.className = 'pf-field-hint'; }
        });
    }

    function showAutoSave(state) {
        var el = $id('pfAutoSave');
        if (!el) return;
        if (state === 'saving') {
            el.innerHTML = '<i data-lucide="loader-2"></i> Guardando...';
            el.className = 'pf-autosave-indicator pf-autosave-saving';
        } else if (state === 'saved') {
            el.innerHTML = '<i data-lucide="check"></i> Guardado';
            el.className = 'pf-autosave-indicator pf-autosave-saved';
            if (window.lucide) window.lucide.createIcons({ attrs: { class: '' } });
            setTimeout(function () { if (el) el.className = 'pf-autosave-indicator'; }, 2500);
        } else if (state === 'error') {
            el.innerHTML = '<i data-lucide="alert-circle"></i> Error';
            el.className = 'pf-autosave-indicator pf-autosave-error';
        }
        if (window.lucide) window.lucide.createIcons();
    }

    // ── Wire security events ────────────────────────────────
    function wireSecurityEvents(user) {
        // Password visibility toggles
        document.querySelectorAll('.pf-pass-toggle').forEach(function (btn) {
            btn.addEventListener('click', function () {
                var input = $id(this.dataset.target);
                if (!input) return;
                var isPass = input.type === 'password';
                input.type = isPass ? 'text' : 'password';
                var icon = this.querySelector('[data-lucide]');
                if (icon) {
                    icon.setAttribute('data-lucide', isPass ? 'eye-off' : 'eye');
                    if (window.lucide) window.lucide.createIcons();
                }
            });
        });

        // Password strength meter
        var newPassInput = $id('pfNewPass');
        if (newPassInput) newPassInput.addEventListener('input', function () {
            var val = this.value;
            var score = calcPasswordStrength(val);
            var bar = $id('pfStrengthBar');
            var label = $id('pfStrengthLabel');
            if (!bar || !label) return;
            var levels = ['', 'Debil', 'Regular', 'Buena', 'Fuerte'];
            var colors = ['', 'var(--pf-danger)', '#e68a00', 'var(--pf-success)', '#00c853'];
            bar.style.width = (score * 25) + '%';
            bar.style.background = colors[score] || '';
            label.textContent = val ? levels[score] || '' : '';
            label.style.color = colors[score] || '';
        });

        var passBtn = $id('pfChangePassBtn');
        if (passBtn) passBtn.addEventListener('click', function () {
            var oldPass = ($id('pfOldPass').value || '');
            var newPass = ($id('pfNewPass').value || '');
            var msgEl = $id('pfPassMsg');
            if (!oldPass || !newPass) {
                msgEl.textContent = 'Completa ambos campos.';
                msgEl.className = 'pf-pass-msg error';
                return;
            }
            if (newPass.length < 6) {
                msgEl.textContent = 'La nueva contrasena debe tener al menos 6 caracteres.';
                msgEl.className = 'pf-pass-msg error';
                return;
            }
            passBtn.disabled = true;
            var cred = firebase.auth.EmailAuthProvider.credential(user.email, oldPass);
            user.reauthenticateWithCredential(cred).then(function () {
                return user.updatePassword(newPass);
            }).then(function () {
                msgEl.textContent = 'Contrasena actualizada correctamente.';
                msgEl.className = 'pf-pass-msg success';
                $id('pfOldPass').value = '';
                $id('pfNewPass').value = '';
                var bar = $id('pfStrengthBar');
                var label = $id('pfStrengthLabel');
                if (bar) bar.style.width = '0';
                if (label) label.textContent = '';
            }).catch(function (err) {
                var msg = 'Error al cambiar contrasena.';
                if (err.code === 'auth/wrong-password') msg = 'La contrasena actual es incorrecta.';
                if (err.code === 'auth/weak-password') msg = 'La nueva contrasena es muy debil.';
                msgEl.textContent = msg;
                msgEl.className = 'pf-pass-msg error';
            }).finally(function () {
                passBtn.disabled = false;
            });
        });

        var logoutBtn = $id('pfLogoutBtn');
        if (logoutBtn) logoutBtn.addEventListener('click', function () {
            if (window.AltorraAuth) window.AltorraAuth.logout();
            else window.auth.signOut();
        });
    }

    // ── Load profile data ───────────────────────────────────
    function loadProfile(user) {
        _user = user;
        showSkeleton();
        buildNavigation();
        updateSidebarUser(user, null);

        window.firebaseReady.then(function () {
            return window.db.collection('clientes').doc(user.uid).get();
        }).then(function (doc) {
            _userData = doc.exists ? doc.data() : {};
            updateSidebarUser(user, _userData);
            renderAllSections(user, _userData);
        }).catch(function (err) {
            console.warn('[Profile] Error loading:', err);
            _userData = {};
            renderAllSections(user, _userData);
        });
    }

    // ── Init ────────────────────────────────────────────────
    function init() {
        window.firebaseReady.then(function () {
            window.auth.onAuthStateChanged(function (user) {
                if (user && !user.isAnonymous) {
                    loadProfile(user);
                } else {
                    showNotAuth();
                }
            });
        });

        window.addEventListener('favoritesChanged', function () {
            var el = $id('pfFavCount');
            if (el && window.favoritesManager) el.textContent = window.favoritesManager.count();
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
