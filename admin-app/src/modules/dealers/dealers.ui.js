// ============================================================
// Aliados / Concesionarios (E6 fase ③, ADR §204) — UI.
// ⟦OPUS-4.8 · rev-Fable⟧ (Fable 5 no disponible — revisar al volver).
//
// Port VERBATIM del tab "Aliados" del clásico (admin-dealers.js): grid de
// cards con métricas derivadas + buscador (nombre/ciudad/responsable) +
// modal alta/edición (create+update). SIN borrado (el clásico no lo tiene
// → réplica exacta; la capacidad existe en rules/RBAC pero queda gated).
// Las vistas de reporte "Vehículos por origen" y "Propios" NO se portan:
// pertenecen al módulo de reportes/pipeline (decisión de arquitecto).
// RBAC: dealers.create / dealers.edit. Optimistic UI con rollback.
// ============================================================

import { el, clear } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { confirmDialog } from '../../core/confirm.js';
import { hasPermission } from '../../core/auth.js';
import {
  MOCK_DEALERS, MOCK_DEALER_STATS, subscribeDealers, fetchDealerStats,
  saveDealer, slugifyDealer, deleteDealer,
} from './dealers.data.js';

export function mountDealers(root) {
  const ui = { dealers: [], stats: {}, consignantes: [], sub: null, loaded: false, search: '' };
  const canCreate = hasPermission('dealers.create');
  const canEdit = hasPermission('dealers.edit');
  const canDelete = hasPermission('dealers.delete');

  const wrap = el('section', { class: 'dlr' });
  clear(root); root.append(wrap);

  /* ── Modal alta/edición ─────────────────────────────────── */
  function openModal(dealer) {
    const isEdit = !!dealer;

    const nombreIn = el('input', { class: 'input', type: 'text', maxlength: '60', placeholder: 'Nombre del aliado *' });
    const slugOut = el('span', { class: 'u-caption u-faint', text: isEdit ? 'ID: ' + dealer.id + ' (fijo)' : 'ID: —' });
    if (isEdit) nombreIn.value = dealer.nombre || '';
    else nombreIn.addEventListener('input', () => { slugOut.textContent = 'ID: ' + (slugifyDealer(nombreIn.value) || '—'); });

    const dirIn = el('input', { class: 'input', type: 'text', maxlength: '120', placeholder: 'Dirección' });
    const telIn = el('input', { class: 'input', type: 'text', maxlength: '40', placeholder: 'Teléfono' });
    const ciudadIn = el('input', { class: 'input', type: 'text', maxlength: '60', placeholder: 'Ciudad' });
    const horarioIn = el('input', { class: 'input', type: 'text', maxlength: '80', placeholder: 'Horario' });
    const respIn = el('input', { class: 'input', type: 'text', maxlength: '80', placeholder: 'Responsable' });
    ciudadIn.value = isEdit ? (dealer.ciudad || 'Cartagena') : 'Cartagena';
    if (isEdit) {
      dirIn.value = dealer.direccion || '';
      telIn.value = dealer.telefono || '';
      horarioIn.value = dealer.horario || '';
      respIn.value = dealer.responsable || '';
    }

    const saveBtn = el('button', { class: 'btn btn--gold', type: 'button', text: isEdit ? 'Guardar cambios' : 'Crear aliado' });
    const cancelBtn = el('button', { class: 'btn btn--soft', type: 'button', text: 'Cancelar' });
    const field = (label, input, extra) => el('label', { class: 'field' },
      [el('span', { class: 'field__label', text: label }), input].concat(extra ? [extra] : []));
    const overlay = el('div', { class: 'rev-modal__overlay' }, [
      el('div', { class: 'rev-modal rev-modal--sm', role: 'dialog', 'aria-modal': 'true' }, [
        el('h3', { class: 'rev-modal__title', text: isEdit ? 'Editar aliado: ' + dealer.nombre : 'Nuevo aliado' }),
        field('Nombre *', nombreIn, slugOut),
        field('Dirección', dirIn),
        field('Teléfono', telIn),
        field('Ciudad', ciudadIn),
        field('Horario', horarioIn),
        field('Responsable', respIn),
        el('div', { class: 'rev-modal__actions' }, [cancelBtn, saveBtn]),
      ]),
    ]);
    const close = () => overlay.remove();
    cancelBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });

    saveBtn.addEventListener('click', async () => {
      const nombre = nombreIn.value.trim();
      if (!nombre) { toast('El nombre es obligatorio.', 'error'); return; }
      if (!isEdit && ui.dealers.some((d) => d.id === slugifyDealer(nombre))) {
        toast('Ya existe un aliado con ese ID (' + slugifyDealer(nombre) + ').', 'error'); return;
      }
      const fields = {
        nombre,
        direccion: dirIn.value.trim(),
        telefono: telIn.value.trim(),
        ciudad: ciudadIn.value.trim() || 'Cartagena',
        horario: horarioIn.value.trim(),
        responsable: respIn.value.trim(),
        _userEmail: (store.get().user && store.get().user.email) || 'unknown',
      };
      if (store.get().mock) {
        if (isEdit) {
          const i = ui.dealers.findIndex((d) => d.id === dealer.id);
          if (i >= 0) ui.dealers[i] = { ...ui.dealers[i], ...fields };
        } else {
          const id = slugifyDealer(nombre);
          ui.dealers.push({ id, ...fields });
          ui.dealers.sort((a, b) => a.nombre.localeCompare(b.nombre));
        }
        renderGrid(); close(); toast(isEdit ? 'Aliado actualizado (demo)' : 'Aliado creado (demo)', 'ok');
        return;
      }
      saveBtn.disabled = true; saveBtn.textContent = 'Guardando…';
      try {
        await saveDealer(isEdit ? dealer.id : null, fields);
        close(); toast(isEdit ? '✓ Aliado actualizado' : '✓ Aliado creado', 'ok');
      } catch (e) {
        saveBtn.disabled = false; saveBtn.textContent = isEdit ? 'Guardar cambios' : 'Crear aliado';
        toast('No se pudo guardar: ' + (e.message || e.code), 'error');
      }
    });

    document.body.append(overlay);
    nombreIn.focus();
  }

  /* ── Borrado owner-only (modal premium + advertencia si tiene vehículos) ── */
  async function deleteDealerFlow(d) {
    const s = ui.stats[d.id] || {};
    const conVeh = (s.activos || 0) + (s.vendidos || 0);
    const aviso = conVeh > 0
      ? ' Tiene ' + conVeh + ' vehículo(s) vinculados: NO se borran, pero quedarán sin aliado.'
      : '';
    const ok = await confirmDialog({
      title: '¿Eliminar el aliado "' + (d.nombre || d.id) + '"?',
      message: 'Se quita de la lista de aliados.' + aviso + ' Esta acción no se puede deshacer.',
      confirmText: 'Eliminar', danger: true,
    });
    if (!ok) return;
    const idx = ui.dealers.findIndex((x) => x.id === d.id);
    const removed = idx >= 0 ? ui.dealers.splice(idx, 1)[0] : null;
    renderGrid(); // OPTIMISTA
    if (store.get().mock) { toast('Aliado eliminado (demo)', 'ok'); return; }
    try {
      await deleteDealer(d.id, d.nombre);
      toast('✓ Aliado eliminado', 'ok');
    } catch (e) {
      if (removed) { ui.dealers.splice(idx, 0, removed); renderGrid(); } // rollback
      toast('No se pudo eliminar: ' + (e.message || e.code), 'error');
    }
  }

  /* ── Card de aliado (métricas réplica del clásico) ──────── */
  function card(d) {
    const s = ui.stats[d.id] || { activos: 0, vendidos: 0, ventasAltorra: 0, comisiones: 0 };
    const com = s.comisiones > 0 ? '$' + (s.comisiones / 1000000).toFixed(1) + 'M' : '$0';
    const stat = (val, label, mod) => el('div', { class: 'dlr-stat' + (mod ? ' dlr-stat--' + mod : '') }, [
      el('div', { class: 'dlr-stat__val', text: String(val) }),
      el('div', { class: 'dlr-stat__lbl', text: label }),
    ]);
    const head = el('div', { class: 'dlr-card__head' }, [
      el('div', {}, [
        el('strong', { class: 'dlr-card__name', text: d.nombre || 'Sin nombre' }),
        el('div', { class: 'u-caption u-muted', text: (d.ciudad || '') + (d.direccion ? ' · ' + d.direccion : '') }),
      ]),
    ]);
    if (canEdit) {
      const editBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '✏️', 'aria-label': 'Editar' });
      editBtn.addEventListener('click', () => openModal(d));
      head.append(editBtn);
    }
    if (canDelete) {
      const delBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: '🗑', 'aria-label': 'Eliminar aliado', title: 'Eliminar aliado' });
      delBtn.addEventListener('click', () => deleteDealerFlow(d));
      head.append(delBtn);
    }
    const meta = [];
    if (d.telefono) meta.push(el('div', { class: 'u-caption u-muted', text: 'Tel: ' + d.telefono }));
    if (d.responsable) meta.push(el('div', { class: 'u-caption u-muted', text: 'Responsable: ' + d.responsable }));
    return el('article', { class: 'dlr-card' }, [
      head,
      el('div', { class: 'dlr-stats' }, [
        stat(s.activos, 'Activos', 'ok'),
        stat(s.vendidos, 'Vendidos', 'gold'),
        stat(s.ventasAltorra, 'Nuestras', 'info'),
        stat(com, 'Comisiones', 'ok'),
      ]),
    ].concat(meta));
  }

  /* ── Filtro (nombre / ciudad / responsable) ─────────────── */
  function filtered() {
    const term = ui.search.trim().toLowerCase();
    if (!term) return ui.dealers;
    return ui.dealers.filter((d) => {
      const name = (d.nombre || '').toLowerCase();
      const city = (d.ciudad || '').toLowerCase();
      const resp = (d.responsable || '').toLowerCase();
      return name.indexOf(term) !== -1 || city.indexOf(term) !== -1 || resp.indexOf(term) !== -1;
    });
  }

  /* ── Render: head persistente (no recrear el input) + grid ── */
  const countSpan = el('span', { class: 'u-caption u-muted' });
  const gridHost = el('div', { class: 'dlr-host' });

  const searchIn = el('input', { class: 'input dlr-search', type: 'search', placeholder: 'Buscar por nombre, ciudad o responsable…' });
  let searchTimer = null;
  searchIn.addEventListener('input', () => {
    clearTimeout(searchTimer);
    searchTimer = setTimeout(() => { ui.search = searchIn.value; renderGrid(); }, 200);
  });
  const newBtn = canCreate
    ? el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: '＋ Nuevo aliado' })
    : null;
  if (newBtn) newBtn.addEventListener('click', () => openModal(null));

  wrap.append(
    el('div', { class: 'rev-head' }, [countSpan, newBtn]),
    el('div', { class: 'dlr-toolbar' }, [searchIn]),
    gridHost,
  );

  function updateCount() {
    const list = filtered();
    const term = ui.search.trim();
    countSpan.textContent = term
      ? list.length + ' de ' + ui.dealers.length + ' aliados'
      : ui.dealers.length + ' aliados — proveedores de inventario (consignación / concesionarios).';
  }

  /* ── §TODO-50: card de CONSIGNANTE particular (persona; sin edición ni dirección) ── */
  function consignanteCard(c) {
    const com = c.comisiones > 0 ? '$' + (c.comisiones / 1000000).toFixed(1) + 'M' : '$0';
    const anon = c.key === 'consigna:_unidentified';
    const stat = (val, label, mod) => el('div', { class: 'dlr-stat' + (mod ? ' dlr-stat--' + mod : '') }, [
      el('div', { class: 'dlr-stat__val', text: String(val) }),
      el('div', { class: 'dlr-stat__lbl', text: label }),
    ]);
    return el('article', { class: 'dlr-card' }, [
      el('div', { class: 'dlr-card__head' }, [el('div', {}, [
        el('strong', { class: 'dlr-card__name', text: anon ? 'Sin identificar' : (c.nombre || 'Consignante') }),
        el('div', { class: 'u-caption u-muted', text: anon ? 'Consignas sin consignante asignado' : 'Consignante particular' }),
      ])]),
      el('div', { class: 'dlr-stats' }, [
        stat(c.activos, 'Activos', 'ok'),
        stat(c.vendidos, 'Vendidos', 'gold'),
        stat(com, 'Comisiones', 'ok'),
      ]),
    ]);
  }

  function renderGrid() {
    updateCount();
    clear(gridHost);
    if (!ui.loaded) {
      gridHost.append(el('div', { class: 'state' }, [el('div', { class: 'state__msg', text: 'Cargando aliados…' })]));
      return;
    }
    const list = filtered();
    const term = ui.search.trim().toLowerCase();
    const cons = term
      ? ui.consignantes.filter((c) => String(c.nombre || 'sin identificar').toLowerCase().indexOf(term) !== -1)
      : ui.consignantes;
    if (!list.length && !cons.length) {
      gridHost.append(el('div', { class: 'state' }, [
        el('div', { class: 'state__icon', text: '🤝' }),
        el('div', { class: 'state__title', text: ui.search.trim() ? 'Sin resultados' : 'Sin aliados' }),
      ]));
      return;
    }
    if (list.length) gridHost.append(el('div', { class: 'dlr-grid' }, list.map(card)));
    // §TODO-50: consignantes particulares (personas) — separados de los aliados-negocio
    if (cons.length) {
      gridHost.append(
        el('div', { class: 'u-caption u-muted', style: { margin: '18px 0 8px', fontWeight: '600' }, text: 'Consignantes particulares' }),
        el('div', { class: 'dlr-grid' }, cons.map(consignanteCard)),
      );
    }
  }

  if (store.get().mock) {
    ui.dealers = MOCK_DEALERS.map((d) => ({ ...d }));
    ui.stats = { ...MOCK_DEALER_STATS };
    ui.loaded = true; renderGrid();
  } else {
    renderGrid();
    ui.sub = subscribeDealers(
      (list) => { ui.dealers = list; ui.loaded = true; renderGrid(); },
      () => toast('No se pudieron cargar los aliados.', 'error'),
    );
    fetchDealerStats().then((s) => {
      ui.stats = s.byDealer || {}; ui.consignantes = s.consignantes || [];
      if (ui.loaded) renderGrid();
    }).catch(() => {});
  }

  return function cleanup() {
    if (ui.sub) ui.sub(); ui.sub = null;
    clearTimeout(searchTimer);
  };
}
