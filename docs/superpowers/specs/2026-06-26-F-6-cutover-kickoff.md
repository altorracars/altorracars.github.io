# 🧭 F-6 CUTOVER PWA-safe — KICKOFF / runway ⟦OPUS-4.8⟧

> **El último paso del PLAN-UNIFICADO (§237 §9.C): retirar `admin.html` → `_legacy/`.**
> IRREVERSIBLE-ish (cuarentena, no borrado). Prerrequisitos: portal nuevo live ✅ (F-2..F-5 +
> Hub en `/admin-app/dist/`) + Hub validado live (smoke ✅; detalle/interacción pend chat real).
> Este spec captura la INVESTIGACIÓN verificada en vivo (26/06) + las decisiones, para que la
> sesión que ejecute el cutover no re-investigue. NO ejecutar el flip sin: (a) detalle del Hub
> validado live, (b) go/no-go del dueño (toca la operación de los asesores).

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

## §2 — SW zombie (riesgo §9.B.6 / red-team #6) — NUANCE CRÍTICA
El admin viejo es PWA: su SW pudo cachear el shell viejo en el celular del asesor → tras el cutover
serviría el `admin.html` viejo (zombie), no el portal nuevo. Fix: un script en el `index.html` del
portal nuevo que **des-registre los SW viejos**. ⚠️ **NO matar el SW del SITIO PÚBLICO** (`service-worker.js`
scope `/` sirve el sitio clásico + su offline). `getRegistrations()` devuelve TODOS los SW del origen →
hay que distinguir el del admin del público (por scope/scriptURL) y solo des-registrar el del admin.
El portal nuevo NO usa SW propio → no agrega zombie nuevo. (Validar en celular real tras desplegar.)

## §3 — Checklist de PARIDAD (gate del flip — §9.C "trigger de retiro del monolito")
Antes de mandar `admin.html`→`_legacy/`, confirmar que el portal nuevo cubre TODO lo del viejo:
- [ ] Hub detalle/claim/responder/typing/presence/gestión validados LIVE (necesita chat real).
- [ ] Cada sección del admin viejo tiene equivalente en admin-app (F-2..F-5 lo cubren; barrer admin.html).
- [ ] FCM / Web-Push paridad en el portal nuevo (el viejo notificaba; ¿el nuevo?) — red-team #2.
- [ ] Multi-tab + RTDB + offline OK en el nuevo (F-0.5).
- [ ] El dato que entra por el bot/form aparece en el CRM del portal nuevo (multi-superficie).

## §4 — Secuencia del cutover (cuando §3 ✅ + go/no-go dueño)
1. Script unregister-SW-admin-viejo en el `index.html` del portal nuevo (§2) + validar en celular.
2. Mover `admin.html` + sus assets exclusivos a `_legacy/` (cuarentena `anti-codigo-muerto`, NO borrar) +
   redirect `admin.html`→`/admin-app/dist/` (para los bookmarks/SW-zombie que aún peguen al viejo).
3. Mensaje de re-login en el portal nuevo (§1).
4. Cache bump del SITIO público si el redirect toca assets cacheados (§4 doctrina).
5. Validación live post-cutover (celular asesor real: ¿ve el portal nuevo? ¿no el zombie?).
6. ADR §251 + índice + 05/10 + retiro de `admin.html` del 20-ESPACIAL.

## Checklist (la sesión del cutover lo tickea con evidencia)
- [x] Storage/SW verificado en vivo (§0) · [x] Decisión auth = re-login (§1)
- [ ] Hub detalle validado live (chat real)
- [ ] Script unregister-SW (NO matar SW público) + validado en celular
- [ ] Paridad §3 ✅
- [ ] Flip `admin.html`→`_legacy/` + redirect (go/no-go dueño)
- [ ] ADR §251 + post-cutover live OK
