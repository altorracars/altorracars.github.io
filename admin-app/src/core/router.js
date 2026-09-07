// ============================================================
// Router hash mínimo. Secciones de primer nivel del shell.
// El panel Customer 360 NO es ruta (es overlay store-driven), pero
// permite deep-link vía ?lead= para abrirlo al cargar.
// ============================================================

// §275 (OLA-2.12): `cerebro`+`unmatched` → `conocimiento` (wrapper de tabs).
// Las rutas legacy se retiran; un hash viejo #/cerebro cae al fallback 'inicio'
// (graceful — CRM interno sin deep-links externos, verificado). Cero feature
// perdida: ambas superficies viven bajo #/conocimiento.
const ROUTES = ['inicio', 'bandeja', 'pipeline', 'agenda', 'reportes', 'contactos', 'config', 'resenas', 'banners', 'contenido', 'vehiculos', 'marcas', 'aliados', 'atributos', 'respaldos', 'usuarios', 'roles', 'departamentos', 'workflows', 'auditoria', 'ajustes', 'hub', 'conocimiento', 'perfil'];

export function currentRoute() {
  const hash = (location.hash || '').replace(/^#\/?/, '');
  const [name] = hash.split('/');
  // PLAN-UNIFICADO F-3 §237: el portal aterriza en su Inicio (antes Bandeja).
  return ROUTES.includes(name) ? name : 'inicio';
}

export function navigate(name) {
  if (location.hash === `#/${name}`) return;
  location.hash = `#/${name}`;
}

export function onRouteChange(fn) {
  const handler = () => fn(currentRoute());
  window.addEventListener('hashchange', handler);
  return () => window.removeEventListener('hashchange', handler);
}
