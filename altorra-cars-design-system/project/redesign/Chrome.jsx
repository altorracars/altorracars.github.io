// ============================================================
// ALTORRA · CINEMATIC SHARED CHROME — Nav + Footer
// Lightweight, self-mounting. Drops into any internal page.
// ============================================================
(function () {
  const { useState, useEffect, useRef } = React;
  const data = window.AltorraData;

  const NAV_LINKS = [
    { label: 'Vehículos', href: 'catalog.html' },
    { label: 'Marcas',    href: 'brands.html'  },
    { label: 'Nosotros',  href: 'about.html'   },
    { label: 'Contacto',  href: 'contact.html' },
  ];

  function CinNav() {
    const [collapsed, setCollapsed] = useState(false);
    const [gone, setGone] = useState(false);
    const [mobile, setMobile] = useState(false);

    useEffect(() => {
      let ticking = false;
      let lastY = window.scrollY;
      let upAccum = 0;
      let goneTimer = null;
      let revealTimer = null;
      let stateC = false;
      let stateG = false;
      const TOP_ZONE = 80;
      const COLLAPSE_AT = 240;
      const GONE_AT = 520;
      const UP_TO_REOPEN = 24;
      const DELTA = 2;
      const DUR = 900;

      const setC = (v) => { if (stateC !== v) { stateC = v; setCollapsed(v); } };
      const setG = (v) => { if (stateG !== v) { stateG = v; setGone(v); } };
      const cancelReveal = () => { if (revealTimer) { clearTimeout(revealTimer); revealTimer = null; } };
      const cancelGone   = () => { if (goneTimer)   { clearTimeout(goneTimer);   goneTimer = null; } };
      const wantCollapse = () => { cancelReveal(); cancelGone(); setG(false); setC(true); };
      const wantGone = () => { cancelReveal(); setC(true); if (!stateG && !goneTimer) goneTimer = setTimeout(() => { goneTimer = null; setG(true); }, DUR); };
      const wantReveal = () => { cancelGone(); if (stateG) { setG(false); if (!revealTimer) revealTimer = setTimeout(() => { revealTimer = null; setC(false); }, DUR); } else { cancelReveal(); setC(false); } };
      const wantTop = () => { cancelReveal(); cancelGone(); setG(false); setC(false); };

      const onScroll = () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          const y = window.scrollY;
          const dy = y - lastY;
          if (y <= TOP_ZONE) { wantTop(); upAccum = 0; }
          else if (dy < -DELTA) {
            upAccum += -dy;
            if (upAccum >= UP_TO_REOPEN) { wantReveal(); upAccum = 0; }
          } else if (dy > DELTA) {
            upAccum = 0;
            if (y >= GONE_AT) wantGone();
            else if (y >= COLLAPSE_AT) wantCollapse();
          }
          lastY = y;
          ticking = false;
        });
      };
      onScroll();
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => { window.removeEventListener('scroll', onScroll); cancelReveal(); cancelGone(); };
    }, []);

    // Detect current page for active state
    const here = window.location.pathname.split('/').pop() || 'index.html';
    const isActive = (href) => href === here;

    return (
      <>
        <header className={`cn-nav ${collapsed ? 'cn-nav--wheel' : ''} ${gone ? 'cn-nav--gone' : ''}`}>
          <a href="index.html" className="cn-logo" aria-label="Altorra Cars">
            <span className="cn-logo-wheel"><img src="logo-wheel.png" alt=""/></span>
            <span className="cn-logo-text">
              <span className="cn-logo-name">ALTORRA</span>
              <span className="cn-logo-sub">Cars</span>
            </span>
          </a>

          <nav className="cn-nav-links">
            {NAV_LINKS.map(l => (
              <a key={l.href} href={l.href} className={`cn-link ${isActive(l.href) ? 'is-on' : ''}`}>{l.label}</a>
            ))}
          </nav>

          <div className="cn-actions">
            <button type="button" className="cn-publish" data-altorra-open="sell" aria-label="Publica tu vehículo">
              <span className="cn-publish-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
              </span>
              <span className="cn-publish-label">Publica tu vehículo</span>
            </button>
            <a href="favorites.html" className="cn-icon-btn" aria-label="Favoritos">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/></svg>
            </a>
            <button type="button" className="cn-icon-btn" data-altorra-open="auth" aria-label="Mi cuenta">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 22a8 8 0 0 1 16 0"/></svg>
            </button>
            <button type="button" className="cn-icon-btn cn-only-mobile" onClick={() => setMobile(true)} aria-label="Menú">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </header>

        {/* Mobile drawer */}
        {mobile && (
          <div className="cn-mob-shade" onClick={() => setMobile(false)}>
            <div className="cn-mob-panel" onClick={(e) => e.stopPropagation()}>
              <div className="cn-mob-head">
                <span><span className="cn-logo-name">ALTORRA</span> <span className="cn-logo-sub">Cars</span></span>
                <button type="button" className="cn-icon-btn" onClick={() => setMobile(false)}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 6 18 18M6 18 18 6"/></svg>
                </button>
              </div>
              <nav className="cn-mob-links">
                {NAV_LINKS.map(l => (
                  <a key={l.href} href={l.href} className={isActive(l.href) ? 'is-on' : ''}>{l.label}<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M5 12h14M13 5l7 7-7 7"/></svg></a>
                ))}
              </nav>
              <button type="button" className="cn-mob-cta" data-altorra-open="sell">Publica tu vehículo</button>
            </div>
          </div>
        )}
      </>
    );
  }

  // ============================================================
  // Footer — Marketplace style (no showroom)
  // ============================================================
  function CinFooter() {
    return (
      <footer className="cn-footer">
        <div className="cn-footer-grid">
          <div className="cn-footer-brand">
            <div className="cn-footer-mark">
              <span className="cn-footer-name">ALTORRA</span>
              <span className="cn-footer-rule" aria-hidden="true"/>
              <span className="cn-footer-sub">Cars</span>
            </div>
            <p className="cn-footer-tagline">
              <strong>Marketplace digital de vehículos en Colombia.</strong>
              {' '}Conectamos compradores con concesionarios aliados verificados en todo el país.
            </p>
          </div>

          <div className="cn-footer-col">
            <span className="cn-footer-h">Comprar</span>
            <a href="catalog.html">Catálogo</a>
            <a href="brands.html">Marcas</a>
            <a href="simulator.html">Simulador</a>
            <a href="compare.html">Comparador</a>
            <a href="favorites.html">Mis favoritos</a>
          </div>

          <div className="cn-footer-col">
            <span className="cn-footer-h">Vender</span>
            <button type="button" data-altorra-open="sell" className="cn-footer-link-btn">Publica tu vehículo</button>
            <button type="button" data-altorra-open="finance" className="cn-footer-link-btn">Financiación</button>
            <a href="about.html#programas">Programas</a>
            <a href="contact.html">Contacto</a>
          </div>

          <div className="cn-footer-col">
            <span className="cn-footer-h">Hablemos</span>
            <a href="mailto:hola@altorracars.com" className="cn-footer-ci">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
              hola@altorracars.com
            </a>
            <a href="tel:+573235016747" className="cn-footer-ci">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              +57 323 501 6747
            </a>
            <a href="https://wa.me/573235016747" target="_blank" rel="noopener" className="cn-footer-ci">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 .9-1 2.3 0 1.3 1 2.6 1.1 2.8.1.2 2 3 4.8 4.2 2 .9 2.4 1 3.2.9.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.4z M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.4 5.1L2 22l5.1-1.4c1.5.8 3.2 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
              WhatsApp
            </a>
          </div>
        </div>

        <div className="cn-footer-bottom">
          <span>© 2026 Altorra Cars · NIT 901.000.000-0 · Todos los derechos reservados</span>
          <nav>
            <a href="terms.html">Términos</a>
            <span aria-hidden="true">·</span>
            <a href="privacy.html">Privacidad</a>
            <span aria-hidden="true">·</span>
            <a href="cookies.html">Cookies</a>
          </nav>
        </div>
      </footer>
    );
  }

  // Auto-mount: Nav at top of body, Footer at the bottom — two separate roots
  (function safeMount(fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); })(() => {
    document.body.setAttribute('data-cin', 'on');
    let navMount = document.getElementById('chrome-nav-root');
    if (!navMount) {
      navMount = document.createElement('div');
      navMount.id = 'chrome-nav-root';
      document.body.insertBefore(navMount, document.body.firstChild);
    }
    let footerMount = document.getElementById('chrome-footer-root');
    if (!footerMount) {
      footerMount = document.createElement('div');
      footerMount.id = 'chrome-footer-root';
      document.body.appendChild(footerMount);
    }
    ReactDOM.createRoot(navMount).render(<CinNav/>);
    ReactDOM.createRoot(footerMount).render(<CinFooter/>);
  });
})();