// ============================================================
// ALTORRA CARS · HOME PAGE
// ============================================================
function Home({ navigate, favorites, onFav, onCompare, toast }) {
  const featured = AltorraData.VEHICLES.filter(v => v.featured).slice(0, 6);
  const newest = AltorraData.VEHICLES.filter(v => v.condition === 'nuevo').slice(0, 4);

  const [searchVals, setSearchVals] = useState({ brand: '', cat: '', maxPrice: 500000000 });

  return (
    <main>
      {/* HERO — mirror oficial altorracars.github.io */}
      <section className="hero hero-mirror hero-img-loaded">
        <div className="hero-overlay"></div>
        <div className="hero-ambient"></div>
        <div className="hero-particles">
          {Array.from({length: 8}).map((_, i) => <span key={i} className="hero-particle"></span>)}
        </div>

        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot"></span>
            <span>CARTAGENA · CONCESIONARIO LÍDER 2026</span>
          </div>

          <h1 className="hero-title">
            El auto que mereces,
            <span className="hero-title-accent">a un click.</span>
          </h1>

          <div className="hero-cta">
            <button className="hero-btn-main" onClick={() => navigate('busqueda')}>
              <span>Explorar catálogo</span>
              <svg className="btn-arrow-icon" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </button>
          </div>

          <div className="hero-search-wrap">
            <div className="hero-search-inner">
              <svg className="hero-search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              <input className="hero-search-input" type="text" placeholder="Buscar por marca, modelo o categoría…" onKeyDown={e => { if (e.key === 'Enter') { toast('Buscando…', 'success'); navigate('busqueda'); } }} />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="trust-bar">
        <div className="trust-bar-stats">
          <div className="trust-bar-item"><span className="trust-bar-num">2.4k+</span><span className="trust-bar-label">Clientes</span></div>
          <div className="trust-bar-sep"></div>
          <div className="trust-bar-item"><span className="trust-bar-num">200+</span><span className="trust-bar-label">Vehículos</span></div>
          <div className="trust-bar-sep"></div>
          <div className="trust-bar-item"><span className="trust-bar-num">18</span><span className="trust-bar-label">Marcas</span></div>
          <div className="trust-bar-sep"></div>
          <div className="trust-bar-item"><span className="trust-bar-num">4h</span><span className="trust-bar-label">Crédito</span></div>
        </div>
      </section>

      {/* FW BANNER — espejo de "Destacados de la Semana" del sitio oficial */}
      <FeaturedWeekBanner vehicles={featured} navigate={navigate} />

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
            {featured.map(v => <VehicleCard key={v.id} v={v} favorites={favorites} onFav={onFav} onCompare={onCompare} navigate={navigate} />)}
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
            {AltorraData.CATEGORIES.filter(c => !['nuevos','camionetas','usados'].includes(c.slug)).slice(0, 6).map(c => (
              <div key={c.slug} className="cat-card" onClick={() => navigate('cat:' + c.slug)}>
                <img src={c.img} alt={c.name} />
                <div className="cat-card-overlay">
                  <div className="cat-card-name">{c.name}</div>
                  <div className="cat-card-count">{c.count} disponibles</div>
                </div>
                <div className="cat-card-arr">{I.arrowR}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* BRAND MARQUEE — debajo de categorías */}
      <section style={{ paddingBlock: 32, background: 'transparent' }}>
        <div className="container marquee" style={{background:'transparent'}}>
          <div className="marquee-track">
            {[...AltorraData.BRANDS, ...AltorraData.BRANDS].map((b, i) => (
              <div key={i} className="marquee-brand">
                <img src={b.logo} alt={b.name} style={{maxWidth:'100%',maxHeight:'100%',objectFit:'contain',filter:'grayscale(1) brightness(1.4)',opacity:0.55,transition:'all .3s'}} onError={e=>e.target.style.display='none'} />
              </div>
            ))}
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
            {AltorraData.SERVICES.map((s, i) => (
              <div key={i} className="svc-card mica fade-up" style={{ animationDelay: `${i * 60}ms` }}>
                <div className="svc-card-icon">{I[s.icon]}</div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
            ))}
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
              {newest.slice(0, 1).map((v) => (
                <div key={v.id} className="zero-km-feature" onClick={() => navigate('detail:'+v.id)}>
                  <div className="zero-km-feature-media" style={{ background: v.images[0].bg }}>
                    <div className="zero-km-feature-shine"></div>
                    <span className="zero-km-feature-badge"><span className="zero-km-feature-badge-dot"></span>0 KM · Recién llegado</span>
                    <svg viewBox="0 0 400 240" preserveAspectRatio="xMidYMid meet" className="zero-km-car-svg">
                      <defs>
                        <linearGradient id="carBody" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(255,255,255,0.22)"/>
                          <stop offset="100%" stopColor="rgba(255,255,255,0.06)"/>
                        </linearGradient>
                        <linearGradient id="glassG" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0%" stopColor="rgba(160,200,255,0.5)"/>
                          <stop offset="100%" stopColor="rgba(80,120,180,0.3)"/>
                        </linearGradient>
                      </defs>
                      <ellipse cx="200" cy="200" rx="160" ry="8" fill="rgba(0,0,0,0.4)" />
                      <path d="M50 170 Q70 110 130 100 L180 86 Q240 80 290 92 Q340 102 360 170 L350 180 Q330 174 300 174 Q200 174 100 174 Q70 174 50 180 Z" fill="url(#carBody)" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5"/>
                      <path d="M120 100 Q135 78 175 76 L230 78 Q270 82 285 100 L255 110 Q225 104 195 104 Q165 104 130 110 Z" fill="url(#glassG)" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
                      <line x1="195" y1="76" x2="200" y2="108" stroke="rgba(255,255,255,0.3)" strokeWidth="1"/>
                      <circle cx="120" cy="178" r="22" fill="#08080c" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5"/>
                      <circle cx="120" cy="178" r="11" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
                      <circle cx="280" cy="178" r="22" fill="#08080c" stroke="rgba(255,255,255,0.5)" strokeWidth="2.5"/>
                      <circle cx="280" cy="178" r="11" fill="rgba(255,255,255,0.1)" stroke="rgba(255,255,255,0.35)" strokeWidth="1"/>
                      <ellipse cx="62" cy="148" rx="6" ry="3" fill="rgba(255,220,140,0.85)"/>
                      <ellipse cx="345" cy="148" rx="5" ry="3" fill="rgba(255,80,60,0.7)"/>
                    </svg>
                  </div>
                  <div className="zero-km-feature-body">
                    <div className="row" style={{justifyContent:'space-between',alignItems:'flex-start',gap:12}}>
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
              ))}

              {/* Strip de modelos disponibles */}
              <div className="zero-km-strip">
                <div className="row" style={{justifyContent:'space-between',marginBottom:10}}>
                  <strong style={{fontSize:13,letterSpacing:'0.04em'}}>MÁS LLEGADAS</strong>
                  <span className="t-caption" style={{color:'var(--gold-400)',fontWeight:600,cursor:'pointer'}} onClick={()=>navigate('cat:nuevos')}>Ver todos →</span>
                </div>
                <div className="zero-km-strip-list">
                  {newest.slice(1, 4).map((v) => (
                    <div key={v.id} className="zero-km-strip-item" onClick={()=>navigate('detail:'+v.id)}>
                      <div className="zero-km-strip-thumb" style={{background:v.images[0].bg}}>
                        <svg viewBox="0 0 60 36" className="zero-km-strip-svg">
                          <ellipse cx="30" cy="32" rx="22" ry="1.5" fill="rgba(0,0,0,0.4)"/>
                          <path d="M8 26 Q12 14 20 12 L28 10 Q40 10 48 14 Q54 18 54 26 Z" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.35)" strokeWidth="0.5"/>
                          <circle cx="18" cy="27" r="3.5" fill="#08080c" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5"/>
                          <circle cx="44" cy="27" r="3.5" fill="#08080c" stroke="rgba(255,255,255,0.4)" strokeWidth="0.5"/>
                        </svg>
                      </div>
                      <div style={{flex:1,minWidth:0}}>
                        <div className="zero-km-strip-brand">{v.brandName}</div>
                        <div className="zero-km-strip-model">{v.model}</div>
                      </div>
                      <div className="zero-km-strip-price t-gold-grad">{v.priceFmt}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CONSIGNA — Vende tu auto · HarmonyOS hero tile */}
      <ConsignaSection navigate={navigate} toast={toast} />

      {/* TESTIMONIALS — premium HarmonyOS */}
      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="section-head">
            <div>
              <div className="section-eyebrow">Testimonios</div>
              <h2 className="section-h1">Confían en <span className="t-gold-grad">nosotros</span></h2>
              <p className="section-sub" style={{marginTop:8,maxWidth:520}}>Más de 2.400 familias han encontrado su carro ideal con Altorra. Estas son sus historias.</p>
            </div>
            <div className="testi-rating-pill">
              <span className="review-stars" style={{fontSize:16}}>{Array.from({length:5}).map((_,i)=>I.star(true))}</span>
              <div><strong style={{fontSize:18,fontFamily:'var(--font-display)'}}>4.9</strong><span className="t-caption t-muted" style={{marginLeft:6}}>· 247 reseñas</span></div>
              <button className="btn btn-subtle btn-sm" onClick={() => navigate('resenas')}>Ver todas{I.arrowR}</button>
            </div>
          </div>
          <div className="testi-grid">
            {AltorraData.TESTIMONIALS.slice(0,3).map((t, i) => (
              <article key={i} className="testi-card fade-up" style={{ animationDelay: `${i * 100}ms` }}>
                <div className="testi-quote">"</div>
                <div className="review-stars">{Array.from({length:5}).map((_, k) => I.star(k < t.stars))}</div>
                <p className="testi-text">{t.text}</p>
                <div className="testi-foot">
                  <div className="review-avatar">{t.name[0]}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontWeight:700,fontSize:14}}>{t.name}</div>
                    <div className="t-caption t-faint">{t.city} · Cliente verificado</div>
                  </div>
                  <span className="testi-verified">{I.check}</span>
                </div>
              </article>
            ))}
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
    </main>
  );
}

// ============================================================
// FEATURED WEEK BANNER — Espejo del banner oficial altorracars.github.io
// HUD automotriz premium · paleta dorada · auto-rotate cada 5s
// ============================================================
function FeaturedWeekBanner({ vehicles, navigate }) {
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);
  const slides = vehicles.slice(0, 5);
  const total = slides.length;

  useEffect(() => {
    if (paused || total <= 1) return;
    const id = setInterval(() => setIdx(i => (i + 1) % total), 5500);
    return () => clearInterval(id);
  }, [paused, total]);

  if (total === 0) return null;

  const go = (n) => setIdx(((n % total) + total) % total);

  return (
    <section className="fw-section" aria-label="Destacados de la semana"
             onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)}>
      <div className="container">
        <div className="fw-inner">
          <button className="fw-nav fw-nav--prev" type="button"
                  aria-label="Anterior" onClick={() => go(idx - 1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2.5"
                 strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"/>
            </svg>
          </button>
          <button className="fw-nav fw-nav--next" type="button"
                  aria-label="Siguiente" onClick={() => go(idx + 1)}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none"
                 stroke="currentColor" strokeWidth="2.5"
                 strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"/>
            </svg>
          </button>

          <div className="fw-track">
            {slides.map((v, i) => (
              <div key={v.id} className={`fw-slide ${i === idx ? 'fw-slide--active' : ''}`}>
                {/* INFO */}
                <a className="fw-info" onClick={(e) => { e.preventDefault(); navigate('detail:' + v.id); }} href="#">
                  <span className="fw-premium-tag">★ ALTORRA · PREMIUM SELECTION</span>
                  <h3 className="fw-title">Destacados <span style={{color:'#fff'}}>de la semana</span></h3>
                  <p className="fw-subtitle">Selección curada por nuestros expertos</p>
                  <hr className="fw-sep" />
                  <span className={`fw-badge ${v.condition === 'nuevo' ? 'fw-badge--offer' : ''}`}>
                    {v.condition === 'nuevo' ? '0 KM · Estreno' : (v.badge || 'Premium · Verificado')}
                  </span>
                  <h2 className="fw-vehicle-name">{v.brandName} {v.model}</h2>
                  <span className="fw-avail-tag">● Disponible · {v.city}</span>
                  <div className="fw-pills">
                    <span className="fw-pill">{I.meter}{v.kmFmt}</span>
                    <span className="fw-pill">{I.gear}{v.trans.split(' ')[0]}</span>
                    <span className="fw-pill">{I.fuel}{v.fuel}</span>
                  </div>
                  <div className="fw-price-box">
                    <span className="fw-price-label">Precio premium</span>
                    <span className="fw-price-value">{v.priceFmt}</span>
                  </div>
                  <span className="fw-cta-visual">
                    Ver ficha completa
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                         stroke="currentColor" strokeWidth="2.5"
                         strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M12 5l7 7-7 7"/>
                    </svg>
                  </span>
                </a>

                {/* VISUAL */}
                <div className="fw-visual">
                  <div className="fw-glow"></div>
                  <div className="fw-blueprint-panel">
                    <div className="fw-blueprint-ticks">
                      {Array.from({length: 11}).map((_, k) => (
                        <div key={k} className={`fw-blueprint-tick ${k % 2 === 0 ? 'fw-blueprint-tick--major' : ''}`}></div>
                      ))}
                    </div>
                    <div className="fw-blueprint-label">REF · {String(i+1).padStart(2,'0')} / {String(total).padStart(2,'0')}</div>
                    <svg className="fw-blueprint-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="20" y1="50" x2="80" y2="50" stroke="rgba(212,175,55,.16)" strokeWidth=".15" strokeDasharray="1 1.5"/>
                      <line x1="50" y1="20" x2="50" y2="80" stroke="rgba(212,175,55,.16)" strokeWidth=".15" strokeDasharray="1 1.5"/>
                      <circle cx="50" cy="50" r="22" fill="none" stroke="rgba(212,175,55,.18)" strokeWidth=".18" strokeDasharray=".5 .8"/>
                    </svg>
                  </div>
                  <div className="fw-hud-blueprint"></div>
                  <div className="fw-overlay-grid"></div>

                  {/* Car scene */}
                  <div className="fw-car-scene fw-car-scene--cutout">
                    <div className="fw-car-floor"></div>
                    <div className="fw-car-shadow"></div>
                    {/* Stylised car SVG (placeholder coherente con VehicleCard) */}
                    <svg className="fw-car-img" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid meet" style={{height:'74%',width:'88%'}}>
                      <defs>
                        <linearGradient id={`fw-grad-${v.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor="#f5df80"/>
                          <stop offset=".55" stopColor="#d4af37"/>
                          <stop offset="1" stopColor="#7d6428"/>
                        </linearGradient>
                        <linearGradient id={`fw-glass-${v.id}`} x1="0" y1="0" x2="0" y2="1">
                          <stop offset="0" stopColor="rgba(220,235,255,.85)"/>
                          <stop offset="1" stopColor="rgba(80,100,140,.45)"/>
                        </linearGradient>
                      </defs>
                      <ellipse cx="160" cy="155" rx="120" ry="6" fill="rgba(0,0,0,.55)" filter="blur(2px)"/>
                      <path d="M40 130 Q55 90 110 82 L150 72 Q205 70 250 84 Q282 96 290 130 L290 138 Q160 148 40 138 Z"
                            fill={`url(#fw-grad-${v.id})`}
                            stroke="rgba(255,235,170,.55)" strokeWidth="1.2"/>
                      <path d="M65 128 L90 96 L150 88 L205 88 L240 108 L268 128 Z" fill={`url(#fw-glass-${v.id})`} opacity=".75"/>
                      <rect x="105" y="98" width="38" height="14" rx="2" fill="rgba(220,235,255,.35)"/>
                      <rect x="148" y="98" width="38" height="14" rx="2" fill="rgba(220,235,255,.35)"/>
                      <rect x="190" y="100" width="35" height="12" rx="2" fill="rgba(220,235,255,.30)"/>
                      <circle cx="100" cy="138" r="16" fill="#0a0a0e" stroke="rgba(212,175,55,.6)" strokeWidth="1.4"/>
                      <circle cx="100" cy="138" r="7" fill="rgba(212,175,55,.9)"/>
                      <circle cx="230" cy="138" r="16" fill="#0a0a0e" stroke="rgba(212,175,55,.6)" strokeWidth="1.4"/>
                      <circle cx="230" cy="138" r="7" fill="rgba(212,175,55,.9)"/>
                    </svg>
                  </div>

                  {/* HUD layer */}
                  <div className="fw-hud-layer">
                    <div className="fw-hud-corner fw-hud-tl"></div>
                    <div className="fw-hud-corner fw-hud-tr"></div>
                    <div className="fw-hud-corner fw-hud-bl"></div>
                    <div className="fw-hud-corner fw-hud-br"></div>
                    <div className="fw-hud-scanline"></div>
                  </div>

                  {/* Data rail */}
                  <div className="fw-data-rail">
                    <div className="fw-data-item">
                      <div className="fw-data-icon">{I.calendar}</div>
                      <div className="fw-data-meta">
                        <div className="fw-data-label">AÑO</div>
                        <div className="fw-data-value">{v.year}</div>
                      </div>
                    </div>
                    <div className="fw-data-item">
                      <div className="fw-data-icon">{I.meter}</div>
                      <div className="fw-data-meta">
                        <div className="fw-data-label">KM</div>
                        <div className="fw-data-value">{v.kmFmt}</div>
                      </div>
                    </div>
                    <div className="fw-data-item">
                      <div className="fw-data-icon">{I.gear}</div>
                      <div className="fw-data-meta">
                        <div className="fw-data-label">TRANS.</div>
                        <div className="fw-data-value">{v.trans.split(' ')[0]}</div>
                      </div>
                    </div>
                    <div className="fw-data-item">
                      <div className="fw-data-icon">{I.fuel}</div>
                      <div className="fw-data-meta">
                        <div className="fw-data-label">COMBUSTIBLE</div>
                        <div className="fw-data-value">{v.fuel}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="fw-dots" role="tablist">
            {slides.map((_, i) => (
              <button key={i}
                      className={`fw-dot ${i === idx ? 'fw-dot--active' : ''}`}
                      onClick={() => go(i)}
                      aria-label={`Ir al slide ${i+1}`}></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CONSIGNA · "Vende tu auto" — HarmonyOS hero tile
// ============================================================
function ConsignaSection({ navigate, toast }) {
  const [form, setForm] = useState({ marca:'', modelo:'', year:'', km:'', tel:'' });
  const [touched, setTouched] = useState(false);

  const valid = form.marca.trim() && form.modelo.trim() && form.year && form.tel.trim();

  const submit = (e) => {
    e.preventDefault();
    setTouched(true);
    if (!valid) { toast('Completa marca, modelo, año y teléfono', 'danger'); return; }
    toast('¡Solicitud enviada! Te llamamos en menos de 4 horas', 'success');
    navigate('contacto');
  };

  const STEPS = [
    { n:'01', t:'Cuéntanos de tu auto', d:'Marca, modelo, año y km. 30 segundos.', icon: I.chat },
    { n:'02', t:'Avalúo y peritaje gratis', d:'Te visitamos. Revisamos motor, caja, suspensión y carrocería.', icon: I.shield },
    { n:'03', t:'Nosotros lo vendemos por ti', d:'Showroom Bocagrande, redes, portales y nuestra base de 2.400 clientes.', icon: I.car },
    { n:'04', t:'Tú cobras cuando se vende', d:'Sin costo si lo vendemos nosotros. Tú firmas, nosotros entregamos.', icon: I.wallet },
  ];

  return (
    <section className="section consigna-section" style={{ paddingTop: 0 }}>
      <div className="container">
        <div className="consigna-band">
          <div className="consigna-glow consigna-glow-1"></div>
          <div className="consigna-glow consigna-glow-2"></div>
          <div className="consigna-grid-bg"></div>

          <div className="consigna-head">
            <div className="consigna-eyebrow"><span className="dot"></span>VENDE CON NOSOTROS · CONSIGNACIÓN</div>
            <h2 className="consigna-title">
              Deja tu auto, <span className="t-gold-grad">nosotros nos encargamos</span> de todo.
            </h2>
            <p className="consigna-sub">
              Cero papeleo, cero llamadas perdidas, cero pérdida de tiempo. Tú nos confías el carro y nosotros lo exhibimos,
              lo promocionamos en todos los canales y se lo entregamos al comprador perfecto. <strong>Sin costo si lo vendemos nosotros.</strong>
            </p>
          </div>

          <div className="consigna-layout">
            {/* HERO TILE — Quick valuation form */}
            <form className="consigna-hero" onSubmit={submit} noValidate>
              <div className="consigna-hero-top">
                <span className="consigna-hero-tag"><span className="dot"></span>Avalúo gratuito · sin compromiso</span>
                <h3 className="consigna-hero-title">¿Cuánto vale <span className="t-gold-grad">tu carro?</span></h3>
                <p className="consigna-hero-desc">Recibe una oferta justa basada en precios reales del mercado en menos de <strong>4 horas hábiles.</strong></p>
              </div>

              <div className="consigna-form-grid">
                <label className="consigna-field">
                  <span>Marca</span>
                  <input className="consigna-input" placeholder="Ej. Mazda" value={form.marca}
                         onChange={e=>setForm(f=>({...f,marca:e.target.value}))}
                         data-bad={touched && !form.marca.trim()} />
                </label>
                <label className="consigna-field">
                  <span>Modelo</span>
                  <input className="consigna-input" placeholder="Ej. CX-30" value={form.modelo}
                         onChange={e=>setForm(f=>({...f,modelo:e.target.value}))}
                         data-bad={touched && !form.modelo.trim()} />
                </label>
                <label className="consigna-field">
                  <span>Año</span>
                  <input className="consigna-input" type="number" inputMode="numeric" placeholder="2022" min="1990" max="2026"
                         value={form.year} onChange={e=>setForm(f=>({...f,year:e.target.value}))}
                         data-bad={touched && !form.year} />
                </label>
                <label className="consigna-field">
                  <span>Kilometraje</span>
                  <input className="consigna-input" type="number" inputMode="numeric" placeholder="45.000" value={form.km}
                         onChange={e=>setForm(f=>({...f,km:e.target.value}))} />
                </label>
                <label className="consigna-field consigna-field-wide">
                  <span>Teléfono / WhatsApp</span>
                  <input className="consigna-input" type="tel" inputMode="tel" placeholder="+57 300 123 4567" value={form.tel}
                         onChange={e=>setForm(f=>({...f,tel:e.target.value}))}
                         data-bad={touched && !form.tel.trim()} />
                </label>
              </div>

              <div className="consigna-cta-row">
                <button type="submit" className="btn btn-primary btn-xl consigna-cta-main">
                  {I.wallet}Recibir avalúo gratis{I.arrowR}
                </button>
                <a className="btn btn-subtle btn-xl consigna-cta-alt"
                   href="https://wa.me/573235016747?text=Hola%2C%20quiero%20vender%20mi%20auto%20en%20consigna"
                   target="_blank" rel="noopener">
                  {I.whatsapp}WhatsApp directo
                </a>
              </div>

              <div className="consigna-trust">
                <span>{I.check}Sin costo si lo vendemos</span>
                <span>{I.check}Peritaje técnico incluido</span>
                <span>{I.check}Respuesta en 4 horas</span>
              </div>
            </form>

            {/* PROCESS TILES — 4-step HarmonyOS grid */}
            <div className="consigna-process">
              <div className="consigna-process-head">
                <span className="consigna-process-eyebrow">Proceso</span>
                <h4 className="consigna-process-h">4 pasos. Sin trámites.</h4>
              </div>
              <div className="consigna-steps">
                {STEPS.map((s,i) => (
                  <div key={i} className="consigna-step fade-up" style={{animationDelay:`${i*60}ms`}}>
                    <div className="consigna-step-top">
                      <span className="consigna-step-n">{s.n}</span>
                      <span className="consigna-step-icon">{s.icon}</span>
                    </div>
                    <div className="consigna-step-t">{s.t}</div>
                    <div className="consigna-step-d">{s.d}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stat strip */}
          <div className="consigna-stats">
            <div className="consigna-stat">
              <div className="consigna-stat-n t-gold-grad">2.400+</div>
              <div className="consigna-stat-l">Clientes en nuestra base</div>
            </div>
            <div className="consigna-stat-sep"></div>
            <div className="consigna-stat">
              <div className="consigna-stat-n t-gold-grad">21<span className="consigna-stat-u">días</span></div>
              <div className="consigna-stat-l">Tiempo promedio de venta</div>
            </div>
            <div className="consigna-stat-sep"></div>
            <div className="consigna-stat">
              <div className="consigna-stat-n t-gold-grad">0%</div>
              <div className="consigna-stat-l">Comisión si lo vendemos</div>
            </div>
            <div className="consigna-stat-sep"></div>
            <div className="consigna-stat">
              <div className="consigna-stat-n t-gold-grad">6+</div>
              <div className="consigna-stat-l">Canales de marketing activos</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

window.Home = Home;
