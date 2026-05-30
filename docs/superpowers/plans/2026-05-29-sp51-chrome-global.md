# SP-5.1 Chrome Global Cinematic — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` (recommended) or `superpowers:executing-plans` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking. Spec at `docs/superpowers/specs/2026-05-29-sp51-chrome-global-design.md`.

**Goal:** Promote the cinematic chrome (header + footer + fonts + tokens) from `index.html` to all legacy public pages by rewriting `snippets/{header,footer}.html` with cinematic markup and extending `js/core/components.js` to inject HarmonyOS assets (fonts + `tokens-redesign.css` + `chrome-redesign.css` + `home-chrome.js`) idempotently on non-index pages.

**Architecture:** `snippets/{header,footer}.html` get rewritten 1:1 from index.html's inline cinematic blocks (with one footer copy adjustment). `components.js` gains `hasInlineChrome()` (skip when index) + `injectCinematicAssets()` (preconnect, Google Fonts, 2 CSS, 1 JS) called BEFORE snippet fetch. After both snippets inject, components.js dispatches `altorra:chrome:ready` on `document`. `home-chrome.js` gains a listener for that event alongside its existing `DOMContentLoaded` path; first-fire wins via the `__altorraHomeChromeMounted` flag.

**Tech Stack:** Vanilla HTML/CSS/JS, no framework, no bundler, Firebase Compat. Verification = `node -c` on touched JS + grep on HTML + manual visual E2E by client. **Client commits manually** — each task prepares files in working tree; one final consolidated commit at the end (per project convention).

---

## Pre-flight: contracts that MUST survive (§3.2 doctrine)

The cinematic chrome already preserves these — but verify on each snippet:

| Contract | Module that depends | Element in cinematic chrome |
|---|---|---|
| `#header` | `favoritesManager._forceShowHeader()` | `<header class="alt-nav" id="header">` |
| `#btnLogin` | `auth.js` (login button) | `<button id="btnLogin">` in `.alt-nav-actions` |
| `#favCount`, `#favCountMobile` | `favoritesManager.updateAllCounters()` | favorites pip desktop + mobile drawer |
| `[data-modal="vende-auto"]` | `contact-forms.js` delegation | Publica tu vehículo CTA |
| `[data-modal="financiacion"]` | `contact-forms.js` delegation | Financiación CTA |
| `.footer-soc--wa/ig/fb` URLs reales | end-user navigation | wa.me/573235016747, instagram.com/altorracars/, facebook.com/share/14XKk6MCmiT/ |
| `terminos.html`, `privacidad.html`, `cookies.html` legal links | end-user navigation + legal | footer-bottom legal nav |

---

## File map

| File | Action | Touched in Task |
|---|---|---|
| `snippets/header.html` | REWRITE | T1 |
| `snippets/footer.html` | REWRITE | T2 |
| `js/core/components.js` | EXTEND | T3 |
| `js/public/home/home-chrome.js` | REFACTOR (small) | T4 |
| `service-worker.js` | BUMP | T5 |
| `js/core/cache-manager.js` | BUMP | T5 |
| `docs/05-ESTADO-GLOBAL.md` | UPDATE | T5 + T6 |
| `docs/99-HISTORIAL-ADR.md` | APPEND §126 | T6 |
| `docs/00-INDICE.md` | APPEND §126 row | T6 |
| `docs/10-MEMORIA-CORTO-PLAZO.md` | UPDATE | T6 |
| `docs/43-UX.md` | APPEND Ronda R1 | T6 |

---

### Task 1: Extract cinematic header to `snippets/header.html`

**Files:**
- Read: `index.html` (lines 368-502)
- Modify (rewrite): `snippets/header.html`

- [ ] **Step 1: Read the cinematic header block from index.html**

Run:
```bash
sed -n '368,502p' index.html > /tmp/cin-header.txt
```

Inspect `/tmp/cin-header.txt`. Confirm it includes:
- Opening `<header class="alt-nav" id="header">`
- `.alt-logo` (wheel + wordmark)
- `.alt-nav-links` with Inicio, Vehículos (mega-dropdown), Marcas, Nosotros, Contacto
- `.nav-dd-wrap` mega-dropdown panel with categorías (SUV/Sedan/Pickup/Hatchback) + condición (Nuevos/Usados)
- `.alt-nav-actions` with `[data-modal="vende-auto"]`, favorites pip (`#favCount`), `<button id="btnLogin">`
- Hamburguesa `#navMobOpen`
- `.mob-drawer#navMobDrawer` with all mobile links + `#navMobClose`
- Closing `</header>` at line 502

- [ ] **Step 2: Write to `snippets/header.html`**

Use `Write` tool. Replace entire content of `snippets/header.html` with the extracted block from Step 1. Add a 1-line comment at the top noting the source:

```html
<!-- Cinematic header — extracted 1:1 from index.html (SP-5.1, ADR §126). Mantener sync con el inline del index. -->
<header class="alt-nav" id="header">
  ... (the extracted block)
</header>
```

- [ ] **Step 3: Verify contracts preserved**

Run:
```bash
grep -cE 'id="header"' snippets/header.html
grep -cE 'id="btnLogin"' snippets/header.html
grep -cE 'id="favCount"' snippets/header.html
grep -cE 'id="favCountMobile"' snippets/header.html
grep -cE 'id="navMobOpen"' snippets/header.html
grep -cE 'id="navMobDrawer"' snippets/header.html
grep -cE 'id="navMobClose"' snippets/header.html
grep -cE 'data-modal="vende-auto"' snippets/header.html
```

Expected: each command returns `1` (or higher for `#header` if it's in nested places).

- [ ] **Step 4: Snippet is HTML — no `node -c`**

HTML doesn't have a syntax checker. Visual inspection of the file's structure (matching `<` and `>`, closed tags) is the verification. If you used Read after Write, no further check.

- [ ] **Step 5: File staged in working tree** (no commit yet — bundled at T6)

---

### Task 2: Extract cinematic footer to `snippets/footer.html` (with copy preservation)

**Files:**
- Read: `index.html` (lines 860-955)
- Modify (rewrite): `snippets/footer.html`

- [ ] **Step 1: Read the cinematic footer block from index.html**

Run:
```bash
sed -n '860,955p' index.html > /tmp/cin-footer.txt
```

Inspect `/tmp/cin-footer.txt`. Confirm it includes:
- `<footer class="alt-footer">` opener
- `.footer-topline`
- `.footer-body` with 3-col `.footer-grid`:
  - Col 1: `.footer-mark` brand + `.footer-tagline`
  - Col 2: `.footer-col--contact` with email, phone, location, schedule
  - Col 3: `.footer-col--social` with WhatsApp/Instagram/Facebook + rating "4.9 ★ · 247 reseñas Google"
- `.footer-bottom` with copyright + legal links (terminos/privacidad/cookies)
- Closing `</footer>` at line 955

- [ ] **Step 2: Apply copy preservation — location**

In the extracted text, the contact section currently says:
```
<span>Marketplace digital · Colombia</span>
```

Change it to:
```
<span>Cartagena, Bolívar, Colombia</span>
```

(Reason: SEO local + identidad geográfica del viejo footer. Aprobado por cliente en brainstorming.)

The rating "4.9 ★ · 247 reseñas Google" stays as-is (hardcoded por ahora; SP-4 lo conectaría a Google Reviews API si llega).

- [ ] **Step 3: Write to `snippets/footer.html`**

Use `Write` tool. Replace entire content with the (modified) extracted block. Add comment at top:

```html
<!-- Cinematic footer — extraído de index.html (SP-5.1, ADR §126). Copy: location ajustada a "Cartagena, Bolívar, Colombia" para SEO local. Mantener sync con inline del index. -->
<footer class="alt-footer">
  ... (the extracted + edited block)
</footer>
```

- [ ] **Step 4: Verify contracts preserved + copy change**

Run:
```bash
grep -cE 'class="footer-soc--wa"' snippets/footer.html
grep -cE 'wa.me/573235016747' snippets/footer.html
grep -cE 'instagram.com/altorracars' snippets/footer.html
grep -cE 'facebook.com/share/14XKk6MCmiT' snippets/footer.html
grep -cE 'terminos.html' snippets/footer.html
grep -cE 'privacidad.html' snippets/footer.html
grep -cE 'cookies.html' snippets/footer.html
grep -cE 'Cartagena, Bolívar' snippets/footer.html
grep -cE 'Marketplace digital' snippets/footer.html
```

Expected:
- First 7: return `1` (each contract present).
- "Cartagena, Bolívar": returns `1` (new copy in place).
- "Marketplace digital": returns `0` (old copy removed).

- [ ] **Step 5: File staged in working tree** (no commit yet — bundled at T6)

---

### Task 3: Extend `components.js` with `injectCinematicAssets()` + ready event

**Files:**
- Modify: `js/core/components.js` (around line 72, `loadAllComponents()`)

- [ ] **Step 1: Read current `loadAllComponents` and surrounding context**

Run:
```bash
sed -n '65,110p' js/core/components.js
```

Confirm you see:
- `async function loadComponent(elementId, componentPath)` definition (line ~55)
- `async function loadAllComponents()` (line ~72)
- The two `loadComponent('header-placeholder', ...)` + `loadComponent('footer-placeholder', ...)` calls inside `Promise.all`
- The subsequent `applyAuthHintToHeader()`, `requestAnimationFrame(...)`, `loadModalsIfNeeded()`, `loadAuthSystem()`, `closeMenuOnHashNav()` calls

- [ ] **Step 2: Add `hasInlineChrome()` and `injectCinematicAssets()` BEFORE `loadAllComponents()`**

Use `Edit` tool. Find the line `async function loadAllComponents() {` and insert these two functions immediately before:

```js
// SP-5.1: detecta páginas que YA tienen el chrome cinematic inline (index.html
// hoy). En esas, no se inyectan assets ni se busca el placeholder — components.js
// solo ejecuta el resto del wiring (modals, auth, etc.).
function hasInlineChrome() {
    return !!document.querySelector('header.alt-nav');
}

// SP-5.1: inyecta los assets HarmonyOS (fonts + tokens + chrome CSS + chrome JS)
// en páginas legacy. Idempotente — segunda llamada es no-op gracias al flag
// data-altorra-cinematic-injected.
function injectCinematicAssets() {
    if (hasInlineChrome()) return; // index ya los carga inline
    if (document.querySelector('link[data-altorra-cinematic-injected]')) return;

    var head = document.head;

    // 1. Preconnect para Google Fonts (perf hint).
    var preconnect = document.createElement('link');
    preconnect.rel = 'preconnect';
    preconnect.href = 'https://fonts.gstatic.com';
    preconnect.crossOrigin = 'anonymous';
    head.appendChild(preconnect);

    // 2. Google Fonts: Manrope + Instrument Serif + Cardo (display:swap → sin FOIT).
    var fontsLink = document.createElement('link');
    fontsLink.rel = 'stylesheet';
    fontsLink.href = 'https://fonts.googleapis.com/css2?'
        + 'family=Manrope:wght@200;300;400;500;600;700'
        + '&family=Instrument+Serif:ital@0;1'
        + '&family=Cardo:ital,wght@0,400;0,700;1,400'
        + '&display=swap';
    head.appendChild(fontsLink);

    // 3. Tokens HarmonyOS (variables CSS). data-* flag marca idempotencia.
    var tokensLink = document.createElement('link');
    tokensLink.rel = 'stylesheet';
    tokensLink.href = 'css/home/tokens-redesign.css';
    tokensLink.setAttribute('data-altorra-cinematic-injected', 'tokens');
    head.appendChild(tokensLink);

    // 4. Chrome styles (.alt-nav, .alt-footer, .nav-dd-wrap, .mob-drawer, etc.).
    var chromeLink = document.createElement('link');
    chromeLink.rel = 'stylesheet';
    chromeLink.href = 'css/home/chrome-redesign.css';
    head.appendChild(chromeLink);

    // 5. Chrome JS (scroll-machine 3-estados + dropdown + drawer).
    var chromeScript = document.createElement('script');
    chromeScript.src = 'js/public/home/home-chrome.js';
    chromeScript.defer = true;
    document.body.appendChild(chromeScript);
}

```

- [ ] **Step 3: Modify `loadAllComponents()` to call `injectCinematicAssets()` FIRST + dispatch ready event**

Use `Edit` tool. Find the current `loadAllComponents()` body and update it. The existing block:

```js
async function loadAllComponents() {
    await Promise.all([
        loadComponent('header-placeholder', 'snippets/header.html'),
        loadComponent('footer-placeholder', 'snippets/footer.html')
    ]);

    // STEP 1 — Apply auth state to header SYNCHRONOUSLY before revealing.
    ...
```

Change to:

```js
async function loadAllComponents() {
    // SP-5.1: inyectar assets HarmonyOS ANTES de fetch+inject de snippets para
    // que los <link> de CSS estén parseados cuando el snippet entre al DOM
    // (evita FOUC del chrome cinematic).
    injectCinematicAssets();

    await Promise.all([
        loadComponent('header-placeholder', 'snippets/header.html'),
        loadComponent('footer-placeholder', 'snippets/footer.html')
    ]);

    // SP-5.1: avisar a home-chrome.js que .alt-nav ya está en el DOM. El listener
    // hermana al DOMContentLoaded existente; primer fire activa init (idempotente
    // vía __altorraHomeChromeMounted).
    if (!hasInlineChrome()) {
        try {
            document.dispatchEvent(new CustomEvent('altorra:chrome:ready'));
        } catch (e) { /* CustomEvent no soportado — ignore (legacy IE) */ }
    }

    // STEP 1 — Apply auth state to header SYNCHRONOUSLY before revealing.
    ...
```

(Keep everything after `// STEP 1 —` unchanged.)

- [ ] **Step 4: Verify syntax**

Run:
```bash
node -c js/core/components.js
```

Expected: exit 0 (no syntax errors).

- [ ] **Step 5: Verify idempotency markers + new function presence**

Run:
```bash
grep -cE 'hasInlineChrome\(\)' js/core/components.js
grep -cE 'injectCinematicAssets\(\)' js/core/components.js
grep -cE 'data-altorra-cinematic-injected' js/core/components.js
grep -cE "altorra:chrome:ready" js/core/components.js
```

Expected: each ≥ 1.

- [ ] **Step 6: File staged in working tree** (no commit yet — bundled at T6)

---

### Task 4: Refactor `home-chrome.js` — listen for `altorra:chrome:ready`

**Files:**
- Modify: `js/public/home/home-chrome.js` (the bottom, where DOMContentLoaded is wired)

- [ ] **Step 1: Find the existing init wiring**

Run:
```bash
grep -nE "DOMContentLoaded|__altorraHomeChromeMounted|function init\(\)" js/public/home/home-chrome.js
```

Expected: lines for:
- `if (window.__altorraHomeChromeMounted) return;` (idempotency at IIFE top)
- the `function init()` definition
- `document.addEventListener('DOMContentLoaded', init)` or equivalent at bottom

- [ ] **Step 2: Add the `altorra:chrome:ready` listener**

Use `Edit` tool. Find the existing wiring at the bottom (similar to `home.js`):

```js
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
```

Change to:

```js
    // SP-5.1: en páginas legacy, el chrome se inyecta via components.js DESPUÉS
    // de DOMContentLoaded. Listener adicional para que init() se active cuando
    // components.js avise. Primer fire gana (init es idempotente via flag).
    document.addEventListener('altorra:chrome:ready', init);

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
```

- [ ] **Step 3: Verify init guards against missing DOM**

Read the `init()` function. Confirm: it queries DOM nodes (e.g., `var header = document.querySelector('header.alt-nav');`) and has guards (e.g., `if (!header) return;`) so calling `init()` when `.alt-nav` doesn't yet exist is a safe no-op.

If init() lacks the guard (queries DOM and assumes presence), add it:

```js
function init() {
    if (window.__altorraHomeChromeMounted) return;
    var header = document.querySelector('header.alt-nav');
    if (!header) return; // SP-5.1: en legacy se llama dos veces (event + DOMContentLoaded); el primero puede no encontrar DOM aún.
    window.__altorraHomeChromeMounted = true;
    // ... rest of init unchanged
}
```

(If the file already has equivalent guards, no change needed in this step.)

- [ ] **Step 4: Verify syntax**

Run:
```bash
node -c js/public/home/home-chrome.js
```

Expected: exit 0.

- [ ] **Step 5: Verify listener wired**

Run:
```bash
grep -cE "altorra:chrome:ready" js/public/home/home-chrome.js
```

Expected: `1`.

- [ ] **Step 6: File staged in working tree** (no commit yet — bundled at T6)

---

### Task 5: Cache bump

**Files:**
- Modify: `service-worker.js` (`CACHE_VERSION` constant near line 5)
- Modify: `js/core/cache-manager.js` (`APP_VERSION` near line 34)
- Modify: `docs/05-ESTADO-GLOBAL.md` (cache version row)

- [ ] **Step 1: Choose new cache version**

Current vigente: `v20260530200000`. New must be greater. Use: `v20260531000000` (next day, 00:00:00). If today's actual time is later, use today's timestamp instead — just ensure it's strictly greater than current.

- [ ] **Step 2: Bump `service-worker.js`**

Use `Edit` tool:

```
old_string: const CACHE_VERSION = 'v20260530200000';
new_string: const CACHE_VERSION = 'v20260531000000';
```

- [ ] **Step 3: Bump `js/core/cache-manager.js`**

Use `Edit` tool:

```
old_string:     const APP_VERSION = '20260530200000';
new_string:     const APP_VERSION = '20260531000000';
```

- [ ] **Step 4: Update `docs/05-ESTADO-GLOBAL.md` cache row**

Use `Edit` tool. Find the "Cache version vigente" row and update the version. Also update the build status row briefly to mention SP-5.1 working tree.

Old:
```
| **Build** | 🟢 SP-1 cinematic + SP-5.0 polish completo (rounds a→f) en producción. Rastro saga cerrada (ADR §124, L-14/L-15, M-04). Foco: evaluando propuesta Omni-Brain (Gemini 3.1 Pro vía Antigravity) — análisis crítico + plan pendiente de aprobación. |
| **Cache version vigente** | `v20260530200000` (estable post-SP-5.0.f) |
```

New:
```
| **Build** | 🟢 SP-1 + SP-5.0 + SP-5.0.g + Omni-Brain Fase 1 en producción. SP-5.1 chrome global working tree (snippets + components.js + home-chrome.js + cache bump). Próximo deploy expande HarmonyOS a las ~87 páginas legacy. |
| **Cache version vigente** | `v20260531000000` (bumpeado en SP-5.1) |
```

- [ ] **Step 5: Verify all three changed**

Run:
```bash
grep -E "v20260531000000|'20260531000000'" service-worker.js js/core/cache-manager.js docs/05-ESTADO-GLOBAL.md
```

Expected: 3 matches (one per file).

- [ ] **Step 6: Verify cache-manager.js still parses**

Run:
```bash
node -c js/core/cache-manager.js
```

Expected: exit 0.

- [ ] **Step 7: Files staged in working tree** (no commit yet — bundled at T6)

---

### Task 6: Brain consolidation (Reflejo de Cierre §G.4)

**Files:**
- Modify: `docs/10-MEMORIA-CORTO-PLAZO.md` (foco update)
- Modify: `docs/99-HISTORIAL-ADR.md` (append ADR §126)
- Modify: `docs/00-INDICE.md` (append §126 row)
- Modify: `docs/43-UX.md` (append Ronda R1)

- [ ] **Step 1: Update `docs/10-MEMORIA-CORTO-PLAZO.md`**

Use `Edit` tool. Find the "EN CURSO AHORA — SP-5 brainstorming" block and replace with:

```markdown
- **SP-5.1 chrome global ENTREGADO en working tree** (ADR §126): snippets/{header,footer}.html
  cinematic + components.js injectCinematicAssets() + home-chrome.js listener altorra:chrome:ready
  + cache bump v20260531000000. ~87 páginas legacy recibirán chrome cinematic en próximo
  page-load tras deploy. Body queda intacto (SP-5.2 lo absorbe).
- **PRÓXIMOS PASOS**:
  1. Cliente commitea + deploya SP-5.1.
  2. Verificación visual en 4 páginas (nosotros, busqueda, favoritos, vehiculos/some-slug).
  3. Si OK → arrancamos **SP-5.2.a Soft pages body migration** (nosotros, contacto,
     simulador, comparar, favoritos, perfil, resenas, terminos, privacidad, cookies, 404).
  4. Auditoría 45-PERFORMANCE eventual para validar LCP/FCP impact del font load global.
```

- [ ] **Step 2: Append ADR §126 to `docs/99-HISTORIAL-ADR.md`**

Use `Edit` tool. Find the end of ADR §125 (probably `### 125.7 Doctrina aplicada` block) and append after it:

```markdown

---

## 126. ADR-126 — SP-5.1: Chrome global cinematic vía snippets + components.js

> Spec: `docs/superpowers/specs/2026-05-29-sp51-chrome-global-design.md`. Plan: `docs/superpowers/plans/2026-05-29-sp51-chrome-global.md`. Lóbulo asociado: `43-UX.md` (R0→R1).

### 126.1 Causa raíz
Auditoría 43-UX R0 (Trigger 🔵 primer uso) detectó que SOLO `index.html` está en HarmonyOS cinematic — las ~87 páginas legacy (root + cron-generadas) cargan Poppins + dark-theme.css + style.css + chrome viejo via snippets. Sitio se ve fragmentado: el cliente percibe "dos sitios distintos".

### 126.2 Solución estructural
1. `snippets/header.html` REESCRITO con markup cinematic copiado de `index.html` (~líneas 368-502). Preserva IDs/clases de contrato (§3.2): `#header`, `#btnLogin`, `#favCount`, `#favCountMobile`, `#navMobOpen`, `#navMobDrawer`, `#navMobClose`, `[data-modal="vende-auto"]`.
2. `snippets/footer.html` REESCRITO con markup cinematic (~líneas 860-955) + copy preservation: "Marketplace digital · Colombia" → "Cartagena, Bolívar, Colombia" (SEO local + identidad). Rating "4.9 ★ · 247 reseñas Google" preservado (hardcoded por ahora; SP-4 podría conectarlo a Google API).
3. `js/core/components.js` EXTENDIDO con:
   - `hasInlineChrome()` — detecta páginas con chrome inline (index).
   - `injectCinematicAssets()` — idempotente. Carga preconnect a fonts.gstatic.com + Google Fonts (Manrope + Instrument Serif + Cardo, `display:swap`) + `tokens-redesign.css` + `chrome-redesign.css` + `home-chrome.js`. Skip en index.
   - Dispatch `altorra:chrome:ready` evento post-inject.
4. `js/public/home/home-chrome.js` REFACTOR: listener para `altorra:chrome:ready` hermana al `DOMContentLoaded` existente. Primer fire activa init (idempotente via `__altorraHomeChromeMounted`). Resuelve race condition en páginas legacy donde el chrome se inyecta DESPUÉS de DOMContentLoaded.
5. Cache bump `v20260530200000` → `v20260531000000` en service-worker.js + cache-manager.js + 05.

### 126.3 No-regresión
- Pre-verificación: cero overlap de tokens cinematic vs style.css/dark-theme.css legacy (grep validado).
- Pre-verificación: contratos JS preservados (favoritesManager, auth.js, contact-forms.js delegation).
- `node -c` exit 0 en components.js + home-chrome.js + cache-manager.js.
- Body de páginas legacy intacto — `nosotros.html` debe seguir mostrando Poppins post-deploy (SP-5.2 lo migra).

### 126.4 Tests E2E (cliente)
4 páginas representativas tras deploy:
- `nosotros.html` (soft page) — chrome cinematic + body Poppins intacto.
- `busqueda.html` (catálogo) — chrome cinematic + filtros funcionales.
- `favoritos.html` (con bug fix SP-5.0.g) — chrome cinematic + footer visible.
- `vehiculos/chevrolet-equinox-ls-2018-1.html` (cron-generada) — chrome cinematic + detalle intacto.

Cada una validar: header (scroll-machine 3-estados, mega-dropdown, drawer móvil, login button, fav pip), footer (3-col, social cards, Cartagena, rating), sin errores rojos en consola.

### 126.5 Anti-patterns evitados
- ❌ No se reescribió `style.css` (doctrina §3 + plan SP-1 explícitos).
- ❌ No se cargó `cinematic.css` completo en legacy (sería overkill; sección-specific solo en páginas con esa markup).
- ❌ No se introdujo MutationObserver global (§35) para detectar inject — se usó CustomEvent + DOMContentLoaded.
- ❌ No se forzó polling time-based — primer fire de cualquiera de los dos listeners gana.

### 126.6 Archivos modificados / INTACTOS
**Modificados:** `snippets/header.html`, `snippets/footer.html`, `js/core/components.js`, `js/public/home/home-chrome.js`, `service-worker.js`, `js/core/cache-manager.js`, `docs/05-ESTADO-GLOBAL.md`.
**INTACTOS:** `index.html` (cero cambios — sigue con chrome inline), `css/home/*` (cero cambios), todo el body de las legacy, admin, templates body (SP-5.2.c/d separados).

### 126.7 Doctrina aplicada + cache bump
- §3.2 HTML/CSS estable (cero rename de IDs).
- §17 perf (font-display swap, preconnect, sin layout animation).
- §35 (CustomEvent en vez de MutationObserver para race resolution).
- §G.2 Trigger 🔵 (skill consultado: `redesign-existing-projects`).
- §G.4 Reflejo de Neurogénesis (lóbulo 43-UX R1 actualizado).
- Cache: `v20260530200000` → `v20260531000000` (§4).
- Rollback: `git revert` de este commit; las ~87 páginas vuelven al chrome viejo.
```

- [ ] **Step 3: Find §126 line number for the index**

Run:
```bash
grep -nE "^## 126\." docs/99-HISTORIAL-ADR.md
```

Note the line number (e.g., `42085`). Use it in the next step.

- [ ] **Step 4: Append row to `docs/00-INDICE.md`**

Use `Edit` tool. Find the §125 row and append below it:

```
| §126 | SP-5.1 Chrome global cinematic (snippets + components.js + home-chrome.js + cache bump) | <line-from-Step-3> |
```

- [ ] **Step 5: Append Ronda R1 to `docs/43-UX.md`**

Use `Edit` tool. Find the "## Pendientes / próxima ronda" section near the end and insert a new R1 block BEFORE it:

```markdown
## Hallazgos · 2026-05-29 · Ronda 1 (SP-5.1 chrome global entregado)

### Cambios aplicados
- `snippets/header.html` cinematic (extracted from index lines 368-502).
- `snippets/footer.html` cinematic con location "Cartagena, Bolívar, Colombia" (preservada del viejo).
- `js/core/components.js` extendido: `injectCinematicAssets()` idempotente + dispatch `altorra:chrome:ready`.
- `js/public/home/home-chrome.js` listener para `altorra:chrome:ready` + DOMContentLoaded.
- Cache bump `v20260531000000`.

### Estado del sitio post-SP-5.1
- **Chrome HarmonyOS**: ✅ las ~88 páginas (index + las 87 legacy con placeholder) tras deploy.
- **Body HarmonyOS**: ⏳ solo `index.html`. SP-5.2 absorbe el resto.
- **Fragmentación visual**: caída de 100% a ~30% — fuentes + chrome unificados; el body legacy aún en Poppins/dark-theme.

### Próxima ronda (SP-5.2)
- 5.2.a Soft pages: hero cinematic + secciones con tokens.
- 5.2.b Catálogo: reusar `.cin-av-card`.
- 5.2.c Template detalle → cron regen 45 hijas.
- 5.2.d Template marca → cron regen 18 hijas.

```

- [ ] **Step 6: Run brain:check**

Run:
```bash
npm run brain:check
```

Expected: `✅ CEREBRO SANO` con 153/153 índice sincronizado (152 previo + §126 nueva). Si reporta desync, ajustar la línea del §126 row en 00-INDICE.

- [ ] **Step 7: Files staged in working tree** — todos listos para el commit final

---

### Task 7: Final commit handoff to cliente

**Files staged (sin commit aún)**:
- `snippets/header.html`
- `snippets/footer.html`
- `js/core/components.js`
- `js/public/home/home-chrome.js`
- `service-worker.js`
- `js/core/cache-manager.js`
- `docs/05-ESTADO-GLOBAL.md`
- `docs/10-MEMORIA-CORTO-PLAZO.md`
- `docs/99-HISTORIAL-ADR.md`
- `docs/00-INDICE.md`
- `docs/43-UX.md`

= **11 archivos** para el commit final.

- [ ] **Step 1: Entregar mensaje de commit al cliente**

**Summary:**
```
SP-5.1: Chrome global cinematic — snippets + components.js + cache v20260531000000
```

**Description:**
```
Spec: docs/superpowers/specs/2026-05-29-sp51-chrome-global-design.md
Plan: docs/superpowers/plans/2026-05-29-sp51-chrome-global.md
ADR §126.

Promueve el chrome HarmonyOS (header + footer + fonts + tokens) de
index.html a las ~87 páginas legacy. Body de legacy intacto (SP-5.2
lo migra).

CAMBIOS:
- snippets/header.html → markup cinematic 1:1 desde index L368-502.
  Preserva IDs de contrato (#header, #btnLogin, #favCount,
  #favCountMobile, #navMobOpen, #navMobDrawer, #navMobClose,
  [data-modal="vende-auto"]).
- snippets/footer.html → markup cinematic desde index L860-955.
  Copy preservation: "Marketplace digital · Colombia" →
  "Cartagena, Bolívar, Colombia" (SEO local). Rating 4.9★ ·
  247 reseñas Google preservado (hardcoded hoy, SP-4 lo
  conectaría a Google API).
- js/core/components.js: hasInlineChrome() + injectCinematicAssets()
  idempotente (preconnect + Manrope + Instrument Serif + Cardo +
  tokens-redesign.css + chrome-redesign.css + home-chrome.js).
  Skip en index. Dispatch 'altorra:chrome:ready' post-inject.
- js/public/home/home-chrome.js: listener para
  'altorra:chrome:ready' hermana DOMContentLoaded existente.
  Primer fire activa init (idempotente via flag).
- service-worker.js + cache-manager.js: bump v20260530200000 →
  v20260531000000.
- docs (10/99/00/43-UX/05): consolidación brain.

NO-REGRESIÓN:
- Pre-verificación: cero overlap de tokens cinematic vs legacy.
- Contratos JS preservados (favoritesManager, auth.js,
  contact-forms.js delegation).
- node -c exit 0 en 3 JS modificados.
- Body legacy intacto (Poppins en nosotros.html debe seguir
  post-deploy).
- Cero código admin tocado.

VERIFICACIÓN POST-DEPLOY:
4 páginas representativas (nosotros, busqueda, favoritos,
vehiculos/chevrolet-equinox-ls-2018-1) deben mostrar chrome
cinematic + body intacto + sin errores consola.
```

- [ ] **Step 2: Lista de archivos para stagear (NO `git add -A`)**

Entregar al cliente la lista exacta:

```
snippets/header.html
snippets/footer.html
js/core/components.js
js/public/home/home-chrome.js
service-worker.js
js/core/cache-manager.js
docs/05-ESTADO-GLOBAL.md
docs/10-MEMORIA-CORTO-PLAZO.md
docs/99-HISTORIAL-ADR.md
docs/00-INDICE.md
docs/43-UX.md
```

- [ ] **Step 3: Cliente commitea (en GitHub Desktop)**

- Stage los 11 archivos uno por uno (cero `git add -A`).
- Paste summary + description.
- Commit.
- Push.
- Cambiar a `main`. Merge into current branch. Push.
- Esperar ~1-2 min GitHub Pages.

- [ ] **Step 4: Validación visual del cliente**

Tras deploy:
- `https://altorracars.github.io/nosotros.html` → chrome cinematic visible arriba, body Poppins intacto abajo.
- `https://altorracars.github.io/busqueda.html` → chrome cinematic + filtros funcionando.
- `https://altorracars.github.io/favoritos.html` → chrome cinematic + footer visible (validación cruzada SP-5.0.g).
- `https://altorracars.github.io/vehiculos/chevrolet-equinox-ls-2018-1.html` → chrome cinematic + detalle del Equinox intacto.

Para cada una verificar (Ctrl+Shift+R primera vez):
- Header con logo wheel + nav + dropdown + favoritos pip + login.
- Footer 3-col + WhatsApp/IG/FB + Cartagena + rating + legal links.
- Scroll-machine 3-estados (TOP → scrolled → gone, reaparece on scroll up).
- Mega-dropdown "Vehículos" abre y muestra categorías.
- Drawer móvil abre/cierra.
- DevTools Console: cero errores rojos.

- [ ] **Step 5: Si OK → arrancar SP-5.2.a. Si falla → reportar a Claude para hotfix**

---

## Self-Review (checklist run by author)

**1. Spec coverage:**
- ✅ Goal del spec (chrome cinematic global vía snippets + components.js) → T1 + T2 + T3.
- ✅ Architecture (flujo end-to-end) → T3.
- ✅ Componentes afectados (file map del spec) → T1-T6.
- ✅ `injectCinematicAssets()` diff conceptual del spec → T3 Step 2-3.
- ✅ IDs de contrato preservados → Pre-flight contract table + T1 Step 3 verification.
- ✅ Risk 1 (token overlap) — descartado en spec; no requiere mitigación implementada.
- ✅ Risk 2 (font load size) → font-display:swap + preconnect en T3 Step 2.
- ✅ Risk 3 (race condition) → CustomEvent + listener en T3 + T4.
- ✅ Risk 4 (chrome height mobile) → mitigación deferred a post-deploy visual; documentada en T7 Step 4.
- ✅ Risk 5 (page-loader flash) → out of scope, mencionado.
- ✅ Risk 6 (favoritos/perfil sin footer estructural) → cubierto por SP-5.0.g previo + T7 Step 4 validación cruzada.
- ✅ Verification del spec (4 páginas) → T7 Step 4.
- ✅ Cache bump del spec → T5.
- ✅ Out of scope (body, admin, templates) — respetado.

**2. Placeholder scan:**
- ✅ Ningún "TBD" / "TODO".
- ✅ Cache version timestamp es concreto (`v20260531000000`).
- ✅ `<OPEN_LINE>,<CLOSE_LINE>` en T1 Step 2 son `368,502` literal — no placeholder.
- ✅ `<line-from-Step-3>` en T6 Step 4 se calcula al momento — instrucción explícita.

**3. Type consistency:**
- ✅ `injectCinematicAssets()` con nombre consistente en T3 Step 2 + T3 Step 3 + ADR §126.
- ✅ `hasInlineChrome()` consistente.
- ✅ `altorra:chrome:ready` consistente (T3 + T4 + ADR).
- ✅ `data-altorra-cinematic-injected` consistente.
- ✅ `__altorraHomeChromeMounted` consistente con código existente.

**4. Ambiguity check:**
- ✅ T1 Step 1 muestra `sed -n '368,502p'` — preciso.
- ✅ T2 Step 2 muestra el reemplazo exacto.
- ✅ T3 Step 2 incluye código completo (no "similar to") con tokens, fonts, scripts.
- ✅ T6 Step 2 muestra el ADR completo (no resumen).

Plan ready para handoff.

---

## Execution Handoff

Plan completo y guardado en `docs/superpowers/plans/2026-05-29-sp51-chrome-global.md`. Dos opciones de ejecución:

**1. Subagent-Driven (recommended)** — Claude dispatches a fresh subagent per task (T1-T6), reviews after each with two-stage validation (spec compliance + code quality). Faster iteration, isolated context per task. Patrón ya validado en SP-1 T1-T8.

**2. Inline Execution** — Claude executes T1-T6 inline in this session, batched with checkpoints for client review every 2-3 tasks.

T7 (verification + commit handoff) requires the client regardless — that's the deploy + visual E2E loop.

**¿Cuál enfoque?**
