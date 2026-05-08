/**
 * AltorraAdminProfile — gestión del perfil personal del admin (§36.1)
 * =====================================================================
 * Permite al admin actualizar su propio perfil:
 *  - Foto (avatar) — upload a Firebase Storage avatars/{uid}.webp
 *  - Nombre completo
 *  - Teléfono + prefijo
 *  - Cargo / posición
 *  - Cédula con LOCK PATTERN (una vez registrada, requiere autorización
 *    del Super Admin para modificarse)
 *
 * Datos persistidos en Firestore `usuarios/{uid}`. Read+update via
 * REST bypass (mismo patrón que admin-auth.js loadProfileViaREST §8).
 *
 * NO MutationObservers globales. NO pointermove listeners.
 * Cleanup wired via AltorraSectionCleanup.
 */
(function () {
    'use strict';
    if (window.AltorraAdminProfile) return;

    function $(id) { return document.getElementById(id); }

    var _initialState = null;
    var _dirty = false;
    var _saving = false;
    var _avatarPendingFile = null;
    var _avatarPendingDataUrl = null;
    var _cedulaLocked = false;

    /* ─── Compresión de imagen client-side a webp ─── */
    function compressImageToWebp(file, maxSize, quality) {
        return new Promise(function (resolve, reject) {
            var reader = new FileReader();
            reader.onload = function (e) {
                var img = new Image();
                img.onload = function () {
                    var canvas = document.createElement('canvas');
                    var w = img.width, h = img.height;
                    var ratio = Math.min(maxSize / w, maxSize / h, 1);
                    canvas.width = Math.round(w * ratio);
                    canvas.height = Math.round(h * ratio);
                    var ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
                    canvas.toBlob(function (blob) {
                        if (!blob) return reject(new Error('compress-failed'));
                        resolve({ blob: blob, dataUrl: canvas.toDataURL('image/webp', quality) });
                    }, 'image/webp', quality);
                };
                img.onerror = function () { reject(new Error('image-load-failed')); };
                img.src = e.target.result;
            };
            reader.onerror = function () { reject(new Error('read-failed')); };
            reader.readAsDataURL(file);
        });
    }

    /* ─── Carga del perfil desde AP.currentUserProfile ─── */
    /* §45 — Helpers defensivos: setText/setValue/setHTML evitan crash si
       algún ID no se encuentra (race con DOM, sección no renderizada, etc.).
       Antes loadProfile crasheaba con "Cannot set properties of null
       (setting 'textContent')" cuando se llamaba post-save y algún
       elemento era null. */
    function setText(id, value) {
        var el = $(id);
        if (el) el.textContent = value;
    }
    function setValue(id, value) {
        var el = $(id);
        if (el) el.value = value;
    }
    function setHTML(id, value) {
        var el = $(id);
        if (el) el.innerHTML = value;
    }

    function loadProfile() {
        var profile = (window.AP && window.AP.currentUserProfile) || null;
        if (!profile) return;

        var nombre = profile.nombre || '';
        var email = profile.email || '';
        var telefono = profile.telefono || '';
        var prefijo = profile.prefijo || '+57';
        var cargo = profile.cargo || '';
        var cedula = profile.cedula || '';
        var tipoDoc = profile.tipoDoc || 'cc';
        var avatarURL = profile.photoURL || profile.avatarURL || '';
        var rol = profile.rol || '';
        var uid = profile.uid || (window.auth && window.auth.currentUser && window.auth.currentUser.uid) || '';
        var creadoEn = profile.creadoEn || profile.createdAt || null;
        var ultimoAcceso = profile.ultimoAcceso || profile.lastLoginAt || null;
        var has2FA = !!profile.habilitado2FA;

        // Hero
        var initials = (nombre || email || 'A')
            .split(' ').map(function (w) { return w.charAt(0); })
            .join('').substring(0, 2).toUpperCase();
        setText('profileAvatarInitials', initials);
        if (avatarURL) {
            renderAvatar(avatarURL);
        } else {
            renderAvatarInitials(initials);
        }
        setText('profileHeroName', nombre || '(Sin nombre)');
        setText('profileHeroEmail', email);
        setText('profileHeroRole', cargo || roleLabel(rol));
        setText('profileHeroJoined', creadoEn ? '📅 Desde ' + formatDate(creadoEn) : '');
        setText('profileHeroLastAccess', ultimoAcceso ? '⚡ Última conexión ' + formatRelative(ultimoAcceso) : '');

        // Form fields
        setValue('profileNombre', nombre);
        setValue('profileEmail', email);
        setValue('profileTelefono', telefono);
        setValue('profilePrefijo', prefijo);
        setValue('profileCargo', cargo);
        setValue('profileTipoDoc', tipoDoc);
        setValue('profileCedula', cedula);

        // Cédula lock pattern
        var cedulaInput = $('profileCedula');
        var lockBtn = $('profileCedulaLockBtn');
        var hint = $('profileCedulaHint');
        var requestWrap = $('profileRequestChangeWrap');
        var tipoSel = $('profileTipoDoc');

        _cedulaLocked = !!cedula;
        if (_cedulaLocked) {
            cedulaInput.readOnly = true;
            tipoSel.disabled = true;
            cedulaInput.classList.add('is-locked');
            lockBtn.style.display = 'inline-flex';
            requestWrap.style.display = 'block';
            hint.innerHTML = '<i data-lucide="shield-check"></i> Documento verificado y bloqueado. Para modificarlo solicitá autorización al Super Admin.';
        } else {
            cedulaInput.readOnly = false;
            tipoSel.disabled = false;
            cedulaInput.classList.remove('is-locked');
            lockBtn.style.display = 'none';
            requestWrap.style.display = 'none';
            hint.textContent = 'Ingresá tu número y guardá. Una vez guardado quedará bloqueado.';
        }

        // Read-only info (defensive — usar helpers para evitar crash si
        // algún ID falta por race con DOM)
        setText('profileInfoRol', roleLabel(rol));
        setText('profileInfoUid', uid);
        setText('profileInfoCreated', creadoEn ? formatDate(creadoEn) : '—');
        setText('profileInfoLastAccess', ultimoAcceso ? formatDate(ultimoAcceso) + ' · ' + formatRelative(ultimoAcceso) : '—');
        setHTML('profileInfo2FA', has2FA
            ? '<span style="color:#4ade80;">✓ Habilitado</span>'
            : '<span style="color:rgba(255,255,255,0.55);">No habilitado</span>');

        // Snapshot estado inicial para detectar dirty
        _initialState = {
            nombre: nombre,
            telefono: telefono,
            prefijo: prefijo,
            cargo: cargo,
            tipoDoc: tipoDoc,
            cedula: cedula
        };
        _dirty = false;
        _avatarPendingFile = null;
        _avatarPendingDataUrl = null;
        updateSaveBar();

        if (window.AltorraIcons) window.AltorraIcons.refresh($('sec-profile'));

        // §40 — Sync estado Telegram (vinculado/no)
        try { syncTelegramStatus(); } catch (e) {}
    }

    function renderAvatar(url) {
        var av = $('profileAvatar');
        if (!av) return;
        av.innerHTML = '<img src="' + escapeHTML(url) + '" alt="" onerror="this.parentNode.innerHTML=\'<span class=\\\'profile-avatar-initials\\\'>?\\\'</span>\'">';
    }

    function renderAvatarInitials(initials) {
        var av = $('profileAvatar');
        if (!av) return;
        av.innerHTML = '<span class="profile-avatar-initials">' + escapeHTML(initials) + '</span>';
    }

    function roleLabel(rol) {
        var key = String(rol || '').toLowerCase();
        if (key === 'super_admin') return 'Administrador General';
        if (key === 'editor')      return 'Editor';
        if (key === 'viewer')      return 'Lector';
        if (key === 'admin')       return 'Administrador';
        return rol ? rol.charAt(0).toUpperCase() + rol.slice(1) : 'Miembro';
    }

    function formatDate(d) {
        try {
            var date;
            if (d && typeof d.toDate === 'function') date = d.toDate();
            else if (typeof d === 'string') date = new Date(d);
            else if (typeof d === 'number') date = new Date(d);
            else if (d && d.seconds) date = new Date(d.seconds * 1000);
            else date = new Date(d);
            if (isNaN(date.getTime())) return '—';
            return date.toLocaleDateString('es-CO', { day: 'numeric', month: 'long', year: 'numeric' });
        } catch (e) { return '—'; }
    }
    function formatRelative(d) {
        try {
            var date;
            if (d && typeof d.toDate === 'function') date = d.toDate();
            else if (typeof d === 'string') date = new Date(d);
            else if (typeof d === 'number') date = new Date(d);
            else if (d && d.seconds) date = new Date(d.seconds * 1000);
            else date = new Date(d);
            if (isNaN(date.getTime())) return '';
            var diff = (Date.now() - date.getTime()) / 1000;
            if (diff < 60) return 'hace un momento';
            if (diff < 3600) return 'hace ' + Math.round(diff / 60) + ' min';
            if (diff < 86400) return 'hace ' + Math.round(diff / 3600) + ' h';
            if (diff < 86400 * 7) return 'hace ' + Math.round(diff / 86400) + ' días';
            return formatDate(d);
        } catch (e) { return ''; }
    }

    function escapeHTML(s) {
        return String(s || '').replace(/[<>&"']/g, function (c) {
            return { '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&#39;' }[c];
        });
    }

    /* ─── Detectar cambios y habilitar save ─── */
    function checkDirty() {
        if (!_initialState) return false;
        var snap = readForm();
        var changed = false;
        Object.keys(_initialState).forEach(function (k) {
            if (k === 'cedula' && _cedulaLocked) return; // bloqueada — no contar
            if (k === 'tipoDoc' && _cedulaLocked) return;
            if ((snap[k] || '') !== (_initialState[k] || '')) changed = true;
        });
        if (_avatarPendingFile) changed = true;
        _dirty = changed;
        return changed;
    }
    function readForm() {
        return {
            nombre: ($('profileNombre').value || '').trim(),
            telefono: ($('profileTelefono').value || '').trim(),
            prefijo: $('profilePrefijo').value || '+57',
            cargo: ($('profileCargo').value || '').trim(),
            tipoDoc: $('profileTipoDoc').value || 'cc',
            cedula: ($('profileCedula').value || '').trim()
        };
    }

    function updateSaveBar() {
        var status = $('profileSaveStatus');
        var saveBtn = $('profileSaveBtn');
        var cancelBtn = $('profileCancelBtn');
        var saveBar = $('profileSaveBar');
        if (!status || !saveBtn) return;

        if (_saving) {
            status.innerHTML = '<i data-lucide="loader-2" class="spin"></i> <span>Guardando…</span>';
        } else if (_dirty) {
            status.innerHTML = '<i data-lucide="alert-circle"></i> <span>Cambios sin guardar</span>';
            status.classList.add('is-dirty');
        } else {
            status.innerHTML = '<i data-lucide="circle-check"></i> <span>Sin cambios pendientes</span>';
            status.classList.remove('is-dirty');
        }
        saveBtn.disabled = !_dirty || _saving;
        cancelBtn.disabled = !_dirty || _saving;
        if (saveBar) saveBar.classList.toggle('is-dirty', _dirty);

        if (window.AltorraIcons) window.AltorraIcons.refresh(saveBar);
    }

    /* ─── Avatar upload ─── */
    function onAvatarSelect(e) {
        var file = e.target.files && e.target.files[0];
        if (!file) return;
        if (!/^image\/(jpeg|png|webp)$/.test(file.type)) {
            if (window.notify) window.notify.error({ title: 'Formato no permitido', message: 'Usá JPG, PNG o WebP' });
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            if (window.notify) window.notify.error({ title: 'Imagen muy grande', message: 'Máximo 5 MB' });
            return;
        }
        compressImageToWebp(file, 400, 0.85).then(function (out) {
            _avatarPendingFile = out.blob;
            _avatarPendingDataUrl = out.dataUrl;
            renderAvatar(out.dataUrl);
            checkDirty();
            updateSaveBar();
        }).catch(function () {
            if (window.notify) window.notify.error({ title: 'Error procesando imagen' });
        });
    }

    function uploadAvatarToStorage(uid, blob) {
        if (!window.firebase || !window.storage) {
            return Promise.reject(new Error('storage-not-available'));
        }
        var ref = window.storage.ref('avatars/' + uid + '.webp');
        return ref.put(blob, { contentType: 'image/webp', cacheControl: 'public, max-age=86400' })
            .then(function (snap) { return snap.ref.getDownloadURL(); });
    }

    /* ─── Save ─── */
    function saveProfile() {
        if (_saving || !_dirty) return;
        var user = window.auth && window.auth.currentUser;
        if (!user) {
            if (window.notify) window.notify.error({ title: 'No hay sesión activa' });
            return;
        }
        _saving = true;
        updateSaveBar();

        var snap = readForm();
        var updates = {
            nombre: snap.nombre,
            telefono: snap.telefono,
            prefijo: snap.prefijo,
            cargo: snap.cargo
        };
        // Cédula solo se envía si NO estaba bloqueada (primer registro)
        if (!_cedulaLocked && snap.cedula) {
            updates.cedula = snap.cedula;
            updates.tipoDoc = snap.tipoDoc;
        }

        var avatarPromise = _avatarPendingFile
            ? uploadAvatarToStorage(user.uid, _avatarPendingFile)
                  .then(function (url) { updates.photoURL = url; })
                  .catch(function (err) { console.warn('[Profile] Avatar upload failed:', err && err.message); })
            : Promise.resolve();

        avatarPromise
            .then(function () {
                if (!window.db) throw new Error('firestore-not-available');
                return window.db.collection('usuarios').doc(user.uid).update(updates);
            })
            .then(function () {
                // Update Firebase Auth profile (display name + photo)
                var authUpdates = {};
                if (updates.nombre) authUpdates.displayName = updates.nombre;
                if (updates.photoURL) authUpdates.photoURL = updates.photoURL;
                if (Object.keys(authUpdates).length && user.updateProfile) {
                    return user.updateProfile(authUpdates).catch(function () {});
                }
            })
            .then(function () {
                // Update local AP cache
                if (window.AP && window.AP.currentUserProfile) {
                    Object.assign(window.AP.currentUserProfile, updates);
                }
                _saving = false;
                _dirty = false;
                _avatarPendingFile = null;
                _avatarPendingDataUrl = null;
                if (window.notify) window.notify.success({ title: '✓ Perfil actualizado', message: 'Tus cambios se guardaron correctamente.' });

                // §45 — Re-load + sync topnav envueltos en try/catch para que
                // un error cosmético (ej: ID no encontrado por race) NO dispare
                // el toast "Error al guardar" después del success. El save real
                // ya completó; estos son refresh visuales secundarios.
                try { loadProfile(); }
                catch (e) { console.warn('[Profile] loadProfile post-save falló:', e && e.message); }

                try {
                    if (window.AltorraTopNav && window.AltorraTopNav.syncUser) window.AltorraTopNav.syncUser();
                } catch (e) { console.warn('[Profile] syncUser post-save falló:', e && e.message); }
            })
            .catch(function (err) {
                _saving = false;
                try { updateSaveBar(); } catch (e) {}
                if (window.notify) window.notify.error({ title: 'Error al guardar', message: err && err.message || 'Intentá de nuevo' });
            });
    }

    function cancelChanges() {
        _avatarPendingFile = null;
        _avatarPendingDataUrl = null;
        loadProfile();
    }

    /* ─── Solicitud de cambio de cédula al Super Admin ─── */
    function requestCedulaChange() {
        if (!confirm('¿Solicitar al Super Admin que desbloquee tu documento de identidad? Recibirás un correo cuando el cambio sea aprobado.')) return;
        // Marcamos el flag en Firestore para que el Super Admin lo vea en su panel
        var user = window.auth && window.auth.currentUser;
        if (!user || !window.db) return;
        window.db.collection('usuarios').doc(user.uid).update({
            cedulaChangeRequested: true,
            cedulaChangeRequestedAt: new Date().toISOString()
        }).then(function () {
            if (window.notify) window.notify.success({ title: 'Solicitud enviada', message: 'El Super Admin recibirá una notificación.' });
        }).catch(function (err) {
            if (window.notify) window.notify.error({ title: 'Error', message: err.message || 'No se pudo enviar' });
        });
    }

    /* ─── Wire del DOM ─── */
    function wireUp() {
        var section = $('sec-profile');
        if (!section || section._profileWired) return;
        section._profileWired = true;

        // Avatar click → file picker
        var wrap = $('profileAvatarWrap');
        if (wrap) {
            wrap.addEventListener('click', function () {
                if (_cedulaLocked && _saving) return;
                $('profileAvatarFile').click();
            });
            wrap.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    $('profileAvatarFile').click();
                }
            });
        }
        $('profileAvatarFile').addEventListener('change', onAvatarSelect);

        // Form fields → detectar dirty
        ['profileNombre', 'profileTelefono', 'profilePrefijo', 'profileCargo', 'profileTipoDoc', 'profileCedula'].forEach(function (id) {
            var el = $(id);
            if (!el) return;
            var ev = (el.tagName === 'SELECT') ? 'change' : 'input';
            el.addEventListener(ev, function () { checkDirty(); updateSaveBar(); });
        });

        $('profileSaveBtn').addEventListener('click', saveProfile);
        $('profileCancelBtn').addEventListener('click', cancelChanges);
        $('profileRequestChange').addEventListener('click', requestCedulaChange);
        $('profileCedulaLockBtn').addEventListener('click', function () {
            if (window.notify) window.notify.info({
                title: 'Documento bloqueado',
                message: 'Para modificar tu cédula necesitás autorización del Super Admin. Tocá "Solicitar cambio".'
            });
        });

        // §40 — Telegram integration buttons
        var telegramConnect = $('profileTelegramConnect');
        var telegramDisconnect = $('profileTelegramDisconnect');
        if (telegramConnect) {
            telegramConnect.addEventListener('click', function () {
                if (window.AltorraAdminTelegram && window.AltorraAdminTelegram.openLinkFlow) {
                    window.AltorraAdminTelegram.openLinkFlow();
                } else if (window.notify) {
                    window.notify.error({ title: 'Telegram no disponible', message: 'El módulo no se cargó correctamente.' });
                }
            });
        }
        if (telegramDisconnect) {
            telegramDisconnect.addEventListener('click', function () {
                if (!confirm('¿Desconectar Telegram? Dejarás de recibir notificaciones de leads urgentes.')) return;
                if (window.AltorraAdminTelegram && window.AltorraAdminTelegram.unlink) {
                    window.AltorraAdminTelegram.unlink();
                    setTimeout(syncTelegramStatus, 500);
                }
            });
        }
    }

    /* §40 — Sync visual del estado Telegram */
    function syncTelegramStatus() {
        var status = $('profileTelegramStatus');
        var connectBtn = $('profileTelegramConnect');
        var disconnectBtn = $('profileTelegramDisconnect');
        if (!status) return;

        var profile = (window.AP && window.AP.currentUserProfile) || {};
        var linked = !!profile.telegramChatId;

        if (linked) {
            status.innerHTML = '<span style="color:#4ade80;">✓ Conectado</span> · ' + (profile.telegramUserName ? '@' + escapeHTML(profile.telegramUserName) : 'Notificaciones activas');
            if (connectBtn) connectBtn.style.display = 'none';
            if (disconnectBtn) disconnectBtn.style.display = 'inline-flex';
        } else {
            status.textContent = 'Sin conectar';
            if (connectBtn) connectBtn.style.display = 'inline-flex';
            if (disconnectBtn) disconnectBtn.style.display = 'none';
        }
    }

    function init() {
        // Wire on first activation
        if (window.AltorraSections && window.AltorraSections.onChange) {
            window.AltorraSections.onChange(function (section) {
                if (section === 'profile') {
                    wireUp();
                    loadProfile();
                }
            });
        }

        // Cleanup hook (§34)
        if (window.AltorraSectionCleanup) {
            window.AltorraSectionCleanup.register('profile', function () {
                _avatarPendingFile = null;
                _avatarPendingDataUrl = null;
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ─── Public API ─── */
    window.AltorraAdminProfile = {
        load: loadProfile,
        save: saveProfile
    };
})();
