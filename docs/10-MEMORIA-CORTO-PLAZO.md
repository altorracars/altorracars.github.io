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

> 🏗️ **CRM — plan E0→E6 (§176, TODO-21). E0✅ E1a✅ E1b✅ E2✅ E3✅ E4✅ (§186)** — Post-venta
> F10 (checklist del ganado + `commissionSnapshot` server-only + retoma con borrador) · F25-completo
> (vehículo = AGREGADO transaccional; **badge 'Apartado' visible en la web**) · F26 colisión ·
> F42 Comisiones del mes en Reportes. 169 tests emulador. Review adversarial 4-dim: 23 hallazgos
> corregidos pre-commit (+2 self-review; top: `retry:true` faltaba en onDealUpdated — Eventarc no
> reintenta por defecto). **FIX: pipeline de páginas estáticas roto 16 días** (yml ruta cache-manager).
> Cache `v20260611031500`. Deploy: rules+indexes ✓ · functions (ver estado abajo).
> **Retomar con: "continúa E5"** = blindaje (P1: SEC-01 lectura canónico, rate-limit forms públicos,
> App Check, auditoría retry de triggers CRM restantes) + P3 E2E vías de captura. Después: E6 cutover
> (TODO-19) + E6.5 comité diseño + E6.6 auditoría admin clásico (§183, FIRMES).
> ⏳ **Cliente**: (1) merge tanda E4 + Ctrl+Shift+R; (2) **clic "🇨🇴 Cargar festivos 2026"** en
> portal→Disponibilidad (sigue pendiente); (3) anunciar F42 al equipo ("sin CRM no hay comisión" —
> el reporte ya existe en Reportes→Comisiones del mes); (4) billing GCP causa raíz; (5) commit+push
> de la bóveda `brain-private` (ahora 6 archivos: +2 crudos E4).
> ✅ **Verificar al retomar**: 1ª corrida del `crmDailyJob` post-E4 (digest con bloques nuevos:
> colisiones/drift/wons backfilled + lo de §184: fantasmas feb-abr, reconcile dedup). Patrón:
> `functions_get_logs` de crmDailyJob + query `crm_alerts` type=daily_digest.
> ⚖️ **Gate P4 vigente**: el TEXTO legal público de supresión/privacidad NO se publica sin abogado
> (el mecanismo F14 ya está; el copy del panel es interno).
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
> - **2026-06-10 (noche)**: "continua" → **E2 tanda 2 COMPLETA (§184)** con review adversarial
>   (9 fixes, 1 crítico) + E2E live. Cache `v20260610181500`. Lecciones L-39/L-40. El dueño YA
>   purgó `_test_sla_e1a` (F39 §180 ✅). Gotcha: emulador zombi en :8081 — matar java antes.
> - **2026-06-10 (madrugada 11/06)**: "CONTINUA AQUI" (misma sesión) → **E3 COMPLETA (§185)**:
>   índice dedup F40e (no existía — F12/F14 lo asumían) + editar/fusionar + supresión 1581.
>   Review adversarial: 1 CRÍTICO (tombstone con PII post-supresión) + 9 majors — todos
>   corregidos. 139 tests. E2E live del trigger de índice ✓ (1er evento perdido = Eventarc §178).
>   SIN cache bump (L-32). Fusión/supresión live = las verifica el dueño al primer uso (F39).
> - **2026-06-11 (00:30)**: "listo merge hechos… cerrar y documentar" → **RELEVO por saturación**
>   (2 épicas en una sesión). Merge a main verificado (`4b68f2a`). Próxima sesión: boot normal →
>   verificar 1ª corrida del daily job → **"continúa E4"**. Sin decisiones nuevas del dueño
>   (E6.5/E6.6 de §183 siguen FIRMES).
> - **2026-06-11 (madrugada-2)**: "continuemos" → **E4 COMPLETA (§186)**. Exploración 5 agentes →
>   IAP → implementación → 169 tests → review adversarial (2 cortes por LÍMITES de sesión/semana:
>   el self-review durante la espera encontró 2 bugs; los 23 confirmados del workflow corregidos al
>   volver). Daily job 5am del 11/06 NO verificado (sesión arrancó a las 00:30 — quedó tarea #1).
>   🚫 Callejón: NO verificar fusión/supresión live sin sesión del dueño (F39, igual que §185).
