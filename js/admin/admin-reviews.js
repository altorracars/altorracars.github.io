// Admin Panel — Reviews Management Module
// CRUD for customer reviews stored in Firestore collection 'resenas'
(function() {
    'use strict';

    var $ = function(id) { return document.getElementById(id); };
    var _deleteReviewId = null;

    // Source options for the dropdown
    var SOURCE_LABELS = {
        google_maps: 'Google Maps',
        sitio_web: 'Sitio Web',
        usuario_registrado: 'Usuario Registrado'
    };

    // ========== FIRESTORE LISTENER ==========
    function subscribeReviews() {
        if (!window.db) return;
        if (AP.unsubReviews) AP.unsubReviews();
        var _initialized = false;

        // §34 — Section cleanup hook
        if (window.AltorraSectionCleanup && !subscribeReviews._cleanupRegistered) {
            subscribeReviews._cleanupRegistered = true;
            window.AltorraSectionCleanup.register('reviews', function() {
                if (AP.unsubReviews) { try { AP.unsubReviews(); } catch (e) {} AP.unsubReviews = null; }
                subscribeReviews._cleanupRegistered = false;
            });
        }

        AP.unsubReviews = db.collection('resenas').orderBy('createdAt', 'desc').onSnapshot(function(snap) {
            AP.reviews = [];
            snap.forEach(function(doc) {
                var d = doc.data();
                d._docId = doc.id;
                AP.reviews.push(d);
            });
            if (_initialized && AP.signalCacheInvalidation) AP.signalCacheInvalidation();
            _initialized = true;
            renderReviewsTable();
            updateReviewStats();
            updateReviewBadge();
        }, function(err) {
            console.error('Reviews subscription error:', err);
            var tbody = $('reviewsTableBody');
            if (tbody) {
                tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--admin-text-muted);">Error al cargar reseñas: ' + err.message + '</td></tr>';
            }
        });
    }

    function updateReviewBadge() {
        var badge = $('navBadgeReviews');
        if (badge) badge.textContent = AP.reviews.length || '';
    }

    function updateReviewStats() {
        var total = AP.reviews.length;
        var sum = AP.reviews.reduce(function(acc, r) { return acc + (parseInt(r.rating, 10) || 0); }, 0);
        var avg = total > 0 ? (sum / total).toFixed(1) : '0.0';
        var featured = AP.reviews.filter(function(r) { return r.featured; }).length;

        var elTotal = $('reviewStatTotal');
        var elAvg = $('reviewStatAvg');
        var elFeatured = $('reviewStatFeatured');
        if (elTotal) elTotal.textContent = total;
        if (elAvg) elAvg.textContent = avg;
        if (elFeatured) elFeatured.textContent = featured;
    }

    // ========== RENDER TABLE ==========
    function renderStarsSmall(rating) {
        var html = '';
        for (var i = 1; i <= 5; i++) {
            if (i <= rating) {
                html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="#fbbf24" stroke="none"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
            } else {
                html += '<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#6b7280" stroke-width="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/></svg>';
            }
        }
        return html;
    }

    // §34 — Reviews Card list (replaces <table> arcaica) + FIX XSS:
    // onclick="" reemplazado por data-action + escapeHtml(_docId)
    function _ensureReviewsCardList() {
        var list = document.getElementById('reviewsCardList');
        if (list) return list;
        var tbody = document.getElementById('reviewsTableBody');
        var table = tbody ? tbody.parentNode : null;
        if (!table || !table.parentNode) return null;
        list = document.createElement('div');
        list.id = 'reviewsCardList';
        list.className = 'av2-card-list av2-card-list--reviews';
        table.parentNode.insertBefore(list, table);
        return list;
    }

    function renderReviewsTable() {
        var cardList = _ensureReviewsCardList();
        var tableEl = document.getElementById('reviewsTable');
        var tbody = $('reviewsTableBody');

        if (!cardList) {
            // Fallback conservador
            if (tbody) tbody.innerHTML = '<tr><td colspan="6" style="text-align:center;padding:2rem;color:var(--admin-text-muted);">No se pudo crear lista de cards</td></tr>';
            return;
        }
        if (tableEl) tableEl.style.display = 'none';

        if (AP.reviews.length === 0) {
            cardList.innerHTML = '<div class="av2-card-empty"><i data-lucide="message-square-quote"></i><div>No hay reseñas registradas. Agrega la primera.</div></div>';
            if (tbody) tbody.innerHTML = '';
            AP.refreshIcons();
            return;
        }

        var canEdit = AP.hasPermission('reviews.edit');
        var canDelete = AP.hasPermission('reviews.delete');

        var html = '';
        AP.reviews.forEach(function(r) {
            var initials = (r.name || 'NN').split(' ').map(function(w) { return w.charAt(0); }).join('').substring(0, 2).toUpperCase();
            var sourceLabel = SOURCE_LABELS[r.source] || r.source || '-';
            var docId = AP.escapeHtml(r._docId || '');
            var rating = parseInt(r.rating, 10) || 0;

            var featuredBadge = r.featured
                ? '<span class="av2-card-badge-featured" style="position:static;display:inline-flex;"><i data-lucide="star"></i>Destacada</span>'
                : '';

            var actions = '';
            if (canEdit) {
                actions += '<button class="v-act v-act--success" data-action="editReview" data-id="' + docId + '" title="Editar"><i data-lucide="pencil"></i></button>';
            }
            if (canDelete) {
                if (canEdit) actions += '<span class="v-act-sep"></span>';
                actions += '<button class="v-act v-act--danger" data-action="deleteReviewConfirm" data-id="' + docId + '" title="Eliminar"><i data-lucide="trash-2"></i></button>';
            }
            if (!actions) actions = '<span style="color:rgba(255,255,255,0.45);font-size:0.74rem;font-style:italic;">Solo lectura</span>';

            html += ''
                + '<article class="av2-card" data-review-id="' + docId + '">'
                +   '<div class="av2-card-body">'
                +     '<div class="av2-card-avatar-row">'
                +       '<div class="av2-card-avatar">' + AP.escapeHtml(initials) + '</div>'
                +       '<div style="flex:1;min-width:0;">'
                +         '<h3 class="av2-card-title" style="font-size:0.94rem;margin:0;">' + AP.escapeHtml(r.name || '') + (r.verified ? ' <i data-lucide="check-circle" style="width:13px;height:13px;color:#10b981;vertical-align:middle;display:inline-block;"></i>' : '') + '</h3>'
                +         '<div class="av2-card-meta" style="font-size:0.74rem;">' + AP.escapeHtml(r.location || '—') + '</div>'
                +       '</div>'
                +       '<div class="av2-card-stars">' + renderStarsSmall(rating) + '</div>'
                +     '</div>'
                + (r.text ? '<p class="av2-card-quote">"' + AP.escapeHtml(r.text) + '"</p>' : '')
                +     '<div class="av2-card-tags">'
                +       (r.vehicle ? '<span class="av2-card-badge-count"><i data-lucide="car" style="width:11px;height:11px;"></i>' + AP.escapeHtml(r.vehicle) + '</span>' : '')
                +       '<span class="av2-card-badge-count">' + AP.escapeHtml(sourceLabel) + '</span>'
                +       featuredBadge
                +     '</div>'
                +   '</div>'
                +   '<div class="av2-card-actions av2-card-actions--right">' + actions + '</div>'
                + '</article>';
        });
        cardList.innerHTML = html;

        if (tbody) tbody.innerHTML = '';
        AP.refreshIcons();
    }

    // ========== MODAL: OPEN / CLOSE ==========
    function openReviewModal(review) {
        var modal = $('reviewModal');
        $('reviewForm').reset();
        $('reviewId').value = '';

        if (review) {
            $('reviewModalTitle').textContent = 'Editar Reseña';
            $('reviewId').value = review._docId;
            $('reviewName').value = review.name || '';
            $('reviewLocation').value = review.location || '';
            $('reviewRating').value = review.rating || 5;
            $('reviewVehicle').value = review.vehicle || '';
            $('reviewText').value = review.text || '';
            $('reviewSource').value = review.source || 'sitio_web';
            $('reviewVerified').checked = review.verified !== false;
            $('reviewFeatured').checked = !!review.featured;
        } else {
            $('reviewModalTitle').textContent = 'Nueva Reseña';
            $('reviewSource').value = 'sitio_web';
            $('reviewVerified').checked = true;
            $('reviewFeatured').checked = false;
        }

        modal.classList.add('active');
    }

    function closeReviewModal() {
        $('reviewModal').classList.remove('active');
    }

    // ========== SAVE ==========
    function saveReview() {
        var name = $('reviewName').value.trim();
        var location = $('reviewLocation').value.trim();
        var rating = parseInt($('reviewRating').value, 10) || 5;
        var vehicle = $('reviewVehicle').value.trim();
        var text = $('reviewText').value.trim();
        var source = $('reviewSource').value || 'sitio_web';
        var verified = $('reviewVerified').checked;
        var featured = $('reviewFeatured').checked;
        var docId = $('reviewId').value;

        if (!name || !text) {
            AP.toast('Completa los campos obligatorios (nombre, texto)', 'error');
            return;
        }

        // Generate avatar initials
        var avatar = name.split(' ').map(function(w) { return w.charAt(0); }).join('').substring(0, 2).toUpperCase();

        var now = new Date().toISOString();
        var data = {
            name: name,
            location: location || 'Cartagena',
            rating: rating,
            vehicle: vehicle,
            text: text,
            source: source,
            verified: verified,
            featured: featured,
            avatar: avatar,
            updatedAt: now
        };

        var saveBtn = $('saveReview');
        saveBtn.disabled = true;
        saveBtn.innerHTML = '<span class="btn-spinner"></span> Guardando...';

        var promise;
        if (docId) {
            promise = db.collection('resenas').doc(docId).update(data);
        } else {
            data.createdAt = now;
            promise = db.collection('resenas').add(data);
        }

        promise.then(function() {
            AP.toast(docId ? 'Reseña actualizada' : 'Reseña creada', 'success');
            AP.writeAuditLog(docId ? 'review_update' : 'review_create', 'resena ' + name, name);
            closeReviewModal();
        }).catch(function(err) {
            AP.toast('Error: ' + err.message, 'error');
        }).finally(function() {
            saveBtn.disabled = false;
            saveBtn.innerHTML = 'Guardar Reseña';
        });
    }

    // ========== EDIT ==========
    function editReview(docId) {
        var review = AP.reviews.find(function(r) { return r._docId === docId; });
        if (!review) {
            AP.toast('Reseña no encontrada', 'error');
            return;
        }
        openReviewModal(review);
    }

    // ========== DELETE ==========
    function deleteReviewConfirm(docId) {
        _deleteReviewId = docId;
        $('reviewDeleteConfirm').classList.add('active');
    }

    function deleteReview() {
        if (!_deleteReviewId) return;

        var review = AP.reviews.find(function(r) { return r._docId === _deleteReviewId; });

        db.collection('resenas').doc(_deleteReviewId).delete().then(function() {
            AP.toast('Reseña eliminada', 'success');
            AP.writeAuditLog('review_delete', 'resena ' + (review ? review.name : _deleteReviewId), '');
            $('reviewDeleteConfirm').classList.remove('active');
            _deleteReviewId = null;
        }).catch(function(err) {
            AP.toast('Error al eliminar: ' + err.message, 'error');
        });
    }

    // ========== EVENT LISTENERS ==========
    var btnAdd = $('btnAddReview');
    if (btnAdd) btnAdd.addEventListener('click', function() { openReviewModal(null); });

    var btnClose = $('closeReviewModal');
    if (btnClose) btnClose.addEventListener('click', closeReviewModal);

    var btnCancel = $('cancelReviewModal');
    if (btnCancel) btnCancel.addEventListener('click', closeReviewModal);

    var btnSave = $('saveReview');
    if (btnSave) btnSave.addEventListener('click', function(e) { e.preventDefault(); saveReview(); });

    var btnConfirmDelete = $('confirmDeleteReview');
    if (btnConfirmDelete) btnConfirmDelete.addEventListener('click', deleteReview);

    // Bind cancel delete button (migrated from inline onclick)
    var cancelDelReview = $('cancelDeleteReview');
    if (cancelDelReview) cancelDelReview.addEventListener('click', function() {
        $('reviewDeleteConfirm').classList.remove('active');
    });

    // §34 — Event delegation para data-action en card list (XSS-safe)
    var reviewActions = {
        editReview: function(id) { editReview(id); },
        deleteReviewConfirm: function(id) { deleteReviewConfirm(id); }
    };
    document.addEventListener('click', function(e) {
        var btn = AP.closestAction ? AP.closestAction(e) : (e.target && e.target.closest && e.target.closest('[data-action]'));
        if (!btn) return;
        var action = btn.getAttribute('data-action');
        var handler = reviewActions[action];
        if (handler) {
            e.preventDefault();
            handler(btn.getAttribute('data-id'), btn);
        }
    });

    // ========== EXPOSE ==========
    AP.subscribeReviews = subscribeReviews;
    AP.editReview = editReview;
    AP.deleteReviewConfirm = deleteReviewConfirm;
})();
