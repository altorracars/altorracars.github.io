// ============================================================
//  PERFIL.JS — Panel de Usuario Premium — Altorra Cars
//  Fase B1: Layout sidebar, navegacion, skeleton, perfil + seguridad
// ============================================================
(function () {
    'use strict';

    var _user = null;
    var _userData = null;
    var _currentSection = 'perfil';

    function $id(id) { return document.getElementById(id); }

    function escapeHtml(str) {
        return (str || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
    }

    function _toast(msg, type) {
        if (typeof toast !== 'undefined' && toast && toast.show) {
            toast.show(msg, type || 'info');
        }
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

        nameEl.textContent = name || 'Usuario';
        emailEl.textContent = email;
        if (avatarEl) avatarEl.textContent = initials;
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

    // ── Profile Section ─────────────────────────────────────
    function renderProfileSection(user, data) {
        var name = data.nombre || user.displayName || (user.email || '').split('@')[0];
        var initials = name.split(' ').map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase();
        var email = data.email || user.email || '';
        var phone = data.telefono ? ((data.prefijo || '+57') + ' ' + data.telefono) : 'No registrado';
        var favCount = window.favoritesManager ? window.favoritesManager.count() : 0;
        var histCount = window.vehicleHistory ? window.vehicleHistory.getCount() : 0;
        var created = data.creadoEn
            ? new Date(data.creadoEn).toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' })
            : '';

        var isGoogle = user.providerData && user.providerData[0] && user.providerData[0].providerId === 'google.com';

        var html =
            '<div class="pf-card pf-hero">' +
                '<div class="pf-avatar" id="pfAvatar">' + initials + '</div>' +
                '<div>' +
                    '<h1 class="pf-hero-name">' + escapeHtml(name) + '</h1>' +
                    '<p class="pf-hero-email">' + escapeHtml(email) + '</p>' +
                    '<div class="pf-hero-meta">' +
                        (isGoogle
                            ? '<span class="pf-badge pf-badge-google"><svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/></svg> Google</span>'
                            : '<span class="pf-badge pf-badge-email"><i data-lucide="mail"></i> Email</span>') +
                        (created ? '<span class="pf-badge pf-badge-member"><i data-lucide="calendar"></i> ' + created + '</span>' : '') +
                    '</div>' +
                '</div>' +
            '</div>' +

            '<div class="pf-card">' +
                '<div class="pf-card-title">Datos personales</div>' +
                '<div id="pfInfoView">' +
                    '<div class="pf-row"><span class="pf-label">Nombre</span><span class="pf-value">' + escapeHtml(name) + '</span></div>' +
                    '<div class="pf-row"><span class="pf-label">Correo</span><span class="pf-value">' + escapeHtml(email) + '</span></div>' +
                    '<div class="pf-row"><span class="pf-label">Telefono</span><span class="pf-value">' + escapeHtml(phone) + '</span></div>' +
                    '<div class="pf-btn-group"><button class="pf-btn pf-btn-outline" id="pfEditBtn"><i data-lucide="pencil"></i> Editar datos</button></div>' +
                '</div>' +
                '<div class="pf-edit-form" id="pfEditForm">' +
                    '<div class="pf-field"><label>Nombre</label><input class="pf-input" id="pfEditName" value="' + escapeHtml(name) + '"></div>' +
                    '<div class="pf-field"><label>Telefono</label><input class="pf-input" id="pfEditPhone" value="' + escapeHtml(data.telefono || '') + '" placeholder="3001234567"></div>' +
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
        var isPassword = user.providerData && user.providerData[0] && user.providerData[0].providerId === 'password';

        var html =
            '<div class="pf-card">' +
                '<div class="pf-card-title">Acceso a tu cuenta</div>' +
                '<div class="pf-row"><span class="pf-label">Proveedor</span><span class="pf-value">' +
                    (isPassword ? 'Correo y contrasena' : 'Google') + '</span></div>' +
                '<div class="pf-row"><span class="pf-label">Correo</span><span class="pf-value">' + escapeHtml(user.email) + '</span></div>' +
            '</div>' +

            (isPassword
                ? '<div class="pf-card">' +
                    '<div class="pf-card-title">Cambiar contrasena</div>' +
                    '<div class="pf-field"><label>Contrasena actual</label><input class="pf-input" type="password" id="pfOldPass"></div>' +
                    '<div class="pf-field"><label>Nueva contrasena</label><input class="pf-input" type="password" id="pfNewPass" placeholder="Minimo 6 caracteres"></div>' +
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
        });

        var cancelBtn = $id('pfCancelBtn');
        if (cancelBtn) cancelBtn.addEventListener('click', function () {
            editForm.classList.remove('active');
            infoView.style.display = '';
        });

        var saveBtn = $id('pfSaveBtn');
        if (saveBtn) saveBtn.addEventListener('click', function () {
            var newName = ($id('pfEditName').value || '').trim();
            var newPhone = ($id('pfEditPhone').value || '').trim();
            if (!newName) return;
            saveBtn.disabled = true;

            window.db.collection('clientes').doc(user.uid).update({
                nombre: newName,
                telefono: newPhone
            }).then(function () {
                user.updateProfile({ displayName: newName }).catch(function () {});
                _toast('Datos actualizados.', 'success');
                _userData.nombre = newName;
                _userData.telefono = newPhone;
                renderAllSections(user, _userData);
                updateSidebarUser(user, _userData);
                buildNavigation();
                switchSection('perfil');
            }).catch(function (err) {
                _toast('Error al guardar: ' + (err.message || ''), 'error');
                saveBtn.disabled = false;
            });
        });
    }

    // ── Wire security events ────────────────────────────────
    function wireSecurityEvents(user) {
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
