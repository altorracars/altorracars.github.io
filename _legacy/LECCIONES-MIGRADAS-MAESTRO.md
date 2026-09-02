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
