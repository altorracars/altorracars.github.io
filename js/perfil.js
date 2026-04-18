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

    // ── Avatar upload ───────────────────────────────────────
    var AVATAR_MAX_SIZE = 200;
    var AVATAR_QUALITY = 0.82;

    function handleAvatarClick() {
        var input = document.createElement('input');
        input.type = 'file';
        input.accept = 'image/jpeg,image/png,image/webp';
        input.addEventListener('change', function () {
            if (!input.files || !input.files[0]) return;
            var file = input.files[0];
            if (file.size > 5 * 1024 * 1024) {
                _toast('La imagen es muy grande (max 5MB).', 'error');
                return;
            }
            showAvatarPreview(file);
        });
        input.click();
    }

    function showAvatarPreview(file) {
        var reader = new FileReader();
        reader.onload = function (e) {
            var overlay = document.createElement('div');
            overlay.className = 'pf-avatar-overlay';
            overlay.innerHTML =
                '<div class="pf-avatar-modal">' +
                    '<div class="pf-avatar-modal-title">Vista previa</div>' +
                    '<div class="pf-avatar-preview-wrap">' +
                        '<canvas id="pfAvatarCanvas" width="200" height="200"></canvas>' +
                    '</div>' +
                    '<div class="pf-btn-group" style="justify-content:center;margin-top:1rem;">' +
                        '<button class="pf-btn pf-btn-gold" id="pfAvatarConfirm"><i data-lucide="check"></i> Guardar foto</button>' +
                        '<button class="pf-btn pf-btn-outline" id="pfAvatarCancel">Cancelar</button>' +
                    '</div>' +
                '</div>';
            document.body.appendChild(overlay);
            if (window.lucide) window.lucide.createIcons();

            var canvas = document.getElementById('pfAvatarCanvas');
            var ctx = canvas.getContext('2d');
            var img = new Image();
            img.onload = function () {
                drawCroppedCircle(ctx, img, AVATAR_MAX_SIZE);
            };
            img.src = e.target.result;

            document.getElementById('pfAvatarCancel').addEventListener('click', function () {
                overlay.remove();
            });
            overlay.addEventListener('click', function (ev) {
                if (ev.target === overlay) overlay.remove();
            });
            document.getElementById('pfAvatarConfirm').addEventListener('click', function () {
                var btn = this;
                btn.disabled = true;
                btn.innerHTML = '<i data-lucide="loader-2"></i> Subiendo...';
                if (window.lucide) window.lucide.createIcons();
                canvas.toBlob(function (blob) {
                    uploadAvatar(blob).then(function () {
                        overlay.remove();
                    }).catch(function (err) {
                        _toast('Error al subir la foto: ' + (err.message || ''), 'error');
                        btn.disabled = false;
                        btn.innerHTML = '<i data-lucide="check"></i> Guardar foto';
                        if (window.lucide) window.lucide.createIcons();
                    });
                }, 'image/webp', AVATAR_QUALITY);
            });
        };
        reader.readAsDataURL(file);
    }

    function drawCroppedCircle(ctx, img, size) {
        var s = Math.min(img.width, img.height);
        var sx = (img.width - s) / 2;
        var sy = (img.height - s) / 2;
        ctx.clearRect(0, 0, size, size);
        ctx.save();
        ctx.beginPath();
        ctx.arc(size / 2, size / 2, size / 2, 0, Math.PI * 2);
        ctx.closePath();
        ctx.clip();
        ctx.drawImage(img, sx, sy, s, s, 0, 0, size, size);
        ctx.restore();
    }

    function uploadAvatar(blob) {
        if (!window.storage || !_user) return Promise.reject(new Error('Storage not ready'));
        var ref = window.storage.ref('avatars/' + _user.uid + '.webp');
        return ref.put(blob, { contentType: 'image/webp' }).then(function () {
            return ref.getDownloadURL();
        }).then(function (url) {
            return window.db.collection('clientes').doc(_user.uid).update({ avatarURL: url }).then(function () {
                _userData.avatarURL = url;
                _user.updateProfile({ photoURL: url }).catch(function () {});
                _toast('Foto de perfil actualizada.', 'success');
                renderAllSections(_user, _userData);
                updateSidebarUser(_user, _userData);
                syncHeaderAvatar(url);
            });
        });
    }

    function syncHeaderAvatar(url) {
        var headerAvatars = document.querySelectorAll('.hdr-user-avatar, .mob-user-avatar');
        headerAvatars.forEach(function (el) {
            el.innerHTML = '<img src="' + escapeHtml(url) + '" alt="Avatar" style="width:100%;height:100%;border-radius:50%;object-fit:cover;" onerror="this.remove()">';
        });
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
            if (s.id === 'solicitudes' && _solicitudes && _solicitudes.length > 0) {
                badgeHtml = '<span class="pf-nav-badge">' + _solicitudes.length + '</span>';
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
                '<div class="pf-avatar pf-avatar--editable" id="pfAvatar" title="Cambiar foto">' +
                    avatarHtml +
                    '<div class="pf-avatar-cam"><i data-lucide="camera"></i></div>' +
                '</div>' +
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
                    '<div class="pf-stat pf-stat--clickable" data-go-section="solicitudes">' +
                        '<div class="pf-stat-num" id="pfSolCount">' + (_solicitudes ? _solicitudes.length : 0) + '</div>' +
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

    // ── Favorites Section (B4) ─────────────────────────────
    var FAV_PER_PAGE = 6;
    var _favPage = 0;

    function getVehicleSlug(v) {
        return [v.marca, v.modelo, v.year, v.id]
            .filter(Boolean).join('-').toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    }

    function formatCOP(price) {
        if (!price) return '';
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(price);
    }

    function estadoBadge(estado) {
        var map = {
            disponible: { cls: 'pf-estado--available', label: 'Disponible' },
            reservado:  { cls: 'pf-estado--reserved',  label: 'Reservado' },
            vendido:    { cls: 'pf-estado--sold',      label: 'Vendido' }
        };
        var e = map[estado] || map.disponible;
        return '<span class="pf-estado ' + e.cls + '">' + e.label + '</span>';
    }

    function renderFavCard(v) {
        var url = 'vehiculos/' + getVehicleSlug(v) + '.html';
        var img = (v.imagenes && v.imagenes[0]) || v.imagen || '';
        var price = v.precioOferta || v.precio;
        var oldPrice = v.precioOferta && v.precio ? v.precio : 0;

        return '<div class="pf-fav-card" data-id="' + v.id + '">' +
            '<a href="' + url + '" class="pf-fav-img-wrap">' +
                (img ? '<img src="' + escapeHtml(img) + '" alt="' + escapeHtml(v.marca + ' ' + v.modelo) + '" loading="lazy">' : '<div class="pf-fav-noimg"><i data-lucide="car"></i></div>') +
                (v.precioOferta ? '<span class="pf-fav-offer">Oferta</span>' : '') +
            '</a>' +
            '<div class="pf-fav-info">' +
                '<a href="' + url + '" class="pf-fav-title">' + escapeHtml(v.marca) + ' ' + escapeHtml(v.modelo) + ' <span>' + (v.year || '') + '</span></a>' +
                '<div class="pf-fav-details">' +
                    (v.kilometraje ? '<span><i data-lucide="gauge"></i> ' + Number(v.kilometraje).toLocaleString('es-CO') + ' km</span>' : '') +
                    (v.transmision ? '<span><i data-lucide="settings-2"></i> ' + escapeHtml(v.transmision) + '</span>' : '') +
                '</div>' +
                '<div class="pf-fav-bottom">' +
                    '<div class="pf-fav-price">' +
                        (oldPrice ? '<span class="pf-fav-old-price">' + formatCOP(oldPrice) + '</span> ' : '') +
                        '<span>' + formatCOP(price) + '</span>' +
                    '</div>' +
                    estadoBadge(v.estado) +
                '</div>' +
            '</div>' +
            '<button class="pf-fav-remove" data-action="removeFav" data-id="' + v.id + '" title="Quitar de favoritos"><i data-lucide="heart-off"></i></button>' +
        '</div>';
    }

    function ensureVehicleDB() {
        var db = window.vehicleDB;
        if (db && db.loaded) return Promise.resolve(db);
        return new Promise(function (resolve) {
            var attempts = 0;
            var check = function () {
                attempts++;
                db = window.vehicleDB;
                if (db && db.loaded) return resolve(db);
                if (attempts >= 20) return resolve(db || null);
                setTimeout(check, 500);
            };
            if (db && typeof db.init === 'function') {
                db.init().then(function () { resolve(db); }).catch(function () { resolve(db); });
            } else {
                check();
            }
        });
    }

    function renderFavoritesSection() {
        if (!window.favoritesManager) return renderEmptySection('heart', 'Tus favoritos', 'Guarda vehiculos que te interesen para verlos despues.', 'Explorar catalogo', 'busqueda.html');

        var ids = window.favoritesManager.getAll();
        if (!ids || ids.length === 0) {
            return renderEmptySection('heart', 'Tus favoritos', 'Guarda vehiculos que te interesen para verlos despues.', 'Explorar catalogo', 'busqueda.html');
        }

        var db = window.vehicleDB;
        var vehicles = [];
        if (db && db.vehicles && db.vehicles.length > 0) {
            ids.forEach(function (id) {
                var v = db.getVehicleById(id);
                if (v) vehicles.push(v);
            });
        }

        if (vehicles.length === 0) {
            scheduleVehicleDBRetry();
            return '<div class="pf-card"><div class="pf-empty">' +
                '<div class="pf-empty-icon"><div class="pf-skeleton pf-skeleton-circle" style="width:48px;height:48px;margin:0 auto;"></div></div>' +
                '<h3>Cargando ' + ids.length + ' favorito' + (ids.length > 1 ? 's' : '') + '...</h3>' +
                '<p>Obteniendo datos de vehiculos.</p>' +
                '</div></div>';
        }

        _favPage = 0;
        var total = vehicles.length;
        var show = Math.min(FAV_PER_PAGE, total);

        var html = '<div class="pf-fav-count">' + total + ' vehiculo' + (total > 1 ? 's' : '') + ' guardado' + (total > 1 ? 's' : '') + '</div>';
        html += '<div class="pf-fav-grid" id="pfFavGrid">';
        for (var i = 0; i < show; i++) {
            html += renderFavCard(vehicles[i]);
        }
        html += '</div>';

        if (total > FAV_PER_PAGE) {
            html += '<div class="pf-btn-group" style="justify-content:center;margin-top:1rem;" id="pfFavLoadMore">' +
                '<button class="pf-btn pf-btn-outline" id="pfFavMoreBtn"><i data-lucide="chevron-down"></i> Ver mas (' + (total - FAV_PER_PAGE) + ' restantes)</button>' +
                '</div>';
        }

        return html;
    }

    function wireFavoritesEvents() {
        var content = document.getElementById('section-favoritos');
        if (!content) return;

        content.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-action="removeFav"]');
            if (!btn) return;
            var id = btn.dataset.id;
            if (!id || !window.favoritesManager) return;

            var card = btn.closest('.pf-fav-card');
            if (card) {
                card.style.transition = 'opacity .3s, transform .3s';
                card.style.opacity = '0';
                card.style.transform = 'scale(.95)';
            }

            setTimeout(function () {
                window.favoritesManager.remove(id);
                renderAllSections(_user, _userData);
                buildNavigation();
                switchSection('favoritos');
            }, 300);
        });

        var moreBtn = document.getElementById('pfFavMoreBtn');
        if (moreBtn) moreBtn.addEventListener('click', function () {
            _favPage++;
            var ids = window.favoritesManager.getAll();
            var db = window.vehicleDB;
            if (!db) return;
            var vehicles = [];
            ids.forEach(function (id) {
                var v = db.getVehicleById(id);
                if (v) vehicles.push(v);
            });

            var start = FAV_PER_PAGE + (_favPage - 1) * FAV_PER_PAGE;
            var end = Math.min(start + FAV_PER_PAGE, vehicles.length);
            var grid = document.getElementById('pfFavGrid');
            if (!grid) return;

            for (var i = start; i < end; i++) {
                grid.insertAdjacentHTML('beforeend', renderFavCard(vehicles[i]));
            }
            if (window.lucide) window.lucide.createIcons();

            if (end >= vehicles.length) {
                var wrap = document.getElementById('pfFavLoadMore');
                if (wrap) wrap.remove();
            } else {
                moreBtn.innerHTML = '<i data-lucide="chevron-down"></i> Ver mas (' + (vehicles.length - end) + ' restantes)';
                if (window.lucide) window.lucide.createIcons();
            }
        });
    }

    // ── History Section (B5) ───────────────────────────────
    function timeAgo(ts) {
        var diff = Date.now() - ts;
        var mins = Math.floor(diff / 60000);
        if (mins < 1) return 'Justo ahora';
        if (mins < 60) return 'Hace ' + mins + ' min';
        var hrs = Math.floor(mins / 60);
        if (hrs < 24) return 'Hace ' + hrs + ' hora' + (hrs > 1 ? 's' : '');
        var days = Math.floor(hrs / 24);
        if (days < 7) return 'Hace ' + days + ' dia' + (days > 1 ? 's' : '');
        var d = new Date(ts);
        return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    function groupByDate(items) {
        var now = new Date();
        var today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
        var weekAgo = today - 6 * 86400000;
        var monthAgo = today - 29 * 86400000;
        var groups = { 'Hoy': [], 'Esta semana': [], 'Este mes': [], 'Anteriores': [] };
        items.forEach(function (item) {
            var t = item.timestamp || 0;
            if (t >= today) groups['Hoy'].push(item);
            else if (t >= weekAgo) groups['Esta semana'].push(item);
            else if (t >= monthAgo) groups['Este mes'].push(item);
            else groups['Anteriores'].push(item);
        });
        return groups;
    }

    function renderHistCard(v, ts) {
        var url = 'vehiculos/' + getVehicleSlug(v) + '.html';
        var img = (v.imagenes && v.imagenes[0]) || v.imagen || '';
        var price = v.precioOferta || v.precio;

        return '<div class="pf-hist-card" data-id="' + v.id + '">' +
            '<a href="' + url + '" class="pf-fav-img-wrap" style="width:100px;">' +
                (img ? '<img src="' + escapeHtml(img) + '" alt="' + escapeHtml(v.marca + ' ' + v.modelo) + '" loading="lazy">' : '<div class="pf-fav-noimg"><i data-lucide="car"></i></div>') +
            '</a>' +
            '<div class="pf-fav-info">' +
                '<a href="' + url + '" class="pf-fav-title">' + escapeHtml(v.marca) + ' ' + escapeHtml(v.modelo) + ' <span>' + (v.year || '') + '</span></a>' +
                '<div class="pf-hist-time"><i data-lucide="clock-3"></i> ' + timeAgo(ts) + '</div>' +
                '<div class="pf-fav-price">' + formatCOP(price) + '</div>' +
            '</div>' +
            '<button class="pf-fav-remove" data-action="removeHist" data-id="' + v.id + '" title="Quitar del historial"><i data-lucide="x"></i></button>' +
        '</div>';
    }

    function renderHistorialSection() {
        if (!window.vehicleHistory || !window.vehicleHistory.hasHistory()) {
            return renderEmptySection('clock-3', 'Tu historial', 'Los vehiculos que visites apareceran aqui.', 'Ver catalogo', 'busqueda.html');
        }

        var history = window.vehicleHistory.getHistory();
        var db = window.vehicleDB;

        if (!db || !db.vehicles || db.vehicles.length === 0) {
            scheduleVehicleDBRetry();
            return '<div class="pf-card"><div class="pf-empty">' +
                '<div class="pf-empty-icon"><div class="pf-skeleton pf-skeleton-circle" style="width:48px;height:48px;margin:0 auto;"></div></div>' +
                '<h3>Cargando historial...</h3>' +
                '</div></div>';
        }

        var items = [];
        history.forEach(function (h) {
            var v = db.getVehicleById(h.id);
            if (v) items.push({ vehicle: v, timestamp: h.timestamp });
        });

        if (items.length === 0) {
            return renderEmptySection('clock-3', 'Tu historial', 'Los vehiculos que visitaste ya no estan disponibles.', 'Ver catalogo', 'busqueda.html');
        }

        var groups = groupByDate(items);
        var html = '<div class="pf-hist-header">' +
            '<span class="pf-fav-count">' + items.length + ' vehiculo' + (items.length > 1 ? 's' : '') + ' visitado' + (items.length > 1 ? 's' : '') + '</span>' +
            '<button class="pf-btn pf-btn-outline pf-btn-sm" id="pfHistClearAll"><i data-lucide="trash-2"></i> Limpiar todo</button>' +
        '</div>';

        var groupKeys = ['Hoy', 'Esta semana', 'Este mes', 'Anteriores'];
        groupKeys.forEach(function (label) {
            var group = groups[label];
            if (!group || group.length === 0) return;
            html += '<div class="pf-hist-group">';
            html += '<div class="pf-hist-group-label">' + label + '</div>';
            group.forEach(function (item) {
                html += renderHistCard(item.vehicle, item.timestamp);
            });
            html += '</div>';
        });

        return html;
    }

    function wireHistorialEvents() {
        var content = document.getElementById('section-historial');
        if (!content) return;

        content.addEventListener('click', function (e) {
            var btn = e.target.closest('[data-action="removeHist"]');
            if (!btn) return;
            var id = btn.dataset.id;
            if (!id || !window.vehicleHistory) return;

            var card = btn.closest('.pf-hist-card');
            if (card) {
                card.style.transition = 'opacity .3s, transform .3s';
                card.style.opacity = '0';
                card.style.transform = 'scale(.95)';
            }
            setTimeout(function () {
                window.vehicleHistory.removeFromHistory(id);
                renderAllSections(_user, _userData);
                buildNavigation();
                switchSection('historial');
            }, 300);
        });

        var clearBtn = document.getElementById('pfHistClearAll');
        if (clearBtn) clearBtn.addEventListener('click', function () {
            if (!window.vehicleHistory) return;
            window.vehicleHistory.clearHistory();
            _toast('Historial limpiado.', 'info');
            renderAllSections(_user, _userData);
            buildNavigation();
            switchSection('historial');
        });
    }

    var _vehicleDBRetryScheduled = false;
    function scheduleVehicleDBRetry() {
        if (_vehicleDBRetryScheduled) return;
        _vehicleDBRetryScheduled = true;
        ensureVehicleDB().then(function () {
            _vehicleDBRetryScheduled = false;
            if (_user && _userData) {
                var sec = _currentSection;
                renderAllSections(_user, _userData);
                switchSection(sec);
            }
        });
    }

    // ── Solicitudes Section (B6) ──────────────────────────────
    var _solicitudes = null; // cached after first load
    var _solExpanded = {};   // track expanded accordion items

    var SOL_TIPOS = {
        consignacion_venta: { icon: 'car',           label: 'Consignacion / Venta' },
        financiacion:       { icon: 'landmark',      label: 'Financiacion' },
        contacto_general:   { icon: 'message-circle', label: 'Contacto General' }
    };

    var SOL_ESTADOS = {
        pendiente:  { label: 'Pendiente',  cls: 'pf-sol-st--pending',   step: 1 },
        contactado: { label: 'Contactado', cls: 'pf-sol-st--contacted', step: 2 },
        completado: { label: 'Completado', cls: 'pf-sol-st--completed', step: 3 },
        rechazado:  { label: 'Rechazado',  cls: 'pf-sol-st--rejected',  step: 0 }
    };

    var SOL_STEPS = ['Recibida', 'Contactado', 'Completado'];

    function formatDateShort(val) {
        if (!val) return '';
        var d;
        if (val.toDate) d = val.toDate();
        else if (val.seconds) d = new Date(val.seconds * 1000);
        else d = new Date(val);
        if (isNaN(d.getTime())) return '';
        return d.toLocaleDateString('es-CO', { day: 'numeric', month: 'short', year: 'numeric' });
    }

    function solTipo(tipo) {
        return SOL_TIPOS[tipo] || SOL_TIPOS.contacto_general;
    }

    function solEstado(estado) {
        return SOL_ESTADOS[estado] || SOL_ESTADOS.pendiente;
    }

    function renderSolStepper(estado) {
        var info = solEstado(estado);
        if (info.step === 0) {
            return '<div class="pf-sol-stepper pf-sol-stepper--rejected">' +
                '<div class="pf-sol-step pf-sol-step--rejected"><i data-lucide="x"></i><span>Rechazado</span></div>' +
                '</div>';
        }
        var html = '<div class="pf-sol-stepper">';
        for (var i = 0; i < SOL_STEPS.length; i++) {
            var done = i < info.step;
            var current = i === info.step - 1;
            html += '<div class="pf-sol-step' + (done ? ' pf-sol-step--done' : '') + (current ? ' pf-sol-step--current' : '') + '">';
            html += '<div class="pf-sol-step-dot">' + (done ? '<i data-lucide="check"></i>' : (i + 1)) + '</div>';
            html += '<span>' + SOL_STEPS[i] + '</span>';
            html += '</div>';
            if (i < SOL_STEPS.length - 1) html += '<div class="pf-sol-step-line' + (i < info.step - 1 ? ' pf-sol-step-line--done' : '') + '"></div>';
        }
        html += '</div>';
        return html;
    }

    function renderSolDetail(sol) {
        var rows = '';
        if (sol.vehiculo) rows += '<div class="pf-row"><span class="pf-label"><i data-lucide="car"></i> Vehiculo</span><span class="pf-value">' + escapeHtml(sol.vehiculo) + '</span></div>';
        if (sol.telefono) rows += '<div class="pf-row"><span class="pf-label"><i data-lucide="phone"></i> Telefono</span><span class="pf-value">' + escapeHtml((sol.prefijoPais || '+57') + ' ' + sol.telefono) + '</span></div>';
        if (sol.comentarios) rows += '<div class="pf-row" style="flex-direction:column;align-items:flex-start;gap:.3rem;"><span class="pf-label"><i data-lucide="message-square"></i> Comentarios</span><span class="pf-value" style="max-width:100%;text-align:left;">' + escapeHtml(sol.comentarios) + '</span></div>';
        if (sol.observaciones) rows += '<div class="pf-row" style="flex-direction:column;align-items:flex-start;gap:.3rem;"><span class="pf-label"><i data-lucide="clipboard-list"></i> Respuesta</span><span class="pf-value" style="max-width:100%;text-align:left;">' + escapeHtml(sol.observaciones) + '</span></div>';

        if (sol.tipo === 'consignacion_venta' && sol.datosExtra) {
            var d = sol.datosExtra;
            if (d.marca) rows += '<div class="pf-row"><span class="pf-label">Marca</span><span class="pf-value">' + escapeHtml(d.marca) + '</span></div>';
            if (d.modelo) rows += '<div class="pf-row"><span class="pf-label">Modelo</span><span class="pf-value">' + escapeHtml(d.modelo) + '</span></div>';
            if (d.year) rows += '<div class="pf-row"><span class="pf-label">Año</span><span class="pf-value">' + escapeHtml(String(d.year)) + '</span></div>';
            if (d.kilometraje) rows += '<div class="pf-row"><span class="pf-label">Kilometraje</span><span class="pf-value">' + escapeHtml(String(d.kilometraje)) + ' km</span></div>';
            if (d.precioEsperado) rows += '<div class="pf-row"><span class="pf-label">Precio esperado</span><span class="pf-value">' + formatCOP(d.precioEsperado) + '</span></div>';
        }

        if (sol.tipo === 'financiacion' && sol.datosExtra) {
            var f = sol.datosExtra;
            if (f.cuotaInicial) rows += '<div class="pf-row"><span class="pf-label">Cuota inicial</span><span class="pf-value">' + formatCOP(f.cuotaInicial) + '</span></div>';
            if (f.plazo) rows += '<div class="pf-row"><span class="pf-label">Plazo</span><span class="pf-value">' + escapeHtml(String(f.plazo)) + ' meses</span></div>';
            if (f.ingresos) rows += '<div class="pf-row"><span class="pf-label">Ingresos</span><span class="pf-value">' + formatCOP(f.ingresos) + '</span></div>';
            if (f.situacionLaboral) rows += '<div class="pf-row"><span class="pf-label">Situacion laboral</span><span class="pf-value">' + escapeHtml(f.situacionLaboral) + '</span></div>';
        }

        return rows ? '<div class="pf-sol-detail">' + rows + '</div>' : '';
    }

    function renderSolCard(sol) {
        var tipo = solTipo(sol.tipo);
        var estado = solEstado(sol.estado);
        var isExpanded = _solExpanded[sol.id];
        var date = formatDateShort(sol.createdAt);

        return '<div class="pf-sol-card' + (isExpanded ? ' pf-sol-card--open' : '') + '" data-sol-id="' + escapeHtml(sol.id) + '">' +
            '<div class="pf-sol-card-header" data-action="toggleSol" data-id="' + escapeHtml(sol.id) + '">' +
                '<div class="pf-sol-icon"><i data-lucide="' + tipo.icon + '"></i></div>' +
                '<div class="pf-sol-summary">' +
                    '<div class="pf-sol-title">' + escapeHtml(tipo.label) + '</div>' +
                    '<div class="pf-sol-meta">' +
                        (date ? '<span><i data-lucide="calendar"></i> ' + date + '</span>' : '') +
                        (sol.vehiculo ? '<span><i data-lucide="car"></i> ' + escapeHtml(sol.vehiculo) + '</span>' : '') +
                    '</div>' +
                '</div>' +
                '<span class="pf-sol-status ' + estado.cls + '">' + estado.label + '</span>' +
                '<div class="pf-sol-chevron"><i data-lucide="chevron-down"></i></div>' +
            '</div>' +
            '<div class="pf-sol-body"' + (isExpanded ? '' : ' style="display:none;"') + '>' +
                renderSolStepper(sol.estado) +
                renderSolDetail(sol) +
            '</div>' +
        '</div>';
    }

    function renderSolicitudesSection(user, data) {
        if (_solicitudes === null) {
            _loadSolicitudes(user, data);
            return '<div class="pf-card"><div class="pf-empty">' +
                '<div class="pf-empty-icon"><div class="pf-skeleton pf-skeleton-circle" style="width:48px;height:48px;margin:0 auto;"></div></div>' +
                '<h3>Cargando solicitudes...</h3>' +
                '</div></div>';
        }

        if (_solicitudes.length === 0) {
            return renderEmptySection('file-text', 'No tienes solicitudes', 'Aqui aparecera el estado de tus solicitudes de financiacion, consignacion o contacto.', 'Solicitar financiacion', 'contacto.html');
        }

        var html = '<div class="pf-sol-count">' + _solicitudes.length + ' solicitud' + (_solicitudes.length > 1 ? 'es' : '') + '</div>';
        html += '<div class="pf-sol-list">';
        _solicitudes.forEach(function (sol) {
            html += renderSolCard(sol);
        });
        html += '</div>';
        return html;
    }

    function _loadSolicitudes(user, data) {
        var email = (data && data.email) || (user && user.email) || '';
        if (!email) { _solicitudes = []; return; }

        window.firebaseReady.then(function () {
            return window.db.collection('solicitudes')
                .where('email', '==', email)
                .get();
        }).then(function (snap) {
            _solicitudes = [];
            snap.forEach(function (doc) {
                var d = doc.data();
                d.id = doc.id;
                _solicitudes.push(d);
            });
            _solicitudes.sort(function (a, b) {
                var ta = a.createdAt ? (a.createdAt.seconds || 0) : 0;
                var tb = b.createdAt ? (b.createdAt.seconds || 0) : 0;
                return tb - ta;
            });
            if (_user && _userData) {
                var sec = _currentSection;
                renderAllSections(_user, _userData);
                switchSection(sec);
            }
        }).catch(function (err) {
            console.warn('[Profile] Error loading solicitudes:', err && err.message);
            _solicitudes = [];
            if (_user && _userData) {
                var sec = _currentSection;
                renderAllSections(_user, _userData);
                switchSection(sec);
            }
        });
    }

    function wireSolicitudesEvents() {
        var content = document.getElementById('section-solicitudes');
        if (!content) return;

        content.addEventListener('click', function (e) {
            var header = e.target.closest('[data-action="toggleSol"]');
            if (!header) return;
            var id = header.dataset.id;
            if (!id) return;

            _solExpanded[id] = !_solExpanded[id];

            var card = header.closest('.pf-sol-card');
            if (!card) return;

            var body = card.querySelector('.pf-sol-body');
            if (!body) return;

            if (_solExpanded[id]) {
                card.classList.add('pf-sol-card--open');
                body.style.display = '';
            } else {
                card.classList.remove('pf-sol-card--open');
                body.style.display = 'none';
            }
        });
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
            favoritos: renderFavoritesSection(),
            historial: renderHistorialSection(),
            solicitudes: renderSolicitudesSection(user, data),
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
        wireFavoritesEvents();
        wireHistorialEvents();
        wireSolicitudesEvents();

        // Show sidebar
        var sidebar = $id('pfSidebar');
        var tabs = $id('pfMobileTabs');
        if (sidebar) sidebar.style.display = '';
        if (tabs) tabs.style.display = '';
    }

    // ── Wire profile events ─────────────────────────────────
    function wireProfileEvents(user, data) {
        // Clickable stats → switch section
        document.querySelectorAll('[data-go-section]').forEach(function (el) {
            el.addEventListener('click', function () { switchSection(this.dataset.goSection); });
        });

        // Avatar upload
        var avatar = $id('pfAvatar');
        if (avatar) avatar.addEventListener('click', handleAvatarClick);

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

        // Init vehicleDB in background for favorites section
        if (window.vehicleDB && typeof window.vehicleDB.init === 'function' && !window.vehicleDB.loaded) {
            window.vehicleDB.init().catch(function () {});
        }

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
