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

### L-01 · `sed -i` corrompe CRLF→LF → detalle en `31-LECCIONES-GIT.md` ⇒ **migrada al maestro**: [[CARS:L-01]]
### L-02 · Conflicto cron↔cache al fusionar → detalle en `31-LECCIONES-GIT.md`
### L-03 · No fusionar micro-pasos a `main` → detalle en `31-LECCIONES-GIT.md` ⇒ **migrada al maestro**: [[CARS:L-03]]
### L-04 · Receta para mover un JS sin romper → detalle en `31-LECCIONES-GIT.md`

---

## 🌐 Frontend / runtime / CSS → `33-LECCIONES-FRONTEND.md` (neurona hija · shard A5 §206 — aquí quedan stubs `### L-NN`; algunos dispersos abajo)

### L-05 · `<base href="/">` hace que TODA ruta sea raíz-relativa idéntica → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-05]]

### L-06 · `js/core/components.js` es un CARGADOR DINÁMICO (refs ocultas) → detalle en `33-LECCIONES-FRONTEND.md`

### L-10 · `components.js` también carga CSS dinámicamente (no solo JS) → detalle en `33-LECCIONES-FRONTEND.md`

### L-07 · El generador es TEMPLATE-DRIVEN (cron cada 4h) → detalle en `33-LECCIONES-FRONTEND.md`

### L-11 · PORTs JSX→vanilla — class-name fidelity (JS-emit ≡ CSS-define) → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-11]]

### L-12 · Re-render por `onChange` acumula listeners en el padre — teardown explícito siempre → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-12]]

### L-13 · Módulos lazy-loaded — guards `typeof` en click-time + event delegation → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-13]]

### L-14 · SW stale-while-revalidate puede servir JS viejo en critical-path post-deploy → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-14]]

### L-15 · Self-contained read patterns eliminan races de estado en memoria → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-15]]

---

## 🔥 Firebase / entorno

### L-08 · Los errores `403` de Firebase en `localhost` son NORMALES — y el bloqueo es MÁS amplio que Auth ⇒ **migrada al maestro**: [[CARS:L-08]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-43 · La ADC de esta máquina está ligada a `bersaglio-jewelry` → scripts Admin SDK contra `altorra-cars` dan `PERMISSION_DENIED` (IAM, NO rules) ⟦OPUS-4.8 · rev-Fable⟧ ⇒ **migrada al maestro**: [[CARS:L-43]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-49 · Swap de backend de un script CI sin regresión: SDK-dual con fallback + `npm ci` exige lock en sync ⟦OPUS-4.8 · rev-Fable⟧ ⇒ **migrada al maestro**: [[CARS:L-49]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-50 · Workflow de subagentes en background: se CUELGA en herramientas gateadas por permiso; ultracode lo agrava ⟦OPUS-4.8 · rev-Fable⟧ ⇒ **migrada al maestro**: [[CARS:L-50]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-61 · Workflow read-only puede colgar 1 agente en el structured-output (sin tool gateada) → bloquea `parallel()`; cosechar del `journal.jsonl` + `TaskStop` + straggler a mano. → ADR §261.5. ⟦OPUS-4.8⟧ ⇒ **migrada al maestro**: [[CARS:L-61]] · cuerpo en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo)
### L-62 · Audit que clasifica código = FALSOS POSITIVOS (infiere emoji desde `icon('id')` ya presente) → ground-truth = `Grep` content-mode, no el JSON. Hermana §3.3. → ADR §261.5. ⟦OPUS-4.8⟧ ⇒ **migrada al maestro**: [[CARS:L-62]] · cuerpo en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo)
### L-63 · Emulador Firestore ZOMBI en Windows: tras `emulators:exec` interrumpido, el java queda escuchando en 8081 → la corrida siguiente muere con "port taken". Receta: `Get-NetTCPConnection -LocalPort 8081 -State Listen` → `Stop-Process -Id <pid> -Force` y re-correr. → ADR §268. ⟦FABLE-5⟧ ⇒ **migrada al maestro**: [[CARS:L-63]] · cuerpo en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo)
### L-64 · En firestore.rules, `resource.data.<campo>` sobre clave AUSENTE = evaluation-error (≠ null): `x == null` NUNCA matchea un campo que no existe → usar `resource.data.get('campo', default)`. Así el `validVersion()` F4.5 tuvo ROTA la migración null→1 por meses sin que nadie lo viera (los tests siempre sembraban el campo). Sembrar docs LEGACY sin el campo en los tests de rules. → ADR §268. ⟦FABLE-5⟧ ⇒ **migrada al maestro**: [[CARS:L-64]] · cuerpo en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo)
### L-65 · El `CACHE_VERSION` bump NO es requisito para que un cambio de CSS/JS/HTML público llegue al usuario. `service-worker.js` sirve HTML + `/js/core/` + `/js/public/home/` como **Network-First** y el resto de CSS/JS como **Stale-While-Revalidate**, TODOS con `fetch(…,{cache:'no-cache'})` (GET condicional) → el código nuevo llega solo (HTML/core/home: inmediato; CSS SWR: ≤1 navegación). El bump solo sirve para: la notificación "hay update" (§83), limpiar runtime-caches viejos y bustear los `STATIC_ASSETS` precacheados (solo logos). **Disparador**: antes de anotar "deuda de cache" / "espera el bump del cron" para un cambio de código público, recuerda que el SW ya garantiza frescura — LEE la estrategia del SW, no asumas por la lógica del cron (mis-asumido en §277 y §280). → ADR §280.7. ⟦OPUS-4.8⟧

---

## 🗂️ Validación de código muerto

### L-09 · Cómo confirmar que un archivo es código muerto (antes de cuarentenar) ⇒ **migrada al maestro**: [[CARS:L-09]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-16 · Inyectar chrome/CSS nuevo en páginas con tema viejo → guerra de especificidad + scope de tokens → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-16]]

### L-17 · Vestir un módulo legacy con tema nuevo: remapear sus tokens `:root`, no reescribir markup → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-17]]

### L-18 · El chrome compartido (header/footer) puede depender de clases de un CSS que NO se inyecta en legacy → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-18]]

### L-19 · Recomendación por similitud SIN backend — content-based con el rastro local → detalle en `33-LECCIONES-FRONTEND.md`

### L-53 · Receta de "port de módulo al portal `admin-app/` (Vite)" — el patrón repetible del PLAN-UNIFICADO F-2..F-4 → detalle en `33-LECCIONES-FRONTEND.md`

### L-77 · Módulo en blanco SIN error de consola = `render()` post-`await` lanza en un `load()` fire-and-forget → unhandled rejection silenciosa ⟦OPUS-4.8⟧ ⇒ **migrada al maestro**: [[CARS:L-77]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

---

## 🪞 Meta: fallos del propio cerebro (Reflejo de Autocrítica `CLAUDE.md §G.4`)

> El cerebro se critica a sí mismo. Formato: **Defecto → Causa → Corrección**.

### M-01 · Una neurona stale me habría engañado (Memoria Espacial) → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-01]]
### M-02 · Un chequeo del cerebro dio falso negativo (casi asumo mal) → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-02]]
### M-03 · El cerebro no se auto-alimentaba sin recordatorio explícito → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-03]]
### M-04 · Iterar fixes sin verificar la fuente de verdad real (no solo el código de aplicación) → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-04]]
### M-05 · El cerebro debe crecer en dominios ESTRATÉGICOS, no solo operacionales → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-05]]
### M-06 · Afirmé "sin desplegar" con `git rev-list origin/main..HEAD` SIN `git fetch` → `origin/main` local stale → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-06]]
### M-07 · No avisé que el contexto se saturaba — el cliente tuvo que pedirlo al 92% → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-07]]
### M-08 · Evaluar propuestas de "mejora del cerebro" con evidencia, no con entusiasmo (§151) → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-08]]
### M-09 · La Autocrítica debe vigilar la COBERTURA de los reflejos, no solo los errores de ejecución (§152) → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-09]]
### M-10 · Lo verificable va al LINTER que FALLA, no a un reflejo que debo recordar (§153) → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-10]]
### M-11 · "Verifica, no asumas" es UNIVERSAL, no solo RCA de código (recidiva 2026-06-03) → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-11]]
### M-12 · Claude hace TODO el git (commit + push + MERGE dev→main) — el dueño NO toca git (drift RECURRENTE 19/06·27/06·29/06) → detalle en `32-LECCIONES-META.md`
### M-13 · Una "cura" se verifica en la capa que el BOOT lee, con grep — no se declara en el historial (recidiva RECURSIVA 2026-06-09) → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-13]]
### M-14 · "Sesión fresca" de un plan es heurística de PRESUPUESTO, no gate — el corte lo decide el dueño con números reales → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-14]]
### M-15 · Medir el costo de contexto del cerebro = `.length` de JS sobre los bytes crudos, NO `wc -m` ni "líneas × N" ⟦OPUS-4.8 · rev-Fable⟧ → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-15]]
### M-16 · El lazo de auto-corrección funciona cuando MECANIZA (gate); es teatro cuando deja el fix en doctrina — la cura de una REINCIDENCIA es un gate, no un reflejo ⟦OPUS-4.8 · rev-Fable⟧ → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-16]]
### M-17 · Cuando el pedido LITERAL del dueño contradice el historial verificado, NO construyas a ciegas — interpreta por evidencia (el RESULTADO, no el mecanismo) y prefiere opt-in sobre imponer ⟦OPUS-4.8 · rev-Fable⟧ → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-17]]
### M-18 · Un `firebase deploy` JAMÁS es paso del dueño — los deploys los ejecuto YO (§1); el dueño solo DECIDE ⟦OPUS-4.8⟧ → detalle en `32-LECCIONES-META.md`
### M-19 · No construyas lo NUEVO encima de lo VIEJO roto sin limpiarlo — TODO-35 deferido ×N → el código viejo rompió EN VIVO ⟦OPUS-4.8⟧ → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-19]]
### M-20 · Un HIT de grep/search prueba que el patrón está PRESENTE, no QUÉ HACE el código — leer la semántica del match antes de construir encima ⟦OPUS-4.8⟧ → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-20]]
### M-21 · "Validado E2E" del HAPPY-PATH no es validado — un paso que se porta RARO en la validación es señal de bug (no nuisance); entidad con CICLO DE VIDA → frontera obligatoria = cerrar/finalizar/reabrir + REPETIR la acción + ambos lados ⟦OPUS-4.8⟧ → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-21]]
### M-22 · El cerebro documenta ESTRUCTURA pero no verifica REALIDAD — "✅" conflaciona DISEÑADO/DECIDIDO/CONSTRUIDO/DESPLEGADO/VERIFICADO-LIVE (auditoría §257) ⟦OPUS-4.8⟧ → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-22]]
### M-23 · Mi validación verifica que FUNCIONE, no que se VEA BIEN — Chrome(DOM) + caza-bugs cazaron CERO defectos de diseño; el dueño los cazó TODOS a ojo ⟦OPUS-4.8⟧ → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-23]]
### M-24 · Construí maquinaria NUEVA compleja cuando ya existía una solución simple A LA MANO — el dueño: "tienes las cosas visibles a la mano e hiciste algo mas complejo" ⟦OPUS-4.8⟧ → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-24]]
### M-25 · El cerebro PIERDE MEMORIA cuando el MISMO hecho vive en registros que se CONTRADICEN ⟦OPUS-4.8⟧ → detalle en `32-LECCIONES-META.md` ⇒ **migrada al maestro**: [[CARS:M-25]]
### L-20 · Preview local del sitio estático: `http-server` con RUTA ABSOLUTA + valida colores con estilos computados (no screenshots) → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-20]]

### L-21 · Migrar un cuerpo legacy a cinematic: fija `background` + estados (`:hover`), no solo `color` → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-21]]

### L-22 · "Un azul que no sé de dónde sale" — paleta oscura FRÍA con hardcodeados dispersos (§150) → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-22]]

### L-23 · La regla universal `* { max-width:100% }` (style.css:6450) COLAPSA el `width` explícito de elementos `position:absolute` → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-23]]

### L-54 · Un flex `fixed`/`absolute` SIN `width` anclado a un solo borde COLAPSA a su contenido (`max-width` no otorga ancho); verifica con viewport de ancho REAL (headless da `innerWidth:0`) → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-54]]

### L-55 · UI con `transition` en el preview headless: el valor animado queda congelado en el inicio → neutraliza transiciones (`*{transition:none}`) y lee end-states; y tabulabilidad por-breakpoint va por CSS `visibility`, no `inert` por JS → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-55]]
### L-56 · Sidebar de filtros ALTO: `position:sticky` sin tope RECORTA su mitad inferior (→ `static` que fluye, sin barra propia); y toggle-breakpoint ≠ colapso-breakpoint = franja muerta sin botón → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-56]]

### L-24 · Un enlace `?param=` solo filtra si la página destino LEE el param — y el filtro puede YA existir con otro nombre → detalle en `33-LECCIONES-FRONTEND.md`

### L-25 · Un `<footer>`/`<header>` de sección hereda chrome GLOBAL por selector de ELEMENTO → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-25]]

### L-26 · Trigger Firestore de ingestión: `merge:true` pisa campos first-seen + el mark de idempotencia DEBE ir en la transacción ⇒ **migrada al maestro**: [[CARS:L-26]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-27 · App admin greenfield (Vite + Firebase modular) en paralelo: namespacing + estado compartido entre módulos ⇒ **migrada al maestro**: [[CARS:L-27]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-28 · Verificación de UI: `preview_screenshot` se cuelga tras `preview_resize` (o con `backdrop-filter` pesado) — verifica con snapshot + eval → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-28]]

### L-29 · CRM: lead ≠ deal (oportunidad) + drag-drop SIEMPRE con alternativa accesible
- **Disparador**: construir un Pipeline/embudo de ventas (CRM Fase 3, §160).
- **Modelo (patrón de los líderes)**: la **Bandeja trabaja `leads`** (interés entrante, triage); cuando un lead se califica se **convierte en `deal`/oportunidad** (colección aparte) que vive en el **Pipeline**. NO mezclar ambos en una colección con un campo `stage` — leads (pre-venta) y deals (venta activa) tienen ciclos distintos. La conversión marca `lead.status='convertido'`+`convertedTo.dealId` (cero pérdida de rastro). Es aditivo (colección nueva) = bajo riesgo de revertir.
- **A11y del kanban**: el drag-drop HTML5 **no es accesible por teclado**. SIEMPRE acompañarlo de una alternativa (menú "Mover a etapa" por botón/popover) — misma ruta de código (`updateStage`), verificable sin simular DnD. WCAG + testeable.
- **Forecast**: ponderado = Σ(monto × probabilidad de la etapa), aritmética pura en el dominio (sin ML). Verificable a mano en `?mock=1` (cazó que el recálculo de probabilidad al mover etapa estuviera bien: 35%→80% sobre $95M = +$42,75M).
- **Meta**: routing multi-sección = montar/desmontar módulos en el outlet con **cleanup del anterior** (cancela `onSnapshot`) + cerrar overlays (360) al cambiar de sección. En modo mock, un store compartido (`MOCK_DEALS`) hace que la conversión desde la Bandeja persista al navegar al Pipeline.

### L-30 · Calendario: `dayKey` LOCAL (no UTC) + range+orderBy del mismo campo = índice AUTOMÁTICO ⇒ **migrada al maestro**: [[CARS:L-30]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-31 · Captura manual de leads = REUSAR la ingestión (escribir el doc de entrada), no duplicar dedup/consent en el cliente
- **Disparador**: agregar entrada MANUAL de leads (canales externos Meta/WhatsApp/TikTok/llamada/walk-in) a un CRM que ya tiene una capa de ingestión automática (CRM §162). El cliente lo señaló: la mayoría de leads de un concesionario NO entran por la web.
- **Receta**: en vez de escribir el canónico directo desde el cliente (replicando dedup por email/teléfono + consentimiento + creación de actividad — riesgo de drift con el normalizador server-side), el formulario manual **escribe un documento de ENTRADA** (`solicitudes` con `origen:<canal>` + `consentGiven`) → el **trigger de ingestión existente lo normaliza** con TODA su lógica (dedup, Habeas Data, activity, dead-letter). Cero backend nuevo, cero deploy de reglas/índices (la colección de entrada ya acepta `create`), single-source-of-truth del dedup. El lead aparece solo en la Bandeja vía `onSnapshot` (lag ~1-2s del trigger, aceptable).
- **Atribución para ROI**: capturar **canal + orgánico/pauta + campaña** en el form (→ `tags`/`source`) desde el día 1, aunque los Reportes vengan después — el dato se pierde si no se captura cuando entra.
- **Meta**: el modo mock no tiene trigger → ahí sí se escribe el lead "canónico" local (`addMockLead`) + un evento `leads-dirty` para refrescar la Bandeja. Dos caminos (real=ingestión, mock=directo) detrás de la misma UI.

### L-32 · Dashboard de reportes: agregación CLIENTE $0 + SVG namespaced + dominio reusado (sin librería) ⇒ **migrada al maestro**: [[CARS:L-32]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-33 · Reusar un panel de detalle lead-céntrico desde un directorio de personas (Contactos §166)
- **Disparador**: construir una lista/directorio de `contacts` cuando la ficha de detalle (Customer 360) ya existe pero está **acoplada a un lead** (`store.detailLeadId` + busca el lead en `store.leads`).
- **Receta**: NO reescribas el 360. Desde el directorio (1) carga `contacts` + `leads`, (2) mapea contacto→lead más reciente (`lead.contactId`), (3) al hacer clic en una persona CON lead, **espeja los leads al store y abre la ficha en un set ATÓMICO**: `store.set({ leads: ui.leads, detailLeadId: lead.id })` (L-27; un solo `set` evita estados intermedios). El 360 recalcula su score él mismo → un lead "pelado" (sin enriquecer) funciona igual.
- **Persona SIN lead** (p. ej. suscriptor de newsletter): NO la pintes como botón que no abre nada → **fila informativa NO interactiva** (`<div>`, no `<button>`); toda su info ya está visible. Anti falso-affordance (a11y).
- **Datos**: ordena el directorio por un campo **SIEMPRE presente** (`createdAt`), no por `lastActivityAt` (Firestore EXCLUYE del `orderBy` los docs que no tengan el campo → pérdida silenciosa). Campo único → índice automático (L-30).
- **Meta-verificación**: si una rama (la fila `<div>` sin lead) NO se ejercita con el mock actual (porque todos los mocks derivan de un lead), **añade un dato que la dispare** (un suscriptor sin lead) y compruébala — no la des por buena leyendo el código (§3.3). Solo un módulo se monta a la vez (teardown por ruta) → espejar `store.leads` desde Contactos no colisiona con la Bandeja.

### L-34 · Triar hallazgos de review/comité contra el CÓDIGO REAL (la mayoría de "high" son falsos positivos) ⇒ **migrada al maestro**: [[CARS:L-34]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-35 · Verifica el MECANISMO antes de construir sobre él (el "hook que bloqueaba" no existía) + escape del pre-commit ⇒ **migrada al maestro**: [[CARS:L-35]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-36 · La deliberación "perdida" NO es irrecuperable: transcripts JSONL del harness (ruta de salvamento) ⇒ **migrada al maestro**: [[CARS:L-36]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-37 · Un rediseño que ELIMINA/renombra clases rompe los callsites JS que las buscan (catch real de §3.2) → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-37]]

### L-45 · El SSG horneado DESPOJA ids del `<head>` (ej. `<title id="pageTitle">`) de los que depende el JS inline → null-deref aborta el render → detalle en `33-LECCIONES-FRONTEND.md`

### L-46 · Inyectar una 2ª global `window.X` en el MISMO `<script>` que otra rompe el gate `SSG_SELFTEST` (split `;</script>` arrastra la 2ª asignación) → detalle en `33-LECCIONES-FRONTEND.md`

### L-51 · Recuperación de borradores "pro" SIN reabrir un autosave rechazado: separar borrador-deliberado de red-de-seguridad-local (opt-in, scoped por uid) → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-51]]

### L-52 · Antes de replicar un script de KERNEL acoplado a convenciones ×cerebros, VERIFICA la convención de cada destino — un copy byte-idéntico que no aplica = no-op silencioso = falsa cobertura (M-10) ⟦OPUS-4.8⟧ ⇒ **migrada al maestro**: [[CARS:L-52]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-47 · En reglas Firestore, `resource.data.X` de un campo AUSENTE **LANZA** (no es null) — guardar con `('X' in resource.data)` ⟦OPUS-4.8⟧ ⇒ **migrada al maestro**: [[CARS:L-47]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-48 · Sesión concurrente multi-chat: un `git add -A` en otro chat arrastra tu edit sin commitear a SU commit → detalle en `31-LECCIONES-GIT.md` ⇒ **migrada al maestro**: [[CARS:L-48]]

### L-38 · `billing disabled` tumba las 27 functions — pero Eventarc RE-ENTREGA al recuperarse (outage corto ≠ pérdida) ⇒ **migrada al maestro**: [[CARS:L-38]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-39 · Un GET público linkeado por WhatsApp/email JAMÁS debe mutar estado (los previews lo disparan solos) ⇒ **migrada al maestro**: [[CARS:L-39]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-40 · Firestore `set(..., {merge:true})` NO borra claves de mapas omitidas — y liberar recursos compartidos exige verificar PROPIEDAD ⇒ **migrada al maestro**: [[CARS:L-40]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-41 · El "censo literal de escritores" para una whitelist de Rules debe incluir los escritores INTERNOS (admin/staff), no solo los públicos ⇒ **migrada al maestro**: [[CARS:L-41]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-42 · Al portar un módulo cuyo docId es un slug derivado, REPLICAR el regex EXACTO del clásico (no el slugify "mejorado" del portal) ⟦OPUS-4.8⟧ ⇒ **migrada al maestro**: [[CARS:L-42]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-76 · Clean-slate de datos CRM = barrer el lead-lifecycle completo (no las colecciones literales de la vista); Admin-SDK+ADC + backup→delete ⟦OPUS-4.8⟧
- **Causa**: "purgar Bandeja/Reportes" parece `leads`+`deals`, pero borrar solo eso deja huérfanos (`activities`/`contacts` en Dashboard/Contactos) y peor: las `solicitudes` **resucitan** los leads en un reproceso (la ingestión las lee). Conjunto coherente = `leads·deals·activities·contacts·solicitudes·dedup·failedIngestions` (dedup va PAREADO con contacts: si no, un lead real futuro se dedup-ea contra un contacto borrado).
- **Receta**: data-op server-side con script `firebase-admin`+**ADC** (salta las rules; el client-SDK del repo NO puede leer/borrar `leads`). SIEMPRE **backup→delete** gated tras `--delete` (backup a `backups/`, gitignored) y verificar 0 al final. El **clasificador bloquea el mass-delete de prod = segunda llave** (alinea TODO-30 Doble-Llave) → confirmar ALCANCE con el dueño antes (no inferir scope ancho de una orden general). Patrón portable ×4 cerebros.

### L-57 · La PII DESNORMALIZADA sobrevive a la supresión-por-grafo — púrgala buscando por el campo de REFERENCIA, no por el id del dueño ⟦OPUS-4.8⟧
- **Síntoma/causa** (TODO-50 fase 2c, §LEGAL-07): la supresión Ley 1581 (`executeSuppression`) borra el contacto y re-apunta su grafo por `contactId`. Pero el nombre del consignante se DESNORMALIZA (congelado en `deals.commissionSnapshots[].frozenTenancy.ownerDisplayName` + `vehiculos.tenancy.ownerDisplayName`) y se referencia por **`ownerRefId` ≠ `contactId`** (el `deal.contactId` es el COMPRADOR) → la supresión-por-grafo NUNCA lo alcanza = **PII fosilizada filtrada** (la cazó el reflejo caza-bugs leyendo el reporte `fetchDealerStats`, no el diff).
- **Receta**: PII desnormalizada → purga TODAS las copias en un barrido APARTE por el **campo de referencia** (`ownerRefId`). Firestore no consulta dentro de array de mapas → barrido paginado COMPLETO de deals (cubre won-luego-anulado). Idempotente (skip-if-sentinel) + **soft-redact** server-side (Admin SDK bypasea la inmutabilidad lógica): conserva `ownerRefId` opaco + economics (Cód.Comercio art.60), purga SOLO el nombre (art.8e). NO crypto-shredding.
- **Meta (verifica al consejo + comité de DOMINIO):** (a) la revisión 4-lentes cazó un gap real (`snapshotEntriesRedacted` faltaba en auditLog) pero **alucinó** un `firestore.indexes.json` inexistente → verifica todo claim (query de igualdad anidado = auto-indexado). (b) un comité LEGAL ×5 vs `.gov.co` cazó un gap PROBATORIO que el code-review NO ve: borrar el contacto mataba `contractRef` → snapshot económico HUÉRFANO (no reconciliable, C.Co. art.60 + E.T. art.632 + Ley 1581 art.12) → fix C1 = rescatar el contrato al auditLog antes de borrar. **Para CUMPLIMIENTO corre el comité del DOMINIO, no solo code-review** (el requisito de RECONSTRUCCIÓN no es un bug). Detalle → `42-LEGAL §Certificación`.

### L-60 · SVG inline hijo-flex directo colapsa a `width:0` sin `flex:0 0 auto` (mide vivo, no confíes en la regla) → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-60]]
### L-66 · Contraste/rol a11y: MIDE la cascada viva (el ganador de especificidad ≠ el token que dice la spec) · `role=menu` es un contrato (exige `menuitem`; barra de acciones = `toolbar`) → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-66]]
### L-67 · Hero de CSS `background-image` = trampa de LCP (descubierto tarde, sin `fetchpriority`, no usa el preload responsivo) → usar `<img>`/`<picture>`; verifica el LCP con TRACE real, no con el observer del preview → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-67]]
### L-68 · Ancla de `.replace()` que cruza `\n` falla EN SILENCIO en Windows (CRLF): `marca.html` se checkoutea con CRLF (`autocrlf`) y un ancla con `\n` literal no matchea → no-op, 0 globals (CI/LF ok); usa regex `\r?\n` o ancla de una sola línea + guard que valide el anchor EXACTO del `.replace()`, no un substring suelto → detalle en `31-LECCIONES-GIT.md` ⇒ **migrada al maestro**: [[CARS:L-68]]
### L-69 · El "hueco" de grilla (§283) es DENTRO de la tarjeta corta (grid `stretch` + footer `margin-top:auto`), NO entre tarjetas; el masonry (`columns`) NO generaliza — reordena a columna-mayor → rompe listas ordenadas (auditoría panel = 0/10 APPLY-SAFE, §292). "Un fix es local hasta demostrar lo contrario" → detalle en `33-LECCIONES-FRONTEND.md` ⇒ **migrada al maestro**: [[CARS:L-69]]
### L-70 · Overflow móvil en filas flex/grid + cómo auditarlo (TODO-52 P0, §294) ⟦OPUS-4.8⟧: en una fila `flex-wrap:wrap` [fijo][main `flex:1;min-width:0`][precio][acciones], flex ENCOGE main a ~0 para meter todo en 1 línea (encoger precede a envolver) → el contenido de main (título) desborda. Fix: `main { flex-basis: calc(100% - <fijo> - gap) }` (o `min-width:%`) → main llena la 1ª fila, el resto envuelve debajo. Análogo: grid con cols FIJAS + col `auto` (no encoge) desborda aunque el contenido sea `minmax(0,1fr)` → achica gap/padding en móvil (§294 Bandeja). **Auditar overflow por DOM**: la señal fiable es `documentElement.scrollWidth-clientWidth` (overflow de PÁGINA); por-elemento da FALSOS POSITIVOS en scrollers intencionales (kanban `overflow-x:auto`) → excluye si un ancestro tiene `overflow-x:auto/scroll`. Mide con viewport EXPLÍCITO (`preview_resize` a WxH concreto; el preset nativo dio 0×0 → todo "desborda"). ⇒ **migrada al maestro**: [[CARS:L-70]] · cuerpo en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo)
### L-71 · Commit en HEAD DESPRENDIDO (tras resume) queda COLGANTE, no llega a `dev`/`main` ⟦OPUS-4.8⟧: `git commit` imprime `[detached HEAD]` (no `[dev]`), el `push origin dev` es no-op y el `checkout dev` REVIERTE tu edit del working tree. `git rev-parse HEAD` no revela el detached → verifica `git rev-parse --abbrev-ref HEAD`==`dev` ANTES de commitear; recupera el colgante con `git merge --ff-only <hash>` desde dev → detalle en `31-LECCIONES-GIT.md` ⇒ **migrada al maestro**: [[CARS:L-71]]
### L-72 · "¿Este mes/rango tiene datos?" — cuenta lo del rango VISIBLE, no el `length` del store global ⟦OPUS-4.8⟧: un empty-state con `!store.items.length` FALLA si el store RETIENE datos de otros rangos al navegar (Agenda: `ui.events` guarda citas de meses previos; la grid filtra por día → un mes vacío tiene `ui.events.length>0` → el empty no aparecía). Cuenta los que caen en el rango visible (`weeks.some(cell.inMonth && byDay[key].length)`). Bug cazado en la verificación LIVE de §295 (mes vacío mostraba grid en vez del empty). Emparentado con el patrón CSS `:has()`/`:not(.is-out)` para ocultar ítems vacíos (§295). ⇒ **migrada al maestro**: [[CARS:L-72]] · cuerpo en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo)

### L-73 · Dinero + listeners = JAMÁS decidir en automático sobre una foto incompleta (origen bersaglio §181, 2026-07-10) ⟦FABLE-5⟧ ⇒ **migrada al maestro**: [[CARS:L-73]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-74 · Sinapsis bersaglio→cars: 4 gotchas Firebase/dinero importados (auditoría cross-cerebros §300, 2026-07-10) ⟦FABLE-5⟧ ⇒ **migrada al maestro**: [[CARS:L-74]]
Cuerpo íntegro en `/_legacy/LECCIONES-MIGRADAS-MAESTRO.md` (raíz del repo · punto de retorno del ABORT).

### L-75 · Sinapsis bersaglio r2 — minería de recursos: método + patrones twenty para el CRM + callejones (bersaglio §183, 2026-07-10) ⟦FABLE-5⟧
- **Método de minería**: la PREMISA de un recurso se comprueba ANTES de gastarle agentes (un ZIP "de skills" resultó ser un CLI de vercel-labs); todo hallazgo entra como hallazgo→aplicación→neurona dueña, con spot-check propio. Síntesis completa → `..\bersagliojewelry.github.io\docs\mineria-recursos-2026-07-10.md` (fuente twenty: `C:\Users\romad\Downloads\twenty-main`, verificada hoy).
- **Patrones twenty (~30k★) para el CRM — triage vs lo YA construido**: cars YA cumple lead=objeto delgado por relaciones (L-29 lead≠deal) · timeline `activities` · row-level dataScope (§267) · permisos por capacidad (82 flags RBAC §272) · dedup tel/email en la ingestión. **NETO nuevo, adoptar al tocar `contacts`/dashboard**: (a) bersaglio §183/T-2 — `telefonos[]`/`emails[]` como arrays `{valor, label, esPrimario}`, nunca string plano (verificado hoy: `normalize.js` usa `phone`/`email` singulares); (b) T-24/T-25 — dashboard = lista de widgets `{query+operación}` · toda acción de aprobación estampa actor `{uid, nombre, fuente ∈ MANUAL|WEBHOOK|SISTEMA}` (el campo `fuente` es lo que cars aún no estampa).
- **Paid-media (leads Meta/WhatsApp)**: doctrinas minadas importadas a la skill `meta-ads-diagnostico §Doctrinas minadas` (global + espejo repo): tracking-PRIMERO · "hoy" es parcial · fatiga creativa · umbral de evidencia ~3×CPA/100 clics · pujas Google C-9 · STRATEGY.md C-11.
- **n8n (pack Divisual, `C:\Users\romad\Downloads\RECURSOS CLAUDE`)**: 2 workflows con encaje real (Agente WhatsApp leads · Agente Google Reviews/GBP) — bersaglio lo PARQUEÓ (infra externa, operadora no técnica); si cars lo evalúa = **Decisión Fuerte propia (W-11)**, no adopción de pasada.
- **🚫 Callejones ya probados ×hermanos (no gastar agentes)**: `skills-main` = CLI de vercel-labs, NO catálogo de skills · `adspirer` = wrapper de MCP DE PAGO, redundante con `meta-ads-diagnostico` — NO instalar · `impeccable v3.9.1` descargada NO reemplaza la instalada (linaje distinto; la instalada trae refs de teoría que la nueva no tiene).

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
