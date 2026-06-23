# TODO-37 — P0: pérdida silenciosa de leads anónimos/no-admin (Decisión Fuerte EN CURSO) ⟦OPUS-4.8⟧

> Cazado EN VIVO por `validacion-live-chrome` (cruce consistencia bot↔CRM, 2026-06-23). Pipeline
> `proceso-decision-fuerte` en marcha: ✅ verificación · ✅ comité acotado · ⏳ Gemini (consejo externo) · ⏳ veredicto · ⏳ impl por fase.

## 1. Síntoma (evidencia live)
Guest/anónimo completa el gate "Coordinemos tu visita" (Nombre PRUEBA-QA, Cel 3000000000, consent) → el bot
confirma "¡Listo, ya tengo tus datos!" PERO el lead **NO llega a ningún lado** (ni Hub viejo, ni Bandeja CRM,
ni Contactos). Network: 1× `Firestore/Write/channel POST 400` (real, no 503) → `TYPE=terminate`. Sin log de
error. El cliente cree que dejó sus datos → **pérdida de ventas reales**.

## 2. Causa raíz (VERIFICADA en código, no asumida)
- `handleGateSubmit` (concierge.js:2712-2713): `if(!_leadCreated) createSoftContact(); else updateSoftContact();`
- El 1er mensaje ya disparó `createSoftContact()` (U.16) → `solicitudes.add()` `userId:null` → **CREATE público PERMITIDO** → `_leadCreated=true`, `leadId` seteado, doc guest SIN nombre.
- El gate cae entonces en **`updateSoftContact()`** → `solicitudes.doc(leadId).update({nombre,telefono,email})`.
- **Regla UPDATE (firestore.rules:773-775)**: `allow update: if isEditorOrAbove() || hasPermission('crm.edit') || hasPermission('appointments.edit')` → **EXIGE ADMIN**. Guest/cliente no-admin → **DENEGADO → 400**.
- `.catch(function(){})` SILENCIOSO (concierge.js:1236 y 1255) → sin rollback → confirmación optimista FALSA.
- **Alcance**: TODO no-admin cuyo lead se enriquece por UPDATE. Los logueados "funcionan" solo porque su
  nombre/email vienen del perfil auth en el CREATE (sin update). El dato TECLEADO del gate se pierde para todos.

## 3. Comité acotado (3 expertos, sin tools, sobre diagnóstico verificado) — síntesis
Agentes: `a1f890f32c7c1de42` (reglas/seguridad) · `ab9aa324dbf7930d0` (frontend/optimistic-UI) · `a6ad4676a43e357fe` (datos/CRM).

**Consenso:**
- **Rechazar A** (aflojar regla UPDATE): anti-impersonación de "su propio doc" sin auth confiable es indemostrable; `leadId` no es secreto (enumerable) → abriría UPDATE público a toda la colección (tampering/spoofing de leads reales). La regla UPDATE solo-admin **está bien**.
- **D OBLIGATORIO y PRIMERO** (bleed-stop, transversal, sin tocar reglas): matar el catch mudo; confirmar SOLO tras ACK real; en fallo → clasificar (permission-denied determinista NO reintentar vs transitorio reintentar con backoff) → rollback + **fallback WhatsApp prellenado** + cola local idempotente (`clientLeadId` UUID) + telemetría SIN PII con alerta si `permission_denied>0`. ⚠️ trampa: con persistencia Firestore offline la promesa resuelve local sin ACK server → confirmar contra server, no cache.

**Divergencia B vs C (la joya — el experto de datos la cazó):**
- B (CREATE en el gate en vez de UPDATE) **DUPLICA**: el fantasma no tiene clave de persona (todo null) → la dedup por celular/correo NO hace match → inserta 2º doc → fantasma huérfano + enriquecido. B solo sirve si la dedup correlaciona por `sessionId`/`leadId` (trabajo nuevo) ⇒ "B = C + riesgo duplicado".
- **C recomendado**: callable `enrichLead(leadId,{nombre,telefono,email,consent})` (Admin SDK, bypassa rules, UPDATE DIRIGIDO por leadId, valida consentimiento Ley 1581 server-side). Cero duplicado, preserva `createdAt`, cliente nunca toca el canónico (M-18). Costo: +1 función (barato).
- **Anti-fantasma estructural**: la ingestión NUNCA debe fabricar nombre placeholder ("Cliente os6i1s") → escribir `name:null, status:anonymous`; promover a `qualified` solo al enriquecer. Job de expiración de anónimos viejos.

## 4. Veredicto preliminar del presidente (a verificar con Gemini)
**D (ya, bleed-stop directo, sin reglas) + C (estructural, vía Decisión Fuerte) + dejar de fabricar placeholder + regla UPDATE INTACTA.** B-diferido como fallback $0 SOLO si se refuerza dedup por leadId/sessionId. Legal: el punto de validación de consentimiento (Ley 1581) → revisar con `legal-colombia` al diseñar C.

## 5. Pendiente
- ⏳ **Gemini (Antigravity)**: verificar adversarialmente diagnóstico + C-vs-B + ¿C sobre-ingeniería? + ángulo 1581 + que la regla siga estricta. (Prompt entregado al dueño en chat.)
- ⏳ Veredicto final → impl por fase: **Fase 0 = D** (bleed-stop) → **Fase 1 = C** + stop-placeholder → **Fase 2** App Check en `solicitudes` + dedup cascada + job reconciliación.
- ⏳ Re-validación LIVE (validador) tras cada fase.

## Checklist
- [x] Verificación de causa raíz — `js/concierge/concierge.js:2712` (gate→update) + `firestore.rules:773` (update solo-admin) + `js/concierge/concierge.js:1236` (catch mudo)
- [x] Comité acotado (3 expertos) capturado — síntesis §3 + agentIds `a1f890f32c7c1de42`/`ab9aa324dbf7930d0`/`a6ad4676a43e357fe`
- [ ] Consejo externo Gemini verificado
- [ ] Veredicto final + autorización dueño
- [ ] Fase 0 (D) implementada + re-validada live
- [ ] Fase 1 (C) implementada + re-validada live
