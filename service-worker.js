// Service Worker for ALTORRA CARS
// Version 2.0.0 - Modern Caching Strategy
// Strategy: Network First for HTML, Stale-While-Revalidate for assets

const CACHE_VERSION = 'v20260513110000'; // §70 R7.1 hotfix — 3 bugs reportados por cliente tras §69: (1) toast falso "No tienes permisos para acceder a esta seccion" al refrescar como CEO porque el handler legacy de admin-auth.js:2317 chequeaba AP.canManageUsers() ANTES que loadProfileViaREST hidratara permissions[]. Fix: agregado guard `var profileReady = !!(AP.currentUserProfile)` y solo mostrar el toast si el perfil YA está cargado. Race condition resuelta. (2) En tabla sec-users el CEO aparecía como "SUPER ADMINISTRADOR" en vez de "CEO" porque `roles/system_super_admin.name` en Firestore tenía el label antiguo "Super Administrador" (sembrado pre-§69) + `usuarios/{uid}.roleName` denormalizado out of sync. Fix doble: (a) seedSystemRoles ahora hace UPDATE merge del doc role si existe (no skip): detecta drift en name/description/color/icon/permissions y actualiza canonical fields. (b) Tras el update de roles, re-sincroniza denormalización en TODOS los usuarios con ese roleId — re-escribe roleName y permissions[] denormalizados. Resultado: cliente ejecuta "Resembrar sistema" UNA vez y el CEO + todos los users con system_super_admin reflejan el nuevo label "CEO". (3) CEO editable desde sec-users (botones Editar/Eliminar visibles) — riesgo de modificar accidentalmente el rol o eliminar al super_admin. Fix triple: (a) renderUsersTable detecta CEO vía 3 vías defense-in-depth (roleId='system_super_admin' || rol='super_admin' || permissions contiene '*') y reemplaza botones Editar/Eliminar por icono lock dorado con tooltip "El CEO solo se gestiona desde Mi Perfil. Su rol no es modificable." (b) editUser() con guard programático: rechaza apertura del modal con toast info "El CEO solo se edita desde Mi Perfil". (c) deleteUserFn() con guard: toast error "El CEO no se puede eliminar". (d) CSS .v-act--locked variante dorada non-interactive con cursor:help. ACCIÓN OBLIGATORIA POST-MERGE: firebase deploy --only functions:seedSystemRoles + ejecutar "Resembrar sistema" desde sec-roles UNA vez (refresca CEO label + sincroniza usuarios). Próximo R7b: Cloud Function triggers para auto-propagar permissions cuando admin edita custom roles. Próximo R8: cleanup masivo. // §69 R7 — RBAC simplificación + Guard "Sin rol asignado". Cambios: (1) sec-users: eliminadas 3 cards informativas legacy (Super Admin/Editor/Viewer) — quien crea user ya conoce los roles desde el dropdown dinámico R3. (2) System roles reducidos a UNO solo: CEO (id system_super_admin preservado por retrocompat con R4 + rules R6, solo cambia label visible a "CEO" + descripción "Acceso absoluto al sistema. No se puede modificar, editar ni eliminar."). Editor + Viewer eliminados del catálogo rbac-catalog.js + del seeder functions/index.js (RBAC_SYSTEM_ROLES ahora 1 entry). Si docs roles/system_editor o system_viewer ya existen en Firestore (sembrados antes del §69), se mantienen intactos para retrocompat con users migrados R4 — pero seedSystemRoles ya NO los re-siembra. (3) CEO totalmente invisible/inmodificable en sec-roles UI: filtro client-side (snap callback) excluye system_super_admin/system_editor/system_viewer de la lista grid + guard defense-in-depth en openEditModal bloquea apertura del modal si por alguna razón se invoca con system role + banner "Los permisos de los roles del sistema no son editables..." eliminado del modal renderModal (ya no aplica porque modal nunca abre system role). (4) sec-users dropdown filtra editor/viewer (no aparecen como opciones para nuevos users). CEO sí aparece para asignar nuevos super_admin si el cliente lo decide. Si user actual ya tiene roleId='system_editor' o 'system_viewer', la opción legacy aparece marcada "(legacy)" para preservar selectedRoleId match. Default ya no es system_editor sino primer custom role disponible o CEO fallback. (5) Guard "Sin rol asignado" en admin-auth.js post-loadProfileViaREST: si user NO tiene permissions[] válidas Y NO es super_admin legacy (única auto-mapping conservada en LEGACY_TO_ROLE_ID del §69), muestra showAccessDenied con mensaje "No tienes roles asignados, contacta con un administrador". Casos cubiertos: editor/viewer legacy sin permissions[] denormalizado, user nuevo sin rol asignado, user con permissions:[] vacío explícito por reasignación de role borrado. super_admin legacy SIEMPRE pasa (mapLegacyRoleToPermissions retorna ['*']). (6) migrateLegacyUsers actualizado: solo CEO (system_super_admin) es prerequisito obligatorio. Editor + Viewer legacy se cargan opcionalmente si docs existen para retrocompat de migraciones previas. LEGACY_MAP server-side reducido a {super_admin: system_super_admin}. ACCIÓN OBLIGATORIA POST-MERGE: firebase deploy --only functions:seedSystemRoles,functions:migrateLegacyUsers (para que las nuevas versiones tomen efecto). Próximo R8 cleanup: eliminar definitivamente docs roles/system_editor y system_viewer + reset roleId de users con esos IDs.// §61.R6 — Sprint R6 RBAC: Firestore Rules refactor con hasPermission(perm) server-side. Nuevos helpers en firestore.rules (getUserPermissions, hasPermissionsField, hasPermission) que leen usuarios/{uid}.permissions[] denormalizado y soportan wildcard '*' (super_admin). 50+ callsites refactorizadas con OR fallback legacy preservado: vehiculos (create/update/delete + auditLog) → vehicles.create/edit/delete; concesionarios (read/create/update/delete) → dealers.*; marcas → brands.*; usuarios (read/create/update/delete) → users.*; clientes (read/update) → crm.read/edit; resenas → reviews.*; banners → banners.*; leads → crm.*; citas → appointments.*; mensajes → concierge.read/respond/delete; solicitudes → crm.edit/delete + appointments.edit; auditLog → audit.read/delete; automationLog → workflows.read + audit.delete; appointmentReminders → appointments.*; knowledgeBase → kb.create/edit/delete; unmatchedQueries → unmatched.read/promote/delete; events → audit.read/delete; conciergeChats (read/update/delete + messages create/delete) → concierge.read/respond/claim/transfer/close/reopen/delete; config → settings.theme/seo/backup + calendar.config + templates.edit; drafts_activos → vehicles.edit; system → settings.*; permissions/roles (R1) → roles.read/create/edit/delete. Estrategia: helpers legacy isSuperAdmin/isEditorOrAbove se MANTIENEN como secondary check via OR. Esto cierra el security gap del frontend-only (custom roles ahora son enforced backend) sin romper users no migrados (R4) ni callsites legacy. Cero impacto runtime hasta que el cliente ejecute deploy. ACCIÓN OBLIGATORIA POST-MERGE: firebase deploy --only firestore:rules. Próximo R7: Cloud Function triggers onRoleUpdated/onUserRoleAssigned para auto-propagar permissions[] denormalizado. // §61.R5 — Sprint R5 RBAC Pragmático: marcado @deprecated en 8 helpers base + 38 helpers AP.RBAC de admin-state.js (con equivalencia AP.hasPermission() en JSDoc para devs futuros + IDE strikethrough). Refactor demostración en archivos NUEVOS de R2/R3 (admin-roles.js isSuperAdmin local usa hasPermission '*' primero con fallback legacy; admin-users.js helper local _canManageUsers + 1 callsite refactorizado como ejemplo). CLAUDE.md §67 con mapping table completa legacy → hasPermission + distribución por archivo (~164 callsites para R8 cleanup) + pseudo-script para R8. Cero modificación de archivos legacy grandes (admin-vehicles, admin-crm, admin-concierge, etc.) — quedan intactos para R8 con tests E2E coordinados. Cero deploys nuevos. Custom roles ya funcionan correctamente desde R1+R4 vía delegación interna _check(permId, legacyFn). Próximo R6: rules backend con hasPermission() server-side. // §66.3 // §66.3 hotfix UX: modal de role del sistema (read-only) ahora muestra UN solo botón "Cerrar" en lugar de duplicar Cancelar+Cerrar. Custom roles mantienen Cancelar+Guardar (flow CRUD estándar). // §66.2 // §66.2 hotfix R2: eliminar orderBy compuesto del listener admin-roles.js (requería índice compuesto Firestore que no existe → ruido permanente en consola). Consolidado en un único listener simple que ordena client-side (system primero, luego alfabético). Roles es colección chica (<20 docs), ordenamiento client-side es trivial. Eliminado dead code startListenerSimple. Sin deploys nuevos. // §61.R4.1 // §61.R4.1 — Hotfix R4: el handler delegado de click en admin-roles.js solo filtraba clicks dentro de sec-roles + rolesModal, ignorando silenciosamente clicks dentro de migrationModal. Por eso al hacer click en "Ejecutar migración" no pasaba nada (preview funcionaba pero execute no). Fix microquirúrgico: agregar migModal al filtro. Cero impacto otros flows. Cliente debe Ctrl+Shift+R para invalidar cache previa. // §61.R4 // §61.R4 — Sprint R4 RBAC: migración usuarios legacy. Nueva Cloud Function migrateLegacyUsers (callable super_admin, idempotente, soporta dryRun:true para preview). Recorre todos los docs usuarios/ y para cada uno con campo legacy 'rol' pero sin roleId mapea via legacyMapping de R1 (super_admin → system_super_admin con permissions [*], editor → system_editor con 38 permissions, viewer → system_viewer con 17 permissions). Setea roleId/roleName/permissions[]/permissionsUpdatedAt/roleMigratedAt. Preserva campo rol legacy (retrocompat 154 callsites). Idempotente: skip si ya migrado. Skip silencioso para users sin rol (perfil incompleto) o rol desconocido. Pre-validación: aborta con mensaje claro si system roles no sembrados. Batch writes con cap 500 (Firestore limit). UI sec-roles: nuevo botón Migrar legacy en header (al lado de Resembrar sistema y Nuevo rol). Click → invoca dryRun → muestra modal de preview con stats grid (Total/A migrar/Ya migrados/Omitidos) + tabla detallada de plan (email, nombre, rol legacy, → role nuevo, count permisos) + sección colapsable de omitidos con razón. Botón Ejecutar migración → invoca callable real con dryRun:false → toast con summary. Empty state si todos ya migrados (banner verde). Estilos CSS coordinados (.migration-stats, .migration-plan-table sticky head, .migration-skipped-section colapsable). Acción cliente requerida POST-merge: firebase deploy --only functions:migrateLegacyUsers. Próximo R5: refactor masivo de los 154 callsites legacy a hasPermission(). // §61.R3 // §61.R3 — Sprint R3 RBAC: dropdown dinámico de roles en sec-users (Crear/Editar usuario). Reemplaza el <select> estático de 3 opciones (super_admin/editor/viewer) por <select id="uRoleId"> que lee roles/ via onSnapshot real-time, con optgroups Sistema + Personalizados. Listener globalmente activo en admin-users.js. Cache _rolesCache poblado en tiempo real. mapRoleToLegacy() infiere campo legacy  desde el role elegido (wildcard '*' → super_admin, system_X → match directo, custom → editor por default). Al guardar: callable existente createManagedUserV2/updateUserRoleV2 con  legacy (cero deploy backend) + escritura adicional al doc usuarios/{uid} con roleId/roleName/permissions[] denormalizado/permissionsUpdatedAt. Tabla de usuarios muestra roleName real con badge color custom + tag '·legacy' para users sin roleId. Filtro por roleId arriba de la tabla (incluye '__legacy__' para usuarios sin migrar). Validación frontend: roleId requerido. Cero impacto callsites legacy (R1+R2 garantizan co-existencia). Próximo R4: callable migrateLegacyUsers que migra todos los usuarios pre-existentes a roleId/permissions[] sin romper acceso. // §61.R2 — Sprint R2 RBAC: UI sec-roles CRUD. Nueva sección "Roles" en grupo Configuración del admin (super_admin only). Lista grid de roles con cards (system roles primero), badges "Sistema" + "Default", count de usuarios por rol, count de permisos. Modal crear/editar con permissions matrix tipo Linear/Stripe agrupada en 8 categorías colapsables (Inventario/Sitio público/CRM/Comunicaciones/Cerebro AI/Calendario/Reportes/Configuración) + checkbox master por categoría con estado indeterminate + indicador critical (icono triangle warn) en permisos sensibles + color picker + icon picker. Validaciones: name min 3 chars, color hex válido, al menos 1 permission, name único. System roles read-only (input readonly + checkboxes disabled). Delete con guard pre-check de users asignados (prompt reasignar antes). Botón "Sembrar roles del sistema" invoca seedSystemRoles callable (R1) — reemplaza flow DevTools. Listener onSnapshot real-time con orderBy compuesto + fallback simple si falta índice. Telemetría §61.R2 completa. Doctrinas: §17.4 HTML/CSS estable, §17.12 anti-MutationObserver, §35 cero pointermove, §37 IAP. Cero impacto callsites legacy (R1 ya garantizó co-existencia). Próximo R3: integrar dropdown dinámico de roles en sec-users. // §61.R1 // §61.R1 — RBAC Foundation: nuevo js/rbac-catalog.js (catálogo canónico 71 atomic permissions + 3 system roles + mapeo legacy → permissions). admin-state.js extendido con AP.currentUserPermissions[] + AP.hasPermission() + helpers legacy refactorizados con delegación interna (signatura externa idéntica → cero impacto en 154 callsites). admin-auth.js hidrata AP.currentUserPermissions desde profile.permissions[] o fallback legacy via AltorraRBACCatalog.mapLegacyRoleToPermissions(rol). Cloud Function nueva seedSystemRoles (callable super_admin only, idempotente) siembra colecciones permissions/ + roles/ con catálogo canónico. firestore.rules agrega match /permissions/{id} (read editor+, write Server-only) + match /roles/{id} (read editor+, write super_admin). Cero impacto producción si super_admin NO ejecuta seedSystemRoles. R2 agrega CRUD UI sec-roles. // §60.2 — Sprint S2 cirugía ALTOR Hub: Optimistic UI universal del cliente (concierge.js). Mensajes del usuario aparecen INSTANT con estados visuales canónicos pending(⏱)/sent(✓)/read(✓✓)/failed(⚠+Reintentar) estilo WhatsApp. syncMessageToFirestore confirma _status:'sent' al success o 'failed' al error. retryFailedMessage re-envía mensajes que fallaron. Telemetría §60.2 en escalateToLive (banner queue INSTANT) + markSessionFinalized (pantalla "Chat finalizado" INSTANT). // §60.1.1 — Hotfix Sprint S1: pre-check server en claimChat (evita UI flash falso cuando lista lateral stale) + mensajes amigables permission-denied/chat-not-found en los 2 callers (cncAdminClaimBtn handler + sendAsesorMessage). NO toca firestore.rules — el bug "Missing or insufficient permissions" requiere `firebase deploy --only firestore:rules` o verificar rol editor en Firebase Console. // §60.1 — Sprint S1 cirugía ALTOR Hub: Optimistic UI universal del admin (HubStore Object Pool estilo Linear + 7 botones admin con snapshot+rollback + estados visuales canónicos pending/sent/read/failed estilo WhatsApp + botón Reintentar para mensajes failed). Bubble del asesor aparece INSTANT (<16ms) en lugar de esperar 500ms-2s al server. Retrocompatibilidad con _activeMessages cache durante transición S1→S2. // §57.9 — Refactor INDUSTRY-STANDARD del flow cierre/reset (patrón Intercom/Drift/WhatsApp Business). open() ahora SIEMPRE auto-resetea si session.closed=true (sin importar closedReason). finalCloseAndCleanup simplificado: SOLO cierra panel, lazy clean en próxima apertura. Elimina race conditions del flow cleanSessionAndRender + close panel simultáneo. Plus: telemetría completa en panel.click + cleanSessionAndRender + open() para diagnosticar bugs futuros si persisten. Fix definitivo de "Cerrar chat → reabrir → conversación vieja" + "Iniciar nueva conversación no hace nada". // §57.8 — 3 botones en pantalla "Chat finalizado" (Descargar + Iniciar nueva + Cerrar chat) patrón Intercom/Drift/WhatsApp + fix radicado duplicado (id="cncClosedRadicado" en branch client_finalized) + defense-in-depth en open() para bug "Cerrar chat → reabrir → conversación vieja" (cleanSessionAndRender automático si closed && closedReason='client_finalized'). §57.7 — listener admin _chatsUnsub queda globalmente activo (no auto-cancel on section change) + heartbeat 30s self-healing. // §57.7 — fix admin no ve chat nuevo en tiempo real (cliente escala → admin no recibe sin refresh): _chatsUnsub queda GLOBALMENTE activo (NO se cancela al cambiar de sección). El cleanup hook §34 estaba cancelándolo al salir de sec-concierge → si cliente escalaba mientras admin estaba en otra sección, el listener no escuchaba y al volver había timing/race que perdía eventos. Ahora solo _messagesUnsub (chat específico) cancela on section change. Plus: heartbeat cada 30s self-healing — si listener cae silenciosamente (network drop, tab throttled, error no propagado), se reinicia automáticamente sin necesidad de refresh. §57.6 — fix snapshot tardío pisaba sesión nueva (_resetting flag) + admin cierre con botón Descargar también + diagnóstico detallado snapshot. §57.quint — fix unificado bugs cierre+reset: helper cleanSessionAndRender garantiza limpieza atómica + welcome render para finalCloseAndCleanup Y resetSession. §57.quat — 4 bugs tiempo real coordinados: (1) admin force fresh listener al entrar a sec-concierge + log diagnóstico (2) claim agrega mensaje system "asesor tomó" para que cliente vea (3) open() limpia inline styles forzados antes de aplicar .cnc-open (panel re-abre OK) (4) Bug 4 cubierto por §57.ter detail re-render. §57.ter — finalCloseAndCleanup robusto (forced inline styles) + admin realtime fix (re-render detail panel cuando active chat cambia en _chatsUnsub). §57.bis — fix botón "Cerrar chat" no respondía: migrado addEventListener directo a data-action delegation (sobrevive re-renders del closed-block). §57 — refactor flow finalización chat cliente: confirm coherente + pantalla "Chat finalizado" con Descargar PDF + Cerrar (sin reset automático). §56 — fix definitivo radicado push Telegram: re-trigger natural via onWrite (espera radicado canónico antes de enviar) en lugar de polling que caduca. §55 — fix race condition radicado en push Telegram (poll re-fetch hasta 3s) + disable_notification:false explícito (asegura sonido). §54 — onChatEscalatedTelegram con onDocumentWritten (capta CREATE con mode=queue) + sin pin region (auto-detect southamerica-east1 evita cross-region IAM) + logs verbosos al inicio. §53 — onChatEscalatedTelegram pinned a us-central1 (fix Eventarc 401 unauthorized en southamerica-east1) + dead code unificado. §52 — 3 fixes: (1) Trust mobile más robusto: NUEVO stableFingerprint (UA + screen + tz + platform + language + hwConcurrency) que NO incluye canvas/WebGL (esos pueden variar entre versiones de iOS Safari/Chrome). isDeviceTrusted Path C ahora prueba 3 estrategias en orden: deviceId match → stableFingerprint match → userAgent+screenSize match. saveDeviceTrust dedupea entries del mismo browser/device antes de agregar. backfillDeviceFingerprints inline migra entries viejos pre-§50 sin deviceId. (2) Banner SLA en Concierge: layout column en mobile/panel estrecho (<700px). Antes botones tenían min-width:140px que forzaba flex-row → text container quedaba con 0 width → cada palabra rompía línea vertical. Ahora column con icon → text → actions apilados, botones width:100%. Desktop ancho (≥700px) sigue en row clean. (3) Hamburger fuera del viewport en iPhone: topnav ahora respeta safe-area-inset-left/right (env()) + max-width:100vw + overflow:hidden + brand-text con text-overflow:ellipsis. Hamburger flex-shrink:0 garantiza que SIEMPRE se vea aunque otros elementos quieran ocupar espacio.
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
