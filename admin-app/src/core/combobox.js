// ============================================================
// OLA-1.9 — Combobox typeahead REUTILIZABLE (1er consumidor: el
// picker de vehículo de la conversión). Un <select> nativo muere
// a 100+ opciones; esto filtra mientras escribes (sin acentos,
// via normalizeSearch). Teclado completo (↓ ↑ Enter Esc) + ARIA.
// Opciones `pinned: true` quedan visibles aunque el filtro no
// matchee (escotillas tipo "Sin vehículo aún").
// ============================================================

import { el, clear } from './dom.js';
import { normalizeSearch } from '../domain/format.js';

export function createCombobox({ placeholder = 'Escribe para buscar…', emptyText = 'Sin resultados', onChange } = {}) {
  let options = [];      // [{ value, label, hint?, pinned? }]
  let value = '';
  let hi = -1;           // índice resaltado dentro de la lista filtrada
  let visible = [];      // cache de la última lista filtrada renderizada

  const input = el('input', {
    class: 'input', type: 'text', placeholder, autocomplete: 'off',
    role: 'combobox', 'aria-expanded': 'false', 'aria-autocomplete': 'list',
  });
  const list = el('div', { class: 'cbx__list', role: 'listbox', hidden: true });
  const root = el('div', { class: 'cbx' }, [input, list]);

  function filtered() {
    const q = normalizeSearch(input.value.trim());
    if (!q) return options;
    return options.filter((o) => o.pinned || normalizeSearch(o.label).includes(q));
  }

  function renderList() {
    visible = filtered();
    clear(list);
    if (!visible.length) {
      list.append(el('div', { class: 'cbx__empty u-caption u-faint', text: emptyText }));
      return;
    }
    visible.forEach((o, i) => {
      const item = el('button', {
        class: 'cbx__item' + (i === hi ? ' is-hi' : ''),
        type: 'button', role: 'option',
        'aria-selected': o.value === value ? 'true' : 'false',
      }, [
        el('span', { class: 'u-grow u-truncate', text: o.label }),
        o.hint ? el('span', { class: 'cbx__hint u-caption u-faint', text: o.hint }) : null,
      ]);
      // pointerdown preventDefault: el input NO pierde el focus antes del click.
      item.addEventListener('pointerdown', (e) => e.preventDefault());
      item.addEventListener('click', () => pick(o));
      list.append(item);
    });
  }

  function openList() {
    if (!list.hidden) { renderList(); return; }
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    renderList();
  }
  function closeList() {
    list.hidden = true; hi = -1;
    input.setAttribute('aria-expanded', 'false');
  }
  function pick(o) {
    value = o.value;
    input.value = o.label;
    closeList();
    if (onChange) onChange(o);
  }
  function move(delta) {
    if (list.hidden) { openList(); return; }
    if (!visible.length) return;
    hi = (hi + delta + visible.length) % visible.length;
    renderList();
    const node = list.children[hi];
    if (node && node.scrollIntoView) node.scrollIntoView({ block: 'nearest' });
  }

  input.addEventListener('focus', openList);
  input.addEventListener('input', () => {
    value = '';          // editar invalida la selección hasta volver a elegir
    hi = 0;              // Enter directo toma el primer match
    openList();
  });
  input.addEventListener('blur', closeList);
  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); move(1); return; }
    if (e.key === 'ArrowUp') { e.preventDefault(); move(-1); return; }
    if (e.key === 'Enter' && !list.hidden) {
      e.preventDefault(); // NO dispara el submit del form contenedor
      if (visible[hi]) pick(visible[hi]);
      return;
    }
    if (e.key === 'Escape' && !list.hidden) {
      e.stopPropagation(); // cierra SOLO la lista, no el modal contenedor
      closeList();
    }
  });

  return {
    root,
    input,
    get value() { return value; },
    setOptions(next) { options = next || []; if (!list.hidden) renderList(); },
    setValue(v) {
      const o = options.find((x) => x.value === v);
      if (o) { value = o.value; input.value = o.label; }
    },
    setDisabled(d) { input.disabled = !!d; },
    setPlaceholder(p) { input.placeholder = p; },
  };
}
