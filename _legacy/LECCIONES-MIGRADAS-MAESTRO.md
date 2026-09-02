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
