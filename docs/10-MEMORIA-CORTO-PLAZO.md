# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> 🤖 **Opus 4.8** (Fable 5 caído): footer `Modelo: Opus 4.8` + tag `⟦OPUS-4.8 · rev-Fable⟧` (detalle → `05`).

> 🔜 **EPIC "ALTOR Hub v2"** (dueño 23/06; Opción A, 6 fases F1→F6 → spec `2026-06-22-TODO34` §EPIC + memoria `project-altor-hub-v2-epic`): **F1.a·F2·F3 (bot LLM+Tool Calling)·TTL·wiring v2 ✅ DEPLOYED pero DORMIENTE** (#917, Pages live). 🟡 LLM apagado; **saldo Anthropic = AL FINAL** (dueño 24/06: primero todos los planes documentados). Captura/leads: **TODO-37 ✅ §235** + backlog #1✅ #2✅.
> 🎨 **FOCO AHORA: F4/F5 = REDISEÑO TOTAL** del Bot ALTOR (widget) + ALTOR Hub (chat interno admin) — dueño 24/06: "diseño arcaico, mal responsive, pocas funciones". **= TODO-38, SESIÓN NUEVA** (plan completo en spec `2026-06-24-EPIC-F4F5-rediseno-total-altor-PLAN.md`: módulo paralelo v2 flag-gated, engine-agnóstico; Fases A-F con comité+Gemini+arquitecto+caza-bugs+validador+skills/tools de diseño).

> 🗄️ **Fuera del foco único (status en ledger TODO + `99`):** CRM E0→E6 ✅ en main (RBAC ④b parqueado) · CMS por marca ✅ (TODO-23 CMS total pend) · cerebro v6 ✅ (hardening TODO-28/29/30) · pendientes cliente → `05` flags (lead prueba `VMVMJG…` · F42 · billing GCP).
> ⚖️ **Gate P4 vigente** (durable): el TEXTO legal público (supresión/privacidad/**consent del gate F2**) NO se publica sin abogado (§42).
>
> **🚫 Callejones sin salida (NO reintentar)**:
> (a) **NO custom claims ahora** — reglas Fase 1 usan lookup `usuarios/{uid}`; claims = Fase 5 (§159.3).
> (b) **NO `preview_screenshot`** (se cuelga tras `preview_resize`, L-28) — usar `preview_snapshot`+`preview_eval`.
> (c) Consejo Externo = Gemini-vía-Antigravity **code-aware solo-lectura** (§224 corrigió "no ve código"); triggers + refinamientos R1-R4 en `§15`; usar en seguridad/dinero/arquitectura ESTRUCTURAL, no rutina.
> (d) **NO E2E de forms en localhost** (L-08/§175) — E2E solo contra live; UI con stub `window.db`.
> (e) **NO mutar docs de config de producción vía MCP** — el clasificador lo deniega; ruta correcta:
> dejarlo como acción de 1 clic del dueño en el portal (patrón F39) o pedir autorización explícita.

---

## 📋 Pendientes abiertos (TODO-NN) — ledger ÚNICO de pendientes

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-01/02·03·06·07/08·09-13·15·18** | Legacy diferidos/opcionales/absorbidos: Cloudflare+Vite · critical CSS · cartagena SEO · CSAT+transferencias · deuda técnica menor · skills anomalías · blindaje→E5 (§176). **Detalle §109** + `41`/`42` | 🔮/✅ | varios |
| **TODO-19** | CRM Fase 5 cutover → **E6 EN CURSO**: E6.6 ✅ §188 → paso 0 pre-fase | ⏳ | — |
| **TODO-20** | **Comité v6 21/21** (A-U) — detalle §173/§207.11; follow-up cross-repo → TODO-28/29/30 | 🔄 | — |
| **TODO-21** | **Plan CRM E0→E6** — ledger en VEREDICTO (bóveda). **E0→E5 ✅ en main** · E6 ⏳ (plan 29 pasos §188) | ⏳ | — |
| **TODO-22** | **Fábrica de skills web** (frontend/backend/framework; arranque + **RESCATE de webs monolíticas**, ampliado 12/06) §193.2 | 🔮 | post-panel (orden ratificado) |
| **TODO-23** | **DINAMISMO/CMS web TOTAL ⟦OPUS-4.8⟧** — todas las secciones editables (index/nosotros/contacto/columnas + bloques tipados; SSG extendido). **CMS por marca COMPLETO ✅ (§222)**; resta el CMS total. Plan→bóveda `2026-06-14-web-dinamismo-cms-plan.md` · skill `cms-dinamico`. Bugs: demo-cuando-vacío, lentitud SPA-feel. | 🔮 plan ✅ | "al final" |
| **TODO-24** | **Comité BORRADORES** §202.5 → **f1+2 ✅ LIVE (§227)** · **f3 Storage huérfanos: purga ✅** (406/78MB borradas, 256 vivas intactas; §230 + `orphans:scan`). Resta: barrido recurrente automático + expiración de drafts (Cloud Function) → futuro. | 🔄 f3 purga ✅ | auto: futuro |
| **TODO-25** | **RESTRUCTURA COMERCIAL ⟦OPUS-4.8⟧** (aliado/consigna/propio + comisiones) — DISEÑO FROZEN (bóveda `…restructura-comercial…` sec.9). Pend menor: aliado-neto-constante + fórmula fiscal (contador). | 🔄 decidido·impl pend | al FINAL |
| **TODO-26** | **Sistema FACTURACIÓN + super-CRM ⟦OPUS-4.8⟧** (facturación/financiero/contable en panel admin) — consultar Bersaglio al implementar. Bóveda `…restructura-comercial…` §8. | 🔒 ÚLTIMA fase | después de todo lo demás |
| **TODO-27** | **Alta de usuarios = invite flow seguro ⟦OPUS-4.8⟧** (token+transacción, anti-enumeración; reemplaza el alta vieja) — diseño Gemini en bóveda `2026-06-14-web-dinamismo-cms-plan.md §6.4`. Sugerir skill portable | 🔮 | DESPUÉS del dinamismo (orden dueño) |
| **TODO-28** | **Split §G / des-saturación ⟦OPUS-4.8⟧** — **Absorbido por TODO-32** (§G → genoma machine-checkable). | 🔄 | vía TODO-32 |
| **TODO-29** | **Endurecer el lazo ⟦OPUS-4.8⟧** — git-state vía SessionStart hook (abolir git en `05`); kernel/hook ×3. Resta: shard 99a/99b · `ignoreDirs`. | 🔄 | kernel/hook ×3 |
| **TODO-30** | **Despliegue-DINERO "Doble Llave + Staging" (§208.3) ⟦OPUS-4.8⟧** — gate IA (tests/invariantes BLOQUEANTES en CI) + acceptance Kary en STAGING + dueño autoriza prod. Aplica cars (F42/§TODO-25)+bersaglio. | 🔮 | Staging (dueño) |
| **TODO-32** | **ESCALABILIDAD del cerebro** — paso (a)§228 + (b)§229 ✅ (guardián del índice + replicación SELECTIVA ×brains; detalle→§229/L-52). RESTA (YAGNI): genoma frontmatter + tiering 100x. | 🔮 futuro | YAGNI |
| **TODO-33** | **Reconciliación CEREBRO ↔ WEB REAL** (brain-check valida estructura interna, no realidad externa). **PARCIAL ✅ §230**: 57 functions + colecciones reconciliadas. Resta: Storage/rules/índices + colecciones vacías. | 🔄 parcial | al final |
| **TODO-34** | **EPIC ALTOR Hub v2 — bot LLM + captura + UX ⟦OPUS-4.8⟧** (FOCO ÚNICO). Arquitectura **Opción A** (solo-LLM + Tool Calling + botones + guards); 6 fases → spec §EPIC + memoria `project-altor-hub-v2-epic`. **F1.a·F2.a·F2.b·F3-a/b·TTL·wiring v2 ✅** (dormiente, deployed #917). 🔜 FLIP: dueño mergea/recarga saldo → yo deploy+enable. **F4/F5 = TODO-38.** | 🔄 EN CURSO | dueño: saldo · consent (abogado) · merge p/ verif live |
| **TODO-35** | **Código muerto (anti-Knight-Capital) ⟦OPUS-4.8⟧.** **P0 `deadcode:check`✅ + P1 skill `anti-codigo-muerto`✅ + propagada ×4+global ✅ (§232).** 🔜 P2 workflow bounded + limpiar bot viejo (en F4/F5). M-19. | 🔄 P0+P1✅ | resto: P2·bot |
| **TODO-38** | **🎨 REDISEÑO TOTAL F4/F5 ⟦OPUS-4.8⟧** — Bot ALTOR (widget) + ALTOR Hub (chat interno admin): de "arcaico" → moderno/premium/responsive/+funciones. **Módulo paralelo v2 flag-gated** (v1 intacto, A/B real), engine-agnóstico (LLM al final). Plan → `2026-06-24-EPIC-F4F5-...PLAN.md`. **A✅** contratos v1+defectos (`…faseA-discovery-contratos`) · **B✅** dirección+4 mockups+flujo lead+comité (D1-D6: entrada ternaria mode×engine · captura en intención · `@container`+móvil-fullscreen · saludo logueado/no · WhatsApp+Bancolombia+dorado · Free Core buttons-only primero) → `…faseB-direccion-diseno` · **C** propuesta Web Component+Shadow DOM+flag XOR (`…faseC-arquitectura-propuesta`) → **red-team Gemini = STOP pactado**. Dueño: mandato autónomo, único stop=prompt Gemini (memoria `project-f4f5-design-directive`). | 🔄 Fase C/Gemini | dueño corre Gemini → sigo |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📝 Bitácora (efímera)

> Histórico 12-23/06 §184-§235 → `99`/`00`/`30`. **23-24/06 (skill validador + P0 leads)**: skill `validacion-live-chrome` (§232, ×4+global, 7 dimensiones: adversarial·sesión·diseño·consistencia·copy/flujo·scroll-DOM·exploración-autónoma; gate `skills:desc-check`). Cazó+cerró LIVE: §233 `_asesorJoinedAnnounced`, §234 fuga privacidad logout, **§235 TODO-37 P0 leads** (Decisión Fuerte completa: comité→Gemini→Option G→re-validado), + defectos #1✅/#2✅/duplicado-fechas✅. Resto defectos → `altor-hub-rediseno-defectos.md` (#3/#4/#5/#6/C#1 → van en el rediseño TODO-38). grounding=LLM off.
