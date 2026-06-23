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

## 4. Gemini (consejo externo) VERIFICADO + VEREDICTO FINAL
Gemini (Antigravity, code-aware) confirmó diagnóstico + rumbo (C+D, regla estricta, rechaza A/B). **Verificación paso 4 (no asumir):**
- ✅ Diagnóstico exacto; `escalateToLive` (concierge.js:1300) también llama `createSoftContact` → `_leadCreated=true` casi siempre → el gate cae en update. Verificado.
- ⚠️ **CORRECCIÓN**: Gemini dijo que `isEditorOrAbove` revisa *Custom Claims*; el código (firestore.rules:21-22 + 54-57) usa **lookup `usuarios/{uid}`** (callejón a / §159.3; claims = Fase 5). Mismo resultado (no-admin denegado, incl. cliente logueado sin doc en `usuarios/`), mecanismo distinto. **Gana el código.**
- ✅ Matices nuevos válidos: (i) **Callables sin caché offline** → `enrichLead` falla inmediato en red mala → la cola local (D) es load-bearing para reintentar offline; (ii) **idempotencia** (`set({merge:true})`, no-op si ya enriquecido); (iii) App Check.

**DECISIÓN (presidente, con 2 divergencias razonadas de Gemini):**
1. **C** = callable `enrichLead(leadId,{nombre,telefono,email,consent})` — Admin SDK, `merge:true`, idempotente por leadId, valida consent server-side. UPDATE DIRIGIDO (cero duplicado).
2. **D** = quitar `.catch(){}` mudo (1236/1255); confirmar SOLO tras ACK; en fallo → cola local idempotente + reintento + **WhatsApp prellenado**; clasificar permission-denied vs red.
3. **Regla UPDATE INTACTA** (ratificado ×comité ×Gemini).
4. **Stop placeholder**: ingestión escribe `name:null, status:anonymous`, jamás "Cliente os6i1s".
5. **DIVERGENCIA App Check**: Gemini pide forzarlo en el callable; **NO lo fuerzo aún** — el cerebro defiere App Check enforce (§41: riesgo lead-block silencioso + tráfico bajo) y forzarlo en `enrichLead` reintroduciría el lead-block que estamos arreglando. Interim sin App Check: leadId 20-char alta entropía + el callable **exige `sessionId` y lo cruza con `doc.sessionId`** (no enumerable) + guard de estado (solo enriquecer docs anonymous/sin-email) + rate-limit. App Check se suma como capa con la decisión global §41.
6. **DIVERGENCIA mecanismo**: corregido claims→lookup (arriba).
Legal: consent timestamp + versión-de-texto server-side (audit trail anti-SIC); **NO almacenar IP sin base legal** (IP = PII bajo 1581 → gate abogado P4); el TEXTO de consentimiento sigue en gate P4 (`legal-colombia`).

## 5. Plan por fases (post-veredicto)
- **Fase 0 (bleed-stop, DIRECTO, sin reglas/función)**: gate result-aware (los writes devuelven promesa; `handleGateSubmit` espera el ACK; "¡Listo!" SOLO tras éxito; en fallo → WhatsApp prellenado con nombre/celular); matar catch mudo (1236/1255). Detiene la mentira + salva el lead vía WhatsApp HOY. **← implementable ya, bajo riesgo.**
- **Fase 1 (C, Decisión Fuerte)**: function `enrichLead` (merge+idempotente+sessionId-match+status-guard) + wiring cliente (gate llama `enrichLead` en vez de `updateSoftContact` para no-admin) + stop-placeholder en la ingestión + cola local. Deploy Claude (`firebase deploy --only functions`). Re-validar live.
- **Fase 2**: dedup cascada (leadId→sessionId→tel→email) 2ª red + job expiración de anónimos + App Check enforce (con §41).
- Re-validación LIVE (validador adversarial) tras Fase 0 y Fase 1.

## Checklist
- [x] Verificación de causa raíz — `js/concierge/concierge.js:2712` (gate→update) + `firestore.rules:773` (update solo-admin) + `js/concierge/concierge.js:1236` (catch mudo)
- [x] Comité acotado (3 expertos) capturado — síntesis §3 + agentIds `a1f890f32c7c1de42`/`ab9aa324dbf7930d0`/`a6ad4676a43e357fe`
- [x] Consejo externo Gemini verificado — §4 (confirmó C+D; corregí claim claims→lookup `firestore.rules:21`; divergencia App Check razonada)
- [x] Veredicto final — §4 (C+D, regla intacta, App Check diferido con mitigaciones, consent server-side)
- [ ] Autorización dueño + Fase 0 (D) implementada + re-validada live
- [ ] Fase 1 (C) implementada + re-validada live
