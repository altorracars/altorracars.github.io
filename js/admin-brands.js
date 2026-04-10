// Admin Panel — Brands CRUD
(function() {
    'use strict';
    var AP = window.AP;
    var $ = AP.$;

    // ========== LOGO URL RESOLVER ==========
    // Normalizes brand logo URLs: fixes path typos and .png → .webp for local files
    function resolveLogoUrl(url) {
        if (!url) return '';
        // Fix common path typo: multimedia/Logo/ → multimedia/Logos/
        if (url.indexOf('multimedia/Logo/') === 0) {
            url = url.replace('multimedia/Logo/', 'multimedia/Logos/');
        }
        // Local repo paths ending in .png → .webp (actual files are webp)
        if (url.indexOf('multimedia/Logos/') >= 0 && /\.png$/i.test(url)) {
            url = url.replace(/\.png$/i, '.webp');
        }
        return url;
    }

    // Fallback map: brand ID → known local webp logo
    var LOCAL_LOGOS = {};
    ['Audi','BMW','Chevrolet','FIAT','Ford','Honda','Hyundai','Jeep','Kia',
     'Mazda','Mitsubishi','Nissan','Renault','Suzuki','Toyota','Volkswagen'].forEach(function(name) {
        LOCAL_LOGOS[name.toLowerCase()] = 'multimedia/Logos/' + name + '.webp';
    });
    // Map fiat ID to FIAT filename
    LOCAL_LOGOS['fiat'] = 'multimedia/Logos/FIAT.webp';

    // Get the best available logo URL for a brand
    function getBrandLogoUrl(brand) {
        var resolved = resolveLogoUrl(brand.logo);
        // If it's a Firebase Storage URL (https://), use as-is
        if (resolved && resolved.indexOf('http') === 0) return resolved;
        // If resolved is a valid local path, use it
        if (resolved && resolved.indexOf('multimedia/Logos/') >= 0 && /\.webp$/i.test(resolved)) return resolved;
        // Fallback to known local logo by brand ID
        var fallback = LOCAL_LOGOS[brand.id] || LOCAL_LOGOS[(brand.nombre || '').toLowerCase()];
        return fallback || resolved || '';
    }

    // ========== AUTO-MIGRATE LOGO PATHS IN FIRESTORE ==========
    var _migrationDone = false;
    function migrateLogoPaths() {
        if (_migrationDone || !window.db || !AP.canCreateOrEditInventory || !AP.canCreateOrEditInventory()) return;
        _migrationDone = true;

        var batch = null;
        var batchCount = 0;

        AP.brands.forEach(function(b) {
            if (!b.logo || !b.id) return;
            var corrected = resolveLogoUrl(b.logo);
            // Also check: if logo is a local .png that doesn't exist, use the webp fallback
            if (!corrected || corrected === b.logo) {
                // Check if it's a broken local .png path
                if (b.logo.indexOf('multimedia/') >= 0 && /\.png$/i.test(b.logo)) {
                    corrected = b.logo.replace(/\.png$/i, '.webp');
                }
            }
            // If the logo is still a local path without extension fix, try mapping
            if (corrected === b.logo && b.logo.indexOf('http') !== 0) {
                var fallback = LOCAL_LOGOS[b.id] || LOCAL_LOGOS[(b.nombre || '').toLowerCase()];
                if (fallback && fallback !== b.logo) corrected = fallback;
            }

            if (corrected && corrected !== b.logo) {
                if (!batch) batch = window.db.batch();
                var ref = window.db.collection('marcas').doc(b.id);
                batch.update(ref, { logo: corrected });
                batchCount++;
            }
        });

        if (batch && batchCount > 0) {
            batch.commit().then(function() {
                // migrated silently
            }).catch(function(err) {
                console.warn('[Brands] Logo migration failed:', err.message);
            });
        }
    }

    // ========== BRANDS TABLE ==========
    function renderBrandsTable() {
        // Trigger one-time logo migration on first render
        if (!_migrationDone && AP.brands.length > 0) {
            setTimeout(migrateLogoPaths, 500);
        }

        var sorted = AP.brands.slice();
        if (AP._sorting && AP._sorting.brands && AP._sorting.brands.col) {
            sorted = AP.sortData(sorted, 'brands');
        } else {
            sorted.sort(function(a, b) { return a.nombre.localeCompare(b.nombre); });
        }
        var totalBrands = sorted.length;
        if (AP.paginate) sorted = AP.paginate(sorted, 'brands');

        var html = '';
        sorted.forEach(function(b) {
            var count = AP.vehicles.filter(function(v) { return v.marca === b.id; }).length;
            var logoUrl = getBrandLogoUrl(b);

            var actions = '<div class="v-actions">';
            if (AP.canCreateOrEditInventory()) {
                actions += '<button class="v-act v-act--success" data-action="editBrand" data-id="' + AP.escapeHtml(b.id) + '" title="Editar"><i data-lucide="pencil"></i></button>';
            }
            if (AP.canDeleteInventory()) {
                actions += '<span class="v-act-sep"></span>';
                actions += '<button class="v-act v-act--danger" data-action="deleteBrand" data-id="' + AP.escapeHtml(b.id) + '" title="Eliminar"><i data-lucide="trash-2"></i></button>';
            }
            actions += '</div>';
            if (!AP.canCreateOrEditInventory() && !AP.canDeleteInventory()) actions = '<span style="color:var(--admin-text-muted);font-size:0.75rem;">Solo lectura</span>';

            var imgTag = logoUrl
                ? '<img class="vehicle-thumb" src="' + AP.escapeHtml(logoUrl) + '" alt="' + AP.escapeHtml(b.nombre) + '" loading="lazy" onerror="this.style.opacity=\'0.3\';this.onerror=null;" style="width:40px;height:40px;object-fit:contain;">'
                : '<div style="width:40px;height:40px;display:flex;align-items:center;justify-content:center;background:var(--admin-border);border-radius:6px;color:var(--admin-text-muted);font-size:0.6rem;">Sin logo</div>';

            html += '<tr>' +
                '<td>' + imgTag + '</td>' +
                '<td><code>' + b.id + '</code></td>' +
                '<td><strong>' + b.nombre + '</strong></td>' +
                '<td>' + (b.descripcion || '-') + '</td>' +
                '<td>' + count + '</td>' +
                '<td>' + actions + '</td>' +
            '</tr>';
        });

        if (!html) html = '<tr><td colspan="6" style="text-align:center; padding:2rem;">No hay marcas</td></tr>';
        $('brandsTableBody').innerHTML = html;

        // Sort indicators
        document.querySelectorAll('th[data-table="brands"][data-sort]').forEach(function(th) {
            var col = th.getAttribute('data-sort');
            var si = th.querySelector('.sort-icon'); if (si) si.remove(); var text = th.textContent.trim();
            th.innerHTML = text + ' ' + (AP.getSortIndicator ? AP.getSortIndicator('brands', col) : '');
        });

        if (AP.renderPagination) AP.renderPagination('brandsPagination', 'brands', totalBrands);
        AP.refreshIcons();
    }

    // ========== BRAND MODAL ==========
    function openBrandModal() { $('brandModal').classList.add('active'); }

    function closeBrandModalFn() {
        $('brandModal').classList.remove('active');
        $('brandForm').reset();
        $('bOriginalId').value = '';
        $('bLogo').value = '';
        updateLogoPreview('');
    }

    $('brandForm').addEventListener('submit', function(e) { e.preventDefault(); });
    $('brandForm').addEventListener('keydown', function(e) { if (e.key === 'Enter') e.preventDefault(); });

    $('btnAddBrand').addEventListener('click', function() {
        if (!AP.canCreateOrEditInventory()) { AP.toast('No tienes permisos', 'error'); return; }
        $('brandModalTitle').textContent = 'Agregar Marca';
        $('bOriginalId').value = '';
        $('brandForm').reset();
        $('bLogo').value = '';
        updateLogoPreview('');
        $('bId').readOnly = false;
        openBrandModal();
    });

    $('closeBrandModal').addEventListener('click', closeBrandModalFn);
    $('cancelBrandModal').addEventListener('click', closeBrandModalFn);

    // Logo preview helper — resolves URL before displaying
    function updateLogoPreview(url) {
        var resolved = resolveLogoUrl(url);
        if (resolved) {
            $('brandLogoPreview').innerHTML = '<img src="' + AP.escapeHtml(resolved) + '" style="width:60px;height:60px;object-fit:contain;border-radius:6px;background:#1a1a2e;padding:4px;" onerror="this.parentNode.innerHTML=\'<small style=color:var(--admin-danger)>Logo no disponible</small>\'">';
            $('btnDeleteBrandLogo').style.display = '';
        } else {
            $('brandLogoPreview').innerHTML = '';
            $('btnDeleteBrandLogo').style.display = 'none';
        }
    }

    // Logo file upload via Firebase Storage
    // Uses 'cars/' path as primary (compatible with existing Storage rules)
    // Falls back to 'brands/' if cars/ fails
    $('btnUploadBrandLogo').addEventListener('click', function() {
        $('brandLogoFile').click();
    });

    $('brandLogoFile').addEventListener('change', function() {
        var file = this.files[0];
        if (!file) return;
        if (!window.storage) { AP.toast('Firebase Storage no disponible', 'error'); return; }

        var allowed = ['image/jpeg', 'image/png', 'image/webp', 'image/svg+xml'];
        if (allowed.indexOf(file.type) === -1) {
            AP.toast('Formato no valido. Usa JPG, PNG, WebP o SVG.', 'error');
            return;
        }

        var status = $('brandLogoUploadStatus');
        status.style.display = 'block';
        status.style.color = '';
        status.textContent = 'Comprimiendo y convirtiendo a WebP...';

        var safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_').replace(/\.[^.]+$/, '');

        // SVG: upload as-is (vector, no compression needed)
        var uploadPromise;
        if (file.type === 'image/svg+xml') {
            uploadPromise = Promise.resolve(file);
        } else {
            // Always compress and convert to WebP (high quality for logos: 0.90, max 512px)
            uploadPromise = AP.compressImage(file, { maxWidth: 512, quality: 0.90 });
        }

        uploadPromise.then(function(processedFile) {
            var ext = processedFile.type === 'image/svg+xml' ? 'svg' : 'webp';
            var path = 'cars/brand_logo_' + Date.now() + '_' + safeName + '.' + ext;

            status.textContent = 'Subiendo logo...';
            var ref = window.storage.ref(path);
            return ref.put(processedFile).then(function(snapshot) {
                return snapshot.ref.getDownloadURL();
            });
        }).then(function(url) {
            $('bLogo').value = url;
            updateLogoPreview(url);
            status.textContent = 'Logo subido correctamente (WebP)';
            status.style.color = 'var(--admin-success)';
            setTimeout(function() { status.style.display = 'none'; status.style.color = ''; }, 3000);
        }).catch(function(err) {
            var msg = err.message || err.code || 'Error desconocido';
            if (msg.indexOf('unauthorized') >= 0 || msg.indexOf('permission') >= 0) {
                msg = 'Sin permisos de Storage. Pide al Super Admin que actualice las reglas de Firebase Storage para permitir uploads.';
            }
            status.textContent = msg;
            status.style.color = 'var(--admin-danger)';
        });

        this.value = '';
    });

    // Delete logo button
    $('btnDeleteBrandLogo').addEventListener('click', function() {
        $('bLogo').value = '';
        updateLogoPreview('');
        AP.toast('Logo eliminado. Guarda para confirmar.');
    });

    // ========== EDIT BRAND ==========
    function editBrand(brandId) {
        if (!AP.canCreateOrEditInventory()) { AP.toast('No tienes permisos', 'error'); return; }
        var b = AP.brands.find(function(x) { return x.id === brandId; });
        if (!b) return;

        $('brandModalTitle').textContent = 'Editar Marca: ' + b.nombre;
        $('bOriginalId').value = b.id;
        $('bId').value = b.id;
        $('bId').readOnly = true;
        $('bNombre').value = b.nombre || '';
        // Use resolved URL for the hidden field and preview
        var resolvedLogo = getBrandLogoUrl(b);
        $('bLogo').value = resolvedLogo;
        updateLogoPreview(resolvedLogo);

        openBrandModal();
    }

    function generateBrandId(nombre) {
        return nombre.trim().toLowerCase()
            .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/-+/g, '-')
            .replace(/^-|-$/g, '');
    }

    // ========== SAVE BRAND ==========
    $('saveBrand').addEventListener('click', function() {
        if (!AP.canCreateOrEditInventory()) { AP.toast('No tienes permisos', 'error'); return; }

        var form = $('brandForm');
        if (!form.checkValidity()) { form.reportValidity(); return; }

        var nombre = $('bNombre').value.trim();
        var originalId = $('bOriginalId').value;
        var isEdit = !!originalId;
        var brandId = isEdit ? originalId : generateBrandId(nombre);

        var userEmail = window.auth.currentUser ? window.auth.currentUser.email : 'admin';
        // F4.5: Get current version for optimistic locking
        var existingBrand = AP.brands.find(function(x) { return x.id === brandId; });
        var currentVersion = existingBrand ? (existingBrand._version || 0) : 0;

        var brandData = {
            id: brandId,
            nombre: nombre,
            descripcion: nombre,
            logo: resolveLogoUrl($('bLogo').value.trim()),
            updatedAt: new Date().toISOString(),
            updatedBy: userEmail,
            _type: 'marca',
            _version: isEdit ? currentVersion + 1 : 1
        };

        var btn = $('saveBrand');
        btn.disabled = true;
        btn.innerHTML = '<span class="spinner"></span> Guardando...';

        var docRef = window.db.collection('marcas').doc(brandId);
        var saveOp = isEdit ? docRef.update(brandData) : docRef.set(brandData);
        saveOp
            .then(function() {
                AP.writeAuditLog(isEdit ? 'brand_update' : 'brand_create', 'marca ' + brandId, brandData.nombre);
                AP.toast(isEdit ? 'Marca actualizada' : 'Marca agregada');
                closeBrandModalFn();
                AP.loadData();
            })
            .catch(function(err) {
                if (err.code === 'permission-denied') AP.toast('Sin permisos', 'error');
                else AP.toast('Error: ' + err.message, 'error');
            })
            .finally(function() {
                btn.disabled = false;
                btn.textContent = 'Guardar Marca';
            });
    });

    // ========== DELETE BRAND ==========
    function deleteBrandFn(brandId) {
        if (!AP.canDeleteInventory()) { AP.toast('Solo un Super Admin puede eliminar marcas', 'error'); return; }

        var b = AP.brands.find(function(x) { return x.id === brandId; });
        if (!b) return;

        AP.deleteBrandTargetId = brandId;
        $('deleteBrandName').textContent = b.nombre;
        $('deleteBrandModal').classList.add('active');
    }

    $('closeDeleteBrandModal').addEventListener('click', function() { $('deleteBrandModal').classList.remove('active'); AP.deleteBrandTargetId = null; });
    $('cancelDeleteBrand').addEventListener('click', function() { $('deleteBrandModal').classList.remove('active'); AP.deleteBrandTargetId = null; });

    $('confirmDeleteBrand').addEventListener('click', function() {
        if (!AP.deleteBrandTargetId) return;
        if (!AP.canDeleteInventory()) { AP.toast('Sin permisos', 'error'); return; }

        var btn = $('confirmDeleteBrand');
        btn.disabled = true;
        btn.textContent = 'Eliminando...';

        window.db.collection('marcas').doc(AP.deleteBrandTargetId).delete()
            .then(function() {
                AP.writeAuditLog('brand_delete', 'marca ' + AP.deleteBrandTargetId, '');
                AP.toast('Marca eliminada');
                $('deleteBrandModal').classList.remove('active');
                AP.deleteBrandTargetId = null;
                AP.loadData();
            })
            .catch(function(err) {
                if (err.code === 'permission-denied') AP.toast('Sin permisos para eliminar.', 'error');
                else AP.toast('Error: ' + err.message, 'error');
            })
            .finally(function() {
                btn.disabled = false;
                btn.textContent = 'Eliminar';
            });
    });

    // F6.4: Event delegation for brand actions
    var brandsBody = $('brandsTableBody');
    if (brandsBody) {
        brandsBody.addEventListener('click', function(e) {
            var btn = AP.closestAction(e);
            if (!btn) return;
            var id = btn.getAttribute('data-id');
            if (btn.getAttribute('data-action') === 'editBrand') editBrand(id);
            else if (btn.getAttribute('data-action') === 'deleteBrand') deleteBrandFn(id);
        });
    }

    // ========== EXPOSE ==========
    AP.renderBrandsTable = renderBrandsTable;
    AP.editBrand = editBrand;
    AP.deleteBrand = deleteBrandFn;
    AP.resolveLogoUrl = resolveLogoUrl;
    AP.getBrandLogoUrl = getBrandLogoUrl;
})();
