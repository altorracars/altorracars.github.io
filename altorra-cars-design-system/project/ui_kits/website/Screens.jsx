// Search + Detail screens — Altorra Cars UI Kit
const { useState: useSearchState } = React;

function SearchScreen({ onNavigate, vehicles }) {
  const [activeFilter, setActiveFilter] = useSearchState('Todos');
  const [priceRange, setPriceRange] = useSearchState(200);

  const types = ['Todos','SUV','Sedán','Hatchback','Pickup'];

  const filtered = activeFilter === 'Todos'
    ? vehicles
    : vehicles.filter(v => v.type === activeFilter);

  return (
    <div style={{background:'#0a0a0a',minHeight:'100vh',paddingTop:70}}>
      {/* Page hero bar */}
      <div style={{background:'#111',borderBottom:'1px solid rgba(184,150,88,0.15)',padding:'20px 32px',display:'flex',alignItems:'center',gap:8}}>
        <span style={{color:'#9c9997',fontSize:'0.82rem',cursor:'pointer'}} onClick={() => onNavigate('home')}>Inicio</span>
        <span style={{color:'#555',fontSize:'0.82rem'}}>/</span>
        <span style={{color:'#d4af37',fontSize:'0.82rem',fontWeight:600}}>Catálogo de Vehículos</span>
      </div>

      <div style={{maxWidth:1200,margin:'0 auto',padding:'32px',display:'grid',gridTemplateColumns:'260px 1fr',gap:28}}>
        {/* Filters sidebar */}
        <aside>
          <div style={searchS.sidebar}>
            <div style={searchS.sidebarTitle}>Filtros</div>

            <FilterSection title="Tipo de Vehículo">
              <div style={{display:'flex',flexDirection:'column',gap:6}}>
                {types.map(t => (
                  <label key={t} style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer'}}
                    onClick={() => setActiveFilter(t)}>
                    <div style={{width:16,height:16,borderRadius:4,border:`2px solid ${activeFilter===t?'#d4af37':'rgba(255,255,255,0.2)'}`,background:activeFilter===t?'#d4af37':'transparent',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0,transition:'all 0.2s'}}>
                      {activeFilter===t && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#0a0a0a" strokeWidth="3"><polyline points="20 6 9 17 4 12"/></svg>}
                    </div>
                    <span style={{color: activeFilter===t?'#d4af37':'#b0b0b0',fontSize:'0.85rem',fontWeight:activeFilter===t?600:400}}>{t}</span>
                  </label>
                ))}
              </div>
            </FilterSection>

            <FilterSection title="Precio Máximo">
              <div style={{marginBottom:8}}>
                <span style={{color:'#d4af37',fontSize:'0.9rem',fontWeight:700}}>${priceRange}.000.000</span>
              </div>
              <input type="range" min="30" max="300" value={priceRange}
                onChange={e => setPriceRange(e.target.value)}
                style={{width:'100%',accentColor:'#d4af37'}} />
              <div style={{display:'flex',justifyContent:'space-between',color:'#9c9997',fontSize:'0.68rem',marginTop:4}}>
                <span>$30M</span><span>$300M</span>
              </div>
            </FilterSection>

            <FilterSection title="Marca">
              {['Toyota','Chevrolet','Nissan','Kia','Mazda','Ford','Hyundai'].map(b => (
                <label key={b} style={{display:'flex',alignItems:'center',gap:8,cursor:'pointer',marginBottom:5}}>
                  <div style={{width:14,height:14,borderRadius:3,border:'1.5px solid rgba(255,255,255,0.2)',flexShrink:0}}></div>
                  <span style={{color:'#b0b0b0',fontSize:'0.82rem'}}>{b}</span>
                </label>
              ))}
            </FilterSection>

            <button style={{width:'100%',padding:'10px',background:'linear-gradient(135deg,#d4af37,#b89658)',color:'#0a0a0a',border:'none',borderRadius:8,fontWeight:700,fontSize:'0.88rem',cursor:'pointer',marginTop:8,fontFamily:'Poppins,sans-serif'}}>
              Aplicar Filtros
            </button>
          </div>
        </aside>

        {/* Results */}
        <main>
          <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:20}}>
            <div>
              <h1 style={{color:'#fff',fontSize:'1.4rem',fontWeight:700}}>
                Vehículos <span style={{color:'#d4af37'}}>Disponibles</span>
              </h1>
              <p style={{color:'#9c9997',fontSize:'0.82rem',marginTop:2}}>{filtered.length} resultados encontrados</p>
            </div>
            <select style={{background:'#1a1a1a',border:'1px solid rgba(255,255,255,0.15)',borderRadius:8,color:'#e8e8e8',padding:'8px 12px',fontSize:'0.84rem',fontFamily:'Poppins,sans-serif',cursor:'pointer'}}>
              <option>Más recientes</option>
              <option>Precio: menor a mayor</option>
              <option>Precio: mayor a menor</option>
            </select>
          </div>

          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(260px,1fr))',gap:18}}>
            {filtered.map(v => (
              <VehicleCard key={v.id} vehicle={v} onClick={() => onNavigate('detail', v)} />
            ))}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}

function FilterSection({ title, children }) {
  const [open, setOpen] = useSearchState(true);
  return (
    <div style={{marginBottom:20,borderBottom:'1px solid rgba(255,255,255,0.07)',paddingBottom:20}}>
      <div onClick={() => setOpen(!open)}
        style={{display:'flex',justifyContent:'space-between',alignItems:'center',cursor:'pointer',marginBottom:open?12:0}}>
        <span style={{color:'#fff',fontSize:'0.82rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.08em'}}>{title}</span>
        <span style={{color:'#d4af37',fontSize:'0.9rem'}}>{open?'−':'+'}</span>
      </div>
      {open && children}
    </div>
  );
}

function DetailScreen({ vehicle, onNavigate }) {
  const [activeImg, setActiveImg] = useSearchState(0);
  const [fav, setFav] = useSearchState(false);
  const images = [vehicle.image, '../../assets/placeholder-car.jpg', '../../assets/hero-car.jpg'];

  return (
    <div style={{background:'#0a0a0a',minHeight:'100vh',paddingTop:70}}>
      {/* Breadcrumb */}
      <div style={{background:'#111',borderBottom:'1px solid rgba(184,150,88,0.15)',padding:'16px 32px',display:'flex',alignItems:'center',gap:8}}>
        <span style={{color:'#9c9997',fontSize:'0.82rem',cursor:'pointer'}} onClick={() => onNavigate('home')}>Inicio</span>
        <span style={{color:'#555'}}>/</span>
        <span style={{color:'#9c9997',fontSize:'0.82rem',cursor:'pointer'}} onClick={() => onNavigate('search')}>Catálogo</span>
        <span style={{color:'#555'}}>/</span>
        <span style={{color:'#d4af37',fontSize:'0.82rem',fontWeight:600}}>{vehicle.title}</span>
      </div>

      <div style={{maxWidth:1100,margin:'0 auto',padding:'36px 32px',display:'grid',gridTemplateColumns:'1fr 380px',gap:36}}>
        {/* Gallery */}
        <div>
          <div style={{borderRadius:20,overflow:'hidden',height:360,background:'#111',marginBottom:10,border:'1px solid rgba(184,150,88,0.15)'}}>
            <img src={images[activeImg]} alt={vehicle.title}
              style={{width:'100%',height:'100%',objectFit:'cover'}}
              onError={e => e.target.src='../../assets/placeholder-car.jpg'} />
          </div>
          <div style={{display:'flex',gap:8}}>
            {images.map((img,i) => (
              <div key={i} onClick={() => setActiveImg(i)}
                style={{width:80,height:56,borderRadius:10,overflow:'hidden',cursor:'pointer',border:`2px solid ${activeImg===i?'#d4af37':'rgba(255,255,255,0.1)'}`,transition:'border-color 0.2s',flexShrink:0}}>
                <img src={img} alt="" style={{width:'100%',height:'100%',objectFit:'cover'}}
                  onError={e => e.target.src='../../assets/placeholder-car.jpg'} />
              </div>
            ))}
          </div>

          {/* Specs */}
          <div style={{marginTop:28}}>
            <h3 style={{color:'#fff',fontWeight:700,fontSize:'1.1rem',marginBottom:16}}>Especificaciones</h3>
            <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:10}}>
              {[
                ['Año',vehicle.year],['Kilometraje',vehicle.km],
                ['Transmisión',vehicle.trans],['Combustible','Gasolina'],
                ['Color','Blanco Perla'],['Puertas','4'],
              ].map(([k,v]) => (
                <div key={k} style={{background:'#111',borderRadius:10,padding:'12px 16px',border:'1px solid rgba(255,255,255,0.06)'}}>
                  <div style={{color:'#9c9997',fontSize:'0.68rem',textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:4}}>{k}</div>
                  <div style={{color:'#fff',fontWeight:600,fontSize:'0.9rem'}}>{v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div>
          <div style={{position:'sticky',top:90}}>
            <div style={{background:'rgba(255,255,255,0.06)',border:'1px solid rgba(184,150,88,0.2)',borderRadius:20,padding:24,marginBottom:16}}>
              <div style={{display:'flex',alignItems:'center',gap:8,marginBottom:8}}>
                <span style={{background:'#38a28e',color:'#fff',fontSize:'0.68rem',fontWeight:700,padding:'3px 10px',borderRadius:8}}>{vehicle.badge||'NUEVO'}</span>
                {vehicle.offer && <span style={{background:'rgba(231,76,60,0.2)',color:'#e74c3c',fontSize:'0.68rem',fontWeight:700,padding:'3px 10px',borderRadius:8,border:'1px solid rgba(231,76,60,0.3)'}}>OFERTA</span>}
              </div>
              <h1 style={{color:'#fff',fontSize:'1.4rem',fontWeight:800,lineHeight:1.2,marginBottom:6}}>{vehicle.title}</h1>
              <p style={{color:'#9c9997',fontSize:'0.85rem',marginBottom:20}}>{vehicle.year} · {vehicle.km} · {vehicle.trans}</p>

              {vehicle.originalPrice && (
                <div style={{color:'#9c9997',fontSize:'0.9rem',textDecoration:'line-through',marginBottom:2}}>${vehicle.originalPrice}</div>
              )}
              <div style={{fontSize:'2rem',fontWeight:800,color:'#d4af37',lineHeight:1,marginBottom:8}}>${vehicle.price}</div>
              <div style={{color:'#9c9997',fontSize:'0.75rem'}}>Precio negociable · Documentos al día</div>
            </div>

            <button style={{width:'100%',padding:'14px',background:'linear-gradient(135deg,#d4af37,#b89658)',color:'#0a0a0a',border:'none',borderRadius:12,fontWeight:700,fontSize:'1rem',cursor:'pointer',marginBottom:10,display:'flex',alignItems:'center',justifyContent:'center',gap:8,fontFamily:'Poppins,sans-serif'}}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#0a0a0a"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              Consultar por WhatsApp
            </button>
            <button onClick={() => onNavigate('contact')}
              style={{width:'100%',padding:'12px',background:'transparent',color:'#d4af37',border:'2px solid #d4af37',borderRadius:12,fontWeight:600,fontSize:'0.9rem',cursor:'pointer',fontFamily:'Poppins,sans-serif',marginBottom:10}}>
              Agendar Cita
            </button>
            <button onClick={() => setFav(!fav)}
              style={{width:'100%',padding:'10px',background:fav?'rgba(212,175,55,0.12)':'transparent',color:fav?'#d4af37':'#9c9997',border:`1.5px solid ${fav?'rgba(212,175,55,0.4)':'rgba(255,255,255,0.12)'}`,borderRadius:12,fontWeight:500,fontSize:'0.85rem',cursor:'pointer',fontFamily:'Poppins,sans-serif',display:'flex',alignItems:'center',justifyContent:'center',gap:6,transition:'all 0.2s'}}>
              <svg width="15" height="15" viewBox="0 0 24 24" fill={fav?'#d4af37':'none'} stroke={fav?'#d4af37':'#9c9997'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
              {fav ? 'Guardado en Favoritos' : 'Agregar a Favoritos'}
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

function ContactScreen({ onNavigate }) {
  return (
    <div style={{background:'#0a0a0a',minHeight:'100vh',paddingTop:70}}>
      <div style={{background:'url(../../assets/nosotros-hero.webp) center/cover',minHeight:220,display:'flex',alignItems:'center',justifyContent:'center',position:'relative'}}>
        <div style={{position:'absolute',inset:0,background:'rgba(0,0,0,0.7)'}}></div>
        <div style={{position:'relative',zIndex:1,textAlign:'center'}}>
          <div style={{color:'#d4af37',fontSize:'0.72rem',fontWeight:700,letterSpacing:'0.15em',textTransform:'uppercase',marginBottom:10}}>Altorra Cars</div>
          <h1 style={{color:'#fff',fontSize:'2.4rem',fontWeight:900,letterSpacing:'-0.02em'}}>Contáctanos</h1>
          <p style={{color:'rgba(255,255,255,0.6)',marginTop:8}}>Estamos aquí para ayudarte con tu próximo vehículo</p>
        </div>
      </div>

      <div style={{maxWidth:900,margin:'48px auto',padding:'0 32px',display:'grid',gridTemplateColumns:'1fr 1fr',gap:40}}>
        <div>
          <h2 style={{color:'#fff',fontWeight:700,fontSize:'1.3rem',marginBottom:24}}>Envíanos un <span style={{color:'#d4af37'}}>Mensaje</span></h2>
          {[['Nombre completo','text'],['Correo electrónico','email'],['Teléfono','tel']].map(([pl,t]) => (
            <input key={pl} type={t} placeholder={pl}
              style={{width:'100%',padding:'12px 16px',background:'#111',border:'1px solid rgba(255,255,255,0.1)',borderRadius:10,color:'#fff',fontSize:'0.9rem',fontFamily:'Poppins,sans-serif',marginBottom:12,boxSizing:'border-box',outline:'none'}} />
          ))}
          <textarea placeholder="¿En qué podemos ayudarte?"
            style={{width:'100%',padding:'12px 16px',background:'#111',border:'1px solid rgba(255,255,255,0.1)',borderRadius:10,color:'#fff',fontSize:'0.9rem',fontFamily:'Poppins,sans-serif',marginBottom:16,boxSizing:'border-box',outline:'none',height:110,resize:'none'}}></textarea>
          <button style={{width:'100%',padding:'13px',background:'linear-gradient(135deg,#d4af37,#b89658)',color:'#0a0a0a',border:'none',borderRadius:10,fontWeight:700,fontSize:'0.95rem',cursor:'pointer',fontFamily:'Poppins,sans-serif'}}>
            Enviar Mensaje
          </button>
        </div>

        <div>
          <h2 style={{color:'#fff',fontWeight:700,fontSize:'1.3rem',marginBottom:24}}>Información de <span style={{color:'#d4af37'}}>Contacto</span></h2>
          {[
            { icon:'📧', label:'Email', value:'altorracarssale@gmail.com' },
            { icon:'📞', label:'Teléfono', value:'+57 323 501 6747' },
            { icon:'📍', label:'Ubicación', value:'Cartagena, Bolívar, Colombia' },
            { icon:'🕐', label:'Horario', value:'Lun–Vie 8am–6pm · Sáb 9am–2pm' },
          ].map(item => (
            <div key={item.label} style={{display:'flex',gap:14,marginBottom:20,alignItems:'flex-start'}}>
              <div style={{width:40,height:40,background:'rgba(212,175,55,0.1)',border:'1px solid rgba(212,175,55,0.3)',borderRadius:10,display:'flex',alignItems:'center',justifyContent:'center',fontSize:'1rem',flexShrink:0}}>
                {item.icon}
              </div>
              <div>
                <div style={{color:'#b89658',fontSize:'0.68rem',fontWeight:700,textTransform:'uppercase',letterSpacing:'0.1em',marginBottom:2}}>{item.label}</div>
                <div style={{color:'rgba(255,255,255,0.8)',fontSize:'0.88rem'}}>{item.value}</div>
              </div>
            </div>
          ))}

          <a href="https://wa.me/573235016747" target="_blank" rel="noopener noreferrer"
            style={{display:'flex',alignItems:'center',gap:10,padding:'14px 20px',background:'linear-gradient(135deg,#25d366,#1da851)',color:'#fff',borderRadius:12,textDecoration:'none',fontWeight:700,fontSize:'0.9rem',marginTop:8}}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            Chatear por WhatsApp
          </a>
        </div>
      </div>
      <Footer />
    </div>
  );
}

const searchS = {
  sidebar: { background:'#111',border:'1px solid rgba(255,255,255,0.07)',borderRadius:16,padding:24,position:'sticky',top:90 },
  sidebarTitle: { color:'#fff',fontWeight:700,fontSize:'0.95rem',marginBottom:20,textTransform:'uppercase',letterSpacing:'0.08em',paddingBottom:12,borderBottom:'1px solid rgba(255,255,255,0.08)' },
};

Object.assign(window, { SearchScreen, DetailScreen, ContactScreen });
