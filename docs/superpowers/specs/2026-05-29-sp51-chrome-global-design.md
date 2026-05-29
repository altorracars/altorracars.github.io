# SP-5.1 — Chrome global cinematic (design spec)

**Status:** Drafted 2026-05-29 · pending user review before writing-plans.
**Author:** Claude (Opus 4.7) bajo brainstorming guiado.
**Lóbulo asociado:** `docs/43-UX.md` (R0).
**Skill consultado:** `anthropic-skills:redesign-existing-projects`.

---

## Goal

Promover el chrome (header + footer + tipografía + tokens cromáticos) de
`index.html` cinematic a TODAS las páginas públicas legacy del sitio. Tras
deploy, las ~87 páginas legacy (root + cron-generadas vía `vehiculos/*` +
`marcas/*` + templates) recibirán **chrome cinematic + tokens + fuentes
HarmonyOS** en su próximo page-load. El BODY de páginas legacy queda intacto
en SP-5.1 — eso es competencia de SP-5.2 (body migration por categorías).

Con SP-5.1 + SP-5.0.g ya entregado, el contraste visual cliente ↔ resto del
sitio cae de 100% a ~30% (las fuentes solas + el chrome unificado dan
sensación de "mismo sitio" aunque los bodies de las legacy aún sean Poppins
+ dark-theme).

## Background / Context

**Auditoría 43-UX R0 (lóbulo activado 2026-05-29)**:
- Solo 1 página (`index.html`) en HarmonyOS cinematic en producción.
- ~87 páginas legacy con `Poppins` + `dark-theme.css` + `style.css` + chrome viejo
  via `snippets/{header,footer}.html` + `components.js`.
- Bug fix SP-5.0.g ya cerró el caso del footer faltante en `favoritos.html` +
  `perfil.html`.

**Plan integral (3 fases)**:
1. ✅ **SP-5.0.g** — fix footer bug favoritos/perfil (cerrado 2026-05-29).
2. 🚧 **SP-5.1** — chrome + tokens + fuentes global (este spec).
3. 🔮 **SP-5.2** — body migration por categorías (soft → catálogo → templates
   con regen cron). Spec aparte cuando llegue el momento.

## Architecture

### Resumen 1-frase

`snippets/{header,footer}.html` se vuelven cinematic + `components.js` carga
CSS tokens + fonts Manrope/Instrument/Cardo + `home-chrome.js` globalmente,
**solo en páginas no-index** (idempotente).

### Flujo end-to-end

```
Browser carga una página legacy (ej. nosotros.html):
  │
  ├─ <head> tiene <link> a CSS legacy (style.css, dark-theme.css, ...)
  │
  ├─ <body> tiene #header-placeholder + content + #footer-placeholder
  │
  ├─ Scripts cargan en defer order. components.js corre.
  │
  ├─ components.js (modificado en SP-5.1):
  │   1. Detectar si la página YA tiene chrome inline (index → skip).
  │   2. Inject <link> preconnect a fonts.gstatic.com.
  │   3. Inject <link> a Google Fonts (Manrope + Instrument Serif + Cardo).
  │   4. Inject <link> a css/home/tokens-redesign.css.
  │   5. Inject <link> a css/home/chrome-redesign.css.
  │   6. Inject <script defer> a js/public/home/home-chrome.js.
  │   7. fetch snippets/header.html → inject en #header-placeholder.
  │   8. fetch snippets/footer.html → inject en #footer-placeholder.
  │   9. applyAuthHintToHeader() (ya existe).
  │
  ├─ home-chrome.js (sin cambios): detecta .alt-nav en DOM al
  │   DOMContentLoaded → activa scroll-machine + dropdown + drawer.
  │
  └─ Render: chrome cinematic + body legacy (intacto).
```

### Componentes afectados

| File | Acción | Detalle |
|---|---|---|
| `snippets/header.html` | REESCRITO | Markup del `<header class="alt-nav" id="header">` copiado de `index.html` (~líneas 360-510). Preserva IDs `#header`, `#btnLogin`, `#favCount`, `#favCountMobile`, `#navMobOpen`, `#navMobDrawer`, `#navMobClose`. Dropdown + drawer markup completo. |
| `snippets/footer.html` | REESCRITO | Markup del `<footer class="alt-footer">` copiado de `index.html` (~860-960). **Excepción de copy**: cambiar "Marketplace digital · Colombia" → "Cartagena, Bolívar, Colombia" (SEO local + viejo). Preservar rating "4.9 ★ · 247 reseñas Google" (hardcoded por ahora; SP-4 podría conectarlo a Google API). |
| `js/core/components.js` | EXTENDIDO | Función nueva `injectCinematicAssets()` llamada al inicio de `loadAllComponents()`. Idempotente vía marcador `data-altorra-cinematic-injected`. Detecta páginas con chrome inline (index) y se salta. |
| `service-worker.js` | BUMP | `CACHE_VERSION` actualizado. |
| `js/core/cache-manager.js` | BUMP | `APP_VERSION` actualizado. |
| `docs/05-ESTADO-GLOBAL.md` | UPDATE | Build status + cache version. |
| `docs/10-MEMORIA-CORTO-PLAZO.md` | UPDATE | Foco actualizado. |
| `docs/99-HISTORIAL-ADR.md` | APPEND | ADR §126 (Reflejo de Cierre). |
| `docs/00-INDICE.md` | APPEND | Fila §126 en el map. |
| `docs/43-UX.md` | APPEND R1 | Actualizar lóbulo con resultado de SP-5.1 (Ronda 1). |

### `components.js` — diff conceptual

**Antes** (actual):
```js
async function loadAllComponents() {
    await Promise.all([
        loadComponent('header-placeholder', 'snippets/header.html'),
        loadComponent('footer-placeholder', 'snippets/footer.html')
    ]);
    applyAuthHintToHeader();
    requestAnimationFrame(() => { /* ... */ });
    loadModalsIfNeeded();
    loadAuthSystem();
    closeMenuOnHashNav();
}
```

**Después**:
```js
function hasInlineChrome() {
    return !!document.querySelector('header.alt-nav');
}

function injectCinematicAssets() {
    if (hasInlineChrome()) return; // index ya los carga inline
    if (document.querySelector('link[data-altorra-cinematic-injected]')) return; // idempotente

    var head = document.head;

    // 1. Preconnect (perf hint)
    var preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://fonts.gstatic.com';
    preconnect.crossOrigin = 'anonymous';
    head.appendChild(preconnect);

    // 2. Google Fonts (Manrope + Instrument Serif + Cardo)
    var fontsLink = document.createElement('link');
    fontsLink.rel = 'stylesheet';
    fontsLink.href = 'https://fonts.googleapis.com/css2?'
        + 'family=Manrope:wght@200;300;400;500;600;700'
        + '&family=Instrument+Serif:ital@0;1'
        + '&family=Cardo:ital,wght@0,400;0,700;1,400'
        + '&display=swap';
    head.appendChild(fontsLink);

    // 3. Tokens HarmonyOS
    var tokensLink = document.createElement('link');
    tokensLink.rel = 'stylesheet';
    tokensLink.href = 'css/home/tokens-redesign.css';
    tokensLink.setAttribute('data-altorra-cinematic-injected', 'tokens');
    head.appendChild(tokensLink);

    // 4. Chrome styles (nav + footer)
    var chromeLink = document.createElement('link');
    chromeLink.rel = 'stylesheet';
    chromeLink.href = 'css/home/chrome-redesign.css';
    head.appendChild(chromeLink);

    // 5. Chrome JS (scroll-machine + dropdown + drawer)
    var chromeScript = document.createElement('script');
    chromeScript.src = 'js/public/home/home-chrome.js';
    chromeScript.defer = true;
    document.body.appendChild(chromeScript);
}

async function loadAllComponents() {
    injectCinematicAssets(); // NEW
    await Promise.all([
        loadComponent('header-placeholder', 'snippets/header.html'),
        loadComponent('footer-placeholder', 'snippets/footer.html')
    ]);
    applyAuthHintToHeader();
    requestAnimationFrame(() => { /* ... existing ... */ });
    loadModalsIfNeeded();
    loadAuthSystem();
    closeMenuOnHashNav();
}
```

### IDs de contrato (preservados — §3.2 doctrina)

El header cinematic preserva los IDs/clases que módulos externos usan:

- `#header` — `favorites-manager.js._forceShowHeader()` lo busca.
- `#btnLogin` — `auth.js` se ata.
- `#favCount`, `#favCountMobile`, `#favoritesCount` — contadores de fav.
- `[data-modal="vende-auto"]` — `contact-forms.js` delega.
- `[data-modal="financiacion"]` — `contact-forms.js` delega.

El footer cinematic preserva:
- `.footer-soc--wa`, `.footer-soc--ig`, `.footer-soc--fb` — URLs reales.
- Links a `terminos.html`, `privacidad.html`, `cookies.html`.

## Scope

### ✅ Lo que SÍ entra

- Update de `snippets/header.html` con markup cinematic 1:1 desde `index.html`.
- Update de `snippets/footer.html` con markup cinematic + copy preservation
  (Cartagena explícito).
- Extensión de `components.js` con `injectCinematicAssets()` (idempotente).
- Cache bump completo (sw + cache-manager + 05).
- Brain consolidation (ADR §126 + 10 + 43-UX R1).
- Verificación visual en 4 páginas representativas tras deploy.

### ❌ Lo que NO entra (deferred a SP-5.2)

- Body styles de páginas legacy (Poppins → Manrope; dark-theme → tokens).
- `base-redesign.css` (tiene reglas de body que pueden afectar legacy).
- `cinematic.css` completo (section-specific: .cin-hero, .cin-av, etc.; no
  aplica en legacy).
- Migración de `admin.html` y subsystem admin (motor cromático §115-117
  separado).
- Templates `detalle-vehiculo.html` + `marca.html` body changes (SP-5.2.c/d
  con regen cron).
- Page-loader cinematic style refresh (SP-5.7).

## Risks & Mitigations

### Risk 1 — Tokens cinematic chocan con legacy
- **Estado**: ✅ **descartado por verificación previa**. Grep en `style.css` +
  `dark-theme.css` no encontró NINGÚN overlap con las primeras 20 variables de
  `tokens-redesign.css` (--blur-*, --container, --danger, --dark-*, --dur-*,
  --ease-*, --font-*, --gold-*). Los namespaces no se cruzan.
- **Mitigación residual**: post-deploy verificar visualmente que botones, links
  y forms legacy mantienen su look (no se aplicaron tokens cinematic
  inesperados).

### Risk 2 — Font load size impacta perf
- **Riesgo**: 3 fonts × 4-5 weights = ~150-300 kb adicional por página.
- **Mitigación**:
  - `display: swap` en la URL de Google Fonts (sin FOIT).
  - `preconnect` a `fonts.gstatic.com` (handshake adelantado).
  - Considerar subset si la auditoría 45-PERFORMANCE futura lo recomienda.
- **Verificación**: LCP/FCP en Lighthouse pre vs post (sample 3 páginas) tras
  deploy. Si LCP empeora >20%, abrir ticket de optimización en
  `45-PERFORMANCE.md`.

### Risk 3 — `home-chrome.js` busca DOM antes de que esté inyectado
- **Riesgo**: home-chrome.js se monta en `DOMContentLoaded`. components.js
  hace fetch+inject de snippets DESPUÉS del DOMContentLoaded (en su
  `loadAllComponents`). Race condition: home-chrome.js corre antes de que
  `.alt-nav` exista en DOM.
- **Mitigación recomendada** (más limpia):
  - `components.js` dispara un evento custom `altorra:chrome:ready` en
    `document` después del inject de `snippets/header.html`.
  - `home-chrome.js` listener `document.addEventListener('altorra:chrome:ready', init)`
    + el listener actual de `DOMContentLoaded` (cualquiera que dispare PRIMERO
    activa init).
  - `init` ya es idempotente (flag `__altorraHomeChromeMounted`) → segundo
    disparador es no-op.
  - Sin observer global. Sin polling. Sin race time-based.
- **Verificación**: scroll en una página legacy debe activar la máquina de
  3-estados igual que en index.

### Risk 4 — Chrome cinematic más alto que legacy en mobile
- **Riesgo**: Tokens `--nav-h: 64px` (cinematic). Si páginas legacy asumían
  altura diferente, primer paint puede correr el contenido.
- **Mitigación**: pre-verificación visual de 2 páginas legacy en mobile post-deploy.
  Si hay desfase, ajustar `--nav-h` en legacy via CSS scope o repositionar via
  CSS local.

### Risk 5 — Page-loader animation overlap
- **Riesgo**: Páginas legacy usan `#page-loader` (animación dorada). Cinematic
  chrome también tiene su look. Posible double-flash en primer load.
- **Mitigación**: page-loader actual desaparece en `window.load`. No tocar
  `page-loader.css` en SP-5.1. Si hay flash visible, SP-5.7 (page-loader
  cinematic) lo absorbe.

### Risk 6 — favoritos/perfil sin `<footer>` previo: ¿extras de styling?
- **Estado**: post SP-5.0.g, ambas tienen `#footer-placeholder`. Pero su body
  legacy NO tenía espacio reservado para footer.
- **Mitigación**: en favoritos.html, perfil.html validar visualmente que el
  footer se ve OK tras inject (no encima del último elemento del body, no
  cortado).

## Verification (cómo sabemos que funcionó)

Tras deploy, validar **4 páginas representativas** + DevTools:

1. **`nosotros.html`** (soft page con hero existente) — chrome cinematic visible arriba, footer cinematic abajo, hero del nosotros intacto.
2. **`busqueda.html`** (catálogo) — chrome cinematic, filtros y resultados intactos.
3. **`favoritos.html`** (con bug fix SP-5.0.g) — chrome cinematic, contenido intacto, **footer cinematic visible** (validación cruzada de SP-5.0.g).
4. **`vehiculos/chevrolet-equinox-ls-2018-1.html`** (cron-generada) — chrome cinematic, body de detalle intacto.

**Para cada una validar**:
- ✅ Header cinematic visible con logo wheel + nav links + dropdown + favoritos pip + login button.
- ✅ Footer cinematic visible con 3 cols + rating + Cartagena.
- ✅ Scroll-machine 3-estados (TOP → scrolled → gone, reaparece on scroll up).
- ✅ Mega-dropdown "Vehículos" abre y muestra categorías.
- ✅ Drawer móvil abre/cierra.
- ✅ Body intacto (sin shifts visibles del content existente).
- ✅ Login button funciona (auth modal abre).
- ✅ Favoritos pip muestra contador correcto.
- ✅ Sin errores rojos en Console.

**Test de regresión**:
- En `nosotros.html`: comparar visualmente el body vs pre-deploy. Texto en
  Poppins (no Manrope) — confirma que SP-5.1 NO migró body (correcto, eso es
  SP-5.2).
- En `favoritos.html`: agregar y quitar un favorito → contador cinematic
  actualiza correctamente.
- En `simulador-credito.html` (no testeada explícitamente): form de
  financiación debe seguir funcionando exactamente igual.

## Cache bump

Current vigente: `v20260530200000` (post SP-5.0.f).
Nuevo: `vYYYYMMDDHHMMSS` con timestamp > vigente.

Updated en: `service-worker.js` (`CACHE_VERSION`), `js/core/cache-manager.js` (`APP_VERSION`), `docs/05-ESTADO-GLOBAL.md` (fila vigente).

## Out of scope (deferred)

- **SP-5.2.a**: body migration soft pages (nosotros, contacto, simulador,
  comparar, favoritos, perfil, resenas, terminos, privacidad, cookies, 404).
- **SP-5.2.b**: body migration catálogo (busqueda, vehiculos-*, marcas).
- **SP-5.2.c**: template `detalle-vehiculo.html` body + regen cron 45 hijas.
- **SP-5.2.d**: template `marca.html` body + regen cron 18 hijas.
- **SP-4**: motor recomendaciones GA-based + custom image upload destacados.
- **SP-5.7**: page-loader cinematic style refresh.
- **SP-5.8**: Smart Update Prompts refinement.

## Aprobación

Spec drafted y self-reviewed.

**Próximo paso**: cliente revisa este archivo. Si OK, Claude invoca
`writing-plans` skill para generar el plan task-by-task (tipo SP-1 T1-T8) con
sub-agentes para implementación.

**Si cliente quiere ajustes**: feedback inline, Claude actualiza spec, vuelve a
self-review.
