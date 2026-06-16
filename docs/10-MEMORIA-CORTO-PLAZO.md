# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> 🤖 **Opus 4.8** (Fable 5 caído): commits footer `Modelo: Opus 4.8` + ADR/lecciones tag `⟦OPUS-4.8 · rev-Fable⟧`. Convención/causa = dueño `05` (no re-explicar aquí).

> 🧠 **MACRO-PROYECTO — Cerebro auto-evaluable v6** (2026-06-09): **20/21 ✅** · resta **T** (re-verificar
> inmobiliaria). **U** (auditoría Nivel-2) ✅ §206 → des-saturación A5/A6/A7/A9 ✅ §206.7; resta **A1-A2**
> (`11-GOBERNANZA`/split §G) 🔒 GATED: template ×3 → canon `bersaglio` + Gemini. Checklist → bóveda VEREDICTO (privado ✓).

> 🏗️ **CRM E0→E6 (§176, TODO-21). E0→E5 ✅. E6**: fases ②/③ ✅ (§190-195) + **vehículos** (§199-203) + **dealers FASE 1** (§204) — todo MERGEADO. **SIGUIENTE
> del cutover**: V6 verificación en vivo (necesita dueño) → **gates ②/③** (ocultar/readonly los módulos
> ya portados en el CLÁSICO) → ④ RBAC/usuarios departamental (§193.4) → cutover (stub redirect, NUNCA
> borrar admin.html). dealers FASE 2 = restructura comercial FROZEN (TODO-25, bóveda §9), va al FINAL.
> ✅ **F39 v2 (§198)**: verificación en vivo = CLAUDE por LOTES. **Lote V6 pendiente**: reseña+banner+
> marca+lista+respaldo+walk-in+reasignar + ciclo completo de vehículo → web sin Ctrl+Shift+R → cerrar gates ②/③.
> ⚠️ Decisiones dueño pre-cutover (§193): bot ALTOR R-1 (solo Claude) · gap 8 financiero · 2FA R-9 · vista Inicio gap 3 · fase ④ RBAC dept §193.4 (cf. Bersaglio). Gates: F32 móvil · F33b piloto · manual.
> 🚫 **Callejones de trabajo CERRADO** (dealers F1 · E6.6 · E5) → detalle en §204/§188/§187 (no re-derivar: NFD-slug · admin-calendar-config/dynamic-lists/fcm-sw inyectados VIVOS · dashboards envenenados→deals.wonAt · RTDB presence lo lee functions 1/min · límite ~1000 exprs de Rules · emulador zombi :8081 mata java).
> **Retomar con: "continúa E6"** = cutover (strangler: inventario/público/RBAC al portal + F32 +
> F33b piloto + manual + checklists F39) + E6.5 comité diseño + E6.6 auditoría clásico (§183, FIRMES).
> Gates heredados: App Check enforce ~16-23/06 (→`41`) · SEC-05 (diferido) · SEC-07/09 (P2).
> ⏳ **Cliente**: descartar lead prueba `VMVMJG…` (spam) · anunciar F42 · billing GCP causa raíz (→`05`). (Código TODO en `main`, PR #856 — nada pendiente de merge.)
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
| **TODO-20** | **Comité v6 → 21/21** (A-U): T (Nivel-2 inmob) §12-inmob/§207.11 · U §206/§207. Follow-up cross-repo → TODO-28/29 | 🔄 | — |
| **TODO-21** | **Plan CRM E0→E6** — ledger en VEREDICTO (bóveda). **E0→E5 ✅ en main** · E6 ⏳ (plan 29 pasos §188) | ⏳ | — |
| **TODO-22** | **Fábrica de skills web** (frontend/backend/framework; arranque + **RESCATE de webs monolíticas**, ampliado 12/06) §193.2 | 🔮 | post-panel (orden ratificado) |
| **TODO-23** | **DINAMISMO/CMS web TOTAL ⟦OPUS-4.8⟧** — TODAS las secciones editables (index/nosotros/contacto/banners/columnas + editor de bloques tipados; SSG extendido; seguridad Gemini). Gran plan → bóveda `2026-06-14-web-dinamismo-cms-plan.md` · skill `cms-dinamico`. Bugs: demo-cuando-vacío, lentitud SPA-feel | 🔮 plan ✅ | bucket "al final" · escaneo+comité+Gemini al arrancar |
| **TODO-24** | **Comité BORRADORES** (rediseño profesional de drafts; el clásico era malo — dueño 12/06) §202.5 | 🔮 | post-cutover, ANTES de TODO-23 |
| **TODO-25** | **RESTRUCTURA COMERCIAL ⟦OPUS-4.8⟧** (aliado/consigna/propio + comisiones) — comité×3 + Gemini Pro High + dueño → **DISEÑO FROZEN** (bóveda `…restructura-comercial…` sec.9: tenancy+economics ortogonal · snapshot array versionado · onWrite espejo · F42 profitOf). Implementa al FINAL | 🔄 decidido·impl pend | al FINAL · 🔥 parche legal JSON-LD ✅ interim §205 · pendiente menor: confirmar aliado-neto-constante + fórmula fiscal (contador) |
| **TODO-26** | **Sistema FACTURACIÓN + super-CRM ⟦OPUS-4.8⟧** (facturación/financiero/contable/comercial en panel admin) — consultar cerebro+repo **Bersaglio** AL implementar. Detalle bóveda `2026-06-13-restructura-comercial-…` §8 | 🔒 **ÚLTIMA fase** | después de TODO lo documentado/planeado HOY (E6 cutover + TODO-21..25 + redesign) |
| **TODO-27** | **Alta de usuarios = invite flow seguro ⟦OPUS-4.8⟧** (token+transacción, anti-enumeración; reemplaza el alta vieja) — diseño Gemini en bóveda `2026-06-14-web-dinamismo-cms-plan.md §6.4`. Sugerir skill portable | 🔮 | DESPUÉS del dinamismo (orden dueño) |
| **TODO-28** | **Cerebro des-saturación (§206) ⟦OPUS-4.8⟧** — A0/A5/A6/A7/A9 ✅ §206.7. Gemini 2ª opinión ✅ §206.8 → **A1-A4 revisado** (diseño congelado, bóveda `…a1a4-revisado-post-gemini.md`): eje trigger-vs-mecánica · **NO borrar caps** · **template bump v1.2.0 ×3 desde canon bersaglio** (cars-only = fork silencioso). **Resta**: ejecutar ×3 — pendiente luz verde sobre bersaglio (¿chat paralelo?); beneficio modesto, salud actual no lo exige. | 🔄 | coordinación ×3 bersaglio |
| **TODO-29** | **Cerebro: endurecer el lazo (Nivel-2 §207) ⟦OPUS-4.8⟧** — reincidencias cuya cura ES gate, no doctrina (M-16); todas en el kernel `brain-check.mjs` (×3, mismo canon que TODO-28): boot/cache-vs-`origin/main` · techo duro de boot · anclas §G. + contrato-template→Gemini · shard 99a/99b · `ignoreDirs` (manifest cars ✅ §207.8, resta kernel). → §207 + bóveda. | 🔄 | kernel ×3 → bersaglio |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📝 Bitácora (efímera)

> GC ×6 (12-15/06): §184-§207 consolidados (→ `00`/`99`). Vivo:
> - **15/06 Auditoría Nivel-2 ⟦OPUS-4.8⟧** — los **3 cerebros auditados** (cars §207 · bersaglio §82 · inmob §12) + harmonizados (kernel idéntico ×3): lazo = teatro si deja el fix en doctrina → **M-16**; 05/10 reconciliados vs git; 4 gates de cura = kernel ×3 → **TODO-29** + pasada Gemini unificada.
> - **Pendiente del cutover**: V6 verificación en vivo (necesita dueño) → cerrar gates ②/③.
