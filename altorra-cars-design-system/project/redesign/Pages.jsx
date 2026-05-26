// ============================================================
// ALTORRA CARS · SECONDARY PAGES (premium pass)
// ============================================================

// ───── NOSOTROS · timeline + equipo + certificaciones
function Nosotros({ navigate }) {
  return (
    <main className="container" style={{paddingTop:32,paddingBottom:64}}>
      <div className="crumb"><a onClick={()=>navigate('home')}>Inicio</a><span className="crumb-sep">/</span><span>Nosotros</span></div>

      <section className="hero" style={{padding:'40px 0 24px'}}>
        <div className="hero-eyebrow"><span className="dot"></span>Desde 2015 · Cartagena de Indias</div>
        <h1 className="hero-title" style={{marginTop:16,fontSize:'clamp(40px,6.5vw,80px)'}}>
          Pasión por el <span className="t-gold-grad">automóvil.</span>
        </h1>
        <p className="hero-sub" style={{maxWidth:680}}>
          Somos el concesionario líder de la costa caribe. Más de una década conectando familias con el auto perfecto — sin sorpresas, sin presión, sin letras chicas.
        </p>
      </section>

      {/* Stats */}
      <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(200px,1fr))',gap:14,marginBottom:56}}>
        {[['10+','años de experiencia'],['2.4k+','clientes felices'],['200+','vehículos en stock'],['18','marcas premium'],['98%','recompra de clientes'],['4.9','rating Google · 247 reseñas']].map(([n,l])=>(
          <div key={l} className="card" style={{padding:'24px 20px',textAlign:'center'}}>
            <div style={{fontFamily:'var(--font-display)',fontSize:42,fontWeight:800,lineHeight:1}} className="t-gold-grad">{n}</div>
            <div className="t-muted" style={{marginTop:8,fontSize:13}}>{l}</div>
          </div>
        ))}
      </div>

      {/* Historia + valores */}
      <section className="section" style={{paddingTop:0}}>
        <div className="cols-2">
          <div>
            <div className="section-eyebrow">Nuestra historia</div>
            <h2 className="section-h1">Más que un <span className="t-gold-grad">concesionario</span></h2>
            <p className="t-muted" style={{marginTop:16,lineHeight:1.7}}>
              Altorra Cars nació en 2015 en Bocagrande con una misión clara: redefinir cómo se compra un vehículo en Colombia. Combinamos tecnología, asesoría experta y un portafolio premium para que cada cliente encuentre exactamente lo que busca.
            </p>
            <p className="t-muted" style={{marginTop:12,lineHeight:1.7}}>
              Hoy somos referente regional en compra-venta de vehículos nuevos y usados, con respaldo financiero de los principales bancos del país y entrega a nivel nacional.
            </p>
          </div>
          <div className="acrylic-hi" style={{padding:32,borderRadius:'var(--r-2xl)'}}>
            <h3 className="t-subtitle">Nuestros valores</h3>
            <div className="stack" style={{'--stack':'14px',marginTop:16}}>
              {[['Transparencia','Precios e historia técnica claros desde el primer contacto. Sin asteriscos.'],
                ['Calidad','Inspección 150 puntos en cada unidad antes de venderla. Garantía mecánica incluida.'],
                ['Cercanía','Asesores humanos, no scripts. Te acompañamos antes, durante y después.']].map(([t,d])=>(
                <div key={t} className="row" style={{alignItems:'flex-start',gap:12}}>
                  <div style={{width:36,height:36,borderRadius:10,background:'var(--gold-100)',color:'var(--gold-700)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{I.check}</div>
                  <div><strong>{t}</strong><div className="t-muted t-body" style={{marginTop:2,lineHeight:1.5}}>{d}</div></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section">
        <div className="section-eyebrow">Línea de tiempo</div>
        <h2 className="section-h1">Una <span className="t-gold-grad">década</span> de evolución</h2>
        <div className="timeline">
          {[
            {y:'2015',t:'Apertura del primer showroom',d:'Abrimos las puertas en Bocagrande con 12 vehículos en exhibición.'},
            {y:'2017',t:'Alianza con bancos aliados',d:'Crédito directo con Bancolombia, Davivienda y Banco de Bogotá.'},
            {y:'2019',t:'Expansión a vehículos premium',d:'Incorporamos marcas como BMW, Mercedes-Benz y Audi al portafolio.'},
            {y:'2021',t:'Inspección 150 puntos',d:'Lanzamos nuestro programa de certificación de usados — referente en la región.'},
            {y:'2023',t:'Entrega nacional',d:'Despacho a 32 ciudades de Colombia. Más de 1.500 unidades entregadas.'},
            {y:'2026',t:'Plataforma digital',d:'Nuevo sitio web con simulador, comparador y favoritos. Tu próximo carro a un clic.'}
          ].map((m,i)=>(
            <div key={i} className="timeline-item">
              <div className="timeline-y">{m.y}</div>
              <div className="timeline-dot"></div>
              <div className="timeline-card card" style={{padding:20}}>
                <strong>{m.t}</strong>
                <p className="t-muted t-body" style={{marginTop:4,lineHeight:1.5}}>{m.d}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Equipo */}
      <section className="section">
        <div className="section-eyebrow">El equipo</div>
        <h2 className="section-h1">Las personas detrás de <span className="t-gold-grad">Altorra</span></h2>
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16,marginTop:24}}>
          {[
            {n:'Carlos Mendoza',r:'Fundador & CEO',i:'CM',e:'Más de 20 años en el sector automotor.'},
            {n:'María Fernanda Ríos',r:'Directora Comercial',i:'MR',e:'Experta en financiación y crédito vehicular.'},
            {n:'Andrés Restrepo',r:'Jefe de Inspección',i:'AR',e:'Ingeniero mecánico, certificado AAMVA.'},
            {n:'Laura Pérez',r:'Servicio Postventa',i:'LP',e:'Tu enlace después de la entrega.'}
          ].map((p,i)=>(
            <div key={i} className="card" style={{padding:24,textAlign:'center'}}>
              <div className="team-avatar">{p.i}</div>
              <strong style={{display:'block',marginTop:14}}>{p.n}</strong>
              <div className="t-caption" style={{color:'var(--gold-700)',fontWeight:600,marginTop:2}}>{p.r}</div>
              <p className="t-muted t-caption" style={{marginTop:8,lineHeight:1.5}}>{p.e}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Certificaciones */}
      <section className="section">
        <div className="section-eyebrow">Respaldo</div>
        <h2 className="section-h1">Certificaciones y <span className="t-gold-grad">aliados</span></h2>
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(160px,1fr))',gap:12,marginTop:24}}>
          {['Bancolombia','Davivienda','Banco Bogotá','Sufi','BBVA','Cámara de Comercio','Fasecolda','RUNT'].map(c=>(
            <div key={c} className="cert-tile">{c}</div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="cta-band" style={{marginTop:48}}>
        <div>
          <h3 style={{fontFamily:'var(--font-display)',fontSize:'clamp(24px,3vw,36px)',fontWeight:800}}>¿Listo para encontrar tu próximo carro?</h3>
          <p className="t-muted" style={{marginTop:6}}>Visítanos en Bocagrande o explora online — como prefieras.</p>
        </div>
        <div className="row" style={{gap:10}}>
          <button className="btn btn-subtle btn-lg" onClick={()=>navigate('contacto')}>Contactar</button>
          <button className="btn btn-primary btn-lg" onClick={()=>navigate('busqueda')}>Ver catálogo{I.arrowR}</button>
        </div>
      </section>
    </main>
  );
}

// ───── CONTACTO · form + info + FAQ + mapa
function Contacto({ navigate, toast }) {
  const [form, setForm] = useState({nombre:'',email:'',phone:'',motivo:'consulta',msg:''});
  const [openFaq, setOpenFaq] = useState(0);
  function submit(e){e.preventDefault();toast('Mensaje enviado · te contactaremos en 24h','success');setForm({nombre:'',email:'',phone:'',motivo:'consulta',msg:''});}

  const faqs = [
    {q:'¿Reciben mi carro como parte de pago?',a:'Sí. Hacemos avalúo gratuito el mismo día y aceptamos vehículos como parte de pago hasta el 70% del valor del nuevo.'},
    {q:'¿Cuánto tarda la aprobación de crédito?',a:'Entre 2 y 24 horas hábiles dependiendo del banco. Trabajamos con Bancolombia, Davivienda, BBVA y Sufi.'},
    {q:'¿Hacen entregas fuera de Cartagena?',a:'Sí, entregamos en las 32 capitales de Colombia. El costo varía según destino — te lo cotizamos al momento.'},
    {q:'¿Qué incluye la garantía mecánica?',a:'Motor, caja, transmisión, sistema eléctrico y aire acondicionado. De 6 meses a 2 años según unidad.'},
    {q:'¿Puedo agendar una prueba de manejo?',a:'Por supuesto. Lun-Sáb de 8am a 6pm — agéndala desde el detalle del vehículo o por WhatsApp.'}
  ];

  return (
    <main className="container" style={{paddingTop:32,paddingBottom:64}}>
      <div className="crumb"><a onClick={()=>navigate('home')}>Inicio</a><span className="crumb-sep">/</span><span>Contacto</span></div>
      <h1 className="t-title-lg">Hablemos.</h1>
      <p className="t-muted" style={{marginBottom:32,maxWidth:560}}>Te respondemos en menos de 24 horas hábiles. Para algo urgente, escríbenos por WhatsApp.</p>

      <div className="cols-2" style={{gridTemplateColumns:'1.4fr 1fr'}}>
        <form onSubmit={submit} className="card" style={{padding:32}}>
          <div className="form-grid">
            <div><label className="field-label">Nombre</label><input className="input input-lg" required value={form.nombre} onChange={e=>setForm({...form,nombre:e.target.value})}/></div>
            <div><label className="field-label">Teléfono</label><input className="input input-lg" required value={form.phone} onChange={e=>setForm({...form,phone:e.target.value})}/></div>
            <div style={{gridColumn:'1/-1'}}><label className="field-label">Email</label><input className="input input-lg" type="email" required value={form.email} onChange={e=>setForm({...form,email:e.target.value})}/></div>
            <div style={{gridColumn:'1/-1'}}>
              <label className="field-label">Motivo</label>
              <div className="segmented" style={{width:'100%'}}>
                {[['consulta','Consulta'],['cita','Agendar prueba'],['credito','Crédito'],['otro','Otro']].map(([k,l])=>
                  <button type="button" key={k} className={form.motivo===k?'active':''} onClick={()=>setForm({...form,motivo:k})} style={{flex:1}}>{l}</button>
                )}
              </div>
            </div>
            <div style={{gridColumn:'1/-1'}}><label className="field-label">Mensaje</label><textarea className="input" rows={5} value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} placeholder="Cuéntanos qué buscas..."/></div>
          </div>
          <div className="row" style={{marginTop:20,gap:12,flexWrap:'wrap'}}>
            <button type="submit" className="btn btn-primary btn-xl" style={{flex:1,minWidth:200}}>{I.send}Enviar mensaje</button>
            <a href="#" className="btn btn-subtle btn-xl">{I.whatsapp}WhatsApp</a>
          </div>
          <p className="t-caption t-faint" style={{marginTop:12}}>Al enviar aceptas nuestra política de privacidad y tratamiento de datos.</p>
        </form>

        <div className="stack" style={{'--stack':'12px'}}>
          {[
            {ic:I.whatsapp,t:'WhatsApp',v:'+57 300 555 0123',a:'Chat directo · respuesta inmediata'},
            {ic:I.phone,t:'Teléfono',v:'(605) 6 555 0123',a:'Lun-Sáb 8am-7pm'},
            {ic:I.pin,t:'Showroom',v:'Cra. 2 #11-41, Bocagrande',a:'Cartagena · Colombia'},
            {ic:I.calendar,t:'Horario',v:'Lun a Sáb · 8am-7pm',a:'Domingos: 10am-2pm'}
          ].map((c,i)=>(
            <div key={i} className="card" style={{padding:20}}>
              <div className="row" style={{gap:14}}>
                <div style={{width:44,height:44,borderRadius:'var(--r-md)',background:'var(--gold-100)',color:'var(--gold-700)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{c.ic}</div>
                <div>
                  <div className="t-caption t-muted" style={{textTransform:'uppercase',letterSpacing:'0.06em',fontWeight:700}}>{c.t}</div>
                  <strong>{c.v}</strong>
                  <div className="t-caption t-muted">{c.a}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Mapa */}
      <section className="section">
        <div className="section-eyebrow">Cómo llegar</div>
        <h2 className="section-h1">Visítanos en <span className="t-gold-grad">Bocagrande</span></h2>
        <div className="map-frame">
          <div className="map-pin"><div className="map-pin-dot"></div><div>Altorra Cars<br/><span className="t-caption t-muted">Cra. 2 #11-41</span></div></div>
          <div className="map-grid"></div>
          <svg className="map-roads" viewBox="0 0 800 400" preserveAspectRatio="xMidYMid slice">
            <path d="M 0 200 Q 200 180 400 200 T 800 220" stroke="rgba(255,255,255,0.4)" strokeWidth="32" fill="none" strokeLinecap="round"/>
            <path d="M 400 0 L 380 200 L 360 400" stroke="rgba(255,255,255,0.3)" strokeWidth="24" fill="none" strokeLinecap="round"/>
            <path d="M 100 0 L 120 100 L 100 200" stroke="rgba(255,255,255,0.25)" strokeWidth="20" fill="none" strokeLinecap="round"/>
            <path d="M 600 100 L 620 250 L 600 400" stroke="rgba(255,255,255,0.25)" strokeWidth="20" fill="none" strokeLinecap="round"/>
          </svg>
          <div className="map-legend">
            <strong>Bocagrande, Cartagena</strong>
            <div className="t-caption t-muted">A 5 min del Centro Histórico</div>
            <div className="row" style={{gap:8,marginTop:10}}>
              <a href="#" className="btn btn-primary btn-sm">{I.pin}Cómo llegar</a>
              <a href="#" className="btn btn-subtle btn-sm">Uber</a>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section">
        <div className="section-eyebrow">Preguntas frecuentes</div>
        <h2 className="section-h1">Resolvemos las dudas <span className="t-gold-grad">más comunes</span></h2>
        <div className="stack" style={{'--stack':'8px',marginTop:24,maxWidth:820}}>
          {faqs.map((f,i)=>(
            <div key={i} className={`faq-item ${openFaq===i?'open':''}`}>
              <button className="faq-q" onClick={()=>setOpenFaq(openFaq===i?-1:i)}>
                <span>{f.q}</span>
                <span className="faq-chev">{I.chev(openFaq===i?'up':'down')}</span>
              </button>
              {openFaq===i && <div className="faq-a t-muted">{f.a}</div>}
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

// ───── RESEÑAS · stats bar + filtros + write modal
function Resenas({ navigate, toast }) {
  const [filter, setFilter] = useState(0); // 0 = all, 5/4/3/2/1
  const [writeOpen, setWriteOpen] = useState(false);
  const [stars, setStars] = useState(5);
  const [hoverStars, setHoverStars] = useState(0);

  const all = AltorraData.TESTIMONIALS.concat(AltorraData.TESTIMONIALS).map((t,i)=>({...t,i}));
  const filtered = filter ? all.filter(t=>t.stars===filter) : all;
  const counts = [5,4,3,2,1].map(s=>all.filter(t=>t.stars===s).length);
  const total = all.length;
  const avg = (all.reduce((a,t)=>a+t.stars,0)/total).toFixed(1);

  return (
    <main className="container" style={{paddingTop:32,paddingBottom:64}}>
      <div className="crumb"><a onClick={()=>navigate('home')}>Inicio</a><span className="crumb-sep">/</span><span>Reseñas</span></div>

      {/* Stats bar */}
      <div className="reviews-stats card" style={{padding:32,marginBottom:32}}>
        <div className="reviews-stats-score">
          <div style={{fontFamily:'var(--font-display)',fontSize:72,fontWeight:800,lineHeight:1}} className="t-gold-grad">{avg}</div>
          <div className="review-stars" style={{marginTop:8,fontSize:18}}>{Array.from({length:5}).map((_,i)=>I.star(i<Math.round(avg)))}</div>
          <div className="t-caption t-muted" style={{marginTop:6}}>basado en {total} reseñas</div>
        </div>
        <div className="reviews-stats-bars">
          {[5,4,3,2,1].map((s,i)=>(
            <button key={s} className={`reviews-bar-row ${filter===s?'active':''}`} onClick={()=>setFilter(filter===s?0:s)}>
              <span className="reviews-bar-label">{s} ★</span>
              <span className="reviews-bar-track"><span className="reviews-bar-fill" style={{width:`${(counts[i]/total)*100}%`}}></span></span>
              <span className="reviews-bar-count">{counts[i]}</span>
            </button>
          ))}
        </div>
        <div className="reviews-stats-cta">
          <button className="btn btn-primary btn-lg" onClick={()=>setWriteOpen(true)}>{I.send}Escribir reseña</button>
          {filter>0 && <button className="btn btn-subtle btn-sm" onClick={()=>setFilter(0)} style={{marginTop:8}}>Quitar filtro ({filter}★)</button>}
        </div>
      </div>

      {/* Reviews grid */}
      <div className="row" style={{justifyContent:'space-between',marginBottom:16,alignItems:'center'}}>
        <strong>{filtered.length} {filter?`de ${filter} estrellas`:'reseñas'}</strong>
        <span className="t-caption t-muted">Ordenado por más recientes</span>
      </div>
      <div className="v-grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(320px,1fr))'}}>
        {filtered.map((t,i)=>(
          <div key={i} className="review-card">
            <div className="row" style={{gap:10}}>
              <div className="review-avatar">{t.name[0]}</div>
              <div style={{flex:1,minWidth:0}}>
                <strong>{t.name}</strong>
                <div className="t-caption t-muted">{t.city} · hace {(t.i+1)*3} días</div>
              </div>
              <span className="review-stars">{Array.from({length:5}).map((_,k)=>I.star(k<t.stars))}</span>
            </div>
            <p style={{marginTop:14,lineHeight:1.6}}>"{t.text}"</p>
            <div className="row" style={{marginTop:14,gap:10,paddingTop:12,borderTop:'1px solid var(--surface-stroke)'}}>
              <span className="t-caption t-faint">Útil · 👍 {((t.i*7)%20)+3}</span>
              <span className="t-caption t-faint" style={{marginLeft:'auto'}}>Verificado ✓</span>
            </div>
          </div>
        ))}
      </div>

      {/* Write review modal */}
      <Modal open={writeOpen} onClose={()=>setWriteOpen(false)} title="Escribir reseña" size="md">
        <div className="stack" style={{'--stack':'16px'}}>
          <div>
            <label className="field-label">Tu calificación</label>
            <div className="row" style={{gap:6,marginTop:6}}>
              {[1,2,3,4,5].map(n=>(
                <button key={n} type="button" className="star-btn" onMouseEnter={()=>setHoverStars(n)} onMouseLeave={()=>setHoverStars(0)} onClick={()=>setStars(n)} style={{color:n<=(hoverStars||stars)?'var(--gold-500)':'var(--ink-text-faint)'}}>
                  {I.star(n<=(hoverStars||stars))}
                </button>
              ))}
              <span className="t-caption t-muted" style={{marginLeft:8}}>{stars} de 5</span>
            </div>
          </div>
          <div><label className="field-label">Tu nombre</label><input className="input input-lg" placeholder="Ej: María López"/></div>
          <div><label className="field-label">Vehículo comprado (opcional)</label><input className="input input-lg" placeholder="Ej: Toyota RAV4 2024"/></div>
          <div><label className="field-label">Tu reseña</label><textarea className="input" rows={5} placeholder="Cuéntanos tu experiencia..."/></div>
          <button className="btn btn-primary btn-xl" onClick={()=>{toast('Reseña enviada para revisión','success');setWriteOpen(false);}}>{I.send}Publicar reseña</button>
        </div>
      </Modal>
    </main>
  );
}

// ───── FAVORITOS · empty state + bulk actions
function Favoritos({ navigate, favorites, onFav, onCompare, toast }) {
  const items = favorites.map(id=>AltorraData.VEHICLES.find(v=>v.id===id)).filter(Boolean);

  return (
    <main className="container" style={{paddingTop:32,paddingBottom:64}}>
      <div className="crumb"><a onClick={()=>navigate('home')}>Inicio</a><span className="crumb-sep">/</span><span>Favoritos</span></div>

      <div className="row" style={{justifyContent:'space-between',marginBottom:24,alignItems:'flex-end',flexWrap:'wrap',gap:16}}>
        <div>
          <h1 className="t-title-lg">Mis favoritos</h1>
          <p className="t-muted">{items.length} {items.length===1?'vehículo guardado':'vehículos guardados'}</p>
        </div>
        {items.length>0 && (
          <div className="row" style={{gap:8}}>
            <button className="btn btn-subtle btn-lg" onClick={()=>{items.slice(0,3).forEach(v=>onCompare(v.id));navigate('comparar');}}>{I.scale}Comparar todos</button>
            <button className="btn btn-subtle btn-lg" onClick={()=>{items.forEach(v=>onFav(v.id));toast('Favoritos limpiados');}}>{I.close}Limpiar todo</button>
          </div>
        )}
      </div>

      {items.length===0 ? (
        <div className="empty empty-fav">
          <div className="empty-illus">
            <svg viewBox="0 0 200 200" width="160" height="160" fill="none">
              <circle cx="100" cy="100" r="80" fill="var(--gold-100)" opacity="0.4"/>
              <path d="M100 130 C 70 110 50 90 50 70 A 20 20 0 0 1 90 70 C 92 65 96 60 100 60 C 104 60 108 65 110 70 A 20 20 0 0 1 150 70 C 150 90 130 110 100 130 Z" fill="none" stroke="var(--gold-600)" strokeWidth="2.5" strokeDasharray="4 4"/>
            </svg>
          </div>
          <h3 className="t-title-sm" style={{marginTop:8}}>Aún no tienes favoritos</h3>
          <p className="t-muted" style={{maxWidth:420,margin:'8px auto 0'}}>Toca el <span style={{color:'var(--gold-700)'}}>♡</span> en cualquier vehículo para guardarlo aquí. Tus favoritos se sincronizan en todos tus dispositivos.</p>
          <div className="row" style={{justifyContent:'center',gap:10,marginTop:20}}>
            <button className="btn btn-primary btn-xl" onClick={()=>navigate('busqueda')}>{I.search}Explorar catálogo</button>
            <button className="btn btn-subtle btn-xl" onClick={()=>navigate('cat:nuevos')}>Ver 0 KM</button>
          </div>
        </div>
      ) : (
        <>
          <div className="v-grid">
            {items.map(v=><VehicleCard key={v.id} v={v} favorites={favorites} onFav={onFav} onCompare={onCompare} navigate={navigate} />)}
          </div>
          <div className="card" style={{padding:24,marginTop:32,textAlign:'center'}}>
            <strong>¿Listo para dar el siguiente paso?</strong>
            <p className="t-muted" style={{marginTop:6,marginBottom:14}}>Agenda una visita y prueba estos vehículos en nuestro showroom de Bocagrande.</p>
            <button className="btn btn-primary btn-lg" onClick={()=>navigate('contacto')}>{I.calendar}Agendar visita</button>
          </div>
        </>
      )}
    </main>
  );
}

// ───── MARCAS · grid con búsqueda
function Marcas({ navigate }) {
  const [q, setQ] = useState('');
  const filtered = AltorraData.BRANDS.filter(b=>b.name.toLowerCase().includes(q.toLowerCase()));
  const total = AltorraData.BRANDS.reduce((a,b)=>a+b.count,0);

  return (
    <main className="container" style={{paddingTop:32,paddingBottom:64}}>
      <div className="crumb"><a onClick={()=>navigate('home')}>Inicio</a><span className="crumb-sep">/</span><span>Marcas</span></div>

      <div className="row" style={{justifyContent:'space-between',alignItems:'flex-end',marginBottom:24,flexWrap:'wrap',gap:16}}>
        <div>
          <h1 className="t-title-lg">Marcas que vendemos</h1>
          <p className="t-muted">{AltorraData.BRANDS.length} marcas · {total} vehículos en stock</p>
        </div>
        <div className="search-input" style={{minWidth:280}}>
          <span className="search-icon">{I.search}</span>
          <input className="input input-lg" placeholder="Buscar marca..." value={q} onChange={e=>setQ(e.target.value)}/>
        </div>
      </div>

      {filtered.length===0 ? (
        <div className="empty"><div className="empty-icon">🔍</div><h3 className="t-subtitle">Sin resultados</h3><p className="t-muted">No encontramos marcas con "{q}".</p></div>
      ) : (
        <div className="grid" style={{gridTemplateColumns:'repeat(auto-fit,minmax(180px,1fr))',gap:16}}>
          {filtered.map(b=>(
            <div key={b.slug} className="brand-tile-pro" onClick={()=>navigate('busqueda',{brand:b.slug})}>
              <div className="brand-tile-pro-logo">
                <img src={b.logo} alt={b.name}/>
              </div>
              <div className="brand-tile-pro-foot">
                <strong>{b.name}</strong>
                <span className="t-caption" style={{color:'var(--gold-700)',fontWeight:600}}>{b.count} disponibles{I.arrowR}</span>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="cta-band" style={{marginTop:48}}>
        <div>
          <h3 style={{fontFamily:'var(--font-display)',fontSize:'clamp(20px,2.5vw,28px)',fontWeight:800}}>¿No encuentras tu marca?</h3>
          <p className="t-muted" style={{marginTop:4}}>Pídenos lo que buscas — la conseguimos para ti.</p>
        </div>
        <button className="btn btn-primary btn-lg" onClick={()=>navigate('contacto')}>Solicitar vehículo{I.arrowR}</button>
      </div>
    </main>
  );
}

// ───── CATEGORÍA
function CatPage({ navigate, slug, favorites, onFav, onCompare, toast }) {
  const cat = AltorraData.CATEGORIES.find(c=>c.slug===slug);
  let initialFilter = {};
  if (['nuevos','usados'].includes(slug)) initialFilter = {condition:slug==='nuevos'?'nuevo':'usado'};
  else initialFilter = {cat:slug};

  return (
    <div>
      <section style={{position:'relative',padding:'56px 0',background:`linear-gradient(rgba(5,5,8,0.65),rgba(5,5,8,0.45)),url(${cat?.img||'cat/SUV.jpg'})`,backgroundSize:'cover',backgroundPosition:'center',color:'white'}}>
        <div className="container">
          <div className="hero-eyebrow" style={{background:'rgba(255,255,255,0.1)',color:'white',borderColor:'rgba(255,255,255,0.2)'}}><span className="dot"></span>Categoría</div>
          <h1 className="hero-title" style={{marginTop:12,fontSize:'clamp(36px,5vw,64px)',color:'white'}}>{cat?.name||slug}</h1>
          <p style={{opacity:0.85,maxWidth:520,marginTop:8}}>{cat?.count||AltorraData.VEHICLES.length} vehículos seleccionados · stock actualizado</p>
        </div>
      </section>
      <Search navigate={navigate} favorites={favorites} onFav={onFav} onCompare={onCompare} initialFilter={initialFilter} toast={toast} />
    </div>
  );
}

// ───── PERFIL · contenido real en cada tab
function Perfil({ navigate, favorites }) {
  const [tab, setTab] = useState('cuenta');
  const [notif, setNotif] = useState({ofertas:true,llegadas:true,citas:false,marketing:false});
  const [pref, setPref] = useState({tema:'sistema',idioma:'es',moneda:'COP'});

  const historial = AltorraData.VEHICLES.slice(0,4).map(v=>({v, when:'hace 3 días'}));
  const citas = [
    {fecha:'Vie 15 Mar · 3:00pm', vehiculo:'Toyota RAV4 2024', estado:'confirmada'},
    {fecha:'Sáb 23 Mar · 10:00am', vehiculo:'BMW X3 2023', estado:'pendiente'}
  ];

  return (
    <main className="container" style={{paddingTop:32,paddingBottom:64}}>
      <div className="crumb"><a onClick={()=>navigate('home')}>Inicio</a><span className="crumb-sep">/</span><span>Perfil</span></div>
      <h1 className="t-title-lg">Mi cuenta</h1>
      <div className="profile-grid" style={{marginTop:24}}>
        <div className="profile-side">
          <div className="profile-side-head">
            <div className="review-avatar" style={{width:64,height:64,fontSize:26}}>U</div>
            <div style={{minWidth:0,flex:1}}>
              <strong style={{display:'block'}}>Usuario Demo</strong>
              <div className="t-caption t-muted" style={{overflow:'hidden',textOverflow:'ellipsis',whiteSpace:'nowrap'}}>demo@altorra.com</div>
              <div className="profile-pill">{I.shield}<span>Cliente Premium</span></div>
            </div>
          </div>
          <div className="stack" style={{'--stack':'4px',marginTop:20}}>
            {[
              ['cuenta','Mi cuenta',I.user],
              ['favoritos','Favoritos',I.heart(false),favorites.length],
              ['historial','Historial',I.car,historial.length],
              ['citas','Mis citas',I.calendar,citas.length],
              ['notif','Notificaciones',I.bell],
              ['ajustes','Ajustes',I.gear]
            ].map(([k,l,ic,n])=>
              <button key={k} className={`profile-tab ${tab===k?'active':''}`} onClick={()=>setTab(k)}>
                <span className="row" style={{gap:10}}>{ic}<span>{l}</span></span>
                {n!==undefined && <span className="profile-pip">{n}</span>}
              </button>
            )}
          </div>
          <button className="btn btn-subtle btn-sm" style={{width:'100%',marginTop:20}}>Cerrar sesión</button>
        </div>

        <div className="card" style={{padding:32}}>
          {tab==='cuenta' && (
            <>
              <h3 className="t-subtitle" style={{marginBottom:16}}>Información personal</h3>
              <div className="form-grid">
                <div><label className="field-label">Nombre</label><input className="input input-lg" defaultValue="Usuario Demo"/></div>
                <div><label className="field-label">Teléfono</label><input className="input input-lg" defaultValue="+57 300 555 0123"/></div>
                <div style={{gridColumn:'1/-1'}}><label className="field-label">Email</label><input className="input input-lg" defaultValue="demo@altorra.com"/></div>
                <div><label className="field-label">Ciudad</label><input className="input input-lg" defaultValue="Cartagena"/></div>
                <div><label className="field-label">Documento</label><input className="input input-lg" placeholder="C.C. 1.234.567.890"/></div>
                <div className="row" style={{gridColumn:'1/-1',gap:10,marginTop:8}}>
                  <button className="btn btn-primary btn-lg">Guardar cambios</button>
                  <button className="btn btn-subtle btn-lg">Cancelar</button>
                </div>
              </div>
            </>
          )}
          {tab==='favoritos' && (
            <>
              <h3 className="t-subtitle" style={{marginBottom:16}}>Vehículos favoritos</h3>
              {favorites.length>0 ? (
                <>
                  <p className="t-muted" style={{marginBottom:16}}>Tienes {favorites.length} {favorites.length===1?'vehículo guardado':'vehículos guardados'}.</p>
                  <button className="btn btn-primary btn-lg" onClick={()=>navigate('favoritos')}>Ver todos{I.arrowR}</button>
                </>
              ) : (
                <p className="t-muted">Aún no tienes favoritos. <a onClick={()=>navigate('busqueda')} style={{color:'var(--gold-700)',cursor:'pointer'}}>Explorar catálogo →</a></p>
              )}
            </>
          )}
          {tab==='historial' && (
            <>
              <h3 className="t-subtitle" style={{marginBottom:16}}>Vehículos visitados</h3>
              <div className="stack" style={{'--stack':'10px'}}>
                {historial.map((h,i)=>(
                  <div key={i} className="profile-row" onClick={()=>navigate('detail:'+h.v.id)}>
                    <div className="profile-row-thumb" style={{background:h.v.images[0].bg}}></div>
                    <div style={{flex:1,minWidth:0}}>
                      <strong>{h.v.brandName} {h.v.model}</strong>
                      <div className="t-caption t-muted">{h.when} · {h.v.priceFmt}</div>
                    </div>
                    {I.arrowR}
                  </div>
                ))}
              </div>
            </>
          )}
          {tab==='citas' && (
            <>
              <div className="row" style={{justifyContent:'space-between',marginBottom:16}}>
                <h3 className="t-subtitle">Mis citas agendadas</h3>
                <button className="btn btn-primary btn-sm" onClick={()=>navigate('contacto')}>{I.calendar}Nueva cita</button>
              </div>
              <div className="stack" style={{'--stack':'10px'}}>
                {citas.map((c,i)=>(
                  <div key={i} className="profile-row">
                    <div style={{width:48,height:48,borderRadius:10,background:'var(--gold-100)',color:'var(--gold-700)',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>{I.calendar}</div>
                    <div style={{flex:1,minWidth:0}}>
                      <strong>{c.vehiculo}</strong>
                      <div className="t-caption t-muted">{c.fecha}</div>
                    </div>
                    <span className={`v-tag ${c.estado==='confirmada'?'v-tag-gold':''}`}>{c.estado}</span>
                  </div>
                ))}
              </div>
            </>
          )}
          {tab==='notif' && (
            <>
              <h3 className="t-subtitle" style={{marginBottom:16}}>Centro de notificaciones</h3>
              <div className="stack" style={{'--stack':'4px'}}>
                {[
                  ['ofertas','Ofertas y promociones','Recibe avisos de descuentos especiales'],
                  ['llegadas','Nuevas llegadas','Cuando llegue un vehículo que coincida con tus búsquedas'],
                  ['citas','Recordatorios de citas','Avisos antes de tus visitas agendadas'],
                  ['marketing','Newsletter semanal','Resumen del mercado automotor cada lunes']
                ].map(([k,t,d])=>(
                  <label key={k} className="toggle-row">
                    <div><strong>{t}</strong><div className="t-caption t-muted">{d}</div></div>
                    <input type="checkbox" className="toggle" checked={notif[k]} onChange={()=>setNotif({...notif,[k]:!notif[k]})}/>
                  </label>
                ))}
              </div>
            </>
          )}
          {tab==='ajustes' && (
            <>
              <h3 className="t-subtitle" style={{marginBottom:16}}>Preferencias</h3>
              <div className="form-grid">
                <div>
                  <label className="field-label">Tema</label>
                  <div className="segmented">
                    {[['claro','Claro'],['oscuro','Oscuro'],['sistema','Sistema']].map(([k,l])=>
                      <button key={k} className={pref.tema===k?'active':''} onClick={()=>setPref({...pref,tema:k})} style={{flex:1}}>{l}</button>
                    )}
                  </div>
                </div>
                <div>
                  <label className="field-label">Idioma</label>
                  <select className="input input-lg" value={pref.idioma} onChange={e=>setPref({...pref,idioma:e.target.value})}>
                    <option value="es">Español</option><option value="en">English</option>
                  </select>
                </div>
                <div style={{gridColumn:'1/-1'}}>
                  <label className="field-label">Moneda</label>
                  <div className="segmented">
                    {[['COP','Pesos · COP'],['USD','Dólar · USD']].map(([k,l])=>
                      <button key={k} className={pref.moneda===k?'active':''} onClick={()=>setPref({...pref,moneda:k})} style={{flex:1}}>{l}</button>
                    )}
                  </div>
                </div>
                <div style={{gridColumn:'1/-1',paddingTop:16,marginTop:8,borderTop:'1px solid var(--surface-stroke)'}}>
                  <strong style={{display:'block',marginBottom:6,color:'#d44'}}>Zona de peligro</strong>
                  <button className="btn btn-subtle btn-sm" style={{color:'#d44'}}>Eliminar mi cuenta</button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}

function LegalPage({ navigate, kind }) {
  const data = {
    terminos:{t:'Términos y Condiciones',hero:'heroes/terminos.jpg',body:[['Aceptación','Al usar Altorra Cars aceptas estos términos en su totalidad.'],['Uso del sitio','El contenido es solo informativo. Los precios pueden variar sin previo aviso.'],['Propiedad intelectual','Todos los logos y marcas son propiedad de sus respectivos dueños.'],['Limitación','Altorra Cars no se hace responsable por fluctuaciones de mercado.']]},
    privacidad:{t:'Política de Privacidad',hero:'heroes/contacto.jpg',body:[['Datos que recopilamos','Información de contacto, vehículos de interés y preferencias.'],['Uso','Mejorar tu experiencia y enviarte ofertas relevantes.'],['No compartimos','Tus datos no se venden a terceros bajo ninguna circunstancia.'],['Tus derechos','Puedes solicitar borrado o exportación de tus datos en cualquier momento.']]},
    cookies:{t:'Política de Cookies',hero:'heroes/resenas.jpg',body:[['Qué son','Pequeños archivos que mejoran la navegación.'],['Tipos','Funcionales, analíticas y de marketing.'],['Control','Puedes desactivarlas desde la configuración de tu navegador.']]}
  }[kind];
  return (
    <main>
      <section style={{position:'relative',padding:'80px 0',background:`linear-gradient(rgba(5,5,8,0.6),rgba(5,5,8,0.4)),url(${data.hero})`,backgroundSize:'cover',color:'white'}}>
        <div className="container"><h1 className="hero-title" style={{color:'white',fontSize:'clamp(36px,5vw,64px)'}}>{data.t}</h1></div>
      </section>
      <section className="container" style={{paddingBlock:48,maxWidth:760}}>
        <div className="stack" style={{'--stack':'24px'}}>
          {data.body.map(([h,t])=>(
            <div key={h}><h3 className="t-subtitle">{h}</h3><p className="t-muted" style={{marginTop:8,lineHeight:1.7}}>{t}</p></div>
          ))}
        </div>
      </section>
    </main>
  );
}

function NotFound({ navigate }) {
  return (
    <main className="container" style={{paddingTop:80,paddingBottom:80,textAlign:'center'}}>
      <div style={{fontFamily:'var(--font-display)',fontSize:140,fontWeight:800,lineHeight:1}} className="t-gold-grad">404</div>
      <h1 className="t-title">Página no encontrada</h1>
      <p className="t-muted" style={{marginTop:8,maxWidth:480,margin:'8px auto 0'}}>El vehículo que buscas se fue de paseo. Volvamos al inicio.</p>
      <div className="row" style={{justifyContent:'center',gap:10,marginTop:24}}>
        <button className="btn btn-subtle btn-xl" onClick={()=>navigate('busqueda')}>Ver catálogo</button>
        <button className="btn btn-primary btn-xl" onClick={()=>navigate('home')}>Volver al inicio</button>
      </div>
    </main>
  );
}

// ───── AUTH MODAL · pulido (split panel + social)
function AuthModal({ open, onClose, toast }) {
  const [tab, setTab] = useState('login');
  const [show, setShow] = useState(false);
  return (
    <Modal open={open} onClose={onClose} title="" size="lg">
      <div className="auth-split">
        <div className="auth-side">
          <div className="row" style={{gap:10}}>
            <img src="logo-wheel.png" alt="" style={{width:36,height:36}}/>
            <strong className="t-gold-grad" style={{fontFamily:'var(--font-display)',fontWeight:800,letterSpacing:'0.04em'}}>ALTORRA CARS</strong>
          </div>
          <h3 style={{fontFamily:'var(--font-display)',fontSize:32,fontWeight:800,marginTop:24,lineHeight:1.15}}>
            Tu próximo carro <span className="t-gold-grad">empieza aquí.</span>
          </h3>
          <ul className="auth-perks">
            <li>{I.check}<span>Guarda tus favoritos en todos tus dispositivos</span></li>
            <li>{I.check}<span>Avisos de nuevas llegadas que coincidan contigo</span></li>
            <li>{I.check}<span>Simulador de crédito personalizado</span></li>
            <li>{I.check}<span>Agenda pruebas y citas en un clic</span></li>
          </ul>
          <div className="auth-side-foot">
            <div className="row" style={{gap:8}}>
              <span className="review-stars">{Array.from({length:5}).map(()=>I.star(true))}</span>
              <strong>4.9</strong>
            </div>
            <span className="t-caption" style={{opacity:0.85}}>"El mejor proceso de compra que he tenido." — María L.</span>
          </div>
        </div>
        <div className="auth-form">
          <div className="row" style={{justifyContent:'space-between',marginBottom:6}}>
            <h3 className="t-subtitle">{tab==='login'?'Iniciar sesión':'Crear cuenta'}</h3>
            <button className="btn btn-icon btn-ghost" onClick={onClose}>{I.close}</button>
          </div>
          <p className="t-muted t-caption" style={{marginBottom:18}}>{tab==='login'?'Bienvenido de vuelta.':'Tarda menos de 30 segundos.'}</p>

          <div className="segmented" style={{width:'100%',marginBottom:20}}>
            <button className={tab==='login'?'active':''} onClick={()=>setTab('login')} style={{flex:1}}>Ingresar</button>
            <button className={tab==='register'?'active':''} onClick={()=>setTab('register')} style={{flex:1}}>Registrarme</button>
          </div>

          <div className="stack" style={{'--stack':'12px'}}>
            {tab==='register' && <div><label className="field-label">Nombre completo</label><input className="input input-lg" placeholder="Tu nombre"/></div>}
            <div><label className="field-label">Email</label><input className="input input-lg" type="email" placeholder="tu@email.com"/></div>
            <div>
              <div className="row" style={{justifyContent:'space-between'}}>
                <label className="field-label">Contraseña</label>
                {tab==='login' && <a href="#" className="t-caption" style={{color:'var(--gold-700)',fontWeight:600}}>¿Olvidaste?</a>}
              </div>
              <div className="input-wrap">
                <input className="input input-lg" type={show?'text':'password'} placeholder="••••••••"/>
                <button type="button" className="input-suffix" onClick={()=>setShow(!show)}>{show?'Ocultar':'Mostrar'}</button>
              </div>
            </div>
            {tab==='register' && (
              <label className="row" style={{gap:10,alignItems:'flex-start',cursor:'pointer'}}>
                <input type="checkbox" defaultChecked style={{marginTop:4}}/>
                <span className="t-caption t-muted">Acepto los <a href="#" style={{color:'var(--gold-700)'}}>términos</a> y la <a href="#" style={{color:'var(--gold-700)'}}>política de privacidad</a>.</span>
              </label>
            )}
            <button className="btn btn-primary btn-xl" onClick={()=>{toast(tab==='login'?'Sesión iniciada':'Cuenta creada','success');onClose();}}>{tab==='login'?'Iniciar sesión':'Crear cuenta'}{I.arrowR}</button>

            <div className="auth-divider"><span>o continúa con</span></div>
            <div className="row" style={{gap:10}}>
              <button className="btn btn-subtle btn-lg auth-social" style={{flex:1}}>
                <svg viewBox="0 0 48 48" width="18" height="18"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3c-1.6 4.6-6 8-11.3 8a12 12 0 0 1 0-24c3 0 5.7 1.1 7.8 3l5.7-5.7C33.5 6.1 29 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.6-.4-3.5z"/><path fill="#FF3D00" d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.5 6.1 29 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c4.9 0 9.4-1.9 12.7-5l-5.9-5c-2 1.4-4.4 2.2-6.8 2.2-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.5l5.9 5c-.4.4 6.5-4.7 6.5-14.5 0-1.3-.1-2.6-.4-3.5z"/></svg>
                Google
              </button>
              <button className="btn btn-subtle btn-lg auth-social" style={{flex:1}}>
                <svg viewBox="0 0 24 24" width="18" height="18" fill="#1877F2"><path d="M22 12a10 10 0 1 0-11.6 9.9v-7H8v-3h2.4V9.4c0-2.4 1.4-3.7 3.6-3.7 1 0 2.1.2 2.1.2v2.3h-1.2c-1.2 0-1.5.7-1.5 1.5V12h2.6l-.4 3h-2.2v7A10 10 0 0 0 22 12z"/></svg>
                Facebook
              </button>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}

Object.assign(window, { Nosotros, Contacto, Resenas, Favoritos, Marcas, CatPage, Perfil, LegalPage, NotFound, AuthModal });
