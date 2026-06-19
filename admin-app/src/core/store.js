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
  // §193.4 ④a PASO 6 — fundación departamental materializada para la UI.
  // Cosmética: la frontera de seguridad son las rules + CFs, NO estos campos
  // (que se hoistean del profile igual que `permissions`). dataScope = enforce ④b.
  nivel: 10,           // autoridad per-usuario (CEO=100 / resto=10)
  departmentId: null,  // id del depto (dept_<slug>) | null
  departmentName: '',  // espejo del nombre, para mostrar sin lookup
  dataScope: 'all',    // 'all' | 'dept' | 'own' (escrito en ④a, enforce en ④b)
  team: [],            // lista de asesores (para asignar)
  theme: 'light',
  mock: false,         // modo demo sin Firebase (?mock=1)
  detailLeadId: null,  // panel Customer 360 abierto (null = cerrado)
});
