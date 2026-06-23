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

## Checklist
- [x] Diagnóstico verificado en código (2026-06-22): bot NO conectado al CRM (`grep`=0), `chatLLM` existe.
- [x] Red-team Gemini ✅ (2026-06-22) → Plan FINAL (crudo bóveda `22d52a9`).
- [x] Comité ACOTADO #1 ✅ (2026-06-22): costo-Anthropic · Ley 1581 · breaker-vaporware · premisa-híbrida. Crudo `242bc41`.
- [x] Re-verificar contratos reales (`sanitizeContactId`/`onSolicitudCreated`) ✅ 2026-06-23: claim de colisión REFUTADO; GAP real = anónimos se PIERDEN; consent ya plomeado.
- [x] Diagnóstico ARQUITECTURA verificado ✅ 2026-06-23 (`dual-core.js`): el híbrido viejo = Free Core determinista 5,600L (lo que falló); chatLLM sin AppCheck + inventario-en-prompt + sin tool-use.
- [x] Comité ACOTADO #2 (arquitectura) ✅ 2026-06-23: convergencia 4/4 en **B-moderno** (router=UI + LLM+tools); captcha-UI=cosmético→App Check enforce; tope $12-15/mes; F1-primero.
- [ ] **Capa 3 — Gemini red-team (anti-anclado)**: la corre el dueño; integrar + VERIFICAR cada claim.
- [ ] **Decisión del dueño (reencuadrada): (1) confirmar B-moderno · (2) techo USD/mes (~$15) · (3) aceptar gate real = App Check enforce (no captcha visible).**
- [ ] Implementar por fases: F1 cero-pérdida → guards (AppCheck+gate costo) → engine v2 tras flag A/B → clasificador chico → poda determinista al final.
