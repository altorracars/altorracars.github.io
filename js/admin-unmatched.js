/**
 * AltorraAdminUnmatched — Panel "Lo que no entendí"
 *
 * §22 Capa E del Offline Ultra Brain (CLAUDE.md).
 *
 * Listener realtime sobre `unmatchedQueries/` (Firestore). Muestra
 * las queries que el bot rule-based no logró responder. El admin
 * puede:
 *   - Marcar como vista (seen:true) → no re-aparece en bucket Sin revisar
 *   - Promover a FAQ → abre el form de admin-kb.js prellenado con la
 *     query como question; cuando se guarda la FAQ, marca
 *     `promotedToFAQ:true` + `promotedFAQId`
 *   - Eliminar (super_admin) → hard delete del doc
 *
 * Filtros (filter chips):
 *   - "Sin revisar": seen=false AND promotedToFAQ=false (default)
 *   - "Todas": todas
 *   - "Promovidas": promotedToFAQ=true
 *
 * Sort: agrupa queries similares por keywords (futuro), por ahora
 * sort puro por createdAt desc.
 *
 * Solo lo arranca admin con rol editor+ (las reglas Firestore lo
 * bloquean para viewer pero igual hacemos el guard cliente para
 * no mostrar la sección).
 */
(function () {
    'use strict';
    if (window.AltorraAdminUnmatched) return;

    var $ = function (id) { return document.getElementById(id); };
    var AP = window.AP || {};

    var _entries = [];
    var _unsub = null;
    var _activeFilter = 'unseen';
    var _started = false;

    function escTxt(s) {
        var d = document.createElement('div');
        d.textContent = s == null ? '' : String(s);
        return d.innerHTML;
    }

    function timeAgo(ts) {
        if (!ts) return '';
        var t = ts.toMillis ? ts.toMillis() : (typeof ts === 'number' ? ts : new Date(ts).getTime());
        if (!t) return '';
        var diff = Date.now() - t;
        if (diff < 60000) return 'hace un momento';
        if (diff < 3600000) return 'hace ' + Math.floor(diff / 60000) + ' min';
        if (diff < 86400000) return 'hace ' + Math.floor(diff / 3600000) + ' h';
        return 'hace ' + Math.floor(diff / 86400000) + ' d';
    }

    /**
     * start — listener realtime. Solo se llama cuando el admin entra
     * a la sección o al panel admin (para badge de unread global).
     */
    function start() {
        if (_unsub || !window.db) return;
        if (!AP.isEditorOrAbove || !AP.isEditorOrAbove()) return;
        _started = true;

        _unsub = window.db.collection('unmatchedQueries')
            .orderBy('createdAt', 'desc')
            .limit(200)
            .onSnapshot(function (snap) {
                _entries = [];
                snap.forEach(function (doc) {
                    _entries.push(Object.assign({ _docId: doc.id }, doc.data()));
                });
                renderUI();
                updateNavBadge();
            }, function (err) {
                if (window.auth && !window.auth.currentUser) return;
                console.warn('[AdminUnmatched] listener error:', err.message);
            });
    }

    function stop() {
        if (_unsub) { try { _unsub(); } catch (e) {} _unsub = null; }
        _started = false;
    }

    function getVisibleEntries() {
        if (_activeFilter === 'all') return _entries;
        if (_activeFilter === 'promoted') {
            return _entries.filter(function (e) { return !!e.promotedToFAQ; });
        }
        // default: unseen
        return _entries.filter(function (e) {
            return !e.seen && !e.promotedToFAQ;
        });
    }

    function renderCounts() {
        var unseen = 0, promoted = 0;
        _entries.forEach(function (e) {
            if (e.promotedToFAQ) promoted++;
            else if (!e.seen) unseen++;
        });
        var u = $('unmatchedCountUnseen');
        var a = $('unmatchedCountAll');
        var p = $('unmatchedCountPromoted');
        if (u) u.textContent = unseen;
        if (a) a.textContent = _entries.length;
        if (p) p.textContent = promoted;
    }

    function updateNavBadge() {
        var badge = $('navBadgeUnmatched');
        if (!badge) return;
        var unseen = _entries.filter(function (e) {
            return !e.seen && !e.promotedToFAQ;
        }).length;
        if (unseen > 0) {
            badge.style.display = '';
            badge.textContent = unseen > 99 ? '99+' : String(unseen);
        } else {
            badge.style.display = 'none';
        }
    }

    function renderUI() {
        renderCounts();
        var listEl = $('unmatchedList');
        if (!listEl) return;
        var visible = getVisibleEntries();

        if (_entries.length === 0) {
            listEl.innerHTML =
                '<div class="table-empty" style="text-align:center;padding:48px 24px;">' +
                    '<i data-lucide="check-circle-2" style="width:48px;height:48px;color:var(--brand-primary);opacity:0.5;"></i>' +
                    '<div style="margin-top:12px;font-size:1.05rem;font-weight:600;">Sin queries pendientes</div>' +
                    '<div style="margin-top:6px;color:var(--text-tertiary);font-size:0.88rem;">El bot está respondiendo bien todas las preguntas. Cuando algo no lo entienda, va a aparecer acá.</div>' +
                '</div>';
            if (window.AltorraIcons) window.AltorraIcons.refresh(listEl);
            return;
        }
        if (visible.length === 0) {
            listEl.innerHTML = '<div class="table-empty">Sin queries en este filtro.</div>';
            return;
        }

        listEl.innerHTML = visible.map(function (e) {
            var statusBadge = '';
            if (e.promotedToFAQ) {
                statusBadge = '<span class="alt-badge alt-badge--success" data-tooltip="Ya está en la KB"><i data-lucide="check"></i> Promovida</span>';
            } else if (e.seen) {
                statusBadge = '<span class="alt-badge alt-badge--info">Vista</span>';
            } else {
                statusBadge = '<span class="alt-badge alt-badge--warning">Nueva</span>';
            }
            var sentimentChip = '';
            if (e.sentiment === 'negative') {
                sentimentChip = '<span class="alt-badge alt-badge--danger">😠 Negativo</span>';
            } else if (e.sentiment === 'positive') {
                sentimentChip = '<span class="alt-badge alt-badge--success">😊 Positivo</span>';
            }
            var keywordsHTML = '';
            if (e.keywords && e.keywords.length) {
                keywordsHTML = '<div class="unmatched-keywords">' +
                    e.keywords.map(function (k) {
                        return '<span class="unmatched-keyword">' + escTxt(k) + '</span>';
                    }).join('') +
                '</div>';
            }
            var sourceHTML = e.sourcePage
                ? '<span class="unmatched-source"><i data-lucide="external-link"></i> ' + escTxt(e.sourcePage) + '</span>'
                : '';
            var promoteBtn = e.promotedToFAQ
                ? '<button class="alt-btn alt-btn--ghost alt-btn--sm" disabled title="Ya está en la KB"><i data-lucide="check"></i> Ya en KB</button>'
                : '<button class="alt-btn alt-btn--primary alt-btn--sm" data-unmatched-promote="' + escTxt(e._docId) + '"><i data-lucide="plus-circle"></i> Crear FAQ</button>';
            var seenBtn = e.seen
                ? ''
                : '<button class="alt-btn alt-btn--ghost alt-btn--sm" data-unmatched-seen="' + escTxt(e._docId) + '" data-tooltip="Marcar como vista"><i data-lucide="eye"></i></button>';
            var deleteBtn = (AP.isSuperAdmin && AP.isSuperAdmin())
                ? '<button class="alt-btn alt-btn--ghost alt-btn--sm" data-unmatched-delete="' + escTxt(e._docId) + '" data-tooltip="Eliminar"><i data-lucide="trash-2"></i></button>'
                : '';

            return '<div class="unmatched-entry">' +
                '<div class="unmatched-entry-head">' +
                    '<div class="unmatched-entry-meta">' +
                        statusBadge + ' ' + sentimentChip +
                        ' <span class="unmatched-time">' + timeAgo(e.createdAt) + '</span>' +
                        ' ' + sourceHTML +
                    '</div>' +
                    '<div class="unmatched-entry-actions">' +
                        seenBtn + promoteBtn + deleteBtn +
                    '</div>' +
                '</div>' +
                '<div class="unmatched-query">' + escTxt(e.query || '') + '</div>' +
                keywordsHTML +
            '</div>';
        }).join('');
        if (window.AltorraIcons) window.AltorraIcons.refresh(listEl);
        else if (window.lucide) try { window.lucide.createIcons({ context: listEl }); } catch (e) {}
    }

    /* ─── Acciones ───────────────────────────────────────────────── */

    function markSeen(docId) {
        if (!docId || !window.db) return;
        window.db.collection('unmatchedQueries').doc(docId).update({
            seen: true,
            seenAt: new Date().toISOString(),
            seenBy: window.auth && window.auth.currentUser ? window.auth.currentUser.uid : null
        }).catch(function (err) {
            if (AP.toast) AP.toast('No se pudo marcar como vista: ' + err.message, 'error');
        });
    }

    function markAllSeen() {
        var batch = window.db.batch();
        var n = 0;
        var nowIso = new Date().toISOString();
        var byUid = window.auth && window.auth.currentUser ? window.auth.currentUser.uid : null;
        _entries.forEach(function (e) {
            if (!e.seen && !e.promotedToFAQ) {
                batch.update(window.db.collection('unmatchedQueries').doc(e._docId), {
                    seen: true, seenAt: nowIso, seenBy: byUid
                });
                n++;
            }
        });
        if (n === 0) {
            if (AP.toast) AP.toast('Nada para marcar — ya estás al día');
            return;
        }
        batch.commit().then(function () {
            if (AP.toast) AP.toast(n + ' queries marcadas como vistas', 'success');
        }).catch(function (err) {
            if (AP.toast) AP.toast('No se pudo: ' + err.message, 'error');
        });
    }

    /**
     * promoteToFAQ — abre el form de admin-kb.js prellenado con la
     * query como question. Cuando el admin guarda la FAQ, marcamos
     * `promotedToFAQ:true` para que esta entrada salga del bucket
     * "Sin revisar".
     */
    function promoteToFAQ(docId) {
        var entry = _entries.find(function (e) { return e._docId === docId; });
        if (!entry) return;

        // Navegar a la sección Cerebro AI + abrir el form
        if (window.AltorraSections && window.AltorraSections.go) {
            window.AltorraSections.go('kb');
        } else {
            // Fallback: simulate click en el nav-item
            var navBtn = document.querySelector('[data-section="kb"]');
            if (navBtn) navBtn.click();
        }

        // Diferir un tick para que el render del KB se complete
        setTimeout(function () {
            // Pre-fill el form si admin-kb expone API
            if (window.AltorraKB && typeof window.AltorraKB.openFormPrefilled === 'function') {
                window.AltorraKB.openFormPrefilled({
                    question: entry.query,
                    keywords: entry.keywords || [],
                    _onSaveCallback: function (newFAQId) {
                        // Marcar la unmatched query como promovida
                        if (newFAQId) {
                            window.db.collection('unmatchedQueries').doc(docId).update({
                                promotedToFAQ: true,
                                promotedFAQId: newFAQId,
                                promotedAt: new Date().toISOString(),
                                promotedBy: window.auth && window.auth.currentUser ?
                                    window.auth.currentUser.uid : null,
                                seen: true
                            }).catch(function () {});
                        }
                    }
                });
            } else {
                // Fallback: solo navega a KB y muestra toast con la query a copiar
                if (AP.toast) {
                    AP.toast('Crea una FAQ con esta pregunta: "' + entry.query.slice(0, 80) + '"', 'info');
                }
            }
        }, 200);
    }

    function deleteEntry(docId) {
        if (!AP.isSuperAdmin || !AP.isSuperAdmin()) {
            if (AP.toast) AP.toast('Solo super admin puede eliminar', 'error');
            return;
        }
        if (!confirm('¿Eliminar esta query del histórico?\n\nNo afecta al cliente, solo limpia tu bandeja.')) return;
        window.db.collection('unmatchedQueries').doc(docId).delete().then(function () {
            if (AP.toast) AP.toast('Query eliminada', 'success');
        }).catch(function (err) {
            if (AP.toast) AP.toast('No se pudo eliminar: ' + err.message, 'error');
        });
    }

    /* ─── Wire UI ────────────────────────────────────────────────── */

    function wire() {
        document.addEventListener('click', function (e) {
            // Filter chips
            var chip = e.target.closest('[data-unmatched-filter]');
            if (chip) {
                _activeFilter = chip.getAttribute('data-unmatched-filter');
                document.querySelectorAll('[data-unmatched-filter]').forEach(function (c) {
                    c.classList.toggle('is-active', c === chip);
                });
                renderUI();
                return;
            }
            // Mark seen
            var seenBtn = e.target.closest('[data-unmatched-seen]');
            if (seenBtn) {
                markSeen(seenBtn.getAttribute('data-unmatched-seen'));
                return;
            }
            // Promote to FAQ
            var promoteBtn = e.target.closest('[data-unmatched-promote]');
            if (promoteBtn) {
                promoteToFAQ(promoteBtn.getAttribute('data-unmatched-promote'));
                return;
            }
            // Delete
            var deleteBtn = e.target.closest('[data-unmatched-delete]');
            if (deleteBtn) {
                deleteEntry(deleteBtn.getAttribute('data-unmatched-delete'));
                return;
            }
            // Refresh button
            if (e.target.closest('#unmatchedRefreshBtn')) {
                renderUI();
                return;
            }
            // Mark all seen
            if (e.target.closest('#unmatchedMarkAllSeenBtn')) {
                markAllSeen();
                return;
            }
        });

        // Auto-arranque cuando admin entra a la sección
        if (window.AltorraSections && window.AltorraSections.onChange) {
            window.AltorraSections.onChange(function (s) {
                if (s === 'unmatched' && !_started) start();
            });
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', wire);
    } else {
        wire();
    }

    // Iniciar listener globalmente para que el badge funcione desde el primer
    // page load (sin esperar a entrar a la sección).
    function bootIfReady() {
        if (window.db && AP.isEditorOrAbove && AP.isEditorOrAbove()) {
            start();
        } else {
            setTimeout(bootIfReady, 1500);
        }
    }
    setTimeout(bootIfReady, 2000);

    /* ─── Public API ─────────────────────────────────────────────── */
    window.AltorraAdminUnmatched = {
        start: start,
        stop: stop,
        refresh: renderUI,
        markSeen: markSeen,
        markAllSeen: markAllSeen,
        promoteToFAQ: promoteToFAQ,
        deleteEntry: deleteEntry,
        entries: function () { return _entries.slice(); }
    };
})();
