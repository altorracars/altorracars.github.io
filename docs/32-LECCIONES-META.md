# 🪞 32 — LECCIONES · Meta: autocrítica del cerebro (hija de `30-LECCIONES.md`)

> **Shard de `30` (§G.5, 2026-07-03).** Detalle de los **M-NN** (fallos del propio cerebro /
> Reflejo de Autocrítica `CLAUDE.md §G.4`). En `30` quedan los **stubs `### M-NN`** (título + puntero);
> aquí vive el detalle. Neurona **on-demand**: se lee al hacer post-mortem o cuando un M-NN "suena a visto".

## 🪞 Meta: fallos del propio cerebro (detalle)

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
- **Defecto (SP-5.0)**: 3 rondas iteraron sobre el código de app (`historial-visitas.js`...) asumiendo el bug ahí; la causa real era **el service worker** (stale-while-revalidate servía código viejo). La ronda 4 lo cazó al LEER el SW.
- **Corrección**: "verificar la fuente de verdad real" (§19 RCA) = NO solo el código de app — también SW/cache/CDN/build. Si el bug persiste tras 2 hipótesis fallidas en un módulo, mira FUERA (infraestructura); el Trigger de Error §G.2 lo incluye. **Principio**: cambia el lente, no la profundidad. ADR §124.

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

### M-12 · Claude hace TODO el git (commit + push + MERGE dev→main) — el dueño NO toca git (drift RECURRENTE 19/06·27/06·29/06)
- **Defecto**: le devolví el git al dueño. 19/06 *"los commit/push los haces TÚ"*; 27/06 delegó TAMBIÉN el merge (*"commit + push + merge para que sea más rápido"*); 29/06 RECIDIVA: volví a dejarle el merge → me corrigió, preocupado por la pérdida de memoria. **Causa raíz = META (M-25)**: el hecho vivía en registros que se CONTRADECÍAN (`single_branch`+`MEMORY.md` decían "dueño mergea"; `auto_deploy`+`CLAUDE.md §2`+`05` decían "Claude mergea") → leo el índice de memorias primero → seguí el viejo.
- **Corrección definitiva (29/06)**: Claude hace el pipeline completo `commit+push` + merge `git checkout main && git merge dev && git push origin main && git checkout dev`. El dueño **NO toca git, NUNCA**; si un push a main se bloquea, busco otra vía. Alineé los 6 registros.
- **Principio**: el dueño da VISIÓN y DECIDE (dinero/legal); **NO opera git ni delibera código**. [HONOR]

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

### M-17 · Cuando el pedido LITERAL del dueño contradice el historial verificado, NO construyas a ciegas — interpreta por evidencia (el RESULTADO, no el mecanismo) y prefiere opt-in sobre imponer ⟦OPUS-4.8 · rev-Fable⟧
- **Defecto evitado (§227/TODO-24, 2026-06-22)**: el dueño pidió "borradores con autosave"; el camino obvio era construirlo. El historial verificado (§107) decía que YA lo había quitado por molesto ("no me restaures automáticamente"). Construirlo habría re-litigado una pelea ya perdida = pérdida de **confianza** (su recurso escaso), no un bug técnico.
- **Cómo se cazó**: el comité **ACOTADO** + peer-review cruzado anónimo convergió 4/4 en "estás resolviendo el problema equivocado" — el pedido es el **RESULTADO** (no perder trabajo, sin bugs), NO el **MECANISMO** (autosave-restore). En solitario la propuesta de autosave era convincente; el cruce anónimo la refutó.
- **Principio**: pedido-literal ⊥ historial-verificado = **GATE de interpretación**, no problema de diseño. Resolver por evidencia (o preguntar la disyuntiva resultado-vs-mecanismo) ANTES de codear; ante la duda, **opt-in (ofrecer) > imponer**. Familia M-11 (verifica, no asumas) · §3.3.

### M-18 · Un `firebase deploy` JAMÁS es paso del dueño — los deploys los ejecuto YO (§1); el dueño solo DECIDE ⟦OPUS-4.8⟧
- **Defecto (2026-06-23)**: en el runbook de go-live del EPIC puse `firebase deploy --only functions` como paso numerado **del dueño**. §1 dice explícito "los deploys los ejecuta Claude" — la regla estaba CARGADA (CLAUDE.md auto-load cada sesión) y aun así no la apliqué. El dueño: "esto lo ajustamos hace tiempo y aún fallas".
- **Causa**: confundí "la DECISIÓN de ir-live es del dueño" (dinero/producción, cierto) con "el ACTO de desplegar es del dueño" (FALSO). Familia **M-12** (yo commiteo+pusheo, el dueño solo mergea en web): misma frontera **dueño-DECIDE / Claude-EJECUTA**, ahora trasladada al deploy. Bajo contexto largo una regla always-on no disparó al redactar pasos.
- **Corrección (trigger duro)**: antes de escribir CUALQUIER "pasos/runbook para el dueño", escanear cada paso → si es `firebase deploy` / desplegar / publicar functions·rules = **es MÍO, lo ejecuto yo**. El dueño SOLO: merge `dev`→`main` en web (M-12) · go/no-go · dinero · A/B · gates legales (P4). Config-docs de prod (`_brain.enabled`, `config/altorTTL.enabled`, etc.) = dueño-en-portal o yo-con-su-go, NUNCA vía MCP (callejón e). + §1 endurecido este turno.

### M-19 · No construyas lo NUEVO encima de lo VIEJO roto sin limpiarlo — TODO-35 deferido ×N → el código viejo rompió EN VIVO ⟦OPUS-4.8⟧
- **Defecto (2026-06-23, reportado con capturas)**: construí F1-F3+TTL del bot v2 (dormido, esperando saldo) ENCIMA del Free Core viejo que da respuestas malas, **sin nunca ejecutar TODO-35** (el mecanismo de dead-code que el dueño marcó CRÍTICO por Knight Capital y yo deferí ×N a "sesión fresca"). Peor: F2.b agregó botones que envían TEXTO al motor → el Free Core vivo no los entiende → **"no te entendí" a clientes reales** (`concierge.js:698`). El dueño: "nunca hiciste la skill ni el agente ni la metiste en el workflow… mucho código viejo molestando".
- **Causa**: (a) prioricé features nuevas visibles sobre limpiar/cuarentenar lo viejo; (b) traté TODO-35 como "después" cuando ERA el gate que prevenía justo esto; (c) rompí caza-bugs: no recorrí el camino vivo con el MOTOR ACTUAL (Free Core), asumí el v2 futuro. Familia M-16 (doctrina sin gate = teatro).
- **Corrección**: (1) TODO-35 → 🔴 ACTIVO bloqueante, no "sesión fresca" indefinida. (2) El gate de dead/old-code se DISPARA en el workflow ANTES de cerrar cualquier feature (no opcional). (3) Todo cambio frontend que llega a vivo se prueba contra el motor ACTUAL, no el planeado. (4) Limpiar/cuarentenar lo viejo = parte del DoD, no apilar.

### M-20 · Un HIT de grep/search prueba que el patrón está PRESENTE, no QUÉ HACE el código — leer la semántica del match antes de construir encima ⟦OPUS-4.8⟧
- **Defecto (spec F-6 §2, 2026-06-25)**: una sesión previa grepeó "admin-pwa.js registra un SW" (match real) e INFIRIÓ que existía un SW dedicado del admin que des-registrar en el cutover. Al LEER el archivo (§3.3): `admin-pwa.js:106-122` solo re-registra el SW **PÚBLICO** (`/service-worker.js` scope `/`) — NO hay SW de admin separado. El "fix" planeado (script `getRegistrations()→unregister`) habría MATADO el SW público (roto el offline del sitio).
- **Causa**: confiar en la PRESENCIA del match como si fuera COMPRENSIÓN. Familia M-02/M-11 (verifica-no-asumas); refinamiento: el grep es índice, no entendimiento.
- **Corrección**: antes de basar una decisión (sobre todo cara/irreversible) en un grep-hit, ABRE el archivo y lee qué HACE el código matcheado. Un claim de arquitectura ("hay un SW del admin") exige leer el callsite, no solo que el término aparezca. [HONOR]

### M-21 · "Validado E2E" del HAPPY-PATH no es validado — un paso que se porta RARO en la validación es señal de bug (no nuisance); entidad con CICLO DE VIDA → frontera obligatoria = cerrar/finalizar/reabrir + REPETIR la acción + ambos lados ⟦OPUS-4.8⟧
- **Defecto (§254→§256, 2026-06-26)**: declaré "Hub validado LIVE E2E" tras solo escalar→tomar→responder→llega. El dueño USÓ el Hub y cazó 3 bugs en la frontera que NO recorrí: cliente-finaliza→Hub-no-cierra · cerrado-queda-en-Activos · mensaje-doble. Peor: TUVE el "Finalizar" en las manos en §254, se **CONGELÓ** (confirm nativo), lo anoté como "smell de rediseño" y seguí — el congelamiento ERA la punta del bug.
- **Causa**: caza-bugs aplicado a medias — recorrí el camino feliz y lo llamé "validado"; traté un paso que se portó raro como molestia (no señal); mandé 1 mensaje (no repetí → perdí el doble). La skill marca N→vacío como frontera pero no mapeé "finalizar chat"→esa frontera ni "repetir envío"→idempotencia.
- **Corrección**: (1) skill global `caza-bugs` endurecida — un paso que se porta raro = **STOP+investiga** (nunca "anotar y seguir"); entidad con ciclo de vida → frontera = crear→…→**CERRAR/finalizar→reabrir** + **repetir la acción** + recorrer **ambos lados**. (2) "validado E2E" exige el ciclo COMPLETO, no el happy-path. Familia M-09 (cobertura de reflejos) + `verification-before-completion`. [HONOR]

### M-22 · El cerebro documenta ESTRUCTURA pero no verifica REALIDAD — "✅" conflaciona DISEÑADO/DECIDIDO/CONSTRUIDO/DESPLEGADO/VERIFICADO-LIVE (auditoría §257) ⟦OPUS-4.8⟧
- **Defecto (§257, dueño 2026-06-26)**: el dueño perdió confianza ("documentamos cosas que se nos perdieron"). Canary aliados: §204/§205 "✅" pero el flujo comercial nunca se ejecutó; automatización "portada ✅" pero el motor no corre (TODO-41). `brain-check` valida caps/refs/huérfanas, NO si el claim es CIERTO afuera (código/datos/deploy).
- **Causa**: "✅" sin estado ni fecha-de-verificación lee "decidido/UI-portada" como "ejecutado/corriendo". (Veredicto balanceado §257: la MAYORÍA de los "✅" SÍ son reales — el defecto es la minoría que conflacionó estado.)
- **Corrección/cura**: (1) **vocabulario de estados explícitos** — DISEÑADO ≠ DECIDIDO ≠ CONSTRUIDO ≠ DESPLEGADO ≠ VERIFICADO-LIVE; nunca "✅" a secas sobre realidad externa. (2) afirmación sobre realidad externa lleva **`verificado-vivo: <fecha>`** o se marca no-verificado (§3.3). (3) **check del linter que avisa stale** + reconciliación periódica = mecanización en `brain-check.mjs` (kernel ×3 → coordinado, **TODO-44**). Familia M-10/M-16 (la cura de una reincidencia es un GATE, no un reflejo). [HONOR hasta mecanizar en TODO-44]

### M-23 · Mi validación verifica que FUNCIONE, no que se VEA BIEN — Chrome(DOM) + caza-bugs cazaron CERO defectos de diseño; el dueño los cazó TODOS a ojo ⟦OPUS-4.8⟧
- **Defecto (dueño 2026-06-27, bot v2 F-1)**: validé "en vivo" leyendo el DOM (texto/estado/validaciones) y declaré ✅; el dueño cazó de inmediato 4 bugs VISUALES que NINGUNA herramienta vio (avatar encajado en círculo, doble-ventana/doble-barra, conversación-vieja persistente al refrescar, robot en vez del PNG flotante). **Dos los CAUSÉ yo**: el doble-scroll = mi propio "fix" (`max-height+overflow`); el avatar = encajé un PNG transparente en un círculo sólido.
- **Causa**: leer el DOM verifica **COMPORTAMIENTO, no DISEÑO** (nunca revela boxed/aplastado/scroll-doble/glow-perdido/jerarquía). Incluso cuando empecé a capturar, fue **REACTIVO** (tras el regaño), no una auditoría de diseño PROACTIVA antes de declarar ✅. + parcheo reactivo: cada parche apurado trajo otro bug.
- **Corrección/cura**: para CUALQUIER trabajo de UI — (a) **auditoría de diseño adversarial con SCREENSHOT de CADA estado ANTES de "✅"** (cerrado/abierto/vacío/con-mensajes/cada rama), juzgada contra un bar de calidad o mockup — NO solo DOM; (b) la skill `validacion-live-chrome` necesita una **dimensión de diseño ENFORCED** (no opcional); (c) UI nueva = **flujo de diseño completo (mockup→review→build)**, no parches. Familia M-10 (cobertura fingida) + callejón (i). [HONOR — mejorar la skill]

### M-24 · Construí maquinaria NUEVA compleja cuando ya existía una solución simple A LA MANO — el dueño: "tienes las cosas visibles a la mano e hiciste algo mas complejo" ⟦OPUS-4.8⟧
- **Defecto (27/06, bot v2)**: el bug "Ver sedanes no filtra" → construí `busqueda?categoria=` de 2 lados (bot + `applyUrlFilters`) + reestructuré búsqueda a sidebar. PERO ya existían **páginas dedicadas** `vehiculos-{suv,sedan,pickup,hatchback}.html` con el layout correcto — el fix simple era apuntar el bot a ESAS. Las hallé solo al re-reportar el dueño.
- **Causa**: no inventarié lo que YA EXISTÍA antes de diseñar (W-11 cap.1 verifica el código TOCADO, no barre páginas/componentes hermanos que ya resuelven). Sesgo de constructor: "lo hago" vs "¿ya está hecho?".
- **Cura**: ante bug de navegación/feature, **primero `Glob`/`Grep` por lo existente** (¿página dedicada? ¿patrón hermano?) y reusar lo simple ANTES de construir. Suma al IAP §3.4: "¿qué ya existe a la mano?". Familia sobre-ingeniería. [HONOR]

### M-25 · El cerebro PIERDE MEMORIA cuando el MISMO hecho vive en registros que se CONTRADICEN ⟦OPUS-4.8⟧
- **Defecto (29/06)**: el dueño repitió 3× lo mismo (merge=mío; yo-decido-no-pregunto) y se preocupó: *"¿por qué se pierde memoria? Temo que se pierdan más cosas."*
- **Causa (NO es olvido, es CONTRADICCIÓN)**: cada hecho vive en varios nodos (CLAUDE.md + memorias + índice `MEMORY.md` + brief + 05). Cambio uno y no los demás → **dos verdades**; al arrancar leo el índice de memorias primero → sigo el viejo. `brain:check` valida estructura, NO barre memorias `.claude` ni detecta contradicciones semánticas.
- **Cura (SSoT real §G.3)**: al cambiar un hecho always-on, actualizar **TODOS** sus registros en el mismo acto (o marcar el viejo `⛔SUPERSEDED`). Si repito una instrucción del dueño → la causa por defecto es un registro stale, no mi olvido → cazarlo y alinear. TODO-29: que `brain:check` barre `memory/*.md`. [HONOR]

