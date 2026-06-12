/**
 * crmBackup.js — F34 v2 (ADR §176, E0): red de seguridad del CRM.
 *
 * El free-tier NO tiene PITR: ningún one-shot (migración de enums F35b,
 * reconciliaciones F27, backfills F16, anonimización F14) corre sin esto.
 *
 *  - crmExport  → vuelca el CRM completo a Storage PRIVADO (crm-backups/…,
 *                 gzip; jamás PII en un portátil). Solo super admin.
 *  - crmRestore → restaura desde un export. dryRun:true POR DEFECTO (devuelve
 *                 el plan revisable; solo escribe con dryRun:false explícito).
 *                 Cada doc restaurado se escribe con _migration:true (los
 *                 triggers de cara al cliente lo ignoran — emails/Telegram/
 *                 GitHub dispatch) y el flag se limpia en una 2ª pasada.
 *
 * Invocación (sin UI aún): httpsCallable desde la sesión admin del portal.
 */
'use strict';

const { onCall, HttpsError } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const zlib = require('zlib');

// D4-09b (§188): vehiculos/marcas entran a la red ANTES de la épica del
// wizard de vehículos — el daily job (5am) los respalda desde ya. El restore
// de vehiculos solo dispara onVehiculoWrittenSignal (benigno, throttled 10s);
// vehicleAggregate escucha deals, no pelea con un restore.
const CRM_COLLECTIONS = ['contacts', 'leads', 'deals', 'activities', 'solicitudes', 'subscriptions', 'vehiculos', 'marcas'];
const CONFIG_DOCS = ['bookedSlots', 'availability', 'calendarConfig', 'listas'];
const MAX_DOCS_PER_COLLECTION = 5000; // backstop free-tier; si se alcanza, el export avisa (no trunca en silencio)
const BATCH_SIZE = 400;

const callableOptions = {
  region: 'us-central1',
  invoker: 'public',
  cors: true,
  timeoutSeconds: 300,
  memory: '512MiB',
  maxInstances: 2,
};

function db() { return admin.firestore(); }

/* Espejo de verifySuperAdmin de index.js (módulo autocontenido, como ingestion/). */
async function verifySuperAdmin(auth) {
  if (!auth || !auth.uid) throw new HttpsError('unauthenticated', 'Debes iniciar sesion.');
  const callerDoc = await db().collection('usuarios').doc(auth.uid).get();
  if (!callerDoc.exists) throw new HttpsError('permission-denied', 'No tienes un perfil de administrador.');
  const callerData = callerDoc.data();
  if (callerData.rol !== 'super_admin') {
    throw new HttpsError('permission-denied', 'Solo un Super Admin puede ejecutar backups/restores del CRM.');
  }
  return callerData;
}

/* ── Serialización JSON-segura ───────────────────────────────────────────
 * El esquema del CRM usa ISO strings, pero un Timestamp colado se corrompería
 * en JSON (queda {_seconds,_nanoseconds} y se restauraría como mapa). Se
 * codifica tipado y se decodifica en el restore. */
function encodeValue(v) {
  if (v === null || v === undefined) return v === undefined ? null : v;
  if (v instanceof admin.firestore.Timestamp) {
    return { __crmType: 'timestamp', iso: v.toDate().toISOString() };
  }
  if (Array.isArray(v)) return v.map(encodeValue);
  if (typeof v === 'object') {
    const out = {};
    for (const k of Object.keys(v)) out[k] = encodeValue(v[k]);
    return out;
  }
  return v;
}
function decodeValue(v) {
  if (v === null || typeof v !== 'object') return v;
  if (v.__crmType === 'timestamp' && typeof v.iso === 'string') {
    return admin.firestore.Timestamp.fromDate(new Date(v.iso));
  }
  if (Array.isArray(v)) return v.map(decodeValue);
  const out = {};
  for (const k of Object.keys(v)) out[k] = decodeValue(v[k]);
  return out;
}

/* ── Plan de restauración (PURO — unit-testeable sin Firebase) ─────────── */
function buildRestorePlan(backupCollections, currentIdsByCollection, onlyCollections) {
  const plan = {};
  for (const col of Object.keys(backupCollections)) {
    if (onlyCollections && !onlyCollections.includes(col)) continue;
    const backupIds = Object.keys(backupCollections[col] || {});
    const currentIds = new Set(currentIdsByCollection[col] || []);
    const toCreate = backupIds.filter((id) => !currentIds.has(id));
    const toOverwrite = backupIds.filter((id) => currentIds.has(id));
    const notInBackup = [...currentIds].filter((id) => !backupIds.includes(id));
    plan[col] = {
      total: backupIds.length,
      toCreate: toCreate.length,
      toOverwrite: toOverwrite.length,
      // docs actuales que el backup NO conoce: el restore NO los borra (no destructivo);
      // se listan para decisión humana.
      currentNotInBackup: notInBackup.length,
    };
  }
  return plan;
}

/* ── Núcleo transport-agnóstico (F34 v2 — ensayable en EMULADOR) ────────── */

/** Construye el snapshot exportable leyendo Firestore (sin Storage). */
async function buildExportData(firestoreDb, meta = {}) {
  const data = {
    _meta: {
      exportedAt: new Date().toISOString(),
      by: meta.by || null,
      version: 1,
      projectId: process.env.GCLOUD_PROJECT || null,
    },
    collections: {},
    configDocs: {},
  };
  const counts = {};
  const capped = [];
  for (const col of CRM_COLLECTIONS) {
    const snap = await firestoreDb.collection(col).limit(MAX_DOCS_PER_COLLECTION + 1).get();
    const docs = snap.docs.slice(0, MAX_DOCS_PER_COLLECTION);
    if (snap.docs.length > MAX_DOCS_PER_COLLECTION) capped.push(col);
    data.collections[col] = {};
    for (const d of docs) data.collections[col][d.id] = encodeValue(d.data());
    counts[col] = docs.length;
  }
  for (const id of CONFIG_DOCS) {
    const s = await firestoreDb.collection('config').doc(id).get();
    if (s.exists) data.configDocs[id] = encodeValue(s.data());
  }
  return { data, counts, capped };
}

/**
 * Aplica un backup (set total por doc + _migration:true, luego limpia el
 * flag en 2ª pasada). NO destructivo: docs actuales fuera del backup quedan.
 */
async function applyRestore(firestoreDb, backup, { collections = null, FieldValue } = {}) {
  const restored = {};
  const flagged = [];
  for (const col of Object.keys(backup.collections)) {
    if (collections && !collections.includes(col)) continue;
    const entries = Object.entries(backup.collections[col] || {});
    restored[col] = 0;
    for (let i = 0; i < entries.length; i += BATCH_SIZE) {
      const batch = firestoreDb.batch();
      for (const [id, raw] of entries.slice(i, i + BATCH_SIZE)) {
        const ref = firestoreDb.collection(col).doc(id);
        batch.set(ref, Object.assign({}, decodeValue(raw), { _migration: true }));
        flagged.push(ref);
        restored[col]++;
      }
      await batch.commit();
    }
  }
  if (!collections && backup.configDocs) {
    for (const id of Object.keys(backup.configDocs)) {
      if (!CONFIG_DOCS.includes(id)) continue;
      await firestoreDb.collection('config').doc(id).set(decodeValue(backup.configDocs[id]));
    }
  }
  const FV = FieldValue || admin.firestore.FieldValue;
  for (let i = 0; i < flagged.length; i += BATCH_SIZE) {
    const batch = firestoreDb.batch();
    for (const ref of flagged.slice(i, i + BATCH_SIZE)) {
      batch.update(ref, { _migration: FV.delete() });
    }
    await batch.commit();
  }
  return restored;
}

/* ── EXPORT ─────────────────────────────────────────────────────────────── */
const crmExport = onCall(callableOptions, async (request) => {
  await verifySuperAdmin(request.auth);

  const { data, counts, capped } = await buildExportData(db(), { by: request.auth.uid });

  const gz = zlib.gzipSync(Buffer.from(JSON.stringify(data), 'utf8'));
  const path = 'crm-backups/' + data._meta.exportedAt.replace(/[:.]/g, '-') + '/export.json.gz';
  await admin.storage().bucket().file(path).save(gz, {
    contentType: 'application/gzip',
    metadata: { cacheControl: 'private, max-age=0' },
  });

  console.log('[crmExport] OK → ' + path + ' · ' + JSON.stringify(counts) + (capped.length ? ' · CAPPED: ' + capped.join(',') : ''));
  return { ok: true, path, counts, capped, bytes: gz.length };
});

/* ── RESTORE ────────────────────────────────────────────────────────────── */
const crmRestore = onCall(callableOptions, async (request) => {
  await verifySuperAdmin(request.auth);

  const { path, dryRun = true, collections = null } = request.data || {};
  if (!path || typeof path !== 'string' || path.indexOf('crm-backups/') !== 0) {
    throw new HttpsError('invalid-argument', 'path debe apuntar a crm-backups/…');
  }
  if (collections && (!Array.isArray(collections) || collections.some((c) => !CRM_COLLECTIONS.includes(c)))) {
    throw new HttpsError('invalid-argument', 'collections debe ser un subconjunto de: ' + CRM_COLLECTIONS.join(', '));
  }

  const [buf] = await admin.storage().bucket().file(path).download();
  const backup = JSON.parse(zlib.gunzipSync(buf).toString('utf8'));
  if (!backup || !backup.collections || !backup._meta) {
    throw new HttpsError('failed-precondition', 'El archivo no es un export válido (sin _meta/collections).');
  }

  // ids actuales (solo claves — barato) para el plan
  const currentIdsByCollection = {};
  for (const col of Object.keys(backup.collections)) {
    if (collections && !collections.includes(col)) continue;
    const snap = await db().collection(col).select().get();
    currentIdsByCollection[col] = snap.docs.map((d) => d.id);
  }
  const plan = buildRestorePlan(backup.collections, currentIdsByCollection, collections);

  if (dryRun) {
    return { ok: true, dryRun: true, exportedAt: backup._meta.exportedAt, plan };
  }

  const restored = await applyRestore(db(), backup, { collections });

  console.log('[crmRestore] OK desde ' + path + ' · ' + JSON.stringify(restored));
  return { ok: true, dryRun: false, restored, plan };
});

module.exports = {
  crmExport, crmRestore, buildRestorePlan, encodeValue, decodeValue,
  buildExportData, applyRestore, CRM_COLLECTIONS,
};
