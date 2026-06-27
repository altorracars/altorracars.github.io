# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> 🤖 **Opus 4.8** (Fable 5 caído): tag `⟦OPUS-4.8 · rev-Fable⟧` (detalle → `05`).
>
> ✅ **Cerrado reciente** (`99`/`main`): Fiabilidad §257+M-22×4 · W-11 F1+F2 + bug-menús · ciclo gobernanza 26/06. **Bot LLM = saldo.**
>
> 🔵 **FOCO VIVO — remediar drift (barrido 26/06 ✅)**: workflow cerebro↔código (105 cand.→**15 drift reales**/21 refutados; crudo→bóveda `…barrido-drift…SINTESIS`). Principal: **el cutover dejó caer features CRM MF4.x → TODO-48**. #15 RBAC "no desplegado" = FALSO (verif. live). Bot v2 (input ternario D1) confirmado sin cablear (TODO-46/F-1). **ORDEN: (1) bot F-1** [módulo `shared/`+§234/§80, callejón g] → (2) TODO-48 MF4.x → (3) TODO-41 → (4) TODO-47 diseño.
>
> 🗄️ **Durable**: **⚖️ Gate P4** — legal público NO sin abogado (§42).
>
> **🚫 Callejones sin salida (NO reintentar)**:
> (a) **NO custom claims ahora** — reglas Fase 1 usan lookup `usuarios/{uid}`; claims = Fase 5 (§159.3).
> (b) **NO `preview_screenshot`** (se cuelga tras `preview_resize`, L-28) — usar `preview_snapshot`+`preview_eval`.
> (c) Consejo Externo = Gemini/Antigravity **code-aware solo-lectura** (§224); cuándo + R1-R4 → `§15`; seguridad/dinero/arquitectura ESTRUCTURAL, no rutina.
> (d) **NO E2E de forms en localhost** (L-08/§175) — E2E solo contra live; UI con stub `window.db`.
> (e) **NO mutar config de producción vía MCP** (el clasificador lo deniega) — ruta: acción de 1 clic del dueño (patrón F39) o autorización explícita.
> (f) **Fan-out acotado escala LIBRE** si el agente = in-cwd read-only + WebFetch + structured-output + auto-relanzar (doctrina 26/06 `comité-expertos §ACOTADO`, ev. 63 agentes). Cuelga SOLO con ops gateadas (git/fuera-cwd) en background → worktree/foreground. L-50/§226.
> (g) **Bot v2 (F-1): NO big-bang sobre v1** (comité 26/06). v1 battle-tested (§234 privacidad PC-mostrador · §80 · escalado/captura vivos); v2 verde sin guards = regresión legal + pérdida silenciosa de leads. Camino: v2 tras flag → portar §234/§80 + escalado/captura → validar LIVE → flip. Módulo compartido `js/concierge/shared/` (NO copiar). NO re-portar a Vite (vanilla OK).
> (h) **Workflow de auditoría: verificadores SIN Bash** (barrido 26/06) — agentes `Explore` usan `git` para chequear "deployed" → cuelgue gateado (L-50 confirmado en vivo). Y **el audit verifica CÓDIGO, no DEPLOY**: todo claim "deployed/LIVE" se chequea live (Firebase MCP), no por inferencia (#15 = falso negativo). Panel ≠ journal.

---

## 📋 Pendientes abiertos (TODO-NN) — ledger ÚNICO de pendientes

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-01/02·03·06·07/08·09-13·15·18** | Legacy diferidos/opcionales/absorbidos (Cloudflare+Vite·CSS·SEO·CSAT·deuda·skills·blindaje→E5). **Detalle §109**. | 🔮/✅ | varios |
| **TODO-19** | CRM Fase 5 → E6 EN CURSO (E6.6 ✅ §188) | ⏳ | — |
| **TODO-49** | **🔁 Re-barrido del gap ⟦OPUS⟧** — 1er barrido NO al 100% (timeout: 7 verificadores colgados). Tras implementar, re-lanzar con método corregido (verificadores SIN Bash, callejón h) sobre lo no verificado (journal→bóveda). | 🔵 nuevo | tras implementar |
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
| **TODO-45** | **Cleanups auditoría §257 ⟦OPUS⟧** — (a) functions residuales del clásico (barrido: desplegadas, sin uso) limpiar; (b) `brands.saveBrand` desc=nombre; (c) `kb.edit` sin editor `_brain`; (d) coment. stale `wizard.js`; (e) NBA "10"vs9. | 🔮 | bajo |
| **TODO-43** | **MFA-hardening portal nuevo ⟦OPUS⟧ (§253)** — el portal nuevo es email+password-only; el stack SMS-MFA del admin viejo (2FA/trusted-devices/backup-codes/preguntas) + Telegram NO se portó (no encaja en auth modular). Reimplementar como **TOTP**+recovery si el dueño quiere endurecer. NO bloquea. | 🔮 futuro | dueño |
| **TODO-40** | **Curas auditoría N2 §239 ⟦OPUS-4.8⟧** — (a) **freno duro del boot-budget** en el linter (hoy info-only 3 auditorías = M-10; boot +14%); (b) **gate/marker de drift source↔dist** admin-app (hoy la intención staging vive solo en prosa, AUD-04). Decidir mecanización vs aceptar-como-conocido. | 🔮 | bajo (no bloquea) |
| **TODO-44** | **Fiabilidad cerebro ⟦OPUS-4.8⟧** — auditoría §257 + cura M-22 (check #16 kernel, propagado ×4 ✅ sha `4905D566`). RESTA: adopción marcadores `verificado-vivo:` + reconciliación exhaustiva. Absorbe TODO-33. | 🔄 propagado ✅ | adopción |

| **TODO-46→F-1** | **Bot v2 ⟦OPUS⟧ — FLAG CABLEADO ✅**: `shared/lead-flow.js`+escalado→Hub+botones retoma/WA+§80+§234-wipe+gate-form. `components.js`: `?altorbot=v2`→v2, default v1 (verif.preview). **RESTA: dueño re-mergea→YO valido LIVE→flip**. | 🔄 validar-LIVE | merge+LIVE |
| **TODO-47** | **🎨 Revisión diseño profunda ⟦OPUS⟧ (dueño 26/06)** — bug-menús ✅ `1556e27`; FALTA pasar diseños por skills (`frontend-design`/`ui-ux-pro-max`) ANTES de implementar (el flujo de diseño falló: no probé estado expandido). | 🔮 fase C | tras A+B |
| **TODO-48** | **Remediar drift CRM del cutover ⟦OPUS⟧ (barrido 26/06)** — features MF4.x construidas en admin viejo, NO portadas a admin-app: 360° tab "Actividad"(MF4.2) · Contactos workspace 4-KPIs(MF4.1) · acciones masivas checkbox/CSV/crmTags(MF4.3) · Postventa+NPS scheduler(MF4.8). +doc-fixes (verifySuperAdminV2 nombre · clientes/ subcols 5→2 · proactiveEngagement stale). Detalle→bóveda `…barrido-drift…`. | 🔵 nuevo | tras bot F-1 |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📝 Bitácora (efímera)

> Histórico §184-§256 → `99`/`00`/`30`. Defectos bot UX → `altor-hub-rediseno-defectos.md`.
