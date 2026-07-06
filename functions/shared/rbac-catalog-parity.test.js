/**
 * OLA 2.7 (§272) — TEST DE PARIDAD RBAC: los 3 lados del catálogo de permisos
 * NO PUEDEN divergir (estilo crm-spec-parity.test.js):
 *
 *   1. `js/admin/rbac-catalog.js` — SSoT original (§61.R1, IIFE del clásico;
 *      seedSystemRoles lo consume vía fetch dinámico).
 *   2. `admin-app/src/domain/rbac-catalog.js` — port ESM del portal (la UI de
 *      roles/usuarios del CRM canónico).
 *   3. `firestore.rules` — `ownerOnlyPerms()` (espejo declarado de
 *      OWNER_ONLY_PERMS) + cada `hasPermission('x')` consultado.
 *
 * El clásico es IIFE (no importable en ESM) → se parsea el LITERAL con regex:
 * cada permiso es un objeto de UNA línea `{ id: '…', name: '…', …}`. Sin eval
 * (hook de seguridad) y suficiente: si el formato de línea cambia, el conteo
 * 82 revienta y delata el parse roto — no hay silencio posible.
 *
 * Diagnóstico 06/07 (Fable): paridad PERFECTA (82=82, orden idéntico, 9 cats,
 * owner-only 9=9, 56 permisos usados en rules todos catalogados). Este test
 * BLINDA ese estado. Corre sin emulador (puro parsing).
 */
import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import {
  PERMISSIONS_CATALOG, OWNER_ONLY_PERMS,
} from '../../admin-app/src/domain/rbac-catalog.js';

const __dir = dirname(fileURLToPath(import.meta.url));
const classicSrc = readFileSync(join(__dir, '../../js/admin/rbac-catalog.js'), 'utf8');
const rulesSrc = readFileSync(join(__dir, '../../firestore.rules'), 'utf8');

// Parse del literal del clásico (una línea por permiso; names con \' escapado).
const unesc = (s) => s.replace(/\\'/g, "'");
const classic = [...classicSrc.matchAll(
  /\{ id: '([^']+)', name: '((?:[^'\\]|\\.)*)',[^\n]*?category: '([^']+)'[^\n]*?\}/g,
)].map((m) => ({
  id: m[1], name: unesc(m[2]), category: m[3], critical: m[0].includes('critical: true'),
}));

describe('PARIDAD RBAC — clásico (js/admin) ↔ portal (admin-app)', () => {
  it('el parse del clásico encontró el catálogo completo (formato de línea intacto)', () => {
    expect(classic.length).toBeGreaterThanOrEqual(80); // si el formato cambia, esto delata el parse roto
  });
  it('mismos ids en el MISMO ORDEN', () => {
    expect(classic.map((p) => p.id)).toEqual(PERMISSIONS_CATALOG.map((p) => p.id));
  });
  it('misma categoría por permiso', () => {
    expect(classic.map((p) => ({ id: p.id, category: p.category })))
      .toEqual(PERMISSIONS_CATALOG.map((p) => ({ id: p.id, category: p.category })));
  });
  it('mismo flag critical por permiso', () => {
    expect(classic.map((p) => ({ id: p.id, critical: p.critical })))
      .toEqual(PERMISSIONS_CATALOG.map((p) => ({ id: p.id, critical: !!p.critical })));
  });
  it('mismo name visible por permiso (las dos UIs muestran lo mismo)', () => {
    expect(classic.map((p) => ({ id: p.id, name: p.name })))
      .toEqual(PERMISSIONS_CATALOG.map((p) => ({ id: p.id, name: p.name })));
  });
});

describe('PARIDAD RBAC — portal ↔ firestore.rules', () => {
  const ooBlock = rulesSrc.match(/function ownerOnlyPerms\(\)\s*\{[\s\S]*?return\s*\[([\s\S]*?)\]/);
  const rulesOwnerOnly = [...ooBlock[1].matchAll(/'([^']+)'/g)].map((m) => m[1]);

  it('OWNER_ONLY_PERMS == ownerOnlyPerms() de rules (mismo conjunto, sin extras)', () => {
    expect([...rulesOwnerOnly].sort()).toEqual([...OWNER_ONLY_PERMS].sort());
  });
  it('todo permiso owner-only existe en el catálogo', () => {
    const ids = new Set(PERMISSIONS_CATALOG.map((p) => p.id));
    for (const p of rulesOwnerOnly) expect(ids.has(p), `owner-only fantasma: ${p}`).toBe(true);
  });
  it("cada hasPermission('x') de rules consulta un permiso CATALOGADO (anti-typo/fantasma)", () => {
    const used = [...new Set([...rulesSrc.matchAll(/hasPermission\('([^']+)'\)/g)].map((m) => m[1]))];
    const ids = new Set(PERMISSIONS_CATALOG.map((p) => p.id));
    expect(used.length).toBeGreaterThan(40); // sanity del parse
    const fantasmas = used.filter((p) => !ids.has(p));
    expect(fantasmas, `rules consulta permisos fuera del catálogo: ${fantasmas.join(', ')}`).toEqual([]);
  });
});
