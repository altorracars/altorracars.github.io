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
- **F#1 · 🟠 FLUJO · gate de cita · fechas duplicadas** (cazado 2026-06-23, fix `02a79a7`) — el bloque
  "Mañana/Esta semana/Próxima semana" salía 2× (pedido del gate + respuesta diferida post-gate). Causa:
  los gate-requests (cita/vender/financiación) sin `quickReplies` → el caller (concierge.js:1085) les ponía
  las contextuales del intent; pero el gate pide DATOS por el form, no fechas. Fix: `quickReplies:[]` en
  los 3 gate-requests. ✅ Re-validado live (4ª pasada): el gate ya no muestra fechas; salen solo tras dar datos.
- **F#2 · 🟢 ruido · `permission-denied` esperado del enrich-update de guests** (cazado 4ª pasada, fix `f89e4f3`)
  — el per-turn `updateSoftContact` de un guest disparaba `console.warn "enrich update falló: permission-denied"`
  (concierge.js:1268) en cada turno. No es bug (UPDATE solo-admin por diseño; el lead se persiste por CREATE).
  Fix: silenciar SOLO permission-denied (esperado), warn solo errores inesperados. ✅
