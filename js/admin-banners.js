// Admin Panel — Banners Management Module
// CRUD for banners stored in Firestore, with WebP compression upload
(function() {
    'use strict';

    var $ = function(id) { return document.getElementById(id); };
    var _deleteBannerId = null;

    // ========== FIRESTORE LISTENER ==========
    function subscribeBanners() {
        if (!window.db) return;
        if (AP.unsubBanners) AP.unsubBanners();
        var _initialized = false;

        AP.unsubBanners = db.collection('banners').orderBy('order', 'asc').onSnapshot(function(snap) {
            AP.banners = [];
            snap.forEach(function(doc) {
                var d = doc.data();
                d._docId = doc.id;
                AP.banners.push(d);
            });
            if (_initialized && AP.signalCacheInvalidation) AP.signalCacheInvalidation();
            _initialized = true;
            renderAllBannerLists();
            updateBannerBadge();
        }, function(err) {
            console.error('Banners subscription error:', err);
        });
    }

    function updateBannerBadge() {
        var badge = $('navBadgeBanners');
        if (badge) {
            var active = AP.banners.filter(function(b) { return b.active; }).length;
            badge.textContent = active || '';
        }
    }

    // ========== RENDER LISTS ==========
    function renderAllBannerLists() {
        renderBannerList('hero', 'heroBannersList');
        renderBannerList('promocional', 'promoBannersList');
        renderBannerList('categoria', 'catBannersList');
    }

    function renderBannerList(position, containerId) {
        var container = $(containerId);
        if (!container) return;

        var items = AP.banners.filter(function(b) { return b.position === position; });

        if (items.length === 0) {
            container.innerHTML = '<div class="empty-state" style="text-align:center;padding:2rem;color:var(--admin-text-muted);">' +
                '<i data-lucide="monitor" style="width:48px;height:48px;opacity:0.3;margin-bottom:0.5rem;"></i>' +
                '<p>No hay banners en esta ubicacion</p></div>';
            AP.refreshIcons();
            return;
        }

        var html = '';
        items.forEach(function(b) {
            var statusClass = b.active ? 'badge-nuevo' : '';
            var statusText = b.active ? 'Activo' : 'Inactivo';
            var imgThumb = b.image || '';
            var catLabel = b.category ? ' — ' + b.category : '';

            html += '<div class="banner-card" data-id="' + b._docId + '">' +
                '<div class="banner-card-img">' +
                    (imgThumb ? '<img src="' + imgThumb + '" alt="' + (b.title || '') + '" loading="lazy">' : '<div class="banner-card-placeholder">Sin imagen</div>') +
                '</div>' +
                '<div class="banner-card-info">' +
                    '<div style="display:flex;align-items:center;gap:8px;margin-bottom:4px;">' +
                        '<span class="badge ' + statusClass + '" style="font-size:0.65rem;' + (b.active ? '' : 'background:#555;color:#aaa;') + '">' + statusText + '</span>' +
                        '<span style="color:var(--admin-text-muted);font-size:0.7rem;">Orden: ' + (b.order || 0) + catLabel + '</span>' +
                    '</div>' +
                    '<h4 style="font-size:0.95rem;margin-bottom:2px;">' + (b.title || 'Sin titulo') + '</h4>' +
                    '<p style="font-size:0.8rem;color:var(--admin-text-muted);margin-bottom:8px;">' + (b.subtitle || '') + '</p>' +
                    '<div class="banner-card-actions">' +
                        '<button class="btn btn-ghost btn-sm" onclick="AP.editBanner(\'' + b._docId + '\')" title="Editar">' +
                            '<i data-lucide="pencil"></i> Editar' +
                        '</button>' +
                        '<button class="btn btn-ghost btn-sm" onclick="AP.toggleBannerActive(\'' + b._docId + '\')" title="' + (b.active ? 'Desactivar' : 'Activar') + '">' +
                            (b.active ? '<i data-lucide="eye-off"></i> Ocultar' : '<i data-lucide="eye"></i> Mostrar') +
                        '</button>' +
                        (AP.RBAC.canDeleteBanner() ?
                        '<button class="btn btn-ghost btn-sm" onclick="AP.deleteBannerConfirm(\'' + b._docId + '\')" title="Eliminar" style="color:var(--admin-danger);">' +
                            '<i data-lucide="trash-2"></i> Eliminar' +
                        '</button>' : '') +
                    '</div>' +
                '</div>' +
            '</div>';
        });

        container.innerHTML = html;
        AP.refreshIcons();
    }

    // ========== MODAL: OPEN/CLOSE ==========
    function openBannerModal() {
        $('bannerModal').classList.add('active');
    }

    function closeBannerModal() {
        $('bannerModal').classList.remove('active');
        $('bannerForm').reset();
        $('bannerId').value = '';
        AP.bannerUploadedUrl = '';
        resetBannerPreview();
    }

    function resetBannerPreview() {
        $('bannerPreviewArea').innerHTML =
            '<i data-lucide="image" style="width:40px;height:40px;opacity:0.4;margin-bottom:0.5rem;"></i>' +
            '<p style="color:var(--admin-text-muted);font-size:0.85rem;">Arrastra una imagen o haz click para seleccionar</p>' +
            '<p style="color:var(--admin-text-muted);font-size:0.75rem;margin-top:0.25rem;">Recomendado: 1920x600px (hero), 1200x400px (promo). Se comprime a WebP automaticamente.</p>';
        $('bannerUploadProgress').style.display = 'none';
        AP.refreshIcons();
    }

    // ========== IMAGE UPLOAD ==========
    function initBannerUpload() {
        var dropZone = $('bannerDropZone');
        var fileInput = $('bannerFileInput');
        if (!dropZone || !fileInput) return;

        dropZone.addEventListener('click', function() { fileInput.click(); });

        dropZone.addEventListener('dragover', function(e) {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--admin-accent,#b89658)';
        });

        dropZone.addEventListener('dragleave', function() {
            dropZone.style.borderColor = 'var(--admin-border,#30363d)';
        });

        dropZone.addEventListener('drop', function(e) {
            e.preventDefault();
            dropZone.style.borderColor = 'var(--admin-border,#30363d)';
            if (e.dataTransfer.files.length) handleBannerFile(e.dataTransfer.files[0]);
        });

        fileInput.addEventListener('change', function() {
            if (fileInput.files.length) handleBannerFile(fileInput.files[0]);
            fileInput.value = '';
        });
    }

    function handleBannerFile(file) {
        if (!window.storage) { AP.toast('Firebase Storage no disponible', 'error'); return; }

        var allowed = ['image/jpeg', 'image/png', 'image/webp'];
        if (allowed.indexOf(file.type) === -1) { AP.toast('Formato no valido. Usa JPG, PNG o WebP.', 'error'); return; }
        if (file.size > 10 * 1024 * 1024) { AP.toast('Imagen demasiado grande (max 10MB)', 'error'); return; }

        $('bannerUploadProgress').style.display = 'block';
        $('bannerUploadStatus').textContent = 'Comprimiendo a WebP...';
        $('bannerProgressFill').style.width = '20%';

        // Compress to WebP: 1920px max, 0.85 quality (higher for banners displayed full-width)
        AP.compressImage(file, { maxWidth: 1920, quality: 0.85 }).then(function(compressed) {
            $('bannerUploadStatus').textContent = 'Subiendo...';
            $('bannerProgressFill').style.width = '50%';

            var timestamp = Date.now();
            var safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');
            var path = 'banners/' + timestamp + '_' + safeName.replace(/\.[^.]+$/, '') + '.webp';

            var ref = storage.ref(path);
            return ref.put(compressed).then(function(snapshot) {
                return snapshot.ref.getDownloadURL();
            });
        }).then(function(url) {
            AP.bannerUploadedUrl = url;
            $('bannerProgressFill').style.width = '100%';
            $('bannerUploadStatus').textContent = 'Imagen subida correctamente';

            // Show preview
            $('bannerPreviewArea').innerHTML =
                '<img src="' + url + '" alt="Vista previa" style="max-height:200px;border-radius:8px;object-fit:cover;width:100%;">' +
                '<button type="button" class="btn btn-ghost btn-sm" style="margin-top:0.5rem;" onclick="AP.removeBannerImage()">Cambiar imagen</button>';

            setTimeout(function() { $('bannerUploadProgress').style.display = 'none'; }, 1500);
        }).catch(function(err) {
            AP.toast('Error al subir imagen: ' + (err.message || err), 'error');
            $('bannerUploadProgress').style.display = 'none';
        });
    }

    // compressBannerImage removed — now uses AP.compressImage({ maxWidth: 1920, quality: 0.85 })

    function removeBannerImage() {
        AP.bannerUploadedUrl = '';
        resetBannerPreview();
    }

    // ========== SAVE BANNER ==========
    function saveBanner() {
        if (!AP.RBAC.canCreateBanner()) { AP.toast('No tienes permisos', 'error'); return; }

        var title = $('bannerTitle').value.trim();
        if (!title) { AP.toast('El titulo es requerido', 'error'); return; }

        var existingId = $('bannerId').value;
        var isEdit = !!existingId;

        // For new banners, image is required
        if (!isEdit && !AP.bannerUploadedUrl) {
            // Check if editing and already had an image
            AP.toast('Sube una imagen para el banner', 'error');
            return;
        }

        // F4.5: Get current version for optimistic locking
        var existingBanner = isEdit ? AP.banners.find(function(b) { return b._docId === existingId; }) : null;
        var currentVersion = existingBanner ? (existingBanner._version || 0) : 0;

        var bannerData = {
            title: title,
            subtitle: $('bannerSubtitle').value.trim(),
            position: $('bannerPosition').value,
            order: parseInt($('bannerOrder').value, 10) || 0,
            category: $('bannerCategory').value || '',
            link: $('bannerLink').value.trim(),
            cta: $('bannerCta').value.trim(),
            active: $('bannerActive').checked,
            updatedAt: new Date().toISOString(),
            updatedBy: (window.auth && auth.currentUser) ? auth.currentUser.email : 'unknown',
            _version: isEdit ? currentVersion + 1 : 1
        };

        // Only update image if a new one was uploaded
        if (AP.bannerUploadedUrl) {
            bannerData.image = AP.bannerUploadedUrl;
        }

        var btn = $('saveBanner');
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> Guardando...';

        var promise;
        if (isEdit) {
            promise = db.collection('banners').doc(existingId).update(bannerData);
        } else {
            bannerData.createdAt = new Date().toISOString();
            bannerData.createdBy = bannerData.updatedBy;
            promise = db.collection('banners').add(bannerData);
        }

        promise.then(function() {
            AP.toast(isEdit ? 'Banner actualizado' : 'Banner creado');
            AP.writeAuditLog(isEdit ? 'banner_update' : 'banner_create', 'banner', bannerData.title);
            closeBannerModal();
        }).catch(function(err) {
            AP.toast('Error: ' + (err.message || err), 'error');
        }).finally(function() {
            btn.disabled = false;
            btn.textContent = 'Guardar Banner';
        });
    }

    // ========== EDIT BANNER ==========
    function editBanner(docId) {
        if (!AP.RBAC.canEditBanner()) { AP.toast('No tienes permisos', 'error'); return; }

        var banner = AP.banners.find(function(b) { return b._docId === docId; });
        if (!banner) return;

        $('bannerModalTitle').textContent = 'Editar Banner';
        $('bannerId').value = docId;
        $('bannerTitle').value = banner.title || '';
        $('bannerSubtitle').value = banner.subtitle || '';
        $('bannerPosition').value = banner.position || 'hero';
        $('bannerOrder').value = banner.order || 0;
        $('bannerCategory').value = banner.category || '';
        $('bannerLink').value = banner.link || '';
        $('bannerCta').value = banner.cta || '';
        $('bannerActive').checked = banner.active !== false;

        AP.bannerUploadedUrl = banner.image || '';

        // Show existing image preview
        if (banner.image) {
            $('bannerPreviewArea').innerHTML =
                '<img src="' + banner.image + '" alt="Vista previa" style="max-height:200px;border-radius:8px;object-fit:cover;width:100%;">' +
                '<button type="button" class="btn btn-ghost btn-sm" style="margin-top:0.5rem;" onclick="AP.removeBannerImage()">Cambiar imagen</button>';
        }

        toggleCategoryField();
        openBannerModal();
    }

    // ========== TOGGLE ACTIVE ==========
    function toggleBannerActive(docId) {
        if (!AP.RBAC.canEditBanner()) { AP.toast('No tienes permisos', 'error'); return; }

        var banner = AP.banners.find(function(b) { return b._docId === docId; });
        if (!banner) return;

        db.collection('banners').doc(docId).update({
            active: !banner.active,
            updatedAt: new Date().toISOString(),
            _version: (banner._version || 0) + 1
        }).then(function() {
            AP.toast(banner.active ? 'Banner desactivado' : 'Banner activado');
        }).catch(function(err) {
            AP.toast('Error: ' + (err.message || err), 'error');
        });
    }

    // ========== DELETE BANNER ==========
    function deleteBannerConfirm(docId) {
        if (!AP.RBAC.canDeleteBanner()) { AP.toast('Solo super_admin puede eliminar banners', 'error'); return; }
        _deleteBannerId = docId;
        $('bannerDeleteConfirm').classList.add('active');
    }

    function deleteBanner() {
        if (!_deleteBannerId) return;
        var docId = _deleteBannerId;

        var banner = AP.banners.find(function(b) { return b._docId === docId; });
        var label = banner ? banner.title : docId;

        db.collection('banners').doc(docId).delete().then(function() {
            AP.toast('Banner eliminado');
            AP.writeAuditLog('banner_delete', 'banner', label);

            // Optionally delete image from storage
            if (banner && banner.image && banner.image.indexOf('firebasestorage') !== -1) {
                try { storage.refFromURL(banner.image).delete().catch(function() {}); } catch (e) {}
            }
        }).catch(function(err) {
            AP.toast('Error: ' + (err.message || err), 'error');
        });

        $('bannerDeleteConfirm').classList.remove('active');
        _deleteBannerId = null;
    }

    // ========== CATEGORY FIELD TOGGLE ==========
    function toggleCategoryField() {
        var group = $('bannerCatGroup');
        if (group) {
            group.style.display = $('bannerPosition').value === 'categoria' ? '' : 'none';
        }
    }

    // ========== TABS NAVIGATION ==========
    document.querySelectorAll('.banners-tab').forEach(function(tab) {
        tab.addEventListener('click', function() {
            var target = this.dataset.bannersTab;
            document.querySelectorAll('.banners-tab').forEach(function(t) { t.classList.remove('active'); });
            document.querySelectorAll('.banners-tab-content').forEach(function(c) { c.style.display = 'none'; c.classList.remove('active'); });
            this.classList.add('active');
            var targetEl = $('bannersTab' + target.charAt(0).toUpperCase() + target.slice(1));
            if (targetEl) { targetEl.style.display = ''; targetEl.classList.add('active'); }
        });
    });

    // ========== EVENT LISTENERS ==========
    $('btnAddBanner').addEventListener('click', function() {
        if (!AP.RBAC.canCreateBanner()) { AP.toast('No tienes permisos', 'error'); return; }
        $('bannerModalTitle').textContent = 'Nuevo Banner';
        closeBannerModal(); // Reset form
        toggleCategoryField();
        openBannerModal();
    });

    $('closeBannerModal').addEventListener('click', closeBannerModal);
    $('cancelBannerModal').addEventListener('click', closeBannerModal);
    $('saveBanner').addEventListener('click', function(e) { e.preventDefault(); saveBanner(); });
    $('confirmDeleteBanner').addEventListener('click', deleteBanner);
    $('bannerForm').addEventListener('submit', function(e) { e.preventDefault(); });

    // Toggle category field on position change
    $('bannerPosition').addEventListener('change', toggleCategoryField);

    // Init upload handlers
    initBannerUpload();

    // Bind cancel delete button (migrated from inline onclick)
    var cancelDelBanner = $('cancelDeleteBanner');
    if (cancelDelBanner) cancelDelBanner.addEventListener('click', function() {
        $('bannerDeleteConfirm').classList.remove('active');
    });

    // ========== EXPOSE ==========
    AP.subscribeBanners = subscribeBanners;
    AP.editBanner = editBanner;
    AP.toggleBannerActive = toggleBannerActive;
    AP.deleteBannerConfirm = deleteBannerConfirm;
    AP.removeBannerImage = removeBannerImage;
    AP.renderAllBannerLists = renderAllBannerLists;
})();
