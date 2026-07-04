// ============================================================
// Contactos — directorio de personas (capa UI). Cierra el núcleo del CRM.
// Lista buscable/filtrable de `contacts`; clic → abre la ficha 360 existente
// (si la persona tiene lead) reusando store.detailLeadId. Snapshot + Actualizar.
// ============================================================

import { el, clear } from '../../core/dom.js';
import { icon, uIco } from '../../core/icons.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { exportCsv, fmtFechaCsv } from '../../core/csv.js';
import { initials, timeAgo, normalizeSearch } from '../../domain/format.js';
import { channelOf } from '../../domain/classify.js';
import { RATING_META } from '../../domain/scoring.js';
import { loadContactsList } from './contacts.data.js';

const FILTERS = [
  { id: 'todos', label: 'Todos' },
  { id: 'lead', label: 'Leads' },
  { id: 'cliente', label: 'Clientes' },
  { id: 'suscriptor', label: 'Suscriptores' },
];

const LIFE_META = {
  lead: { label: 'Lead', badge: 'gold' },
  cliente: { label: 'Cliente', badge: 'ok' },
  suscriptor: { label: 'Suscriptor', badge: 'info' },
};

function lifecycleOf(c) {
  const ls = String(c.lifecycleStage || c.type || '').toLowerCase();
  if (ls === 'subscriber' || ls === 'suscriptor') return 'suscriptor';
  if (ls === 'customer' || ls === 'cliente') return 'cliente';
  return 'lead';
}

export function mountContactos(root) {
  const ui = { contacts: [], leads: [], loading: true, error: null, q: '', filter: 'todos' };
  let alive = true;

  // ── Toolbar (se construye UNA vez para no perder foco del buscador) ──
  const searchInput = el('input', { type: 'search', placeholder: 'Buscar por nombre, correo o teléfono…', 'aria-label': 'Buscar contactos' });
  searchInput.addEventListener('input', () => { ui.q = searchInput.value; renderList(); });
  const search = el('div', { class: 'search' }, [el('span', { 'aria-hidden': 'true', html: icon('search') }), searchInput]);

  const chipBtns = {};
  const chipsWrap = el('div', { class: 'contactos__chips', role: 'group', 'aria-label': 'Filtrar por tipo' });
  FILTERS.forEach((f) => {
    const chip = el('button', { class: 'chip', type: 'button', 'aria-pressed': f.id === ui.filter ? 'true' : 'false' }, [f.label]);
    chip.addEventListener('click', () => {
      ui.filter = f.id;
      Object.entries(chipBtns).forEach(([id, b]) => b.setAttribute('aria-pressed', id === f.id ? 'true' : 'false'));
      renderList();
    });
    chipBtns[f.id] = chip;
    chipsWrap.append(chip);
  });

  const countEl = el('span', { class: 'contactos__count u-caption u-faint' });
  const refreshBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', html: icon('refresh') + ' Actualizar' });
  refreshBtn.addEventListener('click', load);
  // OLA-2.4: exporta lo VISIBLE (respeta búsqueda + filtro), no la colección ciega.
  const csvBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', html: icon('download') + ' CSV', title: 'Exportar los contactos visibles a CSV' });
  csvBtn.addEventListener('click', () => {
    if (ui.loading) { toast('Aún cargando…', 'info'); return; }
    const rows = visibleContacts();
    if (!rows.length) { toast('No hay contactos para exportar.', 'info'); return; }
    exportCsv(`altorra-contactos-${new Date().toISOString().slice(0, 10)}.csv`, [
      ['Nombre', 'Email', 'Teléfono', 'Tipo', 'Etiquetas', 'Creado'],
      ...rows.map((c) => [c.fullName || '', c.email || '', c.phone || '', lifecycleOf(c), (c.tags || []).join(' | '), fmtFechaCsv(c.createdAt)]),
    ]);
  });

  const toolbar = el('div', { class: 'contactos__toolbar' }, [
    search, chipsWrap,
    el('div', { class: 'u-row u-row--tight' }, [countEl, csvBtn, refreshBtn]),
  ]);

  const list = el('div', { class: 'contactos__list' });
  const section = el('section', { class: 'contactos' }, [toolbar, list]);
  clear(root); root.append(section);

  // ── Mapa contacto → ficha (lead más reciente del contacto) ──
  function leadIndex() {
    const map = {};
    for (const l of ui.leads) {
      if (!l.contactId) continue;
      const prev = map[l.contactId];
      if (!prev || new Date(l.createdAt) > new Date(prev.createdAt)) map[l.contactId] = l;
    }
    return map;
  }

  function open360(lead) {
    // Atómico: espeja los leads al store (para que el 360 resuelva el lead, L-27) y abre la ficha.
    store.set({ leads: ui.leads, detailLeadId: lead.id });
  }

  // Lo VISIBLE según búsqueda + chip activo (render y export CSV comparten esto).
  function visibleContacts(q = normalizeSearch(ui.q)) {
    return ui.contacts.filter((c) => {
      if (ui.filter !== 'todos' && lifecycleOf(c) !== ui.filter) return false;
      if (!q) return true;
      return normalizeSearch(`${c.fullName || ''} ${c.email || ''} ${c.phone || ''}`).includes(q);
    });
  }

  function renderList() {
    if (ui.loading) return renderSkeleton();
    if (ui.error) return renderState('alertTriangle', 'No se pudieron cargar los contactos', ui.error);
    if (!ui.contacts.length) {
      return renderState('users', 'Aún no hay contactos', 'Cuando entren leads, registros de cuenta o suscripciones, las personas aparecerán aquí.');
    }

    const idx = leadIndex();
    const q = normalizeSearch(ui.q);
    const rows = visibleContacts(q);

    countEl.textContent = `${rows.length} de ${ui.contacts.length}`;
    clear(list);
    if (!rows.length) {
      // OLA-1.8: distinguir directorio VACÍO (estado-cero del novato, con explicación
      // de negocio) de búsqueda sin resultados (estado transitorio).
      const emptyDir = ui.contacts.length === 0;
      list.append(el('div', { class: 'state' }, [
        el('div', { class: 'state__icon', html: icon(emptyDir ? 'users' : 'search') }),
        el('div', { class: 'state__title', text: emptyDir ? 'Aún no hay contactos' : 'Sin resultados' }),
        el('div', { class: 'state__msg', text: emptyDir
          ? 'Los contactos se crean solos cuando entra un lead (web, WhatsApp o captura manual). Registra tu primer lead y aparecerá aquí.'
          : 'Prueba con otro término o filtro.' }),
      ]));
      return;
    }
    rows.forEach((c) => list.append(row(c, idx[c.id])));
  }

  function row(c, lead) {
    const life = lifecycleOf(c);
    const lm = LIFE_META[life];
    const ch = channelOf(c);
    const showTemp = Number(c.score) > 0 && RATING_META[c.rating];

    const badges = el('div', { class: 'contact-row__badges' }, [
      el('span', { class: `badge badge--${lm.badge}`, text: lm.label }),
      el('span', { class: 'badge' }, [uIco(ch.iconId), ch.label]),
      showTemp ? el('span', { class: `temp ${RATING_META[c.rating].cls}` }, [uIco(RATING_META[c.rating].iconId), String(c.score)]) : null,
    ]);

    const contactInfo = [c.email, c.phone].filter(Boolean).join(' · ') || 'Sin datos de contacto';
    const tags = Array.isArray(c.tags) && c.tags.length
      ? el('span', { class: 'contact-row__tags u-caption u-faint u-truncate', text: '🏷️ ' + c.tags.join(', ') }) : null;

    const children = [
      el('span', { class: 'avatar avatar--sm', 'aria-hidden': 'true', text: initials(c.fullName) }),
      el('div', { class: 'contact-row__main' }, [
        el('span', { class: 'contact-row__name u-truncate', text: c.fullName || 'Sin nombre' }),
        el('span', { class: 'contact-row__sub u-caption u-faint u-truncate', title: contactInfo, text: contactInfo }),
        tags,
      ]),
      badges,
      el('span', { class: 'contact-row__time u-caption u-faint', text: timeAgo(c.lastActivityAt) }),
    ];

    // Con lead → botón que abre la ficha 360. Sin lead (p. ej. suscriptor) → fila informativa NO interactiva
    // (toda su info ya está visible; no se finge un botón que no lleva a ningún lado).
    if (lead) {
      const r = el('button', { class: 'contact-row', type: 'button', 'aria-label': `Ver ficha de ${c.fullName || 'contacto'}` }, children);
      r.addEventListener('click', () => open360(lead));
      return r;
    }
    return el('div', { class: 'contact-row contact-row--nolead' }, children);
  }

  function renderState(iconId, title, msg) {
    countEl.textContent = '';
    clear(list);
    list.append(el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', html: icon(iconId) }),
      el('div', { class: 'state__title', text: title }),
      msg ? el('div', { class: 'state__msg', text: msg }) : null,
    ]));
  }

  // OLA-1.8b: skeleton con la forma real de la fila (avatar + 2 líneas + badge).
  function renderSkeleton() {
    countEl.textContent = '';
    clear(list);
    [1, 2, 3, 4, 5, 6].forEach(() => list.append(
      el('div', { class: 'contact-row contact-row--nolead', style: { pointerEvents: 'none' }, 'aria-hidden': 'true' }, [
        el('span', { class: 'skeleton', style: { width: '30px', height: '30px', borderRadius: '50%', flex: '0 0 auto' } }),
        el('div', { class: 'contact-row__main' }, [
          el('span', { class: 'skeleton', style: { width: '38%', height: '13px' } }),
          el('span', { class: 'skeleton', style: { width: '62%', height: '11px' } }),
        ]),
        el('span', { class: 'skeleton', style: { width: '72px', height: '18px' } }),
        el('span', { class: 'skeleton', style: { width: '48px', height: '11px' } }),
      ])));
  }

  async function load() {
    ui.loading = true; ui.error = null; renderList();
    try {
      const data = await loadContactsList();
      if (!alive) return;
      ui.contacts = data.contacts; ui.leads = data.leads; ui.loading = false;
    } catch (e) {
      if (!alive) return;
      ui.loading = false;
      ui.error = e && e.code === 'permission-denied' ? 'Sin permiso para ver los contactos.' : 'Revisa tu conexión e intenta de nuevo.';
    }
    renderList();
  }

  load();
  return function cleanup() { alive = false; };
}
