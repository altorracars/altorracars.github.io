# 🎨 33 — LECCIONES · FRONTEND / RUNTIME / CSS (hija de `30-LECCIONES`)

> **Neurona hija** (shard §G.5 · A5 del plan de des-saturación ADR §206, 2026-06-15 ⟦OPUS-4.8 · rev-Fable⟧):
> la familia de lecciones de **frontend / runtime / CSS / preview / port cinematic** de
> `30-LECCIONES.md` vive aquí desde que la madre llegó a su acantilado (~98% del cap de chars).
> **Cuándo leerla**: Trigger de Experiencia (§G.2) cuando la operación sea de UI/CSS/render/SW/
> cache de assets/port a cinematic/preview local. La madre conserva el puntero + stubs `### L-NN`.
>
> **Los M-NN (meta-fallos del cerebro) y las lecciones de backend/Firebase/CRM se quedan en `30`.**

---

### L-05 · `<base href="/">` hace que TODA ruta sea raíz-relativa idéntica
⇒ **Migrada al maestro** (F2 lote 6): [[CARS:L-05]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

### L-06 · `js/core/components.js` es un CARGADOR DINÁMICO (refs ocultas)
- Inyecta ~25 scripts por ruta hardcodeada (`script.src = 'js/...'`): `auth`, `solicitudes-watcher`, `comm-schema`, todo `js/ai/*`, `concierge`, `cookies`, `contact-forms`, `admin-calendar-config`. **Al mover cualquiera de esos, hay que actualizar components.js además del HTML.** No son `<script src>` visibles → fáciles de olvidar.

### L-07 · El generador es TEMPLATE-DRIVEN (cron cada 4h)
- `scripts/generate-vehicles.mjs` lee `detalle-vehiculo.html` (→ `vehiculos/*`) y `marca.html` (→ `marcas/*`) y **copia sus tags tal cual**. Actualizar esas 2 plantillas = las 45 páginas generadas quedan bien en la próxima corrida. Única ruta hardcodeada propia: `js/core/historial-visitas.js` (ancla de inyección del prerendered tag, ~L303). **PELIGRO**: si muevo algo y no actualizo la plantilla, el cron regenera con rutas viejas → producción rota en silencio.

### L-10 · `components.js` también carga CSS dinámicamente (no solo JS)
- **Síntoma**: un CSS con 0 `<link>` estáticos pero que SÍ se usa (ej. estilos del bot/auth).
- **Causa**: `js/core/components.js` inyecta 4 CSS por `.href=`: **`auth.css` (L274), `concierge.css` (L311), `cookies.css` (L445), `contact-forms.css` (L830)**. (cookies/contact-forms tienen ADEMÁS `<link>` estático.)
- **Receta**: al mover esos CSS a una subcarpeta, actualizar components.js además del HTML.
- **Meta-lección**: un `grep` de "CSS dinámico" puede dar **falso negativo** por comillas mal escapadas. **SIEMPRE verificar archivo-por-archivo los de 0 refs** antes de asumir "es estático" o "está muerto". (Confirmado §119 Fase 3 — casi asumo mal.)

### L-11 · PORTs JSX→vanilla — class-name fidelity (JS-emit ≡ CSS-define)
⇒ **Migrada al maestro** (F2 lote 6): [[CARS:L-11]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

### L-12 · Re-render por `onChange` acumula listeners en el padre — teardown explícito siempre
⇒ **Migrada al maestro** (F2 lote 6): [[CARS:L-12]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

### L-13 · Módulos lazy-loaded — guards `typeof` en click-time + event delegation
⇒ **Migrada al maestro** (F2 lote 6): [[CARS:L-13]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

### L-14 · SW stale-while-revalidate puede servir JS viejo en critical-path post-deploy
⇒ **Migrada al maestro** (F2 lote 2): [[CARS:L-14]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

### L-15 · Self-contained read patterns eliminan races de estado en memoria
⇒ **Migrada al maestro** (F2 lote 6): [[CARS:L-15]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

### L-16 · Inyectar chrome/CSS nuevo en páginas con tema viejo → guerra de especificidad + scope de tokens
⇒ **Migrada al maestro** (F2 lote 6): [[CARS:L-16]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

### L-17 · Vestir un módulo legacy con tema nuevo: remapear sus tokens `:root`, no reescribir markup
⇒ **Migrada al maestro** (F2 lote 6): [[CARS:L-17]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

### L-18 · El chrome compartido (header/footer) puede depender de clases de un CSS que NO se inyecta en legacy
⇒ **Migrada al maestro** (F2 lote 6): [[CARS:L-18]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

### L-19 · Recomendación por similitud SIN backend — content-based con el rastro local
- **Patrón (§138)**: para "autos semejantes a los vistos" NO hace falta GA API ni ML. Basta: (1) perfil agregado del rastro local (categorías/precio/marca/features ponderados por recencia), (2) score de similitud multi-dimensional ponderado por candidato, (3) fallback a destacados+nuevos (nunca vacío). Todo client-side con `vehicleHistory` + `vehicleDB`.
- **Claves**: el cliente pidió "un todo" (no solo precio/marca) → pesos por dimensión (objeto `W` ajustable). Excluir lo ya visto. Guard `typeof` + fallback al comportamiento previo (L-13) para no romper si el módulo no carga.
- **Disparador**: ante "recomendaciones / relacionados / similares", evaluar content-based local ANTES de meter analytics/backend (menos acoplamiento, sin reglas Firestore).

### L-20 · Preview local del sitio estático: `http-server` con RUTA ABSOLUTA + valida colores con estilos computados (no screenshots)
⇒ **Migrada al maestro** (F2 lote 6): [[CARS:L-20]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

### L-21 · Migrar un cuerpo legacy a cinematic: fija `background` + estados (`:hover`), no solo `color`
⇒ **Migrada al maestro** (F2 lote 6): [[CARS:L-21]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

### L-22 · "Un azul que no sé de dónde sale" — paleta oscura FRÍA con hardcodeados dispersos (§150)
⇒ **Migrada al maestro** (F2 lote 6): [[CARS:L-22]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

### L-23 · La regla universal `* { max-width:100% }` (style.css:6450) COLAPSA el `width` explícito de elementos `position:absolute`
⇒ **Migrada al maestro** (F2 lote 6): [[CARS:L-23]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

### L-24 · Un enlace `?param=` solo filtra si la página destino LEE el param — y el filtro puede YA existir con otro nombre
- **Disparador**: un enlace de nav/dropdown apunta a `pagina.html?x=y` para "pre-filtrar", pero la página ignora el param y muestra todo (§150.f: el dropdown enviaba a `busqueda.html?tipo=nuevo`/`?tipo=usado` y salían los 27).
- **Causa**: `busqueda.html` **NO lee `?tipo=`** (ningún `URLSearchParams` lo consume; los únicos usos leen `id`/`v` en detalle/comparar). El query param viaja pero nadie lo aplica. **Antes de enlazar con `?param=`, verifica que el destino lo lea** (grep `URLSearchParams`/`location.search` en su JS, o render + inspecciona el control).
- **El filtro puede YA existir**: el cliente pidió "agregar el filtro nuevo/usado si no existe" — pero **ya existía** como `<select name="tipo">` "Tipo de Vehículo" (`#tipoSelect`, opciones `["", "nuevo", "usado"]`; `database.js` filtra `v.tipo===filters.tipo`). Antes de AGREGAR una capacidad, **verifica si ya está** (a veces con otra etiqueta).
- **Modelo de datos Altorra (no confundir)**: `vehicle.tipo` = **condición** (nuevo/usado; badge en `render.js getBadge`), `vehicle.categoria` = **carrocería** (suv/sedan/pickup/hatchback). En `busqueda.html` son dos selects distintos: "Tipo de Vehículo" (`tipo`) ≠ "Categoría" (`categoria`).
- **Decisión**: en vez de cablear `?tipo=` (esfuerzo + casi no hay autos "nuevo" en un negocio de usados), se eligió **eliminar los enlaces rotos** y dejar el filtrado en el panel (que ya funciona). Menos código, menos superficie de bug.

### L-25 · Un `<footer>`/`<header>` de sección hereda chrome GLOBAL por selector de ELEMENTO
⇒ **Migrada al maestro** (F2 lote 6): [[CARS:L-25]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

### L-28 · Verificación de UI: `preview_screenshot` se cuelga tras `preview_resize`, con `backdrop-filter` pesado, **o con un modal/overlay abierto** — verifica con snapshot + eval
⇒ **Migrada al maestro** (F2 lote 6): [[CARS:L-28]] · cuerpo íntegro en `_legacy/LECCIONES-MIGRADAS-MAESTRO.md`.

### L-37 · Un rediseño que ELIMINA/renombra clases rompe los callsites JS que las buscan (catch real de §3.2)
- **Síntoma**: form de contacto en vivo: el write a `solicitudes` OK pero spinner "Enviando..." ETERNO + `_inFlight` atascado (el visitante no puede reenviar) — y CERO errores en consola (§175).
- **Causa**: el rediseño cinematic de `contacto.html` reemplazó `.form-card` por `.soft-*`; `contact.js` hacía `closest('.form-card')` para pintar el éxito → `null` → `_renderContactSuccess(null)` retorna sin pintar y NADIE restaura el botón. Fallo 100% silencioso: el `.catch` no dispara porque la promesa SÍ resolvió.
- **Receta**: (1) al rediseñar una página, `grep -r "<clase>" js/` ANTES de eliminar/renombrar clases del markup. (2) Selectores de contenedor en JS con fallback (`closest('.x') || form`). (3) En success-paths, el happy path debe PINTAR algo o restaurar estado — un `return` silencioso en éxito es peor que un throw.
- **Familia**: L-11 (class fidelity JS↔CSS) — esta es la variante JS↔HTML (comportamiento, no estilo).

### L-44 · Añadir un módulo al `admin-app` (SPA modular) toca 4 puntos + rebuild del `dist` versionado ⟦OPUS-4.8⟧
- **Síntoma**: nuevo módulo registrado en `main.js` (MODULES) y nav en `shell.js`, pero al clickear el nav la URL cambia (`#/contenido`) y **rebota a Bandeja** sin montar el módulo (cero errores en consola).
- **Causa**: `admin-app/src/core/router.js` tiene un **whitelist `ROUTES`** — `currentRoute()` devuelve `'bandeja'` para cualquier hash que NO esté en la lista. El cuarto punto, fácil de olvidar.
- **Receta — un módulo nuevo del admin-app necesita LOS 4**: (1) `modules/<n>/<n>.{data,ui}.js` (mount → cleanup); (2) `main.js` import + `MODULES['<id>']`; (3) `shell.js` `NAV` (con `perm`) + `TITLES`; (4) **`router.js` `ROUTES.push('<id>')`** ← el ancla olvidable. Verifica en demo: `?mock=1` (siembra CEO `'*'` + MOCK_*) — render sin Firebase; `preview_snapshot`/`eval` (NO screenshot, L-28).
- **Build/deploy**: `admin-app/dist/` **SÍ se versiona** (GitHub Pages lo sirve; `.gitignore` lo exceptúa). Tras tocar `src/` → `npm run build --prefix admin-app` Y commitear el `dist` (filenames hasheados cambian). NO hay CI que lo buildee.
- **Familia**: §159 (run paralelo admin-app) · L-13 (lazy-load guards).

### L-45 · El SSG horneado DESPOJA ids del `<head>` (ej. `<title id>`) de los que depende el JS inline → null-deref ABORTA el render ⟦OPUS-4.8⟧
- **Síntoma**: las páginas de marca HORNEADAS (`/marcas/{slug}.html`) quedan en **esqueleto eterno** (catálogo nunca pinta), pero la DINÁMICA (`marca.html?marca=`) funciona. Tras cargar el DB: `TypeError: Cannot set properties of null (setting 'textContent')` en `loadVehicles`. Afectaba a las 19 marcas en producción (§221).
- **Causa (verificada EN VIVO con Playwright + `git show origin/main:<baked>`)**: `generate-vehicles.mjs` reescribe el `<title>` para SEO y al hornearlo **pierde el `id="pageTitle"`**. El JS inline `getElementById('pageTitle').textContent=…` → `null` → throw → `loadVehicles` se ABORTA antes de `renderVehicles` → los esqueletos nunca se limpian. La dinámica no rompe porque ahí el `<title id="pageTitle">` sí existe.
- **Receta**: (1) el JS que toca elementos que el SSG puede reescribir (title/meta/canonical/OG del `<head>`) DEBE usar **null-guard** (`const el=getElementById(x); if(el) el.…`) — un elemento opcional ausente NUNCA debe abortar un render. (2) Matiz a L-07: el SSG "copia tags tal cual" EXCEPTO las anclas SEO del head, que SÍ reescribe (y puede soltar ids). (3) Diagnóstico: consola en vivo (Playwright/Chrome) da la línea exacta; comparar plantilla vs horneado con `git show origin/main:<path>` confirma qué id falta. (4) Cache: la bumpea el cron al regenerar `/marcas/` (no manual, L-02/L-03).
- **Familia**: L-07 (SSG template-driven) · L-37 (rediseño rompe callsites JS↔HTML) · raíz común "DOM dinámico ≠ DOM horneado".

### L-46 · Inyectar una 2ª global `window.X` en el MISMO `<script>` que otra ROMPE el gate `SSG_SELFTEST` ⟦OPUS-4.8⟧
- **Síntoma (§222)**: tras añadir `window.PRERENDERED_BANNER_URL` junto a `PRERENDERED_BRAND_ID` en el mismo `<script>`, `SSG_SELFTEST` FALLA: "PRERENDERED_BRAND_ID valor NO parsea (breakout): Unexpected non-whitespace character after JSON".
- **Causa**: el selftest extrae el valor de cada global con `html.slice(idx+marker.length).split(';</script>')[0]` y lo `JSON.parse`-ea. Con dos asignaciones en un `<script>` (`window.A = "x"; window.B = "y";</script>`), el valor de A arrastra `; window.B = "y"` → no parsea. NO es fallo de `safeJsonLd` (el escape estaba bien); es el gate leyendo de más.
- **Receta**: una global inyectada = UN `<script>` propio (`…A="x";</script><script>…B="y";</script>`) → cada valor termina en `;</script>` y el split lo aísla. Bonus: registra el sink nuevo en el loop del selftest + mete payload de breakout en su mock (gate con dientes, doctrina §220).
- **Familia**: L-07 (SSG template-driven) · L-45 (DOM horneado).

### L-51 · Recuperación de borradores "pro" SIN reabrir un autosave ya rechazado: separar borrador-deliberado de red-de-seguridad-local (opt-in, scoped por uid) ⟦OPUS-4.8⟧
- **Síntoma/contexto (§227/TODO-24)**: el dueño pide "borradores profesionales con autosave/recuperación" PERO en el pasado (§107) quitó el autosave porque reaparecía y restauraba solo ("no me restaures automáticamente"). El pedido literal ⊥ el historial verificado.
- **Causa/insight**: "profesional" = el **RESULTADO** (nunca perder trabajo, sin bugs), NO el **mecanismo** (autosave-restore) ya rechazado. Un autosave que persiste drafts crea fantasmas que reaparecen en la galería = **§107 disfrazado** ("nunca re-pregunta ≠ nunca resucita").
- **Receta**: (1) separa DOS conceptos — borrador **DELIBERADO** (botón → backend → galería → retomar) vs **RED DE SEGURIDAD** local (localStorage debounce, efímera, **NO** en la galería). (2) recuperación = **OFRECER** (barra opt-in al reabrir), NUNCA autorestaurar (form vacío hasta que el usuario pulse). (3) el buffer local va **scoped por `uid`** (localStorage es por-navegador → en equipo compartido cruza cuentas si no). (4) los datos REALES se aíslan a nivel **SERVIDOR** (rules `path/{uid}/`), no por código. (5) **guard anti-resurrección**: un write optimista que aterriza tras un delete recrea el doc → flag `_dead` + cancelar timers en close/discard/publish.
- **Familia**: §107 (drafts por cuenta) · §202 (V4 port verbatim por interop) · §227 (este rediseño) · M-17 (la meta: pedido literal ⊥ historial → interpretar por evidencia).

### L-53 · Receta de "port de un módulo al portal `admin-app/` (Vite)" — patrón repetible del PLAN-UNIFICADO F-2..F-4 (§238/§249) ⟦OPUS-4.8⟧
- **Receta (6 pasos)**: (1) LEE la fuente `js/admin/admin-X.js` + un módulo análogo YA portado (CRUD-modal→`dealers`; lista-filtro→`contacts.list`) — copia el idioma. (2) `src/modules/X/X.data.js` (modular SDK desde `core/firebase.js`) + `X.ui.js` (`mountX(root)→cleanup`; `el/clear`·`store`·`toast`·`hasPermission`·`writeAudit`). (3) `X.css` con tokens (`--s-*`/`--surface-*`/`--ink-*`, sin hex; filas-grid como `contactos.css`, NO `<table>`). (4) Cablea `router.js` ROUTES + `shell.js` NAV (`perm:'X.read'`=GATE) + TITLES + `main.js` (mount+CSS+`MODULES`). (5) mock: `MOCK_*` + rama `store.get().mock` → visible en `?mock=1` sin Firebase. (6) `vite build` + preview `?mock=1#/X` (snapshot+eval, NO screenshot L-28).
- **Insight de oro (RBAC/data)**: antes de duplicar lógica del cliente, BUSCA el trigger servidor (escribir `{roleId}` dispara `onUserRoleAssigned` → reconcilia roleName/permissions/cargo, functions:3787); verifica `functions/`+`firestore.rules` ANTES de elegir callable-vs-escritura-directa.
- **Gotcha DS**: CTA primario = **`.btn--gold`** (NO existe `.btn--primary`); tokens `--gold-*` son accent-aware (`applyInitialAccent` re-mapea por `localStorage['altorra-crm-accent']` → color ≠ dorado NO es bug). Realtime (RTDB) = live-only (callejón d).
- **Gotcha deploy**: `admin-app/dist/` versionado y servido; si algo foundational está gateado a staging, commitea **source-only** (rebuild dist arrastra lo gateado) — §237.6/§238.
- **Familia**: §202 · §204 · §238 · L-28.

### L-54 · Un elemento `position:fixed`/`absolute` en `display:flex` SIN `width` y anclado a UN solo borde COLAPSA a su contenido — `max-width` no OTORGA ancho ⟦OPUS-4.8⟧
- **Síntoma (F-6 FCM card §251)**: tarjeta anclada `right`+`bottom` con `max-width:360px` pero **sin `width`** → render a **34px** de ancho, texto en columna de 1 char, off-screen. En mobile NO pasaba: la media query la anclaba `left`+`right` → los dos bordes le daban el ancho.
- **Causa**: `max-width` LIMITA, no OTORGA ancho. Un flex `fixed` sin `width` toma su `max-content`; un hijo flex con `min-width:0` deja al texto encogerse casi a 0; anclado a un solo borde nada lo estira. Cara OPUESTA de L-23 (allá un `*{max-width:100%}` colapsa un width explícito; aquí FALTA el width).
- **Receta**: `width` explícito en desktop (`width:340px; max-width:calc(100vw - 2*var(--s-5))`); en la media query mobile que usa `left`+`right`, `width:auto` para que los dos bordes manden. **Verifica con un viewport de ancho REAL** (`preview_resize {width:1280,height:800}`) — el "native size" del preview headless da `innerWidth:0` → activa la media query mobile y TODO colapsa (falso bug que te manda a perseguir la CSS equivocada). NO `preview_screenshot` tras `resize` (L-28).
- **Familia**: L-23 (max-width universal colapsa width) · L-28 (no screenshot tras resize) · L-53 (DS tokens admin-app).

### L-55 · UI con `transition` en preview headless: el valor animado queda CONGELADO en el inicio → verifica end-states neutralizando transiciones; y tabulabilidad por-breakpoint = CSS `visibility`, no `inert` ⟦OPUS-4.8⟧
- **Síntoma (W-11 F1(c) drawer)**: drawer abierto (clase + foco + `box-shadow` del override SÍ aplicados) pero `getComputedStyle(.sidebar).transform`/`getBoundingClientRect().left` reportan el valor CERRADO indefinidamente — el headless NO avanza la transición CSS (la regla específica gana: el `box-shadow`, sin transición, lo prueba).
- **Receta verificación**: para UI con `transition`, inyecta `*{transition:none !important; animation:none !important}` y lee los END-STATES del cascade (no el valor animado). Confirma con un `transition:none` inline → si salta al target, la lógica es correcta = artefacto headless. Familia: L-20/L-23/L-28.
- **Arquitectura (§3.8) `visibility` > `inert`**: para nav off-canvas que NO debe tabularse cerrado-en-móvil, usa CSS `visibility:hidden` (sale del tab-order, lo maneja la media query) en vez de `inert` por JS+`matchMedia change`. `inert` por evento tiene fallo latente GRAVE: si el `change` no dispara al cruzar a desktop, el nav entero queda MUERTO; el CSS lo elimina por construcción. Transiciona `visibility` junto al `transform` (visible durante el deslizado de cierre).
- **Familia**: L-20/L-23/L-28 (quirks del preview headless) · L-53 (admin-app DS).

### L-56 · Sidebar de filtros ALTO: `sticky` sin tope RECORTA su mitad inferior; toggle-bp ≠ colapso-bp = franja muerta sin botón ⟦OPUS-4.8⟧
- **Síntoma (busqueda)**: los filtros ("Aplicar" incluido) caen bajo el viewport, INALCANZABLES (no es visual: no puedes aplicar).
- **Causa #1 (recorte)**: `.filters-sidebar{position:sticky;top:96px}` SIN `max-height`; el panel mide ~1106px (medido), lo que excede `viewport-96` cae fuera y un sticky NO scrollea por dentro. Cap+`overflow-y:auto` mete barra (el dueño la vetó). **Fix**: `position:static` → fluye, la página scrollea entera (coste: no "sigue"). MEDIR lo reveló (estimé 810, real 1106; L-20/L-23/L-54).
- **Causa #2 (franja muerta 901–1024)**: `style.css` colapsa+toggle a ≤1024 pero el cinematic a ≤900 → en 901–1024 filtros `max-height:0` SIN botón (cazado midiendo `filtersReachable:false`). **Fix**: alinear cinematic a ≤1024. **Regla**: DOS hojas sobre un componente responsive → los breakpoints de "toggle" y "colapsar" DEBEN coincidir.
- **Compartido**: `marca-cinematic.css` viste 24 páginas → corrige todas. **Familia**: L-23/L-54 · L-16/L-21 · L-55.

### L-58 · `parent.append(null)` nativo pinta el literal `"null"` (≠ `el()` que filtra) ⟦OPUS-4.8⟧
- `append(a, panel(), b)` con `null` → text-node "null" (NO era campo Firestore ausente; A.1 adivinó §3.3). Fix: helper `core/dom.js` `appendAll()`. Detalle → brief `…crm-overhaul…` §PASE-1.

### L-59 · Recorte/scroll del shell sin romper los auto-scroll (TODO-52) ⟦OPUS-4.8⟧
- Módulos FLUJO se recortan/encogen/pegan bajo `.outlet{overflow:hidden}`. Fix: `.outlet`→`overflow-y:auto` + `.outlet>*{min-width:100%}` + `padding-inline` flow, **manteniendo `display:flex` ROW (no `column` → rompe los auto-scroll)**. Receta → brief §PASE-1.

### L-60 · SVG inline **hijo-flex directo** colapsa a `width:0` sin `flex:0 0 auto` (TODO-52 P1) ⟦OPUS-4.8⟧
- **Síntoma**: icono SVG (botón ★→`star`) con `height` correcta (19px) pero `width:0px` (botón colapsa) aunque la regla dice `width:19px` — confirmado midiendo `getComputedStyle`/`getBoundingClientRect` en vivo.
- **Causa**: un `<svg>` (viewBox, sin attr `width/height`) flex-item directo de un `(inline-)flex`, sin `flex:0 0 auto`, lo encoge `flex-shrink:1` en el **eje principal** (width en row) a 0; el cruzado (height) sí respeta → "height OK, width 0". Los que funcionaban (`.btn svg`/`.chip__ico`) ya traían `flex:0 0 auto`; los nuevos no.
- **Receta**: todo `<svg>` inline hijo-flex directo lleva `flex:0 0 auto` con su `width/height` (o envuélvelo en un `<span>` flex-item). Mídelo vivo (`eval`). **Familia**: L-23 · L-28 · L-53.
- **v2 (hub, ×3)**: en flex APRETADO el global `svg{max-width:100%}` (L-23) clampa el svg a ancho-0 → suma **`max-width:none`** al `flex:0 0 auto`. Al medir: svg bajo ancestro `display:none` (lista oculta en mobile) = `0×0` artefacto, mide a ancho desktop (L-28).

### L-66 · Contraste/rol a11y: mide la cascada viva (≠ el token que dice la spec) · `role=menu` es un contrato (TODO-53 P1) ⟦OPUS-4.8⟧
- **Contraste**: mide el `getComputedStyle().color` REAL, bléndeale el alpha sobre el 1er ancestro con bg opaco, y arregla la regla que GANA por especificidad — no la que dice la spec (caso: `style.css .footer-legal a{rgba(255,255,255,0.22)}` = **1.83:1**, no el token faint; fix 0.22→0.62 = 7.81:1 AAA). Gotcha: el SW sirve CSS viejo en preview (`styleSheets`=0.22 vs `fetch(no-store)`=0.62) → unregister SW + `caches.delete()` + hard-reload.
- **Rol**: `role="menu"` exige hijos `role="menuitem"` (axe `aria-required-children`). Barra de lanzadores/acciones ≠ menú → `role="toolbar"` + `aria-labelledby` + disclosure. **Familia**: L-16/L-21/L-20/L-23/L-54 · §280.

### L-67 · Hero de CSS `background-image` = TRAMPA de LCP → usar `<img>`/`<picture>` (TODO-53 P3) ⟦OPUS-4.8⟧
- `background-image` se descubre tarde, no admite `fetchpriority` ni el preload responsivo `imagesrcset` → LCP altísimo (**22.6s móvil**), LCP element = el `<div>`. Fix: hero = `<picture>` real (`<source>` AVIF + `<img>` WebP srcset, `fetchpriority=high`) → preload COINCIDE; UN formato (no doble-descarga); `object-fit/position` ≡ `background-size/position`; filtros en el CONTENEDOR. **Verifica el LCP con TRACE real** (el observer del preview dio 0, falso). Detalle → §286.

### L-69 · Grid-gap (§283) = void DENTRO de la tarjeta corta, y el masonry NO generaliza (TODO-53 P0) ⟦OPUS-4.8⟧
- `display:grid` (default `stretch`) estira la tarjeta corta a su fila + footer `margin-top:auto` (deliberado) clavado → void interno (NO entre tarjetas). `columns` (masonry §283) SOLO si el orden es irrelevante: reordena columna-mayor → ROMPE listas ordenadas → panel **0/10 APPLY-SAFE**. Fix order-preserving `align-items:start`/`line-clamp` = TRADEOFF visual → render vivo. **Un fix es LOCAL hasta demostrarlo** (re-verifica altura+orden/callsite). §292.

> Hija de `30-LECCIONES.md` (puntero allá). Misma doctrina de crecimiento: síntoma → causa →
> receta; solo lo reutilizable. Tope ~350 líneas (§G.5 hojas). Si crece, shard por sub-categoría.
