# B1 — Auditoría funcional del bot / LLM / Cerebro AI (TODO-46 · Fase B)

> **Relevo curado (handoff) — escrito 2026-06-26 al cerrar el ciclo de gobernanza (Fase A ✅).**
> Pedido del dueño: PARÓ las features de Altorra para auditar de verdad lo funcional del bot/LLM
> en la plataforma nueva. **El plan NO es poner cosas por poner — es auditar qué SIRVE, quitar lo
> que no, e implementar lo que falte.** Modelo: Opus 4.8 ⟦rev-Fable⟧.

## Las preguntas del dueño (literales, a responder con evidencia)
1. **No veo la config del LLM en el admin nuevo.** ¿Dónde está? ¿Existe? ¿Se perdió en el cutover a `admin-app/`? (El bot LLM #917 está DESPLEGADO pero DORMIENTE por saldo — TODO-34.)
2. **"Cerebro AI"** (módulo `cerebro` del admin-app): son "puras preguntas" (FAQs) con **"sembrar base"** y **"nueva FAQ"** — ¿para qué sirve esto en el plan de la reestructuración? ¿Es funcional? ¿Se queda o se va?
3. **"No entendí"** (módulo `unmatched`): ¿para qué nos sirve? (Diseñado como las "fugas" del bot = queries sin match.) ¿Sigue teniendo sentido con el bot LLM (Tool Calling) que reemplaza el match por FAQ?

## Principio rector
Auditar la **realidad funcional**, no la intención documentada. Lo que no sirva en la plataforma
nueva → se elimina (anti-código-muerto, skill `anti-codigo-muerto`). Lo que se requiera → se implementa.
Decidir POR el sistema completo (negocio · mantenibilidad), no "está ahí, déjalo".

## Enfoque recomendado (desbloqueado por la doctrina refinada §ACOTADO)
**Fan-out read-only** de agentes (in-cwd read-only + structured output + auto-relanzar — NO se cuelga):
mapear el código REAL y reportar qué está cableado/usado vs huérfano. Targets:
- Bot cliente: `js/concierge/concierge.js` · admin: `js/admin/admin-concierge.js` (¿cargado aún? `admin.html` está en `_legacy/`).
- LLM backend: las Cloud Functions del bot (`functions/` — `chatLLM`/`onLeadIntake`/etc.) + el módulo `admin-app/src/modules/cerebro/` (FAQs `_brain`, "sembrar base", "nueva FAQ") + `admin-app/src/modules/unmatched/`.
- Verificar: ¿qué colección/endpoint lee cada uno de verdad? ¿el "Cerebro AI" alimenta al bot LLM o es legacy del bot viejo de match? ¿"No entendí" se sigue poblando?
- Cruzar con: TODO-34 (EPIC bot LLM Opción A), `docs/crm-handoff.md`, `docs/SETUP-LLM.md`, defectos en `altor-hub-rediseno-defectos.md`.

## Secuencia
Fase A (cerebro/skills) ✅ — doctrina comité ×5 · Wompi ×5 · aliados=TODO-25 · bug-menús `1556e27`.
**B1 = ahora.** Luego Fase C (TODO-47, diseño). Salida de B1: veredicto qué-queda/qué-se-va/qué-falta + plan de implementación verificado.
