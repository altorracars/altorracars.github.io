# ⚡ 10 — MEMORIA A CORTO PLAZO (WIP / Sprint activo)

> **Nodo: pizarra del sprint** (auto-carga con `CLAUDE.md` + `05`). SOLO lo vivo: foco actual,
> pendientes (TODO-NN), bitácora efímera. Estado técnico → `05`. Al cerrar tarea: consolidar a
> ADR (`99`) + fila en `00`, lecciones a `30`, y PODAR esto al foco vivo (GC §G.4).
> **Convención de handoff**: el foco SIEMPRE incluye **🚫 callejones sin salida** (qué se probó
> que FALLÓ y por qué) — le ahorra al próximo "tú" repetir errores descartados.

---

## 🎯 Foco actual

> 🤖 **Opus 4.8** (Fable 5 caído): footer `Modelo: Opus 4.8` + tag `⟦OPUS-4.8 · rev-Fable⟧` (detalle → `05`).

> 🧠 **Cerebro v6 ✅** (3 cerebros N2) · hardening A/B/C = **TODO-28/29/30** (§208, diseño-listo, NO urgente).

> 🏗️ **CRM E0→E6 ✅ (§176/TODO-21)** en `main`. Vender=Pipeline · dealers F2 FROZEN. **RBAC ④a COMPLETO ✅ (§219)**; **④b PARQUEADO** (al retomar = FLOOR server-side antes de enforce `nivel`).
>
> 🏗️ **CMS por marca COMPLETO ✅ (§220-§225, LIVE) ⟦OPUS-4.8⟧** — incl. §225 cron→admin+SA **ACTIVADO** (SA `cron-ssg-lector` + secret, verificado en vivo) + auditor SVG (0.2b cerrado, 0 SVG). Detalle→§225/§226. **TODO-23 (CMS total: index/nosotros/contacto/columnas+bloques) continúa.**
> ⚠️ Decisiones dueño pre-cutover → §193. Gates: F32 móvil · F33b piloto · manual.
> 🚫 **Callejones de trabajo CERRADO** → §204/§188/§187.
> Strangler/cutover → §188+§183. Gates heredados: App Check enforce ~16-23/06 (→`41`) · SEC-05/07/09 (diferidos).
> ⏳ **Cliente** (→`05` flags): descartar lead prueba `VMVMJG…` · anunciar F42 · billing GCP causa raíz.
> ⚖️ **Gate P4 vigente**: el TEXTO legal público de supresión/privacidad NO se publica sin abogado.
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
| **TODO-01/02** | Migración Cloudflare Pages + Vite | 🔮 | ~$10/año dominio |
| **TODO-03** | Critical CSS inline | ⏸️ diferido | SP-5 lo reabsorbe |
| **TODO-06** | Página `/cartagena.html` SEO local | 🔮 | contenido editorial del cliente |
| **TODO-07/08** | Validar CSAT (§87) + transferencias (§88) en producción | 🔮 | tráfico / equipo 2+ asesores |
| **TODO-09..13** | Deuda técnica menor (drafts, CSS muerto, transition:all, substring selectors) | 🔮 | opcional |
| **TODO-15** | Anomalías skills restantes → `skills-inventory.md` | 🔮 | decisión cliente |
| **TODO-18** | Blindaje pre-lanzamiento → **ABSORBIDO en E5** (§176). Detalle `41`/`42` | ⏳ → E5 | E3→E4 |
| **TODO-19** | CRM Fase 5 cutover → **E6 EN CURSO**: E6.6 ✅ §188 → paso 0 pre-fase | ⏳ | — |
| **TODO-20** | **Comité v6 21/21** (A-U) — detalle §173/§207.11; follow-up cross-repo → TODO-28/29/30 | 🔄 | — |
| **TODO-21** | **Plan CRM E0→E6** — ledger en VEREDICTO (bóveda). **E0→E5 ✅ en main** · E6 ⏳ (plan 29 pasos §188) | ⏳ | — |
| **TODO-22** | **Fábrica de skills web** (frontend/backend/framework; arranque + **RESCATE de webs monolíticas**, ampliado 12/06) §193.2 | 🔮 | post-panel (orden ratificado) |
| **TODO-23** | **DINAMISMO/CMS web TOTAL ⟦OPUS-4.8⟧** — TODAS las secciones editables (index/nosotros/contacto/banners/columnas + editor de bloques tipados; SSG extendido; seguridad Gemini). **CMS por marca COMPLETO ✅ (ADR §222)** — banner editable + **FASE 2.4 instant-publish** (CFs `onSiteContentChange`/`onMarcaChange` + workflow concurrency → guardar/alta-baja de marca regenera SOLO) + **nav→canónica** (`/marcas/{id}.html`), todo LIVE+verificado; review adversarial 0-críticos. **TODO-23 (CMS total: index/nosotros/contacto/columnas + bloques tipados) continúa.** `marcaShapeOk` ✅ (`d0cc869`: regla `marcas/` forma+slug desplegada + rules-unit 11/11; gotcha `validVersion`→L-47). Gran plan → bóveda `2026-06-14-web-dinamismo-cms-plan.md` · skill `cms-dinamico`. Bugs: demo-cuando-vacío, lentitud SPA-feel | 🔮 plan ✅ | bucket "al final" · escaneo+comité+Gemini al arrancar |
| **TODO-24** | **Comité BORRADORES** (rediseño profesional de drafts; el clásico era malo — dueño 12/06) §202.5 | 🔮 | post-cutover, ANTES de TODO-23 |
| **TODO-25** | **RESTRUCTURA COMERCIAL ⟦OPUS-4.8⟧** (aliado/consigna/propio + comisiones) — comité×3 + Gemini Pro High + dueño → **DISEÑO FROZEN** (bóveda `…restructura-comercial…` sec.9: tenancy+economics ortogonal · snapshot array versionado · onWrite espejo · F42 profitOf). Implementa al FINAL | 🔄 decidido·impl pend | al FINAL · 🔥 parche legal JSON-LD ✅ interim §205 · pendiente menor: confirmar aliado-neto-constante + fórmula fiscal (contador) |
| **TODO-26** | **Sistema FACTURACIÓN + super-CRM ⟦OPUS-4.8⟧** (facturación/financiero/contable/comercial en panel admin) — consultar cerebro+repo **Bersaglio** AL implementar. Detalle bóveda `2026-06-13-restructura-comercial-…` §8 | 🔒 **ÚLTIMA fase** | después de TODO lo documentado/planeado HOY (E6 cutover + TODO-21..25 + redesign) |
| **TODO-27** | **Alta de usuarios = invite flow seguro ⟦OPUS-4.8⟧** (token+transacción, anti-enumeración; reemplaza el alta vieja) — diseño Gemini en bóveda `2026-06-14-web-dinamismo-cms-plan.md §6.4`. Sugerir skill portable | 🔮 | DESPUÉS del dinamismo (orden dueño) |
| **TODO-28** | **Split §G / des-saturación (§206) ⟦OPUS-4.8⟧** — A0/A5/A6/A7/A9 ✅ §206.7. **Diseño RESUELTO por Gemini §208.1**: el split procede con **Núcleo Delimitado** (`<!-- KERNEL DOCTRINE -->` byte-hasheado ×3; fuera, libre per-repo). Resta ejecutar A1-A4 ×3 desde canon bersaglio. | 🔄 | ejecución ×3 |
| **TODO-29** | **Endurecer el lazo (§207) ⟦OPUS-4.8⟧** — **REVISADO por Gemini §208.2**: los git-gates SE SUSTITUYEN por "abolir estado dinámico en `05`" → SessionStart hook inyecta git-state live en boot + `05` deja de afirmar git/deploy. Kernel/hook ×3 desde canon. (Aún: shard 99a/99b · `ignoreDirs`-KNOWN_KEYS.) | 🔄 | kernel/hook ×3 |
| **TODO-30** | **Doctrina despliegue-DINERO "Doble Llave + Staging" (§208.3) ⟦OPUS-4.8⟧** — gate técnico IA (invariantes/tests BLOQUEANTES en CI) + acceptance de Kary en **STAGING** (no prod) + dueño autoriza prod. CORTAR pases directos a prod de código-dinero. **Requiere que el dueño monte Staging**. Aplica cars (F42/comisiones/§TODO-25) + bersaglio (cartera). | 🔮 | Staging (dueño) |

Detalle ampliado de pendientes legacy → `99-HISTORIAL-ADR.md` §109.

---

## 📝 Bitácora (efímera)

> GC ×13 (12-20/06): §184-§222 consolidados (→`99`/`00`/`30`/`33`).
> - **21/06 (sesión larga, multi-tarea)**: §223 Caza-bugs §G ×4 · §224 Consejo Externo ×4 + Tier Refinamiento R1-R4 · **§225 CMS cron→admin+SA + auditor SVG 0.2b** (activación COMPLETA: SA `cron-ssg-lector`+secret, admin verificado en vivo, 0.2b=0 SVG; L-49) · seguridad: 2 alertas Secret-Scanning cerradas (apiKey web pública) + **App Check enforce DIFERIDO** (§41) · **§226 auditoría cerebro Nivel-2** (SANO; el workflow de sondas COLGÓ por subagentes gateados → doctrina 'comité acotado' = **TODO-31** cross-brain post-Bersaglio; L-50; 3 falsos positivos cazados por §3.3). skills ×4=79. **TODO-31 ✅** (doctrina maquinaria-acotada vía comité acotado+Gemini → skill global `comité-expertos` §ACOTADO byte-idéntica ×5; §226.8). Detalle→ADRs §223-226/bóveda.
