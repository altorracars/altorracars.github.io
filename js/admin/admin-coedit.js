/**
 * ALTORRA CARS — Co-edit locks blandos (Mega-Plan v4, Microfase M.2)
 * ====================================================================
 * Cuando un admin abre un modal de edición de un entity (vehículo,
 * contacto, comm, kb), se escribe un "lock" en `coediting/{entityKey}`
 * con su uid + timestamp. Otros admins viendo el mismo entity reciben
 * un badge "Daniel está editando esto" + (opcional) warning antes de
 * sobreescribir.
 *
 * No bloquea ediciones (último write gana, optimistic locking en
 * vehiculos via _version sigue siendo source of truth). Solo informa.
 *
 * Schema `coediting/{entityType_entityId}`:
 *   {
 *     entityType: 'vehicle' | 'contact' | 'comm' | 'kb',
 *     entityId: string,
 *     editorUid: string,
 *     editorNombre: string,
 *     startedAt: timestamp,
 *     heartbeat: timestamp     // updated cada 15s mientras está abierto
 *   }
 *
 * TTL: 60 segundos sin heartbeat → considera lock expirado.
 *
 * Public API:
 *   AltorraCoedit.lock(entityType, entityId)    → start lock + heartbeat
 *   AltorraCoedit.unlock(entityType, entityId)
 *   AltorraCoedit.observe(entityType, entityId, callback)
 *     → subscribe a quién más está editando
 */
(function () {
    'use strict';
    if (window.AltorraCoedit) return;
    var AP = window.AP;
    if (!AP) return;

    var HEARTBEAT_MS = 15000;
    var LOCK_TTL_MS = 60000;
    var _activeLocks = {}; // { 'vehicle:123': { ref, heartbeat } }

    function key(entityType, entityId) {
        return entityType + ':' + String(entityId).replace(/\//g, '_');
    }

    /* ═══════════════════════════════════════════════════════════
       LOCK
       ═══════════════════════════════════════════════════════════ */
    function lock(entityType, entityId) {
        if (!window.db || !window.auth || !window.auth.currentUser) return;
        if (!entityType || !entityId) return;
        var k = key(entityType, entityId);
        if (_activeLocks[k]) return; // ya tenemos este lock

        var data = {
            entityType: entityType,
            entityId: String(entityId),
            editorUid: window.auth.currentUser.uid,
            editorNombre: (AP.currentUserProfile && AP.currentUserProfile.nombre) || window.auth.currentUser.email,
            editorEmail: window.auth.currentUser.email,
            startedAt: new Date().toISOString(),
            heartbeat: new Date().toISOString()
        };
        var ref = window.db.collection('coediting').doc(k);
        ref.set(data).catch(function () {});

        // Heartbeat
        var heartbeatId = setInterval(function () {
            ref.update({ heartbeat: new Date().toISOString() }).catch(function () {});
        }, HEARTBEAT_MS);

        _activeLocks[k] = { ref: ref, heartbeat: heartbeatId };

        // Cleanup en window unload
        if (!window._coeditUnloadAttached) {
            window._coeditUnloadAttached = true;
            window.addEventListener('beforeunload', function () {
                Object.keys(_activeLocks).forEach(function (k) {
                    try { _activeLocks[k].ref.delete(); } catch (e) {}
                });
            });
        }
    }

    function unlock(entityType, entityId) {
        var k = key(entityType, entityId);
        var entry = _activeLocks[k];
        if (!entry) return;
        clearInterval(entry.heartbeat);
        entry.ref.delete().catch(function () {});
        delete _activeLocks[k];
    }

    function unlockAll() {
        Object.keys(_activeLocks).forEach(function (k) {
            var entry = _activeLocks[k];
            clearInterval(entry.heartbeat);
            entry.ref.delete().catch(function () {});
        });
        _activeLocks = {};
    }

    /* ═══════════════════════════════════════════════════════════
       OBSERVE — quién más está editando
       ═══════════════════════════════════════════════════════════ */
    function observe(entityType, entityId, callback) {
        if (!window.db) return function () {};
        var k = key(entityType, entityId);
        var ref = window.db.collection('coediting').doc(k);
        var unsub = ref.onSnapshot(function (doc) {
            if (!doc.exists) {
                callback(null);
                return;
            }
            var data = doc.data();
            // Excluir mí mismo
            if (data.editorUid === window.auth.currentUser.uid) {
                callback(null);
                return;
            }
            // Verificar TTL
            var hbTime = new Date(data.heartbeat).getTime();
            if (Date.now() - hbTime > LOCK_TTL_MS) {
                callback(null);
                return;
            }
            callback(data);
        }, function () { callback(null); });
        return unsub;
    }

    /* ═══════════════════════════════════════════════════════════
       AUTO-INSTRUMENTACIÓN
       Hook a apertura de modales conocidos. Cada uno publica
       un lock al abrir y lo libera al cerrar.
       ═══════════════════════════════════════════════════════════ */
    function watchModal(modalSelector, getEntityType, getEntityId, lockBadgeContainer) {
        var modal = document.querySelector(modalSelector);
        if (!modal) return;
        // Observa attribute changes (display) y ajusta lock
        var obs = new MutationObserver(function () {
            var visible = modal.style.display !== 'none' && modal.offsetParent !== null;
            var entityType = getEntityType();
            var entityId = getEntityId();
            if (visible && entityType && entityId) {
                lock(entityType, entityId);
                attachLockBadge(modal, entityType, entityId, lockBadgeContainer);
            } else {
                if (entityType && entityId) {
                    unlock(entityType, entityId);
                    detachLockBadge(modal);
                }
            }
        });
        obs.observe(modal, { attributes: true, attributeFilter: ['style', 'class'] });
    }

    function attachLockBadge(modal, entityType, entityId, containerSelector) {
        // Prevenir duplicados
        var existing = modal.querySelector('.coedit-badge-host');
        if (existing) existing.remove();

        var host = document.createElement('div');
        host.className = 'coedit-badge-host';
        host.id = 'coeditBadgeHost-' + key(entityType, entityId);

        // Insertar al inicio del modal-body o el primer container interno
        var insertTarget = containerSelector ? modal.querySelector(containerSelector) : null;
        if (!insertTarget) {
            insertTarget = modal.querySelector('.modal-body, .modal-container, .alt-modal');
        }
        if (insertTarget) {
            insertTarget.insertBefore(host, insertTarget.firstChild);
        } else {
            modal.insertBefore(host, modal.firstChild);
        }

        var unsub = observe(entityType, entityId, function (lockInfo) {
            if (!lockInfo) {
                host.style.display = 'none';
                host.innerHTML = '';
                return;
            }
            host.style.display = '';
            var initials = (lockInfo.editorNombre || lockInfo.editorEmail || '?')
                .split(' ').map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase();
            host.innerHTML =
                '<div class="coedit-badge">' +
                    '<div class="coedit-badge-avatar">' + escTxt(initials) + '</div>' +
                    '<div class="coedit-badge-text">' +
                        '<strong>' + escTxt(lockInfo.editorNombre || lockInfo.editorEmail) + '</strong>' +
                        ' está editando esto.' +
                        ' <span class="coedit-badge-warning">Tus cambios pueden colisionar.</span>' +
                    '</div>' +
                '</div>';
        });
        host._unsub = unsub;
    }

    function detachLockBadge(modal) {
        var hosts = modal.querySelectorAll('.coedit-badge-host');
        hosts.forEach(function (h) {
            if (h._unsub) try { h._unsub(); } catch (e) {}
            h.remove();
        });
    }

    function escTxt(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    /* ═══════════════════════════════════════════════════════════
       INIT — instrumentar modales conocidos
       ═══════════════════════════════════════════════════════════ */
    function init() {
        // Modal de vehículo
        watchModal('#vehicleModal', function () { return 'vehicle'; }, function () {
            var input = document.getElementById('vId');
            return input && input.value ? input.value : null;
        });
        // Modal de gestión de comunicación
        watchModal('#appointmentManagerModal', function () { return 'comm'; }, function () {
            var hidden = document.getElementById('amDocId') || document.querySelector('[data-app-doc-id]');
            return hidden ? hidden.value || hidden.getAttribute('data-app-doc-id') : null;
        });

        // Cleanup al cerrar sesión / unload
        if (window.AltorraEventBus) {
            window.AltorraEventBus.on('user.logged-out', function () {
                unlockAll();
            });
        }
    }
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraCoedit = {
        lock: lock,
        unlock: unlock,
        unlockAll: unlockAll,
        observe: observe,
        _activeLocks: function () { return Object.keys(_activeLocks); }
    };
})();
