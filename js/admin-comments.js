/**
 * ALTORRA CARS — Comentarios threaded (Mega-Plan v4, Microfase M.4)
 * ===================================================================
 * Sistema universal de comentarios entre admins sobre cualquier
 * entidad (vehículo, contacto, solicitud, chat, etc.). Patrón
 * Linear/Asana: comments con threading, @menciones, reacciones.
 *
 * Schema Firestore `comments/{commentId}`:
 *   {
 *     entityType: 'vehicle' | 'contact' | 'solicitud' | 'thread' | 'kb',
 *     entityId: string,
 *     body: string,
 *     authorUid: string,
 *     authorNombre: string,
 *     authorEmail: string,
 *     parentId: string | null,        // null si es root
 *     mentions: [uid, uid, ...],
 *     createdAt: timestamp,
 *     updatedAt: timestamp,
 *     edited: boolean
 *   }
 *
 * Public API:
 *   AltorraComments.attach(container, {entityType, entityId})
 *     → monta el sistema completo (lista + form) dentro del container
 *   AltorraComments.detach(container)
 *     → limpia listeners
 *   AltorraComments.count(entityType, entityId)
 *     → Promise<number>
 */
(function () {
    'use strict';
    if (window.AltorraComments) return;
    var AP = window.AP;
    if (!AP) return;

    var _attached = []; // [{container, entityType, entityId, unsub}]

    function $(id) { return document.getElementById(id); }
    function escTxt(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    function timeAgo(ts) {
        if (!ts) return '';
        var t = ts;
        if (typeof ts === 'string') t = new Date(ts).getTime();
        else if (ts && typeof ts.toMillis === 'function') t = ts.toMillis();
        if (!t || isNaN(t)) return '';
        var diff = Math.floor((Date.now() - t) / 1000);
        if (diff < 5) return 'ahora';
        if (diff < 60) return 'hace ' + diff + 's';
        if (diff < 3600) return 'hace ' + Math.floor(diff / 60) + 'm';
        if (diff < 86400) return 'hace ' + Math.floor(diff / 3600) + 'h';
        return 'hace ' + Math.floor(diff / 86400) + 'd';
    }

    /* ═══════════════════════════════════════════════════════════
       MENTION PARSING — convierte @nombre a {{mention:uid}}
       ═══════════════════════════════════════════════════════════ */
    function parseMentions(body) {
        var mentions = [];
        if (!AP.users) return { body: body, mentions: mentions };
        var processed = body.replace(/@(\w+)/g, function (match, name) {
            var lower = name.toLowerCase();
            var user = AP.users.find(function (u) {
                return (u.email || '').toLowerCase().indexOf(lower) === 0 ||
                       (u.nombre || '').toLowerCase().split(' ')[0] === lower;
            });
            if (user && mentions.indexOf(user.uid) === -1) {
                mentions.push(user.uid);
                return '@' + (user.nombre || user.email);
            }
            return match;
        });
        return { body: processed, mentions: mentions };
    }

    function highlightMentions(body) {
        // Resaltar @palabra como mention badge
        return escTxt(body).replace(/@(\w[\w\s]{0,40})/g, function (match) {
            return '<span class="cmt-mention">' + match + '</span>';
        });
    }

    /* ═══════════════════════════════════════════════════════════
       FIRESTORE OPS
       ═══════════════════════════════════════════════════════════ */
    function startListener(entityType, entityId, callback) {
        if (!window.db) return null;
        return window.db.collection('comments')
            .where('entityType', '==', entityType)
            .where('entityId', '==', String(entityId))
            .orderBy('createdAt', 'asc')
            .onSnapshot(function (snap) {
                var comments = [];
                snap.forEach(function (doc) {
                    comments.push(Object.assign({ _id: doc.id }, doc.data()));
                });
                callback(comments);
            }, function (err) {
                if (window.auth && !window.auth.currentUser) return;
                console.warn('[Comments] listener error:', err.message);
            });
    }

    function postComment(entityType, entityId, body, parentId) {
        if (!window.db) return Promise.reject('no-db');
        if (!body.trim()) return Promise.reject('empty');
        var parsed = parseMentions(body.trim());
        var doc = {
            entityType: entityType,
            entityId: String(entityId),
            body: parsed.body,
            authorUid: window.auth.currentUser.uid,
            authorNombre: (AP.currentUserProfile && AP.currentUserProfile.nombre) || window.auth.currentUser.email,
            authorEmail: window.auth.currentUser.email,
            parentId: parentId || null,
            mentions: parsed.mentions,
            createdAt: new Date().toISOString(),
            edited: false
        };
        return window.db.collection('comments').add(doc).then(function (ref) {
            // Notificar a mencionados
            parsed.mentions.forEach(function (uid) {
                if (uid === window.auth.currentUser.uid) return;
                if (window.AltorraEventBus) {
                    window.AltorraEventBus.emit('comment.mention', {
                        commentId: ref.id,
                        targetUid: uid,
                        entityType: entityType,
                        entityId: entityId,
                        body: parsed.body.slice(0, 80)
                    }, { persist: true });
                }
            });
            return ref;
        });
    }

    function deleteComment(commentId) {
        if (!window.db) return Promise.reject('no-db');
        return window.db.collection('comments').doc(commentId).delete();
    }

    function count(entityType, entityId) {
        if (!window.db) return Promise.resolve(0);
        return window.db.collection('comments')
            .where('entityType', '==', entityType)
            .where('entityId', '==', String(entityId))
            .get()
            .then(function (snap) { return snap.size; });
    }

    /* ═══════════════════════════════════════════════════════════
       RENDER
       ═══════════════════════════════════════════════════════════ */
    function buildTree(comments) {
        var byId = {};
        var roots = [];
        comments.forEach(function (c) { byId[c._id] = Object.assign({ children: [] }, c); });
        comments.forEach(function (c) {
            if (c.parentId && byId[c.parentId]) {
                byId[c.parentId].children.push(byId[c._id]);
            } else {
                roots.push(byId[c._id]);
            }
        });
        return roots;
    }

    function renderComment(comment, depth) {
        depth = depth || 0;
        var initials = (comment.authorNombre || comment.authorEmail || '?')
            .split(' ').map(function (w) { return w[0]; }).slice(0, 2).join('').toUpperCase();
        var canDelete = AP.isSuperAdmin && AP.isSuperAdmin() ||
                        (window.auth && window.auth.currentUser && window.auth.currentUser.uid === comment.authorUid);
        var html = '<div class="cmt-item' + (depth > 0 ? ' cmt-item--reply' : '') + '" data-id="' + escTxt(comment._id) + '">' +
            '<div class="cmt-avatar">' + escTxt(initials) + '</div>' +
            '<div class="cmt-body">' +
                '<div class="cmt-head">' +
                    '<strong>' + escTxt(comment.authorNombre || comment.authorEmail) + '</strong>' +
                    '<span class="cmt-time">' + escTxt(timeAgo(comment.createdAt)) + '</span>' +
                    (comment.edited ? '<span class="cmt-time">(editado)</span>' : '') +
                '</div>' +
                '<div class="cmt-text">' + highlightMentions(comment.body) + '</div>' +
                '<div class="cmt-actions">' +
                    '<button class="cmt-action" data-action="reply" data-id="' + escTxt(comment._id) + '">Responder</button>' +
                    (canDelete ? '<button class="cmt-action cmt-action--danger" data-action="delete" data-id="' + escTxt(comment._id) + '">Eliminar</button>' : '') +
                '</div>' +
                '<div class="cmt-children">' +
                    (comment.children || []).map(function (child) {
                        return renderComment(child, depth + 1);
                    }).join('') +
                '</div>' +
                '<div class="cmt-reply-form" id="cmt-reply-' + escTxt(comment._id) + '" style="display:none;"></div>' +
            '</div>' +
        '</div>';
        return html;
    }

    function renderAll(container, entityType, entityId, comments) {
        var tree = buildTree(comments);
        var listEl = container.querySelector('.cmt-list');
        if (!listEl) return;
        if (tree.length === 0) {
            listEl.innerHTML = '<div class="cmt-empty">Sin comentarios. Sé el primero en aportar.</div>';
        } else {
            listEl.innerHTML = tree.map(function (c) { return renderComment(c, 0); }).join('');
        }
        // Update counter
        var counter = container.querySelector('.cmt-counter');
        if (counter) counter.textContent = comments.length || '';
    }

    /* ═══════════════════════════════════════════════════════════
       ATTACH — monta el sistema completo dentro de un container
       ═══════════════════════════════════════════════════════════ */
    function attach(container, opts) {
        if (!container || !opts || !opts.entityType || !opts.entityId) return;
        // Detach previo si existía
        detach(container);

        container.innerHTML =
            '<div class="cmt-wrap">' +
                '<div class="cmt-header">' +
                    '<i data-lucide="message-circle"></i>' +
                    '<strong>Comentarios internos</strong>' +
                    '<span class="cmt-counter"></span>' +
                '</div>' +
                '<div class="cmt-list"><div class="cmt-empty">Cargando…</div></div>' +
                '<form class="cmt-form" data-cmt-form>' +
                    '<textarea class="cmt-input" placeholder="Escribe un comentario… usa @nombre para mencionar a alguien" rows="2"></textarea>' +
                    '<div class="cmt-form-actions">' +
                        '<small style="color:var(--text-tertiary,#888);">⌘+Enter para enviar</small>' +
                        '<button type="submit" class="alt-btn alt-btn--primary alt-btn--sm">Comentar</button>' +
                    '</div>' +
                '</form>' +
            '</div>';

        if (window.AltorraIcons) window.AltorraIcons.refresh(container);
        else if (window.lucide) try { window.lucide.createIcons({ context: container }); } catch (e) {}

        var unsub = startListener(opts.entityType, opts.entityId, function (comments) {
            renderAll(container, opts.entityType, opts.entityId, comments);
        });

        var entry = { container: container, entityType: opts.entityType, entityId: opts.entityId, unsub: unsub };
        _attached.push(entry);

        // Wire form submit
        var form = container.querySelector('[data-cmt-form]');
        var input = container.querySelector('.cmt-input');
        function submit(e) {
            if (e) e.preventDefault();
            var body = input.value.trim();
            if (!body) return;
            postComment(opts.entityType, opts.entityId, body, null)
                .then(function () { input.value = ''; })
                .catch(function (err) { AP.toast('Error: ' + (err.message || err), 'error'); });
        }
        if (form) form.addEventListener('submit', submit);
        if (input) {
            input.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) submit(e);
            });
        }

        // Wire reply / delete
        container.addEventListener('click', function (e) {
            var btn = e.target.closest && e.target.closest('[data-action]');
            if (!btn) return;
            var act = btn.getAttribute('data-action');
            var id = btn.getAttribute('data-id');
            if (act === 'delete') {
                if (confirm('¿Eliminar este comentario?')) {
                    deleteComment(id).catch(function (err) {
                        AP.toast('Error: ' + err.message, 'error');
                    });
                }
            } else if (act === 'reply') {
                openReplyForm(container, opts, id);
            } else if (act === 'submit-reply') {
                submitReply(container, opts, id);
            } else if (act === 'cancel-reply') {
                closeReplyForm(container, id);
            }
        });
    }

    function openReplyForm(container, opts, parentId) {
        var formEl = container.querySelector('#cmt-reply-' + CSS.escape(parentId));
        if (!formEl) return;
        formEl.style.display = '';
        formEl.innerHTML =
            '<textarea class="cmt-input cmt-reply-input" placeholder="Tu respuesta…" rows="2"></textarea>' +
            '<div class="cmt-form-actions">' +
                '<button class="alt-btn alt-btn--ghost alt-btn--sm" data-action="cancel-reply" data-id="' + escTxt(parentId) + '">Cancelar</button>' +
                '<button class="alt-btn alt-btn--primary alt-btn--sm" data-action="submit-reply" data-id="' + escTxt(parentId) + '">Responder</button>' +
            '</div>';
        var input = formEl.querySelector('.cmt-reply-input');
        if (input) input.focus();
    }

    function submitReply(container, opts, parentId) {
        var formEl = container.querySelector('#cmt-reply-' + CSS.escape(parentId));
        if (!formEl) return;
        var input = formEl.querySelector('.cmt-reply-input');
        var body = (input && input.value || '').trim();
        if (!body) return;
        postComment(opts.entityType, opts.entityId, body, parentId)
            .then(function () { closeReplyForm(container, parentId); })
            .catch(function (err) { AP.toast('Error: ' + err.message, 'error'); });
    }

    function closeReplyForm(container, parentId) {
        var formEl = container.querySelector('#cmt-reply-' + CSS.escape(parentId));
        if (formEl) {
            formEl.style.display = 'none';
            formEl.innerHTML = '';
        }
    }

    /* ═══════════════════════════════════════════════════════════
       DETACH
       ═══════════════════════════════════════════════════════════ */
    function detach(container) {
        for (var i = _attached.length - 1; i >= 0; i--) {
            if (_attached[i].container === container) {
                if (_attached[i].unsub) try { _attached[i].unsub(); } catch (e) {}
                _attached.splice(i, 1);
            }
        }
    }

    /* ═══════════════════════════════════════════════════════════
       Public API
       ═══════════════════════════════════════════════════════════ */
    window.AltorraComments = {
        attach: attach,
        detach: detach,
        count: count,
        post: postComment,
        delete: deleteComment
    };
})();
