/**
 * ALTORRA CARS — Admin Inbox (MF4.7)
 *
 * Unified inbox showing all mensajes/ threads. Admin can:
 *   - Browse threads (sorted by lastMessageAt desc)
 *   - Filter unread / assigned / open / closed
 *   - Open a thread → reply pane
 *   - Mark unread, mark closed
 *
 * Loaded only on admin.html.
 */
(function () {
    'use strict';
    var AP = window.AP;
    if (!AP) return;
    var $ = AP.$;

    AP.threads = [];
    AP._unsubThreads = null;
    AP._activeThread = null;

    function escTxt(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    function startThreadsListener() {
        if (!window.db) return;
        if (AP._unsubThreads) AP._unsubThreads();
        AP._unsubThreads = window.db.collection('mensajes')
            .orderBy('lastMessageAt', 'desc')
            .limit(100)
            .onSnapshot(function (snap) {
                AP.threads = snap.docs.map(function (d) {
                    return Object.assign({ _docId: d.id }, d.data());
                });
                renderInbox();
                updateInboxBadge();
            }, function (err) {
                if (window.auth && !window.auth.currentUser) return;
                console.warn('[Inbox] listener error:', err);
            });
    }

    function updateInboxBadge() {
        var unread = (AP.threads || []).reduce(function (acc, t) {
            return acc + (t.unreadByAdmin || 0);
        }, 0);
        var badge = $('navBadgeInbox');
        if (badge) badge.textContent = unread > 0 ? unread : '';
    }

    function renderInbox() {
        var listEl = $('inboxThreadList');
        var bodyEl = $('inboxThreadBody');
        if (!listEl) return;
        var threads = AP.threads || [];

        // Filter
        var filter = ($('inboxFilter') && $('inboxFilter').value) || 'all';
        var search = ($('inboxSearch') && $('inboxSearch').value || '').trim().toLowerCase();
        var filtered = threads.filter(function (t) {
            if (filter === 'unread' && !t.unreadByAdmin) return false;
            if (filter === 'open' && t.status === 'closed') return false;
            if (filter === 'closed' && t.status !== 'closed') return false;
            if (search) {
                var hay = ((t.userName || '') + ' ' + (t.userEmail || '') + ' ' + (t.vehicleTitle || '') + ' ' + (t.lastMessage || '')).toLowerCase();
                if (hay.indexOf(search) === -1) return false;
            }
            return true;
        });

        if (filtered.length === 0) {
            listEl.innerHTML = '<div class="inbox-empty">Sin mensajes</div>';
            if (bodyEl && !AP._activeThread) bodyEl.innerHTML = '<div class="inbox-empty">Selecciona un mensaje</div>';
            return;
        }

        listEl.innerHTML = filtered.map(function (t) {
            var unread = t.unreadByAdmin > 0 ? ' inbox-thread--unread' : '';
            var active = (AP._activeThread && AP._activeThread._docId === t._docId) ? ' inbox-thread--active' : '';
            var when = '';
            try { when = new Date(t.lastMessageAt).toLocaleDateString('es-CO', { day: 'numeric', month: 'short' }); } catch (_) {}
            return '<div class="inbox-thread' + unread + active + '" data-thread-id="' + escTxt(t._docId) + '">' +
                '<div class="inbox-thread-head">' +
                    '<strong>' + escTxt(t.userName || t.userEmail || 'Sin nombre') + '</strong>' +
                    '<span class="inbox-thread-when">' + escTxt(when) + '</span>' +
                '</div>' +
                '<div class="inbox-thread-vehic">' + escTxt(t.vehicleTitle || '') + '</div>' +
                '<div class="inbox-thread-snippet">' + escTxt((t.lastMessage || '').slice(0, 70)) + '</div>' +
                (t.unreadByAdmin > 0 ? '<span class="inbox-thread-badge">' + t.unreadByAdmin + '</span>' : '') +
            '</div>';
        }).join('');

        // If no active thread is open and we have threads, render header empty
        if (bodyEl && !AP._activeThread) {
            bodyEl.innerHTML = '<div class="inbox-empty">Selecciona un mensaje para ver la conversación</div>';
        }
    }

    function openThread(threadId) {
        var t = AP.threads.find(function (x) { return x._docId === threadId; });
        if (!t) return;
        AP._activeThread = t;
        renderInbox();
        renderActiveThread(t);
        // Mark as read
        if (t.unreadByAdmin > 0) {
            window.db.collection('mensajes').doc(t._docId).update({ unreadByAdmin: 0 }).catch(function () {});
        }
    }

    function renderActiveThread(t) {
        var body = $('inboxThreadBody');
        if (!body) return;
        var msgs = (t.messages || []).slice().sort(function (a, b) {
            return (a.at || '').localeCompare(b.at || '');
        });
        var msgsHtml = msgs.length ? msgs.map(function (m) {
            var cls = m.from === 'admin' ? 'inbox-msg--admin' : 'inbox-msg--client';
            var when = '';
            try { when = new Date(m.at).toLocaleString('es-CO', { dateStyle: 'short', timeStyle: 'short' }); } catch (_) {}
            return '<div class="inbox-msg ' + cls + '">' +
                '<div class="inbox-msg-text">' + escTxt(m.text) + '</div>' +
                '<div class="inbox-msg-when">' + escTxt(when) + '</div>' +
            '</div>';
        }).join('') : '<div class="inbox-empty">Sin mensajes en este hilo</div>';

        body.innerHTML =
            '<div class="inbox-thread-detail-head">' +
                '<div>' +
                    '<strong>' + escTxt(t.userName || t.userEmail) + '</strong>' +
                    '<div style="font-size:0.78rem;color:var(--admin-text-muted);">' + escTxt(t.vehicleTitle || '') + '</div>' +
                '</div>' +
                '<div>' +
                    '<button class="btn btn-sm btn-ghost" data-inbox-action="close-thread">' + (t.status === 'closed' ? 'Reabrir' : 'Cerrar') + '</button>' +
                '</div>' +
            '</div>' +
            '<div class="inbox-msgs">' + msgsHtml + '</div>' +
            '<form class="inbox-reply-form" id="inboxReplyForm">' +
                '<textarea id="inboxReplyText" rows="2" placeholder="Tu respuesta al cliente..."></textarea>' +
                '<button type="submit" class="btn btn-primary btn-sm">Enviar</button>' +
            '</form>';

        // Auto-scroll to bottom
        var msgsEl = body.querySelector('.inbox-msgs');
        if (msgsEl) msgsEl.scrollTop = msgsEl.scrollHeight;
    }

    function sendReply(text) {
        if (!AP._activeThread || !text.trim()) return Promise.reject('empty');
        var t = AP._activeThread;
        var msg = { from: 'admin', text: text.trim(), at: new Date().toISOString() };
        var msgs = (t.messages || []).slice();
        msgs.push(msg);
        return window.db.collection('mensajes').doc(t._docId).update({
            messages: msgs,
            lastMessage: msg.text.slice(0, 140),
            lastMessageAt: msg.at,
            lastMessageFrom: 'admin',
            unreadByUser: (t.unreadByUser || 0) + 1,
            unreadByAdmin: 0
        });
    }

    // Event delegation for inbox interactions
    document.addEventListener('click', function (e) {
        var thread = e.target.closest('.inbox-thread[data-thread-id]');
        if (thread) { openThread(thread.getAttribute('data-thread-id')); return; }
        var act = e.target.closest('[data-inbox-action]');
        if (act && act.dataset.inboxAction === 'close-thread' && AP._activeThread) {
            var newStatus = AP._activeThread.status === 'closed' ? 'open' : 'closed';
            window.db.collection('mensajes').doc(AP._activeThread._docId).update({ status: newStatus });
        }
    });

    document.addEventListener('input', function (e) {
        if (e.target && (e.target.id === 'inboxSearch')) {
            renderInbox();
        }
    });
    document.addEventListener('change', function (e) {
        if (e.target && e.target.id === 'inboxFilter') renderInbox();
    });

    document.addEventListener('submit', function (e) {
        if (e.target && e.target.id === 'inboxReplyForm') {
            e.preventDefault();
            var ta = document.getElementById('inboxReplyText');
            if (!ta || !ta.value.trim()) return;
            var btn = e.target.querySelector('button[type="submit"]');
            if (btn) btn.disabled = true;
            sendReply(ta.value).then(function () {
                ta.value = '';
                if (btn) btn.disabled = false;
            }).catch(function (err) {
                if (btn) btn.disabled = false;
                if (AP.toast) AP.toast('Error: ' + (err.message || err), 'error');
            });
        }
    });

    // Open Inbox section → start listener if not already
    document.addEventListener('click', function (e) {
        var navBtn = e.target.closest('[data-section="inbox"]');
        if (navBtn) {
            if (!AP._unsubThreads) startThreadsListener();
        }
    });

    // Lazy start listener as soon as we have auth
    var attempts = 0;
    var int = setInterval(function () {
        attempts++;
        if (window.auth && window.auth.currentUser && !window.auth.currentUser.isAnonymous && AP.isEditorOrAbove && AP.isEditorOrAbove()) {
            startThreadsListener();
            clearInterval(int);
        } else if (attempts > 60) {
            clearInterval(int);
        }
    }, 500);

    window.AltorraAdminInbox = { openThread: openThread, renderInbox: renderInbox };
})();
