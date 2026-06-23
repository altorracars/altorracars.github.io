# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> 🤖 **Opus 4.8** (Fable 5 caído): footer `Modelo: Opus 4.8` + tag `⟦OPUS-4.8 · rev-Fable⟧` (detalle → `05`).

> 🔜 **EPIC "ALTOR Hub v2" = FOCO ÚNICO** (dueño 23/06): bot LLM + captura + UX widget + UX chat interno ANTES de CRM/admin/migración/demás. **Detalle (6 fases · crudos · verificaciones · hallazgos) → spec `2026-06-22-TODO34-…` §EPIC + memoria `project-altor-hub-v2-epic`.** Arquitectura = **Opción A** (solo-LLM+Tool Calling+botones+guards; 3 comités + 2 Gemini verificados). Orden: **F1 guards → F2 captura → F3 bot v2 → F4/F5 UX → F6 poda.**
> EN CURSO (todo en `dev`): **F1.a✅** techo $ + memoria corta · **F2.a✅** cédula fuera + saludo · **F2.b✅** WhatsApp en gate + voseo→Colombia + botones tontos bienvenida · **F3-a✅+F3-b✅** Tool Calling tras `engine:'v2'` dormiente (search_inventory read-only + submit_lead→`solicitudes` origen 'bot', consent-conservador-P4; v1 INTACTO). ⚠️ **LLM apagado** (`_brain.enabled=false`) + **functions PEND DEPLOY** (F1.a+F3 como UNIDAD justo antes del flip; prod corre v1 → seguro). **Decisiones dueño 23/06:** techo **$15**✅ · App Check **MONITOR** (enforce al crecer; techo=el muro anti-DoW) · TTL **anonimizar@30d** (no borrar). 🔜 TTL mecanismo (anonimizar@30d, `autoResolveIdleChats`) → wiring `engine:'v2'` en cliente → flip A/B. **Pend dueño:** consent EXPRESO (P4 abogado; submit_lead ya captura conservador) · merge `dev`→`main`.

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
| **TODO-28** | **Split §G / des-saturación (§206/§208.1) ⟦OPUS-4.8⟧** — A0/A5/A6/A7/A9 ✅; diseño **Núcleo Delimitado** byte-hasheado ×3. **Absorbido por TODO-32** (el §G se vuelve genoma machine-checkable). | 🔄 | vía TODO-32 |
| **TODO-29** | **Endurecer el lazo (§207/§208.2) ⟦OPUS-4.8⟧** — git-gates → **abolir estado-git en `05`**: SessionStart hook inyecta git-state en boot. Kernel/hook ×3. (Aún: shard 99a/99b · `ignoreDirs`.) | 🔄 | kernel/hook ×3 |
| **TODO-30** | **Despliegue-DINERO "Doble Llave + Staging" (§208.3) ⟦OPUS-4.8⟧** — gate IA (tests/invariantes BLOQUEANTES en CI) + acceptance Kary en STAGING + dueño autoriza prod. Aplica cars (F42/§TODO-25)+bersaglio. | 🔮 | Staging (dueño) |
| **TODO-32** | **ESCALABILIDAD del cerebro** — paso (a)§228 + (b)§229 ✅ (guardián del índice + replicación SELECTIVA ×brains; detalle→§229/L-52). RESTA (YAGNI): genoma frontmatter + tiering 100x. | 🔮 futuro | YAGNI |
| **TODO-33** | **Reconciliación CEREBRO ↔ WEB REAL** (autocrítica 22/06: decía "27 functions", hay **57**). Meta: `brain-check` valida la estructura INTERNA, no la realidad EXTERNA. **PARCIAL ✅ (§230)**: functions categorizadas (57) + colecciones reconciliadas en `20-ESPACIAL`/`dependency-map`. Resta: Storage/rules/índices + confirmar colecciones documentadas-pero-vacías. | 🔄 parcial | al final |
| **TODO-34** | **EPIC ALTOR Hub v2 — bot LLM + captura + UX widget + UX chat interno ⟦OPUS-4.8⟧** (FOCO ÚNICO). Pipeline completo (3 comités + 2 Gemini, verificado). **Arquitectura = Opción A** (solo-LLM + Tool Calling + botones + guards). 6 fases → spec §EPIC + memoria `project-altor-hub-v2-epic`. **F1.a ✅** (techo global gasto + memoria corta) · **F2.a ✅** (cédula fuera, nombre+celular, saludo Colombia) · **F2.b ✅** (WhatsApp gate + voseo→Colombia) · **F3-a+F3-b ✅** (Tool Calling dormiente: search_inventory + submit_lead, pend deploy). 🔜 TTL → flip A/B. Crudos bóveda 23/06 ×5. | 🔄 EN CURSO | dueño: techo $/mes · TTL · consent (abogado) · merge p/ verif live |
| **TODO-35** | **Eliminación SEGURA de código muerto (anti-Knight-Capital) ⟦OPUS-4.8⟧** — al implementar/fix/mejorar, revisar+ELIMINAR/cuarentenar el código viejo superpuesto (no solo apilar): dead-code, flags reutilizados, paths huérfanos, **deploy incompleto ×N targets**. Disparar SIEMPRE en el workflow + alinear TODOS los cerebros. Detonante: **Knight Capital 1-ago-2012, $460M en 45 min** por código viejo (`Power Peg`) en 1 de 8 servidores. Relaciona: IAP §3.4.C + guardián §G.4 (`_legacy/`) + caza-bugs + TODO-30. **Brief → spec `2026-06-23-TODO35-dead-code-elimination-brief.md`.** Decisión (skill/agente/gate) = **SESIÓN FRESCA DEDICADA** (pedido dueño). | 🆕 capturado | sesión fresca dedicada |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📝 Bitácora (efímera)

> (Histórico 12-22/06 §184-§231 → `99`/`00`/`30`.) **23/06 (EPIC ALTOR Hub v2)**: pipeline TODO-34 (3 comités + 2 Gemini → veredicto **Opción A**; reorden captura-antes-del-bot + 4 guardrails) → 5 crudos bóveda + spec §EPIC + memoria. Avance en `dev`: **F1.a · F2.a · F2.b · F3-a ✅** (F3-a Tool Calling dormiente, pend deploy). `proceso-decision-fuerte v2` + skill `meta-ads-diagnostico` ×4. **TODO-35 capturado** (anti-Knight-Capital). 🔜 F3-b.
