# 🧪 30 — MEMORIA PROCEDIMENTAL (Lecciones · Anti-patterns · Recetas)

> **Nodo neuronal: la EXPERIENCIA del cerebro.** Aquí vive lo que un humano
> experto "ya sabe por haberse quemado": gotchas, trampas, recetas que funcionan.
> Es lo que evita el **reproceso** y la **regresión** — el corazón del
> auto-aprendizaje.
>
> **Cuándo leerlo (Trigger de Experiencia, `CLAUDE.md §G.2`)**: ANTES de una
> operación riesgosa o repetitiva (mover archivos, merges, tocar el cron, cache),
> y SIEMPRE que un síntoma "me suena". No se auto-carga.
>
> **Cómo crece (Reflejo de Captura, `CLAUDE.md §G.4`)**: cada vez que algo falla,
> sorprende o se resuelve de forma no-obvia, el constructor (Claude) APENDE aquí
> una lección — formato: **Síntoma/Contexto → Causa → Receta → Cómo evitarlo** —
> ANTES de cerrar la tarea. Bajo su juicio: solo lo reutilizable, no ruido.

---

## 🔧 Operaciones de Git / refactor

### L-01 · `sed -i '*.html'` corrompe el fin de línea (CRLF→LF)
- **Síntoma**: tras un `sed` masivo aparecen 15+ archivos "modificados" que NO tocaste; GitHub Desktop muestra muchos más archivos de los esperados.
- **Causa**: `sed -i` reescribe TODOS los archivos que recibe; en Windows convierte CRLF→LF aunque no haya match → git (con `core.autocrlf=true`) los marca como cambiados (ruido).
- **Receta**: pasar a `sed` SOLO los archivos que contienen el patrón → `sed -i 's|viejo|nuevo|g' $(grep -rl "patrón" archivos)`. O usar la herramienta **Edit con replace_all** (no toca line-endings).
- **Limpiar el ruido**: restaurar los archivos que están en `git status` pero NO en `git diff --name-only` → `git checkout -- <esos archivos>`.
- *Descubierto en §119 Fase 2.2b-ii (comparador).*

### L-02 · Conflicto recurrente cron ↔ cache al fusionar a `main`
- **Síntoma**: el PR de la rama marca conflicto en `js/core/cache-manager.js` (o `service-worker.js`).
- **Causa**: el cron de `main` (`Auto-generate vehicle pages + bump cache version`) bumpea `APP_VERSION`/`CACHE_VERSION` mientras la rama tiene esos archivos movidos/modificados → modify-en-main vs move/modify-nuestro.
- **Receta**: en la rama → `git merge origin/main --no-edit`. La estrategia **`ort` detecta el rename y aplica el bump del cron al archivo movido AUTOMÁTICAMENTE** (cero conflicto manual). Verificar después: `node -c`, 0 refs viejas.
- **Cómo evitarlo**: NO fusionar cada micro-paso a `main` (ver L-03). Sincronizar `main`→rama tras cada merge si se insiste en fusionar por paso.
- *Doctrina relacionada: `CLAUDE.md §4` (cache bump). Vivido en §119.*

### L-03 · No fusionar cada micro-paso a `main` durante un refactor largo
- **Síntoma**: conflictos en bucle, un PR tras otro.
- **Causa**: el cron mueve `main` entre fusiones (pintar la pared mientras la ensucian).
- **Receta**: hacer todo el trabajo en la rama (`commit + push` solo guarda en GitHub), **UNA sola fusión final** tras terminar y probar. Un conflicto (o ninguno) en vez de uno por paso.

### L-04 · Receta canónica para mover un archivo JS sin romper nada
1. **Mapear refs**: `grep -rl "js/X.js"` en `*.html vehiculos/*.html marcas/*.html` + ¿dinámico en `js/core/components.js` (`.src=`)? + ¿ancla hardcodeada en `scripts/generate-vehicles.mjs`?
2. `git mv js/X.js js/<carpeta>/X.js`.
3. Refs estáticas (`"js/X.js"`) → `sed` solo en archivos con match. Refs dinámicas/ancla → **Edit**.
4. **Verificar**: `grep` ruta-vieja = 0 en todo el repo · `node -c` · sin doble `carpeta/carpeta`.
5. Probar en localhost · `commit`.

---

## 🌐 Frontend / runtime

### L-05 · `<base href="/">` hace que TODA ruta sea raíz-relativa idéntica
- Las páginas en subcarpetas (`vehiculos/`, `marcas/`) usan `src="js/..."` SIN `../` porque tienen `<base href="/">`. → toda ref a un asset es el MISMO string en todo el repo → el reemplazo de rutas es **determinista y global** (no hay que calcular rutas relativas por carpeta).

### L-06 · `js/core/components.js` es un CARGADOR DINÁMICO (refs ocultas)
- Inyecta ~25 scripts por ruta hardcodeada (`script.src = 'js/...'`): `auth`, `solicitudes-watcher`, `comm-schema`, todo `js/ai/*`, `concierge`, `cookies`, `contact-forms`, `admin-calendar-config`. **Al mover cualquiera de esos, hay que actualizar components.js además del HTML.** No son `<script src>` visibles → fáciles de olvidar.

### L-10 · `components.js` también carga CSS dinámicamente (no solo JS)
- **Síntoma**: un CSS con 0 `<link>` estáticos pero que SÍ se usa (ej. estilos del bot/auth).
- **Causa**: `js/core/components.js` inyecta 4 CSS por `.href=`: **`auth.css` (L274), `concierge.css` (L311), `cookies.css` (L445), `contact-forms.css` (L830)**. (cookies/contact-forms tienen ADEMÁS `<link>` estático.)
- **Receta**: al mover esos CSS a una subcarpeta, actualizar components.js además del HTML.
- **Meta-lección**: un `grep` de "CSS dinámico" puede dar **falso negativo** por comillas mal escapadas. **SIEMPRE verificar archivo-por-archivo los de 0 refs** antes de asumir "es estático" o "está muerto". (Confirmado §119 Fase 3 — casi asumo mal.)

### L-07 · El generador es TEMPLATE-DRIVEN (cron cada 4h)
- `scripts/generate-vehicles.mjs` lee `detalle-vehiculo.html` (→ `vehiculos/*`) y `marca.html` (→ `marcas/*`) y **copia sus tags tal cual**. Actualizar esas 2 plantillas = las 45 páginas generadas quedan bien en la próxima corrida. Única ruta hardcodeada propia: `js/core/historial-visitas.js` (ancla de inyección del prerendered tag, ~L303). **PELIGRO**: si muevo algo y no actualizo la plantilla, el cron regenera con rutas viejas → producción rota en silencio.

### L-11 · PORTs JSX→vanilla — class-name fidelity (JS-emit ≡ CSS-define)
- **Síntoma**: una sección visualmente "rota" tras un port (sin transición, sin layout, sin seam-flow) aunque CSS y markup parecen estar.
- **Causa**: el CSS copiado 1:1 puede traer reglas con clases que el JSX RENOMBRÓ pero el CSS no acompañó. SP-1 ejemplo: `cinematic.css` seam-flow `.cin-progs` (líneas 1166, 1182) vs `className="promo-section"` en `Home.jsx:715` — el archivo CSS estaba desincronizado con el componente desde el rediseño original. Heredamos el bug al copiar.
- **Receta**: por cada sección portada, **grep en el CSS** las clases que el JS añade dinámicamente. (a) Clase JS-emit ∉ CSS = render unstyled / clase huérfana → añadir regla mínima o quitar el className si es redundante. (b) Clase CSS-rule ∉ markup ∉ JS = dead-class del rediseño → renombrarla a la clase real del componente (no inventar markup nuevo). Confirmado SP-1 review (ADR §122).

### L-12 · Re-render por `onChange` acumula listeners en el padre — teardown explícito siempre
- **Síntoma**: tras editar datos en admin (banners/vehículos) varias veces, la página cliente se vuelve más lenta o dispara handlers múltiples por evento.
- **Causa**: cuando un módulo se re-renderiza via `vehicleDB.onChange(...)`, `track.innerHTML=''` limpia los hijos pero NO los listeners que el módulo registró en el padre o en `document`. El peor: `document.addEventListener('visibilitychange', ...)` acumula globalmente y no se limpia con un wipe del innerHTML. Descubierto en SP-1 T5 review del promo carousel (§122).
- **Receta**: handlers NOMBRADOS (no anónimos inline) + factor `_teardown` que llama `removeEventListener` por cada par, ejecutado ANTES de cada rebuild. Para elementos no-track que se reconstruyen (ej. `.promo-progress`), `oldEl.remove()` antes del nuevo append. Mirror pattern en cualquier módulo con `onChange` o cualquier rebuild-pattern.

### L-13 · Módulos lazy-loaded — guards `typeof` en click-time + event delegation
- **Síntoma**: cards/UI renderizadas antes de que un módulo lazy-loaded (ej. `comparador.js` se idle-loadea ~3s post-page) capturarían una API undefined. Si el binding es per-card en render-time, los clicks no responderían hasta reload.
- **Receta**: (a) bind UNA vez en el track/container vía event delegation; (b) en el click handler, `typeof window.vehicleComparator === 'object' && vehicleComparator.toggle(id)` — guard en CLICK-time, no en render-time; (c) para badges/UI que muestran estado, fallback a la misma fuente cruda (localStorage `altorra_comparador`) hasta que la API exista. Aplica a cualquier módulo cargado por `requestIdleCallback`, defer-post-load o demand. Confirmado SP-1 T5/T6 (§122).

### L-14 · SW stale-while-revalidate puede servir JS viejo en critical-path post-deploy
- **Síntoma**: deployaste un fix a un `.js` con cache bump. El index carga la versión nueva (visible en consola `[SW] Service Worker loaded - Version: vXXXX`). PERO al navegar a otra página del mismo origin, el código JS sigue siendo VIEJO aunque el deploy esté hecho. El fix no parece llegar.
- **Causa**: `service-worker.js` con strategy `stale-while-revalidate` (default para CSS/JS estable) sirve la versión cacheada INMEDIATAMENTE y solo actualiza en background. La versión nueva llega en la SIGUIENTE request — no en la inmediata. Un Ctrl+Shift+R en el index NO invalida el cache del SW para futuras navegaciones — solo bypasa el SW para esa page específica.
- **Receta**: para JS critical-path (tracking, auth, payments, cualquier cosa donde una versión vieja causa bugs persistentes), usar `networkFirst` en lugar de `stale-while-revalidate`. Ej. `service-worker.js` SP-5.0.f STRATEGY 3.5: networkFirst para `/js/core/*` + `/js/public/home/*`. Tradeoff: marginalmente más lento, pero fresh garantizado. Confirmado §124.

### L-15 · Self-contained read patterns eliminan races de estado en memoria
- **Síntoma**: un módulo con múltiples mutadores (write local sync + write async network + class state) muestra UI inconsistente. El render lee un snapshot stale del estado en memoria aunque la fuente de verdad (localStorage / Firestore) tenga la data correcta.
- **Causa**: cuando un módulo class-based tiene varios paths que mutan `this._state` (ej. `vehicleHistory._history` mutado por `addToHistory`, `_mergeHistory`, `clearHistory`, `_loadFromFirestore`), los lectores que confían en ese estado en memoria pueden capturar momentos intermedios de un round-trip async.
- **Receta**: para lectores CRÍTICOS (renders que el usuario ve), leer DIRECTAMENTE de la fuente de verdad (localStorage / IndexedDB / server) en cada uso. No confiar en el estado en memoria del módulo cuando hay múltiples mutadores. Ej. SP-5.0.f `initTrail` lee `localStorage.altorra_vehicle_history` con JSON.parse directo en cada `renderTrailNow()`, en lugar de `vehicleHistory.getHistory()`. Tradeoff: parsing JSON por render (~µs), pero ZERO race conditions. Confirmado §124.

---

## 🔥 Firebase / entorno

### L-08 · Los errores `403` de Firebase en `localhost` son NORMALES
- **Síntoma**: en `localhost:3000`, consola llena de `403 (Forbidden)` / `requests-from-referer-http://localhost:3000-are-blocked` (Auth, Installations, Analytics) + login admin falla.
- **Causa**: la API key tiene restricción de HTTP referrer (solo `altorracars.github.io` + dominios Firebase), no `localhost`. Es seguridad funcionando bien.
- **Implicación de prueba**: en localhost NO se prueba login/Auth. Lo que SÍ se prueba: que carguen los archivos (0 `404`), Firestore público (`[DB] Firestore loaded: 27 vehicles`), render, snippets. La prueba real de Auth es en el dominio en vivo.

---

## 🗂️ Validación de código muerto

### L-09 · Cómo confirmar que un archivo es código muerto (antes de cuarentenar)
- Cero refs internas (`grep` en HTML/JS/MJS) + no en `sitemap.xml` + (para herramientas) **sin autenticación** cuando las `firestore.rules` actuales la exigen → no podría funcionar aunque se abriera.
- Casos validados §119: `admin-upload.html` (sin auth → rules §68 rechazan escrituras), `theme-switcher.js` (comentario "eliminado — tema dark permanente", 0 cargas).
- **Acción**: cuarentenar a `_legacy/` (reversible) + documentar en `_legacy/README.md`, NO borrar de una.

### L-16 · Inyectar chrome/CSS nuevo en páginas que cargan el tema viejo → conflicto de especificidad + scope de tokens
- **Síntoma**: inyectas un componente/chrome nuevo (markup + CSS) en páginas que YA cargan un CSS legacy. El componente "no se ve" o se ve roto (posición/fondo/colores del tema viejo), aunque el CSS nuevo cargue.
- **Causa DOBLE** (SP-5.1.b §127, verificado leyendo CSS):
  1. **Especificidad**: el tema viejo estiliza por ID (`#header` 1-0-0, `body #header` 1-0-1) o con `!important` (performance-fixes), venciendo al CSS nuevo basado en clases (`.alt-nav` 0-1-0) — sin importar el orden de carga. El nuevo reusa `id="header"` (contrato) → el ID viejo lo pisa.
  2. **Scope de tokens / data-theme**: el CSS nuevo depende de tokens condicionados (`:root[data-theme="dark"]`). Si la página nueva NO tiene el `data-theme` que el componente espera, los tokens resuelven al valor equivocado (ej. texto oscuro sobre fondo oscuro → ilegible). El index sí tenía `<html data-theme="dark">`; las legacy no.
- **Receta**:
  1. **Verificar el contexto de tokens primero**: ¿el componente nuevo depende de `[data-theme]` u otro atributo de scope? Si la página destino no lo tiene, setearlo por JS al inyectar — PERO antes verificar (`grep data-theme` en los CSS viejos) que NO rompa el tema viejo. Si los CSS viejos no reaccionan al atributo, es seguro.
  2. **Bridge de especificidad**: crear un CSS override cargado ÚLTIMO que gane al tema viejo con especificidad ≥ (combinar ID+clase: `#header.alt-nav` 1-1-0 > `body #header` 1-0-1) + `!important` SOLO donde el viejo use `!important`. No editar el tema viejo (reversibilidad).
  3. **Layout model**: si el viejo usaba `position: fixed` (placeholder reserva espacio) y el nuevo `sticky`, y el nuevo se inyecta dentro de un contenedor pequeño → sticky no "pega". Usar fixed en el bridge para encajar con el placeholder.
- **Meta-lección**: inyectar UI nueva donde convive CSS viejo NO es solo "cargar el CSS nuevo" — es ganar la guerra de especificidad + asegurar el scope de tokens. Presupuestar un "bridge" desde el diseño cuando hay coexistencia de temas.

### L-17 · Vestir un módulo legacy con un tema nuevo: remapear sus tokens `:root` (si los tiene), no reescribir markup
- **Síntoma/decisión**: te piden migrar un módulo grande (dashboard, panel) a un tema visual nuevo, pero su contenido lo genera JS (cientos/miles de líneas) y reescribir ese render arriesga regresiones funcionales graves.
- **Insight (SP-5.2.c.2 §131, verificado)**: si el CSS del módulo centraliza sus colores en variables `:root` (ej. `--pf-*`), **remapear esas variables** a la paleta nueva viste TODO el módulo sin tocar una sola regla estructural ni el JS. Palanca de máximo impacto / mínimo riesgo.
- **Receta**:
  1. `grep` las definiciones de tokens (`--prefijo-...\s*:`) en el CSS. Si están centralizadas en `:root`, ganaste.
  2. Capa de override **scoped a un atributo** (`body[data-cin="on"] { --pf-*: ... }`) al final del CSS → reversible (quitar el atributo revierte) y no pisa el `:root` original.
  3. **Cazar los hardcodeados**: `grep` hex/rgba en reglas (fuera de `:root`) — el remapeo NO los alcanza. Sobrescribir los visibles (texto sobre acento, fondos de inputs/tiles) en la misma capa scoped.
  4. Mantener SÓLIDOS los tokens que alimentan modales/overlays (no volverlos translúcidos) o se rompe el apilado.
  5. CERO cambios en el JS → IDs/clases intactos → cero regresión funcional.
- **Cuándo NO aplica**: si el diseño objetivo exige estructura DISTINTA (no solo recolorear), o si el CSS hardcodea todo sin tokens (ahí toca la guerra de L-16). Distinguir "recolorear" (esta lección) de "rediseñar" (otro esfuerzo).
- **Meta-lección**: cuando el redesign de referencia es un MOCK más pobre que el módulo real, "réplica exacta" se vuelve destructivo. Vestir > reescribir. Confirmar el alcance con el cliente cuando fidelidad y cero-regresión chocan.

### L-18 · El chrome compartido (header/footer) puede depender de clases de un CSS que NO se inyecta en legacy
- **Síntoma**: el header/footer se ve distinto entre el index (chrome inline) y las páginas legacy (chrome inyectado por components.js), aunque el MARKUP sea idéntico (snippet 1:1). Ej §133: el badge `.nav-pip` de favoritos tapaba el corazón SOLO en legacy.
- **Causa (§133, verificado)**: el chrome usa clases (`.btn/.btn-icon/…`) definidas en un CSS que el index carga (`base-redesign.css`) pero que `components.js` NO inyecta en legacy (porque ese CSS tiene un reset global `*{}` + `body{}` que rompería el contenido legacy). Sin esas clases, los botones del chrome colapsan en legacy.
- **Receta**: (1) si el markup es snippet 1:1, NO es problema de HTML → es CSS. (2) lista las clases que usa el chrome y `grep`-éalas en `css/` para ver en qué archivo viven. (3) las que estén SOLO en un CSS no-inyectado → pórtalas al CSS que SÍ se inyecta (`chrome-redesign.css`), **scoped al contenedor del chrome** (`.alt-nav`/`.alt-footer`) para no chocar con el body legacy. NUNCA inyectes el CSS base entero si tiene resets globales.
- **Meta-lección**: "extraer el chrome a un snippet" no basta — hay que garantizar que TODO el CSS del que depende viaje con él a las páginas que lo inyectan. Un componente compartido es tan portable como su CSS. (Relacionada: L-16 coexistencia legacy↔cinematic.)

### L-19 · Recomendación por similitud SIN backend — content-based con el rastro local
- **Patrón (§138)**: para "autos semejantes a los vistos" NO hace falta GA API ni ML. Basta: (1) perfil agregado del rastro local (categorías/precio/marca/features ponderados por recencia), (2) score de similitud multi-dimensional ponderado por candidato, (3) fallback a destacados+nuevos (nunca vacío). Todo client-side con `vehicleHistory` + `vehicleDB`.
- **Claves**: el cliente pidió "un todo" (no solo precio/marca) → pesos por dimensión (objeto `W` ajustable). Excluir lo ya visto. Guard `typeof` + fallback al comportamiento previo (L-13) para no romper si el módulo no carga.
- **Disparador**: ante "recomendaciones / relacionados / similares", evaluar content-based local ANTES de meter analytics/backend (menos acoplamiento, sin reglas Firestore).

---

## 🪞 Meta: fallos del propio cerebro (Reflejo de Autocrítica `CLAUDE.md §G.4`)

> El cerebro se critica a SÍ MISMO: dónde una neurona/regla **causó un error o me
> engañó**, y qué se corrigió. Cierra el bucle: usar → criticar → corregir = madurez.
> Formato: **Defecto del cerebro → Causa → Corrección**.

### M-01 · Una neurona stale me habría engañado (Memoria Espacial)
- **Defecto**: tras reorganizar `js/` (§119), `20-ESPACIAL` siguió describiendo el `js/` plano viejo → una sesión futura habría leído rutas inexistentes y errado.
- **Causa**: no había regla que obligara a refrescar la memoria espacial al cambiar la estructura.
- **Corrección**: actualicé `20-ESPACIAL` + nació el **Reflejo de Frescura (§G.4)**. Principio: una neurona vieja es peor que ninguna.

### M-02 · Un chequeo del cerebro dio falso negativo (casi asumo mal)
- **Defecto**: mi `grep` de "CSS dinámico" devolvió 0 por comillas mal escapadas → casi concluyo que todo el CSS era estático (falso: `components.js` carga 4 CSS).
- **Causa**: confié en un resultado de `0` sin verificar archivo-por-archivo.
- **Corrección**: regla en L-10 — **un chequeo que devuelve 0 puede ser falso negativo; verificar los 0-ref uno por uno** antes de asumir. Refuerza RCA §19.

### M-03 · El cerebro no se auto-alimentaba sin recordatorio explícito
- **Defecto**: reportado por el cliente — "el cerebro no se está alimentando, no funciona como debería sin que yo tenga que estar recordándolo". Los Reflejos §G.4 (Captura/Frescura/Higiene) describen QUÉ alimentar y CUÁNDO (al cerrar tarea), pero como **principios descriptivos**, no como **checklist accionable**. Sesiones nuevas los leen y aceptan teóricamente, pero al cerrar tareas concretas omiten la consolidación (especialmente bajo presión de "ya casi termino, lo documento después" → nunca se documenta).
- **Causa**: faltaba un Reflejo con disparador EXPLÍCITO y verificable al cierre — no solo principios al arranque.
- **Corrección**: nuevo **Reflejo de Cierre (§G.4)** — checklist enforzable que debe pasarse ANTES de declarar una tarea lista: 10/05/99/00/30/cache §4/brain:check. Si falta cualquiera, la tarea NO está cerrada. Anti-patrón "lo documento después" nombrado y bloqueado. ADR §123.
- **Principio**: los principios descriptivos no bastan para acciones críticas — hace falta convertirlos en checklist accionables en el momento exacto donde fallan.

### M-04 · Iterar fixes sin verificar la fuente de verdad real (no solo el código de aplicación)
- **Defecto**: durante SP-5.0 rastro saga, las primeras 3 rondas (c, d, e) iteraron sobre el código de aplicación (`historial-visitas.js`, `home-carousels.js`) asumiendo que el bug era ahí. Cada round failed porque la causa raíz real estaba en **el service worker** (stale-while-revalidate servía código viejo en páginas de detalle). Ronda 4 (SP-5.0.f) cazó el bug solo cuando LEÍ el SW.
- **Causa**: §19 RCA dice "verificar leyendo el código antes de tocar". Pero "código" lo interpreté como "código de aplicación" — olvidé que el SW, la cache strategy, la configuración del hosting, son TAMBIÉN parte del sistema donde puede esconderse la causa raíz.
- **Corrección**: §19 RCA se debe leer "la fuente de verdad real" — no solo el código que parece relevante. Antes de iterar fixes en un módulo, verifica también: SW strategy, cache headers, CDN config, build pipeline. Si el bug persiste tras 2 hipótesis fallidas en un módulo, mira FUERA del módulo (infraestructura). Cierra el bucle: §G.2 Trigger de Error (si fallas 2× el mismo bug) ahora debe incluir "verificar infraestructura/cache/SW", no solo "leer §NN en el historial".
- **Principio**: cuando iteras un fix y el bug persiste, el bug probablemente NO está donde estás mirando. Cambia el lente, no la profundidad. ADR §124.

### M-05 · El cerebro debe crecer en dominios ESTRATÉGICOS, no solo operacionales
- **Defecto**: pre-Omni, el cerebro acumulaba memoria operacional (estado/decisiones/gotchas/lecciones de proceso) pero NO acumulaba análisis estratégico especializado (seguridad/legal/UX/SEO/performance/escalabilidad/copy/a11y). Cada sesión nueva re-investigaba estos dominios desde mi contexto pre-entrenado, perdiendo el aprendizaje específico del proyecto Altorra. La carpeta `skills/` existía como knowledge bank externo pero sin protocolo de uso.
- **Causa**: el sistema de neuronas estaba diseñado para CÓDIGO + PROCESO, no para AUDITORÍAS especializadas. Faltaba un mecanismo para acumular hallazgos de dominio + workflow para combinar framework externo (skills) con findings proyecto-específicos.
- **Corrección**: **ADR §125** — agregado Trigger 🔵 de Auditoría + registry de Lóbulos de Dominio (`40-LOBULOS-DOMINIO`) + integración con `skills/` externa. Los hallazgos específicos del proyecto se acumulan en lóbulos hijos (`41-SEGURIDAD`, `42-LEGAL`, etc.) que nacen on-demand con contenido real. `skills/` provee el framework general; los lóbulos lo aterrizan al proyecto + capturan las excepciones específicas.
- **Principio**: el cerebro debe poder crecer en cualquier dirección estratégica relevante al proyecto, no solo capturar bugs históricos. Skills externos (framework genérico) + lóbulos internos (findings proyecto-específicos) = sinergia incremental. Sin esto, el conocimiento estratégico se pierde entre sesiones; con esto, se acumula y profundiza.
- **Anti-patrón explícitamente rechazado**: crear neuronas vacías por anticipado para "preparar el terreno" — viola §G.4 anti-fragmentación. Las neuronas nacen cuando hay contenido REAL, no como placeholders. El registry (`40-LOBULOS-DOMINIO`) lista las CATEGORÍAS esperadas como mapa, no como contenido prematuro.

### M-06 · Afirmé "sin desplegar" con `git rev-list origin/main..HEAD` SIN `git fetch` → `origin/main` local stale
- **Defecto**: le dije al cliente que su trabajo (simulador) NO estaba desplegado, basándome en `git rev-list origin/main..HEAD = 1`. Pero el `origin/main` LOCAL estaba desactualizado (no hice `git fetch`); el cliente YA había pusheado. Afirmé un estado de despliegue FALSO; el cliente me corrigió ("esto es falso ya hice todos los commit y git push").
- **Causa**: asumí que `origin/main` local reflejaba el remoto. Las refs `origin/*` locales solo se actualizan con `fetch`/`pull`; un `git push` del cliente NO actualiza mi copia local.
- **Corrección**: NUNCA afirmar estado de despliegue/remoto desde refs `origin/*` locales sin `git fetch` primero (o sin que el cliente confirme). Working tree limpio + commits locales NO dicen nada del remoto. Ante "¿está desplegado?": fetch o preguntar.
- **Principio**: RCA §19 ("verificar, no asumir") aplica también a GIT — las refs remotas cacheadas son fuente de verdad STALE. No es código, pero es igual de traicionero.

### M-07 · No avisé que el contexto se saturaba — el cliente tuvo que pedirlo al 92%
- **Defecto**: la sesión creció enorme (§131→§138, varios sprints encadenados + decenas de lecturas/edits grandes) hasta 92% de la ventana de contexto. El cliente me avisó él ("el contexto está saturado y nunca me notificaste"). No monitoreé ni propuse cortar.
- **Causa**: no hay señal directa del % de contexto, pero la INDIRECTA (sesión larguísima, muchos sprints seguidos, archivos de miles de líneas) era evidente. Debí sugerir vaciar tras 2-3 sprints grandes.
- **Corrección**: en sesiones largas (varios ADRs/sprints encadenados), proponer proactivamente un punto de corte: "llevamos N sprints; conviene vaciar el chat y seguir en ventana nueva — el cerebro preserva el contexto". Mantener `05`/`10` al día en cada cierre para que vaciar sea barato.
- **Principio**: la continuidad vive en el cerebro, NO en la ventana de chat. Proponer el corte ANTES de saturar, no esperar al 92%.

### L-20 · Preview local del sitio estático: `http-server` con RUTA ABSOLUTA + valida colores con estilos computados (no screenshots)
- **Disparador**: querer ver/validar una página en vivo sin desplegar a producción (mejora, pulido visual, QA de CSS).
- **Receta**: `.claude/launch.json` con `npx -y http-server <RUTA-ABSOLUTA-del-repo> -p 8080 -c-1 --silent`. ⚠️ **La ruta DEBE ser absoluta** — con `.` el server sirvió desde un cwd equivocado y devolvía **404 a todo** (con `/` dando un directory-listing engañoso de 200). Verificar con `curl -o NUL -w "%{http_code}"` ANTES de abrir.
- **L-08 sigue vigente AQUÍ**: en localhost Firebase Auth/Analytics dan `403 referer blocked` — es ESPERADO y NO rompe el render público (Firestore SÍ carga los 27 autos vía API key pública). No confundir esos 403 con un bug.
- **Colores/estilos**: `preview_screenshot` puede hacer **timeout** (overlay de transición/GIS). Para validar color/contraste NO dependas de screenshots — usa `preview_eval` con `getComputedStyle()` y clasifica por canal RGB (chroma = max-min). Así detecté que los "grises del simulador" en realidad eran del **footer global** `128,128,128`, no del 2º bloque.
- **DOM volátil**: el simulador re-renderiza tras `setTimeout`/cálculo → un `querySelector` cacheado en un eval previo da `null`. Haz navegar+esperar+medir en UN SOLO `preview_eval` (IIFE async), no encadenes evals que asumen el DOM anterior.
- **Principio**: ver con mis ojos (estilos reales) > adivinar (RCA §19). Un pendiente puede estar MAL descrito ("grises del 2º bloque") — verifica antes de "arreglar" algo que no existe.

---

> Esta neurona crece sola (bajo guía del constructor). Si una lección se vuelve
> doctrina permanente, promoverla a `CLAUDE.md §3`. Si encaja en un § histórico,
> enlazarla. Mantenerla accionable: síntoma → causa → receta.
>
> **📏 Capacidad (CLAUDE.md §G.5): ~350 líneas.** Al acercarse, SHARD por categoría
> → ej. extraer la sección "Git / refactor" a `docs/31-LECCIONES-GIT.md`, registrarla
> en la tabla §0 + `00-INDICE`, y dejar aquí un puntero a la hija. Nada huérfano.
