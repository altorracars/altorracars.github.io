// ============================================================
// ALTORRA · Cinematic SOFT PAGES — About · Contact · Reviews · Favorites · Profile · Legal · 404
// All in a single file. Each gets its own mount point in HTML.
// ============================================================
(function () {
  const { useState, useEffect, useMemo } = React;
  const data = window.AltorraData;
  const fmtP = (n) => '$' + Number(n).toLocaleString('es-CO');

  // ============================================================
  // ABOUT · /about.html
  // ============================================================
  function About() {
    const TIMELINE = [
      { y: '2017', t: 'Nace Altorra', d: 'Una idea simple: comprar carros en Colombia debería ser tan fácil como comprar online.' },
      { y: '2019', t: 'Primeros aliados', d: 'Tres concesionarios se suman. Comienza el marketplace digital.' },
      { y: '2021', t: 'Cobertura nacional', d: 'Llegamos a las 6 ciudades principales y firmamos con bancos aliados.' },
      { y: '2023', t: 'Catálogo +500', d: 'Más de 500 vehículos verificados en vitrina simultáneamente.' },
      { y: '2026', t: 'Nueva experiencia', d: 'Estrenamos la plataforma rediseñada. Más rápida, más editorial, más Altorra.' },
    ];
    const PILLARS = [
      { t: 'Verificación previa', d: 'Cada aliado pasa por revisión documental, comercial y técnica antes de listar.' },
      { t: 'Acompañamiento humano', d: 'No somos un Wallapop. Cada operación tiene asesor dedicado de principio a fin.' },
      { t: 'Financiación pre-aprobada', d: 'Conectamos con 5 bancos aliados. Tu solicitud llega lista, no en cero.' },
      { t: 'Transparencia total', d: 'Peritaje técnico, historial, precio justificado. Sin letras chicas, sin sorpresas.' },
    ];
    return (
      <main className="soft-page" data-screen-label="Nosotros">
        <section className="soft-hero">
          <div className="soft-hero-bg" aria-hidden="true"/>
          <div className="soft-hero-inner">
            <span className="cin-eyebrow">Nosotros · desde 2017</span>
            <h1 className="soft-hero-h">
              Una ventana digital,<br/>
              <span className="soft-hero-h-accent">todo un país detrás.</span>
            </h1>
            <p className="soft-hero-sub">
              Altorra conecta compradores con concesionarios aliados verificados en toda Colombia.
              No vendemos directo — orquestamos la mejor experiencia con la mejor red.
            </p>
          </div>
        </section>

        <section className="soft-section">
          <div className="soft-2col">
            <div>
              <span className="cin-eyebrow">Pilares</span>
              <h2 className="soft-section-h">Cómo trabajamos</h2>
              <p className="soft-section-lead">
                No reinventamos la venta de carros. La hicimos más limpia.
              </p>
            </div>
            <ul className="soft-pillars">
              {PILLARS.map((p, i) => (
                <li key={i} className="soft-pillar" style={{ '--i': i }}>
                  <span className="soft-pillar-n">0{i + 1}</span>
                  <div>
                    <h3>{p.t}</h3>
                    <p>{p.d}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="soft-timeline-section">
          <span className="cin-eyebrow">Línea de tiempo</span>
          <h2 className="soft-section-h">Nueve años, cinco hitos</h2>
          <ol className="soft-timeline">
            {TIMELINE.map((m, i) => (
              <li key={m.y} className="soft-tl-item" style={{ '--i': i }}>
                <span className="soft-tl-year">{m.y}</span>
                <span className="soft-tl-dot"/>
                <div className="soft-tl-body">
                  <h3>{m.t}</h3>
                  <p>{m.d}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        <section className="soft-numbers-section">
          <div className="soft-numbers">
            <div><strong>2.400+</strong><span>Clientes desde 2017</span></div>
            <div><strong>21<em>días</em></strong><span>Promedio para vender</span></div>
            <div><strong>16</strong><span>Marcas en vitrina</span></div>
            <div><strong>5</strong><span>Bancos aliados</span></div>
          </div>
        </section>

        <section className="soft-cta-section">
          <h2 className="soft-cta-h">¿Listo para empezar?</h2>
          <p className="soft-cta-sub">Explora la vitrina o ponte en contacto con un asesor.</p>
          <div className="soft-cta-row">
            <a href="catalog.html" className="soft-cta">Ver catálogo</a>
            <a href="contact.html" className="soft-cta soft-cta--alt">Hablar con un asesor</a>
          </div>
        </section>
      </main>
    );
  }

  // ============================================================
  // CONTACT · /contact.html
  // ============================================================
  function Contact() {
    const [form, setForm] = useState({ nombre: '', email: '', tel: '', asunto: 'general', msg: '' });
    const [done, setDone] = useState(false);
    const submit = (e) => { e.preventDefault(); if (!form.nombre || !form.email) return; setDone(true); };

    const FAQS = [
      { q: '¿Cómo verifican los vehículos?', a: 'Cada aliado pasa por revisión documental y técnica. Cada vehículo tiene peritaje propio que el aliado titular comparte cuando lo solicitas.' },
      { q: '¿Cobran por la consignación?', a: 'Acompañamos toda la venta con honorarios competitivos. Solo facturamos cuando se concreta. Sin venta no hay cobro.' },
      { q: '¿Hacen entregas en otras ciudades?', a: 'Sí, coordinamos con el aliado titular. Cobertura nacional con logística asegurada.' },
      { q: '¿Aceptan permuta?', a: 'Sí. El aliado evalúa tu vehículo y te hace una oferta como parte de pago. Avalúo gratuito.' },
      { q: '¿Cuánto se demora la financiación?', a: 'Pre-aprobación con bancos aliados en 24h. Desembolso típico en 3 a 5 días hábiles desde la solicitud formal.' },
    ];

    return (
      <main className="soft-page" data-screen-label="Contacto">
        <section className="soft-hero">
          <div className="soft-hero-bg" aria-hidden="true"/>
          <div className="soft-hero-inner">
            <span className="cin-eyebrow">Contacto · respuesta &lt; 2h</span>
            <h1 className="soft-hero-h">Hablemos.</h1>
            <p className="soft-hero-sub">
              Pregúntanos por un vehículo, por la consignación o por la financiación.
              Te respondemos en menos de dos horas en horario hábil.
            </p>
          </div>
        </section>

        <section className="soft-section">
          <div className="cta-grid">
            <a href="https://wa.me/573235016747" target="_blank" rel="noopener" className="cta-card">
              <span className="cta-card-icon" style={{ color: '#25d366' }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M17.5 14.4c-.3-.2-1.7-.8-2-.9-.3-.1-.5-.2-.7.2-.2.3-.7.9-.9 1.1-.2.2-.3.2-.6.1-.3-.2-1.2-.5-2.4-1.5-.9-.8-1.4-1.7-1.6-2-.2-.3 0-.5.1-.6.1-.1.3-.4.4-.5.1-.2.2-.3.3-.5.1-.2 0-.4 0-.5-.1-.2-.7-1.6-.9-2.2-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1 .9-1 2.3 0 1.3 1 2.6 1.1 2.8.1.2 2 3 4.8 4.2 2 .9 2.4 1 3.2.9.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.1-1.2-.1-.1-.3-.2-.6-.4z M12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.6 1.4 5.1L2 22l5.1-1.4c1.5.8 3.2 1.3 5 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2z"/></svg>
              </span>
              <div>
                <strong>WhatsApp</strong>
                <span>+57 323 501 6747</span>
              </div>
            </a>
            <a href="mailto:hola@altorracars.com" className="cta-card">
              <span className="cta-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></svg>
              </span>
              <div>
                <strong>Email</strong>
                <span>hola@altorracars.com</span>
              </div>
            </a>
            <a href="tel:+573235016747" className="cta-card">
              <span className="cta-card-icon">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/></svg>
              </span>
              <div>
                <strong>Teléfono</strong>
                <span>(+57) 323 501 6747</span>
              </div>
            </a>
          </div>
        </section>

        <section className="soft-section">
          <div className="soft-2col">
            <div>
              <span className="cin-eyebrow">Formulario</span>
              <h2 className="soft-section-h">Cuéntanos qué buscas</h2>
              <p className="soft-section-lead">
                Te respondemos en menos de 2 horas en horario hábil (Lun–Vie 8am–6pm).
              </p>
            </div>
            <form className={`soft-form ${done ? 'is-done' : ''}`} onSubmit={submit}>
              {!done ? (
                <>
                  <label className="soft-field">
                    <span>Nombre completo</span>
                    <input required value={form.nombre} onChange={(e) => setForm({ ...form, nombre: e.target.value })}/>
                  </label>
                  <div className="soft-field-row">
                    <label className="soft-field">
                      <span>Email</span>
                      <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}/>
                    </label>
                    <label className="soft-field">
                      <span>Teléfono</span>
                      <input type="tel" value={form.tel} onChange={(e) => setForm({ ...form, tel: e.target.value })}/>
                    </label>
                  </div>
                  <label className="soft-field">
                    <span>Asunto</span>
                    <select value={form.asunto} onChange={(e) => setForm({ ...form, asunto: e.target.value })}>
                      <option value="general">Consulta general</option>
                      <option value="venta">Vender mi vehículo</option>
                      <option value="financiacion">Financiación</option>
                      <option value="aliado">Quiero ser aliado</option>
                      <option value="prensa">Prensa / Comunicaciones</option>
                    </select>
                  </label>
                  <label className="soft-field">
                    <span>Mensaje</span>
                    <textarea rows={4} value={form.msg} onChange={(e) => setForm({ ...form, msg: e.target.value })}/>
                  </label>
                  <button type="submit" className="soft-cta">
                    Enviar mensaje
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M5 12h14M13 5l7 7-7 7"/></svg>
                  </button>
                </>
              ) : (
                <div className="soft-form-ok">
                  <span className="soft-form-ok-mark">✓</span>
                  <div>
                    <strong>¡Mensaje enviado, {form.nombre.split(' ')[0]}!</strong>
                    <span>Te responderemos a {form.email} en menos de 2 horas.</span>
                  </div>
                </div>
              )}
            </form>
          </div>
        </section>

        <section className="soft-section">
          <span className="cin-eyebrow">Preguntas frecuentes</span>
          <h2 className="soft-section-h">Lo que suelen preguntarnos</h2>
          <div className="soft-faq">
            {FAQS.map((f, i) => <FaqItem key={i} q={f.q} a={f.a}/>)}
          </div>
        </section>
      </main>
    );
  }

  function FaqItem({ q, a }) {
    const [open, setOpen] = useState(false);
    return (
      <div className={`soft-faq-item ${open ? 'is-open' : ''}`}>
        <button type="button" className="soft-faq-q" onClick={() => setOpen(o => !o)}>
          <span>{q}</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2"><path d="M6 9l6 6 6-6"/></svg>
        </button>
        <div className="soft-faq-a"><p>{a}</p></div>
      </div>
    );
  }

  // ============================================================
  // REVIEWS · /reviews.html
  // ============================================================
  const REVIEWS = [
    { name: 'Carolina M.',     city: 'Cartagena', stars: 5, date: 'Hace 1 semana',  text: 'Compré mi Mazda CX-5 con ellos. Trato impecable, papeleo en 24h y el aliado me llevó el carro a mi casa.', verified: true },
    { name: 'Jorge R.',        city: 'Bocagrande',stars: 5, date: 'Hace 2 semanas', text: 'La asesoría financiera fue clave. Cuotas exactas a lo simulado. Recomendado.', verified: true },
    { name: 'Andrea L.',       city: 'Bogotá',    stars: 5, date: 'Hace 3 semanas', text: 'Mi BMW X3 llegó como prometieron. Mejor experiencia comprando carro que he tenido.', verified: true },
    { name: 'Mauricio P.',     city: 'Medellín',  stars: 4, date: 'Hace 1 mes',     text: 'Variedad enorme y precios honestos. La única queja: tardaron un día más con los papeles.', verified: true },
    { name: 'Catalina S.',     city: 'Cali',      stars: 5, date: 'Hace 1 mes',     text: 'Vendí mi Renault Duster con ellos. En 18 días estaba vendido. Cero estrés.', verified: true },
    { name: 'Sebastián V.',    city: 'Barranquilla', stars: 5, date: 'Hace 2 meses', text: 'Asesoría 10/10. Me ayudaron incluso después de la compra a entender el SOAT.', verified: true },
    { name: 'María Fernanda T.', city: 'Cartagena', stars: 5, date: 'Hace 2 meses', text: 'Mi Kia Sportage en perfectas condiciones. El peritaje me dio mucha tranquilidad.', verified: true },
    { name: 'Ricardo A.',      city: 'Bogotá',    stars: 4, date: 'Hace 3 meses',   text: 'Buen catálogo. El proceso podría ser más rápido pero al final todo salió bien.', verified: false },
    { name: 'Daniela G.',      city: 'Medellín',  stars: 5, date: 'Hace 3 meses',   text: 'Mi primer carro fue un Hyundai Tucson con Altorra. Asesoría perfecta para alguien sin experiencia.', verified: true },
  ];

  function Reviews() {
    const [filter, setFilter] = useState(0); // 0 = all, 5/4/3
    const list = useMemo(() => filter ? REVIEWS.filter(r => r.stars === filter) : REVIEWS, [filter]);
    const avg = (REVIEWS.reduce((s, r) => s + r.stars, 0) / REVIEWS.length).toFixed(1);
    const dist = [5,4,3,2,1].map(s => ({
      s, count: REVIEWS.filter(r => r.stars === s).length, pct: (REVIEWS.filter(r => r.stars === s).length / REVIEWS.length) * 100,
    }));

    return (
      <main className="soft-page" data-screen-label="Reseñas">
        <section className="soft-hero">
          <div className="soft-hero-bg" aria-hidden="true"/>
          <div className="soft-hero-inner">
            <span className="cin-eyebrow">Reseñas · {REVIEWS.length} verificadas</span>
            <h1 className="soft-hero-h">
              Las cuentan <span className="soft-hero-h-accent">ellos</span>.
            </h1>
            <p className="soft-hero-sub">
              Cada reseña es de un cliente real. Sin filtrar las críticas — las buenas y las que nos
              ayudan a mejorar.
            </p>
          </div>
        </section>

        <section className="soft-section">
          <div className="rev-summary">
            <div className="rev-summary-avg">
              <span className="rev-summary-num">{avg}</span>
              <span className="rev-summary-stars">{'★★★★★'.slice(0, Math.round(+avg))}<span className="rev-summary-stars-off">{'★★★★★'.slice(Math.round(+avg))}</span></span>
              <span className="rev-summary-count">{REVIEWS.length} reseñas</span>
            </div>
            <div className="rev-summary-dist">
              {dist.map(d => (
                <div key={d.s} className="rev-dist-row">
                  <span className="rev-dist-label">{d.s} ★</span>
                  <span className="rev-dist-bar"><span style={{ width: `${d.pct}%` }}/></span>
                  <span className="rev-dist-count">{d.count}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rev-filters">
            <button className={filter === 0 ? 'is-on' : ''} onClick={() => setFilter(0)}>Todas</button>
            {[5,4,3].map(s => (
              <button key={s} className={filter === s ? 'is-on' : ''} onClick={() => setFilter(s)}>{s} ★</button>
            ))}
          </div>

          <div className="rev-list">
            {list.map((r, i) => (
              <article key={i} className="rev-card">
                <div className="rev-card-head">
                  <span className="rev-avatar">{r.name.charAt(0)}</span>
                  <div>
                    <strong>{r.name}{r.verified && <span className="rev-verified" title="Verificado">✓</span>}</strong>
                    <span>{r.city} · {r.date}</span>
                  </div>
                  <span className="rev-stars">{'★'.repeat(r.stars)}<span className="rev-stars-off">{'★'.repeat(5 - r.stars)}</span></span>
                </div>
                <p className="rev-text">{r.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="soft-cta-section">
          <h2 className="soft-cta-h">¿Compraste con nosotros?</h2>
          <p className="soft-cta-sub">Tu reseña ayuda al próximo comprador. Comparte tu experiencia.</p>
          <a href="#" className="soft-cta">Dejar una reseña</a>
        </section>
      </main>
    );
  }

  // ============================================================
  // FAVORITES · /favorites.html
  // ============================================================
  function Favorites() {
    const [favs, setFavs] = useState(() => {
      try { return JSON.parse(localStorage.getItem('alt-fav') || '[]'); } catch { return []; }
    });
    const list = useMemo(() => data.VEHICLES.filter(v => favs.includes(v.id)), [favs]);
    const remove = (id) => {
      const n = favs.filter(x => x !== id);
      setFavs(n);
      localStorage.setItem('alt-fav', JSON.stringify(n));
    };
    const clear = () => { setFavs([]); localStorage.setItem('alt-fav', '[]'); };

    return (
      <main className="soft-page" data-screen-label="Favoritos">
        <section className="soft-hero soft-hero--small">
          <div className="soft-hero-inner">
            <span className="cin-eyebrow">Tus favoritos · {list.length}</span>
            <h1 className="soft-hero-h">
              Los que <span className="soft-hero-h-accent">guardaste</span>.
            </h1>
          </div>
        </section>

        <section className="soft-section">
          {list.length === 0 ? (
            <div className="fav-empty">
              <span className="fav-empty-mark">
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="0.8" opacity="0.4">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 1 0-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 0 0 0-7.78z" strokeDasharray="3 3"/>
                </svg>
              </span>
              <h3>Sin favoritos aún</h3>
              <p>Marca con ♡ los vehículos que te interesen y vuelve cuando estés listo para decidir.</p>
              <a href="catalog.html" className="soft-cta">Ir al catálogo</a>
            </div>
          ) : (
            <>
              <div className="fav-toolbar">
                <strong>{list.length} guardado{list.length !== 1 ? 's' : ''}</strong>
                <button className="fav-clear" onClick={clear}>Limpiar todos</button>
              </div>
              <div className="cat-results cat-results--grid">
                {list.map(v => (
                  <article key={v.id} className="cat-card">
                    <a href={`detail.html?id=${v.id}`} className="cat-card-link">
                      <div className="cat-card-media" style={{ background: v.images[0].bg }}>
                        <span className="cat-card-img-overlay"/>
                        <div className="cat-card-chips">
                          {v.condition === 'nuevo' && <span className="cat-chip cat-chip--new">0 KM</span>}
                        </div>
                      </div>
                      <div className="cat-card-body">
                        <span className="cat-card-brand">{v.brandName}</span>
                        <h3 className="cat-card-model">{v.model}</h3>
                        <div className="cat-card-specs">
                          <span>{v.year}</span><i>·</i>
                          <span>{Number(v.km).toLocaleString('es-CO')} km</span>
                        </div>
                        <div className="cat-card-rule"/>
                        <div className="cat-card-price">{fmtP(v.price)}</div>
                      </div>
                    </a>
                    <button type="button" className="fav-remove" onClick={() => remove(v.id)} title="Quitar">
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4"><path d="M6 6 18 18M6 18 18 6"/></svg>
                    </button>
                  </article>
                ))}
              </div>
            </>
          )}
        </section>
      </main>
    );
  }

  // ============================================================
  // PROFILE · /profile.html
  // ============================================================
  function Profile() {
    const [tab, setTab] = useState('cuenta');
    const TABS = [
      { id: 'cuenta',       label: 'Cuenta' },
      { id: 'solicitudes',  label: 'Mis solicitudes' },
      { id: 'busquedas',    label: 'Búsquedas guardadas' },
      { id: 'notificaciones', label: 'Notificaciones' },
    ];
    return (
      <main className="soft-page" data-screen-label="Perfil">
        <section className="soft-hero soft-hero--small">
          <div className="soft-hero-inner">
            <span className="cin-eyebrow">Tu cuenta</span>
            <h1 className="soft-hero-h">Hola, <span className="soft-hero-h-accent">{(JSON.parse(localStorage.getItem('alt-auth') || 'null')?.name) || 'Cliente'}</span>.</h1>
            <p className="soft-hero-sub">Gestiona tu perfil, solicitudes en curso y preferencias de comunicación.</p>
          </div>
        </section>

        <section className="soft-section">
          <nav className="pf-tabs" role="tablist">
            {TABS.map(t => (
              <button key={t.id} role="tab" aria-selected={tab === t.id} className={tab === t.id ? 'is-on' : ''} onClick={() => setTab(t.id)}>
                {t.label}
              </button>
            ))}
          </nav>

          {tab === 'cuenta' && (
            <div className="pf-panel">
              <h2 className="soft-section-h">Datos personales</h2>
              <div className="pf-grid">
                {['Nombre completo', 'Cédula', 'Email', 'Teléfono', 'Ciudad', 'Dirección'].map((k, i) => (
                  <label key={k} className="soft-field">
                    <span>{k}</span>
                    <input defaultValue={['Camilo Pérez Acuña', '1.020.456.789', 'camilo@email.com', '+57 300 123 4567', 'Cartagena', 'Cra. 2 #11-41'][i]}/>
                  </label>
                ))}
              </div>
              <button className="soft-cta" style={{ marginTop: 18 }}>Guardar cambios</button>
            </div>
          )}

          {tab === 'solicitudes' && (
            <div className="pf-panel">
              <h2 className="soft-section-h">Tus solicitudes</h2>
              <div className="pf-requests">
                {[
                  { tipo: 'Financiación', vehiculo: 'Mazda 3 Grand Touring 2026', estado: 'En revisión', date: '15 may' },
                  { tipo: 'Visita',       vehiculo: 'Toyota Prado TXL 2021',      estado: 'Confirmada · 18 may 4:00 pm', date: '12 may' },
                  { tipo: 'Consignación', vehiculo: 'Mi Chevrolet Tracker 2020',  estado: 'Avalúo enviado',            date: '8 may' },
                ].map((r, i) => (
                  <div key={i} className="pf-request">
                    <div>
                      <span className="pf-request-tipo">{r.tipo}</span>
                      <strong>{r.vehiculo}</strong>
                    </div>
                    <span className="pf-request-estado">{r.estado}</span>
                    <span className="pf-request-date">{r.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === 'busquedas' && (
            <div className="pf-panel">
              <h2 className="soft-section-h">Búsquedas guardadas</h2>
              <ul className="pf-saved">
                <li><strong>SUV híbrido hasta $150M</strong><span>3 nuevos resultados · hace 2 días</span><a href="catalog.html?cat=suv&fuel=Híbrido">Ver</a></li>
                <li><strong>Toyota 0KM</strong><span>1 nuevo resultado · hace 4 días</span><a href="catalog.html?brand=toyota&condition=nuevo">Ver</a></li>
                <li><strong>Pickup 4x4 menor a 50k km</strong><span>Sin novedades</span><a href="catalog.html?cat=pickup&kmMax=50000">Ver</a></li>
              </ul>
            </div>
          )}

          {tab === 'notificaciones' && (
            <div className="pf-panel">
              <h2 className="soft-section-h">Preferencias</h2>
              <div className="pf-toggles">
                {[
                  { k: 'Nuevos vehículos que coinciden con tus búsquedas', def: true },
                  { k: 'Bajadas de precio en tus favoritos', def: true },
                  { k: 'Actualizaciones sobre tus solicitudes', def: true },
                  { k: 'Newsletter semanal Altorra', def: true },
                  { k: 'Promociones de bancos aliados', def: false },
                ].map((t, i) => (
                  <label key={i} className="cat-filter-toggle">
                    <input type="checkbox" defaultChecked={t.def}/>
                    <span className="cat-toggle-rail"><span className="cat-toggle-dot"/></span>
                    {t.k}
                  </label>
                ))}
              </div>
            </div>
          )}
        </section>
      </main>
    );
  }

  // ============================================================
  // LEGAL · /terms.html · /privacy.html · /cookies.html
  // ============================================================
  function LegalPage({ kind }) {
    const PAGES = {
      terms: {
        title: 'Términos y Condiciones',
        eyebrow: 'Legal · Términos',
        sections: [
          { h: '1 · Objeto', p: 'Altorra Cars opera como marketplace digital intermediario entre compradores y concesionarios aliados de vehículos en Colombia. No vendemos vehículos directamente; conectamos partes y facilitamos la transacción.' },
          { h: '2 · Aceptación', p: 'El uso de la plataforma implica la aceptación de estos términos. Si no estás de acuerdo, no deberías usar el servicio.' },
          { h: '3 · Veracidad de la información', p: 'Los datos publicados sobre cada vehículo provienen del aliado titular. Altorra verifica documentación básica pero no garantiza la totalidad de los datos. Antes de comprar siempre solicita el peritaje técnico al aliado.' },
          { h: '4 · Operación comercial', p: 'La compraventa se firma entre el comprador y el concesionario aliado titular del vehículo. Altorra puede facturar honorarios por intermediación. Las condiciones específicas se acuerdan con el aliado y figuran en el contrato firmado.' },
          { h: '5 · Limitación de responsabilidad', p: 'Altorra no se hace responsable por defectos del vehículo, condiciones de financiación o garantías ofrecidas por los aliados. Cada parte asume las responsabilidades propias de la operación.' },
          { h: '6 · Modificaciones', p: 'Podemos actualizar estos términos cuando sea necesario. Las actualizaciones aplican desde su publicación en la plataforma.' },
          { h: '7 · Jurisdicción', p: 'Aplica la legislación de la República de Colombia. Conflictos se resuelven en los tribunales competentes.' },
        ],
      },
      privacy: {
        title: 'Política de Privacidad',
        eyebrow: 'Legal · Privacidad',
        sections: [
          { h: '1 · Responsable del tratamiento', p: 'Altorra Cars · NIT 901.000.000-0 · hola@altorracars.com — opera como responsable del tratamiento de los datos que recolectamos.' },
          { h: '2 · Datos que recolectamos', p: 'Nombre, contacto, datos de tu vehículo cuando consignas, datos de búsqueda, cookies de funcionamiento y analíticas. No recolectamos datos financieros sensibles; la información bancaria queda en manos del banco aliado.' },
          { h: '3 · Finalidad del tratamiento', p: 'Atender solicitudes, facilitar comunicación con aliados, mejorar el servicio, enviar comunicaciones comerciales con tu consentimiento, cumplir obligaciones legales.' },
          { h: '4 · Compartir con terceros', p: 'Compartimos tus datos con el aliado responsable del vehículo que te interesa y con bancos aliados cuando inicias una solicitud de financiación. No vendemos tus datos a terceros.' },
          { h: '5 · Tus derechos', p: 'Conocer, actualizar, rectificar y suprimir tus datos. Revocar tu consentimiento. Escríbenos a hola@altorracars.com para ejercerlos.' },
          { h: '6 · Conservación', p: 'Conservamos tus datos mientras tengas una relación activa con Altorra o sea necesario por obligación legal.' },
          { h: '7 · Seguridad', p: 'Aplicamos medidas técnicas y organizativas razonables para proteger tus datos. Ningún sistema es 100% inviolable pero hacemos lo necesario para minimizar riesgos.' },
        ],
      },
      cookies: {
        title: 'Política de Cookies',
        eyebrow: 'Legal · Cookies',
        sections: [
          { h: '¿Qué son las cookies?', p: 'Pequeños archivos que se guardan en tu dispositivo cuando visitas un sitio web. Permiten que recordemos tus preferencias, mejoremos la experiencia y midamos el uso.' },
          { h: 'Cookies que usamos', p: 'Esenciales (funcionamiento de la sesión y carrito), preferencias (idioma, vista grid/lista), analíticas (entender cómo usas el sitio), publicitarias (remarketing — solo con tu consentimiento).' },
          { h: 'Cómo gestionarlas', p: 'Puedes aceptar, rechazar o configurar las cookies desde el banner que aparece la primera vez que visitas el sitio. También puedes cambiar tu configuración desde el navegador.' },
          { h: 'Vida útil', p: 'Algunas cookies son de sesión (se borran al cerrar el navegador) y otras persistentes (duran hasta 12 meses o hasta que las borres).' },
        ],
      },
    };
    const p = PAGES[kind] || PAGES.terms;
    return (
      <main className="soft-page" data-screen-label={p.title}>
        <section className="soft-hero soft-hero--small">
          <div className="soft-hero-inner">
            <span className="cin-eyebrow">{p.eyebrow}</span>
            <h1 className="soft-hero-h">{p.title}</h1>
            <p className="soft-hero-sub">Última actualización: mayo de 2026.</p>
          </div>
        </section>
        <section className="soft-section legal-section">
          {p.sections.map((s, i) => (
            <article key={i} className="legal-article">
              <h2>{s.h}</h2>
              <p>{s.p}</p>
            </article>
          ))}
        </section>
      </main>
    );
  }

  // ============================================================
  // 404
  // ============================================================
  function NotFound() {
    return (
      <main className="soft-page" data-screen-label="404">
        <section className="nf-section">
          <div className="nf-num">
            <span>4</span><span className="nf-mid">0</span><span>4</span>
          </div>
          <h1 className="nf-h">
            Esta ruta <span className="nf-h-accent">no existe.</span>
          </h1>
          <p className="nf-sub">El link puede estar roto, el vehículo ya se vendió o llegaste aquí por suerte.</p>
          <div className="nf-actions">
            <a href="index.html" className="soft-cta">Volver al inicio</a>
            <a href="catalog.html" className="soft-cta soft-cta--alt">Ir al catálogo</a>
          </div>
        </section>
      </main>
    );
  }

  // ============================================================
  // Mount
  // ============================================================
  (function safeMount(fn) { if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', fn); else fn(); })(() => {
    document.body.setAttribute('data-cin', 'on');
    const map = {
      'about-root':     About,
      'contact-root':   Contact,
      'reviews-root':   Reviews,
      'favorites-root': Favorites,
      'profile-root':   Profile,
      'terms-root':     () => <LegalPage kind="terms"/>,
      'privacy-root':   () => <LegalPage kind="privacy"/>,
      'cookies-root':   () => <LegalPage kind="cookies"/>,
      'notfound-root':  NotFound,
    };
    Object.entries(map).forEach(([id, C]) => {
      const el = document.getElementById(id);
      if (el) ReactDOM.createRoot(el).render(<C/>);
    });
  });
})();