// ============================================================
// Respaldos (E6 fase ③, D4-09b §188) — capa de datos.
// UI sobre los callables F34 v2 (crmBackup.js): crmExport vuelca
// el CRM+inventario a Storage PRIVADO; crmRestore restaura con
// dryRun:true POR DEFECTO (el server solo escribe con dryRun:false
// explícito). El server verifica super_admin en AMBOS — el gate
// settings.backup de la UI es cosmético, la seguridad es server-side.
// El daily job (5am Bogotá) ya exporta solo a un path PREDECIBLE:
// crm-backups/daily/YYYY-MM-DD/export.json.gz — por eso el restore
// puede armar el path por fecha sin listar Storage (rules lo niegan).
// ============================================================

import { httpsCallable } from 'firebase/functions';
import { fns } from '../../core/firebase.js';
import { writeAudit } from '../../core/audit.js';

/** Colecciones del export (espejo informativo de CRM_COLLECTIONS server). */
export const BACKUP_COLLECTIONS = ['contacts', 'leads', 'deals', 'activities', 'solicitudes', 'subscriptions', 'vehiculos', 'marcas'];

export function dailyPathFor(dateKey) {
  return 'crm-backups/daily/' + dateKey + '/export.json.gz';
}

export async function runExport() {
  const call = httpsCallable(fns, 'crmExport');
  const res = await call({});
  writeAudit('backup_export', res.data && res.data.path, JSON.stringify((res.data && res.data.counts) || {}));
  return res.data; // {ok, path, counts, capped, bytes}
}

/** dryRun SIEMPRE primero: devuelve el plan revisable sin escribir nada. */
export async function planRestore(path) {
  const call = httpsCallable(fns, 'crmRestore');
  const res = await call({ path, dryRun: true });
  return res.data; // {ok, dryRun:true, exportedAt, plan}
}

/** Escribe de verdad (subset opcional de colecciones). */
export async function runRestore(path, collections) {
  const call = httpsCallable(fns, 'crmRestore');
  const res = await call({ path, dryRun: false, collections: collections && collections.length ? collections : null });
  writeAudit('backup_restore', path, (collections || []).join(',') || 'todas');
  return res.data; // {ok, dryRun:false, restored, plan}
}

export const MOCK_EXPORT = {
  ok: true,
  path: 'crm-backups/2026-06-12T13-00-00-000Z/export.json.gz',
  counts: { contacts: 42, leads: 12, deals: 9, activities: 130, solicitudes: 25, subscriptions: 8, vehiculos: 11, marcas: 18 },
  capped: [],
  bytes: 48211,
};

export const MOCK_PLAN = {
  ok: true,
  dryRun: true,
  exportedAt: '2026-06-12T10:00:00.000Z',
  plan: {
    contacts: { total: 42, toCreate: 0, toOverwrite: 42, currentNotInBackup: 1 },
    leads: { total: 12, toCreate: 1, toOverwrite: 11, currentNotInBackup: 0 },
    deals: { total: 9, toCreate: 0, toOverwrite: 9, currentNotInBackup: 0 },
    activities: { total: 130, toCreate: 4, toOverwrite: 126, currentNotInBackup: 2 },
    solicitudes: { total: 25, toCreate: 0, toOverwrite: 25, currentNotInBackup: 0 },
    subscriptions: { total: 8, toCreate: 0, toOverwrite: 8, currentNotInBackup: 0 },
    vehiculos: { total: 11, toCreate: 2, toOverwrite: 9, currentNotInBackup: 0 },
    marcas: { total: 18, toCreate: 0, toOverwrite: 18, currentNotInBackup: 0 },
  },
};
