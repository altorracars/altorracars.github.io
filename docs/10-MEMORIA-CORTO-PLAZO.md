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
> paso 0 ✅ (§189) → fase ② código ✅ (§190-§191) → **fase ③: Marcas §192 + Atributos §194 en
> main · backup inventario ✅ §195 (ADELANTADO con justificación 195.7; deploy ✓, commit local)**.
> Patrón validado ×5. SIGUIENTE: (1) **gates ②/③** (tras F39 live del dueño — verificado 12/06
> ×2: auditLog SIN evidencia, solo login): ocultar/readonly Banners+Reseñas+Marcas+Atributos del
> CLÁSICO; (2) **vehicles — L, ÉPICA PROPIA EN SESIÓN FRESCA** (wizard 6 pasos + drafts +
> smart-fields + gate CI generate-vehicles.mjs sin diffs de esquema) → dealers (M, decisión
> D5-03 del dueño) → **decisión financiera (gap 8)** → ④ RBAC/usuarios (departamental §193.4)
> → cutover (stub redirect, NUNCA borrar admin.html).
> ✅ **F39 v2 (§198)**: verificación en vivo = CLAUDE, por LOTES. Próximo lote (post-épica
> vehículos): reseña + banner + marca + lista + respaldo + walk-in + reasignar + ciclo completo
> de vehículo → web SIN Ctrl+Shift+R → cerrar gates ②/③. Daily 13/06: counts con vehiculos/marcas.
> ⚖️ Decisiones del dueño §193 (siembra post-panel): bot SIN fallback gratuito + solo Claude
> (R-1 resuelta) · fase ④ hereda RBAC DEPARTAMENTAL (§193.4, comparar con cerebro Bersaglio).
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
| **TODO-22** | **Fábrica de skills web** (frontend/backend/framework; arranque + **RESCATE de webs monolíticas**, ampliado 12/06) §193.2 | 🔮 | post-panel (orden ratificado) |
| **TODO-23** | **Web pública CMS-izada** (mismo diseño, estructura escalable, todo editable por panel) §193.3 | 🔮 | post-panel + TODO-22 |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📝 Bitácora (efímera)

> GC 2026-06-12 ×2: §184-§193 consolidados y podados (detalle → `00-INDICE` → `99`). Vivo:
>
> - **2026-06-12 (3:35-6:40am)**: E2E live E5 ✓ (merge #832, daily 12/06 ✓) → E6.6 auditoría
>   (§188) → paso 0 (§189, L-41) → Reseñas §190 → Banners §191 → Marcas §192 (merges #833-836)
>   → siembra §193 (R-1, TODO-22/23, RBAC dep.). Gotcha: emulador zombi :8081 — matar java.
> - **2026-06-12 (~7:25am, sesión nueva)**: "continua" → gate fase ② verificado (auditLog: solo
>   login del dueño 11:05Z, SIN F39 aún → gate abierto) → **fase ③ p2 ✅: Atributos (§194)**,
>   ruta propia `#/atributos` (desviación deliberada del "→ #/config" — razón en §194.2).
>   Preview mock ✓ + build ✓. Merge #837 del dueño.
> - **2026-06-12 (8:40-11am, misma sesión + relevos)**: backup inventario ✅ (§195, deploy ✓,
>   merge #838) → ampliación §193.2 (skills arranque+RESCATE, merge #839) → gap 5 ✅ (§196,
>   "＋ Nueva cita" walk-in, merge #840) → **gap 7 ✅ (§197)**: acción `update` (observaciones +
>   reasignar asesor, moveAdvisorBlocks, suite emulador 193 ✓, deploy ✓). Commit local.
>   F39 re-verificado ×5: auditLog VACÍO (F39 explicado al dueño en cristiano: SUS 7 pruebas en vivo).
> - **2026-06-12 (mediodía)**: GC 30-LECCIONES (destilado, f5fdeb2) + M-14 (no recomendar cierre
>   por nota de plan con presupuesto sobrando — corrección del dueño). **El dueño ORDENÓ arrancar
>   la ÉPICA DE VEHÍCULOS en esta misma sesión** (~50% presupuesto) → mapeo con agentes en curso.
>   Mapa ✅ (7 agentes; crudo+síntesis+checklist en bóveda `2026-06-12-epica-vehiculos-plan.md`)
>   → **V1 lista ✅ §199** → **V2 wizard ✅ §200** (create/update tx con version-conflict, smart
>   preview con score exacto, apartado disabled-persistible, fotos=URLs).
>   → **V3 imágenes ✅ §201** (subida real se prueba en el lote V6).
>   **Retomar: "continua"** → **V4 drafts** (usuarios/{uid}/drafts, shape keys del form CLÁSICO
>   vMarca/vKm/_images, optimista+rollback, doble baseline al cerrar, re-derivar tipo al retomar)
>   → V5 extras (reorder §103, CSV, timeline audit, duplicar) → V6 lote §198 + gates ②/③.
