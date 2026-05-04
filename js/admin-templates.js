/**
 * ALTORRA CARS — Email/message templates CRUD (MF6.3)
 *
 * Templates stored in config/messageTemplates with admin CRUD UI.
 * Variables interpoladas: {{nombre}}, {{vehiculo}}, {{fecha}},
 * {{hora}}, {{tipo}}, {{ticket}}.
 *
 * Templates are used by:
 * - admin-appointments.js manage modal (MF3.6 already wires inline)
 * - future Cloud Function for outbound emails
 */
(function () {
    'use strict';
    var AP = window.AP;
    if (!AP) return;
    var $ = AP.$;

    AP.messageTemplates = [];
    AP._unsubTemplates = null;

    function startListener() {
        if (AP._unsubTemplates) AP._unsubTemplates();
        AP._unsubTemplates = window.db.collection('config').doc('messageTemplates').onSnapshot(function (doc) {
            var data = doc.exists ? doc.data() : {};
            AP.messageTemplates = (data.items || []);
            renderTemplatesUI();
        }, function () {});
    }

    function escTxt(s) { var d = document.createElement('div'); d.textContent = s == null ? '' : s; return d.innerHTML; }

    function renderTemplatesUI() {
        var container = document.getElementById('messageTemplatesList');
        if (!container) return;
        var items = AP.messageTemplates || [];
        if (!items.length) {
            container.innerHTML = '<div class="table-empty">Sin plantillas. Crea la primera abajo.</div>';
            return;
        }
        container.innerHTML = items.map(function (t) {
            return '<div class="msg-template">' +
                '<div class="msg-template-head">' +
                    '<strong>' + escTxt(t.label) + '</strong>' +
                    '<span class="msg-template-tag">' + escTxt(t.kind || 'general') + '</span>' +
                    '<button class="btn btn-sm btn-ghost" data-tpl-action="delete" data-tpl-id="' + escTxt(t.id) + '">Borrar</button>' +
                '</div>' +
                '<div class="msg-template-text">' + escTxt(t.text) + '</div>' +
            '</div>';
        }).join('');
    }

    function addTemplate(label, text, kind) {
        if (!window.db) return Promise.reject('no-db');
        var t = {
            id: 'tpl_' + Date.now() + '_' + Math.random().toString(36).slice(2, 6),
            label: label,
            text: text,
            kind: kind || 'general',
            createdAt: new Date().toISOString(),
            createdBy: window.auth.currentUser.email
        };
        var ref = window.db.collection('config').doc('messageTemplates');
        return ref.get().then(function (doc) {
            var items = (doc.exists && doc.data().items) || [];
            items.push(t);
            return ref.set({ items: items }, { merge: true });
        });
    }

    function deleteTemplate(id) {
        var ref = window.db.collection('config').doc('messageTemplates');
        return ref.get().then(function (doc) {
            var items = (doc.exists && doc.data().items) || [];
            items = items.filter(function (t) { return t.id !== id; });
            return ref.set({ items: items }, { merge: true });
        });
    }

    document.addEventListener('click', function (e) {
        var add = e.target.closest('#tplAddBtn');
        if (add) {
            var labelEl = $('tplNewLabel');
            var textEl = $('tplNewText');
            var kindEl = $('tplNewKind');
            if (!labelEl.value.trim() || !textEl.value.trim()) {
                if (AP.toast) AP.toast('Completá etiqueta y texto', 'error');
                return;
            }
            addTemplate(labelEl.value.trim(), textEl.value.trim(), kindEl.value).then(function () {
                labelEl.value = ''; textEl.value = '';
                if (AP.toast) AP.toast('Plantilla agregada');
            }).catch(function (err) {
                if (AP.toast) AP.toast('Error: ' + (err.message || err), 'error');
            });
        }
        var del = e.target.closest('[data-tpl-action="delete"]');
        if (del) {
            if (!confirm('¿Borrar plantilla?')) return;
            deleteTemplate(del.getAttribute('data-tpl-id')).then(function () {
                if (AP.toast) AP.toast('Plantilla borrada');
            });
        }
    });

    var attempts = 0;
    var int = setInterval(function () {
        attempts++;
        if (window.auth && window.auth.currentUser && AP.isEditorOrAbove && AP.isEditorOrAbove()) {
            startListener();
            clearInterval(int);
        } else if (attempts > 60) clearInterval(int);
    }, 500);

    AP.getMessageTemplates = function () { return AP.messageTemplates || []; };

    window.AltorraTemplates = {
        list: function () { return AP.messageTemplates; },
        add: addTemplate,
        delete: deleteTemplate
    };
})();
