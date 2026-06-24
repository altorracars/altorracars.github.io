# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> 🤖 **Opus 4.8** (Fable 5 caído): tag `⟦OPUS-4.8 · rev-Fable⟧` en entregas (detalle → `05`).

> 🧭 **FOCO MAESTRO: PLAN UNIFICADO** (§237 — dueño "muchos planes sin un camino") → un camino: `admin-app/` (Vite) = portal único, apagar `admin.html`. **Yo manejo el orden técnico** (NO preguntar "qué sigue"; solo dueño decide dinero/legal/go-no-go — mem `feedback-collaboration-style`).
> ▶️ **RESUME**: F-0.5 (firebase.js multiTab+RTDB) ✅ · **F-2 (1/6) `usuarios` ✅ §238** (CEO candado, port LIMPIO, build+preview verif). **⚠️ dist GATEADO a staging** (batch F-0.5+F-2; firebase.js foundational, §237.6). Sigue **F-2 (2/6) Roles** (`admin-roles.js`→módulo `roles`, isSystem inmutable) → Deptos/Workflows/Auditoría/Ajustes → F-1 bot v2 Vite + staging + clean-slate E2E → F-3 Dashboard → F-4 Hub→admin-app → F-5 fugas (dedup `session:ID`) → F-6 cutover. Receta port → L-53. Detalle → §238/§237.7 + plan §6.
> ⚠️ **Pend cron-bump**: §236 (#7 gate-takeover + ícono WhatsApp) ya en `main`; no se ven live hasta el bump del cron (Ctrl+Shift+R). Lead `PRUEBA-CLAUDE`/`3001112233` en prod → purga en clean-slate. Bot LLM DORMIENTE (#917) = saldo Anthropic (al final, no bloquea).

> 🗄️ **Fuera del foco (status → TODO + `99`):** CRM E0→E6 ✅ main (④b parqueado) · CMS marca ✅ (TODO-23 resto) · cerebro v6 ✅ (TODO-28/29/30) · pendientes cliente → `05` flags.
> ⚖️ **Gate P4 vigente** (durable): el TEXTO legal público (supresión/privacidad/**consent del gate F2**) NO se publica sin abogado (§42).
>
> **🚫 Callejones sin salida (NO reintentar)**:
> (a) **NO custom claims ahora** — reglas Fase 1 usan lookup `usuarios/{uid}`; claims = Fase 5 (§159.3).
> (b) **NO `preview_screenshot`** (se cuelga tras `preview_resize`, L-28) — usar `preview_snapshot`+`preview_eval`.
> (c) Consejo Externo = Gemini/Antigravity **code-aware solo-lectura** (§224); cuándo + R1-R4 → `§15`; seguridad/dinero/arquitectura ESTRUCTURAL, no rutina.
> (d) **NO E2E de forms en localhost** (L-08/§175) — E2E solo contra live; UI con stub `window.db`.
> (e) **NO mutar config de producción vía MCP** (el clasificador lo deniega) — ruta: acción de 1 clic del dueño (patrón F39) o autorización explícita.
> (f) **NO fan-out grande/background de agentes en esta máquina** (cuelga en lecturas gateadas git/fuera-cwd + quema tokens, L-50/§226/§239) — usar ACOTADO: 1 agente in-cwd read-only o comité foreground sin tools (verificado: §237 + §239 acotados NO colgaron).

---

## 📋 Pendientes abiertos (TODO-NN) — ledger ÚNICO de pendientes

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-01/02·03·06·07/08·09-13·15·18** | Legacy diferidos/opcionales/absorbidos: Cloudflare+Vite · critical CSS · cartagena SEO · CSAT+transferencias · deuda técnica menor · skills anomalías · blindaje→E5 (§176). **Detalle §109** + `41`/`42` | 🔮/✅ | varios |
| **TODO-19** | CRM Fase 5 cutover → **E6 EN CURSO**: E6.6 ✅ §188 → paso 0 pre-fase | ⏳ | — |
| **TODO-20** | **Comité v6 21/21** (A-U) — detalle §173/§207.11; follow-up cross-repo → TODO-28/29/30 | 🔄 | — |
| **TODO-21** | **Plan CRM E0→E6** — ledger en VEREDICTO (bóveda). **E0→E5 ✅ en main** · E6 ⏳ (plan 29 pasos §188) | ⏳ | — |
| **TODO-22** | **Fábrica de skills web** (rescate webs monolíticas) §193.2 | 🔮 | post-panel |
| **TODO-23** | **DINAMISMO/CMS web TOTAL ⟦OPUS-4.8⟧** — secciones editables + bloques tipados. CMS por marca ✅ (§222); resta CMS total. Plan→bóveda · skill `cms-dinamico`. | 🔮 plan ✅ | al final |
| **TODO-24** | **Comité BORRADORES** §202.5 → f1+2 ✅ LIVE · f3 purga huérfanos ✅ (§230). Resta: barrido recurrente + expiración drafts → futuro. | 🔄 | futuro |
| **TODO-25** | **RESTRUCTURA COMERCIAL ⟦OPUS-4.8⟧** (aliado/consigna/propio + comisiones) — DISEÑO FROZEN (bóveda `…restructura-comercial…` sec.9). Pend menor: aliado-neto-constante + fórmula fiscal (contador). | 🔄 decidido·impl pend | al FINAL |
| **TODO-26** | **Sistema FACTURACIÓN + super-CRM ⟦OPUS-4.8⟧** (facturación/financiero/contable en panel admin) — consultar Bersaglio al implementar. Bóveda `…restructura-comercial…` §8. | 🔒 ÚLTIMA fase | después de todo lo demás |
| **TODO-27** | **Alta de usuarios = invite flow seguro ⟦OPUS-4.8⟧** (token+transacción, anti-enumeración; reemplaza el alta vieja) — diseño Gemini en bóveda `2026-06-14-web-dinamismo-cms-plan.md §6.4`. Sugerir skill portable | 🔮 | DESPUÉS del dinamismo (orden dueño) |
| **TODO-28** | **Split §G / des-saturación ⟦OPUS-4.8⟧** — **Absorbido por TODO-32** (§G → genoma machine-checkable). | 🔄 | vía TODO-32 |
| **TODO-29** | **Endurecer el lazo ⟦OPUS-4.8⟧** — git-state vía SessionStart hook (abolir git en `05`); kernel/hook ×3. Resta: shard 99a/99b · `ignoreDirs`. | 🔄 | kernel/hook ×3 |
| **TODO-30** | **Despliegue-DINERO "Doble Llave + Staging" (§208.3) ⟦OPUS-4.8⟧** — gate IA (tests/invariantes BLOQUEANTES en CI) + acceptance Kary en STAGING + dueño autoriza prod. Aplica cars (F42/§TODO-25)+bersaglio. | 🔮 | Staging (dueño) |
| **TODO-32** | **ESCALABILIDAD del cerebro** — paso (a)§228 + (b)§229 ✅ (guardián del índice + replicación SELECTIVA ×brains; detalle→§229/L-52). RESTA (YAGNI): genoma frontmatter + tiering 100x. | 🔮 futuro | YAGNI |
| **TODO-33** | **Reconciliación CEREBRO ↔ WEB REAL** (brain-check valida estructura interna, no realidad externa). **PARCIAL ✅ §230**: 57 functions + colecciones reconciliadas. Resta: Storage/rules/índices + colecciones vacías. | 🔄 parcial | al final |
| **TODO-34** | **EPIC bot LLM ⟦OPUS-4.8⟧** Opción A (solo-LLM+Tool Calling+botones+guards); F1.a·F2·F3·TTL·wiring ✅ **DORMIENTE** (#917). FLIP = saldo Anthropic (al final). F4/F5→§236; ahora parte del PLAN UNIFICADO §237. | 🔄 dormiente | dueño: saldo·consent |
| **TODO-35** | **Código muerto (anti-Knight-Capital) ⟦OPUS-4.8⟧.** **P0 `deadcode:check`✅ + P1 skill `anti-codigo-muerto`✅ + propagada ×4+global ✅ (§232).** 🔜 P2 workflow bounded + limpiar bot viejo (en F4/F5). M-19. | 🔄 P0+P1✅ | resto: P2·bot |
| **TODO-40** | **Curas auditoría N2 §239 ⟦OPUS-4.8⟧** — (a) **freno duro del boot-budget** en el linter (hoy info-only 3 auditorías = M-10; boot +14%); (b) **gate/marker de drift source↔dist** admin-app (hoy la intención staging vive solo en prosa, AUD-04). Decidir mecanización vs aceptar-como-conocido. | 🔮 | bajo (no bloquea) |
| **TODO-39** | **🧭 PLAN UNIFICADO un-solo-panel-admin ⟦OPUS-4.8⟧ — FOCO MAESTRO** (spec `…PLAN-UNIFICADO…`). Portal único `admin-app/`, apagar `admin.html`. Survey+comité+Gemini verif (6 hallazgos). **F-0.5 ✅ · F-2 (1/6) Usuarios ✅ §238** (dist gateado a staging); camino F0..F6 → foco/RESUME arriba. **F4/F5 (bot v2) consolidado §236, su resto = F-1 aquí.** | 🔄 F-2 (1/6) | dueño: dinero/legal/go-no-go |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📝 Bitácora (efímera)

> Histórico §184-§238 → `99`/`00`/`30`. **24/06 (F4/F5 + PLAN UNIFICADO)**: F4/F5 bot v2 Web Component + fixes live #7 gate-takeover/ícono WhatsApp + validación live (extensión Chrome manejada por mí) → **§236**; **survey 5-agentes (`wf_668bd020-e80`, in-cwd, NO se colgó) + comité + Gemini verif claim-a-claim → PLAN UNIFICADO §237** (Decisión Fuerte, foco maestro, Gemini revirtió su verdicto Hub); **F-0.5 iniciado**. **24/06 b (F-2 1/6)**: sync `dev`→`origin/main` (owner mergeó #938-945, ff-only) → módulo `usuarios` admin-app (port limpio, CEO candado, `vite build`+preview verif) → **§238** · dist gateado a staging con F-0.5 · receta de port → L-53. Defectos vivos → `altor-hub-rediseno-defectos.md` (#3/#4/#5/#6/C#1-C#4).
