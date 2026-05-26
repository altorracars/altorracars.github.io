# SP-2 — Admin Destacados (cutout fuera, +tag, sin tope) · Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: usa `superpowers:subagent-driven-development` (recomendado) o `superpowers:executing-plans` para ejecutar este plan tarea-por-tarea. Los pasos usan checkbox (`- [ ]`).

**Goal:** Que el admin deje de subir el "PNG sin fondo", use la imagen principal del vehículo, permita escribir un `featuredTag` por destacado, y quite el tope de 6 destacados — para alimentar la sección "La colección" del index nuevo (SP-1).

**Architecture:** Cambios solo en el panel admin (vanilla JS + Firestore). Se elimina toda la maquinaria del cutout (`featuredCutoutPng`, subida a `cars/cutouts/`), se añade un campo de texto `featuredTag` en `vehiculos/{id}`, y se eliminan las validaciones de tope-6. NO se toca el consumidor público `featured-week-banner.js` (lo reemplaza SP-1) ni `storage.rules` (la regla `cars/**` es inocua sin uso).

**Tech Stack:** HTML + JS vanilla (ES5-style, función `$()` = getElementById), Firebase Compat Firestore. Verificación: `node -c` + E2E manual en navegador (no hay test runner en el repo).

**Contratos preservados:** `vehiculos/{id}` sigue con `destacado`, `featuredWeek`, `featuredOrder`, `imagen`. Solo se RETIRA `featuredCutoutPng` (deja de escribirse; los valores viejos en docs existentes quedan huérfanos pero inocuos) y se AÑADE `featuredTag`.

---

### Task 1: Eliminar el cutout PNG por completo (HTML + JS, sin referencias colgando)

**Files:**
- Modify: `admin.html` (bloque cutout ~3404-3425, copy ~3397)
- Modify: `js/admin/admin-vehicles.js` (refs en 933, 1001-1002, 1208-1209, 1414, 1838-1922, 1963-1970, 2633-2634)

- [ ] **Step 1: Quitar el bloque cutout de `admin.html`**

Elimina el `<div>` completo que va DESPUÉS del form-group de "Posicion en banner" y antes del cierre de `#sec-banner`. Es el bloque que empieza con el comentario/label "Imagen recortada — PNG sin fondo" y termina en su `</div>` (actualmente líneas ~3404-3425). Borra desde:
```html
                            <div>
                                <label class="form-label" style="font-size:0.75rem;">Imagen recortada — PNG sin fondo (opcional)</label>
```
…hasta el `</div>` que cierra ese bloque (justo antes de `<!-- §C.2 — Smart Fields review`). No borres el form-group de "Posicion en banner" ni el cierre de `#sec-banner`.

- [ ] **Step 2: Actualizar el copy del recuadro `#sec-banner` en `admin.html`**

Reemplaza el texto del `<p>` (línea ~3397):
```html
                                Configura la posicion y la imagen del vehiculo en el banner de inicio. Maximo 6 destacados.
```
por:
```html
                                Define el orden y la etiqueta del vehiculo en la seccion "La coleccion" del inicio.
```

- [ ] **Step 3: Quitar la sección "CUTOUT PNG UPLOAD" en `admin-vehicles.js`**

Borra el bloque contiguo `// ========== CUTOUT PNG UPLOAD ==========` … hasta el final del listener `cutoutInput` (actualmente líneas ~1838-1922), que incluye: listeners `cutoutFileInput`/`cutoutUploadArea` (change/dragover/dragleave/drop), `showCutoutError`, `handleCutoutFile`, `uploadCutoutToStorage`, `renderCutoutPreview`, `clearCutoutPng`, y el listener de `cutoutInput`. Detente ANTES de `// Auto-check "En Oferta"...` (ese listener de `precioOferta` se conserva).

- [ ] **Step 4: Quitar el bloque "Cutout buttons" en `admin-vehicles.js`**

Borra (actualmente ~1963-1970):
```javascript
    // Cutout buttons (migrated from inline onclick)
    var btnCutoutClear = $('btnCutoutClear');
    if (btnCutoutClear) btnCutoutClear.addEventListener('click', function() { clearCutoutPng(); });
    var cutoutUploadArea = $('cutoutUploadArea');
    if (cutoutUploadArea) cutoutUploadArea.addEventListener('click', function() {
        var fi = $('cutoutFileInput');
        if (fi) fi.click();
    });
```

- [ ] **Step 5: Quitar los exports cutout en `admin-vehicles.js`**

Borra (actualmente ~2633-2634):
```javascript
    AP.clearCutoutPng = clearCutoutPng;
    AP.renderCutoutPreview = renderCutoutPreview;
```

- [ ] **Step 6: Quitar la referencia en `buildVehicleData`**

Borra la línea (actualmente 1414):
```javascript
            featuredCutoutPng: $('vFeaturedCutoutPng') ? ($('vFeaturedCutoutPng').value.trim() || null) : null,
```

- [ ] **Step 7: Quitar las referencias en el snapshot de autosave**

En el objeto de snapshot (collect, ~933) borra la línea:
```javascript
            vFeaturedCutoutPng: $('vFeaturedCutoutPng') ? $('vFeaturedCutoutPng').value : '',
```
En el restore del snapshot (~1001-1002) borra las dos líneas:
```javascript
        if ($('vFeaturedCutoutPng')) $('vFeaturedCutoutPng').value = snap.vFeaturedCutoutPng || '';
        renderCutoutPreview(snap.vFeaturedCutoutPng || '');
```

- [ ] **Step 8: Quitar las referencias en el load de edición**

En el load de edición (~1208-1209) borra las dos líneas:
```javascript
        if ($('vFeaturedCutoutPng')) $('vFeaturedCutoutPng').value = v.featuredCutoutPng || '';
        renderCutoutPreview(v.featuredCutoutPng || '');
```

- [ ] **Step 9: Verificar sintaxis (no quedan referencias)**

Run: `node -c js/admin/admin-vehicles.js`
Expected: sin salida (exit 0). Luego confirma cero referencias residuales:
Run (Grep, no Bash): buscar `cutout` (case-insensitive) en `js/admin/admin-vehicles.js` y `Cutout` en `admin.html`.
Expected: **0 coincidencias** en ambos.

---

### Task 2: Añadir el campo `featuredTag`

**Files:**
- Modify: `admin.html` (nuevo input en `#sec-banner`)
- Modify: `js/admin/admin-vehicles.js` (save 1413-area, autosave collect ~932, restore ~1000, load ~1207)

- [ ] **Step 1: Añadir el input `#vFeaturedTag` en `admin.html`**

Dentro de `#sec-banner`, JUSTO DESPUÉS del cierre `</div>` del form-group de "Posicion en banner" (donde antes empezaba el bloque cutout), inserta:
```html
                            <div class="form-group" style="max-width:280px;">
                                <label class="form-label" style="font-size:0.75rem;">Tag de la coleccion (opcional)</label>
                                <input type="text" id="vFeaturedTag" class="form-input" maxlength="24" placeholder="Ej: Familiar, Off-road, Hibrido, Premium">
                                <small style="color:var(--admin-text-muted,#8b949e);font-size:0.72rem;">Etiqueta que aparece en la tarjeta de "La coleccion".</small>
                            </div>
```

- [ ] **Step 2: Guardar `featuredTag` en `buildVehicleData`**

Donde estaba `featuredCutoutPng` (ahora eliminado), tras la línea `featuredOrder: ...` (1413), añade:
```javascript
            featuredTag: $('vFeaturedTag') ? ($('vFeaturedTag').value.trim() || null) : null,
```

- [ ] **Step 3: Incluir `featuredTag` en el snapshot de autosave (collect)**

En el objeto snapshot (~932), tras `vFeaturedOrder: ...`, añade:
```javascript
            vFeaturedTag: $('vFeaturedTag') ? $('vFeaturedTag').value : '',
```

- [ ] **Step 4: Restaurar `featuredTag` en el restore del snapshot**

Donde estaba el restore de cutout (~1001, ahora eliminado), tras `if ($('vFeaturedOrder')) $('vFeaturedOrder').value = snap.vFeaturedOrder || '';` añade:
```javascript
        if ($('vFeaturedTag'))     $('vFeaturedTag').value     = snap.vFeaturedTag    || '';
```

- [ ] **Step 5: Cargar `featuredTag` en el load de edición**

Tras `if ($('vFeaturedOrder')) $('vFeaturedOrder').value = v.featuredOrder || '';` (~1207) añade:
```javascript
        if ($('vFeaturedTag'))     $('vFeaturedTag').value     = v.featuredTag    || '';
```

- [ ] **Step 6: Verificar sintaxis**

Run: `node -c js/admin/admin-vehicles.js`
Expected: exit 0, sin salida.

---

### Task 3: Quitar el tope de 6 destacados + generalizar el campo de orden

**Files:**
- Modify: `js/admin/admin-vehicles.js` (cap en save ~1510-1519, cap en toggle ~2458-2461)
- Modify: `admin.html` (label e input de orden ~3400-3402)

- [ ] **Step 1: Quitar el cap en el path de guardado (`buildVehicleData`/save)**

Borra el bloque del tope (actualmente ~1510-1519):
```javascript
        // Limitar maximo 6 vehiculos destacados (= banner)
        if ($('vDestacado').checked) {
            var editId = $('vId').value ? parseInt($('vId').value, 10) : null;
            var otherDestacados = AP.vehicles.filter(function(v) {
                return v.destacado && v.id !== editId;
            });
            if (otherDestacados.length >= 6) {
                AP.toast('Maximo 6 vehiculos destacados. Desmarca uno existente primero.', 'error');
                return;
            }
```
**Atención:** justo después viene la detección de orden duplicado que USA `otherDestacados` y `editId`. Conserva esa lógica, pero como ya no se declaran arriba, reescribe el inicio de ese bloque así (reemplaza el `if ($('vDestacado').checked) {` eliminado por uno nuevo que conserve la validación de orden):
```javascript
        // Validar orden duplicado en la coleccion (sin tope de cantidad)
        if ($('vDestacado').checked) {
            var editId = $('vId').value ? parseInt($('vId').value, 10) : null;
            var otherDestacados = AP.vehicles.filter(function(v) {
                return v.destacado && v.id !== editId;
            });
            // Detectar orden duplicado en banner
            var fwOrder = $('vFeaturedOrder') ? (parseInt($('vFeaturedOrder').value, 10) || null) : null;
```
(Es decir: se elimina el `if (otherDestacados.length >= 6) {...}` y se fusiona la declaración de `editId`/`otherDestacados` con la validación de orden ya existente. Verifica que las llaves `{}` queden balanceadas: el bloque `if ($('vDestacado').checked) {` sigue cerrando donde cerraba antes.)

- [ ] **Step 2: Quitar el cap en `toggleDestacadoFn` (estrella de la tabla)**

Borra (actualmente ~2458-2461):
```javascript
        if (newVal) {
            var count = AP.vehicles.filter(function(v) { return v.destacado; }).length;
            if (count >= 6) { AP.toast('Maximo 6 vehiculos destacados en banner.', 'error'); return; }
        }
```

- [ ] **Step 3: Generalizar el input de orden en `admin.html`**

Reemplaza (líneas ~3400-3402):
```html
                                <label class="form-label" style="font-size:0.75rem;">Posicion en banner (1-6)</label>
                                <input type="number" id="vFeaturedOrder" class="form-input" min="1" max="6" placeholder="1-6">
                                <small style="color:var(--admin-text-muted,#8b949e);font-size:0.72rem;">Opcional — define el orden de aparicion</small>
```
por:
```html
                                <label class="form-label" style="font-size:0.75rem;">Orden en la coleccion (opcional)</label>
                                <input type="number" id="vFeaturedOrder" class="form-input" min="1" placeholder="1, 2, 3...">
                                <small style="color:var(--admin-text-muted,#8b949e);font-size:0.72rem;">Menor numero = aparece primero. Sin limite de destacados.</small>
```

- [ ] **Step 4: Verificar sintaxis + llaves balanceadas**

Run: `node -c js/admin/admin-vehicles.js`
Expected: exit 0, sin salida (si hay desbalance de `{}` tras el Step 1, fallará aquí — revisar).

---

### Task 4: Cache bump + verificación E2E + entrega del commit

**Files:**
- Modify: `service-worker.js` (`CACHE_VERSION`)
- Modify: `js/cache-manager.js` (`APP_VERSION`)
- Modify: `docs/05-ESTADO-GLOBAL.md` (cache version vigente)

- [ ] **Step 1: Bump de cache (§4)**

En `service-worker.js` (`CACHE_VERSION`) y `js/cache-manager.js` (`APP_VERSION`) pon un nuevo timestamp `vYYYYMMDDHHMMSS` MAYOR que `v20260526002104` (usa la hora real actual). Actualiza la fila "Cache version vigente" en `docs/05-ESTADO-GLOBAL.md` al mismo valor.

- [ ] **Step 2: Verificación E2E manual (admin)**

Abre `admin.html` en el navegador (sesión admin) y verifica:
1. Editar un vehículo → sección "Publicación" → marcar "Destacar": aparece `#sec-banner` SIN el bloque de PNG sin fondo, CON el input "Tag de la coleccion".
2. Escribir un tag (ej. "Familiar"), guardar, recargar, reabrir el vehículo → el tag persiste (lee `featuredTag` de Firestore).
3. Marcar **7+ vehículos** como destacados (estrella en tabla y/o form) → NO aparece el error "Maximo 6"; todos quedan destacados.
4. La consola del navegador no muestra errores (`ReferenceError: renderCutoutPreview/clearCutoutPng is not defined`, etc.).
5. El index actual (`index.html`) sigue cargando su `#fw-banner` sin romperse (usa `v.imagen` cuando no hay cutout).

- [ ] **Step 3: Entregar el mensaje de commit al cliente (CLAUDE.md §2 — el cliente commitea)**

Presenta este mensaje para que el cliente lo use en GitHub Desktop/web:

**Summary:**
```
SP-2: admin destacados sin PNG cutout, +featuredTag, sin tope de 6
```
**Descripción:**
```
- Elimina la subida "PNG sin fondo" (featuredCutoutPng) del form de vehiculo:
  UI en admin.html + funciones/listeners/exports en admin-vehicles.js.
  La coleccion usara la imagen principal (v.imagen).
- Anade campo libre featuredTag (vehiculos/{id}) con input en el form,
  guardado/carga/autosave.
- Quita el tope de 6 destacados (path de guardado + estrella de tabla) y
  generaliza el campo de orden (sin max). Conserva la deteccion de orden
  duplicado.
- featured-week-banner.js y storage.rules intactos (SP-1 reemplaza el banner).
- Cache bump v20260526xxxxxx.
```

---

## Self-Review

- **Cobertura del spec (§6 SP-2):** quitar cutout ✅ (Task 1) · usar imagen principal ✅ (consumidor ya cae a `v.imagen`; cutout deja de escribirse) · +`featuredTag` ✅ (Task 2) · quitar tope 6 ✅ (Task 3). Sin gaps.
- **Sin placeholders:** todos los pasos llevan código/anchor reales + verificación concreta (`node -c` + Grep + E2E).
- **Consistencia de tipos/nombres:** se eliminan JUNTOS `renderCutoutPreview`/`clearCutoutPng` y sus 4 callers (933, 1001-1002, 1208-1209) → sin referencias colgando. `featuredTag` usa el mismo patrón `$('vFeaturedTag')` que `featuredOrder` en los 4 puntos (save/collect/restore/load). `otherDestacados`/`editId` se preservan para la validación de orden tras quitar el cap.
- **Riesgo/rollback:** cambios aislados a 2 archivos admin + 3 de cache/doc; rollback = revertir el commit. No toca producción pública ni reglas.
