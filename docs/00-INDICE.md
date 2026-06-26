# 00 — ÍNDICE SINÁPTICO (mapa § → línea del Historial ADR)

> **Nodo neuronal: Índice sináptico.** Mapa § → línea de
> `docs/99-HISTORIAL-ADR.md` (~43k líneas). Es la tabla de contenidos del
> nodo de Largo Plazo. Se consulta on-demand (Trigger de Error/Historia, ver
> `CLAUDE.md §G`).
>
> **Cerebro completo**: 🧠 `CLAUDE.md` (router/identidad) · 🩺 `05-ESTADO-GLOBAL.md` (signos vitales)
> · ⚡ `10-MEMORIA-CORTO-PLAZO.md` (WIP) · 🗺️ `20-MEMORIA-ESPACIAL.md` (arquitectura)
> · 🧪 `30-LECCIONES.md` (experiencia/recetas; hija 🔧 `31-LECCIONES-GIT.md`) · 🔁 `60-WORKFLOWS.md` (workflows W-01..W-11; **W-11 = flujo fuerte**) · 🗂️ este (índice) · 📚 `99-HISTORIAL-ADR.md` (largo plazo).
>
> **Cómo usarlo (regla de oro anti-saturación)**:
> 1. Busca aquí el § que necesitas y su línea de inicio.
> 2. Lee SOLO ese tramo: `Read docs/99-HISTORIAL-ADR.md offset=<línea> limit=~150`.
> 3. NUNCA leas el historial completo (~43k líneas saturan el contexto al instante).
>
> Ejemplo: para el Plan §61 RBAC → línea 26879 → `Read docs/99-HISTORIAL-ADR.md offset=26879 limit=200`.
>
> Grep rápido: `grep -n "^## " docs/99-HISTORIAL-ADR.md` regenera este mapa.

---

## 🧭 Enrutamiento semántico (síntoma/tema → neurona) — CONSULTA ESTO PRIMERO

> La sinapsis de recuperación rápida: ante una duda, NO escanees el cerebro. Busca
> tu caso aquí y ve directo a la neurona. (Reflejo de Auto-mejora §G.4: si tu caso
> no está, añádelo tras resolverlo.)

| Tu situación / síntoma | Ve a |
|---|---|
| Decisión Fuerte / auditoría / revisión / diseño-UI no trivial (¿aplico el flujo del dueño?) | 🔁 `60-WORKFLOWS` **W-11** (flujo COMPLETO o nada + 3 artefactos: mockup·prompt-Gemini·prompt-Chrome) + skill `proceso-decision-fuerte` |
| ¿Dónde vive un módulo / ruta / flujo / componente? | 🗺️ `20-ESPACIAL` |
| Voy a mover/renombrar archivos, refactor de estructura | 🔧 `31-LECCIONES-GIT` L-04 + 🧪 `30-LECCIONES` L-06/L-07/L-10 (cargador JS + generador + CSS dinámico) + 🗺️ `20-ESPACIAL` |
| Conflicto al fusionar / cache / cron `[skip ci]` / toda op git | 🔧 `31-LECCIONES-GIT` (hija de 30: L-01..L-04) + `CLAUDE.md §4` |
| ¿Está desplegado? / antes de afirmar qué hay en PRODUCCIÓN / "ya pusheé" | 🧪 `30-LECCIONES` M-06/M-09/**M-16** (`git fetch` + `git log origin/main` SIEMPRE; la fila Producción de `05` NO es autoritativa) + `CLAUDE.md §3.3` |
| Errores `403` de Firebase / referer localhost / E2E de forms | 🧪 `30-LECCIONES` L-08 (ampliada §175: E2E solo live; stub `window.db` para UI) |
| Functions muertas / "billing is disabled" / la ingestión no corre | 🧪 `30-LECCIONES` L-38 (logs ANTES de tocar código; Eventarc re-entrega) |
| Rediseño de página rompe JS sin errores en consola | 🧪 `30-LECCIONES` L-37 (clases eliminadas vs callsites JS) |
| Validar si algo es código muerto antes de borrar | 🧪 `30-LECCIONES` L-09 + `_legacy/README.md` |
| Bug recurrente / clicks bloqueados / `MutationObserver` | 📚 §35 + §17.12 + RCA §19 |
| Performance (transitions, lazy, `<picture>`, LCP) | `CLAUDE.md §3.1` + 📚 §15/§16/§17 |
| RBAC / roles / permisos / CEO | 📚 §61–§73 |
| Bot ALTOR / Hub / concierge / IA | 📚 §57–§88 + 🗺️ `20-ESPACIAL` (js/concierge, js/ai) |
| SEO / sitemap / indexación Google | `docs/SITEMAP-FIX.md` + 📚 §90 |
| ¿Qué hay pendiente? estado del sprint | ⚡ `10-CORTO-PLAZO` (TODO-NN) |
| Migración Cloudflare / Vite / dominio | `docs/PLAN-MIGRACION-ALTORRA.md` + TODO-01 |
| 🚗 Reconstrucción del CRM / estado actual admin-CRM / pipeline / leads / 360° | `docs/crm-handoff.md` (stub → bóveda privada `../brain-private/`, ADR §174) + skill `crm-architect` + 🛰️ `15` |
| 🚗 Plan CRM VIGENTE (E0→E6) / sync lead-deal / calendario único / manual de uso | **bóveda `2026-06-09-comite-crm-v2-VEREDICTO.md`** (ADR §176, TODO-21) + `docs/MANUAL-CRM-USO.md` |
| 🔵 Audita SEGURIDAD / vulnerabilidades / Firebase rules / rutas sin auth / blindaje | 🎯 **`41-SEGURIDAD.md` (stub → bóveda privada, ADR §174; 9 hallazgos + blindaje)** + Skill `arquitecto-software` |
| 🔵 Audita LEGAL / privacidad / Hábeas Data / términos / garantía / RUNT / SOAT | 🎯 **`42-LEGAL.md` (activo — vehículos CO, ADR §169)** + Skill **`legal-colombia`** (gate: jurisdicción Colombia, fuentes `.gov.co`, NUNCA publicar sin abogado) |
| 🔵 Audita UX / interfaz / componentes | 🎯 **`43-UX.md` (activo R0)** + Skill tool (`frontend-design`, `impeccable`, `redesign-existing-projects`) |
| 🔵 Audita SEO / rich snippets / structured data | 🎯 `40-LOBULOS-DOMINIO` → 44-SEO (on-demand) + Skill tool (`seo-audit`, `ai-seo`, `schema-markup`) + 📚 §90 |
| 🔵 Audita PERFORMANCE / Core Web Vitals / LCP/CLS | 🎯 `40-LOBULOS-DOMINIO` → 45-PERFORMANCE (on-demand) + 📚 §17 |
| 🔵 Audita/diseña ESCALABILIDAD / arquitectura / modernización / monolito / desacople | 🎯 **`46-ESCALABILIDAD.md` (activo — mandato arquitecto)** + Skill **`arquitecto-software`** (6 lentes + IAP, always-on §3.8) + `crm-architect` |
| 🔵 Audita COPY / voz / tono / CTAs | 🎯 `40-LOBULOS-DOMINIO` → 47-COPYWRITING (on-demand) + Skill tool (`copywriting`, `copy-editing`) |
| 🔵 Audita ACCESIBILIDAD / WCAG / a11y | 🎯 **`48-ACCESIBILIDAD.md` (activo)** + Skill **`accessibility-audit`** (creada — framework WCAG 2.2 AA: usarla PRIMERO; `impeccable` solo para rediseño) |
| 🛠️ ¿Qué skill tengo para X? / mapa de skills del repo | 🛠️ `docs/skills-inventory.md` (catálogo ~88 skills) + 🎯 `40-LOBULOS §Recursos Externos` |
| 🛰️ Decisión fuerte / cara de revertir / fork 50-50 → ¿2ª opinión? | 🛰️ `docs/15-CONSEJO-EXTERNO.md` (Antigravity/Gemini: cuándo + qué modelo) |
| 🌱 Crear / sugerir una SKILL nueva (capacidad portable) | 🎯 `40-LOBULOS-DOMINIO` §Reflejo de Sugerencia de Skills + Skill `skill-creator` |
| 🧠 Mejora ×3 / "monta el comité" / pulir o criticar una respuesta dada / 2ª opinión | Skill **`comite-expertos`** (expertos dinámicos por tema · 3 niveles · 4ª voz Gemini/`15`) |
| 🧠 Cerebro MULTI-PROYECTO / cerebro auto-evaluable / "el linter dice SANO pero…" / plan de mejora vigente | **VIGENTE: comité v6** `docs/superpowers/specs/2026-06-09-comite-v6-cerebro-autoevaluable-VEREDICTO.md` (decisión + checklist A-U) · ADR §171/§172 + veredicto revalidación `…-comite-revalidacion-paso1-VEREDICTO.md` · **deliberación CRUDA + 45 hallazgos** → bóveda privada (`archiveDir` del manifest; stub en `docs/superpowers/research-archive/`) · históricos (superseded §171): relevo `…-HANDOFF-ESTADO.md` + `…-CHECKLIST-CIERRE.md` · plan v5 (archivo `…-plan-mejora-cerebro-v4-comite.md`) · inventario `…-inventario-preservacion-cerebros.md` · ADR §170 |
| El "por qué" de una decisión / detalle de un § | tabla "§ → línea" abajo → 📚 `99-HISTORIAL-ADR.md` |

---

## Mapa § → línea

> ⚠️ **ADR §228**: este mapa NO se comprime con pérdida (es on-demand, no boot → su tamaño casi no cuesta contexto). Si crece, se TIERA/sharda; nunca se recorta el contenido. `scripts/brain-index.mjs` lo audita (completitud §→línea; genoma frontmatter = TODO-32 Etapa 3).
> 🪦 **Tombstones (anti-Data-Rot, §228/TODO-32)**: un `⛔→§M` en una fila marca una decisión SUPERADA — NO la apliques, ve a §M. En el ADR viejo (`99`) la marca canónica es `> ⛔ REEMPLAZADO POR §M`; `brain-index.mjs` la detecta y **valida que §M exista** (puntero colgante = error). 1er caso: §111→§112.

| § | Tema | Línea |
|---|---|---|
| §1 | Arquitectura general (stack, deploy, negocio) | 8 |
| §2 | Estructura completa de archivos | 34 |
| §3 | Firebase (config, deploy rules, SDK) | 361 |
| §4 | RBAC original (3 roles fijos) | 412 |
| §5 | Firestore schema (colecciones/campos) | 567 |
| §6 | Sistemas clave (pipeline, cache 4 capas, SW, presence) | 769 |
| §7 | Patrones y convenciones del código | 945 |
| §8 | Errores conocidos y soluciones | 1069 |
| §9 | Fases completadas (histórico 1-11) | 2728 |
| §10 | Autenticación usuarios públicos (Fase A) | 2807 |
| §11 | Panel de usuario premium (Fase B B1-B10) | 2999 |
| §12 | Fase 12 pendiente (futuro) | 3155 |
| §13 | Sistema de notificaciones (Plan N1-N7) | 3169 |
| §13.bis | Smart Notifications v2 (Plan A-G) | 3307 |
| §13.quater | MEGA-PLAN v4 (4 capas, Concierge unificado) | 4053 |
| BLOQUE T | Design System global (tokens, components) | 4855 |
| BLOQUE B | Sidebar + Workspaces | 5150 |
| §13.ter | Comunicaciones + CRM v2 (MF1-MF6) | 8268 |
| §14 | SEO | 8566 |
| §15 | Performance Optimizations (P1-P15) | 8588 |
| §16 | Loading Orchestration (L1-L4) + Bonus B AVIF/WebP | 8876 |
| §17 | Reglas Operativas de Performance (DOCTRINA) | 9181 |
| §18 | Pendientes dominio custom + Cloudflare COOP | 9511 |
| §19 | Metodología RCA Mode (DOCTRINA) | 9793 |
| §20 | Concierge → ALTOR (iteraciones cliente) | 10036 |
| §21 | Bot Ultra Mega Cerebro (LLM + memoria) | 10618 |
| §22 | Offline Ultra Brain (fuzzy + sinónimos + KB ranker) | 11215 |
| §23 | ACD Enterprise (queue, locks, SLA, FCM) | 11974 |
| §24 | Offline Ultra Brain 2.0 (Dual-Core) | 12413 |
| §25 | Hotfix 2FA + anti-pattern appName | 12864 |
| §26 | ALTOR Hub & Expansión Cognitiva (ADR-026) | 13341 |
| §27 | ALTORRA HARMONY CRM (reestructuración) | 14517 |
| §28 | ALTORRA NOVA (fusión visual ULTIMATE) | 15596 |
| §29 | ADMIN-FINAL (polish total) | 16697 |
| §30 | ALTORRA VISIONARY (refactor world-class) | 17270 |
| §31 | VISIONARY DEEP (bug fixes + Vista Previa) | 17689 |
| §32 | VISIONARY MASTER PLAN (fases) | 17919 |
| §33 | ADMIN V2 (reconstrucción layout/scroll/FOUC) | 18187 |
| §34 | ADMIN OVERHAUL (tablas→cards + XSS fix) | 18386 |
| §35 | PERF KILL (purga anti-patterns) | 18619 |
| §36 | TOP NAV (barra superior reemplaza sidebar) | 18795 |
| §36.1 | Hot fixes feedback + Mi Perfil | 18942 |
| §36.2 | Subnav dropdowns escapan stacking | 19097 |
| §36.3 | Subnav contextual + simplificación | 19202 |
| §36.4 | Console cleanup | 19349 |
| §37 | PROTOCOLO IAP (DOCTRINA) | 19449 |
| §38 | Subnav DENTRO del main + fix Mi Perfil | 19724 |
| §40 | Bug latente Telegram UI + cache invalidation | 19864 |
| §41 | FIX DEFINITIVO subnav invisible | 19940 |
| §42 | Tabs por grupo replicando CRM | 20117 |
| §43 | RBAC en grupos topnav + perfil self-service | 20298 |
| §44 | Pre-paint optimista topnav user chip | 20559 |
| §45 | 4 fixes (skip-link, FCM, profile, RTDB) | 20726 |
| §46 | Dynamic Island admins + drag + Hub padding | 20932 |
| §47 | 2FA mobile (reCAPTCHA + trustedDevices) | 21211 |
| §47.bis | Mobile responsive + isla draggable | 21457 |
| §47.ter | z-index isla + cargo + hamburger + multi-store | 21712 |
| §47.quat | Hot fix hamburger + diag | 21970 |
| §47.5 | Fallback CSS anti-pantalla-blanca | 22151 |
| §48 | Sistema recuperación cuenta (backup codes) | 22288 |
| §49 | Unificación seguridad en Mi Perfil + 2FA toggle | 22516 |
| §50 | Mobile cache wipe recovery + Telegram min 0 | 22646 |
| §51 | Bot Telegram webhook setup | 22831 |
| §53 | onChatEscalatedTelegram southamerica IAM | 23004 |
| §54 | onChatEscalatedTelegram onWrite + logs | 23170 |
| §55 | Fix radicado duplicado push Telegram | 23336 |
| §56 | Fix radicado race (trigger natural) | 23475 |
| §57 | Refactor flow finalización chat | 23600 |
| §57.bis | Fix botón Cerrar chat (event delegation) | 23797 |
| §57.ter | Tiempo real microquirúrgico Hub | 23925 |
| §57.quat | 4 bugs tiempo real Hub | 24116 |
| §57.quint | Helper unificado cleanSessionAndRender | 24282 |
| §57.6 | 3 bugs (snapshot tardío + descargar admin) | 24438 |
| §57.7 | Listener admin globalmente activo + heartbeat | 24541 |
| §57.8 | 3 botones Chat finalizado + radicado dup | 24755 |
| §57.9 | Lazy reset on next open (industry-standard) | 24921 |
| §58 | ALTOR HUB MEGA-PLAN reconstrucción | 25146 |
| §59 | Mega-Plan Cirugía ALTOR Hub (7 sprints) | 25780 |
| §60.1 | Sprint S1 Optimistic UI admin | 26442 |
| §60.1.1 | Hotfix permisos S1 (pre-check claim) | 26683 |
| §61 | Plan Maestro RBAC Dinámico | 26879 |
| §60.2 | Sprint S2 Optimistic UI cliente | 27315 |
| §62 | Estado proyecto Cross-Window | 27552 |
| §63 | R1 RBAC Foundation (catálogo + seeder) | 27787 |
| §64 | R2 UI sec-roles CRUD | 28111 |
| §65 | R3 Dropdown dinámico sec-users | 28395 |
| §66 | R4 Migración legacy users | 28654 |
| §66.1 | Hotfix R4 click handler migrationModal | 28910 |
| §66.2 | Hotfix R2 orderBy compuesto | 29011 |
| §66.3 | Hotfix UX modal system roles | 29119 |
| §67 | R5 @deprecated + mapping table | 29233 |
| §68 | R6 Rules backend hasPermission | 29500 |
| §69 | R7 CEO único + Guard "Sin rol" | 29776 |
| §70 | R7.1 hotfix 3 bugs CEO | 30113 |
| §71 | R7b Cloud Function triggers anti-loop | 30523 |
| §72 | R7.2 hotfix UX | 30850 |
| §73 | R8 mini cleanup | 31129 |
| §73.1 | R8.1 header siempre visible | 31531 |
| §73.2 | R8.2 auto-hide botones legacy | 31646 |
| §73.3 | R8.3 fix flicker + eliminar Inicializar | 31837 |
| §73.4 | R8.4 auto-hide Resembrar | 32003 |
| §74 | Punto continuidad + Plan S3 Typing | 32110 |
| §75 | S3 Typing Indicators (RTDB) | 32600 |
| §76 | S4 Read Receipts (✓/✓✓) | 32896 |
| §77 | S5 Presence avanzada (online/away/offline) | 33173 |
| §78 | S6 Rediseño visual Hub admin | 33530 |
| §79 | S7 Rediseño visual cliente widget | 33858 |
| §80 | Hotfix hero FAB + queue stale | 34212 |
| §81 | Mejora inteligencia bot ALTOR (7 bugs) | 34524 |
| §82 | Fase A Smart Update (pill + SILENT_DEV) | 34850 |
| §83 | Fase B Smart Update (tipos + toast catálogo) | 35115 |
| §84 | Producción activada + deuda Cloudflare Pages | 35403 |
| §85 | PENDIENTES documentados (PENDIENTE-A/B/C) | 35658 |
| §86 | Sprint C-S8 Welcome contextual + Progressive | 35989 |
| §87 | Sprint C-S9 CSAT + Auto-resolve | 36264 |
| §88 | Sprint C-S10 Internal notes + Transferencias | 36546 |
| §89 | PENDIENTE-B refactor 174 callsites | 36881 |
| §90 | Fase 4 SEO técnica (rich snippets + h1) | 37174 |
| §91 | Fase 3A imágenes responsive `<picture>` | 37660 |
| §92 | Hotfix hero + eliminación particles | 37911 |
| §93 | Sprint 3B Lazy loading universal | 38201 |
| §94 | Normalización docs Cloudflare-only | 38378 |
| §95 | Hotfix hero invisible REAL + margin-top legacy | 38571 |
| §96 | Hotfix category card Pickup imagen rota | 38828 |
| §97 | Branch conflict + escaneo bug class HATCHBACK | 38950 |
| §98 | FCM prompt cada login + foreground + badge CRM | 39081 |
| §99 | FCM escalación directa (onWrite) | 39240 |
| §100 | Toggle Tarjetas↔Lista + HarmonyOS | 39390 |
| §101 | Card view limpia (pills/cajas) | 39502 |
| §101.1 | Hotfix box catch-all visionary | 39617 |
| §102 | Auditoría HarmonyOS + status badges | 39727 |
| §103 | Reorder inventario por inserción (Shopify) | 39902 |
| §104 | Wizard vehículo refactor (Sprints A-E) | 40015 |
| §105 | Wizard reorganización por modelo mental | 40110 |
| §106 | Wizard 3 fixes (modal + dropdowns + drafts) | 40218 |
| §107 | Drafts reescrito (multi-borrador por cuenta) | 40325 |
| §108 | Drafts 4 fixes (galería + re-prompt + lento) | 40503 |
| §109 | INVENTARIO CONSOLIDADO PENDIENTES (TODO-NN) | 40614 |
| §110 | Eliminar borrador optimista | 40719 |
| §111 | ⛔→§112 Drafts borran al refresh (causa EQUIVOCADA — el fix NO funcionó; aplica §112) | 40819 |
| §112 | FIX DEFINITIVO drafts refresh (teardown race) | 40952 |
| §113 | Contador tiempo real Marcas | 41106 |
| §114 | Depuración roles legacy → roleName + CARGO | 41196 |
| §115 | Tema cromático admin (toast-spam + 6 paletas) | 41367 |
| §116 | Plan A superficies teñidas (color-mix) | 41480 |
| §117 | Plan B texto legible + Plan C tints + dedup | 41597 |
| §118 | Arquitectura Documental Neuronal (cerebro de memoria) | 41736 |
| §119 | Reestructuración frontend (js/ plano → modular) | 41820 |
| §120 | Cerebro Documental Neuronal AUTÓNOMO | 41844 |
| §121 | Autocrítica + linter brain-check + robustez (cross-review) | 41867 |
| §122 | SP-1 Index cinematic vanilla (T4-T8 — port HarmonyOS/Claude Design) | 41888 |
| §123 | Reflejo de Cierre (M-03) — el cerebro no se auto-alimentaba sin recordatorio | 41967 |
| §124 | SP-5.0 rastro saga c→f — SW stale-while-revalidate + initTrail races (L-14/L-15, M-04) | 41987 |
| §125 | Omni-Brain Fase 1 — Trigger 🔵 Auditoría + Lóbulos de Dominio + skills sinergia (M-05) | 42032 |
| §126 | SP-5.1 Chrome global cinematic (snippets + components.js + home-chrome.js + cache bump) | 42078 |
| §127 | SP-5.1.b Bridge legacy↔cinematic (data-theme + especificidad CSS, chrome invisible fix · L-16) | 42131 |
| §128 | SP-5.2.a Body migration piloto (Legales + 404 → soft-redesign.css, contenido legal preservado) | 42178 |
| §129 | SP-5.2.b Body migration editorial (nosotros + contacto, form preservado) + fix cin-eyebrow global | 42217 |
| §130 | SP-5.2.c.1 Reseñas (sub-piloto app-like — reescribir render del JS a cinematic) | 42254 |
| §131 | SP-5.2.c.2 Perfil → cinematic por armonización de tokens (`--pf-*`→`--cin-*`, hero soft, 0 cambios JS) | 42287 |
| §132 | SP-5.2.c.2 Favoritos → cinematic por armonización CSS de `.vehicle-card` (scoped data-cin, 0 cambios JS) | 42326 |
| §133 | Chrome unify: botones `.btn-*` del header en legacy (port a chrome-redesign.css scoped) + badge favoritos reposicionado + oculto en 0 · L-18 | 42362 |
| §134 | SP-5.2.c.3 Comparador flotante cinematic + abajo-izquierda + máx 2 (CSS en chrome-redesign.css → aparece en index) | 42397 |
| §135 | SP-5.2.c.3 Comparador página `comparar.html` cinematic (slots A/B + picker inline + diff dorado + veredicto, port Compare.jsx) | 42424 |
| §136 | SP-5.2.c.4 Simulador crédito cinematic por armonización de tokens `--sim-*`→cinematic (cero cambios al cálculo) · cierra SP-5.2.c | 42445 |
| §137 | QA/pulido cinematic: flotante comparador reposicionado (no choca con QuickTools) + gráfico simulador armonizado | 42471 |
| §138 | SP-4 Motor de recomendaciones por similitud al rastro (content-based, `js/core/recommendations.js`) · L-19 · M-06 | 42485 |
| §139 | Footer cinematic: matar gris fantasma `#808080` (bridge `color:var(--ink-text-muted)`) + auditoría cobertura cinematic (qué falta) · L-20 | 42512 |
| §140 | SP-5.3: `detalle-vehiculo` cinematic + de-monolitización (4 módulos `js/public/detalle/` + `css/home/detalle-cinematic.css`, botones Opción A, favorito/comparar/sticky cableados, 27 páginas regeneradas) · L-08/L-20 | 42541 |
| §141 | SP-5.3 pulido detalle post-validación: fix glow dorado hover ficha + fondo blanco características + descripción editorial + glass (info-card/descripción) · L-21 | 42569 |
| §142 | Eliminar Descripción del vehículo (tab detalle + campo/generador admin + búsqueda + noscript; 27 regeneradas; `descripcion` dormido en Firestore) | 42594 |
| §143 | `busqueda.html` (catálogo) cinematic (SP-5.3.b): hero serif + filtros glass + tarjetas `.vehicle-card` cinematic + paginación; JS intacto, sin regen · L-21 | 42614 |
| §144 | `marca.html` (template) cinematic (SP-5.3.c): hero/brand-header serif + sidebar filtros glass + tarjetas cinematic; 18 `marcas/*` regeneradas; JS intacto · L-21 | 42631 |
| §145 | Fix nav header "Marcas"→`marcas.html` (snippet + index; antes al carrusel) + `marcas.html` (índice) cinematic (tokens/serif/Manrope, 18 tarjetas de marca) · L-21 | 42649 |
| §146 | 4 landings SEO por categoría (`vehiculos-{suv,pickup,sedan,hatchback}.html`) cinematic (SP-5.3.e): clon estructural de marca.html → REUSO `marca-cinematic.css` (DRY), data-cin + soft-redesign; 3 redirects (usados/nuevos/camionetas) INTACTOS; estáticas, sin regen. **Catálogo 100% cinematic** | 42667 |
| §147 | A11y quick wins WCAG (cierre parcial §48): focus-visible + reduced-motion + h1 sr-only + aria-label en 50 controles. Aditivo, ids/JS intactos. | 42696 |
| §148 | Validación post-launch (node -c limpio + 1 enlace roto arreglado) + A11Y-03 contraste WCAG AA + deuda TODO-09..13 verificada. | 42726 |
| §149 | A11Y-04 skip-link (WCAG 2.4.1, **cierra §48 = 6/6**): `.skip-link` + `ensureMainLandmark()` en components.js (DRY, sin tocar 20 páginas). Aditivo. | 42754 |
| §150 | **Consistencia de diseño global**: near-black cálido `#0D0B09` + QuickTools dock + dropdown Vehículos; fixes dropdown-colapsado/dedup/columna. PR#786. | 42783 |
| §151 | **Evaluación crítica "Cerebro V5"** (Antigravity): ADOPTADO lean — saturación por SÍNTOMA en §G.2 🔴 + "🚫 Callejones" en handoff de `10`. RECHAZADO: contador de turnos, HANDOFF.md, docs/skills/, inyecciones a CLAUDE.md. → M-08 | 42834 |
| §152 | **Reflejo de Auto-auditoría PRE-CIERRE de sesión**: barrido holístico proactivo (brain:check + frescura vs git) antes de cerrar la sesión, extendido en §G.4. Por evento de cierre, NO contador de turnos. → M-09 | 42855 |
| §153 | **Lo verificable va al LINTER, no a un reflejo** (RCA de por qué la Autocrítica es reactiva): brain-check extendido con (4) Frescura cache SW==manager==05 + origin/main. → M-10 | 42867 |
| §154 | **Chequeo AVANZADO del cerebro**: brain:check extendido (offsets, ADRs sin índice, refs L-/M- colgantes, hojas inexistentes). Auditoría integral 0 huecos estructurales; 1 semántico corregido (rutas planas → modulares). → M-10 | 42886 |
| §155 | **Kickoff reconstrucción CRM** + skill `crm-architect` (commit `6cc0055`): build Firebase/Firestore/Functions, vertical automotive, RBAC+Ley 1581. CRM viejo = `admin.html` + `js/admin/admin-crm*.js` + `comm-schema.js`. Diseño → ADRs §157+ | 42902 |
| §156 | **Blindaje determinista del cerebro**: hooks (pre-commit + SessionStart brain-check) + Consejo Externo (15) + verifica-no-asumas UNIVERSAL (§3.3, M-11) + limpieza skills. Doctrina→garantía mecánica (M-10) | 42909 |
| §157 | **Fix rectángulo negro del hero**: `<footer class=cin-hero-foot>` heredaba `body footer{background}` (dark-theme.css:688). Fix `.cin-hero-foot{background:transparent}`. Lección **L-25** | 42919 |
| §158 | **CRM Fase 1: ingestión canónica DESPLEGADA**: `onSolicitudCreated` normaliza `solicitudes`→`contacts`/`leads`/`activities` en tx atómica (dedup, consent 1581, idempotencia, dead-letter). 21 tests. LIVE. L-26 | 42929 |
| §159 | **CRM Fase 2: Bandeja + app admin greenfield** (`admin-app/`, Vite+Firebase modular `altorra-crm`): colas triage + score/NBA determinista + acciones 1-clic + Customer 360. Auth lookup `usuarios/{uid}` (claims→Fase 5). Verif `?mock=1`. L-27 | 42939 |
| §160 | **CRM Fase 3a: Pipeline drag-drop** sobre `deals` (lead→oportunidad): `domain/pipeline.js` (8 etapas, forecast) + kanban a11y + ganado/perdido. Reglas+índice `deals` LIVE (`1e154c2`). L-29 | 42949 |
| §161 | **CRM Fase 3b: Agenda unificada**: `domain/agenda.js` (grilla mes, `dayKey` LOCAL) + lee `activities.dueAt` (índice automático). Acción '📅 Agendar' en 360. Verif `?mock=1`. L-30 | 42959 |
| §162 | **CRM: Captura MANUAL de leads multi-canal** (Meta/WhatsApp/TikTok/llamada): form '＋Nuevo lead' escribe `solicitudes` → reusa ingestión Fase 1, cero backend. Atribución canal/pauta/campaña (ROI). L-31 | 42968 |
| §163 | **CRM Canal AUTO #1: registro→contacto** (`onClienteCreated`): upsert `contacts` (dedup), NO crea lead (registrarse≠intención), fusiona invitado→registrado sin pisar first-seen. 28 tests. DESPLEGADO. Backfill pendiente | 42977 |
| §164 | **CRM Canal AUTO #2: newsletter→contacto** (`onSubscriptionCreated`) — TOCA SITIO PÚBLICO: form roto → `subscriptions` → upsert contact (subscriber). `home.js initNewsletter`. Cache bump. 33 tests | 42987 |
| §165 | **CRM Fase 4: Reportes/KPIs** (`#/reportes`): KPIs + embudo + canal (`channelOf`) + forecast + tendencia + CSV. `domain/reports.js` PURO + charts SVG/CSS sin librería. L-30/L-32. | 42996 |
| §166 | **CRM: Contactos (directorio)** (`#/contactos`): lista buscable/filtrable; con lead → ficha 360 existente (detailLeadId atómico L-27); suscriptor sin lead → fila no interactiva. L-33. | 43006 |
| §167 | **Cerebro Fase A**: Lente de Arquitecto §3.8 (6 pilares → `46`) · Legal=Colombia en Trigger 🔵 · workflow `adversarial-review.js` + L-34. Comité ×3 diseñado. Spec `2026-06-06-cerebro-skills-roadmap.md` | 43016 |
| §168 | Cerebro Fase B (reconciliación): las 3 skills YA EXISTEN (portables, build paralelo Bersaglio) + registro + eval llm-council/engineering | 43024 |
| §169 | Cerebro Fase C: auditoría seguridad (9 hallazgos) + holística CRM + legal vehículos → nacen 41-SEGURIDAD y 42-LEGAL (nada desplegado) | 43033 |
| §170 | Decisión Fuerte: cerebro MULTI-PROYECTO (núcleo compartido 4-capas + brain:diff, NO único; comité×3 + Gemini) → spec 2026-06-09 | 43041 |
| §171 | **ENMIENDA a §170**: revalidación comité×3 + Gemini (convergentes) PAUSA el sync P2P del KERNEL → economía LOCAL primero (destilar 10) + Opción C template/generator diferida a Cloudflare. "PASO 1 extraer KERNEL" SUPERSEDED. Veredicto → `…-comite-revalidacion-paso1-VEREDICTO.md` | 43050 |
| §172 | **Mandato 3 (validación FINAL) → CERTIFICADO**: comité 11 agentes verificó en disco; 2 bloqueantes (cura no aterrizada §171.7 + README stale) RESUELTOS+grep → CERTIFICADO. Meta: verificar la cura en la capa que el boot lee | 43062 |
| §173 | **Comité v6 — cerebro auto-evaluable** (16 agentes, 45 hallazgos): cura 'SANO-teatro' = evaluación 2 NIVELES (gates + skill `auditoria-cerebro`) + GC dos palancas con trinquete + TODO ledger único + captura-en-ORIGEN + brain-diff gateado. Checklist A-U → bóveda VEREDICTO | 43074 |
| §174 | **Bóveda privada brain-private** (ítem C, Gemini adoptado/refutado): RED/AMBER → repo hermano privado (NO submódulo — rompe Pages; NO purga de historial — riesgo residual documentado); stubs públicos + archiveDir ×3 → bóveda; cliente crea remote privado + push | 43111 |
| §175 | **TODO-17 E2E live CRM ✅** (web+newsletter → solicitudes/subscriptions → ingestión → canónico → Bandeja score/NBA + Contactos 3/3) + **incidente billing-disabled** (~2h, Eventarc re-entregó solo, L-38) + **FIX spinner form contacto** (`.form-card` eliminada por el rediseño → fallback al `<form>`, L-37) + shard `31-LECCIONES-GIT` | 43141 |
| §176 | **Comité CRM v2 → plan E0→E6** (quejas reales: cero sync lead↔deal, sin CRUD, calendarios desconectados, cupos no liberan). Estados lead v3, pipeline v3, calendario único, Ley 1581=anonimización, F42 comisiones. VEREDICTO→bóveda. Manual `docs/MANUAL-CRM-USO.md`. TODO-21 | 43153 |
| §177 | **E0 EJECUTADA**: spec única crm-spec + F34 export/restore + F1 lead inmutable (atacado live ✓) + Bandeja Activos/SLA chip + F17-urgente cupos transaccionales | 43165 |
| §178 | **E1a núcleo**: ⚡ lead rápido `lead_intake` offline (<30s, E2E live 2s) + ingestLead compartido + quick-log + Pendientes hoy + P2.b próximo paso. Gotcha: 1er evento perdido por propagación Eventarc | 43177 |
| §181 | **E1b Pipeline v2**: restore ENSAYADO (gate) + enums v3 + paridad 7×7 + Rules gates/matriz + onDealUpdated (E2E live 3s) + F7 conversión/anulación + undo 10s | 43213 |
| §182 | **E2 tanda 1**: F21.1 configs DIVERGÍAN (web vendía festivos) + F16 proyección cita→Agenda (E2E live 5s) + crmDailyJob 5am (backup→rebuild→purga→digest) | 43225 |
| §183 | **Decisiones del dueño (end-game panel)**: agenda clásica muere EN el cutover tras paridad F39 · E6.5 comité de DISEÑO del panel (FIRME) · E6.6 auditoría TOTAL admin clásico post-migración · relevo por saturación (retomar 'continúa E2 tanda 2', §182.7) | 43237 |
| §179 | **E1a CERRADA**: F37 SLA 2h hábiles + rotación de intake en tx (E2E live ✓) + F38 notify (crítica/info) + F33a fricción | 43189 |
| §180 | **Adelanto E3**: F13 Archivar + F15 crmPurgeLead (cascada server, super admin) + fix credencial GitHub | 43201 |
| §185 | **E3 EJECUTADA**: índice dedup F40e (E2E live ✓) + F12 editar/_version/fusión resumible + F14 supresión 1581 (gracia 72h, finalizador, tombstones en cascada). Review: 1 crítico + 9 majors corregidos. 139 tests | 43260 |
| §184 | **E2 COMPLETA**: F21 SSoT availability + módulo Disponibilidad (festivos 1-clic) + F18/F19 crmCitaAction (tupla 30min, token rota C.4) + citaConfirm HTTP (E2E live ✓) + F20 sweep horario + F28 v2. Carrera C.5 en verde | 43247 |
| §187 | **E5 EJECUTADA — blindaje**: SEC-01 read estricto (8 colecciones) · SEC-06 whitelist hasOnly+caps+shapes (⚠️ ~1000 exprs Rules) · SEC-08 bookedSlots · retry:true ×6 + DLQ. 189 tests. Residual: cupos por anónimo → App Check | 43286 |
| §186 | **E4 EJECUTADA**: `vehicleAggregate` (won→vendido/apartado, no pisa manuales, badge web) · `dealWon` (postventa+commissionSnapshot) · F26 colisión · F42 Comisiones (CSV anti-inyección). Rules anti-forja. Fix pipeline yml roto 16 días. 169 tests | 43273 |
| §188 | **E6.6 EJECUTADA — auditoría admin clásico** (16 agentes, 112 hallazgos): KPIs envenenados (portal no actualiza `solicitudes.estado`) · mapa 21 secciones · 14 riesgos cutover (stub redirect, NO borrar admin.html) · plan strangler 29 pasos → bóveda | 43299 |
| §189 | **E6 paso 0**: cacheSignal ×4 (system/meta 13 días stale) · onUsuarioBloqueadoSync + loginAttempts CERRADO · fix: E5 rompió cita interna (createdBy no censado, L-41) + kind:'cita'. 192 tests. Deploy ✅ | 43312 |
| §190 | **E6 fase ② p1 — Reseñas en el portal** (1er módulo público migrado, patrón validado): shape VERBATIM del lector público + RBAC reviews.* + mock + **core/audit.js NUEVO** (no perder auditoría; semilla fase ④) + `#/resenas`. Preview mock ✓. F39 live doble: reseña real valida módulo + cacheSignal | 43324 |
| §191 | **E6 fase ② p2 — Banners (código fase ② COMPLETO)**: solo posiciones VIVAS (promocional limit-3 + home_promo; hero/categoria write-only NO se portan) · **core/image.js** WebP + storage export · `_version` preservado · Ocultar≠Borrar. Preview mock ✓. Gate de fase tras F39: ocultar ambas secciones del clásico. Siguiente: fase ③ | 43336 |
| §192 | **E6 fase ③ p1 — Marcas en el portal**: docId=slug (en vivo, acentos ok) · `_version`/validVersion preservado · resolvers de logos legacy + LOCAL_LOGOS · upload `cars/brand_logo_*` (WebP 512/SVG) · conteo de vehículos por marca · **guard de borrado con inventario** (mejora vs clásico). Preview mock ✓. Siguiente: lists (S) → vehicles (L, SESIÓN FRESCA) | 43348 |
| §193 | **Decisiones del dueño (siembra post-panel)**: bot ALTOR sin fallback IA (solo Claude, R-1) · fábrica de skills frontend/backend portables + rescate de webs monolíticas (TODO-22) · web pública CMS-izada post-panel (TODO-23) · RBAC departamental fase ④ (cf. Bersaglio) | 43360 |
| §194 | **E6 fase ③ p2 — Atributos del inventario** (`config/listas` → `#/atributos`): shape VERBATIM {value,label} · merge SOLO la clave editada · getDoc once + dirty/tarjeta (NO onSnapshot en editor inline) · conteo de uso + modal al quitar opciones EN USO · gate UI settings.* · lector dynamic-lists.js INTACTO | 43372 |
| §195 | **E6 — backup inventario (D4-09b) ADELANTADO**: CRM_COLLECTIONS += vehiculos/marcas + listas (daily 5am automático) · módulo `#/respaldos` (export + restore dry-run-first, path diario predecible por fecha) · server=guardián. Deploy ✓. Doctrina de adelanto de ítems (195.7) | 43384 |
| §196 | **Gap 5 Agenda (F23-7) — '＋Nueva cita' en vista Agenda**: chooser con buscador de leads + camino walk-in SIN lead (server exige nombre/fecha/hora/asesor). Reusa openCitaCreate, gated crm.edit. Verif mock | 43396 |
| §197 | **Gap 7 Agenda — acción `update`**: observaciones + REASIGNAR asesor sin cambio de estado (`moveAdvisorBlocks`: libera saliente + reserva entrante MISMA tx; vehículo/confirmedAt/token intactos) · UI "✏️ Editar / reasignar". Emulador 193 ✓ · deploy ✓ | 43408 |
| §198 | **F39 v2 (decisión dueño)**: verificación EN VIVO la ejecuta Claude por LOTES en hitos (no el dueño, no por merge); tests/emulador/preview por cambio NO se relajan; comité/Gemini en entregas grandes; gates ②/③ tras lote post-vehículos. + M-14 | 43420 |
| §199 | **ÉPICA VEHÍCULOS — mapa + V1**: 7 lectores (~950k tok; crudo + 11 decisiones de port en bóveda `2026-06-12-epica-vehiculos-plan.md`) · domain/vehicle.js (Smart Fields VERBATIM) · `#/vehiculos` lista (orden prioridad DESC/id ASC, destacar espejo, delete con log previo) · markAsSold NO se porta (venta=pipeline R-12) | 43429 |
| §200 | **Épica vehículos V2 — wizard 6 pasos**: buildVehicleDoc PURO (~45 campos, derivados verbatim) · create tx (counter ALT- + anti-colisión id) · **update tx compare expectedVersion → version-conflict → SHAPE COMPLETO** (gate anti-vehicleAggregate) · apartado disabled-persistible · vendido Fase 22 · smart preview live (score exacto) | 43440 |
| §201 | **Épica vehículos V3 — subida nativa de fotos**: tanda alfanumérica pre-subida + slots estables · WebP 1200@0.75 · path `cars/{ts}_{baseName}.webp` · límite real 2MB (el '10MB' era stale). Mock ✓; subida real = lote V6 | 43449 |
| §202 | **Épica vehículos V4 — borradores**: `usuarios/{uid}/drafts` shape = KEYS DEL FORM CLÁSICO (interop) · explícito OPTIMISTA + rollback · DOBLE baseline al cerrar · retomar RE-DERIVA tipo · publicar borra draft · retry 1200ms. **§202.5: comité de rediseño de borradores post-cutover (TODO-24)** | 43456 |
| §203 | **Épica vehículos V5**: reorder global · CSV · historial+revert solo-super · duplicar. V1-V5 ✅; resta V6 lote en vivo | 43464 |
| §204 | **Dealers FASE 1 ⟦OPUS⟧** — port aliados al portal (slug clásico, sin _version/delete) + backup. FASE 2=TODO-25 | 43473 |
| §205 | **Gate legal JSON-LD ⟦OPUS⟧** — placa+seller solo si propio; terceros omitidos (Habeas Data/Ley 1480). `generate-vehicles.mjs` | 43486 |
| §206 | **Auditoría cerebro N2 (ítem U) ⟦OPUS⟧** — costo boot + monolitos + §G load-bearing. Plan A0-A10 (shard 30→33, 11-GOBERNANZA gated ×3+Gemini) | 43498 |
| §207 | **Auditoría N2: ¿lazo o teatro? ⟦OPUS⟧** — MECANIZA o TEATRO (M-10/M-16: 05/10 mienten sobre git). Curas=gate kernel ×3 (TODO-29) | 43512 |
| §208 | **Gemini UNIFICADO ⟦OPUS⟧** — A=Núcleo Delimitado (desbloquea split §G) · B=abolir estado-git en 05→inyectar en boot · C=Doble Llave+Staging (código-dinero) | 43529 |
| §209 | **Verif V6 + fix walk-in ⟦OPUS⟧** — `createManualLead` permission-denied (L-41)→`crm.edit`+anti-spoof append-only. 198/198 | 43539 |
| §210 | **Strangler E6 gates ②/③ ⟦OPUS⟧** — `admin-cutover-gates.js` oculta+redirige secciones portadas (sidebar/tabs/hash), Ocultar≠Borrar. Vehículos→V6 | 43557 |
| §211 | **Fixes render público (V6) ⟦OPUS⟧** — reseñas link · banner promo restaurado · carrusel marcas refetch | 43575 |
| §212 | **SEC: dueño INAMOVIBLE server-side ⟦OPUS⟧** — `users.edit` degradaba CEO + `roles.edit` tocaba super → fix rules anti-spoof + 7/7. Deploy | 43599 |
| §213 | **④a PASO 0: capa CF dueño-inamovible ⟦OPUS⟧** — `isOwnerData()` en verifySuperAdmin + guard en update/deleteUserRoleV2. Deploy. Blueprint bóveda `2026-06-18-RBAC-4a-*` | 43621 |
| §214 | **FIX gate §210: no encerrar al dueño ⟦OPUS⟧** — `guardHash`→dashboard (no al portal sin Usuarios/Roles). Cutover no encierra lo no-portado | 43639 |
| §215 | **④a PASO 2: backfill RBAC ⟦OPUS⟧** — callable `backfillNivelesRBAC` (no ADC, L-43) + `rbac-foundation.js` +9 tests. Deploy | 43655 |
| §216 | **④a PASO 3: departamentos ⟦OPUS⟧** — `match /departments/` + `admin-departments.js` (DOM puro) + nav/GROUPS. Deploy | 43673 |
| §217 | **SEC: ningún users.edit/create MINTA un dueño (§215.7) ⟦OPUS⟧** — `isOwnerDoc()` en create+update. 80/80. Deploy | 43689 |
| §218 | **④a PASO 4: depto/nivel/dataScope a usuarios ⟦OPUS⟧** — modal +3 campos + CF `onUserDeptChanged` (userCount). Deploy | 43707 |
| §219 | **④a PASO 5+6 → ④a COMPLETO ⟦OPUS⟧** — `computeNivelSeedOnAssign` +7 tests; deploy `onUserRoleAssigned`. GATE ④b: floor server-side | 43723 |
| §220 | **CMS (TODO-23) arranque + FASE 0 seguridad ⟦OPUS⟧** — editor fichas tipadas en admin-app; hardening safeJsonLd/anti-svg/anchor; gate SSG_SELFTEST | 43741 |
| §221 | **CMS cobaya LIVE + fix `pageTitle` site-wide ⟦OPUS⟧** — SSG horneaba `<title>` sin id→loadVehicles reventaba (19 marcas) → null-guard. L-45 | 43757 |
| §222 | **CMS por marca COMPLETO ⟦OPUS⟧** — banner editable→SSG + CFs instant-publish (regen selectiva) + nav→canónica. Review 0-críticos. L-46 | 43775 |
| §223 | **§G.4 Caza-bugs byte-idéntico ×4 ⟦OPUS⟧** — guardián cars (L-31); §90.8 DECLINADO; 1er bullet idéntico del §G (TODO-28 pend) | 43793 |
| §224 | **Consejo Externo: "Antigravity SÍ ve código" + Tier Refinamiento ⟦OPUS⟧** — corregido ×4; Gemini→Tier R1-R4 (§224.8) | 43814 |
| §225 | **CMS cron→admin+SA + auditor SVG 0.2b ⟦OPUS⟧** — `connectDb` admin-SA/cliente fallback; SVG read-only purga gateada. ACTIVADO (SA `cron-ssg-lector`). L-49 | 43834 |
| §226 | **Auditoría cerebro N2 (21/06) ⟦OPUS⟧** — 3 sondas colgaron (subagentes gateados). SANO. HIGH: maquinaria pesada cuelga→'comité acotado'=TODO-31. L-50 | 43854 |
| §227 | **Borradores rediseño f1+2 ⟦OPUS⟧** — recuperación local opt-in §107-safe + por-cuenta + galería pro + modal custom (comité ACOTADO). f3 Storage=Gemini-gated. #896. L-51/M-17 | 43874 |
| §228 | **TODO-32 escalabilidad: índice on-demand NO se comprime (tope 36k→48k vía ratchet §173) + auto-índice = GUARDIÁN no reemplazo (cutover refutado=lossy) ⟦OPUS⟧** — comité+Gemini+debate; `scripts/brain-index.mjs` VERIFICA completitud (índice a mano ya completo: 245=245, 0 huecos; claim falso previo corregido §3.3); genoma frontmatter + tombstoning = Etapa 3 (abierta). | 43887 |
| §229 | **TODO-32 paso (b): replicación del guardián ×brains = SELECTIVA por convención (no byte ciego) ⟦OPUS⟧** — inmob ✅ instalado (compat); bersaglio/insema = ADR N/A (headers fecha-leading / índice-por-proveniencia → copy=falsa cobertura M-10); guardián NO se funde al `brain-check` read-only (invariante L11, check #3 ya detecta el drift); +insema a peers. L-52. | 43899 |
| §230 | **Limpieza Firebase 22/06 ⟦OPUS⟧** — Storage: 406 fotos huérfanas/78MB PURGADAS (`storage-orphans.mjs`+workflow, guardas anti-bug-#7, 256 vivas intactas). Firestore: −5 docs basura. Functions: `proactiveEngagement`(fallaba 288×/día)+`migrateLegacyUsers` borradas (59→57; 13 del bot→TODO-34). Hallazgo: cerebro decía 27 functions→59 (autocrítica→TODO-33). | 43918 |
| §231 | **Doctrina de proceso 22/06 ⟦OPUS⟧** — (1) rama ÚNICA `dev` (no más proliferación; borrar mergeadas; `main`+`dev`). (2) **Pipeline Decisión Fuerte** (skill `proceso-decision-fuerte`): verificar→comité→Gemini→VERIFICAR cada claim (no asumir, aporte del dueño)→revalidar→veredicto→impl por fase; ACOTADO; gate solo-Decisión-Fuerte. Validado en vivo (TODO-34: comité cazó Ley 1581 que Gemini no vio). | 43928 |
| §232 | **TODO-36 ✅ skill `validacion-live-chrome` ⟦OPUS⟧** — validación LIVE post-merge vía extensión "Claude in Chrome": yo redacto prompt+esquema-observabilidad, el dueño lo ejecuta en su Chrome logueado (credenciales solo él, L-08), me pega la observabilidad→actúo (caza-bugs→fix). Forma=skill SIN workflow (L-50). Propagada ×4 repos+global (md5 byte-idéntico). Saldó deuda TODO-35 (anti-codigo-muerto ×3 peers) + reparó invariante (proceso-decision-fuerte ×3 peers). [HONOR]. Sin cache bump. | 43937 |
| §233 | **1ª caza del validador EN VIVO ⟦OPUS⟧** — la extensión Chrome reportó `ReferenceError: _asesorJoinedAnnounced is not defined` al reabrir un chat finalizado (`client_finalized`): `cleanSessionAndRender()` reventaba (strict mode + var sin declarar, decl perdida en split §119) → usuario atrapado, sin caja de envío, sin recuperación (resetSession lanzaba igual; no es caché=server-side). Fix: declarar la var (hotfix conservador; write-only→candidato poda anti-código-muerto). Follow-up: confirm() nativo→modal F4/F5; grounding débil=esperado (LLM off). Re-validación live pend tras merge. | 43949 |
| §234 | **Fuga de privacidad en logout ⟦OPUS⟧** — 2ª pasada del validador (adversarial + cobertura login→logout→sin-login) cazó bug NUEVO: tras logout, el chat del usuario logueado (nombre/mensajes/solicitud asesor) seguía visible para el siguiente anónimo en equipo compartido (Ley 1581). Causa: concierge vincula sesión al uid en login (`concierge.js:4175`) pero sin rama de logout; `handleLogout` no limpiaba `altorra_concierge_session`. Fix: `handleLogout`→`_wipeConcierge()` (resetSession/removeItem). Follow-up: logout exige 2 clics (race dropdown/re-bind). Re-validación live pend. | 43961 |
| §235 | **TODO-37 ✅ P0 leads anónimos perdidos — FIX verificado EN VIVO ⟦OPUS⟧** — gate guest→`updateSoftContact`→rule UPDATE solo-admin→400→`.catch` mudo→lead perdido (dinero). Decisión Fuerte COMPLETA (verif→comité→Gemini→veredicto→impl→re-validación live). Fase0 bleed-stop (gate honesto+rescate WhatsApp+stop-placeholder) + Fase1 auto-persist (Option **G**=gate CREATE; el phantom no ingesta→sin duplicado; `+consentGiven` desplegado, UPDATE intacta). Validador 3ª pasada: lead COMPLETO en CRM, contactable, sin dup, Write 200. + bug flujo: fechas duplicadas en gate-request→`quickReplies:[]`. Skill ahora caza copy+flujo comercial. | 43973 |
| §236 | **F4/F5 rediseño ALTOR Bot+Hub Fases A-D ⟦OPUS⟧** — TODO-38. v2 paralelo flag-gated (v1 intacto). A=contratos v1. B=dirección Bancolombia/WhatsApp+dorado + 4 mockups + comité D1-D6 (entrada ternaria mode×engine: Free Core→botones/LLM→libre/humano→libre). C=arquitectura Gemini verif (fork L-c·flag sync+queue·storage v2 sep·CustomEvent). D=bot v2 `js/concierge/v2/altor-bot.js` Web Component+Shadow DOM (tramos 1-2 live). **Fixes v1 verif live**: #7 gate=takeover (clase `cnc-gating`) · ícono WhatsApp real. Free Core no entiende lenguaje natural (C#3/C#4=LLM, no bug). F5/Hub→§237. | 43985 |
| §237 | **PLAN UNIFICADO un-solo-panel-admin ⟦OPUS⟧ FOCO MAESTRO** — dueño "muchos planes sin un camino". Survey 5-agentes (`wf_668bd020-e80`, in-cwd, sin colgar) + comité + Gemini verif claim-a-claim → portal único=`admin-app/`, apagar `admin.html`. GAP=Config/Comms/Dashboard; CRM canónico backend-owned (6 canales). **Gemini 6 hallazgos ✅** (single-tab+sin RTDB·mass-logout·F-7-purga-prod→staging·dedup session:ID·bot en Vite·SW zombie) + REVIRTIÓ su verdicto (Hub→admin-app). F-0.5 iniciado (`admin-app/firebase.js` multiTab+RTDB). Resume F0..F6. | 43997 |
| §244 | **HUB de Visibilidad: 7 skills + agente `seo-auditor` ⟦OPUS⟧** (TODO-42) — cars=HUB construye+propaga skills portables SEO·AEO·GA4·GSC·Maps·SSG·Feeds·Imágenes (vertical vía `tenant_config`). Arq **IoC + core-puras + D′ vendored** (comité+Gemini verif: adopté IoC+versionado, refuté "A=cero-infra"; $0). Global+repo, catalogado. Bóveda `…visibilidad-HUB…`. Propagación ×3 ✅(§244.8). | 44081 |
| §245 | **F-2 (6/6) `ajustes` (tema + SEO/sitemap) en admin-app ⟦OPUS⟧** — CIERRA el GAP Config. (a) 6 paletas de acento (`.theme-accent-{id}` remapea `--gold-*`, persist localStorage). (b) SEO/sitemap → callable **server-side** `triggerSeoRegeneration`. **Decisión arq (L-53)**: NO porté el flujo client-PAT del clásico (smell+redundante) → cero PAT en navegador, sin regresión. dist gateado. F-2 COMPLETO. L-53. | 44094 |
| §246 | **F-3 `dashboard` (Inicio) en admin-app ⟦OPUS⟧** — gap §2.C: el portal aterriza en su **Inicio accionable** (antes Bandeja). Landing snapshot: 6 KPIs hero + "Tus próximas acciones" (NBA priorizado, toggle Míos/Todos, click→360) + pendientes + accesos. Cero duplicación (reusa `reports`/`inbox.domain`). router default→`inicio`. Bug→L-54. dist gateado. | 44106 |
| §247 | **F-4 (1/3) "Lo que no entendí" (visor `unmatchedQueries`) en admin-app ⟦OPUS⟧** — arranque de F-4 Comunicaciones por el incremento más tratable (strangler intra-fase: Unmatched 380L<KB 933L<Hub 2979L). Visor realtime (filtros+conteos, optimistic vista/eliminar) = señal de FUGA del bot. RBAC gateado EXACTO como rules. "Crear FAQ" degrada hasta KB. Patrón `auditoria`. dist gateado. Sigue F-4(2/3) KB→(3/3) Hub. | 44118 |
| §248 | **F-4 (2/3) Cerebro AI — gestión FAQs (`knowledgeBase`) en admin-app + handoff Unmatched→FAQ ⟦OPUS⟧** — port CRUD de admin-kb (lista priority-desc, modal crear/editar, toggle, borrar, bootstrap 25 FAQs); filtra doc `_brain`. RBAC gateado como rules (`kb.read/create/edit/delete/bootstrap`). **Alcance**: NO `findBest`/`recordUsage` (los usa el bot público, stack viejo) · brain/LLM config DIFERIDA (bot dormido). **Handoff E2E**: unmatched "Crear FAQ"→`store.kbPrefill`+`navigate('cerebro')`→form prellenado→`markPromoted`. Verif `?mock=1` OK. dist gateado. Sigue F-4(3/3) Hub. | 44130 |
| §249 | **F-4 (3/3) ALTOR Hub → admin-app ⟦OPUS⟧ — F-4 COMPLETO** — port del GIGANTE `admin-concierge.js` (2979L) en 4 sub-incrementos: **3a** visor (lista/filtros/detalle/presence read) · **3b** lazo humano (claim `runTransaction` optimista + responder ⏱/✓/✓✓/retry + typing RTDB bidireccional + read) · **3c** gestión (close/reopen/transfer-modal-por-presence/super-release/notas-internas) · **3d** IA (smart suggestions heurísticas + Resumen handover local; LLM summary DIFERIDO=saldo). ⚠️ orden vs rules en close/reopen. RBAC `concierge.*`=rules. Verif `?mock=1`; **E2E live pendiente** (typing/presence live-only, staging §237.6). dist source-only. Cierra gap §2.B → sigue F-5. | 44142 |
| §250 | **F-5 cierre de fugas CRM ⟦OPUS⟧** — (a) fallback `session:ID` en `normalizeSolicitud` → el chat concierge anónimo (sin email/tel) se ingiere como lead **"Anónimo"**+tag por la tx canónica (antes lanzaba→`failedIngestions`=fuga §4 #4) · (b) `crmReprocessFailedIngestions` (`onSchedule` 30min) reprocesa el DLQ por la ruta compartida, idempotente+bounded (MAX_ATTEMPTS→`needsManualReview`), recupera el backlog. ADITIVO (email/tel siguen mandando — test no-regresión). Tests: normalize 24/24 + emulador reproc 5/5. ⚠️ **deploy functions GATEADO** (go/no-go dueño, TODO-30). Sigue F-6 cutover. | 44154 |
| §251 | **GOBERNANZA: FLUJO FUERTE unificado en W-11 ⟦OPUS⟧** — el flujo del dueño (comité+consejo+extensión+skills+agentes+**PLUGINS**+mockup) vivía partido→ se aplicaba a medias. Solución reconciliada ×cerebros: nodo **W-11 `60-WORKFLOWS.md`** (SSoT, 10 capas + REGLA DURA "completo o nada" + 3 artefactos: mockup·prompt-Gemini·prompt-Chrome, origen bersaglio) + capa **PLUGINS** y **orden 6-instrumentos en 2 fases** (evidencia→deliberación, aporte cars) en la skill compartida. Memorias `feedback_flujo_completo_nunca_parcial`/`_diseno_mockup`. PEND: replicar a inmob+insema (L-48). | 44166 |
| §252 | **GATE de calificación de leads ⟦OPUS⟧ — corta el flood de Telegram** (1er caso real del FLUJO FUERTE W-11). Causa (firebase MCP): chats de concierge ANÓNIMOS (sin tel) → leads "Anónimo"/"Concierge xxxx" asignados al CEO + SLA → flood; CERO leads reales contactables (datos). Fix (comité+Gemini-verificado): gate en `onSolicitudCreated` (sin `isValidContactPhone` → no crea lead, queda log en solicitudes/conciergeChats=cero fuga) + filtro en `runCrmSlaSweep` (neutraliza backlog SIN borrar). Amplía §250. Deploy OK; 28/28 tests. PEND: E2E anónima fresca + purga `crmPurgeLead`. | 44178 |
| §253 | **F-6 prep: módulo `perfil` portado al portal nuevo ⟦OPUS⟧** — cierra el último gap de CÓDIGO de paridad §3 del cutover. Re-eval: `sec-profile` (1118L) NO es menor = centro de seguridad. Decisión arq (§3.8/L-53, dueño "lo más seguro"): portar SOLO el subset que encaja en el auth modular (avatar/datos/cédula-lock + **cambio de contraseña con reauth**+política), accesible del menú de usuario (`#/perfil`). DIFERIR el stack SMS-MFA (2FA/trusted/recovery/Telegram) → **TODO-43** (TOTP, no SMS) — no encaja en el portal email+password-only (ya realidad live, no regresión de F-6). Verif: build+boot-mock 0-err, 4 tarjetas, lógica OK. Sigue FLIP (gated). | 44190 |
| §254 | **F-6 gate principal: Hub detalle validado LIVE E2E ⟦OPUS⟧** — yo conduje (extensión Chrome, sesión real, `validacion-live-chrome` modo-b, 2 pestañas bot+Hub): escalación→chat en Hub "Activos 1" en vivo→"✋ Tomar conversación" (claim-gating: input respuesta solo tras tomar)→respondí→llegó al visitante en tiempo real (✓✓ + "Daniel Romero tomó/se unió"). Ingestión cross-superficie bot→Hub→bot OK, consola 0-err. **Checklist §3 del cutover CERRADO** (perfil §253 + Hub §254). Queda SOLO el FLIP (`admin.html`→`_legacy/`+redirect) + celular post-flip. Smell: `confirm()` nativo en "Finalizar". | 44202 |
| §255 | **F-6 EL FLIP (cutover ejecutado) ⟦OPUS⟧** — `git mv admin.html → _legacy/admin.html` (clásico preservado) + nuevo `admin.html` raíz = **stub de redirect** → `/admin-app/dist/` (meta-refresh + `location.replace` sin loop + fallback). robots +`/_legacy/`. Retirado link obsoleto "calendario clásico" en `agenda.ui.js`. Anti-loop verificado (el portal nuevo NO apunta a admin.html; SW network-first no precachea). Verif: curl + navegador real (`/admin.html`→aterriza en `/admin-app/dist/`). Reversible (cuarentena). PEND: merge dueño + cache-bump cron + validación celular (FCM/PWA vieja). Huérfanos→dead-code: `manifest-admin.json`+`js/admin/*`. | 44214 |
| §256 | **Hub: 3 bugs de ciclo-de-vida (cazados live por el dueño) ⟦OPUS⟧** — diagnóstico EMPÍRICO (firebase MCP: doc `status:'active'` pese a finalizar). (A) `markChatClosedInFirestore` no-op tras RELOAD (`_chatDocCreated` var de módulo arranca false, sesión escalada restaurada no lo re-setea) → fix en `open()`: `mode!='bot'`⇒`_chatDocCreated=true` (arregla tb typing/read/sync). (B) `visibleChats` "Activos" mostraba cerrados (`!isArchived`) → excluir `status:'closed'`, mandarlos a Archivados. (C) mensaje doble = carrera dedup optimista (firestoreId se asigna en el `.then` post-snapshot) → `reconcilePending()` en el resolve. NO toqué rules (ya permiten al cliente cerrar). Verif: (B) live-mock ✅; (A)+(C) ruta-real → live post-merge. | 44226 |
| §243 | **F-2 (5/6) `auditoria` (visor) en admin-app ⟦OPUS⟧** — LECTOR read-only de `auditLog` (el portal escribía vía audit.js, no leía): lista cronológica (onSnapshot 200) + buscador + filtro acción/usuario; inmutable (no borra). dist gateado. | 44069 |
| §242 | **F-2 (4/6) `workflows`/Automatización en admin-app ⟦OPUS⟧** — port admin-automation: NO CRUD (verificar-no-asumir) sino 4 reglas FIJAS toggle + visor `automationLog`; motor sigue legacy client-side (→TODO-41) + gap RBAC `workflows.edit`. dist gateado. | 44057 |
| §241 | **F-2 (3/6) `departamentos` en admin-app ⟦OPUS⟧** — catálogo ④a `departments/{id}` (grid+modal, id slug `dept_<slug>`). Guard §66 (no borrar con userCount>0, UI+rules). Port admin-departments. dist gateado. | 44045 |
| §240 | **F-2 (2/6) `roles` en admin-app ⟦OPUS⟧** — CRUD `roles/{id}` + matriz 82 permisos (9 cats, toggle+indeterminate+críticos); port admin-roles + `domain/rbac-catalog.js` (SSoT ESM, aviso sincronía). CEO read-only; guard userCount al borrar. dist gateado. | 44033 |
| §239 | **Auditoría Cerebro N2 (post F-2) ⟦OPUS⟧** — SANO. 7 sondas (operador + 1 agente acotado retrieval-drill, NO colgó → revalida L-50). 0 CRIT/0 HIGH·2 MED·2 LOW·1+. Reincidente '05/10 vs git' NO recurrió (lazo aprende); boot +14% sobre cap REINCIDENTE §206/§207 (M-10: gate info-only sin freno)→GC+TODO-40; L-50 no-first-class→callejón (f); gap NUEVO source↔dist admin-app sin gate. Crudo+tabla→archiveDir. | 44021 |
| §238 | **F-2 (1/6) módulo `usuarios` en admin-app ⟦OPUS⟧** — 1er cierre del GAP Config. Port LIMPIO de admin-users (descarta cruft R3/R7/R8): lista+filtro-rol+alta/edición/baja+bloqueo, CEO con candado (rules §212), idioma Contactos, reusa `.rev-modal*`. Rol = escritura directa `{roleId}` + trigger `onUserRoleAssigned` reconcilia (functions:3787); crear/borrar = callables (Auth). NEW `modules/usuarios/*`+`styles/usuarios.css`; MOD router/shell/main. `vite build` 113 mód OK, preview `?mock=1` verif. **dist GATEADO a staging con F-0.5.** Sigue F-2(2/6) Roles. L-53. | 44009 |

---

## Anclas internas útiles (dentro de §8)

| Ancla | Línea |
|---|---|
| §8 RCA "🎯 CAUSA RAÍZ CONFIRMADA" | 9937 |
| §8 "El culpable" | 9941 |
| §8 "Solución estructural" | 9954 |
| §37 "IAP — cambio" ejemplo | 19660 |

---

## Doctrinas (referencia rápida — las always-on viven en CLAUDE.md §3)

| Doctrina | § | Línea |
|---|---|---|
| Performance (no transition:all, HTML/CSS estable, anti-MO) | §17 | 9181 |
| RCA Mode (verificar, no asumir) | §19 | 9793 |
| Protocolo IAP (5 secciones pre-commit) | §37 | 19449 |
| PERF KILL (purga anti-patterns) | §35 | 18619 |

---

## Planes maestros (todos cerrados — detalle en historial)

| Plan | § rango | Estado |
|---|---|---|
| RBAC dinámico | §61-§73.4 + §89 | ✅ 100% |
| ALTOR Hub (cirugía) | §59-§88 | ✅ 7/7 + C-S8/S9/S10 |
| Smart Update Prompts | §82-§84 | ✅ Producción |
| SEO Fase 4 técnica | §90 | ✅ Validado |
| Fase 3 Performance | §91-§97 | ✅ 3A+3B (3C/3D pendientes TODO-03/04) |
| Motor cromático tema | §115-§117 | ✅ 6 paletas |
| Rediseño index cinematic (SP-1) | §122 | ✅ Vanilla port (T1-T8) |

---

> Mantener este índice sincronizado: cuando se agregue un ADR §118+ al historial,
> añadir su fila aquí con la línea de inicio (`grep -n "^## " docs/99-HISTORIAL-ADR.md`).
