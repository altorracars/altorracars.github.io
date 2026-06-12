// ============================================================
// Capa de DATOS de Reportes (Firestore modular).
// Snapshot puntual (getDocs) acotado — un tablero no necesita realtime.
// Queries de CAMPO ÚNICO (orderBy createdAt + limit) → índice automático
// (L-30): SIN índice compuesto, SIN deploy de reglas/índices.
// Lecturas ya permitidas (isAuthenticated() || crm.read, §9.7).
// ============================================================

import { collection, query, where, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '../../core/firebase.js';
import { store } from '../../core/store.js';
import { getMockLeads, getMockDeals } from '../../core/mock.js';

const withId = (d) => ({ id: d.id, ...d.data() });

async function fetchAll(name, pageSize) {
  const snap = await getDocs(query(collection(db, name), orderBy('createdAt', 'desc'), limit(pageSize)));
  return snap.docs.map(withId);
}

/**
 * Trae leads + deals para agregar en memoria. En ?mock=1 usa los datos demo.
 * `capped` = true si ALGUNA colección devolvió `pageSize` filas (hay más historia
 * de la mostrada → los totales son del snapshot reciente, no históricos). La UI lo avisa.
 * Si crece el volumen, subir `pageSize` o migrar a rollups (Fase 5+).
 * E4/F42: `wons` viene de una query DEDICADA (status=='won', índice
 * deals(status,lastActivityAt) ya existente) — el reporte de COMISIONES no
 * puede cabalgar sobre el snapshot capado por createdAt: un deal viejo
 * ganado este mes se caería de la liquidación en silencio.
 * @returns {Promise<{leads:object[], deals:object[], wons:object[], capped:boolean}>}
 */
export async function loadReports({ pageSize = 500 } = {}) {
  if (store.get().mock) {
    const deals = getMockDeals();
    return { leads: getMockLeads(), deals, wons: deals.filter((d) => d.status === 'won'), capped: false };
  }
  const [leadsRaw, deals, wonsSnap] = await Promise.all([
    fetchAll('leads', pageSize),
    fetchAll('deals', pageSize),
    getDocs(query(
      collection(db, 'deals'),
      where('status', '==', 'won'),
      orderBy('lastActivityAt', 'desc'),
      limit(300),
    )),
  ]);
  // F13 §180: lo archivado no contamina los números del tablero.
  const leads = leadsRaw.filter((l) => !l.archived);
  return {
    leads, deals,
    wons: wonsSnap.docs.map(withId),
    capped: leadsRaw.length >= pageSize || deals.length >= pageSize,
  };
}
