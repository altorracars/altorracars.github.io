/**
 * ALTORRA CARS — Smart Cache Manager v4.0
 * ==========================================
 * Sistema de invalidación inteligente con dos fuentes de señal:
 *
 *   🔧 ADMIN CHANGES  → system/meta.lastModified (Firestore)
 *      El admin panel actualiza este campo al guardar cualquier dato.
 *      Todos los tabs abiertos reciben el cambio en tiempo real (onSnapshot).
 *      Las cargas nuevas lo comparan contra IndexedDB para detectar stale cache.
 *
 *   🚀 GITHUB DEPLOYS → data/deploy-info.json (archivo estático)
 *      GitHub Actions regenera este archivo en cada deploy.
 *      Al cargar la página se fetchea (network-only) y se compara la versión.
 *      Si difiere, se limpian todos los caches y se fuerza reload.
 *
 * Capas de caché limpiadas al invalidar:
 *   L1 · Memoria       (Map en sesión)
 *   L2 · IndexedDB     (persistente entre sesiones)
 *   L3 · localStorage  (altorra-db-cache de database.js)
 *   (L4 Service Worker se limpia solo al detectar nueva versión del SW)
 *
 * API pública:
 *   window.AltorraCache.get(key)
 *   window.AltorraCache.set(key, value)
 *   window.AltorraCache.invalidate()
 *   window.AltorraCache.clearAndReload()
 *   window.AltorraCache.markFresh()
 */

(function () {
    'use strict';

    /* ─── Configuración ─────────────────────────────────────────── */
    const APP_VERSION = '20260608231721'; // §164 Newsletter→CRM (subscriptions + onSubscriptionCreated) + §163 cuenta→contacto. index.html form + home.js initNewsletter. PREV: §157 FIX rectángulo negro del hero (causa raíz REAL): <footer class="cin-hero-foot"> heredaba body footer{background:linear-gradient} de dark-theme.css:688 → rectángulo de borde a borde de la fila. Fix: .cin-hero-foot{background:transparent}. El intento previo (backdrop-filter del buscador) revertido. css/home/cinematic.css; solo Ctrl+Shift+R. PREV: §150.f dropdown Opción A: ELIMINADA columna "Por condición" (Nuevos/Usados rotos — busqueda.html ignora ?tipo=; el filtro nuevo/usado ya existe en el panel "Tipo de Vehículo"). Queda "Por categoría" + CTA "Ver todos los vehículos". Panel 300px single-col. PREV: §150.e dropdown: eliminado enlace DUPLICADO "Camionetas" (= "Pickup", ambos → vehiculos-pickup.html) de "Por condición" en index + snippet. PREV: §150.d FIX layout dropdown: el panel colapsaba a ~120px porque la regla universal *{max-width:100%} de style.css acotaba el width:580px de .nav-dd al containing-block (.nav-dd-wrap ~120px) → grilla desbordada. Fix: .nav-dd-pro{max-width:none} en chrome-redesign.css. Verificado por render local. PREV: §150.c dropdown "Vehículos" abre por hover en todas las páginas (CSS) + panel calentado. PREV: §150.b superficies near-black (#0D0B09, el cliente las quería negras como el index) + QuickTools dock siempre visible. PREV: §150 skip-link §149 REMOVIDO (cliente) + paleta cinematic CALENTADA globalmente (índigo→cálido: --cin-bg-elev/soft + #100d16 + paneles filtro rgba) para matar el "azul" y unificar diseño con el index. PREV: §149 + #main vía components.js (cierra lóbulo §48). §148 validación + enlace roto fix (simulador→busqueda) + A11Y-03 contraste --cin-ink-faint 0.32→0.50 (WCAG AA). Deuda técnica TODO-09..13 verificada (sin acción segura+valiosa). PREV: §147 a11y quick wins (§48): h1 sr-only landings + :focus-visible global + prefers-reduced-motion + aria-label en filtros (marca/landings/busqueda). PREV: §146 4 landings SEO (vehiculos-suv/pickup/sedan/hatchback) cinematic: data-cin + soft-redesign + reuso marca-cinematic.css (estructura = marca.html, DRY); 3 redirects (usados/nuevos/camionetas) INTACTOS; estáticas, sin regen. PREV: §145 Fix nav header Marcas→marcas.html + marcas.html (índice) cinematic (marcas-cinematic.css); sin regen. PREV: §144 marca.html (template) cinematic (SP-5.3.c): data-cin + soft-redesign + marca-cinematic.css (hero/brand-header/sidebar filtros/tarjetas/paginación); 18 marcas/* regeneradas; JS intacto. PREV: §143 busqueda.html cinematic (SP-5.3.b): data-cin + soft-redesign + busqueda-cinematic.css (hero/filtros/tarjetas/paginación); JS intacto; sin regen. PREV: §142 Eliminar Descripción de vehículo: tab detalle + campo/generador admin + búsqueda + noscript; 27 páginas regeneradas; `descripcion` dormido en Firestore. PREV: §141 SP-5.3 pulido detalle (post-validación): fix glow dorado hover ficha + fix fondo blanco características + descripción editorial + glass (info-card/descripción) + refinamiento cinematic. CSS+JS, sin regen. PREV: §140 SP-5.3 Fase 2/3: detalle-vehiculo → cinematic + de-monolitizado (<body data-cin>, markup Opción A 27 IDs/hooks intactos, css/home/detalle-cinematic.css reescrito, 4 módulos js/public/detalle/, favorito/comparar/sticky cableados, 27 páginas regeneradas). Solo Ctrl+Shift+R. PREV: §117 Plan B+C theming: §B texto legible sobre acento — token --ak-on-accent por paleta (gold=#1a1310 oscuro, blue/violet/emerald/crimson/cyan=#fff) en tokens.css :root + admin-theme-engine.css 6 bloques. ~24 callsites color:#1a1310/#1a1a1a (sobre gradientes var(--vis-brand-*)/--ak-*: botones/badges/pills/chips/avatares/skip-link/note+transfer initials, incl !important) → var(--ak-on-accent,#fallback) en admin.css/admin-visionary.css/admin-v2.css/admin-topnav.css. §C tints más vibrantes: --nova-tint-gold 0.10→0.14, --nova-acrylic-tint-gold 0.06→0.10, --nova-reveal-color 0.16→0.20 + dedup: eliminados bloques legacy html.theme-blue/html.theme-violet de admin.css (ya cubiertos por las 6 paletas del engine). Cero schema, cero deploy backend, solo Ctrl+Shift+R. PREV: §116 Plan A: superficies teñidas con acento activo vía color-mix en admin-theme-engine.css :root (lazy var, 6 paletas + dorado, 0 consumidores tocados, light/high-contrast safe). PREV: // §115 ADR-115 Sistema de tema cromático del admin (gold/blue/violet/emerald/crimson/cyan). Issue 1 toast-spam: admin-theme-picker.js reescrito — bind único idempotente (_atpBound flag + delegación onPickerClick que sobrevive innerHTML, sin re-attach por render ni autoMount) + skip applyTheme/toast si el tema clickeado YA está activo → una sola notificación por cambio. Issue 2 "el tema no cambia nada": tokens.css agrega capa canónica de acento --ak-* (gold por defecto en :root); css/admin-theme-engine.css (CREADO, carga ÚLTIMA en admin.html para ganar el cascade) redefine TODO el set --ak-* por html.theme-{name} + deriva tokens legacy (--brand-primary/--ws-color-gold/--nova-tint-gold/--nova-reveal/--nova-border/--nova-focus) desde --ak-* + ::selection por paleta; ~838 literales dorados hardcoded en admin.css/admin-visionary.css/admin-v2.css/admin-topnav.css/admin-perf-kill.css remapeados a var(--ak-*, gold-fallback) → cambiar paleta recolorea MUCHÍSIMOS elementos a la vez. THEMES 3→6 (emerald/crimson/cyan nuevos). Cero JS funcional roto, cero schema, cero deploy backend. Cliente solo Ctrl+Shift+R. PREV: // §114 Depuración total roles antiguos → rol del sistema (roleName) en TODOS lados. Resolver canónico AP.resolveRoleLabel(userOrRol) en admin-state.js (roleName→cargo→legacy-legible) reemplaza helpers duplicados. CARGO del perfil = espejo read-only de roleName (input readonly + sin self-edit en admin-profile.js). Render legacy crudo eliminado en admin-performance/admin-auth/admin-appointments/admin-presence-ui/admin-topnav. Sync Firebase: onRoleUpdated + onUserRoleAssigned + migrateLegacyUsers + seedSystemRoles resync ahora escriben cargo=roleName a user docs (anti-loop §71: onUserRoleAssigned retorna early si roleId sin cambio). REQUIERE firebase deploy --only functions. PREV: // §113 Contador tiempo real Marcas (#brandsCount). PREV: // §112 FIX DEFINITIVO borradores desaparecen al Ctrl+Shift+R (§111 falló — causa raíz equivocada). Causa raíz REAL (§19 RCA verificado): attachToRouter (admin-v2-core.js:148) corría cleanup(prevSection) en CADA onChange sin guard newSection!==prevSection. go('vehiculos') dispara notifyChange DOS veces (explícito router + MutationObserver al flip .active). El 2º disparo ejecutaba cleanup('vehiculos') → desuscribía el listener de borradores recién suscrito por loadData ANTES de su 1er onSnapshot → galería nunca se poblaba. Los borradores NUNCA se borraron de Firestore. Fix 1-línea: guard prevSection!==newSection. Cero schema, cero deploy backend, solo Ctrl+Shift+R. PREV: // §111 FIX borradores se borran al Ctrl+Shift+R + no aparece la seccion: §108 saveDraft OPTIMISTA renderizaba galeria+toast SINCRONOS pero el .set() en background fallaba silencioso (Firestore Compat rechaza undefined/sparse _images de upload pendiente) y el .catch solo nuleaba _lastSavedSnapshot, nunca quitaba la fila fantasma → al hard refresh el onSnapshot solo trae lo realmente persistido (nada). Fix: getFormSnapshot limpia _images a strings + sanitizeForFirestore recursivo elimina undefined antes del set() + saveDraft rollback de galeria en .catch + startDraftsListener retry-once en error transitorio del onSnapshot. PREV: // §110 Eliminar borrador: eliminacion OPTIMISTA + rollback. PREV: // §108 Drafts 4 fixes: galeria instantanea (optimista+re-suscripcion onChange), dirty-check no re-pregunta tras guardar, modal Si/No custom, saveDraft optimista. PREV: // §107 Sistema de borradores REESCRITO desde cero (multi-borrador subcoleccion por cuenta, _currentDraftId, sin autosave, sin auto-restore, prompt cierre No=nada, galeria Retomar/Eliminar, borrar al publicar). PREV §106 Wizard vehículo 3 fixes: (1) modal más ancho min(1140px,96vw) no alto. (2) dropdowns ilegibles — modales son HERMANOS de #adminPanel así que .admin-panel select option nunca los alcanzaba; agregadas .modal-overlay select/option/optgroup dark #1a1a1c texto blanco en admin-visionary.css (admin-only). (3) drafts estilo TikTok — sin confirm() al abrir (siempre form limpio) + panel #activeDraftsPanel persistente con Retomar/Eliminar. Cero schema, cero deploy backend. PREV §105 Wizard vehículo REORGANIZACIÓN por modelo mental usuario (Kavak/Carvana/MercadoLibre): 6 secciones reagrupadas Identificación→Specs→Comercial→Fotos→Detalle→Publicación. Resuelve 3 clashes (km+tipo juntos, estado/ubicacion→comercial, catch-all Estado 11-campos dividido). WIZARD_STEPS actualizado admin-phase5.js. Field IDs preservados (§17.4). Cero schema, cero deploy backend. PREV §104 Wizard vehículo refactor completo (Sprints A-E): A.1 dedup toast Reordenar + A.2 modal 880px scrollable. B.1 vTipo auto-detect por km. B.2 vOferta auto-derive precioOferta. B.3 fotos auto-sort alfanumérico + primera=portada. C.1 botón generar descripción a tab EXTRAS. C.2 Smart Fields preview al final. D.1 caracteristicas textarea→checkboxes dinámicos por categoría + #btnAddFeature sync a config/listas+sec-lists. E drafts audit: E.1 stopDraftsListener (no listener huérfano tras logout) + E.2 declinar borrador no lo destruye + E.3 deriveTipoFromKm tras restore + E.4 snapshot completo (_images+dealer+features) + E.5 formHasData unificado. Cero schema, cero deploy backend. Solo Ctrl+Shift+R. PREV §103 admin reorder por INSERCIÓN vista lista (Shopify/Notion): grip + línea drop + posiciones secuenciales globales, elimina swap+window.confirm, reorder fuerza lista sin filtros. PREV §101.1 admin FIX causa raíz REAL boxes en hijos de cards: admin-visionary.css:1896 [class*=-card] matcheaba por substring TODOS los av2-card-* hijos (contienen -card) con especificidad (0,11,0) → cada info en su box. Fix :not([class*=av2-card]) + reset !important hijos texto plano. Cards HarmonyOS flat. Cero deploy backend. PREV: // §101 admin Card view limpia corporativa (vehiculos+marcas): estado overlay sobre imagen + codigo/tipo/concesionario texto plano (sin pills apilados) + checkbox overlay; marca nombre 1x (alt vacio + dedup descripcion) + count texto plano + id pill eliminado + layout centrado logo prominente. CSS aditivo admin-v2.css §101. Cero schema, cero deploy backend. PREV: §100 admin Toggle Tarjetas-Lista + HarmonyOS cleanup Vehiculos+Marcas. PREV: // §98 admin FCM prompt cooldown + foreground onMessage + fix badge CRM 0 fantasma. PREV: // §95 FIX hero invisible (real) + ELIMINACIÓN margin-top:70px en TODOS los heros del sitio. §95.A: heroindex-1920.avif/.webp NUNCA existieron (imagen fuente max 1280px, optimizer NO hace upscaling) — preload + <picture> source srcset del index.html referenciaban 1920w → 404 + cache miss + JS .hero-img-loaded fallaba al detectar el load del <img>. Fix: eliminar variant 1920w de preload y <picture> en index.html, mantener solo 480/768/1280 (que sí existen). nosotros.html intacto (esa imagen sí tiene 1920). §95.B: margin-top:70px legacy en TODOS los heros del sitio creaba gap NEGRO visual entre header (position:fixed top:0) y el inicio del hero — el header fixed NO ocupa espacio en el flow, el margin era innecesario. 7 callsites limpiados: css/hero.css (.hero), css/dark-theme.css (body .brand-hero + .gradient-hero + mobile .brand-hero 56px), index.html critical CSS inline (.hero), nosotros.html critical CSS (.about-hero), marcas.html critical CSS (.marcas-hero desktop + mobile). Resultado: header fixed flota encima del top del hero (intencional, los primeros ~80px quedan tapados pero el hero mide 720px, contenido sigue centrado vertical visible). Cliente percibe header+hero "fundidos" sin gap visual. // §92 FIX hero invisible post-§91 + ELIMINACIÓN total particles + §93 Sprint 3B Lazy loading universal. §92: hero del home no aparecía tras §91 — causa raíz <picture> display:inline no contenía visualmente al <img class=hero-bg-img position:absolute>. Fix: regla CSS `.hero > picture { position:absolute; inset:0; z-index:0; display:block }` en hero.css + override `.hero-bg-img { max-width: none }` vence regla universal img{max-width:100%} de style.css. JS inline con fail-safe setTimeout(reveal, 2000ms). Particles ELIMINADAS completamente: 32 HTMLs limpiados (~256 nodos DOM removidos) + bloques CSS .hero-particles/.hero-particle/@keyframes particleFloat de hero.css/dark-theme.css/performance-fixes.css + ref en js/performance.js. Cero referencia a particle queda en producción. Bot ALTOR sparkles intactos (altorSparkleA/B). §93 Sprint 3B: 56 <img> tags below-the-fold ahora con loading=lazy + decoding=async en 29 archivos. FCP esperado -10-20% en páginas con muchas imgs. // §91 Sprint 3A Imágenes responsive — Fase 3 Performance. optimize-images.mjs TARGETS extendido con nosotros-hero.webp + camioneta.jpg. index.html hero LCP refactor: <picture> srcset AVIF/WebP + 4 category cards wrap con <picture>. nosotros.html same refactor del .about-hero. Preload 2 URLs (AVIF + WebP) con imagesrcset + type. Cero JS admin, cero schema, cero deploy backend. // §90 Sprint Fase 4 SEO técnica. scripts/generate-vehicles.mjs: generateBrandPage agrega OG + Twitter Cards + JSON-LD AutoDealer expandido + BreadcrumbList. generatePage expande Car schema con bodyType + driveWheelConfiguration + itemCondition + vehicleEngine condicional + vehicleIdentificationNumber. index.html y busqueda.html agregan h1 con span sr-only Cartagena. css/style.css append .sr-only utility. Cero impacto visual ni admin/bot/RBAC. Tras merge: workflow_dispatch en GitHub Actions para re-generar páginas /vehiculos y /marcas. // §89 PENDIENTE-B R8 grande — refactor 174 callsites legacy → AP.hasPermission. 35 archivos modificados (admin-*.js + ai/knowledge-graph.js). Mapping table §67.3 aplicada. Helpers locales nuevos en admin-vehicles/admin-brands/admin-concierge/admin-kb. AP.isAuthenticatedAdmin() helper aditivo nuevo en admin-state.js. Cero refactor de helpers legacy de admin-state.js (preservados retrocompat). firestore.rules + functions/index.js + sitio público + AI modules + concierge.js cliente ZERO touch. Cero deploy backend. Solo Ctrl+Shift+R. // §88 Sprint C-S10 (PENDIENTE-C-S10) Internal notes asesor + Transferencias entre asesores + Indicador "X está atendiendo". Subcoleccion conciergeChats/{sid}/notes/{noteId} defense-in-depth (cliente NO matchea rule). 6 funciones nuevas en admin-concierge.js. Toggle "Nota interna" en composer amber. Modal transfer con RTDB presence. Cloud Function onChatTransferred dispara FCM+Telegram al nuevo asesor + audit. Deploy obligatorio: firebase deploy --only firestore:rules,functions:onChatTransferred. // §87 Sprint C-S9 (PENDIENTE-C-S9) CSAT post-cierre + Auto-resolve idle chats + Dashboard métricas Concierge. js/concierge.js: helper buildCSATBlockHTML() con 5 caritas + textarea opcional 280 chars + Submit/Skip. Inyectado entre radicado y botones Chat finalizado (ambas variants). Idempotente. Persiste conciergeChats/{sid}.csat. Cero rule deploy. functions/index.js: autoResolveIdleChats schedule every 30 minutes. mode=live + lastMessageAt > 24h → status=closed closedReason=idle_timeout. Audit log. Batch cap 200/run. js/admin-reports.js: renderConciergeMetrics() lee Firestore con cache 60s. 4 KPIs + distribucion cierres + top 5 intents + top 5 FAQs missed. Deploy obligatorio: firebase deploy --only functions:autoResolveIdleChats. // §86 Sprint C-S8 (PENDIENTE-C-S8) Welcome contextual + Progressive profiling + Quick replies dinámicos + Carousel horizontal vehicle cards. js/concierge.js: buildContextualWelcomeHTML con 4 variantes (returning user/vehículo/logueado/default). isGateRequired progressive — gate NO forzoso por default. Branches financiacion_query/appointment_request/sell_my_car retornan _requestGate + _deferredQuery cuando needsIdentityForHighValueAction es true. handleGateSubmit ejecuta deferred query post-gate. getContextualQuickReplies con 7 intents mapeados. renderVehicleCard acepta isInCarousel, vehicleCards >= 3 activa cnc-vcard-list--carousel. css/concierge.css: append carousel scroll-snap-type x mandatory + cards 280px (240px mobile) + scrollbar dorada + prefers-reduced-motion. Cero schema, cero deploy backend. // §84 PRODUCCIÓN ACTIVADA + reposición avisos a la izquierda. SILENT_DEV_MODE_DEFAULT cambia de true→false: los usuarios ahora SÍ reciben notificaciones (pill genérica + toast contextual catálogo). Cliente decidió que mientras sigue mejorando la web igual debe avisar usuarios reales. Toggle runtime sigue: localStorage.altorra_silent_updates='1'|'0'. Pill #altorra-update-pill y toast #altorra-catalog-toast reposicionados de bottom-RIGHT/bottom-CENTER a bottom-LEFT para NO chocar con FAB bot ALTOR (108×108 bottom-right). Mobile <480px: ambos avisos suben a TOP (top:16px) para evitar burbujas/CTAs del bot. prefers-reduced-motion respetado con transform:none. Cero JS admin, cero schema, cero deploy backend. Deuda técnica documentada §84.5: migración build system (Vercel/Cloudflare Pages) queda postponed hasta que cliente migre todo el sitio. // §83 Fase B Smart Update Prompts — extiende §82 con 3 mejoras coordinadas: B1 Smart navigation handler (Notion/Linear pattern: si hay version mismatch + cliente navega entre páginas via anchor click interno o pagehide → swap silencioso aplica automáticamente sin prompts), B2 schema deploy-info.json extendido con field `type` (silent/soft/forced) — generator emite soft cuando hay cambios reales de inventario, default silent si no hay field (retrocompat conservadora) — type=silent SIEMPRE silencia incluso con SILENT_DEV_MODE=false, type=forced fuerza modal (security fix raro), type=soft respeta SILENT_DEV_MODE flag, B3 Toast contextual para inventario en páginas catálogo (detección via isCatalogPage: index/busqueda/vehiculos-*/marcas/comparar/favoritos) — toast bottom-center con 🆕 "Nuevos vehículos disponibles" + auto-dismiss 15s + CTA Ver/X. Workflow .github generate-vehicles.yml extendido para emitir type=soft + userVisible=true. Cero refactor del resto del sistema (validateDeployVersion + Firestore meta listener + polling siguen iguales — solo arman smart nav antes de showUpdateBanner). Cero deploy backend. // §82 Fase A Smart Update Prompts (industry-standard Slack/GitHub/Linear/Notion). MODAL FULLSCREEN ELIMINADO → pill sutil bottom-right 320px con auto-dismiss 20s + dismiss button X. SILENT_DEV_MODE flag ON por default durante esta fase de mejoras (cero notificación visible al cliente — la cache se invalida en background, próxima navegación natural ya está en la versión nueva). Toggle runtime: localStorage.altorra_silent_updates='1'|'0'. Cross-tab dedup via BroadcastChannel altorra-cache-updates con fallback sessionStorage. Daily dedup 24h (vs 5min anterior). Reduced-motion respetado. Cuando el cliente quiera mostrar pill a usuarios finales en producción, cambiar SILENT_DEV_MODE_DEFAULT a false (1 línea). Cero deploy backend. // §81 Mejora masiva inteligencia bot ALTOR — 7 bugs reportados por cliente. Bug 1 "Volviste" inapropiado: hasGreetedBefore filtra turnHistory por timestamp (elapsed >1s && <5min). Bug 2 cascade Bug 1. Bug 3 "que tienes por ahi": regex+lexicon. Bug 4 "no entiendes o que": frustration lexicon ampliado. Bug 5 "si tengo dudas" → goodbye: nuevo intent request_help prioritario + branch en concierge.js. Bug 6 "Que mas" → "¿Te quedó alguna duda?": variant problemático eliminado. Bug 7 "Ey" → fallback: regex greeting + lexicon expandido. Cero regresión. Cero deploy backend. // §80 Hotfix bugs bot ALTOR. Bug 1: aura cuadrada del FAB (§79 bloque A cncOnboardPulse aplicaba box-shadow rectangular al button transparente) → bloque A eliminado del CSS §79, FAB vuelve al onboarding original altorFloat+altorGlow. Bug 2: queue stale "1266 min" (loadSession no validaba staleness mode queue/live) → §80 STALENESS GUARD agregado: si mode='queue'/'live' Y last activity >4h → reset a 'bot' + messages=[] + queueEnteredAt=null + nuevo sessionId. Preserva profile. Welcome del bot aparece fresh al reabrir. Cero JS admin, cero schema, cero deploy. Cliente solo Ctrl+Shift+R. // §79 Sprint S7 Rediseño visual cliente widget Concierge (CSS-only ~250 líneas append). CIERRE Mega-Plan §59 ALTOR Hub 7/7 sprints. Onboarding pulse FAB (3 iterations, no loop), bubbles iMessage style con border-radius 18 asimétrico + animation overshoot + box-shadow sutil + max-width 78%, welcome bubble premium con gradient + glow + animation, vehicle cards hover lift, skeleton loaders preparados (futuro JS), CTA bubble entry suavizada, mobile responsive 480px, prefers-reduced-motion. Prefijo .altorra-concierge para especificidad sin !important. Cero JS, cero schema, cero deploy backend. Cliente solo Ctrl+Shift+R. Paridad visual cliente↔admin (S6+S7). // §78 Sprint S6 Rediseño visual ALTOR Hub admin (CSS-only ~350 líneas append). Sidebar refinada (avatar 44px gradient, hover lift, active gradient + accent left + glow), detail header sticky con backdrop-filter blur, bubbles iMessage style con border-radius asimétrico (4px en esquina del emisor) + animation hubMsgSlideIn cubic-bezier overshoot, empty states con SVG inline data:URI (chat bubble dorado + checkmark verde con pulse), skeleton loaders (preparados para futuro), unread badge con hubUnreadPulse, mobile responsive @media max-width:768px (1col), prefers-reduced-motion. Prefijo .altor-hub para especificidad sin !important. Cero JS, cero schema, cero deploy backend. Cliente solo Ctrl+Shift+R. Próximo S7 (último): rediseño visual cliente widget. // §77 Sprint S5 Presence avanzada (online/away/offline). Schema RTDB /presence extendido con status + currentChatId. Admin tracking via visibilitychange + click/keydown + setInterval 60s (sin pointermove). Cliente lee system/workload Firestore (privacy-safe, no /presence directo) y renderiza dot indicator + label en cncStatus header. 4 estados: 🟢 disponible (al instante), 🟢 online (pronto), 🟡 away, ⚫ offline. Aggregator workload extendido con asesoresAway count. Deploy obligatorio: firebase deploy --only functions:recalculateWorkloadOnChatChange,functions:recalculateWorkloadScheduled. // §76 Sprint S4 Read Receipts (✓ enviado vs ✓✓ leído). Cliente y admin marcan lastReadByUser/lastReadByAdmin en conciergeChats/{sid} con throttle 5s. Listener parent del cliente lee lastReadByAdmin para promover bubbles sent→read en renderMessages. renderChatDetail del admin promueve bubbles asesor a read si chat.lastReadByUser ≥ msg.timestamp. CSS ya existente en §60.2 y S1 (#34B7F1 azul + #1d4ed8 sobre user-bubble dorado). Cero deploy backend (rules R6 ya permiten update). // §75 Sprint S3 Typing Indicators bidireccionales (RTDB) — cliente y admin ven typing del otro lado con throttle 1s + auto-clear 3s + onDisconnect.remove. Schema /typing/{sid}/ con user + asesor_<uid>. Namespace `asesor` (cncAsesorTypingIndicator) no colisiona con typing del bot LLM existente (cncTypingIndicator INTACTO). Cliente: input listener + startTypingListener tras chat doc creado + cleanup en cancelChatListeners. Admin: setAdminTyping per uid + event delegation en cncAdminReply (sobrevive re-renders) + listener PER chat activo (cancela en openChat al cambiar + AltorraSectionCleanup al salir de sec-concierge). 3 dots iMessage style con keyframes + prefers-reduced-motion. database.rules.json: /typing/ con $asesorKey == 'asesor_' + auth.uid (cero impersonación). Cero costo (RTDB free tier). Deploy obligatorio: firebase deploy --only database. // §73.4 auto-hide "Resembrar sistema" cuando CEO ya está sembrado. Solo visible si ceoExists=false (caso edge). Header en flujo normal queda con solo "Nuevo rol". Re-sembrado manual via DevTools si se necesita en futuro. // §73.3 fix flicker pantalla "Inicializar sistema" en sec-roles + eliminado botón duplicado del header: nuevo flag _state.firstSnapshotReceived evita render con defaults antes de que llegue el snapshot Firestore. Caso A "Inicializar el sistema de roles" ELIMINADO (botón duplicaba "Resembrar sistema" del header). Empty state unificado con texto condicional según ceoExists. Si ceoExists=false (caso edge), texto dirige al header — UNA sola fuente de verdad. // §73.2 auto-hide inteligente: botones "Limpiar legacy" y "Migrar legacy" en sec-roles header se ocultan automáticamente cuando el sistema está limpio (cero huérfanos detectados). Detector en startListener snap + refreshUserCounts → flags _state.hasLegacyDocs + hasLegacyUsersWithSystemRoleId + hasLegacyUsersWithoutRoleId → renderRolesHeader condiciona. refreshHeaderIfLegacyChanged in-place re-render. "Resembrar sistema" siempre visible (utility). "Nuevo rol" siempre visible (CTA). // §73.1 hotfix — extraer header de sec-roles a renderRolesHeader() y mostrarlo SIEMPRE (también en empty states), para que el botón "Limpiar legacy" del §73 sea visible cuando hay CEO pero 0 customs. // §73 R8 mini cleanup masivo client-side: dropdown corto "— Sin roles disponibles —" + disable Guardar + hint visible cuando no hay customs + tabla sec-users muestra "Sin asignar" para users con roleId apuntando a system_editor/viewer legacy en lugar de "EDITOR" stale + eliminado tag "·legacy" confuso + filter __legacy__ incluye huérfanos system_editor/system_viewer. NUEVO botón "Limpiar legacy" en sec-roles header (super_admin only) que abre modal preview con stats + tabla detallada + warning + doble confirm + ejecuta CLIENT-SIDE PURO vía Firestore Compat SDK directo (cero deploy backend): batch update usuarios con FieldValue.delete() roleId/roleName + permissions=[] + markers _orphanedFromRole/_orphanedAt + batch delete docs roles/system_editor + roles/system_viewer + audit log entry. Garantía firestore.rules R6: CEO tiene wildcard '*' → permite delete de roles + update de usuarios. Cliente solo Ctrl+Shift+R y luego ejecuta el botón desde sec-roles UI para limpiar Firebase de restos legacy. // §72 R7.2 hotfix UX — CEO label hardcoded en frontend (independiente de roleName denormalizado stale) + empty state inteligente sec-roles (Crear rol vs Inicializar sistema según ceoExists) + filter sec-users limpiar editor/viewer/super_admin legacy. Cero deploy backend. // §71 R7b — RBAC auto-propagation triggers (4 Cloud Functions: onRoleUpdated/onRoleDeleted/onUserRoleAssigned/recalculateRoleUserCount). Elimina dependencia del "Resembrar sistema" manual del §70 — sync automático en tiempo real cuando admin edita roles. // §70 R7.1 hotfix — 3 bugs RBAC post-§69: toast falso CEO al refrescar (race condition), CEO label "Super Administrador" stale (seedSystemRoles ahora UPDATE + re-sync), CEO editable en sec-users (guard tabla + editUser/deleteUserFn programático). // §69 R7 — RBAC simplificación a UN solo system role CEO + guard "Sin rol asignado" + filtro de editor/viewer legacy en UI sec-roles + sec-users dropdown. // §61.R6 — Firestore Rules refactor con hasPermission(perm) server-side. 50+ callsites con OR fallback legacy preservado. ACCIÓN OBLIGATORIA POST-MERGE: firebase deploy --only firestore:rules. // §61.R5 Pragmático — JSDoc @deprecated + mapping table + refactor demo R2/R3. Cero refactor masivo (R8 lo hace). // §66.3 — modal system role: 1 solo botón Cerrar (no duplicado). // §66.2 hotfix — eliminar orderBy compuesto del listener admin-roles, ordenar client-side. Cero ruido en consola. // §61.R4.1 hotfix — handler de click ignoraba migrationModal, click en Ejecutar migración no respondía. Fix: agregar migModal al filtro. // §61.R4 — Migración legacy users: callable migrateLegacyUsers idempotente con dryRun support + UI sec-roles botón Migrar legacy + modal preview con plan + ejecución real. Cliente debe deployar functions:migrateLegacyUsers. // §61.R3 — Sec-users dropdown roles dinámico (onSnapshot real-time) + escritura denormalizada roleId/roleName/permissions al guardar + filtro por rol en tabla. // §61.R2 — UI sec-roles CRUD: lista grid + modal permissions matrix por categoría + system roles read-only + delete con guard de users + botón Sembrar invoca seedSystemRoles. Listener onSnapshot real-time. Cero impacto callsites legacy. // §61.R1 — RBAC Foundation: catálogo canónico permissions + roles + AP.hasPermission() + Cloud Function seedSystemRoles + rules permissions/+roles/. Cero impacto producción si no se ejecuta seedSystemRoles. R2 ship UI sec-roles. // §60.2 — Sprint S2 Optimistic UI cliente (concierge.js): estados pending/sent/read/failed + retry button // §60.1.1 — Hotfix Sprint S1: pre-check server claim + mensajes amigables permission-denied // §60.1 — Sprint S1 cirugía ALTOR Hub: Optimistic UI universal del admin (HubStore + 7 botones admin con snapshot/rollback + estados pending/sent/read/failed) // §57.9 — Refactor flow industry-standard (Intercom/Drift): open() lazy clean + finalCloseAndCleanup simplificado + telemetría completa // §57.8 — 3 botones pantalla Chat finalizado + fix radicado duplicado + defense-in-depth open() para bug Cerrar chat → reabrir conversación vieja — §57.7 admin listener globalmente activo + heartbeat self-healing // §57.7 — admin _chatsUnsub globalmente activo (no auto-cancel on section change) + heartbeat 30s self-healing → admin recibe chats nuevos en tiempo real sin refresh — §57.6 _resetting flag + Descargar en admin close + diag — fix unificado cleanSessionAndRender helper — 4 bugs tiempo real coordinados — finalCloseAndCleanup robusto + admin realtime detail re-render — fix botón Cerrar chat no respondía — refactor flow finalización chat cliente — fix definitivo radicado push Telegram — race condition radicado fix + disable_notification explícito — onChatEscalatedTelegram con onDocumentWritten + sin pin region + logs verbosos diagnostic
    const DB_NAME           = 'altorra-cache';
    const DB_VERSION        = 2;
    const STORE_DATA        = 'app-data';
    const STORE_META        = 'cache-meta';
    const VERSION_KEY       = 'altorra_app_version';
    const DEPLOY_KEY        = 'altorra_deploy_version';
    const DB_CACHE_KEY      = 'altorra-db-cache';   // clave que usa database.js
    const META_DOC_PATH     = 'system/meta';
    const DEPLOY_INFO_PATH  = '/data/deploy-info.json';
    // Período de gracia: evita bucle infinito si el SW activa y envía SW_UPDATED
    // justo después de que clearAndReload() reinstala el SW en la misma sesión.
    const UPDATE_GRACE_KEY  = 'altorra_update_grace';
    const UPDATE_GRACE_MS   = 30_000; // 30 segundos

    /* ─── §82 Fase A — Smart Update Prompts (Industry-standard) ──── */
    // SILENT_DEV_MODE: cuando true, las actualizaciones son completamente
    // silenciosas (la cache se invalida en background, el SW se activa solo,
    // el cliente sigue viendo la versión actual sin notificación; al
    // próximo navegación natural ya está en la nueva versión).
    //
    // PARA ACTIVAR/DESACTIVAR:
    //   • Hardcoded: cambia la constante abajo (true/false) y bumpea cache.
    //   • Runtime: localStorage.setItem('altorra_silent_updates', '1')
    //     o '0' para forzar override sin redeploy.
    //
    // Patrón Linear/Notion: silent durante fases de desarrollo activo,
    // pill sutil cuando estás en producción con cambios visibles.
    const SILENT_DEV_MODE_DEFAULT = false;  // §84 — PRODUCCIÓN ACTIVADA. Cliente decidió que mientras sigue trabajando en mejoras igual debe avisar a usuarios reales de cambios visibles. Toggle runtime sigue disponible via localStorage.altorra_silent_updates='1' si necesitás silenciar puntualmente.
    function isSilentMode() {
        try {
            const override = localStorage.getItem('altorra_silent_updates');
            if (override === '1') return true;
            if (override === '0') return false;
        } catch (e) {}
        return SILENT_DEV_MODE_DEFAULT;
    }
    // Pill dedup window — UNA vez por ventana de tiempo (Slack/GitHub pattern).
    // 24h: si el usuario ya vio la pill hoy, no la repetimos en cada nuevo
    // commit del dev. En producción esto se vuelve útil porque el cliente
    // sigue navegando varias veces al día.
    const PILL_DEDUP_MS = 24 * 60 * 60 * 1000; // 24h
    const PILL_SESSION_KEY = 'altorra_pill_session';
    // BroadcastChannel: cross-tab dedup. Si tab A muestra la pill y tab B
    // detecta la misma versión, B no la duplica.
    let _bcChannel = null;
    try {
        if (typeof BroadcastChannel === 'function') {
            _bcChannel = new BroadcastChannel('altorra-cache-updates');
        }
    } catch (e) { _bcChannel = null; }

    /* ─── L1: Memory cache ──────────────────────────────────────── */
    const memoryCache = new Map();

    /* ─── L2: IndexedDB ─────────────────────────────────────────── */
    let _db = null;

    function openDB() {
        if (_db) return Promise.resolve(_db);
        return new Promise((resolve, reject) => {
            const req = indexedDB.open(DB_NAME, DB_VERSION);
            req.onupgradeneeded = (e) => {
                const db = e.target.result;
                if (!db.objectStoreNames.contains(STORE_DATA)) {
                    db.createObjectStore(STORE_DATA, { keyPath: 'key' });
                }
                if (!db.objectStoreNames.contains(STORE_META)) {
                    db.createObjectStore(STORE_META, { keyPath: 'key' });
                }
            };
            req.onsuccess  = (e) => { _db = e.target.result; resolve(_db); };
            req.onerror    = (e) => reject(e.target.error);
        });
    }

    async function idbGet(store, key) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx  = db.transaction(store, 'readonly');
            const req = tx.objectStore(store).get(key);
            req.onsuccess = () => resolve(req.result ? req.result.value : undefined);
            req.onerror   = () => reject(req.error);
        });
    }

    async function idbSet(store, key, value) {
        const db = await openDB();
        return new Promise((resolve, reject) => {
            const tx  = db.transaction(store, 'readwrite');
            const req = tx.objectStore(store).put({ key, value });
            req.onsuccess = () => resolve();
            req.onerror   = () => reject(req.error);
        });
    }

    async function idbClear() {
        const db = await openDB();
        return new Promise((resolve) => {
            const tx = db.transaction([STORE_DATA, STORE_META], 'readwrite');
            tx.objectStore(STORE_DATA).clear();
            tx.objectStore(STORE_META).clear();
            tx.oncomplete = resolve;
        });
    }

    /* ─── Helpers ────────────────────────────────────────────────── */
    function parseTimestamp(ts) {
        if (!ts) return null;
        if (typeof ts.toMillis === 'function') return ts.toMillis();
        return Number(ts);
    }

    /* ─── Modal de actualización — centrado en pantalla ─────────── */
    // Cross-page deduplication: if banner was shown recently (within 5 min),
    // don't show it again on navigation to another page.
    const BANNER_SHOWN_KEY = 'altorra_banner_shown_at';
    const BANNER_DEDUP_MS  = 5 * 60 * 1000; // 5 minutes

    let _modalShown = false;
    let _pillTimer = null;

    /**
     * §82 Smart Update Prompt — pill sutil bottom-right (NO modal fullscreen).
     * Patrones combinados Slack + GitHub + Linear + Notion:
     *   • Silent mode (default ON durante dev): cero notificación, swap silente
     *   • Cross-tab dedup vía BroadcastChannel
     *   • Session dedup vía sessionStorage (no spam intra-tab)
     *   • Daily dedup vía localStorage (no se repite cada hora)
     *   • Auto-dismiss 20s si user no interactúa
     *   • Pill 300px bottom-right, sin overlay ni backdrop, no bloquea UI
     *   • Reduced-motion friendly + a11y aria-live polite
     */
    function showUpdateBanner() {
        if (_modalShown) return;

        // §83 — Smart behavior por type del deploy:
        //   • 'silent'  → cero notificación SIEMPRE (incluso si SILENT_DEV_MODE=false)
        //   • 'soft'    → respeta SILENT_DEV_MODE, y EN PÁGINA CATÁLOGO muestra toast
        //                 contextual "Nuevos vehículos disponibles" en lugar de pill genérica
        //   • 'forced'  → modal obligatorio (security fix, raro)
        const deployType = getDeployType();

        if (deployType === 'silent') {
            _modalShown = true;
            console.info('[AltorraCache] §83 Silent deploy type — cero notificación.');
            return;
        }

        // 1) SILENT_DEV_MODE → cero notificación. La cache ya se invalidó
        //    en background; al próximo navigation/reload el usuario está
        //    en la versión nueva sin saberlo. Patrón Linear/Notion.
        //    Solo aplica a type='soft'. type='forced' lo sobreescribe abajo.
        if (deployType !== 'forced' && isSilentMode()) {
            _modalShown = true; // bloquea futuras invocaciones en este tab
            console.info('[AltorraCache] §82 Silent update applied (dev mode). Nueva versión disponible — sin notificación visible.');
            return;
        }

        // §83 — Toast contextual en páginas catálogo (cuando type='soft')
        if (deployType === 'soft' && isCatalogPage()) {
            _modalShown = true;
            try { sessionStorage.setItem(PILL_SESSION_KEY, '1'); } catch (e) {}
            try {
                if (_bcChannel) _bcChannel.postMessage({ type: 'pill-shown', ts: Date.now() });
            } catch (e) {}
            localStorage.setItem(BANNER_SHOWN_KEY, Date.now().toString());
            console.info('[AltorraCache] §83 Soft update + página catálogo → toast contextual.');
            showCatalogToast();
            return;
        }

        // 2) Cross-tab dedup (mismo browser, otras tabs): si otra tab ya
        //    mostró la pill para esta versión, esta tab queda silent.
        var alreadyShownInOtherTab = (function () {
            try {
                var data = sessionStorage.getItem(PILL_SESSION_KEY);
                if (data) return true;
            } catch (e) {}
            return false;
        })();
        if (alreadyShownInOtherTab) {
            _modalShown = true;
            return;
        }

        // 3) Daily dedup: si la pill se mostró hace <24h en cualquier
        //    tab/sesión de este browser, no re-mostrar.
        var lastShown = Number(localStorage.getItem(BANNER_SHOWN_KEY) || 0);
        if (lastShown && (Date.now() - lastShown) < PILL_DEDUP_MS) {
            _modalShown = true;
            return;
        }

        _modalShown = true;
        localStorage.setItem(BANNER_SHOWN_KEY, Date.now().toString());
        try { sessionStorage.setItem(PILL_SESSION_KEY, '1'); } catch (e) {}
        // Notificar a otras tabs para que no dupliquen
        try {
            if (_bcChannel) _bcChannel.postMessage({ type: 'pill-shown', ts: Date.now() });
        } catch (e) {}

        if (!document.getElementById('altorra-update-styles')) {
            const style = document.createElement('style');
            style.id = 'altorra-update-styles';
            style.textContent = `
                #altorra-update-pill {
                    position: fixed;
                    left: 16px;
                    bottom: 16px;
                    z-index: 9990;
                    max-width: 320px;
                    min-width: 240px;
                    /* §84 — Pill posicionada bottom-LEFT para NO chocar con FAB del bot ALTOR
                       que vive en bottom-right (108×108 + bottom:24px right:24px). */
                    background: linear-gradient(160deg, rgba(15,12,0,0.96) 0%, rgba(28,22,0,0.96) 100%);
                    border: 1px solid rgba(212,175,55,0.32);
                    border-top: 1px solid rgba(212,175,55,0.55);
                    border-radius: 14px;
                    box-shadow: 0 10px 32px rgba(0,0,0,0.55), 0 2px 8px rgba(212,175,55,0.08);
                    padding: 14px 14px 14px 18px;
                    display: flex;
                    align-items: flex-start;
                    gap: 10px;
                    font-family: inherit;
                    color: #fff;
                    transform: translateY(20px);
                    opacity: 0;
                    transition: transform 0.32s cubic-bezier(0.34,1.3,0.64,1), opacity 0.28s ease;
                    pointer-events: auto;
                }
                #altorra-update-pill.aup-visible {
                    transform: translateY(0);
                    opacity: 1;
                }
                #altorra-update-pill.aup-leaving {
                    transform: translateY(20px);
                    opacity: 0;
                }
                .aup-icon {
                    flex-shrink: 0;
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #d4af37 0%, #b89658 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.78rem;
                    color: #0a0800;
                    margin-top: 1px;
                }
                .aup-body { flex: 1; min-width: 0; }
                .aup-title {
                    font-size: 0.82rem;
                    font-weight: 600;
                    color: #d4af37;
                    margin: 0 0 2px;
                    letter-spacing: 0.01em;
                    line-height: 1.2;
                }
                .aup-desc {
                    font-size: 0.74rem;
                    color: rgba(255,255,255,0.55);
                    margin: 0 0 8px;
                    line-height: 1.4;
                }
                .aup-actions { display: flex; gap: 6px; align-items: center; }
                .aup-btn {
                    background: linear-gradient(135deg, #d4af37 0%, #b89658 100%);
                    color: #0a0800;
                    border: none;
                    border-radius: 7px;
                    font-weight: 700;
                    font-size: 0.7rem;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    padding: 7px 12px;
                    cursor: pointer;
                    transition: transform 0.18s ease, box-shadow 0.18s ease;
                    font-family: inherit;
                }
                .aup-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 4px 12px rgba(212,175,55,0.32);
                }
                .aup-btn:active { transform: translateY(0); }
                .aup-btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }
                .aup-dismiss {
                    background: transparent;
                    border: none;
                    color: rgba(255,255,255,0.42);
                    cursor: pointer;
                    font-size: 1.05rem;
                    line-height: 1;
                    padding: 4px 6px;
                    border-radius: 6px;
                    transition: color 0.18s ease, background 0.18s ease;
                }
                .aup-dismiss:hover {
                    color: #fff;
                    background: rgba(255,255,255,0.08);
                }
                @media (max-width: 480px) {
                    #altorra-update-pill {
                        left: 12px;
                        right: 12px;
                        /* §84 — En mobile la pill va arriba, NO bottom, porque el FAB del bot
                           ALTOR ocupa el bottom-right y el bottom-left puede chocar con
                           burbujas/banderines del bot. Top deja espacio limpio. */
                        bottom: auto;
                        top: 16px;
                        max-width: none;
                        /* Entry animation desde arriba en mobile (no desde abajo) */
                        transform: translateY(-20px);
                    }
                    #altorra-update-pill.aup-visible { transform: translateY(0); }
                    #altorra-update-pill.aup-leaving { transform: translateY(-20px); }
                }
                @media (prefers-reduced-motion: reduce) {
                    #altorra-update-pill,
                    #altorra-update-pill.aup-leaving { transition: opacity 0.2s ease; transform: none; }
                }
            `;
            document.head.appendChild(style);
        }

        const pill = document.createElement('div');
        pill.id = 'altorra-update-pill';
        pill.setAttribute('role', 'status');
        pill.setAttribute('aria-live', 'polite');
        pill.innerHTML = `
            <div class="aup-icon" aria-hidden="true">↻</div>
            <div class="aup-body">
                <p class="aup-title">Nueva versión disponible</p>
                <p class="aup-desc">Recargá para ver los cambios más recientes.</p>
                <div class="aup-actions">
                    <button class="aup-btn" id="aup-reload-btn" type="button">Recargar</button>
                </div>
            </div>
            <button class="aup-dismiss" id="aup-dismiss-btn" type="button" aria-label="Descartar">×</button>
        `;
        document.body.appendChild(pill);

        requestAnimationFrame(() => requestAnimationFrame(() => pill.classList.add('aup-visible')));

        function dismissPill() {
            if (_pillTimer) { clearTimeout(_pillTimer); _pillTimer = null; }
            pill.classList.remove('aup-visible');
            pill.classList.add('aup-leaving');
            setTimeout(function () {
                if (pill.parentNode) pill.parentNode.removeChild(pill);
            }, 350);
        }

        document.getElementById('aup-reload-btn').addEventListener('click', function () {
            this.textContent = 'Recargando…';
            this.disabled = true;
            AltorraCache.clearAndReload();
        });
        document.getElementById('aup-dismiss-btn').addEventListener('click', dismissPill);

        // Auto-dismiss 20s (Slack pattern)
        _pillTimer = setTimeout(dismissPill, 20_000);
    }

    // Cross-tab listener: si otra tab muestra la pill, esta queda silent
    if (_bcChannel) {
        _bcChannel.addEventListener('message', function (e) {
            if (e.data && e.data.type === 'pill-shown') {
                _modalShown = true;
                try { sessionStorage.setItem(PILL_SESSION_KEY, '1'); } catch (err) {}
            }
        });
    }

    /* ─── §83 B1 — Smart Navigation Update (Notion/Linear pattern) ── */
    // Cuando hay version mismatch pendiente y el usuario navega entre páginas
    // (anchor click interno o page unload), aplicamos invalidación silenciosa
    // antes de que cargue la siguiente página. Resultado: el user no recibe
    // ningún prompt; en la próxima página simplemente está en la versión nueva.
    //
    // Patrón usado por:
    //   • Notion: silent swap al navegar entre páginas del workspace
    //   • Linear: silent en minor releases — el siguiente click trae lo nuevo
    //   • GitHub: silent SW update + el next route change ya tiene la versión
    //
    // Flag _smartNavPending se activa en init() si version mismatch detectado.
    // No interfiere con el flag SILENT_DEV_MODE — funciona en ambos modos.
    let _smartNavPending = false;
    let _smartNavBound = false;

    function armSmartNavigationUpdate() {
        if (_smartNavBound) return;
        _smartNavBound = true;

        // 1) Click en anchor interno: aplicar swap antes de que navegue.
        //    Solo para anchors del mismo origen + nav real (no target=_blank).
        document.addEventListener('click', function (e) {
            if (!_smartNavPending) return;
            const target = e.target && e.target.closest ? e.target.closest('a[href]') : null;
            if (!target) return;
            // Skip externos / new tab / download / hash internos
            try {
                const url = new URL(target.href, window.location.href);
                if (url.origin !== window.location.origin) return;
                if (target.target === '_blank') return;
                if (target.hasAttribute('download')) return;
                if (url.pathname === window.location.pathname && url.hash) return; // anchor interno
            } catch (_) { return; }
            // Marcar invalidación silenciosa para la próxima carga.
            // El cache ya se invalidó en init() — el SW está listo para activar
            // la versión nueva en la próxima navegación natural.
            console.info('[AltorraCache] §83 Smart nav update applied silently on link click.');
            _smartNavPending = false;
            // Activar SW waiting si existe (acelera el swap)
            if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistration().then(function (reg) {
                    if (reg && reg.waiting) reg.waiting.postMessage({ type: 'SKIP_WAITING' });
                }).catch(function () {});
            }
        }, true); // capture phase — antes de que click handlers internos hagan preventDefault

        // 2) pagehide / beforeunload: si el cliente está saliendo de la página
        //    (cualquier motivo: cerrar tab, navegar, etc.), no hace falta nada
        //    porque la próxima carga del browser ya leerá la versión nueva.
        //    Marcamos diagnóstico para confirmar comportamiento esperado.
        window.addEventListener('pagehide', function () {
            if (_smartNavPending) {
                console.info('[AltorraCache] §83 pagehide con update pendiente — swap natural al volver.');
            }
        });
    }

    /* ─── Polling periódico mientras el tab está abierto ─────────── */
    function startPolling() {
        const INTERVAL = 10 * 60 * 1000; // 10 minutes (reduced from 3m — real-time Firestore listener handles admin changes)
        setInterval(async function () {
            const remoteVer = await fetchDeployVersion();
            if (!remoteVer) return;
            const localVer = localStorage.getItem(DEPLOY_KEY);
            if (localVer && remoteVer !== localVer) {
                console.info('[AltorraCache] Polling: nuevo deploy detectado →', remoteVer);
                await AltorraCache.invalidate();
                localStorage.setItem(DEPLOY_KEY, remoteVer);
                _smartNavPending = true; // §83 B1
                armSmartNavigationUpdate();
                showUpdateBanner();
            }
        }, INTERVAL);
    }

    /* ─── Fuente 1: Firestore system/meta ───────────────────────── */
    async function fetchFirestoreLastModified() {
        try {
            const db = window.db;
            if (!db) return null;
            const snap = await db.doc(META_DOC_PATH).get();
            if (!snap.exists) return null;
            return parseTimestamp(snap.data().lastModified);
        } catch (_) {
            return null;
        }
    }

    /**
     * Suscripción en tiempo real a system/meta.
     * Cuando el admin guarda algo, este listener notifica a todos los tabs abiertos.
     * El primer snapshot solo establece la línea base; los siguientes son cambios reales.
     */
    function startMetaListener(db) {
        let firstSnapshot = true;

        db.doc(META_DOC_PATH).onSnapshot(function(snap) {
            if (!snap.exists) { firstSnapshot = false; return; }

            const remote = parseTimestamp(snap.data().lastModified);

            if (firstSnapshot) {
                firstSnapshot = false;
                // Solo guardar línea base, no invalidar
                if (remote) idbSet(STORE_META, 'lastModified', remote).catch(function(){});
                return;
            }

            // Cambio real mientras el tab estaba abierto → limpiar caché
            AltorraCache.invalidate().then(function() {
                console.info('[AltorraCache] Cambio del admin detectado en tiempo real → caché limpiada');
                // database.js tiene sus propios real-time listeners que ya actualizan la UI.
                // Solo necesitamos que el localStorage quede limpio para próximas cargas.
            }).catch(function(){});

        }, function() { /* sin red o sin permisos — silencioso */ });
    }

    /* ─── Fuente 2: deploy-info.json (GitHub deploys) ───────────── */
    // §83 — _lastDeployInfo cachea el último deploy info leído (incluye type).
    // Permite que showUpdateBanner() decida comportamiento sin re-fetch.
    let _lastDeployInfo = null;
    async function fetchDeployVersion() {
        try {
            const resp = await fetch(DEPLOY_INFO_PATH + '?_=' + Date.now(), {
                cache: 'no-store',
                signal: AbortSignal.timeout ? AbortSignal.timeout(5000) : undefined
            });
            if (!resp.ok) return null;
            const info = await resp.json();
            _lastDeployInfo = info; // §83 cache para getDeployType()
            return info.version || null;
        } catch (_) {
            return null;
        }
    }

    /* ─── §83 Fase B — Smart Update Behavior por type ─────────────── */
    /**
     * Retorna el tipo de update del último deploy detectado:
     *   'silent'  → cero notificación (cosméticos, refactor)
     *   'soft'    → pill sutil + toast contextual en catálogo
     *   'forced'  → modal obligatorio (security fix)
     * Default conservador 'silent' si no hay field (retrocompat).
     */
    function getDeployType() {
        if (!_lastDeployInfo) return 'silent';
        const t = _lastDeployInfo.type;
        if (t === 'soft' || t === 'forced' || t === 'silent') return t;
        return 'silent'; // unknown value → conservador
    }

    /**
     * Detecta si el usuario está en una página de catálogo/inventario.
     * Solo en esas páginas mostramos el toast contextual de "vehículos nuevos".
     */
    function isCatalogPage() {
        try {
            const path = (window.location.pathname || '').toLowerCase();
            if (path === '/' || path.endsWith('/index.html')) return true;
            if (path.includes('busqueda')) return true;
            if (path.includes('vehiculos-')) return true;        // categorías
            if (path.startsWith('/vehiculos/')) return true;     // pages generadas
            if (path.includes('marcas')) return true;
            if (path.startsWith('/marcas/')) return true;
            if (path.includes('comparar')) return true;
            if (path.includes('favoritos')) return true;
            return false;
        } catch (_) { return false; }
    }

    /**
     * §83 Toast contextual estilo Slack/Intercom para páginas catálogo
     * cuando hay inventario nuevo. CTA "Ver" recarga con cache limpia.
     * NO bloquea contenido. Auto-dismiss 15s.
     */
    let _catalogToastShown = false;
    function showCatalogToast() {
        if (_catalogToastShown) return;
        _catalogToastShown = true;

        if (!document.getElementById('altorra-catalog-toast-styles')) {
            const style = document.createElement('style');
            style.id = 'altorra-catalog-toast-styles';
            style.textContent = `
                #altorra-catalog-toast {
                    position: fixed;
                    left: 16px;
                    bottom: 16px;
                    transform: translateY(20px);
                    z-index: 9989;
                    max-width: 380px;
                    min-width: 260px;
                    /* §84 — Toast bottom-LEFT para NO chocar con FAB bot ALTOR (bottom-right).
                       Misma posición que la pill genérica (que NO se renderiza simultáneamente
                       por el flag _modalShown). En mobile pasa a top-center (ver media query). */
                    background: linear-gradient(160deg, rgba(15,12,0,0.96) 0%, rgba(28,22,0,0.96) 100%);
                    border: 1px solid rgba(212,175,55,0.32);
                    border-top: 1px solid rgba(212,175,55,0.55);
                    border-radius: 12px;
                    box-shadow: 0 12px 36px rgba(0,0,0,0.55), 0 2px 8px rgba(212,175,55,0.08);
                    padding: 12px 14px 12px 16px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    font-family: inherit;
                    color: #fff;
                    opacity: 0;
                    transition: transform 0.32s cubic-bezier(0.34,1.3,0.64,1), opacity 0.28s ease;
                }
                #altorra-catalog-toast.act-visible {
                    transform: translateY(0);
                    opacity: 1;
                }
                #altorra-catalog-toast.act-leaving {
                    transform: translateY(20px);
                    opacity: 0;
                }
                .act-icon {
                    flex-shrink: 0;
                    width: 26px;
                    height: 26px;
                    border-radius: 50%;
                    background: linear-gradient(135deg, #d4af37 0%, #b89658 100%);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 0.8rem;
                    color: #0a0800;
                }
                .act-body { flex: 1; min-width: 0; line-height: 1.3; }
                .act-title {
                    font-size: 0.82rem;
                    font-weight: 600;
                    color: #d4af37;
                    margin: 0;
                    letter-spacing: 0.01em;
                }
                .act-desc {
                    font-size: 0.72rem;
                    color: rgba(255,255,255,0.55);
                    margin: 2px 0 0;
                }
                .act-actions {
                    display: flex;
                    gap: 6px;
                    align-items: center;
                    flex-shrink: 0;
                }
                .act-btn {
                    background: linear-gradient(135deg, #d4af37 0%, #b89658 100%);
                    color: #0a0800;
                    border: none;
                    border-radius: 7px;
                    font-weight: 700;
                    font-size: 0.72rem;
                    letter-spacing: 0.06em;
                    text-transform: uppercase;
                    padding: 7px 12px;
                    cursor: pointer;
                    font-family: inherit;
                    transition: transform 0.18s ease, box-shadow 0.18s ease;
                }
                .act-btn:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(212,175,55,0.32); }
                .act-btn:disabled { opacity: 0.65; cursor: not-allowed; transform: none; }
                .act-dismiss {
                    background: transparent;
                    border: none;
                    color: rgba(255,255,255,0.4);
                    cursor: pointer;
                    font-size: 1.05rem;
                    line-height: 1;
                    padding: 4px 6px;
                    border-radius: 6px;
                    transition: color 0.18s ease, background 0.18s ease;
                }
                .act-dismiss:hover { color: #fff; background: rgba(255,255,255,0.08); }
                @media (max-width: 480px) {
                    #altorra-catalog-toast {
                        /* §84 — Mobile: top en lugar de bottom para evitar burbujas del bot */
                        left: 12px;
                        right: 12px;
                        bottom: auto;
                        top: 16px;
                        max-width: none;
                        transform: translateY(-20px);
                    }
                    #altorra-catalog-toast.act-visible { transform: translateY(0); }
                    #altorra-catalog-toast.act-leaving { transform: translateY(-20px); }
                }
                @media (prefers-reduced-motion: reduce) {
                    #altorra-catalog-toast { transition: opacity 0.2s ease; transform: none; }
                    #altorra-catalog-toast.act-visible,
                    #altorra-catalog-toast.act-leaving { transform: none; }
                }
            `;
            document.head.appendChild(style);
        }

        const toast = document.createElement('div');
        toast.id = 'altorra-catalog-toast';
        toast.setAttribute('role', 'status');
        toast.setAttribute('aria-live', 'polite');
        toast.innerHTML = `
            <div class="act-icon" aria-hidden="true">🆕</div>
            <div class="act-body">
                <p class="act-title">Nuevos vehículos disponibles</p>
                <p class="act-desc">Refrescá para ver el catálogo actualizado.</p>
            </div>
            <div class="act-actions">
                <button class="act-btn" id="act-refresh-btn" type="button">Ver</button>
                <button class="act-dismiss" id="act-dismiss-btn" type="button" aria-label="Descartar">×</button>
            </div>
        `;
        document.body.appendChild(toast);

        requestAnimationFrame(() => requestAnimationFrame(() => toast.classList.add('act-visible')));

        let dismissTimer = null;
        function dismissToast() {
            if (dismissTimer) { clearTimeout(dismissTimer); dismissTimer = null; }
            toast.classList.remove('act-visible');
            toast.classList.add('act-leaving');
            setTimeout(function () {
                if (toast.parentNode) toast.parentNode.removeChild(toast);
            }, 350);
        }

        document.getElementById('act-refresh-btn').addEventListener('click', function () {
            this.textContent = 'Cargando…';
            this.disabled = true;
            AltorraCache.clearAndReload();
        });
        document.getElementById('act-dismiss-btn').addEventListener('click', dismissToast);

        dismissTimer = setTimeout(dismissToast, 15_000); // patrón Intercom: 15s
    }

    /* ─── API pública ────────────────────────────────────────────── */
    const AltorraCache = {

        async get(key) {
            if (memoryCache.has(key)) return memoryCache.get(key);
            const val = await idbGet(STORE_DATA, key);
            if (val !== undefined) memoryCache.set(key, val);
            return val;
        },

        async set(key, value) {
            memoryCache.set(key, value);
            await idbSet(STORE_DATA, key, value);
        },

        /**
         * Limpia L1 (memoria) + L2 (IndexedDB) + L3 (localStorage de database.js).
         * El Service Worker no se toca aquí — se actualiza por su propio ciclo de vida.
         */
        async invalidate() {
            memoryCache.clear();
            localStorage.removeItem(DB_CACHE_KEY); // caché de database.js
            await idbClear();
            console.info('[AltorraCache] Caché L1/L2/L3 limpiada');
        },

        /**
         * Comprueba Firestore al cargar la página.
         * Si lastModified difiere del almacenado → invalida para que database.js
         * recargue desde Firestore en la próxima llamada a load().
         * @returns {Promise<boolean>} true = vigente, false = invalidado
         */
        async validateWithFirestore() {
            try {
                const remoteMeta = await fetchFirestoreLastModified();
                if (remoteMeta === null) return true; // sin red → conservar

                const localMeta = await idbGet(STORE_META, 'lastModified');

                if (localMeta === remoteMeta) return true; // vigente ✓

                // Datos cambiaron desde el último acceso
                await this.invalidate();
                await idbSet(STORE_META, 'lastModified', remoteMeta);
                console.info('[AltorraCache] Cambio del admin detectado en carga → caché limpiada');
                return false;

            } catch (err) {
                console.warn('[AltorraCache] validateWithFirestore error:', err);
                return true;
            }
        },

        /**
         * Verifica si hay un nuevo deploy de GitHub comparando deploy-info.json.
         * Si detecta versión nueva → limpia caché y muestra banner al usuario.
         * @returns {Promise<boolean>} true = mismo deploy, false = deploy nuevo detectado
         */
        async validateDeployVersion() {
            const remoteVer = await fetchDeployVersion();
            if (!remoteVer) return true; // sin red o archivo no existe → conservar

            const localVer = localStorage.getItem(DEPLOY_KEY);
            if (!localVer) {
                // Primera visita: solo guardar versión base, sin banner
                localStorage.setItem(DEPLOY_KEY, remoteVer);
                return true;
            }

            if (localVer === remoteVer) return true; // mismo deploy ✓

            // Nuevo deploy detectado → informar al usuario
            console.info('[AltorraCache] Nuevo deploy de GitHub:', remoteVer, '(antes:', localVer + ')');
            await this.invalidate();
            localStorage.setItem(DEPLOY_KEY, remoteVer);
            _smartNavPending = true; // §83 B1 — swap silente en próxima navegación
            armSmartNavigationUpdate();
            showUpdateBanner();
            return false;
        },

        /**
         * Marca el caché como fresco tras una carga exitosa desde Firestore.
         * Llamar desde database.js después de loadFromFirestore().
         */
        async markFresh(timestamp) {
            const ts = timestamp != null ? timestamp : Date.now();
            await idbSet(STORE_META, 'lastModified', ts);
        },

        /** Limpia todo y recarga la página. */
        async clearAndReload() {
            console.info('[AltorraCache] Limpieza total solicitada');

            // Marcar período de gracia ANTES de cualquier otra operación.
            localStorage.setItem(UPDATE_GRACE_KEY, Date.now().toString());
            // Clear banner dedup so it doesn't block legitimate future banners
            localStorage.removeItem(BANNER_SHOWN_KEY);

            await this.invalidate();
            sessionStorage.clear();

            // Si hay un SW esperando (installed pero no activated), activarlo ya.
            if ('serviceWorker' in navigator) {
                const reg = await navigator.serviceWorker.getRegistration();
                if (reg?.waiting) {
                    reg.waiting.postMessage({ type: 'SKIP_WAITING' });
                }
            }

            // Vaciar todos los cachés del Service Worker SIN desregistrarlo.
            // El SW sigue activo e intercepta todas las peticiones en el reload.
            // Sus estrategias de fetch usan cache: 'no-cache' / 'no-store',
            // así que con los cachés SW vacíos, TODA petición va directo al
            // servidor → resultado equivalente a Ctrl+Shift+R.
            if ('caches' in window) {
                const names = await caches.keys();
                await Promise.all(names.map(n => caches.delete(n)));
                console.info('[AltorraCache] SW caches vaciados:', names.length);
            }

            window.location.reload();
        }
    };

    /* ─── Service Worker Manager ─────────────────────────────────── */
    const SWManager = {

        register() {
            if (!('serviceWorker' in navigator)) return;
            navigator.serviceWorker.register('/service-worker.js')
                .then((reg) => {
                    // Check for SW updates every 5 minutes
                    setInterval(() => reg.update(), 5 * 60 * 1000);
                    // NOTE: We rely on SW_UPDATED message from activate event
                    // (sent by service-worker.js) instead of updatefound here
                    // to avoid duplicate banner triggers.
                    reg.addEventListener('updatefound', () => {
                        console.info('[SW] Update found — waiting for activation');
                    });
                })
                .catch(err => console.warn('[SW] Registro fallido:', err));
        },

        notifyUpdate() {
            // §83 B1 — También arma smart nav handler para que próxima navegación
            // aplique swap silente aunque el cliente no toque la pill.
            _smartNavPending = true;
            armSmartNavigationUpdate();
            showUpdateBanner();
        },

        setupListeners() {
            if (!('serviceWorker' in navigator)) return;

            // Guardar si ya había un SW activo antes de cualquier cambio.
            // Si no había controller previo es primera instalación → no notificar.
            const hadController = !!navigator.serviceWorker.controller;

            navigator.serviceWorker.addEventListener('message', (e) => {
                if (e.data?.type === 'SW_UPDATED') {
                    console.info('[SW] Actualizado a:', e.data.version);
                    this.notifyUpdate();
                }
            });

            // controllerchange: solo log. La notificación la maneja SW_UPDATED
            // (que ahora solo se emite en updates reales) y updatefound.
            // Eliminar el trigger de modal aquí evita una fuente de duplicados.
            navigator.serviceWorker.addEventListener('controllerchange', () => {
                console.info('[SW] Controller cambiado (controller:', !!navigator.serviceWorker.controller, ')');
            });
        }
    };

    /* ─── Inicialización ─────────────────────────────────────────── */
    async function init() {
        // 0. Período de gracia post-clearAndReload
        //    Si acabamos de hacer clearAndReload() en los últimos 30 s, suprimir
        //    TODAS las señales de actualización para no entrar en bucle infinito.
        const graceSince = Number(localStorage.getItem(UPDATE_GRACE_KEY) || 0);
        if (graceSince && (Date.now() - graceSince) < UPDATE_GRACE_MS) {
            _modalShown = true; // bloquea cualquier llamada a showUpdateBanner()
            localStorage.removeItem(UPDATE_GRACE_KEY);
            console.info('[AltorraCache] Grace period activo — modal suprimido tras reload de actualización');
        }

        // 1. Detectar deploy nuevo de APP_VERSION (hardcoded cambia en PR manuale)
        const storedVersion = localStorage.getItem(VERSION_KEY);
        if (storedVersion && storedVersion !== APP_VERSION) {
            console.info('[AltorraCache] Nueva versión de app:', APP_VERSION);
            await AltorraCache.invalidate();
        }
        localStorage.setItem(VERSION_KEY, APP_VERSION);

        // 2. Registrar Service Worker
        SWManager.register();
        SWManager.setupListeners();

        // 3. Checks asíncronos no bloqueantes (en idle o con delay)
        const runChecks = async () => {
            // 3a. Detectar deploy de GitHub (deploy-info.json)
            await AltorraCache.validateDeployVersion();

            // 3b. Detectar cambios del admin (Firestore system/meta)
            //     Solo si Firebase ya está listo; si no, esperar hasta 6s
            const waitForFirebase = () => new Promise(resolve => {
                if (window.db) { resolve(true); return; }
                const check = setInterval(() => {
                    if (window.db) { clearInterval(check); resolve(true); }
                }, 200);
                setTimeout(() => { clearInterval(check); resolve(false); }, 6000);
            });

            const firebaseReady = await waitForFirebase();
            if (firebaseReady) {
                // Validación en carga (para cuando el tab estaba cerrado mientras admin guardaba)
                await AltorraCache.validateWithFirestore();
                // Listener en tiempo real (para cuando el tab está abierto)
                startMetaListener(window.db);
            }
        };

        if (typeof requestIdleCallback !== 'undefined') {
            requestIdleCallback(runChecks, { timeout: 8000 });
        } else {
            setTimeout(runChecks, 1000);
        }

        // Polling periódico: detectar nuevos deploys mientras el tab sigue abierto
        startPolling();
    }

    /* ─── Arranque ───────────────────────────────────────────────── */
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    /* ─── Exponer API global ─────────────────────────────────────── */
    window.AltorraCache = AltorraCache;
    window.CacheManager = { clearAndReload: () => AltorraCache.clearAndReload() }; // alias legacy

})();
