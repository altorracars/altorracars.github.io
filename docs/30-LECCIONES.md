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

## 🔧 Operaciones de Git / refactor → **`31-LECCIONES-GIT.md`** (neurona hija, shard §G.5 2026-06-09)

### L-01 · `sed -i` corrompe CRLF→LF → detalle en `31-LECCIONES-GIT.md`
### L-02 · Conflicto cron↔cache al fusionar → detalle en `31-LECCIONES-GIT.md`
### L-03 · No fusionar micro-pasos a `main` → detalle en `31-LECCIONES-GIT.md`
### L-04 · Receta para mover un JS sin romper → detalle en `31-LECCIONES-GIT.md`

---

## 🌐 Frontend / runtime / CSS → `33-LECCIONES-FRONTEND.md` (neurona hija · shard A5 §206 — aquí quedan stubs `### L-NN`; algunos dispersos abajo)

### L-05 · `<base href="/">` hace que TODA ruta sea raíz-relativa idéntica → detalle en `33-LECCIONES-FRONTEND.md`

### L-06 · `js/core/components.js` es un CARGADOR DINÁMICO (refs ocultas) → detalle en `33-LECCIONES-FRONTEND.md`

### L-10 · `components.js` también carga CSS dinámicamente (no solo JS) → detalle en `33-LECCIONES-FRONTEND.md`

### L-07 · El generador es TEMPLATE-DRIVEN (cron cada 4h) → detalle en `33-LECCIONES-FRONTEND.md`

### L-11 · PORTs JSX→vanilla — class-name fidelity (JS-emit ≡ CSS-define) → detalle en `33-LECCIONES-FRONTEND.md`

### L-12 · Re-render por `onChange` acumula listeners en el padre — teardown explícito siempre → detalle en `33-LECCIONES-FRONTEND.md`

### L-13 · Módulos lazy-loaded — guards `typeof` en click-time + event delegation → detalle en `33-LECCIONES-FRONTEND.md`

### L-14 · SW stale-while-revalidate puede servir JS viejo en critical-path post-deploy → detalle en `33-LECCIONES-FRONTEND.md`

### L-15 · Self-contained read patterns eliminan races de estado en memoria → detalle en `33-LECCIONES-FRONTEND.md`

---

## 🔥 Firebase / entorno

### L-08 · Los errores `403` de Firebase en `localhost` son NORMALES — y el bloqueo es MÁS amplio que Auth
- **Causa**: la API key restringe HTTP referrer (solo `altorracars.github.io` + dominios Firebase), no `localhost` → 403 en Auth/Installations/Analytics + tumba **App Check** (`appCheck/throttled`, backoff 1 DÍA). Es seguridad funcionando bien.
- **Receta (E2E §175)**: E2E de captura/forms = SOLO contra el dominio live (`main`); para lógica de UI sin red, **stubear `window.db`** en el preview (stub de `.add()` resuelto ejercita el handler real). En localhost NO se prueba login/Auth ni writes; SÍ: archivos (0 `404`), Firestore público de LECTURA, render.

### L-43 · La ADC de esta máquina está ligada a `bersaglio-jewelry` → scripts Admin SDK contra `altorra-cars` dan `PERMISSION_DENIED` (IAM, NO rules) ⟦OPUS-4.8 · rev-Fable⟧
- **Síntoma**: `node functions/<script>.mjs` (Admin SDK + ADC) contra altorra-cars aborta con `7 PERMISSION_DENIED: Missing or insufficient permissions`, aunque el MISMO patrón corre bien en bersaglio (`backfill-claims.mjs`).
- **Causa (verificada §215)**: `~/AppData/Roaming/gcloud/application_default_credentials.json` trae `quota_project_id: bersaglio-jewelry` y `gcloud auth list` = sin cuentas → la ADC se montó SOLO para bersaglio; ese principal no es IAM-member con acceso Firestore en altorra-cars. El Admin SDK **BYPASSA las security rules** → un `PERMISSION_DENIED` del Admin SDK es SIEMPRE IAM del principal, jamás reglas.
- **3 planos de auth (no confundir, L-23)**: (1) `firebase login` (CLI deploys, `altorracarssale@`) ≠ (2) **ADC** (lo que usa el Admin SDK en scripts `node`) ≠ (3) security rules (irrelevante para Admin SDK). Un script `node` standalone usa (2), no (1).
- **Receta**: para correr un script admin contra altorra-cars desde esta máquina, el dueño re-autentica ADC con cuenta autorizada: `gcloud auth application-default login` + `gcloud auth application-default set-quota-project altorra-cars`. **Alternativa preferible** para mutaciones de prod (callejón e + precedente `seedSystemRoles`): empaquetar el backfill como **callable 1-clic** (corre con la SA de Functions, sin ADC ni terminal).

### L-49 · Swap de backend de un script CI sin regresión: SDK-dual con fallback + `npm ci` exige lock en sync ⟦OPUS-4.8 · rev-Fable⟧
- **Patrón SDK-dual con fallback (§225)**: NO reemplazar el backend — `connectDb()` ELIGE por entorno (`FIREBASE_SA_KEY` → admin; ausente → cliente histórico) y un wrapper unifica la lectura (client y Admin SDK exponen la MISMA interfaz `snap.docs[].id/.data()/.forEach` → consumidor INTACTO). Secret ausente = byte-idéntico al original → cero-regresión verificable corriendo el fallback EN VIVO; la ruta admin (no-testeable) se valida por revisión adversarial.
- **SA en GitHub Actions ≠ ADC (L-43)**: secret → env var (`cert(JSON.parse(env))`), NO la ADC local (ligada a bersaglio). **GOTCHA `npm ci`**: aborta si `package.json`↔`package-lock.json` desync (rompe el CI en silencio) → SIEMPRE `npm install <dep> --save` (sincroniza el lock) y commitear AMBOS.

### L-50 · Workflow de subagentes en background: se CUELGA en herramientas gateadas por permiso; ultracode lo agrava ⟦OPUS-4.8 · rev-Fable⟧
- **Causa+receta**: subagente DETACHED que llama tool con prompt de permiso (`Bash git`, `Read` fuera-cwd como vault `../brain-private`) → cuelgue infinito esperando aprobación; ultracode+MCP densos lo agravan (§226; Bersaglio ~4.7M tok/2h30). Perfil seguro = read-only IN-cwd (`Grep`/`Read`), SIN git/fuera-cwd, o comité ACOTADO (pocos, sin tools, sobre diagnóstico verificado). Si cuelga: `TaskStop` + cosechar `StructuredOutput` del `.jsonl` (L-61). **SSoT = skill global `comité-expertos §ACOTADO`** (×5 sha `5651c53b`); TODO-31 ✅; revalidado 28/06 (L-57).

### L-61 · Workflow read-only puede colgar 1 agente en el structured-output (sin tool gateada) → bloquea `parallel()`; cosechar del `journal.jsonl` + `TaskStop` + straggler a mano. → ADR §261.5. ⟦OPUS-4.8⟧
### L-62 · Audit que clasifica código = FALSOS POSITIVOS (infiere emoji desde `icon('id')` ya presente) → ground-truth = `Grep` content-mode, no el JSON. Hermana §3.3. → ADR §261.5. ⟦OPUS-4.8⟧
### L-63 · Emulador Firestore ZOMBI en Windows: tras `emulators:exec` interrumpido, el java queda escuchando en 8081 → la corrida siguiente muere con "port taken". Receta: `Get-NetTCPConnection -LocalPort 8081 -State Listen` → `Stop-Process -Id <pid> -Force` y re-correr. → ADR §268. ⟦FABLE-5⟧
### L-64 · En firestore.rules, `resource.data.<campo>` sobre clave AUSENTE = evaluation-error (≠ null): `x == null` NUNCA matchea un campo que no existe → usar `resource.data.get('campo', default)`. Así el `validVersion()` F4.5 tuvo ROTA la migración null→1 por meses sin que nadie lo viera (los tests siempre sembraban el campo). Sembrar docs LEGACY sin el campo en los tests de rules. → ADR §268. ⟦FABLE-5⟧
### L-65 · El `CACHE_VERSION` bump NO es requisito para que un cambio de CSS/JS/HTML público llegue al usuario. `service-worker.js` sirve HTML + `/js/core/` + `/js/public/home/` como **Network-First** y el resto de CSS/JS como **Stale-While-Revalidate**, TODOS con `fetch(…,{cache:'no-cache'})` (GET condicional) → el código nuevo llega solo (HTML/core/home: inmediato; CSS SWR: ≤1 navegación). El bump solo sirve para: la notificación "hay update" (§83), limpiar runtime-caches viejos y bustear los `STATIC_ASSETS` precacheados (solo logos). **Disparador**: antes de anotar "deuda de cache" / "espera el bump del cron" para un cambio de código público, recuerda que el SW ya garantiza frescura — LEE la estrategia del SW, no asumas por la lógica del cron (mis-asumido en §277 y §280). → ADR §280.7. ⟦OPUS-4.8⟧

---

## 🗂️ Validación de código muerto

### L-09 · Cómo confirmar que un archivo es código muerto (antes de cuarentenar)
- Cero refs internas (`grep` en HTML/JS/MJS) + no en `sitemap.xml` + (para herramientas) **sin autenticación** cuando las `firestore.rules` actuales la exigen → no podría funcionar aunque se abriera.
- Casos validados §119: `admin-upload.html` (sin auth → rules §68 rechazan escrituras), `theme-switcher.js` (comentario "eliminado — tema dark permanente", 0 cargas).
- **Acción**: cuarentenar a `_legacy/` (reversible) + documentar en `_legacy/README.md`, NO borrar de una.

### L-16 · Inyectar chrome/CSS nuevo en páginas con tema viejo → guerra de especificidad + scope de tokens → detalle en `33-LECCIONES-FRONTEND.md`

### L-17 · Vestir un módulo legacy con tema nuevo: remapear sus tokens `:root`, no reescribir markup → detalle en `33-LECCIONES-FRONTEND.md`

### L-18 · El chrome compartido (header/footer) puede depender de clases de un CSS que NO se inyecta en legacy → detalle en `33-LECCIONES-FRONTEND.md`

### L-19 · Recomendación por similitud SIN backend — content-based con el rastro local → detalle en `33-LECCIONES-FRONTEND.md`

### L-53 · Receta de "port de módulo al portal `admin-app/` (Vite)" — el patrón repetible del PLAN-UNIFICADO F-2..F-4 → detalle en `33-LECCIONES-FRONTEND.md`

### L-54 · Módulo en blanco SIN error de consola = `render()` post-`await` lanza en un `load()` fire-and-forget → unhandled rejection silenciosa ⟦OPUS-4.8⟧
**Disparador**: un módulo de `admin-app/` (o cualquier `mount(root){ …; load(); return cleanup }`) monta su shell pero queda VACÍO, y la consola NO muestra error. **Causa**: el `render()` que corre *después* del `await` está fuera del `try/catch` de `load()`; como `load()` se invoca sin `.catch` (fire-and-forget), un throw ahí (ej. leer `m.pending.length` cuando `compute()` no devuelve `pending`) se vuelve **unhandled rejection** — invisible salvo con un listener `window.addEventListener('unhandledrejection', …)`. **Receta**: (1) al depurar un módulo en blanco, inyecta primero el listener de `unhandledrejection` vía `preview_eval` ANTES de teorizar; (2) cuida que el modelo de `compute()` contenga TODO lo que `render()` lee (desajuste de forma = el bug clásico); (3) opcional: `load().catch(…)` o envolver el `render()` final en try. F-3 §246.

---

## 🪞 Meta: fallos del propio cerebro (Reflejo de Autocrítica `CLAUDE.md §G.4`)

> El cerebro se critica a sí mismo. Formato: **Defecto → Causa → Corrección**.

### M-01 · Una neurona stale me habría engañado (Memoria Espacial) → detalle en `32-LECCIONES-META.md`
### M-02 · Un chequeo del cerebro dio falso negativo (casi asumo mal) → detalle en `32-LECCIONES-META.md`
### M-03 · El cerebro no se auto-alimentaba sin recordatorio explícito → detalle en `32-LECCIONES-META.md`
### M-04 · Iterar fixes sin verificar la fuente de verdad real (no solo el código de aplicación) → detalle en `32-LECCIONES-META.md`
### M-05 · El cerebro debe crecer en dominios ESTRATÉGICOS, no solo operacionales → detalle en `32-LECCIONES-META.md`
### M-06 · Afirmé "sin desplegar" con `git rev-list origin/main..HEAD` SIN `git fetch` → `origin/main` local stale → detalle en `32-LECCIONES-META.md`
### M-07 · No avisé que el contexto se saturaba — el cliente tuvo que pedirlo al 92% → detalle en `32-LECCIONES-META.md`
### M-08 · Evaluar propuestas de "mejora del cerebro" con evidencia, no con entusiasmo (§151) → detalle en `32-LECCIONES-META.md`
### M-09 · La Autocrítica debe vigilar la COBERTURA de los reflejos, no solo los errores de ejecución (§152) → detalle en `32-LECCIONES-META.md`
### M-10 · Lo verificable va al LINTER que FALLA, no a un reflejo que debo recordar (§153) → detalle en `32-LECCIONES-META.md`
### M-11 · "Verifica, no asumas" es UNIVERSAL, no solo RCA de código (recidiva 2026-06-03) → detalle en `32-LECCIONES-META.md`
### M-12 · Claude hace TODO el git (commit + push + MERGE dev→main) — el dueño NO toca git (drift RECURRENTE 19/06·27/06·29/06) → detalle en `32-LECCIONES-META.md`
### M-13 · Una "cura" se verifica en la capa que el BOOT lee, con grep — no se declara en el historial (recidiva RECURSIVA 2026-06-09) → detalle en `32-LECCIONES-META.md`
### M-14 · "Sesión fresca" de un plan es heurística de PRESUPUESTO, no gate — el corte lo decide el dueño con números reales → detalle en `32-LECCIONES-META.md`
### M-15 · Medir el costo de contexto del cerebro = `.length` de JS sobre los bytes crudos, NO `wc -m` ni "líneas × N" ⟦OPUS-4.8 · rev-Fable⟧ → detalle en `32-LECCIONES-META.md`
### M-16 · El lazo de auto-corrección funciona cuando MECANIZA (gate); es teatro cuando deja el fix en doctrina — la cura de una REINCIDENCIA es un gate, no un reflejo ⟦OPUS-4.8 · rev-Fable⟧ → detalle en `32-LECCIONES-META.md`
### M-17 · Cuando el pedido LITERAL del dueño contradice el historial verificado, NO construyas a ciegas — interpreta por evidencia (el RESULTADO, no el mecanismo) y prefiere opt-in sobre imponer ⟦OPUS-4.8 · rev-Fable⟧ → detalle en `32-LECCIONES-META.md`
### M-18 · Un `firebase deploy` JAMÁS es paso del dueño — los deploys los ejecuto YO (§1); el dueño solo DECIDE ⟦OPUS-4.8⟧ → detalle en `32-LECCIONES-META.md`
### M-19 · No construyas lo NUEVO encima de lo VIEJO roto sin limpiarlo — TODO-35 deferido ×N → el código viejo rompió EN VIVO ⟦OPUS-4.8⟧ → detalle en `32-LECCIONES-META.md`
### M-20 · Un HIT de grep/search prueba que el patrón está PRESENTE, no QUÉ HACE el código — leer la semántica del match antes de construir encima ⟦OPUS-4.8⟧ → detalle en `32-LECCIONES-META.md`
### M-21 · "Validado E2E" del HAPPY-PATH no es validado — un paso que se porta RARO en la validación es señal de bug (no nuisance); entidad con CICLO DE VIDA → frontera obligatoria = cerrar/finalizar/reabrir + REPETIR la acción + ambos lados ⟦OPUS-4.8⟧ → detalle en `32-LECCIONES-META.md`
### M-22 · El cerebro documenta ESTRUCTURA pero no verifica REALIDAD — "✅" conflaciona DISEÑADO/DECIDIDO/CONSTRUIDO/DESPLEGADO/VERIFICADO-LIVE (auditoría §257) ⟦OPUS-4.8⟧ → detalle en `32-LECCIONES-META.md`
### M-23 · Mi validación verifica que FUNCIONE, no que se VEA BIEN — Chrome(DOM) + caza-bugs cazaron CERO defectos de diseño; el dueño los cazó TODOS a ojo ⟦OPUS-4.8⟧ → detalle en `32-LECCIONES-META.md`
### M-24 · Construí maquinaria NUEVA compleja cuando ya existía una solución simple A LA MANO — el dueño: "tienes las cosas visibles a la mano e hiciste algo mas complejo" ⟦OPUS-4.8⟧ → detalle en `32-LECCIONES-META.md`
### M-25 · El cerebro PIERDE MEMORIA cuando el MISMO hecho vive en registros que se CONTRADICEN ⟦OPUS-4.8⟧ → detalle en `32-LECCIONES-META.md`
### L-20 · Preview local del sitio estático: `http-server` con RUTA ABSOLUTA + valida colores con estilos computados (no screenshots) → detalle en `33-LECCIONES-FRONTEND.md`

### L-21 · Migrar un cuerpo legacy a cinematic: fija `background` + estados (`:hover`), no solo `color` → detalle en `33-LECCIONES-FRONTEND.md`

### L-22 · "Un azul que no sé de dónde sale" — paleta oscura FRÍA con hardcodeados dispersos (§150) → detalle en `33-LECCIONES-FRONTEND.md`

### L-23 · La regla universal `* { max-width:100% }` (style.css:6450) COLAPSA el `width` explícito de elementos `position:absolute` → detalle en `33-LECCIONES-FRONTEND.md`

### L-54 · Un flex `fixed`/`absolute` SIN `width` anclado a un solo borde COLAPSA a su contenido (`max-width` no otorga ancho); verifica con viewport de ancho REAL (headless da `innerWidth:0`) → detalle en `33-LECCIONES-FRONTEND.md`

### L-55 · UI con `transition` en el preview headless: el valor animado queda congelado en el inicio → neutraliza transiciones (`*{transition:none}`) y lee end-states; y tabulabilidad por-breakpoint va por CSS `visibility`, no `inert` por JS → detalle en `33-LECCIONES-FRONTEND.md`
### L-56 · Sidebar de filtros ALTO: `position:sticky` sin tope RECORTA su mitad inferior (→ `static` que fluye, sin barra propia); y toggle-breakpoint ≠ colapso-breakpoint = franja muerta sin botón → detalle en `33-LECCIONES-FRONTEND.md`

### L-24 · Un enlace `?param=` solo filtra si la página destino LEE el param — y el filtro puede YA existir con otro nombre → detalle en `33-LECCIONES-FRONTEND.md`

### L-25 · Un `<footer>`/`<header>` de sección hereda chrome GLOBAL por selector de ELEMENTO → detalle en `33-LECCIONES-FRONTEND.md`

### L-26 · Trigger Firestore de ingestión: `merge:true` pisa campos first-seen + el mark de idempotencia DEBE ir en la transacción
- **Disparador**: Cloud Function que normaliza un doc de entrada a un modelo canónico haciendo **upsert** de una entidad (contacto/persona) por clave de dedup — capa de ingestión del CRM (Fase 1, §158, `functions/src/ingestion/onSolicitudCreated.js`).
- **Causa / dos trampas**:
  1. `batch.set(ref, fullObject, {merge:true})` NO borra campos ausentes, pero SÍ **sobrescribe** los presentes. Si `fullObject` trae `createdAt`/`score`/`ownerId`/`rating` con defaults, un 2º evento del MISMO sujeto **pisa** la fecha de primer-contacto y los campos volátiles que un humano ya editó. Bug latente (inofensivo hasta que algo setea esos campos) → corrupción silenciosa.
  2. Marcar idempotencia (`_ingestedAt`) en un `update` SEPARADO tras `batch.commit()` deja una **ventana de crash**: si la función muere entre commit y mark, el reintento RE-crea lead/activity (auto-id) → duplicados.
- **Receta**: **`db.runTransaction`**: `tx.get(ref)` → si NO existe `tx.set(full)`; si existe `tx.update({lastActivityAt,updatedAt})` (NO pisar first-seen/volátiles); + `tx.update(snap.ref,{_ingestedAt})` DENTRO de la misma transacción = todo-o-nada, cero duplicados. La contención de transacción resuelve dos eventos concurrentes del mismo sujeto nuevo (el 2º reintenta y ve "existe").
- **Meta**: lógica PURA (normalize) → unit-test sin Firebase (rápido); trigger fino (I/O) → emulador. **ACTUALIZADO §177**: Java 25 SÍ está instalado en esta máquina → el emulador corre local (`firebase emulators:exec --only firestore "npm --prefix functions test"`); los tests de rules viven en `functions/src/rules/` con `describe.skipIf(!FIRESTORE_EMULATOR_HOST)` (en `npm test` normal se saltan). La 2ª etapa de revisión (subagent-driven, correctness) cazó ambas trampas ANTES del deploy → revisar SIEMPRE triggers con efectos de datos.

### L-27 · App admin greenfield (Vite + Firebase modular) en paralelo: namespacing + estado compartido entre módulos
- **Disparador**: construir una app nueva (`admin-app/`) que corre AL LADO del admin viejo en el mismo dominio/projectId, leyendo el mismo Firestore (CRM Fase 2, §159).
- **Recetas**:
  1. **Aísla la sesión de auth**: `initializeApp(config, 'altorra-crm')` (app nombrada) → la clave IndexedDB `firebase:authUser:<apiKey>:altorra-crm` no choca con la compat `[DEFAULT]`/`altorra-admin` del sitio/admin viejo. Sin nombre, el modular `[DEFAULT]` colisiona con el compat `[DEFAULT]` en el mismo origen.
  2. **Auth = réplica del modelo LIVE, no del diseño**: verifiqué que el backend NO setea custom claims y las reglas usan lookup `usuarios/{uid}` → hidraté permisos de ahí (no claims). Construir lo que el diseño *menciona* sin verificar el backend habría roto el login. (verifica-no-asumas §3.3).
  3. **Estado entre módulos por capas**: si el módulo A (inbox) posee los datos y el módulo B (360) los necesita, A debe **espejarlos al store** (`store.set({leads})`) en cada cambio; B los lee de ahí. Olvidarlo = panel B abre VACÍO (bug real cazado por verificación). No basta tener el dato en una variable local del controlador.
- **Meta**: `base:'./'` en Vite → el `dist` sirve desde cualquier subruta de Pages (`/admin-app/dist/`) sin CI nuevo, sin tocar el deploy del sitio público. Cache-busting por hash → sin `CACHE_VERSION` manual para el admin.

### L-28 · Verificación de UI: `preview_screenshot` se cuelga tras `preview_resize` (o con `backdrop-filter` pesado) — verifica con snapshot + eval → detalle en `33-LECCIONES-FRONTEND.md`

### L-29 · CRM: lead ≠ deal (oportunidad) + drag-drop SIEMPRE con alternativa accesible
- **Disparador**: construir un Pipeline/embudo de ventas (CRM Fase 3, §160).
- **Modelo (patrón de los líderes)**: la **Bandeja trabaja `leads`** (interés entrante, triage); cuando un lead se califica se **convierte en `deal`/oportunidad** (colección aparte) que vive en el **Pipeline**. NO mezclar ambos en una colección con un campo `stage` — leads (pre-venta) y deals (venta activa) tienen ciclos distintos. La conversión marca `lead.status='convertido'`+`convertedTo.dealId` (cero pérdida de rastro). Es aditivo (colección nueva) = bajo riesgo de revertir.
- **A11y del kanban**: el drag-drop HTML5 **no es accesible por teclado**. SIEMPRE acompañarlo de una alternativa (menú "Mover a etapa" por botón/popover) — misma ruta de código (`updateStage`), verificable sin simular DnD. WCAG + testeable.
- **Forecast**: ponderado = Σ(monto × probabilidad de la etapa), aritmética pura en el dominio (sin ML). Verificable a mano en `?mock=1` (cazó que el recálculo de probabilidad al mover etapa estuviera bien: 35%→80% sobre $95M = +$42,75M).
- **Meta**: routing multi-sección = montar/desmontar módulos en el outlet con **cleanup del anterior** (cancela `onSnapshot`) + cerrar overlays (360) al cambiar de sección. En modo mock, un store compartido (`MOCK_DEALS`) hace que la conversión desde la Bandeja persista al navegar al Pipeline.

### L-30 · Calendario: `dayKey` LOCAL (no UTC) + range+orderBy del mismo campo = índice AUTOMÁTICO
- **Disparador**: construir una vista de calendario/agenda sobre Firestore (CRM Fase 3b, §161).
- **Zona horaria (gotcha)**: para agrupar eventos por día NO uses `date.toISOString().slice(0,10)` — convierte a UTC y en Colombia (UTC-5) un evento de las 23:00 local cae al día siguiente. Construye la clave de los **componentes locales**: `` `${getFullYear()}-${pad(getMonth()+1)}-${pad(getDate())}` ``. Misma trampa al calcular el rango del mes.
- **Índices**: una query con **filtro de rango + `orderBy` sobre EL MISMO campo** (`where('dueAt','>=',a).where('dueAt','<',b).orderBy('dueAt')`) usa el **índice de campo único AUTOMÁTICO** de Firestore → NO necesita índice compuesto ni `firebase deploy --only firestore:indexes`. (Solo se necesita compuesto si filtras/ordenas por campos DISTINTOS.) Ojo: un range query **excluye** docs que no tengan el campo (los `activities` sin `dueAt` no aparecen) — justo lo que queremos para "solo citas".
- **Meta**: gap de dato real — el canónico no guardaba fecha/hora de cita; la solución MVP fue una acción "Agendar" que escribe `activities{dueAt}`, no reescribir la ingestión. Construir la fuente del dato donde el flujo lo produce, no forzar el esquema viejo.

### L-31 · Captura manual de leads = REUSAR la ingestión (escribir el doc de entrada), no duplicar dedup/consent en el cliente
- **Disparador**: agregar entrada MANUAL de leads (canales externos Meta/WhatsApp/TikTok/llamada/walk-in) a un CRM que ya tiene una capa de ingestión automática (CRM §162). El cliente lo señaló: la mayoría de leads de un concesionario NO entran por la web.
- **Receta**: en vez de escribir el canónico directo desde el cliente (replicando dedup por email/teléfono + consentimiento + creación de actividad — riesgo de drift con el normalizador server-side), el formulario manual **escribe un documento de ENTRADA** (`solicitudes` con `origen:<canal>` + `consentGiven`) → el **trigger de ingestión existente lo normaliza** con TODA su lógica (dedup, Habeas Data, activity, dead-letter). Cero backend nuevo, cero deploy de reglas/índices (la colección de entrada ya acepta `create`), single-source-of-truth del dedup. El lead aparece solo en la Bandeja vía `onSnapshot` (lag ~1-2s del trigger, aceptable).
- **Atribución para ROI**: capturar **canal + orgánico/pauta + campaña** en el form (→ `tags`/`source`) desde el día 1, aunque los Reportes vengan después — el dato se pierde si no se captura cuando entra.
- **Meta**: el modo mock no tiene trigger → ahí sí se escribe el lead "canónico" local (`addMockLead`) + un evento `leads-dirty` para refrescar la Bandeja. Dos caminos (real=ingestión, mock=directo) detrás de la misma UI.

### L-32 · Dashboard de reportes: agregación CLIENTE $0 + SVG namespaced + dominio reusado (sin librería)
- **Disparador**: construir un tablero de KPIs/Reportes sobre el canónico (CRM Fase 4, §165).
- **Agregación (no backend de entrada)**: para volumen bajo-medio NO metas rollups/BigQuery. **`getDocs` acotado** (`orderBy('createdAt','desc')` + `limit` → índice de campo único AUTOMÁTICO, L-30) + **agregación en memoria** = $0, sin reglas/índices, sin realtime (un tablero es snapshot + botón "Actualizar", no `onSnapshot`). Filtra el período en memoria. Avisa en UI si tocaste el `limit` (`capped`). Rollups = enhancement cuando el volumen lo pida.
- **Charts sin librería (gotcha SVG)**: `el()` (core/dom) usa `document.createElement` → **NO crea SVG** (namespace equivocado → render invisible/roto). Para SVG: helper propio con `document.createElementNS('http://www.w3.org/2000/svg', tag)`. Barras = CSS puro (div `width:%`), accesibles por texto; línea/área = `polyline`+`polygon` con `vector-effect:non-scaling-stroke` + `preserveAspectRatio:none`. Acompaña cada chart con su **tabla** (a11y + fuente del CSV).
- **Determinismo (cero drift)**: reusa el dominio PURO existente (`forecast`/`channelOf`/`scoreLead`/`dayKey`/`format`) en vez de reimplementar. **Embudo monotónico**: define cada paso como "alcanzó al menos este hito" (subconjunto del anterior); "ganado" por **join** lead→deal (`convertedTo.dealId` ∈ deals `won`), no por estado del lead. Un lead `convertido` cuyo deal termina `perdido` NO es ganado (caso real a testear).
- **Detalles**: `dayKey` LOCAL para buckets de tiempo (no UTC, L-30). **CSV** RFC-4180: entrecomilla `" , \n \r`, comilla doble escapada, BOM `﻿`, fin de línea CRLF; en **es-CO entrecomilla también `;`** (Excel lo usa de separador de lista). **Cero cache bump** si el cambio vive solo en `admin-app/` (Vite hash-busting, L-27) y no toca el sitio público.
- **Meta**: KPIs de "período" (intake/resultado) vs "estado actual" (pipeline/SLA) son scopes distintos → etiquétalos, no los mezcles en un solo número. Verifica el tablero reconciliando la aritmética A MANO en `?mock=1` (snapshot+eval, L-28) — extiende el mock con casos cerrados (won/lost/convertido/perdido) o el embudo/win-rate salen vacíos.

### L-33 · Reusar un panel de detalle lead-céntrico desde un directorio de personas (Contactos §166)
- **Disparador**: construir una lista/directorio de `contacts` cuando la ficha de detalle (Customer 360) ya existe pero está **acoplada a un lead** (`store.detailLeadId` + busca el lead en `store.leads`).
- **Receta**: NO reescribas el 360. Desde el directorio (1) carga `contacts` + `leads`, (2) mapea contacto→lead más reciente (`lead.contactId`), (3) al hacer clic en una persona CON lead, **espeja los leads al store y abre la ficha en un set ATÓMICO**: `store.set({ leads: ui.leads, detailLeadId: lead.id })` (L-27; un solo `set` evita estados intermedios). El 360 recalcula su score él mismo → un lead "pelado" (sin enriquecer) funciona igual.
- **Persona SIN lead** (p. ej. suscriptor de newsletter): NO la pintes como botón que no abre nada → **fila informativa NO interactiva** (`<div>`, no `<button>`); toda su info ya está visible. Anti falso-affordance (a11y).
- **Datos**: ordena el directorio por un campo **SIEMPRE presente** (`createdAt`), no por `lastActivityAt` (Firestore EXCLUYE del `orderBy` los docs que no tengan el campo → pérdida silenciosa). Campo único → índice automático (L-30).
- **Meta-verificación**: si una rama (la fila `<div>` sin lead) NO se ejercita con el mock actual (porque todos los mocks derivan de un lead), **añade un dato que la dispare** (un suscriptor sin lead) y compruébala — no la des por buena leyendo el código (§3.3). Solo un módulo se monta a la vez (teardown por ruta) → espejar `store.leads` desde Contactos no colisiona con la Bandeja.

### L-34 · Triar hallazgos de review/comité contra el CÓDIGO REAL (la mayoría de "high" son falsos positivos)
- **Disparador**: recibes findings de una revisión adversarial (workflow `adversarial-review`, comité de expertos, reviewer externo) con severidades.
- **Patrón observado (§165 Reportes + §166 Contactos)**: los reviewers marcan varios "high" que, al LEER el código real, son **falsos positivos** — el guard ya existía (`if(!alive) return` ya sale de la función), el error ya se maneja (`e.code` ya distingue permission-denied), la colisión no ocurre (solo un módulo montado a la vez), 'suscriptor' no es un `type` canónico, etc. Aceptarlos a ciegas = trabajo inútil + posible regresión.
- **Receta**: ningún hallazgo se aplica sin **confrontarlo con el código real ESE turno** (§19/§3.3). Clasifica: **REAL** (aplica) · **FALSO POSITIVO** (el reviewer no vio X → anótalo con evidencia) · **FUERA-DE-ALCANCE** (pre-existente/global → no lo arregla este cambio). Aplica solo los REALES; documenta por qué descartaste el resto.
- **Por qué pasa**: el reviewer ve un subconjunto y asume lo peor (es su trabajo, y es bueno). Tu ventaja: ves el sistema completo. El valor de la revisión NO es obedecerla, es que te OBLIGA a mirar cada punto.
- **Meta**: este triage ES lo que hará valioso al comité de expertos (skill futura) — síntesis crítica, no voto ciego. Doctrina del workflow `.claude/workflows/adversarial-review.js`.

### L-35 · Verifica el MECANISMO antes de construir sobre él (el "hook que bloqueaba" no existía) + escape del pre-commit
- **Disparador**: vas a diseñar/decidir basándote en un comportamiento del tooling ("el hook bloquea X", "el linter valida Y").
- **Caso (comité v6, §173)**: el HANDOFF afirmaba "hook de seguridad bloquea Write con execSync" → verificado `.claude/settings.json`: solo existe el hook de SessionStart; el bloqueo observado era una intervención advisory del harness, NO un gate configurado. La decisión sin-child_process del linter sigue siendo correcta, pero por portabilidad + byte-identidad ×3, no por un veto inexistente. **Receta**: antes de citar un mecanismo como restricción, léelo (settings/hook/código) ESE turno.
- **Escape del pre-commit (blast radius ×3)**: el kernel `brain-check.mjs` corre en pre-commit de los 3 repos; un kernel con bug los bloquea a la vez. Diagnóstico primero (correr `node scripts/brain-check.mjs` suelto); `git commit --no-verify` SOLO con pedido explícito del cliente (§2) y dejando TODO-NN para arreglar el kernel.

### L-36 · La deliberación "perdida" NO es irrecuperable: transcripts JSONL del harness (ruta de salvamento)
- **Disparador**: una sesión cerró sin capturar la deliberación (comité/workflow/Gemini) → crees que el conocimiento se perdió.
- **Realidad (verificada §173)**: el harness persiste TODO por-máquina en `~/.claude/projects/<proyecto>/<sesión>/` (transcripts + `subagents/workflows/*.jsonl`). Es deuda RECUPERABLE: localizar la sesión por fecha, extraer el crudo, archivarlo en `archiveDir` (manifest) + síntesis retroactiva.
- **Prevención**: el PRIMER acto tras un workflow de deliberación = copiar el resultado a `research-archive/` (Reflejo de Captura §G.4); el runner no puede escribir disco (sandbox sin fs) → la copia la hace el agente `[HONOR]` + el check de integridad (kernel v1.2) detecta JSON sin indexar.

### L-37 · Un rediseño que ELIMINA/renombra clases rompe los callsites JS que las buscan (catch real de §3.2) → detalle en `33-LECCIONES-FRONTEND.md`

### L-45 · El SSG horneado DESPOJA ids del `<head>` (ej. `<title id="pageTitle">`) de los que depende el JS inline → null-deref aborta el render → detalle en `33-LECCIONES-FRONTEND.md`

### L-46 · Inyectar una 2ª global `window.X` en el MISMO `<script>` que otra rompe el gate `SSG_SELFTEST` (split `;</script>` arrastra la 2ª asignación) → detalle en `33-LECCIONES-FRONTEND.md`

### L-51 · Recuperación de borradores "pro" SIN reabrir un autosave rechazado: separar borrador-deliberado de red-de-seguridad-local (opt-in, scoped por uid) → detalle en `33-LECCIONES-FRONTEND.md`

### L-52 · Antes de replicar un script de KERNEL acoplado a convenciones ×cerebros, VERIFICA la convención de cada destino — un copy byte-idéntico que no aplica = no-op silencioso = falsa cobertura (M-10) ⟦OPUS-4.8⟧
- **Disparador**: vas a propagar un script del cerebro (índice/linter/generador) a los otros repos "byte-idéntico ×N".
- **Síntoma (§229)**: `brain-index.mjs` (auto-reconcilia §→línea) está acoplado a (a) headers `## NN.` numéricos y (b) índice con columna de nº de línea. bersaglio (headers fecha-leading) e insema (índice por-proveniencia) NO cumplen → un copy correría, diría "0 reconciliadas", saldría 0 y *parecería instalado*. Solo cars/inmob cumplen.
- **Receta**: (1) lee el `99`+`00` de cada destino y arma la **matriz de compatibilidad ANTES de copiar**; (2) instala SOLO donde aplica; donde no, un ADR que documenta el N/A + el pre-requisito (NO código muerto); (3) **verifica los hashes del kernel ANTES de añadir un peer** al manifest (si no, metes un warn en #11); (4) referencia una `L-/M-` solo si existe en ESE repo (un `M-10` de cars es ref colgante en bersaglio → pásalo a texto plano). Byte-identidad del kernel es un INVARIANTE a defender, NO una meta a forzar sobre convenciones divergentes.

### L-47 · En reglas Firestore, `resource.data.X` de un campo AUSENTE **LANZA** (no es null) — guardar con `('X' in resource.data)` ⟦OPUS-4.8⟧
- **Síntoma (§222)**: un test rules-unit de `marcas` dio `PERMISSION_DENIED: Property _version is undefined on object` al ACTUALIZAR un doc sin `_version` (los seed/legacy). En prod no se notó porque el dueño edita como **super-admin** (que bypassa `validVersion()`); un `brands.edit` no-super SÍ lo dispara.
- **Causa**: `validVersion()` = `request…_version == resource.data._version + 1 || (resource.data._version == null && …)`. El PRIMER operando accede a `resource.data._version`; si el doc no lo tiene, **lanza evaluation error** → la `||` ni evalúa el fallback `== null`. Acceder a un campo ausente en reglas es un ERROR, NO `null`.
- **Receta**: antes de leer un campo OPCIONAL de `resource.data`, **guardar con `('X' in resource.data)`** (o `.get('X', default)` donde exista), ANTES de la operación que lo accede. En `request.resource.data` (create) el cliente siempre lo manda; el riesgo es leer `resource.data` (el doc previo, que puede ser seed/legacy sin el campo). Aplica a cualquier helper que compare versión/timestamp de docs que pueden no tenerlos.

### L-48 · Sesión concurrente multi-chat: un `git add -A` en otro chat arrastra tu edit sin commitear a SU commit → detalle en `31-LECCIONES-GIT.md`

### L-38 · `billing disabled` tumba las 27 functions — pero Eventarc RE-ENTREGA al recuperarse (outage corto ≠ pérdida)
- **Síntoma**: logs de TODAS las functions con "The request failed because billing is disabled" (crons + triggers). La web sigue viva (reads/writes directos a Firestore OK) pero ingestión CRM, emails, Telegram y LLM muertos.
- **Observado (§175, 2026-06-09)**: outage ~21:00→23:03 UTC; al volver el billing, **Eventarc RE-ENTREGÓ los eventos fallidos solo** (la solicitud de las 22:50 se ingirió a las 23:03, `_ingestedAt` tardío, sin pérdida ni duplicados). La retención de reintentos es limitada (~horas) — un outage LARGO sí pierde eventos → revisar `failedIngestions` + backfill manual.
- **Receta**: ante "la ingestión no corre": (1) `functions_get_logs` ANTES de tocar código — puede ser billing/cuota, no un bug; (2) al recuperarse, buscar `_ingestedAt` para ver si Eventarc ya re-procesó ANTES de re-disparar a mano (evita duplicados); (3) la causa de billing-disabled es del dueño del proyecto (tarjeta/cuenta GCP) — escalar al cliente, no "arreglar" código.

### L-39 · Un GET público linkeado por WhatsApp/email JAMÁS debe mutar estado (los previews lo disparan solos)
- **Síntoma**: "el cliente confirmó sin abrir el link" — WhatsApp genera la vista previa haciendo fetch del link DESDE el remitente al componer; Outlook SafeLinks/antivirus hacen lo mismo con emails. Cazado por review §184 ANTES de producción: el flujo entero de confirmación se auto-confirmaba.
- **Receta**: GET = página intersticial con botón; SOLO el POST muta (`req.method === 'POST'`). Aplica a todo magic-link (confirmar/cancelar/unsubscribe). De paso: escapar TODO dato reflejado (XSS) + header CSP.

### L-40 · Firestore `set(..., {merge:true})` NO borra claves de mapas omitidas — y liberar recursos compartidos exige verificar PROPIEDAD
- **Gotcha 1**: para quitar una clave de un mapa con merge se necesita `deleteField()` (tombstone) o `update()` del campo completo; omitirla la deja viva → "lo borré y sigue ahí" (review §184: 'Quitar ausencia' era un no-op).
- **Gotcha 2**: en pools de reservas (slots/bloques) sin dueño por entrada, liberar "mis" recursos al cancelar puede borrar los de OTRO si mi doc nunca los reservó (estados que no retienen) — gate de propiedad ANTES de liberar (`holdsTuple` §184) o persistir qué se reservó exactamente.

### L-41 · El "censo literal de escritores" para una whitelist de Rules debe incluir los escritores INTERNOS (admin/staff), no solo los públicos
- **Síntoma**: E5 censó los 5 forms públicos de `solicitudes` y su whitelist rompió en silencio al 6º escritor — la cita interna del clásico firmaba con `createdBy` (permission-denied desde el deploy, §188). El `catch` optimista del cliente lo enterraba.
- **Receta**: el censo = grep de TODOS los `collection('X').add/set` en js/ + admin-app/ + bots, no solo los flujos "del usuario". Y cada escritor legítimo entra a la suite con su payload LITERAL (el test del payload interno habría reventado en E5).
- **REINCIDENCIA §209 (17/06) ⟦OPUS-4.8⟧**: 3er escritor admin olvidado — `createManualLead` (`admin-app/.../capture/capture.data.js`→`solicitudes`) daba permission-denied para TODOS. La lección EXISTÍA pero ni el censo SEC-06 §187 ni el barrido §188-0.3 (que la parió) grepearon `admin-app/.../capture`. **Endurecer a MECÁNICO**: tras CUALQUIER cambio a un `hasOnly`, correr `grep -rn "collection('solicitudes')" js/ admin-app/src/ functions/` y exigir que CADA escritor tenga test de emulador con su payload literal (el de createManualLead no existía → reventó silencioso en el portal-prod). Fix = rama admin dedicada (`crm.edit` + `_createdByUid==auth.uid`), NO aflojar el público (ADR §209).

### L-42 · Al portar un módulo cuyo docId es un slug derivado, REPLICAR el regex EXACTO del clásico (no el slugify "mejorado" del portal) ⟦OPUS-4.8⟧
- **Síntoma (evitado)**: dealers (§204) deriva docId del nombre. El portal ya tenía `brands.slugify()` que normaliza tildes (NFD) — reusarlo habría dado un docId DISTINTO para nombres acentuados que el clásico (`replace(/[^a-z0-9]/g,'-')`, sin NFD) → durante el doble-admin, crear el mismo aliado en cada admin produce DOS docs y rompe el join `vehiculos.concesionario`.
- **Receta**: en todo port con interop (clásico ↔ portal coexistiendo), la clave del doc es un CONTRATO — replicar su generación byte a byte, no "mejorarla". Igual con `_version`: si las rules del módulo NO exigen `validVersion()`, NO escribirlo (rompería al clásico que escribe sin él). El crítico adversarial del workflow lo cazó antes de codear.

### L-53 · Clean-slate de datos CRM = barrer el lead-lifecycle completo (no las colecciones literales de la vista); Admin-SDK+ADC + backup→delete ⟦OPUS-4.8⟧
- **Causa**: "purgar Bandeja/Reportes" parece `leads`+`deals`, pero borrar solo eso deja huérfanos (`activities`/`contacts` en Dashboard/Contactos) y peor: las `solicitudes` **resucitan** los leads en un reproceso (la ingestión las lee). Conjunto coherente = `leads·deals·activities·contacts·solicitudes·dedup·failedIngestions` (dedup va PAREADO con contacts: si no, un lead real futuro se dedup-ea contra un contacto borrado).
- **Receta**: data-op server-side con script `firebase-admin`+**ADC** (salta las rules; el client-SDK del repo NO puede leer/borrar `leads`). SIEMPRE **backup→delete** gated tras `--delete` (backup a `backups/`, gitignored) y verificar 0 al final. El **clasificador bloquea el mass-delete de prod = segunda llave** (alinea TODO-30 Doble-Llave) → confirmar ALCANCE con el dueño antes (no inferir scope ancho de una orden general). Patrón portable ×4 cerebros.

### L-57 · La PII DESNORMALIZADA sobrevive a la supresión-por-grafo — púrgala buscando por el campo de REFERENCIA, no por el id del dueño ⟦OPUS-4.8⟧
- **Síntoma/causa** (TODO-50 fase 2c, §LEGAL-07): la supresión Ley 1581 (`executeSuppression`) borra el contacto y re-apunta su grafo por `contactId`. Pero el nombre del consignante se DESNORMALIZA (congelado en `deals.commissionSnapshots[].frozenTenancy.ownerDisplayName` + `vehiculos.tenancy.ownerDisplayName`) y se referencia por **`ownerRefId` ≠ `contactId`** (el `deal.contactId` es el COMPRADOR) → la supresión-por-grafo NUNCA lo alcanza = **PII fosilizada filtrada** (la cazó el reflejo caza-bugs leyendo el reporte `fetchDealerStats`, no el diff).
- **Receta**: PII desnormalizada → purga TODAS las copias en un barrido APARTE por el **campo de referencia** (`ownerRefId`). Firestore no consulta dentro de array de mapas → barrido paginado COMPLETO de deals (cubre won-luego-anulado). Idempotente (skip-if-sentinel) + **soft-redact** server-side (Admin SDK bypasea la inmutabilidad lógica): conserva `ownerRefId` opaco + economics (Cód.Comercio art.60), purga SOLO el nombre (art.8e). NO crypto-shredding.
- **Meta (verifica al consejo + comité de DOMINIO):** (a) la revisión 4-lentes cazó un gap real (`snapshotEntriesRedacted` faltaba en auditLog) pero **alucinó** un `firestore.indexes.json` inexistente → verifica todo claim (query de igualdad anidado = auto-indexado). (b) un comité LEGAL ×5 vs `.gov.co` cazó un gap PROBATORIO que el code-review NO ve: borrar el contacto mataba `contractRef` → snapshot económico HUÉRFANO (no reconciliable, C.Co. art.60 + E.T. art.632 + Ley 1581 art.12) → fix C1 = rescatar el contrato al auditLog antes de borrar. **Para CUMPLIMIENTO corre el comité del DOMINIO, no solo code-review** (el requisito de RECONSTRUCCIÓN no es un bug). Detalle → `42-LEGAL §Certificación`.

### L-60 · SVG inline hijo-flex directo colapsa a `width:0` sin `flex:0 0 auto` (mide vivo, no confíes en la regla) → detalle en `33-LECCIONES-FRONTEND.md`
### L-66 · Contraste/rol a11y: MIDE la cascada viva (el ganador de especificidad ≠ el token que dice la spec) · `role=menu` es un contrato (exige `menuitem`; barra de acciones = `toolbar`) → detalle en `33-LECCIONES-FRONTEND.md`
### L-67 · Hero de CSS `background-image` = trampa de LCP (descubierto tarde, sin `fetchpriority`, no usa el preload responsivo) → usar `<img>`/`<picture>`; verifica el LCP con TRACE real, no con el observer del preview → detalle en `33-LECCIONES-FRONTEND.md`
### L-68 · Ancla de `.replace()` que cruza `\n` falla EN SILENCIO en Windows (CRLF): `marca.html` se checkoutea con CRLF (`autocrlf`) y un ancla con `\n` literal no matchea → no-op, 0 globals (CI/LF ok); usa regex `\r?\n` o ancla de una sola línea + guard que valide el anchor EXACTO del `.replace()`, no un substring suelto → detalle en `31-LECCIONES-GIT.md`
### L-69 · El "hueco" de grilla (§283) es DENTRO de la tarjeta corta (grid `stretch` + footer `margin-top:auto`), NO entre tarjetas; el masonry (`columns`) NO generaliza — reordena a columna-mayor → rompe listas ordenadas (auditoría panel = 0/10 APPLY-SAFE, §292). "Un fix es local hasta demostrar lo contrario" → detalle en `33-LECCIONES-FRONTEND.md`
### L-70 · Overflow móvil en filas flex/grid + cómo auditarlo (TODO-52 P0, §294) ⟦OPUS-4.8⟧: en una fila `flex-wrap:wrap` [fijo][main `flex:1;min-width:0`][precio][acciones], flex ENCOGE main a ~0 para meter todo en 1 línea (encoger precede a envolver) → el contenido de main (título) desborda. Fix: `main { flex-basis: calc(100% - <fijo> - gap) }` (o `min-width:%`) → main llena la 1ª fila, el resto envuelve debajo. Análogo: grid con cols FIJAS + col `auto` (no encoge) desborda aunque el contenido sea `minmax(0,1fr)` → achica gap/padding en móvil (§294 Bandeja). **Auditar overflow por DOM**: la señal fiable es `documentElement.scrollWidth-clientWidth` (overflow de PÁGINA); por-elemento da FALSOS POSITIVOS en scrollers intencionales (kanban `overflow-x:auto`) → excluye si un ancestro tiene `overflow-x:auto/scroll`. Mide con viewport EXPLÍCITO (`preview_resize` a WxH concreto; el preset nativo dio 0×0 → todo "desborda").
### L-71 · Commit en HEAD DESPRENDIDO (tras resume) queda COLGANTE, no llega a `dev`/`main` ⟦OPUS-4.8⟧: `git commit` imprime `[detached HEAD]` (no `[dev]`), el `push origin dev` es no-op y el `checkout dev` REVIERTE tu edit del working tree. `git rev-parse HEAD` no revela el detached → verifica `git rev-parse --abbrev-ref HEAD`==`dev` ANTES de commitear; recupera el colgante con `git merge --ff-only <hash>` desde dev → detalle en `31-LECCIONES-GIT.md`
### L-72 · "¿Este mes/rango tiene datos?" — cuenta lo del rango VISIBLE, no el `length` del store global ⟦OPUS-4.8⟧: un empty-state con `!store.items.length` FALLA si el store RETIENE datos de otros rangos al navegar (Agenda: `ui.events` guarda citas de meses previos; la grid filtra por día → un mes vacío tiene `ui.events.length>0` → el empty no aparecía). Cuenta los que caen en el rango visible (`weeks.some(cell.inMonth && byDay[key].length)`). Bug cazado en la verificación LIVE de §295 (mes vacío mostraba grid en vez del empty). Emparentado con el patrón CSS `:has()`/`:not(.is-out)` para ocultar ítems vacíos (§295).

---

> Esta neurona crece sola (bajo guía del constructor). Si una lección se vuelve
> doctrina permanente, promoverla a `CLAUDE.md §3`. Si encaja en un § histórico,
> enlazarla. Mantenerla accionable: síntoma → causa → receta.
>
> **📏 Capacidad (CLAUDE.md §G.5): ~350 líneas.** Al acercarse, SHARD por categoría
> → ej. extraer la sección "Git / refactor" a `docs/31-LECCIONES-GIT.md`, registrarla
> en la tabla §0 + `00-INDICE`, y dejar aquí un puntero a la hija. Nada huérfano.

## 🧭 Decisiones de gobernanza 2026-06-24 (operador-cars → ×4 cerebros) [HONOR]
> De la sesión cars (PLAN UNIFICADO, cars §237). Mismo dueño/operación en los 4 repos.
1. **La extensión Claude-in-Chrome la maneja CLAUDE directamente** (no relay): tras merge+~5min de deploy el dueño avisa y Claude conduce la validación live SOLO (es los OJOS), caza diseño/bugs/regresiones. Skill `validacion-live-chrome` modo (b) = DEFAULT con navegador conectado. Login/credenciales = solo el dueño; cambios locales no-deployados → `preview_*`.
2. **NO preguntar "qué sigue" en un plan ya hecho + revisado estratégicamente por mí** (survey/comité/Gemini/arquitecto): yo manejo el ORDEN técnico; solo interrumpo por decisiones del DUEÑO (dinero/legal/go-no-go/irreversible) o su verificación final. Refuerzo emphático del dueño 24/06. Hablarle SIEMPRE en cristiano (es no-técnico).
3. **Un workflow/comité ACOTADO (in-cwd read-only, sin git, sin lecturas fuera de cwd) NO se cuelga** — lo que cuelga es la lectura GATEADA por permiso (git/fuera-de-cwd), NO el fan-out acotado en sí (survey de 5 agentes corrió limpio). La maquinaria pesada (comité/Gemini/workflow) se usa para Decisión Fuerte, acotada.
4. **Verificar TODO claim de un asesor externo (Gemini) contra el código** antes de adoptar — la joya: en cars Gemini revirtió su propio verdicto previo y sus 6 claims se confirmaron leyendo el código. Insumo, no oráculo.
