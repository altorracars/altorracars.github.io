# 🧭 F-6 CUTOVER PWA-safe — KICKOFF / runway ⟦OPUS-4.8⟧

> **El último paso del PLAN-UNIFICADO (§237 §9.C): retirar `admin.html` → `_legacy/`.**
> IRREVERSIBLE-ish (cuarentena, no borrado). Prerrequisitos: portal nuevo live ✅ (F-2..F-5 +
> Hub en `/admin-app/dist/`) + Hub validado live (smoke ✅; detalle/interacción pend chat real).
> Este spec captura la INVESTIGACIÓN verificada en vivo (26/06) + las decisiones, para que la
> sesión que ejecute el cutover no re-investigue.
>
> ✅ **GO — el dueño PRE-AUTORIZÓ todo F-6 para una sesión fresca (26/06, "autorizo todo en una
> sesión fresca cerremos")**: ejecutar **(1) auth = RE-LOGIN** (§1) · **(2) PORTAR FCM** al admin-app
> (gap §3, autorizado) · **(3) SW-unregister + flip**. NO re-preguntar el go/no-go. **PERO la
> disciplina de ejecución se mantiene**: NO mandar `admin.html`→`_legacy/` sin (a) detalle del Hub
> validado LIVE (necesita un chat real — pedir al dueño o esperar tráfico) y (b) checklist §3 cerrado
> + (c) validación post-cutover en celular real. La autorización abre el gate; no salta la verificación.

## §0 — Estado verificado en vivo (Chrome, navegador del dueño, 26/06)
Storage del origen `altorracars.github.io` (leído con la extensión, solo claves+longitud, NO tokens):
- **Auth NUEVO (`altorra-crm`, admin-app modular `browserLocalPersistence`)** → **localStorage** `firebase:authUser:<apiKey>:altorra-crm` (len ~2345). Sesión del dueño YA presente (logueado en el portal nuevo).
- **Auth VIEJO (`altorra-admin`, admin.html compat)** → **IndexedDB `firebaseLocalStorageDb`** (NO está en localStorage). Persistencia por defecto del compat SDK = IndexedDB.
- IndexedDB presentes: `firebaseLocalStorageDb` (auth viejo) · `firestore/{[DEFAULT],altorra-admin,altorra-crm,altorra-public}/altorra-cars/main` · app-check/heartbeat/installations/messaging · `altorra-cache`.
- **SW**: el portal NUEVO (`admin-app/index.html`) **NO registra Service Worker** (grep vacío). El admin VIEJO sí (`js/admin/admin-pwa.js`) + el público (`service-worker.js` scope `/`, `firebase-messaging-sw.js`).

## §1 — DECISIÓN: auth bridge → ❌ DESCARTADO · ✅ RE-LOGIN único
El plan §9.B.2 propuso "migrar el token IndexedDB `altorra-admin`→`altorra-crm`" para evitar mass-logout.
**Verificado que sería un transform cross-mecanismo (IndexedDB→localStorage) + cross-appname del blob
interno de Firebase Auth → frágil (depende del formato del SDK, cambia entre versiones) y sensible
(cirugía de tokens de sesión).** Llamada de arquitecto (Lente §3.8, pilares seguridad+mantenibilidad):
- **DROP el bridge. Aceptar un RE-LOGIN único** en el cutover (mensaje claro: "Actualizamos el portal,
  inicia sesión de nuevo"). Costo real = pocos asesores logueándose una vez (tienen su contraseña) =
  fricción trivial; el "mass-logout" del plan está sobredimensionado.
- **Por qué re-login >> bridge**: seguridad (cero cirugía de tokens) · robustez (un re-login no se puede
  romper; un bridge buggy = mass-logout igual o sesión corrupta) · mantenibilidad (cero código frágil
  que testear/mantener) · simplicidad (elimina la pieza más riesgosa de F-6).
- **Si el dueño insiste en el bridge** (cero re-login): ENTONCES sí → `proceso-decision-fuerte` completo
  (comité + Consejo Externo Gemini `15` + verificar cada claim) ANTES de tocar tokens. No improvisar.

## §2 — SW zombie (riesgo §9.B.6 / red-team #6) — ⚠️ PREMISA CORREGIDA (2026-06-25, verificado en código)
**La premisa original era FALSA.** Re-leído `js/admin/admin-pwa.js:106-122` (registerSW): el admin viejo
**NO registra un SW dedicado** — solo se asegura de que el SW PÚBLICO `service-worker.js` (scope `/`) esté
registrado (`navigator.serviceWorker.register('/service-worker.js', {scope:'/'})`). **Hay UN solo SW en
el origen** (scope `/`), compartido por sitio público y admin. Por tanto **NO existe "el SW del admin"
que des-registrar** — un script `getRegistrations()→unregister` solo podría apuntar al SW público y lo
MATARÍA (rompe el offline del sitio). **El script de unregister se DESCARTA** (no se implementa).

**Riesgo zombie real y mitigación (verificado `service-worker.js`):**
- HTML se sirve **Network-First** (líneas 108-114) → un asesor *online* SIEMPRE recibe el `admin.html`
  fresco (el redirect post-flip). El zombie solo afectaría a un asesor **offline con la PWA instalada**.
- El `activate` del SW **borra los caches viejos** (líneas 52-62) en cada bump de `CACHE_VERSION`.
- **Estrategia del flip**: confiar en (a) network-first del HTML + (b) el redirect dentro de `admin.html`
  + (c) el **cache-bump rutinario del cron** (dueño del bump, §05/L-02) que purga el `admin.html` cacheado.
  NO se agrega script de SW. (Validar en celular real instalado tras el flip — gate.)
- El SW de FCM (`firebase-messaging-sw.js`, scope `/firebase-cloud-messaging-push-scope`) es SEPARADO y
  lo re-registra el portal nuevo (F-6 FCM port ✅) — sin conflicto con `service-worker.js`.

## §3 — Checklist de PARIDAD (gate del flip — §9.C "trigger de retiro del monolito")
**Auditoría 26/06 (verificada):** las **19 `data-section` del admin viejo tienen equivalente** en admin-app
(audit→auditoria · banners · brands→marcas · calendar→config · concierge→**hub** · crm→bandeja/pipeline/
contactos/agenda · dashboard→inicio · dealers→aliados · departments→departamentos · kb→cerebro · lists→
atributos · reports→reportes · reviews→resenas · roles · settings→ajustes · unmatched · users→usuarios ·
vehicles · workflows). Paridad de secciones ✅. **GAPS detectados (decidir antes del flip):**
- ✅ **FCM / Web-Push — PORTADO (2026-06-25, §251)**: `admin-app/src/core/fcm.js` (port modular del compat
  `js/admin/admin-fcm.js`) + `src/styles/fcm.css` + wiring en `main.js` (`initFcm()` en `enterApp`). Escribe
  el token en `usuarios/{uid}.fcmTokens[]` con la MISMA forma de objeto `{token,deviceLabel,addedAt,lastUsedAt}`
  que el viejo → la Cloud Function `onChatEscalated` lo consume SIN cambios server-side (verificado). Re-registra
  `/firebase-messaging-sw.js` (no toca el SW público). Verificado: build OK + boot limpio mock (0 errores) +
  card 340px render OK (dark/light). **PEND validación LIVE**: prompt+grant+token real+push end-to-end (gate, necesita device real). dist rebuilt.
- ✅ **Editor de plantillas (`sec-templates`/`admin-templates.js`) — GAP RESUELTO = NO-GAP (verificado 26/06)**:
  el editor del admin viejo YA está **oculto** (`.msg-templates-add{display:none}` + comentario "Mantenido oculto…
  Eliminar en commit 6"). El dato `config/messageTemplates` lo consume el modal de citas inline; el Hub usa
  quick-replies hardcodeadas. **No hay editor visible que portar → aceptar (cero regresión).**
- 🔎 **Perfil propio (`sec-profile`/`admin-profile.js`, 1118L) — RE-EVALUADO (26/06): NO es "menor", es un CENTRO
  DE SEGURIDAD.** Contiene: avatar (Storage), datos personales, cédula-lock+solicitud super-admin, info de cuenta,
  **cambio de contraseña**, **2FA-SMS** (`habilitado2FA`/`telefono2FA`), **dispositivos de confianza**, **backup
  codes**, **preguntas de seguridad**, Telegram link/webhook. **Verificado `admin-app/src/core/auth.js`: el portal
  nuevo es email+password modular PURO** (sin `multiFactor`/`RecaptchaVerifier`/trusted-devices/recovery) → el
  stack SMS-MFA NO encaja (escribiría flags que nada hace cumplir). **Llamada de arquitecto (Lente §3.8, seguridad+
  mantenibilidad+simplicidad), análoga a §245/L-53 (no portar maquinaria que no fija el modelo nuevo):**
  - **PORTAR (encaja, requerido por cero-regresión de lo que aplica)**: avatar · nombre/teléfono/prefijo · cédula-lock
    + solicitud · info de cuenta read-only · **cambio de contraseña** (`updatePassword` modular + reauth).
  - **DIFERIR a fase MFA-hardening (fuera de F-6; ya es la realidad live del portal nuevo)**: 2FA-SMS · trusted
    devices · backup codes · preguntas de seguridad. **Razón clave: el portal nuevo YA está live y YA es
    email+password-only; los asesores ya entran así → retirar `admin.html` NO cambia su auth → soltar el SMS-MFA
    no es una regresión introducida por F-6** (solo elimina el login viejo paralelo que sí lo tenía).
  - **DIFERIR (canal aparte, no bloquea cutover)**: Telegram link/unlink/webhook (notificación; el portal nuevo ya
    tiene FCM web-push ✅).
  - **DECISIÓN DEL DUEÑO (pilar seguridad, spec §"decidir antes del flip")**: ¿aceptar el subset (email+password-only,
    ya-live) o exigir reimplementar 2FA/recovery en el portal nuevo ANTES del flip (= mini-epic separado, no F-6)?
- [ ] **Hub detalle/claim/responder/typing/presence/gestión validados LIVE** (necesita chat real) — el gap más importante.
- [ ] Multi-tab + RTDB + offline OK en el nuevo (F-0.5, verificado parcial en el smoke).
- [ ] El dato que entra por el bot/form aparece en el CRM del portal nuevo (multi-superficie).

## §4 — Secuencia del cutover (cuando §3 ✅ + go/no-go dueño)
1. ~~Script unregister-SW~~ **DESCARTADO** (§2 corregido: no hay SW de admin separado). En su lugar:
   el redirect (paso 2) + network-first del HTML + el cache-bump del cron cubren el zombie.
2. Mover `admin.html` + sus assets exclusivos a `_legacy/` (cuarentena `anti-codigo-muerto`, NO borrar) +
   redirect `admin.html`→`/admin-app/dist/` (para bookmarks/PWA-instalada que aún peguen al viejo).
3. Mensaje de re-login en el portal nuevo (§1) — ✅ **BUILT (2026-06-25, login.js)**. El asesor sin
   sesión `altorra-crm` cae al login nuevo; un banner contextual ("Renovamos el panel… iniciá sesión
   de nuevo") se auto-muestra cuando detecta **marcadores localStorage del admin viejo** (mismo origen:
   `altorra_admin_pwa_installed/_welcomed`, `altorra_fcm_prompted_at`). **Self-contained: NO depende del
   redirect param**; dismiss persistente + auto-dismiss tras el 1er login nuevo. Verificado en preview.
4. Cache bump del SITIO público (lo hace el cron, §05/L-02) → purga el `admin.html` viejo cacheado.
5. Validación live post-cutover (celular asesor real, idealmente con la PWA vieja instalada: ¿ve el portal
   nuevo? ¿no el zombie? ¿recibe el push FCM?).
6. ADR §251 + índice + 05/10 + retiro de `admin.html` del 20-ESPACIAL.

## Checklist (la sesión del cutover lo tickea con evidencia)
- [x] Storage/SW verificado en vivo (§0) · [x] Decisión auth = re-login (§1)
- [x] **Paridad §3 auditada**: 19/19 secciones ✅
- [x] **FCM/Web-Push PORTADO** (2026-06-25, §251): `fcm.js`+`fcm.css`+wiring, build+boot+render verificados; PEND validación live end-to-end (device real)
- [x] **Premisa §2 SW corregida** (no hay SW de admin separado → script unregister DESCARTADO; zombie cubierto por network-first+redirect+cache-bump)
- [x] **Banner re-login BUILT** (2026-06-25, login.js): auto-detecta marcadores localStorage del admin viejo (self-contained, no necesita el redirect); dismiss persistente + auto-dismiss tras login. Verificado en preview.
- [ ] Hub detalle validado live (chat real) — gate principal, necesita tráfico/dueño
- [x] **Gap plantillas = NO-GAP (26/06)**: el editor del admin viejo ya estaba oculto (`display:none`) → aceptar, cero regresión.
- [x] **Gap perfil RESUELTO — módulo `perfil` PORTADO + VERIFICADO (26/06, §253)**: `admin-app/src/modules/perfil/`
  (`perfil.ui.js`+`perfil.data.js`) + `styles/perfil.css`, accesible desde el **menú de usuario** (topbar → `#/perfil`,
  no sidebar). Subset que encaja en el auth nuevo: avatar (Storage `avatars/{uid}.webp`) · nombre/teléfono/prefijo ·
  cédula one-time-edit + solicitud al super-admin · info de cuenta read-only · **cambio de contraseña con reautenticación
  + política fuerte** (mejora sobre paridad). **Decisión del dueño (26/06): "la opción más segura"** → subset ahora +
  MFA-hardening (TOTP) como fase futura aparte (NO el SMS-MFA viejo). **Diferido** (no encaja / canal aparte): 2FA-SMS,
  trusted-devices, backup-codes, preguntas, Telegram link → TODO-43. Verificado: build 0-err (148 mód) · boot mock 0-err ·
  4 tarjetas render · fuerza de contraseña (1→5) · dirty-detection · cédula-lock · acceso topbar. dist rebuilt.
  **✅ VALIDADO LIVE (26/06, extensión Chrome, sesión real del dueño post-merge)**: render con datos reales (Daniel
  Romero/Super Admin) · **avatar real desde Storage (request 200)** · **cédula-lock real (locked+readonly+solicitar)** ·
  fecha real (`fmtDate` Timestamp→"16 abr 2026") · consola 0-err (sweep onlyErrors) · red 11 req TODAS 200 · fuerza de
  contraseña 1→5 · dirty-detection · acceso menú-usuario→`#/perfil` · ciclo de ruta (desmonta/re-monta limpio). NO
  live-ejecutado (barandas: cuenta real): submit password/perfil/avatar (verificados por código). Obs menor: "Último
  acceso: —" (auth nuevo no escribe `ultimoAcceso` en login; cosmético, ajeno al módulo).
- [ ] Flip `admin.html`→`_legacy/` + redirect (go/no-go dueño) — banner re-login ya BUILT
- [ ] Cache-bump del cron post-flip + validación live en celular (incl. PWA vieja + push FCM)
- [ ] ADR §251 cierre + post-cutover live OK
