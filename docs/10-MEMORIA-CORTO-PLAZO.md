# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> 🧠 **MACRO-PROYECTO — Cerebro auto-evaluable v6** (2026-06-09). Comité v6 decidió los 7 puntos;
> **19/21 ✅ (A-S)** · ⏳ **T** (re-verificar inmobiliaria) + **U** (1ª auditoría Nivel-2, sesión fresca).
> Checklist ÚNICO → bóveda `specs/2026-06-09-comite-v6-…VEREDICTO.md`. Bóveda en GitHub privado ✓.
> 🚫 Callejones: NO classification-en-manifest, NO checklist-doc-nuevo, NO score LLM, NO brain-diff
> en boot, NO regex 5c para el BFS.

> 🏗️ **CRM — plan E0→E6 (§176, TODO-21). E0✅ E1a✅ E1b✅ adelanto-E3✅ E2✅ COMPLETA (§182+§184)** —
> Calendario único LIVE: SSoT `config/availability` (editor portal `#/config` + validador clásico
> mapeado) · `crmCitaAction` transaccional (tupla asesor+vehículo, bloques 30min, `resource_slots/`) ·
> `citaConfirm` tokenizada WhatsApp-first (E2E live ✅) · hold-expiry T-3h → `caducada` · job horario
> de citas · F28 v2 invariantes. 125 tests emulador + carrera C.5 ✅.
> **Retomar con: "continúa E3"** = F12 (editar contacto `_version` + fusión resumible `merges/{id}`)
> + F14 (anonimización Ley 1581: `_suppressed`, gracia 72h, gate legal P4) — F13/F15 ya viven (§180).
> Después: E4 post-venta → E5 blindaje (TODO-18) → E6 cutover (TODO-19) + E6.5 comité diseño + E6.6
> auditoría admin clásico (§183, FIRMES).
> ⏳ **Cliente**: (1) merge+push de la tanda 2; (2) Ctrl+Shift+R; (3) **clic en "🇨🇴 Cargar festivos
> de Colombia 2026"** en portal→Disponibilidad (hasta ese clic el validador clásico no avisa festivos
> — la migración de datos quedó como SU verificación F39; el clasificador denegó hacerla directa);
> (4) anunciar F42; (5) billing GCP (causa sin identificar).
> ✅ **Verificar al retomar**: 1ª corrida del `crmDailyJob` (mañana 5am — digest F28 v2 en
> `crm_alerts`: fantasmas feb-abr eliminados, basura feb de availability purgada).
>
> **🚫 Callejones sin salida (NO reintentar)**:
> (a) **NO custom claims ahora** — reglas Fase 1 usan lookup `usuarios/{uid}`; claims = Fase 5 (§159.3).
> (b) **NO `preview_screenshot`** (se cuelga tras `preview_resize`, L-28) — usar `preview_snapshot`+`preview_eval`.
> (c) Consejo Externo ya consultado para modelo de datos/RBAC (§15) — re-consultar solo ante disparador caro.
> (d) **NO E2E de forms en localhost** (L-08/§175) — E2E solo contra live; UI con stub `window.db`.
> (e) **NO mutar docs de config de producción vía MCP** — el clasificador lo deniega; ruta correcta:
> dejarlo como acción de 1 clic del dueño en el portal (patrón F39) o pedir autorización explícita.

---

## 📋 Pendientes abiertos (TODO-NN) — ledger ÚNICO de pendientes

> Al cerrar uno: ✅ + link al ADR, y retirarlo en la próxima poda.

| ID | Item | Estado | Bloqueo |
|---|---|---|---|
| **TODO-01/02** | Migración Cloudflare Pages + Vite | 🔮 | ~$10/año dominio |
| **TODO-03** | Critical CSS inline | ⏸️ diferido | SP-5 lo reabsorbe |
| **TODO-06** | Página `/cartagena.html` SEO local | 🔮 | contenido editorial del cliente |
| **TODO-07/08** | Validar CSAT (§87) + transferencias (§88) en producción | 🔮 | tráfico / equipo 2+ asesores |
| **TODO-09..13** | Deuda técnica menor (drafts, CSS muerto, transition:all, substring selectors) | 🔮 | opcional |
| **TODO-15** | Anomalías skills restantes → `skills-inventory.md` | 🔮 | decisión cliente |
| **TODO-18** | Blindaje pre-lanzamiento → **ABSORBIDO en E5** (§176). Detalle `41`/`42` | ⏳ → E5 | E3→E4 |
| **TODO-19** | CRM Fase 5 cutover → **ABSORBIDO en E6** + E6.5/E6.6 (§183) | 🔮 → E6 | tras E5 |
| **TODO-20** | **Comité v6**: quedan T (inmobiliaria) + U (auditoría Nivel-2, sesión fresca) | 🔄 | — |
| **TODO-21** | **Plan CRM E0→E6** — ledger maestro en VEREDICTO (bóveda). E0✅ E1a✅ E1b✅ E2✅ → **E3** | ⏳ | merge cliente |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📝 Bitácora (efímera)

> GC 2026-06-10: §175-§183 consolidados (ver `00-INDICE` → `99`). Solo lo vivo:
>
> - **2026-06-10 (madrugada→tarde)**: maratón E0→E2t1 (§177→§182) + relevo §183. Todo en ADRs.
> - **2026-06-10 (noche)**: "continua" → **E2 tanda 2 COMPLETA (§184)**: F21 SSoT+editor portal ·
>   F18/F19 crmCitaAction+citaConfirm · F20 citaSweep · F28 v2. **Review adversarial (workflow
>   22 agentes): 9 hallazgos reales (1 crítico) corregidos ANTES del commit** (holdsTuple, GET
>   intersticial/POST, XSS+CSP, PII→crm_config, deleteField, isHoliday, token en el clásico,
>   corto-aviso, rebuild indexado — detalles §184.4; lecciones L-39/L-40). 126 tests emulador +
>   carrera C.5 ✅. E2E live post-fixes ✅. Deploy ×2. Cache `v20260610181500`. De paso: el dueño
>   YA purgó `_test_sla_e1a` (F39 §180 ✅). Gotcha: emulador zombi en :8081 — matar java antes.
