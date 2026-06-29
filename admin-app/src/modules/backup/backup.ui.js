// ============================================================
// Respaldos (E6 fase ③, D4-09b) — quinto módulo del portal.
// Dos gestos: (1) export manual extra al diario de las 5am;
// (2) restore SIEMPRE en dos pasos: plan (simulacro server-side,
// no escribe nada) → selección de colecciones → confirmación
// explícita. El restore es NO destructivo (docs actuales fuera
// del respaldo quedan) pero SÍ sobrescribe — por eso el modal
// rojo con los números del plan delante de los ojos.
// ============================================================

import { el, clear } from '../../core/dom.js';
import { store } from '../../core/store.js';
import { toast } from '../../core/toast.js';
import { hasPermission } from '../../core/auth.js';
import { friendlyError } from '../../core/errors.js';
import {
  runExport, planRestore, runRestore, dailyPathFor,
  MOCK_EXPORT, MOCK_PLAN,
} from './backup.data.js';

const todayKey = () => {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export function mountBackup(root) {
  const ui = { lastExport: null, path: '', plan: null, exportedAt: null, restored: null };

  const wrap = el('section', { class: 'bak' });
  clear(root); root.append(wrap);

  if (!hasPermission('settings.backup')) {
    wrap.append(el('div', { class: 'state' }, [
      el('div', { class: 'state__icon', text: '🔒' }),
      el('div', { class: 'state__title', text: 'Sin permiso' }),
      el('div', { class: 'state__msg', text: 'Solo quien administra los respaldos (permiso settings.backup) puede ver esto. El servidor además exige Super Admin para ejecutarlos.' }),
    ]));
    return;
  }

  function countsRows(counts) {
    return el('div', { class: 'bak-counts' }, Object.entries(counts).map(([col, n]) =>
      el('span', { class: 'bak-pill u-caption', text: `${col}: ${n}` })));
  }

  /* ── Card 1: export manual ──────────────────────────────── */
  function cardExport() {
    const btn = el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: 'Crear respaldo ahora' });
    const out = el('div', { class: 'bak-out' });
    if (ui.lastExport) {
      out.append(
        el('p', { class: 'u-caption', text: '✓ Respaldo creado (' + Math.round(ui.lastExport.bytes / 1024) + ' KB). Guarda este path para restaurarlo:' }),
        el('code', { class: 'bak-path', text: ui.lastExport.path }),
        countsRows(ui.lastExport.counts),
        ui.lastExport.capped && ui.lastExport.capped.length
          ? el('p', { class: 'u-caption lst-warn', text: '⚠️ Colecciones al tope de 5000 docs (export incompleto): ' + ui.lastExport.capped.join(', ') })
          : null,
      );
    }
    btn.addEventListener('click', async () => {
      if (store.get().mock) {
        ui.lastExport = MOCK_EXPORT;
        render(); toast('Respaldo creado (demo)', 'ok');
        return;
      }
      btn.disabled = true; btn.textContent = 'Exportando…';
      try {
        ui.lastExport = await runExport();
        render(); toast('✓ Respaldo creado', 'ok');
      } catch (e) {
        btn.disabled = false; btn.textContent = 'Crear respaldo ahora';
        toast('No se pudo exportar: ' + friendlyError(e), 'error');
      }
    });
    return el('div', { class: 'cfg-card' }, [
      el('h3', { class: 'cfg-card__title', text: '💾 Crear respaldo ahora' }),
      el('p', { class: 'u-caption u-muted', text: 'Cada madrugada (5:00 am) el sistema respalda solo el CRM y el inventario (vehículos y marcas incluidos) a almacenamiento privado. Este botón crea uno EXTRA ya mismo — hazlo antes de cualquier operación delicada.' }),
      btn, out,
    ]);
  }

  /* ── Card 2: restore en dos pasos ───────────────────────── */
  function cardRestore() {
    const dateIn = el('input', { class: 'input', type: 'date', max: todayKey(), value: todayKey() });
    const dailyBtn = el('button', { class: 'btn btn--soft btn--sm', type: 'button', text: 'Usar el diario de esa fecha' });
    const pathIn = el('input', { class: 'input bak-path-in', type: 'text', placeholder: 'crm-backups/…/export.json.gz', value: ui.path });
    const planBtn = el('button', { class: 'btn btn--gold btn--sm', type: 'button', text: 'Ver plan (simulacro — no escribe nada)' });
    const out = el('div', { class: 'bak-out' });

    dailyBtn.addEventListener('click', () => {
      if (!dateIn.value) { toast('Elige una fecha.', 'error'); return; }
      pathIn.value = dailyPathFor(dateIn.value);
    });

    planBtn.addEventListener('click', async () => {
      const path = pathIn.value.trim();
      if (path.indexOf('crm-backups/') !== 0) { toast('El path debe empezar con crm-backups/…', 'error'); return; }
      ui.path = path; ui.restored = null;
      if (store.get().mock) {
        ui.plan = MOCK_PLAN.plan; ui.exportedAt = MOCK_PLAN.exportedAt;
        render(); toast('Plan calculado (demo)', 'ok');
        return;
      }
      planBtn.disabled = true; planBtn.textContent = 'Calculando plan…';
      try {
        const res = await planRestore(path);
        ui.plan = res.plan; ui.exportedAt = res.exportedAt;
        render();
      } catch (e) {
        planBtn.disabled = false; planBtn.textContent = 'Ver plan (simulacro — no escribe nada)';
        toast('No se pudo leer el respaldo: ' + friendlyError(e), 'error');
      }
    });

    if (ui.plan) out.append(planBlock());
    if (ui.restored) {
      out.append(
        el('p', { class: 'u-caption', text: '✓ Restauración completada:' }),
        countsRows(ui.restored),
      );
    }

    return el('div', { class: 'cfg-card' }, [
      el('h3', { class: 'cfg-card__title', text: '♻️ Restaurar desde un respaldo' }),
      el('p', { class: 'u-caption u-muted', text: 'Paso 1: pega el path de un respaldo (o usa el diario por fecha). Paso 2: revisa el plan. Solo entonces puedes restaurar. No borra docs que el respaldo no conozca.' }),
      el('div', { class: 'cfg-row' }, [dateIn, dailyBtn]),
      el('div', { class: 'cfg-row bak-row-path' }, [pathIn, planBtn]),
      out,
    ]);
  }

  function planBlock() {
    const boxes = {};
    const rows = Object.entries(ui.plan).map(([col, p]) => {
      const cb = el('input', { type: 'checkbox' });
      cb.checked = true;
      boxes[col] = cb;
      return el('label', { class: 'bak-plan__row' }, [
        cb,
        el('strong', { class: 'bak-plan__col', text: col }),
        el('span', { class: 'u-caption u-muted', text: `${p.total} en respaldo · ${p.toCreate} nuevos · ${p.toOverwrite} se sobrescriben · ${p.currentNotInBackup} actuales fuera del respaldo (quedan)` }),
      ]);
    });
    const restoreBtn = el('button', { class: 'btn btn--danger btn--sm', type: 'button', text: 'Restaurar seleccionadas…' });
    restoreBtn.addEventListener('click', () => {
      const selected = Object.entries(boxes).filter(([, cb]) => cb.checked).map(([col]) => col);
      if (!selected.length) { toast('Selecciona al menos una colección.', 'error'); return; }
      confirmRestore(selected);
    });
    return el('div', { class: 'bak-plan' }, [
      el('p', { class: 'u-caption', text: `Plan del respaldo del ${ui.exportedAt} (simulacro — nada escrito aún):` }),
      ...rows,
      el('p', { class: 'u-caption u-faint', text: 'Si restauras TODAS, también se restauran los docs de configuración (cupos, disponibilidad, calendario y listas de atributos).' }),
      restoreBtn,
    ]);
  }

  function confirmRestore(selected) {
    const all = selected.length === Object.keys(ui.plan).length;
    const overwrites = selected.reduce((n, col) => n + (ui.plan[col] ? ui.plan[col].toOverwrite : 0), 0);
    const okBtn = el('button', { class: 'btn btn--danger', type: 'button', text: 'Sí, restaurar' });
    const cancelBtn = el('button', { class: 'btn btn--soft', type: 'button', text: 'Cancelar' });
    const overlay = el('div', { class: 'rev-modal__overlay' }, [
      el('div', { class: 'rev-modal rev-modal--sm', role: 'alertdialog', 'aria-modal': 'true' }, [
        el('h3', { class: 'rev-modal__title', text: '¿Restaurar ' + (all ? 'TODO el respaldo' : selected.join(', ')) + '?' }),
        el('p', { class: 'u-caption lst-warn', text: `⚠️ Se sobrescriben ${overwrites} documento(s) con la versión del ${ui.exportedAt}. Lo editado después de esa hora EN ESAS COLECCIONES se pierde.` }),
        all ? el('p', { class: 'u-caption u-muted', text: 'Incluye los docs de configuración (cupos, disponibilidad, calendario, listas).' }) : null,
        el('div', { class: 'rev-modal__actions' }, [cancelBtn, okBtn]),
      ]),
    ]);
    const close = () => overlay.remove();
    cancelBtn.addEventListener('click', close);
    overlay.addEventListener('click', (e) => { if (e.target === overlay) close(); });
    okBtn.addEventListener('click', async () => {
      if (store.get().mock) {
        ui.restored = Object.fromEntries(selected.map((c) => [c, ui.plan[c].total]));
        ui.plan = null;
        close(); render(); toast('Restauración simulada (demo)', 'ok');
        return;
      }
      okBtn.disabled = true; okBtn.textContent = 'Restaurando…';
      try {
        const res = await runRestore(ui.path, all ? null : selected);
        ui.restored = res.restored; ui.plan = null;
        close(); render(); toast('✓ Restauración completada', 'ok');
      } catch (e) {
        okBtn.disabled = false; okBtn.textContent = 'Sí, restaurar';
        toast('No se pudo restaurar: ' + friendlyError(e), 'error');
      }
    });
    document.body.append(overlay);
  }

  function render() {
    clear(wrap);
    wrap.append(el('div', { class: 'rev-head' }, [
      el('span', { class: 'u-caption u-muted', text: 'Red de seguridad del CRM y el inventario. El servidor exige Super Admin; el restore siempre pasa por un simulacro primero.' }),
    ]));
    wrap.append(el('div', { class: 'cfg-cols' }, [cardExport(), cardRestore()]));
  }

  render();
}
