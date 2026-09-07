// Header Component — Altorra Cars UI Kit
const { useState } = React;

function Header({ currentScreen, onNavigate, favCount = 3 }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [authModal, setAuthModal] = useState(null); // 'login' | 'register' | null

  return (
    <>
      <header style={headerStyles.header}>
        <div style={headerStyles.inner}>
          {/* Logo */}
          <a href="#" onClick={e => { e.preventDefault(); onNavigate('home'); }} style={headerStyles.logo}>
            <img src="../../assets/logo.png" alt="Altorra Cars" style={{height:52,width:'auto'}}
              onError={e => e.target.style.display='none'} />
            <span style={headerStyles.logoText}>Altorra Cars</span>
          </a>

          {/* Desktop Nav */}
          <nav style={headerStyles.nav}>
            {[
              { label: 'Vehículos', screen: 'search', sub: ['SUV','Pickup','Sedán','Hatchback','Ver todos'] },
              { label: 'Marcas', screen: 'search' },
              { label: 'Servicios', screen: null },
              { label: 'Nosotros', screen: null },
              { label: 'Contacto', screen: 'contact' },
            ].map(item => (
              <NavItem key={item.label} item={item} onNavigate={onNavigate} active={
                (item.screen === 'search' && (currentScreen === 'search' || currentScreen === 'detail')) ||
                (item.screen === currentScreen)
              } />
            ))}
          </nav>

          {/* Actions */}
          <div style={headerStyles.actions}>
            <button onClick={() => onNavigate('search')} style={{...headerStyles.hdrBtn, ...headerStyles.hdrOutline}}>
              <HeartIcon size={13} /> Favoritos
              <span style={headerStyles.badge}>{favCount}</span>
            </button>
            <button onClick={() => setAuthModal('login')} style={{...headerStyles.hdrBtn, ...headerStyles.hdrOutline}}>
              <LoginIcon size={13} /> Ingresar
            </button>
            <button onClick={() => setAuthModal('register')} style={{...headerStyles.hdrBtn, ...headerStyles.hdrGold}}>
              + Registrarse
            </button>
          </div>

          {/* Hamburger mobile */}
          <button onClick={() => setMenuOpen(!menuOpen)} style={headerStyles.hamburger}>
            <span style={{...headerStyles.ham, ...(menuOpen ? {transform:'rotate(45deg) translate(5px,5px)'} : {})}}></span>
            <span style={{...headerStyles.ham, ...(menuOpen ? {opacity:0} : {})}}></span>
            <span style={{...headerStyles.ham, ...(menuOpen ? {transform:'rotate(-45deg) translate(5px,-5px)'} : {})}}></span>
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div style={headerStyles.mobileMenu}>
            {['Vehículos','Marcas','Servicios','Nosotros','Contacto'].map(l => (
              <div key={l} onClick={() => { onNavigate('search'); setMenuOpen(false); }}
                style={headerStyles.mobileLink}>{l}</div>
            ))}
          </div>
        )}
      </header>

      {/* Auth Modal */}
      {authModal && <AuthModal mode={authModal} onClose={() => setAuthModal(null)} onSwitch={m => setAuthModal(m)} />}
    </>
  );
}

function NavItem({ item, onNavigate, active }) {
  const [hover, setHover] = useState(false);
  return (
    <div style={{position:'relative'}}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}>
      <div onClick={() => item.screen && onNavigate(item.screen)}
        style={{...headerStyles.navLink, ...(active ? {color:'#d4af37'} : {}), cursor:'pointer'}}>
        {item.label}{item.sub && ' ▾'}
      </div>
      {hover && item.sub && (
        <div style={headerStyles.dropdown}>
          {item.sub.map(s => (
            <div key={s} onClick={() => onNavigate('search')} style={headerStyles.dropdownItem}
              onMouseEnter={e => e.currentTarget.style.background='rgba(212,175,55,0.15)'}
              onMouseLeave={e => e.currentTarget.style.background='transparent'}>
              {s}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

function AuthModal({ mode, onClose, onSwitch }) {
  return (
    <div style={{position:'fixed',inset:0,background:'rgba(0,0,0,0.75)',zIndex:9999,display:'flex',alignItems:'center',justifyContent:'center',backdropFilter:'blur(4px)'}}
      onClick={e => e.target === e.currentTarget && onClose()}>
      <div style={{background:'#111',border:'1px solid rgba(184,150,88,0.3)',borderRadius:16,padding:'32px 36px',width:380,maxWidth:'90vw',boxShadow:'0 20px 60px rgba(0,0,0,0.6)'}}>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginBottom:24}}>
          <div>
            <div style={{fontSize:'0.62rem',letterSpacing:'0.15em',textTransform:'uppercase',color:'#b89658',marginBottom:4}}>Altorra Cars</div>
            <h2 style={{color:'#fff',fontWeight:800,fontSize:'1.4rem'}}>{mode==='login'?'Iniciar Sesión':'Crear Cuenta'}</h2>
          </div>
          <button onClick={onClose} style={{background:'none',border:'none',color:'#9c9997',fontSize:'1.4rem',cursor:'pointer',lineHeight:1}}>×</button>
        </div>
        {['email','password'].map((f,i) => (
          <input key={f} type={f} placeholder={f==='email'?'Correo electrónico':'Contraseña'}
            style={{width:'100%',padding:'11px 14px',background:'#1a1a1a',border:'1px solid rgba(255,255,255,0.12)',borderRadius:8,color:'#fff',fontSize:'0.9rem',fontFamily:'Poppins,sans-serif',marginBottom:12,boxSizing:'border-box',outline:'none'}} />
        ))}
        {mode==='register' && (
          <input type="text" placeholder="Nombre completo"
            style={{width:'100%',padding:'11px 14px',background:'#1a1a1a',border:'1px solid rgba(255,255,255,0.12)',borderRadius:8,color:'#fff',fontSize:'0.9rem',fontFamily:'Poppins,sans-serif',marginBottom:12,boxSizing:'border-box',outline:'none'}} />
        )}
        <button style={{width:'100%',padding:'12px',background:'linear-gradient(135deg,#d4af37,#b89658)',color:'#0a0a0a',border:'none',borderRadius:8,fontWeight:700,fontSize:'0.95rem',cursor:'pointer',marginTop:4,fontFamily:'Poppins,sans-serif'}}>
          {mode==='login'?'Ingresar':'Registrarse'}
        </button>
        <p style={{color:'#9c9997',fontSize:'0.82rem',textAlign:'center',marginTop:16}}>
          {mode==='login'?'¿No tienes cuenta? ':'¿Ya tienes cuenta? '}
          <span onClick={() => onSwitch(mode==='login'?'register':'login')}
            style={{color:'#d4af37',cursor:'pointer',fontWeight:600}}>
            {mode==='login'?'Regístrate':'Inicia sesión'}
          </span>
        </p>
      </div>
    </div>
  );
}

function HeartIcon({ size=16, filled=false }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill={filled?"#d4af37":"none"} stroke="#d4af37" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>;
}
function LoginIcon({ size=14 }) {
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4"/><polyline points="10 17 15 12 10 7"/><line x1="15" y1="12" x2="3" y2="12"/></svg>;
}

const headerStyles = {
  header: { position:'fixed',top:0,left:0,right:0,zIndex:1000,background:'rgba(10,10,10,0.98)',backdropFilter:'blur(15px)',borderBottom:'1px solid rgba(184,150,88,0.2)',boxShadow:'0 4px 30px rgba(0,0,0,0.5)' },
  inner: { maxWidth:1200,margin:'0 auto',padding:'0 24px',display:'flex',alignItems:'center',justifyContent:'space-between',height:70 },
  logo: { display:'flex',alignItems:'center',gap:12,textDecoration:'none',flexShrink:0 },
  logoText: { fontSize:'1.05rem',fontWeight:800,color:'#d4af37',textTransform:'uppercase',letterSpacing:'0.02em',textShadow:'0 2px 15px rgba(212,175,55,0.5)' },
  nav: { display:'flex',gap:2,alignItems:'center' },
  navLink: { padding:'6px 12px',color:'#e8e8e8',fontSize:'0.9rem',fontWeight:500,borderRadius:4,transition:'color 0.2s',whiteSpace:'nowrap' },
  dropdown: { position:'absolute',top:'100%',left:0,background:'rgba(26,26,26,0.98)',border:'1.5px solid rgba(184,150,88,0.35)',borderRadius:8,padding:'6px 0',minWidth:160,boxShadow:'0 10px 40px rgba(0,0,0,0.6)',zIndex:100 },
  dropdownItem: { padding:'9px 16px',color:'#e8e8e8',fontSize:'0.84rem',fontWeight:500,cursor:'pointer',transition:'all 0.15s' },
  actions: { display:'flex',gap:6,alignItems:'center',flexShrink:0 },
  hdrBtn: { display:'inline-flex',alignItems:'center',gap:5,height:32,padding:'0 12px',fontSize:'0.75rem',fontWeight:600,letterSpacing:'0.03em',textTransform:'uppercase',borderRadius:4,cursor:'pointer',fontFamily:'Poppins,sans-serif',whiteSpace:'nowrap' },
  hdrOutline: { background:'transparent',color:'rgba(255,255,255,0.85)',border:'1.5px solid rgba(255,255,255,0.3)' },
  hdrGold: { background:'#d4af37',color:'#0a0a0a',border:'1.5px solid #d4af37' },
  badge: { background:'#d4af37',color:'#0a0a0a',minWidth:16,height:14,padding:'0 4px',borderRadius:8,fontSize:'0.6rem',fontWeight:700,display:'inline-flex',alignItems:'center',justifyContent:'center' },
  hamburger: { display:'none',flexDirection:'column',gap:4,background:'none',border:'none',cursor:'pointer',padding:4 },
  ham: { display:'block',width:24,height:2.5,background:'#d4af37',borderRadius:2,transition:'all 0.3s' },
  mobileMenu: { background:'#0a0a0a',borderTop:'1px solid rgba(184,150,88,0.15)',padding:'8px 0' },
  mobileLink: { padding:'12px 24px',color:'#e8e8e8',fontSize:'0.95rem',cursor:'pointer',borderBottom:'1px solid rgba(255,255,255,0.05)' },
};

Object.assign(window, { Header, AuthModal, HeartIcon });
