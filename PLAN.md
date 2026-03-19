# Plan de Correcciones — 6 Fases

> **Última actualización:** 2026-03-19
> **Estado general:** 4 de 6 fases completadas. Fases 1 y 3 pendientes (requieren assets de imagen).

---

## FASE 1: Heroes de marcas acorde a cada marca (Punto 1)

**Estado:** ⏳ Pendiente — requiere assets de imagen

**Problema:** Los banners actuales (`multimedia/banner/b_{marca}.png`) son fotos de stock genéricas. Aunque ya muestran vehículos de la marca correcta (corregido en PR #324), no tienen un estilo visual consistente (fondo oscuro/elegante, logo integrado).

**Estado actual de los banners (1920×800, JPEG guardados como .png):**
| Marca | Vehículo mostrado | Composición | Notas |
|-------|-------------------|-------------|-------|
| Audi | R8 (trasera 3/4) | Buena | Sunset, road |
| BMW | Serie 4 (frontal 3/4) | Buena | Bosque otoñal |
| Chevrolet | Camaro SS (frontal 3/4) | Buena | Desierto sunset |
| Citroën | — | Por verificar | — |
| Fiat | — | Por verificar | — |
| Ford | Expedition (frontal 3/4) | Aceptable | Valley of Fire, auto pequeño en cuadro |
| Honda | — | Por verificar | — |
| Hyundai | Tucson (trasera 3/4) | Buena | Terreno dramático |
| Jeep | — | Por verificar | — |
| Kia | SUV (close-up frontal) | Regular | Muy recortado, solo parrilla/techo |
| Mazda | MX-5 (trasera) | Regular | Vista trasera, placa polaca visible |
| Mitsubishi | — | Por verificar | — |
| Nissan | — | Por verificar | — |
| Peugeot | — | Por verificar | — |
| Renault | Clio RS (close-up frontal) | Regular | Muy recortado, persona al fondo |
| Suzuki | — | Por verificar | — |
| Toyota | 4Runner (close-up parrilla) | Regular | Solo parrilla, muy cerrado |
| Volkswagen | Golf GTI (frontal 3/4) | Buena | Placa irlandesa, en movimiento |

**Solución pendiente:**
- Reemplazar banners con composición "Regular" por imágenes más abiertas (3/4 view)
- Idealmente todas con estilo consistente: fondo oscuro, vehículo como protagonista, logo visible
- Formato: mantener 1920×800px, misma ruta `multimedia/banner/b_{marca}.png`

**Archivos afectados:**
- `multimedia/banner/b_*.png` (reemplazo selectivo de imágenes)

---

## FASE 2: Eliminar páginas de Nuevos y Usados (Punto 2)

**Estado:** ✅ Completada — PR #323 (commit `a0f5a34`)

**Cambios realizados:**
1. `vehiculos-nuevos.html` y `vehiculos-usados.html` convertidos a redirects ligeros con `<meta http-equiv="refresh">` hacia `busqueda.html?tipo=nuevo` y `busqueda.html?tipo=usado`
2. Agregado `<meta name="robots" content="noindex, follow">` y `<link rel="canonical">` apuntando a `busqueda.html`
3. Header actualizado: submenú Vehículos queda SUV | Pickup | Sedán | Hatchback | Ver todos
4. Referencias limpiadas en: `index.html` (JSON-LD), `404.html`, `favoritos.html`, `nosotros.html`, `manifest.json`, `js/render.js`, `js/performance.js`

---

## FASE 3: Hero de contacto acorde a concesionario (Punto 3)

**Estado:** ⏳ Pendiente — requiere asset de imagen

**Problema:** `multimedia/heroes/contacto-hero.jpg` muestra un pasillo de oficina genérico (paredes azul oscuro, muebles modernos), sin ninguna relación con un concesionario automotriz.

**También:** `multimedia/heroes/resenas-hero.jpg` muestra un VW Beetle viejo y oxidado — no transmite profesionalismo para una página de reseñas.

**Solución pendiente:**
- `contacto-hero.jpg` → Reemplazar con imagen de showroom/concesionario (sala de exhibición, recepción, equipo profesional)
- `resenas-hero.jpg` → Reemplazar con imagen de clientes satisfechos o entrega de vehículo
- Mantener mismas rutas y dimensiones (~1920×800px)
- No requiere cambios de código

**Archivos afectados:**
- `multimedia/heroes/contacto-hero.jpg` (reemplazo)
- `multimedia/heroes/resenas-hero.jpg` (reemplazo)

---

## FASE 4: Posicionamiento correcto de héroes — focus en vehículos (Punto 4)

**Estado:** ✅ Completada — PR #323 (commit `a0f5a34`) + commit `2a6d999`

**Cambios realizados:**

### Iteración 1 (PR #323):
- `css/dark-theme.css`: `.brand-hero-bg` cambiado de `object-position: center center` a `center 40%`
- Mismo ajuste en breakpoints responsive (768px y 480px)
- `.gradient-hero-bg` también ajustado a `center 40%`

### Iteración 2 (commit `2a6d999`):
- Agregado sistema de overrides per-marca via `data-brand-pos` en el `<img>`:
  - `data-brand-pos="center"` → `object-position: center center` (para Toyota, Renault — close-ups frontales)
  - `data-brand-pos="top"` → `object-position: center 30%` (para Kia — close-up desde arriba)
- CSS en `dark-theme.css`: selectores `body .brand-hero-bg[data-brand-pos="..."]` con especificidad suficiente para overridear media queries
- JS aplicado en `marca.html` + las 18 páginas `marcas/*.html` via `brandPosMap`

---

## FASE 5: Submenú de marcas dinámico según inventario (Punto 5)

**Estado:** ✅ Completada — PR #323 (commit `a0f5a34`)

**Cambios realizados:**
1. `js/components.js`: nueva función `populateBrandsMenu()` que:
   - Espera a que `vehicleDB` esté listo
   - Consulta marcas con al menos 1 vehículo disponible
   - Ordena por cantidad de inventario (mayor primero)
   - Muestra top 10 marcas en el submenú
   - Mantiene 8 marcas estáticas como placeholder mientras carga
2. `snippets/header.html`: agregado `id` al `<ul>` de marcas para manipulación JS
3. `index.html`: agregado `id="marcas"` a la sección del carrusel
4. "Ver todas las marcas" ahora enlaza a `index.html#marcas`

### Mejoras adicionales (commit `2a6d999`):
- Smooth scroll mejorado: compensa altura del header fijo
- Hash-on-load: navegación cross-page con anclas (`index.html#marcas`) funciona correctamente
- Modals (Financiación, Vende tu Auto) ahora se cargan en todas las páginas via `snippets/modals.html`

---

## FASE 6: Sincronización del sistema de Sitemaps

**Estado:** ✅ Completada — PR #323 (commit `a0f5a34`)

**Cambios realizados:**

| Componente | Acción | Estado |
|------------|--------|--------|
| `sitemap.xml` | Removidas URLs de nuevos/usados | ✅ |
| `scripts/generate-vehicles.mjs` | Removidas de lista estática | ✅ |
| `js/admin-operations.js` | Removidas de `_buildSitemapXml()` | ✅ |
| `index.html` JSON-LD | Removidas de SiteNavigationElement + BreadcrumbList | ✅ |
| `manifest.json` | Shortcut actualizado a `busqueda.html` | ✅ |
| `js/performance.js` | Removido prefetch de páginas eliminadas | ✅ |
| `.github/workflows/generate-vehicles.yml` | Sin cambios necesarios | ✅ |
| `functions/index.js` | Sin referencias a estas páginas | ✅ |
| `robots.txt` | Solo referencia sitemap, sin cambios | ✅ |
| Redirects (nuevos/usados) | Canonical + noindex agregados | ✅ |

---

## Resumen de estado

| Fase | Descripción | Estado | PR/Commit |
|------|-------------|--------|-----------|
| 1 | Heroes de marcas (imágenes) | ⏳ Pendiente | — |
| 2 | Eliminar nuevos/usados | ✅ Completada | PR #323 |
| 3 | Hero de contacto (imagen) | ⏳ Pendiente | — |
| 4 | Posicionamiento de héroes (CSS) | ✅ Completada | PR #323 + `2a6d999` |
| 5 | Submenú dinámico de marcas | ✅ Completada | PR #323 + `2a6d999` |
| 6 | Sincronización de sitemaps | ✅ Completada | PR #323 |

### Pendientes para completar Fases 1 y 3:
- Proveer imágenes de reemplazo para banners de marca (especialmente Kia, Toyota, Renault, Mazda)
- Proveer imagen de showroom/concesionario para `contacto-hero.jpg`
- Proveer imagen profesional para `resenas-hero.jpg`
