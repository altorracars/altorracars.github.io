# 🏛️ PLAN MAESTRO — Revisión Fable 5 (2026-07-03) ⟦FABLE-5⟧

> **SSoT DE EJECUCIÓN.** Redactado por **Fable 5** por directiva del dueño (03/07): revisar TODOS los
> planes pendientes, corregirlos (funcional/diseño/arquitectura/seguridad), auditar holísticamente web +
> panel admin, y dejar UN solo plan por urgencia/prioridad. **La implementación la ejecuta Opus 4.8
> siguiendo este documento tal cual.** La VISIÓN sigue siendo la del brief TODO-52
> (`2026-06-29-crm-overhaul-productizacion-brief.md` — "respira nivel top mundial" = criterio de
> aceptación permanente); este plan REEMPLAZA el ORDEN de ejecución de todos los planes dispersos.
>
> Evidencia: auditoría 7-lentes 03/07 (7 agentes/1.21M tok, read-only) + verificación manual Fable de los
> 6 hallazgos más graves (grep/lectura directa, anti-L-62). Cada ítem cita archivo:línea real.

---

## §0 — REGLAS DE EJECUCIÓN PARA OPUS 4.8 (vinculantes)

1. **Orden = este documento.** Las olas se ejecutan en orden (0→4); dentro de una ola, el orden listado.
   No saltar a un ítem de ola posterior salvo bloqueo externo (gate dueño/dinero/legal).
2. **Por ítem**: IAP §3.4 → implementar → verificar (build + suite + preview/live según aplique) →
   commit específico (`git add` archivos exactos) → actualizar `10`. **Cache bump §4 SOLO si cambia
   comportamiento del sitio público** (el cron es dueño del bump — L-02/L-03: no bump manual en rama).
3. **Pipeline completo = Claude**: commit + push + `firebase deploy` (rules/functions/storage cuando
   aplique) + **merge `dev`→`main`** (M-12/M-25 — el dueño NO opera git).
4. **Cada claim "ya está hecho" de los registros se verifica con grep antes de confiar** (esta revisión
   refutó 3 claims ✅ del cerebro — ver §2). L-62 aplica siempre.
5. **Validación live Chrome al cierre de cada ola** (skill `validacion-live-chrome`, screenshot por
   sección — callejón i; `confirm()` ya no existe, pero el reparto del callejón j sigue para diálogos).
6. **NO re-deliberar decisiones cerradas** (§5 de este doc). NO re-preguntar la visión.
7. **Maquinaria acotada**: fan-out solo read-only/in-cwd/structured/sin-Bash (L-50); comité solo si
   aparece un fork real nuevo.
8. Gates que SÍ frenan: **dinero** (saldo LLM, dominio), **legal** (texto público → abogado, gate P4),
   **decisión de negocio nueva**. Nada más frena.

---

## §1 — VEREDICTO FABLE 5 DEL ESTADO ACTUAL

**La base es sólida y el trabajo de Opus 4.8 (§238-§265) es de buena calidad** — cutover a portal único,
2 P0-SEC deployados con tests, owner-delete completo, dark-only, layout fase 1, confirm() erradicado,
design tokens de clase. El salto a "top mundial" NO requiere reescrituras: requiere **cerrar los
residuos con honestidad** (3 claims del cerebro estaban inflados), **4 P0 nuevos/pendientes** (uno de
seguridad que nadie había visto), y **un paquete de IA/diseño corporativo** bien definido.

**Lo más grave encontrado hoy (verificado por mí):**
- 🔴 **Storage público escribible**: cualquier visitante ANÓNIMO (el sitio auto-firma sesión anónima,
  `js/core/auth.js:1257`) puede **sobrescribir imágenes de `cars/`, `brands/`, `banners/`** y el avatar
  de cualquier uid (`storage.rules:21-53` solo pide `request.auth != null`). Defacement del catálogo.
- 🔴 **dataScope a medias rompe módulos**: el filtro `where('ownerId')` solo está en inbox/deals
  (`scopeCons` — grep: 2 archivos). Agenda (`agenda.data.js:59`), Reportes (`reportes.data.js:38-41`),
  Contactos (`contacts.data.js:30`), Aliados (`dealers.data.js:75`) y Dashboard leen leads/deals SIN
  filtro → para un asesor scoped las rules los RECHAZAN = **módulos rotos** (hoy latente: no hay
  asesores scoped aún). Además: `solicitudes` (misma PII) se lee sin scope (`firestore.rules:716-718`),
  el write de leads/deals no exige scope, y el backfill siembra `dataScope:'all'` cuando falta
  (`functions/shared/rbac-foundation.js:54-55`) — invierte el default seguro `'own'` de las rules.
- 🔴 **P0-CAPTURE sigue abierto** (el único P0 del synthesis A.1 sin cerrar): captura optimista sin ack
  (`new-lead.js:108-118`, `quick-lead.js:122-132`) = leads perdidos en silencio = dinero perdido.
- 🔴 **TODO-41**: el módulo Automatización muestra reglas "Activas" que **nada ejecuta** server-side
  (grep `automationRules` en `functions/` = 0 consumers; el motor vive en `_legacy`). La UI le miente
  al dueño.
- 🟡 **Bug visual real**: el token `--line` NO existe (0 definiciones) y hay 26 usos en 9 CSS → bordes
  invisibles en badges/chips/steps de Vehículos, Disponibilidad, Respaldos, Atributos, Agenda.
- 🟡 La web pública está estructuralmente sana (sitemap/robots/canonical/JSON-LD OK); sus pendientes
  son quirúrgicos (§Ola 3).

---

## §2 — CORRECCIONES DE FABLE A LOS REGISTROS (ejecutar como "pase de cerebro", Ola 0.6)

Los siguientes claims del cerebro/planes son **falsos o stale** — corregirlos para que nadie vuelva a
construir sobre ellos:

| Registro | Dice | Realidad verificada |
|---|---|---|
| `05:23` + brief L159 | "friendlyError COMPLETO, grep cero" | **REFUTADO**: 13+ callsites muestran `e.message/e.code` crudos (`cms.ui.js:95`, `banners.ui.js:82`, `perfil.ui.js:136,208,278,413`, `wizard.js:414`, `deals.ui.js:565`, `ajustes.ui.js:64`, `new-lead.js:113`, `quick-lead.js:126`, `contacts.edit.js:94,124,155,173`) |
| `05:8`/`05:23` (§260-262) | "emoji→SVG COMPLETO" | **PARCIAL**: nav/sidebar ✅, pero 214 líneas con emoji en 43 archivos; en UI real: `popover.js:35` renderiza emoji (menús inbox + usermenu `shell.js:181-183`), canal `classify.js:75-83`, FCM 🔔, empty-states |
| `rbac-catalog.js:3` | "71 permisos en 8 categorías" | Son **82 permisos en 9 categorías**, en **TRIPLE** catálogo (ESM + `js/admin/` + `functions/index.js:3020-3101`), **sin test de paridad** |
| `core/theme.js:4-5` | "accent configurable en ajustes" | Stale: el accent picker se eliminó (oro fijo) |
| `docs/SITEMAP-FIX.md:116-120` | "No tiene canonical/OG/JSON-LD" | Todo eso YA existe (`index.html:12,27,39,99-149`) |
| `docs/PLAN-MIGRACION-ALTORRA.md` | F8.2 propone HubSpot; snapshot con branch/cache muertos | **Contradice TODO-52** (CRM propio); solo el core dominio→Cloudflare→Vite sigue vigente |
| `CLAUDE.md §1` | "Firebase Compat (NO modular)" | Cierto solo para el sitio público; `admin-app` = **modular v11** (aclarar la frase) |
| `05:8` "Queda FCM" | Portar FCM al portal | **Probablemente stale**: `main.js:103` ya llama `initFcm()` — verificar live y cerrar el residuo |
| `rbac-foundation.js:17` | "dataScope se escribe pero NO se enforce" | Stale: P0-SEC-1 ya lo enforce |

---

## §3 — EL PLAN (olas por urgencia/prioridad)

### 🌊 OLA 0 — SEGURIDAD + INTEGRIDAD (P0) — ✅ EJECUTADA POR FABLE 5 (03/07, ADR §267)

> **Estado real post-ejecución:** 0.1–0.5 ✅ implementados + suite 340/340 verde + deploys
> (rules+índices+storage; functions crmHourlyJob+backfillNivelesRBAC). Corrección de la
> realidad en 0.4: el motor SLA **ya existía** server-side (`runCrmSlaSweep`, horario) — el
> claim del verificador era falso-negativo (L-62); lo hecho fue cablear el toggle
> (`enabled.sla_breach_notify_super`), escribir `automationLog` desde el server, mapear
> `workflows.edit` en rules y volver HONESTO el módulo (reglas muertas fuera, "Siempre
> activa · Servidor" en las del motor). **0.6 (pase de cerebro) queda PARCIAL** → primer
> ítem de Opus: docs stale (SITEMAP-FIX tabla · PLAN-MIGRACION marca obsoleto · theme.js:4
> comentario · CLAUDE.md §1 matiz compat/modular · rbac-catalog headers "71→82").
> **Residual nuevo → Ola 1.9b:** cola persistente para capturas rechazadas en el camino
> offline-tardío (el ack-first online ya elimina la pérdida principal).

**0.1 · STORAGE-PÚBLICO (P0-SEC nuevo)** — `storage.rules`
- `cars/`, `brands/`, `banners/`: write solo staff → `firestore.get(/databases/(default)/documents/usuarios/$(request.auth.uid)) != null` (mismo criterio `hasProfile()` de las Firestore rules; opcional: exigir permiso `vehicles.edit`/`brands.edit`/`banners.edit` leyendo `permissions`).
- `avatars/{fileName}`: exigir `fileName == request.auth.uid + '.webp'` (el uploader público `js/core/perfil.js:168` y el del portal cumplen ya ese naming — verificar antes; el comentario `storage.rules:47` admite que hoy es client-side-only).
- ⚠️ Pre-check obligatorio: grep de uploaders (ya hecho: solo admin legacy/portal + perfil público avatar). Verificar en emulador que el wizard de Vehículos y Marcas del portal siguen subiendo.
- Deploy `--only storage`. Aceptación: anónimo NO puede escribir cars/ (test manual con sesión anónima); admin sí.

**0.2 · DATASCOPE-INTEGRIDAD (cierra P0-SEC-1 de verdad)** — un solo deploy rules+functions
- (a) Cliente: aplicar el patrón `scopeCons()` de `inbox.data.js:20` a `agenda.data.js` (fetchLeadsForCita), `reportes.data.js` (loadReports), `contacts.data.js:30`, `dealers.data.js:75` y el camino del Dashboard — o gatear esas vistas a all-scope con mensaje claro. Sin esto, el primer asesor scoped que se contrate encuentra 4 módulos rotos.
- (b) Rules: `scopeAllowsOwn()` también en READ de `solicitudes` (quitar la rama `isAuthenticated() ||` — L716) y `failedIngestions` (L668); mantener `appointments.read` para el flujo de citas.
- (c) Rules: `&& scopeAllowsOwn(resource.data)` en UPDATE/DELETE de leads (L472-474) y deals (L632-637) — cierra la escritura ciega cross-asesor (1 línea por regla).
- (d) Backfill: `rbac-foundation.js:54-55` default `'all'` → `'own'` + ajustar `rbac-foundation.test.js:9`. (El doc del dueño ya tiene `dataScope:'all'` explícito — verificado 29/06 — no le afecta.)
- Tests: extender `firestore-rules-220-datascope` con casos solicitudes/write-scope; suite completa verde ANTES del deploy (dataScope restringe reads → no es aditivo).

**0.3 · P0-CAPTURE (leads = dinero)** — `new-lead.js`, `quick-lead.js`, `capture.data.js`
- Con conexión (`navigator.onLine`): **esperar el ack** del server (spinner en el botón, <1s típico) antes del toast de éxito y del cierre del modal; ante rechazo → **modal bloqueante** con el formulario INTACTO y botón reintentar.
- Sin conexión: mantener camino optimista + **cola persistente de fallidos** (localStorage) con badge/banner en la Bandeja "N capturas sin confirmar".
- Aceptación: simular rechazo por rules (payload inválido) → el asesor VE el fallo y no pierde el dato.

**0.4 · TODO-41 · MOTOR DE AUTOMATIZACIÓN (integridad: la UI no miente)**
- Portar la evaluación de las reglas de `_legacy/js/admin/admin-automation.js` a **`crmHourlyJob`** (hook natural, ya existe — `functions/index.js:4355`): leer `config/automationRules`, evaluar sla_breach/citas (lo que citaSweep no cubra), escribir `automationLog`. Idempotente.
- Rules: mapear `workflows.edit` → `(docId == 'automationRules' && hasPermission('workflows.edit'))` en `configAdminWrite()` (`firestore.rules:1119-1134`) — hoy el toggle da permission-denied a quien tenga el permiso.
- Cuando el motor sea server-side: `automationLog` write → server-only.
- Mientras no esté portado: banner honesto en el módulo ("las reglas se ejecutan cada hora en el servidor" solo cuando sea VERDAD).
- Deploy `--only functions`. Aceptación: regla ON dispara y deja rastro en automationLog SIN ningún admin abierto.

**0.5 · Quick-fixes de 1 línea que van en el mismo tren** (cliente, cero riesgo):
- Consentimiento `new-lead.js:36` `checked:true` → `false` (Habeas Data).
- Fail-open de sesión: `auth.js:52-57` — si el lookup de perfil falla → signOut/retry, no sesión con `permissions:[]` sin evaluar "bloqueado".
- `main.js:90` fallback `|| mountInbox` → `MODULES.inicio` (alinear con la doctrina de aterrizaje).

**0.6 · Pase de cerebro** — aplicar la tabla §2 (corregir `05`/`10`/brief/headers stale/SITEMAP-FIX/
PLAN-MIGRACION-marca-de-obsolescencia + `CLAUDE.md §1` matiz compat/modular). Verificar FCM live y
cerrar (o reabrir con evidencia) el residuo "portar FCM".

### 🌊 OLA 1 — PANEL PREMIUM/CORPORATIVO (P1 · el corazón de TODO-52)

**1.1 · Tokens fantasma — ✅ HECHO (Fable 03/07 tarde):** 17 `var(--line)` desnudos → `--surface-stroke` (+alias compat en crm-tokens) · `--warn`→`--warning` · `--t-body-sm` entró a la rampa OFICIAL (13px) · fallbacks GitHub normalizados a los hex reales (perfil/dealers/brands/config/vehicles/contacts.edit). Verificado live: bordes de badges/chips visibles.
- `var(--line)` (26 usos / 9 CSS, 0 definiciones) → `var(--surface-stroke)` (o `-hi` en separadores fuertes). Archivos: vehicles(10) reviews(2) dealers(1) banners(3) config(4) brands(1) lists(1) agenda(1) backup(3).
- `--warn` (`perfil.css:86,102`) → `--warning`; `--t-body-sm` (`dashboard.css:71,81`) → decidir 13px a la rampa o subir a `--t-body`.
- Fallbacks con paleta ajena GitHub (`#3fb950/#58a6ff/#e5484d` en dealers/brands/config) → hex de los tokens reales.

**1.2 · Reorganización del menú — ✅ HECHO (Fable 03/07 tarde):** 5 grupos (Inventario/Sitio web/Comunicaciones/Equipo/Administración) con SVG propios · renombres (Apariencia y SEO · Base de conocimiento · Consultas sin respuesta) · `config`→botón "Disponibilidad" en Agenda (ruta viva) · **guard central RBAC** en mountRoute (canAccessRoute reusa perm de NAV) · breadcrumb de grupo en topbar. Verificado live (snapshot 5 grupos + agenda). Resta: fusión unmatched→tab (P2 2.12).
*(Especificación original — referencia)*
- **5 grupos**: `Inventario` (vehiculos, marcas, aliados, atributos) · `Sitio web` (banners, contenido, resenas) · `Comunicaciones` (hub, cerebro, unmatched) · `Equipo` (usuarios, roles, departamentos) · `Administración` (workflows, auditoria, respaldos, ajustes).
- Renombrar: grupo "Ajustes"→**Administración**; ítem `ajustes`→**"Apariencia y SEO"**; `cerebro` "Cerebro AI"→**"Base de conocimiento"**; `unmatched` "No entendí"→**"Consultas sin respuesta"** (fusionarlas como tabs de un solo módulo = P2, no ahora).
- `config` (Disponibilidad): sacarla de Administración → botón/acción "Configurar disponibilidad" DENTRO de Agenda (gate `calendar.config`), con la ruta `#/config` viva para deep-links.
- Guard central de rutas: en `mountRoute` (`main.js:86-94`) reusar la metadata `perm` de `NAV[]` → sin permiso = redirect a inicio + toast (mata los 24 guards artesanales).
- Breadcrumb: en `setActive`, poblar `topbar__crumb` con el grupo ("Administración › Auditoría") — ~5 líneas.

**1.3 · Layout fase 2 — ✅ CORE HECHO (Fable 03/07 tarde):** whitelist COMPLETO (faltaban `.cfg/.bak/.aj`, no solo .cfg) · cap ultrawide `--content-max:1360px` en flow + dash/reportes (padding dinámico, scrollbar en el borde) · ritmo vertical --s-5 (veh/rev/bak) · breakpoints canónicos 860/720/560 (8 archivos) · `--detail-w` 560px @≥1440. Verificado live 1920px (1360 centrado). **RESTA (menor, P2):** caps internos contactos/usuarios · split-mode real del 360.
*(Especificación original — referencia)*
- Añadir `.outlet > .cfg` al whitelist de padding (`shell.css:123` — Disponibilidad sigue pegada al sidebar HOY: quick-fix inmediato).
- Clase canónica **`.page`** en el design-system: `max-width: 1280-1440px; margin-inline:auto; width:100%` + padding estándar; migrar los roots de flujo y los cuerpos scrolleables (dashboard/reportes/contactos/usuarios…); full-bleed SOLO donde aporta (kanban, hub 2-panes, agenda).
- Breakpoints canónicos **860/720/560** (hoy hay 7 valores distintos: 480/560/640/720/760/860/900) — consolidar módulo por módulo, documentar en tokens.
- Ritmo vertical: padding-top de página unificado a `--s-5` (vehicles/reviews hoy abren a 4px).
- Panel 360 en ≥1400px: modo split (empuja contenido) o `--detail-w` responsivo 440→640px; overlay solo en pantallas chicas.

**1.4 · friendlyError DE VERDAD + fugas de copy — ✅ HECHO (Fable 03/07 noche):** 15/15 callsites crudos → `friendlyError`/`friendlyCallable` (helper NUEVO que preserva mensajes de negocio de callables propias) · 11 empty-states sin IDs de permiso · "13 listas"→derivado · copy marcas/listas a negocio. Nota: los "(demo)" son ramas mock-only = falso hallazgo del audit, sin acción.
*(Especificación original — referencia)*
- Envolver los 13+ callsites de §2 con `friendlyError(e, fallback)`.
- Empty-states "Necesitas el permiso `users.read`…" (`usuarios.ui.js:46`, `workflows.ui.js:37`, roles/departamentos/auditoría) → copy sin IDs de permiso.
- Copy dev residual: `brands.ui.js:186`, `lists.ui.js:156` ("13 listas" hardcode→derivado), `dealers.ui.js:185`; "(demo)" inline en toasts (`ajustes.ui.js:89-90`, `config.ui.js:45,213`) → badge global de modo demo, no sufijos.

**1.5 · Voseo→tú-Colombia — ✅ COMPLETO código + DATA PROD (Fable 03/07 noche):** código grep-cero + **15/15 FAQs de `knowledgeBase` en PRODUCCIÓN corregidas** (14 detectadas + 1 cazada en la re-verificación; dueño autorizó en chat el write MCP tras la denegación inicial del clasificador). Colección completa re-verificada: cero voseo. El bot público ya habla tú-Colombia al 100%.
*(Especificación original — referencia)*
- `cerebro.data.js:72-95` (respuestas del bot PÚBLICO: "decime que andás buscando"…) — barrido completo; `hub.ui.js:285,295,527`; `login.js:34`; `perfil.ui.js:208`. Skill `catalogo-voz`. Añadir regla de voz al cerebro para no reincidir.

**1.6 · Emoji→SVG chrome funcional — ✅ HECHO (Fable 03/07 noche):** popover con `iconId` SVG · usermenu · menús inbox (snooze/asignar/archivar/eliminar) · badges convertido (crown/target/x) · campana FCM SVG + copy · canal sin emoji en `<option>` nativo · +voseo escondido en FCM cazado. Verificado preview (menús con SVG, 0 errores).
*(Especificación original — referencia)*
- `popover.js:35`: aceptar `iconId` (html SVG) además de texto → migrar menús de inbox (`inbox.ui.js:53-56,493-517`) y usermenu (`shell.js:181-183`).
- Canal en captura: `classify.js:75-83` renderizado como texto en `new-lead.js:26` → usar los brand-glyphs SVG monocromo que §262 ya creó.
- FCM 🔔→`icon('bell')` (`fcm.js:67,99,146,149`); empty-states con emoji → `state__icon`+navIcon.
- **Política**: emoji como ICONO funcional = SVG obligatorio; emoji en copy celebratorio (🎉 en un toast de venta) = permitido si el diseño lo avala. Documentar en la doctrina §260.5.

**1.7 · Robustez + validación de entrada — ✅ HECHO (Fable 03/07 noche):** (a) sweep appendAll/safe = YA CUBIERTO por §PASE-1/§262 (verificado con grep — los 2 puntos citados por el audit no existen ya; falso-pendiente); (b) **`domain/validate.js`** (assertValid, errores `friendly`) cableado en `saveDealer` + `saveReview` · `_version` optimistic-locking en ambos · **espejo en rules** (shape whitelist + caps + validVersion en `concesionarios`/`resenas`) · `validVersion()` endurecido con `.get()` (docs legacy sin el campo migran null→1 — antes evaluation-error) · suite **347/347** (+7 §268) · rules DEPLOYED.
*(Especificación original — referencia)*
- Sweep `appendAll` en todo `append()` con hijos condicionales + helper `safe(x,'—')` en interpolaciones `${}` de campos opcionales (`deals.ui.js:380`, `dashboard.ui.js:220`).
- `domain/validate.js` reutilizable (required/trim/maxLen/regex) aplicado en cada `*.data.js` de escritura — empezar por `saveDealer` (`dealers.data.js:95-117`, por donde entró `dfsfdfdfs`) — espejado en rules (`validVersion` + shape en concesionarios y reseñas: `firestore.rules:124-129,322-327`).

**1.8 · Superficies y estados — ✅ CORE HECHO (Fable 04/07 madrugada):** escala z-index 100% tokenizada (`--z-*` en crm-tokens; rev-modal 80→8500, hub-panels 9000→8600 bajo popover, 9 archivos) · modal genérico `.rev-modal` premium IN-PLACE sin renombrar (§3.2: blur + shadow-32 + pop-in + título a la rampa 20px) · hub a tokens (`--success`/`--warning`) · contraste oro `#fff`→`ink-950` (hub ×2, inbox sel) · KPIs danger tokenizados · empty-states ACCIONABLES (vehículos CTA wizard · pipeline CTA Bandeja · contactos estado-cero explicado). **RESTA 1.8b:** skeletons top-5 (contactos/vehículos/agenda/hub/usuarios). Drag §265 se CONSERVA (decisión deliberada reciente > audit; se re-evalúa en la validación live final). Verificado preview (z/blur/sombra/título, 0 errores).
*(Especificación original — referencia)*
- Tokenizar z-index (`--z-topbar:5 … --z-toast:9999` en crm-tokens) y resolver: `.rev-modal` z:80 bajo el stack alto (`reviews.css:40`), hub-panels empatados con popover en 9000.
- Extraer `.rev-modal` → `.modal` canónico en `components.css` (shadow-32 + blur + animación + type ramp) — hoy 7+ módulos acoplados al CSS de reseñas con título 16.3px vs 24px del modal de captura.
- Tipografía: mapear los rem ad-hoc de reviews/vehicles/config a la rampa.
- Colores hub: `#2e9d5b`→`var(--success)`, `#d8a23b`→`var(--warning)`; contraste oro: `color:#fff` sobre `--gold-500` (~2:1, `hub.css:62,115`, `inbox.css:80`) → `var(--ink-950)` (convención del DS).
- Skeletons en módulos de datos top: contactos, vehículos, agenda, hub, usuarios (patrón de components.css:178).
- Estados vacíos con CTA (vehicles.ui.js:462, deals.ui.js:302, contacts.list.js:104) + drag del kanban: `is-dragging` original → `opacity:.4` sin scale/rotate (la deformación pertenece a la drag image).

**1.9b · Cola de capturas offline-rechazadas (residual de 0.3)** — si un lead encolado
offline es rechazado por rules al volver la señal y el asesor cerró la pestaña, hoy solo
queda un console.error. Persistir el rechazo (localStorage) + banner en Bandeja "N capturas
sin confirmar" con reintento.

**1.9 · Onboarding + captura única**
- Checklist/mini-tour de primeros pasos en Inicio con tenant vacío (Bandeja→calificar→convertir→vender).
- Unificar la doble captura (⚡ rápido vs ＋ completo) en un form progresivo, o guía visible de cuándo usar cada uno.
- Combobox typeahead para el picker de vehículo en la conversión (`convert-dialog.js:25,71-75` — inusable a 100+ vehículos) — reutilizable.

**Validación live Chrome al cierre de la ola** (todas las secciones, screenshots, viewport 1440/1920/768/375).

### 🌊 OLA 2 — CORPORATIVO+ / DEUDA (P2)

- **2.1 Command palette global (Ctrl+K)**: saltar a secciones (reusa NAV+canSee) + buscar registros (contactos/leads/vehículos vía data layers). Montada en el shell.
- **2.2 Campana de notificaciones in-app** en topbar (mismos eventos que FCM; dropdown + deep-link) + **quick-create polimórfico** (＋ Crear → Lead/Cita/Vehículo por permiso).
- **2.3 Paginación/perf**: `fetchDealerStats` (congeló render 30s — confirmado live) → agregados server-side; `subscribeVehicles` con limit; `fetchTeam` paginado.
- **2.4 Export CSV por sección** (reusar `toCsv()/download()`: contactos/pipeline/vehículos/aliados/agenda) + **bulkbar reusable** (base `.inbox__bulkbar`) + **undo**: toast "Deshacer" 5-10s tras borrados (o soft-delete en críticos).
- **2.5 Agenda**: acción owner-only "Eliminar cita" (`citaAction` + `'delete'` transaccional que libere el cupo) + purga de canceladas.
- **2.6 Seguridad P2** (un tren de rules+functions): isOwnerDoc 3-formas (rules:64 vs functions:800); diff-guard usuarios ampliado a `rol/roleId/dataScope` + validación en `onUserRoleAssigned` (subset del asignador); `config/*` least-privilege por docId (settings.theme hoy escribe TODO config/ — rules:1119-1134); whitelist+caps en `events/automationLog/mensajes/conciergeChats` (patrón SEC-06); RTDB: typing atado al dueño de sesión + presence read staff; `kb.usageCount is int +1`; `departments.userCount` server-only; `subscriptions.email` regex; unificar `isOwnerData` compartido en contactAdmin/anularConversion; `triggerSeoRegeneration` — eliminar la rama PAT-del-cliente (`functions/index.js:721-728`) y el PAT de localStorage.
- **2.7 Test de paridad RBAC** (3 catálogos × 82 perms, estilo crm-spec-parity) + corregir headers stale.
- **2.8 TODO-35 código muerto (venció 03/07 — cerrar):** mover `admin-calendar-config.js` a `js/concierge/shared/` (lo cargan TODAS las páginas públicas — `components.js:537` — y moriría con la purga); cuarentenar a `_legacy/`: css muertos (hero/featured-week-banner/tokens/components/animations/admin*.css), `migrateLegacyUsers`; carpeta `v/` → ver Ola 3.1; P2 workflow `auditoria-codigo-viejo` + propagación skill ×3 peers + ADR de cierre.
- **2.9 MFA (TODO-43)**: TOTP + recovery para el portal (decisión del dueño el CUÁNDO; el diseño va junto al login — no portar toggles sueltos).
- **2.10 Hub presence**: el portal publica su presencia (hoy solo LEE — transfer/atendiendo vacíos en multi-asesor; `hub.data.js:16-21`).
- **2.11 App Check enforce**: gate con métricas del monitor (decisión dueño); hasta entonces el "riesgo residual bookedSlots" se trata como NO mitigado. `enforceAppCheck` en callables sensibles al activar.
- **2.12 Fusión Base de conocimiento + Consultas sin respuesta** como tabs (reduce sidebar) + cerrar cutover F-6 definitivo (borrado `_legacy/admin.html` vía método TODO-35).

### 🌊 OLA 3 — WEB PÚBLICA (paralela; no bloquea al CRM)

- **3.1 SEO quirúrgico**: `detalle-vehiculo.html` → `noindex,follow` (la superficie indexable son las `/vehiculos/*.html`; hoy es indexable SIN canonical — duplicado) · carpeta `v/*.html` (15 stubs legacy apuntando a la URL no-canónica): regenerar hacia `/vehiculos/slug.html` o `Disallow: /v/` + noindex · actualizar `SITEMAP-FIX.md` al estado real · preguntar al dueño el estado GSC (re-envío sitemap).
- **3.2 Performance doctrinal**: token `--transition: all .3s` (`style.css:48`) → lista explícita (color/background/border-color/box-shadow/transform/opacity) + barrido de ~15 CSS públicos (~109 usos; los admin*.css quedan — solo los usa `_legacy`). Cache bump al terminar (vía cron).
- **3.3 Fuentes cinematic horneadas**: `generate-vehicles.mjs` template + heads legacy con el `<link>` de Manrope/Instrument/Cardo (hoy inyección JS post-DOMContentLoaded → FOUT en las páginas SEO más importantes; `components.js:102-110`).
- **3.4 Marca**: resolver el triple dorado público (`#b89658` doctrina/theme-color · `#D4A85A` tokens rediseño · `#d4af37` inline stale en `index.html:266`) → canónico público = **#D4A85A** en superficies del rediseño (coherente con el admin) manteniendo #b89658 como theme-color/legacy hasta el barrido; corregir el inline crítico stale; documentar en `20-ESPACIAL`.
- **3.5 a11y**: hamburguesa `aria-expanded/aria-controls` (`snippets/header.html:81` + inline index + toggle en `home-chrome.js`).
- **3.6 Bot**: sprint de pulido (defectos #3 race cerrar-sesión, #5 flicker contador, #6 confirm nativo del widget — chicos e independientes) → luego **flip LLM TODO-34** (gate: saldo del dueño; kill-switch + cap $15 ya en prod) con validación live que re-valida #1/#7 y C#3/C#4 gratis → semanas después, poda F6 de `js/ai/` con el método TODO-35. Texto consent público = gate P4 abogado.

### 🌊 OLA 4 — ESTRATÉGICO / DIFERIDO (P3 · cada uno con su gate)

- **4.1 Templatabilidad** (higiene durante refactors, no sprint aparte): brand→config, `FIREBASE_CONFIG` runtime, `core/collections.js`, `core/strings.js`.
- **4.2 Migración dominio+Cloudflare+Vite** (TODO-01): bloqueada por compra dominio (dueño). Tarea previa cuando desbloquee: REESCRIBIR el plan (purgar HubSpot/F8/snapshot muerto).
- **4.3 TODO-48 drift MF4.x** (KPIs 360/masivas/NPS del admin viejo): re-evaluar tras Ola 1 — parte quedará absorbida por 2.1-2.4.
- **4.4 Resto del ledger**: TODO-26 facturación (ÚLTIMA — decisión dueño) · TODO-27 invite flow · TODO-30 doble llave+staging · TODO-19/21 E6 restante · TODO-24 barrido recurrente · TODO-42 visibility-core · TODO-32 YAGNI · TODO-49 re-barrido del gap · TODO-50/51 restos humanos (colegiado/contador/abogado).

---

## §4 — QUÉ NO HACER (anti-regresión de decisiones)

1. **NO multi-tenancy** (descartada por el dueño — clones por empresa).
2. **NO HubSpot** ni ningún CRM externo (PLAN-MIGRACION F8.2 está muerto).
3. **NO re-deliberar**: tenancy (§FASE-B), subset-§219, Opción-A dataScope compartido de contacts/activities, supresión-legal de Contactos (NO hard-delete — Ley 1581), bot Opción A, auth-bridge (descartado, re-login), slug NFD (L-42).
4. **NO custom claims ahora** (Fase 5); **NO E2E forms en localhost** (L-08); **NO `preview_screenshot`** (L-28); **NO eliminar funcionalidad** al reorganizar (mandato del dueño).
5. **NO sweep ciego de emojis** (~408 ocurrencias incluyen mocks/comentarios — criterio de diseño).
6. **NO tocar el bump de cache manual en rama** (el cron es dueño — L-02/L-03).

## §5 — CRITERIO DE CIERRE

El EPIC TODO-52 mantiene su **Directiva Permanente** ("respira la visión" — auditar→pulir hasta que
un usuario nuevo lo perciba premium/top mundial). Este plan se considera al día cuando: Olas 0-1
completas + validación live con screenshots + `10`/`05` reflejando la realidad + ADRs consolidados.
Las olas 2-4 avanzan por orden salvo gate externo. Cada sesión de Opus arranca: boot → `10` → este
plan → siguiente ítem no-✅.
