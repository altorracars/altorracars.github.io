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

/* ════════════════════════════════════════════════════════════════════════
 * §TODO-50 fase 2c — SUPRESIÓN ROL-AWARE DEL CONSIGNANTE (lóbulo 42 · LEGAL-07)
 * ────────────────────────────────────────────────────────────────────────
 * El consignante NO es el `deal.contactId` (ese es el COMPRADOR): su nombre se
 * DESNORMALIZA en `frozenTenancy.ownerDisplayName` y SOBREVIVE en dos lugares que
 * la supresión por grafo (repointContact busca por contactId) JAMÁS alcanza:
 *   (a) la tenencia VIVA de sus vehículos consignados (`vehiculos.tenancy`), y
 *   (b) el snapshot de comisión congelado en los deals GANADOS del comprador.
 * Colisión de derechos: Ley 1581 art.8e (supresión) vs Cód.Comercio art.60 + DIAN
 * (conservación 10 años cuando hubo operación). Regla del comité+abogado (spec
 * 2026-06-28): se CONSERVA el ownerRefId OPACO + economics (cifra comercial anónima
 * cuadrada) y solo se PURGA el NOMBRE por soft-redact server-side — el Admin SDK
 * bypasea la inmutabilidad LÓGICA del snapshot (refuta el crypto-shredding). NUNCA
 * se congeló cédula/teléfono ahí (buildTenancy solo desnormaliza el nombre). El CONTRATO
 * de que se redactan AMBOS lugares está en shared/crm-spec.js `normalizeTenancy`
 * (ownerDisplayName "SOBREVIVE a la supresión... vía soft-redact... ownerRefId opaco +
 * economics") → arquitectura obligatoria, no opción.
 * ════════════════════════════════════════════════════════════════════════ */

/** Sentinel de soft-redact del nombre del consignante (el campo sobrevive; su valor cae). */
const SUPPRESSED_OWNER_NAME = '(Suprimido — Ley 1581)';

/** PURO: ¿esta tenencia congelada referencia a `contactId` como CONSIGNANTE?
 *  TIPADO obligatorio: un slug de ALIADO y un contactId son ambos strings (no colapsar). */
function tenancyRefsContact(ft, contactId) {
  return !!ft && ft.ownerRefType === 'contact' && ft.ownerRefId === contactId;
}

/**
 * PURO (idempotente): redacta `ownerDisplayName` de las entradas de
 * `commissionSnapshots` cuyo consignante = contactId. Conserva ownerRefId OPACO,
 * ownerRefType y economics. Devuelve { snapshots, changed:<nº de entradas purgadas> }
 * — changed=0 si no hay nada que purgar (sin PII, ya redactado, o no es este consignante).
 */
function redactConsignanteInSnapshots(snapshots, contactId, sentinel) {
  const name = sentinel || SUPPRESSED_OWNER_NAME;
  if (!Array.isArray(snapshots)) return { snapshots, changed: 0, matched: 0 };
  let changed = 0;
  let matched = 0;
  const out = snapshots.map((entry) => {
    const ft = entry && entry.frozenTenancy;
    if (!tenancyRefsContact(ft, contactId)) return entry;
    matched++;                                                          // §Cond.4: referencia (nueva o ya-sentinel)
    if (!ft.ownerDisplayName || ft.ownerDisplayName === name) return entry; // sin PII / ya redactado
    changed++;
    return { ...entry, frozenTenancy: { ...ft, ownerDisplayName: name } };
  });
  return { snapshots: out, changed, matched };
}

/**
 * I/O: purga el nombre del consignante de los dos registros que sobreviven a la
 * supresión por grafo. Idempotente y RESUMIBLE (busca por el ownerRefId OPACO,
 * que NO cambia → re-ejecutar es no-op; cada doc se procesa de forma independiente).
 * Escribe SOLO el campo del nombre → los triggers de deal/vehículo hacen no-op
 * (onDealUpdated mira stage/status/vehicleId; onVehicleChange mira SEO_FIELDS;
 * onVehiclePriceAlert mira el precio) = cero side-effects (re-freeze, alertas, SEO).
 */
async function redactConsignanteReferences(db, contactId) {
  // §Condición 4 (certificación legal 28/06): además del delta `*Redacted` (lo que ESTE run
  // cambió) se cuenta `*Matched` (TODAS las referencias al consignante, ya-redactadas o nuevas)
  // → la prueba de cumplimiento art.12 es EXACTA aunque la supresión se reanude tras un corte
  // (el delta de un re-run sería parcial: las ya-sentinel no cuentan en `changed`).
  const out = {
    vehiclesRedacted: 0, dealsRedacted: 0, snapshotEntriesRedacted: 0,
    vehiclesMatched: 0, dealsMatched: 0, snapshotEntriesMatched: 0,
    latestSaleWonAt: null,   // §bloqueo fiscal: fecha de la ÚLTIMA venta del consignante → base del retentionUntil
  };

  // (a) Tenencia VIVA de los vehículos consignados (el reporte fetchDealerStats lee
  // v.tenancy.ownerDisplayName). Query por el ownerRefId OPACO (nested-field equality,
  // auto-indexado). Dot-path → conserva ownerRefId/ownerRefType/economics.
  {
    let last = null;
    for (;;) {
      let q = db.collection('vehiculos').where('tenancy.ownerRefId', '==', contactId)
        .orderBy(admin.firestore.FieldPath.documentId()).limit(200);
      if (last) q = q.startAfter(last);
      const snap = await q.get();
      for (const d of snap.docs) {
        const t = d.data().tenancy || {};
        if (t.ownerRefType !== 'contact') continue;                       // defensa: no es consignante
        out.vehiclesMatched++;                                            // §Cond.4: referencia (nueva o ya-sentinel)
        if (!t.ownerDisplayName || t.ownerDisplayName === SUPPRESSED_OWNER_NAME) continue; // nada que purgar
        await d.ref.update({ 'tenancy.ownerDisplayName': SUPPRESSED_OWNER_NAME, updatedAt: nowISO() });
        out.vehiclesRedacted++;
      }
      if (snap.size < 200) break;
      last = snap.docs[snap.docs.length - 1];
    }
  }

  // (b) Snapshots de comisión congelados en los deals del COMPRADOR. Firestore NO
  // consulta dentro de un array de mapas → barrido PAGINADO COMPLETO por documentId
  // (incluye won-luego-anulado: el array append-only persiste aunque cambie el status).
  {
    let last = null;
    for (;;) {
      let q = db.collection('deals')
        .orderBy(admin.firestore.FieldPath.documentId()).limit(200);
      if (last) q = q.startAfter(last);
      const snap = await q.get();
      for (const d of snap.docs) {
        const { snapshots, changed, matched } = redactConsignanteInSnapshots(d.data().commissionSnapshots, contactId);
        if (matched) {
          out.dealsMatched++; out.snapshotEntriesMatched += matched;                  // §Cond.4: total referencias
          const w = d.data().wonAt;                                                    // §bloqueo fiscal: última venta
          if (w && (!out.latestSaleWonAt || w > out.latestSaleWonAt)) out.latestSaleWonAt = w;
        }
        if (!changed) continue;
        await d.ref.update({
          commissionSnapshots: snapshots, updatedAt: nowISO(),
          _version: FV().increment(1),
        });
        out.dealsRedacted++;
        out.snapshotEntriesRedacted += changed;
      }
      if (snap.size < 200) break;
      last = snap.docs[snap.docs.length - 1];
    }
  }

  return out;
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

  // §Condición 1 (certificación legal 28/06, lóbulo 42 LEGAL-07 — comité ×5 verificado vs
  // .gov.co): el puntero al CONTRATO físico firmado (contractRef) + policyVersion + purposes
  // vive en consent.habeasData DENTRO del doc que esta función BORRA. Hay que RESCATARLO antes:
  // sin él, el snapshot económico que se conserva queda HUÉRFANO (no se podría reconciliar la
  // comisión con su soporte documental — Cód.Comercio art.60 + E.T. art.632 num.1 "verificar la
  // exactitud"; Ley 1581 art.12 prueba de la autorización). NO es PII (id de documento mercantil
  // + versión + finalidades). Reconcilia con el snapshot vía contactHash = sha256(ownerRefId).
  const hd = (c.consent && c.consent.habeasData) || null;
  const habeasProof = hd ? {
    contractRef: hd.contractRef || null,
    policyVersion: hd.policyVersion || null,
    purposes: hd.purposes || null,
    grantedAt: hd.grantedAt || null,
    method: hd.method || null,
  } : null;

  // §TODO-50 fase 2c: rol-aware — purga el nombre DESNORMALIZADO del consignante que SOBREVIVE
  // en la tenencia de sus vehículos + los snapshots de comisión (repointContact no los alcanza:
  // busca por contactId, no por ownerRefId). Conserva ownerRefId opaco + economics. Idempotente.
  // Se corre ARRIBA porque su conteo `matched` decide la bifurcación bloqueo↔delete.
  const consignante = await redactConsignanteReferences(db, contactId);

  // §BLOQUEO FISCAL (verificación 28/06: comité ×5 + consejo Gemini, AMBOS verificados vs `.gov.co`
  // — veredicto DEPENDE_CONTADOR). Un CONSIGNANTE con OPERACIÓN EJECUTADA (venta cerrada → snapshot/
  // tenencia que lo referencian) PUEDE tener deber de conservación fiscal de su cédula: documento
  // exógena Formato 1647 (Altorra SIEMPRE intermedia, NUNCA compra — decisión dueño 28/06: si compra
  // es vehículo PROPIO, no consigna) → transmite la cédula a la DIAN → firmeza renta E.T. art.714.
  // Dec.1377 art.11 (deber del RESPONSABLE) IMPIDE destruirla a las 72h; y borrar el doc dejaría al
  // titular SIN respuesta veraz a una consulta (Ley 1581 art.14/17). Hasta que `retentionUntil`
  // prescriba, NO se borra: se DESACTIVA el uso vivo (marketing/contacto) pero se RETIENE la identidad
  // fiscal [cédula, nombre, montos] bajo acceso restringido + consultable. Purga REAL = diferida (TODO-51).
  // CONDICIÓN = venta CERRADA (snapshot): un carro consignado SIN vender NO genera deber fiscal → se borra.
  const esConsignante = (Array.isArray(c.roles) && c.roles.includes('consignante')) || c.type === 'consignante';
  const ventaEjecutada = consignante.snapshotEntriesMatched > 0;
  // retentionUntil por defecto = última venta + 5 AÑOS (firmeza renta E.T. art.714: 3 años general, hasta 5
  // con pérdidas → 5 = piso conservador que NO sub-retiene; el abogado/contador puede afinar). Decisión dueño.
  let retentionUntil = c.retentionUntil || null;
  if (ventaEjecutada && !retentionUntil && consignante.latestSaleWonAt) {
    const rd = new Date(consignante.latestSaleWonAt);
    if (!isNaN(rd.getTime())) { rd.setFullYear(rd.getFullYear() + 5); retentionUntil = rd.toISOString(); }
  }
  const retencionPrescrita = !!retentionUntil && retentionUntil <= nowISO();
  if (esConsignante && ventaEjecutada && !retencionPrescrita) {
    await cRef.update({
      email: null, phone: null, doNotContact: true,            // PII de contacto vivo (no fiscal) fuera
      suppressionStatus: 'bloqueado_retencion_fiscal',
      retentionUntil: retentionUntil,                          // firmeza fiscal (última venta + 5 años)
      _blockedAt: nowISO(), updatedAt: nowISO(), _version: FV().increment(1),
      // fullName + cedula SE CONSERVAN (deber fiscal art.11 Dec.1377 + consultable art.14).
    });
    // dedup: retira email/phone; CONSERVA la clave de cédula (la consulta art.14 resuelve por cédula).
    const keepKey = c.cedula ? sanitizeContactId('cedula:' + String(c.cedula).replace(/\D/g, '')) : null;
    const ds = await db.collection('dedup').where('contactId', '==', contactId).limit(100).get();
    for (const d of ds.docs) { if (d.id !== keepKey) await d.ref.delete(); }
    await db.collection('auditLog').add({
      action: 'crm_block_retention_1581', contactHash: contactHashOf(contactId),
      counts: {
        vehiclesRedacted: consignante.vehiclesMatched, dealsRedacted: consignante.dealsMatched,
        snapshotEntriesRedacted: consignante.snapshotEntriesMatched,
      },
      habeasProof, retentionUntil: retentionUntil,
      note: 'consignante con venta ejecutada: bloqueo hasta firmeza fiscal (retentionUntil = última venta + 5 años)',
      by: by || 'crmDailyJob', at: nowISO(),
    });
    return { blocked: true, consignante, habeasProof };
  }

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
  // (la redacción rol-aware del consignante + su conteo ya corrió ARRIBA, antes de la bifurcación.)

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
    counts: {
      ...counts, notesDeleted: notes, tombstones,
      // §TODO-50 fase 2c — la auditoría legal (Ley 1581 art.12: la empresa debe PROBAR el
      // cumplimiento de la supresión) registra QUÉ se purgó del consignante. §Cond.4: se usa
      // el conteo MATCHED (total de referencias, todas redactadas al completar) → prueba EXACTA
      // aunque la supresión se reanude tras un corte.
      vehiclesRedacted: consignante.vehiclesMatched,
      dealsRedacted: consignante.dealsMatched,
      snapshotEntriesRedacted: consignante.snapshotEntriesMatched,
    },
    habeasProof,   // §Condición 1: puntero durable al contrato físico firmado (SIN PII)
    by: by || 'crmDailyJob', at: nowISO(),
  });
  return { stubId: stubRef.id, counts, notesDeleted: notes, tombstones, consignante, habeasProof };
}

module.exports = {
  dedupKeysFor, ensureDedupEntries, removeDedupEntries, removeAllDedupEntriesFor,
  repointContact, moveNotes, snapshotContactGraph, executeSuppression, contactHashOf,
  // §TODO-50 fase 2c — supresión rol-aware del consignante
  SUPPRESSED_OWNER_NAME, tenancyRefsContact, redactConsignanteInSnapshots, redactConsignanteReferences,
};
