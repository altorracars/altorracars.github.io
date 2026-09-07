/**
 * ALTORRA CARS — Solicitudes/Citas Watcher (Smart Notifications, Pillar D)
 *
 * Realtime listener for the user's own solicitudes/citas. Detects changes
 * to `estado` and emits to the notification center as 'request_update'
 * or 'appointment_update' (when the doc has `requiereCita: true`).
 *
 * Storage:
 *   localStorage.altorra_sol_baseline_<uid> = {
 *       <solicitudId>: { estado, observacionesHash, requiereCita },
 *       ...
 *   }
 *
 * Lifecycle:
 *   start(user)      — bind onSnapshot listener for solicitudes by email
 *   stop()           — unsubscribe + clear in-memory state (NOT localStorage)
 *
 * Anti-patterns prevented:
 *   - Initial snapshot floods bell: first run only establishes baseline
 *     (or compares to localStorage baseline if returning user)
 *   - Listener runs while tab hidden → cost: pause via visibilitychange
 *   - Race between auth state changes: uid guard rejects late callbacks
 *   - Permission-denied on logout: stop listener BEFORE signOut elsewhere
 *   - Anonymous users: skip entirely (no email match anyway)
 */
(function () {
    'use strict';

    if (window.AltorraSolWatcher) return;

    var DEBUG = false;
    var BASELINE_PREFIX = 'altorra_sol_baseline_';
    var SUPPORTED_ESTADOS = ['pendiente', 'contactado', 'completado', 'rechazado',
        'confirmada', 'cancelada', 'reprogramada', 'pasada'];

    function log() {
        if (!DEBUG) return;
        try {
            var args = Array.prototype.slice.call(arguments);
            console.log.apply(console, ['[SolWatcher]'].concat(args));
        } catch (e) {}
    }

    function baselineKey(uid) { return BASELINE_PREFIX + (uid || ''); }

    function readBaseline(uid) {
        try {
            var raw = localStorage.getItem(baselineKey(uid));
            if (!raw) return {};
            var p = JSON.parse(raw);
            return (p && typeof p === 'object') ? p : {};
        } catch (e) { return {}; }
    }
    function writeBaseline(uid, map) {
        try { localStorage.setItem(baselineKey(uid), JSON.stringify(map)); }
        catch (e) {}
    }

    function shortHash(s) {
        if (!s) return '';
        // Tiny non-cryptographic hash so a long admin observation
        // doesn't bloat localStorage; we only care about change detection
        var h = 0, i;
        for (i = 0; i < s.length; i++) {
            h = ((h << 5) - h) + s.charCodeAt(i);
            h |= 0;
        }
        return String(h);
    }

    var ESTADO_LABEL = {
        pendiente: 'pendiente',
        contactado: 'recibida por un asesor',
        completado: 'completada',
        rechazado: 'rechazada',
        confirmada: 'confirmada',
        cancelada: 'cancelada',
        reprogramada: 'reprogramada',
        pasada: 'pasada'
    };

    function buildPayloadForRequest(d, oldEstado, newEstado) {
        var vehiculo = d.vehiculo || (d.datosExtra && d.datosExtra.vehiculo) || 'tu solicitud';
        var label = ESTADO_LABEL[newEstado] || newEstado;
        var msg = '';
        if (newEstado === 'contactado') msg = 'Un asesor recibio tu solicitud y te contactara pronto.';
        else if (newEstado === 'completado') msg = 'Tu solicitud fue marcada como completada. Gracias!';
        else if (newEstado === 'rechazado') msg = (d.observaciones || 'No fue posible procesar tu solicitud.');
        else msg = 'Estado actualizado.';
        return {
            category: 'request_update',
            title: 'Tu solicitud esta ' + label,
            message: vehiculo + ' — ' + msg,
            link: 'perfil.html#mis-solicitudes',
            entityRef: 'solicitud:' + d.id
        };
    }

    function buildPayloadForAppointment(d, oldEstado, newEstado) {
        var vehiculo = d.vehiculo || (d.datosExtra && d.datosExtra.vehiculo) || 'tu cita';
        var label = ESTADO_LABEL[newEstado] || newEstado;
        var msg = '';
        if (newEstado === 'confirmada') msg = 'Te esperamos en la fecha acordada.';
        else if (newEstado === 'reprogramada') msg = (d.observaciones || 'Se cambio la fecha. Revisa los detalles.');
        else if (newEstado === 'cancelada') msg = 'La cita fue cancelada.';
        else if (newEstado === 'completado') msg = 'Cita completada. Gracias por venir!';
        else msg = 'Estado actualizado.';
        return {
            category: 'appointment_update',
            title: 'Tu cita esta ' + label,
            message: vehiculo + ' — ' + msg,
            link: 'perfil.html#mis-citas',
            entityRef: 'cita:' + d.id
        };
    }

    var _state = {
        user: null,
        unsub: null,
        baseline: {},     // {id: {estado, observacionesHash, requiereCita}}
        firstSnapshot: true,
        visibilityHandlerBound: false
    };

    function applyDoc(d) {
        return {
            estado: d.estado || 'pendiente',
            observacionesHash: shortHash(d.observaciones || ''),
            requiereCita: !!d.requiereCita
        };
    }

    function processSnapshot(snapshot) {
        if (!_state.user) return;
        var emissions = [];
        var idsInThisSnapshot = {};

        // Use docChanges() so we only react to actual changes from Firestore,
        // not to every full snapshot replay. Two parallel listeners
        // (by userId + by email) may each fire — dedup by doc id.
        snapshot.docChanges().forEach(function (change) {
            var d = change.doc.data();
            d.id = change.doc.id;
            idsInThisSnapshot[d.id] = true;

            // Only support known states (skip drafts or unexpected values)
            if (SUPPORTED_ESTADOS.indexOf(d.estado) === -1) return;

            // Cross-listener dedup: track docId → last fingerprint we processed
            var snap = applyDoc(d);
            var prev = _state.baseline[d.id];

            // Skip if we just processed this exact state for this doc
            if (prev && prev.estado === snap.estado
                && prev.observacionesHash === snap.observacionesHash) {
                return;
            }

            // Update baseline (additive — never clobber other listener's data)
            _state.baseline[d.id] = snap;

            if (!prev) {
                // First time we see this doc — baseline only, never emit on create
                return;
            }
            // Estado change is the signal we care about
            if (prev.estado !== snap.estado) {
                emissions.push({
                    isCita: snap.requiereCita,
                    doc: d,
                    oldEstado: prev.estado,
                    newEstado: snap.estado
                });
            }
            // observaciones change without estado change — admin replied
            else if (prev.observacionesHash !== snap.observacionesHash && d.observaciones) {
                emissions.push({
                    isCita: snap.requiereCita,
                    doc: d,
                    oldEstado: prev.estado,
                    newEstado: snap.estado,
                    observationsOnly: true
                });
            }
        });

        if (_state.user && _state.user.uid) writeBaseline(_state.user.uid, _state.baseline);

        if (_state.firstSnapshot) {
            _state.firstSnapshot = false;
            log('Baseline established (' + Object.keys(_state.baseline).length + ' docs)');
            return;
        }

        // Emit
        if (!window.notifyCenter || typeof window.notifyCenter.notify !== 'function') {
            log('notifyCenter not available, skipping', emissions.length, 'emissions');
            return;
        }
        emissions.forEach(function (e) {
            try {
                var payload;
                if (e.isCita) {
                    payload = buildPayloadForAppointment(e.doc, e.oldEstado, e.newEstado);
                } else {
                    payload = buildPayloadForRequest(e.doc, e.oldEstado, e.newEstado);
                }
                if (e.observationsOnly) {
                    payload.title = 'Tienes una respuesta en ' + (e.isCita ? 'tu cita' : 'tu solicitud');
                    payload.message = (e.doc.observaciones || '').slice(0, 140);
                }
                window.notifyCenter.notify(payload.category, payload);
            } catch (err) {
                log('emit error', err);
            }
        });
    }

    function start(user) {
        if (!user || user.isAnonymous) return false;
        // Need at least one identifier — prefer userId (set by MF1.1 in forms),
        // fall back to email for legacy docs that don't have userId yet
        if (!user.uid && !user.email) {
            log('No uid or email on user, skipping');
            return false;
        }
        if (!window.db || typeof window.db.collection !== 'function') {
            log('Firestore not ready, retry later');
            return false;
        }
        if (_state.user && _state.user.uid === user.uid && _state.unsub) {
            log('Already started for', user.uid);
            return true;
        }
        stop();

        _state.user = user;
        _state.baseline = readBaseline(user.uid);
        _state.firstSnapshot = Object.keys(_state.baseline).length === 0;
        // If we have a baseline (returning user), the first snapshot will
        // diff against it and emit any changes that happened while offline

        try {
            // MF1.1 — Two parallel listeners: one filtered by userId (post-MF1.1
            // submissions, reliable) and one by email (legacy docs without userId).
            // processSnapshot dedups by docSnap.id internally so the same doc
            // matched by both filters won't double-emit. The listeners produce a
            // unified `_state.baseline` map keyed by doc id.
            _state.unsubs = [];
            _state.snapshotsReceived = 0;
            _state.expectedSnapshots = 0;

            var attach = function (q, label) {
                _state.expectedSnapshots++;
                var unsub = q.onSnapshot(function (snap) {
                    processSnapshot(snap);
                }, function (err) {
                    if (window.auth && !window.auth.currentUser) return;
                    log('listener error (' + label + '):', err.message || err);
                });
                _state.unsubs.push(unsub);
            };

            attach(window.db.collection('solicitudes').where('userId', '==', user.uid), 'by-uid');
            if (user.email) {
                attach(window.db.collection('solicitudes').where('email', '==', user.email), 'by-email');
            }
            // Single-unsub compat field
            _state.unsub = function () {
                (_state.unsubs || []).forEach(function (u) { try { u(); } catch (e) {} });
                _state.unsubs = [];
            };
            log('Started for uid', user.uid, 'email', user.email);
        } catch (e) {
            log('start exception:', e);
            return false;
        }

        // Pause listeners when tab hidden — Firestore charges for active
        // listeners even when not visible. Resume on visibilitychange.
        if (!_state.visibilityHandlerBound) {
            _state.visibilityHandlerBound = true;
            document.addEventListener('visibilitychange', function () {
                if (!_state.user) return;
                if (document.hidden) {
                    if (_state.unsubs && _state.unsubs.length) {
                        _state.unsubs.forEach(function (u) { try { u(); } catch (e) {} });
                        _state.unsubs = [];
                        log('Paused (tab hidden)');
                    }
                } else {
                    if ((!_state.unsubs || !_state.unsubs.length) && _state.user) {
                        // Resume — re-attach BOTH listeners (uid + email)
                        var u = _state.user;
                        var attachR = function (q, label) {
                            return q.onSnapshot(processSnapshot, function (err) {
                                if (window.auth && !window.auth.currentUser) return;
                                log('listener error resumed (' + label + '):', err.message || err);
                            });
                        };
                        _state.unsubs = [];
                        _state.unsubs.push(attachR(
                            window.db.collection('solicitudes').where('userId', '==', u.uid), 'by-uid'
                        ));
                        if (u.email) {
                            _state.unsubs.push(attachR(
                                window.db.collection('solicitudes').where('email', '==', u.email), 'by-email'
                            ));
                        }
                        log('Resumed (tab visible)');
                    }
                }
            });
        }

        return true;
    }

    function stop() {
        // MF1.1 — multiple listeners (userId + email)
        if (_state.unsubs && _state.unsubs.length) {
            _state.unsubs.forEach(function (u) { try { u(); } catch (e) {} });
            _state.unsubs = [];
        }
        if (_state.unsub && typeof _state.unsub === 'function') {
            try { _state.unsub(); } catch (e) {}
        }
        _state.unsub = null;
        _state.user = null;
        _state.baseline = {};
        _state.firstSnapshot = true;
    }

    window.AltorraSolWatcher = {
        start: start,
        stop: stop,
        _state: _state,
        _setDebug: function (b) { DEBUG = !!b; }
    };
})();
