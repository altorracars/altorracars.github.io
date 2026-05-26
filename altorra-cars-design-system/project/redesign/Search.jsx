// ============================================================
// ALTORRA CARS · SEARCH / LISTINGS PAGE
// ============================================================
function Search({ navigate, favorites, onFav, onCompare, initialFilter, toast }) {
  const [filters, setFilters] = useState({
    q: '', brand: initialFilter?.brand || '', cat: initialFilter?.cat || '',
    condition: initialFilter?.condition || '', fuel: '', trans: '',
    minPrice: 0, maxPrice: 600000000,
    minYear: 2018, sort: 'recent'
  });
  const [view, setView] = useState('grid');
  const [page, setPage] = useState(1);
  const perPage = 12;

  const filtered = useMemo(() => {
    let arr = AltorraData.VEHICLES.filter(v => {
      if (filters.q && !v.title.toLowerCase().includes(filters.q.toLowerCase())) return false;
      if (filters.brand && v.brand !== filters.brand) return false;
      if (filters.cat && v.cat !== filters.cat) return false;
      if (filters.condition && v.condition !== filters.condition) return false;
      if (filters.fuel && v.fuel !== filters.fuel) return false;
      if (filters.trans && v.trans !== filters.trans) return false;
      if (v.price < filters.minPrice || v.price > filters.maxPrice) return false;
      if (v.year < filters.minYear) return false;
      return true;
    });
    if (filters.sort === 'priceAsc') arr.sort((a, b) => a.price - b.price);
    else if (filters.sort === 'priceDesc') arr.sort((a, b) => b.price - a.price);
    else if (filters.sort === 'kmAsc') arr.sort((a, b) => a.km - b.km);
    else if (filters.sort === 'yearDesc') arr.sort((a, b) => b.year - a.year);
    return arr;
  }, [filters]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / perPage));
  const pageItems = filtered.slice((page - 1) * perPage, page * perPage);

  return (
    <main className="container" style={{ paddingTop: 32, paddingBottom: 64 }}>
      <div className="crumb">
        <a onClick={() => navigate('home')}>Inicio</a>
        <span className="crumb-sep">/</span>
        <span>Catálogo</span>
        {filters.brand && <><span className="crumb-sep">/</span><span>{AltorraData.BRANDS.find(b => b.slug === filters.brand)?.name}</span></>}
      </div>

      <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 24 }}>
        <div>
          <h1 className="t-title-lg">Catálogo de vehículos</h1>
          <p className="t-muted">{filtered.length} resultados encontrados</p>
        </div>
        <div className="row">
          <select className="input" style={{ width: 200 }} value={filters.sort} onChange={e => setFilters(f => ({ ...f, sort: e.target.value }))}>
            <option value="recent">Más recientes</option>
            <option value="priceAsc">Precio: menor a mayor</option>
            <option value="priceDesc">Precio: mayor a menor</option>
            <option value="kmAsc">Menos kilómetros</option>
            <option value="yearDesc">Año: más nuevo</option>
          </select>
          <div className="segmented">
            <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}>{I.grid}</button>
            <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}>{I.list}</button>
          </div>
        </div>
      </div>

      <div className="search-grid">
        <aside className="filter-rail">
          <div className="row" style={{ justifyContent: 'space-between', marginBottom: 12 }}>
            <strong>{I.filter} Filtros</strong>
            <button className="btn btn-sm btn-ghost" onClick={() => setFilters({ q: '', brand: '', cat: '', condition: '', fuel: '', trans: '', minPrice: 0, maxPrice: 600000000, minYear: 2018, sort: 'recent' })}>Limpiar</button>
          </div>
          <div className="filter-block">
            <input className="input" placeholder="Buscar modelo..." value={filters.q} onChange={e => setFilters(f => ({ ...f, q: e.target.value }))} />
          </div>
          <div className="filter-block">
            <div className="filter-h">Marca</div>
            <div className="row" style={{ gap: 6 }}>
              {AltorraData.BRANDS.slice(0, 8).map(b => (
                <button key={b.slug} className={`chip ${filters.brand === b.slug ? 'chip-active' : ''}`} onClick={() => setFilters(f => ({ ...f, brand: f.brand === b.slug ? '' : b.slug }))}>{b.name}</button>
              ))}
            </div>
          </div>
          <div className="filter-block">
            <div className="filter-h">Categoría</div>
            <div className="row" style={{ gap: 6 }}>
              {AltorraData.CATEGORIES.slice(0, 5).map(c => (
                <button key={c.slug} className={`chip ${filters.cat === c.slug ? 'chip-active' : ''}`} onClick={() => setFilters(f => ({ ...f, cat: f.cat === c.slug ? '' : c.slug }))}>{c.name}</button>
              ))}
            </div>
          </div>
          <div className="filter-block">
            <div className="filter-h">Condición</div>
            <div className="segmented">
              <button className={filters.condition === '' ? 'active' : ''} onClick={() => setFilters(f => ({ ...f, condition: '' }))}>Todos</button>
              <button className={filters.condition === 'nuevo' ? 'active' : ''} onClick={() => setFilters(f => ({ ...f, condition: 'nuevo' }))}>0 KM</button>
              <button className={filters.condition === 'usado' ? 'active' : ''} onClick={() => setFilters(f => ({ ...f, condition: 'usado' }))}>Usado</button>
            </div>
          </div>
          <div className="filter-block">
            <div className="filter-h">Combustible</div>
            <div className="row" style={{ gap: 6 }}>
              {['Gasolina', 'Diésel', 'Híbrido', 'Eléctrico'].map(f => (
                <button key={f} className={`chip ${filters.fuel === f ? 'chip-active' : ''}`} onClick={() => setFilters(s => ({ ...s, fuel: s.fuel === f ? '' : f }))}>{f}</button>
              ))}
            </div>
          </div>
          <div className="filter-block">
            <div className="filter-h">Precio máx · ${(filters.maxPrice / 1000000).toFixed(0)}M</div>
            <input type="range" className="range" min="40000000" max="600000000" step="10000000" value={filters.maxPrice} onChange={e => setFilters(f => ({ ...f, maxPrice: +e.target.value }))} />
          </div>
          <div className="filter-block">
            <div className="filter-h">Año mín · {filters.minYear}</div>
            <input type="range" className="range" min="2015" max="2025" step="1" value={filters.minYear} onChange={e => setFilters(f => ({ ...f, minYear: +e.target.value }))} />
          </div>
        </aside>

        <div>
          {pageItems.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">🔍</div>
              <h3 className="t-subtitle">Sin resultados</h3>
              <p className="t-muted">Intenta ajustar los filtros o ampliar el rango de precio.</p>
            </div>
          ) : (
            <div className={view === 'grid' ? 'v-grid' : 'stack'} style={view === 'list' ? { '--stack': '12px' } : {}}>
              {pageItems.map(v => <VehicleCard key={v.id} v={v} favorites={favorites} onFav={onFav} onCompare={onCompare} navigate={navigate} />)}
            </div>
          )}
          {totalPages > 1 && (
            <div className="row" style={{ justifyContent: 'center', marginTop: 32, gap: 4 }}>
              <button className="btn btn-subtle btn-icon" disabled={page === 1} onClick={() => setPage(p => Math.max(1, p - 1))}>{I.chev('left')}</button>
              {Array.from({ length: totalPages }).map((_, i) => (
                <button key={i} className={`btn btn-icon ${page === i + 1 ? 'btn-primary' : 'btn-ghost'}`} onClick={() => setPage(i + 1)}>{i + 1}</button>
              ))}
              <button className="btn btn-subtle btn-icon" disabled={page === totalPages} onClick={() => setPage(p => Math.min(totalPages, p + 1))}>{I.chev('right')}</button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

window.Search = Search;
