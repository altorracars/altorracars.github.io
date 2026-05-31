/* ============================================================
   ALTORRA CARS · DETALLE VEHÍCULO — orquestador · share · bootstrap (SP-5.3)
   loadVehicleDetail + initTabs + share + DOMContentLoaded/onSnapshot.
   De-monolitización Fase 1: extraído VERBATIM del <script> inline.
   Plain script (scope global compartido, como js/simulador/ y js/public/home/).
   Orden de carga: detalle-data -> detalle-render -> detalle-gallery -> detalle-page.
   ============================================================ */

        async function loadVehicleDetail() {
            const vehicleId = getVehicleIdFromURL();
            if (!vehicleId) {
                window.location.href = 'busqueda.html';
                return;
            }

            await vehicleDB.load();
            currentVehicle = vehicleDB.getVehicleById(vehicleId);

            // If not in local cache, try direct Firestore lookup
            if (!currentVehicle && window.db) {
                try {
                    var doc = await window.db.collection('vehiculos').doc(String(vehicleId)).get();
                    if (doc.exists) {
                        var data = doc.data();
                        delete data.concesionario;
                        delete data.consignaParticular;
                        currentVehicle = data;
                    }
                } catch (e) {
                    console.warn('[Detail] Direct Firestore lookup failed:', e.message);
                }
            }

            if (!currentVehicle) {
                // Show friendly "not found" instead of alert
                var container = document.querySelector('.detail-container');
                if (container) {
                    container.innerHTML = '<div style="text-align:center;padding:80px 20px;">' +
                        '<div style="font-size:3rem;margin-bottom:16px;">🔍</div>' +
                        '<h2 style="color:var(--gray-900);margin-bottom:8px;">Vehiculo no encontrado</h2>' +
                        '<p style="color:#6b7280;margin-bottom:24px;">Es posible que este vehiculo ya no este disponible o que el enlace sea incorrecto.</p>' +
                        '<a href="busqueda.html" class="btn-cta" style="display:inline-block;padding:12px 32px;background:var(--gold);color:#fff;border-radius:8px;text-decoration:none;font-weight:600;">Ver inventario disponible</a>' +
                        '</div>';
                }
                return;
            }

            renderVehicleDetail();
            updateMetaTags(currentVehicle);
            injectVehicleSchema(currentVehicle);
            loadSimilarVehicles();
            initTabs();
            initGallery();

            // Sync browser URL to SEO-canonical path (/vehiculos/slug.html)
            // so copying the URL from the address bar gives the same link as the
            // Share button — the static page that carries pre-baked OG meta tags.
            // Uses replaceState (no page reload, no extra history entry).
            if (!window.PRERENDERED_VEHICLE_ID) {
                try {
                    var seoUrl = getShareableUrl();
                    if (seoUrl && window.location.href !== seoUrl) {
                        history.replaceState({ vehicleId: currentVehicle.id }, document.title, seoUrl);
                    }
                } catch (e) {
                    // Silent fail — URL stays as is, page still works
                }
            }
        }

        function initTabs() {
            document.querySelectorAll('.tab-btn').forEach(button => {
                button.addEventListener('click', () => {
                    const targetTab = button.dataset.tab;

                    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
                    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

                    button.classList.add('active');
                    document.getElementById(`tab-${targetTab}`).classList.add('active');
                });
            });
        }

        function shareVehicle() {
            if (!currentVehicle) return;
            var v = currentVehicle;
            var marca = capitalizar(v.marca || '');
            var modelo = v.modelo || '';
            var year = v.year || '';
            var precio = v.precioOferta || v.precio;
            var precioText = precio ? formatCurrency(precio) : '';
            var title = marca + ' ' + modelo + ' ' + year + ' | ALTORRA CARS';
            var text = marca + ' ' + modelo + ' ' + year + ' - ' + precioText + '\n' + capitalizar(v.tipo || '') + ' | ' + capitalizar(v.transmision || '') + ' | ' + formatKilometers(v.kilometraje || 0);
            var url = getShareableUrl();

            // Try native Web Share API first (mobile)
            if (navigator.share) {
                navigator.share({
                    title: title,
                    text: text,
                    url: url
                }).catch(function() {
                    // User cancelled or error - fallback to WhatsApp
                    shareToWhatsApp(text, url);
                });
            } else {
                // Desktop fallback - show options
                shareToWhatsApp(text, url);
            }
        }

        function shareToWhatsApp(text, url) {
            var msg = text + '\n\nVer detalle completo:\n' + url;
            var waUrl = 'https://wa.me/?text=' + encodeURIComponent(msg);
            window.open(waUrl, '_blank');
            showShareToast('Link copiado para compartir');
        }

        function showShareToast(msg) {
            var existing = document.querySelector('.share-toast');
            if (existing) existing.remove();
            var toast = document.createElement('div');
            toast.className = 'share-toast';
            toast.textContent = msg;
            document.body.appendChild(toast);
            requestAnimationFrame(function() {
                toast.classList.add('visible');
            });
            setTimeout(function() {
                toast.classList.remove('visible');
                setTimeout(function() { toast.remove(); }, 300);
            }, 2500);
        }

        // Make shareVehicle globally available
        window.shareVehicle = shareVehicle;

        document.addEventListener('DOMContentLoaded', () => {
            loadVehicleDetail().then(function() {
                // Real-time listener: auto-update if admin modifies this vehicle
                var vid = getVehicleIdFromURL();
                if (vid && window.db) {
                    window.db.collection('vehiculos').doc(String(vid))
                        .onSnapshot(function(doc) {
                            if (!doc.exists || !currentVehicle) return;
                            var updated = doc.data();
                            // Only re-render if version changed
                            if (updated._version && updated._version !== currentVehicle._version) {
                                delete updated.concesionario;
                                delete updated.consignaParticular;
                                currentVehicle = updated;
                                renderVehicleDetail();
                                updateMetaTags(currentVehicle);
                                loadSimilarVehicles();
                                initTabs();
                                initGallery();
                                showShareToast('Informacion actualizada en tiempo real');
                            }
                        });
                }
            });
        });
