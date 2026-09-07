// ============================================================
// ALTORRA · QuickTools — Floating bottom-left tool dock
// Simulador · Comparar · Favoritos · Mi cuenta
// HarmonyOS-style: pill expandible con tooltips dorados
// ============================================================
(function () {
  const { useState, useEffect } = React;

  const TOOLS = [
    {
      id: 'simulator',
      label: 'Simulador de crédito',
      shortLabel: 'Simulador',
      href: 'simulator.html',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2"/>
          <line x1="8" y1="6" x2="16" y2="6"/>
          <line x1="8" y1="10" x2="10" y2="10"/>
          <line x1="14" y1="10" x2="16" y2="10"/>
          <line x1="8" y1="14" x2="10" y2="14"/>
          <line x1="14" y1="14" x2="16" y2="14"/>
          <line x1="8" y1="18" x2="10" y2="18"/>
          <line x1="14" y1="18" x2="16" y2="18"/>
        </svg>
      ),
    },
    {
      id: 'compare',
      label: 'Comparar vehículos',
      shortLabel: 'Comparar',
      href: 'compare.html',
      badgeStorage: 'alt-cmp',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="3" width="6" height="10" rx="1"/>
          <rect x="10" y="3" width="6" height="10" rx="1"/>
          <rect x="18" y="3" width="4" height="10" rx="1"/>
          <path d="M5 17v4M13 17v4M20 17v4M3 20h4M11 20h4M18 20h4"/>
        </svg>
      ),
    },
    {
      id: 'favorites',
      label: 'Mis favoritos',
      shortLabel: 'Favoritos',
      href: 'favorites.html',
      badgeStorage: 'alt-fav',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
        </svg>
      ),
    },
    {
      id: 'history',
      label: 'Vistos recientemente',
      shortLabel: 'Historial',
      href: 'favorites.html#history',
      badgeStorage: 'alt-seen',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
    },
    {
      id: 'finance',
      label: 'Solicitar financiación',
      shortLabel: 'Financiar',
      action: 'finance',
      icon: (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="14" rx="2"/>
          <line x1="2" y1="11" x2="22" y2="11"/>
        </svg>
      ),
    },
  ];

  function useBadge(key) {
    const [count, setCount] = useState(0);
    useEffect(() => {
      if (!key) return;
      const read = () => {
        try {
          const arr = JSON.parse(localStorage.getItem(key) || '[]');
          setCount(Array.isArray(arr) ? arr.length : 0);
        } catch { setCount(0); }
      };
      read();
      window.addEventListener('storage', read);
      // poll once per second for same-tab updates
      const t = setInterval(read, 1500);
      return () => { window.removeEventListener('storage', read); clearInterval(t); };
    }, [key]);
    return count;
  }

  function ToolItem({ tool }) {
    const badgeCount = useBadge(tool.badgeStorage);
    const onClick = (e) => {
      if (tool.action && window.AltorraModals) {
        e.preventDefault();
        window.AltorraModals.open(tool.action);
      }
    };
    const Tag = tool.action ? 'button' : 'a';
    return (
      <Tag
        href={tool.href || '#'}
        type={tool.action ? 'button' : undefined}
        onClick={onClick}
        className="qt-item"
        aria-label={tool.label}
        data-tooltip={tool.label}
      >
        <span className="qt-icon">{tool.icon}</span>
        <span className="qt-label">{tool.shortLabel}</span>
        {badgeCount > 0 && <span className="qt-badge">{badgeCount}</span>}
      </Tag>
    );
  }

  function QuickTools() {
    const [open, setOpen] = useState(false);
    const [hidden, setHidden] = useState(false);

    // Hide while scrolling down past threshold (sync with nav)
    useEffect(() => {
      let last = window.scrollY;
      let raf;
      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          const y = window.scrollY;
          const dy = y - last;
          if (dy > 6 && y > 400) setHidden(true);
          else if (dy < -6) setHidden(false);
          last = y;
          raf = null;
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return (
      <div className={`qt-wrap ${open ? 'is-open' : ''} ${hidden ? 'is-hidden' : ''}`}>
        <button
          type="button"
          className="qt-toggle"
          onClick={() => setOpen(o => !o)}
          aria-label={open ? 'Cerrar herramientas' : 'Abrir herramientas'}
          aria-expanded={open}
        >
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M6 6 18 18M6 18 18 6"/>
            </svg>
          ) : (
            <>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="7" height="7" rx="1"/>
                <rect x="14" y="3" width="7" height="7" rx="1"/>
                <rect x="3" y="14" width="7" height="7" rx="1"/>
                <rect x="14" y="14" width="7" height="7" rx="1"/>
              </svg>
              <span className="qt-toggle-pulse" aria-hidden="true"/>
            </>
          )}
        </button>

        <div className="qt-dock" role="menu">
          <span className="qt-dock-eyebrow">Herramientas</span>
          {TOOLS.map(t => <ToolItem key={t.id} tool={t}/>)}
        </div>
      </div>
    );
  }

  // Auto-mount
  function mount() {
    let host = document.getElementById('quicktools-root');
    if (!host) {
      host = document.createElement('div');
      host.id = 'quicktools-root';
      document.body.appendChild(host);
    }
    ReactDOM.createRoot(host).render(<QuickTools/>);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mount);
  else mount();
})();
