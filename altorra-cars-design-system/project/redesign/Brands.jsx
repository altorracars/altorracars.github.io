// ============================================================
// ALTORRA · Cinematic BRANDS · /brands.html  &  /brand.html?b=toyota
// Grid of 16 brands + per-brand landing with filtered vehicles
// ============================================================
(function () {
  const { useState, useEffect, useMemo } = React;
  const data = window.AltorraData;
  const fmtPrice = (n) => '$' + Number(n).toLocaleString('es-CO');

  function CinBrandsHero() {
    return (
      <section className="brn-hero">
        <div className="brn-hero-bg" aria-hidden="true"/>
        <div className="brn-hero-inner">
          <span className="cin-eyebrow">Marcas Altorra · {data.BRANDS.length}</span>
          <h1 className="brn-hero-h">
            Las marcas que <span className="brn-hero-h-accent">manejas mejor</span>.
          </h1>
          <p className="brn-hero-sub">
            Conectamos compradores con concesionarios aliados de las 16 marcas más
            buscadas en Colombia. Explora por marca o entra directo al catálogo.
          </p>
        </div>
      </section>
    );
  }

  function BrandsGrid() {
    const [q, setQ] = useState('');
    const list = useMemo(() => {
      const s = q.trim().toLowerCase();
      if (!s) return data.BRANDS;
      return data.BRANDS.filter(b => b.name.toLowerCase().includes(s));
    }, [q]);

    return (
      <section className="brn-grid-section">
        <div className="brn-grid-head">
          <h2 className="brn-grid-h">Catálogo de marcas</h2>
          <div className="brn-search">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
            <input type="text" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Buscar marca…"/>
          </div>
        </div>
        <div className="brn-grid">
          {list.map((b, i) => {
            const count = data.VEHICLES.filter(v => v.brand === b.slug).length;
            return (
              <a key={b.slug} href={`brand.html?b=${b.slug}`} className="brn-card" style={{ '--i': i }}>
                <span className="brn-card-mark">
                  <img src={b.logo} alt={b.name}/>
                </span>
                <span className="brn-card-name">{b.name}</span>
                <span className="brn-card-count">{count} vehículo{count !== 1 ? 's' : ''}</span>
                <span className="brn-card-arrow">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                </span>
              </a>
            );
          })}
          {list.length === 0 && (
            <div className="brn-empty">Sin resultados para «{q}»</div>
          )}
        </div>
      </section>
    );
  }

  function BrandsRoot() {
    return (
      <main className="brn-page" data-screen-label="Marcas">
        <CinBrandsHero/>
        <BrandsGrid/>
      </main>
    );
  }

  // -------- Single brand landing (brand.html?b=toyota) --------
  function getBrand() {
    const b = new URL(window.location.href).searchParams.get('b');
    return data.BRANDS.find(x => x.slug === b) || data.BRANDS[0];
  }

  function BrandRoot() {
    const [brand, setBrand] = useState(getBrand());
    const vehicles = useMemo(() => data.VEHICLES.filter(v => v.brand === brand.slug), [brand]);

    useEffect(() => {
      const onPop = () => setBrand(getBrand());
      window.addEventListener('popstate', onPop);
      return () => window.removeEventListener('popstate', onPop);
    }, []);

    return (
      <main className="brn-page brn-page-single" data-screen-label="Marca">
        <section className="brn-single-hero">
          <a href="brands.html" className="brn-back">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M15 18l-6-6 6-6"/></svg>
            Todas las marcas
          </a>
          <div className="brn-single-mark">
            <img src={brand.logo} alt={brand.name}/>
          </div>
          <h1 className="brn-single-h">{brand.name}</h1>
          <p className="brn-single-sub">
            {vehicles.length} vehículo{vehicles.length !== 1 ? 's' : ''} {brand.name} disponible{vehicles.length !== 1 ? 's' : ''} en Altorra. Catálogo verificado, listos para visitar o entregar.
          </p>
          <div className="brn-single-actions">
            <a href={`catalog.html?brand=${brand.slug}`} className="brn-single-cta">
              Ver en catálogo
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
            </a>
            <button type="button" className="brn-single-cta brn-single-cta--alt" data-altorra-open="sell">
              Vender mi {brand.name}
            </button>
          </div>
        </section>

        <section className="brn-single-list">
          {vehicles.length === 0 ? (
            <div className="brn-single-empty">
              <p>Por ahora no tenemos vehículos {brand.name} en vitrina.</p>
              <p>Suscríbete y te avisamos cuando llegue uno.</p>
              <a href="index.html#cierre" className="brn-single-cta">Avísame</a>
            </div>
          ) : (
            <div className="cat-results cat-results--grid">
              {vehicles.map(v => (
                <a key={v.id} href={`detail.html?id=${v.id}`} className="cat-card">
                  <div className="cat-card-media" style={{ background: v.images[0].bg }}>
                    <span className="cat-card-img-overlay"/>
                    <div className="cat-card-chips">
                      {v.condition === 'nuevo' && <span className="cat-chip cat-chip--new">0 KM</span>}
                      {v.badge && <span className="cat-chip cat-chip--badge">{v.badge}</span>}
                    </div>
                  </div>
                  <div className="cat-card-body">
                    <span className="cat-card-brand">{v.brandName}</span>
                    <h3 className="cat-card-model">{v.model}</h3>
                    <div className="cat-card-specs">
                      <span>{v.year}</span><i>·</i>
                      <span>{Number(v.km).toLocaleString('es-CO')} km</span><i>·</i>
                      <span>{v.fuel}</span>
                    </div>
                    <div className="cat-card-rule"/>
                    <div className="cat-card-price">{fmtPrice(v.price)}</div>
                  </div>
                </a>
              ))}
            </div>
          )}
        </section>
      </main>
    );
  }

  // mount
  (function safeMount(fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); })(() => {
    document.body.setAttribute('data-cin', 'on');
    const a = document.getElementById('brands-root');
    if (a) ReactDOM.createRoot(a).render(<BrandsRoot/>);
    const b = document.getElementById('brand-root');
    if (b) ReactDOM.createRoot(b).render(<BrandRoot/>);
  });
})();