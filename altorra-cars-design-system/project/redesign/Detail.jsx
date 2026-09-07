// ============================================================
// ALTORRA · Cinematic DETAIL · v2 (mirror del repo real)
// Galería + lightbox · sidebar con badges/precio-oferta/quick-specs
// 6 botones de acción · tabs (Ficha · Características · Descripción)
// ============================================================
(function () {
  const { useState, useEffect, useMemo, useRef, useCallback } = React;
  const data = window.AltorraData;
  const fmtP = (n) => '$' + Number(n).toLocaleString('es-CO');
  const fmtKm = (n) => Number(n).toLocaleString('es-CO') + ' km';

  function getId() {
    const id = new URL(window.location.href).searchParams.get('id');
    return id || data.VEHICLES[0].id;
  }

  // ---------- Lightbox ----------
  function Lightbox({ photos, idx, setIdx, onClose }) {
    const [zoomed, setZoomed] = useState(false);
    useEffect(() => {
      const onKey = (e) => {
        if (e.key === 'Escape') onClose();
        if (e.key === 'ArrowRight') setIdx(i => (i + 1) % photos.length);
        if (e.key === 'ArrowLeft')  setIdx(i => (i - 1 + photos.length) % photos.length);
      };
      window.addEventListener('keydown', onKey);
      return () => window.removeEventListener('keydown', onKey);
    }, [photos.length, onClose, setIdx]);

    const p = photos[idx];
    return (
      <div className="dt-lb" role="dialog" aria-label="Galería ampliada" onClick={onClose}>
        <button type="button" className="dt-lb-close" onClick={onClose} aria-label="Cerrar">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 6 18 18M6 18 18 6"/></svg>
        </button>
        <button type="button" className="dt-lb-arr dt-lb-arr--prev" onClick={(e) => { e.stopPropagation(); setIdx(i => (i - 1 + photos.length) % photos.length); }} aria-label="Anterior">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button type="button" className="dt-lb-arr dt-lb-arr--next" onClick={(e) => { e.stopPropagation(); setIdx(i => (i + 1) % photos.length); }} aria-label="Siguiente">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 6l6 6-6 6"/></svg>
        </button>
        <div className={`dt-lb-stage ${zoomed ? 'is-zoom' : ''}`} style={{ background: p.bg }} onClick={(e) => { e.stopPropagation(); setZoomed(z => !z); }}>
          <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
            <ellipse cx="200" cy="208" rx="170" ry="6" fill="rgba(0,0,0,0.5)"/>
            <path d="M55 178 Q70 110 130 100 L195 90 Q260 90 320 102 Q355 112 360 178 L355 188 Q200 200 55 188 Z" fill="rgba(244,238,222,0.12)" stroke="rgba(244,238,222,0.45)" strokeWidth="1.4"/>
            <circle cx="115" cy="180" r="22" fill="#08070A" stroke="rgba(244,238,222,0.5)" strokeWidth="1.5"/>
            <circle cx="290" cy="180" r="22" fill="#08070A" stroke="rgba(244,238,222,0.5)" strokeWidth="1.5"/>
          </svg>
        </div>
        <div className="dt-lb-dots">
          {photos.map((_, i) => (
            <button key={i} className={`dt-lb-dot ${i === idx ? 'is-on' : ''}`} onClick={(e) => { e.stopPropagation(); setIdx(i); }} aria-label={`Imagen ${i + 1}`}/>
          ))}
        </div>
        <span className="dt-lb-counter">{idx + 1} / {photos.length}</span>
      </div>
    );
  }

  // ---------- Detail root ----------
  function Detail() {
    const [id, setId] = useState(getId());
    const v = useMemo(() => data.VEHICLES.find(x => x.id === id) || data.VEHICLES[0], [id]);
    const [activeImg, setActiveImg] = useState(0);
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('ficha');
    const [fav, setFav] = useState(false);
    const [comparing, setComparing] = useState(false);

    useEffect(() => {
      const onPop = () => setId(getId());
      window.addEventListener('popstate', onPop);
      return () => window.removeEventListener('popstate', onPop);
    }, []);

    useEffect(() => {
      try { setFav(new Set(JSON.parse(localStorage.getItem('alt-fav') || '[]')).has(v.id)); } catch {}
      try { setComparing(JSON.parse(localStorage.getItem('alt-cmp') || '[]').includes(v.id)); } catch {}
      try {
        const seen = JSON.parse(localStorage.getItem('alt-seen') || '[]').filter(x => x !== v.id);
        seen.unshift(v.id);
        localStorage.setItem('alt-seen', JSON.stringify(seen.slice(0, 8)));
      } catch {}
      setActiveImg(0);
    }, [v.id]);

    const toggleFav = () => {
      try {
        const favs = new Set(JSON.parse(localStorage.getItem('alt-fav') || '[]'));
        favs.has(v.id) ? favs.delete(v.id) : favs.add(v.id);
        localStorage.setItem('alt-fav', JSON.stringify([...favs]));
        setFav(favs.has(v.id));
      } catch {}
    };
    const toggleCmp = () => {
      try {
        let cmp = JSON.parse(localStorage.getItem('alt-cmp') || '[]');
        if (cmp.includes(v.id)) cmp = cmp.filter(x => x !== v.id);
        else { cmp.push(v.id); cmp = cmp.slice(-2); }
        localStorage.setItem('alt-cmp', JSON.stringify(cmp));
        setComparing(cmp.includes(v.id));
      } catch {}
    };

    const share = () => {
      const url = window.location.href;
      const title = `${v.brandName} ${v.model} ${v.year} · ${fmtP(v.price)}`;
      if (navigator.share) navigator.share({ title, url }).catch(() => {});
      else { navigator.clipboard?.writeText(url); alert('Enlace copiado'); }
    };

    const cat = data.CATEGORIES.find(c => c.slug === v.cat);
    const brand = data.BRANDS.find(b => b.slug === v.brand);
    const vehName = `${v.brandName} ${v.model} ${v.year}`;
    const waText = encodeURIComponent(`Hola, me interesa el ${vehName} (${fmtP(v.price)}).`);

    const SPECS = [
      { group: 'Identificación', rows: [
        ['Marca', v.brandName], ['Modelo', v.model], ['Año modelo', v.year],
        ['Carrocería', cat?.name || v.cat], ['Color', v.color], ['Placa', '***-' + String(v.id).slice(-3).padStart(3, '0')],
      ]},
      { group: 'Motor y mecánica', rows: [
        ['Cilindrada', v.cc], ['Potencia', v.power], ['Combustible', v.fuel],
        ['Transmisión', v.trans], ['Tracción', v.cat === 'pickup' ? '4x4' : (v.cat === 'suv' ? '4x2 / 4x4' : 'Delantera')],
      ]},
      { group: 'Estado y uso', rows: [
        ['Kilometraje', fmtKm(v.km)], ['Condición', v.condition === 'nuevo' ? '0 KM · Estreno' : 'Usado verificado'],
        ['Único dueño', v.km < 30000 ? 'Sí' : 'A confirmar'], ['Tecnomecánica', 'Vigente'],
      ]},
      { group: 'Ubicación', rows: [
        ['Ciudad', v.city], ['Origen', 'Concesionario aliado'], ['Disponibilidad', 'Inmediata'],
      ]},
    ];

    const FEATURES = data.FEATURES_TEMPLATE(v);
    const DESCRIPTION = data.DESCRIPTION_TEMPLATE(v);
    const similares = useMemo(() =>
      data.VEHICLES.filter(x => x.id !== v.id && (x.brand === v.brand || x.cat === v.cat)).slice(0, 8),
      [v.id, v.brand, v.cat]
    );

    return (
      <main className="dt-page" data-screen-label="Detalle">
        {/* HERO + GALLERY + SIDEBAR */}
        <section className="dt-hero">
          <a href="catalog.html" className="dt-back">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M15 18l-6-6 6-6"/></svg>
            Volver al catálogo
          </a>

          <div className="dt-grid">
            {/* GALLERY */}
            <div className="dt-gal">
              <button type="button" className="dt-gal-main" style={{ background: v.images[activeImg].bg }} onClick={() => setLightboxOpen(true)} aria-label="Ampliar imagen">
                <svg className="dt-gal-svg" viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet">
                  <ellipse cx="200" cy="208" rx="170" ry="6" fill="rgba(0,0,0,0.5)"/>
                  <path d="M55 178 Q70 110 130 100 L195 90 Q260 90 320 102 Q355 112 360 178 L355 188 Q200 200 55 188 Z" fill="rgba(244,238,222,0.12)" stroke="rgba(244,238,222,0.45)" strokeWidth="1.4"/>
                  <path d="M120 100 Q140 70 200 68 Q260 70 290 100 L260 110 Q200 102 140 110 Z" fill="rgba(180,220,255,0.18)" stroke="rgba(244,238,222,0.32)" strokeWidth="0.8"/>
                  <circle cx="115" cy="180" r="22" fill="#08070A" stroke="rgba(244,238,222,0.5)" strokeWidth="1.5"/>
                  <circle cx="115" cy="180" r="9" fill="rgba(212,168,90,0.85)"/>
                  <circle cx="290" cy="180" r="22" fill="#08070A" stroke="rgba(244,238,222,0.5)" strokeWidth="1.5"/>
                  <circle cx="290" cy="180" r="9" fill="rgba(212,168,90,0.85)"/>
                </svg>
                <span className="dt-gal-count">{activeImg + 1} / {v.images.length}</span>
                <span className="dt-gal-zoom">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7"/></svg>
                </span>
              </button>
              <div className="dt-gal-thumbs">
                {v.images.map((p, i) => (
                  <button key={i} className={`dt-gal-thumb ${i === activeImg ? 'is-on' : ''}`} style={{ background: p.bg }} onClick={() => setActiveImg(i)} aria-label={p.label}>
                    <span>{p.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* SIDEBAR */}
            <aside className="dt-side">
              <div className="dt-badges">
                {v.condition === 'nuevo' && <span className="dt-badge dt-badge--new">0 KM</span>}
                {v.featured && <span className="dt-badge dt-badge--featured">Destacado</span>}
                {v.hasOffer && <span className="dt-badge dt-badge--offer">Oferta</span>}
              </div>

              <div className="dt-brand-row">
                <span className="dt-brand-mark"><img src={brand?.logo} alt={brand?.name}/></span>
                <span className="dt-brand-name">{v.brandName}</span>
              </div>

              <h1 className="dt-title">{v.model}</h1>
              <p className="dt-subtitle">{v.year} · {cat?.name || v.cat} · {v.color}</p>

              <div className="dt-price-card">
                <span className="dt-price-label">Precio</span>
                {v.hasOffer ? (
                  <>
                    <span className="dt-price-orig">{v.priceOriginalFmt}</span>
                    <span className="dt-price-now dt-price-offer">{v.priceFmt}</span>
                  </>
                ) : (
                  <span className="dt-price-now">{v.priceFmt}</span>
                )}
                <span className="dt-price-aux">Cuota desde <strong>{v.cuotaDesdeFmt}/mes</strong></span>
              </div>

              <div className="dt-quick-specs">
                <div className="dt-qs"><span>Km</span><strong>{fmtKm(v.km)}</strong></div>
                <div className="dt-qs"><span>Año</span><strong>{v.year}</strong></div>
                <div className="dt-qs"><span>Transmisión</span><strong>{v.transType}</strong></div>
                <div className="dt-qs"><span>Combustible</span><strong>{v.fuel}</strong></div>
              </div>

              {/* 6 ACTION BUTTONS (mirror del repo) */}
              <div className="dt-actions">
                <a href={`https://wa.me/573235016747?text=${waText}`} target="_blank" rel="noopener" className="dt-btn dt-btn--wa">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 .9-1 2.3 0 1.3 1 2.6 1.1 2.8.1.2 2 3 4.8 4.2 2 .9 2.4 1 3.2.9.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.4z M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.4 5.1L2 22l5.1-1.4c1.5.8 3.2 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
                  <span>Contactar por WhatsApp</span>
                </a>
                <button type="button" className="dt-btn dt-btn--sim" data-altorra-open="finance" data-vehiculo={vehName}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="4" y="2" width="16" height="20" rx="2"/><line x1="8" y1="6" x2="16" y2="6"/><line x1="8" y1="10" x2="10" y2="10"/><line x1="14" y1="10" x2="16" y2="10"/><line x1="8" y1="14" x2="10" y2="14"/><line x1="14" y1="14" x2="16" y2="14"/><line x1="8" y1="18" x2="10" y2="18"/><line x1="14" y1="18" x2="16" y2="18"/></svg>
                  <span>Simular Crédito</span>
                </button>
                <div className="dt-btn-row">
                  <button type="button" className={`dt-btn dt-btn--cmp ${comparing ? 'is-on' : ''}`} onClick={toggleCmp}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="2" y="3" width="5" height="9" rx="1"/><rect x="9.5" y="3" width="5" height="9" rx="1"/><rect x="17" y="3" width="5" height="9" rx="1"/><path d="M4 15v6M12 15v6M20 15v6"/></svg>
                    <span>{comparing ? 'Comparando' : 'Comparar'}</span>
                  </button>
                  <button type="button" className="dt-btn dt-btn--share" onClick={share}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
                    <span>Compartir</span>
                  </button>
                  <button type="button" className="dt-btn dt-btn--agenda" data-altorra-open="appointment" data-vehiculo={vehName}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                    <span>Agendar</span>
                  </button>
                  <button type="button" className="dt-btn dt-btn--ask" data-altorra-open="ask" data-vehiculo={vehName}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>
                    <span>Preguntar</span>
                  </button>
                </div>
                <div className="dt-actions-foot">
                  <button type="button" className={`dt-mini ${fav ? 'is-on' : ''}`} onClick={toggleFav}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill={fav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>
                    {fav ? 'Guardado' : 'Guardar'}
                  </button>
                  <span className="dt-mini-trust">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
                    Vehículo verificado
                  </span>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* TABS */}
        <section className="dt-tabs-section">
          <div className="dt-tabs-nav">
            <button className={`dt-tab ${activeTab === 'ficha' ? 'is-on' : ''}`} onClick={() => setActiveTab('ficha')}>Ficha Técnica</button>
            <button className={`dt-tab ${activeTab === 'feats' ? 'is-on' : ''}`} onClick={() => setActiveTab('feats')}>Características</button>
            <button className={`dt-tab ${activeTab === 'desc' ? 'is-on' : ''}`} onClick={() => setActiveTab('desc')}>Descripción</button>
          </div>

          {activeTab === 'ficha' && (
            <div className="dt-tab-content">
              <h2 className="dt-section-h">Ficha técnica completa</h2>
              <div className="dt-specs-grid">
                {SPECS.map(g => (
                  <div key={g.group} className="dt-specs-group">
                    <h3 className="dt-specs-group-h">{g.group}</h3>
                    <dl className="dt-specs-list">
                      {g.rows.map(([k, val]) => (
                        <div key={k} className="dt-specs-row"><dt>{k}</dt><dd>{val}</dd></div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'feats' && (
            <div className="dt-tab-content">
              <h2 className="dt-section-h">Características y equipamiento</h2>
              <div className="dt-feats-grid">
                {FEATURES.map(cat => (
                  <div key={cat.title} className="dt-feats-card">
                    <h3 className="dt-feats-title">{cat.title}</h3>
                    <ul className="dt-feats-list">
                      {cat.items.map((it, i) => (
                        <li key={i}><span className="dt-feats-dot"/>{it}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'desc' && (
            <div className="dt-tab-content">
              <h2 className="dt-section-h">Descripción del vehículo</h2>
              <div className="dt-desc">
                {DESCRIPTION.split('\n\n').map((p, i) => <p key={i}>{p}</p>)}
              </div>
            </div>
          )}
        </section>

        {/* SIMILAR */}
        {similares.length > 0 && (
          <section className="dt-similar">
            <h2 className="dt-similar-h">Te puede interesar</h2>
            <div className="dt-similar-track">
              {similares.map(s => (
                <a key={s.id} href={`detail.html?id=${s.id}`} className="dt-similar-card">
                  <span className="dt-similar-img" style={{ background: s.images[0].bg }}/>
                  <span className="dt-similar-meta">
                    <span className="dt-similar-brand">{s.brandName}</span>
                    <span className="dt-similar-model">{s.model}</span>
                    <span className="dt-similar-foot">
                      <span>{s.year} · {fmtKm(s.km)}</span>
                      <strong>{fmtP(s.price)}</strong>
                    </span>
                  </span>
                </a>
              ))}
            </div>
          </section>
        )}

        {/* Sticky mobile CTA */}
        <div className="dt-sticky">
          <div className="dt-sticky-info">
            <span className="dt-sticky-model">{v.brandName} {v.model}</span>
            <span className="dt-sticky-price">{fmtP(v.price)}</span>
          </div>
          <a href={`https://wa.me/573235016747?text=${waText}`} target="_blank" rel="noopener" className="dt-sticky-cta">WhatsApp</a>
        </div>

        {lightboxOpen && <Lightbox photos={v.images} idx={activeImg} setIdx={setActiveImg} onClose={() => setLightboxOpen(false)}/>}
      </main>
    );
  }

  (function safeMount(fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); })(() => {
    document.body.setAttribute('data-cin', 'on');
    const mount = document.getElementById('detail-root');
    if (mount) ReactDOM.createRoot(mount).render(<Detail/>);
  });
})();