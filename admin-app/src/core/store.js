// ============================================================
// Store reactivo mínimo (pub/sub). Sin dependencias.
// `set` acepta un patch (objeto) o un updater (state -> patch).
// ============================================================

export function createStore(initial) {
  let state = { ...initial };
  const subs = new Set();

  function get() {
    return state;
  }

  function set(patch) {
    const next = typeof patch === 'function' ? patch(state) : patch;
    if (!next) return;
    state = { ...state, ...next };
    subs.forEach((fn) => fn(state));
  }

  function subscribe(fn) {
    subs.add(fn);
    return () => subs.delete(fn);
  }

  return { get, set, subscribe };
}

// Store global de la app.
export const store = createStore({
  ready: false,        // auth resuelto (login o sesión restaurada)
  authError: null,
  user: null,          // firebase user (o mock)
  profile: null,       // doc usuarios/{uid}
  permissions: [],     // [] | ['*'] | ['crm.read', ...]
  team: [],            // lista de asesores (para asignar)
  theme: 'light',
  mock: false,         // modo demo sin Firebase (?mock=1)
  detailLeadId: null,  // panel Customer 360 abierto (null = cerrado)
});
