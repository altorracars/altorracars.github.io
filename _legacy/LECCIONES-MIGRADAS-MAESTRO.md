# 🗄️ Lecciones MIGRADAS AL CEREBRO MAESTRO — cuarentena §G.4 (cuerpo íntegro)

> Estas lecciones **no se han perdido ni se han editado**: su cuerpo íntegro está aquí y su copia
> consultable vive en el maestro (`brain-private/maestro/lecciones/migradas/CARS/<ID>.md`), donde
> se lee desde CUALQUIER proyecto. En `docs/30-LECCIONES.md` sigue su titular —que es lo que hace
> resolver cualquier `[[L-NN]]` del repo— y en su hoja hija (`31`/`33`) queda su stub con el puntero a este fichero.
>
> **Para qué sirve este fichero**: es el punto de retorno. El ABORT del lote reconstruye el cuerpo
> DESDE AQUÍ, a propósito y no con `git checkout` — un checkout restaura blobs de git y no probaría
> nada del mecanismo (`brain-private/cerebro-maestro/ENSAYO-ROLLBACK-F2.md §5`).

> Lote 2 · migrado 2026-09-01 · 2 lecciones.

---

> Origen: CARS `docs/31-LECCIONES-GIT.md` (titular en `docs/30-LECCIONES.md`) · descubierta y pagada en CARS §119 (Fase 2.2b-ii, comparador), reconfirmada en TODO-52 · migrado 2026-09-01 lote 2

### L-01 · `sed -i '*.html'` corrompe el fin de línea (CRLF→LF)
- **Síntoma**: tras un `sed` masivo aparecen 15+ archivos "modificados" que NO tocaste; GitHub Desktop muestra muchos más archivos de los esperados.
- **Causa**: `sed -i` reescribe TODOS los archivos que recibe; en Windows convierte CRLF→LF aunque no haya match → git (con `core.autocrlf=true`) los marca como cambiados (ruido).
- **Receta**: pasar a `sed` SOLO los archivos que contienen el patrón → `sed -i 's|viejo|nuevo|g' $(grep -rl "patrón" archivos)`. O usar la herramienta **Edit con replace_all** (no toca line-endings).
- **Limpiar el ruido**: restaurar los archivos que están en `git status` pero NO en `git diff --name-only` → `git checkout -- <esos archivos>`.
- **Aplica a CUALQUIER reescritura masiva, no solo `sed`** (2026-06-29, TODO-52): un script **node `writeFileSync`** para barrer `friendlyError` reescribió **59 archivos** con diff de archivo-completo (CRLF corrompido) → revertido con `git checkout -- admin-app/src/modules/` y rehecho con **Edit `replace_all`** (limpio, diff quirúrgico). Meta-fallo: la lección YA existía y NO la consulté antes del script (Trigger de Experiencia §G.2 omitido). **Regla firme: para barridos multi-archivo en Windows usa Edit `replace_all`, jamás un script que reescriba archivos enteros.**
- *Descubierto en §119 Fase 2.2b-ii (comparador); reconfirmado TODO-52.*

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §124 (SP-5.0 rastro saga: SW networkFirst para el critical-path) · migrado 2026-09-01 lote 2

### L-14 · SW stale-while-revalidate puede servir JS viejo en critical-path post-deploy
- **Síntoma**: deployaste un fix a un `.js` con cache bump. El index carga la versión nueva (visible en consola `[SW] Service Worker loaded - Version: vXXXX`). PERO al navegar a otra página del mismo origin, el código JS sigue siendo VIEJO aunque el deploy esté hecho. El fix no parece llegar.
- **Causa**: `service-worker.js` con strategy `stale-while-revalidate` (default para CSS/JS estable) sirve la versión cacheada INMEDIATAMENTE y solo actualiza en background. La versión nueva llega en la SIGUIENTE request — no en la inmediata. Un Ctrl+Shift+R en el index NO invalida el cache del SW para futuras navegaciones — solo bypasa el SW para esa page específica.
- **Receta**: para JS critical-path (tracking, auth, payments, cualquier cosa donde una versión vieja causa bugs persistentes), usar `networkFirst` en lugar de `stale-while-revalidate`. Ej. `service-worker.js` SP-5.0.f STRATEGY 3.5: networkFirst para `/js/core/*` + `/js/public/home/*`. Tradeoff: marginalmente más lento, pero fresh garantizado. Confirmado §124.

---

> Lote 6 · migrado 2026-09-01 · 20 lecciones.

---

> Origen: CARS `docs/31-LECCIONES-GIT.md` (titular en `docs/30-LECCIONES.md`) · sin §NN citado ni en su titular ni en su cuerpo · migrado 2026-09-01 lote 6

### L-03 · No fusionar cada micro-paso a `main` durante un refactor largo
- **Síntoma**: conflictos en bucle, un PR tras otro.
- **Causa**: el cron mueve `main` entre fusiones (pintar la pared mientras la ensucian).
- **Receta**: hacer todo el trabajo en la rama (`commit + push` solo guarda en GitHub), **UNA sola fusión final** tras terminar y probar. Un conflicto (o ninguno) en vez de uno por paso.

---

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · sin §NN citado ni en su titular ni en su cuerpo · migrado 2026-09-01 lote 6

### L-05 · `<base href="/">` hace que TODA ruta sea raíz-relativa idéntica
- Las páginas en subcarpetas (`vehiculos/`, `marcas/`) usan `src="js/..."` SIN `../` porque tienen `<base href="/">`. → toda ref a un asset es el MISMO string en todo el repo → el reemplazo de rutas es **determinista y global** (no hay que calcular rutas relativas por carpeta).

---

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · receta E2E fechada en CARS §175, el único §NN que cita su cuerpo · migrado 2026-09-01 lote 6

### L-08 · Los errores `403` de Firebase en `localhost` son NORMALES — y el bloqueo es MÁS amplio que Auth
- **Causa**: la API key restringe HTTP referrer (solo `altorracars.github.io` + dominios Firebase), no `localhost` → 403 en Auth/Installations/Analytics + tumba **App Check** (`appCheck/throttled`, backoff 1 DÍA). Es seguridad funcionando bien.
- **Receta (E2E §175)**: E2E de captura/forms = SOLO contra el dominio live (`main`); para lógica de UI sin red, **stubear `window.db`** en el preview (stub de `.add()` resuelto ejercita el handler real). En localhost NO se prueba login/Auth ni writes; SÍ: archivos (0 `404`), Firestore público de LECTURA, render.

---

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · casos validados en CARS §119 (y las rules de §68), según su cuerpo · migrado 2026-09-01 lote 6

### L-09 · Cómo confirmar que un archivo es código muerto (antes de cuarentenar)
- Cero refs internas (`grep` en HTML/JS/MJS) + no en `sitemap.xml` + (para herramientas) **sin autenticación** cuando las `firestore.rules` actuales la exigen → no podría funcionar aunque se abriera.
- Casos validados §119: `admin-upload.html` (sin auth → rules §68 rechazan escrituras), `theme-switcher.js` (comentario "eliminado — tema dark permanente", 0 cargas).
- **Acción**: cuarentenar a `_legacy/` (reversible) + documentar en `_legacy/README.md`, NO borrar de una.

---

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · confirmada en CARS §122 (review SP-1), según su cuerpo · migrado 2026-09-01 lote 6

### L-11 · PORTs JSX→vanilla — class-name fidelity (JS-emit ≡ CSS-define)
- **Síntoma**: una sección visualmente "rota" tras un port (sin transición, sin layout, sin seam-flow) aunque CSS y markup parecen estar.
- **Causa**: el CSS copiado 1:1 puede traer reglas con clases que el JSX RENOMBRÓ pero el CSS no acompañó. SP-1 ejemplo: `cinematic.css` seam-flow `.cin-progs` (líneas 1166, 1182) vs `className="promo-section"` en `Home.jsx:715` — el archivo CSS estaba desincronizado con el componente desde el rediseño original. Heredamos el bug al copiar.
- **Receta**: por cada sección portada, **grep en el CSS** las clases que el JS añade dinámicamente. (a) Clase JS-emit ∉ CSS = render unstyled / clase huérfana → añadir regla mínima o quitar el className si es redundante. (b) Clase CSS-rule ∉ markup ∉ JS = dead-class del rediseño → renombrarla a la clase real del componente (no inventar markup nuevo). Confirmado SP-1 review (ADR §122).

---

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · descubierta en CARS §122 (SP-1 T5, carrusel promo), según su cuerpo · migrado 2026-09-01 lote 6

### L-12 · Re-render por `onChange` acumula listeners en el padre — teardown explícito siempre
- **Síntoma**: tras editar datos en admin (banners/vehículos) varias veces, la página cliente se vuelve más lenta o dispara handlers múltiples por evento.
- **Causa**: cuando un módulo se re-renderiza via `vehicleDB.onChange(...)`, `track.innerHTML=''` limpia los hijos pero NO los listeners que el módulo registró en el padre o en `document`. El peor: `document.addEventListener('visibilitychange', ...)` acumula globalmente y no se limpia con un wipe del innerHTML. Descubierto en SP-1 T5 review del promo carousel (§122).
- **Receta**: handlers NOMBRADOS (no anónimos inline) + factor `_teardown` que llama `removeEventListener` por cada par, ejecutado ANTES de cada rebuild. Para elementos no-track que se reconstruyen (ej. `.promo-progress`), `oldEl.remove()` antes del nuevo append. Mirror pattern en cualquier módulo con `onChange` o cualquier rebuild-pattern.

---

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · confirmada en CARS §122 (SP-1 T5/T6), según su cuerpo · migrado 2026-09-01 lote 6

### L-13 · Módulos lazy-loaded — guards `typeof` en click-time + event delegation
- **Síntoma**: cards/UI renderizadas antes de que un módulo lazy-loaded (ej. `comparador.js` se idle-loadea ~3s post-page) capturarían una API undefined. Si el binding es per-card en render-time, los clicks no responderían hasta reload.
- **Receta**: (a) bind UNA vez en el track/container vía event delegation; (b) en el click handler, `typeof window.vehicleComparator === 'object' && vehicleComparator.toggle(id)` — guard en CLICK-time, no en render-time; (c) para badges/UI que muestran estado, fallback a la misma fuente cruda (localStorage `altorra_comparador`) hasta que la API exista. Aplica a cualquier módulo cargado por `requestIdleCallback`, defer-post-load o demand. Confirmado SP-1 T5/T6 (§122).

---

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · confirmada en CARS §124, según su cuerpo · migrado 2026-09-01 lote 6

### L-15 · Self-contained read patterns eliminan races de estado en memoria
- **Síntoma**: un módulo con múltiples mutadores (write local sync + write async network + class state) muestra UI inconsistente. El render lee un snapshot stale del estado en memoria aunque la fuente de verdad (localStorage / Firestore) tenga la data correcta.
- **Causa**: cuando un módulo class-based tiene varios paths que mutan `this._state` (ej. `vehicleHistory._history` mutado por `addToHistory`, `_mergeHistory`, `clearHistory`, `_loadFromFirestore`), los lectores que confían en ese estado en memoria pueden capturar momentos intermedios de un round-trip async.
- **Receta**: para lectores CRÍTICOS (renders que el usuario ve), leer DIRECTAMENTE de la fuente de verdad (localStorage / IndexedDB / server) en cada uso. No confiar en el estado en memoria del módulo cuando hay múltiples mutadores. Ej. SP-5.0.f `initTrail` lee `localStorage.altorra_vehicle_history` con JSON.parse directo en cada `renderTrailNow()`, en lugar de `vehicleHistory.getHistory()`. Tradeoff: parsing JSON por render (~µs), pero ZERO race conditions. Confirmado §124.

---

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · causa doble diagnosticada en CARS §127, según su cuerpo · migrado 2026-09-01 lote 6

### L-16 · Inyectar chrome/CSS nuevo en páginas con tema viejo → guerra de especificidad + scope de tokens
- **Síntoma**: chrome nuevo inyectado en página legacy "no se ve" o sale con colores/posición del tema viejo aunque su CSS cargue. **Causa doble** (§127): (1) el tema viejo estiliza por ID/`!important` y vence a las clases nuevas sin importar el orden de carga; (2) el CSS nuevo depende de tokens scoped (`:root[data-theme="dark"]`) que la página legacy no tiene → tokens resuelven mal.
- **Receta**: (1) verificar el scope de tokens primero (setear `data-theme` por JS si los CSS viejos no reaccionan a él — grep antes); (2) **bridge de especificidad** cargado ÚLTIMO (`#header.alt-nav` > `body #header`; `!important` solo donde el viejo lo use), sin editar el tema viejo; (3) si el viejo usaba `position:fixed` con placeholder, el bridge usa fixed (sticky no "pega" en contenedor chico). Presupuestar el bridge desde el diseño cuando hay coexistencia de temas.

---

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · insight de CARS §131, según su cuerpo · migrado 2026-09-01 lote 6

### L-17 · Vestir un módulo legacy con tema nuevo: remapear sus tokens `:root`, no reescribir markup
- **Insight (§131)**: si el CSS del módulo centraliza colores en `:root` (ej. `--pf-*`), remapearlos en una capa **scoped a un atributo** (`body[data-cin="on"]{--pf-*:…}`, reversible) viste TODO el módulo sin tocar JS ni estructura. Cazar luego los hex/rgba **hardcodeados** fuera de `:root` (el remapeo no los alcanza) y mantener SÓLIDOS los tokens de modales/overlays (translúcidos rompen el apilado).
- **Cuándo NO**: si el objetivo exige estructura distinta o el CSS no tiene tokens (→ guerra L-16). Recolorear ≠ rediseñar; cuando el mock de referencia es más pobre que el módulo real, "réplica exacta" se vuelve destructiva — vestir > reescribir, confirmar alcance con el cliente.

---

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · verificada en CARS §133, según su cuerpo · migrado 2026-09-01 lote 6

### L-18 · El chrome compartido (header/footer) puede depender de clases de un CSS que NO se inyecta en legacy
- **Síntoma**: el header/footer se ve distinto entre el index (chrome inline) y las páginas legacy (chrome inyectado por components.js), aunque el MARKUP sea idéntico (snippet 1:1). Ej §133: el badge `.nav-pip` de favoritos tapaba el corazón SOLO en legacy.
- **Causa (§133, verificado)**: el chrome usa clases (`.btn/.btn-icon/…`) definidas en un CSS que el index carga (`base-redesign.css`) pero que `components.js` NO inyecta en legacy (porque ese CSS tiene un reset global `*{}` + `body{}` que rompería el contenido legacy). Sin esas clases, los botones del chrome colapsan en legacy.
- **Receta**: (1) si el markup es snippet 1:1, NO es problema de HTML → es CSS. (2) lista las clases que usa el chrome y `grep`-éalas en `css/` para ver en qué archivo viven. (3) las que estén SOLO en un CSS no-inyectado → pórtalas al CSS que SÍ se inyecta (`chrome-redesign.css`), **scoped al contenedor del chrome** (`.alt-nav`/`.alt-footer`) para no chocar con el body legacy. NUNCA inyectes el CSS base entero si tiene resets globales.
- **Meta-lección**: "extraer el chrome a un snippet" no basta — hay que garantizar que TODO el CSS del que depende viaje con él a las páginas que lo inyectan. Un componente compartido es tan portable como su CSS. (Relacionada: L-16 coexistencia legacy↔cinematic.)

---

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · sin §NN de ADR citado (el «RCA §19» de su cuerpo es doctrina del CLAUDE.md, no un ADR) · migrado 2026-09-01 lote 6

### L-20 · Preview local del sitio estático: `http-server` con RUTA ABSOLUTA + valida colores con estilos computados (no screenshots)
- **Disparador**: querer ver/validar una página en vivo sin desplegar a producción (mejora, pulido visual, QA de CSS).
- **Receta**: `.claude/launch.json` con `npx -y http-server <RUTA-ABSOLUTA-del-repo> -p 8080 -c-1 --silent`. ⚠️ **La ruta DEBE ser absoluta** — con `.` el server sirvió desde un cwd equivocado y devolvía **404 a todo** (con `/` dando un directory-listing engañoso de 200). Verificar con `curl -o NUL -w "%{http_code}"` ANTES de abrir.
- **L-08 sigue vigente AQUÍ**: en localhost Firebase Auth/Analytics dan `403 referer blocked` — es ESPERADO y NO rompe el render público (Firestore SÍ carga los 27 autos vía API key pública). No confundir esos 403 con un bug.
- **Colores/estilos**: NO dependas de screenshots (timeout, L-28) — `preview_eval` con `getComputedStyle()` y clasifica por canal RGB (chroma=max-min). Así vi que los "grises del simulador" eran del **footer global** `128,128,128`, no del 2º bloque.
- **DOM volátil**: si el componente re-renderiza tras `setTimeout`/cálculo, un `querySelector` cacheado de un eval previo da `null` → navega+espera+mide en UN SOLO `preview_eval` (IIFE async).
- **SW sirve assets VIEJOS en preview** (manifestación local de L-14): el preview muestra lo viejo aunque `http-server -c-1` no cachee = el SW interceptando. Sin bump: `getRegistrations()→unregister()` + `caches.keys()→delete()` o cache-bust; y mata transiciones (`*{transition:none!important}`) para leer el color SETTLED (transición muestra el valor viejo). Detalle → **L-14**.
- **Principio**: ver con mis ojos (estilos reales) > adivinar (RCA §19). Un pendiente puede estar MAL descrito — verifica antes de "arreglar" algo que no existe.

---

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · disparador de CARS §141, según su cuerpo · migrado 2026-09-01 lote 6

### L-21 · Migrar un cuerpo legacy a cinematic: fija `background` + estados (`:hover`), no solo `color`
- **Disparador**: una página/componente migrado a `body[data-cin="on"]` muestra fondos blancos, glows o colores legacy que "no puse" (§141: ficha con glow dorado al hover + características con fondo blanco invisible).
- **Causa**: `style.css` / `dark-theme.css` definen propiedades por clase compartida (`.feature-item{background:white}`, `.ficha-group:hover{box-shadow:gold 0 0 20px}`). Si tu regla cinematic fija SOLO `color` (u otra propiedad), la cascada cae al legacy para las demás (`background`, `box-shadow`, `:hover`). **La especificidad se resuelve POR PROPIEDAD, no por regla** — ganar `color` NO te da `background`.
- **Receta**: por cada clase-hook reusada, enumera en preview qué reglas legacy la tocan (`Array.from(document.styleSheets)…el.matches(sel)`) y fija EXPLÍCITAMENTE `background` + estados `:hover/:active` en tu regla cinematic, con especificidad ≥ la legacy (`body[data-cin="on"] .x:hover` 0,3,1 > `body .x:hover` 0,2,1).
- **Aplica a**: los SP-5.3.x restantes (busqueda/marca/marcas/landings) reusan clases-hook del catálogo → mismo riesgo.

---

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §150, citado en su propio titular · migrado 2026-09-01 lote 6

### L-22 · "Un azul que no sé de dónde sale" — paleta oscura FRÍA con hardcodeados dispersos (§150)
- **Causa**: paleta cinematic con canal azul dominante en tokens Y en ~15 valores fríos **hardcodeados** dispersos (`#15121A`, `#100d16`, rgba fríos en filtros/cards/selects). En el index el tinte quedaba oculto tras imágenes; en catálogo se veía → "el index está bien, el catálogo no" siendo la MISMA paleta.
- **Receta**: de-bluing ≠ cambiar 1 token — **grep TODOS los fríos hardcodeados** en `css/home/*`. Superficies elevadas = near-black **CÁLIDO** (`#0D0B09`, R≥G≥B; un gris `#1A1613` se siente "no negro"). `--cin-bg` (el negro aprobado) NO se toca; rgba de baja opacidad son imperceptibles → dejar.
- **Bonus**: componente del header que "no abre en otras páginas" = su wiring vive en `home-chrome.js` (solo index) → abrirlo por `:hover/:focus` CSS puro, NO cargar el JS en 20 páginas.

---

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §150.d, con antecedente en §92, según su cuerpo · migrado 2026-09-01 lote 6

### L-23 · La regla universal `* { max-width:100% }` (style.css:6450) COLAPSA el `width` explícito de elementos `position:absolute`
- **Disparador**: un panel/popover/dropdown con `width` fijo (`.nav-dd{width:580px}`) renderiza ANGOSTO (≈ ancho de su contenedor) y su contenido se desborda. El CSS del componente "se ve correcto leyendo el archivo" (§150.d: el dropdown del index).
- **Causa**: `style.css:6450` tiene un reset **global `* { max-width:100% }`**. Para un elemento `position:absolute`, ese `100%` se resuelve contra el **containing-block** = el ancestro posicionado más cercano (`.nav-dd-wrap` `position:relative`, que mide ≈ lo que mide el trigger ~120px). Así `max-width:100%`=120px **acota** el `width:580px` → panel de 120px + grilla desbordada. (El mismo reset ya había mordido el hero en §92 — ver comentario `hero.css:82` `img{max-width:100%}`. **Gotcha recurrente del legacy.**)
- **Receta**: NO toques el reset global (lo consumen incontables elementos → regresión masiva). Añade `max-width:none` SCOPED al componente (`.nav-dd-pro{max-width:none}`). Vence al `*` por especificidad (0,1,0 > 0,0,0) y el `*` **no** es `!important`. Verifica `getComputedStyle(el).maxWidth==='none'` + el `width` real tras el fix.
- **Meta**: invisible leyendo UN solo CSS (nace del cruce de dos hojas) → solo se ve en la cascada renderizada. Para "layout roto pero el código se ve bien", **renderiza y mide** (L-20/L-28), no releas el archivo.

---

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §157, según su cuerpo · migrado 2026-09-01 lote 6

### L-25 · Un `<footer>`/`<header>` de sección hereda chrome GLOBAL por selector de ELEMENTO
- **Disparador / síntoma**: "rectángulo o banda oscura detrás de una sección", del ancho EXACTO de una fila. Aquí el `<footer class="cin-hero-foot">` del hero (index) mostraba un rectángulo de borde a borde (de "+N vehículos" a "Vende con nosotros") — §157.
- **Causa raíz**: `dark-theme.css:688 body footer { background:linear-gradient(...) }` (pensada para el footer del SITIO) matchea CUALQUIER `<footer>`, incluido el del hero. La clase del componente (`.cin-hero-foot`) NO declaraba `background` → el fondo global se cuela. Invisible leyendo solo `cinematic.css`: nace del cruce de DOS hojas (misma familia que L-23).
- **Fix**: override scoped `.cin-hero-foot { background: transparent }` (clase 0,1,0 vence a `body footer` 0,0,2). NO tocar la regla global (el footer real del sitio la necesita).
- **Receta**: ante una "banda fantasma" detrás de una sección, grepea TODAS las hojas cargadas por selectores de **ELEMENTO** (`footer`/`header`/`section`/`nav`), no solo las clases del componente. El HTML semántico (`<header>/<footer>/<section>`) te expone a este chrome heredado.
- **Meta (reincidencia L-20/L-23)**: el fix #1 falló por razonar sobre UN archivo (quité un `backdrop-filter` inocente) — debí **renderizar y medir ANTES de afirmar causa**.

---

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · pagada en CARS §158 (ingestión del CRM, Fase 1) y ACTUALIZADA en §177, según su cuerpo · migrado 2026-09-01 lote 6

### L-26 · Trigger Firestore de ingestión: `merge:true` pisa campos first-seen + el mark de idempotencia DEBE ir en la transacción
- **Disparador**: Cloud Function que normaliza un doc de entrada a un modelo canónico haciendo **upsert** de una entidad (contacto/persona) por clave de dedup — capa de ingestión del CRM (Fase 1, §158, `functions/src/ingestion/onSolicitudCreated.js`).
- **Causa / dos trampas**:
  1. `batch.set(ref, fullObject, {merge:true})` NO borra campos ausentes, pero SÍ **sobrescribe** los presentes. Si `fullObject` trae `createdAt`/`score`/`ownerId`/`rating` con defaults, un 2º evento del MISMO sujeto **pisa** la fecha de primer-contacto y los campos volátiles que un humano ya editó. Bug latente (inofensivo hasta que algo setea esos campos) → corrupción silenciosa.
  2. Marcar idempotencia (`_ingestedAt`) en un `update` SEPARADO tras `batch.commit()` deja una **ventana de crash**: si la función muere entre commit y mark, el reintento RE-crea lead/activity (auto-id) → duplicados.
- **Receta**: **`db.runTransaction`**: `tx.get(ref)` → si NO existe `tx.set(full)`; si existe `tx.update({lastActivityAt,updatedAt})` (NO pisar first-seen/volátiles); + `tx.update(snap.ref,{_ingestedAt})` DENTRO de la misma transacción = todo-o-nada, cero duplicados. La contención de transacción resuelve dos eventos concurrentes del mismo sujeto nuevo (el 2º reintenta y ve "existe").
- **Meta**: lógica PURA (normalize) → unit-test sin Firebase (rápido); trigger fino (I/O) → emulador. **ACTUALIZADO §177**: Java 25 SÍ está instalado en esta máquina → el emulador corre local (`firebase emulators:exec --only firestore "npm --prefix functions test"`); los tests de rules viven en `functions/src/rules/` con `describe.skipIf(!FIRESTORE_EMULATOR_HOST)` (en `npm test` normal se saltan). La 2ª etapa de revisión (subagent-driven, correctness) cazó ambas trampas ANTES del deploy → revisar SIEMPRE triggers con efectos de datos.

---

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · pagada en CARS §159 (CRM Fase 2), según su cuerpo · migrado 2026-09-01 lote 6

### L-27 · App admin greenfield (Vite + Firebase modular) en paralelo: namespacing + estado compartido entre módulos
- **Disparador**: construir una app nueva (`admin-app/`) que corre AL LADO del admin viejo en el mismo dominio/projectId, leyendo el mismo Firestore (CRM Fase 2, §159).
- **Recetas**:
  1. **Aísla la sesión de auth**: `initializeApp(config, 'altorra-crm')` (app nombrada) → la clave IndexedDB `firebase:authUser:<apiKey>:altorra-crm` no choca con la compat `[DEFAULT]`/`altorra-admin` del sitio/admin viejo. Sin nombre, el modular `[DEFAULT]` colisiona con el compat `[DEFAULT]` en el mismo origen.
  2. **Auth = réplica del modelo LIVE, no del diseño**: verifiqué que el backend NO setea custom claims y las reglas usan lookup `usuarios/{uid}` → hidraté permisos de ahí (no claims). Construir lo que el diseño *menciona* sin verificar el backend habría roto el login. (verifica-no-asumas §3.3).
  3. **Estado entre módulos por capas**: si el módulo A (inbox) posee los datos y el módulo B (360) los necesita, A debe **espejarlos al store** (`store.set({leads})`) en cada cambio; B los lee de ahí. Olvidarlo = panel B abre VACÍO (bug real cazado por verificación). No basta tener el dato en una variable local del controlador.
- **Meta**: `base:'./'` en Vite → el `dist` sirve desde cualquier subruta de Pages (`/admin-app/dist/`) sin CI nuevo, sin tocar el deploy del sitio público. Cache-busting por hash → sin `CACHE_VERSION` manual para el admin.

---

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · sin §NN citado; su cuerpo se fecha a sí mismo (26-29/06) · migrado 2026-09-01 lote 6

### L-28 · Verificación de UI: `preview_screenshot` se cuelga tras `preview_resize`, con `backdrop-filter` pesado, **o con un modal/overlay abierto** — verifica con snapshot + eval
- **Disparador**: verificar una SPA en el preview; el 1er screenshot salió, pero tras un `preview_resize` (incl. un preset que dejó el viewport en 2px) TODO screenshot dio timeout 30s, aun congelando animaciones.
- **No es solo el resize (26-29/06)**: con CERO resize colgó 30s por un `.modal-overlay` abierto (26/06, "modal dialog… unresponsive renderer") y hasta en estado BASE sin modal (29/06, `#/vehiculos` en `?mock=1`) → trátalo como **no-confiable en general** aquí. `preview_eval` SÍ responde aunque el screenshot cuelgue (úsalo para cerrar overlays y como prueba).
- **Receta**: usa **`preview_snapshot`** (árbol a11y) + **`preview_eval`** (`getComputedStyle`/`getBoundingClientRect`/conteos del DOM) — texto, determinista. Reserva el screenshot para una foto final; si cuelga, no insistas (el snapshot YA prueba que renderiza). El resize a un preset corrompe las métricas (vi `innerWidth:2`) → usa `width/height` explícitos. Refuerza **L-20/L-23**.
- **Meta**: la verificación por texto cazó 3 bugs reales sin un screenshot legible (grid colapsado · panel vacío · SVG `width:0` sin `flex:0 0 auto`, L-60) → herramienta primaria, no plan B.

---

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · pagada en CARS §161 (CRM Fase 3b), según su cuerpo · migrado 2026-09-01 lote 6

### L-30 · Calendario: `dayKey` LOCAL (no UTC) + range+orderBy del mismo campo = índice AUTOMÁTICO
- **Disparador**: construir una vista de calendario/agenda sobre Firestore (CRM Fase 3b, §161).
- **Zona horaria (gotcha)**: para agrupar eventos por día NO uses `date.toISOString().slice(0,10)` — convierte a UTC y en Colombia (UTC-5) un evento de las 23:00 local cae al día siguiente. Construye la clave de los **componentes locales**: `` `${getFullYear()}-${pad(getMonth()+1)}-${pad(getDate())}` ``. Misma trampa al calcular el rango del mes.
- **Índices**: una query con **filtro de rango + `orderBy` sobre EL MISMO campo** (`where('dueAt','>=',a).where('dueAt','<',b).orderBy('dueAt')`) usa el **índice de campo único AUTOMÁTICO** de Firestore → NO necesita índice compuesto ni `firebase deploy --only firestore:indexes`. (Solo se necesita compuesto si filtras/ordenas por campos DISTINTOS.) Ojo: un range query **excluye** docs que no tengan el campo (los `activities` sin `dueAt` no aparecen) — justo lo que queremos para "solo citas".
- **Meta**: gap de dato real — el canónico no guardaba fecha/hora de cita; la solución MVP fue una acción "Agendar" que escribe `activities{dueAt}`, no reescribir la ingestión. Construir la fuente del dato donde el flujo lo produce, no forzar el esquema viejo.

> Lote 7 · migrado 2026-09-01 · 20 lecciones.

---

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · pagada en CARS §165 (CRM Fase 4, Reportes), el único §NN que cita su cuerpo · migrado 2026-09-01 lote 7

### L-32 · Dashboard de reportes: agregación CLIENTE $0 + SVG namespaced + dominio reusado (sin librería)
- **Disparador**: construir un tablero de KPIs/Reportes sobre el canónico (CRM Fase 4, §165).
- **Agregación (no backend de entrada)**: para volumen bajo-medio NO metas rollups/BigQuery. **`getDocs` acotado** (`orderBy('createdAt','desc')` + `limit` → índice de campo único AUTOMÁTICO, L-30) + **agregación en memoria** = $0, sin reglas/índices, sin realtime (un tablero es snapshot + botón "Actualizar", no `onSnapshot`). Filtra el período en memoria. Avisa en UI si tocaste el `limit` (`capped`). Rollups = enhancement cuando el volumen lo pida.
- **Charts sin librería (gotcha SVG)**: `el()` (core/dom) usa `document.createElement` → **NO crea SVG** (namespace equivocado → render invisible/roto). Para SVG: helper propio con `document.createElementNS('http://www.w3.org/2000/svg', tag)`. Barras = CSS puro (div `width:%`), accesibles por texto; línea/área = `polyline`+`polygon` con `vector-effect:non-scaling-stroke` + `preserveAspectRatio:none`. Acompaña cada chart con su **tabla** (a11y + fuente del CSV).
- **Determinismo (cero drift)**: reusa el dominio PURO existente (`forecast`/`channelOf`/`scoreLead`/`dayKey`/`format`) en vez de reimplementar. **Embudo monotónico**: define cada paso como "alcanzó al menos este hito" (subconjunto del anterior); "ganado" por **join** lead→deal (`convertedTo.dealId` ∈ deals `won`), no por estado del lead. Un lead `convertido` cuyo deal termina `perdido` NO es ganado (caso real a testear).
- **Detalles**: `dayKey` LOCAL para buckets de tiempo (no UTC, L-30). **CSV** RFC-4180: entrecomilla `" , \n \r`, comilla doble escapada, BOM `﻿`, fin de línea CRLF; en **es-CO entrecomilla también `;`** (Excel lo usa de separador de lista). **Cero cache bump** si el cambio vive solo en `admin-app/` (Vite hash-busting, L-27) y no toca el sitio público.
- **Meta**: KPIs de "período" (intake/resultado) vs "estado actual" (pipeline/SLA) son scopes distintos → etiquétalos, no los mezcles en un solo número. Verifica el tablero reconciliando la aritmética A MANO en `?mock=1` (snapshot+eval, L-28) — extiende el mock con casos cerrados (won/lost/convertido/perdido) o el embudo/win-rate salen vacíos.

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · pagada en CARS §165 (Reportes) y §166 (Contactos), los dos §NN que cita su cuerpo · migrado 2026-09-01 lote 7

### L-34 · Triar hallazgos de review/comité contra el CÓDIGO REAL (la mayoría de "high" son falsos positivos)
- **Disparador**: recibes findings de una revisión adversarial (workflow `adversarial-review`, comité de expertos, reviewer externo) con severidades.
- **Patrón observado (§165 Reportes + §166 Contactos)**: los reviewers marcan varios "high" que, al LEER el código real, son **falsos positivos** — el guard ya existía (`if(!alive) return` ya sale de la función), el error ya se maneja (`e.code` ya distingue permission-denied), la colisión no ocurre (solo un módulo montado a la vez), 'suscriptor' no es un `type` canónico, etc. Aceptarlos a ciegas = trabajo inútil + posible regresión.
- **Receta**: ningún hallazgo se aplica sin **confrontarlo con el código real ESE turno** (§19/§3.3). Clasifica: **REAL** (aplica) · **FALSO POSITIVO** (el reviewer no vio X → anótalo con evidencia) · **FUERA-DE-ALCANCE** (pre-existente/global → no lo arregla este cambio). Aplica solo los REALES; documenta por qué descartaste el resto.
- **Por qué pasa**: el reviewer ve un subconjunto y asume lo peor (es su trabajo, y es bueno). Tu ventaja: ves el sistema completo. El valor de la revisión NO es obedecerla, es que te OBLIGA a mirar cada punto.
- **Meta**: este triage ES lo que hará valioso al comité de expertos (skill futura) — síntesis crítica, no voto ciego. Doctrina del workflow `.claude/workflows/adversarial-review.js`.

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · pagada en CARS §173 (comité v6) · migrado 2026-09-01 lote 7

### L-35 · Verifica el MECANISMO antes de construir sobre él (el "hook que bloqueaba" no existía) + escape del pre-commit
- **Disparador**: vas a diseñar/decidir basándote en un comportamiento del tooling ("el hook bloquea X", "el linter valida Y").
- **Caso (comité v6, §173)**: el HANDOFF afirmaba "hook de seguridad bloquea Write con execSync" → verificado `.claude/settings.json`: solo existe el hook de SessionStart; el bloqueo observado era una intervención advisory del harness, NO un gate configurado. La decisión sin-child_process del linter sigue siendo correcta, pero por portabilidad + byte-identidad ×3, no por un veto inexistente. **Receta**: antes de citar un mecanismo como restricción, léelo (settings/hook/código) ESE turno.
- **Escape del pre-commit (blast radius ×3)**: el kernel `brain-check.mjs` corre en pre-commit de los 3 repos; un kernel con bug los bloquea a la vez. Diagnóstico primero (correr `node scripts/brain-check.mjs` suelto); `git commit --no-verify` SOLO con pedido explícito del cliente (§2) y dejando TODO-NN para arreglar el kernel.

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · verificada en CARS §173 · migrado 2026-09-01 lote 7

### L-36 · La deliberación "perdida" NO es irrecuperable: transcripts JSONL del harness (ruta de salvamento)
- **Disparador**: una sesión cerró sin capturar la deliberación (comité/workflow/Gemini) → crees que el conocimiento se perdió.
- **Realidad (verificada §173)**: el harness persiste TODO por-máquina en `~/.claude/projects/<proyecto>/<sesión>/` (transcripts + `subagents/workflows/*.jsonl`). Es deuda RECUPERABLE: localizar la sesión por fecha, extraer el crudo, archivarlo en `archiveDir` (manifest) + síntesis retroactiva.
- **Prevención**: el PRIMER acto tras un workflow de deliberación = copiar el resultado a `research-archive/` (Reflejo de Captura §G.4); el runner no puede escribir disco (sandbox sin fs) → la copia la hace el agente `[HONOR]` + el check de integridad (kernel v1.2) detecta JSON sin indexar.

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · observada en CARS §175 (el outage de billing del 2026-06-09) · migrado 2026-09-01 lote 7

### L-38 · `billing disabled` tumba las 27 functions — pero Eventarc RE-ENTREGA al recuperarse (outage corto ≠ pérdida)
- **Síntoma**: logs de TODAS las functions con "The request failed because billing is disabled" (crons + triggers). La web sigue viva (reads/writes directos a Firestore OK) pero ingestión CRM, emails, Telegram y LLM muertos.
- **Observado (§175, 2026-06-09)**: outage ~21:00→23:03 UTC; al volver el billing, **Eventarc RE-ENTREGÓ los eventos fallidos solo** (la solicitud de las 22:50 se ingirió a las 23:03, `_ingestedAt` tardío, sin pérdida ni duplicados). La retención de reintentos es limitada (~horas) — un outage LARGO sí pierde eventos → revisar `failedIngestions` + backfill manual.
- **Receta**: ante "la ingestión no corre": (1) `functions_get_logs` ANTES de tocar código — puede ser billing/cuota, no un bug; (2) al recuperarse, buscar `_ingestedAt` para ver si Eventarc ya re-procesó ANTES de re-disparar a mano (evita duplicados); (3) la causa de billing-disabled es del dueño del proyecto (tarjeta/cuenta GCP) — escalar al cliente, no "arreglar" código.

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · cazada en la review de CARS §184, antes de producción · migrado 2026-09-01 lote 7

### L-39 · Un GET público linkeado por WhatsApp/email JAMÁS debe mutar estado (los previews lo disparan solos)
- **Síntoma**: "el cliente confirmó sin abrir el link" — WhatsApp genera la vista previa haciendo fetch del link DESDE el remitente al componer; Outlook SafeLinks/antivirus hacen lo mismo con emails. Cazado por review §184 ANTES de producción: el flujo entero de confirmación se auto-confirmaba.
- **Receta**: GET = página intersticial con botón; SOLO el POST muta (`req.method === 'POST'`). Aplica a todo magic-link (confirmar/cancelar/unsubscribe). De paso: escapar TODO dato reflejado (XSS) + header CSP.

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · cazada en la review de CARS §184 · migrado 2026-09-01 lote 7

### L-40 · Firestore `set(..., {merge:true})` NO borra claves de mapas omitidas — y liberar recursos compartidos exige verificar PROPIEDAD
- **Gotcha 1**: para quitar una clave de un mapa con merge se necesita `deleteField()` (tombstone) o `update()` del campo completo; omitirla la deja viva → "lo borré y sigue ahí" (review §184: 'Quitar ausencia' era un no-op).
- **Gotcha 2**: en pools de reservas (slots/bloques) sin dueño por entrada, liberar "mis" recursos al cancelar puede borrar los de OTRO si mi doc nunca los reservó (estados que no retienen) — gate de propiedad ANTES de liberar (`holdsTuple` §184) o persistir qué se reservó exactamente.

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · pagada en CARS §188 y reincidida en §209 · migrado 2026-09-01 lote 7

### L-41 · El "censo literal de escritores" para una whitelist de Rules debe incluir los escritores INTERNOS (admin/staff), no solo los públicos
- **Síntoma**: E5 censó los 5 forms públicos de `solicitudes` y su whitelist rompió en silencio al 6º escritor — la cita interna del clásico firmaba con `createdBy` (permission-denied desde el deploy, §188). El `catch` optimista del cliente lo enterraba.
- **Receta**: el censo = grep de TODOS los `collection('X').add/set` en js/ + admin-app/ + bots, no solo los flujos "del usuario". Y cada escritor legítimo entra a la suite con su payload LITERAL (el test del payload interno habría reventado en E5).
- **REINCIDENCIA §209 (17/06) ⟦OPUS-4.8⟧**: 3er escritor admin olvidado — `createManualLead` (`admin-app/.../capture/capture.data.js`→`solicitudes`) daba permission-denied para TODOS. La lección EXISTÍA pero ni el censo SEC-06 §187 ni el barrido §188-0.3 (que la parió) grepearon `admin-app/.../capture`. **Endurecer a MECÁNICO**: tras CUALQUIER cambio a un `hasOnly`, correr `grep -rn "collection('solicitudes')" js/ admin-app/src/ functions/` y exigir que CADA escritor tenga test de emulador con su payload literal (el de createManualLead no existía → reventó silencioso en el portal-prod). Fix = rama admin dedicada (`crm.edit` + `_createdByUid==auth.uid`), NO aflojar el público (ADR §209).

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · evitada en CARS §204 (port de dealers) · migrado 2026-09-01 lote 7

### L-42 · Al portar un módulo cuyo docId es un slug derivado, REPLICAR el regex EXACTO del clásico (no el slugify "mejorado" del portal) ⟦OPUS-4.8⟧
- **Síntoma (evitado)**: dealers (§204) deriva docId del nombre. El portal ya tenía `brands.slugify()` que normaliza tildes (NFD) — reusarlo habría dado un docId DISTINTO para nombres acentuados que el clásico (`replace(/[^a-z0-9]/g,'-')`, sin NFD) → durante el doble-admin, crear el mismo aliado en cada admin produce DOS docs y rompe el join `vehiculos.concesionario`.
- **Receta**: en todo port con interop (clásico ↔ portal coexistiendo), la clave del doc es un CONTRATO — replicar su generación byte a byte, no "mejorarla". Igual con `_version`: si las rules del módulo NO exigen `validVersion()`, NO escribirlo (rompería al clásico que escribe sin él). El crítico adversarial del workflow lo cazó antes de codear.

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · verificada en CARS §215 · migrado 2026-09-01 lote 7

### L-43 · La ADC de esta máquina está ligada a `bersaglio-jewelry` → scripts Admin SDK contra `altorra-cars` dan `PERMISSION_DENIED` (IAM, NO rules) ⟦OPUS-4.8 · rev-Fable⟧
- **Síntoma**: `node functions/<script>.mjs` (Admin SDK + ADC) contra altorra-cars aborta con `7 PERMISSION_DENIED: Missing or insufficient permissions`, aunque el MISMO patrón corre bien en bersaglio (`backfill-claims.mjs`).
- **Causa (verificada §215)**: `~/AppData/Roaming/gcloud/application_default_credentials.json` trae `quota_project_id: bersaglio-jewelry` y `gcloud auth list` = sin cuentas → la ADC se montó SOLO para bersaglio; ese principal no es IAM-member con acceso Firestore en altorra-cars. El Admin SDK **BYPASSA las security rules** → un `PERMISSION_DENIED` del Admin SDK es SIEMPRE IAM del principal, jamás reglas.
- **3 planos de auth (no confundir, L-23)**: (1) `firebase login` (CLI deploys, `altorracarssale@`) ≠ (2) **ADC** (lo que usa el Admin SDK en scripts `node`) ≠ (3) security rules (irrelevante para Admin SDK). Un script `node` standalone usa (2), no (1).
- **Receta**: para correr un script admin contra altorra-cars desde esta máquina, el dueño re-autentica ADC con cuenta autorizada: `gcloud auth application-default login` + `gcloud auth application-default set-quota-project altorra-cars`. **Alternativa preferible** para mutaciones de prod (callejón e + precedente `seedSystemRoles`): empaquetar el backfill como **callable 1-clic** (corre con la SA de Functions, sin ADC ni terminal).

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · pagada en CARS §222 · migrado 2026-09-01 lote 7

### L-47 · En reglas Firestore, `resource.data.X` de un campo AUSENTE **LANZA** (no es null) — guardar con `('X' in resource.data)` ⟦OPUS-4.8⟧
- **Síntoma (§222)**: un test rules-unit de `marcas` dio `PERMISSION_DENIED: Property _version is undefined on object` al ACTUALIZAR un doc sin `_version` (los seed/legacy). En prod no se notó porque el dueño edita como **super-admin** (que bypassa `validVersion()`); un `brands.edit` no-super SÍ lo dispara.
- **Causa**: `validVersion()` = `request…_version == resource.data._version + 1 || (resource.data._version == null && …)`. El PRIMER operando accede a `resource.data._version`; si el doc no lo tiene, **lanza evaluation error** → la `||` ni evalúa el fallback `== null`. Acceder a un campo ausente en reglas es un ERROR, NO `null`.
- **Receta**: antes de leer un campo OPCIONAL de `resource.data`, **guardar con `('X' in resource.data)`** (o `.get('X', default)` donde exista), ANTES de la operación que lo accede. En `request.resource.data` (create) el cliente siempre lo manda; el riesgo es leer `resource.data` (el doc previo, que puede ser seed/legacy sin el campo). Aplica a cualquier helper que compare versión/timestamp de docs que pueden no tenerlos.

> Origen: CARS `docs/31-LECCIONES-GIT.md` (titular en `docs/30-LECCIONES.md`) · vivida en CARS §223; el hazard inverso, en §288 · migrado 2026-09-01 lote 7

### L-48 · Sesión concurrente: un `git add` amplio en otro chat arrastra tu edit sin commitear
- **Síntoma**: editas un archivo (p.ej. `CLAUDE.md`) en el repo R; al volver, `git status` muestra archivos `M` que NO tocaste, y minutos después desaparecen (otro proceso commiteó); tu archivo queda con un diff inesperado vs HEAD.
- **Causa**: OTRA sesión/chat trabaja R en paralelo y al cerrar su tarea hizo `git add -A` / `commit -a`, **arrastrando tu edit sin commitear** dentro de SU commit (por eso jamás `git add -A` — M-12).
- **Receta**: (1) ANTES de operar git en cualquiera de los 4 cerebros, `git status`: si hay `M` ajenos = sesión viva → NO hagas branch/commit/checkout (carrera). (2) Si tu edit ya fue arrastrado a HEAD, verifica byte-identidad (`grep … | sha256sum`) y `git checkout -- <archivo>` para alinear tu working-tree a HEAD; NO re-commitees. (3) `git add` SIEMPRE archivos específicos, nunca `-A`.
- **⚠️ Hazard INVERSO (2026-07-07, §288)**: un `git checkout -- <archivo>` para revertir TU edit accidental **también borra el trabajo SIN COMMITEAR de otra sesión** que esté en el MISMO archivo (working-tree, no en HEAD → irrecuperable, no es blob colgante salvo que lo hubieran `git add`eado). Pasó: reverti `docs/99` para deshacer mi §288 mal-ubicado y destruí el §288-carrusel sin commitear de otra sesión (su CÓDIGO sí estaba salvo en `76b01728`). **Receta**: antes de `checkout -- <file>`, `git diff <file>` — si hay adiciones que NO escribiste (trabajo ajeno vivo), NO hagas checkout ciego; **quita quirúrgicamente TUS líneas con Edit** y deja las suyas. El checkout blunt es un martillo; el working-tree ajeno no tiene red.
- *Vivido en §223 (propagación §G.4 Caza-bugs ×4; en insema lo arrastró la sesión de ADR-C → `348f80d`). Hazard inverso vivido en §288 (esta sesión).*

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · pagada en CARS §225 · migrado 2026-09-01 lote 7

### L-49 · Swap de backend de un script CI sin regresión: SDK-dual con fallback + `npm ci` exige lock en sync ⟦OPUS-4.8 · rev-Fable⟧
- **Patrón SDK-dual con fallback (§225)**: NO reemplazar el backend — `connectDb()` ELIGE por entorno (`FIREBASE_SA_KEY` → admin; ausente → cliente histórico) y un wrapper unifica la lectura (client y Admin SDK exponen la MISMA interfaz `snap.docs[].id/.data()/.forEach` → consumidor INTACTO). Secret ausente = byte-idéntico al original → cero-regresión verificable corriendo el fallback EN VIVO; la ruta admin (no-testeable) se valida por revisión adversarial.
- **SA en GitHub Actions ≠ ADC (L-43)**: secret → env var (`cert(JSON.parse(env))`), NO la ADC local (ligada a bersaglio). **GOTCHA `npm ci`**: aborta si `package.json`↔`package-lock.json` desync (rompe el CI en silencio) → SIEMPRE `npm install <dep> --save` (sincroniza el lock) y commitear AMBOS.

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · pagada en CARS §226 · migrado 2026-09-01 lote 7

### L-50 · Workflow de subagentes en background: se CUELGA en herramientas gateadas por permiso; ultracode lo agrava ⟦OPUS-4.8 · rev-Fable⟧
- **Causa+receta**: subagente DETACHED que llama tool con prompt de permiso (`Bash git`, `Read` fuera-cwd como vault `../brain-private`) → cuelgue infinito esperando aprobación; ultracode+MCP densos lo agravan (§226; Bersaglio ~4.7M tok/2h30). Perfil seguro = read-only IN-cwd (`Grep`/`Read`), SIN git/fuera-cwd, o comité ACOTADO (pocos, sin tools, sobre diagnóstico verificado). Si cuelga: `TaskStop` + cosechar `StructuredOutput` del `.jsonl` (L-61). **SSoT = skill global `comité-expertos §ACOTADO`** (×5 sha `5651c53b`); TODO-31 ✅; revalidado 28/06 (L-57).

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §227 (TODO-24); familia §107/§202 · migrado 2026-09-01 lote 7

### L-51 · Recuperación de borradores "pro" SIN reabrir un autosave ya rechazado: separar borrador-deliberado de red-de-seguridad-local (opt-in, scoped por uid) ⟦OPUS-4.8⟧
- **Síntoma/contexto (§227/TODO-24)**: el dueño pide "borradores profesionales con autosave/recuperación" PERO en el pasado (§107) quitó el autosave porque reaparecía y restauraba solo ("no me restaures automáticamente"). El pedido literal ⊥ el historial verificado.
- **Causa/insight**: "profesional" = el **RESULTADO** (nunca perder trabajo, sin bugs), NO el **mecanismo** (autosave-restore) ya rechazado. Un autosave que persiste drafts crea fantasmas que reaparecen en la galería = **§107 disfrazado** ("nunca re-pregunta ≠ nunca resucita").
- **Receta**: (1) separa DOS conceptos — borrador **DELIBERADO** (botón → backend → galería → retomar) vs **RED DE SEGURIDAD** local (localStorage debounce, efímera, **NO** en la galería). (2) recuperación = **OFRECER** (barra opt-in al reabrir), NUNCA autorestaurar (form vacío hasta que el usuario pulse). (3) el buffer local va **scoped por `uid`** (localStorage es por-navegador → en equipo compartido cruza cuentas si no). (4) los datos REALES se aíslan a nivel **SERVIDOR** (rules `path/{uid}/`), no por código. (5) **guard anti-resurrección**: un write optimista que aterriza tras un delete recrea el doc → flag `_dead` + cancelar timers en close/discard/publish.
- **Familia**: §107 (drafts por cuenta) · §202 (V4 port verbatim por interop) · §227 (este rediseño) · M-17 (la meta: pedido literal ⊥ historial → interpretar por evidencia).

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · pagada en CARS §229 · migrado 2026-09-01 lote 7

### L-52 · Antes de replicar un script de KERNEL acoplado a convenciones ×cerebros, VERIFICA la convención de cada destino — un copy byte-idéntico que no aplica = no-op silencioso = falsa cobertura (M-10) ⟦OPUS-4.8⟧
- **Disparador**: vas a propagar un script del cerebro (índice/linter/generador) a los otros repos "byte-idéntico ×N".
- **Síntoma (§229)**: `brain-index.mjs` (auto-reconcilia §→línea) está acoplado a (a) headers `## NN.` numéricos y (b) índice con columna de nº de línea. bersaglio (headers fecha-leading) e insema (índice por-proveniencia) NO cumplen → un copy correría, diría "0 reconciliadas", saldría 0 y *parecería instalado*. Solo cars/inmob cumplen.
- **Receta**: (1) lee el `99`+`00` de cada destino y arma la **matriz de compatibilidad ANTES de copiar**; (2) instala SOLO donde aplica; donde no, un ADR que documenta el N/A + el pre-requisito (NO código muerto); (3) **verifica los hashes del kernel ANTES de añadir un peer** al manifest (si no, metes un warn en #11); (4) referencia una `L-/M-` solo si existe en ESE repo (un `M-10` de cars es ref colgante en bersaglio → pásalo a texto plano). Byte-identidad del kernel es un INVARIANTE a defender, NO una meta a forzar sobre convenciones divergentes.

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §251 (F-6, tarjeta FCM) · migrado 2026-09-01 lote 7

### L-54 · Un elemento `position:fixed`/`absolute` en `display:flex` SIN `width` y anclado a UN solo borde COLAPSA a su contenido — `max-width` no OTORGA ancho ⟦OPUS-4.8⟧
- **Síntoma (F-6 FCM card §251)**: tarjeta anclada `right`+`bottom` con `max-width:360px` pero **sin `width`** → render a **34px** de ancho, texto en columna de 1 char, off-screen. En mobile NO pasaba: la media query la anclaba `left`+`right` → los dos bordes le daban el ancho.
- **Causa**: `max-width` LIMITA, no OTORGA ancho. Un flex `fixed` sin `width` toma su `max-content`; un hijo flex con `min-width:0` deja al texto encogerse casi a 0; anclado a un solo borde nada lo estira. Cara OPUESTA de L-23 (allá un `*{max-width:100%}` colapsa un width explícito; aquí FALTA el width).
- **Receta**: `width` explícito en desktop (`width:340px; max-width:calc(100vw - 2*var(--s-5))`); en la media query mobile que usa `left`+`right`, `width:auto` para que los dos bordes manden. **Verifica con un viewport de ancho REAL** (`preview_resize {width:1280,height:800}`) — el "native size" del preview headless da `innerWidth:0` → activa la media query mobile y TODO colapsa (falso bug que te manda a perseguir la CSS equivocada). NO `preview_screenshot` tras `resize` (L-28).
- **Familia**: L-23 (max-width universal colapsa width) · L-28 (no screenshot tras resize) · L-53 (DS tokens admin-app).

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · sin §NN de ADR citado ni en su titular ni en su cuerpo (cita `W-11 F1(c)` y la doctrina §3.8 del `CLAUDE.md`, que no son ADRs) · migrado 2026-09-01 lote 7

### L-55 · UI con `transition` en preview headless: el valor animado queda CONGELADO en el inicio → verifica end-states neutralizando transiciones; y tabulabilidad por-breakpoint = CSS `visibility`, no `inert` ⟦OPUS-4.8⟧
- **Síntoma (W-11 F1(c) drawer)**: drawer abierto (clase + foco + `box-shadow` del override SÍ aplicados) pero `getComputedStyle(.sidebar).transform`/`getBoundingClientRect().left` reportan el valor CERRADO indefinidamente — el headless NO avanza la transición CSS (la regla específica gana: el `box-shadow`, sin transición, lo prueba).
- **Receta verificación**: para UI con `transition`, inyecta `*{transition:none !important; animation:none !important}` y lee los END-STATES del cascade (no el valor animado). Confirma con un `transition:none` inline → si salta al target, la lógica es correcta = artefacto headless. Familia: L-20/L-23/L-28.
- **Arquitectura (§3.8) `visibility` > `inert`**: para nav off-canvas que NO debe tabularse cerrado-en-móvil, usa CSS `visibility:hidden` (sale del tab-order, lo maneja la media query) en vez de `inert` por JS+`matchMedia change`. `inert` por evento tiene fallo latente GRAVE: si el `change` no dispara al cruzar a desktop, el nav entero queda MUERTO; el CSS lo elimina por construcción. Transiciona `visibility` junto al `transform` (visible durante el deslizado de cierre).
- **Familia**: L-20/L-23/L-28 (quirks del preview headless) · L-53 (admin-app DS).

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · sin §NN citado ni en su titular ni en su cuerpo · migrado 2026-09-01 lote 7

### L-56 · Sidebar de filtros ALTO: `sticky` sin tope RECORTA su mitad inferior; toggle-bp ≠ colapso-bp = franja muerta sin botón ⟦OPUS-4.8⟧
- **Síntoma (busqueda)**: los filtros ("Aplicar" incluido) caen bajo el viewport, INALCANZABLES (no es visual: no puedes aplicar).
- **Causa #1 (recorte)**: `.filters-sidebar{position:sticky;top:96px}` SIN `max-height`; el panel mide ~1106px (medido), lo que excede `viewport-96` cae fuera y un sticky NO scrollea por dentro. Cap+`overflow-y:auto` mete barra (el dueño la vetó). **Fix**: `position:static` → fluye, la página scrollea entera (coste: no "sigue"). MEDIR lo reveló (estimé 810, real 1106; L-20/L-23/L-54).
- **Causa #2 (franja muerta 901–1024)**: `style.css` colapsa+toggle a ≤1024 pero el cinematic a ≤900 → en 901–1024 filtros `max-height:0` SIN botón (cazado midiendo `filtersReachable:false`). **Fix**: alinear cinematic a ≤1024. **Regla**: DOS hojas sobre un componente responsive → los breakpoints de "toggle" y "colapsar" DEBEN coincidir.
- **Compartido**: `marca-cinematic.css` viste 24 páginas → corrige todas. **Familia**: L-23/L-54 · L-16/L-21 · L-55.

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (sin titular en `docs/30-LECCIONES.md`: nace y vive en la hoja hija) · sin §NN de ADR citado: su cuerpo remite a un brief (`…crm-overhaul… §PASE-1`) y al §3.3 del `CLAUDE.md`, que es doctrina, no ADR · migrado 2026-09-01 lote 7

### L-58 · `parent.append(null)` nativo pinta el literal `"null"` (≠ `el()` que filtra) ⟦OPUS-4.8⟧
- `append(a, panel(), b)` con `null` → text-node "null" (NO era campo Firestore ausente; A.1 adivinó §3.3). Fix: helper `core/dom.js` `appendAll()`. Detalle → brief `…crm-overhaul…` §PASE-1.

---

> Lote 8 · migrado 2026-09-01 · 20 lecciones.

---

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · sin §NN de ADR citado ni en su titular ni en su cuerpo (cita TODO-52 P1 y una re-verificación ×3 del hub) · migrado 2026-09-01 lote 8

### L-60 · SVG inline **hijo-flex directo** colapsa a `width:0` sin `flex:0 0 auto` (TODO-52 P1) ⟦OPUS-4.8⟧
- **Síntoma**: icono SVG (botón ★→`star`) con `height` correcta (19px) pero `width:0px` (botón colapsa) aunque la regla dice `width:19px` — confirmado midiendo `getComputedStyle`/`getBoundingClientRect` en vivo.
- **Causa**: un `<svg>` (viewBox, sin attr `width/height`) flex-item directo de un `(inline-)flex`, sin `flex:0 0 auto`, lo encoge `flex-shrink:1` en el **eje principal** (width en row) a 0; el cruzado (height) sí respeta → "height OK, width 0". Los que funcionaban (`.btn svg`/`.chip__ico`) ya traían `flex:0 0 auto`; los nuevos no.
- **Receta**: todo `<svg>` inline hijo-flex directo lleva `flex:0 0 auto` con su `width/height` (o envuélvelo en un `<span>` flex-item). Mídelo vivo (`eval`). **Familia**: L-23 · L-28 · L-53.
- **v2 (hub, ×3)**: en flex APRETADO el global `svg{max-width:100%}` (L-23) clampa el svg a ancho-0 → suma **`max-width:none`** al `flex:0 0 auto`. Al medir: svg bajo ancestro `display:none` (lista oculta en mobile) = `0×0` artefacto, mide a ancho desktop (L-28).

---

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en la MISMA línea) · pagada en CARS §261.5 · migrado 2026-09-01 lote 8

### L-61 · Workflow read-only puede colgar 1 agente en el structured-output (sin tool gateada) → bloquea `parallel()`; cosechar del `journal.jsonl` + `TaskStop` + straggler a mano. → ADR §261.5. ⟦OPUS-4.8⟧

---

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en la MISMA línea) · pagada en CARS §261.5 · migrado 2026-09-01 lote 8

### L-62 · Audit que clasifica código = FALSOS POSITIVOS (infiere emoji desde `icon('id')` ya presente) → ground-truth = `Grep` content-mode, no el JSON. Hermana §3.3. → ADR §261.5. ⟦OPUS-4.8⟧

---

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en la MISMA línea) · pagada en CARS §268 · migrado 2026-09-01 lote 8

### L-63 · Emulador Firestore ZOMBI en Windows: tras `emulators:exec` interrumpido, el java queda escuchando en 8081 → la corrida siguiente muere con "port taken". Receta: `Get-NetTCPConnection -LocalPort 8081 -State Listen` → `Stop-Process -Id <pid> -Force` y re-correr. → ADR §268. ⟦FABLE-5⟧

---

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en la MISMA línea) · pagada en CARS §268 · migrado 2026-09-01 lote 8

### L-64 · En firestore.rules, `resource.data.<campo>` sobre clave AUSENTE = evaluation-error (≠ null): `x == null` NUNCA matchea un campo que no existe → usar `resource.data.get('campo', default)`. Así el `validVersion()` F4.5 tuvo ROTA la migración null→1 por meses sin que nadie lo viera (los tests siempre sembraban el campo). Sembrar docs LEGACY sin el campo en los tests de rules. → ADR §268. ⟦FABLE-5⟧

---

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §280 (TODO-53 P1) · migrado 2026-09-01 lote 8

### L-66 · Contraste/rol a11y: mide la cascada viva (≠ el token que dice la spec) · `role=menu` es un contrato (TODO-53 P1) ⟦OPUS-4.8⟧
- **Contraste**: mide el `getComputedStyle().color` REAL, bléndeale el alpha sobre el 1er ancestro con bg opaco, y arregla la regla que GANA por especificidad — no la que dice la spec (caso: `style.css .footer-legal a{rgba(255,255,255,0.22)}` = **1.83:1**, no el token faint; fix 0.22→0.62 = 7.81:1 AAA). Gotcha: el SW sirve CSS viejo en preview (`styleSheets`=0.22 vs `fetch(no-store)`=0.62) → unregister SW + `caches.delete()` + hard-reload.
- **Rol**: `role="menu"` exige hijos `role="menuitem"` (axe `aria-required-children`). Barra de lanzadores/acciones ≠ menú → `role="toolbar"` + `aria-labelledby` + disclosure. **Familia**: L-16/L-21/L-20/L-23/L-54 · §280.

---

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §286 (TODO-53 P3) · migrado 2026-09-01 lote 8

### L-67 · Hero de CSS `background-image` = TRAMPA de LCP → usar `<img>`/`<picture>` (TODO-53 P3) ⟦OPUS-4.8⟧
- `background-image` se descubre tarde, no admite `fetchpriority` ni el preload responsivo `imagesrcset` → LCP altísimo (**22.6s móvil**), LCP element = el `<div>`. Fix: hero = `<picture>` real (`<source>` AVIF + `<img>` WebP srcset, `fetchpriority=high`) → preload COINCIDE; UN formato (no doble-descarga); `object-fit/position` ≡ `background-size/position`; filtros en el CONTENEDOR. **Verifica el LCP con TRACE real** (el observer del preview dio 0, falso). Detalle → §286.

---

> Origen: CARS `docs/31-LECCIONES-GIT.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §288 — el propio cuerpo declara la colisión de numeración con el §288-carrusel de `dev` · migrado 2026-09-01 lote 8

### L-68 · Ancla de `.replace()` que cruza `\n` falla EN SILENCIO en Windows (CRLF)
- **Síntoma**: `SSG_SELFTEST=1 node scripts/generate-vehicles.mjs` falla SOLO en Windows local (`marca: esperaba 2 global(es) PRERENDERED, encontro 0`); en CI (Linux/LF) pasa y las páginas reales (`marcas/toyota.html`) SÍ tienen los globals. Falla idéntico en `dev` limpio → **no es tu cambio, es el entorno.**
- **Causa**: la inyección de marca anclaba en un string con `\n` LITERAL (`'<script>\n        const params...'`). Con `core.autocrlf=true`, `marca.html` se checkoutea con CRLF → los bytes son `<script>\r\n        const params...` → el `\n`-only NO matchea → `.replace()` = **no-op silencioso**, 0 globals. El guard anti-fail-silent (`REQUIRED_ANCHORS_BRAND`) NO lo cazaba: validaba el substring `const params...` SIN el prefijo `<script>\n` → más laxo que el `.replace()` real (agujero del tamaño de un `\r`).
- **Receta**: todo anchor de `.replace()` con estructura MULTILÍNEA debe (a) tolerar `\r?\n` vía regex capturando `nl`/`indent` para reproducir el original **byte-idéntico en LF** (cero regresión en CI), o (b) anclarse en UNA sola línea (inmune a CRLF — así es la inyección de vehículo, por eso nunca falló). + un guard debe validar el anchor EXACTO del `.replace()`, no un substring suelto. + post-condición ruidosa (`if (html.indexOf('window.X = ')<0) throw`) → el no-op deja de ser silencioso también en generación REAL.
- *Vivido en el fix del selftest SSG `marca` (rama `claude/practical-franklin`; ADR de cierre §288 — ⚠️ colisión de numeración con el §288-carrusel P3.3 de `dev`/`76b01728`, reconciliar al merge). Primo de L-01 (CRLF+`sed`). El selftest es gate **MANUAL** — NO está en CI (`generate-vehicles.yml` solo corre `npm run generate`).*

---

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §292; el hueco de grilla venía de §283 (TODO-53 P0) · migrado 2026-09-01 lote 8

### L-69 · Grid-gap (§283) = void DENTRO de la tarjeta corta, y el masonry NO generaliza (TODO-53 P0) ⟦OPUS-4.8⟧
- `display:grid` (default `stretch`) estira la tarjeta corta a su fila + footer `margin-top:auto` (deliberado) clavado → void interno (NO entre tarjetas). `columns` (masonry §283) SOLO si el orden es irrelevante: reordena columna-mayor → ROMPE listas ordenadas → panel **0/10 APPLY-SAFE**. Fix order-preserving `align-items:start`/`line-clamp` = TRADEOFF visual → render vivo. **Un fix es LOCAL hasta demostrarlo** (re-verifica altura+orden/callsite). §292.

---

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en la MISMA línea) · pagada en CARS §294 (TODO-52 P0) · migrado 2026-09-01 lote 8

### L-70 · Overflow móvil en filas flex/grid + cómo auditarlo (TODO-52 P0, §294) ⟦OPUS-4.8⟧: en una fila `flex-wrap:wrap` [fijo][main `flex:1;min-width:0`][precio][acciones], flex ENCOGE main a ~0 para meter todo en 1 línea (encoger precede a envolver) → el contenido de main (título) desborda. Fix: `main { flex-basis: calc(100% - <fijo> - gap) }` (o `min-width:%`) → main llena la 1ª fila, el resto envuelve debajo. Análogo: grid con cols FIJAS + col `auto` (no encoge) desborda aunque el contenido sea `minmax(0,1fr)` → achica gap/padding en móvil (§294 Bandeja). **Auditar overflow por DOM**: la señal fiable es `documentElement.scrollWidth-clientWidth` (overflow de PÁGINA); por-elemento da FALSOS POSITIVOS en scrollers intencionales (kanban `overflow-x:auto`) → excluye si un ancestro tiene `overflow-x:auto/scroll`. Mide con viewport EXPLÍCITO (`preview_resize` a WxH concreto; el preset nativo dio 0×0 → todo "desborda").

---

> Origen: CARS `docs/31-LECCIONES-GIT.md` (titular en `docs/30-LECCIONES.md`) · vivida en CARS §294-audit (2026-07-08) · migrado 2026-09-01 lote 8

### L-71 · Commit en HEAD DESPRENDIDO (tras resume) → queda COLGANTE, no llega a `dev`/`main`
- **Síntoma**: `git commit` imprime `[detached HEAD <hash>]` (no `[dev <hash>]`); luego `git push origin dev` = "Everything up-to-date" y el `git checkout dev` REVIERTE tu edit del working tree (vuelve al estado de `dev`). El commit existe pero es DANGLING (solo alcanzable por hash).
- **Causa**: la sesión arrancó/quedó en HEAD desprendido (resume, o un pipeline previo `checkout main && merge && checkout dev` que abortó por `&&`). `git rev-parse HEAD` devuelve un hash estés o no en rama → NO revela el detached.
- **Receta**: (a) ANTES de commitear, verifica `git rev-parse --abbrev-ref HEAD` == `dev` (si imprime `HEAD` = detached → `git checkout dev` primero). (b) Recuperar el colgante: desde `dev`, `git merge --ff-only <hash>` (si su padre es el tip de dev = fast-forward limpio) o `git cherry-pick <hash>`; luego push + merge normal. Vivido 2026-07-08 (§294-audit, `38539b6e` recuperado). Primo operativo de L-48.

---

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en la MISMA línea) · cazada en la verificación LIVE de CARS §295 · migrado 2026-09-01 lote 8

### L-72 · "¿Este mes/rango tiene datos?" — cuenta lo del rango VISIBLE, no el `length` del store global ⟦OPUS-4.8⟧: un empty-state con `!store.items.length` FALLA si el store RETIENE datos de otros rangos al navegar (Agenda: `ui.events` guarda citas de meses previos; la grid filtra por día → un mes vacío tiene `ui.events.length>0` → el empty no aparecía). Cuenta los que caen en el rango visible (`weeks.some(cell.inMonth && byDay[key].length)`). Bug cazado en la verificación LIVE de §295 (mes vacío mostraba grid en vez del empty). Emparentado con el patrón CSS `:has()`/`:not(.is-out)` para ocultar ítems vacíos (§295).

---

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · importada de BERS §181 por la sinapsis del 2026-07-10; su gate se evaluó en CARS §299 · migrado 2026-09-01 lote 8

### L-73 · Dinero + listeners = JAMÁS decidir en automático sobre una foto incompleta (origen bersaglio §181, 2026-07-10) ⟦FABLE-5⟧
- **Síntoma (real, bersaglio)**: traslado a bóveda DUPLICADO ($5.6M fantasma) — al recargar, 4 `onSnapshot` llegaban en DESORDEN y un modal automático decidía "falta trasladar" con las fuentes a medio llegar; encima un `Math.max(0,x)` del formateador escondía un −$5.4M como "$0". Aplica IGUAL a cars (CRM `deals`/comisiones aliados §259, TODO-26 facturación, wompi futuro) e inmobiliaria: el patrón listener-decide-solo es el mismo.
- **Receta (3 reglas)**: **(a)** toda decisión AUTOMÁTICA (modal/bloqueo/alerta/cálculo) sobre datos remotos exige **gate de fuentes-listas** — o mejor: **agregado denormalizado en UN doc** escrito server-side en la MISMA transacción (una fuente = sin carrera); botones manuales pueden ser optimistas, lo automático NO. **(b)** **deshacer netea TODAS las vistas** del mismo peso (UI estimada · ecuación/sello del server · ledger), no solo una — un descuadre ENTRE vistas es el bug aunque cada una "se vea bien" sola. **(c)** los **formateadores jamás recortan anomalías**: `Math.max(0,x)`/`|| 0`/catch vacío convierten un negativo imposible en "todo bien" → el rojo debe VERSE.
- **Instrumentos**: skill `caza-bugs §2b` (checklist del dinero: ida-y-vuelta con recarga · foto incompleta · conservación 3-vistas · deshacer-netea-todo · negativos visibles · doble sesión) + skill `auditoria-financiera` (7 invariantes + 4 fases) + **W-13** (`60-WORKFLOWS`).
- **Gate (evaluado ADR §299)**: el check kernel "diff toca dinero sin test del escenario" NO es mecanizable limpio en `brain-check` (byte-idéntico ×4 + sin child_process → no lee el git diff; y "test del ESCENARIO" no se verifica mecánicamente = invita green-tuning). El gate mecánico real = CI del TODO-30 (Doble Llave). Mientras: **[HONOR]** vía `caza-bugs §2b`.

---

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · importada por la auditoría cross-cerebros CARS §300 (2026-07-10) · migrado 2026-09-01 lote 8

### L-74 · Sinapsis bersaglio→cars: 4 gotchas Firebase/dinero importados (auditoría cross-cerebros §300, 2026-07-10) ⟦FABLE-5⟧
- **Callable v2 que devuelve 403 SIN ejecutarse** (cero logs): falta el invoker público — firebase-tools NO lo re-aplica en update → borrar y re-desplegar la function (bersaglio §115). Cars despliega callables seguido (crmSuppressContact, triggerSeoRegeneration…).
- **`firebase functions:secrets:set` (gen2) NO re-empaqueta `functions/.env`**: tras cambiar env-vars no-secretas, re-deploy COMPLETO de la function o sigue leyendo el `.env` viejo (bersaglio, síntoma real con Wompi). Cars: 57 functions gen2.
- **MCP `firestore_query_collection` filtrando un campo timestamp con `string_value` devuelve `[]` SIN error** = falso "no hay datos" → usar `firestore_list_documents` con `orderBy` + re-probar con ventana amplia ANTES de concluir 0 (bersaglio; hermana de M-20).
- **El RENDER sugiere, el CLICK re-valida** (bersaglio §76): toda acción de dinero/decisión disparada desde el contexto PINTADO (NBA, acciones 1-clic de la Bandeja) RE-LEE el doc fuente al ejecutar — un fetch fallido es indistinguible de "no existe" y convierte un blip de red en decisión one-way; y todo `onSnapshot` de una superficie de control lleva error-callback (sin él la cola muere MUDA: "roto" se ve igual que "al día"). Completa L-73. Consulta a los hermanos → skill `sinapsis-cerebros`.

---

> Origen: CARS `docs/30-LECCIONES.md` (titular y cuerpo en el mismo nodo) · pagada en CARS §246 (F-3) · migrado 2026-09-01 lote 8

### L-77 · Módulo en blanco SIN error de consola = `render()` post-`await` lanza en un `load()` fire-and-forget → unhandled rejection silenciosa ⟦OPUS-4.8⟧
**Disparador**: un módulo de `admin-app/` (o cualquier `mount(root){ …; load(); return cleanup }`) monta su shell pero queda VACÍO, y la consola NO muestra error. **Causa**: el `render()` que corre *después* del `await` está fuera del `try/catch` de `load()`; como `load()` se invoca sin `.catch` (fire-and-forget), un throw ahí (ej. leer `m.pending.length` cuando `compute()` no devuelve `pending`) se vuelve **unhandled rejection** — invisible salvo con un listener `window.addEventListener('unhandledrejection', …)`. **Receta**: (1) al depurar un módulo en blanco, inyecta primero el listener de `unhandledrejection` vía `preview_eval` ANTES de teorizar; (2) cuida que el modelo de `compute()` contenga TODO lo que `render()` lee (desajuste de forma = el bug clásico); (3) opcional: `load().catch(…)` o envolver el `render()` final en try. F-3 §246.

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · el defecto se vivió tras la reorganización de CARS §119 · migrado 2026-09-01 lote 8

### M-01 · Una neurona stale me habría engañado (Memoria Espacial)
- **Defecto**: tras reorganizar `js/` (§119), `20-ESPACIAL` siguió describiendo el `js/` plano viejo → una sesión futura habría leído rutas inexistentes y errado.
- **Causa**: no había regla que obligara a refrescar la memoria espacial al cambiar la estructura.
- **Corrección**: actualicé `20-ESPACIAL` + nació el **Reflejo de Frescura (§G.4)**. Principio: una neurona vieja es peor que ninguna.

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · sin §NN de ADR citado ni en su titular ni en su cuerpo (cita la RCA §19 del `CLAUDE.md`) · migrado 2026-09-01 lote 8

### M-02 · Un chequeo del cerebro dio falso negativo (casi asumo mal)
- **Defecto**: mi `grep` de "CSS dinámico" devolvió 0 por comillas mal escapadas → casi concluyo que todo el CSS era estático (falso: `components.js` carga 4 CSS).
- **Causa**: confié en un resultado de `0` sin verificar archivo-por-archivo.
- **Corrección**: regla en L-10 — **un chequeo que devuelve 0 puede ser falso negativo; verificar los 0-ref uno por uno** antes de asumir. Refuerza RCA §19.

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §123 · migrado 2026-09-01 lote 8

### M-03 · El cerebro no se auto-alimentaba sin recordatorio explícito
- **Defecto** (reportado por el cliente): los Reflejos §G.4 eran principios descriptivos, no checklist — al cerrar tareas se omitía la consolidación ("lo documento después" → nunca).
- **Corrección**: **Reflejo de Cierre (§G.4)** — checklist enforzable ANTES de declarar lista una tarea (10/05/99/00/30/cache/brain:check); si falta algo, NO está cerrada (ADR §123). **Principio**: lo crítico se convierte en checklist accionable en el momento exacto donde falla, no en doctrina de arranque.

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §124 · migrado 2026-09-01 lote 8

### M-04 · Iterar fixes sin verificar la fuente de verdad real (no solo el código de aplicación)
- **Defecto (SP-5.0)**: 3 rondas iteraron sobre el código de app (`historial-visitas.js`...) asumiendo el bug ahí; la causa real era **el service worker** (stale-while-revalidate servía código viejo). La ronda 4 lo cazó al LEER el SW.
- **Corrección**: "verificar la fuente de verdad real" (§19 RCA) = NO solo el código de app — también SW/cache/CDN/build. Si el bug persiste tras 2 hipótesis fallidas en un módulo, mira FUERA (infraestructura); el Trigger de Error §G.2 lo incluye. **Principio**: cambia el lente, no la profundidad. ADR §124.

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §125 · migrado 2026-09-01 lote 8

### M-05 · El cerebro debe crecer en dominios ESTRATÉGICOS, no solo operacionales
- **Defecto**: el cerebro acumulaba memoria operacional pero NO análisis especializado (seguridad/legal/UX/SEO/perf/a11y) — cada sesión re-investigaba esos dominios desde cero.
- **Corrección (ADR §125)**: Trigger 🔵 + registry de Lóbulos (`40-LOBULOS-DOMINIO`) + skills externas. Skills = framework genérico; lóbulos hijos (`41`, `42`…) = findings proyecto-específicos, nacen on-demand CON contenido real (anti-patrón rechazado: neuronas vacías "para preparar el terreno" — viola anti-fragmentación §G.4).

---

> Lote 9 · migrado 2026-09-01 · 19 lecciones.

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · la REINCIDENCIA está fechada en CARS §146 (SP-5.3, 2026-05-31); el defecto original no cita §NN · migrado 2026-09-01 lote 9

### M-06 · Afirmé "sin desplegar" con `git rev-list origin/main..HEAD` SIN `git fetch` → `origin/main` local stale
- **Defecto**: le dije al cliente que su trabajo (simulador) NO estaba desplegado, basándome en `git rev-list origin/main..HEAD = 1`. Pero el `origin/main` LOCAL estaba desactualizado (no hice `git fetch`); el cliente YA había pusheado. Afirmé un estado de despliegue FALSO; el cliente me corrigió ("esto es falso ya hice todos los commit y git push").
- **Causa**: asumí que `origin/main` local reflejaba el remoto. Las refs `origin/*` locales solo se actualizan con `fetch`/`pull`; un `git push` del cliente NO actualiza mi copia local.
- **Corrección**: NUNCA afirmar estado de despliegue/remoto desde refs `origin/*` locales sin `git fetch` primero (o sin que el cliente confirme). Working tree limpio + commits locales NO dicen nada del remoto. Ante "¿está desplegado?": fetch o preguntar.
- **Principio**: RCA §19 ("verificar, no asumir") aplica también a GIT — las refs remotas cacheadas son fuente de verdad STALE. No es código, pero es igual de traicionero.
- **⚠️ REINCIDENCIA (SP-5.3 §146, 2026-05-31)**: volví a caer. Afirmé al cliente "todo tu cinematic está encerrado en la rama, fuera de producción" cuando **6 PRs (#771–#777) ya lo habían desplegado**. Agravante nuevo: esta vez la fuente de mi error no fue solo `origin/*` stale, sino que confié en el heartbeat **`05` ("Producción = §140")** como autoritativo — pero **`05` es TAMBIÉN un cache que driftea**: yo lo venía escribiendo "§14X SIN commit / pendiente merge" en cada ADR sin reconciliar contra el remoto, mientras el cliente mergeaba cada PR en silencio. **Doble regla reforzada**: (1) el cliente commitea/pushea/**mergea** sin avisar → el remoto cambia bajo mis pies; (2) la fila "Producción" de `05` NO es autoritativa para estado de despliegue — **`git fetch` + `git log origin/main` SIEMPRE antes de afirmar qué hay en prod**, y reconciliar `05` con ese resultado real. Lo descubrí de pura suerte (hice fetch para planear un merge que ya estaba hecho). Si el cliente dice "ya commiteé todo", asumir que también pudo desplegar.

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · sin §NN que la pague: su cuerpo solo cita el tramo §131→§138 como la sesión que se saturó · migrado 2026-09-01 lote 9

### M-07 · No avisé que el contexto se saturaba — el cliente tuvo que pedirlo al 92%
- **Defecto**: la sesión creció enorme (§131→§138, varios sprints encadenados + decenas de lecturas/edits grandes) hasta 92% de la ventana de contexto. El cliente me avisó él ("el contexto está saturado y nunca me notificaste"). No monitoreé ni propuse cortar.
- **Causa**: no hay señal directa del % de contexto, pero la INDIRECTA (sesión larguísima, muchos sprints seguidos, archivos de miles de líneas) era evidente. Debí sugerir vaciar tras 2-3 sprints grandes.
- **Corrección**: en sesiones largas (varios ADRs/sprints encadenados), proponer proactivamente un punto de corte: "llevamos N sprints; conviene vaciar el chat y seguir en ventana nueva — el cerebro preserva el contexto". Mantener `05`/`10` al día en cada cierre para que vaciar sea barato.
- **Principio**: la continuidad vive en el cerebro, NO en la ventana de chat. Proponer el corte ANTES de saturar, no esperar al 92%.

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §151 (la propuesta de reforma que se evaluó con evidencia) · migrado 2026-09-01 lote 9

### M-08 · Evaluar propuestas de "mejora del cerebro" con evidencia, no con entusiasmo (§151)
- **Disparador**: el cliente o una IA externa propone reformar la arquitectura del cerebro (nuevos reflejos, métricas, nodos). Tentación: adoptar todo lo que "suena inteligente".
- **Defecto a evitar**: propuestas que (a) usan pseudo-métricas ("IQ", "entropía" por contador de turnos), (b) ignoran lo que el cerebro YA tiene (reinventan/duplican → fragmentación), (c) violan los topes (§G.5) inflando `CLAUDE.md`/`05`. La de §151 hacía las tres.
- **Receta**: (1) verificar contra el repo real — ¿ya existe?, ¿cabe en el tope? (grep + `brain:check`, RCA §19). (2) Separar la INTUICIÓN válida del MECANISMO (suele estar mal aunque la intuición sirva: "el contexto se degrada" ✅ pero "contador de turnos" ❌ — la métrica real es % de ventana, detectable por síntoma). (3) Adoptar solo la versión lean que cabe y no fragmenta; rechazar el resto con razón escrita. (4) Números de ROI sin medición → descartar.
- **Principio**: un cerebro equivocado es peor que uno incompleto (§G.4). Proteger topes + no-fragmentación > añadir features. Cuestionar con evidencia ≠ obedecer por entusiasmo (Reflejo de Desafío Crítico §G.4).

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §152 (el pre-cierre de sesión que nació de este hueco) · migrado 2026-09-01 lote 9

### M-09 · La Autocrítica debe vigilar la COBERTURA de los reflejos, no solo los errores de ejecución (§152)
- **Defecto**: el cliente detectó un hueco que yo no vi — faltaba un barrido holístico del cerebro ANTES de cerrar la sesión (los reflejos cubrían arranque + cierre-de-tarea, pero nada PROACTIVO a nivel sesión). Tuve que ser instruido para hacer la auditoría de frescura, en vez de dispararla solo.
- **Causa**: la Autocrítica miraba "¿el cerebro contribuyó a un ERROR?", no "¿mis reflejos CUBREN todos los momentos críticos?". Un hueco de cobertura no es un error visible — es un silencio.
- **Corrección**: §152 extendió el Reflejo de Auto-auditoría a **pre-cierre de sesión** (proactivo). A nivel meta: revisar periódicamente si el SET de reflejos tiene huecos (arranque / por-tarea / pre-cierre / saturación / desafío — ¿alguno sin cubrir?).
- **Principio**: el estado vivo (`05`/`10`) puede divergir de git entre turnos (el cliente commitea/mergea aparte) → vigilar la frescura vs realidad git es responsabilidad MÍA y proactiva, no a pedido.

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §153 (la frescura pasó de reflejo a check determinista) · migrado 2026-09-01 lote 9

### M-10 · Lo verificable va al LINTER que FALLA, no a un reflejo que debo recordar (§153)
- **Insight**: mi atención es el componente no-fiable; un script no se distrae ni se cansa. Apilar más reflejos (texto que debo leer+recordar) tiene rendimientos decrecientes. Para CADA error recurrente, preguntar: ¿es chequeable mecánicamente? → va a `brain:check` (un fallo es imposible de ignorar). ¿Es juicio? → reflejo saliente.
- **Aplicado (§153)**: la frescura (cache SW==cache-manager, `05` vigente==SW, origin/main) pasó de "reflejo que olvido" a check determinista. Lo **probé corriéndolo**, no leyéndolo → cazó su propio bug (finder de línea equivocado) + drift real de `origin/main`. Verificar > confiar (§19), también para mi propio código.
- **Límite honesto**: un hueco NOVEDOSO no anticipado no se automatiza — viene de perspectiva externa (cliente / sesión fresca). Por eso el handoff barato + el pre-cierre §152 importan: hacen barato que esa perspectiva entre.

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · sin §NN de ADR citado ni en su titular ni en su cuerpo (cita el §3.3 del `CLAUDE.md`) · recidiva fechada 2026-06-03 · migrado 2026-09-01 lote 9

### M-11 · "Verifica, no asumas" es UNIVERSAL, no solo RCA de código (recidiva 2026-06-03)
- **Defecto**: el cliente notó que asumo a veces. Esta sesión: (a) asumí que el repo `skills/` era la fuente de mis skills cargadas (era bundle del entorno, no el repo); (b) iba a afirmar el exit-code de `brain-check` sin leerlo. La regla §3.3 existía pero scopeada a "paths de código" → no me cubrió en hechos de config/estado/capacidades.
- **Causa**: misma raíz que M-02/M-04/M-06 (confiar en el modelo mental en vez de leer la fuente), pero la REGLA estaba demasiado angosta ("solo código") → no disparaba fuera de RCA. Una regla mal-alcanzada falla en silencio.
- **Corrección**: §3.3 generalizada a "evidencia antes de afirmar CUALQUIER hecho" + gate (citar evidencia del turno o decir "no verificado"). Per M-10, lo verificable (huérfanas/frescura/caps) ya vive en `brain:check`; el git/SessionStart hook lo hará automático.
- **Principio**: el ALCANCE de una doctrina es tan importante como la doctrina misma. Y doctrina sola no basta (M-10) → la red dura es el determinismo (linter + hooks); la doctrina es el respaldo.

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · el defecto vive en CARS §171.7 (la cura declarada que el grep no encontró) y lo cazó el comité de Validación Final del §172 · migrado 2026-09-01 lote 9

### M-13 · Una "cura" se verifica en la capa que el BOOT lee, con grep — no se declara en el historial (recidiva RECURSIVA 2026-06-09)
- **Defecto**: el ADR §171.7 declaró "añadí el Reflejo de Captura de Deliberación a §G.4" — pero `grep CLAUDE.md = 0 matches`. La cura vivía SOLO en §171 (historial on-demand que un boot fresco NUNCA lee, §G.1). El comité de Validación Final (Mandato 3, §172) lo cazó y se NEGÓ a certificar.
- **Causa**: declarar un reflejo "en §G.4" sin verificar que está en el archivo always-on. La falencia raíz del proyecto, RECURSIVA: sobre-declarar una cura ES el mismo M-10 ("presencia vendida como fidelidad") que el proyecto vino a matar.
- **Corrección (regla dura)**: la cura de una falencia de DOCTRINA se VERIFICA con `grep` en la capa que el boot carga (`CLAUDE.md`/§G), no en `99`/specs on-demand. Un ADR que diga "añadido a §G.4" exige el grep que lo pruebe EN EL MISMO TURNO. Familia de M-02/M-04 (verifica-no-asumas) + M-10 (anti-teatro).
- **Principio**: un gate de validación que puede decir NO y bloquear su propio cierre es el único que vale; si certifica por cortesía, es teatro.

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · sin §NN citado ni en su titular ni en su cuerpo · fechada 2026-06-12 · migrado 2026-09-01 lote 9

### M-14 · "Sesión fresca" de un plan es heurística de PRESUPUESTO, no gate — el corte lo decide el dueño con números reales
- **Defecto (2026-06-12)**: recomendé cerrar la sesión citando la nota de plan "vehicles = épica en SESIÓN FRESCA" cuando quedaba ~50% del presupuesto real y CERO síntomas de degradación. El dueño lo señaló: "recomiendas cerrar cuando no debe ser, porque cuando va en 800k no dices nada". Inverso exacto de M-07 (no avisé al saturar) — ambos son el MISMO defecto: decidir el corte sin medir.
- **Corrección**: una nota "sesión fresca" se escribió para proteger presupuesto; si al llegar el momento el presupuesto SOBRA, la nota no aplica. Protocolo: medir (presupuesto restante + síntomas §G.2), DECIR los números al dueño, y que ÉL decida el corte. Ni cerrar por nota de plan ni callar al saturar.

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §206 (el acantilado del `30`, donde la unidad de medida decidió el shard) · migrado 2026-09-01 lote 9

### M-15 · Medir el costo de contexto del cerebro = `.length` de JS sobre los bytes crudos, NO `wc -m` ni "líneas × N" ⟦OPUS-4.8 · rev-Fable⟧
- **Disparador**: auditar/des-saturar el cerebro (caps §G.5, presupuesto de boot) exige medir los chars REALES que el linter y el boot consumen — la decisión de shard/GC depende del número.
- **Defecto a evitar**: `wc -m` depende del locale y no cuenta `\r` de forma fiable; estimar "líneas × N" es ruido. El kernel `brain-check.mjs` mide `txt.length` (JS, sin normalizar) → ESA es la unidad canónica: en archivos CRLF cuenta CADA `\r` y `\n`; un emoji UTF-8 cuenta como sus code units JS (p. ej. 2).
- **Receta**: medir SIEMPRE con `node -e "console.log(require('fs').readFileSync(f,'utf8').length)"` y comparar contra el cap del manifest (fijado con la MISMA unidad). Mide con la regla del gate que vas a satisfacer, no con otra.
- **Por qué importa (§206)**: el acantilado de `30` se fijó en "58820c = 98%" con `.length`; con `wc -m` el número y la decisión de shard habrían sido otros.

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §207 (auditoría Nivel-2), sobre lo que el §206 había mecanizado y lo que dejó en doctrina · migrado 2026-09-01 lote 9

### M-16 · El lazo de auto-corrección funciona cuando MECANIZA (gate); es teatro cuando deja el fix en doctrina — la cura de una REINCIDENCIA es un gate, no un reflejo ⟦OPUS-4.8 · rev-Fable⟧
- **Defecto (auditoría Nivel-2 §207, 2026-06-15)**: la auditoría previa (Nivel-2 del 14/06) marcó el defecto "los nodos de boot 05/10 mienten sobre el estado git" como **REINCIDENTE con meta-lección OBLIGATORIA** — y aun así (a) el defecto siguió vivo al día siguiente y (b) la meta-lección mandada (ESTA, M-16) **nunca se escribió** (la lista paraba en M-15). Doble fallo del lazo: ni el fix ni el corrector-del-fix se ejecutaron. Familia M-06/M-09/M-11/M-13 recurriendo otra vez.
- **Causa raíz (evidencia dura, no impresión)**: el patrón es nítido — TODO lo que el §206 ató a un check del linter (shards, GC del 10, caps) SOBREVIVIÓ y se cerró con `.length`; TODO lo que dejó en "el próximo yo se acordará de reconciliar 05/10" RECAYÓ completo. El honor no escala entre sesiones sin memoria. Es la confirmación EMPÍRICA de **M-10**: el lazo funciona en la medida EXACTA en que mecaniza.
- **Corrección**: (1) cuando una auditoría manda una meta-lección o fix-de-doctrina, ESCRIBIRLO ESE turno (M-03, no "después"). (2) Toda reincidencia (defecto que vuelve pese a tener "corrección" documentada) declara que su cura-por-doctrina FALLÓ → su única cura real es un **GATE en el kernel** (TODO-29: boot/cache-vs-`origin/main`, anclas §G). (3) El gate es cross-repo (kernel ×3) → coordinar con el canon `bersaglio`, jamás cars-only (fork silencioso).
- **Principio**: una reincidencia NO se cura repitiendo la doctrina que ya falló; se cura subiéndola un nivel — de honor a determinismo. Si genuinamente no puede mecanizarse, se marca **[HONOR] explícito + ritual barato**, nunca se finge cobertura.

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §227 / TODO-24; el historial verificado que la salvó es el §107 · migrado 2026-09-01 lote 9

### M-17 · Cuando el pedido LITERAL del dueño contradice el historial verificado, NO construyas a ciegas — interpreta por evidencia (el RESULTADO, no el mecanismo) y prefiere opt-in sobre imponer ⟦OPUS-4.8 · rev-Fable⟧
- **Defecto evitado (§227/TODO-24, 2026-06-22)**: el dueño pidió "borradores con autosave"; el camino obvio era construirlo. El historial verificado (§107) decía que YA lo había quitado por molesto ("no me restaures automáticamente"). Construirlo habría re-litigado una pelea ya perdida = pérdida de **confianza** (su recurso escaso), no un bug técnico.
- **Cómo se cazó**: el comité **ACOTADO** + peer-review cruzado anónimo convergió 4/4 en "estás resolviendo el problema equivocado" — el pedido es el **RESULTADO** (no perder trabajo, sin bugs), NO el **MECANISMO** (autosave-restore). En solitario la propuesta de autosave era convincente; el cruce anónimo la refutó.
- **Principio**: pedido-literal ⊥ historial-verificado = **GATE de interpretación**, no problema de diseño. Resolver por evidencia (o preguntar la disyuntiva resultado-vs-mecanismo) ANTES de codear; ante la duda, **opt-in (ofrecer) > imponer**. Familia M-11 (verifica, no asumas) · §3.3.

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · sin §NN citado ni en su titular ni en su cuerpo · fechada 2026-06-23 (TODO-35 diferido) · migrado 2026-09-01 lote 9

### M-19 · No construyas lo NUEVO encima de lo VIEJO roto sin limpiarlo — TODO-35 deferido ×N → el código viejo rompió EN VIVO ⟦OPUS-4.8⟧
- **Defecto (2026-06-23, reportado con capturas)**: construí F1-F3+TTL del bot v2 (dormido, esperando saldo) ENCIMA del Free Core viejo que da respuestas malas, **sin nunca ejecutar TODO-35** (el mecanismo de dead-code que el dueño marcó CRÍTICO por Knight Capital y yo deferí ×N a "sesión fresca"). Peor: F2.b agregó botones que envían TEXTO al motor → el Free Core vivo no los entiende → **"no te entendí" a clientes reales** (`concierge.js:698`). El dueño: "nunca hiciste la skill ni el agente ni la metiste en el workflow… mucho código viejo molestando".
- **Causa**: (a) prioricé features nuevas visibles sobre limpiar/cuarentenar lo viejo; (b) traté TODO-35 como "después" cuando ERA el gate que prevenía justo esto; (c) rompí caza-bugs: no recorrí el camino vivo con el MOTOR ACTUAL (Free Core), asumí el v2 futuro. Familia M-16 (doctrina sin gate = teatro).
- **Corrección**: (1) TODO-35 → 🔴 ACTIVO bloqueante, no "sesión fresca" indefinida. (2) El gate de dead/old-code se DISPARA en el workflow ANTES de cerrar cualquier feature (no opcional). (3) Todo cambio frontend que llega a vivo se prueba contra el motor ACTUAL, no el planeado. (4) Limpiar/cuarentenar lo viejo = parte del DoD, no apilar.

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · sin §NN de ADR: su cuerpo cita el §2 de la spec F-6, no un ADR · fechada 2026-06-25 · migrado 2026-09-01 lote 9

### M-20 · Un HIT de grep/search prueba que el patrón está PRESENTE, no QUÉ HACE el código — leer la semántica del match antes de construir encima ⟦OPUS-4.8⟧
- **Defecto (spec F-6 §2, 2026-06-25)**: una sesión previa grepeó "admin-pwa.js registra un SW" (match real) e INFIRIÓ que existía un SW dedicado del admin que des-registrar en el cutover. Al LEER el archivo (§3.3): `admin-pwa.js:106-122` solo re-registra el SW **PÚBLICO** (`/service-worker.js` scope `/`) — NO hay SW de admin separado. El "fix" planeado (script `getRegistrations()→unregister`) habría MATADO el SW público (roto el offline del sitio).
- **Causa**: confiar en la PRESENCIA del match como si fuera COMPRENSIÓN. Familia M-02/M-11 (verifica-no-asumas); refinamiento: el grep es índice, no entendimiento.
- **Corrección**: antes de basar una decisión (sobre todo cara/irreversible) en un grep-hit, ABRE el archivo y lee qué HACE el código matcheado. Un claim de arquitectura ("hay un SW del admin") exige leer el callsite, no solo que el término aparezca. [HONOR]

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §254→§256 (declaré «validado E2E» y el dueño cazó tres bugs en la frontera) · migrado 2026-09-01 lote 9

### M-21 · "Validado E2E" del HAPPY-PATH no es validado — un paso que se porta RARO en la validación es señal de bug (no nuisance); entidad con CICLO DE VIDA → frontera obligatoria = cerrar/finalizar/reabrir + REPETIR la acción + ambos lados ⟦OPUS-4.8⟧
- **Defecto (§254→§256, 2026-06-26)**: declaré "Hub validado LIVE E2E" tras solo escalar→tomar→responder→llega. El dueño USÓ el Hub y cazó 3 bugs en la frontera que NO recorrí: cliente-finaliza→Hub-no-cierra · cerrado-queda-en-Activos · mensaje-doble. Peor: TUVE el "Finalizar" en las manos en §254, se **CONGELÓ** (confirm nativo), lo anoté como "smell de rediseño" y seguí — el congelamiento ERA la punta del bug.
- **Causa**: caza-bugs aplicado a medias — recorrí el camino feliz y lo llamé "validado"; traté un paso que se portó raro como molestia (no señal); mandé 1 mensaje (no repetí → perdí el doble). La skill marca N→vacío como frontera pero no mapeé "finalizar chat"→esa frontera ni "repetir envío"→idempotencia.
- **Corrección**: (1) skill global `caza-bugs` endurecida — un paso que se porta raro = **STOP+investiga** (nunca "anotar y seguir"); entidad con ciclo de vida → frontera = crear→…→**CERRAR/finalizar→reabrir** + **repetir la acción** + recorrer **ambos lados**. (2) "validado E2E" exige el ciclo COMPLETO, no el happy-path. Familia M-09 (cobertura de reflejos) + `verification-before-completion`. [HONOR]

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §257 (auditoría de fiabilidad); los canarios que la destaparon son §204/§205 · migrado 2026-09-01 lote 9

### M-22 · El cerebro documenta ESTRUCTURA pero no verifica REALIDAD — "✅" conflaciona DISEÑADO/DECIDIDO/CONSTRUIDO/DESPLEGADO/VERIFICADO-LIVE (auditoría §257) ⟦OPUS-4.8⟧
- **Defecto (§257, dueño 2026-06-26)**: el dueño perdió confianza ("documentamos cosas que se nos perdieron"). Canary aliados: §204/§205 "✅" pero el flujo comercial nunca se ejecutó; automatización "portada ✅" pero el motor no corre (TODO-41). `brain-check` valida caps/refs/huérfanas, NO si el claim es CIERTO afuera (código/datos/deploy).
- **Causa**: "✅" sin estado ni fecha-de-verificación lee "decidido/UI-portada" como "ejecutado/corriendo". (Veredicto balanceado §257: la MAYORÍA de los "✅" SÍ son reales — el defecto es la minoría que conflacionó estado.)
- **Corrección/cura**: (1) **vocabulario de estados explícitos** — DISEÑADO ≠ DECIDIDO ≠ CONSTRUIDO ≠ DESPLEGADO ≠ VERIFICADO-LIVE; nunca "✅" a secas sobre realidad externa. (2) afirmación sobre realidad externa lleva **`verificado-vivo: <fecha>`** o se marca no-verificado (§3.3). (3) **check del linter que avisa stale** + reconciliación periódica = mecanización en `brain-check.mjs` (kernel ×3 → coordinado, **TODO-44**). Familia M-10/M-16 (la cura de una reincidencia es un GATE, no un reflejo). [HONOR hasta mecanizar en TODO-44]

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · sin §NN citado ni en su titular ni en su cuerpo · fechada 2026-06-27 (bot v2 F-1) · migrado 2026-09-01 lote 9

### M-23 · Mi validación verifica que FUNCIONE, no que se VEA BIEN — Chrome(DOM) + caza-bugs cazaron CERO defectos de diseño; el dueño los cazó TODOS a ojo ⟦OPUS-4.8⟧
- **Defecto (dueño 2026-06-27, bot v2 F-1)**: validé "en vivo" leyendo el DOM (texto/estado/validaciones) y declaré ✅; el dueño cazó de inmediato 4 bugs VISUALES que NINGUNA herramienta vio (avatar encajado en círculo, doble-ventana/doble-barra, conversación-vieja persistente al refrescar, robot en vez del PNG flotante). **Dos los CAUSÉ yo**: el doble-scroll = mi propio "fix" (`max-height+overflow`); el avatar = encajé un PNG transparente en un círculo sólido.
- **Causa**: leer el DOM verifica **COMPORTAMIENTO, no DISEÑO** (nunca revela boxed/aplastado/scroll-doble/glow-perdido/jerarquía). Incluso cuando empecé a capturar, fue **REACTIVO** (tras el regaño), no una auditoría de diseño PROACTIVA antes de declarar ✅. + parcheo reactivo: cada parche apurado trajo otro bug.
- **Corrección/cura**: para CUALQUIER trabajo de UI — (a) **auditoría de diseño adversarial con SCREENSHOT de CADA estado ANTES de "✅"** (cerrado/abierto/vacío/con-mensajes/cada rama), juzgada contra un bar de calidad o mockup — NO solo DOM; (b) la skill `validacion-live-chrome` necesita una **dimensión de diseño ENFORCED** (no opcional); (c) UI nueva = **flujo de diseño completo (mockup→review→build)**, no parches. Familia M-10 (cobertura fingida) + callejón (i). [HONOR — mejorar la skill]

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · sin §NN de ADR citado ni en su titular ni en su cuerpo (cita el IAP §3.4 del `CLAUDE.md`) · fechada 27/06 · migrado 2026-09-01 lote 9

### M-24 · Construí maquinaria NUEVA compleja cuando ya existía una solución simple A LA MANO — el dueño: "tienes las cosas visibles a la mano e hiciste algo mas complejo" ⟦OPUS-4.8⟧
- **Defecto (27/06, bot v2)**: el bug "Ver sedanes no filtra" → construí `busqueda?categoria=` de 2 lados (bot + `applyUrlFilters`) + reestructuré búsqueda a sidebar. PERO ya existían **páginas dedicadas** `vehiculos-{suv,sedan,pickup,hatchback}.html` con el layout correcto — el fix simple era apuntar el bot a ESAS. Las hallé solo al re-reportar el dueño.
- **Causa**: no inventarié lo que YA EXISTÍA antes de diseñar (W-11 cap.1 verifica el código TOCADO, no barre páginas/componentes hermanos que ya resuelven). Sesgo de constructor: "lo hago" vs "¿ya está hecho?".
- **Cura**: ante bug de navegación/feature, **primero `Glob`/`Grep` por lo existente** (¿página dedicada? ¿patrón hermano?) y reusar lo simple ANTES de construir. Suma al IAP §3.4: "¿qué ya existe a la mano?". Familia sobre-ingeniería. [HONOR]

---

> Origen: CARS `docs/32-LECCIONES-META.md` (titular en `docs/30-LECCIONES.md`) · sin §NN citado ni en su titular ni en su cuerpo · fechada 29/06 · migrado 2026-09-01 lote 9

### M-25 · El cerebro PIERDE MEMORIA cuando el MISMO hecho vive en registros que se CONTRADICEN ⟦OPUS-4.8⟧
- **Defecto (29/06)**: el dueño repitió 3× lo mismo (merge=mío; yo-decido-no-pregunto) y se preocupó: *"¿por qué se pierde memoria? Temo que se pierdan más cosas."*
- **Causa (NO es olvido, es CONTRADICCIÓN)**: cada hecho vive en varios nodos (CLAUDE.md + memorias + índice `MEMORY.md` + brief + 05). Cambio uno y no los demás → **dos verdades**; al arrancar leo el índice de memorias primero → sigo el viejo. `brain:check` valida estructura, NO barre memorias `.claude` ni detecta contradicciones semánticas.
- **Cura (SSoT real §G.3)**: al cambiar un hecho always-on, actualizar **TODOS** sus registros en el mismo acto (o marcar el viejo `⛔SUPERSEDED`). Si repito una instrucción del dueño → la causa por defecto es un registro stale, no mi olvido → cazarlo y alinear. TODO-29: que `brain:check` barre `memory/*.md`. [HONOR]

---

> Origen: CARS `docs/33-LECCIONES-FRONTEND.md` (titular en `docs/30-LECCIONES.md`) · pagada en CARS §175 (el único §NN de ADR que cita su cuerpo; el §3.2 del titular es doctrina del `CLAUDE.md`) · migrado 2026-09-01 lote 9

### L-37 · Un rediseño que ELIMINA/renombra clases rompe los callsites JS que las buscan (catch real de §3.2)
- **Síntoma**: form de contacto en vivo: el write a `solicitudes` OK pero spinner "Enviando..." ETERNO + `_inFlight` atascado (el visitante no puede reenviar) — y CERO errores en consola (§175).
- **Causa**: el rediseño cinematic de `contacto.html` reemplazó `.form-card` por `.soft-*`; `contact.js` hacía `closest('.form-card')` para pintar el éxito → `null` → `_renderContactSuccess(null)` retorna sin pintar y NADIE restaura el botón. Fallo 100% silencioso: el `.catch` no dispara porque la promesa SÍ resolvió.
- **Receta**: (1) al rediseñar una página, `grep -r "<clase>" js/` ANTES de eliminar/renombrar clases del markup. (2) Selectores de contenedor en JS con fallback (`closest('.x') || form`). (3) En success-paths, el happy path debe PINTAR algo o restaurar estado — un `return` silencioso en éxito es peor que un throw.
- **Familia**: L-11 (class fidelity JS↔CSS) — esta es la variante JS↔HTML (comportamiento, no estilo).
