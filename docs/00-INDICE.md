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
| §155 | **Kickoff reconstrucción CRM** + skill `crm-architect` (commit `6cc0055`): build Firebase/Firestore/Functions, vertical automotive, RBAC+Ley 1581. CRM viejo = `admin.html` + `js/admin/admin-crm*.js` + `comm-schema.js`. Diseño → ADRs §157+ | 42900 |
| §156 | **Blindaje determinista del cerebro**: hooks (pre-commit + SessionStart brain-check) + Consejo Externo (15) + verifica-no-asumas UNIVERSAL (§3.3, M-11) + limpieza skills. Doctrina→garantía mecánica (M-10) | 42907 |
| §157 | **Fix rectángulo negro del hero**: `<footer class=cin-hero-foot>` heredaba `body footer{background}` (dark-theme.css:688). Fix `.cin-hero-foot{background:transparent}`. Lección **L-25** | 42917 |
| §158 | **CRM Fase 1: ingestión canónica DESPLEGADA**: `onSolicitudCreated` normaliza `solicitudes`→`contacts`/`leads`/`activities` en tx atómica (dedup, consent 1581, idempotencia, dead-letter). 21 tests. LIVE. L-26 | 42927 |
| §159 | **CRM Fase 2: Bandeja + app admin greenfield** (`admin-app/`, Vite+Firebase modular `altorra-crm`): colas triage + score/NBA determinista + acciones 1-clic + Customer 360. Auth lookup `usuarios/{uid}` (claims→Fase 5). Verif `?mock=1`. L-27 | 42937 |
| §160 | **CRM Fase 3a: Pipeline drag-drop** sobre `deals` (lead→oportunidad): `domain/pipeline.js` (8 etapas, forecast) + kanban a11y + ganado/perdido. Reglas+índice `deals` LIVE (`1e154c2`). L-29 | 42947 |
| §161 | **CRM Fase 3b: Agenda unificada**: `domain/agenda.js` (grilla mes, `dayKey` LOCAL) + lee `activities.dueAt` (índice automático). Acción '📅 Agendar' en 360. Verif `?mock=1`. L-30 | 42957 |
| §162 | **CRM: Captura MANUAL de leads multi-canal** (Meta/WhatsApp/TikTok/llamada): form '＋Nuevo lead' escribe `solicitudes` → reusa ingestión Fase 1, cero backend. Atribución canal/pauta/campaña (ROI). L-31 | 42966 |
| §163 | **CRM Canal AUTO #1: registro→contacto** (`onClienteCreated`): upsert `contacts` (dedup), NO crea lead (registrarse≠intención), fusiona invitado→registrado sin pisar first-seen. 28 tests. DESPLEGADO. Backfill pendiente | 42975 |
| §164 | **CRM Canal AUTO #2: newsletter→contacto** (`onSubscriptionCreated`) — TOCA SITIO PÚBLICO: form roto → `subscriptions` → upsert contact (subscriber). `home.js initNewsletter`. Cache bump. 33 tests | 42985 |
| §165 | **CRM Fase 4: Reportes/KPIs** (`#/reportes`): KPIs + embudo + canal (`channelOf`) + forecast + tendencia + CSV. `domain/reports.js` PURO + charts SVG/CSS sin librería. L-30/L-32. | 42994 |
| §166 | **CRM: Contactos (directorio)** (`#/contactos`): lista buscable/filtrable; con lead → ficha 360 existente (detailLeadId atómico L-27); suscriptor sin lead → fila no interactiva. L-33. | 43004 |
| §167 | **Cerebro Fase A**: Lente de Arquitecto §3.8 (6 pilares → `46`) · Legal=Colombia en Trigger 🔵 · workflow `adversarial-review.js` + L-34. Comité ×3 diseñado. Spec `2026-06-06-cerebro-skills-roadmap.md` | 43014 |
| §168 | Cerebro Fase B (reconciliación): las 3 skills YA EXISTEN (portables, build paralelo Bersaglio) + registro + eval llm-council/engineering | 43022 |
| §169 | Cerebro Fase C: auditoría seguridad (9 hallazgos) + holística CRM + legal vehículos → nacen 41-SEGURIDAD y 42-LEGAL (nada desplegado) | 43031 |
| §170 | Decisión Fuerte: cerebro MULTI-PROYECTO (núcleo compartido 4-capas + brain:diff, NO único; comité×3 + Gemini) → spec 2026-06-09 | 43039 |
| §171 | **ENMIENDA a §170**: revalidación comité×3 + Gemini (convergentes) PAUSA el sync P2P del KERNEL → economía LOCAL primero (destilar 10) + Opción C template/generator diferida a Cloudflare. "PASO 1 extraer KERNEL" SUPERSEDED. Veredicto → `…-comite-revalidacion-paso1-VEREDICTO.md` | 43048 |
| §172 | **Mandato 3 (validación FINAL) → CERTIFICADO**: comité 11 agentes verificó en disco; 2 bloqueantes (cura no aterrizada §171.7 + README stale) RESUELTOS+grep → CERTIFICADO. Meta: verificar la cura en la capa que el boot lee | 43060 |
| §173 | **Comité v6 — cerebro auto-evaluable** (16 agentes, 45 hallazgos): cura 'SANO-teatro' = evaluación 2 NIVELES (gates + skill `auditoria-cerebro`) + GC dos palancas con trinquete + TODO ledger único + captura-en-ORIGEN + brain-diff gateado. Checklist A-U → bóveda VEREDICTO | 43072 |
| §174 | **Bóveda privada brain-private** (ítem C, Gemini adoptado/refutado): RED/AMBER → repo hermano privado (NO submódulo — rompe Pages; NO purga de historial — riesgo residual documentado); stubs públicos + archiveDir ×3 → bóveda; cliente crea remote privado + push | 43109 |
| §175 | **TODO-17 E2E live CRM ✅** (web+newsletter → solicitudes/subscriptions → ingestión → canónico → Bandeja score/NBA + Contactos 3/3) + **incidente billing-disabled** (~2h, Eventarc re-entregó solo, L-38) + **FIX spinner form contacto** (`.form-card` eliminada por el rediseño → fallback al `<form>`, L-37) + shard `31-LECCIONES-GIT` | 43139 |
| §176 | **Comité CRM v2 → plan E0→E6** (quejas reales: cero sync lead↔deal, sin CRUD, calendarios desconectados, cupos no liberan). Estados lead v3, pipeline v3, calendario único, Ley 1581=anonimización, F42 comisiones. VEREDICTO→bóveda. Manual `docs/MANUAL-CRM-USO.md`. TODO-21 | 43151 |
| §177 | **E0 EJECUTADA**: spec única crm-spec + F34 export/restore + F1 lead inmutable (atacado live ✓) + Bandeja Activos/SLA chip + F17-urgente cupos transaccionales | 43163 |
| §178 | **E1a núcleo**: ⚡ lead rápido `lead_intake` offline (<30s, E2E live 2s) + ingestLead compartido + quick-log + Pendientes hoy + P2.b próximo paso. Gotcha: 1er evento perdido por propagación Eventarc | 43175 |
| §181 | **E1b Pipeline v2**: restore ENSAYADO (gate) + enums v3 + paridad 7×7 + Rules gates/matriz + onDealUpdated (E2E live 3s) + F7 conversión/anulación + undo 10s | 43211 |
| §182 | **E2 tanda 1**: F21.1 configs DIVERGÍAN (web vendía festivos) + F16 proyección cita→Agenda (E2E live 5s) + crmDailyJob 5am (backup→rebuild→purga→digest) | 43223 |
| §183 | **Decisiones del dueño (end-game panel)**: agenda clásica muere EN el cutover tras paridad F39 · E6.5 comité de DISEÑO del panel (FIRME) · E6.6 auditoría TOTAL admin clásico post-migración · relevo por saturación (retomar 'continúa E2 tanda 2', §182.7) | 43235 |
| §179 | **E1a CERRADA**: F37 SLA 2h hábiles + rotación de intake en tx (E2E live ✓) + F38 notify (crítica/info) + F33a fricción | 43187 |
| §180 | **Adelanto E3**: F13 Archivar + F15 crmPurgeLead (cascada server, super admin) + fix credencial GitHub | 43199 |
| §185 | **E3 EJECUTADA**: índice dedup F40e (E2E live ✓) + F12 editar/_version/fusión resumible + F14 supresión 1581 (gracia 72h, finalizador, tombstones en cascada). Review: 1 crítico + 9 majors corregidos. 139 tests | 43258 |
| §184 | **E2 COMPLETA**: F21 SSoT availability + módulo Disponibilidad (festivos 1-clic) + F18/F19 crmCitaAction (tupla 30min, token rota C.4) + citaConfirm HTTP (E2E live ✓) + F20 sweep horario + F28 v2. Carrera C.5 en verde | 43245 |
| §187 | **E5 EJECUTADA — blindaje**: SEC-01 read estricto (8 colecciones) · SEC-06 whitelist hasOnly+caps+shapes (⚠️ ~1000 exprs Rules) · SEC-08 bookedSlots · retry:true ×6 + DLQ. 189 tests. Residual: cupos por anónimo → App Check | 43284 |
| §186 | **E4 EJECUTADA**: `vehicleAggregate` (won→vendido/apartado, no pisa manuales, badge web) · `dealWon` (postventa+commissionSnapshot) · F26 colisión · F42 Comisiones (CSV anti-inyección). Rules anti-forja. Fix pipeline yml roto 16 días. 169 tests | 43271 |
| §188 | **E6.6 EJECUTADA — auditoría admin clásico** (16 agentes, 112 hallazgos): KPIs envenenados (portal no actualiza `solicitudes.estado`) · mapa 21 secciones · 14 riesgos cutover (stub redirect, NO borrar admin.html) · plan strangler 29 pasos → bóveda | 43297 |
| §189 | **E6 paso 0**: cacheSignal ×4 (system/meta 13 días stale) · onUsuarioBloqueadoSync + loginAttempts CERRADO · fix: E5 rompió cita interna (createdBy no censado, L-41) + kind:'cita'. 192 tests. Deploy ✅ | 43310 |
| §190 | **E6 fase ② p1 — Reseñas en el portal** (1er módulo público migrado, patrón validado): shape VERBATIM del lector público + RBAC reviews.* + mock + **core/audit.js NUEVO** (no perder auditoría; semilla fase ④) + `#/resenas`. Preview mock ✓. F39 live doble: reseña real valida módulo + cacheSignal | 43322 |
| §191 | **E6 fase ② p2 — Banners (código fase ② COMPLETO)**: solo posiciones VIVAS (promocional limit-3 + home_promo; hero/categoria write-only NO se portan) · **core/image.js** WebP + storage export · `_version` preservado · Ocultar≠Borrar. Preview mock ✓. Gate de fase tras F39: ocultar ambas secciones del clásico. Siguiente: fase ③ | 43334 |
| §192 | **E6 fase ③ p1 — Marcas en el portal**: docId=slug (en vivo, acentos ok) · `_version`/validVersion preservado · resolvers de logos legacy + LOCAL_LOGOS · upload `cars/brand_logo_*` (WebP 512/SVG) · conteo de vehículos por marca · **guard de borrado con inventario** (mejora vs clásico). Preview mock ✓. Siguiente: lists (S) → vehicles (L, SESIÓN FRESCA) | 43346 |
| §193 | **Decisiones del dueño (siembra post-panel)**: bot ALTOR sin fallback IA (solo Claude, R-1) · fábrica de skills frontend/backend portables + rescate de webs monolíticas (TODO-22) · web pública CMS-izada post-panel (TODO-23) · RBAC departamental fase ④ (cf. Bersaglio) | 43358 |
| §194 | **E6 fase ③ p2 — Atributos del inventario** (`config/listas` → `#/atributos`): shape VERBATIM {value,label} · merge SOLO la clave editada · getDoc once + dirty/tarjeta (NO onSnapshot en editor inline) · conteo de uso + modal al quitar opciones EN USO · gate UI settings.* · lector dynamic-lists.js INTACTO | 43370 |
| §195 | **E6 — backup inventario (D4-09b) ADELANTADO**: CRM_COLLECTIONS += vehiculos/marcas + listas (daily 5am automático) · módulo `#/respaldos` (export + restore dry-run-first, path diario predecible por fecha) · server=guardián. Deploy ✓. Doctrina de adelanto de ítems (195.7) | 43382 |
| §196 | **Gap 5 Agenda (F23-7) — '＋Nueva cita' en vista Agenda**: chooser con buscador de leads + camino walk-in SIN lead (server exige nombre/fecha/hora/asesor). Reusa openCitaCreate, gated crm.edit. Verif mock | 43394 |
| §197 | **Gap 7 Agenda — acción `update`**: observaciones + REASIGNAR asesor sin cambio de estado (`moveAdvisorBlocks`: libera saliente + reserva entrante MISMA tx; vehículo/confirmedAt/token intactos) · UI "✏️ Editar / reasignar". Emulador 193 ✓ · deploy ✓ | 43406 |
| §198 | **F39 v2 (decisión dueño)**: verificación EN VIVO la ejecuta Claude por LOTES en hitos (no el dueño, no por merge); tests/emulador/preview por cambio NO se relajan; comité/Gemini en entregas grandes; gates ②/③ tras lote post-vehículos. + M-14 | 43418 |
| §199 | **ÉPICA VEHÍCULOS — mapa + V1**: 7 lectores (~950k tok; crudo + 11 decisiones de port en bóveda `2026-06-12-epica-vehiculos-plan.md`) · domain/vehicle.js (Smart Fields VERBATIM) · `#/vehiculos` lista (orden prioridad DESC/id ASC, destacar espejo, delete con log previo) · markAsSold NO se porta (venta=pipeline R-12) | 43427 |
| §200 | **Épica vehículos V2 — wizard 6 pasos**: buildVehicleDoc PURO (~45 campos, derivados verbatim) · create tx (counter ALT- + anti-colisión id) · **update tx compare expectedVersion → version-conflict → SHAPE COMPLETO** (gate anti-vehicleAggregate) · apartado disabled-persistible · vendido Fase 22 · smart preview live (score exacto) | 43438 |
| §201 | **Épica vehículos V3 — subida nativa de fotos**: tanda alfanumérica pre-subida + slots estables · WebP 1200@0.75 · path `cars/{ts}_{baseName}.webp` · límite real 2MB (el '10MB' era stale). Mock ✓; subida real = lote V6 | 43447 |
| §202 | **Épica vehículos V4 — borradores**: `usuarios/{uid}/drafts` shape = KEYS DEL FORM CLÁSICO (interop) · explícito OPTIMISTA + rollback · DOBLE baseline al cerrar · retomar RE-DERIVA tipo · publicar borra draft · retry 1200ms. **§202.5: comité de rediseño de borradores post-cutover (TODO-24)** | 43454 |
| §203 | **Épica vehículos V5 — extras**: reorder GLOBAL §103 batch solo-cambios · CSV verbatim 20 cols · historial + ↩ revert solo-super · duplicar sin setTimeout. **V1-V5 COMPLETAS — resta V6 lote en vivo (requiere merge desplegado)** | 43462 |
| §204 | **Épica dealers FASE 1 ⟦OPUS-4.8⟧** — port verbatim de aliados al portal (slug del clásico NO brands-NFD; sin _version/delete) + `concesionarios` al backup. FASE 2 = restructura (TODO-25). Verificado mock; build ✓ | 43471 |
| §205 | **Gate legal JSON-LD ⟦OPUS-4.8⟧** — placa+seller=AutoDealer solo si `esPropio`; carros de terceros los omiten (Habeas Data + garantía solidaria Ley 1480). Fix interim en `generate-vehicles.mjs` | 43484 |
| §206 | **Auditoría Nivel-2 del cerebro ⟦OPUS-4.8⟧** (ítem U comité v6; 29 agentes) — diagnóstico: costo de boot (34743c>31500) + monolitos (30 al 98%, 00 sobre cap), §G load-bearing (143 refs). Plan A0-A10: shard 30→33, crear 11-GOBERNANZA (gated cross-repo §G template ×3 + Gemini). A0 fix regex SSoT ✅ | 43496 |

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
