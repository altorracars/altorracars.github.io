'use strict';

const admin = require('firebase-admin');
const zlib = require('zlib');
const { normalizePhone, sanitizeContactId } = require('../ingestion/normalize');

/**
 * contactGraph.js — operaciones sobre el GRAFO de un contacto (E3, ADR §185).
 * Compartido por la fusión F12 y la supresión F14: re-apuntar leads/deals/
 * índice dedup, copiar notas, anonimizar. Todo idempotente y RESUMIBLE:
 * cada paso re-consulta lo que FALTA (si el proceso muere a mitad, volver a
 * ejecutarlo continúa donde iba — jamás un merge a medias invisible, B.5).
 */

const nowISO = () => new Date().toISOString();
const FV = () => admin.firestore.FieldValue;

/** Claves del índice dedup que le corresponden a un contacto (puro). */
function dedupKeysFor(contact) {
  const out = [];
  const email = String((contact && contact.email) || '').trim().toLowerCase();
  if (email) out.push(sanitizeContactId('email:' + email));
  const phone = normalizePhone(contact && contact.phone, contact && contact.prefijoPais);
  if (phone) out.push(sanitizeContactId('phone:' + phone));
  // §TODO-50: la CÉDULA es la identidad de negocio del consignante (clave dedup propia).
  // Sin esto, onContactWritten reconciliaba el índice SOLO por email/phone y BORRABA la
  // clave de cédula que crmUpsertConsignante escribía (desacople de contrato cross-trigger,
  // cazado en validación live). Aditivo: un contacto sin `cedula` no cambia.
  const cedula = String((contact && contact.cedula) || '').replace(/\D/g, '');
  if (cedula) out.push(sanitizeContactId('cedula:' + cedula));
  return out;
}

/**
 * Asegura entradas del índice para un contacto: create-if-absent — JAMÁS
 * roba una entrada que apunte a OTRO contacto (eso es una colisión que se
 * resuelve con fusión HUMANA, nunca silenciosa). Devuelve {created, taken}.
 */
async function ensureDedupEntries(db, contactId, keys) {
  let created = 0;
  const taken = [];
  for (const key of keys) {
    const ref = db.collection('dedup').doc(key);
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      if (!snap.exists) {
        tx.set(ref, { contactId, createdAt: nowISO() });
        created++;
      } else if (snap.data().contactId !== contactId) {
        taken.push({ key, contactId: snap.data().contactId });
      }
    });
  }
  return { created, taken };
}

/** Borra las entradas del índice que apunten a este contacto (solo las suyas). */
async function removeDedupEntries(db, contactId, keys) {
  let removed = 0;
  for (const key of keys) {
    const ref = db.collection('dedup').doc(key);
    await db.runTransaction(async (tx) => {
      const snap = await tx.get(ref);
      if (snap.exists && snap.data().contactId === contactId) {
        tx.delete(ref);
        removed++;
      }
    });
  }
  return removed;
}

/**
 * Borra TODAS las entradas del índice que apunten a un contacto — por QUERY,
 * no por claves derivables (review §185: el índice acumula entradas heredadas
 * de fusiones o de solicitudes cuyo tel/email nunca se absorbió al doc; si
 * el retiro del minuto 0 las deja vivas, cada lead de la gracia pare un
 * duplicado nuevo).
 */
async function removeAllDedupEntriesFor(db, contactId) {
  let removed = 0;
  for (;;) {
    const snap = await db.collection('dedup').where('contactId', '==', contactId).limit(100).get();
    if (snap.empty) break;
    for (const d of snap.docs) { await d.ref.delete(); removed++; }
    if (snap.size < 100) break;
  }
  return removed;
}

/**
 * Re-apunta TODO lo que cuelga de `fromId` hacia `toId` (resumible por
 * re-query). anonymize: además borra PII de los leads y sus activities y
 * las solicitudes/intakes de origen (F14 c: notas libres se BORRAN).
 */
async function repointContact(db, fromId, toId, { anonymize = false } = {}) {
  const counts = { leads: 0, deals: 0, activities: 0, solicitudes: 0 };
  const now = nowISO();

  // Helper: barrido PAGINADO por cursor (procesa colas de cualquier tamaño).
  async function sweep(colName, field, value, applyFn) {
    let last = null;
    for (;;) {
      let q = db.collection(colName).where(field, '==', value)
        .orderBy(admin.firestore.FieldPath.documentId()).limit(200);
      if (last) q = q.startAfter(last);
      const snap = await q.get();
      for (const d of snap.docs) await applyFn(d);
      if (snap.size < 200) break;
      last = snap.docs[snap.docs.length - 1];
    }
  }

  /** Anonimiza los HIJOS de un lead (activities + docs de origen). */
  async function anonymizeLeadChildren(leadId) {
    // Activities: el texto libre SE BORRA completo (regex sobre PII
    // narrativa es teatro — F14 c). Montos/fechas/etapas se quedan.
    await sweep('activities', 'relatedTo.id', leadId, async (a) => {
      if (a.data()._suppressed === true) return;
      await a.ref.update({
        body: '', subject: '(Suprimido — Ley 1581)',
        'relatedTo.name': '(Suprimido)', _suppressed: true, updatedAt: now,
      });
      counts.activities++;
    });
    // Docs de ORIGEN (solicitudes / lead_intake): PII fuera — incluida la
    // `nota` libre del lead rápido (review §185) — y flag para que TODOS
    // los triggers corto-circuiten (F14 a).
    for (const col of ['solicitudes', 'lead_intake']) {
      await sweep(col, '_leadId', leadId, async (s) => {
        if (s.data()._suppressed === true) return;
        await s.ref.update({
          nombre: '(Suprimido)', email: null, telefono: null, whatsapp: null,
          comentarios: '', mensaje: '', nota: '', notas: '',
          _suppressed: true, updatedAt: now,
        });
        counts.solicitudes++;
      });
    }
  }

  // Leads (re-consultado hasta vaciar — resumible). ORDEN CRÍTICO en modo
  // anonymize (review §185): los HIJOS primero y el flip del lead AL FINAL —
  // el flip es el marcador de avance del re-query; si el proceso muere a
  // mitad, el lead sigue matcheando y la re-ejecución retoma sus hijos.
  for (;;) {
    const snap = await db.collection('leads').where('contactId', '==', fromId).limit(100).get();
    if (snap.empty) break;
    for (const d of snap.docs) {
      if (anonymize) await anonymizeLeadChildren(d.id);
      const upd = { contactId: toId, updatedAt: now, _version: FV().increment(1) };
      if (anonymize) {
        Object.assign(upd, {
          fullName: '(Suprimido — Ley 1581)', email: null, phone: null,
          _suppressed: true,
        });
      }
      await d.ref.update(upd); // ÚLTIMO paso por lead (marcador de avance)
      counts.leads++;
    }
    if (snap.size < 100) break;
  }

  // Deals: el registro comercial SE CONSERVA (montos/fechas/vehículo — F14 e);
  // solo se re-apunta y se despersonaliza el nombre visible. `name` es el
  // campo REAL del tablero (dealFromLead: 'Fulano · Mazda 3' — review §185).
  for (;;) {
    const snap = await db.collection('deals').where('contactId', '==', fromId).limit(100).get();
    if (snap.empty) break;
    for (const d of snap.docs) {
      const deal = d.data();
      const upd = { contactId: toId, updatedAt: now, _version: FV().increment(1) };
      if (anonymize && deal.contactName) upd.contactName = '(Suprimido)';
      if (anonymize && deal.title) upd.title = '(Suprimido — Ley 1581)';
      if (anonymize && deal.name) {
        upd.name = '(Suprimido — Ley 1581)' + (deal.vehicleName ? ' · ' + deal.vehicleName : '');
      }
      await d.ref.update(upd);
      counts.deals++;
    }
    if (snap.size < 100) break;
  }

  // Activities colgadas DIRECTO del contacto (p.ej. la de fusión F12 —
  // relatedTo.type 'contact' guarda el fullName): re-apuntar (+anonimizar).
  await sweep('activities', 'relatedTo.id', fromId, async (a) => {
    const upd = { 'relatedTo.id': toId, updatedAt: now };
    if (anonymize && a.data()._suppressed !== true) {
      Object.assign(upd, {
        body: '', subject: '(Suprimido — Ley 1581)',
        'relatedTo.name': '(Suprimido)', _suppressed: true,
      });
    }
    await a.ref.update(upd);
    counts.activities++;
  });

  // Índice dedup: entradas del viejo → al nuevo (en anonimización ya se
  // retiraron en el minuto 0 de la gracia; esto es defensa extra).
  for (;;) {
    const snap = await db.collection('dedup').where('contactId', '==', fromId).limit(100).get();
    if (snap.empty) break;
    for (const d of snap.docs) {
      if (anonymize) await d.ref.delete();
      else await d.ref.update({ contactId: toId, updatedAt: now });
    }
    if (snap.size < 100) break;
  }

  return counts;
}

/** Copia las notas internas (crmNotes) al sobreviviente y borra las del viejo. */
async function moveNotes(db, fromId, toId, { drop = false } = {}) {
  let moved = 0;
  const snap = await db.collection('contacts').doc(fromId).collection('crmNotes').limit(300).get();
  for (const n of snap.docs) {
    if (!drop) {
      await db.collection('contacts').doc(toId).collection('crmNotes').doc(n.id)
        .set({ ...n.data(), _movedFrom: fromId });
    }
    await n.ref.delete(); // en supresión (drop=true) las notas se DESTRUYEN (F14 c)
    moved++;
  }
  return moved;
}

/** Snapshot de respaldo (F34) de los docs afectados ANTES de mutar. */
async function snapshotContactGraph(db, contactId, label) {
  const out = { _meta: { contactId, label, at: nowISO() }, contact: null, leads: [], deals: [], notes: [] };
  const cSnap = await db.collection('contacts').doc(contactId).get();
  out.contact = cSnap.exists ? cSnap.data() : null;
  const leads = await db.collection('leads').where('contactId', '==', contactId).limit(300).get();
  out.leads = leads.docs.map((d) => ({ id: d.id, ...d.data() }));
  const deals = await db.collection('deals').where('contactId', '==', contactId).limit(300).get();
  out.deals = deals.docs.map((d) => ({ id: d.id, ...d.data() }));
  const notes = await db.collection('contacts').doc(contactId).collection('crmNotes').limit(300).get();
  out.notes = notes.docs.map((d) => ({ id: d.id, ...d.data() }));

  const gz = zlib.gzipSync(Buffer.from(JSON.stringify(out), 'utf8'));
  const path = 'crm-backups/' + label + '/' + contactId + '_' + Date.now() + '.json.gz';
  await admin.storage().bucket().file(path).save(gz, {
    contentType: 'application/gzip',
    metadata: { cacheControl: 'private, max-age=0' },
  });
  return { path, leads: out.leads.length, deals: out.deals.length, notes: out.notes.length };
}

/**
 * F14 — EJECUTA la supresión (la llama el finalizador del daily job tras la
 * gracia de 72h). El doc original del contacto se BORRA (su ID deriva del
 * email/teléfono = también es PII) y el grafo queda colgando de un STUB
 * anónimo con ID aleatorio. Conserva fechas y registro comercial.
 */
/** Hash opaco del contactId para auditoría (el ID crudo deriva del email/tel = PII). */
function contactHashOf(contactId) {
  const crypto = require('crypto');
  return crypto.createHash('sha256').update(String(contactId)).digest('hex').slice(0, 16);
}

async function executeSuppression(db, contactId, { by } = {}) {
  const cRef = db.collection('contacts').doc(contactId);
  const cSnap = await cRef.get();
  if (!cSnap.exists) return { skipped: 'no-existe' };
  const c = cSnap.data();

  // Stub anónimo (ID aleatorio — el determinista delata el email/tel).
  const stubRef = db.collection('contacts').doc();
  await stubRef.set({
    fullName: '(Suprimido — Ley 1581)', email: null, phone: null, type: c.type || 'lead',
    source: c.source || null, ownerId: null, ownerName: null,
    score: 0, rating: 'cold', lifecycleStage: c.lifecycleStage || 'lead',
    tags: [], consent: { suppressed: true, suppressedAt: nowISO() },
    doNotContact: true, clienteUid: null,
    dedupKeys: [], _suppressed: true, suppressionStatus: 'suprimido',
    createdAt: c.createdAt || nowISO(), lastActivityAt: c.lastActivityAt || null,
    updatedAt: nowISO(), _version: 1,
  });

  const counts = await repointContact(db, contactId, stubRef.id, { anonymize: true });
  const notes = await moveNotes(db, contactId, stubRef.id, { drop: true });

  // TOMBSTONES de fusión (review §185 — CRÍTICO): los duplicados marcados
  // _mergedInto → este contacto conservan fullName/email/phone de la MISMA
  // persona. Se procesan en cascada (cadenas A→B→C) y se BORRAN (su ID
  // determinista también es PII). Sus propios grafos ya cuelgan del
  // sobreviviente desde la fusión; aquí solo cae el doc + su índice.
  let tombstones = 0;
  const frontier = [contactId];
  let guard = 0;
  while (frontier.length && guard < 10) {
    const target = frontier.shift();
    guard++;
    for (;;) {
      const ts = await db.collection('contacts').where('_mergedInto', '==', target).limit(50).get();
      if (ts.empty) break;
      for (const t of ts.docs) {
        frontier.push(t.id);
        await removeAllDedupEntriesFor(db, t.id);
        await moveNotes(db, t.id, stubRef.id, { drop: true });
        await t.ref.delete();
        tombstones++;
      }
      if (ts.size < 50) break;
    }
  }

  // Estado de fusiones que nombran a este contacto (el ID compuesto
  // mergedId__into__survivorId también delata el email/tel).
  for (const field of ['survivorId', 'mergedId']) {
    const ms = await db.collection('merges').where(field, '==', contactId).limit(50).get();
    for (const m of ms.docs) await m.ref.delete();
  }

  await removeAllDedupEntriesFor(db, contactId);
  await cRef.delete();

  // Auditoría SIN PII: hash opaco, jamás el ID derivado del email (F14 g).
  await db.collection('auditLog').add({
    action: 'crm_suppress_1581', contactHash: contactHashOf(contactId), stubId: stubRef.id,
    counts: { ...counts, notesDeleted: notes, tombstones },
    by: by || 'crmDailyJob', at: nowISO(),
  });
  return { stubId: stubRef.id, counts, notesDeleted: notes, tombstones };
}

module.exports = {
  dedupKeysFor, ensureDedupEntries, removeDedupEntries, removeAllDedupEntriesFor,
  repointContact, moveNotes, snapshotContactGraph, executeSuppression, contactHashOf,
};
