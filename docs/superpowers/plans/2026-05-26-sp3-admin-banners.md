# SP-3 — Admin Banners ricos (`home_promo`) · Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: usa `superpowers:subagent-driven-development`. Pasos con checkbox (`- [ ]`).

**Goal:** Añadir un tipo de banner enriquecido `home_promo` (con badge, eyebrow, chip de tasa, pills y CTA) gestionable desde el CRUD de banners existente, para alimentar la sección "Lo que está pasando esta semana" del index nuevo (SP-1).

**Architecture:** Extiende el módulo de banners existente (`js/admin/admin-banners.js` + el modal en `admin.html`) — NO se crea infraestructura nueva. Se reutiliza la colección `banners`, su `onSnapshot`, el upload a Storage `banners/`, y las reglas Firestore actuales. Se añade la posición `home_promo` con su pestaña/lista propias y un grupo de campos ricos que aparece solo para esa posición. El consumidor en el homepage es responsabilidad de SP-1 (no se toca `loadPromoBanners`, que filtra `promocional`).

**Tech Stack:** HTML + JS vanilla (`$(id)` = getElementById), Firebase Compat Firestore + Storage. Verificación: `node -c` + E2E manual en admin (no hay test runner).

**Modelo de datos `banners/{id}` para `home_promo`** (reutiliza + añade):
- Reutilizados: `title` (=titular; usa `*asteriscos*` para la parte dorada en cursiva), `subtitle` (=subtexto/párrafo), `cta` (=etiqueta del botón), `link` (=URL destino del CTA), `image` (=foto de fondo), `order`, `active`, meta/`_version`.
- NUEVOS (solo se escriben si `position==='home_promo'`): `badge` (string), `eyebrow` (string), `rateValue` (string, ej "0.95% MV"), `rateLabel` (string, ej "Tasa desde"), `pills` (array de ≤3 strings).

**No-regresión:** `hero`/`promocional`/`categoria` siguen igual. `loadPromoBanners` (main.js, filtra `promocional`) y `featured-week-banner.js` intactos. Reglas Firestore y Storage sin cambios.

---

### Task 1: HTML — posición `home_promo`, pestaña/lista, y grupo de campos ricos

**Files:**
- Modify: `admin.html` (tabs ~2161-2171, tab-content ~2197-2208, position select ~2234-2238, después de `#bannerCatGroup` ~2255)

- [ ] **Step 1: Añadir la opción `home_promo` al select de posición**

En `#bannerPosition` (~línea 2237, después de la opción `categoria`) añade:
```html
                                    <option value="home_promo">Inicio · Promos semana</option>
```

- [ ] **Step 2: Añadir la 4ª pestaña**

Después del botón de pestaña "Categorias" (~línea 2170), antes de cerrar `.admin-tabs`, añade:
```html
                <button class="btn btn-ghost banners-tab" data-banners-tab="homePromo" role="tab" aria-selected="false">
                    Inicio · Promos
                </button>
```
(El handler de pestañas en `admin-banners.js` líneas ~365-374 ya cablea todo `.banners-tab` al cargar; `data-banners-tab="homePromo"` → contenedor `#bannersTabHomePromo`.)

- [ ] **Step 3: Añadir el contenido de la 4ª pestaña**

Después del `<div id="bannersTabCategoria" ...>...</div>` (cierra ~línea 2207), antes de cerrar `#sec-banners` (`</div>` ~2208), añade:
```html
            <!-- TAB: Inicio Promos -->
            <div id="bannersTabHomePromo" class="banners-tab-content" style="display:none;">
                <div class="stat-card">
                    <p style="color:var(--admin-text-muted);margin-bottom:1rem;font-size:0.85rem;">
                        Banners de "Lo que esta pasando esta semana" en el inicio. Sin limite. Usa los campos enriquecidos (badge, tasa, pills, CTA).
                    </p>
                    <div id="homePromoBannersList" class="banners-grid">
                        <p class="empty-state">Cargando banners...</p>
                    </div>
                </div>
            </div>
```

- [ ] **Step 4: Añadir el grupo de campos ricos al modal**

Justo DESPUÉS del `<div ... id="bannerCatGroup">...</div>` (cierra ~línea 2255) y ANTES del form-group de "Enlace" (~2257), inserta:
```html
                        <!-- Campos enriquecidos (solo para posicion home_promo) -->
                        <div id="bannerHomePromoGroup" style="display:none;border:1px solid rgba(184,150,88,0.25);border-radius:8px;padding:0.9rem 1rem;margin-bottom:1rem;background:rgba(184,150,88,0.04);">
                            <p style="margin:0 0 0.8rem;font-size:0.78rem;color:var(--admin-text-muted,#8b949e);line-height:1.5;">
                                Para "Lo que esta pasando esta semana": el <strong>Titulo</strong> es el titular (usa <code>*asteriscos*</code> para la parte dorada en cursiva, ej. <code>Aprobado en *24 horas*</code>); el <strong>Subtitulo</strong> es el parrafo; <strong>Texto del boton CTA</strong> + <strong>Enlace</strong> arman el boton; la imagen es el fondo.
                            </p>
                            <div class="form-row form-grid-2">
                                <div class="form-group">
                                    <label>Badge / etiqueta</label>
                                    <input type="text" id="bannerBadge" class="form-input" maxlength="28" placeholder="Ej: Financiacion Premium">
                                </div>
                                <div class="form-group">
                                    <label>Eyebrow (linea superior)</label>
                                    <input type="text" id="bannerEyebrow" class="form-input" maxlength="48" placeholder="Ej: Tasa preferencial · solo este mes">
                                </div>
                            </div>
                            <div class="form-row form-grid-2">
                                <div class="form-group">
                                    <label>Chip tasa — valor</label>
                                    <input type="text" id="bannerRateValue" class="form-input" maxlength="16" placeholder="Ej: 0.95% MV">
                                </div>
                                <div class="form-group">
                                    <label>Chip tasa — etiqueta</label>
                                    <input type="text" id="bannerRateLabel" class="form-input" maxlength="20" placeholder="Ej: Tasa desde">
                                </div>
                            </div>
                            <div class="form-group" style="margin-bottom:0;">
                                <label>Pills (hasta 3)</label>
                                <div class="form-row form-grid-2" style="gap:0.5rem;">
                                    <input type="text" id="bannerPill1" class="form-input" maxlength="28" placeholder="Ej: 5 bancos aliados">
                                    <input type="text" id="bannerPill2" class="form-input" maxlength="28" placeholder="Ej: Hasta 84 meses">
                                </div>
                                <input type="text" id="bannerPill3" class="form-input" maxlength="28" placeholder="Ej: 0% inicial disponible" style="margin-top:0.5rem;">
                            </div>
                        </div>
```

---

### Task 2: `admin-banners.js` — render, toggle, save, edit

**Files:**
- Modify: `js/admin/admin-banners.js` (renderAllBannerLists ~49-53, toggleCategoryField ~357-362, saveBanner ~233-250, editBanner ~286-304)

- [ ] **Step 1: Renderizar la lista `home_promo`**

En `renderAllBannerLists` (~49-53), tras `renderBannerList('categoria', 'catBannersList');` añade:
```javascript
        renderBannerList('home_promo', 'homePromoBannersList');
```

- [ ] **Step 2: Mostrar/ocultar el grupo rico según posición**

Reemplaza `toggleCategoryField` (~357-362) por:
```javascript
    function toggleCategoryField() {
        var pos = $('bannerPosition').value;
        var catGroup = $('bannerCatGroup');
        if (catGroup) catGroup.style.display = pos === 'categoria' ? '' : 'none';
        var hpGroup = $('bannerHomePromoGroup');
        if (hpGroup) hpGroup.style.display = pos === 'home_promo' ? '' : 'none';
    }
```

- [ ] **Step 3: Guardar los campos ricos (solo si `home_promo`)**

En `saveBanner`, justo DESPUÉS del bloque `if (AP.bannerUploadedUrl) { bannerData.image = AP.bannerUploadedUrl; }` (~248-250) y ANTES de `var btn = $('saveBanner');` (~252), añade:
```javascript
        if (bannerData.position === 'home_promo') {
            bannerData.badge = $('bannerBadge').value.trim();
            bannerData.eyebrow = $('bannerEyebrow').value.trim();
            bannerData.rateValue = $('bannerRateValue').value.trim();
            bannerData.rateLabel = $('bannerRateLabel').value.trim();
            bannerData.pills = [$('bannerPill1').value, $('bannerPill2').value, $('bannerPill3').value]
                .map(function(p) { return (p || '').trim(); })
                .filter(function(p) { return p; })
                .slice(0, 3);
        }
```

- [ ] **Step 4: Poblar los campos ricos al editar**

En `editBanner`, justo DESPUÉS de `$('bannerActive').checked = banner.active !== false;` (~293) y ANTES de `AP.bannerUploadedUrl = banner.image || '';` (~295), añade:
```javascript
        $('bannerBadge').value = banner.badge || '';
        $('bannerEyebrow').value = banner.eyebrow || '';
        $('bannerRateValue').value = banner.rateValue || '';
        $('bannerRateLabel').value = banner.rateLabel || '';
        var _pills = banner.pills || [];
        $('bannerPill1').value = _pills[0] || '';
        $('bannerPill2').value = _pills[1] || '';
        $('bannerPill3').value = _pills[2] || '';
```
(El `toggleCategoryField()` ya se llama al final de `editBanner` → mostrará el grupo si la posición es `home_promo`. El `$('bannerForm').reset()` en `closeBannerModal` ya limpia estos inputs porque están dentro del form.)

- [ ] **Step 5: Verificar sintaxis**

Run: `node -c js/admin/admin-banners.js`
Expected: exit 0, sin salida.

---

### Task 3: Cache bump + E2E + entrega del commit

**Files:**
- Modify: `service-worker.js`, `js/core/cache-manager.js`, `docs/05-ESTADO-GLOBAL.md`

- [ ] **Step 1: Cache bump (§4)**

Nuevo `vYYYYMMDDHHMMSS` MAYOR que `v20260526120000` (hora real) en `service-worker.js` `CACHE_VERSION` y `js/core/cache-manager.js` `APP_VERSION` (este sin la `v` por su convención), y actualiza `docs/05-ESTADO-GLOBAL.md`.

- [ ] **Step 2: E2E manual (admin)**

En `admin.html` (sesión admin):
1. Banners → aparece la pestaña "Inicio · Promos".
2. "Nuevo Banner" → seleccionar Ubicacion = "Inicio · Promos semana" → aparece el grupo de campos ricos (badge, eyebrow, tasa, pills); seleccionar otra ubicación → el grupo se oculta.
3. Llenar título (con `*asteriscos*`), subtítulo, CTA, enlace, badge, eyebrow, tasa, pills, subir imagen, Guardar → aparece en la pestaña "Inicio · Promos".
4. Editar ese banner → los campos ricos se repueblan correctamente.
5. Crear/editar un banner `promocional` o `hero` → NO aparece el grupo rico; sigue funcionando.
6. Recargar el index actual → el banner `promocional` existente (si hay) sigue mostrándose (el consumidor `loadPromoBanners` no cambió). Consola sin errores.

- [ ] **Step 3: Entregar el mensaje de commit (el cliente commitea — CLAUDE.md §2)**

**Summary:**
```
SP-3: admin banners ricos (home_promo) para "Lo que esta pasando"
```
**Descripción:**
```
- Nueva posicion de banner home_promo con pestaña/lista propias en el admin.
- Campos enriquecidos (badge, eyebrow, rateValue/rateLabel, pills[<=3]) que
  aparecen solo para home_promo; reutiliza title=titular, subtitle=subtexto,
  cta=etiqueta, link=destino, image=fondo.
- Extiende renderAllBannerLists, toggleCategoryField, saveBanner, editBanner.
- No toca hero/promocional/categoria, loadPromoBanners ni featured-week-banner.
  El render en el index lo hace SP-1.
- Cache bump vYYYYMMDDHHMMSS.
```

---

## Self-Review

- **Cobertura del spec (§7 SP-3):** posición/colección `home_promo` ✅ (Task 1-2) · campos badge/rateValue/rateLabel/eyebrow/headline/subtext/pills/cta/link/image ✅ (reutilizados + nuevos) · form condicional ✅ (Task 1.4 + 2.2) · save extendido ✅ (Task 2.3) · consumidor homepage = SP-1 (fuera de alcance, anotado). Sin gaps.
- **Sin placeholders:** todo el código es real; verificación `node -c` + E2E.
- **Consistencia de nombres:** ids HTML (`bannerBadge`/`bannerEyebrow`/`bannerRateValue`/`bannerRateLabel`/`bannerPill1..3`) coinciden exactamente entre Task 1.4 (HTML), Task 2.3 (save) y Task 2.4 (edit). `position==='home_promo'` (underscore) consistente; tab key `homePromo` (camel) mapea a `#bannersTabHomePromo` vía el handler existente. `homePromoBannersList` coincide entre Task 1.3 (HTML) y Task 2.1 (render).
- **Riesgo/rollback:** cambios aislados a `admin.html` + `admin-banners.js` + cache; otras posiciones y el consumidor público intactos; rollback = revertir el commit. Sin cambios en reglas/Storage (sin deploy manual). Campos ricos viejos quedan inertes si un banner cambia de `home_promo` a otra posición (aceptable).
