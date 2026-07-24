# TODO-34 — Reestructura del bot ALTOR (ALTOR → LLM-only + captura-a-CRM) · diseño

> ⟦OPUS-4.8 · rev-Fable⟧ · 2026-06-22 · Decisión Fuerte (arquitectura + CRM + refactor mayor) →
> **gate Gemini** (§G.2 🛰️) ANTES de implementar. Visión del dueño (22/06) + diagnóstico en vivo.

## Visión del dueño (22/06, verbatim resumido)
Borrar el asistente de chat actual; **ALTOR = solo LLM**. **LLM ON** → la IA responde según TODO el
contenido de la web + la info que se le nutra. **LLM OFF** → el bot CAPTURA: si el usuario está
registrado toma su info, si no se la pide → la manda al **chat del panel admin** para un asesor.
**Todo se captura SÍ o SÍ en el CRM** ("creo que ya está conectado").

## Estado ACTUAL (verificado en código, 22/06)
- **Store**: `conciergeChats/{sid}` (+ subcol `messages`) con radicados `REQ-YYYYMM-XXXX`
  (`onConciergeChatCreated`). Sistema de TICKETS propio.
- **Cerebro determinista**: `js/ai/` (16 archivos: engine·intent·ner·scoring·nba·fuzzy·
  knowledge-graph·faq-ranker·small-talk·vehicle-guide·inventory-search·dual-core·brain-config·
  automotive-vocab·transformers·forecast) + `js/concierge/` (widget). GRANDE y complejo.
- **LLM**: `chatLLM` (callable, secret `llmApiKey`) — el responder con IA YA EXISTE. + `summarizeChat`
  (auto-resumen vía `onConciergeMessageAdded` cada N turnos).
- **Escalada**: `onChatEscalated` → cuando `mode='queue'` + radicado, manda **push FCM** a
  super_admin/editor → atienden en la **bandeja admin**. + funciones Telegram.
- **⛔ NO conectado al CRM**: grep confirmó CERO puente `conciergeChats`→`contacts`/`leads`/
  `solicitudes`. El CRM ingesta de `solicitudes`/`clientes`/`subscriptions`, NO del bot.
- **Estado**: DIFERIDO (buggy). `proactiveEngagement` ya BORRADA (22/06, fallaba 288×/día).
- **13 funciones del bot** (de las 57): chatLLM·summarizeChat·autoResolveIdleChats·onChatEscalated·
  onChatEscalatedTelegram·onChatTransferred·onConciergeChatCreated·onConciergeMessageAdded·
  recalculateWorkloadOnChatChange·recalculateWorkloadScheduled·linkTelegramChat·
  getTelegramWebhookStatus·setupTelegramWebhook.

## Plan PROPUESTO (pre-Gemini — SUPERSEDED por "Plan FINAL" ↓)
- **F1 — Puente bot→CRM (la pieza que FALTA, máximo valor)**: al capturar/escalar, escribir un
  `solicitudes/{id}` con `origen='altor'` → reusa la ingestión Fase-1 existente (`onSolicitudCreated`
  → contact+lead, dedup incluido), igual que la captura manual (§162). Hace VERDADERO "todo al CRM".
- **F2 — Switch LLM on/off**: flag en `config/altor` (`{llmEnabled: bool}`). ON → `chatLLM` responde;
  OFF → modo captura (form guiado, sin IA).
- **F3 — Nutrición del conocimiento**: que el LLM "sepa" el inventario + info de la web (system-prompt
  con stock vivo / RAG-lite). Define qué se le nutre y el costo.
- **F4 — Borrar el cerebro determinista**: eliminar `js/ai/` (16) + simplificar el widget. Quedarse
  con `chatLLM` + escalada + el puente nuevo.
- **F5 — Podar funciones del bot**: de las 13, conservar ~`chatLLM`+`onChatEscalated`+puente; borrar
  el resto (summarize, autoResolve, deterministas, ¿Telegram?).

## Preguntas para Gemini (Decisión Fuerte)
1. Puente: `solicitud origen='altor'` (reusa ingestión) vs creación directa de lead. ¿Dedup con
   contacto existente si el user está registrado?
2. ¿Borrar TODO `js/ai/` o conservar `inventory-search` para que el LLM consulte stock?
3. Nutrición: ¿cómo "conoce toda la web"? RAG vs system-prompt con inventario. Costo por mensaje
   (hoy el dueño gasta ~$2-5/mes TOTAL; LLM-only puede subirlo).
4. LLM on/off: ¿quién lo prende/apaga? ¿comportamiento exacto en OFF (form puro vs guiado)?
5. Migración sin romper el chat vivo durante el refactor.
6. ¿Algún riesgo de seguridad/costo/irreversible subestimado?

## Plan FINAL (post red-team Gemini 22/06 — reordenado por riesgo)
Gemini APROBÓ el puente pero corrigió 3 gaps críticos de mi diseño: **costo** (inventario en el
prompt = "suicidio financiero"), **seguridad** (LLM expuesto = jailbreak + Denial-of-Wallet), y el
**orden** (borrar `js/ai/` va al FINAL, no al inicio). Plan adoptado:
- **F1 — Puente + dedup**: el bot escribe `solicitudes/{id}` `origen='altor'` (+uid/email/tel) →
  `onSolicitudCreated`. El **dedup YA existe** (§185 `dedup/{key}` + tx) → no infla `contacts`.
  Cero-pérdida de leads (cualquier estado del bot captura).
- **F2 — Modo OFF "de hierro"**: form determinista duro ("déjame tus datos, un asesor te contacta") +
  **Circuit Breaker**: si el LLM falla (429/timeout/saldo) conmuta a OFF solo. + flag manual
  `config/altor.llmEnabled`.
- **F3 — Cerebro nuevo (LLM + Tool Calling + guardas)**: system-prompt LIGERO (reglas + anti-jailbreak
  + 5 FAQs); inventario SOLO vía **Tool Calling** (`inventory-search` → `search_inventory(...)`, NUNCA
  la BD en el prompt). Guardas de costo: tope de historial (~6 msgs), ~15 turnos/sesión → escala a
  humano, rate-limit por IP. Seguridad: App Check/reCAPTCHA en `chatLLM` (infra §41 ya existe, hoy
  MONITOR), Billing Alerts GCP 50/80/100%, prompt legal ("nunca prometer descuento/contrato/crédito").
- **F4 — Rollout PARALELO (A/B)**: campo `engine:'v2-llm'` en chats NUEVOS; los viejos siguen por la
  ruta determinista (no romper pestañas abiertas). Sin downtime.
- **F5 — Poda quirúrgica (sunset)**: 1-2 semanas después, con logs limpios y costo estable → borrar
  `js/ai/*` (dejando las Tools) + las 10+ functions viejas del bot.

## Gemini — correcciones clave adoptadas
Inventario = Tool Calling (no prompt-stuffing) · OFF = Circuit Breaker automático · migración A/B con
`engine` (no in-place) · seguridad: jailbreak + Denial-of-Wallet → App Check + billing alerts + prompt
anti-jailbreak. Crudo verbatim → bóveda `../brain-private/altorracars/research-archive/`.

## Comité ACOTADO post-Gemini — VERDICTO (revalidación, 2026-06-22; crudo bóveda `242bc41`)
El comité (4 expertos + peer-review, bounded, no se colgó) cazó lo que Gemini NO vio:
- **Costo (verificado ✅)**: las Billing Alerts de GCP **NO ven el gasto de tokens de Anthropic**
  (cuentas separadas) → el salvavidas de costo tenía punto ciego. Falta gate de costo DENTRO de
  `chatLLM` (contador tokens/gasto-diario en Firestore que flipee `llmEnabled`). Tool Calling = costo
  no-lineal (2+ requests/turno + inventario reinyectado al historial cada turno).
- **Legal (verificado ✅ en principio · gate abogado ⚖️ `42-LEGAL`)**: F1 "captura todo al CRM" SIN
  consentimiento previo viola **Ley 1581**. Falta gate `consent{}` bloqueante (validado server-side en
  `onSolicitudCreated`) antes de ingestar PII. + allow-list de campos por Tool (anti-exfiltración).
- **Vaporware (verificado ✅)**: el Circuit Breaker en-memoria NO sirve en una Cloud Function
  efímera/escalada → server-side con estado en Firestore (`config/altor.breakerOpenUntil`, half-open).
- **Bug que contradice el plan (⚠️ NO verificado — leer código primero)**: colisión de anónimos en
  `sanitizeContactId` (leads sin email/tel → 1 contactId = fusión silenciosa = anti-cero-pérdida) +
  `onCreate` no re-entrante. A VERIFICAR antes de codear (§3.3 — no asumir que el comité acertó).
- **UX**: falta loop al cliente vía **WhatsApp** + SLA visible + `lead_quality` (sin scoring, F1 inunda
  el CRM de ruido → el asesor pierde confianza).
- **🔑 La PREMISA (lo que TODOS omitieron)**: ¿100%-LLM es la arquitectura correcta para un dominio TAN
  acotado (catálogo finito + 3-4 intenciones)? El comité propone un **ENRUTADOR HÍBRIDO** (clasificador
  determinista barato decide PRIMERO; el LLM solo el long-tail conversacional) → baja Denial-of-Wallet +
  superficie de inyección + ruido-en-CRM + dependencia del breaker, de un golpe. **Contradice la visión
  "solo LLM" del dueño → Decisión Fuerte nueva, decide el dueño.**

**VERDICTO (Claude, presidente)**: F1 y F2 **NO están listas** tal cual. F1 = bloqueante legal
(consentimiento) + verificar `sanitizeContactId` + lead_quality/WhatsApp. F2 = breaker re-diseñado
server-side + gate de costo Anthropic-aware. El proceso multi-capa (Gemini + comité) VALIÓ: pasó de
"F1+F2 listos" a un mapa de bloqueantes reales + una pregunta de arquitectura.

## Verificación de contratos reales (2026-06-23, §3.3 — leído el código, NO asumido)
Leídos: `onSolicitudCreated.js` · `ingestLead.js` · `normalize.js`. Hallazgos:
- **Claim del comité "colisión de anónimos en `sanitizeContactId`" → REFUTADO.** `contactDedupKey`
  (normalize.js:28-34) devuelve `email:…` | `phone:…` | **`null`**. Con `null`, `normalizeSolicitud`
  **LANZA** (`normalize.js:60-62`) ANTES de tocar `sanitizeContactId` → `onSolicitudCreated` cae a
  `failedIngestions` (dead-letter, ID determinista, retry). `sanitizeContactId` SOLO recibe claves
  reales (`email:`/`phone:`), nunca constante/vacía. **Cero fusión silenciosa.** (El comité apuntó al
  área correcta pero con el signo equivocado.)
- **GAP REAL (opuesto al temido) — bloqueante de la visión "cero-pérdida":** la ruta de ingestión
  **RECHAZA** todo lead sin email NI teléfono → dead-letter, **nunca entra al CRM**. Un chat ANÓNIMO
  escalado por el bot, si F1 escribe `solicitud origen='altor'` sin handle, se **PIERDE en silencio** —
  contradice "todo al CRM SÍ o SÍ". **F1 debe**: capturar email/tel ANTES de escribir la solicitud, o
  capturar el chat anónimo por otra vía (el doc `conciergeChats` + bandeja ya existe) y emitir la
  solicitud SOLO cuando haya handle.
- **Consentimiento Ley 1581 — la plomería YA existe:** `mapConsent` (normalize.js:40-50) arma
  `consent{email,whatsapp,calls}` desde `sol.consentGiven===true`; `doNotContact:!consent.email`. F1
  solo debe setear `consentGiven` con la verdad del bot. ⚠️ La ingestión NO se BLOQUEA por falta de
  consentimiento (solo marca do-not-contact) → si almacenar PII pre-consentimiento debe bloquearse es
  gate abogado (P4/`42-LEGAL`), no técnico.

## Dato nuevo del dueño (2026-06-23): el híbrido determinista YA se intentó y FALLÓ
Reporte vivido: respuestas desalineadas, mal inventario, no entendía al cliente. **Diagnóstico verificado
en código** (`dual-core.js`/`chatLLM`/`js/ai/`): el "híbrido" actual = **DualCore** (LLM-first else **Free
Core determinista ~5,600L de NLP a mano** en 16 archivos). Con el LLM OFF (bot DIFERIDO), cada turno cayó al
Free Core frágil → ESO es lo que falló. Y el path LLM **apelmaza el inventario en el system-prompt** y **no
tiene Tool Calling real** (solo tag `[CTA:]`). **NUNCA se probó** "LLM entiende + Tool Calling determinista
responde" (cero Anthropic tool-use). Anti-bot verificado: `chatLLM` onCall **SIN `enforceAppCheck`**
(endpoint abierto), rate-limit por `sessionId`-cliente (brincable), sin tope global de gasto.

## Comité acotado #2 — ARQUITECTURA (2026-06-23) · convergencia 4/4 en B-moderno
4 expertos razonamiento-puro (arquitecto-LLM · seguridad-escéptico · FinOps · ejecutor), foreground, 0
tools, inline (L-50). Crudo → bóveda `2026-06-23-TODO34-comite-arquitectura-CRUDO.md`. Cazaron:
- **B (híbrido moderno) 4/4 — pero REDEFINIDO**: el "router" NO es NLP a mano (eso fue lo que falló) sino
  **chips/botones de UI** para las 3-4 intenciones + **LLM+Tool Calling** para texto libre. Honra el "solo
  LLM" del dueño en lo conversacional y deja GRATIS lo común.
- **Reencuadre (arquitecto)**: A-vs-B era casi señuelo. Causa raíz del fracaso = **falta de Tool Calling +
  acción no confiable**, que A y B resuelven igual. La decisión real: "LLM CON herramientas, inventario
  JAMÁS en el prompt". Tools server-side: `search_inventory`/`create_lead`/`book_visit`; render del carro
  por código determinista desde Firestore.
- **Fallo fatal ORTOGONAL a A/B (seguridad)**: el captcha-de-UI que pidió el dueño es **COSMÉTICO** — un bot
  hace POST directo a la onCall saltándose el HTML. **App Check ENFORCE en la función** (`enforceAppCheck:
  true`) es lo único que cierra el Denial-of-Wallet. Va PRIMERO, antes del motor. + rate-limit por identidad
  REAL (App Check token/UID/IP), no `sessionId`-cliente.
- **Costo (FinOps)**: B ≈ 4-5× más barato (~$0.005-0.01 vs $0.025-0.04/conversación); A arriesga $20-50/mes;
  **tope duro $12-15/mes**. Gate server-side Anthropic-aware (contador atómico Firestore que suma
  `usage` real × precio + kill-switch) + tope de historial (6 msgs, corta el cuadrático) + prompt caching.
- **Orden (ejecutor)**: **F1 cero-pérdida PRIMERO** (capturar handle + fallback `lead_anonimo` que nunca se
  rechaza — independiente del motor) → guards (AppCheck+gate costo) → engine `v2` tras flag, A/B 10% →
  clasificador chico → **podar determinista AL FINAL** (incremental, cuarentena `_legacy/`, nunca big-bang).

**VEREDICTO preliminar (pre-Gemini):** **B-como-router-de-UI + LLM-con-tools**; guards seguridad/costo + F1
ANTES del motor; migración incremental shadow→10%→100%; poda al final.

## Capa 3 — Gemini red-team + VEREDICTO FINAL (2026-06-23)
Gemini (Antigravity, code-aware) **CONTRADIJO al comité**: recomendó **Opción A** (solo-LLM+Tool Calling,
borrar el determinista) vs B. Verificación por-claim (regla de oro) → crudo bóveda
`2026-06-23-TODO34-gemini-redteam-CRUDO.md`:
- ✅ Verificado/adoptado: App Check enforce mandatorio pero NO basta vs Selenium → **hard cap server-side
  es el salvavidas real**; Tool Hallucination → payload capado (máx 3); ingestión-throw → guardar lead
  `incompleto`/'bot' (coincide con hallazgo 23/06); consent Ley 1581 (pedir antes de ingestar PII);
  fallback UX (429/500/cap → WhatsApp).
- ⚠️ REFUTADO: Gemini citó **$0.25/$1.25 = Claude 3.5 Haiku (RETIRADO)**; el real **Haiku 4.5 = $1/$5**
  (4× más caro; catálogo oficial). Su optimismo de costo es 4× — aún barato a tráfico bajo; el estimado
  FinOps (~$0.03/conv) usó el precio correcto.

**VEREDICTO FINAL (Claude, presidente): Opción A** = **solo-LLM + Tool Calling real + botones tontos de
navegación** (links/acciones, NO motor determinista) + guards-first. Razones (verificadas):
(1) la discrepancia A↔B es PARCIALMENTE semántica (B-router-de-botones ≈ A-con-quick-replies); (2) con
guards, las ventajas de B (costo ~4×/conv, superficie) son MARGINALES a tráfico bajo; (3) las de A son
DURADERAS y alineadas con los invariantes duros: **mantenibilidad** (cero NLP), **corte limpio con el
determinista que YA falló** (B conserva semilla → "valle inquietante"), **honra el instinto "solo LLM"
del dueño**. Lo que faltaba era **Tool Calling**, no más híbrido. (La capa gratis de B = YAGNI hasta ~100× tráfico.)

## Plan de implementación FINAL (por fases, verificación por fase §G.4)
- **F1 — Frenar hemorragia (PRIMERO, independiente del motor):** (a) quitar `throw` de normalizeSolicitud →
  lead sin handle = doc `incompleto`/origen 'bot' (cero-pérdida); (b) **App Check `enforce:true` en chatLLM**;
  (c) **contador de gasto server-side Anthropic-aware** ($1/$5 Haiku 4.5) + **hard cap ~$15/mes** kill-switch;
  (d) rate-limit por identidad real (no `data.sessionId`).
- **F2 — Tool Calling:** quitar inventario de `composeSystemPrompt`; tool `search_inventory` (payload capado
  máx ~3); system-prompt ligero + prompt caching (Haiku 4.5, min 4096 tok) + tope historial 6 (corta cuadrático).
- **F3 — Reemplazo de cerebro:** solo-LLM+tools tras flag `engine:'v2'`, A/B 10%→100%, sin romper chats vivos.
- **F4 — Tool `submit_lead`:** llamar SOLO con dato de contacto + consentimiento Ley 1581 + fallback UX.
- **F5 — Poda:** borrar `js/ai/` AL FINAL (incremental, cuarentena `_legacy/`), tras métricas v2>v1.

## EPIC "ALTOR Hub v2" — expansión de alcance (2026-06-23, pedido del dueño)
El dueño expandió TODO-34 a un EPIC completo y declaró **foco único**: terminar TODO ALTOR Hub (bot LLM +
captura + UX widget + UX chat interno) ANTES de retomar CRM / panel admin / migración panel viejo / demás
pendientes. Comité #3 (captura+UX+qualifier, crudo `2026-06-23-TODO34-comite-UX-captura-CRUDO.md`) cazó:
- **Captura — quitar la CÉDULA del chat** (mayor fuga de leads; inútil en esta etapa — se pide al formalizar
  con un humano). **Mínimo viable de lead = nombre + celular**; correo opcional. Progressive correcto; el gap
  real = **falta fallback WhatsApp** en el punto del form → ESO viola cero-pérdida hoy (el que rechaza se evapora).
- **Tono — voz argentina** ("andás/podés/decinos") en negocio colombiano = bug de marca → saludo usted-neutro Colombia + 3 botones tontos.
- **Qualifier troll/lead (idea dueño) — NO un juez LLM separado** (falso-negativo = perder un auto ~$20-40M COP
  por ahorrar centavos). Hacerlo **`lead_quality: hot|warm|cold` como campo GRATIS del tool `submit_lead`**;
  el LLM solo PROMUEVE (ofrece asesor a los hot), NUNCA rechaza. Anti-abuso = heurísticas + App Check, aparte.
- **Anti-abuso — el riesgo dominante es IDENTIDAD FALSIFICABLE** (sessionId brincable), no verbosidad → App
  Check enforce + rate-limit por App Check token; el tope de turnos es secundario.
- **Ejecución — el rediseño UX es REESCRITURA, va DESPUÉS del bot, como MÓDULO PARALELO v2** (no in-place, o el
  A/B es ilusorio: el flag aísla la lógica, NO el DOM). **Widget cliente y chat interno = DOS fases separadas.**

### Capa 3 — Gemini red-team del EPIC (2026-06-23) → REORDEN + guardrails
Crudo `2026-06-23-TODO34-gemini-redteam-EPIC-CRUDO.md`. Verificado/adoptado:
- ⚠️ **CORRECCIÓN CLAVE — orden de fases**: Gemini cazó un acoplamiento que el comité no vio: soltar el bot
  LLM (fluido) ANTES de arreglar la captura → la cohorte choca con el formulario VIEJO de cédula = caída
  brutal. → **CAPTURA va ANTES del bot** (y beneficia incluso al bot viejo). Swap F2↔F3.
- ✅ **Guardrail anti-negociación (CRÍTICO/legal):** el inventario entra al prompt vía el RESULTADO de la tool
  → si el cliente "ofrece $40M" el LLM podría "¡trato hecho!". System-prompt: **"PROHIBIDO NEGOCIAR PRECIOS /
  ACEPTAR OFERTAS; PRECIOS FINALES."**
- ✅ **Validación backend del payload `submit_lead`** (anti-prompt-injection): si nombre="Mickey Mouse" o
  celular inválido → degradar `lead_quality` a cold/spam sin importar lo que dijo el LLM.
- ⚠️ **Anti-abuso refinado:** con chat anónimo, el límite-por-identidad es BACHE (borran LocalStorage/incógnito);
  **el muro real es el TECHO GLOBAL de gasto**. App Check frena bots básicos, no click-farms/DoW manual.
- ✅ **TTL** conversaciones anónimas muertas (24-48h auto-borrado; Ley 1581 minimización + costo).
- ✅ **Latencia:** onCall CO→us-central1 + Anthropic = 4-6s → indicador "Escribiendo…" inmediato + evaluar streaming.
- ✅ Ya existen y se reusan: `handoverToWhatsApp()`+`buildWhatsAppSummary()` (handoff con contexto, :1555/:1563);
  `normalize.js` ya acepta teléfono-sin-email (:31-33); `summarizeChat` (truncamiento de memoria).

### Plan EPIC FINAL (6 fases REORDENADAS, foco único)
- **F1 — Guards + frenar hemorragia:** App Check `enforce` en chatLLM + **gate de costo server-side = TECHO
  GLOBAL** (techo MANUAL del dueño + auto-enforce + modo-captura "déjanos WhatsApp" + alertas 50/80/100%) +
  rate-limit por IP/App Check (bache, no muro) + tope turnos (~15) + **truncamiento de memoria (~6 msgs)** +
  fix ingestión (lead sin handle = `incompleto`) + **TTL** conversaciones anónimas. [Máximo valor, mínimo riesgo.]
- **F2 — Flujo de captura** (ANTES del bot, beneficia al bot viejo): **quitar cédula**; mínimo nombre+celular;
  correo opcional; **fallback WhatsApp** en el punto del form (reusa `handoverToWhatsApp`); consent Ley 1581
  inline (texto + link); saludo tono COLOMBIA + botones tontos.
- **F3 — Bot LLM + Tool Calling** tras `engine:'v2'`, reusando UX v1 + contratos. Tools: `search_inventory`
  (payload capado), `submit_lead` con `lead_quality` GRATIS + **validación backend** + **guardrail anti-negociación**.
  El LLM PROMUEVE hot→asesor, nunca rechaza. Indicador "Escribiendo…".
- **F4 — UX rediseño widget cliente:** MÓDULO PARALELO v2 (montaje nuevo, v1 intacto hasta retirar flag).
- **F5 — UX rediseño chat interno admin:** fase SEPARADA (distinto archivo/usuarios/riesgo).
- **F6 — Poda:** borrar motor determinista `js/ai/` (5,600L) AL FINAL, con v2 estable.

### Progreso F1 + refinamientos IAP (2026-06-23)
- **F1.a ✅ COMMITTEADO (`f747f5e`):** techo global Anthropic-aware (`checkMonthlyBudget`/`recordSpend`,
  `config/altorCost.monthlyBudgetUsd` default $15, `altorSpend/{YYYY-MM}`) + memoria corta `MAX_HISTORY_MSGS=8`.
  Verificado: `_brain.enabled=false` (LLM apagado) → sin gasto vivo → deploy de F1 como unidad.
- **IAP — ingestión: el `throw` de `normalizeSolicitud` SE QUEDA.** Protege el camino de FORMULARIOS web
  (rechaza envíos sin email NI tel = spam). Quitarlo = contactos basura. El bot aún no escribe `solicitudes`
  (eso es F3). → **cero-pérdida se mueve a F2** (capturar handle/WhatsApp ANTES de escalar), no debilitando el guard.
- **IAP — TTL/auto-borrado: es DESTRUCTIVO + decisión LEGAL de retención (Ley 1581) → NO se improvisa.**
  Pendiente decisión dueño: (a) ventana de retención (recom. conservadora ~30 días), (b) borrar vs anonimizar.
  + el esquema necesita verificación fina (`radicado` se asigna en la creación → "sin radicado" NO es marcador
  limpio de anónimo). Patrón base = `autoResolveIdleChats` (función programada existente).
- **F1.c — App Check: foundation VERIFICADA.** La web activa App Check (`firebase-config.js:146`,
  reCAPTCHA v3 `6Lfz…` + auto-refresh). Falta antes del enforce: confirmar que la llamada a `chatLLM` viaja
  sobre la app firmada (anti lead-block; por eso está en monitor). **Mejor activar el enforce JUSTO ANTES de
  encender el bot (F3)** — con el bot apagado no protege nada y no se puede verificar con tráfico real.

### F3 — diseño de implementación (execution-ready, 2026-06-23)
> Estado: **DISEÑO listo; implementación GATED por decisión dueño** (techo $/mes + timing App Check). Todo
> dormiente tras DOBLE LLAVE: `engine:'v2'` (off) + `_brain.enabled` (off). Verificado en código `functions/index.js`.

**Arquitectura (Opción A verificada):** solo-LLM + Tool Calling real. El inventario SALE del prompt (hoy
`composeSystemPrompt` lo inyecta inline, `index.js:1190`) y el hack `[CTA:]` (`index.js:1462-1476`) se reemplaza
por tool-use real (`callAnthropic` HOY no envía `tools[]`, `index.js:1063` — ese es el gap a llenar).

1. **Tools server-side (payload CAPADO — anti Tool-Hallucination/DDoS, Gemini):**
   - `search_inventory({marca?,modelo?,year_min?,year_max?,precio_max?,tipo?})` → reusa `fetchInventoryForLLM`
     con filtros; devuelve **máx 3** vehículos JSON ultraligero (id/marca/modelo/year/precio/url). El render del
     carro lo hace código determinista desde Firestore, NUNCA specs en texto del LLM.
   - `submit_lead({nombre,celular,correo?,lead_quality:'hot'|'warm'|'cold',intent})` → escribe el lead. **Validación
     BACKEND** (Gemini-EPIC): nombre tipo "Mickey Mouse" o celular ≠ `^3[0-9]{9}$` → degrada `lead_quality` a
     cold/spam ignorando lo que dijo el LLM (anti prompt-injection). **Cero-pérdida:** sin handle → doc
     `incompleto`/origen 'bot' (NO toca el `throw` de `normalizeSolicitud` que protege los FORMULARIOS web — se queda, IAP).
   - (opcional) `get_faq(tema)` → FAQs sin stuffing.
2. **System prompt (rewrite de `composeSystemPrompt`):** role + reglas + anti-jailbreak + **guardrail
   anti-negociación EN MAYÚSCULAS** ("ESTRICTAMENTE PROHIBIDO NEGOCIAR PRECIOS O ACEPTAR OFERTAS; LOS PRECIOS SON
   FINALES" — alucinación financiera/legal, Gemini-EPIC) + "si no sabes, llama una tool o escala". SIN inventario
   inline. Mantener el `cache_control` del system (−90% input; Haiku 4.5 lo soporta).
3. **Tool-use loop en `callAnthropic`:** añadir `tools:[...]` al body; si `stop_reason==='tool_use'` → ejecutar
   tool(s) server-side → append `tool_result` → re-llamar (**máx ~3 iteraciones/turno**, anti-loop). Acumular
   `usage` de CADA iteración a `recordSpend` (el techo global F1.a ya cuenta tokens reales).
4. **Flag `engine:'v2'`:** el cliente manda `engine` en `data`; el server bifurca v2 (tool loop) vs v1 (`[CTA:]`
   actual) — **v1 INTACTO** hasta retirar el flag (corte limpio = F6). A/B por sessionId 10%→100%.
5. **GATE antes de encender (F1 diferido):** `enforceAppCheck:true` en el `onCall` (hoy AUSENTE, `index.js:1369`)
   + rate-limit por IP + turn-cap ~15 (escala a humano) + indicador "Escribiendo…" (latencia 4-6s
   onCall→Anthropic). **DECISIÓN DUEÑO 23/06: App Check QUEDA EN MONITOR** (bajo flujo; el **techo global $15
   es el muro** anti-DoW — lo que Gemini llamó "tu salvavidas"); enforce diferido a "cuando crezcamos".
6. **Verificación F3:** unit del tool loop (mock Anthropic `tool_use`); E2E live `engine:'v2'` cohorte 10%
   (post-merge, dueño); **recorrer `submit_lead` cero-pérdida end-to-end** (anónimo sin handle → `incompleto`, NO se pierde).

**Decisiones dueño 2026-06-23 (GO-conditions resueltas):** (1) techo **$15/mes** ✅ · (2) App Check **MONITOR**
(no enforce ahora) · (3) TTL = **anonimizar @30d** (no borrar; Ley 1581 minimización).

**Estado F3:** **F3-a ✅ + F3-b ✅ implementados en `dev`** (Tool Calling dormiente tras `engine:'v2'` +
`_brain.enabled=false`; v1 intacto). Tools: `search_inventory` (read-only, payload cap 3) + `submit_lead`
(escribe `solicitudes` origen 'bot' reusando `onSolicitudCreated` → dedup+asigna+alerta asesor; **validación
backend** degrada `lead_quality` ante basura; **consent CONSERVADOR** `consentGiven=false` → lead capturado +
asignado SIN asumir marketing = Ley-1581-safe + cero-pérdida; el texto de consent EXPRESO sigue gate P4).
**PEND DEPLOY** (F1.a+F3 como UNIDAD, justo antes del flip; prod corre v1 con LLM apagado → seguro).
**TTL ✅** (`anonymizeIdleAnonChats`, scheduled diario, **DRY-RUN por defecto** `config/altorTTL.enabled=false`:
marca anónima segura `!userId && !historicalUserKey` + closed + idle>30d; FASE 1 redacta PII del parent;
messages-subcol = fase 2; idempotente/capado/auditado; pend deploy). **wiring `engine:'v2'` ✅** (`concierge.js`: cohorte `V2_ROLLOUT_PCT`, default 100; fuera del cohorte → Free Core; inerte hasta el enable). **Merge #917 ✅ + `firebase deploy` ✅** (2026-06-23: chatLLM v2 + anonymizeIdleAnonChats en prod; bot DORMIDO, `_brain.enabled=false`; drift code↔deployed resuelto). 🔜 **ENABLE = único paso restante**: dueño pone `_brain.enabled=true` en el portal (Cerebro→Activo) → verificación eyes-on (kill-switch instantáneo + $15 cap + fallback Free Core). Rampa opcional: bajar `V2_ROLLOUT_PCT`.

## Checklist
- [x] Diagnóstico verificado en código (2026-06-22): bot NO conectado al CRM (`grep`=0), `chatLLM` existe. (TODO-34)
- [x] Red-team Gemini ✅ (2026-06-22) → Plan FINAL (crudo bóveda `22d52a9`).
- [x] Comité ACOTADO #1 ✅ (2026-06-22): costo-Anthropic · Ley 1581 · breaker-vaporware · premisa-híbrida. Crudo `242bc41`.
- [x] Re-verificar contratos reales (`sanitizeContactId`/`onSolicitudCreated`) ✅ 2026-06-23: claim de colisión REFUTADO; GAP real = anónimos se PIERDEN; consent ya plomeado. (TODO-34)
- [x] Diagnóstico ARQUITECTURA verificado ✅ 2026-06-23 (`dual-core.js`): el híbrido viejo = Free Core determinista 5,600L (lo que falló); chatLLM sin AppCheck + inventario-en-prompt + sin tool-use. (TODO-34)
- [x] Comité ACOTADO #2 (arquitectura) ✅ 2026-06-23: convergencia 4/4 en **B-moderno** (router=UI + LLM+tools); captcha-UI=cosmético→App Check enforce; tope $12-15/mes; F1-primero. (TODO-34)
- [x] **Capa 3 — Gemini red-team ✅ 2026-06-23**: recomendó A (no B); verificado por-claim (precio refutado: Haiku 4.5 = $1/$5, no $0.25/$1.25). Crudo bóveda `research-archive/2026-06-23-TODO34-gemini-redteam-CRUDO.md`.
- [x] **VEREDICTO FINAL ✅: Opción A** (solo-LLM + Tool Calling + botones tontos de navegación), guards-first. A↔B parcialmente semántica; con guards las ventajas de B son marginales; A gana por mantenibilidad + corte limpio + honra el instinto del dueño. Evidencia: ADJUDICACIÓN en `research-archive/2026-06-23-TODO34-gemini-redteam-CRUDO.md`.
- [x] **EPIC expandido + Comité #3 (captura/UX/qualifier) ✅ 2026-06-23** + **Gemini red-team del EPIC ✅** (reorden captura↔bot + 4 guardrails). Pipeline completo = 3 comités + 2 Gemini, verificado por-claim. Crudos en bóveda `research-archive/`. (TODO-34)
- [x] **Confirmación dueño ✅ 2026-06-23**: plan EPIC + techo $15 · App Check MONITOR · TTL anonimizar@30d · **GO al flip**. (TODO-34)
- [x] **Client wiring `engine:'v2'` ✅ 2026-06-23** (`concierge.js` cohorte `V2_ROLLOUT_PCT`; inerte hasta enable). (TODO-34)
- [x] **Merge #917 + deploy functions ✅ 2026-06-23** (chatLLM v2 + anonymizeIdleAnonChats en prod; bot dormido). 🔜 **ENABLE** `_brain.enabled=true` (portal) = bot v2 live + verif eyes-on. (TODO-34)
- [x] **Implementación: F1.a ✅ · F2.a ✅ · F2.b ✅** (2026-06-23, en `dev`): techo gasto + memoria corta · cédula fuera · WhatsApp en gate + voz Colombia + 3 botones tontos en la bienvenida (reusan `data-quick-reply`). (TODO-34)
- [x] **F3 diseño execution-ready ✅ 2026-06-23** (§F3 arriba: tools + system-prompt rewrite + tool-loop en `callAnthropic` + flag `engine:'v2'` + gate App Check). Pend GO dueño. (TODO-34)
- [x] **F3-a ✅ 2026-06-23** (Tool Calling read-only `search_inventory` + `engine:'v2'` dormiente + v1 intacto, en `dev`; pend deploy). GO dueño resuelto: techo $15 · AppCheck monitor · TTL anonimizar@30d. (TODO-34)
- [x] **F3-b ✅ 2026-06-23** (`submit_lead`: escribe `solicitudes` origen 'bot' reusando `onSolicitudCreated`; validación backend + `lead_quality` + consent conservador `consentGiven=false` Ley-1581-safe; cero-pérdida; dormiente en `dev`). Consent EXPRESO = gate P4 antes del flip. (TODO-34)
- [x] **TTL ✅ 2026-06-23** (`anonymizeIdleAnonChats`: scheduled diario, DRY-RUN por defecto; anonimiza chats anónimos `!userId&&!historicalUserKey` cerrados >30d, FASE 1 PII del parent; idempotente/capado/auditado; pend deploy). Owner revisa dry-run en auditLog → `config/altorTTL.enabled=true`. Messages-subcol = fase 2. (TODO-34)
- [ ] Implementar F1→F6 (plan arriba), verificación por fase §G.4. **F1 (candados + frenar hemorragia + TTL) primero** — bajo riesgo, valor inmediato.
