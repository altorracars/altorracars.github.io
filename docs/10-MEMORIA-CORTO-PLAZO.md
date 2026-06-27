# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> 🤖 **Opus 4.8** (Fable caído): tag `⟦OPUS-4.8 · rev-Fable⟧`.
>
> **Bot LLM = saldo** (#917 dormido). Cerrado reciente → `99`/`main`.
>
> 🔵 **FOCO (27/06 PM — FLUJO DISEÑO bot v2, W-11)**: dueño reportó 3 bugs LIVE del Free Core → **B1** filtro
> miente · **B2** callejón · **B3** zombie sin reset. Flujo fuerte corrido (2 comités+caza-bugs+Firebase MCP+
> mockup+Gemini). **IMPLEMENTADO+verificado preview (DOM), commit en `dev`**: árbol de NODOS+navStack, deep-link
> `goto:busqueda.html?categoria=/?precioMax=` + `busqueda.html applyUrlFilters`, reset header (confirm in-app),
> fixes caza-bugs (gate-reopen, escalado→WhatsApp honesto), wins a11y (FAB quieto, reduced-motion, focus-visible).
> Detalle → `altor-hub-rediseno-defectos.md` §F-1. **PEND**: (1) **validación LIVE que YO conduzco** (extensión)
> tras merge+deploy — flag default=v1 = riesgo cero. (2) DIFERIDO iter-2: Por marca · FAQ (texto del dueño) ·
> ARIA modal/trap/Escape · visual profundo. Cierre→ADR+00 tras live. Drift CRM: TODO-48/41/49.
>
> 🗄️ **Durable**: **⚖️ Gate P4** — legal público NO sin abogado (§42).
>
> **🚫 Callejones sin salida (NO reintentar)**:
> (a) **NO custom claims ahora** — reglas Fase 1 usan lookup `usuarios/{uid}`; claims = Fase 5 (§159.3).
> (b) **NO `preview_screenshot`** (se cuelga tras `preview_resize`, L-28) — usar `preview_snapshot`+`preview_eval`.
> (c) Consejo Externo = Gemini/Antigravity **code-aware solo-lectura** (§224); cuándo + R1-R4 → `§15`; seguridad/dinero/arquitectura ESTRUCTURAL, no rutina.
> (d) **NO E2E de forms en localhost** (L-08/§175) — E2E solo contra live; UI con stub `window.db`.
> (e) **NO mutar config de producción vía MCP** (el clasificador lo deniega) — ruta: acción de 1 clic del dueño (patrón F39) o autorización explícita.
> (f) **Fan-out acotado escala LIBRE** si agente = in-cwd read-only + structured-output + sin tools gateadas (git/fuera-cwd cuelga en bg → worktree/foreground). L-50/§226.
> (g) **Bot v2 = grafo de nodos tras flag** (default v1, riesgo cero). v1 battle-tested INTACTO; NO big-bang, NO Vite (vanilla). Módulo `js/concierge/shared/` (NO copiar). Detalle → defects-log §F-1.
> (h) **Auditoría verifica CÓDIGO, no DEPLOY** — claim "LIVE" se chequea live (Firebase MCP), no por inferencia; verificadores SIN Bash (cuelgue gateado L-50). Panel ≠ journal.
> (i) **Validación live SIN screenshot = cobertura fingida (M-23)** — el DOM caza texto/lógica, NO diseño (avatar/layout) → screenshot del render (extensión `computer`; preview cuelga L-28). Dueño cazó visuales que el solo-DOM no vio.

---

## 📋 Pendientes abiertos (TODO-NN) — ledger ÚNICO de pendientes

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-01/02·03·06·07/08·09-13·15·18** | Legacy diferidos/opcionales/absorbidos (Cloudflare+Vite·CSS·SEO·CSAT·deuda·skills·blindaje→E5). **Detalle §109**. | 🔮/✅ | varios |
| **TODO-19** | CRM Fase 5 → E6 EN CURSO (E6.6 ✅ §188) | ⏳ | — |
| **TODO-49** | **🔁 Re-barrido del gap ⟦OPUS⟧** — 1er barrido incompleto (7 verificadores colgados). Re-lanzar SIN Bash (callejón h) sobre lo no verificado. | 🔵 | tras implementar |
| **TODO-21** | **Plan CRM E0→E6** — E0→E5 ✅ main · E6 ⏳ (§188) | ⏳ | — |
| **TODO-22** | **Fábrica de skills web** (rescate webs monolíticas) §193.2 | 🔮 | post-panel |
| **TODO-23** | **DINAMISMO/CMS web TOTAL ⟦OPUS-4.8⟧** — secciones editables + bloques tipados. CMS por marca ✅ (§222); resta CMS total. Plan→bóveda · skill `cms-dinamico`. | 🔮 plan ✅ | al final |
| **TODO-24** | **Comité BORRADORES** §202.5 — f1+2+3 ✅(§230). Resta: barrido recurrente → futuro. | 🔄 | futuro |
| **TODO-25** | **RESTRUCTURA COMERCIAL ⟦OPUS⟧** (aliado/consigna/propio + comisiones) — DISEÑO FROZEN (bóveda sec.9). Pend: aliado-neto + fórmula fiscal (contador). | 🔄 impl pend | al FINAL |
| **TODO-26** | **Sistema FACTURACIÓN + super-CRM ⟦OPUS-4.8⟧** (facturación/financiero/contable en panel admin) — consultar Bersaglio al implementar. Bóveda `…restructura-comercial…` §8. | 🔒 ÚLTIMA fase | después de todo lo demás |
| **TODO-27** | **Alta de usuarios = invite flow seguro ⟦OPUS-4.8⟧** (token+transacción, anti-enumeración; reemplaza el alta vieja) — diseño Gemini en bóveda `2026-06-14-web-dinamismo-cms-plan.md §6.4`. Sugerir skill portable | 🔮 | DESPUÉS del dinamismo (orden dueño) |
| **TODO-29** | **Endurecer el lazo ⟦OPUS⟧** — git-state vía SessionStart hook; kernel/hook ×3. Resta: shard 99a/99b · `ignoreDirs`. | 🔄 | — |
| **TODO-30** | **Despliegue-DINERO "Doble Llave + Staging" (§208.3) ⟦OPUS-4.8⟧** — gate IA (tests/invariantes BLOQUEANTES en CI) + acceptance Kary en STAGING + dueño autoriza prod. Aplica cars (F42/§TODO-25)+bersaglio. | 🔮 | Staging (dueño) |
| **TODO-32** | **ESCALABILIDAD cerebro** — (a)§228+(b)§229 ✅ (guardián índice + replicación selectiva). RESTA (YAGNI): genoma frontmatter + tiering 100x. | 🔮 futuro | YAGNI |
| **TODO-34** | **EPIC bot LLM ⟦OPUS⟧** Opción A; F1-F3+wiring ✅ **DORMIENTE** (#917). FLIP=saldo. Bot v2→TODO-46/F-1. | 🔄 dormiente | dueño: saldo |
| **TODO-35** | **Código muerto (anti-Knight-Capital) ⟦OPUS⟧** — P0 `deadcode:check`✅ + P1 skill✅. Huérfanos del cutover (`manifest-admin.json`+`js/admin/*`, solo `admin.html` los cargaba→`_legacy/`). **DIFERIDO ~03/07** (cache, M-19). | 🔄 diferido | ~03/07 |
| **TODO-42** | **HUB de Visibilidad ⟦OPUS-4.8⟧ (§244)** — 7 skills + agente `seo-auditor` construidas+catalogadas+propagadas ×3 ✅ (25/06). RESTA (por-proyecto): Core JS `visibility-core/` + `tenant_config`. | 🔄 | por-proyecto |
| **TODO-41** | **🔴 Motor automatización NO corre post-cutover ⟦OPUS⟧** (§242.5/§257/barrido) — `admin-automation.js` era client-side SOLO en `admin.html` (retirado) → reglas "Activas" pero NO ejecutan (SLA/cita core SÍ por cron). Migrar a Cloud Function + gap RBAC `workflows.edit`. | 🔴 sube | dueño/escala |
| **TODO-45** | **Cleanups §257 ⟦OPUS⟧** — (a) functions residuales del clásico (desplegadas, sin uso) limpiar; (b) `brands.saveBrand` desc=nombre; (c) `kb.edit` sin editor `_brain`; (d/e) coment stale + NBA. | 🔮 | bajo |
| **TODO-43** | **MFA-hardening portal nuevo ⟦OPUS⟧ (§253)** — portal nuevo = email+password-only; el SMS-MFA del admin viejo (2FA/trusted/backup/Telegram) NO se portó. Reimplementar TOTP+recovery si el dueño quiere. NO bloquea. | 🔮 futuro | dueño |
| **TODO-40** | **Curas auditoría N2 §239 ⟦OPUS-4.8⟧** — (a) **freno duro del boot-budget** en el linter (hoy info-only 3 auditorías = M-10; boot +14%); (b) **gate/marker de drift source↔dist** admin-app (hoy la intención staging vive solo en prosa, AUD-04). Decidir mecanización vs aceptar-como-conocido. | 🔮 | bajo (no bloquea) |
| **TODO-44** | **Fiabilidad cerebro ⟦OPUS⟧** — §257 + cura M-22 (check #16 kernel, propagado ×4 ✅). RESTA: adopción `verificado-vivo:` + reconciliación. Absorbe TODO-33. | 🔄 ✅ | adopción |

| **TODO-46→F-1** | **Bot v2 FLUJO + chat vivo ⟦OPUS⟧** — rediseño (B1/B2/B3) VALIDADO LIVE ✅; +3 bugs post-validación FIXED: escalado **gatea datos** (no anónimo) · **chat asesor RECIBE** (subscribeToChat, contrato reglas ok) · búsqueda banner/doble-scroll/filtro/gap. Detalle→defects-log. RESTA: validar roundtrip chat live (dueño=asesor) + iter-2 (marca·FAQ·visual·ARIA). | 🔄 | roundtrip+iter2 |
| **TODO-48** | **Remediar drift CRM del cutover ⟦OPUS⟧ (barrido 26/06)** — features MF4.x construidas en admin viejo, NO portadas a admin-app: 360° tab "Actividad"(MF4.2) · Contactos workspace 4-KPIs(MF4.1) · acciones masivas checkbox/CSV/crmTags(MF4.3) · Postventa+NPS scheduler(MF4.8). +doc-fixes (verifySuperAdminV2 nombre · clientes/ subcols 5→2 · proactiveEngagement stale). Detalle→bóveda `…barrido-drift…`. | 🔵 nuevo | tras bot F-1 |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📝 Bitácora (efímera)

> Histórico §184-§256 → `99`/`00`/`30`. Defectos bot UX → `altor-hub-rediseno-defectos.md`.
