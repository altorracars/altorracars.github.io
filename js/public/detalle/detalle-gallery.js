/* ============================================================
   ALTORRA CARS · DETALLE VEHÍCULO — galería · lightbox · autoplay (SP-5.3)
   renderGallery/initGallery + lightbox completo + keydown.
   De-monolitización Fase 1: extraído VERBATIM del <script> inline.
   Plain script (scope global compartido, como js/simulador/ y js/public/home/).
   Orden de carga: detalle-data -> detalle-render -> detalle-gallery -> detalle-page.
   ============================================================ */

        function renderGallery() {
            document.getElementById('mainImage').src = currentImages[0];
            document.getElementById('imageCounter').textContent = `1/${currentImages.length}`;

            const thumbnailsHTML = currentImages.map((img, index) =>
                `<div class="thumbnail ${index === 0 ? 'active' : ''}" data-index="${index}">
                    <img src="${img}" alt="Vista ${index + 1}">
                </div>`
            ).join('');
            document.getElementById('thumbnailsGrid').innerHTML = thumbnailsHTML;
        }

        function initGallery() {
            document.querySelectorAll('.thumbnail').forEach(thumb => {
                thumb.addEventListener('click', (e) => {
                    const index = parseInt(e.currentTarget.dataset.index);
                    changeMainImage(index);
                });
            });

            document.querySelector('.main-image-container').addEventListener('click', () => {
                openLightbox(currentImageIndex);
            });

            // Lightbox controls
            document.getElementById('lightboxClose').addEventListener('click', closeLightbox);
            document.getElementById('lightboxPrev').addEventListener('click', function(e) {
                e.stopPropagation();
                navigateLightbox(-1);
            });
            document.getElementById('lightboxNext').addEventListener('click', function(e) {
                e.stopPropagation();
                navigateLightbox(1);
            });

            document.getElementById('lightbox').addEventListener('click', (e) => {
                if (e.target.id === 'lightbox') closeLightbox();
            });

            // Zoom on image click - only direct clicks, no multi-tap
            var _lastZoomTap = 0;
            document.getElementById('lightboxImage').addEventListener('click', (e) => {
                e.stopPropagation();
                if (_lbNavigating) return;
                var now = Date.now();
                if (now - _lastZoomTap < 400) return; // prevent rapid multi-tap zoom
                _lastZoomTap = now;
                toggleZoom();
            });

            // Touch gestures for mobile swipe - only on the lightbox-container (image area)
            var lbContainer = document.querySelector('.lightbox-container');
            var _lbTouchStartX = 0;
            var _lbTouchStartY = 0;
            var _lbTouchMoved = false;

            if (lbContainer) {
                lbContainer.addEventListener('touchstart', function(e) {
                    _lbTouchStartX = e.touches[0].clientX;
                    _lbTouchStartY = e.touches[0].clientY;
                    _lbTouchMoved = false;
                }, { passive: true });

                lbContainer.addEventListener('touchmove', function(e) {
                    var dx = Math.abs(e.touches[0].clientX - _lbTouchStartX);
                    var dy = Math.abs(e.touches[0].clientY - _lbTouchStartY);
                    if (dx > 10 || dy > 10) _lbTouchMoved = true;
                }, { passive: true });

                lbContainer.addEventListener('touchend', function(e) {
                    if (!_lbTouchMoved) return; // was a tap, not swipe
                    var diff = _lbTouchStartX - e.changedTouches[0].clientX;
                    if (Math.abs(diff) > 50) {
                        if (diff > 0) navigateLightbox(1);
                        else navigateLightbox(-1);
                    }
                }, { passive: true });
            }

            // Enable drag-to-scroll on thumbnails
            var thumbGrid = document.getElementById('thumbnailsGrid');
            if (thumbGrid) {
                var tDown = false, tStartX = 0, tScrollL = 0, tMoved = false;
                thumbGrid.style.cursor = 'grab';
                thumbGrid.addEventListener('mousedown', function(e) {
                    tDown = true; tMoved = false;
                    tStartX = e.clientX; tScrollL = thumbGrid.scrollLeft;
                    thumbGrid.style.cursor = 'grabbing';
                });
                thumbGrid.addEventListener('mousemove', function(e) {
                    if (!tDown) return; e.preventDefault();
                    var walk = e.clientX - tStartX;
                    thumbGrid.scrollLeft = tScrollL - walk;
                    if (Math.abs(walk) > 5) tMoved = true;
                });
                thumbGrid.addEventListener('mouseup', function() { tDown = false; thumbGrid.style.cursor = 'grab'; });
                thumbGrid.addEventListener('mouseleave', function() { tDown = false; thumbGrid.style.cursor = 'grab'; });
            }

            // ===== AUTOPLAY: Pausar al hover, reanudar al salir =====
            const gallerySection = document.querySelector('.gallery-section');
            if (gallerySection) {
                gallerySection.addEventListener('mouseenter', stopGalleryAutoplay);
                gallerySection.addEventListener('mouseleave', startGalleryAutoplay);
            }

            // Iniciar autoplay
            startGalleryAutoplay();
        }

        function changeMainImage(index) {
            currentImageIndex = index;
            document.getElementById('mainImage').src = currentImages[index];
            document.getElementById('imageCounter').textContent = `${index + 1}/${currentImages.length}`;

            document.querySelectorAll('.thumbnail').forEach((thumb, i) => {
                thumb.classList.toggle('active', i === index);
            });
        }

        // ===== GALLERY AUTOPLAY =====
        function startGalleryAutoplay() {
            if (currentImages.length <= 1) return;
            stopGalleryAutoplay();
            galleryAutoplayInterval = setInterval(() => {
                const nextIndex = (currentImageIndex + 1) % currentImages.length;
                changeMainImage(nextIndex);
            }, GALLERY_AUTOPLAY_DELAY);
        }

        function stopGalleryAutoplay() {
            if (galleryAutoplayInterval) {
                clearInterval(galleryAutoplayInterval);
                galleryAutoplayInterval = null;
            }
        }

        function openLightbox(index) {
            stopGalleryAutoplay(); // Pausar autoplay al abrir lightbox
            currentImageIndex = index;
            updateLightboxImage();
            renderLightboxDots();
            document.getElementById('lightbox').classList.add('active');
            document.body.style.overflow = 'hidden';
            isZoomed = false;
            document.getElementById('lightboxImage').classList.remove('zoomed');
        }

        function closeLightbox() {
            document.getElementById('lightbox').classList.remove('active');
            document.body.style.overflow = 'auto';
            isZoomed = false;
            document.getElementById('lightboxImage').classList.remove('zoomed');
            startGalleryAutoplay(); // Reanudar autoplay al cerrar lightbox
        }

        function updateLightboxImage() {
            const img = document.getElementById('lightboxImage');
            img.src = currentImages[currentImageIndex];
            document.getElementById('lightboxCounter').textContent =
                `${currentImageIndex + 1} / ${currentImages.length}`;

            // Update navigation buttons
            document.getElementById('lightboxPrev').disabled = currentImageIndex === 0;
            document.getElementById('lightboxNext').disabled = currentImageIndex === currentImages.length - 1;

            // Update dots
            document.querySelectorAll('.lightbox-dot').forEach((dot, i) => {
                dot.classList.toggle('active', i === currentImageIndex);
            });
        }

        function navigateLightbox(direction) {
            if (_lbNavigating) return; // debounce rapid taps
            var newIndex = currentImageIndex + direction;
            if (newIndex < 0 || newIndex >= currentImages.length) return;
            _lbNavigating = true;
            currentImageIndex = newIndex;
            updateLightboxImage();

            // Reset zoom when navigating
            isZoomed = false;
            document.getElementById('lightboxImage').classList.remove('zoomed');

            // Release debounce after transition
            setTimeout(function() { _lbNavigating = false; }, 300);
        }

        function renderLightboxDots() {
            const dotsContainer = document.getElementById('lightboxDots');
            if (currentImages.length <= 1) {
                dotsContainer.innerHTML = '';
                return;
            }

            dotsContainer.innerHTML = currentImages.map((_, i) =>
                `<button class="lightbox-dot ${i === currentImageIndex ? 'active' : ''}"
                         data-index="${i}" aria-label="Ir a imagen ${i + 1}"></button>`
            ).join('');

            dotsContainer.querySelectorAll('.lightbox-dot').forEach(dot => {
                dot.addEventListener('click', () => {
                    currentImageIndex = parseInt(dot.dataset.index);
                    updateLightboxImage();
                });
            });
        }

        function toggleZoom() {
            if (_lbNavigating) return; // don't zoom during navigation
            isZoomed = !isZoomed;
            document.getElementById('lightboxImage').classList.toggle('zoomed', isZoomed);
        }

        document.addEventListener('keydown', (e) => {
            if (document.getElementById('lightbox').classList.contains('active')) {
                if (e.key === 'Escape') closeLightbox();
                if (e.key === 'ArrowLeft') {
                    navigateLightbox(-1);
                }
                if (e.key === 'ArrowRight') {
                    navigateLightbox(1);
                }
                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    toggleZoom();
                }
            }
        });
