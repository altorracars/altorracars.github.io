# SP-5.2.a Body Migration Piloto (Legales + 404) — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use `superpowers:subagent-driven-development` to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax. Spec: `docs/superpowers/specs/2026-05-29-sp52a-soft-legales-404-design.md`.

**Goal:** Migrar el BODY de `terminos.html`, `privacidad.html`, `cookies.html` y `404.html` al tema cinematic HarmonyOS (PORT de `SoftPages.jsx` + `soft.css`), preservando el contenido legal actual palabra por palabra.

**Architecture:** Un CSS nuevo auto-contenido (`css/home/soft-redesign.css` = tokens `--cin-*` + soft.css) enlazado en el `<head>` de cada página. El `<body>` legal/404 se reemplaza por el markup cinematic (`.soft-page` > `.soft-hero--small` + `.legal-section`/`.nf-section`). El chrome (nav+footer) ya es cinematic global (SP-5.1+b). Las legales conservan su texto legal actual; el 404 adopta el del redesign.

**Tech Stack:** HTML/CSS vanilla. Sin test runner — verificación = grep + visual E2E del cliente. **El cliente commitea** (cada tarea deja cambios en working tree; commit final consolidado).

---

## Pre-flight — contratos a PRESERVAR (§3.2)

- `#header-placeholder` + `#footer-placeholder` + carga de `js/core/components.js` INTACTOS en las 4 páginas (el chrome cinematic los rellena).
- `<head>` SEO/meta/canonical actuales: solo se AÑADE `<link>` a soft-redesign.css; NO se quitan metas ni el title.
- `js/core/page-loader.js`, `js/public/cookies.js`, modales (si cargan): se mantienen.
- Rutas internas válidas: `index.html`, `busqueda.html`, links cruzados de footer.

## File structure

| File | Acción | Tarea |
|---|---|---|
| `css/home/soft-redesign.css` | CREAR (tokens `--cin-*` + soft.css) | T1 |
| `terminos.html` | Modificar (`<head>` + `<body>`) | T2 |
| `privacidad.html` | Modificar | T3 |
| `cookies.html` | Modificar | T4 |
| `404.html` | Modificar | T5 |
| `service-worker.js` + `js/core/cache-manager.js` + `docs/05` | Cache bump | T6 |
| `docs/99` (ADR §128) + `docs/00` + `docs/43-UX` (R3) + `docs/10` | Brain | T6 |

---

### Task 1: Crear `css/home/soft-redesign.css`

**Files:**
- Read: `altorra-cars-design-system/project/redesign/soft.css` (724 líneas, fuente)
- Create: `css/home/soft-redesign.css`

- [ ] **Step 1: Copiar soft.css verbatim a css/home/soft-redesign.css**

Usar Read para leer TODO `altorra-cars-design-system/project/redesign/soft.css` (724 líneas). Luego Write a `css/home/soft-redesign.css` con: (a) un header-comment, (b) el bloque de tokens `--cin-*` (abajo), (c) el contenido VERBATIM de soft.css.

El archivo debe empezar así:

```css
/* ============================================================
   ALTORRA CARS · SOFT PAGES — port de redesign/soft.css (SP-5.2.a, ADR §128)
   Auto-contenido: incluye los tokens --cin-* (de cinematic.css) para que las
   soft pages legacy (que NO cargan cinematic.css) los tengan disponibles.
   soft.css tiene 136 refs a --cin-*. Mantener sync con redesign/soft.css.
   ============================================================ */

:root {
  --cin-bg:        #08070A;
  --cin-bg-soft:   #0E0C10;
  --cin-bg-elev:   #15121A;
  --cin-ink:       #F4EEDE;
  --cin-ink-soft:  rgba(244,238,222,0.62);
  --cin-ink-faint: rgba(244,238,222,0.32);
  --cin-gold:      #D4A85A;
  --cin-gold-hot:  #F0C674;
  --cin-gold-deep: #8a6a2c;
  --cin-titan:     #BFB6A4;
  --cin-line:      rgba(244,238,222,0.10);
  --cin-display: "Instrument Serif", "Fraunces", Georgia, serif;
  --cin-sans:    "Manrope", "Plus Jakarta Sans", system-ui, sans-serif;
  --cin-ease:     cubic-bezier(0.22, 1, 0.36, 1);
  --cin-ease-in:  cubic-bezier(0.7, 0, 0.84, 0);
  --cin-spring:   cubic-bezier(0.34, 1.32, 0.64, 1);
}

/* ───── soft.css (verbatim de redesign) ───── */
```

…seguido del contenido COMPLETO de `redesign/soft.css` (las 724 líneas, sin modificar).

- [ ] **Step 2: Verificar**

```bash
cd "C:\Users\romad\Documents\GitHub\altorracars.github.io" && \
echo "tokens --cin-bg:" && grep -cE '\-\-cin-bg:' css/home/soft-redesign.css ; \
echo ".soft-page:" && grep -cE '\.soft-page' css/home/soft-redesign.css ; \
echo ".legal-article:" && grep -cE '\.legal-article' css/home/soft-redesign.css ; \
echo ".nf-section:" && grep -cE '\.nf-section' css/home/soft-redesign.css ; \
echo "total líneas:" && wc -l < css/home/soft-redesign.css
```

Expected: `--cin-bg:` ≥ 1, `.soft-page` ≥ 1, `.legal-article` ≥ 1, `.nf-section` ≥ 1, total ≥ 740 líneas (724 soft.css + ~20 tokens).

- [ ] **Step 3: NO commit.** Working tree.

---

### Task 2: Migrar `terminos.html` body

**Files:**
- Read + Modify: `terminos.html`

- [ ] **Step 1: Leer el contenido legal actual**

Read `terminos.html`. Localizar el body legal (entre `<section class="gradient-hero">` y el cierre de `<section class="terms-content">`). Extraer:
- El TÍTULO (h1 del hero: "Términos y Condiciones").
- TODAS las cláusulas dentro de `.legal-card`: cada `<h2>`/`<h3>` con su(s) `<p>`. **Preservar el texto exacto.** Ignorar el `.toc` (tabla de contenido con anchors — el redesign no la usa).

- [ ] **Step 2: Añadir el `<link>` a soft-redesign.css en el `<head>`**

Usar Edit. Localizar la línea del `<link rel="stylesheet" href="css/style.css">` (o el último `<link>` de CSS en el head) y AÑADIR después:

```html
    <link rel="stylesheet" href="css/home/soft-redesign.css">
```

(NO quitar style.css/dark-theme.css. Solo añadir.)

- [ ] **Step 3: Reemplazar el body legal con el markup cinematic**

Usar Edit. Reemplazar TODO el bloque desde `<section class="gradient-hero">` hasta el `</section>` de cierre de `<section class="terms-content">` (inclusive) por:

```html
    <main class="soft-page" data-cin="on">
        <section class="soft-hero soft-hero--small">
            <div class="soft-hero-inner">
                <span class="cin-eyebrow">Legal · Términos</span>
                <h1 class="soft-hero-h">Términos y Condiciones</h1>
                <p class="soft-hero-sub">Última actualización: febrero de 2025.</p>
            </div>
        </section>
        <section class="soft-section legal-section">
            <article class="legal-article">
                <h2>TÍTULO DE LA CLÁUSULA 1</h2>
                <p>TEXTO EXACTO DE LA CLÁUSULA 1 (preservado del original).</p>
            </article>
            <!-- … una <article class="legal-article"> por CADA cláusula del original … -->
        </section>
    </main>
```

REGLAS:
- Una `<article class="legal-article">` por cada sección legal del original (cada `<h2>`/`<h3>` del `.legal-card`).
- El `<h2>` del article = el heading original. El `<p>` = el/los párrafos de esa sección (si hay varios `<p>`, incluir todos dentro del article).
- **Texto preservado palabra por palabra.** NO inventar, recortar ni reescribir contenido legal.
- Conservar la fecha real del original ("Última actualización: febrero 2025" — leerla del badge actual).

- [ ] **Step 4: Verificar preservación de contenido**

```bash
cd "C:\Users\romad\Documents\GitHub\altorracars.github.io" && \
echo "soft-redesign linked:" && grep -cE 'soft-redesign.css' terminos.html ; \
echo "soft-page:" && grep -cE 'class="soft-page"' terminos.html ; \
echo "legal-article count:" && grep -cE 'class="legal-article"' terminos.html ; \
echo "gradient-hero gone (expect 0):" && grep -cE 'gradient-hero' terminos.html ; \
echo "terms-content gone (expect 0):" && grep -cE 'terms-content' terminos.html
```

Expected: soft-redesign linked = 1, soft-page = 1, legal-article ≥ 5 (términos tiene muchas cláusulas), gradient-hero = 0, terms-content = 0.

- [ ] **Step 5: NO commit.**

---

### Task 3: Migrar `privacidad.html` body

**Files:**
- Read + Modify: `privacidad.html`

- [ ] **Step 1: Leer el contenido legal actual** de `privacidad.html` (mismo patrón que T2: hero h1 + cláusulas del `.legal-card`, ignorar TOC).

- [ ] **Step 2: Añadir `<link>` a soft-redesign.css** en el `<head>` (después del último CSS link existente):
```html
    <link rel="stylesheet" href="css/home/soft-redesign.css">
```

- [ ] **Step 3: Reemplazar el body** (desde `<section class="gradient-hero">` hasta el cierre del `<section>` de contenido legal) por el markup cinematic. Mismo template que T2 Step 3, pero:
- eyebrow: `Legal · Privacidad`
- h1: `Política de Privacidad`
- sub: la fecha real del original.
- Una `.legal-article` por cada cláusula de privacidad actual, **texto preservado**.

- [ ] **Step 4: Verificar**
```bash
cd "C:\Users\romad\Documents\GitHub\altorracars.github.io" && \
echo "soft-redesign:" && grep -cE 'soft-redesign.css' privacidad.html ; \
echo "soft-page:" && grep -cE 'class="soft-page"' privacidad.html ; \
echo "legal-article:" && grep -cE 'class="legal-article"' privacidad.html ; \
echo "gradient-hero gone:" && grep -cE 'gradient-hero' privacidad.html
```
Expected: soft-redesign = 1, soft-page = 1, legal-article ≥ 5, gradient-hero = 0.

- [ ] **Step 5: NO commit.**

---

### Task 4: Migrar `cookies.html` body

**Files:**
- Read + Modify: `cookies.html`

- [ ] **Step 1: Leer el contenido actual** de `cookies.html` (hero h1 + cláusulas, ignorar TOC).

- [ ] **Step 2: Añadir `<link>` a soft-redesign.css** en el `<head>`:
```html
    <link rel="stylesheet" href="css/home/soft-redesign.css">
```

- [ ] **Step 3: Reemplazar el body** por el markup cinematic. Template de T2 Step 3, con:
- eyebrow: `Legal · Cookies`
- h1: `Política de Cookies`
- sub: la fecha real.
- Una `.legal-article` por cada sección de cookies actual, **texto preservado**.

- [ ] **Step 4: Verificar**
```bash
cd "C:\Users\romad\Documents\GitHub\altorracars.github.io" && \
echo "soft-redesign:" && grep -cE 'soft-redesign.css' cookies.html ; \
echo "soft-page:" && grep -cE 'class="soft-page"' cookies.html ; \
echo "legal-article:" && grep -cE 'class="legal-article"' cookies.html ; \
echo "gradient-hero gone:" && grep -cE 'gradient-hero' cookies.html
```
Expected: soft-redesign = 1, soft-page = 1, legal-article ≥ 3, gradient-hero = 0.

- [ ] **Step 5: NO commit.**

---

### Task 5: Migrar `404.html` body

**Files:**
- Read + Modify: `404.html`

- [ ] **Step 1: Leer `404.html`** para localizar el body actual + el head.

- [ ] **Step 2: Añadir `<link>` a soft-redesign.css** en el `<head>`:
```html
    <link rel="stylesheet" href="css/home/soft-redesign.css">
```

- [ ] **Step 3: Reemplazar el body** (el contenido principal entre `#header-placeholder` y `#footer-placeholder`, o el `<main>`/`<section>` central) por:

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

PRESERVAR: el `#header-placeholder`, `#footer-placeholder`, y cualquier script (page-loader, components.js, etc.). Si el 404 tenía lógica de redirect o tracking, conservarla. Solo se reemplaza el CONTENIDO visual central.

- [ ] **Step 4: Verificar**
```bash
cd "C:\Users\romad\Documents\GitHub\altorracars.github.io" && \
echo "soft-redesign:" && grep -cE 'soft-redesign.css' 404.html ; \
echo "nf-section:" && grep -cE 'class="nf-section"' 404.html ; \
echo "Explorar vehículos CTA:" && grep -cE 'Explorar vehículos' 404.html ; \
echo "busqueda.html link:" && grep -cE 'href="busqueda.html"' 404.html ; \
echo "header-placeholder preserved:" && grep -cE 'header-placeholder' 404.html
```
Expected: soft-redesign = 1, nf-section = 1, Explorar vehículos = 1, busqueda.html ≥ 1, header-placeholder ≥ 1.

- [ ] **Step 5: NO commit.**

---

### Task 6: Cache bump + brain consolidation

**Files:**
- Modify: `service-worker.js`, `js/core/cache-manager.js`, `docs/05-ESTADO-GLOBAL.md`, `docs/99-HISTORIAL-ADR.md`, `docs/00-INDICE.md`, `docs/43-UX.md`, `docs/10-MEMORIA-CORTO-PLAZO.md`

- [ ] **Step 1: Cache bump** `v20260531120000` → `v20260531140000` (o mayor). En service-worker.js (`CACHE_VERSION`) + cache-manager.js (`APP_VERSION`, sin la `v`). Usar `sed` por los comentarios largos:
```bash
cd "C:\Users\romad\Documents\GitHub\altorracars.github.io" && \
sed -i "s/v20260531120000/v20260531140000/" service-worker.js && \
sed -i "s/'20260531120000'/'20260531140000'/" js/core/cache-manager.js && \
node -c js/core/cache-manager.js && echo OK
```

- [ ] **Step 2: ADR §128 en `docs/99-HISTORIAL-ADR.md`** — apendar al final, formato canónico: causa raíz (body legacy de legales/404 en tema viejo), solución (port a soft-redesign.css + markup .soft-page, contenido legal preservado), no-regresión (chrome intacto, texto legal 1:1), archivos, doctrina (§3.2, port). Anotar: §128 es el primer lote de SP-5.2 (body migration).

- [ ] **Step 3: Fila §128 en `docs/00-INDICE.md`** (tras §127), con la línea de `grep -nE "^## 128\." docs/99-HISTORIAL-ADR.md`.

- [ ] **Step 4: `docs/43-UX.md` Ronda R3** — apendar antes de "## Pendientes / próxima ronda": SP-5.2.a piloto entregado (legales + 404 cinematic), patrón soft-redesign.css establecido, próximo SP-5.2.b (editorial).

- [ ] **Step 5: `docs/05-ESTADO-GLOBAL.md` + `docs/10-MEMORIA-CORTO-PLAZO.md`** — actualizar build + foco (SP-5.2.a entregado working tree; cache `v20260531140000`).

- [ ] **Step 6: `npm run brain:check`** → debe reportar `✅ CEREBRO SANO` (índice sincronizado). Si desync §128, ajustar la línea en 00.

- [ ] **Step 7: NO commit.**

---

### Task 7: Commit handoff al cliente

- [ ] **Step 1: Entregar mensaje + lista de archivos** (NO `git add -A`):
```
css/home/soft-redesign.css      (NUEVO)
terminos.html
privacidad.html
cookies.html
404.html
service-worker.js
js/core/cache-manager.js
docs/05-ESTADO-GLOBAL.md
docs/10-MEMORIA-CORTO-PLAZO.md
docs/99-HISTORIAL-ADR.md
docs/00-INDICE.md
docs/43-UX.md
```

- [ ] **Step 2: Deploy + E2E del cliente** (Ctrl+Shift+R):
- `terminos.html` / `privacidad.html` / `cookies.html`: hero cinematic pequeño (eyebrow dorado + título serif Instrument Serif) + cláusulas legibles con el TEXTO LEGAL ACTUAL completo. Chrome cinematic arriba/abajo.
- `404.html`: número 404 grande cinematic + CTAs "Volver al inicio" / "Explorar vehículos" funcionales.
- Sin errores rojos en consola. Texto legal verificado completo (no se perdió ninguna cláusula).

- [ ] **Step 3: Si OK → SP-5.2.b (editorial). Si falla → reportar a Claude.**

---

## Self-Review (checklist run by author)

**1. Spec coverage:**
- ✅ Goal (migrar body legales+404) → T1-T5.
- ✅ Token dependency resuelto (soft-redesign.css auto-contenido) → T1 Step 1.
- ✅ CSS loading per page (`<link>` en head) → T2-T5 Step 2.
- ✅ Body replacement con preservación de contenido legal → T2-T4 Step 3 + reglas.
- ✅ 404 markup + rutas ajustadas (busqueda.html, "Explorar vehículos") → T5 Step 3.
- ✅ Contratos preservados (placeholders, head SEO) → Pre-flight + steps.
- ✅ Cache bump + brain → T6.
- ✅ Verification (grep contenido + visual) → cada T Step 4 + T7 Step 2.

**2. Placeholder scan:** Los "TÍTULO DE LA CLÁUSULA 1"/"TEXTO EXACTO…" en T2 Step 3 son PLANTILLAS explícitas que el subagente rellena leyendo el original (instrucción clara en las REGLAS), no placeholders del plan. Cache version `v20260531140000` concreta. Sin TBD/TODO reales.

**3. Type consistency:** Clases consistentes (`.soft-page`, `.soft-hero--small`, `.soft-hero-inner`, `.cin-eyebrow`, `.soft-hero-h`, `.soft-hero-sub`, `.legal-section`, `.legal-article`, `.nf-section`, `.nf-num`, `.nf-mid`, `.nf-h`, `.nf-h-accent`, `.nf-sub`, `.nf-actions`, `.soft-cta`, `.soft-cta--alt`) — todas definidas en soft.css (T1) y usadas igual en T2-T5.

**4. Ambiguity:** "ignorar el .toc" explícito. "preservar texto palabra por palabra" explícito. Rutas del 404 explícitas.

Plan listo.

---

## Execution Handoff

Plan guardado en `docs/superpowers/plans/2026-05-29-sp52a-soft-legales-404.md`. Ejecución: **Subagent-Driven** (recomendado) — subagente fresco por tarea (T1-T6) + doble revisión (spec compliance → code quality). T7 = cliente (deploy + E2E).
