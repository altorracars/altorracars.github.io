# 00 — ÍNDICE SINÁPTICO (mapa § → línea del Historial ADR)

> **Nodo neuronal: Índice sináptico.** Mapa § → línea de
> `docs/99-HISTORIAL-ADR.md` (~43k líneas). Es la tabla de contenidos del
> nodo de Largo Plazo. Se consulta on-demand (Trigger de Error/Historia, ver
> `CLAUDE.md §G`).
>
> **Cerebro completo**: 🧠 `CLAUDE.md` (router/identidad) · 🩺 `05-ESTADO-GLOBAL.md` (signos vitales)
> · ⚡ `10-MEMORIA-CORTO-PLAZO.md` (WIP) · 🗺️ `20-MEMORIA-ESPACIAL.md` (arquitectura)
> · 🧪 `30-LECCIONES.md` (experiencia/recetas; hija 🔧 `31-LECCIONES-GIT.md`) · 🗂️ este (índice) · 📚 `99-HISTORIAL-ADR.md` (largo plazo).
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
| ¿Dónde vive un módulo / ruta / flujo / componente? | 🗺️ `20-ESPACIAL` |
| Voy a mover/renombrar archivos, refactor de estructura | 🔧 `31-LECCIONES-GIT` L-04 + 🧪 `30-LECCIONES` L-05/L-06 + 🗺️ `20-ESPACIAL` |
| Conflicto al fusionar / cache / cron `[skip ci]` / toda op git | 🔧 `31-LECCIONES-GIT` (hija de 30: L-01..L-04) + `CLAUDE.md §4` |
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
| §111 | Drafts borran al refresh (causa equivocada) | 40819 |
| §112 | FIX DEFINITIVO drafts refresh (teardown race) | 40950 |
| §113 | Contador tiempo real Marcas | 41104 |
| §114 | Depuración roles legacy → roleName + CARGO | 41194 |
| §115 | Tema cromático admin (toast-spam + 6 paletas) | 41365 |
| §116 | Plan A superficies teñidas (color-mix) | 41478 |
| §117 | Plan B texto legible + Plan C tints + dedup | 41595 |
| §118 | Arquitectura Documental Neuronal (cerebro de memoria) | 41734 |
| §119 | Reestructuración frontend (js/ plano → modular) | 41818 |
| §120 | Cerebro Documental Neuronal AUTÓNOMO | 41842 |
| §121 | Autocrítica + linter brain-check + robustez (cross-review) | 41865 |
| §122 | SP-1 Index cinematic vanilla (T4-T8 — port HarmonyOS/Claude Design) | 41886 |
| §123 | Reflejo de Cierre (M-03) — el cerebro no se auto-alimentaba sin recordatorio | 41965 |
| §124 | SP-5.0 rastro saga c→f — SW stale-while-revalidate + initTrail races (L-14/L-15, M-04) | 41985 |
| §125 | Omni-Brain Fase 1 — Trigger 🔵 Auditoría + Lóbulos de Dominio + skills sinergia (M-05) | 42030 |
| §126 | SP-5.1 Chrome global cinematic (snippets + components.js + home-chrome.js + cache bump) | 42076 |
| §127 | SP-5.1.b Bridge legacy↔cinematic (data-theme + especificidad CSS, chrome invisible fix · L-16) | 42129 |
| §128 | SP-5.2.a Body migration piloto (Legales + 404 → soft-redesign.css, contenido legal preservado) | 42176 |
| §129 | SP-5.2.b Body migration editorial (nosotros + contacto, form preservado) + fix cin-eyebrow global | 42215 |
| §130 | SP-5.2.c.1 Reseñas (sub-piloto app-like — reescribir render del JS a cinematic) | 42252 |
| §131 | SP-5.2.c.2 Perfil → cinematic por armonización de tokens (`--pf-*`→`--cin-*`, hero soft, 0 cambios JS) | 42285 |
| §132 | SP-5.2.c.2 Favoritos → cinematic por armonización CSS de `.vehicle-card` (scoped data-cin, 0 cambios JS) | 42324 |
| §133 | Chrome unify: botones `.btn-*` del header en legacy (port a chrome-redesign.css scoped) + badge favoritos reposicionado + oculto en 0 · L-18 | 42360 |
| §134 | SP-5.2.c.3 Comparador flotante cinematic + abajo-izquierda + máx 2 (CSS en chrome-redesign.css → aparece en index) | 42395 |
| §135 | SP-5.2.c.3 Comparador página `comparar.html` cinematic (slots A/B + picker inline + diff dorado + veredicto, port Compare.jsx) | 42422 |
| §136 | SP-5.2.c.4 Simulador crédito cinematic por armonización de tokens `--sim-*`→cinematic (cero cambios al cálculo) · cierra SP-5.2.c | 42443 |
| §137 | QA/pulido cinematic: flotante comparador reposicionado (no choca con QuickTools) + gráfico simulador armonizado | 42469 |
| §138 | SP-4 Motor de recomendaciones por similitud al rastro (content-based, `js/core/recommendations.js`) · L-19 · M-06 | 42483 |
| §139 | Footer cinematic: matar gris fantasma `#808080` (bridge `color:var(--ink-text-muted)`) + auditoría cobertura cinematic (qué falta) · L-20 | 42510 |
| §140 | SP-5.3: `detalle-vehiculo` cinematic + de-monolitización (4 módulos `js/public/detalle/` + `css/home/detalle-cinematic.css`, botones Opción A, favorito/comparar/sticky cableados, 27 páginas regeneradas) · L-08/L-20 | 42539 |
| §141 | SP-5.3 pulido detalle post-validación: fix glow dorado hover ficha + fondo blanco características + descripción editorial + glass (info-card/descripción) · L-21 | 42567 |
| §142 | Eliminar Descripción del vehículo (tab detalle + campo/generador admin + búsqueda + noscript; 27 regeneradas; `descripcion` dormido en Firestore) | 42592 |
| §143 | `busqueda.html` (catálogo) cinematic (SP-5.3.b): hero serif + filtros glass + tarjetas `.vehicle-card` cinematic + paginación; JS intacto, sin regen · L-21 | 42612 |
| §144 | `marca.html` (template) cinematic (SP-5.3.c): hero/brand-header serif + sidebar filtros glass + tarjetas cinematic; 18 `marcas/*` regeneradas; JS intacto · L-21 | 42629 |
| §145 | Fix nav header "Marcas"→`marcas.html` (snippet + index; antes al carrusel) + `marcas.html` (índice) cinematic (tokens/serif/Manrope, 18 tarjetas de marca) · L-21 | 42647 |
| §146 | 4 landings SEO por categoría (`vehiculos-{suv,pickup,sedan,hatchback}.html`) cinematic (SP-5.3.e): clon estructural de marca.html → REUSO `marca-cinematic.css` (DRY), data-cin + soft-redesign; 3 redirects (usados/nuevos/camionetas) INTACTOS; estáticas, sin regen. **Catálogo 100% cinematic** | 42665 |
| §147 | A11y quick wins WCAG (cierre parcial lóbulo §48): A11Y-05 :focus-visible global + A11Y-06 prefers-reduced-motion (soft-redesign) + A11Y-02 h1 sr-only en 4 landings + A11Y-01 aria-label en 50 controles de filtro (marca/4 landings/busqueda). Aditivo, ids/names/JS intactos; 18 marcas/* vía cron. Aplazados A11Y-03/04 | 42694 |
| §148 | Validación post-launch (node -c JS prod limpio + checker refs: 1 enlace roto real arreglado simulador→busqueda) + A11Y-03 contraste `--cin-ink-faint` 0.32→0.50 (WCAG AA) + deuda técnica TODO-09..13 verificada/preservada (§17.4, sin acción segura). Queda solo A11Y-04 | 42724 |
| §149 | A11Y-04 skip-link "Saltar al contenido" (WCAG 2.4.1, **cierra lóbulo §48 = 6/6**): `.skip-link` (style+base-redesign) + enlace en snippet header/index + `ensureMainLandmark()` en components.js inserta `#main` tras el header en TODAS las páginas (DRY, sin tocar 20 páginas, sin clobberear ids). Aditivo, verificado §19 (0 deps de hermano-del-header) | 42752 |
| §150 | **Consistencia de diseño global**: de-blue→near-black cálido `#0D0B09` + QuickTools dock + dropdown "Vehículos" hover. **.d FIX dropdown colapsado** (`*{max-width:100%}` vs `.nav-dd` → `max-width:none`) · **.e** dedup "Camionetas" · **.f** columna "Por condición" eliminada (`?tipo=` ignorado por busqueda.html). PR#786. Cache `v20260602140000` | 42781 |
| §151 | **Evaluación crítica "Cerebro V5"** (Antigravity): ADOPTADO lean — saturación por SÍNTOMA en §G.2 🔴 + "🚫 Callejones" en handoff de `10`. RECHAZADO: contador de turnos, HANDOFF.md, docs/skills/, inyecciones a CLAUDE.md. → M-08 | 42832 |
| §152 | **Reflejo de Auto-auditoría PRE-CIERRE de sesión**: barrido holístico proactivo (brain:check + frescura vs git) antes de cerrar la sesión, extendido en §G.4. Por evento de cierre, NO contador de turnos. → M-09 | 42853 |
| §153 | **Lo verificable va al LINTER, no a un reflejo** (RCA de por qué la Autocrítica es reactiva): brain-check extendido con (4) Frescura cache SW==manager==05 + origin/main. → M-10 | 42865 |
| §154 | **Chequeo AVANZADO del cerebro**: brain:check extendido (offsets, ADRs sin índice, refs L-/M- colgantes, hojas inexistentes). Auditoría integral 0 huecos estructurales; 1 semántico corregido (rutas planas → modulares). → M-10 | 42884 |
| §155 | **Kickoff: reconstrucción del CRM** + skill `crm-architect` registrada (commit `6cc0055`). El cliente abre sesión nueva en contexto limpio para reconstruir el CRM de Altorra. Skill = build CRM sobre Firebase+Firestore+Functions, vertical automotive-dealership, RBAC+Ley 1581, templates+scaffold (registrada en `40`, NO lóbulo). CRM actual = `admin.html` + `js/admin/admin-crm.js`/`admin-crm-tabs.js` + `comm-schema.js` + colecciones solicitudes/clientes/mensajes. Handoff/plan de arranque en `10`. Decisiones de diseño → ADRs §157+ por sprint (sesión nueva). | 42900 |
| §156 | **Blindaje determinista del cerebro**: hooks (`pre-commit` bloquea commit con cerebro roto + `SessionStart` corre brain:check cada sesión) + **Consejo Externo** (neurona 15: crítica adversarial Antigravity/Gemini) + regla **verifica-no-asumas** UNIVERSAL (§3.3 + M-11) + inventario/limpieza skills (4/7 anomalías). Doctrina → garantía mecánica (M-10). brain-only, SIN cache bump. | 42907 |
| §157 | **Fix rectángulo negro del hero**: el `<footer class="cin-hero-foot">` heredaba la regla GLOBAL `body footer{background:linear-gradient}` (dark-theme.css:688) → fondo oscuro de borde a borde de la fila. Fix: `.cin-hero-foot{background:transparent}` (clase 0,1,0 vence a `body footer` 0,0,2). Intento previo (quitar backdrop-filter) revertido. Lección **L-25**. Cache `v20260605120000`. | 42917 |
| §158 | **CRM Fase 1: ingestión canónica DESPLEGADA**: trigger `onSolicitudCreated` normaliza cada `solicitudes`→`contacts`/`leads`/`activities` en transacción atómica (dedup email→tel E.164, consent Ley 1581, `_version`, idempotencia `_ingestedAt`, dead-letter `failedIngestions`, `maxInstances:10`). Anti-corruption layer (público intacto, P5). 21 tests verdes. LIVE en `altorra-cars`. Lección **L-26**. | 42927 |
| §159 | **CRM Fase 2: Bandeja Inteligente + app admin greenfield** (`admin-app/`, Vite + Firebase modular `altorra-crm`). Lee el canónico → colas triage-first + tarjetas + score/NBA/clasificación DETERMINISTA (sin ALTOR) + acciones 1-clic (WhatsApp/asignar/estado/360) + Customer 360 (4 tabs). Capas datos/dominio/ui, tokens HarmonyOS verbatim, realtime acotado. Auth por lookup `usuarios/{uid}` (claims→Fase 5, §159.3). Verificación `?mock=1` cazó 2 bugs (grid colapsado + sync leads↔store). Pendiente: deploy `dist/` + E2E live. | 42937 |
| §160 | **CRM Fase 3a: Pipeline (embudo real drag-drop)** sobre colección **`deals`** (lead→oportunidad, patrón Salesforce). `domain/pipeline.js` (8 etapas, forecast=Σ monto×prob) + `modules/deals/{data,ui}` (kanban drag-drop + menú "mover" a11y + monto inline + ganado/perdido + barra forecast) + routing multi-sección. Acción "Convertir a oportunidad" en Bandeja/360. Reglas+índice `deals`. Verificado `?mock=1` (forecast matemático OK, 0 bugs). L-29. **DESPLEGADA** (`1e154c2`, reglas+índice `deals` LIVE). | 42947 |
| §161 | **CRM Fase 3b: Agenda unificada** (3ª superficie del portal). `domain/agenda.js` (grilla mes Lun-Dom, `dayKey` LOCAL) + `modules/agenda/{data,ui}` (vista mes, navegación, chips, "+N más"). Lee `activities` con `dueAt` (rango campo único → **índice automático, sin deploy de índices/reglas**). Acción "📅 Agendar" en el 360 (datetime → cita). Verificado `?mock=1` (hoy resaltado, agendar→aparece, 0 bugs). L-30. | 42957 |
| §162 | **CRM: Captura MANUAL de leads multi-canal** (leads externos Meta/WhatsApp/TikTok/llamada/referido — el cliente señaló el gap). Form "＋ Nuevo lead" en la Bandeja **escribe `solicitudes`** → reusa la ingestión Fase 1 (dedup+consentimiento+actividad), CERO backend nuevo. `channelOf` extendido (facebook/instagram/tiktok/marketplace/…) + orgánico/pauta/campaña (ROI). Verificado `?mock=1` (lead FB/pauta → Bandeja, validación, 0 bugs). L-31. | 42966 |
| §163 | **CRM Canal AUTO #1: registro de cuenta → contacto** (`onClienteCreated`). Trigger en `clientes/{uid}` → upsert `contacts` (dedup email/tel, MISMA sanitización que solicitudes). NO crea lead (registrarse ≠ intención); **fusiona** invitado→registrado (vincula `clienteUid` sin pisar first-seen). Consent conservador (Habeas Data). 28 tests Vitest verdes. **DESPLEGADO**. Backfill pendiente. | 42975 |
| §164 | **CRM Canal AUTO #2: newsletter → contacto subscriber** (`onSubscriptionCreated`) — **TOCA SITIO PÚBLICO**. Form roto (`onsubmit=return false`) → escribe `subscriptions` → trigger upsert `contacts` (lifecycle=subscriber, NO lead; merge captura opt-in email + tag). `home.js initNewsletter` (UI optimista) + nota Habeas Data + link privacidad. Reglas `subscriptions`. **Cache bump v20260606120000** §4. 33 tests verdes + revisión adversarial. | 42985 |
| §165 | **CRM Fase 4: Reportes/KPIs** (`#/reportes`): KPIs + embudo + canal (`channelOf`) + forecast + tendencia + CSV. `domain/reports.js` PURO + charts SVG/CSS sin librería. L-30/L-32. | 42994 |
| §166 | **CRM: Contactos (directorio)** (`#/contactos`): lista buscable/filtrable; con lead → ficha 360 existente (detailLeadId atómico L-27); suscriptor sin lead → fila no interactiva. L-33. | 43004 |
| §167 | **Cerebro Fase A**: Lente de Arquitecto §3.8 (6 pilares → `46`) · Legal=Colombia en Trigger 🔵 · workflow `adversarial-review.js` + L-34. Comité ×3 diseñado. Spec `2026-06-06-cerebro-skills-roadmap.md` | 43014 |
| §168 | Cerebro Fase B (reconciliación): las 3 skills YA EXISTEN (portables, build paralelo Bersaglio) + registro + eval llm-council/engineering | 43022 |
| §169 | Cerebro Fase C: auditoría seguridad (9 hallazgos) + holística CRM + legal vehículos → nacen 41-SEGURIDAD y 42-LEGAL (nada desplegado) | 43031 |
| §170 | Decisión Fuerte: cerebro MULTI-PROYECTO (núcleo compartido 4-capas + brain:diff, NO único; comité×3 + Gemini) → spec 2026-06-09 | 43039 |
| §171 | **ENMIENDA a §170**: revalidación comité×3 + Gemini (convergentes) PAUSA el sync P2P del KERNEL → economía LOCAL primero (destilar 10) + Opción C template/generator diferida a Cloudflare. "PASO 1 extraer KERNEL" SUPERSEDED. Veredicto → `…-comite-revalidacion-paso1-VEREDICTO.md` | 43048 |
| §172 | **Mandato 3 (validación FINAL) → CERTIFICADO**: comité 11 agentes verificó en disco; NO_CERTIFICA → 2 bloqueantes (cura NO aterrizada en §G.4 = sobre-declaración recursiva de §171.7 + README stale) → RESUELTOS+verificados (grep) → CERTIFICADO (cars; Opción C diferida; propagar reflejo a bersaglio/inmob = follow-up). Meta-lección: verificar la cura en la capa que el boot lee, con evidencia. | 43060 |
| §173 | **Comité v6 — cerebro auto-evaluable** (16 agentes, 45 hallazgos): cura del "SANO-teatro" = evaluación 2 NIVELES (gates hardcodeados + skill `auditoria-cerebro`/retrieval-drill/deepAudit) + GC dos palancas con trinquete + TODO-NN ledger único + captura-en-ORIGEN + brain-diff gateado por template 1.1.0. Checklist A-U → `specs/2026-06-09-comite-v6-…VEREDICTO.md`. Ítem C (exposición pública) = decisión cliente+Gemini. | 43072 |
| §174 | **Bóveda privada brain-private** (ítem C, Gemini adoptado/refutado): RED/AMBER → repo hermano privado (NO submódulo — rompe Pages; NO purga de historial — riesgo residual documentado); stubs públicos + archiveDir ×3 → bóveda; cliente crea remote privado + push | 43109 |
| §175 | **TODO-17 E2E live CRM ✅** (web+newsletter → solicitudes/subscriptions → ingestión → canónico → Bandeja score/NBA + Contactos 3/3) + **incidente billing-disabled** (~2h, Eventarc re-entregó solo, L-38) + **FIX spinner form contacto** (`.form-card` eliminada por el rediseño → fallback al `<form>`, L-37) + shard `31-LECCIONES-GIT` | 43139 |
| §176 | **Comité CRM v2 → plan E0→E6** (quejas reales: CERO sync lead↔deal verificado + sin CRUD + calendarios desconectados + cupos que nunca se liberan). Estados lead v3, pipeline v3 con gates, calendario único (solicitud=SSoT, WhatsApp-first), Ley 1581=anonimización, lead_intake offline, F39 HECHO-cronometrado, F42 comisiones. VEREDICTO+crudo → bóveda. Manual novatos `docs/MANUAL-CRM-USO.md`. Tracking TODO-21 | 43151 |
| §177 | **E0 EJECUTADA**: spec única crm-spec + F34 export/restore + F1 lead inmutable (atacado live ✓) + Bandeja Activos/SLA chip + F17-urgente cupos transaccionales | 43163 |
| §178 | **E1a núcleo**: ⚡ lead rápido `lead_intake` offline (<30s, E2E live 2s) + ingestLead compartido + quick-log + Pendientes hoy + P2.b próximo paso. Gotcha: 1er evento perdido por propagación Eventarc | 43175 |
| §181 | **E1b Pipeline v2**: restore ENSAYADO (gate) + enums v3 + paridad 7×7 + Rules gates/matriz + onDealUpdated (E2E live 3s) + F7 conversión/anulación + undo 10s | 43211 |
| §182 | **E2 tanda 1**: F21.1 configs DIVERGÍAN (web vendía festivos) + F16 proyección cita→Agenda (E2E live 5s) + crmDailyJob 5am (backup→rebuild→purga→digest) | 43223 |
| §183 | **Decisiones del dueño (end-game del panel)**: agenda del clásico = decisión de Claude (holística; muere EN el cutover tras paridad F39, no antes ni después) · **E6.5 comité de DISEÑO del panel** al completar el CRM (FIRME) · **E6.6 auditoría TOTAL del admin clásico** post-migración (dashboards rotos, info irrelevante) · relevo por saturación a ~884k (cómo retomar: "continúa E2 tanda 2", plan en §182.7) | 43235 |
| §179 | **E1a CERRADA**: F37 SLA 2h hábiles + rotación de intake en tx (E2E live ✓) + F38 notify (crítica/info) + F33a fricción | 43187 |
| §180 | **Adelanto E3**: F13 Archivar + F15 crmPurgeLead (cascada server, super admin) + fix credencial GitHub | 43199 |
| §185 | **E3 EJECUTADA**: índice dedup F40e (E2E live ✓) + F12 editar/_version/fusión resumible + F14 supresión 1581 (gracia 72h, finalizador, tombstones en cascada). Review: 1 crítico + 9 majors corregidos. 139 tests | 43258 |
| §184 | **E2 COMPLETA**: F21 SSoT availability + módulo Disponibilidad (festivos 1-clic) + F18/F19 crmCitaAction (tupla 30min, token rota C.4) + citaConfirm HTTP (E2E live ✓) + F20 sweep horario + F28 v2. Carrera C.5 en verde | 43245 |
| §187 | **E5 EJECUTADA — blindaje**: SEC-01 read estricto (8 colecciones a solo `crm.read`) · SEC-06 whitelist hasOnly(34, censo LITERAL) + caps + shapes (⚠️ presupuesto ~1000 expresiones de Rules) + consentGiven==true + escapeHtml ×4 + Telegram fallback + maxlength espejo + fix soft-lead · SEC-08 bookedSlots acotado (self-heal auth + liberación de slot) · citas legacy create:false · retry:true ×6 triggers con guard tx.get(origen) + DLQ determinista. Review: 21 corregidos. 189 tests. Residual: 1-fecha de cupos por anónimo (→ App Check enforce) | 43284 |
| §186 | **E4 EJECUTADA**: F25-completo `vehicleAggregate` (agregado transaccional won→vendido TERMINAL/apartado/disponible, jamás pisa manuales, badge 'Apartado' en la WEB) · F10 `dealWon` (wonAt + checklist postventa + commissionSnapshot server-only + retoma + panel Post-venta) · F26 colisión (warning + alerta daily) · F42 Comisiones del mes (query dedicada de wons, dealLiquidable, CSV anti-inyección). Rules E4 anti-forja. FIX pipeline de páginas roto 16 días (yml) + retry:true en onDealUpdated. Review: 23 corregidos. 169 tests. Cache `v20260611031500` | 43271 |
| §188 | **E6.6 EJECUTADA — auditoría del admin clásico** (workflow 16 agentes, 112 hallazgos, 2 refutados — presence tiene lector server-side index.js:1661): KPIs envenenados = el portal nunca actualiza `solicitudes.estado` (D4-00) · mapa 21 secciones · double-booking por cita interna sin `kind` · 14 riesgos cutover (stub redirect, NO borrar admin.html) · **plan strangler 29 pasos** → bóveda `2026-06-12-e66-auditoria-admin-clasico.md` | 43297 |
| §189 | **E6 paso 0 EJECUTADO**: cacheSignal ×4 (system/meta llevaba 13 días stale) · onUsuarioBloqueadoSync (bloqueado→Auth disable) + loginAttempts CERRADO + portal expulsa bloqueados · **fix: E5 había ROTO la cita interna** (createdBy no censado → L-41) + kind:'cita' + convert legacy retirado · desc-gen/color-extract fuera. 192 tests. Cache `v20260612052500`. Deploy ✅. F39 live: edición inventario / walk-in / 1er bloqueo | 43310 |
| §190 | **E6 fase ② p1 — Reseñas en el portal** (1er módulo público migrado, patrón validado): shape VERBATIM del lector público + RBAC reviews.* + mock + **core/audit.js NUEVO** (no perder auditoría; semilla fase ④) + `#/resenas`. Preview mock ✓. F39 live doble: reseña real valida módulo + cacheSignal | 43322 |
| §191 | **E6 fase ② p2 — Banners (código fase ② COMPLETO)**: solo posiciones VIVAS (promocional limit-3 + home_promo; hero/categoria write-only NO se portan) · **core/image.js** WebP + storage export · `_version` preservado · Ocultar≠Borrar. Preview mock ✓. Gate de fase tras F39: ocultar ambas secciones del clásico. Siguiente: fase ③ | 43334 |
| §192 | **E6 fase ③ p1 — Marcas en el portal**: docId=slug (en vivo, acentos ok) · `_version`/validVersion preservado · resolvers de logos legacy + LOCAL_LOGOS · upload `cars/brand_logo_*` (WebP 512/SVG) · conteo de vehículos por marca · **guard de borrado con inventario** (mejora vs clásico). Preview mock ✓. Siguiente: lists (S) → vehicles (L, SESIÓN FRESCA) | 43346 |
| §193 | **Decisiones del dueño (siembra post-panel)**: bot ALTOR = SIN fallback de IA gratuita (LLM caído → directo a asesor), motor SOLO Claude, sistema completo con comité al migrarlo (dirección R-1 resuelta) · **fábrica de skills frontend/backend/framework** con comité+Antigravity, portables — arranque + RESCATE de webs monolíticas (ampliado 12/06) (TODO-22) · **web pública CMS-izada** post-panel: mismo diseño, estructura escalable, TODO editable por panel sin saber código (TODO-23) · **RBAC departamental** (departamentos + roles por cargo + rangos + dueño INAMOVIBLE — requisito de fase ④; consultar cerebro Bersaglio) | 43358 |
| §194 | **E6 fase ③ p2 — Atributos del inventario** (`config/listas` → `#/atributos`): shape VERBATIM {value,label} · setDoc merge SOLO la clave editada (clásico pisaba el doc completo) · getDoc once + dirty/tarjeta (NO onSnapshot en editor inline) · **conteo de uso por opción + modal al quitar opciones EN USO** (mejora vs clásico) · gate UI = settings.* any-of (espejo de rules, cero cambios) · lector dynamic-lists.js INTACTO. Preview mock ✓. Gate fase ② AÚN sin F39 del dueño. Siguiente: vehicles (L, SESIÓN FRESCA) | 43370 |
| §195 | **E6 fase ③ — backup inventario (D4-09b) ADELANTADO** (gates bloqueados por F39, vehicles=sesión fresca, dealers=decisión D5-03): `CRM_COLLECTIONS` += vehiculos/marcas + `CONFIG_DOCS` += listas (el daily 5am los respalda AUTOMÁTICO) · **módulo `#/respaldos`** (export manual + restore dry-run-first con plan/checkboxes/modal rojo; path diario PREDECIBLE por fecha, sin listar Storage) · server = guardián (super_admin en callables). Tests 127 ✓ · preview mock ✓ · **deploy functions ✓**. Doctrina de adelanto de ítems (195.7) | 43382 |
| §196 | **Gap 5 Agenda (F23-7) — "＋ Nueva cita" en la vista Agenda**: chooser con buscador de leads (getDocs limit 300, filtro client-side) + camino **walk-in SIN lead** (server solo exige nombre/fecha/hora/asesor; como la cita interna del clásico) · reusa openCitaCreate · gated crm.edit · NO encadena quick-lead→cita (proyección asíncrona). Gap 6 NO (política del dueño). Preview mock ✓ | 43394 |

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
