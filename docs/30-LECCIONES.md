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
- **Síntoma**: en `localhost:3000`, consola llena de `403 (Forbidden)` / `requests-from-referer-http://localhost:3000-are-blocked` (Auth, Installations, Analytics) + login admin falla.
- **Causa**: la API key tiene restricción de HTTP referrer (solo `altorracars.github.io` + dominios Firebase), no `localhost`. Es seguridad funcionando bien.
- **Ampliación (E2E §175, 2026-06-09)**: el bloqueo también tumba **App Check** (`appCheck/throttled` 403 con backoff de 1 DÍA) e Installations; el submit del form de contacto en preview local ni siquiera completó. **E2E de captura/forms = SOLO contra el dominio live** (`main`); para verificar lógica de UI sin red, stubear `window.db` en el preview (probado §175: stub de `.add()` resuelto ejercita el handler real).
- **Implicación de prueba**: en localhost NO se prueba login/Auth ni writes de formularios. Lo que SÍ: archivos (0 `404`), Firestore público de LECTURA, render, snippets.

### L-43 · La ADC de esta máquina está ligada a `bersaglio-jewelry` → scripts Admin SDK contra `altorra-cars` dan `PERMISSION_DENIED` (IAM, NO rules) ⟦OPUS-4.8 · rev-Fable⟧
- **Síntoma**: `node functions/<script>.mjs` (Admin SDK + ADC) contra altorra-cars aborta con `7 PERMISSION_DENIED: Missing or insufficient permissions`, aunque el MISMO patrón corre bien en bersaglio (`backfill-claims.mjs`).
- **Causa (verificada §215)**: `~/AppData/Roaming/gcloud/application_default_credentials.json` trae `quota_project_id: bersaglio-jewelry` y `gcloud auth list` = sin cuentas → la ADC se montó SOLO para bersaglio; ese principal no es IAM-member con acceso Firestore en altorra-cars. El Admin SDK **BYPASSA las security rules** → un `PERMISSION_DENIED` del Admin SDK es SIEMPRE IAM del principal, jamás reglas.
- **3 planos de auth (no confundir, L-23)**: (1) `firebase login` (CLI deploys, `altorracarssale@`) ≠ (2) **ADC** (lo que usa el Admin SDK en scripts `node`) ≠ (3) security rules (irrelevante para Admin SDK). Un script `node` standalone usa (2), no (1).
- **Receta**: para correr un script admin contra altorra-cars desde esta máquina, el dueño re-autentica ADC con cuenta autorizada: `gcloud auth application-default login` + `gcloud auth application-default set-quota-project altorra-cars`. **Alternativa preferible** para mutaciones de prod (callejón e + precedente `seedSystemRoles`): empaquetar el backfill como **callable 1-clic** (corre con la SA de Functions, sin ADC ni terminal).

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
- **Defecto** (reportado por el cliente): los Reflejos §G.4 eran principios descriptivos, no checklist — al cerrar tareas se omitía la consolidación ("lo documento después" → nunca).
- **Corrección**: **Reflejo de Cierre (§G.4)** — checklist enforzable ANTES de declarar lista una tarea (10/05/99/00/30/cache/brain:check); si falta algo, NO está cerrada (ADR §123). **Principio**: lo crítico se convierte en checklist accionable en el momento exacto donde falla, no en doctrina de arranque.

### M-04 · Iterar fixes sin verificar la fuente de verdad real (no solo el código de aplicación)
- **Defecto**: durante SP-5.0 rastro saga, las primeras 3 rondas (c, d, e) iteraron sobre el código de aplicación (`historial-visitas.js`, `home-carousels.js`) asumiendo que el bug era ahí. Cada round failed porque la causa raíz real estaba en **el service worker** (stale-while-revalidate servía código viejo en páginas de detalle). Ronda 4 (SP-5.0.f) cazó el bug solo cuando LEÍ el SW.
- **Causa**: §19 RCA dice "verificar leyendo el código antes de tocar". Pero "código" lo interpreté como "código de aplicación" — olvidé que el SW, la cache strategy, la configuración del hosting, son TAMBIÉN parte del sistema donde puede esconderse la causa raíz.
- **Corrección**: §19 RCA se debe leer "la fuente de verdad real" — no solo el código que parece relevante. Antes de iterar fixes en un módulo, verifica también: SW strategy, cache headers, CDN config, build pipeline. Si el bug persiste tras 2 hipótesis fallidas en un módulo, mira FUERA del módulo (infraestructura). Cierra el bucle: §G.2 Trigger de Error (si fallas 2× el mismo bug) ahora debe incluir "verificar infraestructura/cache/SW", no solo "leer §NN en el historial".
- **Principio**: cuando iteras un fix y el bug persiste, el bug probablemente NO está donde estás mirando. Cambia el lente, no la profundidad. ADR §124.

### M-05 · El cerebro debe crecer en dominios ESTRATÉGICOS, no solo operacionales
- **Defecto**: el cerebro acumulaba memoria operacional pero NO análisis especializado (seguridad/legal/UX/SEO/perf/a11y) — cada sesión re-investigaba esos dominios desde cero.
- **Corrección (ADR §125)**: Trigger 🔵 + registry de Lóbulos (`40-LOBULOS-DOMINIO`) + skills externas. Skills = framework genérico; lóbulos hijos (`41`, `42`…) = findings proyecto-específicos, nacen on-demand CON contenido real (anti-patrón rechazado: neuronas vacías "para preparar el terreno" — viola anti-fragmentación §G.4).

### M-06 · Afirmé "sin desplegar" con `git rev-list origin/main..HEAD` SIN `git fetch` → `origin/main` local stale
- **Defecto**: le dije al cliente que su trabajo (simulador) NO estaba desplegado, basándome en `git rev-list origin/main..HEAD = 1`. Pero el `origin/main` LOCAL estaba desactualizado (no hice `git fetch`); el cliente YA había pusheado. Afirmé un estado de despliegue FALSO; el cliente me corrigió ("esto es falso ya hice todos los commit y git push").
- **Causa**: asumí que `origin/main` local reflejaba el remoto. Las refs `origin/*` locales solo se actualizan con `fetch`/`pull`; un `git push` del cliente NO actualiza mi copia local.
- **Corrección**: NUNCA afirmar estado de despliegue/remoto desde refs `origin/*` locales sin `git fetch` primero (o sin que el cliente confirme). Working tree limpio + commits locales NO dicen nada del remoto. Ante "¿está desplegado?": fetch o preguntar.
- **Principio**: RCA §19 ("verificar, no asumir") aplica también a GIT — las refs remotas cacheadas son fuente de verdad STALE. No es código, pero es igual de traicionero.
- **⚠️ REINCIDENCIA (SP-5.3 §146, 2026-05-31)**: volví a caer. Afirmé al cliente "todo tu cinematic está encerrado en la rama, fuera de producción" cuando **6 PRs (#771–#777) ya lo habían desplegado**. Agravante nuevo: esta vez la fuente de mi error no fue solo `origin/*` stale, sino que confié en el heartbeat **`05` ("Producción = §140")** como autoritativo — pero **`05` es TAMBIÉN un cache que driftea**: yo lo venía escribiendo "§14X SIN commit / pendiente merge" en cada ADR sin reconciliar contra el remoto, mientras el cliente mergeaba cada PR en silencio. **Doble regla reforzada**: (1) el cliente commitea/pushea/**mergea** sin avisar → el remoto cambia bajo mis pies; (2) la fila "Producción" de `05` NO es autoritativa para estado de despliegue — **`git fetch` + `git log origin/main` SIEMPRE antes de afirmar qué hay en prod**, y reconciliar `05` con ese resultado real. Lo descubrí de pura suerte (hice fetch para planear un merge que ya estaba hecho). Si el cliente dice "ya commiteé todo", asumir que también pudo desplegar.

### M-07 · No avisé que el contexto se saturaba — el cliente tuvo que pedirlo al 92%
- **Defecto**: la sesión creció enorme (§131→§138, varios sprints encadenados + decenas de lecturas/edits grandes) hasta 92% de la ventana de contexto. El cliente me avisó él ("el contexto está saturado y nunca me notificaste"). No monitoreé ni propuse cortar.
- **Causa**: no hay señal directa del % de contexto, pero la INDIRECTA (sesión larguísima, muchos sprints seguidos, archivos de miles de líneas) era evidente. Debí sugerir vaciar tras 2-3 sprints grandes.
- **Corrección**: en sesiones largas (varios ADRs/sprints encadenados), proponer proactivamente un punto de corte: "llevamos N sprints; conviene vaciar el chat y seguir en ventana nueva — el cerebro preserva el contexto". Mantener `05`/`10` al día en cada cierre para que vaciar sea barato.
- **Principio**: la continuidad vive en el cerebro, NO en la ventana de chat. Proponer el corte ANTES de saturar, no esperar al 92%.

### M-08 · Evaluar propuestas de "mejora del cerebro" con evidencia, no con entusiasmo (§151)
- **Disparador**: el cliente o una IA externa propone reformar la arquitectura del cerebro (nuevos reflejos, métricas, nodos). Tentación: adoptar todo lo que "suena inteligente".
- **Defecto a evitar**: propuestas que (a) usan pseudo-métricas ("IQ", "entropía" por contador de turnos), (b) ignoran lo que el cerebro YA tiene (reinventan/duplican → fragmentación), (c) violan los topes (§G.5) inflando `CLAUDE.md`/`05`. La de §151 hacía las tres.
- **Receta**: (1) verificar contra el repo real — ¿ya existe?, ¿cabe en el tope? (grep + `brain:check`, RCA §19). (2) Separar la INTUICIÓN válida del MECANISMO (suele estar mal aunque la intuición sirva: "el contexto se degrada" ✅ pero "contador de turnos" ❌ — la métrica real es % de ventana, detectable por síntoma). (3) Adoptar solo la versión lean que cabe y no fragmenta; rechazar el resto con razón escrita. (4) Números de ROI sin medición → descartar.
- **Principio**: un cerebro equivocado es peor que uno incompleto (§G.4). Proteger topes + no-fragmentación > añadir features. Cuestionar con evidencia ≠ obedecer por entusiasmo (Reflejo de Desafío Crítico §G.4).

### M-09 · La Autocrítica debe vigilar la COBERTURA de los reflejos, no solo los errores de ejecución (§152)
- **Defecto**: el cliente detectó un hueco que yo no vi — faltaba un barrido holístico del cerebro ANTES de cerrar la sesión (los reflejos cubrían arranque + cierre-de-tarea, pero nada PROACTIVO a nivel sesión). Tuve que ser instruido para hacer la auditoría de frescura, en vez de dispararla solo.
- **Causa**: la Autocrítica miraba "¿el cerebro contribuyó a un ERROR?", no "¿mis reflejos CUBREN todos los momentos críticos?". Un hueco de cobertura no es un error visible — es un silencio.
- **Corrección**: §152 extendió el Reflejo de Auto-auditoría a **pre-cierre de sesión** (proactivo). A nivel meta: revisar periódicamente si el SET de reflejos tiene huecos (arranque / por-tarea / pre-cierre / saturación / desafío — ¿alguno sin cubrir?).
- **Principio**: el estado vivo (`05`/`10`) puede divergir de git entre turnos (el cliente commitea/mergea aparte) → vigilar la frescura vs realidad git es responsabilidad MÍA y proactiva, no a pedido.

### M-10 · Lo verificable va al LINTER que FALLA, no a un reflejo que debo recordar (§153)
- **Insight**: mi atención es el componente no-fiable; un script no se distrae ni se cansa. Apilar más reflejos (texto que debo leer+recordar) tiene rendimientos decrecientes. Para CADA error recurrente, preguntar: ¿es chequeable mecánicamente? → va a `brain:check` (un fallo es imposible de ignorar). ¿Es juicio? → reflejo saliente.
- **Aplicado (§153)**: la frescura (cache SW==cache-manager, `05` vigente==SW, origin/main) pasó de "reflejo que olvido" a check determinista. Lo **probé corriéndolo**, no leyéndolo → cazó su propio bug (finder de línea equivocado) + drift real de `origin/main`. Verificar > confiar (§19), también para mi propio código.
- **Límite honesto**: un hueco NOVEDOSO no anticipado no se automatiza — viene de perspectiva externa (cliente / sesión fresca). Por eso el handoff barato + el pre-cierre §152 importan: hacen barato que esa perspectiva entre.

### M-11 · "Verifica, no asumas" es UNIVERSAL, no solo RCA de código (recidiva 2026-06-03)
- **Defecto**: el cliente notó que asumo a veces. Esta sesión: (a) asumí que el repo `skills/` era la fuente de mis skills cargadas (era bundle del entorno, no el repo); (b) iba a afirmar el exit-code de `brain-check` sin leerlo. La regla §3.3 existía pero scopeada a "paths de código" → no me cubrió en hechos de config/estado/capacidades.
- **Causa**: misma raíz que M-02/M-04/M-06 (confiar en el modelo mental en vez de leer la fuente), pero la REGLA estaba demasiado angosta ("solo código") → no disparaba fuera de RCA. Una regla mal-alcanzada falla en silencio.
- **Corrección**: §3.3 generalizada a "evidencia antes de afirmar CUALQUIER hecho" + gate (citar evidencia del turno o decir "no verificado"). Per M-10, lo verificable (huérfanas/frescura/caps) ya vive en `brain:check`; el git/SessionStart hook lo hará automático.
- **Principio**: el ALCANCE de una doctrina es tan importante como la doctrina misma. Y doctrina sola no basta (M-10) → la red dura es el determinismo (linter + hooks); la doctrina es el respaldo.

### M-12 · SIEMPRE entregar summary+descripción de commit al dejar el árbol sucio (recidiva 2026-06-05)
- **Defecto**: el cliente commitea en GitHub Desktop; §2 dice "SIEMPRE entrégale el mensaje listo" — pero REPETIDAMENTE cerré turnos con docs/código modificados diciendo "commitéalo cuando quieras" SIN el mensaje. El cliente lo señaló molesto ("SIEMPRE OLVIDAS").
- **Causa**: tratar el mensaje de commit como paso opcional/posterior, no como parte obligatoria de TODO turno que ensucia el árbol. Familia de M-03 ("lo documento después").
- **Corrección (regla dura)**: si al cerrar un turno `git status` no está limpio (código o docs), el turno NO está completo hasta entregar **summary + descripción** listos para pegar. Parte del Reflejo de Cierre §G.4.
- **Principio**: el cliente NO redacta mensajes de commit — se los doy SIEMPRE. Cambio sin su mensaje = trabajo a medias para él.

### M-13 · Una "cura" se verifica en la capa que el BOOT lee, con grep — no se declara en el historial (recidiva RECURSIVA 2026-06-09)
- **Defecto**: el ADR §171.7 declaró "añadí el Reflejo de Captura de Deliberación a §G.4" — pero `grep CLAUDE.md = 0 matches`. La cura vivía SOLO en §171 (historial on-demand que un boot fresco NUNCA lee, §G.1). El comité de Validación Final (Mandato 3, §172) lo cazó y se NEGÓ a certificar.
- **Causa**: declarar un reflejo "en §G.4" sin verificar que está en el archivo always-on. La falencia raíz del proyecto, RECURSIVA: sobre-declarar una cura ES el mismo M-10 ("presencia vendida como fidelidad") que el proyecto vino a matar.
- **Corrección (regla dura)**: la cura de una falencia de DOCTRINA se VERIFICA con `grep` en la capa que el boot carga (`CLAUDE.md`/§G), no en `99`/specs on-demand. Un ADR que diga "añadido a §G.4" exige el grep que lo pruebe EN EL MISMO TURNO. Familia de M-02/M-04 (verifica-no-asumas) + M-10 (anti-teatro).
- **Principio**: un gate de validación que puede decir NO y bloquear su propio cierre es el único que vale; si certifica por cortesía, es teatro.

### M-14 · "Sesión fresca" de un plan es heurística de PRESUPUESTO, no gate — el corte lo decide el dueño con números reales
- **Defecto (2026-06-12)**: recomendé cerrar la sesión citando la nota de plan "vehicles = épica en SESIÓN FRESCA" cuando quedaba ~50% del presupuesto real y CERO síntomas de degradación. El dueño lo señaló: "recomiendas cerrar cuando no debe ser, porque cuando va en 800k no dices nada". Inverso exacto de M-07 (no avisé al saturar) — ambos son el MISMO defecto: decidir el corte sin medir.
- **Corrección**: una nota "sesión fresca" se escribió para proteger presupuesto; si al llegar el momento el presupuesto SOBRA, la nota no aplica. Protocolo: medir (presupuesto restante + síntomas §G.2), DECIR los números al dueño, y que ÉL decida el corte. Ni cerrar por nota de plan ni callar al saturar.

### M-15 · Medir el costo de contexto del cerebro = `.length` de JS sobre los bytes crudos, NO `wc -m` ni "líneas × N" ⟦OPUS-4.8 · rev-Fable⟧
- **Disparador**: auditar/des-saturar el cerebro (caps §G.5, presupuesto de boot) exige medir los chars REALES que el linter y el boot consumen — la decisión de shard/GC depende del número.
- **Defecto a evitar**: `wc -m` depende del locale y no cuenta `\r` de forma fiable; estimar "líneas × N" es ruido. El kernel `brain-check.mjs` mide `txt.length` (JS, sin normalizar) → ESA es la unidad canónica: en archivos CRLF cuenta CADA `\r` y `\n`; un emoji UTF-8 cuenta como sus code units JS (p. ej. 2).
- **Receta**: medir SIEMPRE con `node -e "console.log(require('fs').readFileSync(f,'utf8').length)"` y comparar contra el cap del manifest (fijado con la MISMA unidad). Mide con la regla del gate que vas a satisfacer, no con otra.
- **Por qué importa (§206)**: el acantilado de `30` se fijó en "58820c = 98%" con `.length`; con `wc -m` el número y la decisión de shard habrían sido otros.

### M-16 · El lazo de auto-corrección funciona cuando MECANIZA (gate); es teatro cuando deja el fix en doctrina — la cura de una REINCIDENCIA es un gate, no un reflejo ⟦OPUS-4.8 · rev-Fable⟧
- **Defecto (auditoría Nivel-2 §207, 2026-06-15)**: la auditoría previa (Nivel-2 del 14/06) marcó el defecto "los nodos de boot 05/10 mienten sobre el estado git" como **REINCIDENTE con meta-lección OBLIGATORIA** — y aun así (a) el defecto siguió vivo al día siguiente y (b) la meta-lección mandada (ESTA, M-16) **nunca se escribió** (la lista paraba en M-15). Doble fallo del lazo: ni el fix ni el corrector-del-fix se ejecutaron. Familia M-06/M-09/M-11/M-13 recurriendo otra vez.
- **Causa raíz (evidencia dura, no impresión)**: el patrón es nítido — TODO lo que el §206 ató a un check del linter (shards, GC del 10, caps) SOBREVIVIÓ y se cerró con `.length`; TODO lo que dejó en "el próximo yo se acordará de reconciliar 05/10" RECAYÓ completo. El honor no escala entre sesiones sin memoria. Es la confirmación EMPÍRICA de **M-10**: el lazo funciona en la medida EXACTA en que mecaniza.
- **Corrección**: (1) cuando una auditoría manda una meta-lección o fix-de-doctrina, ESCRIBIRLO ESE turno (M-03, no "después"). (2) Toda reincidencia (defecto que vuelve pese a tener "corrección" documentada) declara que su cura-por-doctrina FALLÓ → su única cura real es un **GATE en el kernel** (TODO-29: boot/cache-vs-`origin/main`, anclas §G). (3) El gate es cross-repo (kernel ×3) → coordinar con el canon `bersaglio`, jamás cars-only (fork silencioso).
- **Principio**: una reincidencia NO se cura repitiendo la doctrina que ya falló; se cura subiéndola un nivel — de honor a determinismo. Si genuinamente no puede mecanizarse, se marca **[HONOR] explícito + ritual barato**, nunca se finge cobertura.

### L-20 · Preview local del sitio estático: `http-server` con RUTA ABSOLUTA + valida colores con estilos computados (no screenshots) → detalle en `33-LECCIONES-FRONTEND.md`

### L-21 · Migrar un cuerpo legacy a cinematic: fija `background` + estados (`:hover`), no solo `color` → detalle en `33-LECCIONES-FRONTEND.md`

### L-22 · "Un azul que no sé de dónde sale" — paleta oscura FRÍA con hardcodeados dispersos (§150) → detalle en `33-LECCIONES-FRONTEND.md`

### L-23 · La regla universal `* { max-width:100% }` (style.css:6450) COLAPSA el `width` explícito de elementos `position:absolute` → detalle en `33-LECCIONES-FRONTEND.md`

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

---

> Esta neurona crece sola (bajo guía del constructor). Si una lección se vuelve
> doctrina permanente, promoverla a `CLAUDE.md §3`. Si encaja en un § histórico,
> enlazarla. Mantenerla accionable: síntoma → causa → receta.
>
> **📏 Capacidad (CLAUDE.md §G.5): ~350 líneas.** Al acercarse, SHARD por categoría
> → ej. extraer la sección "Git / refactor" a `docs/31-LECCIONES-GIT.md`, registrarla
> en la tabla §0 + `00-INDICE`, y dejar aquí un puntero a la hija. Nada huérfano.
