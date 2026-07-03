# 🗂️ 00a — Índice sináptico · ARCHIVO (Mapa §→línea, §1–§159)

> **Shard de `00-INDICE.md`** (range-shard §228 / TODO-29). Contiene SOLO la mitad vieja del
> "Mapa §→línea". El kernel descubre `00[a-z]?-INDICE*.md` y lo une con `00` (`readIndex()`),
> así que los checks (#3 desync, #5a refs-ADR, #9 consolidado) lo ven como parte del índice.
> NO es neurona (no `NN-` registrada en CLAUDE.md); alcanzable vía el puntero de `00-INDICE.md`.

## Mapa § → línea (archivo §1–§159)

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
