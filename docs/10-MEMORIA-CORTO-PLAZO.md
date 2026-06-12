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
> paso 0 ✅ (§189) → fase ② código ✅ (Reseñas §190 + Banners §191) → **fase ③ p1 ✅: Marcas
> (§192)**. Patrón validado ×3. SIGUIENTE: (1) **gate de cierre de fase ②** (tras F39 live del
> dueño): ocultar/readonly Banners+Reseñas del CLÁSICO; (2) **fase ③ p2: Atributos/listas**
> (`config/listas` → #/config; lector dynamic-lists.js se MANTIENE); (3) **vehicles — L, ÉPICA
> PROPIA EN SESIÓN FRESCA** (wizard 6 pasos + drafts + smart-fields + gate CI
> generate-vehicles.mjs sin diffs de esquema) → dealers (M) → backup (S) → **decisión financiera
> del dueño (gap 8)** → ④ RBAC/usuarios → cutover (stub redirect, NUNCA borrar admin.html).
> ✅ Verificar (F39): reseña + banner con imagen + editar una marca desde el portal → web SIN
> Ctrl+Shift+R (§190/§191/§192 + cacheSignal) · cita walk-in · bloqueo real.
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

> GC 2026-06-12: §184-§187 consolidados y podados de aquí (detalle → `00-INDICE` → `99`). Vivo:
>
> - **2026-06-12 (3:35-4am)**: "continua" → **E2E live E5 por Claude** (Playwright contra live;
>   pipeline completo con evidencia incl. Telegram vía `telegramLastUsedAt`). Commit + merge #832.
>   Daily job 12/06 ✓ (`wonsBackfilled:1`; counts confirman purge del dueño = F39 §180 cumplida).
> - **2026-06-12 (4-6:30am, misma sesión, E6)**: E6.6 auditoría (workflow 16 agentes → §188) →
>   paso 0 (§189: hallazgo E5-rompió-cita-interna → L-41; deploy + merge #833) → fase ② Reseñas
>   (§190, merge #834; core/audit.js nace) → Banners (§191, merge #835: Storage/WebP) → fase ③
>   Marcas (§192). Preview mock ✓ ×3. Gotcha vigente: emulador zombi :8081 — matar java antes.
