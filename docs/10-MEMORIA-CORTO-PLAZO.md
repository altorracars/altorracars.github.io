# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo neuronal: Memoria a Corto Plazo.** Junto con `CLAUDE.md` + `05-ESTADO-GLOBAL`,
> es de las primeras lecturas de cada sesión (Ignorancia Selectiva, `CLAUDE.md §G`).
> SOLO lo vivo: foco actual, pendientes abiertos, bitácora. Estado técnico → `05`.
>
> **Es la pizarra, no el archivo.** Al cerrar una tarea: consolidar a ADR (`99`) +
> fila en `00-INDICE`, extraer lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).

---

## 🎯 Foco actual

> ⚡ **HANDOFF a ventana nueva (2026-06-01, contexto saturado) — BLOQUE DE DISEÑO §150 EN CURSO:**
> Tras QA en prod, el cliente pidió **unificar el catálogo con el index** ("tema general, eliminar lo viejo de raíz"). Hecho (ADR §150 en `99`): **(1) de-blue→near-black** — la paleta cinematic era índigo FRÍA (token `--cin-bg-elev` + valores hardcodeados `#100d16`/`rgba(26,22,34)`/`#15121A`); calentada y luego **oscurecida a `#0D0B09`** (el cliente las quería "negras como el index"); **`--cin-bg #08070A` (negro de referencia) INTACTO**. **(2) Skip-link §149 REMOVIDO** (A11Y-04 descartado por el cliente → lóbulo §48 ahora **5/6**). **(3) QuickTools dock SIEMPRE visible** (`quicktools.js initScrollBehavior`→no-op). **(4) Dropdown "Vehículos" abre por HOVER CSS en todas las páginas** (antes el wiring solo vivía en `home-chrome.js`=index).
> **GIT**: §150 (`80f4abb`) + §150.b commiteados+desplegados (cliente: "se ven mejor"). **§150.c SIN commit** → 4 archivos: `css/home/chrome-redesign.css`, `service-worker.js`, `js/core/cache-manager.js`, `docs/10-MEMORIA-CORTO-PLAZO.md`. Cache vigente `v20260601150000`.
> **PRÓXIMOS PASOS (ventana nueva)**: (a) cliente commitea §150.c + valida en prod (Ctrl+Shift+R): ¿superficies negras como el index?, ¿QuickTools no se oculta?, ¿dropdown abre en el catálogo (hover "Vehículos")? (b) **Layout del dropdown del index posiblemente aún roto** — el CSS se ve correcto leyendo código, NO reproducible sin render (L-08) → **pedir screenshot fresco del dropdown abierto** y diagnosticar el render. (c) Si todo OK, bloque §150 cerrado. Detalle → ADR §150 (`99`) + L-22 (`30`).

> **Pizarra podada al cierre de sesión 2026-05-31** (handoff a ventana nueva). El detalle histórico
> vive en los ADRs **§122–§140** (`99` + `00-INDICE`). Aquí solo el estado vivo.

---

## ✅ SP-5.3 — CATÁLOGO 100% CINEMATIC EN PRODUCCIÓN (§140–§146, PRs #771–#777) · solo pendiente QA visual

**Completo y verificado** → consolidado en **ADR §140** (`99` + `00-INDICE`); `20-ESPACIAL` (carpeta `js/public/detalle/` + `detalle-cinematic.css`) + `43-UX` (Ronda 5) actualizados; cache bump `v20260531300000`. Spec `b2a6bc0`, plan `f56cb8d`.
- `detalle-vehiculo.html` → cinematic + de-monolitizado: 4 módulos `js/public/detalle/{data,render,gallery,page}.js` + `css/home/detalle-cinematic.css`, `<body data-cin>`, botones **Opción A**, favorito/comparar/sticky cableados. **27 IDs + hooks intactos**. 27 `vehiculos/*` regeneradas. Verificado preview local (id=38, `node -c` OK). El **por qué/cómo** → ADR §140.
- ✅ **§140 commiteado + mergeado a prod** (Fase 2 `10605da` + Fase 3 `86681a6` → PR #771). Fue el primero de la cadena #771–#777 (§141–§146 siguieron, ver abajo). Rama local detrás de `origin/main` solo en merge commits → `git pull` al retomar.
- ✅ **TODO §141–§146 commiteado + MERGEADO a `main` (PRODUCCIÓN)** vía PRs #771–#777 (verificado `git log origin/main` 2026-05-31 17:54): §141 pulido detalle, §142 Descripción ELIMINADA (datos dormidos; `admin-desc-gen.js` huérfano-borrable), §143 `busqueda.html`, §144 `marca.html`+18 `marcas/*`, §145 fix nav "Marcas"→`marcas.html` + `marcas.html`, §146 4 landings SEO `vehiculos-{suv,pickup,sedan,hatchback}.html` (REUSO `marca-cinematic.css`, DRY). **`origin/main` = `3f31484` (PR#777), cache `v20260531360000`.** Detalle → ADRs + **L-20/L-21** (`30`).
- ✅ **Catálogo 100% cinematic EN PRODUCCIÓN** (§122 index + §140 detalle + §143 busqueda + §144 marca + §145 marcas + §146 landings). Solo 3 redirects invisibles quedan legacy (intencional). **No quedan páginas pendientes de elevar.**
- ✅ **Auditoría regresión post-deploy PASÓ** (ver bitácora abajo): sin regresiones. ⚠️ 1 flag a11y no bloqueante (`--cin-ink-faint` sub-AA, heredado §122).
- ⏳ **Único pendiente cliente**: **QA visual en prod** (Ctrl+Shift+R) de detalle/busqueda/marca/marcas/4 landings + nav "Marcas". Opcional housekeeping: `git rm js/admin/admin-desc-gen.js` (huérfano §142) + sincronizar rama local (`git pull`, va detrás de `origin/main` solo en merge commits).

---

## 🎯 Foco previo (cerrado)

Todo consolidado en ADRs (`99` + `00-INDICE`): cinematic punta a punta (§122–§137), recomendaciones f1 (§138), footer fix (§139), **detalle-vehiculo §140**. Cuerpo cinematic en 11 root + detalle + 27 generadas + chrome global 100%.

### Pendiente de validar en PRODUCCIÓN (Ctrl+Shift+R)
- **SP-5.3 detalle (§140, recién desplegado PR #771)**: abrir un vehículo → cinematic (botones Opción A sin cortes, dorado, galería+panel sticky, tabs, similares); comparar/guardar/compartir; barra sticky en móvil; + spot-check directo de 1-2 `vehiculos/*.html`.
- Recomendaciones (§138): ver 2-3 fichas → index muestra "Recomendados" **semejantes**.
- Comparador flotante (no choca con QuickTools ⊞) + perfil/favoritos cinematic.
- (Comparador empty-state, simulador y footer ya validados en localhost — L-20.)
- **Cuerpo cinematic COMPLETO** (§143 busqueda + §144 marca + §145 marcas + §146 4 landings SEO). Único legacy restante = 3 redirects invisibles (usados/nuevos/camionetas, intencional). Validar en prod las 4 landings nuevas (`vehiculos-{suv,pickup,sedan,hatchback}.html`).

3. **Diferido sin urgencia**: SP-4 **fase 2** (popularidad global = contador `vehiculos/{id}.views` + reglas; custom image destacados; real-time switch). Auditorías `44-SEO`/`45-PERFORMANCE`/`48-ACCESIBILIDAD` cuando se pidan.

---

## 📋 Pendientes abiertos (TODO-NN)

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-01/02** | Migración Cloudflare Pages + Vite (deploy en segundos, assets con hash) | 🔮 | ~$10/año dominio |
| **TODO-03** | Critical CSS inline | ⏸️ diferido | SP-5 lo reabsorbe |
| **TODO-04** | Resource hints (preconnect) | ✅ hecho | propagado por cron |
| **TODO-05** | SEO local / metadata | ✅ hecho | OG/Twitter/AutoDealer §90 |
| **TODO-06** | Página `/cartagena.html` SEO local | 🔮 | contenido editorial del cliente |
| **TODO-07/08** | Validar CSAT (§87) + transferencias (§88) en producción | 🔮 | tráfico / equipo 2+ asesores |
| **TODO-09..13** | Deuda técnica menor (drafts diferidos, CSS muerto, transition:all, substring selectors) | 🔮 | opcional, sin impacto visible |
| ~~TODO-14~~ | ~~Patrón merge conflict cron~~ | ✅ → L-02 | — |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📦 Planes mayores (resumen vivo — todos cerrados ✅)

- **§122** SP-1 Index cinematic vanilla (port JSX→vanilla, 4 módulos `js/public/home/*`, contratos preservados).
- **§119** reorg `js/` modular (128 archivos) · **§120/§121** cerebro autónomo + linter `brain:check`.
- **§61** RBAC dinámico · **§59** ALTOR Hub (7/7 + C-S8/9/10) · **§82-84** Smart Update · **§90** SEO Fase 4 · **§91/93** imágenes responsive + lazy · **§115-117** motor cromático (6 paletas) · 27 Cloud Functions.

---

## 🔮 Contexto estratégico

- **Rediseño TOTAL cinematic + recomendaciones (fase 1) ENTREGADOS.** El sitio está
  visualmente completo de punta a punta. Lo que resta: validación en producción + pulido
  fino + diferidos (SP-4 fase 2, auditorías por dominio). Buen momento para QA en prod y
  priorizar mejoras incrementales según feedback real de usuarios.

## 📝 Bitácora (efímera — se vacía al consolidar)

- **2026-05-31 · Auditoría regresión PRE-MERGE SP-5.3 (§140–§146)**: ✅ **PASÓ — sin regresiones, safe to merge a `main`**. Verificado: links CSS (12/12 existen, 0 404), fix nav §145 (0 `index.html#marcas` en todo el sitio incl. generadas), orphan `admin-desc-gen.js` (sin refs vivas, solo docs — borrable con `git rm`), variantes hero landings (§95/§97 OK; HATCHBACK 1280/1920 faltan pero NO se referencian), `node -c` (11 JS OK), cache match (SW=MGR `v…360000`). ⚠️ **1 flag a11y NO bloqueante** (heredado del index §122 — ya en prod, NO es regresión): `--cin-ink-faint` rgba(…,0.32) ≈ **2.55:1** sobre `--cin-bg #08070A` → sub-AA; usado 41× en 7 CSS cinematic. → semilla para lóbulo `48-ACCESIBILIDAD` (subir a ~0.5 ⇒ ~4:1) cuando se pida auditoría a11y.
- **2026-05-31 · Auditoría a11y (WCAG 2.2 AA) → lóbulo `48-ACCESIBILIDAD` CREADO** (🔵 Trigger §G.2). **6 hallazgos**: 🟠 media-alta = filtros sin `<label for>` (1.3.1/4.1.2); 🟡 medias = 4 landings sin `<h1>`, `--cin-ink-faint` ~2.5:1 sub-AA (heredado §122), sin skip-link (2.4.1); 🟢 bajas = foco débil en campos (2.4.7), `prefers-reduced-motion` ausente en CSS per-page (2.3.3). PASA: contraste ink 17:1/ink-soft 6.8:1/gold 9.1:1, `alt` en cards, `lang=es`, ARIA header. Skill `impeccable` invocada pero su `audit`-ref NO materializada (solo SKILL.md) → WCAG directo. `40`-registry §48 🟢→🟠 + ruta `00` actualizada. ⏳ **Pendiente: cliente elige qué fixes aplicar** (A11Y-01/02/04/05 son quick wins).
- **2026-05-31 · §147 a11y quick wins APLICADOS** (batch aprobado por cliente): **A11Y-01** (aria-label en 50 controles de filtro: marca + 4 landings + busqueda), **A11Y-02** (h1 sr-only en 4 landings), **A11Y-05** (:focus-visible dorado global en soft-redesign), **A11Y-06** (prefers-reduced-motion en soft-redesign). 100% aditivo, ids/names/JS intactos (grep-verificado). Cache `v…370000`. **18 marcas/* heredan A11Y-01 vía cron** (NO regené a mano: el generador usa `new Date()` → metería diffs de fecha en ~45 archivos). Aplazados **A11Y-03** (token ink-faint transversal) + **A11Y-04** (skip-link). Lóbulo §48 → A11Y-01/02/05/06 RESUELTOS. ADR §147. (§147 commiteado por el cliente.)
- **2026-05-31 · Skill `accessibility-audit` CREADA** (vía `skill-creator`) en `skills/accessibility-audit/` (SKILL.md + `references/wcag-checklist.md`: framework WCAG 2.2 AA portable). Registrada: lóbulo §48 (Skills consultadas) + `40-LOBULOS` + ruta `00`. **Acordado el flujo de "Sugerencia de Skills"** (reflejo nuevo en `CLAUDE.md §G.4` + detalle en `40`): skill = capacidad portable; cerebro = conocimiento Altorra; yo sugiero, el cliente decide. (Commiteado por el cliente.)
- **2026-06-01 · §148 validación post-launch + cierre seguro**: `node -c` (JS de prod **limpio**) + checker de refs propio (1 **enlace roto real arreglado**: `simulador-credito`→`busqueda.html`, era `catalogo.html` inexistente; resto = falsos positivos por `<base href>` + snippets). **A11Y-03 RESUELTO** (`--cin-ink-faint` 0.32→0.50, WCAG AA). **Deuda técnica TODO-09..13 verificada y NO tocada** (TODO-11 ya resuelta; TODO-10 preservada §17.4; resto sin acción segura — garantía "cero regresión" del cliente). Mock corrupto `altorra-cars-design-system/.../data.js` (NO shippeado) flaggeado, fuera de scope. Cache `v20260601000000`. ⏳ **Único pendiente sustantivo: A11Y-04 skip-link.** ⏳ SIN commit.
- **2026-06-01 · §149 A11Y-04 skip-link HECHO** (cierra **lóbulo §48 = 6/6**): `.skip-link` CSS (style + base-redesign) + enlace en snippet header (64 págs) + header inline del index + **`ensureMainLandmark()` en `components.js`** inserta `#main` tras el header en TODAS las páginas (DRY — NO toqué el markup de 20 páginas, NO clobberé ids como #compare-root; las 45 generadas heredan en runtime). Verificado §19 (0 deps del hermano-del-header) + `node -c` OK. `transform` §17.2, sin observer §3.5. Cache `v20260601120000` (§148 quedó committeado aparte en `eb44b99`, así que §149 lleva versión propia mayor). ⏳ SIN commit.
- **2026-06-01 · §150 (WIP — feedback QA del cliente) — consistencia de diseño + quitar skip-link**: (1) **Skip-link §149 REMOVIDO** de todo el sitio (revertido en `snippets/header.html` + `index.html` + `style.css` + `base-redesign.css` + `components.js`/`ensureMainLandmark`) — el cliente lo halló inútil + no aparecía. **A11Y-04 vuelve a abierto/descartado** (lóbulo §48 ahora 5/6). (2) **El "azul" del catálogo**: causa raíz = paleta cinematic **fría/índigo hardcodeada** (`--cin-bg-elev #15121A`, `#100d16`, paneles de filtro `rgba(26,22,34)`/`(16,13,22)`, `#15121A` en ~10 sitios). **Calentada globalmente** (`#1A1613`, `#120F0B`, `rgba(26,22,18)`…) en `cinematic.css`+`soft-redesign.css` (tokens) + 6 CSS per-page → mata el azul, unifica index+catálogo. Cache `v20260601130000`. ⏳ **Validar warmth en prod (Ctrl+Shift+R) — trivial ajustar el tono.** (3) ⏳ **PENDIENTE: dropdown "Vehículos"** — quedó sin terminar ("Task 3"): wiring solo en `home-chrome.js` (=index) + CSS de grilla roto en `chrome-redesign.css`. Próximo paso. **ADR §150 formal al cerrar el bloque de diseño completo.**
- **2026-06-01 · §150.b (2ª ronda QA)**: cliente validó §150 ("se ven mejor") pero pidió **más oscuro** ("no tan grises, negras como el index"). → superficies **oscurecidas a near-black cálido**: `#1A1613`→`#0D0B09`, gradiente `#120F0B`→`#0A0806`, paneles filtro `rgba(14,11,9)`/`(9,7,5)`, `--cin-bg-soft`→`#0A0908` (9 archivos CSS). + **QuickTools dock SIEMPRE visible** (`quicktools.js`: `initScrollBehavior` → no-op, eliminado el hide-on-scroll, decisión cliente). Cache `v20260601140000`. ⏳ Validar warmth/oscuridad.
- **2026-06-01 · §150.c (dropdown "Vehículos")** — causa raíz: el wiring vivía SOLO en `home-chrome.js` (=index); `components.js` dispara `altorra:chrome:ready` pero home-chrome NO se carga en el catálogo → no abría ahí. **Fix robusto**: abrir por **hover/focus con CSS puro** en `chrome-redesign.css` (`.nav-dd-wrap:hover > .nav-dd-pro { display:block }` + chevron flip) → funciona en TODAS las páginas sin cargar JS extra, coexiste con el JS del index sin conflicto. + panel del dropdown **calentado** (`rgba(28,26,32)` frío → `rgba(13,11,9,.95)` near-black). Mismo batch §150.b (cache `v20260601140000`). ⏳ **Layout roto del index**: el CSS de la grilla se ve correcto (grid 1fr/1fr, 580px, thumbs 40px, 8 imágenes existen) — NO reproducible leyendo código; si persiste tras Ctrl+Shift+R, pedir screenshot fresco del dropdown abierto para diagnosticar el render. **→ Sitio sin pendientes de CÓDIGO** (lo que resta = input externo: contenido /cartagena, tráfico CSAT, AT real).
