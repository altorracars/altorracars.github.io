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

---

> Esta neurona crece sola (bajo guía del constructor). Si una lección se vuelve
> doctrina permanente, promoverla a `CLAUDE.md §3`. Si encaja en un § histórico,
> enlazarla. Mantenerla accionable: síntoma → causa → receta.
>
> **📏 Capacidad (CLAUDE.md §G.5): ~350 líneas.** Al acercarse, SHARD por categoría
> → ej. extraer la sección "Git / refactor" a `docs/31-LECCIONES-GIT.md`, registrarla
> en la tabla §0 + `00-INDICE`, y dejar aquí un puntero a la hija. Nada huérfano.
