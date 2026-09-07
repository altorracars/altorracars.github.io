// ============================================================
// OLA-2.1 — Command palette global (Ctrl+K / Cmd+K).
// Dos fuentes: (1) SECCIONES — el shell inyecta su NAV ya filtrado
// por canSee (SSoT de labels/permisos, cero duplicación); (2)
// REGISTROS — leads/contactos (loadContactsList: mock-first +
// scopeCons server-side) y vehículos (one-shot sobre subscribe,
// gate vehicles.read). Registros se cargan LAZY al primer tecleo
// y se cachean 60s (no pega a Firestore por tecla).
// Seleccionar: sección → navigate · lead → ficha 360 (patrón L-27:
// espejar leads al store) · vehículo → sección Vehículos.
// ============================================================

import { el, clear } from './dom.js';
import { icon } from './icons.js';
import { navIcon } from './layout/nav-icons.js';
import { navigate } from './router.js';
import { store } from './store.js';
import { hasPermission } from './auth.js';
import { normalizeSearch } from '../domain/format.js';
import { loadContactsList } from '../modules/contacts/contacts.data.js';
import { subscribeVehicles, MOCK_VEHICLES } from '../modules/vehicles/vehicles.data.js';

const RECORDS_TTL_MS = 60 * 1000;
const MAX_PER_KIND = 5;

let getSections = () => [];
let mounted = false;
let overlay = null;
let input = null;
let listEl = null;
let hi = 0;
let visible = [];      // resultados renderizados [{kind, label, sub, iconId?, run}]
let recordsCache = null; // { leads, vehicles, at }
let loadingRecords = false;

function loadVehiclesOnce() {
  if (store.get().mock) return Promise.resolve(MOCK_VEHICLES.map((v) => ({ ...v })));
  return new Promise((resolve) => {
    let unsub = null;
    let done = false;
    const finish = (list) => {
      if (done) return;
      done = true;
      if (unsub) { try { unsub(); } catch { /* noop */ } }
      resolve(list);
    };
    unsub = subscribeVehicles((list) => finish(list), () => finish([]));
    if (done && unsub) { try { unsub(); } catch { /* noop */ } }
  });
}

async function ensureRecords() {
  if (recordsCache && Date.now() - recordsCache.at < RECORDS_TTL_MS) return recordsCache;
  if (loadingRecords) return recordsCache;
  loadingRecords = true;
  try {
    const [cl, vehicles] = await Promise.all([
      loadContactsList().catch(() => ({ contacts: [], leads: [] })),
      hasPermission('vehicles.read') ? loadVehiclesOnce() : Promise.resolve([]),
    ]);
    recordsCache = { leads: cl.leads || [], vehicles: vehicles || [], at: Date.now() };
  } finally {
    loadingRecords = false;
  }
  return recordsCache;
}

function openLead360(lead, allLeads) {
  // Patrón L-27 (contacts.list): el 360 resuelve el lead desde store.leads.
  store.set({ leads: allLeads, detailLeadId: lead.id });
}

function compute(q) {
  const out = [];
  const nq = normalizeSearch(q.trim());
  const sections = getSections();
  const secMatches = nq
    ? sections.filter((s) => normalizeSearch(s.label + ' ' + (s.group || '')).includes(nq))
    : sections.filter((s) => s.primary);
  secMatches.slice(0, nq ? 6 : 8).forEach((s) => out.push({
    kind: 'Sección', label: s.label, sub: s.group || '', navId: s.id,
    run: () => navigate(s.id),
  }));

  if (nq && nq.length >= 2 && recordsCache) {
    const { leads, vehicles } = recordsCache;
    leads
      .filter((l) => normalizeSearch(`${l.fullName || ''} ${l.email || ''} ${l.phone || ''}`).includes(nq))
      .slice(0, MAX_PER_KIND)
      .forEach((l) => out.push({
        kind: 'Cliente', label: l.fullName || 'Sin nombre',
        sub: [l.phone, l.email].filter(Boolean).join(' · '), iconId: 'user',
        run: () => openLead360(l, leads),
      }));
    vehicles
      .filter((v) => normalizeSearch(`${v.marca || ''} ${v.modelo || ''} ${v.placa || ''} ${v.codigoUnico || ''} ${v.year || ''}`).includes(nq))
      .slice(0, MAX_PER_KIND)
      .forEach((v) => out.push({
        kind: 'Vehículo', label: [v.marca, v.modelo, v.year].filter(Boolean).join(' '),
        sub: v.codigoUnico || v.placa || '', iconId: 'car',
        run: () => navigate('vehiculos'),
      }));
  }
  return out;
}

function renderList() {
  const q = input.value;
  visible = compute(q);
  clear(listEl);
  if (!visible.length) {
    listEl.append(el('div', { class: 'cmdk__empty u-caption u-faint', text: loadingRecords ? 'Buscando…' : 'Sin resultados. Prueba con una sección, un cliente o un vehículo.' }));
    return;
  }
  if (hi >= visible.length) hi = visible.length - 1;
  if (hi < 0) hi = 0;
  visible.forEach((r, i) => {
    const item = el('button', { class: 'cmdk__item' + (i === hi ? ' is-hi' : ''), type: 'button' }, [
      el('span', { class: 'cmdk__icon u-ico', 'aria-hidden': 'true', html: r.navId ? (navIcon(r.navId) || icon('chevronRight')) : icon(r.iconId || 'chevronRight') }),
      el('span', { class: 'u-grow u-truncate' }, [
        el('span', { class: 'cmdk__label', text: r.label }),
        r.sub ? el('span', { class: 'cmdk__sub u-caption u-faint', text: ' ' + r.sub }) : null,
      ]),
      el('span', { class: 'cmdk__kind u-caption u-faint', text: r.kind }),
    ]);
    item.addEventListener('pointerdown', (e) => e.preventDefault());
    item.addEventListener('click', () => pick(r));
    listEl.append(item);
  });
}

function pick(r) {
  closePalette();
  r.run();
}

function openPalette() {
  if (!overlay) buildDom();
  if (!overlay.hidden) return;
  overlay.hidden = false;
  input.value = '';
  hi = 0;
  renderList();
  input.focus();
}

export function closePalette() {
  if (overlay) overlay.hidden = true;
}

function buildDom() {
  input = el('input', {
    class: 'cmdk__input', type: 'text', placeholder: 'Ir a una sección o buscar cliente / vehículo…',
    autocomplete: 'off', 'aria-label': 'Buscar en el CRM',
  });
  listEl = el('div', { class: 'cmdk__list', role: 'listbox' });
  const hint = el('div', { class: 'cmdk__hint u-caption u-faint' }, [
    el('span', { text: '↑↓ navegar · Enter abrir · Esc cerrar' }),
  ]);
  const box = el('div', { class: 'cmdk', role: 'dialog', 'aria-label': 'Búsqueda global' }, [input, listEl, hint]);
  overlay = el('div', { class: 'cmdk-overlay', hidden: true }, [box]);
  document.body.appendChild(overlay);

  overlay.addEventListener('mousedown', (e) => { if (e.target === overlay) closePalette(); });
  input.addEventListener('input', () => {
    hi = 0;
    renderList();
    // Lazy: los registros entran al cache en el primer tecleo real y se re-pinta al llegar.
    if (input.value.trim().length >= 2 && !recordsCache) ensureRecords().then(() => { if (!overlay.hidden) renderList(); });
  });
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); hi = (hi + 1) % Math.max(visible.length, 1); renderList(); scrollHi(); return; }
    if (e.key === 'ArrowUp') { e.preventDefault(); hi = (hi - 1 + Math.max(visible.length, 1)) % Math.max(visible.length, 1); renderList(); scrollHi(); return; }
    if (e.key === 'Enter') { e.preventDefault(); if (visible[hi]) pick(visible[hi]); return; }
    if (e.key === 'Escape') { e.stopPropagation(); closePalette(); }
  });
}

function scrollHi() {
  const node = listEl.children[hi];
  if (node && node.scrollIntoView) node.scrollIntoView({ block: 'nearest' });
}

/**
 * El shell inyecta el proveedor de secciones ya filtrado por canSee
 * (inyección en vez de import ↔ import: cero ciclo de módulos).
 * sections: [{ id, label, group?, primary? }]
 */
export function initCommandPalette(sectionsProvider) {
  getSections = sectionsProvider;
  if (mounted) return;
  mounted = true;
  window.addEventListener('keydown', (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
      e.preventDefault();
      if (overlay && !overlay.hidden) closePalette();
      else openPalette();
    }
  });
}
