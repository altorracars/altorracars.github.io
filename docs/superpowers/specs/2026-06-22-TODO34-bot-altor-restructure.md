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

## Plan PROPUESTO (fases por riesgo; sujeto a red-team Gemini)
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

## Checklist
- [x] Diagnóstico actual verificado en código (2026-06-22): bot NO conectado al CRM (grep), chatLLM existe.
- [ ] Red-team Gemini (prompt entregado al dueño).
- [ ] Decisión del dueño sobre alcance/fases.
- [ ] Implementación por fases (F1 primero — el puente al CRM).
