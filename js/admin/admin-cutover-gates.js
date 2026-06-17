// ============================================================
// admin-cutover-gates.js — Strangler E6 · gates ②/③ (ADR §188/§190-195/§210).
//
// OCULTA + REDIRIGE al portal nuevo (admin-app) las secciones del admin CLÁSICO
// ya portadas, SIN tocar lógica viva ni borrar nada (doctrina Ocultar≠Borrar,
// §188.5 / §3.2 / §17.4). 100% ADITIVO y REVERSIBLE: vacía MIGRATED o quita el
// <script> de admin.html y el clásico vuelve byte-idéntico.
//
// Cubre las 3 superficies de navegación de una sección (si no, hay fuga):
//   1. sidebar      → .nav-item[data-section="X"]
//   2. group-tabs   → .section-tab[data-section-tab="X"]   (admin-group-tabs.js)
//   3. deep-links   → #/X  (admin-section-router.js syncFromHash, load + hashchange)
//
// ⛔ NUNCA incluyas 'vehicles' hasta que pase el LOTE V6 EN VIVO: R-12 (doble
//    escritor vehiculos.estado) + R-13 (paridad de esquema con el CI
//    scripts/generate-vehicles.mjs cada 4h) — ADR §198.2 / §203.6.
// ============================================================
(function () {
  'use strict';

  // sección clásica (REGISTRY / data-section) → ruta del portal (router.js ROUTES)
  var MIGRATED = {
    // ── Gate ② · Sitio público (§190 reseñas · §191 banners) ──
    reviews: 'resenas',
    banners: 'banners',
    // ── Gate ③ · Inventario (§192 marcas · §194 atributos · §204 aliados) ──
    brands:  'marcas',
    lists:   'atributos',
    dealers: 'aliados',
    // vehicles: 'vehiculos',  // ⛔ pendiente lote V6 EN VIVO (R-12/R-13)
  };
  var PORTAL_BASE = '/admin-app/dist/#/';

  function portalUrl(section) { return PORTAL_BASE + (MIGRATED[section] || ''); }
  function isMigrated(section) {
    return !!section && Object.prototype.hasOwnProperty.call(MIGRATED, section);
  }

  function announce() {
    try {
      if (typeof window.toast === 'function') {
        window.toast('Esta sección se gestiona ahora en el panel nuevo — abriéndola…', 'info');
      }
    } catch (e) { /* toast es best-effort */ }
  }

  // 1) OCULTAR las 3 superficies vía CSS inyectado. !important vence cualquier
  //    display inline que las re-muestre (ej. applyRolePermissions) y sobrevive a
  //    los re-render de group-tabs (preInjectAll) — más robusto que mutar nodos.
  function injectHideCss() {
    var sel = [];
    Object.keys(MIGRATED).forEach(function (k) {
      sel.push('.nav-item[data-section="' + k + '"]');
      sel.push('.section-tab[data-section-tab="' + k + '"]');
    });
    if (!sel.length) return;
    var style = document.createElement('style');
    style.id = 'cutover-gates-hide';
    style.textContent = sel.join(',') + '{display:none !important;}';
    (document.head || document.documentElement).appendChild(style);
  }

  // 2) Interceptar clicks en capture-phase (mismo patrón que
  //    admin-section-router.js:271-283): cualquier referencia residual a una
  //    sección migrada → abre el portal, NUNCA activa la sección clásica.
  function attachClickGuard() {
    document.addEventListener('click', function (e) {
      var el = e.target && e.target.closest && e.target.closest('[data-section],[data-section-tab]');
      if (!el) return;
      var section = el.getAttribute('data-section') || el.getAttribute('data-section-tab');
      if (!isMigrated(section)) return;
      e.preventDefault();
      e.stopPropagation();   // gana al handler nativo de sidebar/group-tabs
      announce();
      window.open(portalUrl(section), '_blank', 'noopener');
    }, true); // capture
  }

  // 3) Deep-links de hash (#/banners, bookmarks): si el hash resuelve a una sección
  //    migrada → handoff completo al portal antes de que el clásico la active.
  function hashSection() {
    return (window.location.hash || '').replace(/^#\/?/, '').trim() || null;
  }
  function guardHash() {
    var section = hashSection();
    if (!isMigrated(section)) return false;
    window.location.replace(portalUrl(section));
    return true;
  }

  function init() {
    injectHideCss();
    attachClickGuard();
    // corre en init (DOMContentLoaded), ANTES del syncFromHash diferido (+100ms)
    // de admin-section-router.js → ganamos el deep-link de carga inicial.
    guardHash();
    window.addEventListener('hashchange', guardHash);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
