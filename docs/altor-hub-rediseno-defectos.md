# 🎨🤖 ALTOR Hub — Backlog de defectos de diseño/UX (para el rediseño · F4/F5)

> **Hoja de detalle** (no neurona). Enlazada desde `43-UX.md` y el EPIC TODO-34 (F4/F5 UX).
> Acumula los **defectos VISUALES/UX del bot ALTOR Hub** cazados EN VIVO por la skill
> `validacion-live-chrome` (extensión Claude-in-Chrome). NO se arreglan en el acto (salvo que
> rompan el flujo) — se agrupan aquí para resolverlos en bloque en la fase de rediseño del bot.
>
> Formato: `#N · [severidad] · superficie/estado · síntoma → causa → fix sugerido · evidencia`.

---

## Abiertos

### #1 · 🔴 ALTO · Widget bot · banner SLA de espera (warning) — texto VERTICAL + scroll-trap
**Síntoma**: el texto del banner `.cnc-sla-banner--warning` ("⏰ La espera está siendo más larga…
¿Continuar por WhatsApp o seguir esperando?") se renderiza **una letra por línea (vertical)** e
ilegible. Aparece tras escalar a asesor y superar el umbral de espera (visto con "Esperando hace 29 min").
**Causa raíz (CONFIRMADA por validador, CSS)**: `.cnc-sla-banner-text` computa `width:0px` dentro de un
flex-row (le falta `flex:1` / `min-width:0`) → el `<strong>` se ajusta a ~15px de ancho × ~754px de alto;
el banner crece a ~1825px → **scroll-trap** dentro del chat. El estado inicial ("Esperando hace 0 min")
renderiza BIEN (horizontal) — el bug es específico del **banner de advertencia**.
**Fix sugerido**: `.cnc-sla-banner-text { flex:1; min-width:0; }` + botones (Continuar WhatsApp / Seguir
esperando) en su propia fila debajo, no superpuestos.
**Evidencia**: screenshot del dueño 2026-06-23 + medición de layout del validador.
**⚠️ CORRECCIÓN de la causa raíz** (la del validador era ERRADA): el texto `.cnc-sla-banner-text` YA tenía
`flex:1; min-width:0` (verificado en `css/concierge.css`). La causa REAL: el `@media (min-width:700px)`
activaba el layout `row` según el **VIEWPORT**, pero el widget es 380px (panel `width:380px`) → en desktop
el banner pasaba a row dentro del widget → icon+text+actions(`flex-shrink:0`, 2 botones anchos) en 380px →
el texto colapsaba a ~15px → vertical + scroll-trap. (Móvil <700px quedaba column → bien.)
**Fix sugerido (REVISADO)**: quitar el `@media (min-width:700px)` → banner SIEMPRE column (correcto a cualquier
ancho del widget). Si el panel se hiciera ancho, `@container`, nunca viewport.
**Estado**: ✅ **FIX APLICADO** (`fe60fc6`, 2026-06-23) · 🔜 pendiente re-validación live (desktop + escalar a
asesor + superar umbral). Lección: el validador puede dar un root-cause plausible-pero-falso → SIEMPRE verificar el CSS real.

### #2 · ✅ RESUELTO · Widget bot · tarjeta de vehículo · título truncado
**Síntoma**: `.cnc-vcard-title` con `white-space:nowrap; overflow:hidden; text-overflow:ellipsis`,
clientWidth 92px vs scrollWidth 126px → "toyota HILUX 4X4 2018" se corta con "…". (Diagnóstico del
validador CORRECTO — verificado en `css/concierge.css:1416`.)
**Fix aplicado** (2026-06-23): clamp a 2 líneas (`-webkit-line-clamp:2` + `word-break:break-word`) → título
completo; ellipsis solo si excede 2 líneas. 🔜 pendiente re-validación live.

### #3 · 🟡 MEDIO · Header · "Cerrar sesión" atenuado + 2 clics (intermitente)
**Síntoma**: el ítem "Cerrar sesión" se ve más tenue que "Mi perfil"/"Mis favoritos"; a veces exige 2 clics.
**Causa (ya diagnosticada §234 follow-up)**: race entre el listener global de `document` que cierra el
dropdown y el re-bind del botón tras re-render del header (`auth.js:1355-1368`).
**Fix sugerido**: bind estable (delegación de eventos) + estado visual consistente del ítem.
**Evidencia**: validador 2026-06-23 (2 pasadas, intermitente).

### #4 · 🟡 MEDIO · z-index · el widget tapa el dropdown de cuenta del header
**Síntoma**: con el chat abierto (esquina sup-derecha), el menú "Daniel → Mi perfil / Cerrar sesión"
queda solapado/detrás del widget; hay que cerrar el chat para operarlo.
**Datos verificados (2026-06-23)**: panel widget `.cnc-panel` **z-index 9999** (concierge.css:305) > dropdown
`.hdr-user-dropdown` **z-index 9000** (style.css:7008) → el widget gana. **⚠️ Subir solo el z-index del
dropdown puede NO bastar**: si el header crea un *stacking context* con z-index < 9999, el hijo no puede
superar al widget desde dentro — habría que subir el HEADER o que el widget ceda. Es coordinación
cross-component → **mejor en el bloque F4/F5** (no piecemeal, evita efectos colaterales).
**Estado**: 🆕 verificado, diferido a F4/F5 (cross-component).

### #5 · 🟢 BAJO · Hero · contador parpadea "+90 vehículos" → "+27"
**Síntoma**: el contador del hero muestra transitoriamente "+90 vehículos" al cargar y se asienta en "+27"
(el conteo real del catálogo). Flicker cosmético, no error de datos. **Fix**: arrancar en el valor real /
placeholder neutro hasta que cargue. **Evidencia**: validador 2026-06-23 (exploración propia).

### #6 · 🟡 MEDIO · Widget bot · "Finalizar conversación" usa `window.confirm()` nativo
**Síntoma**: el confirm nativo del navegador bloquea el render hasta navegar (ya flagueado §233/§235 follow-up).
Para un widget premium → **modal in-app** en vez del confirm nativo. **Evidencia**: validador 2026-06-23 (re-confirmado).

### #7 · 🔴 ALTO · Widget bot · gate de captura NO es takeover (form + chat + input + quick-actions a la vez)
**Síntoma** (validado LIVE 2026-06-24 por Claude vía extensión Chrome — reporte del dueño con captura): al pedir datos, el formulario se ve "media conversación, medio formulario". Quedan visibles A LA VEZ: el form, los mensajes (comprimidos a ~156px), los **quick-actions** ("Hablar con asesor") y la **barra de texto**.
**Causa (verificada por DOM)**: el panel `#altorra-concierge` (fixed, z9999, 504px) apila hermanos `cnc-header(71)·cnc-gate(154)·cnc-quick-actions(57)·cnc-messages(156)·cnc-input-wrap(63)`. `#cncGate` es **un bloque más en la pila**, no un takeover → no oculta messages/quick-actions/input. Mostrar CTAs+input durante la captura = fricción comercial (CTA en mal momento).
**Fix (v2)**: el gate v2 ya nace como **overlay/takeover** (CustomEvent fuera del shadow, decisión #1 Gemini) que ocupa el cuerpo del panel y oculta mensajes/quick-actions/input mientras está activo. v1 patcheable con 1 regla CSS (gate como `position:absolute` cubriendo el cuerpo) si se quiere antes del v2.
**Severidad ALTO**: es el momento de captura del lead (cero-pérdida). **Estado**: ✅ **FIX v1 APLICADO** 2026-06-24 (clase `cnc-gating` en el panel vía `applyGateVisibility` + CSS `display:none !important` para msgs/qa/input — robusto a re-renders; verificado en preview: gating ON→solo el form, OFF→restaura layout). Pend re-validación live post-merge. v2 lo hará como overlay nativo (tramo 3).

---

## Flujo comercial / Copywriting (nueva dimensión del validador)
> El validador ahora también caza copy + flujo comercial (saludo→cierre): mensajes duplicados, CTAs
> prematuros/repetidos, tono/voz de marca, pasos que sobran/faltan, fricción comercial. (Skill §0/§3.)

### C#1 · 🟠 MEDIO · el bot NO surface inventario inline (browsing → rebota a asesor/catálogo)
**Síntoma**: "¿qué carros tienes en menos de 50M?" lo interpreta como negociación de precio → rebota a
asesor; "muéstrame las camionetas" → genérico "ver catálogo", sin tarjetas inline. El bot nunca muestra
inventario en el chat; siempre apunta al catálogo → un comprador con presupuesto/categoría se confunde.
**Causa**: en gran parte el **LLM v2 está apagado** (Free Core no tiene el tool `search_inventory`; v2 SÍ
lo tiene, F3-a/b). + copy de Free Core mejorable. **Fix**: al encender v2 (saldo) → search_inventory
surface tarjetas; mientras tanto, enlazar a resultados FILTRADOS (categoría/precio) en vez de "ver catálogo".
**Evidencia**: validador 2026-06-23 (journey comercial).

### C#2 · 🟠 MEDIO · Doble pregunta del nombre (prosa + formulario)
**Síntoma** (LIVE 2026-06-24): en el flujo de financiación el bot pide el nombre DOS veces — en prosa *"Por cierto, ¿cómo te llamas? Así puedo personalizarte la atención. 😊"* Y ADEMÁS el formulario del gate tiene campo "Nombre" → el cliente no sabe si escribirlo en el chat o en el form. Redundante/confuso.
**Fix**: una sola vía — si el gate (form) captura el nombre, quitar la pregunta en prosa. En v2: valor-primero en el saludo; el nombre se pide UNA sola vez, en el gate. **Estado**: 🆕 → v2.

### ✅ Positivo (no defecto) — entrada basura → fallback elegante
"jk" (gibberish) → *"mmm, no estoy seguro de qué necesitas. ¿Me explicas un poquito más? (Por ejemplo: …)"* — el Free Core maneja lo desconocido con gracia. Preservar este tono en v2.

### C#3/C#4 · 🟠 FLUJO (LLM-resuelto, NO bug de v1) · Free Core no entiende lenguaje humano natural
**Síntoma** (validación live 2026-06-24, conversando como cliente real):
- *"Buenas, estoy buscando una camioneta para mi familia"* → el bot lo tomó como **saludo**: *"¡Hola! Todo excelente por acá. ¿Qué te trae por aquí?"* — un "todo excelente" como si le preguntaron cómo está; **ignoró** la intención camioneta/familia. El "Buenas" dominó el match.
- *"tengo unos 60 millones, qué camioneta me recomiendas?"* → menú genérico *"¿qué duda tienes? Puedo ayudarte con…"* — no entendió presupuesto ni la pregunta de recomendación.
**Causa**: Free Core pattern-matchea intents exactos; sin NLU no razona presupuesto/recomendación/frases naturales → small-talk o menú genérico. **NO es bug de v1**, es el límite del motor Free Core.
**Fix**: el **LLM v2** (Tool Calling + `search_inventory`, TODO-34) maneja lenguaje natural + recomienda por presupuesto. Pend saldo Anthropic. **Implicación clave**: el barrido conversacional completo ("responde como debe ser") solo es SIGNIFICATIVO con el LLM ON. **Estado**: 🆕 documentado → cierra con LLM-on (v2).

## Resueltos

### 🟢 F-1 REDISEÑO DEL FLUJO Free Core (27/06 PM, W-11 completo) — 3 bugs LIVE del dueño + wins
> Verificado en preview (DOM): nav end-to-end, deep-links, reset, gate-reopen. Pend validación live (extensión).
- **B1 · 🔴 botón mentiroso** — "Ver sedanes/camionetas" abría el catálogo SIN filtrar. **Causa doble**: el bot
  mandaba `__goto_catalogo__`→`busqueda.html` pelado **Y** `busqueda.html` solo leía `?buscar=`. **Fix (2 patas)**:
  (a) árbol de nodos con `goto:busqueda.html?categoria=<suv|sedan|pickup|hatchback>`/`?precioMax=` (valores
  canónicos verificados en inventario vivo: suv13/sedan8/hatchback5/pickup1); (b) `busqueda.html applyUrlFilters()`
  lee los params DESPUÉS de poblar selects (async), `currentFilters`=fuente de verdad, valida categoría, chip visible.
  ✔ preview: `?categoria=sedan`→8 cards · `?precioMax=40000000`→3 cards ≤$39M.
- **B2 · 🔴 callejón sin salida** — las hojas dejaban 1 opción, sin volver/menú. **Fix**: `FREE_CORE` → GRAFO de
  nodos; `_renderInput` AUTO-INYECTA pie `← Volver`(navStack pop) + `Inicio`(`__home__`) en todo nodo != raíz →
  imposible nacer sin salida. `__home__`/`__back__` = sentinelas-acción interceptados en `send()` (no claves del árbol).
- **B3 · 🔴 conversación zombie** — persistía en localStorage, sin reset en UI (min/x solo ocultan, 12h auto). **Fix**:
  botón "Empezar de nuevo" (↻) SIEMPRE visible en header + confirm IN-APP (no `window.confirm`) → `resetSession()`.
  `Inicio` (vuelve a raíz, conserva sesión) ≠ `Empezar de nuevo` (borra). `freshState` inicializa `currentNodeId`+`navStack`.
- **Caza-bugs (fronteras estado-cero)**: gate a medias al reabrir → `_renderInput` ahora respeta `state.gating`
  (re-pinta el form, antes se perdía) · escalar sin chat-en-vivo (v2 no recibe del Hub) → nodo `escalado` honesto
  con WhatsApp en vez de chat libre al vacío · precios en dígitos puros · `?marca=` DIFERIDO (igualdad exacta + select por id).
- **Wins visuales/a11y baratos** (comités): FAB QUIETO (sin float/glow infinitos) · `@media prefers-reduced-motion`
  (cura violación §3.1) · `:focus-visible` oro en todo control · tap-target header ≥32px · dot/badge presencia oro
  (no verde-semáforo) · fuera nota-motor (disclaimer) + hint redundante · subtítulo corto.
- **HÍBRIDO decidido (27/06, consejo Gemini VERIFICADO no acatado)**: A (navegador) + lo de B que gana sin LLM.
  Añadido nodo **`visitanos`** (FAQ físico): horarios REALES (`contacto.html`) inline + ubicación/garantía → ruteo
  a humano (NO inventar dirección/garantía). Rangos de presupuesto **recalibrados con la data real** (5/7/10/5;
  el bucket de Gemini $60–100M agarraba 15/27=55%). REFUTADO de Gemini con código/datos: "cero captura" (WhatsApp
  captura en cada nodo) · "stock-cero=frustración" (`render.js:196` ya tiene empty-state + "Ver todos").
- **DIFERIDO iter-2 / LLM-on**: **quiz-perfilador** (requiere motor de inventario + LLM → encaja con TODO-34) ·
  Por marca · Novedades · FAQ financiación detallada (texto del dueño) · ARIA modal/trap/Escape · profundidad
  visual · gate como paso de servicio · Instrument Serif extendido.

### 🟢 POST-VALIDACIÓN LIVE 27/06 — 3 bugs que el dueño cazó en su 1ª pasada (Unidades 1+2)
- **#1 Escalado anónimo** (`72e75a8`): pedir asesor NO capturaba datos → el Hub mostraba "Cliente 8mfe2q" sin
  contacto ("hablamos con un X que no sabemos cómo contactar"). Fix: `act:escalate` → gate (nombre+celular+**correo**
  +consent) → escalado CON datos. Ya no anónimo.
- **#2 Chat del asesor NO llegaba al cliente** (`72e75a8`): el v2 escalaba pero NO escuchaba el Hub (lo marqué
  callejón; el dueño lo quiere funcional). Fix: porté el receptor de v1 → `lead-flow.subscribeToChat` (onSnapshot
  de `messages` + doc padre = toma del asesor) + `sendUserMessage`. El bot RECIBE los mensajes del asesor, avisa
  "✓ {nombre} se unió", cambia el header al asesor, y el cliente responde (free input → Hub). Contrato de reglas
  verificado (`firestore.rules:939`: guest anónimo-auth con `userId==null` lee su chat; `auth.js` hace signInAnonymously).
  Pend: validación LIVE del roundtrip (dueño como asesor en el Hub).
- **#3 Búsqueda — banner/scroll/filtro/gap** (`b14432b`): banner quitado (tapaba las cards); **doble-scroll** muerto
  (`overflow-x:clip` en `body`, era un 2º scrollbar espurio de 1px por la coerción de `overflow-x:hidden`→`overflow-y:auto`;
  clip no coacciona; `hidden`=fallback Safari<16); hero 300→220; filtro compacto (padding/grid/field); menos gap
  filtro→cards. Verificado preview (banner fuera, 0 inner-scrollers, viewport scrolleable, cards visibles). Aplica a
  todas las vistas filtradas (categorías/marcas caen en busqueda con params). Doble-scroll global = en todas las páginas.

### Históricos
- **F#1 · 🟠 FLUJO · gate de cita · fechas duplicadas** (cazado 2026-06-23, fix `02a79a7`) — el bloque
  "Mañana/Esta semana/Próxima semana" salía 2× (pedido del gate + respuesta diferida post-gate). Causa:
  los gate-requests (cita/vender/financiación) sin `quickReplies` → el caller (concierge.js:1085) les ponía
  las contextuales del intent; pero el gate pide DATOS por el form, no fechas. Fix: `quickReplies:[]` en
  los 3 gate-requests. ✅ Re-validado live (4ª pasada): el gate ya no muestra fechas; salen solo tras dar datos.
- **F#2 · 🟢 ruido · `permission-denied` esperado del enrich-update de guests** (cazado 4ª pasada, fix `f89e4f3`)
  — el per-turn `updateSoftContact` de un guest disparaba `console.warn "enrich update falló: permission-denied"`
  (concierge.js:1268) en cada turno. No es bug (UPDATE solo-admin por diseño; el lead se persiste por CREATE).
  Fix: silenciar SOLO permission-denied (esperado), warn solo errores inesperados. ✅
