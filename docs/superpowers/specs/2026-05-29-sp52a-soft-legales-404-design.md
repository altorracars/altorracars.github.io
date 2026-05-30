# SP-5.2.a — Body migration piloto: Legales + 404 (design spec)

**Status:** Drafted 2026-05-29 · pending user review before writing-plans.
**Author:** Claude (Opus 4.8) bajo brainstorming guiado (cliente dio carta blanca).
**Lóbulo asociado:** `docs/43-UX.md` (R0-R3).
**Naturaleza:** PORT (fuente de verdad: `altorra-cars-design-system/project/redesign/`).

---

## Goal

Migrar el BODY de 4 soft pages legacy (`terminos.html`, `privacidad.html`,
`cookies.html`, `404.html`) al tema cinematic HarmonyOS, como PILOTO de la
fase SP-5.2 (body migration). El chrome (nav + footer) ya es cinematic global
(SP-5.1 + SP-5.1.b). Este piloto migra el CONTENIDO de cada página y establece
el patrón "soft page cinematic" que SP-5.2.b/c reutilizan.

**Principio rector**: las legales son un port de PRESENTACIÓN, no de contenido.
El texto legal oficial actual del sitio se preserva palabra por palabra; solo
cambia el envoltorio visual. El 404 sí adopta el texto del redesign (no hay
"contenido oficial" más allá del mensaje).

## Background

**Auditoría 43-UX (R0-R2)**: el sitio tiene chrome cinematic global (SP-5.1+b)
pero los BODIES legacy siguen en Poppins + dark-theme + style.css. SP-5.2
migra los bodies, decompuesto en 3 lotes:
- **SP-5.2.a (este, piloto)**: Legales + 404. 🟢 texto, bajo riesgo.
- SP-5.2.b: Editorial (nosotros, contacto, resenas).
- SP-5.2.c: App-like (favoritos, perfil, comparar, simulador). 🔴 JS funcional.

**Fuente de diseño** (redesign, ya local):
- `SoftPages.jsx` `LegalPage({kind})` (L523-582) → markup de legales.
- `SoftPages.jsx` `NotFound()` (L587-605) → markup del 404.
- `soft.css` (724 líneas) → estilos `.soft-page`/`.soft-hero`/`.legal-*`/`.nf-*`/`.soft-cta`.

## Architecture

### Token dependency (resuelto)

`soft.css` tiene 136 referencias a tokens `--cin-*` (`--cin-bg`, `--cin-ink`,
`--cin-ink-soft`, `--cin-display`, `--cin-sans`, etc.). Esos tokens están
definidos en `css/home/cinematic.css` (L6-19), que las legacy NO cargan.

**Solución (bajo riesgo)**: `css/home/soft-redesign.css` incluye al inicio un
bloque `:root { --cin-*: ... }` (copiado verbatim de cinematic.css L5-30) +
el contenido de soft.css. Así el archivo es AUTO-CONTENIDO y NO toca
`cinematic.css` (que el index usa en producción).

> Deuda técnica documentada: los tokens `--cin-*` quedan duplicados
> (cinematic.css + soft-redesign.css). Centralizarlos a un `tokens-cin.css`
> compartido es un refactor posterior (cuando SP-5.2.b/c también los necesiten);
> no se hace ahora para no tocar el index.

### CSS loading per page

Cada página migrada carga, en su `<head>` ESTÁTICO (no via injectCinematicAssets,
que es global del chrome):
```html
<link rel="stylesheet" href="css/home/soft-redesign.css">
```
Posición: después de los CSS legacy existentes (style.css/dark-theme.css), para
que el cascade del cinematic gane donde haya clases compartidas (no las hay en
el body nuevo, pero por seguridad). El chrome ya lo inyecta components.js.

### Body replacement per page

| Página | Body actual (a reemplazar) | Body nuevo (cinematic) |
|---|---|---|
| `terminos.html` | `<section class="terms-content">` con `.legal-card` (41 párrafos) | `<main class="soft-page">` → `.soft-hero--small` + `.legal-section` con N `.legal-article` (h2 + p) **preservando cada cláusula actual** |
| `privacidad.html` | idem legacy | idem cinematic, contenido actual preservado |
| `cookies.html` | idem legacy | idem cinematic, contenido actual preservado |
| `404.html` | body legacy | `<main class="soft-page">` → `.nf-section` (nf-num 404 + nf-h + nf-sub + nf-actions) |

**Preservación de contenido legal**: el subagente LEE el contenido legal actual
de cada página (todos los `<h2>`/`<h3>` + `<p>` dentro del body legal), y los
re-mapea 1:1 a `.legal-article` (cada sección = un `<article class="legal-article">`
con su `<h2>` + `<p>`). NO se inventa, recorta ni reemplaza texto legal. Si una
sección actual tiene varios párrafos, se conservan todos.

### Markup template — legal page

```html
<main class="soft-page" data-cin="on">
  <section class="soft-hero soft-hero--small">
    <div class="soft-hero-inner">
      <span class="cin-eyebrow">Legal · Términos</span>
      <h1 class="soft-hero-h">Términos y Condiciones</h1>
      <p class="soft-hero-sub">Última actualización: mayo de 2026.</p>
    </div>
  </section>
  <section class="soft-section legal-section">
    <article class="legal-article"><h2>…</h2><p>…</p></article>
    <!-- … una por cada cláusula actual … -->
  </section>
</main>
```

### Markup template — 404

```html
<main class="soft-page" data-cin="on">
  <section class="nf-section">
    <div class="nf-num"><span>4</span><span class="nf-mid">0</span><span>4</span></div>
    <h1 class="nf-h">Esta ruta <span class="nf-h-accent">no existe.</span></h1>
    <p class="nf-sub">El link puede estar roto, el vehículo ya se vendió o llegaste aquí por suerte.</p>
    <div class="nf-actions">
      <a href="index.html" class="soft-cta">Volver al inicio</a>
      <a href="busqueda.html" class="soft-cta soft-cta--alt">Explorar vehículos</a>
    </div>
  </section>
</main>
```
(Rutas ajustadas: el redesign usaba `catalog.html` inexistente → `busqueda.html`.
CTA "Ir al catálogo" → "Explorar vehículos" por consistencia con la mejora que
el cliente pidió para el comparador.)

## Scope

### ✅ Entra
- `css/home/soft-redesign.css` (NUEVO): tokens `--cin-*` + soft.css.
- Body de `terminos.html`, `privacidad.html`, `cookies.html`, `404.html` →
  markup cinematic, contenido legal preservado.
- `<link>` a soft-redesign.css en el `<head>` de las 4 páginas.
- Cache bump + brain consolidation (ADR §128 + 43-UX R3).

### ❌ NO entra (deferred)
- Editorial (nosotros/contacto/resenas) → SP-5.2.b.
- App-like (favoritos/perfil/comparar/simulador) → SP-5.2.c.
- Retiro de style.css/dark-theme.css de las legales (optimización posterior;
  en el piloto se mantienen — clases viejas quedan sin uso, inocuas).
- Centralización de tokens `--cin-*` (refactor posterior).
- Cambios al chrome (ya cinematic global).

## Contracts to preserve (§3.2)

- Chrome: `#header-placeholder` + `#footer-placeholder` + carga de `components.js`
  INTACTOS en las 4 páginas (el chrome cinematic los rellena).
- Loader/cookies/modales: si las páginas cargan `page-loader.js`, `cookies.js`,
  contact-forms (modales), se mantienen.
- Las 4 páginas siguen teniendo sus `<head>` SEO/meta/canonical actuales (solo
  se AÑADE el `<link>` a soft-redesign.css; no se quitan metas).
- Rutas internas válidas (index.html, busqueda.html, terminos/privacidad/cookies
  entre sí en el footer).

## Risks & mitigations

| Risk | Mitigation |
|---|---|
| Tokens `--cin-*` faltantes → soft.css no estiliza | soft-redesign.css los incluye (auto-contenido). Verificar grep `--cin-bg` en el archivo. |
| Pérdida/alteración de texto legal | El subagente preserva cada `<h2>`/`<p>` actual 1:1; spec reviewer compara conteo de cláusulas actual vs migrado. |
| `.soft-page background var(--cin-bg)` no cubre / flash | `.soft-page { min-height: 100vh }` + el chrome es fixed flotante encima. Verificar visual. |
| Conflicto con style.css en el body | El body nuevo usa clases nuevas (`.soft-page`/`.legal-article`) que style.css no define → sin conflicto. Las viejas (`.terms-content`) quedan sin elementos. |
| Doble fondo (dark-theme body vs soft-page) | `.soft-page` cubre el viewport; si asoma, ajustar. Verificación visual. |

## Verification

`node -c` no aplica (HTML/CSS). Verificación:
1. grep: `soft-redesign.css` enlazado en las 4 páginas; `--cin-bg` presente en el CSS.
2. grep: conteo de `.legal-article` en cada legal ≥ conteo de cláusulas del body actual (no se perdió contenido).
3. Cliente E2E (post-deploy, Ctrl+Shift+R):
   - `terminos.html` / `privacidad.html` / `cookies.html`: hero cinematic pequeño (eyebrow dorado + título serif) + cláusulas legibles con el texto ACTUAL completo. Chrome cinematic arriba/abajo.
   - `404.html`: número 404 grande cinematic + CTAs "Volver al inicio" / "Explorar vehículos" funcionales.
   - Footer cinematic + sin errores rojos en consola.

## Cache bump

`v20260531120000` → `vYYYYMMDDHHMMSS` (> vigente). En service-worker.js +
cache-manager.js + 05.

## Out of scope (deferred) — recordatorio

- SP-5.2.b (editorial) · SP-5.2.c (app-like, incluye comparador con mejoras:
  "Explorar vehículos" + selección inline).
- SP-4 (recomendaciones GA + image upload).

## Aprobación

Spec drafted. Cliente dio carta blanca ("sigamos bajo tu recomendación, te diré
si algo no me gusta"). Próximo paso: writing-plans → subagentes. El cliente puede
intervenir en cualquier punto.
