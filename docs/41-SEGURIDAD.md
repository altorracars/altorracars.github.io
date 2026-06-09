# 🔒 41 — SEGURIDAD (lóbulo de dominio)

> Lóbulo registrado en `40-LOBULOS-DOMINIO` (Trigger 🔵 §G.2: "audita seguridad",
> "vulnerabilidades", "Firebase rules", "rutas sin auth"). Nació de la **auditoría
> Fase C** (2026-06-08, ADR §169) — blindaje pre-lanzamiento del CRM. Mantenido por
> Claude bajo demanda. Cubre: Firestore/Storage/RTDB rules, Cloud Functions, App Check,
> RBAC, validación de input, manejo de secrets.

## Skills / recursos consultados
- **Workflow Fase C** (`fase-c-audit`, subagentes en paralelo) — auditó los 4 archivos reales
  (`firestore.rules` 763 L · `storage.rules` 51 · `database.rules.json` 27 · `functions/index.js` 3514 + `functions/src/ingestion/*`).
- **Verificación adversarial L-34** — CADA hallazgo confrontado contra el código real (severidad recalibrada; 0 falsos positivos esta ronda, pero el verificador corrigió la *justificación* de SEC-01).
- Doctrina **seguridad por diseño** (`CLAUDE.md §3.8` + `46-ESCALABILIDAD` AD-6) + skill `arquitecto-software`.

## Hallazgos — Ronda inicial (2026-06-08 · auditoría Fase C)

> **9 hallazgos, TODOS reales (isReal=true).** Severidad = la **recalibrada** por el verificador adversarial.
> RBAC = lookup `usuarios/{uid}.rol + permissions[]` (NO claims). `isAuthenticated()` = `hasProfile()` = cualquier admin con doc en `usuarios/`.

| ID | Sev | Título | Ubicación | Fix ($0) | Decisión Fuerte |
|---|---|---|---|---|---|
| **SEC-01** | 🟠 med | RBAC-read laxo en CRM: `read: if isAuthenticated() \|\| hasPermission('crm.read')` es **redundante** → cualquier admin (aun sin `crm.read`) lee PII (incl. roles custom con `permissions:[]`). | `firestore.rules:314,321,328,336,343,353,361` (leads/contacts/crmNotes/activities/deals/subscriptions/failedIngestions) | **RESUELTO → Opción A**: solo **`hasPermission('crm.read')`** en las 7 a la vez (ver §Decisión Fuerte). | **SÍ** (modelo RBAC + prod) |
| **SEC-02** | 🔴 high | **Sin App Check en NINGÚN recurso** → forms públicos (`create:if true`) abusables por curl/script con el config público del bundle. | `firestore.rules:370,411,352,426,702`; `storage.rules:16`; functions (0 `enforceAppCheck`) | **Firebase App Check** (reCAPTCHA v3, gratis) modo **monitor→enforce** + validación de payload. | **SÍ** (rollout) |
| **SEC-03** | 🔴 high | ~30 Functions legacy **sin `maxInstances`** (solo las 3 de ingestión lo tienen) → factura runaway + Gmail SMTP agotado si se inunda `onNewSolicitud`. | `functions/index.js:83,184,329,1143,2039,…` | `setGlobalOptions({ maxInstances:10 })` al tope de `index.js` (aditivo) + budget alert GCP $5. | No |
| **SEC-04** | 🔴 high | Webhook público `linkTelegramChat` **sin verificación de firma** → secuestrar el `telegramChatId` de un asesor (fuga de alertas de leads). | `functions/index.js:2039-2116` | `secret_token` en `setWebhook` + rechazar 403 si `X-Telegram-Bot-Api-Secret-Token` no coincide. | No |
| **SEC-05** | 🟠 med | `loginAttempts` `read/create/update: if true` (docId = email "hasheado" trivial) → enumerar cuentas + auto-bloquear a un admin / evadir el lockout. | `firestore.rules:424-428` | Mover el contador a una Function (Admin SDK) + `read,write: if false` (patrón `llmRateLimit`). Mini-proyecto, no 1-línea. | No |
| **SEC-06** | 🟠 med | Validación de payload ausente en creates públicos + `onNewSolicitud` concatena `nombre`/`comentarios` **sin escapar** en el email al admin → inyección de HTML en el inbox. | `firestore.rules:370,404-415,352`; `functions/index.js:107-160` | `keys().hasOnly([whitelist])` + límites de tamaño en rules; `escapeHtml()` en la function de email. | No |
| **SEC-07** | 🟠 med | Storage `write: if isAuthenticated()` (anónimo cuenta) → subir 5MB a cars/brands/banners (llenar bucket) + **sobrescribir avatar ajeno** (`avatars/{uid}.webp` sin validar uid server-side). | `storage.rules:16,24,32,41-43` | avatars: `fileName == request.auth.uid + '.webp'`; cars/brands/banners: restringir a admin / App Check. | No |
| **SEC-08** | 🟠 med | `config/bookedSlots` write **incondicional** (`\|\| (docId=='bookedSlots')`) → un `set()` malicioso pisa todos los slots = DoS del agendamiento o doble-booking. | `firestore.rules:693-710` | Quitar la rama incondicional; exigir auth + validar `affectedKeys()` por fecha. | No |
| **SEC-09** | 🟢 low | `automationLog`/`events`/`unmatchedQueries` `create: if request.auth!=null` (anónimo) sin validación → ruido en el Activity Feed (spoof `bySource:'admin'`). Inmutables → ruido, no corrupción. | `firestore.rules:453,544,557` | `keys().hasOnly([...])` + atar identidad al `auth.uid` (patrón `appointmentReminders`/`comments`). App Check cubre. | No |

## ✅ Lo que YA está bien (NO tocar — verificado)
- **Deny-by-default** presente en las 3 capas (`firestore.rules:758`, `storage.rules:47`, RTDB raíz `database.rules.json:24-25`).
- **Callables admin** (`createManagedUser`/`delete`/`updateRole`/`seedSystemRoles`/`migrateLegacyUsers`/`triggerSeoRegeneration`/`setupTelegramWebhook`) verifican `super_admin` **server-side** leyendo `usuarios/{uid}.rol`.
- `llmRateLimit` y concierge `notes/` cerrados a cliente (`if false`); RTDB presence/typing atan la escritura al `auth.uid`; **secrets vía `defineSecret`** (nunca en el cliente).
- RBAC por lookup `usuarios/{uid}.rol+permissions[]` consistente; `auditLog` inmutable.

## 🛡️ Plan de blindaje pre-lanzamiento (prioridad)

> **P0 — "a un POST de distancia"** (lo más urgente, NO Decisión Fuerte salvo App Check rollout):
> 1. **SEC-03** `setGlobalOptions({maxInstances:10})` — aditivo, bajo riesgo, corta la factura runaway. Deploy `--only functions`.
> 2. **SEC-04** firma del webhook Telegram (`secret_token`) — coordinar deploy + re-`setupTelegramWebhook`.
> 3. **SEC-02** App Check (reCAPTCHA v3) en **monitor** → verificar 100% tráfico legítimo con token → **enforce**. Cubre SEC-02/06/07/08/09 de raíz (solo la app real escribe).
>
> **P1 — Endurecimiento de reglas** (algunos rompen flujos → testear en emulador antes):
> 4. **SEC-01 (DECISIÓN FUERTE)** RBAC-read → `isEditorOrAbove() || hasPermission('crm.read')` en las 7 colecciones a la vez. **Gate**: Consejo Externo (Gemini/§15) + verificar la capa de lectura de `admin-app/` + OK del cliente + emulator tests + deploy `--only firestore:rules`.
> 5. **SEC-06** whitelist `hasOnly()` + escape de email · **SEC-08** cerrar `bookedSlots` · **SEC-05** mover `loginAttempts` a Function.
>
> **P2 — Hardening posterior**: SEC-07 (avatars ownership + storage admin-only) · SEC-09 (validación telemetría).

## ⚖️ Decisión Fuerte (SEC-01) — RESUELTA (Consejo Externo Gemini 3.1 Pro High + verificación de código, 2026-06-08)
**Decisión: Opción A** — `read: if hasPermission('crm.read')` (estricto) en las 7 colecciones canónicas a la vez. (Cambié mi postura inicial B → A.)
- **Por qué A y no B** (argumento de Gemini, adoptado): B (`isEditorOrAbove() || hasPermission`) acopla la PII al rol editor → un futuro "Editor de Inventario/Contenido" **heredaría** acceso al CRM = privilege-creep + deuda de auditoría (la política diría `crm.read` pero la DB diría "eso o editor"). A hace `crm.read` **significativo y auditable** (mínimo privilegio real). La "consistencia con la convención de la casa" que motivaba B es justamente el anti-patrón.
- **Por qué A es SEGURO hoy** (verificado en el repo, punto ciego que Gemini no podía ver): `RBAC_SYSTEM_ROLES` solo siembra `system_super_admin` con `permissions:['*']` (`functions/index.js:2642-2654`); **editor/viewer ELIMINADOS del seeder** (§69 R7). `hasPermission` acepta `'*'` → **los admins actuales (super_admin) pasan A por wildcard: cero lock-out**. A solo deniega a roles no-wildcard sin `crm.read` (que es el objetivo).
- **Patrón forward (Gemini, adoptado)**: *Write-Time Derived Permissions* — Firestore "tonto y estricto" (A); la inteligencia vive en el panel: al crear/asignar un rol que necesita CRM, la UI **inyecta `crm.read`** en `permissions[]`.
- **Lo que NO se cambia** (refuté a Gemini en parte): App Check (SEC-02) **sigue**; es ortogonal — A cierra el insider-read de PII, App Check cierra el abuso de escritura externo. No se descarta uno por el otro.
- **Gate de despliegue**: (1) **pre-seed** `crm.read` en `permissions[]` de cualquier admin **no-super_admin** vía consola Firestore (10 min, $0) ANTES del deploy; (2) **emulator rules tests** de las 7 colecciones; (3) **OK del cliente**; (4) deploy MANUAL `firebase deploy --only firestore:rules` (Claude); push/merge = cliente.
- **Follow-up no bloqueante**: la `admin-app` lee sin `catch` robusto (p.ej. `contacts.data.js`) → añadir manejo de `permission-denied` ("sin permiso de CRM") para que un futuro rol denegado vea un mensaje, no un crash.

## Excepciones / decisiones específicas de Altorra
- ⚠️ El verificador **corrigió la justificación** de SEC-01: el patrón `isAuthenticated() || hasPermission(x.read)` NO es un descuido del CRM — es **convención de la casa** (también en `concesionarios:112`, `citas:368`, `vehículos auditLog:99`). El fix sigue siendo válido; la cita de precedente (`concesionarios usa isEditorOrAbove`) era falsa → L-34 en acción.
- **Deploy de reglas/functions = MANUAL** por Claude (`firebase deploy --only ...`), con OK. Nunca romper el público que crea `solicitudes`/`citas`/`subscriptions`.
- Auth anónimo del público (`auth.js signInAnonymously`) es **intencional** (favoritos/historial atados a uid privado) — por eso `isAuthenticated()` en Storage incluye anónimos (raíz de SEC-07).

## 🚀 Runbook de despliegue (P0 escrito en código ✅, gated por OK + consola)
**Estado (2026-06-08)**: SEC-03 (tope) + SEC-04 (candado Telegram) **DESPLEGADOS ✅ y EN VIVO** (`firebase deploy --only functions`, 28 funciones OK; revisión adversarial OK + `node -c` OK). `TELEGRAM_WEBHOOK_SECRET` seteado (v1) + webhook re-registrado con `secret_token` (`getWebhookInfo`: 0 errores, 0 pendientes). **Falta**: App Check (espera site key del cliente) + SEC-01 (Opción A; pre-seed + OK).

- **SEC-03 maxInstances** ✅ HECHO — `firebase deploy --only functions`. Aditivo; las funciones con `maxInstances` propio lo conservan; **sin cambio de region**. Tope global 10 (per-función puede subirse si alguna lo necesita).
- **SEC-04 candado Telegram** ✅ HECHO — orden ejecutado: (1) `firebase functions:secrets:set TELEGRAM_WEBHOOK_SECRET` (aleatorio, v1); (2) `firebase deploy --only functions`; (3) webhook re-registrado vía Telegram API (`setWebhook` con `secret_token` = el secret, URL `…cloudfunctions.net/linkTelegramChat`). Alertas existentes (`sendTelegramAlert`) intactas (no pasan por el webhook).
- **SEC-02 App Check (anti-spam) — necesita 1 paso del cliente en consola**:
  - **Init points (modo monitor)**: `js/core/firebase-config.js:132` (app [DEFAULT], compat — activate canónico) + cargar `firebase-app-check-compat.js` en el `Promise.all` crítico (~L71-74); `admin-app/src/core/firebase.js:27` (modular, `initializeAppCheck`). **Mismo SITE KEY** (misma web app). `firebase-messaging-sw.js` queda **INTACTO** (reCAPTCHA v3 no corre en Service Worker; no toca Firestore/Storage). El bot ALTOR (`js/concierge`,`js/ai`) reusa `window.db` → cubierto por el activate del compat.
  - **Consola (cliente)**: Firebase → App Check → web app `1:235148219730:web:…` → proveedor **reCAPTCHA v3** (NO Enterprise = $0) → copiar **SITE KEY** → dominios `altorracars.github.io` + `localhost` → dejar TODOS los recursos en **Unenforced** (monitor).
  - **Rollout**: Fase 0 consola (Unenforced) → Fase 1 código monitor (**cache bump §4**) → Fase 2 observar 1-2 sem (% Verified ~100%) → Fase 3 enforce por-recurso (reversible, empezar por Storage). Scripts Node + Functions usan Admin SDK → exentos.
  - ⚠️ Nunca enforce antes de ~100% verificado; nunca olvidar la carga del CDN (si no, `firebase.appCheck` = undefined → skip silencioso → clientes sin token).

## Pendientes / próxima ronda
- Ejecutar P0 → P1 → P2 tras OK + Gemini (SEC-01).
- **field-level**: `unchanged('ownerId','score','consent')` para que un asesor no edite esos campos ajenos (gap holístico).
- App Check rollout monitor→enforce en las 3 superficies (público compat + admin-app modular + bot concierge).
- Re-auditar tras el deploy (verificar que no se rompió el acceso del público ni del admin).
