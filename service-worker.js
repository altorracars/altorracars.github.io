// Service Worker for ALTORRA CARS
// Version 2.0.0 - Modern Caching Strategy
// Strategy: Network First for HTML, Stale-While-Revalidate for assets

const CACHE_VERSION = 'v20260629000408'; // §188 E6 paso 0: cita interna del clásico lleva kind:'cita' (sin él, el rebuild de las 5am borraba su reserva = double-booking) + createdBy whitelisted (E5 había roto la creación interna) + retirado botón/handler legacy "Convertir a solicitud" (duplicaba el doc entero → denegado + re-ingestión) + tag de admin-color-extract retirado y admin-desc-gen.js borrado (muertos en vida §188) + portal: hydrateProfile expulsa usuarios bloqueados (R-8). Server-side (sin impacto de cache): triggers cacheSignal (system/meta.lastModified al escribir vehiculos/marcas/banners/resenas) + onUsuarioBloqueadoSync (bloqueado→Auth disable) + loginAttempts cerrado en rules. PREV: §187 E5 blindaje: FIX soft-lead concierge (computeMeta REEMPLAZABA el lead → merge como contact.js; el soft-lead vuelve a llegar completo al CRM). Rules SEC-01/06/08 + retry-audit = server-side (sin impacto de cache). PREV: §186 E4 CRM: estado 'apartado' visible en la web con badge (database.js filtro default + render.js badge-apartado + autocomplete main.js + bot inventory-search/concierge) + favoritos/historial notifican apartado + admin legacy (option disabled gestionada por CRM, labels, colores av2, filtro inventario). PREV: §184 E2 tanda 2: F21 SSoT disponibilidad (admin-calendar-config lee/escribe config/availability mapeado; tabs viejos editan el canónico; admin-appointments set→merge) + comm-schema estado 'caducada' (hold-expiry F19). PREV: §177 E0 CRM: F17 cupos transaccionales + F1 lead inmutable. PREV: §175 FIX form contacto: el éxito nunca se pintaba (spinner "Enviando..." eterno + _inFlight atascado) — el rediseño cinematic de contacto.html eliminó .form-card y contact.js dependía de closest('.form-card') para renderizar la confirmación → fallback al propio <form> (js/public/contact.js). Detectado en E2E live TODO-17; el write a `solicitudes` SÍ ocurría (solo fallaba la UI). PREV: §164 Newsletter→CRM (form público roto → escribe `subscriptions` → trigger onSubscriptionCreated → contacto subscriber) + §163 registro de cuenta → contacto (onClienteCreated). Cambio en index.html (form + nota Habeas Data) + js/public/home/home.js (initNewsletter). PREV: §157 FIX rectángulo negro del hero (causa raíz REAL): el <footer class="cin-hero-foot"> matcheaba la regla GLOBAL body footer{background:linear-gradient(...)} de dark-theme.css:688 (footer del sitio) → fondo oscuro de borde a borde de la fila (de "+N vehículos" a "Vende con nosotros"). Fix: .cin-hero-foot{background:transparent} en css/home/cinematic.css. El intento previo (quitar backdrop-filter del buscador) NO era la causa → revertido. Solo Ctrl+Shift+R. PREV: §150.f dropdown "Vehículos" Opción A: ELIMINADA la columna "Por condición" (Nuevos/Usados enviaban a busqueda.html?tipo= que se IGNORA → mostraba los 27; además el filtro nuevo/usado YA existe en el panel "Tipo de Vehículo" de busqueda + database.js filtra por v.tipo). Dropdown ahora = columna "Por categoría" (SUV/Sedán/Pickup/Hatchback) + CTA full-width "Ver todos los vehículos"→busqueda.html. Panel 580→300px single-column (.nav-dd). index.html + snippets/header.html + chrome-redesign.css (.nav-dd width + .nav-dd-all). PREV: §150.e dropdown "Vehículos": eliminado el enlace DUPLICADO "Camionetas" de la columna "Por condición" (apuntaba a vehiculos-pickup.html, mismo destino que "Pickup" en "Por categoría") en index.html + snippets/header.html. La categoría Pickup ya cubre camionetas (decisión cliente). Pura remoción de markup, el snippet propaga a las 64+ páginas con header dinámico. PREV: §150.d FIX layout dropdown "Vehículos": el panel colapsaba a ~120px (ancho del trigger) porque la regla universal * { max-width:100% } de style.css:6450 acotaba el width:580px de .nav-dd a su containing-block (.nav-dd-wrap ≈120px) → la grilla 2-col (~316px) se desbordaba del panel near-black. Fix: .nav-dd-pro { max-width:none } en chrome-redesign.css (vence al * por especificidad 0,1,0; el * no es !important). Verificado por render local (preview http-server): 120px→580px. Pura CSS, markup/JS intactos. PREV: §150.c dropdown "Vehículos" ABRE por hover/focus en TODAS las páginas (CSS puro en chrome-redesign.css; antes solo en el index vía home-chrome.js) + panel del dropdown calentado (rgba(28,26,32) frío → rgba(13,11,9,.95) near-black). PREV: §150.b (feedback QA-2): superficies oscurecidas a NEAR-BLACK (#1A1613→#0D0B09, stops →#0A0806, paneles filtro rgba near-black; el cliente las quería NEGRAS como el index, no gris-cálido) + QuickTools dock SIEMPRE visible (eliminado el hide-on-scroll de initScrollBehavior). PREV: §150 (1) skip-link de §149 REMOVIDO (decisión cliente: "no aparece + inútil"). (2) FIX consistencia de diseño: paleta cinematic CALENTADA globalmente (índigo→cálido) — --cin-bg-elev #15121A→#1A1613, --cin-bg-soft #0E0C10→#100D0A, stops #100d16→#120F0B, paneles de filtro rgba(26,22,34)/(16,13,22)→cálidos. Mata el "azul" del catálogo, unifica con el index. PREV: §149 A11Y-04 skip-link "Saltar al contenido" (CSS .skip-link en style+base-redesign + enlace en snippet header/index + ensureMainLandmark() en components.js inserta #main tras el header en todas las páginas; aditivo, transform §17.2 / sin observer §3.5; cierra lóbulo §48 6/6). + §148 validación post-launch + fixes: (1) enlace roto simulador-credito → busqueda.html (era catalogo.html inexistente) + placeholder admin. (2) A11Y-03 contraste --cin-ink-faint 0.32→0.50 (≈4.7:1, WCAG AA 1.4.3). Auditoría: JS de prod 100% limpio (node -c); deuda técnica TODO-09..13 verificada (ya resuelta o preservada por §17.4 — nada seguro+valioso que tocar). PREV: §147 a11y quick wins (lóbulo §48): A11Y-02 <h1 sr-only> en 4 landings + A11Y-05 :focus-visible dorado global (soft-redesign, cubre catálogo) + A11Y-06 @prefers-reduced-motion (soft-redesign) + A11Y-01 aria-label en controles de filtro (marca + 4 landings + busqueda; 18 marcas/* heredan vía cron regen). Aditivo, ids/names/JS intactos. PREV: §146 4 landings SEO indexables (vehiculos-suv/pickup/sedan/hatchback) cinematic: <body data-cin> + soft-redesign + REUSO css/home/marca-cinematic.css (estructura idéntica a marca.html → DRY, cero CSS nuevo). Los 3 redirects (vehiculos-usados/nuevos/camionetas) quedan INTACTOS (redirect 0s noindex, no se ven). Páginas estáticas: sin regen. JS/IDs/scripts intactos. PREV: §145 (1) Fix nav: header "Marcas" → marcas.html (antes index.html#marcas/carrusel) en snippets/header.html + index.html inline. (2) marcas.html (índice de marcas) cinematic: alineado a tokens --cin-* + Instrument Serif/Manrope (era dark+dorado legacy Poppins/#d4af37) vía css/home/marcas-cinematic.css. Sin regen. PREV: §144 marca.html (template) cinematic (SP-5.3.c): <body data-cin> + soft-redesign + css/home/marca-cinematic.css (hero + brand-header serif + sidebar filtros glass + tarjetas .vehicle-card cinematic + paginación). 18 marcas/* regeneradas; JS (loadVehicles/filtros/render) INTACTO. PREV: §143 busqueda.html cinematic (SP-5.3.b): <body data-cin> + soft-redesign + css/home/busqueda-cinematic.css (hero serif + filtros glass + tarjetas .vehicle-card cinematic + paginación). renderVehicles/filtros-avanzados/performSearch INTACTOS; página estática (sin regen). PREV: §142 Eliminar Descripción de vehículo: tab del detalle + campo/generador admin (admin-desc-gen huérfano) + búsqueda + noscript SEO; 27 páginas regeneradas; el campo `descripcion` queda DORMIDO en Firestore (no se borra). PREV: §141 SP-5.3 pulido detalle (post-validación): fix glow dorado hover ficha (override dark-theme) + fix fondo blanco características (override style.css .feature-item) + descripción editorial (desc-key dorado) + glass (info-card/descripción blur) + refinamiento cinematic (acentos, dots, precio). CSS+JS, sin regen. PREV: §140 SP-5.3 Fase 2/3: detalle-vehiculo → cinematic + de-monolitizado (<body data-cin>, markup Opción A 27 IDs/hooks intactos, css/home/detalle-cinematic.css reescrito, 4 módulos js/public/detalle/, favorito/comparar/sticky cableados, 27 páginas regeneradas). Solo Ctrl+Shift+R. PREV: §117 Plan B+C theming: §B texto legible sobre acento — token --ak-on-accent por paleta (gold=#1a1310 oscuro, blue/violet/emerald/crimson/cyan=#fff) en tokens.css :root + admin-theme-engine.css 6 bloques. ~24 callsites color:#1a1310/#1a1a1a (sobre gradientes var(--vis-brand-*)/--ak-*: botones/badges/pills/chips/avatares/skip-link/note+transfer initials, incl !important) → var(--ak-on-accent,#fallback) en admin.css/admin-visionary.css/admin-v2.css/admin-topnav.css. §C tints más vibrantes: --nova-tint-gold 0.10→0.14, --nova-acrylic-tint-gold 0.06→0.10, --nova-reveal-color 0.16→0.20 + dedup: eliminados bloques legacy html.theme-blue/html.theme-violet de admin.css (ya cubiertos por las 6 paletas del engine). Cero schema, cero deploy backend, solo Ctrl+Shift+R. PREV: §116 Plan A: superficies (Mica/Acrylic/vis-surface) teñidas con el acento activo vía color-mix(in srgb, base-fria X%, rgb(var(--ak-rgb))) en css/admin-theme-engine.css :root. Lazy var() → 1 definición tiñe las 6 paletas + dorado, CERO ediciones a ~101 consumidores. Light/high-contrast intactos (usan --bg-* aparte). PREV: // §115 Theme Engine + fix toast-spam picker. Motor cromático css/admin-theme-engine.css (6 paletas gold/blue/violet/emerald/crimson/cyan) carga ÚLTIMA en admin.html y redefine todo el set --ak-* de acento. Tokens --ak-* (gold por defecto) añadidos a css/tokens.css :root. Remap masivo de ~838 literales dorados (#b89658/#d4ad6e/#9a7d44/#c9a663/#d4af37 + rgba 184,150,88 / 212,175,55 / 212,173,110 / 201,166,99) → var(--ak-*,#hex) en admin.css/admin-visionary.css/admin-v2.css/admin-topnav.css/admin-perf-kill.css vía sed validado (0 residuales, 0 double-wrap, braces/parens balanceados). admin-theme-picker.js: bind único idempotente (_atpBound flag + delegación que sobrevive innerHTML, sin re-attach por render) + skip applyTheme/toast si t===tema activo → cero spam de notificaciones. Expandido THEMES/THEME_META de 3 a 6 paletas. PREV: // §114 Depuración total roles antiguos → rol del sistema (roleName) en todos lados. Resolver canónico AP.resolveRoleLabel(userOrRol) en admin-state.js (roleName→cargo→legacy-legible vía _legacyRoleLabel) reemplaza 3 helpers duplicados. Sitios crude corregidos: admin-performance.js:158 (Performance del equipo — el de la captura), admin-auth.js topbar+sidebar+Sesiones Activas, admin-appointments.js dropdown asesor, admin-presence-ui.js, admin-topnav.js. CARGO del perfil ahora read-only (input readonly+aria + hint "se asigna automáticamente según tu rol") espejo de roleName — admin-profile.js ya no lee/escribe cargo (removido de _initialState/readForm/saveProfile updates). Sync Firebase: onRoleUpdated escribe cargo=after.name a user docs, onUserRoleAssigned sync+cleanup cargo, migrateLegacyUsers cargo=targetRole.name, seedSystemRoles resync incluye cargoDrift+cargo. admin-users.js rbacData escribe cargo al asignar rol. Anti-loop: onRoleUpdated→onUserRoleAssigned retorna early (roleId sin cambiar §71). Cero schema nuevo; requiere firebase deploy --only functions. PREV: // §113 Contador en tiempo real para Marcas (paridad con #vehiclesCount). renderBrandsTable actualiza #brandsCount con totalBrands + 'marca(s)'. PREV: // §112 FIX DEFINITIVO borradores desaparecen al Ctrl+Shift+R (§111 falló — su causa raíz era equivocada). Causa raíz REAL verificada por §19 RCA: attachToRouter (admin-v2-core.js:148) corría cleanup(prevSection) en CADA onChange sin guard newSection!==prevSection. go('vehiculos') dispara notifyChange('vehiculos') DOS VECES (explícito en router:151 + MutationObserver al flip de .active por btn.click). El 2º disparo (prevSection ya='vehiculos') ejecutaba cleanup('vehiculos') → teardown desuscribía el listener de borradores RECIÉN suscrito por loadData ANTES de su primer onSnapshot → galería "Mis borradores" nunca se poblaba tras refresh. Los borradores NO se borraban de Firestore, solo no aparecían. Fix: 1 línea — guard prevSection!==newSection en attachToRouter (cleanup solo al navegar a sección DISTINTA, nunca en notifyChange duplicado de la misma). Cero schema, cero deploy backend, solo Ctrl+Shift+R. PREV: // §111 FIX borradores se borran al Ctrl+Shift+R + no aparece la seccion: causa raiz = §108 saveDraft OPTIMISTA renderizaba la galeria + toast de exito SINCRONOS pero el .set() en background fallaba silenciosamente (Firestore Compat rechaza undefined/sparse arrays — _images con huecos de un upload pendiente/fallido) y el .catch SOLO nuleaba _lastSavedSnapshot, nunca quitaba la fila fantasma → el borrador parecia guardado pero NO se persistia → al hard refresh el onSnapshot solo trae lo realmente guardado en Firestore (nada) → galeria vacia + panel oculto. Fix: (1) getFormSnapshot limpia _images a strings validos (filter typeof string && u). (2) sanitizeForFirestore recursivo elimina undefined/sparse antes del set(). (3) saveDraft rollback de la galeria en .catch (re-render sin el borrador fantasma + reset _currentDraftId + toast de error real). (4) startDraftsListener retry-once en error transitorio del onSnapshot (WebChannel stale-token race §8) con presupuesto reseteado en snapshot OK. PREV: // §110 Eliminar borrador: eliminacion OPTIMISTA + rollback. El toast "borrador eliminado" aparecia pero la fila NO se iba porque deleteDraftFromGallery dependia solo del onSnapshot (que el cleanup §34 cancela al salir de vehiculos / o el borrador era optimista nunca confirmado) + deleteDraft tragaba el error con .catch silencioso asi que .then() siempre disparaba el toast de exito sin rollback. Fix: _renderActiveDrafts(kept) instantaneo + deleteDraft propaga el error + rollback en .catch (re-render con el borrador). Cero schema, cero deploy. PREV: // §108 Drafts 4 fixes: (1) panel "Mis borradores" aparece al instante tras guardar via insercion optimista _renderActiveDraftsOptimistic + re-suscripcion del listener al ENTRAR a vehiculos (AltorraSections.onChange) ya no queda muerto al volver. (2) dirty-check en closeModalFn vs _lastSavedSnapshot/_originalSnapshot: borrador ya guardado sin ediciones NO re-pregunta al cerrar. (3) confirm() nativo reemplazado por modal custom showDraftCloseConfirm con botones Si/No (no Aceptar/Cancelar). (4) saveDraft OPTIMISTA: toast+cierre+galeria instantaneos, Firestore .set() en background con rollback en error. _lastSavedSnapshot reset en add/edit/restore. Cero schema, cero deploy, solo Ctrl+Shift+R. PREV: // §107 Sistema de borradores REESCRITO desde cero: subcoleccion multi-borrador usuarios/{uid}/drafts/{draftId} (auto-id), estado _currentDraftId, SIN autosave silencioso (asi "No" en el prompt de cierre NO guarda nada), SIN auto-restaurar al Agregar Vehiculo, guardado explicito (#saveDraftBtn + prompt al cerrar X), galeria "Mis borradores" por cuenta con Retomar/Eliminar por id, borrar borrador al publicar, aislamiento por cuenta (eliminado drafts_activos compartido), preservados nombres startDraftsListener/stopDraftsListener/restoreAndOpenDraft (callsites admin-sync §17.4), cero firestore.rules deploy (subcoleccion ya soportaba multi-doc). PREV §106 Wizard vehículo 3 fixes: (1) modal más ancho min(1140px,96vw) no alto. (2) dropdowns ilegibles fix — modales son HERMANOS de #adminPanel así que .admin-panel select option nunca los alcanzaba; agregadas reglas .modal-overlay select/option/optgroup dark bg #1a1a1c texto blanco en admin-visionary.css (admin-only). (3) drafts estilo TikTok — quitado confirm() molesto de Agregar Vehiculo (form limpio siempre), panel #activeDraftsPanel ahora muestra SIEMPRE borrador propio con botones Retomar+Eliminar (otros admins filtrados >2h), resumeOwnDraft/deleteOwnDraft + data-action handlers. Cero schema, cero deploy backend, solo Ctrl+Shift+R. PREV §105 Wizard vehículo REORGANIZACIÓN por modelo mental del usuario (Kavak/Carvana/MercadoLibre). 6 secciones nuevas reagrupadas: Identificación (marca/modelo/year/categoria/km/tipo-derivado/placa/fasecolda) → Specs (transmision/combustible/motor/potencia/cilindraje/traccion/direccion/color/puertas/pasajeros) → Comercial (precio/precioOferta/estado/ubicacion/concesionario/revision/peritaje/oferta-hidden) → Fotos → Detalle (caracteristicas+descripcion) → Publicación (destacado/featured/prioridad/cutout+smartfields review). Resuelve 3 clashes: km+tipo juntos (tipo deriva de km), estado/ubicacion→comercial (logística ES comercial), catch-all "Estado" 11-campos dividido (marketing→Publicación, garantía+origen→Comercial). WIZARD_STEPS array actualizado en admin-phase5.js. Field IDs preservados verbatim (§17.4: vTipo→hidden+vTipoDisplay, vOferta→hidden). data-toggle = body IDs. Cero schema, cero deploy backend, solo Ctrl+Shift+R. PREV §104 Wizard vehículo refactor completo (Sprints A-E): A.1 dedup toast Reordenar + A.2 modal 880px wizard scrollable. B.1 vTipo auto-detect por km (0=nuevo/≤10k=semi-nuevo/>10k=usado, dropdown→hidden+vTipoDisplay readonly + deriveTipoFromKm en input listener). B.2 vOferta auto-derive de precioOferta (checkbox→hidden). B.3 fotos auto-sort alfanumérico localeCompare numeric + primera=portada (uploadFileToStorage resuelve URL/null, handleFiles slot-array). C.1 botón generar descripción movido de BASICA a tab EXTRAS. C.2 Smart Fields preview reubicado al final. D.1 caracteristicas textarea→checkboxes dinámicos por categoría (FEAT_CATEGORIES: featSeguridad/featConfort/featTecnologia/featExterior/featInterior) + #btnAddFeature agrega nueva caract. con saveLists() sync a config/listas + sec-lists (renderFeatureCheckboxes, collectAllFeatures, loadFeaturesIntoForm render-first). E drafts audit: E.1 stopDraftsListener evita listener huérfano drafts_activos tras logout (admin-sync stopRealtimeSync). E.2 declinar borrador NO lo destruye (checkForDraft return false). E.3 deriveTipoFromKm tras restore. E.4 snapshot incluye _images+vConcesionario+vConsignaParticular+features completas (collectAllFeatures, no solo uncategorized). E.5 formHasData unificado via snapshotHasAnyData. Cero schema, cero deploy backend. Solo Ctrl+Shift+R. PREV §A Sprint A formulario vehículo: A.1 dedup toast "Reordenar" (notify.resetTimer(_reorderToastId,4000) evita acumulación al click repetido + dismiss al salir) + A.2 wizard 6 pasos legible (#vehicleModal .modal max-width 880px + .wizard-steps overflow-x auto scroll-snap + scrollbar oculto). PREV §103 admin: reorder inventario por INSERCIÓN en vista LISTA (estándar Shopify/Notion) — grip de arrastre + línea indicadora de drop + posiciones secuenciales globales (top=mayor, spacing 10). Elimina swap+window.confirm. Reorder fuerza vista lista (no tarjetas) y opera sobre TODO el inventario sin filtros/paginación (Shopify manual-sort). Inserción real con re-render optimista + batch solo docs que cambian. CSS .av2-row--reorder/.av2-row-grip/.av2-row-pos/.av2-row--drag-over-top/bottom. Cero schema, cero deploy backend. PREV §101.1 admin: FIX causa raíz REAL de los boxes en cada hijo de las cards. admin-visionary.css:1896 [class*="-card"] matcheaba por SUBSTRING todos los hijos av2-card-title/-meta/-price/-codeflat/-subline (todos contienen "-card") y les aplicaba background+border+radius con especificidad (0,11,0) que vencía a admin-v2.css → cada línea de info en su propio box (vehículos y marcas). Fix: agregado :not([class*="av2-card"]) al catch-all (el sistema av2-card tiene su estilo propio completo en admin-v2.css) + bloque reset !important en hijos de texto plano. Resultado: cards HarmonyOS flat sin boxes anidados. Cero JS, cero schema, cero deploy backend. PREV: // §101 admin: Card view limpia y corporativa (vehiculos + marcas). Vehiculo card: estado como overlay sobre imagen (patron Kavak/CarGurus), codigo texto plano mono (sin pill box .av2-card-codeflat), tipo+concesionario como subline plano (.av2-card-subline) — eliminados 3 pills apilados (codigo/status inline/badge tipo). Checkbox como overlay top-left sobre imagen. Marca card: nombre UNA sola vez (alt="" en logo para no mostrar nombre al romper img + dedup descripcion que iguala al nombre via descNorm!==nombreNorm), count como texto plano (.av2-card-subline--brand sin pill), id pill ELIMINADO (redundante con slug), layout centrado .av2-card--brand con logo prominente. CSS aditivo en admin-v2.css §101 (clases nuevas, .av2-card-code/.av2-card-status/.av2-card-badge-count legacy preservadas para compat). Cero JS admin core tocado fuera de _vehicleCardHTML/brand card branch. Cero schema, cero deploy backend. Solo Ctrl+Shift+R. PREV: §100 admin: Toggle Tarjetas↔Lista (default Lista) + limpieza HarmonyOS en Vehiculos y Marcas. Vista lista densa escaneable (patron Linear/Notion/Stripe) para gestion de inventario, cards via 1 click, persistido localStorage (altorra_vehicles_view/altorra_brands_view). Estado en lista = dot+texto SIN box/burbuja. Toggle segmented control en toolbar de ambas secciones. _vehicleActionsHTML/_brandActionsHTML extraidos DRY. Reorder vehiculos fuerza cards. Cero deploy backend, solo Ctrl+Shift+R. PREV: // §98 admin: FCM prompt deja de salir en cada login (localStorage cooldown 3d en vez de sessionStorage) + handler foreground onMessage (push se muestra in-app cuando el Hub está abierto, antes se perdía silenciosamente) + fix badge CRM "0" fantasma (admin-crm.js escribía total crudo → topnav mostraba "0"; ahora delega a AltorraSidebarBadges hide-on-zero + syncBadges normaliza "0"→vacío). Cero deploy backend. Solo Ctrl+Shift+R. PREV: // §95 FIX hero invisible (real) + ELIMINACIÓN margin-top:70px en TODOS los heros del sitio. §95.A: heroindex-1920.avif/.webp NUNCA existieron (imagen fuente max 1280px, optimizer NO hace upscaling) — preload + <picture> source srcset del index.html referenciaban 1920w → 404 + cache miss + JS .hero-img-loaded fallaba al detectar el load del <img>. Fix: eliminar variant 1920w de preload y <picture> en index.html, mantener solo 480/768/1280 (que sí existen). nosotros.html intacto (esa imagen sí tiene 1920). §95.B: margin-top:70px legacy en TODOS los heros del sitio creaba gap NEGRO visual entre header (position:fixed top:0) y el inicio del hero — el header fixed NO ocupa espacio en el flow, el margin era innecesario. 7 callsites limpiados: css/hero.css (.hero), css/dark-theme.css (body .brand-hero + .gradient-hero + mobile .brand-hero 56px), index.html critical CSS inline (.hero), nosotros.html critical CSS (.about-hero), marcas.html critical CSS (.marcas-hero desktop + mobile). Resultado: header fixed flota encima del top del hero (intencional, los primeros ~80px quedan tapados pero el hero mide 720px, contenido sigue centrado vertical visible). Cliente percibe header+hero "fundidos" sin gap visual. // §92 FIX hero invisible post-§91 + ELIMINACIÓN total particles + §93 Sprint 3B Lazy loading universal. hero invisible post-§91 + ELIMINACIÓN total particles + §93 Sprint 3B Lazy loading universal. §92: hero del home no aparecía tras §91 — causa raíz <picture> display:inline no contenía visualmente al <img class=hero-bg-img position:absolute>. Fix: regla CSS `.hero > picture { position:absolute; inset:0; z-index:0; display:block }` + override `.hero-bg-img { max-width: none }` para vencer regla universal img{max-width:100%} de style.css. JS inline con fail-safe setTimeout(reveal, 2000ms) que añade .hero-img-loaded incondicional si load event nunca dispara. Particles ELIMINADAS completamente: 32 HTMLs limpiados (8 <div class=hero-particle> por hero × 14 root + 18 marcas/* = ~256 nodos DOM removidos) + bloques CSS .hero-particles/.hero-particle/@keyframes particleFloat de hero.css/dark-theme.css/performance-fixes.css (3 archivos) + ref en js/performance.js selector. CSS inline residuos huérfanos limpiados en nosotros.html (keyframe particleFloat fragmentado) y marcas.html (línea 55). Cero referencia a particle queda en producción. Bot ALTOR sparkles intactos (NO son particles, son altorSparkleA/B). §93 Sprint 3B: 56 <img> tags below-the-fold ahora con loading=lazy + decoding=async en 29 archivos (detalle-vehiculo template + 27 vehiculos/*.html generados + nosotros.html). Skip inteligente: 62 ya tenían loading attr, 67 above-fold por class/id, 2 con fetchpriority=high LCP, 6 dentro de comentarios HTML, 32 dentro de <script>. FCP esperado -10-20% en páginas con muchas imgs (vehículos generados). // §91 Sprint 3A Imágenes responsive — Fase 3 Performance. scripts/optimize-images.mjs: agregados 2 TARGETS nuevos (multimedia/nosotros-hero.webp + multimedia/categories/camioneta.jpg). GitHub Actions workflow optimize-images.yml dispara automático al detectar el cambio del script y genera 16 variants nuevas (8 cada uno: AVIF/WebP × 480/768/1280/1920). index.html: hero LCP refactor — <picture> con <source type=image/avif> + <source type=image/webp> + <img class=hero-bg-img> srcset 4 tamaños. Background-image legacy de .hero::after eliminado de hero.css, reemplazado por .hero-bg-img absolute position con cross-fade idéntico. JS inline observa el <img>.load real (no Image() virtual). Preload del head reemplazado por 2 preloads (AVIF + WebP) con imagesrcset + type → browser elige uno solo según soporte, ignora el otro. Category cards 4 (SUV/camioneta/SEDAN/HATCHBACK) wrap con <picture> srcset. nosotros.html: misma refactor del .about-hero — <picture> con <img class=about-hero-bg> + preload AVIF/WebP en head. CSS .about-hero::before legacy eliminado, reemplazado por .about-hero-bg position absolute. LCP esperado -40-60% en mobile (AVIF ~70% más liviano que WebP/JPG). Cero JS admin tocado, cero schema Firestore, cero deploy backend. Workflow optimize-images.yml corre tras push automático. // §90 Sprint Fase 4 SEO técnica: generator emite schema Car expandido + BreadcrumbList + OG/Twitter cards en marcas. h1 sr-only Cartagena en index/busqueda. // §89 PENDIENTE-B R8 grande: refactor 174 callsites legacy → AP.hasPermission. // §88 C-S10 Internal notes + Transferencias entre asesores. // §87 C-S9 CSAT + Auto-resolve idle chats + Dashboard métricas Concierge. // §86 C-S8 Welcome contextual + Progressive profiling + Quick replies dinámicos + Carousel vehicle cards. // §82-§84 Smart Update Prompts. // §80 staleness guard concierge. // §75-§79 Mega-Plan §59 ALTOR Hub S3-S7. // §63-§73.4 Plan §61 RBAC dinámico (R1-R8 mini cleanup).
const CACHE_NAME = `altorra-cars-${CACHE_VERSION}`;
const RUNTIME_CACHE = `altorra-runtime-${CACHE_VERSION}`;

// Assets that NEVER change between deploys (logos only — NOT category images)
// Category images (/multimedia/categories/) are intentionally excluded:
// they change between deploys and must always be fetched fresh (networkFirst).
const STATIC_ASSETS = [
    '/multimedia/vehicles/placeholder-car.jpg',
    '/multimedia/Logos/Chevrolet.webp',
    '/multimedia/Logos/Nissan.webp',
    '/multimedia/Logos/Renault.webp',
    '/multimedia/Logos/Kia.webp',
    '/multimedia/Logos/Mazda.webp',
    '/multimedia/Logos/Toyota.webp',
    '/multimedia/Logos/Hyundai.webp',
    '/multimedia/Logos/Ford.webp'
];

// Install - precache only essential static assets
self.addEventListener('install', (event) => {
    console.log('[SW] Installing version:', CACHE_VERSION);

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[SW] Precaching static assets');
                return cache.addAll(STATIC_ASSETS);
            })
            .then(() => {
                // Force activation immediately
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[SW] Installation failed:', error);
            })
    );
});

// Activate - clean old caches, take control, notify ONLY on real updates
self.addEventListener('activate', (event) => {
    console.log('[SW] Activating version:', CACHE_VERSION);

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                // Identify old caches to delete
                const toDelete = cacheNames.filter(
                    (n) => n !== CACHE_NAME && n !== RUNTIME_CACHE
                );
                // isRealUpdate: true only when there were previous caches
                // (genuine version bump). False on first install / after unregister.
                const isRealUpdate = toDelete.length > 0;

                return Promise.all(toDelete.map((n) => {
                    console.log('[SW] Deleting old cache:', n);
                    return caches.delete(n);
                })).then(() => isRealUpdate);
            })
            .then((isRealUpdate) => self.clients.claim().then(() => isRealUpdate))
            .then((isRealUpdate) => {
                if (!isRealUpdate) {
                    // First install or post-unregister reinstall — do NOT notify.
                    // Notifying here would cause an infinite reload loop because
                    // clearAndReload() unregisters the SW and immediately triggers
                    // a fresh install on the next page load.
                    console.log('[SW] First install — skipping SW_UPDATED notification');
                    return;
                }
                console.log('[SW] Real update detected — notifying clients');
                return self.clients.matchAll().then((clients) => {
                    clients.forEach((client) => {
                        client.postMessage({
                            type: 'SW_UPDATED',
                            version: CACHE_VERSION
                        });
                    });
                });
            })
    );
});

// Fetch - Different strategies based on request type
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests
    if (url.origin !== location.origin) {
        return;
    }

    // Skip chrome-extension and other non-http requests
    if (!request.url.startsWith('http')) {
        return;
    }

    // STRATEGY 1: Network Only for JSON data files (always fresh)
    if (request.url.includes('.json')) {
        event.respondWith(networkOnly(request));
        return;
    }

    // STRATEGY 2: Network First for HTML pages (fresh content priority)
    if (request.headers.get('accept')?.includes('text/html') ||
        request.url.endsWith('.html') ||
        request.url.endsWith('/')) {
        event.respondWith(networkFirst(request));
        return;
    }

    // STRATEGY 3: Network First for hero/category/banner images (they change between deploys)
    if (url.pathname.startsWith('/multimedia/categories/') ||
        url.pathname.startsWith('/multimedia/banner/') ||
        url.pathname.startsWith('/multimedia/heroes/')) {
        event.respondWith(networkFirst(request));
        return;
    }

    // STRATEGY 3.5: Network First for critical JS (SP-5.0.f) — historial-visitas.js
    // tenía un bug de 1500ms debounce que perdía visitas; stale-while-revalidate
    // servía la versión vieja en páginas de detalle aunque el index estuviera
    // refreshed. Para JS de core y public/home preferimos frescura sobre velocidad:
    // network primero, cache solo si offline.
    if (url.pathname.startsWith('/js/core/') ||
        url.pathname.startsWith('/js/public/home/')) {
        event.respondWith(networkFirst(request));
        return;
    }

    // STRATEGY 4: Stale-While-Revalidate for stable assets (CSS, JS, logos)
    event.respondWith(staleWhileRevalidate(request));
});

// Network Only - Always fetch from network, bypass HTTP cache entirely
async function networkOnly(request) {
    try {
        return await fetch(request, { cache: 'no-store' });
    } catch (error) {
        console.warn('[SW] Network only failed:', error.message || error);
        return new Response('Network error', { status: 503 });
    }
}

// Network First - Try network (revalidating HTTP cache), fallback to SW cache
async function networkFirst(request) {
    try {
        // cache: 'no-cache' forces browser to revalidate with server (conditional GET).
        // Without this, fetch() can return stale content from browser HTTP cache
        // (GitHub Pages sends max-age=600) even after SW caches are cleared.
        const networkResponse = await fetch(request, { cache: 'no-cache' });

        if (networkResponse.ok) {
            const cache = await caches.open(RUNTIME_CACHE);
            cache.put(request, networkResponse.clone());
        }

        return networkResponse;
    } catch (error) {
        console.log('[SW] Network failed, trying cache:', request.url);
        const cachedResponse = await caches.match(request);
        if (cachedResponse) return cachedResponse;
        return caches.match('/index.html');
    }
}

// Stale-While-Revalidate - Return cache immediately, revalidate in background
async function staleWhileRevalidate(request) {
    const cache = await caches.open(RUNTIME_CACHE);
    const cachedResponse = await caches.match(request);

    // Revalidate in background — cache: 'no-cache' ensures a conditional GET
    // so we always get fresh content when the asset has changed on the server.
    const fetchPromise = fetch(request, { cache: 'no-cache' })
        .then((networkResponse) => {
            if (networkResponse.ok) {
                cache.put(request, networkResponse.clone());
            }
            return networkResponse;
        })
        .catch(() => null);

    if (cachedResponse) return cachedResponse;

    // No cache — wait for network (happens after clearAndReload)
    const networkResponse = await fetchPromise;
    return networkResponse || new Response('Asset not found', { status: 404 });
}

// Message handler - Allow forced updates
self.addEventListener('message', (event) => {
    console.log('[SW] Message received:', event.data);

    if (event.data?.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data?.type === 'GET_VERSION') {
        event.source.postMessage({
            type: 'VERSION_INFO',
            version: CACHE_VERSION
        });
    }
});

console.log('[SW] Service Worker loaded - Version:', CACHE_VERSION);
