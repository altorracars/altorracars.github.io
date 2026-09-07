// HeroSection + HomeScreen — Altorra Cars UI Kit
const { useState: useHeroState, useEffect: useHeroEffect } = React;

function HeroSection({ onNavigate }) {
  const [query, setQuery] = useHeroState('');
  const [count, setCount] = useHeroState(0);

  useHeroEffect(() => {
    let i = 0;
    const target = 127;
    const timer = setInterval(() => {
      i += 3;
      if (i >= target) { setCount(target); clearInterval(timer); }
      else setCount(i);
    }, 18);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={heroS.hero}>
      {/* Overlay */}
      <div style={heroS.overlay}></div>
      {/* Fade bottom */}
      <div style={heroS.fade}></div>

      {/* Content */}
      <div style={heroS.content}>
        {/* Badge */}
        <div style={heroS.badge}>
          <span style={heroS.badgeDot}></span>
          PLATAFORMA PREMIUM · ALTORRA CARS
        </div>

        {/* Title */}
        <h1 style={heroS.title}>
          Encuentra el Vehículo
          <span style={heroS.titleAccent}> de tus Sueños</span>
        </h1>

        {/* Subtitle */}
        <p style={heroS.subtitle}>
          Más de {count}+ vehículos disponibles en Cartagena.<br/>
          Compra o vende con confianza y respaldo profesional.
        </p>

        {/* CTA */}
        <div style={{marginBottom:20}}>
          <button onClick={() => onNavigate('search')} style={heroS.ctaBtn}>
            Ver Vehículos
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{marginLeft:6}}><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>

        {/* Search bar */}
        <div style={heroS.searchWrap}>
          <div style={heroS.searchInner}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.45)" strokeWidth="2" strokeLinecap="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <input
              value={query}
              onChange={e => setQuery(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && onNavigate('search')}
              placeholder="Buscar por marca, modelo, año..."
              style={heroS.searchInput}
            />
            <button onClick={() => onNavigate('search')} style={heroS.searchBtn}>Buscar</button>
          </div>
        </div>
      </div>

      {/* Trust bar */}
      <TrustBar />
    </div>
  );
}

function TrustBar() {
  const stats = [
    { num: '127+', label: 'Vehículos' },
    { num: '18', label: 'Marcas' },
    { num: '4.9★', label: 'Reseñas' },
    { num: '100%', label: 'Confianza' },
  ];
  return (
    <div style={heroS.trustBar}>
      {stats.map((s, i) => (
        <React.Fragment key={s.label}>
          {i > 0 && <div style={heroS.trustSep}></div>}
          <div style={heroS.trustItem}>
            <div style={heroS.trustNum}>{s.num}</div>
            <div style={heroS.trustLabel}>{s.label}</div>
          </div>
        </React.Fragment>
      ))}
    </div>
  );
}

function HomeScreen({ onNavigate, vehicles }) {
  const brands = [
    { name:'Toyota', img:'../../assets/logos/Toyota.webp' },
    { name:'Chevrolet', img:'../../assets/logos/Chevrolet.webp' },
    { name:'Nissan', img:'../../assets/logos/Nissan.webp' },
    { name:'Kia', img:'../../assets/logos/Kia.webp' },
    { name:'Mazda', img:'../../assets/logos/Mazda.webp' },
    { name:'BMW', img:'../../assets/logos/BMW.webp' },
    { name:'Hyundai', img:'../../assets/logos/Hyundai.webp' },
    { name:'Ford', img:'../../assets/logos/Ford.webp' },
  ];

  const categories = [
    { name:'SUV', img:'../../assets/categories/SUV.jpg' },
    { name:'Sedán', img:'../../assets/categories/SEDAN.jpg' },
    { name:'Hatchback', img:'../../assets/categories/HATCHBACK.jpg' },
    { name:'Pickup', img:'../../assets/categories/PICKUP.jpg' },
  ];

  return (
    <div style={{background:'#0a0a0a',minHeight:'100vh'}}>
      <HeroSection onNavigate={onNavigate} />

      {/* Featured vehicles */}
      <section style={homeS.section}>
        <div style={homeS.container}>
          <div style={homeS.sectionHeader}>
            <h2 style={homeS.sectionTitle}>Vehículos <span style={{color:'#d4af37'}}>Destacados</span></h2>
            <button onClick={() => onNavigate('search')} style={homeS.viewAll}>Ver todos →</button>
          </div>
          <div style={homeS.vehicleGrid}>
            {vehicles.slice(0,3).map(v => (
              <VehicleCard key={v.id} vehicle={v} onClick={() => onNavigate('detail', v)} />
            ))}
          </div>
        </div>
      </section>

      {/* Gold divider */}
      <div style={homeS.divider}></div>

      {/* Brands */}
      <section style={{...homeS.section, paddingTop:40,paddingBottom:40}}>
        <div style={homeS.container}>
          <h2 style={{...homeS.sectionTitle, textAlign:'center', marginBottom:32}}>
            Principales <span style={{color:'#d4af37'}}>Marcas</span>
          </h2>
          <div style={{display:'flex',gap:16,flexWrap:'wrap',justifyContent:'center'}}>
            {brands.map(b => (
              <BrandCard key={b.name} brand={b} onClick={() => onNavigate('search')} />
            ))}
          </div>
        </div>
      </section>

      {/* Gold divider */}
      <div style={homeS.divider}></div>

      {/* Categories */}
      <section style={homeS.section}>
        <div style={homeS.container}>
          <h2 style={{...homeS.sectionTitle, marginBottom:24}}>
            Explorar por <span style={{color:'#d4af37'}}>Categoría</span>
          </h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(220px,1fr))',gap:16}}>
            {categories.map(c => (
              <CategoryCard key={c.name} cat={c} onClick={() => onNavigate('search')} />
            ))}
          </div>
        </div>
      </section>

      {/* Services */}
      <div style={homeS.divider}></div>
      <section style={{...homeS.section, background:'#111'}}>
        <div style={homeS.container}>
          <h2 style={{...homeS.sectionTitle,textAlign:'center',marginBottom:32}}>
            Nuestros <span style={{color:'#d4af37'}}>Servicios</span>
          </h2>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fit,minmax(240px,1fr))',gap:20}}>
            {[
              { title:'Compra tu Auto', desc:'Encuentra el vehículo de tus sueños con respaldo total en el proceso de compra.' },
              { title:'Vende tu Auto', desc:'Publicamos tu vehículo y gestionamos todo el proceso de venta de forma profesional.' },
              { title:'Financiación', desc:'Accede a planes de financiamiento flexibles adaptados a tu presupuesto y necesidades.' },
            ].map(s => (
              <div key={s.title} style={{background:'rgba(255,255,255,0.05)',border:'1px solid rgba(184,150,88,0.2)',borderRadius:16,padding:28,transition:'all 0.3s'}}>
                <h3 style={{color:'#d4af37',fontSize:'1.1rem',fontWeight:700,marginBottom:10}}>{s.title}</h3>
                <p style={{color:'#b0b0b0',fontSize:'0.85rem',lineHeight:1.7}}>{s.desc}</p>
                <button onClick={() => onNavigate('contact')} style={{marginTop:16,padding:'8px 20px',background:'linear-gradient(135deg,#b89658,#8b6f47)',color:'#fff',border:'none',borderRadius:8,fontSize:'0.82rem',fontWeight:600,cursor:'pointer',fontFamily:'Poppins,sans-serif'}}>
                  Saber más
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />

      {/* WhatsApp float */}
      <a href="https://wa.me/573235016747" target="_blank" rel="noopener noreferrer"
        style={{position:'fixed',bottom:24,right:24,width:56,height:56,background:'linear-gradient(135deg,#d4af37,#b89658)',borderRadius:'50%',display:'flex',alignItems:'center',justifyContent:'center',boxShadow:'0 8px 30px rgba(212,175,55,0.4)',zIndex:999,animation:'wapulse 2s ease-in-out infinite',textDecoration:'none'}}>
        <svg width="26" height="26" viewBox="0 0 24 24" fill="#0a0a0a"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
      </a>
    </div>
  );
}

function BrandCard({ brand, onClick }) {
  const [hov, setHov] = useHeroState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{...brandS.card, ...(hov ? brandS.cardHover : {})}}>
      <img src={brand.img} alt={brand.name} style={{...brandS.logo, ...(hov ? {transform:'scale(1.15)',filter:'drop-shadow(0 0 14px rgba(212,175,55,0.5))'} : {})}}
        onError={e => e.target.style.display='none'} />
      <div style={brandS.name}>{brand.name}</div>
    </div>
  );
}

function CategoryCard({ cat, onClick }) {
  const [hov, setHov] = useHeroState(false);
  return (
    <div onClick={onClick}
      onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      style={{...catS.card, ...(hov ? catS.cardHover : {})}}>
      <img src={cat.img} alt={cat.name} style={{...catS.img, ...(hov ? {transform:'scale(1.08)',filter:'brightness(0.85)'} : {})}}
        onError={e => e.target.style.display='none'} />
      <div style={catS.overlay}></div>
      <div style={catS.name}>{cat.name}</div>
    </div>
  );
}

const heroS = {
  hero: { position:'relative',minHeight:'70vh',display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',backgroundImage:"url('../../assets/heroindex.webp')",backgroundSize:'cover',backgroundPosition:'center 30%',overflow:'hidden',marginTop:70 },
  overlay: { position:'absolute',inset:0,background:'linear-gradient(to bottom,rgba(0,0,0,0.78) 0%,rgba(0,0,0,0.28) 38%,rgba(0,0,0,0.30) 62%,rgba(0,0,0,0.85) 100%)',zIndex:1 },
  fade: { position:'absolute',bottom:0,left:0,right:0,height:120,background:'linear-gradient(to bottom,transparent,#0a0a0a)',zIndex:3,pointerEvents:'none' },
  content: { position:'relative',zIndex:4,textAlign:'center',padding:'3rem 2rem',maxWidth:860,margin:'0 auto',width:'100%' },
  badge: { display:'inline-flex',alignItems:'center',gap:8,background:'rgba(212,175,55,0.10)',border:'1px solid rgba(212,175,55,0.38)',color:'#d4af37',padding:'7px 20px',borderRadius:100,fontSize:'0.72rem',fontWeight:700,letterSpacing:'0.12em',textTransform:'uppercase',marginBottom:20,backdropFilter:'blur(16px)' },
  badgeDot: { width:6,height:6,background:'#d4af37',borderRadius:'50%',flexShrink:0,boxShadow:'0 0 7px rgba(212,175,55,0.9)',animation:'dotpulse 2.2s ease-in-out infinite',display:'inline-block' },
  title: { fontSize:'clamp(2rem,5vw,3.8rem)',fontWeight:900,lineHeight:1.06,letterSpacing:'-0.03em',color:'rgba(255,255,255,0.95)',marginBottom:16 },
  titleAccent: { display:'block',background:'linear-gradient(135deg,#f5df80 0%,#d4af37 40%,#b89658 70%,#f5df80 100%)',backgroundSize:'200% auto',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',backgroundClip:'text',animation:'goldShimmer 4s ease-in-out infinite',filter:'drop-shadow(0 2px 12px rgba(212,175,55,0.35))' },
  subtitle: { color:'rgba(255,255,255,0.65)',fontSize:'1rem',lineHeight:1.7,marginBottom:24 },
  ctaBtn: { display:'inline-flex',alignItems:'center',padding:'14px 32px',background:'linear-gradient(135deg,#d4af37,#b89658)',color:'#0a0a0a',fontWeight:700,fontSize:'1rem',borderRadius:100,border:'none',cursor:'pointer',boxShadow:'0 4px 24px rgba(212,175,55,0.38)',fontFamily:'Poppins,sans-serif',transition:'all 0.25s' },
  searchWrap: { maxWidth:660,margin:'0 auto' },
  searchInner: { display:'flex',alignItems:'center',background:'rgba(18,18,18,0.88)',border:'1px solid rgba(255,255,255,0.22)',borderRadius:100,padding:'0 18px',gap:8,backdropFilter:'blur(20px)' },
  searchInput: { flex:1,background:'transparent',border:'none',outline:'none',color:'#fff',fontSize:'0.95rem',padding:'13px 0',fontFamily:'Poppins,sans-serif' },
  searchBtn: { padding:'8px 20px',background:'linear-gradient(135deg,#d4af37,#b89658)',color:'#0a0a0a',border:'none',borderRadius:100,fontWeight:700,fontSize:'0.82rem',cursor:'pointer',fontFamily:'Poppins,sans-serif',whiteSpace:'nowrap' },
  trustBar: { position:'relative',zIndex:5,width:'100%',background:'#111',borderTop:'1px solid rgba(212,175,55,0.18)',padding:'16px 32px',display:'flex',alignItems:'center',justifyContent:'center',gap:0,flexWrap:'wrap' },
  trustItem: { display:'flex',flexDirection:'column',alignItems:'center',padding:'0 36px' },
  trustSep: { width:1,height:32,background:'rgba(255,255,255,0.1)',flexShrink:0 },
  trustNum: { fontSize:'1.4rem',fontWeight:800,color:'#d4af37',letterSpacing:'-0.03em',lineHeight:1 },
  trustLabel: { fontSize:'0.62rem',color:'rgba(255,255,255,0.45)',textTransform:'uppercase',letterSpacing:'0.12em',fontWeight:600,marginTop:2 },
};

const homeS = {
  section: { padding:'60px 0',background:'#0a0a0a' },
  container: { maxWidth:1200,margin:'0 auto',padding:'0 32px' },
  sectionHeader: { display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:32 },
  sectionTitle: { fontSize:'clamp(1.5rem,3vw,2.2rem)',fontWeight:700,color:'#fff' },
  viewAll: { padding:'8px 20px',background:'transparent',color:'#d4af37',border:'2px solid #d4af37',borderRadius:8,fontWeight:600,fontSize:'0.88rem',cursor:'pointer',fontFamily:'Poppins,sans-serif' },
  vehicleGrid: { display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(280px,1fr))',gap:20 },
  divider: { height:1,background:'linear-gradient(90deg,transparent,rgba(184,150,88,0.4),transparent)',opacity:0.5,margin:'0 auto',maxWidth:900 },
};

const brandS = {
  card: { display:'flex',flexDirection:'column',alignItems:'center',justifyContent:'center',padding:'20px 16px',background:'rgba(255,255,255,0.04)',borderRadius:14,cursor:'pointer',transition:'all 0.4s ease',minWidth:100,minHeight:110,border:'1px solid rgba(255,255,255,0.05)' },
  cardHover: { transform:'translateY(-8px) scale(1.08)' },
  logo: { width:64,height:44,objectFit:'contain',filter:'brightness(0.95)',transition:'all 0.4s ease' },
  name: { color:'#e8e8e8',fontSize:'0.72rem',fontWeight:600,marginTop:8 },
};

const catS = {
  card: { position:'relative',borderRadius:18,overflow:'hidden',height:180,cursor:'pointer',border:'2px solid rgba(42,42,42,0.8)',transition:'all 0.3s ease',boxShadow:'0 8px 32px rgba(0,0,0,0.5)' },
  cardHover: { borderColor:'#b89658',boxShadow:'0 14px 50px rgba(0,0,0,0.6),0 0 36px rgba(184,150,88,0.25)',transform:'translateY(-6px)' },
  img: { width:'100%',height:'100%',objectFit:'cover',filter:'brightness(0.7)',transition:'all 0.3s ease' },
  overlay: { position:'absolute',inset:0,background:'linear-gradient(180deg,transparent 30%,rgba(0,0,0,0.85) 100%)' },
  name: { position:'absolute',bottom:16,left:20,color:'#fff',fontSize:'1.3rem',fontWeight:900,textShadow:'0 2px 12px rgba(0,0,0,0.8)',zIndex:2 },
};

Object.assign(window, { HeroSection, HomeScreen, TrustBar });
