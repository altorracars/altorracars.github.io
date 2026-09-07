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
        var cedula = profile.cedula || '';
        // §114 — El CARGO ya NO es free-text editable: es espejo del rol dinámico
        // del sistema (roleName), auto-asignado y read-only. Resuelto vía el
        // resolver canónico (roleName → cargo → legacy legible).
        var roleDisplay = (window.AP && AP.resolveRoleLabel)
            ? AP.resolveRoleLabel(profile)
            : (profile.roleName || profile.cargo || roleLabel(profile.rol || ''));
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
        setText('profileHeroRole', roleDisplay);
        setText('profileHeroJoined', creadoEn ? '📅 Desde ' + formatDate(creadoEn) : '');
        setText('profileHeroLastAccess', ultimoAcceso ? '⚡ Última conexión ' + formatRelative(ultimoAcceso) : '');

        // Form fields
        setValue('profileNombre', nombre);
        setValue('profileEmail', email);
        setValue('profileTelefono', telefono);
        setValue('profilePrefijo', prefijo);
        // §114 — CARGO es read-only: espejo del rol dinámico (roleName).
        setValue('profileCargo', roleDisplay);
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
        setText('profileInfoRol', roleDisplay);
        setText('profileInfoUid', uid);
        setText('profileInfoCreated', creadoEn ? formatDate(creadoEn) : '—');
        setText('profileInfoLastAccess', ultimoAcceso ? formatDate(ultimoAcceso) + ' · ' + formatRelative(ultimoAcceso) : '—');
        setHTML('profileInfo2FA', has2FA
            ? '<span style="color:#4ade80;">✓ Habilitado</span>'
            : '<span style="color:rgba(255,255,255,0.55);">No habilitado</span>');

        // Snapshot estado inicial para detectar dirty
        // §114 — cargo eliminado del dirty-check: ya no es editable.
        _initialState = {
            nombre: nombre,
            telefono: telefono,
            prefijo: prefijo,
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
        // §114 — cargo NO se lee del form: es read-only (espejo del rol).
        return {
            nombre: ($('profileNombre').value || '').trim(),
            telefono: ($('profileTelefono').value || '').trim(),
            prefijo: $('profilePrefijo').value || '+57',
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
        // §114 — cargo NO se escribe desde el perfil: lo sincroniza la
        // Cloud Function (onUserRoleAssigned/onRoleUpdated) = roleName.
        var updates = {
            nombre: snap.nombre,
            telefono: snap.telefono,
            prefijo: snap.prefijo
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

        // §51 — Webhook section: visible solo super_admin
        var webhookCard = $('profileTelegramWebhookCard');
        if (webhookCard) {
            var isSuperAdmin = profile.rol === 'super_admin';
            webhookCard.style.display = isSuperAdmin ? '' : 'none';
            if (isSuperAdmin) {
                bindWebhookHandlers();
                // Auto-check status al cargar perfil (best-effort, callable falla
                // silenciosamente si secret no seteado o functions no desplegadas).
                checkWebhookStatus();
            }
        }
    }

    /* §51 — Telegram webhook setup (super_admin only) */
    function bindWebhookHandlers() {
        var setupBtn = $('profileWebhookSetup');
        var checkBtn = $('profileWebhookCheck');
        if (setupBtn && !setupBtn._wired) {
            setupBtn._wired = true;
            setupBtn.addEventListener('click', function () {
                if (!confirm('Configurar el webhook del bot Telegram apuntando a Cloud Functions. ¿Proceder?\n\nEsto se hace UNA vez por instalación. Sin webhook el bot no responde a /start.')) return;
                setupBtn.disabled = true;
                setupBtn.innerHTML = '<i data-lucide="loader-2"></i> Configurando...';
                if (window.AltorraAdminTelegram && window.AltorraAdminTelegram.setupWebhook) {
                    window.AltorraAdminTelegram.setupWebhook().then(function () {
                        setupBtn.disabled = false;
                        setupBtn.innerHTML = '<i data-lucide="zap"></i> Configurar webhook';
                        checkWebhookStatus();
                    }).catch(function () {
                        setupBtn.disabled = false;
                        setupBtn.innerHTML = '<i data-lucide="zap"></i> Configurar webhook';
                    });
                }
            });
        }
        if (checkBtn && !checkBtn._wired) {
            checkBtn._wired = true;
            checkBtn.addEventListener('click', function () {
                checkBtn.disabled = true;
                checkBtn.innerHTML = '<i data-lucide="loader-2"></i>';
                checkWebhookStatus().finally(function () {
                    checkBtn.disabled = false;
                    checkBtn.innerHTML = '<i data-lucide="refresh-cw"></i> Verificar';
                });
            });
        }
    }

    function checkWebhookStatus() {
        var statusEl = $('profileWebhookStatus');
        if (!statusEl) return Promise.resolve();
        if (!window.AltorraAdminTelegram || !window.AltorraAdminTelegram.getWebhookStatus) {
            statusEl.textContent = 'Módulo Telegram no cargado';
            return Promise.resolve();
        }
        statusEl.innerHTML = '<span style="color:rgba(255,255,255,0.55);">Comprobando…</span>';
        return window.AltorraAdminTelegram.getWebhookStatus().then(function (info) {
            if (!info.configured) {
                statusEl.innerHTML = '<span style="color:#ef4444;">✗ NO configurado</span>' +
                    (info.reason ? ' · <small style="color:rgba(255,255,255,0.55);">' + escapeHTML(info.reason) + '</small>' : '');
            } else if (info.isExpected) {
                var pending = info.pendingUpdateCount || 0;
                var msg = '<span style="color:#4ade80;">✓ Activo</span>';
                if (pending > 0) msg += ' · <small style="color:#f59e0b;">' + pending + ' updates pending</small>';
                if (info.lastErrorMessage) {
                    msg += ' · <small style="color:#ef4444;">Último error: ' + escapeHTML(info.lastErrorMessage) + '</small>';
                }
                statusEl.innerHTML = msg;
            } else {
                statusEl.innerHTML = '<span style="color:#f59e0b;">⚠ URL incorrecta</span>' +
                    ' · <small style="color:rgba(255,255,255,0.55);">' + escapeHTML(info.url) + '</small>';
            }
        }).catch(function (err) {
            var msg = (err && err.message) || 'Error';
            statusEl.innerHTML = '<span style="color:#ef4444;">✗ Error: ' + escapeHTML(msg) + '</span>';
        });
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

    /* ═══════════════════════════════════════════════════════════════
       §48 RECOVERY SETUP — Backup codes + Security questions
       ═══════════════════════════════════════════════════════════════ */

    function refreshRecoveryUI() {
        var profile = (window.AP && window.AP.currentUserProfile) || null;
        if (!profile) return;
        var R = window.AltorraRecovery;
        if (!R) return;

        // Backup codes status
        var backupStatus = document.getElementById('profileBackupStatus');
        var backupBtn = document.getElementById('profileBackupGenerate');
        if (backupStatus) {
            var available = R.countAvailableBackupCodes(profile.backupCodes);
            var total = (profile.backupCodes && profile.backupCodes.length) || 0;
            if (total === 0) {
                backupStatus.textContent = 'Sin generar';
                if (backupBtn) backupBtn.innerHTML = '<i data-lucide="refresh-cw"></i> Generar códigos';
            } else {
                backupStatus.textContent = available + ' de ' + total + ' disponibles';
                if (backupBtn) backupBtn.innerHTML = '<i data-lucide="refresh-cw"></i> Regenerar códigos';
            }
        }

        // Security questions status
        var qStatus = document.getElementById('profileQuestionsStatus');
        var qBtn = document.getElementById('profileQuestionsConfig');
        if (qStatus) {
            var hasQ = profile.securityQuestions && profile.securityQuestions.length >= R.SECURITY_QUESTION_COUNT;
            qStatus.textContent = hasQ ? 'Configuradas (' + profile.securityQuestions.length + '/' + R.SECURITY_QUESTION_COUNT + ')' : 'Sin configurar';
            if (qBtn) qBtn.innerHTML = '<i data-lucide="settings-2"></i> ' + (hasQ ? 'Reconfigurar' : 'Configurar');
        }

        if (window.AltorraIcons && window.AltorraIcons.refresh) {
            var card = document.getElementById('profileRecoveryCard');
            if (card) window.AltorraIcons.refresh(card);
        }
    }

    function generateAndShowBackupCodes() {
        var R = window.AltorraRecovery;
        var user = window.auth && window.auth.currentUser;
        if (!R || !user) return;
        var profile = window.AP && window.AP.currentUserProfile;
        var hasExisting = profile && profile.backupCodes && profile.backupCodes.length > 0;
        if (hasExisting) {
            var ok = confirm('Esto INVALIDARÁ tus códigos actuales y generará 10 nuevos. ¿Continuar?');
            if (!ok) return;
        }

        var codes = R.generateBackupCodes();
        // Mostrar al user PRIMERO (antes de persistir, así si falla guardado igual los vio)
        var listEl = document.getElementById('profileBackupCodesList');
        var displayEl = document.getElementById('profileBackupCodesDisplay');
        if (listEl && displayEl) {
            listEl.innerHTML = codes.map(function (c) {
                return '<div style="padding:8px 10px;background:rgba(0,0,0,0.25);border-radius:4px;text-align:center;">' + c + '</div>';
            }).join('');
            displayEl.style.display = 'block';
            displayEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }

        // Persistir hashes
        R.hashAllBackupCodes(codes).then(function (entries) {
            return window.db.collection('usuarios').doc(user.uid).update({
                backupCodes: entries,
                backupCodesGeneratedAt: new Date().toISOString()
            });
        }).then(function () {
            // Guardar copia plaintext en memoria SOLO para el botón "Copiar"
            displayEl.dataset.codes = codes.join('\n');
            // Sync local profile
            if (profile) {
                profile.backupCodesGeneratedAt = new Date().toISOString();
            }
            if (window.notify && window.notify.success) {
                window.notify.success({
                    title: 'Códigos generados',
                    message: 'Guardalos en lugar seguro — solo se muestran una vez.'
                });
            }
        }).catch(function (err) {
            console.error('[Profile] Error guardando backup codes:', err);
            if (window.AP && window.AP.toast) {
                window.AP.toast('Error guardando códigos: ' + (err.message || 'desconocido') +
                    '. Pedí firebase deploy --only firestore:rules.', 'error');
            }
        });
    }

    function copyBackupCodes() {
        var displayEl = document.getElementById('profileBackupCodesDisplay');
        if (!displayEl || !displayEl.dataset.codes) return;
        var text = displayEl.dataset.codes;
        if (navigator.clipboard && navigator.clipboard.writeText) {
            navigator.clipboard.writeText(text).then(function () {
                if (window.AP && window.AP.toast) window.AP.toast('Códigos copiados al portapapeles', 'success');
            }).catch(function () { fallbackCopy(text); });
        } else {
            fallbackCopy(text);
        }
    }

    function fallbackCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.opacity = '0';
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) {}
        document.body.removeChild(ta);
        if (window.AP && window.AP.toast) window.AP.toast('Códigos copiados', 'success');
    }

    function printBackupCodes() {
        var displayEl = document.getElementById('profileBackupCodesDisplay');
        if (!displayEl || !displayEl.dataset.codes) return;
        var codes = displayEl.dataset.codes.split('\n');
        var user = window.AP && window.AP.currentUserProfile;
        var name = user && user.nombre ? user.nombre : '';
        var email = user && user.email ? user.email : '';
        var date = new Date().toLocaleDateString('es-CO');
        var w = window.open('', '_blank', 'width=600,height=700');
        if (!w) return;
        w.document.write(
            '<!DOCTYPE html><html><head><title>ALTORRA CARS - Codigos de respaldo</title>' +
            '<style>body{font-family:system-ui,sans-serif;padding:40px;max-width:600px;margin:0 auto;}h1{color:#b89658;margin:0 0 5px}h2{color:#666;font-weight:400;font-size:1rem;margin-top:0}.codes{display:grid;grid-template-columns:repeat(2,1fr);gap:8px;margin:20px 0;font-family:Courier,monospace;font-size:1.1rem;}.code{padding:10px;border:1px solid #ccc;text-align:center;border-radius:4px}.warn{background:#fff3cd;padding:14px;border-radius:6px;margin-top:20px;font-size:0.9rem;}</style>' +
            '</head><body>' +
            '<h1>ALTORRA CARS - Codigos de Recuperacion</h1>' +
            '<h2>' + name + ' - ' + email + ' - Generados el ' + date + '</h2>' +
            '<div class="codes">' + codes.map(function (c) { return '<div class="code">' + c + '</div>'; }).join('') + '</div>' +
            '<div class="warn"><strong>Guarda esta hoja en un lugar seguro.</strong> Cada codigo funciona una sola vez. Si Firebase bloquea el SMS, podes ingresar al panel admin con uno de estos codigos.</div>' +
            '</body></html>'
        );
        w.document.close();
        setTimeout(function () { w.print(); }, 500);
    }

    function hideBackupCodesDisplay() {
        var displayEl = document.getElementById('profileBackupCodesDisplay');
        if (displayEl) {
            displayEl.style.display = 'none';
            delete displayEl.dataset.codes;
        }
        refreshRecoveryUI();
    }

    function showQuestionsConfigForm() {
        var R = window.AltorraRecovery;
        if (!R) return;
        var formEl = document.getElementById('profileQuestionsForm');
        var fieldsEl = document.getElementById('profileQuestionsFields');
        if (!formEl || !fieldsEl) return;
        formEl.style.display = 'block';
        formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

        var profile = window.AP && window.AP.currentUserProfile;
        var existing = (profile && profile.securityQuestions) || [];
        var html = '';
        for (var i = 0; i < R.SECURITY_QUESTION_COUNT; i++) {
            var current = existing[i] && existing[i].questionId;
            var optionsHtml = R.AVAILABLE_QUESTIONS.map(function (q) {
                var sel = (q.id === current) ? ' selected' : '';
                return '<option value="' + q.id + '"' + sel + '>' + q.text + '</option>';
            }).join('');
            html +=
                '<div class="form-group" data-q-idx="' + i + '">' +
                    '<label class="form-label" style="font-size:0.78rem;color:var(--admin-text-muted);">Pregunta ' + (i + 1) + '</label>' +
                    '<select class="form-input profile-q-select" style="margin-bottom:6px;font-size:0.85rem;">' +
                        '<option value="">— Seleccioná una pregunta —</option>' +
                        optionsHtml +
                    '</select>' +
                    '<input type="text" class="form-input profile-q-answer" placeholder="Tu respuesta" autocomplete="off" style="font-size:0.85rem;">' +
                '</div>';
        }
        fieldsEl.innerHTML = html;
        if (window.AltorraIcons && window.AltorraIcons.refresh) {
            window.AltorraIcons.refresh(formEl);
        }
    }

    function saveSecurityQuestions() {
        var R = window.AltorraRecovery;
        var user = window.auth && window.auth.currentUser;
        if (!R || !user) return;
        var fieldsEl = document.getElementById('profileQuestionsFields');
        var errEl = document.getElementById('profileQuestionsErr');
        var saveBtn = document.getElementById('profileQuestionsSave');
        if (!fieldsEl || !errEl) return;

        errEl.style.display = 'none';
        var groups = fieldsEl.querySelectorAll('[data-q-idx]');
        var entries = [];
        var seenIds = {};
        for (var i = 0; i < groups.length; i++) {
            var sel = groups[i].querySelector('.profile-q-select');
            var ans = groups[i].querySelector('.profile-q-answer');
            var qid = sel ? sel.value : '';
            var aval = ans ? ans.value.trim() : '';
            if (!qid) {
                errEl.textContent = 'Pregunta ' + (i + 1) + ': elegí una pregunta del listado.';
                errEl.style.display = 'block';
                return;
            }
            if (!aval || aval.length < 2) {
                errEl.textContent = 'Pregunta ' + (i + 1) + ': la respuesta debe tener al menos 2 caracteres.';
                errEl.style.display = 'block';
                return;
            }
            if (seenIds[qid]) {
                errEl.textContent = 'Las 3 preguntas deben ser distintas.';
                errEl.style.display = 'block';
                return;
            }
            seenIds[qid] = true;
            entries.push({ questionId: qid, answer: aval });
        }

        saveBtn.disabled = true;
        saveBtn.innerHTML = '<i data-lucide="loader-2"></i> Guardando...';

        var hashPromises = entries.map(function (e) {
            return R.hashAnswer(e.answer).then(function (h) {
                return { questionId: e.questionId, salt: h.salt, hash: h.hash };
            });
        });

        Promise.all(hashPromises).then(function (storedEntries) {
            return window.db.collection('usuarios').doc(user.uid).update({
                securityQuestions: storedEntries,
                securityQuestionsUpdatedAt: new Date().toISOString()
            }).then(function () {
                // Sync local con los hashes recién guardados (NO con plaintext)
                var profile = window.AP && window.AP.currentUserProfile;
                if (profile) {
                    profile.securityQuestions = storedEntries;
                    profile.securityQuestionsUpdatedAt = new Date().toISOString();
                }
            });
        }).then(function () {
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<i data-lucide="save"></i> Guardar';
            document.getElementById('profileQuestionsForm').style.display = 'none';
            if (window.notify && window.notify.success) {
                window.notify.success({
                    title: 'Preguntas guardadas',
                    message: 'Si Firebase bloquea SMS, podrás recuperar acceso respondiendo 2 de 3.'
                });
            }
            refreshRecoveryUI();
        }).catch(function (err) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<i data-lucide="save"></i> Guardar';
            errEl.textContent = 'Error al guardar: ' + (err.message || 'desconocido') +
                (err.code === 'permission-denied' ? ' (firestore.rules pendientes de deploy)' : '');
            errEl.style.display = 'block';
            console.error('[Profile] Error guardando preguntas:', err);
        });
    }

    /* ═══════════════════════════════════════════════════════════════
       §49 SECURITY CARD — 2FA toggle + cambiar phone
       (cambio de password sigue manejado por admin-auth.js handler
        del form #changePasswordForm; solo movimos el HTML aquí.)
       ═══════════════════════════════════════════════════════════════ */

    function maskPhone(phone) {
        if (!phone) return '';
        var s = String(phone);
        if (s.length <= 4) return s;
        return s.slice(0, -4).replace(/./g, '*') + s.slice(-4);
    }

    function refresh2FAStatus() {
        var profile = (window.AP && window.AP.currentUserProfile) || null;
        var statusEl = document.getElementById('profile2FAStatus');
        var btnEl = document.getElementById('profile2FAManage');
        if (!profile || !statusEl) return;
        if (profile.habilitado2FA && profile.telefono2FA) {
            var prefix = profile.prefijo2FA || '+57';
            statusEl.innerHTML = 'Activo · <strong style="color:#4ade80;">' +
                prefix + ' ' + maskPhone(profile.telefono2FA) + '</strong>';
            if (btnEl) btnEl.innerHTML = '<i data-lucide="settings-2"></i> Gestionar';
        } else {
            statusEl.innerHTML = '<span style="color:rgba(255,255,255,0.55);">Desactivado</span>';
            if (btnEl) btnEl.innerHTML = '<i data-lucide="shield-plus"></i> Activar 2FA';
        }
        if (window.AltorraIcons && window.AltorraIcons.refresh) {
            var card = document.getElementById('profileSecurityCard');
            if (card) window.AltorraIcons.refresh(card);
        }
    }

    function show2FAForm() {
        var profile = (window.AP && window.AP.currentUserProfile) || {};
        var formEl = document.getElementById('profile2FAForm');
        var bodyEl = document.getElementById('profile2FAFormBody');
        if (!formEl || !bodyEl) return;
        formEl.style.display = 'block';
        formEl.scrollIntoView({ behavior: 'smooth', block: 'center' });

        var isActive = !!(profile.habilitado2FA && profile.telefono2FA);
        var prefix = profile.prefijo2FA || '+57';
        var phone = profile.telefono2FA || '';

        bodyEl.innerHTML =
            '<div style="margin-bottom:14px;">' +
                '<label style="display:flex;align-items:center;gap:10px;cursor:pointer;font-size:0.9rem;">' +
                    '<input type="checkbox" id="profile2FAEnabled"' + (isActive ? ' checked' : '') + ' style="width:18px;height:18px;flex-shrink:0;">' +
                    '<span><strong>Activar 2FA</strong> — protege tu cuenta con un código SMS al iniciar sesión.</span>' +
                '</label>' +
            '</div>' +
            '<div id="profile2FAPhoneFields" style="' + (isActive ? '' : 'opacity:0.5;pointer-events:none;') + '">' +
                '<div style="display:flex;gap:8px;align-items:flex-end;flex-wrap:wrap;">' +
                    '<div class="form-group" style="margin:0;flex:0 0 100px;">' +
                        '<label class="form-label" style="font-size:0.78rem;">Prefijo</label>' +
                        '<select id="profile2FAPrefix" class="form-input" style="font-size:0.85rem;">' +
                            '<option value="+57"' + (prefix === '+57' ? ' selected' : '') + '>+57 CO</option>' +
                            '<option value="+1"'  + (prefix === '+1'  ? ' selected' : '') + '>+1 US</option>' +
                            '<option value="+34"' + (prefix === '+34' ? ' selected' : '') + '>+34 ES</option>' +
                            '<option value="+52"' + (prefix === '+52' ? ' selected' : '') + '>+52 MX</option>' +
                            '<option value="+54"' + (prefix === '+54' ? ' selected' : '') + '>+54 AR</option>' +
                            '<option value="+56"' + (prefix === '+56' ? ' selected' : '') + '>+56 CL</option>' +
                            '<option value="+51"' + (prefix === '+51' ? ' selected' : '') + '>+51 PE</option>' +
                        '</select>' +
                    '</div>' +
                    '<div class="form-group" style="margin:0;flex:1;min-width:180px;">' +
                        '<label class="form-label" style="font-size:0.78rem;">Número de celular</label>' +
                        '<input type="tel" id="profile2FAPhone" class="form-input" placeholder="3001234567" value="' + (phone || '') + '" style="font-size:0.9rem;" autocomplete="tel-national">' +
                    '</div>' +
                '</div>' +
                '<p class="profile-field-hint" style="margin-top:8px;">' +
                    '<i data-lucide="info"></i>' +
                    ' Verificá que el número funcione antes de guardar. La próxima vez que inicies sesión recibirás un SMS de prueba.' +
                '</p>' +
            '</div>';

        // Toggle phone fields enabled/disabled cuando se prende/apaga el checkbox
        var checkbox = document.getElementById('profile2FAEnabled');
        var phoneFields = document.getElementById('profile2FAPhoneFields');
        if (checkbox && phoneFields) {
            checkbox.addEventListener('change', function () {
                if (this.checked) {
                    phoneFields.style.opacity = '';
                    phoneFields.style.pointerEvents = '';
                } else {
                    phoneFields.style.opacity = '0.5';
                    phoneFields.style.pointerEvents = 'none';
                }
            });
        }

        if (window.AltorraIcons && window.AltorraIcons.refresh) {
            window.AltorraIcons.refresh(formEl);
        }
    }

    function save2FA() {
        var user = window.auth && window.auth.currentUser;
        if (!user) return;
        var checkbox = document.getElementById('profile2FAEnabled');
        var prefixEl = document.getElementById('profile2FAPrefix');
        var phoneEl = document.getElementById('profile2FAPhone');
        var errEl = document.getElementById('profile2FAErr');
        var saveBtn = document.getElementById('profile2FASave');
        if (!checkbox || !errEl || !saveBtn) return;

        errEl.style.display = 'none';
        var enable = checkbox.checked;
        var prefix = (prefixEl && prefixEl.value) || '+57';
        var phone = (phoneEl && phoneEl.value || '').trim().replace(/\D/g, '');

        if (enable) {
            if (phone.length < 7 || phone.length > 12) {
                errEl.textContent = 'El número de celular debe tener entre 7 y 12 dígitos.';
                errEl.style.display = 'block';
                return;
            }
        }

        saveBtn.disabled = true;
        saveBtn.innerHTML = '<i data-lucide="loader-2"></i> Guardando...';

        var updates = {
            habilitado2FA: enable
        };
        if (enable) {
            updates.telefono2FA = phone;
            updates.prefijo2FA = prefix;
        }
        // Si desactiva, NO borramos telefono2FA por si quiere reactivar después.
        // Solo el flag habilitado2FA determina si se pide al login.

        window.db.collection('usuarios').doc(user.uid).update(updates).then(function () {
            // Sync local
            var profile = window.AP && window.AP.currentUserProfile;
            if (profile) {
                profile.habilitado2FA = enable;
                if (enable) {
                    profile.telefono2FA = phone;
                    profile.prefijo2FA = prefix;
                }
            }
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<i data-lucide="save"></i> Guardar';
            document.getElementById('profile2FAForm').style.display = 'none';
            refresh2FAStatus();
            if (window.notify && window.notify.success) {
                window.notify.success({
                    title: enable ? '2FA activado' : '2FA desactivado',
                    message: enable
                        ? 'Recibirás un SMS la próxima vez que inicies sesión desde un dispositivo nuevo.'
                        : 'Tu cuenta ahora se protege solo con contraseña + dispositivos de confianza.'
                });
            }
        }).catch(function (err) {
            saveBtn.disabled = false;
            saveBtn.innerHTML = '<i data-lucide="save"></i> Guardar';
            errEl.textContent = 'Error al guardar: ' + (err.message || 'desconocido') +
                (err.code === 'permission-denied' ? ' (firestore.rules pendientes de deploy)' : '');
            errEl.style.display = 'block';
            console.error('[Profile] Error guardando 2FA:', err);
        });
    }

    function bindSecurityHandlers() {
        var btnManage = document.getElementById('profile2FAManage');
        if (btnManage && !btnManage._wired) {
            btnManage._wired = true;
            btnManage.addEventListener('click', show2FAForm);
        }
        var btnCancel = document.getElementById('profile2FACancel');
        if (btnCancel && !btnCancel._wired) {
            btnCancel._wired = true;
            btnCancel.addEventListener('click', function () {
                document.getElementById('profile2FAForm').style.display = 'none';
            });
        }
        var btnSave = document.getElementById('profile2FASave');
        if (btnSave && !btnSave._wired) {
            btnSave._wired = true;
            btnSave.addEventListener('click', save2FA);
        }
    }

    // Refresh trusted devices list al entrar a perfil
    // (la función AP.renderTrustedDevices vive en admin-auth.js y opera
    // sobre los IDs #trustedDevicesList + #btnRevokeAllDevices que
    // ahora están en sec-profile en lugar de sec-settings).
    function refreshTrustedDevicesUI() {
        if (window.AP && typeof window.AP.renderTrustedDevices === 'function') {
            try { window.AP.renderTrustedDevices(); } catch (e) {}
        }
    }

    function bindRecoveryHandlers() {
        var btnGen = document.getElementById('profileBackupGenerate');
        if (btnGen && !btnGen._wired) {
            btnGen._wired = true;
            btnGen.addEventListener('click', generateAndShowBackupCodes);
        }
        var btnCopy = document.getElementById('profileBackupCopy');
        if (btnCopy && !btnCopy._wired) {
            btnCopy._wired = true;
            btnCopy.addEventListener('click', copyBackupCodes);
        }
        var btnPrint = document.getElementById('profileBackupPrint');
        if (btnPrint && !btnPrint._wired) {
            btnPrint._wired = true;
            btnPrint.addEventListener('click', printBackupCodes);
        }
        var btnDone = document.getElementById('profileBackupDone');
        if (btnDone && !btnDone._wired) {
            btnDone._wired = true;
            btnDone.addEventListener('click', hideBackupCodesDisplay);
        }
        var btnQConfig = document.getElementById('profileQuestionsConfig');
        if (btnQConfig && !btnQConfig._wired) {
            btnQConfig._wired = true;
            btnQConfig.addEventListener('click', showQuestionsConfigForm);
        }
        var btnQCancel = document.getElementById('profileQuestionsCancel');
        if (btnQCancel && !btnQCancel._wired) {
            btnQCancel._wired = true;
            btnQCancel.addEventListener('click', function () {
                document.getElementById('profileQuestionsForm').style.display = 'none';
            });
        }
        var btnQSave = document.getElementById('profileQuestionsSave');
        if (btnQSave && !btnQSave._wired) {
            btnQSave._wired = true;
            btnQSave.addEventListener('click', saveSecurityQuestions);
        }
    }

    if (window.AltorraSections && window.AltorraSections.onChange) {
        window.AltorraSections.onChange(function (section) {
            if (section === 'profile') {
                setTimeout(function () {
                    bindSecurityHandlers();
                    bindRecoveryHandlers();
                    refresh2FAStatus();
                    refreshRecoveryUI();
                    refreshTrustedDevicesUI();
                }, 100);
            }
        });
    }

    /* ─── Public API ─── */
    window.AltorraAdminProfile = {
        load: loadProfile,
        save: saveProfile,
        refreshRecoveryUI: refreshRecoveryUI
    };
})();
