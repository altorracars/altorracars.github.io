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
| **SEC-01** | 🟠 med | RBAC-read laxo en CRM: `read: if isAuthenticated() \|\| hasPermission('crm.read')` es **redundante** → cualquier admin (aun sin `crm.read`) lee PII (incl. roles custom con `permissions:[]`). | `firestore.rules:314,321,328,336,343,353,361` (leads/contacts/crmNotes/activities/deals/subscriptions/failedIngestions) | Endurecer a **`isEditorOrAbove() \|\| hasPermission('crm.read')`** en TODAS a la vez (NO a solo `hasPermission` → rompería editor+ sin el permiso; la admin-app lee asumiendo `isAuthenticated()`). | **SÍ** (modelo RBAC + prod) |
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

## ⚖️ Decisión Fuerte (SEC-01) — gate de despliegue
El cambio de RBAC-read **puede bloquear a un admin sin `crm.read`** en pleno lanzamiento (la `admin-app` lee asumiendo `isAuthenticated()` y solo gatea mutaciones en `crm.edit`). Por eso: (1) **prompt a Gemini/§15** (Decisión Fuerte, modelo de datos/seguridad); (2) **verificar** que super_admin/editor reales tengan acceso y que ningún rol viewer dependa de leer el CRM; (3) **emulator rules tests**; (4) **OK explícito del cliente**; (5) deploy MANUAL por Claude. Recomendación de fix = `isEditorOrAbove() || hasPermission('crm.read')` (preserva editor+, cierra el hueco de viewers/custom-roles).

## Excepciones / decisiones específicas de Altorra
- ⚠️ El verificador **corrigió la justificación** de SEC-01: el patrón `isAuthenticated() || hasPermission(x.read)` NO es un descuido del CRM — es **convención de la casa** (también en `concesionarios:112`, `citas:368`, `vehículos auditLog:99`). El fix sigue siendo válido; la cita de precedente (`concesionarios usa isEditorOrAbove`) era falsa → L-34 en acción.
- **Deploy de reglas/functions = MANUAL** por Claude (`firebase deploy --only ...`), con OK. Nunca romper el público que crea `solicitudes`/`citas`/`subscriptions`.
- Auth anónimo del público (`auth.js signInAnonymously`) es **intencional** (favoritos/historial atados a uid privado) — por eso `isAuthenticated()` en Storage incluye anónimos (raíz de SEC-07).

## Pendientes / próxima ronda
- Ejecutar P0 → P1 → P2 tras OK + Gemini (SEC-01).
- **field-level**: `unchanged('ownerId','score','consent')` para que un asesor no edite esos campos ajenos (gap holístico).
- App Check rollout monitor→enforce en las 3 superficies (público compat + admin-app modular + bot concierge).
- Re-auditar tras el deploy (verificar que no se rompió el acceso del público ni del admin).
