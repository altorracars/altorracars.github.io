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

> 🏗️ **CRM — plan E0→E6 (§176, TODO-21). E0→E5 ✅ en main. E6 EN CURSO**: E6.6 ✅ (§188) →
> paso 0 ✅ DESPLEGADO (§189) → **fase ② paso 1 ✅: módulo Reseñas en el portal (§190)** —
> patrón del strangler VALIDADO (data shape-verbatim + RBAC espejo + mock + core/audit.js
> + nav gated). Preview mock: alta/edición/borrado ✓. SIGUIENTE: **fase ② paso 2 —
> admin-banners → portal** (M: SOLO posiciones vivas `promocional`+`home_promo` — hero/categoria
> son write-only sin lector D5-12 ·  upload Storage `banners/` · invalidación vía cacheSignal) →
> gate de fase (ocultar/readonly reviews+banners del clásico) → ③ (brands/lists/vehicles-L/dealers)
> → ④ (RBAC/usuarios/auditoría/perfil+Telegram) → cutover (stub redirect, NUNCA borrar admin.html).
> ✅ Verificar (F39, próxima sesión): **crear una reseña real desde #/resenas** → debe aparecer
> en el sitio público SIN Ctrl+Shift+R (valida módulo §190 + cacheSignal §189 en un gesto) ·
> cita interna walk-in pasa rules · onUsuarioBloqueadoSync al 1er bloqueo.
> ⚠️ Decisiones del DUEÑO antes del cutover: bot ALTOR (R-1) · semántica financiera (gap 8) ·
> 2FA portal (R-9) · vista Inicio (gap 3). Gates: F32 móvil · F33b piloto 1 semana · manual.
> 🚫 Callejones E6.6: NO borrar admin-calendar-config (inyectado en público para el bot,
> components.js:514) ni dynamic-lists.js ni firebase-messaging-sw.js · NO portar dashboards
> envenenados (rehacer sobre deals.wonAt) · NO limpiar nodo RTDB presence (functions lo lee 1/min).
> 🚫 Callejones de E5: NO añadir condiciones a la rule de solicitudes sin medir (límite ~1000
> expresiones, ya al borde) · NO abrir updates anónimos de solicitudes (bot diferido) · emulador
> zombi en :8081 (matar java) · suite paralela necesita testTimeout/hookTimeout (ya en config).
> **Retomar con: "continúa E6"** = cutover (strangler restante: inventario/sitio público/RBAC al
> portal + F32 móvil + F33b piloto + manual completo + checklists F39) + E6.5 comité diseño +
> E6.6 auditoría admin clásico (§183, FIRMES). Gates heredados: App Check enforce (observar →
> ~16-23/06, estado canónico en lóbulo `41-SEGURIDAD` bóveda) · SEC-05 loginAttempts (diferido) ·
> SEC-07/09 (P2).
> ⏳ **Cliente**: (1) **push/merge E5 + Ctrl+Shift+R** + descartar lead de prueba `VMVMJG…`
> (spam_prueba); (2) anunciar F42 al equipo (el reporte vive en Reportes→Comisiones del mes);
> (3) billing GCP causa raíz; (4) commit+push bóveda `brain-private` (8 archivos: +2 crudos E5
> + observación App Check en `41`).
> ✅ **Verificar al retomar**: 1ª corrida del `crmDailyJob` con bloques E4 (12/06 5am: colisiones/
> drift/wons backfilled) — patrón: `functions_get_logs` + query `crm_alerts` type=daily_digest.
> ⚖️ **Gate P4 vigente**: el TEXTO legal público de supresión/privacidad NO se publica sin abogado.
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
| **TODO-19** | CRM Fase 5 cutover → **E6 EN CURSO**: E6.6 ✅ §188 → paso 0 pre-fase | ⏳ | — |
| **TODO-20** | **Comité v6**: quedan T (inmobiliaria) + U (auditoría Nivel-2, sesión fresca) | 🔄 | — |
| **TODO-21** | **Plan CRM E0→E6** — ledger en VEREDICTO (bóveda). **E0→E5 ✅ en main** · E6 ⏳ (plan 29 pasos §188) | ⏳ | — |

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
> - **2026-06-12 (3:35am)**: "continua" → **E2E live E5 ejecutado por Claude** (Playwright, no
>   esperar al dueño): pipeline completo verificado con evidencia (rules→solicitud→lead→contact→
>   email→Telegram). Commit E5. Pendiente HOY: daily job 5am (tarea #3) + push/merge cliente.
> - **2026-06-12 (4-5:30am, misma sesión)**: "todo realizado continua" (E5 mergeada PR #832) →
>   **E6 arrancada**: E6.6 auditoría (workflow 16 agentes, 112 hallazgos → §188 + bóveda) + paso 0
>   ejecutado/desplegado (§189, hallazgo: E5 había roto la cita interna → L-41). Daily job 12/06
>   verificado ✓ (`wonsBackfilled:1` = F10 auto-reparó; counts confirman el purge del dueño —
>   verificación live F39 de crmPurgeLead §180 CUMPLIDA).
> - **2026-06-12 (5:30-6am, misma sesión)**: "continua." (paso 0 mergeado PR #833) → **fase ②
>   paso 1: Reseñas en el portal (§190)** — patrón de migración validado en preview mock (alta/
>   edición/borrado/stats/RBAC). core/audit.js nace (gap 2 §188). Siguiente: banners.
