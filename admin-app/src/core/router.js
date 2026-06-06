// ============================================================
// Router hash mínimo. Secciones de primer nivel del shell.
// El panel Customer 360 NO es ruta (es overlay store-driven), pero
// permite deep-link vía ?lead= para abrirlo al cargar.
// ============================================================

const ROUTES = ['bandeja']; // extensible: contactos, pipeline, agenda, reportes

export function currentRoute() {
  const hash = (location.hash || '').replace(/^#\/?/, '');
  const [name] = hash.split('/');
  return ROUTES.includes(name) ? name : 'bandeja';
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
