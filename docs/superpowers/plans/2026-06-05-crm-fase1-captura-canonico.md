# CRM Fase 1 — Núcleo de Captura (modelo canónico + ingestión de solicitudes) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Capturar sin pérdida la entrada principal del negocio (`solicitudes`) normalizándola, vía un trigger de Cloud Function, a un modelo canónico de CRM (`contacts` + `leads` + `activities`) con deduplicación, consentimiento, idempotencia y dead-letter — la base que mata la "hemorragia" y establece el patrón que seguirán los demás canales.

**Architecture:** Capa de ingestión event-driven (Anti-Corruption Layer): el sitio público sigue escribiendo en `solicitudes` SIN CAMBIOS; un trigger `onDocumentCreated` normaliza cada doc a colecciones canónicas planas. La **lógica de normalización es pura** (módulo sin dependencias de Firebase → unit-testeable con Vitest, rápido, sin emulador); el **trigger es fino** (solo I/O Firestore + idempotencia + try/catch→dead-letter). Decisiones en `docs/superpowers/specs/2026-06-05-crm-rebuild-design.md` (§4 modelo, §15 Consejo Externo).

**Tech Stack:** Node 22 · firebase-functions v2 (`firebase-functions/v2/firestore`) · firebase-admin v13 · Vitest (nuevo, dev-only) · Firestore (colecciones planas) · GitHub Pages (sitio público intacto).

> **Convención git de este repo (override del skill):** los commits los hace el CLIENTE en GitHub Desktop. Donde el plan dice "Commit", el ejecutor **entrega el mensaje listo** (summary + cuerpo) para pegar; NO corre `git commit` ni `git push` sin pedido explícito. `git add` siempre de archivos específicos (nunca `-A`).

> **MVP cut consciente (documentado, no silencioso):** este plan cubre SOLO el canal `solicitudes`. Los demás canales (creación de cuenta `clientes`, bot `conciergeChats`, newsletter `subscriptions`, favoritos/simulador) reutilizan el MISMO patrón en un plan siguiente (`fase1-slice2`). El backfill de datos históricos y los tests de reglas con emulador van en sus propios pasos (Task 8 / Fase 5).

---

## File Structure

| Archivo | Responsabilidad | Acción |
|---|---|---|
| `functions/package.json` | Añadir Vitest (devDep) + script `test` | Modify |
| `functions/vitest.config.js` | Config de Vitest (entorno node) | Create |
| `functions/src/ingestion/normalize.js` | **Lógica PURA**: `normalizeSolicitud`, `contactDedupKey`, `mapConsent` (sin Firebase) | Create |
| `functions/src/ingestion/normalize.test.js` | Unit tests de la lógica pura | Create |
| `functions/src/ingestion/onSolicitudCreated.js` | **Trigger fino**: idempotencia + upsert contact + create lead/activity + dead-letter | Create |
| `functions/index.js` | Re-exportar el trigger nuevo (sin tocar lo existente) | Modify |
| `firestore.indexes.json` | Índices compuestos de `leads`/`contacts`/`activities` | Modify |
| `firestore.rules` | Reglas deny-by-default para las colecciones canónicas | Modify |

**Modelo de datos que produce la ingestión** (referencia para todas las tasks):

```js
// contacts/{id} — persona unificada
{ id, fullName, email, phone, type:'lead', source, sourceDetail,
  ownerId:null, ownerName:null, score:0, rating:'cold', lifecycleStage:'lead',
  tags:[], consent:{email:false,whatsapp:false,calls:false,askedAt,source,policyVersion},
  doNotContact:false, clienteUid:null, lastActivityAt, createdAt, updatedAt, _version:1 }

// leads/{id} — interés no calificado
{ id, contactId, fullName, email, phone, source, sourceDetail, vehicleOfInterestId,
  status:'nuevo', rating:'cold', score:0, ownerId:null, slaDueAt,
  consent:{...}, sourceSolicitudId, convertedTo:null, lastActivityAt, createdAt, updatedAt, _version:1 }

// activities/{id} — timeline polimórfica
{ id, type:'solicitud_inbound', subject, body, status:'open', direction:'inbound',
  relatedTo:{type:'lead', id, name}, ownerId:null, createdAt, _version:1 }

// failedIngestions/{id} — dead-letter (cero pérdida)
{ id, sourceCollection:'solicitudes', sourceId, error, payload, createdAt, retries:0, resolved:false }
```

---

### Task 1: Configurar Vitest en `functions/` (harness de tests)

**Files:**
- Modify: `functions/package.json`
- Create: `functions/vitest.config.js`

- [ ] **Step 1: Añadir Vitest como devDependency + script de test**

Edita `functions/package.json` para que quede así (añade `"scripts"` y `"devDependencies"`; conserva lo demás intacto):

```json
{
  "name": "altorra-cars-functions",
  "description": "Cloud Functions for ALTORRA CARS admin operations",
  "engines": { "node": "22" },
  "main": "index.js",
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest"
  },
  "dependencies": {
    "firebase-admin": "^13.0.0",
    "firebase-functions": "^7.2.2",
    "nodemailer": "^6.10.1"
  },
  "devDependencies": {
    "vitest": "^2.1.0"
  },
  "private": true
}
```

- [ ] **Step 2: Crear la config de Vitest**

Create `functions/vitest.config.js`:

```js
import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    include: ['src/**/*.test.js'],
  },
});
```

- [ ] **Step 3: Instalar dependencias**

Run (en PowerShell, desde la raíz del repo):
```
npm --prefix functions install
```
Expected: instala `vitest` en `functions/node_modules`; aparece `functions/package-lock.json` actualizado. Sin errores.

- [ ] **Step 4: Verificar que Vitest corre (sin tests aún)**

Run: `npm --prefix functions test`
Expected: Vitest arranca y reporta `No test files found` (exit 0) — confirma que el runner funciona.

- [ ] **Step 5: Commit (entregar mensaje al cliente)**

`git add functions/package.json functions/package-lock.json functions/vitest.config.js`
Mensaje para el cliente:
```
chore(functions): añade Vitest como harness de tests (CRM Fase 1)

Prepara el TDD de la capa de ingestión del CRM nuevo. Solo devDependency
(no afecta runtime ni el deploy de Functions).
```

---

### Task 2: `contactDedupKey()` — clave de deduplicación de personas (lógica pura, TDD)

**Files:**
- Create: `functions/src/ingestion/normalize.js`
- Create: `functions/src/ingestion/normalize.test.js`

- [ ] **Step 1: Escribir el test que falla**

Create `functions/src/ingestion/normalize.test.js`:

```js
import { describe, it, expect } from 'vitest';
import { contactDedupKey } from './normalize.js';

describe('contactDedupKey', () => {
  it('prioriza email normalizado (lowercase + trim)', () => {
    expect(contactDedupKey({ email: '  Juan@Mail.COM ', phone: '300 555 1234' }))
      .toBe('email:juan@mail.com');
  });

  it('usa teléfono E.164 si no hay email', () => {
    expect(contactDedupKey({ email: '', phone: '300 555 1234', prefijoPais: '+57' }))
      .toBe('phone:+573005551234');
  });

  it('quita caracteres no numéricos del teléfono y respeta el prefijo', () => {
    expect(contactDedupKey({ phone: '(300) 555-1234', prefijoPais: '+57' }))
      .toBe('phone:+573005551234');
  });

  it('no duplica el prefijo si el teléfono ya lo trae', () => {
    expect(contactDedupKey({ phone: '+57 300 555 1234', prefijoPais: '+57' }))
      .toBe('phone:+573005551234');
  });

  it('devuelve null si no hay email ni teléfono', () => {
    expect(contactDedupKey({ email: '', phone: '' })).toBeNull();
  });
});
```

- [ ] **Step 2: Correr el test para verificar que falla**

Run: `npm --prefix functions test`
Expected: FAIL — `Failed to resolve import "./normalize.js"` (el módulo aún no existe).

- [ ] **Step 3: Implementar lo mínimo**

Create `functions/src/ingestion/normalize.js`:

```js
'use strict';

/**
 * Normaliza un teléfono a E.164 aproximado: dígitos + prefijo de país.
 * @param {string} phone
 * @param {string} prefijoPais p.ej. '+57'
 * @returns {string} p.ej. '+573005551234' (o '' si no hay dígitos)
 */
function normalizePhone(phone, prefijoPais) {
  const raw = String(phone || '').trim();
  if (!raw) return '';
  const hadPlus = raw.replace(/[^\d+]/g, '').startsWith('+');
  let digits = raw.replace(/\D/g, '');
  if (!digits) return '';
  const prefixDigits = String(prefijoPais || '').replace(/\D/g, '');
  // Si el teléfono no incluía el prefijo, anteponerlo.
  if (prefixDigits && !hadPlus && !digits.startsWith(prefixDigits)) {
    digits = prefixDigits + digits;
  }
  return '+' + digits;
}

/**
 * Clave canónica para deduplicar una persona: email > teléfono.
 * @param {{email?:string, phone?:string, telefono?:string, prefijoPais?:string}} person
 * @returns {string|null}
 */
function contactDedupKey(person) {
  const email = String(person.email || '').trim().toLowerCase();
  if (email) return 'email:' + email;
  const phone = normalizePhone(person.phone || person.telefono, person.prefijoPais);
  if (phone && phone !== '+') return 'phone:' + phone;
  return null;
}

module.exports = { normalizePhone, contactDedupKey };
```

> Nota: el módulo usa `module.exports` (CommonJS, como el resto de `functions/`). Vitest importa CommonJS con `import` sin problema.

- [ ] **Step 4: Correr el test para verificar que pasa**

Run: `npm --prefix functions test`
Expected: PASS (5 tests de `contactDedupKey`).

- [ ] **Step 5: Commit (mensaje al cliente)**

`git add functions/src/ingestion/normalize.js functions/src/ingestion/normalize.test.js`
```
feat(ingestion): contactDedupKey + normalizePhone (lógica pura, TDD)

Clave de deduplicación de personas (email > teléfono E.164) para la
capa de ingestión canónica del CRM. 5 tests verdes.
```

---

### Task 3: `mapConsent()` — consentimiento Habeas Data desde la solicitud (TDD)

**Files:**
- Modify: `functions/src/ingestion/normalize.js`
- Modify: `functions/src/ingestion/normalize.test.js`

- [ ] **Step 1: Añadir el test que falla**

Añade a `functions/src/ingestion/normalize.test.js` (al final, antes de cerrar el archivo):

```js
import { mapConsent } from './normalize.js';

describe('mapConsent', () => {
  it('marca consent expreso cuando consentGiven === true', () => {
    const c = mapConsent({ consentGiven: true, email: 'a@b.com', origen: 'contacto' }, 'v1');
    expect(c.email).toBe(true);
    expect(c.whatsapp).toBe(true);
    expect(c.calls).toBe(true);
    expect(c.policyVersion).toBe('v1');
    expect(c.source).toBe('contacto');
    expect(typeof c.askedAt).toBe('string');
  });

  it('deja consent en false si no hubo autorización expresa', () => {
    const c = mapConsent({ email: 'a@b.com', origen: 'contacto' }, 'v1');
    expect(c.email).toBe(false);
    expect(c.whatsapp).toBe(false);
    expect(c.calls).toBe(false);
  });
});
```

- [ ] **Step 2: Correr y verificar que falla**

Run: `npm --prefix functions test`
Expected: FAIL — `mapConsent is not a function` / no exportada.

- [ ] **Step 3: Implementar `mapConsent` y exportarla**

En `functions/src/ingestion/normalize.js`, añade la función antes de `module.exports` y agrégala al export:

```js
/**
 * Construye el objeto consent (Ley 1581) desde la solicitud.
 * El consentimiento SOLO es true si el formulario capturó autorización expresa
 * (campo `consentGiven === true`). Sin eso, todo queda en false (doNotContact efectivo).
 * @param {object} sol  documento de solicitudes
 * @param {string} policyVersion  versión vigente de la política (p.ej. 'v1')
 */
function mapConsent(sol, policyVersion) {
  const given = sol.consentGiven === true;
  return {
    email: given,
    whatsapp: given,
    calls: given,
    askedAt: new Date().toISOString(),
    source: sol.origen || sol.source && sol.source.page || 'desconocido',
    policyVersion: policyVersion || 'v1',
  };
}
```

Y actualiza la última línea:

```js
module.exports = { normalizePhone, contactDedupKey, mapConsent };
```

- [ ] **Step 4: Correr y verificar que pasa**

Run: `npm --prefix functions test`
Expected: PASS (los 5 anteriores + 2 nuevos = 7).

- [ ] **Step 5: Commit (mensaje al cliente)**

`git add functions/src/ingestion/normalize.js functions/src/ingestion/normalize.test.js`
```
feat(ingestion): mapConsent — consentimiento Habeas Data expreso (TDD)

Solo marca consent=true si el formulario capturó autorización expresa
(consentGiven). Default seguro: doNotContact efectivo. 7 tests verdes.
```

---

### Task 4: `normalizeSolicitud()` — solicitud → {contact, lead, activity} (TDD)

**Files:**
- Modify: `functions/src/ingestion/normalize.js`
- Modify: `functions/src/ingestion/normalize.test.js`

- [ ] **Step 1: Añadir el test que falla**

Añade a `functions/src/ingestion/normalize.test.js`:

```js
import { normalizeSolicitud } from './normalize.js';

const baseSol = {
  nombre: 'Juan Pérez', email: 'Juan@Mail.com', telefono: '3005551234', prefijoPais: '+57',
  kind: 'lead', tipo: 'consulta_general', origen: 'contacto',
  vehiculoId: 'veh-123', createdAt: '2026-06-05T10:00:00Z', consentGiven: true,
};

describe('normalizeSolicitud', () => {
  it('produce contact/lead/activity con la clave de dedup correcta', () => {
    const out = normalizeSolicitud(baseSol, 'sol-1', 'v1');
    expect(out.dedupKey).toBe('email:juan@mail.com');
    expect(out.contact.fullName).toBe('Juan Pérez');
    expect(out.contact.email).toBe('juan@mail.com');
    expect(out.contact.lifecycleStage).toBe('lead');
    expect(out.contact.consent.email).toBe(true);
  });

  it('el lead referencia la solicitud origen y el vehículo de interés', () => {
    const out = normalizeSolicitud(baseSol, 'sol-1', 'v1');
    expect(out.lead.sourceSolicitudId).toBe('sol-1');
    expect(out.lead.vehicleOfInterestId).toBe('veh-123');
    expect(out.lead.status).toBe('nuevo');
    expect(out.lead.source).toBe('contacto');
  });

  it('la activity es de tipo inbound y referencia al lead por nombre', () => {
    const out = normalizeSolicitud(baseSol, 'sol-1', 'v1');
    expect(out.activity.type).toBe('solicitud_inbound');
    expect(out.activity.direction).toBe('inbound');
    expect(out.activity.relatedTo.type).toBe('lead');
    expect(out.activity.relatedTo.name).toBe('Juan Pérez');
  });

  it('lanza si la solicitud no tiene email ni teléfono (no se puede deduplicar)', () => {
    expect(() => normalizeSolicitud({ nombre: 'X' }, 'sol-2', 'v1')).toThrow(/dedup/i);
  });
});
```

- [ ] **Step 2: Correr y verificar que falla**

Run: `npm --prefix functions test`
Expected: FAIL — `normalizeSolicitud is not a function`.

- [ ] **Step 3: Implementar `normalizeSolicitud`**

En `functions/src/ingestion/normalize.js`, añade antes de `module.exports`:

```js
/**
 * Traduce un documento `solicitudes` al modelo canónico del CRM.
 * Devuelve las TRES piezas + la dedupKey; NO toca Firestore (lógica pura).
 * @param {object} sol   documento de solicitudes
 * @param {string} solId id del doc origen
 * @param {string} policyVersion
 * @returns {{dedupKey:string, contact:object, lead:object, activity:object}}
 */
function normalizeSolicitud(sol, solId, policyVersion) {
  const dedupKey = contactDedupKey({
    email: sol.email, phone: sol.telefono, prefijoPais: sol.prefijoPais,
  });
  if (!dedupKey) {
    throw new Error('No se puede deduplicar: solicitud sin email ni teléfono (' + solId + ')');
  }
  const email = String(sol.email || '').trim().toLowerCase();
  const phone = normalizePhone(sol.telefono, sol.prefijoPais);
  const fullName = String(sol.nombre || '').trim() || 'Sin nombre';
  const consent = mapConsent(sol, policyVersion);
  const source = sol.origen || (sol.source && sol.source.page) || 'web';
  const createdAt = sol.createdAt || new Date().toISOString();

  const contact = {
    fullName, email, phone, type: 'lead', source,
    ownerId: null, ownerName: null, score: 0, rating: 'cold', lifecycleStage: 'lead',
    tags: Array.isArray(sol.tags) ? sol.tags.slice() : [],
    consent, doNotContact: !consent.email, clienteUid: sol.userId || null,
    lastActivityAt: createdAt, createdAt, updatedAt: createdAt, _version: 1,
  };

  const lead = {
    fullName, email, phone, source, sourceDetail: sol.tipo || null,
    vehicleOfInterestId: sol.vehiculoId || null,
    status: 'nuevo', rating: 'cold', score: 0, ownerId: null,
    slaDueAt: sol.slaDeadline || null,
    consent, sourceSolicitudId: solId, convertedTo: null,
    lastActivityAt: createdAt, createdAt, updatedAt: createdAt, _version: 1,
  };

  const activity = {
    type: 'solicitud_inbound',
    subject: 'Nueva ' + (sol.kind || 'solicitud') + ': ' + (sol.tipo || 'general'),
    body: String(sol.comentarios || sol.mensaje || ''),
    status: 'open', direction: 'inbound',
    relatedTo: { type: 'lead', id: null, name: fullName },
    ownerId: null, createdAt, _version: 1,
  };

  return { dedupKey, contact, lead, activity };
}
```

Actualiza el export:

```js
module.exports = { normalizePhone, contactDedupKey, mapConsent, normalizeSolicitud };
```

- [ ] **Step 4: Correr y verificar que pasa**

Run: `npm --prefix functions test`
Expected: PASS (7 + 4 = 11 tests).

- [ ] **Step 5: Commit (mensaje al cliente)**

`git add functions/src/ingestion/normalize.js functions/src/ingestion/normalize.test.js`
```
feat(ingestion): normalizeSolicitud → contact/lead/activity canónicos (TDD)

Traduce un doc `solicitudes` al modelo canónico (Anti-Corruption Layer),
lógica 100% pura. 11 tests verdes.
```

---

### Task 5: Reglas + índices Firestore de las colecciones canónicas

**Files:**
- Modify: `firestore.rules`
- Modify: `firestore.indexes.json`

- [ ] **Step 1: Leer las reglas actuales**

Run: `Read firestore.rules` (localiza el bloque `match /databases/{database}/documents {`). Identifica cómo se decide hoy "es admin" (lookup a `usuarios/{uid}`).

- [ ] **Step 2: Añadir reglas deny-by-default para canónicas**

Dentro de `match /databases/{database}/documents { ... }`, añade estos bloques (reusa el helper de admin existente; si se llama distinto, ajústalo). Las colecciones canónicas son **admin-only** (el público NUNCA las lee/escribe; solo las funciones de ingestión, que corren con privilegios de admin y saltan las reglas):

```
// === CRM canónico (Fase 1) — admin-only; la ingestión escribe vía Admin SDK ===
function isAdminUser() {
  return request.auth != null &&
    exists(/databases/$(database)/documents/usuarios/$(request.auth.uid));
}
match /contacts/{id} {
  allow read: if isAdminUser();
  allow write: if isAdminUser();
}
match /leads/{id} {
  allow read: if isAdminUser();
  allow write: if isAdminUser();
}
match /activities/{id} {
  allow read: if isAdminUser();
  allow write: if isAdminUser();
}
match /failedIngestions/{id} {
  allow read: if isAdminUser();
  allow write: if false; // solo el Admin SDK (ingestión) escribe aquí
}
```

> ⚠️ Las reglas finas por rol/ownership (claims, `_version`, field-level) son de la **Fase 5 (endurecimiento, lóbulo 41)**. En Fase 1 basta admin-only deny-by-default. Esto es un MVP cut documentado.

- [ ] **Step 3: Añadir índices compuestos**

En `firestore.indexes.json`, dentro del array `"indexes"`, añade:

```json
{ "collectionGroup": "leads", "queryScope": "COLLECTION", "fields": [
  { "fieldPath": "status", "order": "ASCENDING" },
  { "fieldPath": "createdAt", "order": "DESCENDING" } ] },
{ "collectionGroup": "leads", "queryScope": "COLLECTION", "fields": [
  { "fieldPath": "ownerId", "order": "ASCENDING" },
  { "fieldPath": "lastActivityAt", "order": "DESCENDING" } ] },
{ "collectionGroup": "activities", "queryScope": "COLLECTION", "fields": [
  { "fieldPath": "relatedTo.id", "order": "ASCENDING" },
  { "fieldPath": "createdAt", "order": "DESCENDING" } ] },
{ "collectionGroup": "contacts", "queryScope": "COLLECTION", "fields": [
  { "fieldPath": "rating", "order": "ASCENDING" },
  { "fieldPath": "lastActivityAt", "order": "DESCENDING" } ] }
```

- [ ] **Step 4: Verificar sintaxis JSON**

Run: `node -e "JSON.parse(require('fs').readFileSync('firestore.indexes.json','utf8')); console.log('indexes OK')"`
Expected: imprime `indexes OK` (sin throw).

- [ ] **Step 5: Commit (mensaje al cliente) + nota de deploy**

`git add firestore.rules firestore.indexes.json`
```
feat(crm): reglas deny-by-default + índices de colecciones canónicas (Fase 1)

contacts/leads/activities/failedIngestions admin-only. Índices para las
vistas de la bandeja/pipeline. NO se auto-despliega (deploy manual).
```
> 🔴 **Deploy MANUAL requerido** (no se aplica solo): `firebase deploy --only firestore:rules,firestore:indexes`. Anótalo en el checklist de la fase.

---

### Task 6: Trigger `onSolicitudCreated` — ingestión con idempotencia + dead-letter

**Files:**
- Create: `functions/src/ingestion/onSolicitudCreated.js`
- Modify: `functions/index.js`

- [ ] **Step 1: Escribir el trigger (I/O fino sobre la lógica pura)**

Create `functions/src/ingestion/onSolicitudCreated.js`:

```js
'use strict';

const { onDocumentCreated } = require('firebase-functions/v2/firestore');
const admin = require('firebase-admin');
const { normalizeSolicitud, contactDedupKey } = require('./normalize');

const POLICY_VERSION = 'v1'; // versión vigente de la política de tratamiento

/**
 * Ingesta cada `solicitudes/{id}` nueva al modelo canónico:
 *  - upsert de `contacts` por dedupKey (email/teléfono),
 *  - crea `leads` + `activities` enlazados,
 *  - idempotente (flag `_ingestedAt` en la solicitud),
 *  - cualquier error → `failedIngestions` (dead-letter) y se relanza para retry.
 * maxInstances acota el gasto (anti factura runaway — Consejo Externo R2).
 */
exports.onSolicitudCreated = onDocumentCreated(
  { document: 'solicitudes/{solicitudId}', region: 'us-central1', maxInstances: 10 },
  async (event) => {
    const snap = event.data;
    if (!snap) return;
    const sol = snap.data();
    const solId = event.params.solicitudId;
    const db = admin.firestore();

    // Idempotencia: si ya se ingirió, salir.
    if (sol._ingestedAt) return;

    try {
      const { dedupKey, contact, lead, activity } = normalizeSolicitud(sol, solId, POLICY_VERSION);

      // Upsert de contacto por dedupKey (doc id determinístico = hash simple del key).
      const contactId = dedupKey.replace(/[^a-z0-9]/gi, '_').slice(0, 480);
      const contactRef = db.collection('contacts').doc(contactId);
      const leadRef = db.collection('leads').doc();
      const activityRef = db.collection('activities').doc();
      activity.relatedTo.id = leadRef.id;
      lead.contactId = contactId;

      const batch = db.batch();
      batch.set(contactRef, contact, { merge: true }); // merge = no pisa datos previos del contacto
      batch.set(leadRef, lead);
      batch.set(activityRef, activity);
      await batch.commit();

      // Marca idempotencia en la solicitud origen (no dispara re-ingesta).
      await snap.ref.update({ _ingestedAt: new Date().toISOString(), _leadId: leadRef.id });
    } catch (err) {
      // Dead-letter: cero pérdida de información (Consejo Externo R4).
      await db.collection('failedIngestions').add({
        sourceCollection: 'solicitudes', sourceId: solId,
        error: String(err && err.message || err),
        payload: sol, createdAt: new Date().toISOString(), retries: 0, resolved: false,
      });
      throw err; // relanza → Cloud Functions reintenta con backoff
    }
  }
);
```

- [ ] **Step 2: Re-exportar desde `index.js` (sin tocar lo existente)**

En `functions/index.js`, al FINAL del archivo (después de todo lo demás), añade:

```js
// ========== CRM Fase 1 — Capa de ingestión canónica ==========
exports.onSolicitudCreated = require('./src/ingestion/onSolicitudCreated').onSolicitudCreated;
```

- [ ] **Step 3: Verificar que `index.js` carga sin errores de sintaxis**

Run: `node -c functions/index.js`
Expected: sin salida (exit 0) = sintaxis válida. (No ejecuta las functions, solo parsea.)

- [ ] **Step 4: Verificar que los tests siguen verdes**

Run: `npm --prefix functions test`
Expected: PASS (11 tests; el trigger no rompe la lógica pura).

- [ ] **Step 5: Commit (mensaje al cliente) + nota de deploy**

`git add functions/src/ingestion/onSolicitudCreated.js functions/index.js`
```
feat(ingestion): trigger onSolicitudCreated → modelo canónico (Fase 1)

Ingesta solicitudes → contacts(upsert)/leads/activities. Idempotente
(_ingestedAt), dead-letter (failedIngestions) + retry, maxInstances:10.
Mata la hemorragia del canal principal. NO toca el sitio público.
```
> 🔴 **Deploy MANUAL:** `firebase deploy --only functions:onSolicitudCreated`.

> ⚙️ **Corrección post-revisión (aplicada):** el `batch` con `merge:true` se reemplazó por una **`db.runTransaction`** que (1) hace upsert del contacto SIN pisar `createdAt`/`score`/`ownerId`/`rating`/`lifecycleStage` de un contacto que regresa (branch `contactDoc.exists`), y (2) incluye la marca `_ingestedAt` DENTRO de la transacción → atómico, cero duplicados de lead/activity ante reintentos. El código real en `onSolicitudCreated.js` es esta versión (no el `batch` mostrado arriba). Motivo: revisión de correctness (clobber + ventana de atomicidad).

---

### Task 7: Alertas de presupuesto + verificación de `maxInstances` (anti factura runaway)

**Files:**
- (Sin código) — configuración en la consola de Google Cloud / Firebase + verificación.

- [ ] **Step 1: Confirmar `maxInstances` en toda Function nueva**

Run: `Grep "maxInstances" functions/src/ingestion/onSolicitudCreated.js`
Expected: aparece `maxInstances: 10`. (Regla del proyecto: TODA Function nueva lleva `maxInstances`.)

- [ ] **Step 2: Crear alerta de presupuesto (cliente, una sola vez)**

Instrucción para el cliente (no es código): en [console.cloud.google.com](https://console.cloud.google.com) → proyecto `altorra-cars` → **Billing → Budgets & alerts → Create budget**: monto **$5 USD/mes**, alertas al **50% / 90% / 100%** a `altorracarssale@gmail.com`.
Motivo: si un bot inunda un webhook público, corta la sorpresa de factura (Consejo Externo R2).

- [ ] **Step 3: Documentar el resultado**

Marca en el checklist de la fase: ✅ budget alert $5 creado · ✅ `maxInstances` en la function de ingestión.

- [ ] **Step 4: Commit (no aplica)** — paso operativo, sin archivos.

---

### Task 8: Verificación end-to-end con el Emulador (smoke test real)

**Files:**
- (Sin código nuevo) — usa el Emulator Suite (incluido en firebase-tools, $0).

- [ ] **Step 1: Arrancar los emuladores**

Run (background): `firebase emulators:start --only functions,firestore`
Expected: Functions + Firestore emulators escuchando; carga `onSolicitudCreated` sin error.

- [ ] **Step 2: Crear una solicitud de prueba en el emulador**

En la UI del emulador de Firestore (http://localhost:4000) → colección `solicitudes` → **Add document** con:
```json
{ "nombre": "Test Lead", "email": "test@altorra.com", "telefono": "3001112222",
  "prefijoPais": "+57", "kind": "lead", "tipo": "consulta_general",
  "origen": "contacto", "consentGiven": true, "createdAt": "2026-06-05T12:00:00Z" }
```

- [ ] **Step 2.1: Verificar la ingestión**

Expected en el emulador de Firestore:
- `contacts/email_test_altorra_com` existe, `fullName: "Test Lead"`, `consent.email: true`.
- `leads/{auto}` con `contactId: "email_test_altorra_com"`, `status: "nuevo"`, `sourceSolicitudId` = id de la solicitud.
- `activities/{auto}` con `relatedTo.id` = id del lead.
- la `solicitudes/{id}` de prueba ahora tiene `_ingestedAt` y `_leadId`.

- [ ] **Step 3: Verificar idempotencia**

En la solicitud de prueba, edita cualquier campo (re-trigger NO ocurre en create, pero confirma el guard): crea OTRA solicitud idéntica → debe generar un **segundo lead** pero el **MISMO contacto** (merge, no duplica la persona). Confirma que `contacts` sigue teniendo 1 doc para ese email.

- [ ] **Step 4: Verificar dead-letter**

Crea una solicitud SIN email ni teléfono: `{ "nombre": "Sin contacto", "kind": "lead" }`.
Expected: aparece un doc en `failedIngestions` con `error` mencionando "deduplicar"; NO se crea lead.

- [ ] **Step 5: Apagar el emulador + registrar resultado**

Detén el emulador. Documenta en el checklist: ✅ E2E ingestión OK · ✅ idempotencia OK · ✅ dead-letter OK.
(No hay commit — es verificación.)

---

## Checklist de cierre de la Fase 1 — slice 1

- [ ] `npm --prefix functions test` → 11 verdes.
- [ ] `node -c functions/index.js` → OK.
- [ ] Smoke E2E en emulador (Task 8) → contacto/lead/activity + idempotencia + dead-letter.
- [ ] **Deploy MANUAL** (cuando el cliente lo pida): `firebase deploy --only firestore:rules,firestore:indexes,functions:onSolicitudCreated`.
- [ ] Budget alert $5 creado (Task 7).
- [ ] Consolidar ADR **§158** en `99` + fila en `00` + lección en `30` (greenfield/Vite/ingestión) + actualizar `05`/`10`.

---

## Próximo plan (slice 2, mismo patrón)
`clientes` (creación de cuenta → contact) · `conciergeChats` (bot → lead) · `subscriptions` (newsletter, arreglar el form roto) · favoritos/simulador como señales de intención · **backfill** de `solicitudes`/`clientes` históricos. Todo reusa `normalize.js` + el patrón del trigger.
