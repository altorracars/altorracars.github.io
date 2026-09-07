// ============================================================
// ALTORRA CARS · HOME PAGE
// ============================================================
function Home({ navigate, favorites, onFav, onCompare, toast }) {
  const featured = AltorraData.VEHICLES.filter((v) => v.featured).slice(0, 8);
  const newest = AltorraData.VEHICLES.filter((v) => v.condition === 'nuevo').slice(0, 4);

  const [searchVals, setSearchVals] = useState({ brand: '', cat: '', maxPrice: 500000000 });

  return (
    <main>
      {/* HERO */}
      <section className="hero" style={{ color: "rgb(255, 255, 255)" }}>
        <div className="blob blob-gold" style={{ top: '-100px', left: '-100px', width: 400, height: 400, opacity: 0.25 }}></div>
        <div className="blob blob-blue" style={{ bottom: '-100px', right: '-50px', width: 360, height: 360, opacity: 0.18 }}></div>

        <div className="container">
          <div className="cols-2">
            <div className="fade-up">
              <div className="hero-eyebrow"><span className="dot"></span>Cartagena · Concesionario líder 2026</div>
              <h1 className="hero-title" style={{ marginTop: 16 }}>
                El auto que <span className="t-gold-grad">mereces</span>,<br />
                a un click.
              </h1>
              <p className="hero-sub">
                Más de 200 vehículos seleccionados, financiación aprobada en horas y entrega en toda Colombia. Premium, transparente, rápido.
              </p>
              <div className="hero-stats">
                <div className="hero-stat"><div className="hero-stat-num">2.4k+</div><div className="hero-stat-lbl">Clientes felices</div></div>
                <div className="hero-stat"><div className="hero-stat-num">200+</div><div className="hero-stat-lbl">Vehículos en stock</div></div>
                <div className="hero-stat"><div className="hero-stat-num">18</div><div className="hero-stat-lbl">Marcas premium</div></div>
                <div className="hero-stat"><div className="hero-stat-num">4h</div><div className="hero-stat-lbl">Aprob. crédito</div></div>
              </div>
            </div>

            <div className="hero-visual scale-in">
              <img src="heroes/heroindex.webp" alt="" onError={(e) => e.target.style.display = 'none'} />
            </div>
          </div>

          {/* SEARCH BAR */}
          <div className="hero-search fade-up" style={{ marginTop: 40, animationDelay: '120ms' }}>
            <div className="hero-search-cell">
              <label>Marca</label>
              <select value={searchVals.brand} onChange={(e) => setSearchVals((s) => ({ ...s, brand: e.target.value }))}>
                <option value="">Todas las marcas</option>
                {AltorraData.BRANDS.map((b) => <option key={b.slug} value={b.slug}>{b.name}</option>)}
              </select>
            </div>
            <div className="hero-search-cell">
              <label>Categoría</label>
              <select value={searchVals.cat} onChange={(e) => setSearchVals((s) => ({ ...s, cat: e.target.value }))}>
                <option value="">Cualquiera</option>
                {AltorraData.CATEGORIES.map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
              </select>
            </div>
            <div className="hero-search-cell">
              <label>Precio máx.</label>
              <select value={searchVals.maxPrice} onChange={(e) => setSearchVals((s) => ({ ...s, maxPrice: +e.target.value }))}>
                <option value="80000000">$80M</option>
                <option value="150000000">$150M</option>
                <option value="250000000">$250M</option>
                <option value="500000000">$500M+</option>
              </select>
            </div>
            <button className="btn btn-primary btn-lg" onClick={() => {toast('Buscando vehículos...', 'success');navigate('busqueda');}} style={{ borderRadius: 999, padding: '0 24px', minWidth: 140 }}>
              {I.search}<span>Buscar</span>
            </button>
          </div>
        </div>
      </section>

      {/* BRAND MARQUEE */}
      <section style={{ paddingBlock: 32, background: 'transparent' }}>
        <div className="container marquee" style={{ background: 'transparent' }}>
          <div className="marquee-track">
            {[...AltorraData.BRANDS, ...AltorraData.BRANDS].map((b, i) =>
            <div key={i} className="marquee-brand">
                <img src={b.logo} alt={b.name} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', filter: 'grayscale(1) brightness(1.4)', opacity: 0.55, transition: 'all .3s' }} onError={(e) => e.target.style.display = 'none'} />
                <img src={b.logo} alt={b.name} style={{ maxWidth: '70%', maxHeight: '60%', filter: 'grayscale(0.6)' }} />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FEATURED */}
      <section className="section">
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">★ Selección de la semana</div>
              <h2 className="section-h1">Vehículos <span className="t-gold-grad">destacados</span></h2>
              <p className="section-sub">Los modelos premium con mejor valoración y oferta de la semana.</p>
            </div>
            <button className="btn btn-subtle btn-lg" onClick={() => navigate('busqueda')}>Ver todos {I.arrowR}</button>
          </div>
          <div className="v-grid">
            {featured.map((v) => <VehicleCard key={v.id} v={v} favorites={favorites} onFav={onFav} onCompare={onCompare} navigate={navigate} />)}
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">Explora</div>
              <h2 className="section-h1">Por <span className="t-gold-grad">categoría</span></h2>
            </div>
          </div>
          <div className="cat-grid">
            {AltorraData.CATEGORIES.slice(0, 6).map((c) =>
            <div key={c.slug} className="cat-card" onClick={() => navigate('cat:' + c.slug)}>
                <img src={c.img} alt={c.name} />
                <div className="cat-card-overlay">
                  <div className="cat-card-name">{c.name}</div>
                  <div className="cat-card-count">{c.count} disponibles</div>
                </div>
                <div className="cat-card-arr">{I.arrowR}</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">Por qué Altorra</div>
              <h2 className="section-h1">Una experiencia <span className="t-gold-grad">premium</span></h2>
              <p className="section-sub">Todo el respaldo del concesionario líder de Cartagena, en cada paso.</p>
            </div>
          </div>
          <div className="svc-grid">
            {AltorraData.SERVICES.map((s, i) =>
            <div key={i} className="svc-card mica fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="svc-card-icon">{I[s.icon]}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* NUEVOS 0KM banner — HarmonyOS hero tile */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="zero-km-band">
            <div className="zero-km-glow"></div>
            <div className="zero-km-glow zero-km-glow-2"></div>

            {/* Hero tile (grande) */}
            <div className="zero-km-hero">
              <div className="zero-km-eyebrow"><span className="dot"></span>Plan 0 KM · Solo enero</div>
              <h2 className="zero-km-title">
                Estrenar <span className="t-gold-grad">es ahora.</span>
              </h2>
              <p className="zero-km-sub">
                Tasa preferencial, matrícula incluida y entrega inmediata desde nuestro showroom de Bocagrande.
              </p>

              <div className="zero-km-stats">
                <div className="zero-km-stat">
                  <div className="zero-km-stat-n t-gold-grad">0.85<span className="zero-km-stat-u">% MV</span></div>
                  <div className="zero-km-stat-l">Tasa preferencial</div>
                </div>
                <div className="zero-km-stat">
                  <div className="zero-km-stat-n t-gold-grad">$0</div>
                  <div className="zero-km-stat-l">Matrícula incluida</div>
                </div>
                <div className="zero-km-stat">
                  <div className="zero-km-stat-n t-gold-grad">48h</div>
                  <div className="zero-km-stat-l">Entrega máxima</div>
                </div>
              </div>

              <div className="row" style={{ gap: 12, marginTop: 28, flexWrap: 'wrap' }}>
                <button className="btn btn-primary btn-xl" onClick={() => navigate('cat:nuevos')}>{I.car}Ver 0 KM disponibles{I.arrowR}</button>
                <button className="btn btn-subtle btn-xl" onClick={() => navigate('simulador')}>{I.wallet}Simular crédito</button>
              </div>

              <div className="zero-km-perks">
                <span>{I.check}Garantía de fábrica</span>
                <span>{I.check}SOAT y RTM</span>
                <span>{I.check}Crédito hasta 84 meses</span>
              </div>
            </div>

            {/* Showcase premium — un tile hero + carrusel */}
            <div className="zero-km-showcase">
              {newest.slice(0, 1).map((v) =>
              <div key={v.id} className="zero-km-feature" onClick={() => navigate('detail:' + v.id)}>
                  <div className="zero-km-feature-media" style={{ background: v.images[0].bg }}>
                    <div className="zero-km-feature-shine"></div>
                    <span className="zero-km-feature-badge"><span className="zero-km-feature-badge-dot"></span>0 KM · Recién llegado</span>
                    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" className="zero-km-car-svg">
                      <defs>
                        <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(255,255,255,0.22)" />
                          <stop offset="100%" stopColor="rgba(255,255,255,0.06)" />
                        </linearGradient>
                        <linearGradient id="glassG" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(160,200,255,0.5)" />
                          <stop offset="100%" stopColor="rgba(80,120,180,0.3)" />
                        </linearGradient>
                      </defs>
                      <ellipse cx="200" cy="200" rx="160" ry="8" fill="rgba(0,0,0,0.4)" />
                      <path d="M50 170 Q70 110 130 100 L180 86 Q240 80 290 92 Q340 102 360 170 L350 180 Q330 174 300 174 Q200 174 100 174 Q70 174 50 180 Z" fill="url(#carBody)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
                      <path d="M120 100 Q135 78 175 76 L230 78 Q270 82 285 100 L255 110 Q225 104 195 104 Q165 104 130 110 Z" fill="url(#glassG)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                      <line x1="195" y1="76" x2="200" y2="108" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
                      <circle cx="120" cy="178" r="22" fill="#08080c" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" />
                      <circle cx="120" cy="178" r="11" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                      <circle cx="280" cy="178" r="22" fill="#08080c" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5" />
                      <circle cx="280" cy="178" r="11" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.35)" strokeWidth="1" />
                      <ellipse cx="62" cy="148" rx="6" ry="3" fill="rgba(255,220,140,0.85)" />
                      <ellipse cx="345" cy="148" rx="5" ry="3" fill="rgba(255,80,60,0.7)" />
                    </svg>
                  </div>
                  <div className="zero-km-feature-body">
                    <div className="row" style={{ justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                      <div>
                        <div className="zero-km-feature-brand">{v.brandName}</div>
                        <div className="zero-km-feature-model">{v.model}</div>
                      </div>
                      <div className="zero-km-feature-cta">{I.arrowR}</div>
                    </div>
                    <div className="zero-km-feature-foot">
                      <div className="zero-km-feature-price t-gold-grad">{v.priceFmt}</div>
                      <div className="zero-km-feature-cuota">desde <strong>$1.2M</strong>/mes</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Strip de modelos disponibles */}
              <div className="zero-km-strip">
                <div className="row" style={{ justifyContent: 'space-between', marginBottom: 10 }}>
                  <strong style={{ fontSize: 13, letterSpacing: '0.04em' }}>MÁS LLEGADAS</strong>
                  <span className="t-caption" style={{ color: 'var(--gold-400)', fontWeight: 600, cursor: 'pointer' }} onClick={() => navigate('cat:nuevos')}>Ver todos →</span>
                </div>
                <div className="zero-km-strip-list">
                  {newest.slice(1, 4).map((v) =>
                  <div key={v.id} className="zero-km-strip-item" onClick={() => navigate('detail:' + v.id)}>
                      <div className="zero-km-strip-thumb" style={{ background: v.images[0].bg }}>
                        <svg viewBox="0 0 60 36" className="zero-km-strip-svg">
                          <ellipse cx="30" cy="32" rx="22" ry="1.5" fill="rgba(0,0,0,0.4)" />
                          <path d="M8 26 Q12 14 20 12 L28 10 Q40 10 48 14 Q54 18 54 26 Z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5" />
                          <circle cx="18" cy="27" r="3.5" fill="#08080c" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
                          <circle cx="44" cy="27" r="3.5" fill="#08080c" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5" />
                        </svg>
                      </div>
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div className="zero-km-strip-brand">{v.brandName}</div>
                        <div className="zero-km-strip-model">{v.model}</div>
                      </div>
                      <div className="zero-km-strip-price t-gold-grad">{v.priceFmt}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS — premium HarmonyOS */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">Testimonios</div>
              <h2 className="section-h1">Confían en <span className="t-gold-grad">nosotros</span></h2>
              <p className="section-sub" style={{ marginTop: 8, maxWidth: 520 }}>Más de 2.400 familias han encontrado su carro ideal con Altorra. Estas son sus historias.</p>
            </div>
            <div className="testi-rating-pill">
              <span className="review-stars" style={{ fontSize: 16 }}>{Array.from({ length: 5 }).map((_, i) => I.star(true))}</span>
              <div><strong style={{ fontSize: 18, fontFamily: 'var(--font-display)' }}>4.9</strong><span className="t-caption t-muted" style={{ marginLeft: 6 }}>· 247 reseñas</span></div>
              <button className="btn btn-subtle btn-sm" onClick={() => navigate('resenas')}>Ver todas{I.arrowR}</button>
            </div>
          </div>
          <div className="testi-grid">
            {AltorraData.TESTIMONIALS.slice(0, 3).map((t, i) =>
            <article key={i} className="testi-card fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="testi-quote">"</div>
                <div className="review-stars">{Array.from({ length: 5 }).map((_, k) => I.star(k < t.stars))}</div>
                <p className="testi-text">{t.text}</p>
                <div className="testi-foot">
                  <div className="review-avatar">{t.name[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 700, fontSize: 14 }}>{t.name}</div>
                    <div className="t-caption t-faint">{t.city} · Cliente verificado</div>
                  </div>
                  <span className="testi-verified">{I.check}</span>
                </div>
              </article>
            )}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="acrylic-hi" style={{ padding: 'clamp(32px, 6vw, 64px)', borderRadius: 'var(--r-2xl)', textAlign: 'center', position: 'relative', overflow: 'hidden' }}>
            <div className="blob blob-gold" style={{ top: '-50%', left: '50%', width: 400, height: 400, opacity: 0.18, transform: 'translateX(-50%)' }}></div>
            <h2 className="section-h1" style={{ position: 'relative' }}>¿Listo para <span className="t-gold-grad">manejar</span> tu próximo auto?</h2>
            <p className="section-sub" style={{ margin: '12px auto 0', position: 'relative' }}>Agenda una prueba de manejo o habla con un asesor experto. Sin compromiso.</p>
            <div className="row" style={{ justifyContent: 'center', marginTop: 24, position: 'relative' }}>
              <button className="btn btn-primary btn-xl" onClick={() => navigate('contacto')}>{I.calendar}Agendar prueba</button>
              <button className="btn btn-subtle btn-xl" onClick={() => navigate('contacto')}>{I.whatsapp}Hablar por WhatsApp</button>
            </div>
          </div>
        </div>
      </section>
    </main>);

}

window.Home = Home;