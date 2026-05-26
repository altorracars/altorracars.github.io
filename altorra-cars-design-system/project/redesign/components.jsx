// ============================================================
// ALTORRA CARS · Shared components
// ============================================================
const { useState, useEffect, useRef, useMemo, useCallback } = React;

// ───── ICONS (Fluent line style)
const I = {
  search:   <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>,
  heart:    (filled) => <svg viewBox="0 0 24 24" width="18" height="18" fill={filled?"currentColor":"none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z"/></svg>,
  scale:    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m16 16 3-8 3 8c-2 1-4 1-6 0Z"/><path d="m2 16 3-8 3 8c-2 1-4 1-6 0Z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2"/></svg>,
  user:     <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4 21v-1a8 8 0 0 1 16 0v1"/></svg>,
  menu:     <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="4" y1="6" x2="20" y2="6"/><line x1="4" y1="12" x2="20" y2="12"/><line x1="4" y1="18" x2="20" y2="18"/></svg>,
  close:    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
  chev:     (dir='down') => <svg style={{transform:`rotate(${{down:0,up:180,right:-90,left:90}[dir]}deg)`}} viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"/></svg>,
  sun:      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>,
  moon:     <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>,
  shield:   <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="m9 12 2 2 4-4"/></svg>,
  wallet:   <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="6" width="20" height="14" rx="2"/><path d="M2 10h20"/><circle cx="17" cy="15" r="1.5"/></svg>,
  shuffle:  <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/><polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/><line x1="4" y1="4" x2="9" y2="9"/></svg>,
  truck:    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="6" width="13" height="11" rx="1.5"/><path d="M14 9h4l3 4v4h-7z"/><circle cx="6" cy="18" r="2"/><circle cx="17" cy="18" r="2"/></svg>,
  check:    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="9 12 11.5 14.5 16 9.5"/></svg>,
  phone:    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.68 2.81a2 2 0 0 1-.45 2.11L8 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.91.32 1.85.55 2.81.68A2 2 0 0 1 22 16.92z"/></svg>,
  fuel:     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="22" x2="15" y2="22"/><line x1="4" y1="9" x2="14" y2="9"/><path d="M14 22V4a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v18"/><path d="m14 13 3 3v3a2 2 0 0 0 4 0V8l-3-3"/></svg>,
  gear:     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  meter:    <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 12V2"/><path d="m8 14 4-2 4 2"/><circle cx="12" cy="14" r="9"/></svg>,
  pin:      <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>,
  star:     (filled) => <svg viewBox="0 0 24 24" width="14" height="14" fill={filled?"currentColor":"none"} stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  bell:     <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.94 1.94 0 0 0 3.4 0"/></svg>,
  arrowR:   <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>,
  whatsapp: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M17.5 14.4c-.3-.1-1.7-.8-2-.9s-.5-.1-.6.1-.7.9-.8 1.1-.3.2-.5.1c-.7-.4-1.5-.8-2.3-1.7-.6-.6-1-1.4-1.2-1.6s0-.3.1-.4l.4-.5.3-.5c0-.2 0-.3 0-.4l-.6-1.4c-.1-.4-.3-.4-.4-.4h-.4c-.2 0-.4 0-.6.3-.2.3-.8.8-.8 1.9 0 1.1.8 2.2 1 2.4.1.2 1.7 2.6 4.1 3.7 1.4.6 2 .7 2.7.6.4-.1 1.3-.5 1.5-1.1.2-.5.2-1 .1-1.1-.1-.1-.3-.2-.5-.3zM12 2C6.5 2 2 6.5 2 12c0 1.7.5 3.4 1.3 4.9L2 22l5.3-1.3c1.4.7 3 1.1 4.7 1.1 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>,
  facebook: <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.4c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12h2.6l-.4 3h-2.2v7A10 10 0 0 0 22 12z"/></svg>,
  instagram:<svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="0.8" fill="currentColor"/></svg>,
  filter:   <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>,
  grid:     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  list:     <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><circle cx="4" cy="6" r="1.5"/><circle cx="4" cy="12" r="1.5"/><circle cx="4" cy="18" r="1.5"/></svg>,
  share:    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>,
  pdf:      <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/></svg>,
  send:     <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>,
  calendar: <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>,
  car:      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 17h2l1-3h12l1 3h2v-3l-2-7H7L5 7l-2 7z"/><circle cx="7.5" cy="17.5" r="1.5"/><circle cx="16.5" cy="17.5" r="1.5"/></svg>,
};

// ───── HEADER NAV (Mica + acrylic dropdowns)
function Nav({ route, navigate, theme, setTheme, favorites, openAuth }) {
  const [scrolled, setScrolled] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [gone, setGone] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [vehDD, setVehDD] = useState(false);
  const [moreDD, setMoreDD] = useState(false);

  useEffect(() => {
    // State machine that respects in-flight transitions: while a timer is
    // scheduled we DON'T reschedule it. While the direction matches the
    // current target, do nothing. Visual duration is owned by CSS so it
    // feels identical anywhere on the page.
    let ticking = false;
    let lastY = window.scrollY;
    let upAccum = 0;
    let goneTimer = null;
    let revealTimer = null;
    let stateCollapsed = false;
    let stateGone = false;
    const TOP_ZONE = 80;
    const COLLAPSE_AT = 240;
    const GONE_AT = 520;
    const UP_TO_REOPEN = 24;
    const DELTA = 2;
    const WHEEL_DUR = 900;

    const setC = (v) => { if (stateCollapsed !== v) { stateCollapsed = v; setCollapsed(v); } };
    const setG = (v) => { if (stateGone !== v)      { stateGone = v;      setGone(v); } };

    const cancelReveal = () => { if (revealTimer) { clearTimeout(revealTimer); revealTimer = null; } };
    const cancelGone   = () => { if (goneTimer)   { clearTimeout(goneTimer);   goneTimer = null; } };

    const wantCollapseStay = () => {
      // Wheel visible, not gone. Cancel any pending reveal.
      cancelReveal();
      cancelGone();
      setG(false);
      setC(true);
    };

    const wantGone = () => {
      // Wheel first, then fade. Only schedule once.
      cancelReveal();
      setC(true);
      if (!stateGone && !goneTimer) {
        goneTimer = setTimeout(() => { goneTimer = null; setG(true); }, WHEEL_DUR);
      }
    };

    const wantReveal = () => {
      // Bring wheel back if it was gone, then expand bar.
      cancelGone();
      if (stateGone) {
        setG(false);
        if (!revealTimer) {
          revealTimer = setTimeout(() => { revealTimer = null; setC(false); }, WHEEL_DUR);
        }
      } else {
        // Already wheel-only — go straight to expanded
        cancelReveal();
        setC(false);
      }
    };

    const wantTop = () => {
      cancelReveal(); cancelGone();
      setG(false); setC(false);
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = window.scrollY;
        const dy = y - lastY;
        setScrolled(y > 24);
        if (y <= TOP_ZONE) {
          wantTop(); upAccum = 0;
        } else if (dy < -DELTA) {
          upAccum += -dy;
          if (upAccum >= UP_TO_REOPEN) { wantReveal(); upAccum = 0; }
        } else if (dy > DELTA) {
          upAccum = 0;
          if (y >= GONE_AT)         wantGone();
          else if (y >= COLLAPSE_AT) wantCollapseStay();
        }
        lastY = y;
        ticking = false;
      });
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelReveal(); cancelGone();
    };
  }, []);

  // Force-expand only when a dropdown / mobile menu is open (NOT hover)
  const showForced = vehDD || moreDD || mobileOpen;
  const isCollapsed = collapsed && !showForced;
  const isGone      = gone && !showForced;

  const NavLink = ({ id, label }) => (
    <button
      onClick={() => navigate(id)}
      className={`nav-link ${route === id ? 'active' : ''}`}
    >
      {label}
    </button>
  );

  return (
    <header
      className={`alt-nav ${scrolled ? 'scrolled' : ''} ${isCollapsed ? 'alt-nav--wheel' : ''} ${isGone ? 'alt-nav--gone' : ''}`}
      onClick={(e) => { if (isCollapsed) { setCollapsed(false); e.stopPropagation(); } }}
      aria-expanded={!isCollapsed}
    >
      <div className="alt-nav-inner container">
        <button className="alt-logo" onClick={() => navigate('home')}>
          <span className="alt-logo-stage">
            <span className="alt-logo-skid"></span>
            <span className="alt-logo-smoke alt-logo-smoke-1"></span>
            <span className="alt-logo-smoke alt-logo-smoke-2"></span>
            <span className="alt-logo-smoke alt-logo-smoke-3"></span>
            <img src="logo-wheel.png" alt="" className="alt-logo-icon" />
          </span>
          <div className="alt-logo-text">
            <span className="t-gold-grad alt-logo-name" style={{fontWeight:800,fontSize:18,letterSpacing:'0.04em'}}>ALTORRA</span>
            <span className="alt-logo-sub" style={{fontSize:10,letterSpacing:'0.32em',color:'var(--ink-text-muted)',fontWeight:600}}>CARS</span>
          </div>
        </button>

        <nav className="alt-nav-links">
          <NavLink id="home" label="Inicio" />
          <div className="nav-dd-wrap" onMouseEnter={()=>setVehDD(true)} onMouseLeave={()=>setVehDD(false)}>
            <button className={`nav-link ${vehDD?'open':''} ${['busqueda','suv','pickup','sedan','hatchback','nuevos','usados','camionetas'].includes(route)?'active':''}`}>
              Vehículos <span className={`nav-chev ${vehDD?'flip':''}`}>{I.chev('down')}</span>
            </button>
            {vehDD && (
              <div className="nav-dd acrylic-hi nav-dd-pro">
                <div className="nav-dd-grid">
                  <div>
                    <div className="nav-dd-h">Por categoría</div>
                    {AltorraData.CATEGORIES.slice(0,4).map(c => (
                      <button key={c.slug} className="nav-dd-link" onClick={()=>navigate('cat:'+c.slug)}>
                        <span className="nav-dd-thumb" style={{backgroundImage:`url(${c.img})`}}></span>
                        <span><strong>{c.name}</strong><span className="t-faint t-caption" style={{display:'block'}}>{c.count} disponibles</span></span>
                      </button>
                    ))}
                  </div>
                  <div>
                    <div className="nav-dd-h">Por condición</div>
                    {[{slug:'nuevos',name:'Nuevos 0KM',img:'cat/NUEVOS.jpg',count:31},
                      {slug:'usados',name:'Usados',img:'cat/USADOS.jpg',count:86},
                      {slug:'camionetas',name:'Camionetas',img:'cat/camioneta.jpg',count:15},
                      {slug:'busqueda',name:'Ver todos',img:'cat/SUV.jpg',count:188}].map(c => (
                      <button key={c.slug} className="nav-dd-link" onClick={()=>navigate(c.slug==='busqueda'?'busqueda':'cat:'+c.slug)}>
                        <span className="nav-dd-thumb" style={{backgroundImage:`url(${c.img})`}}></span>
                        <span><strong>{c.name}</strong><span className="t-faint t-caption" style={{display:'block'}}>{c.count} disponibles</span></span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          <NavLink id="marcas" label="Marcas" />
          <NavLink id="nosotros" label="Nosotros" />
          <NavLink id="contacto" label="Contacto" />
        </nav>

        <div className="alt-nav-actions">
          <a href="#" data-altorra-open="sell" className="nav-publish" aria-label="Publica tu vehículo">
            <span className="nav-publish-icon" aria-hidden="true">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
            </span>
            <span className="nav-publish-label">Publica tu vehículo</span>
            <span className="nav-publish-shine" aria-hidden="true" />
          </a>
          <button className="btn btn-icon btn-ghost" onClick={()=>navigate('favoritos')} aria-label="Favoritos" style={{position:'relative'}}>
            {I.heart(false)}
            {favorites?.length>0 && <span className="nav-pip">{favorites.length}</span>}
          </button>
          <button className="btn btn-subtle" onClick={() => { if (window.AltorraModals) window.AltorraModals.open('auth'); else openAuth && openAuth(); }}>{I.user}<span className="hide-sm">Ingresar</span></button>
          <button className="btn btn-icon btn-ghost mob-only" onClick={()=>setMobileOpen(true)} aria-label="Menú">{I.menu}</button>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="mob-drawer fade-in" onClick={()=>setMobileOpen(false)}>
          <div className="mob-panel acrylic-hi scale-in" onClick={e=>e.stopPropagation()}>
            <div className="row" style={{justifyContent:'space-between'}}>
              <strong className="t-title-sm t-gold-grad">ALTORRA</strong>
              <button className="btn btn-icon btn-ghost" onClick={()=>setMobileOpen(false)}>{I.close}</button>
            </div>
            <div className="mob-links">
              {['home','busqueda','marcas','simulador','comparar','nosotros','contacto','resenas','favoritos'].map(id => (
                <button key={id} className="mob-link" onClick={()=>{navigate(id);setMobileOpen(false);}}>
                  {{home:'Inicio',busqueda:'Vehículos',marcas:'Marcas',simulador:'Simulador',comparar:'Comparar',nosotros:'Nosotros',contacto:'Contacto',resenas:'Reseñas',favoritos:'Favoritos'}[id]}
                  {I.arrowR}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

// ───── FOOTER (premium: newsletter + columns + bottom bar)
function Footer({ navigate }) {
  const [email, setEmail] = useState('');
  const [subbed, setSubbed] = useState(false);
  return (
    <footer className="alt-footer">
      {/* Newsletter band — oculto en home cinematic, ya fusionado en CinEnd */}
      <div className="alt-footer-news-band" data-cin-hide>
        <div className="container alt-footer-news">
          <div>
            <div className="hero-eyebrow" style={{background:'rgba(212,175,55,0.12)',color:'var(--gold-700)',borderColor:'rgba(212,175,55,0.3)'}}><span className="news-mark" aria-hidden="true">✦</span>Newsletter</div>
            <h3 style={{fontFamily:'var(--font-display)',fontSize:'clamp(28px,3.5vw,40px)',fontWeight:800,marginTop:10,lineHeight:1.1}}>
              Recibe los <span className="t-gold-grad">mejores vehículos</span> antes que nadie.
            </h3>
            <p className="t-muted" style={{marginTop:8,maxWidth:520}}>Una vez por semana — nuevas llegadas, ofertas de fin de mes y tips para comprar mejor. Cero spam.</p>
          </div>
          <form className="alt-footer-news-form" onSubmit={(e)=>{e.preventDefault();if(email)setSubbed(true);}}>
            {!subbed ? (
              <>
                <input className="input input-lg" type="email" required placeholder="tu@email.com" value={email} onChange={e=>setEmail(e.target.value)} />
                <button type="submit" className="btn btn-primary btn-xl">Suscribirme{I.arrowR}</button>
                <span className="t-caption t-faint" style={{gridColumn:'1/-1'}}>Al suscribirte aceptas nuestra política de privacidad.</span>
              </>
            ) : (
              <div className="alt-footer-news-ok">
                <div className="badge-ok">{I.check}</div>
                <div>
                  <strong>¡Listo, {email.split('@')[0]}!</strong>
                  <div className="t-caption t-muted">Te confirmamos en tu email.</div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>

      {/* Mirror del footer oficial — adaptado al tema dark */}
      <div className="footer-topline" aria-hidden="true"></div>

      <div className="footer-body">
        <span className="footer-wm" aria-hidden="true">ALTORRA</span>
        <div className="container">
          <div className="footer-grid">
            <div className="footer-col footer-col--brand">
              <div className="footer-mark">
                <span className="footer-mark__name">ALTORRA</span>
                <span className="footer-mark__rule" aria-hidden="true"></span>
                <span className="footer-mark__sub">Cars</span>
              </div>
              <p className="footer-tagline">
                <strong>Donde la calidad y la confianza convergen.</strong>
                {' '}Conectamos oportunidades sobre ruedas, ofreciendo una experiencia de compra y venta de vehículos usados más cercana, estratégica, profesional y orientada a generar valor en cada decisión.
              </p>
            </div>

            <div className="footer-col-sep" aria-hidden="true"></div>

            <div className="footer-col footer-col--contact">
              <h3 className="footer-col-heading">{I.chat}<span>Hablemos</span></h3>
              <div className="footer-contact">
                <a href="mailto:altorracarssale@gmail.com" className="footer-ci">{I.mail}<span>altorracarssale@gmail.com</span></a>
                <a href="tel:+573235016747" className="footer-ci">{I.phone}<span>+57 323 501 6747</span></a>
                <span className="footer-ci">{I.pin}<span>Marketplace digital · Colombia</span></span>
              </div>
              <div className="footer-schedule">
                <span className="footer-schedule__label">Atención al cliente</span>
                <span className="footer-schedule__value">Lun – Vie · 8:00 am – 6:00 pm</span>
                <span className="footer-schedule__value">Sáb · 9:00 am – 2:00 pm</span>
              </div>
            </div>

            <div className="footer-col-sep" aria-hidden="true"></div>

            <div className="footer-col footer-col--social">
              <h3 className="footer-col-heading"><span>Conéctate con Nosotros</span></h3>
              <div className="footer-social">
                <a href="https://wa.me/573235016747" className="footer-soc footer-soc--wa" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">{I.whatsapp}<span className="footer-soc__label">WhatsApp</span></a>
                <a href="https://www.instagram.com/altorracars/" className="footer-soc footer-soc--ig" target="_blank" rel="noopener noreferrer" aria-label="Instagram">{I.instagram}<span className="footer-soc__label">Instagram</span></a>
                <a href="https://www.facebook.com/share/14XKk6MCmiT/" className="footer-soc footer-soc--fb" target="_blank" rel="noopener noreferrer" aria-label="Facebook">{I.facebook}<span className="footer-soc__label">Facebook</span></a>
              </div>
              <div className="footer-rating">
                <span className="review-stars">{Array.from({length:5}).map((_,i)=>I.star(true))}</span>
                <strong>4.9</strong>
                <span className="t-caption t-muted">· 247 reseñas Google</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <div className="footer-bottom__row">
            <p className="footer-copy">© 2026 <strong>ALTORRA CARS</strong> — ALTORRA COMPANY SAS. Todos los derechos reservados.</p>
            <nav className="footer-legal" aria-label="Legal">
              <button className="alt-footer-bottom-link" onClick={()=>navigate('terminos')}>Términos</button>
              <span aria-hidden="true">·</span>
              <button className="alt-footer-bottom-link" onClick={()=>navigate('privacidad')}>Privacidad</button>
              <span aria-hidden="true">·</span>
              <button className="alt-footer-bottom-link" onClick={()=>navigate('cookies')}>Cookies</button>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ───── VEHICLE CARD
function VehicleCard({ v, favorites, onFav, onCompare, navigate, compact }) {
  const fav = favorites?.includes(v.id);
  const cardRef = useRef();

  // 3D tilt
  function onMove(e) {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    cardRef.current.style.setProperty('--tx', `${y*-4}deg`);
    cardRef.current.style.setProperty('--ty', `${x*4}deg`);
  }
  function onLeave() {
    if (!cardRef.current) return;
    cardRef.current.style.setProperty('--tx', '0deg');
    cardRef.current.style.setProperty('--ty', '0deg');
  }

  return (
    <article ref={cardRef} className={`v-card ${compact?'v-card-cmp':''}`} onMouseMove={onMove} onMouseLeave={onLeave}>
      <div className="v-card-media" style={{background: v.images[0].bg}} onClick={()=>navigate('detail:'+v.id)}>
        <div className="v-card-glow"></div>
        <svg className="v-card-art" viewBox="0 0 320 180" preserveAspectRatio="xMidYMid meet">
          <defs>
            <linearGradient id={`g-${v.id}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0" stopColor="rgba(255,255,255,0.18)"/>
              <stop offset="1" stopColor="rgba(0,0,0,0)"/>
            </linearGradient>
          </defs>
          {/* stylized car */}
          <ellipse cx="160" cy="150" rx="110" ry="6" fill="rgba(0,0,0,0.32)" />
          <path d="M50 130 Q60 95 110 88 L150 80 Q200 76 240 88 Q270 96 280 130 Z" fill="rgba(255,255,255,0.14)" stroke="rgba(255,255,255,0.32)" strokeWidth="1.5"/>
          <path d="M70 128 L92 100 L150 92 L200 92 L235 110 L260 128 Z" fill={`url(#g-${v.id})`} />
          <rect x="105" y="100" width="40" height="16" rx="2" fill="rgba(180,210,255,0.32)"/>
          <rect x="155" y="100" width="35" height="16" rx="2" fill="rgba(180,210,255,0.32)"/>
          <rect x="195" y="102" width="30" height="14" rx="2" fill="rgba(180,210,255,0.28)"/>
          <circle cx="105" cy="135" r="14" fill="#0a0a0e" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
          <circle cx="105" cy="135" r="6" fill="rgba(255,255,255,0.3)"/>
          <circle cx="225" cy="135" r="14" fill="#0a0a0e" stroke="rgba(255,255,255,0.4)" strokeWidth="2"/>
          <circle cx="225" cy="135" r="6" fill="rgba(255,255,255,0.3)"/>
        </svg>

        <div className="v-card-tags">
          {v.condition==='nuevo' && <span className="v-tag v-tag-gold">0 KM</span>}
          {v.badge && <span className="v-tag">{v.badge}</span>}
        </div>

        <button className={`v-card-fav ${fav?'on':''}`} onClick={(e)=>{e.stopPropagation();onFav(v.id);}} aria-label="Favorito">
          {I.heart(fav)}
        </button>

        <div className="v-card-brand-overlay">
          <img src={`logos/${v.brand}.webp`} alt={v.brandName} />
        </div>
      </div>
      <div className="v-card-body">
        <div className="row" style={{justifyContent:'space-between',gap:6,alignItems:'flex-start'}}>
          <div style={{minWidth:0,flex:1}}>
            <div className="t-caption t-faint" style={{textTransform:'uppercase',letterSpacing:'0.06em'}}>{v.brandName} · {v.year}</div>
            <h3 className="v-card-title" onClick={()=>navigate('detail:'+v.id)}>{v.model}</h3>
          </div>
        </div>
        <div className="v-card-specs">
          <span>{I.meter}{v.kmFmt}</span>
          <span>{I.gear}{v.trans.split(' ')[0]}</span>
          <span>{I.fuel}{v.fuel}</span>
          <span>{I.pin}{v.city}</span>
        </div>
        <div className="v-card-foot">
          <div>
            <div className="t-caption t-faint">Precio</div>
            <div className="v-card-price">{v.priceFmt}</div>
          </div>
          <div className="row" style={{gap:6}}>
            <button className="btn btn-icon btn-subtle btn-sm" onClick={()=>onCompare(v.id)} aria-label="Comparar">{I.scale}</button>
            <button className="btn btn-primary btn-sm" onClick={()=>navigate('detail:'+v.id)}>Ver{I.arrowR}</button>
          </div>
        </div>
      </div>
    </article>
  );
}

// ───── TOAST
function ToastHost({ toasts }) {
  return (
    <div className="toast-host">
      {toasts.map(t => (
        <div key={t.id} className={`toast acrylic-hi scale-in toast-${t.kind||'info'}`}>
          <span className="toast-dot"></span>
          <span>{t.msg}</span>
        </div>
      ))}
    </div>
  );
}

// ───── MODAL
function Modal({ open, onClose, title, children, size='md' }) {
  useEffect(()=> {
    if (!open) return;
    const onEsc = (e) => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', onEsc);
    return ()=>window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div className="modal-shade fade-in" onClick={onClose}>
      <div className={`modal-card acrylic-hi scale-in modal-${size}`} onClick={e=>e.stopPropagation()}>
        <div className="modal-head">
          <h3 className="t-subtitle">{title}</h3>
          <button className="btn btn-icon btn-ghost" onClick={onClose}>{I.close}</button>
        </div>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

Object.assign(window, { I, Nav, Footer, VehicleCard, ToastHost, Modal });
