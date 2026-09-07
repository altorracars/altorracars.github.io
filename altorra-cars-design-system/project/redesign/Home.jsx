// Altorra · Cinematic Home v2 — Real assets, richer motion
// Editorial. Fotografía dominante. Motion fino y constante.

const { useState, useEffect, useRef, useMemo } = React;

// ---------- Real-ish inventory based on vehicle-slugs.json ----------
const VEHICLES = [
  { id: "mazda3-2026",       brand: "Mazda",      logo: "Mazda.webp",      model: "Mazda 3 Grand Touring",   variant: "LX Carbon",   year: 2026, km: "0 km",        price: "$98.500.000", tag: "Recién llegado",   img: "multimedia/categories/SEDAN.jpg",     tint: "#7a1a1a" },
  { id: "prado-2021",        brand: "Toyota",     logo: "Toyota.webp",     model: "Toyota Prado TXL",        variant: "Diésel",      year: 2021, km: "48.000 km",   price: "$215.000.000", tag: "Premium",          img: "multimedia/categories/SUV.jpg",       tint: "#1b2a1b" },
  { id: "corolla-cross-25",  brand: "Toyota",     logo: "Toyota.webp",     model: "Corolla Cross SEG",       variant: "Híbrido",     year: 2025, km: "8.500 km",    price: "$135.000.000", tag: "Híbrido",          img: "multimedia/banner/b_toyota.png",      tint: "#1f2937" },
  { id: "duster-2023",       brand: "Renault",    logo: "Renault.webp",    model: "Renault Duster Intens",   variant: "Outsider",    year: 2023, km: "22.000 km",   price: "$78.900.000",  tag: "Outsider",         img: "multimedia/categories/CAMIONETAS.jpg", tint: "#3a2d1a" },
  { id: "tcross-2021",       brand: "Volkswagen", logo: "Volkswagen.webp", model: "Volkswagen T-Cross",      variant: "Comfortline", year: 2021, km: "36.000 km",   price: "$72.000.000",  tag: "Llegada nueva",    img: "multimedia/categories/HATCHBACK.jpg", tint: "#1a2438" },
  { id: "kicks-pulse-23",    brand: "Fiat",       logo: "FIAT.webp",       model: "Fiat Pulse Drive",        variant: "1.3 CVT",     year: 2023, km: "18.000 km",   price: "$62.500.000",  tag: "Bajo kilometraje", img: "multimedia/categories/SEDAN.jpg",     tint: "#5c1418" },
  { id: "sportage-2020",     brand: "Kia",        logo: "Kia.webp",        model: "Kia Sportage Desire",     variant: "AT",          year: 2020, km: "54.000 km",   price: "$82.000.000",  tag: "Familiar",         img: "multimedia/categories/SUV.jpg",       tint: "#0f1a2e" },
  { id: "hilux-2018",        brand: "Toyota",     logo: "Toyota.webp",     model: "Toyota Hilux 4x4",        variant: "Doble cabina",year: 2018, km: "78.000 km",   price: "$135.000.000", tag: "Off-road",         img: "multimedia/categories/PICKUP.jpg",    tint: "#2a1f12" },
];

const BRANDS = ["Audi","BMW","Chevrolet","FIAT","Ford","Honda","Hyundai","Jeep","Kia","Mazda","Mitsubishi","Nissan","Renault","Suzuki","Toyota","Volkswagen"];

const CATEGORIES = [
  { id: "suv",       name: "SUV",       count: "36 unidades", img: "multimedia/categories/SUV.jpg",       href: "catalog.html?type=suv" },
  { id: "sedan",     name: "Sedán",     count: "22 unidades", img: "multimedia/categories/SEDAN.jpg",     href: "catalog.html?type=sedan" },
  { id: "pickup",    name: "Pickup",    count: "14 unidades", img: "multimedia/categories/PICKUP.jpg",    href: "catalog.html?type=pickup" },
  { id: "hatchback", name: "Hatchback", count: "18 unidades", img: "multimedia/categories/HATCHBACK.jpg", href: "catalog.html?type=hatchback" },
];

// ============================================================
// HOOKS
// ============================================================
function useInView(ref, opts = {}) {
  const [seen, setSeen] = useState(false);
  const optsRef = useRef(opts);
  useEffect(() => {
    if (!ref.current || seen) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setSeen(true); io.disconnect(); }
    }, { threshold: 0.25, ...optsRef.current });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [ref, seen]);
  return seen;
}

function useScrollProgress() {
  useEffect(() => {
    const el = document.querySelector(".cin-scroll-progress");
    if (!el) return;
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const p = max > 0 ? Math.min(100, (window.scrollY / max) * 100) : 0;
      el.style.setProperty("--p", p + "%");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}

// ============================================================
// Word reveal
// ============================================================
function WordReveal({ text, delay = 0, stagger = 80, className }) {
  const parts = text.split(/(\s+)/);
  let i = 0;
  return (
    <span className={className}>
      {parts.map((p, idx) => {
        if (/^\s+$/.test(p)) return <span key={idx}>{p}</span>;
        const d = delay + i * stagger;
        i++;
        return <span key={idx} className="cin-word" style={{ animationDelay: `${d}ms` }}>{p}</span>;
      })}
    </span>
  );
}

// ============================================================
// Magnetic wrapper (button/link follows cursor a touch)
// ============================================================
function Magnet({ strength = 0.25, children, className, ...rest }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate3d(${x * strength}px, ${y * strength}px, 0)`;
    };
    const onLeave = () => { el.style.transform = ""; };
    const parent = el.parentElement;
    parent.addEventListener("mousemove", onMove);
    parent.addEventListener("mouseleave", onLeave);
    return () => {
      parent.removeEventListener("mousemove", onMove);
      parent.removeEventListener("mouseleave", onLeave);
    };
  }, [strength]);
  return <span ref={ref} className={`cin-magnet ${className||""}`} {...rest}>{children}</span>;
}

// ============================================================
// Cursor light
// ============================================================
function CursorLight({ targetRef }) {
  const lightRef = useRef(null);
  useEffect(() => {
    const light = lightRef.current;
    const target = targetRef.current;
    if (!light || !target) return;
    let raf = null, tx = 0, ty = 0, x = 0, y = 0, active = false;
    const onMove = (e) => {
      const r = target.getBoundingClientRect();
      tx = e.clientX; ty = e.clientY;
      const inside = e.clientY > r.top && e.clientY < r.bottom;
      if (inside && !active) { active = true; light.classList.add("cin-cursor-light--on"); }
      else if (!inside && active) { active = false; light.classList.remove("cin-cursor-light--on"); }
      if (!raf) raf = requestAnimationFrame(tick);
    };
    const tick = () => {
      x += (tx - x) * 0.14;
      y += (ty - y) * 0.14;
      light.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
      if (Math.abs(tx - x) > 0.4 || Math.abs(ty - y) > 0.4) raf = requestAnimationFrame(tick);
      else raf = null;
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => { window.removeEventListener("mousemove", onMove); if (raf) cancelAnimationFrame(raf); };
  }, [targetRef]);
  return <div ref={lightRef} className="cin-cursor-light" aria-hidden="true" />;
}

// ============================================================
// HERO — parallax bg + cursor light + word reveal + magnetic scroll cue
// ============================================================
function CinHero() {
  const heroRef = useRef(null);
  const bgRef = useRef(null);

  // Parallax bg on scroll only — sin movimiento por mouse
  useEffect(() => {
    const bg = bgRef.current;
    if (!bg) return;
    let sy = 0, raf = null;
    const apply = () => {
      bg.style.transform = `scale(1.08) translate3d(0, ${sy}px, 0)`;
      raf = null;
    };
    const onScroll = () => { sy = window.scrollY * 0.18; if (!raf) raf = requestAnimationFrame(apply); };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  const today = useMemo(() => {
    const d = new Date();
    const months = ["ene","feb","mar","abr","may","jun","jul","ago","sep","oct","nov","dic"];
    return `${String(d.getDate()).padStart(2,"0")} · ${months[d.getMonth()]} · ${d.getFullYear()}`;
  }, []);

  const [coTime, setCoTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('es-CO', {
      hour: '2-digit', minute: '2-digit', hour12: false, timeZone: 'America/Bogota',
    });
    const tick = () => setCoTime(fmt.format(new Date()) + ' COL');
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section ref={heroRef} className="cin-hero" data-screen-label="01 Hero">
      <div ref={bgRef} className="cin-hero-bg" aria-hidden="true" />
      <div className="cin-grain" aria-hidden="true" />

      <header className="cin-hero-meta">
        <div><span className="cin-pulse" aria-hidden="true" />Concesionario Líder en Cartagena</div>
        <div className="cin-hero-meta-r">{today} · {coTime}</div>
      </header>

      <div className="cin-hero-stage">
        <h1 className="cin-headline">
          <WordReveal text="Encuentra el Auto" delay={150} stagger={95} />
          <br />
          <span className="cin-headline-accent">
            <span className="cin-word" style={{ animationDelay: "560ms" }}>de</span>{" "}
            <span className="cin-word" style={{ animationDelay: "660ms" }}>tus</span>{" "}
            <span className="cin-word" style={{ animationDelay: "760ms" }}>Sueños</span>
          </span>
        </h1>
      </div>

      <footer className="cin-hero-foot">
        <div className="cin-hero-foot-l">
          <b>+90 vehículos</b> de aliados estratégicos en Colombia.
          Conectamos compradores con los mejores concesionarios del país.
        </div>
        <HeroSearch/>
        <div className="cin-hero-foot-r">
          <b>Vende con nosotros</b><br/>
          Te ayudamos a vender al mejor precio del mercado.
        </div>
      </footer>
    </section>
  );
}

// ============================================================
// HeroSearch — barra de búsqueda inteligente con autocompletado
// ============================================================
function HeroSearch() {
  const [q, setQ] = useState('');
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(-1);
  const wrapRef = useRef(null);
  const data = window.AltorraData;

  const POOL = useMemo(() => {
    if (!data || !data.VEHICLES) return [];
    const v = data.VEHICLES.map(x => ({
      kind: 'vehicle',
      id: x.id,
      label: `${x.brandName} ${x.model}`,
      sub: `${x.year} · ${x.color || ''}`.trim(),
      href: `detail.html?id=${x.id}`,
      key: `v-${x.id}`,
    }));
    const b = data.BRANDS.map(x => ({
      kind: 'brand',
      id: x.slug,
      label: x.name,
      sub: 'Ver todos los modelos',
      href: `brand.html?b=${x.slug}`,
      key: `b-${x.slug}`,
    }));
    const c = data.CATEGORIES.map(x => ({
      kind: 'cat',
      id: x.slug,
      label: x.name,
      sub: 'Categoría',
      href: `catalog.html?cat=${x.slug}`,
      key: `c-${x.slug}`,
    }));
    return [...v, ...b, ...c];
  }, [data]);

  const results = useMemo(() => {
    const s = q.trim().toLowerCase();
    if (!s) return [];
    return POOL.filter(r => r.label.toLowerCase().includes(s) || r.sub.toLowerCase().includes(s)).slice(0, 7);
  }, [q, POOL]);

  useEffect(() => {
    const onDown = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  const submit = (e) => {
    e.preventDefault();
    if (active >= 0 && results[active]) {
      window.location.href = results[active].href;
    } else if (q.trim()) {
      window.location.href = `catalog.html?q=${encodeURIComponent(q.trim())}`;
    }
  };

  const onKey = (e) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setActive(a => Math.min(results.length - 1, a + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActive(a => Math.max(-1, a - 1)); }
    else if (e.key === 'Escape') setOpen(false);
  };

  const ICON_BY_KIND = {
    vehicle: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M5 14l1.7-5.1A2 2 0 0 1 8.6 8h6.8a2 2 0 0 1 1.9 1.4L19 14M5 14h14M5 14v3a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-3M19 14v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-3"/></svg>,
    brand:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><circle cx="12" cy="12" r="9"/><path d="M12 3a14 14 0 0 1 0 18M12 3a14 14 0 0 0 0 18M3 12h18"/></svg>,
    cat:     <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>,
  };

  return (
    <form ref={wrapRef} className={`hero-search ${open && results.length ? 'is-open' : ''}`} onSubmit={submit} role="search" aria-label="Búsqueda inteligente">
      <span className="hero-search-icon" aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>
      </span>
      <input
        type="text"
        value={q}
        onChange={(e) => { setQ(e.target.value); setOpen(true); setActive(-1); }}
        onFocus={() => setOpen(true)}
        onKeyDown={onKey}
        placeholder="Busca por marca, modelo o año…"
        autoComplete="off"
        aria-autocomplete="list"
      />
      {q && (
        <button type="button" className="hero-search-clear" onClick={() => { setQ(''); setActive(-1); }} aria-label="Borrar">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 6 18 18M6 18 18 6"/></svg>
        </button>
      )}
      <button type="submit" className="hero-search-submit" aria-label="Buscar">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
      </button>

      {open && results.length > 0 && (
        <div className="hero-search-dropdown" role="listbox">
          {results.map((r, i) => (
            <a
              key={r.key}
              href={r.href}
              className={`hero-search-item ${i === active ? 'is-active' : ''}`}
              onMouseEnter={() => setActive(i)}
              role="option"
              aria-selected={i === active}
            >
              <span className="hero-search-kind">{ICON_BY_KIND[r.kind]}</span>
              <span className="hero-search-meta">
                <span className="hero-search-label">{r.label}</span>
                <span className="hero-search-sub">{r.sub}</span>
              </span>
              <span className="hero-search-go">→</span>
            </a>
          ))}
        </div>
      )}
    </form>
  );
}

// ============================================================
// MARCAS — single marquee with real logos
// ============================================================
function CinBrands() {
  const row = [...BRANDS, ...BRANDS];
  return (
    <section className="cin-brands" id="marcas" data-screen-label="02 Marcas">
      <div className="cin-brands-head">
        <h2 className="cin-brands-h">
          16 marcas. <em>Una vitrina.</em>
        </h2>
        <p className="cin-brands-aside">
          Del Renault Twingo al Toyota Prado. Inventario rotativo cada semana —
          si la marca está, la tenemos lista para mostrar.
        </p>
      </div>

      <div className="cin-marquee">
        <div className="cin-marquee-track">
          {row.map((b, i) => (
            <a key={`r-${i}`} href={`brand.html?b=${b.toLowerCase()}`} className="cin-brand" aria-label={b}>
              <img src={`multimedia/Logos/${b}.webp`} alt={b} loading="lazy" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// COLECCIÓN — horizontal vehicles, drag-to-scroll, snap, nav buttons
// ============================================================
function CinCollection() {
  const trackRef = useRef(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const t = trackRef.current; if (!t) return;
    const upd = () => {
      setCanPrev(t.scrollLeft > 8);
      setCanNext(t.scrollLeft < t.scrollWidth - t.clientWidth - 8);
    };
    upd();
    t.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);

    // Drag-to-scroll
    let isDown = false, startX = 0, startSL = 0;
    const md = (e) => { isDown = true; startX = e.pageX; startSL = t.scrollLeft; t.style.scrollSnapType = "none"; };
    const mu = () => { isDown = false; t.style.scrollSnapType = ""; };
    const mm = (e) => { if (!isDown) return; t.scrollLeft = startSL - (e.pageX - startX); };
    t.addEventListener("mousedown", md);
    window.addEventListener("mouseup", mu);
    t.addEventListener("mousemove", mm);
    return () => {
      t.removeEventListener("scroll", upd);
      window.removeEventListener("resize", upd);
      t.removeEventListener("mousedown", md);
      window.removeEventListener("mouseup", mu);
      t.removeEventListener("mousemove", mm);
    };
  }, []);

  const nudge = (dir) => {
    const t = trackRef.current; if (!t) return;
    const card = t.querySelector(".cin-card");
    const step = card ? card.getBoundingClientRect().width + 24 : 360;
    t.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  return (
    <section className="cin-collection" data-screen-label="03 Vehículos">
      <div className="cin-collection-head">
        <h2 className="cin-collection-h">
          La colección, <em>esta semana</em>.
        </h2>
        <p className="cin-collection-aside">
          Llegadas seleccionadas con historial verificado y documentación lista.
          Coordinamos visita o entrega con el aliado que tenga el vehículo.
        </p>
      </div>

      <div className="cin-track-wrap">
        <button className="cin-nav cin-nav--prev" disabled={!canPrev} onClick={() => nudge(-1)} aria-label="Anterior">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button className="cin-nav cin-nav--next" disabled={!canNext} onClick={() => nudge(1)} aria-label="Siguiente">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 6l6 6-6 6"/></svg>
        </button>

        <div className="cin-track" ref={trackRef}>
          {VEHICLES.map((v) => (
            <a key={v.id} href={`detail.html?id=${v.id}`} className="cin-card" aria-label={`${v.brand} ${v.model}`}>
              <div className="cin-card-media" style={{ backgroundImage: `linear-gradient(160deg, ${v.tint}aa, ${v.tint}55), url(${v.img})` }} />
              <div className="cin-card-brand-mark">
                <img src={`multimedia/Logos/${v.logo}`} alt={v.brand} />
              </div>
              <div className="cin-card-info">
                <span className="cin-card-tag">{v.tag}</span>
                <div className="cin-card-brand">{v.brand} · {v.variant}</div>
                <div className="cin-card-model">{v.model}</div>
                <div className="cin-card-foot">
                  <span>{v.year} · {v.km}</span>
                  <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <strong>{v.price}</strong>
                    <span className="cin-card-arrow">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                        <path d="M5 12h14M13 5l7 7-7 7"/>
                      </svg>
                    </span>
                  </span>
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CATEGORÍAS — editorial 2x2 with masked reveal
// ============================================================
function CinCats() {
  return (
    <section className="cin-cats" data-screen-label="04 Categorías">
      <div className="cin-cats-head">
        <h2 className="cin-cats-h">
          Empieza por <em>cómo lo manejas</em>.
        </h2>
        <p className="cin-collection-aside">Filtra por tipo. Sigue por marca, precio o año.</p>
      </div>
      <div className="cin-cats-grid">
        {CATEGORIES.map((c) => (
          <a key={c.id} href={c.href} className="cin-cat">
            <div className="cin-cat-img" style={{ backgroundImage: `url(${c.img})` }} />
            <div className="cin-cat-label">
              <span className="cin-cat-name">{c.name}</span>
              <span className="cin-cat-count">{c.count}</span>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

// ============================================================
// PROMOS — Banners promocionales con swipe touch/mouse
// Imagen full-bleed · CTA shimmer · auto-rotate con progress
// Soporta swipe horizontal en móvil + drag en desktop
// ============================================================
const PROMOS = [
  {
    id: 'black-week',
    tag: 'BLACK WEEK',
    tagColor: '#dc2626',
    tagIcon: 'fire',
    eyebrow: 'Solo del 24 al 30 de noviembre',
    title: 'Hasta <em>15% off</em> en 23 modelos seleccionados.',
    sub: 'Aliados aplican descuentos directos sobre el precio publicado. Stock limitado — los modelos se reservan en orden de solicitud.',
    badges: ['23 unidades', 'Descuentos reales', 'Sin letras chicas'],
    metric: { label: 'Mejor oferta', value: '$58M', suffix: '· precio final' },
    cta: { label: 'Ver ofertas', action: '/catalog.html?promo=blackweek' },
    img: 'multimedia/categories/SEDAN.jpg',
    accent: '#dc2626',
    accent2: '#7c2d12',
  },
  {
    id: 'financiacion',
    tag: 'FINANCIACIÓN PREMIUM',
    tagColor: '#D4A85A',
    tagIcon: 'spark',
    eyebrow: 'Tasa preferencial · solo este mes',
    title: 'Aprobado en <em>24 horas</em>. Sin sorpresas.',
    sub: 'Tasa desde 0.95% MV con SUFI, Davivienda y Finandina. Cuota inicial desde 30% y plazos hasta 84 meses. Aprobación pre-bureau en línea.',
    badges: ['5 bancos aliados', 'Hasta 84 meses', '0% inicial disponible'],
    metric: { label: 'Tasa desde', value: '0.95%', suffix: 'MV' },
    cta: { label: 'Simular crédito', action: '/simulator.html' },
    img: 'multimedia/categories/SUV.jpg',
    accent: '#D4A85A',
    accent2: '#8a6a2c',
  },
  {
    id: 'permuta',
    tag: 'PERMUTA + BONO',
    tagColor: '#10b981',
    tagIcon: 'swap',
    eyebrow: 'Cambia y suma · bono extra incluido',
    title: 'Tu carro como inicial + <em>$3M de bono</em>.',
    sub: 'Avalúo gratuito en 48h, recibimos hasta 18 marcas como parte de pago. Bono extra de $3.000.000 sobre tu nuevo vehículo si concretas en menos de 15 días.',
    badges: ['Avalúo gratuito', '18 marcas aceptadas', 'Bono $3M en nuevo'],
    metric: { label: 'Bono extra', value: '$3M', suffix: '· en tu nuevo' },
    cta: { label: 'Valorar mi auto', action: 'sell' },
    img: 'multimedia/categories/PICKUP.jpg',
    accent: '#10b981',
    accent2: '#065f46',
  },
  {
    id: 'test-drive',
    tag: 'TEST DRIVE 48H',
    tagColor: '#3b82f6',
    tagIcon: 'clock',
    eyebrow: 'Pruébalo · decide después',
    title: 'Manéjalo <em>48 horas</em> antes de comprarlo.',
    sub: 'Reserva el carro que te interesa y manéjalo 2 días en tu ciudad. Sin compromiso de compra. Seguro completo cubierto por Altorra durante la prueba.',
    badges: ['Sin compromiso', 'Seguro incluido', '32 ciudades'],
    metric: { label: 'Disponible en', value: '32', suffix: 'ciudades' },
    cta: { label: 'Agendar prueba', action: 'appointment' },
    img: 'multimedia/categories/HATCHBACK.jpg',
    accent: '#3b82f6',
    accent2: '#1e3a8a',
  },
];

const PROMO_ICONS = {
  fire: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M13.5.67s.74 2.65.74 4.8c0 2.06-1.35 3.73-3.41 3.73-2.07 0-3.63-1.67-3.63-3.73l.03-.36C5.21 7.51 4 10.62 4 14c0 4.42 3.58 8 8 8s8-3.58 8-8C20 8.61 17.41 3.8 13.5.67zM11.71 19c-1.78 0-3.22-1.4-3.22-3.14 0-1.62 1.05-2.76 2.81-3.12 1.77-.36 3.6-1.21 4.62-2.58.39 1.29.59 2.65.59 4.04 0 2.65-2.15 4.8-4.8 4.8z"/>
    </svg>
  ),
  spark: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2 L13.5 8.5 L20 10 L13.5 11.5 L12 18 L10.5 11.5 L4 10 L10.5 8.5 Z"/>
      <path d="M18 14 L19 17 L22 18 L19 19 L18 22 L17 19 L14 18 L17 17 Z" opacity="0.65"/>
    </svg>
  ),
  swap: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M7 10h14M7 10l4-4M7 10l4 4"/>
      <path d="M17 14H3M17 14l-4-4M17 14l-4 4"/>
    </svg>
  ),
  clock: (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9"/>
      <polyline points="12 7 12 12 15 14"/>
    </svg>
  ),
};

function CinPrograms() {
  // Infinite loop: render [lastClone, ...PROMOS, firstClone], track extended idx 1..total
  // Teleport on transitionend when we land on a clone (0 or total+1)
  const total = PROMOS.length;
  const EXTENDED = [PROMOS[total - 1], ...PROMOS, PROMOS[0]];
  const [extIdx, setExtIdx] = useState(1);
  const [withTransition, setWithTransition] = useState(true);
  const [paused, setPaused] = useState(false);
  const wrapRef = useRef(null);
  const trackRef = useRef(null);
  const inView = useInView(wrapRef, { threshold: 0.2 });
  const DUR = 7000;
  const onClone = extIdx === 0 || extIdx === total + 1;

  // Safety clamp — defends against stale timers / throttled tabs / race conditions
  // that could push extIdx outside the valid track range and show a blank slide.
  useEffect(() => {
    if (extIdx < 0) { setWithTransition(false); setExtIdx(total); }
    else if (extIdx > total + 1) { setWithTransition(false); setExtIdx(1); }
  }, [extIdx, total]);

  // Reset to a sane index when tab becomes visible after being hidden
  useEffect(() => {
    const onVis = () => {
      if (!document.hidden) {
        if (extIdx === 0 || extIdx === total + 1 || extIdx < 0 || extIdx > total + 1) {
          setWithTransition(false);
          setExtIdx(1);
        }
      }
    };
    document.addEventListener('visibilitychange', onVis);
    return () => document.removeEventListener('visibilitychange', onVis);
  }, [extIdx, total]);

  // Auto-rotate — pause while on a clone (teleport about to fire)
  useEffect(() => {
    if (!inView || paused || onClone) return;
    const t = setTimeout(() => goto(extIdx + 1), DUR);
    return () => clearTimeout(t);
  }, [extIdx, paused, inView, onClone]);

  const goto = (next) => {
    if (onClone) return; // ignore while teleporting
    // Clamp at boundaries — never let extIdx leave the rendered track
    if (next < 0) next = 0;
    if (next > total + 1) next = total + 1;
    setWithTransition(true);
    setExtIdx(next);
  };

  // Triggered by track CSS transitionend — if landed on a clone, teleport
  const handleTransitionEnd = (e) => {
    if (e.propertyName !== 'transform') return;
    if (extIdx === 0) { setWithTransition(false); setExtIdx(total); }
    else if (extIdx === total + 1) { setWithTransition(false); setExtIdx(1); }
  };

  // Re-enable transition the frame after a teleport
  useEffect(() => {
    if (withTransition) return;
    const t = setTimeout(() => setWithTransition(true), 50);
    return () => clearTimeout(t);
  }, [withTransition]);

  // Swipe / drag
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let startX = 0, startY = 0, dragging = false, deltaX = 0;
    const THRESHOLD = 140;
    const start = (x, y) => { dragging = true; startX = x; startY = y; deltaX = 0; setPaused(true); el.style.transition = 'none'; };
    const move = (x, y) => {
      if (!dragging) return;
      deltaX = x - startX;
      const dy = Math.abs(y - startY);
      if (dy > Math.abs(deltaX) && dy > 20) { dragging = false; el.style.transition = ''; return; }
      el.style.transform = `translate3d(calc(${-extIdx * 100}% + ${deltaX}px), 0, 0)`;
    };
    const end = () => {
      if (!dragging) return;
      dragging = false;
      if (Math.abs(deltaX) > THRESHOLD) {
        // Real swipe — clear inline, React's style will apply new transform with transition
        el.style.transition = '';
        el.style.transform = '';
        goto(extIdx + (deltaX < 0 ? 1 : -1));
      } else {
        // Small drag — snap back smoothly to current slide
        el.style.transition = 'transform 360ms cubic-bezier(0.22, 1, 0.36, 1)';
        el.style.transform = `translate3d(-${extIdx * 100}%, 0, 0)`;
        setTimeout(() => {
          // Clear so React takes back control
          el.style.transition = '';
          el.style.transform = '';
        }, 380);
      }
      deltaX = 0;
      setTimeout(() => setPaused(false), 600);
    };
    const touchStart = (e) => start(e.touches[0].clientX, e.touches[0].clientY);
    const touchMove = (e) => move(e.touches[0].clientX, e.touches[0].clientY);
    const touchEnd = () => end();
    const mouseDown = (e) => { e.preventDefault(); start(e.clientX, e.clientY); };
    const mouseMove = (e) => move(e.clientX, e.clientY);
    const mouseUp = () => end();
    const mouseLeave = () => { if (dragging) end(); };
    el.addEventListener('touchstart', touchStart, { passive: true });
    el.addEventListener('touchmove', touchMove, { passive: true });
    el.addEventListener('touchend', touchEnd);
    el.addEventListener('mousedown', mouseDown);
    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseup', mouseUp);
    el.addEventListener('mouseleave', mouseLeave);
    return () => {
      el.removeEventListener('touchstart', touchStart);
      el.removeEventListener('touchmove', touchMove);
      el.removeEventListener('touchend', touchEnd);
      el.removeEventListener('mousedown', mouseDown);
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseup', mouseUp);
      el.removeEventListener('mouseleave', mouseLeave);
    };
  }, [extIdx]);

  const handleCTA = (action) => {
    if (action.startsWith('/')) window.location.href = action.slice(1);
    else if (window.AltorraModals && ['sell','finance','appointment','ask','auth'].includes(action)) {
      window.AltorraModals.open(action);
    }
  };

  return (
    <section
      ref={wrapRef}
      className={`promo-section ${inView ? 'is-in' : ''}`}
      data-screen-label="02 Promos"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div className="promo-head">
        <span className="cin-eyebrow">Promos y programas Altorra</span>
        <h2 className="promo-h">Lo que está pasando <em>esta semana</em>.</h2>
      </div>

      <div className="promo-stage">
        <div
          className="promo-track"
          ref={trackRef}
          onTransitionEnd={handleTransitionEnd}
          style={{
            transform: `translate3d(-${extIdx * 100}%, 0, 0)`,
            transition: withTransition ? 'transform 720ms cubic-bezier(0.22, 1, 0.36, 1)' : 'none',
          }}
        >
          {EXTENDED.map((p, i) => (
            <article key={`${p.id}-${i}`} className="promo-slide" style={{ '--accent': p.accent, '--accent2': p.accent2 }}>
              <div className="promo-bg" style={{ backgroundImage: `url(${p.img})` }} aria-hidden="true"/>
              <div className="promo-vignette" style={{
                background: `linear-gradient(110deg, rgba(8,7,10,0.95) 0%, rgba(8,7,10,0.75) 35%, rgba(8,7,10,0.45) 70%, rgba(8,7,10,0.85) 100%), radial-gradient(60% 50% at 80% 50%, ${p.accent}22, transparent 60%)`
              }} aria-hidden="true"/>
              <div className="promo-grain" aria-hidden="true"/>

              <div className="promo-content">
                <div className="promo-content-l">
                  <span className="promo-tag" style={{ color: p.tagColor, background: `${p.tagColor}1a`, borderColor: `${p.tagColor}66` }}>
                    <span className="promo-tag-icon" aria-hidden="true">{PROMO_ICONS[p.tagIcon]}</span>
                    {p.tag}
                  </span>
                  <span className="promo-eyebrow">{p.eyebrow}</span>
                  <h3 className="promo-title" dangerouslySetInnerHTML={{ __html: p.title }}/>
                  <p className="promo-sub">{p.sub}</p>
                  <ul className="promo-badges">
                    {p.badges.map((b, j) => (
                      <li key={j}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        {b}
                      </li>
                    ))}
                  </ul>
                  <button type="button" className="promo-cta" onClick={() => handleCTA(p.cta.action)}>
                    {p.cta.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M5 12h14M13 5l7 7-7 7"/>
                    </svg>
                    <span className="promo-cta-shine" aria-hidden="true"/>
                  </button>
                </div>
              </div>

              <div className="promo-metric">
                <span className="promo-metric-label">{p.metric.label}</span>
                <span className="promo-metric-value">{p.metric.value}<em>{p.metric.suffix}</em></span>
              </div>
            </article>
          ))}
        </div>

        <button type="button" className="promo-arrow promo-arrow--prev" onClick={() => goto(extIdx - 1)} aria-label="Anterior">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button type="button" className="promo-arrow promo-arrow--next" onClick={() => goto(extIdx + 1)} aria-label="Siguiente">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
      </div>
    </section>
  );
}

// ============================================================
// AVAILABLE — Vehículos disponibles, HarmonyOS card grid carrusel
// (Mirror del oficial pero elevado: borders escaneados, hover dossier)
// ============================================================
const AVAILABLE = [
  { id: "cerato-2015",  brand: "Kia",     model: "Cerato PRO",    year: 2015, trans: "Mecánica",   km: "65.500 km",  engine: "1.6L", price: "$46.000.000", was: "$47.000.000", chips: ["OFERTA", "USADO"], img: "multimedia/categories/SEDAN.jpg",     tint: "#1a1f2e" },
  { id: "k3-2025",      brand: "Kia",     model: "K3 Vibrant",    year: 2025, trans: "Automática", km: "21.000 km",  engine: "1.6L", price: "$93.000.000",                       chips: ["USADO"],            img: "multimedia/categories/SEDAN.jpg",     tint: "#2a2520" },
  { id: "sportage-2020",brand: "Kia",     model: "Sportage Desire",year: 2020,trans: "Automática", km: "97.000 km",  engine: "2.0L", price: "$88.000.000", was: "$89.000.000", chips: ["OFERTA", "USADO"], img: "multimedia/categories/SUV.jpg",       tint: "#1c2a1e" },
  { id: "hrv-2019",     brand: "Honda",   model: "HR-V LX",       year: 2019, trans: "Automática", km: "63.492 km",  engine: "1.8L", price: "$79.000.000", was: "$82.000.000", chips: ["OFERTA", "USADO"], img: "multimedia/categories/SUV.jpg",       tint: "#2a1f1c" },
  { id: "tcross-2021b", brand: "Volkswagen", model: "T-Cross Comfort", year: 2021, trans: "Automática", km: "36.000 km", engine: "1.6L", price: "$72.000.000", chips: ["USADO"], img: "multimedia/categories/HATCHBACK.jpg", tint: "#1a2438" },
  { id: "hilux-2018b",  brand: "Toyota",  model: "Hilux 4x4",     year: 2018, trans: "Automática", km: "78.000 km",  engine: "2.4L", price: "$135.000.000",                      chips: ["USADO"],            img: "multimedia/categories/PICKUP.jpg",    tint: "#2a1f12" },
];

function CinAvailable() {
  const trackRef = useRef(null);
  const [favs, setFavs] = useState(() => new Set());
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  useEffect(() => {
    const t = trackRef.current; if (!t) return;
    const upd = () => {
      setCanPrev(t.scrollLeft > 8);
      setCanNext(t.scrollLeft < t.scrollWidth - t.clientWidth - 8);
    };
    upd();
    t.addEventListener("scroll", upd, { passive: true });
    window.addEventListener("resize", upd);
    return () => {
      t.removeEventListener("scroll", upd);
      window.removeEventListener("resize", upd);
    };
  }, []);

  const nudge = (dir) => {
    const t = trackRef.current; if (!t) return;
    const card = t.querySelector(".cin-av-card");
    const step = card ? card.getBoundingClientRect().width + 24 : 360;
    t.scrollBy({ left: dir * step, behavior: "smooth" });
  };

  const toggleFav = (id) => {
    setFavs((prev) => {
      const n = new Set(prev);
      n.has(id) ? n.delete(id) : n.add(id);
      return n;
    });
  };

  return (
    <section className="cin-av" data-screen-label="05 Disponibles">
      <div className="cin-av-head">
        <h2 className="cin-av-h">
          Vehículos <em>disponibles</em>.
        </h2>
        <a href="catalog.html" className="cin-av-all">
          Ver todos
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M5 12h14M13 5l7 7-7 7"/>
          </svg>
        </a>
      </div>

      <div className="cin-av-track-wrap">
        <button className="cin-nav cin-nav--prev" disabled={!canPrev} onClick={() => nudge(-1)} aria-label="Anterior">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M15 18l-6-6 6-6"/></svg>
        </button>
        <button className="cin-nav cin-nav--next" disabled={!canNext} onClick={() => nudge(1)} aria-label="Siguiente">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M9 6l6 6-6 6"/></svg>
        </button>

        <div className="cin-av-track" ref={trackRef}>
          {AVAILABLE.map((v) => {
            const isFav = favs.has(v.id);
            return (
              <a key={v.id} href={`detail.html?id=${v.id}`} className="cin-av-card">
                <div
                  className="cin-av-img"
                  style={{ backgroundImage: `linear-gradient(160deg, ${v.tint}aa, ${v.tint}55), url(${v.img})` }}
                >
                  <div className="cin-av-chips">
                    {v.chips.map((c) => (
                      <span key={c} className={`cin-av-chip cin-av-chip--${c === "OFERTA" ? "offer" : "used"}`}>{c}</span>
                    ))}
                  </div>
                  <button
                    type="button"
                    className={`cin-av-fav ${isFav ? "is-on" : ""}`}
                    onClick={(e) => { e.preventDefault(); toggleFav(v.id); }}
                    aria-label="Favorito"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill={isFav ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.8">
                      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z"/>
                    </svg>
                  </button>
                  <span className="cin-av-compare" aria-hidden="true">
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
                    COMPARAR
                  </span>
                </div>
                <div className="cin-av-body">
                  <h3 className="cin-av-title">{v.brand} <strong>{v.model}</strong> <span>{v.year}</span></h3>
                  <div className="cin-av-specs">
                    <span>{v.trans}</span><i>·</i><span>{v.km}</span><i>·</i><span>{v.engine}</span>
                  </div>
                  <div className="cin-av-rule" />
                  <div className="cin-av-price">
                    {v.was && <span className="cin-av-was">{v.was}</span>}
                    <span className="cin-av-now">{v.price}</span>
                  </div>
                </div>
                <span className="cin-av-glow" aria-hidden="true" />
                <span className="cin-av-corner cin-av-corner--tl" />
                <span className="cin-av-corner cin-av-corner--tr" />
                <span className="cin-av-corner cin-av-corner--bl" />
                <span className="cin-av-corner cin-av-corner--br" />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// ============================================================
// TRAIL — Vistos recientemente, reimaginado como rastro tactil
// Card grande central + 4 miniaturas en escalera. Click swap.
// ============================================================
const TRAIL_INITIAL = [
  { id: "prado-2021",       brand: "Toyota",     model: "Prado TXL",          year: 2021, price: "$215.000.000", at: "Hace 5 min",  img: "multimedia/categories/SUV.jpg",       tint: "#1b2a1b" },
  { id: "rs6-tr",           brand: "Audi",       model: "RS6 Avant",          year: 2023, price: "$178.000.000", at: "Hace 12 min", img: "multimedia/categories/SEDAN.jpg",     tint: "#181822" },
  { id: "k3-tr",            brand: "Kia",        model: "K3 Vibrant",         year: 2025, price: "$93.000.000",  at: "Hace 1 h",    img: "multimedia/categories/HATCHBACK.jpg", tint: "#2a2520" },
  { id: "cerato-tr",        brand: "Kia",        model: "Cerato PRO",         year: 2015, price: "$46.000.000",  at: "Ayer · 18:42",img: "multimedia/categories/SEDAN.jpg",     tint: "#1a1f2e" },
  { id: "hilux-tr",         brand: "Toyota",     model: "Hilux 4x4",          year: 2018, price: "$135.000.000", at: "Hace 2 días", img: "multimedia/categories/PICKUP.jpg",    tint: "#2a1f12" },
];

function CinTrail() {
  const [items, setItems] = useState(TRAIL_INITIAL);
  const [animating, setAnimating] = useState(false);
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, { threshold: 0.3 });
  const active = items[0];

  const bringForward = (id) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setItems((prev) => {
        const idx = prev.findIndex((x) => x.id === id);
        if (idx <= 0) return prev;
        const next = [prev[idx], ...prev.slice(0, idx), ...prev.slice(idx + 1)];
        return next;
      });
      setTimeout(() => setAnimating(false), 600);
    }, 80);
  };

  const clearTrail = () => setItems([]);

  return (
    <section ref={wrapRef} className={`cin-trail ${inView ? "cin-trail-in" : ""}`} data-screen-label="07 Rastro">
      <div className="cin-trail-head">
        <span className="cin-eyebrow">Tu rastro</span>
        <h2 className="cin-trail-h">Los que <em>volverías a mirar.</em></h2>
        {items.length > 0 && (
          <button className="cin-trail-clear" onClick={clearTrail}>
            Limpiar rastro
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M6 6l12 12M6 18L18 6"/>
            </svg>
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="cin-trail-empty">
          <div className="cin-trail-empty-mark" aria-hidden="true">
            <svg viewBox="0 0 100 100" fill="none">
              <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.8" opacity="0.4" strokeDasharray="3 4"/>
              <path d="M30 50h40M50 30v40" stroke="currentColor" strokeWidth="1" opacity="0.6"/>
            </svg>
          </div>
          <p>Sin rastro todavía. Explora la colección y los que abras quedarán aquí.</p>
        </div>
      ) : (
        <div className="cin-trail-stage">
          <article
            key={active.id}
            className={`cin-trail-main ${animating ? "is-swap" : ""}`}
            style={{ backgroundImage: `linear-gradient(160deg, ${active.tint}cc, ${active.tint}66), url(${active.img})` }}
          >
            <span className="cin-trail-time">{active.at}</span>
            <div className="cin-trail-main-info">
              <span className="cin-trail-brand">{active.brand}</span>
              <h3 className="cin-trail-model">{active.model} · <span>{active.year}</span></h3>
              <div className="cin-trail-foot">
                <span className="cin-trail-price">{active.price}</span>
                <a href={`detail.html?id=${active.id}`} className="cin-trail-go">
                  Continuar
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M5 12h14M13 5l7 7-7 7"/>
                  </svg>
                </a>
              </div>
            </div>
            <span className="cin-trail-corner cin-trail-corner--tl" />
            <span className="cin-trail-corner cin-trail-corner--tr" />
            <span className="cin-trail-corner cin-trail-corner--bl" />
            <span className="cin-trail-corner cin-trail-corner--br" />
          </article>

          <ul className="cin-trail-stack" role="list">
            {items.slice(1).map((it, i) => (
              <li
                key={it.id}
                className="cin-trail-step"
                style={{ "--i": i, backgroundImage: `linear-gradient(160deg, ${it.tint}cc, ${it.tint}77), url(${it.img})` }}
              >
                <button
                  type="button"
                  className="cin-trail-step-btn"
                  onClick={() => bringForward(it.id)}
                  aria-label={`Traer ${it.brand} ${it.model} al frente`}
                >
                  <span className="cin-trail-step-info">
                    <span className="cin-trail-step-brand">{it.brand}</span>
                    <span className="cin-trail-step-model">{it.model}</span>
                  </span>
                  <span className="cin-trail-step-time">{it.at}</span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </section>
  );
}

// ============================================================
// MANIFIESTO — compact, no sticky scroll-mask
// ============================================================
function CinManifesto() {
  const wrapRef = useRef(null);
  const inView = useInView(wrapRef, { threshold: 0.35 });
  return (
    <section ref={wrapRef} className={`cin-manifesto ${inView ? "cin-mani-in" : ""}`} id="manifesto" data-screen-label="05 Manifiesto">
      <div className="cin-manifesto-inner">
        <span className="cin-eyebrow">Manifiesto</span>
        <p className="cin-manifesto-text">
          <span>Cada carro pasa por nuestras manos.</span>{" "}
          <span>Cada cliente, por <em>nuestra historia</em>.</span>{" "}
          <span>No vendemos vehículos —</span> <span><em>acompañamos decisiones</em>.</span>
        </p>
      </div>
    </section>
  );
}

// ============================================================
// CONSIGNA conversacional — with typing indicator before "us" bubbles
// ============================================================
function CinConv() {
  const wrapRef = useRef(null);
  useEffect(() => {
    const wrap = wrapRef.current; if (!wrap) return;
    const bubbles = wrap.querySelectorAll(".cin-bubble");
    const io = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          const idx = Array.from(bubbles).indexOf(en.target);
          setTimeout(() => en.target.classList.add("cin-in"), idx * 140);
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.4 });
    bubbles.forEach((b) => io.observe(b));
    return () => io.disconnect();
  }, []);

  return (
    <section ref={wrapRef} className="cin-conv" data-screen-label="06 Consignación">
      <div className="cin-conv-inner">
        <div className="cin-conv-head">
          <span className="cin-eyebrow">Vende con nosotros</span>
          <h2 className="cin-conv-h">Tu carro merece <em>la mejor vitrina</em>.</h2>
        </div>

        <div className="cin-conv-thread">
          <div className="cin-bubble cin-bubble--them">
            <div className="cin-bubble-meta">Tú</div>
            Quiero vender mi carro, pero no quiero perder tiempo con curiosos.
          </div>
          <div className="cin-bubble cin-bubble--us">
            <div className="cin-bubble-meta">Altorra</div>
            <strong>Te entendemos.</strong> Avalúo, peritaje técnico y fotografía profesional gratis.
            Solo cuando esté listo lo publicamos en <em>nuestros canales</em>.
          </div>
          <div className="cin-bubble cin-bubble--them">
            <div className="cin-bubble-meta">Tú</div>
            ¿Y la comisión?
          </div>
          <div className="cin-bubble cin-bubble--us">
            <div className="cin-bubble-meta">Altorra</div>
            <strong>0%.</strong> No te cobramos nada hasta que tu carro se venda. Si no se vende, no pagas.
          </div>
          <div className="cin-bubble cin-bubble--them">
            <div className="cin-bubble-meta">Tú</div>
            ¿Cuánto se demora?
          </div>
          <div className="cin-bubble cin-bubble--us">
            <div className="cin-bubble-meta">Altorra</div>
            En promedio <strong>21 días</strong>. Y mientras tanto, tú no abres la puerta a nadie.
          </div>
        </div>

        <div className="cin-conv-cta">
          <Magnet strength={0.18}>
            <a href="consign.html" className="cin-link">
              Empieza con un <em>avalúo gratis</em>
              <span className="cin-link-arrow">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </span>
            </a>
          </Magnet>
          <span className="cin-conv-fine">Respondemos en menos de 2 horas</span>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// STATS strip with counter
// ============================================================
function Counter({ to, suffix = "", duration = 1600 }) {
  const ref = useRef(null);
  const inView = useInView(ref);
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    let raf;
    const step = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.floor(eased * to));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => raf && cancelAnimationFrame(raf);
  }, [inView, to, duration]);
  return <span ref={ref}>{n}{suffix}</span>;
}

function CinStats() {
  return (
    <section className="cin-stats" data-screen-label="07 Datos">
      <div className="cin-stats-grid">
        <div className="cin-stat">
          <div className="cin-stat-num"><Counter to={2400} suffix="+" /></div>
          <div className="cin-stat-label">Clientes desde 2017</div>
        </div>
        <div className="cin-stat">
          <div className="cin-stat-num"><Counter to={21} /><em>días</em></div>
          <div className="cin-stat-label">Promedio para vender</div>
        </div>
        <div className="cin-stat">
          <div className="cin-stat-num"><Counter to={16} /></div>
          <div className="cin-stat-label">Marcas en vitrina</div>
        </div>
        <div className="cin-stat">
          <div className="cin-stat-num">0<em>%</em></div>
          <div className="cin-stat-label">Comisión consignación</div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// CIERRE · Newsletter fusionado · marketplace virtual
// ============================================================
function CinEnd() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = (e) => { e.preventDefault(); if (!email) return; setDone(true); };
  return (
    <section className="cin-end" data-screen-label="11 Cierre">
      <div className="cin-end-grid">
        <div className="cin-end-lead">
          <span className="cin-eyebrow">Una ventana, todos los carros</span>
          <h2 className="cin-end-text">
            Toda Colombia<br/>
            <em>en una sola vitrina.</em>
          </h2>
          <p className="cin-end-lead-sub">
            Altorra es un marketplace digital. Conectamos compradores con concesionarios
            aliados verificados en todo el país. Sin desplazamientos. Sin presión.
            Sin letras chicas.
          </p>
        </div>

        <form className={`cin-end-news ${done ? "is-done" : ""}`} onSubmit={submit} aria-label="Suscríbete">
          <span className="cin-end-news-mark" aria-hidden="true">✦</span>
          <div className="cin-end-news-copy">
            <h3 className="cin-end-news-h">Los mejores carros, <em>antes que nadie</em>.</h3>
            <p>Una vez por semana: llegadas frescas, bajadas de precio y consejos para comprar mejor. Cero spam.</p>
          </div>
          {!done ? (
            <div className="cin-end-news-row">
              <input
                type="email" required
                placeholder="tu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="cin-end-news-input"
              />
              <button type="submit" className="cin-end-news-btn">
                Suscribirme
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M5 12h14M13 5l7 7-7 7"/>
                </svg>
              </button>
            </div>
          ) : (
            <div className="cin-end-news-ok">
              <span className="cin-end-news-ok-dot" aria-hidden="true">✓</span>
              <div>
                <strong>¡Listo, {email.split("@")[0]}!</strong>
                <span>Te confirmamos a {email}.</span>
              </div>
            </div>
          )}
          <div className="cin-end-news-foot">
            <span>Más de 2.400 lectores ya están dentro</span>
            <span>Date de baja en un clic</span>
          </div>
        </form>
      </div>
    </section>
  );
}

// ============================================================
// Root
// ============================================================
function Home() {
  useEffect(() => {
    document.body.setAttribute("data-cin", "on");
    return () => document.body.removeAttribute("data-cin");
  }, []);
  useScrollProgress();
  return (
    <>
      <div className="cin-scroll-progress" aria-hidden="true" />
      <CinHero />
      <CinAvailable />
      <CinCollection />
      <CinCats />
      <CinPrograms />
      <CinTrail />
      <CinBrands />
      <CinManifesto />
      <CinConv />
      <CinStats />
      <CinEnd />
    </>
  );
}

window.Home = Home;
