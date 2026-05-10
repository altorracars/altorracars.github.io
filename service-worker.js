// Service Worker for ALTORRA CARS
// Version 2.0.0 - Modern Caching Strategy
// Strategy: Network First for HTML, Stale-While-Revalidate for assets

const CACHE_VERSION = 'v20260513170000'; // §73.3 fix flicker + eliminar botón "Inicializar sistema" duplicado: cliente reportó que en sec-roles aparece brevemente (50-200ms) la pantalla "Inicializar el sistema de roles" con botón "Inicializar sistema" que luego desaparece. Causa raíz: el primer render usaba defaults (_state.ceoExists=false) → entraba al Caso A "Inicializar sistema" → al llegar el snapshot Firestore (~50-200ms después), _state.ceoExists=true → re-render con Caso B "Creá tu primer rol personalizado". Doble flicker. Plus el botón "Inicializar sistema" del Caso A era duplicado del botón "Resembrar sistema" del header (que siempre está visible) → redundante. Solución: (1) Nuevo flag _state.firstSnapshotReceived que se setea a true en el primer snap callback. Antes del primer snapshot, render() muestra solo el header sin empty state — elimina el flicker. (2) Caso A ELIMINADO completamente. Empty state unificado: si ceoExists=true → "Creá tu primer rol personalizado" + botón "Crear nuevo rol". Si ceoExists=false (caso edge) → "Sistema sin inicializar" + texto que dirige al botón "Resembrar sistema" del header (UNA sola fuente de verdad, cero duplicación). (3) Comentarios explicativos en el código documentando el por qué del cambio. Resultado para el cliente: tras Ctrl+Shift+R en sec-roles ya no aparece la pantalla "Inicializar sistema" parpadeante. Solo se ve el header (vacío milisegundos) → empty state correcto inmediatamente. Cero deploy backend. // §73.2 auto-hide inteligente: cliente reportó tras §73.1 que ya ejecutó la limpieza legacy y el sistema está limpio ("Sistema limpio. No quedan docs huérfanos de system_editor ni system_viewer en Firestore, ni usuarios con esos roleId"). Pregunta si los 3 botones legacy siguen siendo necesarios. Solución: los botones "Limpiar legacy" y "Migrar legacy" ahora se OCULTAN automáticamente cuando el sistema está limpio (cero docs huérfanos en Firestore + cero users con roleId apuntando a system_editor/viewer + cero users con campo `rol` legacy sin roleId). Detector en startListener snap callback (track _state.hasLegacyDocs) + refreshUserCounts (track _state.hasLegacyUsersWithSystemRoleId + _state.hasLegacyUsersWithoutRoleId). renderRolesHeader condiciona visibilidad. refreshHeaderIfLegacyChanged() re-renderiza in-place el header si la detección async cambia los flags (memoiza últimos valores para evitar re-render innecesario). "Resembrar sistema" se mantiene SIEMPRE visible (utility de mantenimiento legítima para futuras actualizaciones del catálogo canónico). "Nuevo rol" siempre visible (CTA principal). Resultado para el cliente: header ahora solo muestra "Resembrar sistema" + "Nuevo rol" (sistema limpio). Si en el futuro alguien crea manualmente un doc system_editor/viewer desde Firestore Console, o llega un user nuevo con rol legacy sin roleId, los botones reaparecen automáticamente para corregirlo. Cero deploy backend. // §73.1 hotfix — botón "Limpiar legacy" no aparecía en sec-roles cuando había CEO pero 0 customs. Causa raíz: el header de acciones (cleanup-legacy/migrate-legacy/seed/new) solo se renderizaba dentro del branch when _state.roles.length>0. Si el cliente tenía CEO sembrado + 0 customs, entraba al empty state y el header desaparecía. Fix: extraer header a función renderRolesHeader() y renderearlo SIEMPRE para super_admin (también en empty states caso A "Inicializar sistema" y caso B "Creá tu primer rol"). Acciones admin (Limpiar legacy, Migrar legacy, Resembrar sistema, Nuevo rol) ahora siempre visibles cuando el CEO entra a sec-roles. // §73 R8 mini cleanup masivo: 3 fixes coordinados client-side. (1) Dropdown #uRoleId con texto corto "— Sin roles disponibles —" cuando no hay customs configurados + nueva función updateSaveButtonState que disable botón Guardar con tooltip + hint visible debajo "Primero creá un rol en Configuración → Roles". Esto evita el error del browser "Selecciona un elemento de la lista" y previene crear users huérfanos sin roleId que quedarían bloqueados al login por el guard del §69. (2) renderUsersTable detecta usuarios con roleId apuntando a system_editor o system_viewer (legacy del §69 que ya no existen en catálogo dinámico) y los muestra con badge "Sin asignar" gris neutral en lugar del label stale "EDITOR"/"VIEWER". Eliminado tag "·legacy" confuso al lado del badge. Filter "__legacy__" del dropdown ahora incluye estos huérfanos. (3) NUEVO botón "Limpiar legacy" en sec-roles header (super_admin only) con icono archive-x. Click invoca cleanupLegacyRolesPreview() que en paralelo: (a) chequea existencia de docs roles/system_editor + roles/system_viewer en Firestore. (b) cuenta usuarios con roleId en [system_editor, system_viewer]. Renderiza modal de preview con stats grid (docs a eliminar + usuarios a orphan) + tabla detallada email/nombre/antes/después + warning visible que usuarios afectados quedan bloqueados al login con "Sin rol asignado". Doble confirm() antes de ejecutar (acción destructiva). executeLegacyCleanup() ejecuta CLIENT-SIDE PURO usando Firestore Compat SDK directo (cero deploy backend): batch1 update usuarios con FieldValue.delete() para roleId/roleName + permissions=[] + markers _orphanedFromRole/_orphanedFromRoleName/_orphanedAt/_orphanedBy/_orphanedReason='cleanup-legacy-§73-R8'. batch2 delete docs roles/system_editor + roles/system_viewer si existen. Audit log entry type='roles.cleanup-legacy' con conteos y autor. Ejecución serial: usuarios primero → docs después (preserva integridad si delete falla). Toast con summary + close modal + refresh user counts. Garantía de seguridad: firestore.rules R6 ya permite estas operaciones porque CEO tiene wildcard '*' (delete docs roles/ + update usuarios/). CERO deploy backend requerido. Cliente solo ejecuta el botón desde sec-roles UI y queda Firebase limpio sin restos legacy. Tras ejecutar, los users quedarán bloqueados con "Sin rol asignado" del §69 hasta que CEO les asigne un custom role real. // §72 R7.2 hotfix UX — 3 bugs reportados por cliente tras §71 con captura sec-users + sec-roles + dropdown filter: (1) CEO aparece como "SUPER ADMINISTRADOR" en sec-users + dropdown porque depende de roleName/role.name denormalizado en Firestore que está stale del §69 y el cliente no ejecutó "Resembrar sistema". FIX cliente-side puro: renderUsersTable + populateRolesDropdown ahora muestran "CEO" HARDCODED si el user es super_admin (detección 3 vías: roleId='system_super_admin' || rol='super_admin' || permissions contiene '*'). Desacoplamos UI del estado del seeder backend — funciona independientemente de si el cliente ejecutó deploy o no. Plus: CEO ELIMINADO del dropdown de creación de usuarios — el cliente confirmó "el CEO es el DIOS del sistema, no se puede crear, modificar, ni eliminar". Solo aparece en el dropdown si selectedRoleId='system_super_admin' (edit defensive, ya bloqueado por §70 guard). (2) sec-roles muestra empty state "Aún no hay roles configurados — Sembrá los 3 roles del sistema (Super Admin, Editor, Lector)" porque _state.roles está vacío (system roles filtrados por §69) PERO el mensaje confunde al cliente que ya tiene CEO sembrado. FIX: snapshot callback ahora trackea `_state.ceoExists`. Empty state inteligente con 2 casos: (A) ceoExists=false → "Inicializar el sistema de roles" + botón "Inicializar sistema" (caso pre-§61 R1, primera vez). (B) ceoExists=true && customs.length===0 → "Creá tu primer rol personalizado — El rol CEO está activo (vos). Ahora podés crear roles para asesores, lectores o cualquier perfil que necesites" + botón "Crear nuevo rol" (caso post-§69, esperado). (3) Filter dropdown de sec-users muestra "Editor / Lector / Super Administrador / Sin rol asignado (legacy)" — system roles legacy aparecen aunque admin-roles UI los oculta. Inconsistencia entre dropdown del modal (§69 R7 los filtra) y filter dropdown (no los filtraba). FIX renderRolesFilter: excluye system_super_admin/editor/viewer del loop, agrega CEO una sola vez al inicio si existe, label "Sin rol asignado" sin "(legacy)" (más claro). Cero deploy backend requerido — todo client-side. Cliente solo Ctrl+Shift+R y los 3 bugs desaparecen sin necesidad de re-ejecutar nada manualmente. // §71 R7b — RBAC auto-propagation triggers. 4 Cloud Functions nuevas en functions/index.js (~470 líneas append): (1) onRoleUpdated trigger onDocumentUpdated roles/{id} → si name/permissions/color cambió, re-sync TODOS usuarios con ese roleId via batch writes cap 500. Audit log entry type='role.updated' con conteo de usuarios afectados. (2) onRoleDeleted trigger onDocumentDeleted roles/{id} → para usuarios con ese roleId, setea roleId=null + roleName=null + permissions=[]. Quedan bloqueados con pantalla "Sin rol asignado" (§69 guard) hasta reasignación manual. Alerta crítica si se eliminó system role (defense-in-depth, rules backend ya lo bloquean). (3) onUserRoleAssigned trigger onDocumentUpdated usuarios/{uid} cuando roleId cambia → lee role doc nuevo y copia name/permissions denormalizado. Cubre admin que cambia roleId desde Firestore Console o desde sec-users JS. Anti-loop: filter por roleId change, no reacciona a cambios de permissions/name (que vienen de onRoleUpdated). (4) recalculateRoleUserCount schedule every 5 min, recorre usuarios/, cuenta por roleId, actualiza roles/{id}.userCount si difiere. Permite que sec-roles UI muestre count real sin client-side recalc. Anti-loops por design: onRoleUpdated escribe SOLO roleName/permissions (no roleId) → no triggea onUserRoleAssigned (que filtra por roleId change). onUserRoleAssigned escribe roleName/permissions → no cambia roleId → no se vuelve a triggear. onRoleDeleted setea roleId=null → triggea onUserRoleAssigned con guard `!after.roleId` que solo limpia permissions sin recursión. ELIMINA dependencia del cliente de hacer "Resembrar sistema" manual del §70: ahora cuando admin edita un custom role desde sec-roles, los usuarios con ese role heredan automáticamente los nuevos permisos en tiempo real. ACCIÓN OBLIGATORIA POST-MERGE: firebase deploy --only functions:onRoleUpdated,functions:onRoleDeleted,functions:onUserRoleAssigned,functions:recalculateRoleUserCount. Próximo R8: cleanup masivo (eliminar docs system_editor/system_viewer + refactor 164 callsites legacy AP.isSuperAdmin → AP.hasPermission + eliminar campo rol legacy + cleanup OR fallback en rules). // §70 R7.1 hotfix — 3 bugs reportados por cliente tras §69: (1) toast falso "No tienes permisos para acceder a esta seccion" al refrescar como CEO porque el handler legacy de admin-auth.js:2317 chequeaba AP.canManageUsers() ANTES que loadProfileViaREST hidratara permissions[]. Fix: agregado guard `var profileReady = !!(AP.currentUserProfile)` y solo mostrar el toast si el perfil YA está cargado. Race condition resuelta. (2) En tabla sec-users el CEO aparecía como "SUPER ADMINISTRADOR" en vez de "CEO" porque `roles/system_super_admin.name` en Firestore tenía el label antiguo "Super Administrador" (sembrado pre-§69) + `usuarios/{uid}.roleName` denormalizado out of sync. Fix doble: (a) seedSystemRoles ahora hace UPDATE merge del doc role si existe (no skip): detecta drift en name/description/color/icon/permissions y actualiza canonical fields. (b) Tras el update de roles, re-sincroniza denormalización en TODOS los usuarios con ese roleId — re-escribe roleName y permissions[] denormalizados. Resultado: cliente ejecuta "Resembrar sistema" UNA vez y el CEO + todos los users con system_super_admin reflejan el nuevo label "CEO". (3) CEO editable desde sec-users (botones Editar/Eliminar visibles) — riesgo de modificar accidentalmente el rol o eliminar al super_admin. Fix triple: (a) renderUsersTable detecta CEO vía 3 vías defense-in-depth (roleId='system_super_admin' || rol='super_admin' || permissions contiene '*') y reemplaza botones Editar/Eliminar por icono lock dorado con tooltip "El CEO solo se gestiona desde Mi Perfil. Su rol no es modificable." (b) editUser() con guard programático: rechaza apertura del modal con toast info "El CEO solo se edita desde Mi Perfil". (c) deleteUserFn() con guard: toast error "El CEO no se puede eliminar". (d) CSS .v-act--locked variante dorada non-interactive con cursor:help. ACCIÓN OBLIGATORIA POST-MERGE: firebase deploy --only functions:seedSystemRoles + ejecutar "Resembrar sistema" desde sec-roles UNA vez (refresca CEO label + sincroniza usuarios). Próximo R7b: Cloud Function triggers para auto-propagar permissions cuando admin edita custom roles. Próximo R8: cleanup masivo. // §69 R7 — RBAC simplificación + Guard "Sin rol asignado". Cambios: (1) sec-users: eliminadas 3 cards informativas legacy (Super Admin/Editor/Viewer) — quien crea user ya conoce los roles desde el dropdown dinámico R3. (2) System roles reducidos a UNO solo: CEO (id system_super_admin preservado por retrocompat con R4 + rules R6, solo cambia label visible a "CEO" + descripción "Acceso absoluto al sistema. No se puede modificar, editar ni eliminar."). Editor + Viewer eliminados del catálogo rbac-catalog.js + del seeder functions/index.js (RBAC_SYSTEM_ROLES ahora 1 entry). Si docs roles/system_editor o system_viewer ya existen en Firestore (sembrados antes del §69), se mantienen intactos para retrocompat con users migrados R4 — pero seedSystemRoles ya NO los re-siembra. (3) CEO totalmente invisible/inmodificable en sec-roles UI: filtro client-side (snap callback) excluye system_super_admin/system_editor/system_viewer de la lista grid + guard defense-in-depth en openEditModal bloquea apertura del modal si por alguna razón se invoca con system role + banner "Los permisos de los roles del sistema no son editables..." eliminado del modal renderModal (ya no aplica porque modal nunca abre system role). (4) sec-users dropdown filtra editor/viewer (no aparecen como opciones para nuevos users). CEO sí aparece para asignar nuevos super_admin si el cliente lo decide. Si user actual ya tiene roleId='system_editor' o 'system_viewer', la opción legacy aparece marcada "(legacy)" para preservar selectedRoleId match. Default ya no es system_editor sino primer custom role disponible o CEO fallback. (5) Guard "Sin rol asignado" en admin-auth.js post-loadProfileViaREST: si user NO tiene permissions[] válidas Y NO es super_admin legacy (única auto-mapping conservada en LEGACY_TO_ROLE_ID del §69), muestra showAccessDenied con mensaje "No tienes roles asignados, contacta con un administrador". Casos cubiertos: editor/viewer legacy sin permissions[] denormalizado, user nuevo sin rol asignado, user con permissions:[] vacío explícito por reasignación de role borrado. super_admin legacy SIEMPRE pasa (mapLegacyRoleToPermissions retorna ['*']). (6) migrateLegacyUsers actualizado: solo CEO (system_super_admin) es prerequisito obligatorio. Editor + Viewer legacy se cargan opcionalmente si docs existen para retrocompat de migraciones previas. LEGACY_MAP server-side reducido a {super_admin: system_super_admin}. ACCIÓN OBLIGATORIA POST-MERGE: firebase deploy --only functions:seedSystemRoles,functions:migrateLegacyUsers (para que las nuevas versiones tomen efecto). Próximo R8 cleanup: eliminar definitivamente docs roles/system_editor y system_viewer + reset roleId de users con esos IDs.// §61.R6 — Sprint R6 RBAC: Firestore Rules refactor con hasPermission(perm) server-side. Nuevos helpers en firestore.rules (getUserPermissions, hasPermissionsField, hasPermission) que leen usuarios/{uid}.permissions[] denormalizado y soportan wildcard '*' (super_admin). 50+ callsites refactorizadas con OR fallback legacy preservado: vehiculos (create/update/delete + auditLog) → vehicles.create/edit/delete; concesionarios (read/create/update/delete) → dealers.*; marcas → brands.*; usuarios (read/create/update/delete) → users.*; clientes (read/update) → crm.read/edit; resenas → reviews.*; banners → banners.*; leads → crm.*; citas → appointments.*; mensajes → concierge.read/respond/delete; solicitudes → crm.edit/delete + appointments.edit; auditLog → audit.read/delete; automationLog → workflows.read + audit.delete; appointmentReminders → appointments.*; knowledgeBase → kb.create/edit/delete; unmatchedQueries → unmatched.read/promote/delete; events → audit.read/delete; conciergeChats (read/update/delete + messages create/delete) → concierge.read/respond/claim/transfer/close/reopen/delete; config → settings.theme/seo/backup + calendar.config + templates.edit; drafts_activos → vehicles.edit; system → settings.*; permissions/roles (R1) → roles.read/create/edit/delete. Estrategia: helpers legacy isSuperAdmin/isEditorOrAbove se MANTIENEN como secondary check via OR. Esto cierra el security gap del frontend-only (custom roles ahora son enforced backend) sin romper users no migrados (R4) ni callsites legacy. Cero impacto runtime hasta que el cliente ejecute deploy. ACCIÓN OBLIGATORIA POST-MERGE: firebase deploy --only firestore:rules. Próximo R7: Cloud Function triggers onRoleUpdated/onUserRoleAssigned para auto-propagar permissions[] denormalizado. // §61.R5 — Sprint R5 RBAC Pragmático: marcado @deprecated en 8 helpers base + 38 helpers AP.RBAC de admin-state.js (con equivalencia AP.hasPermission() en JSDoc para devs futuros + IDE strikethrough). Refactor demostración en archivos NUEVOS de R2/R3 (admin-roles.js isSuperAdmin local usa hasPermission '*' primero con fallback legacy; admin-users.js helper local _canManageUsers + 1 callsite refactorizado como ejemplo). CLAUDE.md §67 con mapping table completa legacy → hasPermission + distribución por archivo (~164 callsites para R8 cleanup) + pseudo-script para R8. Cero modificación de archivos legacy grandes (admin-vehicles, admin-crm, admin-concierge, etc.) — quedan intactos para R8 con tests E2E coordinados. Cero deploys nuevos. Custom roles ya funcionan correctamente desde R1+R4 vía delegación interna _check(permId, legacyFn). Próximo R6: rules backend con hasPermission() server-side. // §66.3 // §66.3 hotfix UX: modal de role del sistema (read-only) ahora muestra UN solo botón "Cerrar" en lugar de duplicar Cancelar+Cerrar. Custom roles mantienen Cancelar+Guardar (flow CRUD estándar). // §66.2 // §66.2 hotfix R2: eliminar orderBy compuesto del listener admin-roles.js (requería índice compuesto Firestore que no existe → ruido permanente en consola). Consolidado en un único listener simple que ordena client-side (system primero, luego alfabético). Roles es colección chica (<20 docs), ordenamiento client-side es trivial. Eliminado dead code startListenerSimple. Sin deploys nuevos. // §61.R4.1 // §61.R4.1 — Hotfix R4: el handler delegado de click en admin-roles.js solo filtraba clicks dentro de sec-roles + rolesModal, ignorando silenciosamente clicks dentro de migrationModal. Por eso al hacer click en "Ejecutar migración" no pasaba nada (preview funcionaba pero execute no). Fix microquirúrgico: agregar migModal al filtro. Cero impacto otros flows. Cliente debe Ctrl+Shift+R para invalidar cache previa. // §61.R4 // §61.R4 — Sprint R4 RBAC: migración usuarios legacy. Nueva Cloud Function migrateLegacyUsers (callable super_admin, idempotente, soporta dryRun:true para preview). Recorre todos los docs usuarios/ y para cada uno con campo legacy 'rol' pero sin roleId mapea via legacyMapping de R1 (super_admin → system_super_admin con permissions [*], editor → system_editor con 38 permissions, viewer → system_viewer con 17 permissions). Setea roleId/roleName/permissions[]/permissionsUpdatedAt/roleMigratedAt. Preserva campo rol legacy (retrocompat 154 callsites). Idempotente: skip si ya migrado. Skip silencioso para users sin rol (perfil incompleto) o rol desconocido. Pre-validación: aborta con mensaje claro si system roles no sembrados. Batch writes con cap 500 (Firestore limit). UI sec-roles: nuevo botón Migrar legacy en header (al lado de Resembrar sistema y Nuevo rol). Click → invoca dryRun → muestra modal de preview con stats grid (Total/A migrar/Ya migrados/Omitidos) + tabla detallada de plan (email, nombre, rol legacy, → role nuevo, count permisos) + sección colapsable de omitidos con razón. Botón Ejecutar migración → invoca callable real con dryRun:false → toast con summary. Empty state si todos ya migrados (banner verde). Estilos CSS coordinados (.migration-stats, .migration-plan-table sticky head, .migration-skipped-section colapsable). Acción cliente requerida POST-merge: firebase deploy --only functions:migrateLegacyUsers. Próximo R5: refactor masivo de los 154 callsites legacy a hasPermission(). // §61.R3 // §61.R3 — Sprint R3 RBAC: dropdown dinámico de roles en sec-users (Crear/Editar usuario). Reemplaza el <select> estático de 3 opciones (super_admin/editor/viewer) por <select id="uRoleId"> que lee roles/ via onSnapshot real-time, con optgroups Sistema + Personalizados. Listener globalmente activo en admin-users.js. Cache _rolesCache poblado en tiempo real. mapRoleToLegacy() infiere campo legacy  desde el role elegido (wildcard '*' → super_admin, system_X → match directo, custom → editor por default). Al guardar: callable existente createManagedUserV2/updateUserRoleV2 con  legacy (cero deploy backend) + escritura adicional al doc usuarios/{uid} con roleId/roleName/permissions[] denormalizado/permissionsUpdatedAt. Tabla de usuarios muestra roleName real con badge color custom + tag '·legacy' para users sin roleId. Filtro por roleId arriba de la tabla (incluye '__legacy__' para usuarios sin migrar). Validación frontend: roleId requerido. Cero impacto callsites legacy (R1+R2 garantizan co-existencia). Próximo R4: callable migrateLegacyUsers que migra todos los usuarios pre-existentes a roleId/permissions[] sin romper acceso. // §61.R2 — Sprint R2 RBAC: UI sec-roles CRUD. Nueva sección "Roles" en grupo Configuración del admin (super_admin only). Lista grid de roles con cards (system roles primero), badges "Sistema" + "Default", count de usuarios por rol, count de permisos. Modal crear/editar con permissions matrix tipo Linear/Stripe agrupada en 8 categorías colapsables (Inventario/Sitio público/CRM/Comunicaciones/Cerebro AI/Calendario/Reportes/Configuración) + checkbox master por categoría con estado indeterminate + indicador critical (icono triangle warn) en permisos sensibles + color picker + icon picker. Validaciones: name min 3 chars, color hex válido, al menos 1 permission, name único. System roles read-only (input readonly + checkboxes disabled). Delete con guard pre-check de users asignados (prompt reasignar antes). Botón "Sembrar roles del sistema" invoca seedSystemRoles callable (R1) — reemplaza flow DevTools. Listener onSnapshot real-time con orderBy compuesto + fallback simple si falta índice. Telemetría §61.R2 completa. Doctrinas: §17.4 HTML/CSS estable, §17.12 anti-MutationObserver, §35 cero pointermove, §37 IAP. Cero impacto callsites legacy (R1 ya garantizó co-existencia). Próximo R3: integrar dropdown dinámico de roles en sec-users. // §61.R1 // §61.R1 — RBAC Foundation: nuevo js/rbac-catalog.js (catálogo canónico 71 atomic permissions + 3 system roles + mapeo legacy → permissions). admin-state.js extendido con AP.currentUserPermissions[] + AP.hasPermission() + helpers legacy refactorizados con delegación interna (signatura externa idéntica → cero impacto en 154 callsites). admin-auth.js hidrata AP.currentUserPermissions desde profile.permissions[] o fallback legacy via AltorraRBACCatalog.mapLegacyRoleToPermissions(rol). Cloud Function nueva seedSystemRoles (callable super_admin only, idempotente) siembra colecciones permissions/ + roles/ con catálogo canónico. firestore.rules agrega match /permissions/{id} (read editor+, write Server-only) + match /roles/{id} (read editor+, write super_admin). Cero impacto producción si super_admin NO ejecuta seedSystemRoles. R2 agrega CRUD UI sec-roles. // §60.2 — Sprint S2 cirugía ALTOR Hub: Optimistic UI universal del cliente (concierge.js). Mensajes del usuario aparecen INSTANT con estados visuales canónicos pending(⏱)/sent(✓)/read(✓✓)/failed(⚠+Reintentar) estilo WhatsApp. syncMessageToFirestore confirma _status:'sent' al success o 'failed' al error. retryFailedMessage re-envía mensajes que fallaron. Telemetría §60.2 en escalateToLive (banner queue INSTANT) + markSessionFinalized (pantalla "Chat finalizado" INSTANT). // §60.1.1 — Hotfix Sprint S1: pre-check server en claimChat (evita UI flash falso cuando lista lateral stale) + mensajes amigables permission-denied/chat-not-found en los 2 callers (cncAdminClaimBtn handler + sendAsesorMessage). NO toca firestore.rules — el bug "Missing or insufficient permissions" requiere `firebase deploy --only firestore:rules` o verificar rol editor en Firebase Console. // §60.1 — Sprint S1 cirugía ALTOR Hub: Optimistic UI universal del admin (HubStore Object Pool estilo Linear + 7 botones admin con snapshot+rollback + estados visuales canónicos pending/sent/read/failed estilo WhatsApp + botón Reintentar para mensajes failed). Bubble del asesor aparece INSTANT (<16ms) en lugar de esperar 500ms-2s al server. Retrocompatibilidad con _activeMessages cache durante transición S1→S2. // §57.9 — Refactor INDUSTRY-STANDARD del flow cierre/reset (patrón Intercom/Drift/WhatsApp Business). open() ahora SIEMPRE auto-resetea si session.closed=true (sin importar closedReason). finalCloseAndCleanup simplificado: SOLO cierra panel, lazy clean en próxima apertura. Elimina race conditions del flow cleanSessionAndRender + close panel simultáneo. Plus: telemetría completa en panel.click + cleanSessionAndRender + open() para diagnosticar bugs futuros si persisten. Fix definitivo de "Cerrar chat → reabrir → conversación vieja" + "Iniciar nueva conversación no hace nada". // §57.8 — 3 botones en pantalla "Chat finalizado" (Descargar + Iniciar nueva + Cerrar chat) patrón Intercom/Drift/WhatsApp + fix radicado duplicado (id="cncClosedRadicado" en branch client_finalized) + defense-in-depth en open() para bug "Cerrar chat → reabrir → conversación vieja" (cleanSessionAndRender automático si closed && closedReason='client_finalized'). §57.7 — listener admin _chatsUnsub queda globalmente activo (no auto-cancel on section change) + heartbeat 30s self-healing. // §57.7 — fix admin no ve chat nuevo en tiempo real (cliente escala → admin no recibe sin refresh): _chatsUnsub queda GLOBALMENTE activo (NO se cancela al cambiar de sección). El cleanup hook §34 estaba cancelándolo al salir de sec-concierge → si cliente escalaba mientras admin estaba en otra sección, el listener no escuchaba y al volver había timing/race que perdía eventos. Ahora solo _messagesUnsub (chat específico) cancela on section change. Plus: heartbeat cada 30s self-healing — si listener cae silenciosamente (network drop, tab throttled, error no propagado), se reinicia automáticamente sin necesidad de refresh. §57.6 — fix snapshot tardío pisaba sesión nueva (_resetting flag) + admin cierre con botón Descargar también + diagnóstico detallado snapshot. §57.quint — fix unificado bugs cierre+reset: helper cleanSessionAndRender garantiza limpieza atómica + welcome render para finalCloseAndCleanup Y resetSession. §57.quat — 4 bugs tiempo real coordinados: (1) admin force fresh listener al entrar a sec-concierge + log diagnóstico (2) claim agrega mensaje system "asesor tomó" para que cliente vea (3) open() limpia inline styles forzados antes de aplicar .cnc-open (panel re-abre OK) (4) Bug 4 cubierto por §57.ter detail re-render. §57.ter — finalCloseAndCleanup robusto (forced inline styles) + admin realtime fix (re-render detail panel cuando active chat cambia en _chatsUnsub). §57.bis — fix botón "Cerrar chat" no respondía: migrado addEventListener directo a data-action delegation (sobrevive re-renders del closed-block). §57 — refactor flow finalización chat cliente: confirm coherente + pantalla "Chat finalizado" con Descargar PDF + Cerrar (sin reset automático). §56 — fix definitivo radicado push Telegram: re-trigger natural via onWrite (espera radicado canónico antes de enviar) en lugar de polling que caduca. §55 — fix race condition radicado en push Telegram (poll re-fetch hasta 3s) + disable_notification:false explícito (asegura sonido). §54 — onChatEscalatedTelegram con onDocumentWritten (capta CREATE con mode=queue) + sin pin region (auto-detect southamerica-east1 evita cross-region IAM) + logs verbosos al inicio. §53 — onChatEscalatedTelegram pinned a us-central1 (fix Eventarc 401 unauthorized en southamerica-east1) + dead code unificado. §52 — 3 fixes: (1) Trust mobile más robusto: NUEVO stableFingerprint (UA + screen + tz + platform + language + hwConcurrency) que NO incluye canvas/WebGL (esos pueden variar entre versiones de iOS Safari/Chrome). isDeviceTrusted Path C ahora prueba 3 estrategias en orden: deviceId match → stableFingerprint match → userAgent+screenSize match. saveDeviceTrust dedupea entries del mismo browser/device antes de agregar. backfillDeviceFingerprints inline migra entries viejos pre-§50 sin deviceId. (2) Banner SLA en Concierge: layout column en mobile/panel estrecho (<700px). Antes botones tenían min-width:140px que forzaba flex-row → text container quedaba con 0 width → cada palabra rompía línea vertical. Ahora column con icon → text → actions apilados, botones width:100%. Desktop ancho (≥700px) sigue en row clean. (3) Hamburger fuera del viewport en iPhone: topnav ahora respeta safe-area-inset-left/right (env()) + max-width:100vw + overflow:hidden + brand-text con text-overflow:ellipsis. Hamburger flex-shrink:0 garantiza que SIEMPRE se vea aunque otros elementos quieran ocupar espacio.
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
