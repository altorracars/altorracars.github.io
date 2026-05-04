/**
 * ALTORRA CARS — Scheduled follow-ups (MF6.2)
 *
 * Admin can mark a comm "Recordame en X" — creates a follow-up task.
 * On the scheduled time, admin gets a notification.
 * Stored in config/followups/{id} or per-user usuarios/{uid}/followups.
 *
 * Client-side scheduler: checks every minute against current time.
 */
(function () {
    'use strict';
    var AP = window.AP;
    if (!AP) return;
    var $ = AP.$;

    AP.followups = [];

    function startListener() {
        if (!window.db || !window.auth.currentUser) return;
        if (AP._unsubFollowups) AP._unsubFollowups();
        AP._unsubFollowups = window.db.collection('config').doc('followups').onSnapshot(function (doc) {
            var data = doc.exists ? doc.data() : {};
            AP.followups = (data.items || []);
            checkPending();
        }, function () {});
    }

    function checkPending() {
        if (!AP.followups || !AP.followups.length) return;
        var now = Date.now();
        var triggered = [];
        AP.followups.forEach(function (fu) {
            if (fu.notified) return;
            if (fu.assignedTo && fu.assignedTo !== window.auth.currentUser.uid) return;
            if (new Date(fu.dueAt).getTime() <= now) {
                triggered.push(fu);
            }
        });
        if (triggered.length === 0) return;
        triggered.forEach(function (fu) {
            if (window.notifyCenter && window.notifyCenter.notify) {
                window.notifyCenter.notify('system', {
                    title: 'Recordatorio: ' + fu.label,
                    message: fu.notes || '—',
                    link: 'admin.html#solicitudes',
                    entityRef: 'followup:' + fu.id,
                    priority: 'high'
                });
            }
        });
        // Mark as notified (best-effort — only super_admin to avoid race)
        if (AP.isSuperAdmin && AP.isSuperAdmin()) {
            var updated = AP.followups.map(function (fu) {
                return triggered.indexOf(fu) !== -1 ? Object.assign({}, fu, { notified: true }) : fu;
            });
            window.db.collection('config').doc('followups').set({ items: updated }, { merge: true });
        }
    }

    /** Public API: schedule a follow-up */
    function schedule(label, dueAt, notes, assignedTo, relatedDocId) {
        if (!window.db) return Promise.reject('no-db');
        var fu = {
            id: 'fu_' + Date.now() + '_' + Math.random().toString(36).slice(2, 7),
            label: label,
            notes: notes || '',
            dueAt: typeof dueAt === 'string' ? dueAt : new Date(dueAt).toISOString(),
            assignedTo: assignedTo || (window.auth.currentUser && window.auth.currentUser.uid),
            relatedDocId: relatedDocId || null,
            createdBy: window.auth.currentUser.email,
            createdAt: new Date().toISOString(),
            notified: false
        };
        var ref = window.db.collection('config').doc('followups');
        return ref.get().then(function (doc) {
            var items = (doc.exists && doc.data().items) || [];
            items.push(fu);
            return ref.set({ items: items }, { merge: true });
        });
    }
    AP.scheduleFollowup = schedule;

    // Polling — start when admin authenticates
    var attempts = 0;
    var int = setInterval(function () {
        attempts++;
        if (window.auth && window.auth.currentUser && AP.isEditorOrAbove && AP.isEditorOrAbove()) {
            startListener();
            // Check pending periodically
            setInterval(checkPending, 60 * 1000);
            clearInterval(int);
        } else if (attempts > 60) clearInterval(int);
    }, 500);

    // Add a UI hook in the manage modal
    document.addEventListener('click', function (e) {
        var btn = e.target.closest('[data-action="schedule-followup"]');
        if (!btn) return;
        var docId = $('amDocId') ? $('amDocId').value : null;
        var hours = prompt('¿En cuántas horas quieres el recordatorio?', '24');
        if (!hours) return;
        var h = parseInt(hours, 10);
        if (isNaN(h) || h <= 0) {
            if (AP.toast) AP.toast('Valor inválido', 'error');
            return;
        }
        var dueAt = new Date(Date.now() + h * 3600000);
        var label = prompt('Etiqueta corta del recordatorio:', 'Seguimiento');
        if (!label) return;
        schedule(label, dueAt, '', null, docId).then(function () {
            if (AP.toast) AP.toast('Recordatorio en ' + h + 'h: ' + label);
        }).catch(function (err) {
            if (AP.toast) AP.toast('Error: ' + (err.message || err), 'error');
        });
    });

    window.AltorraFollowups = { schedule: schedule, list: function () { return AP.followups; } };
})();
