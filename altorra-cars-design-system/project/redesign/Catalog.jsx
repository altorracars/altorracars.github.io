// ============================================================
// ALTORRA · Cinematic CATALOG · /catalog.html
// HarmonyOS-style search & filters — full editorial dark theme
// ============================================================
(function () {
  const { useState, useEffect, useMemo, useRef, useCallback } = React;
  const data = window.AltorraData;

  // ---------- Helpers ----------
  const fmtPrice = (n) => '$' + Number(n).toLocaleString('es-CO');
  const fmtKm    = (n) => Number(n).toLocaleString('es-CO') + ' km';

  const SORTS = [
    { id: 'precio-asc',  label: 'Precio · menor a mayor' },
    { id: 'precio-desc', label: 'Precio · mayor a menor' },
    { id: 'year-desc',   label: 'Año · más reciente' },
    { id: 'year-asc',    label: 'Año · más antiguo' },
    { id: 'km-asc',      label: 'Km · menor primero' },
  ];

  const ALL_TRANS = Array.from(new Set(data.VEHICLES.map(v => v.trans))).sort();
  const ALL_FUEL  = Array.from(new Set(data.VEHICLES.map(v => v.fuel))).sort();
  const ALL_CITY  = Array.from(new Set(data.VEHICLES.map(v => v.city))).sort();

  const DEFAULT_FILTERS = () => ({
    q: '',
    brand: '',
    cat: '',
    trans: '',
    fuel: '',
    city: '',
    priceMin: '',
    priceMax: '',
    yearMin: '',
    yearMax: '',
    kmMax: '',
    condition: '',  // '' | 'nuevo' | 'usado'
    featured: false,
  });

  // ---------- Persisted state ----------
  function useParam(name, fallback = '') {
    const [val, setVal] = useState(() => {
      const u = new URL(window.location.href);
      return u.searchParams.get(name) || fallback;
    });
    useEffect(() => {
      const u = new URL(window.location.href);
      if (val) u.searchParams.set(name, val); else u.searchParams.delete(name);
      window.history.replaceState({}, '', u);
    }, [name, val]);
    return [val, setVal];
  }

  // ---------- VehicleCard ----------
  function VCard({ v, fav, onFav, onCompare, comparing }) {
    return (
      <a href={`detail.html?id=${v.id}`} className="cat-card" aria-label={`${v.brandName} ${v.model}`}>
        <div className="cat-card-media" style={{ background: v.images[0].bg }}>
          <span className="cat-card-img-overlay" />
          <div className="cat-card-chips">
            {v.condition === 'nuevo' && <span className="cat-chip cat-chip--new">0 KM</span>}
            {v.badge && <span className="cat-chip cat-chip--badge">{v.badge}</span>}
          </div>
          <button
            type="button"
            className={`cat-card-fav ${fav ? 'is-on' : ''}`}
            onClick={(e) => { e.preventDefault(); onFav(v.id); }}
            aria-label="Favorito"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </button>
          <button
            type="button"
            className={`cat-card-compare ${comparing ? 'is-on' : ''}`}
            onClick={(e) => { e.preventDefault(); onCompare(v.id); }}
            aria-label="Comparar"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M3 6h18M3 12h18M3 18h18"/>
            </svg>
            {comparing ? 'En comparador' : 'Comparar'}
          </button>
          <span className="cat-card-brand-mark">
            <img src={data.BRANDS.find(b => b.slug === v.brand)?.logo} alt={v.brandName}/>
          </span>
        </div>
        <div className="cat-card-body">
          <div className="cat-card-head">
            <span className="cat-card-brand">{v.brandName}</span>
            <h3 className="cat-card-model">{v.model}</h3>
          </div>
          <div className="cat-card-specs">
            <span>{v.year}</span><i>·</i>
            <span>{fmtKm(v.km)}</span><i>·</i>
            <span>{v.trans.split(' ')[0]}</span><i>·</i>
            <span>{v.fuel}</span>
          </div>
          <div className="cat-card-rule" />
          <div className="cat-card-price">{fmtPrice(v.price)}</div>
        </div>
        <span className="cat-card-glow" aria-hidden="true" />
      </a>
    );
  }

  // ---------- Filter Panel ----------
  function FilterPanel({ f, setF, count, reset }) {
    const active = Object.entries(f).filter(([k, v]) => {
      if (k === 'featured') return v === true;
      return v !== '' && v !== false;
    }).length;
    return (
      <aside className="cat-filters">
        <div className="cat-filters-head">
          <span className="cin-eyebrow">Filtros</span>
          <h2 className="cat-filters-h">Refina tu búsqueda</h2>
          {active > 0 && (
            <button type="button" className="cat-filters-reset" onClick={reset}>
              Limpiar ({active})
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 6l12 12M6 18 18 6"/></svg>
            </button>
          )}
        </div>

        <div className="cat-filter-group">
          <label className="cat-filter-label">Búsqueda libre</label>
          <div className="cat-filter-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            <input
              type="text"
              value={f.q}
              onChange={(e) => setF({ ...f, q: e.target.value })}
              placeholder="Marca, modelo, año…"
            />
          </div>
        </div>

        <div className="cat-filter-group">
          <label className="cat-filter-label">Condición</label>
          <div className="cat-filter-pills">
            {[
              { id: '',      label: 'Todos' },
              { id: 'nuevo', label: '0 KM' },
              { id: 'usado', label: 'Usado' },
            ].map((opt) => (
              <button
                key={opt.id || 'all'}
                type="button"
                className={`cat-filter-pill ${f.condition === opt.id ? 'is-on' : ''}`}
                onClick={() => setF({ ...f, condition: opt.id })}
              >{opt.label}</button>
            ))}
          </div>
        </div>

        <div className="cat-filter-group">
          <label className="cat-filter-label">Marca</label>
          <select className="cat-filter-select" value={f.brand} onChange={(e) => setF({ ...f, brand: e.target.value })}>
            <option value="">Todas</option>
            {data.BRANDS.map(b => <option key={b.slug} value={b.slug}>{b.name}</option>)}
          </select>
        </div>

        <div className="cat-filter-group">
          <label className="cat-filter-label">Carrocería</label>
          <select className="cat-filter-select" value={f.cat} onChange={(e) => setF({ ...f, cat: e.target.value })}>
            <option value="">Todas</option>
            {['suv','sedan','pickup','hatchback'].map(s => <option key={s} value={s}>{(data.CATEGORIES.find(c=>c.slug===s)||{name:s}).name}</option>)}
          </select>
        </div>

        <div className="cat-filter-row-2">
          <div className="cat-filter-group">
            <label className="cat-filter-label">Transmisión</label>
            <select className="cat-filter-select" value={f.trans} onChange={(e) => setF({ ...f, trans: e.target.value })}>
              <option value="">Todas</option>
              {ALL_TRANS.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
          <div className="cat-filter-group">
            <label className="cat-filter-label">Combustible</label>
            <select className="cat-filter-select" value={f.fuel} onChange={(e) => setF({ ...f, fuel: e.target.value })}>
              <option value="">Todos</option>
              {ALL_FUEL.map(t => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        <div className="cat-filter-group">
          <label className="cat-filter-label">Rango de precio</label>
          <div className="cat-filter-range">
            <input type="number" inputMode="numeric" placeholder="Mín" value={f.priceMin}
                   onChange={(e) => setF({ ...f, priceMin: e.target.value })}/>
            <span>—</span>
            <input type="number" inputMode="numeric" placeholder="Máx" value={f.priceMax}
                   onChange={(e) => setF({ ...f, priceMax: e.target.value })}/>
          </div>
        </div>

        <div className="cat-filter-group">
          <label className="cat-filter-label">Año</label>
          <div className="cat-filter-range">
            <input type="number" inputMode="numeric" placeholder="Desde" value={f.yearMin}
                   onChange={(e) => setF({ ...f, yearMin: e.target.value })}/>
            <span>—</span>
            <input type="number" inputMode="numeric" placeholder="Hasta" value={f.yearMax}
                   onChange={(e) => setF({ ...f, yearMax: e.target.value })}/>
          </div>
        </div>

        <div className="cat-filter-group">
          <label className="cat-filter-label">Kilometraje máximo</label>
          <input type="number" inputMode="numeric" className="cat-filter-input" placeholder="Ej. 50.000"
                 value={f.kmMax} onChange={(e) => setF({ ...f, kmMax: e.target.value })}/>
        </div>

        <div className="cat-filter-group">
          <label className="cat-filter-label">Ciudad</label>
          <select className="cat-filter-select" value={f.city} onChange={(e) => setF({ ...f, city: e.target.value })}>
            <option value="">Todas</option>
            {ALL_CITY.map(t => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className="cat-filter-group">
          <label className="cat-filter-toggle">
            <input type="checkbox" checked={f.featured} onChange={(e) => setF({ ...f, featured: e.target.checked })}/>
            <span className="cat-toggle-rail"><span className="cat-toggle-dot"/></span>
            Solo destacados
          </label>
        </div>

        <div className="cat-filter-foot">
          <strong>{count}</strong>
          <span>resultados</span>
        </div>
      </aside>
    );
  }

  // ---------- Compare bar (max 2) ----------
  function CompareBar({ ids, onClear, onRemove }) {
    if (!ids.length) return null;
    const arr = ids.map(id => data.VEHICLES.find(v => v.id === id)).filter(Boolean);
    return (
      <div className="cat-compare-bar" role="region" aria-label="Comparador">
        <div className="cat-compare-inner">
          <span className="cat-compare-eyebrow">Comparador · máx 2</span>
          <div className="cat-compare-slots">
            {[0, 1].map(i => {
              const v = arr[i];
              return (
                <div key={i} className={`cat-compare-slot ${v ? 'is-full' : 'is-empty'}`}>
                  {v ? (
                    <>
                      <span className="cat-compare-thumb" style={{ background: v.images[0].bg }}/>
                      <div className="cat-compare-meta">
                        <strong>{v.brandName} {v.model}</strong>
                        <span>{v.year} · {fmtPrice(v.price)}</span>
                      </div>
                      <button type="button" className="cat-compare-remove" onClick={() => onRemove(v.id)} aria-label="Quitar">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 6 18 18M6 18 18 6"/></svg>
                      </button>
                    </>
                  ) : (
                    <span className="cat-compare-empty">+ Selecciona un vehículo</span>
                  )}
                </div>
              );
            })}
          </div>
          <div className="cat-compare-cta">
            <button type="button" className="cat-compare-clear" onClick={onClear}>Limpiar</button>
            <a href={`compare.html?a=${ids[0] || ''}&b=${ids[1] || ''}`}
               className="cat-compare-go"
               aria-disabled={ids.length < 2}>
              Comparar
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </div>
    );
  }

  // ---------- Catalog root ----------
  function Catalog() {
    const [qParam] = useParam('q', '');
    const [brandParam] = useParam('brand', '');
    const [catParam] = useParam('cat', '');
    const [f, setF] = useState(() => ({
      ...DEFAULT_FILTERS(),
      q: qParam,
      brand: brandParam,
      cat: catParam,
    }));
    const [sort, setSort] = useState('precio-asc');
    const [view, setView] = useState('grid'); // grid | rows
    const [favs, setFavs] = useState(() => {
      try { return new Set(JSON.parse(localStorage.getItem('alt-fav') || '[]')); } catch { return new Set(); }
    });
    const [compareIds, setCompareIds] = useState(() => {
      try { return JSON.parse(localStorage.getItem('alt-cmp') || '[]').slice(0, 2); } catch { return []; }
    });
    const [filterOpen, setFilterOpen] = useState(false); // mobile drawer

    useEffect(() => { localStorage.setItem('alt-fav', JSON.stringify([...favs])); }, [favs]);
    useEffect(() => { localStorage.setItem('alt-cmp', JSON.stringify(compareIds)); }, [compareIds]);

    // sync URL
    useEffect(() => {
      const u = new URL(window.location.href);
      ['q','brand','cat'].forEach(k => {
        if (f[k]) u.searchParams.set(k, f[k]); else u.searchParams.delete(k);
      });
      window.history.replaceState({}, '', u);
    }, [f.q, f.brand, f.cat]);

    const reset = () => setF(DEFAULT_FILTERS());

    const onFav = useCallback((id) => {
      setFavs(prev => {
        const n = new Set(prev);
        n.has(id) ? n.delete(id) : n.add(id);
        return n;
      });
    }, []);

    const onCompare = useCallback((id) => {
      setCompareIds(prev => {
        if (prev.includes(id)) return prev.filter(x => x !== id);
        if (prev.length >= 2) return [prev[1], id];
        return [...prev, id];
      });
    }, []);

    // ---------- Filter + sort logic ----------
    const filtered = useMemo(() => {
      const q = f.q.trim().toLowerCase();
      const pMin = +f.priceMin || 0;
      const pMax = +f.priceMax || Infinity;
      const yMin = +f.yearMin  || 0;
      const yMax = +f.yearMax  || Infinity;
      const kMax = +f.kmMax    || Infinity;
      let arr = data.VEHICLES.filter(v => {
        if (q) {
          const hay = (v.brandName + ' ' + v.model + ' ' + v.year + ' ' + v.cat + ' ' + v.color).toLowerCase();
          if (!hay.includes(q)) return false;
        }
        if (f.brand && v.brand !== f.brand) return false;
        if (f.cat && v.cat !== f.cat) return false;
        if (f.trans && v.trans !== f.trans) return false;
        if (f.fuel && v.fuel !== f.fuel) return false;
        if (f.city && v.city !== f.city) return false;
        if (f.condition && v.condition !== f.condition) return false;
        if (f.featured && !v.featured) return false;
        if (v.price < pMin || v.price > pMax) return false;
        if (v.year  < yMin || v.year  > yMax) return false;
        if (v.km    > kMax) return false;
        return true;
      });

      switch (sort) {
        case 'precio-asc':  arr = arr.slice().sort((a,b) => a.price - b.price); break;
        case 'precio-desc': arr = arr.slice().sort((a,b) => b.price - a.price); break;
        case 'year-desc':   arr = arr.slice().sort((a,b) => b.year - a.year);   break;
        case 'year-asc':    arr = arr.slice().sort((a,b) => a.year - b.year);   break;
        case 'km-asc':      arr = arr.slice().sort((a,b) => a.km - b.km);       break;
        default: break;
      }
      return arr;
    }, [f, sort]);

    return (
      <main className="cat-page" data-screen-label="Catálogo">
        {/* HERO */}
        <section className="cat-hero">
          <div className="cat-hero-bg" aria-hidden="true"/>
          <div className="cat-grain" aria-hidden="true"/>
          <div className="cat-hero-inner">
            <span className="cin-eyebrow">Catálogo · {data.VEHICLES.length} vehículos</span>
            <h1 className="cat-hero-h">
              Encuentra tu próximo<br/>
              <span className="cat-hero-h-accent">Altorra</span>
            </h1>
            <p className="cat-hero-sub">Marca, año, kilometraje o presupuesto — filtra como quieras. Los aliados están listos.</p>
          </div>
        </section>

        {/* TOOLBAR */}
        <div className="cat-toolbar">
          <div className="cat-toolbar-inner">
            <button type="button" className="cat-mob-filter" onClick={() => setFilterOpen(true)}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M6 12h12M10 18h4"/></svg>
              Filtros
            </button>
            <div className="cat-toolbar-count">
              <strong>{filtered.length}</strong>
              <span>de {data.VEHICLES.length} vehículos</span>
            </div>
            <div className="cat-toolbar-right">
              <div className="cat-view-toggle" role="group" aria-label="Vista">
                <button type="button" className={view === 'grid' ? 'is-on' : ''} onClick={() => setView('grid')} aria-label="Cuadrícula">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>
                </button>
                <button type="button" className={view === 'rows' ? 'is-on' : ''} onClick={() => setView('rows')} aria-label="Lista">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                </button>
              </div>
              <select className="cat-sort" value={sort} onChange={(e) => setSort(e.target.value)} aria-label="Ordenar por">
                {SORTS.map(s => <option key={s.id} value={s.id}>{s.label}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* GRID */}
        <section className="cat-layout">
          <div className={`cat-filter-shell ${filterOpen ? 'is-open' : ''}`}>
            <button type="button" className="cat-filter-shell-close" onClick={() => setFilterOpen(false)} aria-label="Cerrar filtros">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 6 18 18M6 18 18 6"/></svg>
            </button>
            <FilterPanel f={f} setF={setF} count={filtered.length} reset={reset}/>
          </div>
          <div className={`cat-results cat-results--${view}`}>
            {filtered.length === 0 ? (
              <div className="cat-empty">
                <span className="cat-empty-mark" aria-hidden="true">
                  <svg viewBox="0 0 100 100" fill="none">
                    <circle cx="50" cy="50" r="42" stroke="currentColor" strokeWidth="0.8" strokeDasharray="3 4" opacity="0.4"/>
                    <path d="M40 50h20M50 40v20" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
                  </svg>
                </span>
                <h3>Sin resultados con esos filtros</h3>
                <p>Prueba ajustando el rango de precio, año o quita una marca para ver más opciones.</p>
                <button type="button" className="cat-empty-reset" onClick={reset}>Limpiar todos los filtros</button>
              </div>
            ) : (
              filtered.map(v => (
                <VCard
                  key={v.id}
                  v={v}
                  fav={favs.has(v.id)}
                  onFav={onFav}
                  onCompare={onCompare}
                  comparing={compareIds.includes(v.id)}
                />
              ))
            )}
          </div>
        </section>

        <CompareBar
          ids={compareIds}
          onClear={() => setCompareIds([])}
          onRemove={(id) => setCompareIds(prev => prev.filter(x => x !== id))}
        />
      </main>
    );
  }

  // ---------- Mount ----------
  (function safeMount(fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); })(() => {
    document.body.setAttribute('data-cin', 'on');
    const mount = document.getElementById('catalog-root');
    if (mount) ReactDOM.createRoot(mount).render(<Catalog/>);
  });
})();